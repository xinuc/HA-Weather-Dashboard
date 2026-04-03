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
 * Compute dew point spread in the same unit as inputs.
 * Both temperature and dew_point must be in the same unit.
 */
function dewPointSpread(temperature: number, dewPoint: number): number {
  return temperature - dewPoint;
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
      return 'thunderstorms-rain';
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
 */
export function deriveCondition(input: ConditionInput): WeatherCondition {
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
  // Trust HA for conditions we can't detect with sensors (lightning, hail).
  // Only when sensor rain_rate doesn't indicate heavy rain (already handled above).
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

  // ── Priority 5: Light rain (sensor, >= 0.1 mm/h) ────────────────────
  if (rainMmh >= 0.1) {
    // Check for sun shower: light rain with significant solar radiation
    if (sunElevation > 5 && solar_radiation !== undefined) {
      const expected = clearSkyRadiation(sunElevation);
      if (expected > 20) {
        const cloudRatio = solar_radiation / expected;
        if (cloudRatio > 0.40) {
          return isNight ? 'partly-cloudy-night-rain' : 'partly-cloudy-day-rain';
        }
      }
    }
    return isNight ? 'partly-cloudy-night-rain' : 'partly-cloudy-day-rain';
  }

  // ── Priority 6: HA rain fallback (no rain sensor) ────────────────────
  if (haBase && rain_rate === undefined) {
    const haRain = haBase === 'rain' || haBase === 'partly-cloudy-day-rain'
      || haBase === 'partly-cloudy-night-rain';
    if (haRain) return haBase;
  }

  // ── Priority 7: Fog (sensor or HA fallback) ──────────────────────────
  if (humidity !== undefined && temperature !== undefined && dew_point !== undefined) {
    const spread = dewPointSpread(temperature, dew_point);
    if (humidity >= 97 && spread <= 1.0) {
      return isNight ? 'fog-night' : 'fog-day';
    }
    if (humidity >= 95 && spread <= 1.5) {
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
      // HA fallback for daytime cloud cover
      if (haBase === 'cloudy' || haBase === 'overcast-day' || haBase === 'partly-cloudy-day') {
        return applyTwilight(haBase, sunElevation, timestamp);
      }
      return applyTwilight('clear-day', sunElevation, timestamp);
    }
  }

  // ── Priority 11: Cloud cover (night) - humidity ──────────────────────
  // Tropical thresholds: 70-82% humidity is NOT clear in the tropics.
  // Only truly clear when humidity < 70% (rare in tropical maritime climate).
  if (isNight) {
    if (humidity !== undefined) {
      if (humidity >= 92) return applyTwilight('overcast-night', sunElevation, timestamp);
      if (humidity >= 70) return applyTwilight('partly-cloudy-night', sunElevation, timestamp);
      if (humidity < 70) return applyTwilight('starry-night', sunElevation, timestamp);
    }
    // HA fallback for nighttime cloud cover
    if (haBase === 'overcast-night' || haBase === 'partly-cloudy-night' || haBase === 'cloudy') {
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
