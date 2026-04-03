import { LitElement, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { weatherSceneStyles } from '../styles/weather-scene';
import { getConditionIcon, getMoonIcon } from '../icons';
import { WeatherCondition } from '../types';
import { CONDITION_LABELS, STARS_VISIBLE_CONDITIONS, MOON_VISIBLE_CONDITIONS } from '../const';
import { computeSkyGradient, skyGradientCSS, SkyInputs } from '../sky-color';

import './aqi-badge';

// Pre-generate star positions (fixed, not random on every render)
const STARS = Array.from({ length: 40 }, () => ({
  cx: Math.random() * 400,
  cy: Math.random() * 200,
  r: 0.5 + Math.random() * 1.2,
  opacity: 0.3 + Math.random() * 0.5,
  dur: 2 + Math.random() * 4,
  delay: Math.random() * 3,
}));


@customElement('wdb-weather-scene')
export class WeatherScene extends LitElement {
  @property() condition: WeatherCondition = 'clear-day';
  @property({ type: Boolean }) isNight = false;
  @property({ type: Number }) elevation = 10;
  @property({ type: Number }) temperature?: number;
  @property() tempUnit = '°C';
  @property({ type: Number }) uvIndex?: number;
  @property({ type: Number }) windSpeed?: number;
  @property() windSpeedUnit = 'km/h';
  @property({ type: Number }) rainRate?: number;
  @property() rainRateUnit = 'mm/h';
  @property({ type: Number }) solarRadiation?: number;
  @property({ type: Number }) humidity?: number;
  @property({ type: Number }) moonIllumination?: number;
  @property({ type: Number }) aqiValue?: number;
  @property() moonPhase?: string;
  @property({ type: Boolean }) narrow = false;
  @property({ type: Boolean }) useDynamicSky = false;

  static styles = weatherSceneStyles;

  /**
   * Dynamic sky gradient computed from sensor data.
   * Uses sun elevation, cloud characterization (Kt + UV spectral ratio),
   * humidity/turbidity, rain, and moon illumination.
   */
  private _getSkyStyle(): string {
    if (!this.useDynamicSky) return '';

    const inputs: SkyInputs = {
      sunElevation: this.elevation,
      solarRadiation: this.solarRadiation,
      uvIndex: this.uvIndex,
      humidity: this.humidity,
      rainRate: this.rainRate,
      moonIllumination: this.moonIllumination,
      isNight: this.isNight,
    };

    const gradient = computeSkyGradient(inputs);
    return `background: ${skyGradientCSS(gradient)}`;
  }

  /**
   * Fallback: static CSS sky class when dynamic sky is not available
   * (no lat/lng configured).
   */
  private _getSkyClass(): string {
    if (this.useDynamicSky) return '';

    if (this.condition.startsWith('thunderstorms')) return 'sky-stormy';

    // Conditions that always show overcast sky regardless of time
    const overcastConditions: string[] = [
      'rain', 'cloudy', 'overcast-day', 'overcast-night', 'fog-day', 'fog-night',
      'partly-cloudy-day-rain', 'partly-cloudy-night-rain',
      'partly-cloudy-day-drizzle', 'partly-cloudy-night-drizzle',
      'partly-cloudy-day-smoke', 'partly-cloudy-night-smoke',
    ];
    if (overcastConditions.includes(this.condition)) {
      return this.elevation < 0 ? 'sky-night-overcast' : 'sky-overcast';
    }

    return this.elevation < 0 ? 'sky-night' : 'sky-day';
  }

  private _renderStars() {
    return html`
      <div class="stars">
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">
          ${STARS.map(s => svg`
            <circle cx=${s.cx} cy=${s.cy} r=${s.r} fill="#fff" opacity=${s.opacity}>
              <animate attributeName="opacity" values="${s.opacity};${s.opacity * 0.3};${s.opacity}" dur="${s.dur}s" begin="${s.delay}s" repeatCount="indefinite"/>
            </circle>
          `)}
        </svg>
      </div>
    `;
  }

  private _renderMoon() {
    // Only show moon during true night with clear/partly-cloudy skies
    if (this.elevation >= -6) return '';
    if (!this.moonPhase) return '';
    if (!MOON_VISIBLE_CONDITIONS.includes(this.condition)) return '';

    const moonIcon = getMoonIcon(this.moonPhase);
    return html`
      <div class="moon-icon">
        ${unsafeHTML(moonIcon)}
      </div>
    `;
  }

  private _onIconClick(): void {
    this.dispatchEvent(new CustomEvent('icon-click', { bubbles: true, composed: true }));
  }

  private _onIconKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._onIconClick();
    }
  }

  render() {
    const skyClass = this._getSkyClass();
    const skyStyle = this._getSkyStyle();
    const showStars = STARS_VISIBLE_CONDITIONS.includes(this.condition);
    const conditionIcon = getConditionIcon(this.condition);
    const label = CONDITION_LABELS[this.condition] ?? this.condition;

    return html`
      <div class="weather-scene-panel">
        <div class="weather-scene ${skyClass} ${showStars ? 'show-stars' : ''}"
             style=${skyStyle}>
          <!-- AQI Badge -->
          ${this.aqiValue !== undefined ? html`
            <wdb-aqi-badge .pm25=${this.aqiValue}></wdb-aqi-badge>
          ` : ''}

          <!-- Stars (night) -->
          ${showStars ? this._renderStars() : ''}

          <!-- Moon (night, clear skies) -->
          ${this._renderMoon()}

          <!-- Weather icon (clickable — opens sky history) -->
          <div class="weather-icon-container"
               role="button"
               tabindex="0"
               aria-label="Show sky condition history"
               @click=${this._onIconClick}
               @keydown=${this._onIconKeyDown}>
            ${unsafeHTML(conditionIcon)}
          </div>

          <!-- Info overlay -->
          <div class="weather-info">
            <div class="condition-text">${label}</div>
            ${this.temperature !== undefined ? html`
              <div class="temp-display">${Math.round(this.temperature)}${this.tempUnit}</div>
            ` : ''}
            <div class="scene-details">
              ${this.rainRate !== undefined && this.rainRate >= 0.1 ? html`
                <span>Rain ${this.rainRate < 10 ? this.rainRate.toFixed(1) : Math.round(this.rainRate)} ${this.rainRateUnit}</span>
              ` : this.windSpeed !== undefined && this.windSpeed > 5 ? html`
                <span>Wind ${Math.round(this.windSpeed)} ${this.windSpeedUnit}</span>
              ` : this.uvIndex !== undefined ? html`
                <span>UV ${Math.round(this.uvIndex)}</span>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
