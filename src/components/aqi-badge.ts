import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AQI_LEVELS } from '../const';

// Face parts extracted from face.svg (brackets removed)
// With evenodd: head = filled, skin = hole, features inside skin = re-filled

const HEAD = 'M41.1,101.17c-20.64-18.34-16.35-28.5-15.85-54.84c0-0.24,0.04-0.47,0.12-0.67l-5.19-1.63c-0.74-16.4,8.75-26.21,20.52-30.93c4.28-1.72-2.89-11.1,6.97-7.49c13.17,4.82,42.39,11.38,49.31,19.65c5.62,6.72,5.85,10.36,5.72,19.13c-0.04,2.85-0.48,5.34-1.79,6.27c-0.61,0.43-1.33,0.6-2.18,0.52c0,16.27,2.19,31.67-9.56,44.92c-6.97,7.86-17.48,12.9-28.06,12.74c-4.17-0.07-6.75-0.66-10.35-2.01C47.21,105.49,44.27,103.98,41.1,101.17z';

const SKIN = 'M53.28,103.38c2.09,0.83,5.99,1.24,8.26,1.24c4.47,0,8.99-1.01,13.19-2.93c4.22-1.92,8.11-4.73,11.3-8.33c10.71-12.09,8.51-27.51,8.51-42.42h0.01c-0.04-1.33-0.24-2.54-0.6-3.65c-0.35-1.07-0.85-2-1.52-2.79c-2.56-3-4.98-2.88-8.44-2.7c-0.32,0.01-0.62,0.03-1.07,0.06c-13.68,0.6-22.64,0.59-29.91-0.04c-6.7-0.6-11.96-1.7-18.1-3.32c-0.58,1.36-1.25,2.69-2.03,3.98c-1,1.65-2.16,3.23-3.49,4.73c-0.46,24.62-4.75,33.82,14.46,50.87c1.09,0.97,2.24,1.83,3.43,2.57C48.99,101.7,51.51,102.81,53.28,103.38z';

const EYE_R = 'M77.25,62.33c2.31,0,4.19,1.87,4.19,4.18c0,2.31-1.87,4.19-4.19,4.19s-4.19-1.88-4.19-4.19C73.06,64.2,74.94,62.33,77.25,62.33z';
const EYE_L = 'M45.61,62.33c2.31,0,4.19,1.87,4.19,4.18c0,2.31-1.87,4.19-4.19,4.19c-2.31,0-4.19-1.88-4.19-4.19C41.43,64.2,43.3,62.33,45.61,62.33z';

// Normal eyebrows (from original SVG)
const BROW_R = 'M86.77,60.28c0.6,0.8,0.44,1.95-0.37,2.55c-0.8,0.6-1.95,0.44-2.55-0.37c-1.46-1.95-3.01-2.97-4.65-3.36c-1.67-0.4-3.49-0.14-5.39,0.49c-0.96,0.32-1.99-0.19-2.3-1.15c-0.31-0.96,0.19-1.99,1.15-2.3c2.49-0.84,4.97-1.16,7.36-0.59C82.47,56.13,84.75,57.59,86.77,60.28z';
const BROW_L = 'M42.85,55.55c2.39-0.57,4.87-0.25,7.36,0.59c0.96,0.32,1.47,1.35,1.15,2.3c-0.32,0.96-1.35,1.47-2.3,1.15c-1.88-0.64-3.71-0.88-5.39-0.49c-1.63,0.39-3.2,1.42-4.65,3.36c-0.6,0.8-1.74,0.97-2.55,0.37c-0.8-0.6-0.97-1.74-0.37-2.55C38.14,57.59,40.42,56.13,42.85,55.55z';

// Mouth variations (filled shapes, rendered as holes-in-hole via evenodd = visible)
const MOUTHS = [
  // 0: Excellent — big grin
  'M49,87 C49,87 55,97 61,97 C67,97 73,87 73,87 C73,87 67,93 61,93 C55,93 49,87 49,87 Z',
  // 1: Good — smile (original)
  'M54.12,90.87c-1.01-0.55-1.37-1.81-0.81-2.81c0.55-1,1.81-1.37,2.81-0.81c1.9,1.05,3.74,1.62,5.5,1.66c1.71,0.03,3.4-0.44,5.07-1.46c0.97-0.6,2.24-0.3,2.84,0.67c0.6,0.97,0.3,2.25-0.67,2.84c-2.37,1.46-4.81,2.13-7.31,2.08C59.07,92.98,56.6,92.24,54.12,90.87z',
  // 2: Moderate — neutral straight
  'M50,88 L72,88 L72,90.5 L50,90.5 Z',
  // 3: Unhealthy — slight frown
  'M49,92 C49,92 55,86 61,86 C67,86 73,92 73,92 C73,92 67,89 61,89 C55,89 49,92 49,92 Z',
  // 4: Very Bad — deeper frown
  'M47,94 C47,94 54,84 61,84 C68,84 75,94 75,94 C75,94 68,88 61,88 C54,88 47,94 47,94 Z',
  // 5: Hazardous — open gasp (hidden by mask)
  'M55,83 C55,79 58,77 61,77 C64,77 67,79 67,83 L67,93 C67,97 64,99 61,99 C58,99 55,97 55,93 Z',
  // 6: Toxic — wide gasp (hidden by mask)
  'M53,82 C53,77 57,74 61,74 C65,74 69,77 69,82 L69,95 C69,100 65,103 61,103 C57,103 53,100 53,95 Z',
];

// Angry/furrowed eyebrows for levels 4-6
const ANGRY_BROW_R = 'M73,56 L85,52 L85,54.5 L73,58.5 Z';
const ANGRY_BROW_L = 'M49,56 L37,52 L37,54.5 L49,58.5 Z';

@customElement('wdb-aqi-badge')
export class AqiBadge extends LitElement {
  @property({ type: Number }) pm25 = 0;

  static styles = css`
    :host {
      position: absolute;
      top: 8px;
      right: 8px;
      z-index: 10;
      filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
    }

    .aqi-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .aqi-face {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .aqi-face svg {
      width: 40px;
      height: 40px;
    }

    .aqi-value {
      font-size: 0.65rem;
      font-weight: 700;
      color: #fff;
      text-shadow: 0 1px 3px rgba(0,0,0,0.5);
      line-height: 1;
    }

    .aqi-label {
      font-size: 0.5rem;
      color: #fff;
      opacity: 0.8;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      line-height: 1;
    }

    .aqi-badge {
      cursor: pointer;
    }

    .aqi-badge:active {
      transform: scale(0.93);
    }
  `;

  private _getLevel(): number {
    for (let i = 0; i < AQI_LEVELS.length; i++) {
      if (this.pm25 <= AQI_LEVELS[i].max) return i;
    }
    return AQI_LEVELS.length - 1;
  }

  private _renderFace(level: number, color: string) {
    const useAngryBrows = level >= 4;
    const showMask = level >= 5;
    const brows = useAngryBrows
      ? ANGRY_BROW_R + ' ' + ANGRY_BROW_L
      : BROW_R + ' ' + BROW_L;
    const mouth = MOUTHS[level] ?? MOUTHS[4];

    // Compound path: head filled, skin hole, features re-filled via evenodd
    const facePath = [HEAD, SKIN, EYE_R, EYE_L, brows, mouth].join(' ');

    return svg`
      <svg viewBox="18 -5 90 115">
        <path fill="${color}" fill-rule="evenodd" clip-rule="evenodd" d="${facePath}"/>
        ${showMask ? svg`
          <!-- Mask straps -->
          <line x1="38" y1="78" x2="28" y2="66" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
          <line x1="84" y1="78" x2="94" y2="66" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Mask body -->
          <path fill="${color}" d="M38,75 C38,72 42,70 48,70 L74,70 C80,70 84,72 84,75 L84,97 C84,102 78,106 61,106 C44,106 38,102 38,97 Z"/>
          <!-- Mask fold lines -->
          <line x1="42" y1="82" x2="80" y2="82" stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>
          <line x1="42" y1="88" x2="80" y2="88" stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>
          <line x1="42" y1="94" x2="80" y2="94" stroke="rgba(0,0,0,0.15)" stroke-width="0.8"/>
        ` : ''}
      </svg>
    `;
  }

  private _onClick(): void {
    this.dispatchEvent(
      new CustomEvent('aqi-click', {
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const idx = this._getLevel();
    const level = AQI_LEVELS[idx];

    return html`
      <div class="aqi-badge"
           role="button"
           tabindex="0"
           @click=${this._onClick}
           @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._onClick(); }}>
        <div class="aqi-face">
          ${this._renderFace(idx, level.color)}
        </div>
        <div class="aqi-value">${Math.round(this.pm25)}</div>
        <div class="aqi-label">${level.label}</div>
      </div>
    `;
  }
}
