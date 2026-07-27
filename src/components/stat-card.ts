import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { statCardStyles } from '../styles/stat-card';

@customElement('wdb-stat-card')
export class StatCard extends LitElement {
  @property() name = '';
  @property() value = '';
  @property() unit = '';
  @property() icon = '';
  @property() entityId = '';
  @property() statKey = '';

  static styles = statCardStyles;

  private _onClick(): void {
    if (!this.entityId) return;
    this.dispatchEvent(
      new CustomEvent('stat-click', {
        bubbles: true,
        composed: true,
        detail: {
          key: this.statKey,
          entityId: this.entityId,
          name: this.name,
          unit: this.unit,
          icon: this.icon,
        },
      }),
    );
  }

  private _onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._onClick();
    }
  }

  // Weather-native accent per stat category — drives the tile's colour-coding.
  private static _ACCENTS: Record<string, string> = {
    temperature: '--wdb-coral', feels_like: '--wdb-coral', heat_index: '--wdb-coral', soil_temp: '--wdb-coral',
    humidity: '--wdb-sky', dew_point: '--wdb-sky', wind_chill: '--wdb-sky', rain_rate: '--wdb-sky', daily_rain: '--wdb-sky', visibility: '--wdb-sky',
    uv_index: '--wdb-sun', solar_radiation: '--wdb-sun',
    wind_speed: '--wdb-mint', wind_gust: '--wdb-mint',
    pressure: '--wdb-iris',
  };

  private _accentVar(): string {
    return StatCard._ACCENTS[this.statKey] ?? '--wdb-sky';
  }

  render() {
    const clickable = !!this.entityId;
    return html`
      <div
        class="stat-card ${clickable ? 'clickable' : ''}"
        role=${clickable ? 'button' : 'presentation'}
        tabindex=${clickable ? '0' : '-1'}
        aria-label=${clickable ? `Show ${this.name} history` : ''}
        style=${`--stat-accent: var(${this._accentVar()})`}
        @click=${this._onClick}
        @keydown=${this._onKeyDown}
      >
        <div class="stat-icon">${unsafeHTML(this.icon)}</div>
        <div class="stat-content">
          <div class="stat-name">${this.name}</div>
          <div class="stat-value">${this.value}${this.unit ? ` ${this.unit}` : ''}</div>
        </div>
      </div>
    `;
  }
}
