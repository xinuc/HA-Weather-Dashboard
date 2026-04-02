import { BEAUFORT_SCALE, COMPASS_POINTS } from './const';

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

export function computeShortestRotation(newAngle: number, oldAngle: number): number {
  let diff = newAngle - oldAngle;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return oldAngle + diff;
}
