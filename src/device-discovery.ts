import { HomeAssistant, SensorRole } from './types';

interface EntityMatch {
  entity_id: string;
  device_class?: string;
  friendly_name?: string;
}

const ROLE_MATCHERS: Array<{
  role: SensorRole;
  match: (e: EntityMatch) => boolean;
}> = [
  { role: 'feels_like', match: (e) => e.device_class === 'temperature' && /feels.?like/i.test(e.friendly_name ?? '') },
  { role: 'wind_chill', match: (e) => e.device_class === 'temperature' && /wind.?chill/i.test(e.friendly_name ?? '') },
  { role: 'heat_index', match: (e) => e.device_class === 'temperature' && /heat.?index/i.test(e.friendly_name ?? '') },
  { role: 'dew_point', match: (e) => e.device_class === 'temperature' && /dew.?p/i.test(e.friendly_name ?? '') },
  { role: 'soil_temp', match: (e) => e.device_class === 'temperature' && /soil/i.test(e.friendly_name ?? '') },
  { role: 'temperature', match: (e) => e.device_class === 'temperature' && /^temperature$/i.test(e.friendly_name ?? '') },
  { role: 'humidity', match: (e) => e.device_class === 'humidity' && !/indoor/i.test(e.friendly_name ?? '') },
  { role: 'wind_gust', match: (e) => e.device_class === 'wind_speed' && /gust/i.test(e.friendly_name ?? '') && !/10m|avg|dir/i.test(e.friendly_name ?? '') },
  { role: 'wind_speed', match: (e) => e.device_class === 'wind_speed' && !/gust|avg|10m/i.test(e.friendly_name ?? '') },
  { role: 'wind_bearing', match: (e) => (e.device_class === 'wind_direction' || /wind.?dir/i.test(e.entity_id)) && !/gust|avg/i.test(e.friendly_name ?? '') },
  { role: 'rain_rate', match: (e) => e.device_class === 'precipitation_intensity' },
  { role: 'daily_rain', match: (e) => e.device_class === 'precipitation' && /daily/i.test(e.friendly_name ?? '') },
  { role: 'pressure', match: (e) => e.device_class === 'atmospheric_pressure' && !/abs/i.test(e.friendly_name ?? '') },
  { role: 'uv_index', match: (e) => /uv/i.test(e.entity_id) },
  { role: 'solar_radiation', match: (e) => e.device_class === 'irradiance' },
  { role: 'visibility', match: (e) => /visibility/i.test(e.entity_id) },
];

export function discoverSensors(
  hass: HomeAssistant,
  deviceId: string,
): Partial<Record<SensorRole, string>> {
  const prefix = `sensor.wu_${deviceId.toLowerCase()}_`;
  const result: Partial<Record<SensorRole, string>> = {};
  const assigned = new Set<string>();

  // Collect all matching entities
  const candidates: EntityMatch[] = [];
  for (const entityId of Object.keys(hass.states)) {
    if (entityId.startsWith(prefix)) {
      const state = hass.states[entityId];
      candidates.push({
        entity_id: entityId,
        device_class: state.attributes.device_class,
        friendly_name: state.attributes.friendly_name,
      });
    }
  }

  // Match roles in priority order
  for (const matcher of ROLE_MATCHERS) {
    if (result[matcher.role]) continue;
    for (const candidate of candidates) {
      if (assigned.has(candidate.entity_id)) continue;
      if (matcher.match(candidate)) {
        result[matcher.role] = candidate.entity_id;
        assigned.add(candidate.entity_id);
        break;
      }
    }
  }

  return result;
}

export function resolveSensorEntities(
  hass: HomeAssistant,
  config: { device_id?: string; weather_entity?: string; sensors?: Partial<Record<SensorRole, string>> },
): Partial<Record<SensorRole, string>> {
  let entities: Partial<Record<SensorRole, string>> = {};

  // Auto-discover from device_id
  if (config.device_id) {
    entities = discoverSensors(hass, config.device_id);
  }

  // Manual overrides take precedence
  if (config.sensors) {
    for (const [role, entityId] of Object.entries(config.sensors)) {
      if (entityId) {
        entities[role as SensorRole] = entityId;
      }
    }
  }

  return entities;
}
