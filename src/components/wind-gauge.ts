import { LitElement, svg, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { gaugeStyles } from '../styles/gauge';
import { getGaugeIcon } from '../icons';

const COLORS = ['#1976D2', '#00ACC1', '#43A047', '#FDD835', '#FB8C00', '#E53935'];
const CX = 150, CY = 150, R = 90;
const ARC_START = 210; // degrees (bottom-left)
const ARC_SPAN = 240; // total sweep

function polarToXY(cx: number, cy: number, r: number, angleDeg: number): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
}

function arcPath(startAngle: number, endAngle: number): string {
  const [x1, y1] = polarToXY(CX, CY, R, startAngle);
  const [x2, y2] = polarToXY(CX, CY, R, endAngle);
  const sweep = startAngle - endAngle;
  const largeArc = Math.abs(sweep) > 180 ? 1 : 0;
  return `M ${x1},${y1} A ${R},${R} 0 ${largeArc},1 ${x2},${y2}`;
}

@customElement('wdb-wind-gauge')
export class WindGauge extends LitElement {
  @property({ type: Number }) speed = 0;
  @property({ type: Number }) maxSpeed = 50;

  private get _safeMax(): number {
    return this.maxSpeed > 0 ? this.maxSpeed : 50;
  }

  static styles = gaugeStyles;

  private _renderColorBands() {
    const segmentSpan = ARC_SPAN / COLORS.length;
    return COLORS.map((color, i) => {
      const startAngle = ARC_START - i * segmentSpan;
      const endAngle = startAngle - segmentSpan;
      return svg`
        <path
          d=${arcPath(startAngle, endAngle)}
          fill="none"
          stroke=${color}
          stroke-width="18"
          stroke-linecap="butt"
        />
      `;
    });
  }

  private _renderTicks() {
    const ticks = [];
    const majorInterval = this._safeMax >= 100 ? 20 : 10;
    const minorInterval = this._safeMax >= 100 ? 10 : 2;

    for (let val = 0; val <= this._safeMax; val += minorInterval) {
      const frac = val / this._safeMax;
      const angle = ARC_START - frac * ARC_SPAN;
      const isMajor = val % majorInterval === 0;
      const isMedium = val % (majorInterval / 2) === 0 && !isMajor;

      const outerR = R + 6;
      const innerR = isMajor ? R + 16 : isMedium ? R + 12 : R + 9;
      const [x1, y1] = polarToXY(CX, CY, outerR, angle);
      const [x2, y2] = polarToXY(CX, CY, innerR, angle);

      ticks.push(svg`
        <line
          x1=${x1} y1=${y1} x2=${x2} y2=${y2}
          stroke="rgba(255,255,255,${isMajor ? 0.8 : isMedium ? 0.5 : 0.3})"
          stroke-width=${isMajor ? 1.5 : isMedium ? 1 : 0.7}
        />
      `);

      // Number labels at major ticks
      if (isMajor) {
        const [tx, ty] = polarToXY(CX, CY, R + 22, angle);
        ticks.push(svg`
          <text
            x=${tx} y=${ty}
            text-anchor="middle"
            dominant-baseline="central"
            fill="rgba(255,255,255,0.7)"
            font-size="10"
            font-weight="600"
          >${val}</text>
        `);
      }
    }
    return ticks;
  }

  private _renderIcons() {
    const iconPositions = [
      { angle: ARC_START + 5, idx: 0 },
      { angle: ARC_START - ARC_SPAN * 0.2, idx: 1 },
      { angle: ARC_START - ARC_SPAN * 0.4, idx: 2 },
      { angle: ARC_START - ARC_SPAN * 0.6, idx: 3 },
      { angle: ARC_START - ARC_SPAN * 0.8, idx: 4 },
      { angle: ARC_START - ARC_SPAN - 5, idx: 5 },
    ];

    return iconPositions.map(({ angle, idx }) => {
      const iconR = R + 32;
      const [ix, iy] = polarToXY(CX, CY, iconR, angle);
      const size = 18;
      return svg`
        <foreignObject x=${ix - size / 2} y=${iy - size / 2} width=${size} height=${size}>
          <div xmlns="http://www.w3.org/1999/xhtml" style="width:${size}px;height:${size}px;opacity:0.6">
            ${unsafeHTML(getGaugeIcon(idx))}
          </div>
        </foreignObject>
      `;
    });
  }

  private _renderNeedle() {
    const frac = Math.min(this.speed / this._safeMax, 1);
    const angle = -(ARC_START - frac * ARC_SPAN);

    return svg`
      <g class="gauge-needle" style="transform-origin:${CX}px ${CY}px;transform:rotate(${angle}deg)">
        <line x1=${CX} y1=${CY} x2=${CX + R - 4} y2=${CY} stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
      </g>
      <circle cx=${CX} cy=${CY} r="8" fill="#546E7A"/>
      <circle cx=${CX} cy=${CY} r="4.5" fill="#90A4AE"/>
    `;
  }

  render() {
    return html`
      <svg viewBox="35 18 230 215">
        <!-- Color bands -->
        ${this._renderColorBands()}

        <!-- Ticks and numbers -->
        ${this._renderTicks()}

        <!-- Icons -->
        ${this._renderIcons()}

        <!-- Unit label -->
        <text x=${CX} y=${CY + 18} text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="10">km/h</text>

        <!-- Needle -->
        ${this._renderNeedle()}
      </svg>
    `;
  }
}
