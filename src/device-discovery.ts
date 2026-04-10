import { HomeAssistant, SensorRole } from './types';

interface EntityMatch {
  entity_id: string;
  device_class?: string;
  friendly_name?: string;
}

// Match by friendly_name content OR entity_id suffix (WU parameter names).
// HA may prefix friendly_name with device name, so we use contains-match, not exact.
// Order matters: specific roles (feels_like, dew_point) must come before generic (temperature).
const ROLE_MATCHERS: Array<{
  role: SensorRole;
  match: (e: EntityMatch) => boolean;
}> = [
  { role: 'feels_like', match: (e) => e.device_class === 'temperature' && (/feels.?like/i.test(e.friendly_name ?? '') || /feelslike/i.test(e.entity_id)) },
  { role: 'wind_chill', match: (e) => e.device_class === 'temperature' && (/wind.?chill/i.test(e.friendly_name ?? '') || /windchill/i.test(e.entity_id)) },
  { role: 'heat_index', match: (e) => e.device_class === 'temperature' && (/heat.?index/i.test(e.friendly_name ?? '') || /heatindex/i.test(e.entity_id)) },
  { role: 'dew_point', match: (e) => e.device_class === 'temperature' && (/dew.?p/i.test(e.friendly_name ?? '') || /dewpt/i.test(e.entity_id)) },
  { role: 'soil_temp', match: (e) => e.device_class === 'temperature' && (/soil/i.test(e.friendly_name ?? '') || /soiltemp\d*f?$/i.test(e.entity_id)) },
  { role: 'temperature', match: (e) => e.device_class === 'temperature' && !/indoor/i.test(e.friendly_name ?? '') && !/indoor/i.test(e.entity_id) && (/temperature/i.test(e.friendly_name ?? '') || /_tempf$/i.test(e.entity_id)) },
  { role: 'humidity', match: (e) => e.device_class === 'humidity' && !/indoor/i.test(e.friendly_name ?? '') && !/indoor/i.test(e.entity_id) },
  { role: 'wind_gust', match: (e) => e.device_class === 'wind_speed' && (/gust/i.test(e.friendly_name ?? '') || /windgust/i.test(e.entity_id)) },
  { role: 'wind_speed', match: (e) => e.device_class === 'wind_speed' && !/gust/i.test(e.friendly_name ?? '') && !/gust/i.test(e.entity_id) },
  { role: 'wind_bearing', match: (e) => (e.device_class === 'wind_direction' || /winddir$/i.test(e.entity_id)) && !/gust/i.test(e.entity_id) },
  { role: 'rain_rate', match: (e) => e.device_class === 'precipitation_intensity' || /_rainin$/i.test(e.entity_id) },
  { role: 'daily_rain', match: (e) => (e.device_class === 'precipitation' && /daily/i.test(e.friendly_name ?? '')) || /dailyrainin$/i.test(e.entity_id) },
  { role: 'pressure', match: (e) => e.device_class === 'atmospheric_pressure' && !/abs/i.test(e.friendly_name ?? '') && !/abs/i.test(e.entity_id) },
  { role: 'uv_index', match: (e) => /uv/i.test(e.entity_id) && !/indoor/i.test(e.entity_id) },
  { role: 'solar_radiation', match: (e) => e.device_class === 'irradiance' || /solarradiation/i.test(e.entity_id) },
  { role: 'visibility', match: (e) => /visibility/i.test(e.entity_id) },
  { role: 'aqi', match: (e) => e.device_class === 'pm25' || /pm2[._]?5/i.test(e.entity_id) || /aqi.*pm/i.test(e.entity_id) },
];

function discoverSensors(
  hass: HomeAssistant,
  deviceId: string,
): Partial<Record<SensorRole, string>> {
  const result: Partial<Record<SensorRole, string>> = {};
  const assigned = new Set<string>();
  const candidates: EntityMatch[] = [];

  // Try HA device registry lookup first (device picker stores registry ID)
  const entityRegistry = (hass as any).entities;
  if (entityRegistry) {
    for (const [entityId, entry] of Object.entries(entityRegistry as Record<string, any>)) {
      if (entry.device_id === deviceId && entityId.startsWith('sensor.')) {
        const state = hass.states[entityId];
        if (state) {
          candidates.push({
            entity_id: entityId,
            device_class: state.attributes.device_class,
            friendly_name: state.attributes.friendly_name,
          });
        }
      }
    }
  }

  // Fallback: prefix-based discovery (backward compat with station ID string)
  if (candidates.length === 0) {
    const prefix = `sensor.wu_${deviceId.toLowerCase()}_`;
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
