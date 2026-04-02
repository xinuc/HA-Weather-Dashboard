import { StatDefinition, WeatherCondition } from './types';

export const STAT_DEFINITIONS: StatDefinition[] = [
  { key: 'temperature', label: 'Temperature', icon: 'thermometer-celsius', unit: { metric: '°C', imperial: '°F' } },
  { key: 'feels_like', label: 'Feels Like', icon: 'thermometer-glass-celsius', unit: { metric: '°C', imperial: '°F' } },
  { key: 'humidity', label: 'Humidity', icon: 'humidity', unit: { metric: '%', imperial: '%' } },
  { key: 'dew_point', label: 'Dew Point', icon: 'thermometer-mercury-cold', unit: { metric: '°C', imperial: '°F' } },
  { key: 'uv_index', label: 'UV Index', icon: 'uv-index', unit: { metric: '', imperial: '' } },
  { key: 'wind_speed', label: 'Wind Speed', icon: 'wind-beaufort-0', unit: { metric: 'km/h', imperial: 'mph' } },
  { key: 'wind_gust', label: 'Wind Gust', icon: 'windsock', unit: { metric: 'km/h', imperial: 'mph' } },
  { key: 'rain_rate', label: 'Rain Rate', icon: 'raindrop', unit: { metric: 'mm/h', imperial: 'in/h' } },
  { key: 'daily_rain', label: 'Daily Rain', icon: 'raindrops', unit: { metric: 'mm', imperial: 'in' } },
  { key: 'pressure', label: 'Pressure', icon: 'pressure-low', unit: { metric: 'hPa', imperial: 'inHg' } },
  { key: 'visibility', label: 'Visibility', icon: 'mist', unit: { metric: 'km', imperial: 'mi' } },
  { key: 'solar_radiation', label: 'Solar Rad.', icon: 'solar-eclipse', unit: { metric: 'W/m²', imperial: 'W/m²' } },
  { key: 'wind_chill', label: 'Wind Chill', icon: 'thermometer-colder', unit: { metric: '°C', imperial: '°F' } },
  { key: 'heat_index', label: 'Heat Index', icon: 'thermometer-warmer', unit: { metric: '°C', imperial: '°F' } },
  { key: 'soil_temp', label: 'Soil Temp', icon: 'thermometer-mercury', unit: { metric: '°C', imperial: '°F' } },
];

export const BEAUFORT_SCALE: Array<{ max: number; label: string }> = [
  { max: 1, label: 'Calm' },
  { max: 5, label: 'Light Air' },
  { max: 11, label: 'Light Breeze' },
  { max: 19, label: 'Gentle Breeze' },
  { max: 28, label: 'Moderate Breeze' },
  { max: 38, label: 'Fresh Breeze' },
  { max: 49, label: 'Strong Breeze' },
  { max: 61, label: 'Near Gale' },
  { max: 74, label: 'Gale' },
  { max: 88, label: 'Strong Gale' },
  { max: 102, label: 'Storm' },
  { max: 117, label: 'Violent Storm' },
  { max: Infinity, label: 'Hurricane' },
];

export const CONDITION_LABELS: Record<WeatherCondition, string> = {
  'clear-day': 'Clear',
  'clear-night': 'Clear Night',
  'starry-night': 'Starry Night',
  'partly-cloudy-day': 'Partly Cloudy',
  'partly-cloudy-night': 'Partly Cloudy',
  'cloudy': 'Cloudy',
  'overcast-day': 'Overcast',
  'overcast-night': 'Overcast',
  'fog-day': 'Fog',
  'fog-night': 'Fog',
  'rain': 'Rain',
  'partly-cloudy-day-rain': 'Light Rain',
  'partly-cloudy-night-rain': 'Light Rain',
  'thunderstorms-day': 'Thunderstorm',
  'thunderstorms-night': 'Thunderstorm',
  'thunderstorms-day-rain': 'Thunderstorm',
  'thunderstorms-night-rain': 'Thunderstorm',
  'thunderstorms-rain': 'Heavy Storm',
  'wind': 'Windy',
};

export const COMPASS_POINTS = [
  'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
  'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW',
];

export const AQI_LEVELS = [
  { max: 15, label: 'Excellent', color: '#2196F3', stroke: '#fff' },
  { max: 30, label: 'Good', color: '#4CAF50', stroke: '#fff' },
  { max: 50, label: 'Moderate', color: '#FFEB3B', stroke: '#333' },
  { max: 75, label: 'Unhealthy', color: '#FF9800', stroke: '#333' },
  { max: 100, label: 'Very Bad', color: '#F44336', stroke: '#fff' },
  { max: 200, label: 'Hazardous', color: '#9C27B0', stroke: '#fff' },
  { max: Infinity, label: 'Toxic', color: '#1a1a1a', stroke: '#fff' },
];
