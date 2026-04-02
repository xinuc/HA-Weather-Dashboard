import { LitElement, svg, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { compassStyles } from '../styles/compass';
import { computeShortestRotation } from '../utils';

@customElement('wdb-wind-compass')
export class WindCompass extends LitElement {
  @property({ type: Number }) bearing = 0;
  @state() private _rotation = 0;

  static styles = compassStyles;

  updated(changed: Map<string, unknown>) {
    if (changed.has('bearing')) {
      const old = changed.get('bearing') as number ?? 0;
      this._rotation = computeShortestRotation(this.bearing, this._rotation ?? old);
    }
  }

  private _renderTicks() {
    const ticks = [];
    for (let deg = 0; deg < 360; deg += 10) {
      const isMajor = deg % 30 === 0;
      const len = isMajor ? 18 : 14;
      const r1 = 95;
      const r2 = r1 - len;
      const rad = (deg * Math.PI) / 180;
      ticks.push(svg`
        <line
          x1=${100 + r1 * Math.sin(rad)}
          y1=${100 - r1 * Math.cos(rad)}
          x2=${100 + r2 * Math.sin(rad)}
          y2=${100 - r2 * Math.cos(rad)}
          stroke="rgba(255,255,255,0.4)"
          stroke-width=${isMajor ? 1.5 : 1}
        />
      `);
    }
    return ticks;
  }

  private _renderDegreeNumbers() {
    const angles = [30, 60, 120, 150, 210, 240, 300, 330];
    return angles.map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const r = 72;
      return svg`
        <text
          x=${100 + r * Math.sin(rad)}
          y=${100 - r * Math.cos(rad)}
          text-anchor="middle"
          dominant-baseline="central"
          fill="rgba(255,255,255,0.35)"
          font-size="7"
        >${deg}</text>
      `;
    });
  }

  render() {
    return html`
      <svg viewBox="0 0 200 200">
        <!-- Background -->
        <defs>
          <radialGradient id="compass-bg">
            <stop offset="0%" stop-color="#2a3a5c"/>
            <stop offset="100%" stop-color="#1a2a4a"/>
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="95" fill="url(#compass-bg)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="0.5"/>

        <!-- Ticks -->
        ${this._renderTicks()}

        <!-- Degree numbers -->
        ${this._renderDegreeNumbers()}

        <!-- Cardinal directions -->
        <text x="100" y="32" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">N</text>
        <text x="168" y="104" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">E</text>
        <text x="100" y="178" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">S</text>
        <text x="32" y="104" text-anchor="middle" fill="#fff" font-size="12" font-weight="700">W</text>

        <!-- Intercardinal directions -->
        <text x="148" y="56" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="9" font-weight="600">NE</text>
        <text x="148" y="152" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="9" font-weight="600">SE</text>
        <text x="52" y="152" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="9" font-weight="600">SW</text>
        <text x="52" y="56" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="9" font-weight="600">NW</text>

        <!-- Compass rose petals -->
        <polygon points="100,40 108,100 100,70 92,100" fill="rgba(255,255,255,0.08)"/>
        <polygon points="100,160 108,100 100,130 92,100" fill="rgba(255,255,255,0.08)"/>
        <polygon points="40,100 100,92 70,100 100,108" fill="rgba(255,255,255,0.08)"/>
        <polygon points="160,100 100,92 130,100 100,108" fill="rgba(255,255,255,0.08)"/>

        <!-- Needle -->
        <g class="compass-needle" style="transform-origin:100px 100px;transform:rotate(${this._rotation}deg)">
          <polygon points="100,28 96,100 100,92 104,100" fill="#fff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"/>
          <polygon points="100,172 96,100 100,108 104,100" fill="rgba(255,255,255,0.3)"/>
        </g>

        <!-- Center dot -->
        <circle cx="100" cy="100" r="5" fill="#37474F" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        <circle cx="100" cy="100" r="3" fill="#90A4AE"/>
      </svg>
    `;
  }
}
