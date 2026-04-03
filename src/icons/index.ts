import { BEAUFORT_SCALE } from '../const';

// Stats icons
import humidity from './stats/humidity.svg';
import mist from './stats/mist.svg';
import pressureHigh from './stats/pressure-high.svg';
import pressureLow from './stats/pressure-low.svg';
import raindrop from './stats/raindrop.svg';
import raindrops from './stats/raindrops.svg';
import solarEclipse from './stats/solar-eclipse.svg';
import thermometerCelsius from './stats/thermometer-celsius.svg';
import thermometerColder from './stats/thermometer-colder.svg';
import thermometerFahrenheit from './stats/thermometer-fahrenheit.svg';
import thermometerGlassCelsius from './stats/thermometer-glass-celsius.svg';
import thermometerGlassFahrenheit from './stats/thermometer-glass-fahrenheit.svg';
import thermometerMercury from './stats/thermometer-mercury.svg';
import thermometerMercuryCold from './stats/thermometer-mercury-cold.svg';
import thermometerWarmer from './stats/thermometer-warmer.svg';
import uvIndex1 from './stats/uv-index-1.svg';
import uvIndex2 from './stats/uv-index-2.svg';
import uvIndex3 from './stats/uv-index-3.svg';
import uvIndex4 from './stats/uv-index-4.svg';
import uvIndex5 from './stats/uv-index-5.svg';
import uvIndex6 from './stats/uv-index-6.svg';
import uvIndex7 from './stats/uv-index-7.svg';
import uvIndex8 from './stats/uv-index-8.svg';
import uvIndex9 from './stats/uv-index-9.svg';
import uvIndex10 from './stats/uv-index-10.svg';
import uvIndex11 from './stats/uv-index-11.svg';
import windsock from './stats/windsock.svg';
import windBeaufort0 from './stats/wind-beaufort-0.svg';
import windBeaufort1 from './stats/wind-beaufort-1.svg';
import windBeaufort2 from './stats/wind-beaufort-2.svg';
import windBeaufort3 from './stats/wind-beaufort-3.svg';
import windBeaufort4 from './stats/wind-beaufort-4.svg';
import windBeaufort5 from './stats/wind-beaufort-5.svg';
import windBeaufort6 from './stats/wind-beaufort-6.svg';
import windBeaufort7 from './stats/wind-beaufort-7.svg';
import windBeaufort8 from './stats/wind-beaufort-8.svg';
import windBeaufort9 from './stats/wind-beaufort-9.svg';
import windBeaufort10 from './stats/wind-beaufort-10.svg';
import windBeaufort11 from './stats/wind-beaufort-11.svg';
import windBeaufort12 from './stats/wind-beaufort-12.svg';

// Condition icons
import clearDay from './conditions/clear-day.svg';
import clearNight from './conditions/clear-night.svg';
import cloudy from './conditions/cloudy.svg';
import fogDay from './conditions/fog-day.svg';
import fogNight from './conditions/fog-night.svg';
import notAvailable from './conditions/not-available.svg';
import overcastDay from './conditions/overcast-day.svg';
import overcastNight from './conditions/overcast-night.svg';
import partlyCloudyDay from './conditions/partly-cloudy-day.svg';
import partlyCloudyDayRain from './conditions/partly-cloudy-day-rain.svg';
import partlyCloudyNight from './conditions/partly-cloudy-night.svg';
import partlyCloudyNightRain from './conditions/partly-cloudy-night-rain.svg';
import rain from './conditions/rain.svg';
import starryNight from './conditions/starry-night.svg';
import sunrise from './conditions/sunrise.svg';
import sunset from './conditions/sunset.svg';
import thunderstorms from './conditions/thunderstorms.svg';
import thunderstormsDay from './conditions/thunderstorms-day.svg';
import thunderstormsDayRain from './conditions/thunderstorms-day-rain.svg';
import thunderstormsNight from './conditions/thunderstorms-night.svg';
import thunderstormsNightRain from './conditions/thunderstorms-night-rain.svg';
import thunderstormsRain from './conditions/thunderstorms-rain.svg';
import wind from './conditions/wind.svg';

// Moon icons
import moonNew from './moon/moon-new.svg';
import moonWaxingCrescent from './moon/moon-waxing-crescent.svg';
import moonFirstQuarter from './moon/moon-first-quarter.svg';
import moonWaxingGibbous from './moon/moon-waxing-gibbous.svg';
import moonFull from './moon/moon-full.svg';
import moonWaningGibbous from './moon/moon-waning-gibbous.svg';
import moonLastQuarter from './moon/moon-last-quarter.svg';
import moonWaningCrescent from './moon/moon-waning-crescent.svg';

// Gauge icons
import gaugeBeaufort1 from './gauge/wind-beaufort-1.svg';
import gaugeBeaufort3 from './gauge/wind-beaufort-3.svg';
import gaugeBeaufort5 from './gauge/wind-beaufort-5.svg';
import gaugeBeaufort7 from './gauge/wind-beaufort-7.svg';
import gaugeThunderstorms from './gauge/thunderstorms-rain.svg';
import gaugeHurricane from './gauge/hurricane.svg';

// Lookup maps
const STAT_ICONS: Record<string, string> = {
  'humidity': humidity,
  'mist': mist,
  'pressure-high': pressureHigh,
  'pressure-low': pressureLow,
  'raindrop': raindrop,
  'raindrops': raindrops,
  'solar-eclipse': solarEclipse,
  'thermometer-celsius': thermometerCelsius,
  'thermometer-colder': thermometerColder,
  'thermometer-fahrenheit': thermometerFahrenheit,
  'thermometer-glass-celsius': thermometerGlassCelsius,
  'thermometer-glass-fahrenheit': thermometerGlassFahrenheit,
  'thermometer-mercury': thermometerMercury,
  'thermometer-mercury-cold': thermometerMercuryCold,
  'thermometer-warmer': thermometerWarmer,
  'windsock': windsock,
  'wind-beaufort-0': windBeaufort0,
  'wind-beaufort-1': windBeaufort1,
  'wind-beaufort-2': windBeaufort2,
  'wind-beaufort-3': windBeaufort3,
  'wind-beaufort-4': windBeaufort4,
  'wind-beaufort-5': windBeaufort5,
  'wind-beaufort-6': windBeaufort6,
  'wind-beaufort-7': windBeaufort7,
  'wind-beaufort-8': windBeaufort8,
  'wind-beaufort-9': windBeaufort9,
  'wind-beaufort-10': windBeaufort10,
  'wind-beaufort-11': windBeaufort11,
  'wind-beaufort-12': windBeaufort12,
};

const UV_ICONS: string[] = [
  uvIndex1, uvIndex1, uvIndex2, uvIndex3, uvIndex4, uvIndex5,
  uvIndex6, uvIndex7, uvIndex8, uvIndex9, uvIndex10, uvIndex11,
];

const CONDITION_ICONS: Record<string, string> = {
  'clear-day': clearDay,
  'clear-night': clearNight,
  'cloudy': cloudy,
  'fog-day': fogDay,
  'fog-night': fogNight,
  'not-available': notAvailable,
  'overcast-day': overcastDay,
  'overcast-night': overcastNight,
  'partly-cloudy-day': partlyCloudyDay,
  'partly-cloudy-day-rain': partlyCloudyDayRain,
  'partly-cloudy-night': partlyCloudyNight,
  'partly-cloudy-night-rain': partlyCloudyNightRain,
  'rain': rain,
  'starry-night': starryNight,
  'sunrise': sunrise,
  'sunset': sunset,
  'thunderstorms': thunderstorms,
  'thunderstorms-day': thunderstormsDay,
  'thunderstorms-day-rain': thunderstormsDayRain,
  'thunderstorms-night': thunderstormsNight,
  'thunderstorms-night-rain': thunderstormsNightRain,
  'thunderstorms-rain': thunderstormsRain,
  'wind': wind,
};

const MOON_ICONS: Record<string, string> = {
  'new_moon': moonNew,
  'waxing_crescent': moonWaxingCrescent,
  'first_quarter': moonFirstQuarter,
  'waxing_gibbous': moonWaxingGibbous,
  'full_moon': moonFull,
  'waning_gibbous': moonWaningGibbous,
  'last_quarter': moonLastQuarter,
  'waning_crescent': moonWaningCrescent,
};

const GAUGE_ICONS: string[] = [
  gaugeBeaufort1, gaugeBeaufort3, gaugeBeaufort5,
  gaugeBeaufort7, gaugeThunderstorms, gaugeHurricane,
];

export function getStatIcon(
  iconName: string,
  role?: string,
  value?: number,
  units?: 'metric' | 'imperial',
): string {
  // Dynamic icons based on value
  if (role === 'uv_index' && value !== undefined) {
    const idx = Math.min(Math.max(Math.round(value), 0), 11);
    return UV_ICONS[idx] ?? UV_ICONS[0];
  }

  if (role === 'wind_speed' && value !== undefined) {
    // Convert to km/h if imperial (mph), then look up Beaufort scale
    const kmh = units === 'imperial' ? value * 1.60934 : value;
    let beaufort = BEAUFORT_SCALE.length - 1;
    for (let i = 0; i < BEAUFORT_SCALE.length; i++) {
      if (kmh <= BEAUFORT_SCALE[i].max) { beaufort = i; break; }
    }
    return STAT_ICONS[`wind-beaufort-${beaufort}`] ?? STAT_ICONS['wind-beaufort-0'];
  }

  if (role === 'pressure' && value !== undefined) {
    return value > 1013 ? STAT_ICONS['pressure-high'] : STAT_ICONS['pressure-low'];
  }

  // Unit-aware temperature icons
  if (units === 'imperial') {
    if (iconName === 'thermometer-celsius') return STAT_ICONS['thermometer-fahrenheit'];
    if (iconName === 'thermometer-glass-celsius') return STAT_ICONS['thermometer-glass-fahrenheit'];
  }

  return STAT_ICONS[iconName] ?? notAvailable;
}

export function getConditionIcon(condition: string): string {
  // Condition names map directly to icon names
  return CONDITION_ICONS[condition] ?? CONDITION_ICONS['not-available'];
}

export function getMoonIcon(phase: string): string {
  return MOON_ICONS[phase] ?? moonFull;
}

export function getGaugeIcon(index: number): string {
  return GAUGE_ICONS[Math.min(index, GAUGE_ICONS.length - 1)];
}
