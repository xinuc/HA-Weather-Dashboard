import { HomeAssistant } from 'custom-card-helpers';

export interface WeatherDashboardConfig {
  type: string;
  device_id?: string;
  weather_entity?: string;
  aqi_entity?: string;
  title?: string;
  animations?: boolean;
  gauge_max?: number;
  latitude?: number;
  longitude?: number;
  sensors?: Partial<Record<SensorRole, string>>;
}

export type SensorRole =
  | 'temperature'
  | 'feels_like'
  | 'humidity'
  | 'dew_point'
  | 'wind_chill'
  | 'heat_index'
  | 'wind_speed'
  | 'wind_bearing'
  | 'wind_gust'
  | 'rain_rate'
  | 'daily_rain'
  | 'pressure'
  | 'uv_index'
  | 'solar_radiation'
  | 'visibility'
  | 'soil_temp';

export interface SensorData {
  temperature?: number;
  feels_like?: number;
  humidity?: number;
  dew_point?: number;
  wind_chill?: number;
  heat_index?: number;
  wind_speed?: number;
  wind_bearing?: number;
  wind_gust?: number;
  rain_rate?: number;
  daily_rain?: number;
  pressure?: number;
  uv_index?: number;
  solar_radiation?: number;
  visibility?: number;
  soil_temp?: number;
}

export type WeatherCondition =
  | 'clear-day'
  | 'clear-night'
  | 'sunrise'
  | 'sunset'
  | 'starry-night'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night'
  | 'cloudy'
  | 'overcast-day'
  | 'overcast-night'
  | 'fog-day'
  | 'fog-night'
  | 'rain'
  | 'partly-cloudy-day-rain'
  | 'partly-cloudy-night-rain'
  | 'thunderstorms-day'
  | 'thunderstorms-night'
  | 'thunderstorms-day-rain'
  | 'thunderstorms-night-rain'
  | 'thunderstorms-rain'
  | 'wind';

export interface StatDefinition {
  key: SensorRole;
  label: string;
  icon: string;
  unit: { metric: string; imperial: string };
  decimals?: number;
}

export type { HomeAssistant };
