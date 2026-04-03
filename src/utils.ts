import { BEAUFORT_SCALE, COMPASS_POINTS } from './const';

// ── HA History Parsing ────────────────────────────────────────────────

/** Raw history entry from HA minimal_response (compact format) */
export interface HAHistoryEntry {
  s?: string;
  lu?: number;
  state?: string;
  last_updated?: string;
}

/** Check if an HA state string is valid (not unavailable/unknown) */
export function isValidState(state: string | undefined | null): boolean {
  return state !== undefined && state !== null
    && state !== 'unavailable' && state !== 'unknown';
}

/** Parse an HA history entry (full or compact format) into { state, time } */
export function parseHistoryEntry(entry: HAHistoryEntry): { state: string; time: number } | null {
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

/** Parse a numeric value from an HA history entry, filtering unavailable/unknown */
export function parseNumericHistoryEntry(entry: HAHistoryEntry): { value: number; time: number } | null {
  const parsed = parseHistoryEntry(entry);
  if (!parsed) return null;
  if (!isValidState(parsed.state)) return null;
  const val = parseFloat(parsed.state);
  if (!isFinite(val)) return null;
  return { value: val, time: parsed.time };
}

/** Format a timestamp as HH:MM, with optional "Y" prefix for yesterday */
export function formatHistoryTime(ts: number, showYesterday = false): string {
  const d = new Date(ts);
  const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  if (showYesterday) {
    const now = new Date();
    if (d.getDate() !== now.getDate() || d.getMonth() !== now.getMonth()) {
      return `Y ${time}`;
    }
  }
  return time;
}

// Convert wind speed to km/h for Beaufort scale calculation
// based on the entity's unit_of_measurement
export function toKmh(speed: number, unit: string): number {
  switch (unit) {
    case 'mph':
      return speed * 1.60934;
    case 'm/s':
      return speed * 3.6;
    case 'ft/s':
      return speed * 1.09728;
    case 'kn':
    case 'kt':
      return speed * 1.852;
    case 'km/h':
    default:
      return speed;
  }
}

export function formatValue(value: number, role: string): string {
  if (!isFinite(value)) return '--';
  switch (role) {
    case 'temperature':
    case 'feels_like':
    case 'dew_point':
    case 'wind_chill':
    case 'heat_index':
    case 'soil_temp':
      return Math.round(value).toString();
    case 'pressure':
      return value < 100 ? value.toFixed(2) : Math.round(value).toString();
    case 'rain_rate':
    case 'daily_rain':
      return value < 10 ? value.toFixed(1) : Math.round(value).toString();
    case 'uv_index':
      return Math.round(value).toString();
    case 'humidity':
      return Math.round(value).toString();
    default:
      return value < 10 ? value.toFixed(1) : Math.round(value).toString();
  }
}

export function getBeaufortLabel(kmh: number): string {
  for (const entry of BEAUFORT_SCALE) {
    if (kmh <= entry.max) return entry.label;
  }
  return 'Hurricane';
}

export function bearingToDirection(bearing: number): string {
  const index = Math.round(((bearing % 360) + 360) % 360 / 22.5) % 16;
  return COMPASS_POINTS[index];
}

/**
 * Moon phase name to illumination fraction (0-1).
 * Maps HA sensor.moon_phase states to approximate illumination.
 */
export function moonIllumination(phase: string | undefined): number {
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

export function computeShortestRotation(newAngle: number, oldAngle: number): number {
  let diff = newAngle - oldAngle;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return oldAngle + diff;
}
