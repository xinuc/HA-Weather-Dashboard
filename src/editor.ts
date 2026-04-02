import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { WeatherDashboardConfig, HomeAssistant } from './types';

@customElement('weather-dashboard-card-editor')
export class WeatherDashboardCardEditor extends LitElement {
  @state() private _config!: WeatherDashboardConfig;
  public hass!: HomeAssistant;

  setConfig(config: WeatherDashboardConfig): void {
    this._config = config;
  }

  private _valueChanged(field: string, ev: Event): void {
    if (!this._config) return;
    const target = ev.target as any;
    let value = target.value;
    if (value === '') value = undefined;
    const newConfig = { ...this._config, [field]: value };
    this._config = newConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _toggleChanged(field: string, ev: Event): void {
    if (!this._config) return;
    const target = ev.target as any;
    const newConfig = { ...this._config, [field]: target.checked };
    this._config = newConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    if (!this._config) return html``;
    return html`
      <div class="editor">
        <!-- Weather Data Source -->
        <div class="section">
          <div class="section-title">Weather Data Source</div>
          <div class="section-hint">Use a WU Station ID <b>or</b> a Weather entity — not both.</div>

          <div class="field">
            <div class="field-label">WU Station ID</div>
            <div class="field-hint">Your Weather Underground station ID from <a href="https://github.com/xinuc/ha-wu-mqtt-bridge" target="_blank">ha-wu-mqtt-bridge</a>. Sensors will be auto-discovered.</div>
            <ha-textfield
              .value=${this._config.device_id ?? ''}
              @change=${(ev: Event) => this._valueChanged('device_id', ev)}
              placeholder="e.g. WSTATION1"
            ></ha-textfield>
          </div>

          <div class="field">
            <div class="field-label">Weather Entity</div>
            <div class="field-hint">Alternative: use a Home Assistant weather entity instead of a station ID.</div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._config.weather_entity ?? ''}
              .includeDomains=${['weather']}
              @value-changed=${(ev: CustomEvent) => this._valueChanged('weather_entity', ev)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>
        </div>

        <!-- Air Quality -->
        <div class="section">
          <div class="section-title">Air Quality (Optional)</div>
          <div class="field">
            <div class="field-label">PM2.5 Sensor</div>
            <div class="field-hint">A sensor that reports PM2.5 values for the AQI badge.</div>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this._config.aqi_entity ?? ''}
              .includeDomains=${['sensor']}
              @value-changed=${(ev: CustomEvent) => this._valueChanged('aqi_entity', ev)}
              allow-custom-entity
            ></ha-entity-picker>
          </div>
        </div>

        <!-- Display Settings -->
        <div class="section">
          <div class="section-title">Display</div>

          <div class="field">
            <div class="field-label">Card Title</div>
            <ha-textfield
              .value=${this._config.title ?? 'Weather Dashboard'}
              @change=${(ev: Event) => this._valueChanged('title', ev)}
            ></ha-textfield>
          </div>

          <div class="field row">
            <ha-switch
              .checked=${this._config.animations !== false}
              @change=${(ev: Event) => this._toggleChanged('animations', ev)}
            ></ha-switch>
            <div class="field-label">Animations</div>
          </div>

          <div class="field">
            <div class="field-label">Gauge Max Speed (km/h)</div>
            <ha-slider
              .value=${this._config.gauge_max ?? 50}
              .min=${10}
              .max=${200}
              .step=${10}
              pin
              @change=${(ev: Event) => this._valueChanged('gauge_max', ev)}
            ></ha-slider>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .editor {
      padding: 8px 0;
    }
    .section {
      margin-bottom: 20px;
    }
    .section-title {
      font-weight: 500;
      font-size: 14px;
      color: var(--primary-text-color);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
    }
    .section-hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 12px;
    }
    .field {
      margin-bottom: 12px;
    }
    .field-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--primary-text-color);
      margin-bottom: 2px;
    }
    .field-hint {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin-bottom: 4px;
    }
    .field-hint a {
      color: var(--primary-color);
    }
    .field.row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .field.row .field-label {
      margin-bottom: 0;
    }
    ha-textfield {
      display: block;
      width: 100%;
    }
    ha-entity-picker {
      display: block;
      width: 100%;
    }
    ha-slider {
      display: block;
      width: 100%;
    }
  `;
}
