import { WeatherCondition } from './types';
import { SkyGradient, RGB, SkyInputs, computeSkyGradient, saveNightCloudCache, restoreNightCloudCache } from './sky-color';
import { mapHaCondition } from './condition-engine';

// ── Types ──────────────────────────────────────────────────────────────────

export interface SkyHistoryEntry {
  timestamp: number;           // Unix ms
  condition: WeatherCondition;
  skyGradient: SkyGradient;    // frozen RGB values at capture time
  temperature?: number;
  showStars: boolean;
  showMoon: boolean;
  moonPhase?: string;
}

/** Raw history entry from HA minimal_response (compact format) */
interface HAHistoryEntry {
  s?: string;
  lu?: number;
  state?: string;
  last_updated?: string;
}

// ── Constants ──────────────────────────────────────────────────────────────

const MIN_INTERVAL_MS = 5 * 60 * 1000;       // 5 min between entries
const MAX_GAP_MS = 30 * 60 * 1000;           // force entry every 30 min even if nothing changed
const GRADIENT_THRESHOLD = 30;                // avg RGB distance for significant shift
const MERGE_WINDOW_MS = 10 * 60 * 1000;      // merge if same condition returns within 10 min

const STARS_CONDITIONS: WeatherCondition[] = ['clear-night', 'starry-night', 'partly-cloudy-night'];
const MOON_CONDITIONS: WeatherCondition[] = ['clear-night', 'starry-night'];

// ── Helpers ────────────────────────────────────────────────────────────────

function colorDistance(a: RGB, b: RGB): number {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 +
    (a[1] - b[1]) ** 2 +
    (a[2] - b[2]) ** 2,
  );
}

function cloneGradient(g: SkyGradient): SkyGradient {
  return {
    zenith: [...g.zenith] as RGB,
    mid: [...g.mid] as RGB,
    horizon: [...g.horizon] as RGB,
  };
}

/** Parse a HA history entry (full or compact format) into { value, time } */
function parseEntry(entry: HAHistoryEntry): { state: string; time: number } | null {
  const stateStr = entry.s ?? entry.state;
  if (stateStr === undefined || stateStr === null) return null;
  const time = entry.lu
    ? entry.lu * 1000               // compact: unix seconds → ms
    : entry.last_updated
      ? new Date(entry.last_updated).getTime()  // full: ISO → ms
      : 0;
  if (!time) return null;
  return { state: stateStr, time };
}

/** Parse numeric from HA history entry, filtering unavailable/unknown */
function parseNumericEntry(entry: HAHistoryEntry): { value: number; time: number } | null {
  const parsed = parseEntry(entry);
  if (!parsed) return null;
  if (parsed.state === 'unavailable' || parsed.state === 'unknown') return null;
  const val = parseFloat(parsed.state);
  if (!isFinite(val)) return null;
  return { value: val, time: parsed.time };
}

/**
 * Get value from a timeline at a specific timestamp.
 * Uses the last known value at or before the given time (step interpolation).
 */
function getValueAt<T extends { time: number }>(
  timeline: T[],
  timestamp: number,
): T | undefined {
  if (timeline.length === 0) return undefined;
  // Binary search for last entry <= timestamp
  let lo = 0, hi = timeline.length - 1;
  if (timestamp < timeline[0].time) return undefined;
  if (timestamp >= timeline[hi].time) return timeline[hi];
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (timeline[mid].time <= timestamp) lo = mid;
    else hi = mid - 1;
  }
  return timeline[lo];
}

/**
 * Moon phase name to illumination (0-1).
 */
function moonIllumination(phase: string | undefined): number {
  if (!phase) return 0;
  const p = phase.toLowerCase().replace(/[_\s]/g, '');
  switch (p) {
    case 'newmoon': return 0;
    case 'waxingcrescent': return 0.15;
    case 'firstquarter': return 0.5;
    case 'waxinggibbous': return 0.75;
    case 'fullmoon': return 1.0;
    case 'waninggibbous': return 0.75;
    case 'lastquarter': case 'thirdquarter': return 0.5;
    case 'waningcrescent': return 0.15;
    default: return 0;
  }
}

/**
 * Calculate sun elevation at a specific time.
 * Uses the same solar position algorithm available in the app.
 */
function sunElevationAt(timestamp: number, latitude: number, longitude: number): number {
  const date = new Date(timestamp);
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const declination = 23.45 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81));
  const hourUTC = date.getUTCHours() + date.getUTCMinutes() / 60;
  const solarNoonOffset = longitude / 15; // hours from UTC
  const hourAngle = (hourUTC + solarNoonOffset - 12) * 15; // degrees

  const latRad = latitude * Math.PI / 180;
  const declRad = declination * Math.PI / 180;
  const hourRad = hourAngle * Math.PI / 180;

  const sinElev = Math.sin(latRad) * Math.sin(declRad)
    + Math.cos(latRad) * Math.cos(declRad) * Math.cos(hourRad);
  return Math.asin(Math.max(-1, Math.min(1, sinElev))) * 180 / Math.PI;
}

// ── Reconstruction Logic ──────────────────────────────────────────────────

/** Entities required for sky history reconstruction */
export interface SkyHistoryEntities {
  weatherEntity?: string;      // weather.xxx — provides condition
  sunEntity: string;           // sun.sun — provides elevation
  moonEntity?: string;         // sensor.moon_phase
  temperatureEntity?: string;
  humidityEntity?: string;
  solarRadiationEntity?: string;
  uvIndexEntity?: string;
  rainRateEntity?: string;
}

/**
 * Reconstruct sky history from HA entity history.
 *
 * Fetches 24h of history for all relevant entities in a single WebSocket call,
 * then replays the sky gradient computation at each significant time point.
 */
export async function reconstructSkyHistory(
  hass: any,
  entities: SkyHistoryEntities,
  latitude: number,
  longitude: number,
): Promise<SkyHistoryEntry[]> {
  const now = new Date();
  const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  // Collect entity IDs to fetch
  const entityIds: string[] = [];
  if (entities.weatherEntity) entityIds.push(entities.weatherEntity);
  entityIds.push(entities.sunEntity);
  if (entities.moonEntity) entityIds.push(entities.moonEntity);
  if (entities.temperatureEntity) entityIds.push(entities.temperatureEntity);
  if (entities.humidityEntity) entityIds.push(entities.humidityEntity);
  if (entities.solarRadiationEntity) entityIds.push(entities.solarRadiationEntity);
  if (entities.uvIndexEntity) entityIds.push(entities.uvIndexEntity);
  if (entities.rainRateEntity) entityIds.push(entities.rainRateEntity);

  if (entityIds.length === 0) return [];

  // Single WebSocket call for all entities
  let result: Record<string, HAHistoryEntry[]>;
  try {
    result = await hass.callWS({
      type: 'history/history_during_period',
      start_time: start.toISOString(),
      end_time: now.toISOString(),
      entity_ids: entityIds,
      minimal_response: true,
      significant_changes_only: true,
      no_attributes: true,
    });
  } catch (err) {
    console.warn('[sky-history] Failed to fetch history:', err);
    return [];
  }

  // Parse timelines
  type StringEntry = { state: string; time: number };
  type NumericEntry = { value: number; time: number };

  const weatherTimeline: StringEntry[] = [];
  const sunTimeline: NumericEntry[] = [];
  const moonTimeline: StringEntry[] = [];
  const tempTimeline: NumericEntry[] = [];
  const humidityTimeline: NumericEntry[] = [];
  const solarTimeline: NumericEntry[] = [];
  const uvTimeline: NumericEntry[] = [];
  const rainTimeline: NumericEntry[] = [];

  // Parse weather entity
  if (entities.weatherEntity && result[entities.weatherEntity]) {
    for (const entry of result[entities.weatherEntity]) {
      const parsed = parseEntry(entry);
      if (parsed && parsed.state !== 'unavailable' && parsed.state !== 'unknown') {
        weatherTimeline.push(parsed);
      }
    }
  }

  // Parse sun entity (elevation stored as state)
  if (result[entities.sunEntity]) {
    for (const entry of result[entities.sunEntity]) {
      // sun.sun state is 'above_horizon' / 'below_horizon' — not numeric
      // We compute elevation from lat/lng instead
      const parsed = parseEntry(entry);
      if (parsed) {
        sunTimeline.push({ value: 0, time: parsed.time }); // placeholder, will compute
      }
    }
  }

  // Parse moon phase
  if (entities.moonEntity && result[entities.moonEntity]) {
    for (const entry of result[entities.moonEntity]) {
      const parsed = parseEntry(entry);
      if (parsed && parsed.state !== 'unavailable' && parsed.state !== 'unknown') {
        moonTimeline.push(parsed);
      }
    }
  }

  // Parse numeric sensors
  const parseNumericTimeline = (entityId: string | undefined): NumericEntry[] => {
    if (!entityId || !result[entityId]) return [];
    const entries: NumericEntry[] = [];
    for (const entry of result[entityId]) {
      const parsed = parseNumericEntry(entry);
      if (parsed) entries.push(parsed);
    }
    return entries;
  };

  tempTimeline.push(...parseNumericTimeline(entities.temperatureEntity));
  humidityTimeline.push(...parseNumericTimeline(entities.humidityEntity));
  solarTimeline.push(...parseNumericTimeline(entities.solarRadiationEntity));
  uvTimeline.push(...parseNumericTimeline(entities.uvIndexEntity));
  rainTimeline.push(...parseNumericTimeline(entities.rainRateEntity));

  // Collect all unique timestamps where ANY entity changed
  const allTimestamps = new Set<number>();
  for (const tl of [weatherTimeline, sunTimeline, moonTimeline,
    tempTimeline, humidityTimeline, solarTimeline, uvTimeline, rainTimeline]) {
    for (const entry of tl) {
      allTimestamps.add(entry.time);
    }
  }

  // Inject periodic sample timestamps every 30 minutes across the full 24h window.
  // This ensures the timeline has entries even during completely stable periods
  // where no entity changed at all (e.g., clear midday for 6 hours straight).
  const startMs = start.getTime();
  const endMs = now.getTime();
  for (let t = startMs; t <= endMs; t += MAX_GAP_MS) {
    allTimestamps.add(t);
  }

  // Sort timestamps chronologically
  const sortedTimes = Array.from(allTimestamps).sort((a, b) => a - b);
  if (sortedTimes.length === 0) return [];

  // Save the live night cloud cache so reconstruction doesn't corrupt it
  const cacheSnapshot = saveNightCloudCache();

  // Replay: compute sky state at each timestamp
  const rawEntries: SkyHistoryEntry[] = [];

  for (const ts of sortedTimes) {
    // Get state of each entity at this timestamp
    const weatherState = getValueAt(weatherTimeline, ts);
    const moonState = getValueAt(moonTimeline, ts);
    const tempState = getValueAt(tempTimeline, ts);
    const humidityState = getValueAt(humidityTimeline, ts);
    const solarState = getValueAt(solarTimeline, ts);
    const uvState = getValueAt(uvTimeline, ts);
    const rainState = getValueAt(rainTimeline, ts);

    // Compute sun elevation from lat/lng at this timestamp
    const elevation = sunElevationAt(ts, latitude, longitude);
    // Use 0° threshold to match HA's sun.sun entity which transitions
    // to 'below_horizon' at geometric sunset (elevation = 0°).
    // Note: -6° is civil twilight — too late for icon transition.
    const isNight = elevation < 0;

    // Derive weather condition
    let condition: WeatherCondition;
    if (weatherState) {
      condition = mapHaCondition(weatherState.state, isNight);
    } else {
      // Fallback: use a generic condition from elevation
      condition = isNight ? 'clear-night' : 'clear-day';
    }

    // Twilight / golden hour zone (-6° to 4°): show sunrise/sunset icon
    // instead of clear-day/clear-night when conditions are clear or partly
    // cloudy. At 4° the sun is ~15 min after rise / before set in the
    // tropics — still low and orange. Rain/storm conditions are NOT
    // overridden (rain override below will also take precedence).
    if (elevation >= -6 && elevation <= 4) {
      const isTwilightEligible = condition === 'clear-night' || condition === 'clear-day'
        || condition === 'partly-cloudy-day' || condition === 'partly-cloudy-night';
      if (isTwilightEligible) {
        const hour = new Date(ts).getHours();
        condition = hour < 12 ? 'sunrise' : 'sunset';
      }
    }

    // Override condition when rain_rate sensor shows rain but weather entity
    // doesn't reflect it (common with some integrations). The rain_rate sensor
    // is more reliable for detecting actual precipitation.
    const rainVal = rainState?.value ?? 0;
    if (rainVal >= 0.1) {
      const isRainCondition = ['rain', 'thunderstorms-rain',
        'thunderstorms-day-rain', 'thunderstorms-night-rain',
        'partly-cloudy-day-rain', 'partly-cloudy-night-rain'].includes(condition);
      if (!isRainCondition) {
        if (rainVal >= 20) {
          condition = 'thunderstorms-rain';
        } else if (rainVal >= 10) {
          condition = isNight ? 'thunderstorms-night-rain' : 'thunderstorms-day-rain';
        } else if (rainVal >= 2.5) {
          condition = 'rain';
        } else {
          condition = isNight ? 'partly-cloudy-night-rain' : 'partly-cloudy-day-rain';
        }
      }
    }

    // Compute moon illumination
    const moonPhase = moonState?.state;
    const moonIllum = moonIllumination(moonPhase);

    // Build SkyInputs and compute gradient
    const skyInputs: SkyInputs = {
      sunElevation: elevation,
      solarRadiation: solarState?.value,
      uvIndex: uvState?.value,
      humidity: humidityState?.value,
      rainRate: rainState?.value,
      moonIllumination: moonIllum,
      isNight,
    };
    const skyGradient = computeSkyGradient(skyInputs, ts);

    const showStars = STARS_CONDITIONS.includes(condition);
    // Moon/stars only visible after civil twilight (elevation < -6°)
    const showMoon = elevation < -6 && !!moonPhase && MOON_CONDITIONS.includes(condition);

    rawEntries.push({
      timestamp: ts,
      condition,
      skyGradient: cloneGradient(skyGradient),
      temperature: tempState?.value,
      showStars,
      showMoon,
      moonPhase,
    });
  }

  // Restore the live night cloud cache (reconstruction must not corrupt live state)
  restoreNightCloudCache(cacheSnapshot);

  // Apply the same dedup/significance filtering as the old in-memory store
  return filterSignificantEntries(rawEntries);
}

/**
 * Filter raw entries to keep only significant changes.
 * Same logic as the old SkyHistoryStore.record() — min interval, condition
 * changes, gradient shifts, merge window for flapping conditions.
 */
function filterSignificantEntries(raw: SkyHistoryEntry[]): SkyHistoryEntry[] {
  if (raw.length === 0) return [];

  const result: SkyHistoryEntry[] = [raw[0]]; // always keep first
  let lastCondition = raw[0].condition;
  let lastTime = raw[0].timestamp;

  for (let i = 1; i < raw.length; i++) {
    const entry = raw[i];

    // Minimum interval
    if (entry.timestamp - lastTime < MIN_INTERVAL_MS) continue;

    const gap = entry.timestamp - lastTime;

    // Condition changed?
    if (entry.condition !== lastCondition) {
      // Check for merge (flapping suppression)
      if (shouldMerge(result, entry.condition, entry.timestamp)) continue;
      result.push(entry);
      lastCondition = entry.condition;
      lastTime = entry.timestamp;
      continue;
    }

    // Check gradient shift
    const last = result[result.length - 1];
    const dZ = colorDistance(last.skyGradient.zenith, entry.skyGradient.zenith);
    const dM = colorDistance(last.skyGradient.mid, entry.skyGradient.mid);
    const dH = colorDistance(last.skyGradient.horizon, entry.skyGradient.horizon);
    const avgDelta = (dZ + dM + dH) / 3;

    if (avgDelta > GRADIENT_THRESHOLD) {
      result.push(entry);
      lastCondition = entry.condition;
      lastTime = entry.timestamp;
      continue;
    }

    // Max gap: force an entry every 30 minutes even during stable conditions
    // so the timeline covers the full 24h period without large gaps
    if (gap >= MAX_GAP_MS) {
      result.push(entry);
      lastCondition = entry.condition;
      lastTime = entry.timestamp;
    }
  }

  return result;
}

/** Check if a returning condition should be merged (flapping suppression) */
function shouldMerge(
  entries: SkyHistoryEntry[],
  condition: WeatherCondition,
  now: number,
): boolean {
  for (let i = entries.length - 1; i >= 0; i--) {
    const e = entries[i];
    if (e.condition === condition) {
      return (now - e.timestamp) < MERGE_WINDOW_MS;
    }
    if (now - e.timestamp > MERGE_WINDOW_MS) break;
  }
  return false;
}
