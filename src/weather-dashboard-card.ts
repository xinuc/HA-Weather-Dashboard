import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { WeatherDashboardConfig, HomeAssistant, SensorData, SensorRole, WeatherCondition } from './types';
import { STAT_DEFINITIONS } from './const';
import { dashboardStyles } from './styles/dashboard';
import { resolveSensorEntities } from './device-discovery';
import { deriveCondition, getIsNight, getSunElevation, getMoonPhase } from './condition-engine';
// sky-color is used directly by weather-scene component
import { SkyHistoryEntry, reconstructSkyHistory, SkyHistoryEntities } from './sky-history-store';
import { formatValue, getBeaufortLabel, bearingToDirection, toKmh, moonIllumination, isValidState, parseNumericHistoryEntry } from './utils';
import { getStatIcon } from './icons';
import { HistoryDataPoint } from './components/stat-history';

import './editor';
import './components/weather-scene';
import './components/sky-history';
import './components/wind-compass';
import './components/wind-gauge';
import './components/stat-card';
import './components/stat-history';
import './components/wind-direction-history';
import { BearingDataPoint } from './components/wind-direction-history';

@customElement('weather-dashboard-card')
export class WeatherDashboardCard extends LitElement {
  @state() private _config!: WeatherDashboardConfig;
  @state() private _skyHistoryOpen = false;
  @state() private _skyHistoryLoading = false;
  @state() private _skyHistoryEntries: SkyHistoryEntry[] = [];
  @state() private _statHistoryOpen = false;
  @state() private _statHistoryLoading = false;
  @state() private _statHistoryData: HistoryDataPoint[] = [];
  @state() private _statHistoryName = '';
  @state() private _statHistoryUnit = '';
  @state() private _statHistoryIcon = '';
  @state() private _windDirHistoryOpen = false;
  @state() private _windDirHistoryLoading = false;
  @state() private _windDirHistoryData: BearingDataPoint[] = [];
  private _statHistoryRequestId = 0;
  private _windDirHistoryRequestId = 0;
  private _skyHistoryRequestId = 0;
  private _hass!: HomeAssistant;
  private _entities: Partial<Record<SensorRole, string>> = {};
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
      if (s && isValidState(s.state)) return s;
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

  private _getCondition(data: SensorData, isNight: boolean, elevation: number, aqiValue?: number, moonPhase?: string): WeatherCondition {
    const haCondition = this._config?.weather_entity
      ? this._hass?.states[this._config.weather_entity]?.state
      : undefined;

    const latitude = this._config.latitude ?? (this._hass as any).config?.latitude;
    const longitude = this._config.longitude ?? (this._hass as any).config?.longitude;

    return deriveCondition({
      sensors: data,
      isNight,
      sunElevation: elevation,
      speedUnit: this._getUnit('wind_speed') || 'km/h',
      rainUnit: this._getUnit('rain_rate') || 'mm/h',
      haCondition,
      aqiPm25: aqiValue,
      moonPhase,
      latitude,
      longitude,
    });
  }


  private async _toggleSkyHistory(): Promise<void> {
    if (this._skyHistoryOpen) {
      this._skyHistoryOpen = false;
      return;
    }

    // Open immediately with loading state (batch into single render)
    this._skyHistoryLoading = true;
    this._skyHistoryOpen = true;

    // Fetch sky history from HA
    const requestId = ++this._skyHistoryRequestId;

    try {
      // Build entity map for reconstruction
      const entities: SkyHistoryEntities = {
        weatherEntity: this._config.weather_entity,
        sunEntity: 'sun.sun',
        moonEntity: getMoonPhase(this._hass) !== undefined
          ? (this._config as any).moon_entity || 'sensor.moon_phase'
          : undefined,
        temperatureEntity: this._entities.temperature,
        humidityEntity: this._entities.humidity,
        solarRadiationEntity: this._entities.solar_radiation,
        uvIndexEntity: this._entities.uv_index,
        rainRateEntity: this._entities.rain_rate,
        windSpeedEntity: this._entities.wind_speed,
        dewPointEntity: this._entities.dew_point,
        aqiEntity: this._config.aqi_entity,
      };

      // Get lat/lng from config or HA
      const latitude = this._config.latitude ?? (this._hass as any).config?.latitude;
      const longitude = this._config.longitude ?? (this._hass as any).config?.longitude;

      if (latitude === undefined || longitude === undefined) {
        console.warn('[sky-history] No lat/lng available for reconstruction');
        return;
      }

      const entries = await reconstructSkyHistory(
        this._hass,
        entities,
        latitude,
        longitude,
        this._getUnit('wind_speed') || 'km/h',
        this._getUnit('rain_rate') || 'mm/h',
      );

      // Guard against stale results (user closed & reopened with different timing)
      if (requestId !== this._skyHistoryRequestId) return;

      // Batch entries + loading into a single render by setting both together
      this._skyHistoryLoading = false;
      this._skyHistoryEntries = entries;
    } catch (err) {
      console.warn('[sky-history] Reconstruction failed:', err);
      if (requestId === this._skyHistoryRequestId) {
        this._skyHistoryLoading = false;
      }
    }
  }

  private _closeSkyHistory(): void {
    this._skyHistoryOpen = false;
    this._skyHistoryEntries = [];
  }

  private _onInfoClick(): void {
    const entityId = this._entities.temperature;
    if (!entityId) return;
    const unit = this._getUnit('temperature') || '°C';
    this._openStatHistory(entityId, 'Temperature', unit, '');
  }

  private _onAqiClick(): void {
    if (!this._config.aqi_entity) return;
    const aqiState = this._hass?.states[this._config.aqi_entity];
    const unit = aqiState?.attributes?.unit_of_measurement || 'µg/m³';

    this._openStatHistory(this._config.aqi_entity, 'PM2.5', unit, '');
  }

  private async _onWindCompassClick(): Promise<void> {
    const entityId = this._entities.wind_bearing;
    if (!entityId || !this._hass) return;

    const requestId = ++this._windDirHistoryRequestId;
    this._windDirHistoryData = [];
    this._windDirHistoryLoading = true;
    this._windDirHistoryOpen = true;

    try {
      const now = new Date();
      const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const result = await (this._hass as any).callWS({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: now.toISOString(),
        entity_ids: [entityId],
        minimal_response: true,
        significant_changes_only: false,
        no_attributes: true,
      });

      if (requestId !== this._windDirHistoryRequestId) return;

      const entries = result?.[entityId];
      if (Array.isArray(entries)) {
        const points: BearingDataPoint[] = [];
        for (const entry of entries) {
          const parsed = parseNumericHistoryEntry(entry);
          if (parsed) points.push({ time: parsed.time, value: parsed.value });
        }
        this._windDirHistoryData = points;
      }
    } catch (err) {
      if (requestId !== this._windDirHistoryRequestId) return;
      console.warn('Failed to fetch wind direction history:', err);
      this._windDirHistoryData = [];
    } finally {
      if (requestId === this._windDirHistoryRequestId) {
        this._windDirHistoryLoading = false;
      }
    }
  }

  private _closeWindDirHistory(): void {
    this._windDirHistoryOpen = false;
  }

  private _onWindGaugeClick(): void {
    const entityId = this._entities.wind_speed;
    if (!entityId) return;
    const unit = this._getUnit('wind_speed') || 'km/h';
    const icon = getStatIcon('wind-beaufort-0', 'wind_speed', this._getValue('wind_speed'), this._isHaMetric() ? 'metric' : 'imperial');

    this._openStatHistory(entityId, 'Wind Speed', unit, icon);
  }

  private _openStatHistory(entityId: string, name: string, unit: string, icon: string): void {
    this._onStatClick(new CustomEvent('stat-click', {
      detail: { entityId, name, unit, icon },
    }));
  }

  private async _onStatClick(e: CustomEvent): Promise<void> {
    const { entityId, name, unit, icon } = e.detail;
    if (!entityId || !this._hass) return;

    // Increment request ID so stale fetches are discarded
    const requestId = ++this._statHistoryRequestId;

    this._statHistoryName = name;
    this._statHistoryUnit = unit;
    this._statHistoryIcon = icon;
    this._statHistoryData = [];
    this._statHistoryLoading = true;
    this._statHistoryOpen = true;

    try {
      const now = new Date();
      const start = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      // Use HA WebSocket API for history
      const result = await (this._hass as any).callWS({
        type: 'history/history_during_period',
        start_time: start.toISOString(),
        end_time: now.toISOString(),
        entity_ids: [entityId],
        minimal_response: true,
        significant_changes_only: false,
        no_attributes: true,
      });

      // Discard if a newer request was made while we were fetching
      if (requestId !== this._statHistoryRequestId) return;

      // Parse HA history (handles both full and compact minimal_response format)
      const entries = result?.[entityId];
      if (Array.isArray(entries)) {
        const points: HistoryDataPoint[] = [];
        for (const entry of entries) {
          const parsed = parseNumericHistoryEntry(entry);
          if (parsed) points.push({ time: parsed.time, value: parsed.value });
        }
        // Downsample if too many points (avoid huge SVG paths on low-end devices)
        this._statHistoryData = points.length > 500
          ? this._downsample(points, 500)
          : points;
      }
    } catch (err) {
      // Discard errors from stale requests
      if (requestId !== this._statHistoryRequestId) return;
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch stat history:', err);
      this._statHistoryData = [];
    } finally {
      if (requestId === this._statHistoryRequestId) {
        this._statHistoryLoading = false;
      }
    }
  }

  private _closeStatHistory(): void {
    this._statHistoryOpen = false;
  }

  /**
   * Largest-Triangle-Three-Buckets downsampling.
   * Preserves visual shape (peaks, valleys) while reducing point count.
   */
  private _downsample(data: HistoryDataPoint[], target: number): HistoryDataPoint[] {
    if (data.length <= target) return data;

    const result: HistoryDataPoint[] = [data[0]]; // always keep first
    const bucketSize = (data.length - 2) / (target - 2);

    let prevIndex = 0;
    for (let i = 1; i < target - 1; i++) {
      const bucketStart = Math.floor((i - 1) * bucketSize) + 1;
      const bucketEnd = Math.min(Math.floor(i * bucketSize) + 1, data.length - 1);
      const nextBucketStart = Math.floor(i * bucketSize) + 1;
      const nextBucketEnd = Math.min(Math.floor((i + 1) * bucketSize) + 1, data.length - 1);

      // Average of next bucket (for triangle area calculation)
      let avgTime = 0, avgValue = 0;
      const nextLen = nextBucketEnd - nextBucketStart;
      for (let j = nextBucketStart; j < nextBucketEnd; j++) {
        avgTime += data[j].time;
        avgValue += data[j].value;
      }
      avgTime /= nextLen || 1;
      avgValue /= nextLen || 1;

      // Pick point in current bucket with largest triangle area
      const prev = data[prevIndex];
      let maxArea = -1;
      let bestIdx = bucketStart;
      for (let j = bucketStart; j < bucketEnd; j++) {
        const area = Math.abs(
          (prev.time - avgTime) * (data[j].value - prev.value) -
          (prev.time - data[j].time) * (avgValue - prev.value),
        );
        if (area > maxArea) { maxArea = area; bestIdx = j; }
      }
      result.push(data[bestIdx]);
      prevIndex = bestIdx;
    }

    result.push(data[data.length - 1]); // always keep last
    return result;
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
    const moonPhase = getMoonPhase(this._hass);
    const location = this._getLocationName();

    // AQI value (read early — needed for both condition engine and scene badge)
    let aqiValue: number | undefined;
    if (this._config.aqi_entity) {
      const aqiState = this._hass.states[this._config.aqi_entity];
      if (aqiState && isValidState(aqiState.state)) {
        const val = parseFloat(aqiState.state);
        if (isFinite(val)) aqiValue = val;
      }
    }

    const condition = this._getCondition(data, isNight, elevation, aqiValue, moonPhase);

    // Units from actual entities
    const tempUnit = this._getUnit('temperature') || '°C';
    const speedUnit = this._getUnit('wind_speed') || 'km/h';

    // Dynamic sky: enabled when lat/lng available (from config or HA)
    const hasLatLng = (this._config.latitude !== undefined && this._config.longitude !== undefined)
      || (this._hass as any).config?.latitude !== undefined;
    const useDynamicSky = hasLatLng;

    // Moon illumination (0-1) from moon phase name
    const moonIllum = moonIllumination(moonPhase);

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
          <div class="panel scene-panel">
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
              .moonIllumination=${moonIllum}
              .aqiValue=${aqiValue}
              .moonPhase=${moonPhase}
              .useDynamicSky=${useDynamicSky}
              @icon-click=${this._toggleSkyHistory}
              @aqi-click=${this._onAqiClick}
              @info-click=${this._onInfoClick}
            ></wdb-weather-scene>
            <wdb-sky-history
              .entries=${this._skyHistoryEntries}
              .loading=${this._skyHistoryLoading}
              .open=${this._skyHistoryOpen}
              .tempUnit=${tempUnit}
              @close=${this._closeSkyHistory}
            ></wdb-sky-history>
          </div>

          <!-- Right: Wind Panel -->
          <div class="panel">
            <div class="wind-panel">
              <div class="wind-instruments">
                <!-- Compass -->
                <div class="wind-instrument clickable" @click=${this._onWindCompassClick}>
                  <div class="wind-sublabel">Wind Direction</div>
                  <div class="wind-svg-container">
                    <wdb-wind-compass .bearing=${windBearing}></wdb-wind-compass>
                  </div>
                  <div class="wind-value">
                    <div class="wind-value-primary">${Math.round(windBearing)}° ${windDir}</div>
                  </div>
                </div>
                <!-- Gauge -->
                <div class="wind-instrument clickable" @click=${this._onWindGaugeClick}>
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
        <div class="stats-section" @stat-click=${this._onStatClick}>
          <div class="stats-label">Statistics (Live Updates)</div>
          <div class="stats-grid">
            ${this._renderStats(data, unitSystem)}
          </div>
        </div>

        <!-- Stat History Overlay -->
        <wdb-stat-history
          .open=${this._statHistoryOpen}
          .loading=${this._statHistoryLoading}
          .statName=${this._statHistoryName}
          .statUnit=${this._statHistoryUnit}
          .statIcon=${this._statHistoryIcon}
          .data=${this._statHistoryData}
          @close=${this._closeStatHistory}
        ></wdb-stat-history>

        <!-- Wind Direction History Overlay -->
        <wdb-wind-direction-history
          .open=${this._windDirHistoryOpen}
          .loading=${this._windDirHistoryLoading}
          .data=${this._windDirHistoryData}
          @close=${this._closeWindDirHistory}
        ></wdb-wind-direction-history>

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
      const entityId = this._entities[def.key] ?? '';

      return html`
        <wdb-stat-card
          .name=${def.label}
          .value=${formatted}
          .unit=${unit}
          .icon=${icon}
          .entityId=${entityId}
          .statKey=${def.key}
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
