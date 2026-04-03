import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { WeatherDashboardConfig, HomeAssistant, SensorData, SensorRole, WeatherCondition } from './types';
import { STAT_DEFINITIONS } from './const';
import { dashboardStyles } from './styles/dashboard';
import { resolveSensorEntities } from './device-discovery';
import { deriveCondition, mapHaCondition, getIsNight, getSunElevation, getMoonPhase } from './condition-engine';
import { computeSkyGradient, SkyGradient, SkyInputs } from './sky-color';
import { SkyHistoryStore } from './sky-history-store';
import { formatValue, getBeaufortLabel, bearingToDirection, toKmh } from './utils';
import { getStatIcon } from './icons';

import './editor';
import './components/weather-scene';
import './components/sky-history';
import './components/wind-compass';
import './components/wind-gauge';
import './components/stat-card';

@customElement('weather-dashboard-card')
export class WeatherDashboardCard extends LitElement {
  @state() private _config!: WeatherDashboardConfig;
  @state() private _skyHistoryOpen = false;
  private _hass!: HomeAssistant;
  private _entities: Partial<Record<SensorRole, string>> = {};
  private _skyHistoryStore = new SkyHistoryStore();
  private _resizeObserver?: ResizeObserver;
  private _intersectionObserver?: IntersectionObserver;

  static styles = dashboardStyles;

  set hass(hass: HomeAssistant) {
    const oldHass = this._hass;
    this._hass = hass;

    // Resolve entities on first hass or when entity count changes
    if (!oldHass || (this._config?.device_id && this._shouldRediscover(oldHass))) {
      this._entities = resolveSensorEntities(hass, this._config);
    }

    // Only re-render if watched entities changed
    if (this._hasRelevantChange(oldHass)) {
      this.requestUpdate();
    }
  }

  get hass(): HomeAssistant {
    return this._hass;
  }

  private _shouldRediscover(oldHass: HomeAssistant): boolean {
    const entityCount = Object.keys(this._hass.states).length;
    const oldCount = Object.keys(oldHass.states).length;
    return entityCount !== oldCount;
  }

  private _hasRelevantChange(oldHass: HomeAssistant | undefined): boolean {
    if (!oldHass) return true;
    const watched = this._getWatchedEntities();
    return watched.some((id) => oldHass.states[id] !== this._hass.states[id]);
  }

  private _getWatchedEntities(): string[] {
    const entities: string[] = ['sun.sun', 'sensor.moon_phase'];
    for (const entityId of Object.values(this._entities)) {
      if (entityId) entities.push(entityId);
    }
    if (this._config?.weather_entity) {
      entities.push(this._config.weather_entity);
    }
    if (this._config?.aqi_entity) {
      entities.push(this._config.aqi_entity);
    }
    return entities;
  }

  static getConfigElement() {
    return document.createElement('weather-dashboard-card-editor');
  }

  static getStubConfig() {
    return { device_id: '' };
  }

  setConfig(config: WeatherDashboardConfig): void {
    if (!config.device_id && !config.weather_entity) {
      throw new Error('Please define a device_id or weather_entity');
    }
    this._config = {
      animations: true,
      gauge_max: 50,
      title: 'Weather Dashboard',
      ...config,
    };
    if (this._hass) {
      this._entities = resolveSensorEntities(this._hass, this._config);
    }
  }

  getCardSize(): number {
    return 8;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6, rows: 5, min_rows: 3 };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      this.toggleAttribute('narrow', width < 500);
      this.toggleAttribute('medium', width >= 500 && width < 768);
      this.toggleAttribute('wide', width >= 768);
    });
    this._resizeObserver.observe(this);

    this._intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (this._config?.animations !== false) {
          this.toggleAttribute('offscreen', !entry.isIntersecting);
        }
      },
      { threshold: 0.1 },
    );
    this._intersectionObserver.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._intersectionObserver?.disconnect();
  }

  // Get entity state object for a sensor role
  private _getEntityState(role: SensorRole) {
    const entityId = this._entities[role];
    if (entityId) {
      const s = this._hass?.states[entityId];
      if (s && s.state !== 'unavailable' && s.state !== 'unknown') return s;
    }
    return undefined;
  }

  // Read a sensor value — already converted by HA to user's unit system
  private _getValue(role: SensorRole): number | undefined {
    const s = this._getEntityState(role);
    if (s) {
      const val = parseFloat(s.state);
      if (isFinite(val)) return val;
      return undefined;
    }

    // Fallback to weather entity attributes
    if (this._config?.weather_entity) {
      const weather = this._hass?.states[this._config.weather_entity];
      if (weather) {
        const attrMap: Partial<Record<SensorRole, string>> = {
          temperature: 'temperature',
          humidity: 'humidity',
          pressure: 'pressure',
          wind_speed: 'wind_speed',
          wind_bearing: 'wind_bearing',
          visibility: 'visibility',
        };
        const attr = attrMap[role];
        if (attr && weather.attributes[attr] !== undefined) {
          return weather.attributes[attr];
        }
      }
    }

    return undefined;
  }

  // Get the unit_of_measurement for a sensor role
  private _getUnit(role: SensorRole): string {
    const s = this._getEntityState(role);
    if (s?.attributes?.unit_of_measurement) {
      return s.attributes.unit_of_measurement;
    }

    // Fallback: infer from weather entity unit system
    if (this._config?.weather_entity) {
      const weather = this._hass?.states[this._config.weather_entity];
      if (weather) {
        const tempUnit = weather.attributes?.temperature_unit ?? '°C';
        const isMetric = tempUnit === '°C';
        const def = STAT_DEFINITIONS.find((d) => d.key === role);
        if (def) return def.unit[isMetric ? 'metric' : 'imperial'];
      }
    }

    // Last resort: check HA locale config
    const def = STAT_DEFINITIONS.find((d) => d.key === role);
    if (def) {
      const isMetric = this._isHaMetric();
      return def.unit[isMetric ? 'metric' : 'imperial'];
    }
    return '';
  }

  // Check if HA is configured for metric
  private _isHaMetric(): boolean {
    try {
      const locale = (this._hass as any).locale;
      if (locale?.number_format) {
        // HA 2023.3+ has unit_system in config
      }
      const config = (this._hass as any).config;
      if (config?.unit_system) {
        return config.unit_system.temperature === '°C';
      }
    } catch { /* ignore */ }
    return true; // default metric
  }

  // Get all sensor data — values are already in user's preferred units from HA
  private _getSensorData(): SensorData {
    const data: SensorData = {};

    for (const def of STAT_DEFINITIONS) {
      const raw = this._getValue(def.key);
      if (raw !== undefined) {
        (data as Record<string, number>)[def.key] = raw;
      }
    }

    // Wind bearing is always in degrees
    const bearing = this._getValue('wind_bearing');
    if (bearing !== undefined) data.wind_bearing = bearing;

    return data;
  }

  private _getCondition(isNight: boolean, elevation: number): WeatherCondition {
    // Weather entity provides condition directly — map to our condition set
    if (this._config?.weather_entity) {
      const weather = this._hass?.states[this._config.weather_entity];
      if (weather?.state) {
        return mapHaCondition(weather.state, isNight);
      }
    }

    // Derive from sensor data
    const data = this._getSensorData();
    const speedUnit = this._getUnit('wind_speed') || 'km/h';
    const rainUnit = this._getUnit('rain_rate') || 'mm/h';

    return deriveCondition({
      sensors: data,
      isNight,
      sunElevation: elevation,
      speedUnit,
      rainUnit,
    });
  }

  /**
   * Approximate moon illumination (0-1) from HA moon phase name.
   * Used by the sky color engine for night sky brightness.
   */
  private _getMoonIllumination(phase?: string): number {
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

  private _toggleSkyHistory(): void {
    this._skyHistoryOpen = !this._skyHistoryOpen;
  }

  private _closeSkyHistory(): void {
    this._skyHistoryOpen = false;
  }

  private _getLocationName(): string {
    try {
      return (this._hass as any).config?.location_name ?? '';
    } catch {
      return '';
    }
  }

  private _formatDate(): string {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }

  render() {
    if (!this._config || !this._hass) {
      return html`<ha-card><div style="padding:16px">Loading...</div></ha-card>`;
    }

    const data = this._getSensorData();
    const isNight = getIsNight(this._hass);
    const elevation = getSunElevation(this._hass) ?? (isNight ? -10 : 30);
    const condition = this._getCondition(isNight, elevation);
    const moonPhase = getMoonPhase(this._hass);
    const location = this._getLocationName();

    // Units from actual entities
    const tempUnit = this._getUnit('temperature') || '°C';
    const speedUnit = this._getUnit('wind_speed') || 'km/h';

    // Dynamic sky: enabled when lat/lng available (from config or HA)
    const hasLatLng = (this._config.latitude !== undefined && this._config.longitude !== undefined)
      || (this._hass as any).config?.latitude !== undefined;
    const useDynamicSky = hasLatLng;

    // Moon illumination (0-1) from moon phase name
    const moonIllumination = this._getMoonIllumination(moonPhase);

    // Sky history: compute gradient and record state
    const STARS_CONDITIONS: WeatherCondition[] = ['clear-night', 'starry-night', 'partly-cloudy-night'];
    const MOON_CONDITIONS: WeatherCondition[] = ['clear-night', 'starry-night'];
    const showStars = STARS_CONDITIONS.includes(condition);
    const showMoon = elevation < -6 && !!moonPhase && MOON_CONDITIONS.includes(condition);

    if (useDynamicSky) {
      const skyInputs: SkyInputs = {
        sunElevation: elevation,
        solarRadiation: data.solar_radiation,
        uvIndex: data.uv_index,
        humidity: data.humidity,
        rainRate: data.rain_rate,
        moonIllumination,
        isNight,
      };
      const skyGradient = computeSkyGradient(skyInputs);

      this._skyHistoryStore.record({
        condition,
        skyGradient,
        temperature: data.temperature,
        showStars,
        showMoon,
        moonPhase,
      });
    }

    // AQI
    let aqiValue: number | undefined;
    if (this._config.aqi_entity) {
      const aqiState = this._hass.states[this._config.aqi_entity];
      if (aqiState && aqiState.state !== 'unavailable' && aqiState.state !== 'unknown') {
        const val = parseFloat(aqiState.state);
        if (isFinite(val)) aqiValue = val;
      }
    }

    // Wind
    const windSpeed = data.wind_speed ?? 0;
    const windBearing = data.wind_bearing ?? 0;
    const windDir = bearingToDirection(windBearing);
    const windSpeedKmh = toKmh(windSpeed, speedUnit);
    const beaufortLabel = getBeaufortLabel(windSpeedKmh);

    // Determine unit system for icon selection
    const isMetric = tempUnit === '°C';
    const unitSystem = isMetric ? 'metric' : 'imperial';

    return html`
      <ha-card>
        <!-- Header -->
        <div class="header">
          <div class="header-left">
            <span class="header-title">${this._config.title}</span>
            ${location ? html`<span class="header-location">${location}</span>` : ''}
          </div>
          <span class="header-date">${this._formatDate()}</span>
        </div>

        <!-- Main panels -->
        <div class="main-panels">
          <!-- Left: Weather Scene -->
          <div class="panel">
            <wdb-weather-scene
              .condition=${condition}
              .isNight=${isNight}
              .elevation=${elevation}
              .temperature=${data.temperature}
              .tempUnit=${tempUnit}
              .uvIndex=${data.uv_index}
              .windSpeed=${data.wind_speed}
              .windSpeedUnit=${speedUnit}
              .rainRate=${data.rain_rate}
              .rainRateUnit=${this._getUnit('rain_rate') || 'mm/h'}
              .solarRadiation=${data.solar_radiation}
              .humidity=${data.humidity}
              .moonIllumination=${moonIllumination}
              .aqiValue=${aqiValue}
              .moonPhase=${moonPhase}
              .useDynamicSky=${useDynamicSky}
              .skyHistoryEntries=${this._skyHistoryStore.entries}
              .skyHistoryOpen=${this._skyHistoryOpen}
              @icon-click=${this._toggleSkyHistory}
              @history-close=${this._closeSkyHistory}
            ></wdb-weather-scene>
          </div>

          <!-- Right: Wind Panel -->
          <div class="panel">
            <div class="wind-panel">
              <div class="wind-instruments">
                <!-- Compass -->
                <div class="wind-instrument">
                  <div class="wind-sublabel">Wind Direction</div>
                  <div class="wind-svg-container">
                    <wdb-wind-compass .bearing=${windBearing}></wdb-wind-compass>
                  </div>
                  <div class="wind-value">
                    <div class="wind-value-primary">${Math.round(windBearing)}° ${windDir}</div>
                  </div>
                </div>
                <!-- Gauge -->
                <div class="wind-instrument">
                  <div class="wind-sublabel">Wind Speed</div>
                  <div class="gauge-svg-container">
                    <wdb-wind-gauge
                      .speed=${windSpeedKmh}
                      .maxSpeed=${this._config.gauge_max ?? 50}
                    ></wdb-wind-gauge>
                  </div>
                  <div class="wind-value">
                    <div class="wind-value-primary">${Math.round(windSpeed)} ${speedUnit}</div>
                    <div class="wind-value-secondary">${beaufortLabel}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="stats-section">
          <div class="stats-label">Statistics (Live Updates)</div>
          <div class="stats-grid">
            ${this._renderStats(data, unitSystem)}
          </div>
        </div>

      </ha-card>
    `;
  }

  private _renderStats(data: SensorData, unitSystem: 'metric' | 'imperial') {
    return STAT_DEFINITIONS.map((def) => {
      const value = (data as Record<string, number | undefined>)[def.key];
      if (value === undefined) return '';

      const formatted = formatValue(value, def.key);
      const unit = this._getUnit(def.key);
      const icon = getStatIcon(def.icon, def.key, value, unitSystem);

      return html`
        <wdb-stat-card
          .name=${def.label}
          .value=${formatted}
          .unit=${unit}
          .icon=${icon}
        ></wdb-stat-card>
      `;
    });
  }
}

// Register with HA
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'weather-dashboard-card',
  name: 'Weather Dashboard',
  description: 'Animated weather dashboard with compass and gauges',
  preview: true,
});
