import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { WeatherDashboardConfig, HomeAssistant } from './types';

@customElement('weather-dashboard-card-editor')
export class WeatherDashboardCardEditor extends LitElement {
  @state() private _config!: WeatherDashboardConfig;
  public hass!: HomeAssistant;

  private _schema = [
    {
      name: 'device_id',
      label: 'Weather Station (ha-wu-mqtt-bridge)',
      selector: { device: { integration: 'mqtt' } },
    },
    {
      name: 'weather_entity',
      label: 'Weather Entity (alternative to device)',
      selector: { entity: { domain: 'weather' } },
    },
    {
      name: 'aqi_entity',
      label: 'PM2.5 Sensor (for AQI badge)',
      selector: { entity: { domain: 'sensor' } },
    },
    {
      name: 'title',
      label: 'Card Title',
      selector: { text: {} },
    },
    {
      name: 'animations',
      label: 'Animations',
      selector: { boolean: {} },
    },
    {
      name: 'gauge_max',
      label: 'Gauge Max Speed (km/h)',
      selector: { number: { min: 10, max: 200, step: 10, mode: 'slider' } },
    },
  ];

  setConfig(config: WeatherDashboardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !ev.detail) return;
    const newConfig = { ...this._config, ...ev.detail.value };
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
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
