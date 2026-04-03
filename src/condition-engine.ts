import { HomeAssistant, SensorData, WeatherCondition } from './types';
import { toKmh } from './utils';

/**
 * Clear-sky solar radiation model (Kasten-Czeplak / Beer-Lambert simplified).
 * Returns expected W/m² for a clear sky at the given sun elevation angle.
 * Tuned for tropical atmosphere (higher water vapor → lower transmittance).
 */
export function clearSkyRadiation(sunElevation: number): number {
  if (sunElevation <= 0) return 0;

  const elevRad = sunElevation * Math.PI / 180;
  const sinElev = Math.sin(elevRad);

  // Air mass (Kasten & Young 1989)
  const am = 1 / (sinElev + 0.50572 * Math.pow(sunElevation + 6.07995, -1.6364));

  // Clear-sky direct normal irradiance (Beer-Lambert)
  // Tropical transmittance ~0.70 (lower than temperate due to moisture)
  const solarConstant = 1361;
  const transmittance = 0.70;
  const directNormal = solarConstant * Math.pow(transmittance, Math.pow(am, 0.678));

  // Global horizontal = direct horizontal + diffuse (~12% of direct)
  const directHorizontal = directNormal * sinElev;
  const diffuse = directNormal * 0.12 * sinElev;

  return directHorizontal + diffuse;
}

/**
 * Normalize rain rate to mm/h regardless of HA unit system.
 */
function toMmh(rainRate: number, unit: string): number {
  const u = unit.toLowerCase().replace(/\s/g, '');
  if (u.includes('in')) return rainRate * 25.4; // in/h → mm/h
  return rainRate; // already mm/h
}

/**
 * Map HA standard weather entity condition to our condition set.
 * Used internally as a fallback when sensor data is unavailable.
 */
function mapHaCondition(haCondition: string, isNight: boolean): WeatherCondition {
  switch (haCondition) {
    case 'sunny':
      return isNight ? 'clear-night' : 'clear-day';
    case 'clear-night':
      return isNight ? 'clear-night' : 'clear-day';
    case 'partlycloudy':
      return isNight ? 'partly-cloudy-night' : 'partly-cloudy-day';
    case 'cloudy':
      return 'cloudy';
    case 'rainy':
      return 'rain';
    case 'pouring':
      return 'rain';
    case 'snowy':
      return 'cloudy'; // no snow in tropics, show as cloudy
    case 'lightning':
      return isNight ? 'thunderstorms-night' : 'thunderstorms-day';
    case 'lightning-rainy':
      return isNight ? 'thunderstorms-night-rain' : 'thunderstorms-day-rain';
    case 'fog':
      return isNight ? 'fog-night' : 'fog-day';
    case 'windy':
    case 'windy-variant':
      return 'wind';
    case 'hail':
      return 'thunderstorms-rain';
    case 'exceptional':
      return isNight ? 'clear-night' : 'clear-day';
    default:
      return isNight ? 'clear-night' : 'clear-day';
  }
}

export interface ConditionInput {
  sensors: SensorData;
  isNight: boolean;
  sunElevation: number;
  speedUnit?: string;    // default: 'km/h'
  rainUnit?: string;     // default: 'mm/h'
  haCondition?: string;  // raw HA weather entity state (e.g. 'sunny', 'rainy')
  timestamp?: number;    // for sunrise/sunset hour determination; defaults to now
  aqiPm25?: number;      // PM2.5 value for smoke/haze overlay
  moonPhase?: string;    // moon phase name for moonrise/moonset
  latitude?: number;     // for moon elevation estimate
  longitude?: number;    // for moon elevation estimate
}

/**
 * Unified weather condition derivation.
 *
 * Combines sensor data with an optional HA weather entity state into a single
 * condition. Sensor data always takes priority; the HA condition fills in when
 * sensors can't detect a phenomenon (e.g. lightning, hail) or are missing.
 *
 * Used by both the live card and sky history reconstruction.
 *
 * Priority order:
 *   1. Rain / storm  (sensor rain_rate)
 *   2. HA-exclusive   (lightning, hail — no sensor equivalent)
 *   3. HA rain        (fallback when rain_rate sensor is missing)
 *   4. Fog            (sensor dew point spread, or HA fallback)
 *   5. Wind           (sensor wind_speed, or HA fallback)
 *   6. Cloud cover    (solar radiation → humidity → HA fallback)
 *   7. Twilight       (sunrise/sunset override for -6° to 4° elevation)
 *   8. Air quality    (smoke/haze overlay based on PM2.5)
 *   9. Moonrise/set   (moon near horizon during clear night)
 */
export function deriveCondition(input: ConditionInput): WeatherCondition {
  const base = deriveBaseCondition(input);

  // Post-processors only affect clear/partly-cloudy/starry/twilight conditions.
  // Rain, storms, fog, wind are never overridden.
  return applyMoonHorizon(
    applyAirQuality(base, input.aqiPm25),
    input.moonPhase, input.sunElevation, input.timestamp, input.latitude, input.longitude,
  );
}

/**
 * Core condition derivation — produces a base condition from sensor data,
 * HA entity state, and twilight override. Does NOT apply AQI or moon overlays.
 */
function deriveBaseCondition(input: ConditionInput): WeatherCondition {
  const { sensors, isNight, sunElevation, haCondition, timestamp } = input;
  const speedUnit = input.speedUnit || 'km/h';
  const rainUnit = input.rainUnit || 'mm/h';
  const { rain_rate, wind_speed, humidity, dew_point, temperature, solar_radiation } = sensors;

  // Map HA condition for fallback reference
  const haBase = haCondition ? mapHaCondition(haCondition, isNight) : null;

  // Normalize wind speed to km/h
  const windKmh = wind_speed !== undefined ? toKmh(wind_speed, speedUnit) : undefined;

  // Normalize rain rate to mm/h
  const rainMmh = (rain_rate !== undefined && rain_rate > 0)
    ? toMmh(rain_rate, rainUnit)
    : 0;

  // ── Priority 1: Heavy Storm (sensor) ─────────────────────────────────
  if (rainMmh >= 20) {
    return 'thunderstorms-rain';
  }

  // ── Priority 2: Thunderstorm rain (sensor) ───────────────────────────
  if (rainMmh >= 10) {
    return isNight ? 'thunderstorms-night-rain' : 'thunderstorms-day-rain';
  }

  // ── Priority 3: HA-exclusive conditions ──────────────────────────────
  if (haBase) {
    const haExclusive = haBase === 'thunderstorms-day' || haBase === 'thunderstorms-night'
      || haBase === 'thunderstorms-rain' || haBase === 'thunderstorms-day-rain'
      || haBase === 'thunderstorms-night-rain';
    if (haExclusive && rainMmh < 2.5) {
      return haBase;
    }
  }

  // ── Priority 4: Moderate to heavy rain (sensor) ──────────────────────
  if (rainMmh >= 2.5) {
    return 'rain';
  }

  // ── Priority 5a: Light rain 1.0–2.5 mm/h ─────────────────────────────
  if (rainMmh >= 1.0) {
    return isNight ? 'partly-cloudy-night-rain' : 'partly-cloudy-day-rain';
  }

  // ── Priority 5b: Drizzle 0.1–1.0 mm/h ──────────────────────────────
  if (rainMmh >= 0.1) {
    return isNight ? 'partly-cloudy-night-drizzle' : 'partly-cloudy-day-drizzle';
  }

  // ── Priority 6: HA rain fallback (no rain sensor) ────────────────────
  if (haBase && rain_rate === undefined) {
    const haRain = haBase === 'rain' || haBase === 'partly-cloudy-day-rain'
      || haBase === 'partly-cloudy-night-rain';
    if (haRain) return haBase;
  }

  // ── Priority 7: Fog (sensor or HA fallback) ──────────────────────────
  if (humidity !== undefined && temperature !== undefined && dew_point !== undefined) {
    const dpSpread = temperature - dew_point;
    if (humidity >= 97 && dpSpread <= 1.0) {
      return isNight ? 'fog-night' : 'fog-day';
    }
    if (humidity >= 95 && dpSpread <= 1.5) {
      return isNight ? 'fog-night' : 'fog-day';
    }
  } else if (haBase === 'fog-day' || haBase === 'fog-night') {
    return haBase;
  }

  // ── Priority 8: Wind (sensor or HA fallback) ─────────────────────────
  if (windKmh !== undefined && windKmh >= 50) {
    return 'wind';
  }
  if (haBase === 'wind' && wind_speed === undefined) {
    return 'wind';
  }

  // ── Priority 9: Cloud cover (day) - solar radiation ──────────────────
  if (!isNight && sunElevation > 3 && solar_radiation !== undefined) {
    const expected = clearSkyRadiation(sunElevation);
    if (expected > 20) {
      const cloudRatio = solar_radiation / expected;

      if (cloudRatio < 0.20) return applyTwilight('overcast-day', sunElevation, timestamp);
      if (cloudRatio < 0.50) return applyTwilight('cloudy', sunElevation, timestamp);
      if (cloudRatio < 0.75) return applyTwilight('partly-cloudy-day', sunElevation, timestamp);
      return applyTwilight('clear-day', sunElevation, timestamp);
    }
  }

  // ── Priority 10: Cloud cover (day) - humidity fallback ───────────────
  if (!isNight) {
    const solarReliable = solar_radiation !== undefined
      && sunElevation > 3
      && clearSkyRadiation(sunElevation) > 20;

    if (!solarReliable) {
      if (humidity !== undefined) {
        if (humidity >= 90) return applyTwilight('cloudy', sunElevation, timestamp);
        if (humidity >= 80) return applyTwilight('partly-cloudy-day', sunElevation, timestamp);
      }
      if (haBase === 'cloudy' || haBase === 'partly-cloudy-day') {
        return applyTwilight(haBase, sunElevation, timestamp);
      }
      return applyTwilight('clear-day', sunElevation, timestamp);
    }
  }

  // ── Priority 11: Cloud cover (night) - humidity ──────────────────────
  if (isNight) {
    if (humidity !== undefined) {
      if (humidity >= 92) return applyTwilight('overcast-night', sunElevation, timestamp);
      if (humidity >= 70) return applyTwilight('partly-cloudy-night', sunElevation, timestamp);
      if (humidity < 70) return applyTwilight('starry-night', sunElevation, timestamp);
    }
    if (haBase === 'partly-cloudy-night' || haBase === 'cloudy') {
      const mapped = haBase === 'cloudy' ? 'overcast-night' as WeatherCondition : haBase;
      return applyTwilight(mapped, sunElevation, timestamp);
    }
    return applyTwilight('clear-night', sunElevation, timestamp);
  }

  // Fallback
  return applyTwilight(
    isNight ? 'clear-night' : 'clear-day',
    sunElevation,
    timestamp,
  );
}

/**
 * Twilight / golden hour override (-6° to 4°).
 *
 * Shows sunrise/sunset icon instead of clear/partly-cloudy when the sun
 * is near the horizon. At 4° the sun is ~15 min after rise / before set
 * in the tropics — still low and orange.
 *
 * Only applies to non-precipitation, non-overcast conditions.
 */
function applyTwilight(
  condition: WeatherCondition,
  sunElevation: number,
  timestamp?: number,
): WeatherCondition {
  if (sunElevation < -6 || sunElevation > 4) return condition;

  const eligible = condition === 'clear-night' || condition === 'clear-day'
    || condition === 'partly-cloudy-day' || condition === 'partly-cloudy-night';
  if (!eligible) return condition;

  const hour = timestamp ? new Date(timestamp).getHours() : new Date().getHours();
  return hour < 12 ? 'sunrise' : 'sunset';
}

/**
 * Air quality overlay — smoke/haze when PM2.5 is elevated.
 *
 * Only transforms clear/partly-cloudy conditions (not rain, storms, fog, etc.).
 * Smoke (PM2.5 > 75) takes priority over haze (PM2.5 35–75).
 * During twilight (sunrise/sunset), AQI overlay is suppressed — the golden
 * hour colors already imply atmospheric scattering.
 */
function applyAirQuality(
  condition: WeatherCondition,
  aqiPm25?: number,
): WeatherCondition {
  if (aqiPm25 === undefined) return condition;

  // Smoke: PM2.5 > 75 (Unhealthy+)
  if (aqiPm25 > 75) {
    switch (condition) {
      case 'clear-day':
      case 'partly-cloudy-day':
        return 'partly-cloudy-day-smoke';
      case 'clear-night':
      case 'starry-night':
      case 'partly-cloudy-night':
        return 'partly-cloudy-night-smoke';
      default:
        return condition;
    }
  }

  // Haze: PM2.5 35–75 (Moderate to Unhealthy)
  if (aqiPm25 > 35) {
    switch (condition) {
      case 'clear-day':
        return 'haze-day';
      case 'clear-night':
      case 'starry-night':
        return 'haze-night';
      case 'partly-cloudy-day':
        return 'partly-cloudy-day-haze';
      case 'partly-cloudy-night':
        return 'partly-cloudy-night-haze';
      default:
        return condition;
    }
  }

  return condition;
}

/**
 * Moonrise / moonset overlay for clear nights.
 *
 * Uses a simplified moon transit model: the moon's hour angle relative
 * to its meridian transit determines whether it's rising, setting, or
 * high in the sky. Only applies when the sky is clear/starry and the
 * sun is well below the horizon (elevation < -6°).
 *
 * The moon transit time shifts ~50 min later each day. We estimate it
 * from the moon phase: new moon transits at solar noon, full moon at
 * solar midnight, and intermediate phases scale linearly.
 */
function applyMoonHorizon(
  condition: WeatherCondition,
  moonPhase?: string,
  sunElevation?: number,
  timestamp?: number,
  latitude?: number,
  longitude?: number,
): WeatherCondition {
  if (!moonPhase || sunElevation === undefined || sunElevation >= -6) return condition;
  if (latitude === undefined || longitude === undefined) return condition;

  // Only apply to clear night skies
  const eligible = condition === 'clear-night' || condition === 'starry-night';
  if (!eligible) return condition;

  // Estimate moon's hour angle from phase
  // Phase offset: hours after solar noon for moon's meridian transit
  const phaseOffsets: Record<string, number> = {
    'new_moon': 0,          // transits at ~noon (not visible at night)
    'waxing_crescent': 3,   // transits ~3pm, sets early evening
    'first_quarter': 6,     // transits ~6pm, sets ~midnight
    'waxing_gibbous': 9,    // transits ~9pm, sets ~3am
    'full_moon': 12,        // transits ~midnight
    'waning_gibbous': 15,   // transits ~3am, rises ~9pm
    'last_quarter': 18,     // transits ~6am, rises ~midnight
    'waning_crescent': 21,  // transits ~9am, rises ~3am
  };

  const transitOffset = phaseOffsets[moonPhase];
  if (transitOffset === undefined) return condition;

  // New moon never visible at night — skip
  if (moonPhase === 'new_moon') return condition;

  const now = timestamp ? new Date(timestamp) : new Date();
  const hourUTC = now.getUTCHours() + now.getUTCMinutes() / 60;
  const solarNoonUTC = 12 - longitude / 15;
  const moonTransitUTC = (solarNoonUTC + transitOffset) % 24;

  // Hour angle: how far the moon is from its highest point
  // Negative = rising (east), positive = setting (west)
  let hourAngle = hourUTC - moonTransitUTC;
  if (hourAngle > 12) hourAngle -= 24;
  if (hourAngle < -12) hourAngle += 24;

  // Moon is near the horizon when |hourAngle| is ~5-7 hours from transit
  // (approximate for most latitudes)
  const absHA = Math.abs(hourAngle);
  if (absHA >= 5 && absHA <= 7) {
    return hourAngle < 0 ? 'moonrise' : 'moonset';
  }

  return condition;
}

// ── HA entity helpers ──────────────────────────────────────────────────

export function getIsNight(hass: HomeAssistant): boolean {
  const sun = hass.states['sun.sun'];
  return sun?.state === 'below_horizon';
}

export function getSunElevation(hass: HomeAssistant): number | undefined {
  const sun = hass.states['sun.sun'];
  return sun?.attributes?.elevation;
}

export function getMoonPhase(hass: HomeAssistant, entityId = 'sensor.moon_phase'): string | undefined {
  const moon = hass.states[entityId];
  return moon?.state;
}
