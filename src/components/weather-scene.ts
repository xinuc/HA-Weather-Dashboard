import { LitElement, html, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { weatherSceneStyles } from '../styles/weather-scene';
import { getConditionIcon, getMoonIcon } from '../icons';
import { WeatherCondition } from '../types';
import { CONDITION_LABELS } from '../const';

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

// Conditions where stars and moon are visible
const STARS_VISIBLE_CONDITIONS: WeatherCondition[] = [
  'clear-night',
  'starry-night',
  'partly-cloudy-night',
];

const MOON_VISIBLE_CONDITIONS: WeatherCondition[] = [
  'clear-night',
  'starry-night',
];

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
  @property({ type: Number }) aqiValue?: number;
  @property() moonPhase?: string;
  @property({ type: Boolean }) narrow = false;

  static styles = weatherSceneStyles;

  private _getSkyClass(): string {
    // Night
    if (this.elevation < 0) {
      if (this.condition.startsWith('thunderstorms')) return 'sky-stormy';
      // Rain, drizzle, overcast, fog at night → dark overcast (no stars)
      if (this.condition === 'rain') return 'sky-night-overcast';
      if (this.condition === 'overcast-night' || this.condition === 'fog-night') return 'sky-night-overcast';
      if (this.condition === 'partly-cloudy-night-rain') return 'sky-night-overcast';
      // Clear/partly-cloudy night → dark sky with stars
      return 'sky-night';
    }

    // Day
    if (this.condition.startsWith('thunderstorms')) return 'sky-stormy';
    if (this.condition === 'cloudy' || this.condition === 'overcast-day' || this.condition === 'fog-day') return 'sky-overcast';
    if (this.condition === 'rain') return 'sky-overcast';
    return 'sky-day';
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

  render() {
    const skyClass = this._getSkyClass();
    const showStars = STARS_VISIBLE_CONDITIONS.includes(this.condition);
    const conditionIcon = getConditionIcon(this.condition);
    const label = CONDITION_LABELS[this.condition] ?? this.condition;

    return html`
      <div class="weather-scene-panel">
        <div class="weather-scene ${skyClass} ${showStars ? 'show-stars' : ''}">
          <!-- AQI Badge -->
          ${this.aqiValue !== undefined ? html`
            <wdb-aqi-badge .pm25=${this.aqiValue}></wdb-aqi-badge>
          ` : ''}

          <!-- Stars (night) -->
          ${this._renderStars()}

          <!-- Moon (night, clear skies) -->
          ${this._renderMoon()}

          <!-- Weather icon -->
          <div class="weather-icon-container">
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
