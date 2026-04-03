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
 */
export function mapHaCondition(haCondition: string, isNight: boolean): WeatherCondition {
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
  speedUnit: string;   // unit_of_measurement of wind_speed entity
  rainUnit: string;    // unit_of_measurement of rain_rate entity
}

/**
 * Derive weather condition from sensor data.
 * Priority-based detection tuned for tropical climate (Java, Indonesia).
 */
export function deriveCondition(input: ConditionInput): WeatherCondition {
  const { sensors, isNight, sunElevation, speedUnit, rainUnit } = input;
  const { rain_rate, wind_speed, humidity, dew_point, temperature, solar_radiation } = sensors;

  // Normalize wind speed to km/h
  const windKmh = wind_speed !== undefined ? toKmh(wind_speed, speedUnit) : 0;

  // Normalize rain rate to mm/h
  const rainMmh = (rain_rate !== undefined && rain_rate > 0)
    ? toMmh(rain_rate, rainUnit)
    : 0;

  // --- Priority 1: Heavy Storm ---
  if (rainMmh >= 20) {
    return 'thunderstorms-rain';
  }

  // --- Priority 2: Thunderstorm inference ---
  if (rainMmh >= 10) {
    return isNight ? 'thunderstorms-night-rain' : 'thunderstorms-day-rain';
  }

  // --- Priority 3: Moderate to heavy rain ---
  if (rainMmh >= 2.5) {
    return 'rain';
  }

  // --- Priority 4: Light rain (>= 0.1 mm/h) ---
  if (rainMmh >= 0.1) {
    // Check for sun shower: light rain with significant solar radiation
    if (sunElevation > 5 && solar_radiation !== undefined) {
      const expected = clearSkyRadiation(sunElevation);
      if (expected > 20) {
        const cloudRatio = solar_radiation / expected;
        if (cloudRatio > 0.40) {
          // Sun is partially visible → sun shower
          return isNight ? 'partly-cloudy-night-rain' : 'partly-cloudy-day-rain';
        }
      }
    }

    return isNight ? 'partly-cloudy-night-rain' : 'partly-cloudy-day-rain';
  }

  // --- Priority 5: Fog ---
  if (humidity !== undefined && temperature !== undefined && dew_point !== undefined) {
    const spread = dewPointSpread(temperature, dew_point);
    if (humidity >= 97 && spread <= 1.0) {
      return isNight ? 'fog-night' : 'fog-day';
    }
    if (humidity >= 95 && spread <= 1.5) {
      return isNight ? 'fog-night' : 'fog-day';
    }
  }

  // --- Priority 6: Wind ---
  if (windKmh >= 50) {
    return 'wind';
  }

  // --- Priority 7: Cloud cover (day) - solar radiation method ---
  if (!isNight && sunElevation > 3 && solar_radiation !== undefined) {
    const expected = clearSkyRadiation(sunElevation);
    if (expected > 20) {
      const cloudRatio = solar_radiation / expected;

      if (cloudRatio < 0.20) return 'overcast-day';
      if (cloudRatio < 0.50) return 'cloudy';
      if (cloudRatio < 0.75) return 'partly-cloudy-day';
      return 'clear-day';
    }
  }

  // --- Priority 8: Cloud cover (day) - humidity fallback ---
  // Used when solar radiation is unavailable OR unreliable (low sun angle)
  if (!isNight) {
    const solarReliable = solar_radiation !== undefined
      && sunElevation > 3
      && clearSkyRadiation(sunElevation) > 20;

    if (!solarReliable) {
      if (humidity !== undefined) {
        if (humidity >= 90) return 'cloudy';
        if (humidity >= 80) return 'partly-cloudy-day';
      }
      return 'clear-day';
    }
  }

  // --- Priority 9: Cloud cover (night) ---
  if (isNight) {
    if (humidity !== undefined) {
      if (humidity >= 92) return 'overcast-night';
      if (humidity >= 82) return 'partly-cloudy-night';
      if (humidity < 70) return 'starry-night';
    }
    return 'clear-night';
  }

  // Fallback: day with low sun elevation and solar radiation available but sun <= 3°
  return isNight ? 'clear-night' : 'clear-day';
}

// --- HA entity helpers ---

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
