import { LitElement, html, css, svg } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { COMPASS_POINTS_8, COMPASS_8_DEGREES } from '../const';
import { OverlayMixin } from './overlay-mixin';

export interface BearingDataPoint {
  time: number;   // unix ms
  value: number;  // degrees 0-360
}

interface DirectionBucket {
  label: string;
  duration: number;  // ms
}

/**
 * Wind direction history overlay — shows time spent blowing from each
 * of the 8 compass directions over the last 24 hours, sorted by duration.
 */
@customElement('wdb-wind-direction-history')
export class WindDirectionHistory extends OverlayMixin(LitElement) {
  @property({ type: Boolean }) open = false;
  @property({ type: Boolean }) loading = false;
  @property({ type: Array }) data: BearingDataPoint[] = [];

  @query('.history-panel') declare _panel: HTMLElement | undefined;

  static styles = css`
    :host { display: contents; }

    .history-overlay {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .history-overlay.open {
      pointer-events: auto;
      opacity: 1;
    }
    .history-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
    }
    .history-panel {
      position: relative;
      width: 90%;
      max-width: 420px;
      background: linear-gradient(180deg, rgba(18, 30, 52, 0.98) 0%, rgba(14, 24, 44, 0.98) 100%);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      transform: translateY(20px) scale(0.96);
      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .history-overlay.open .history-panel {
      transform: translateY(0) scale(1);
    }
    .history-panel:focus { outline: none; }

    .history-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .history-header-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .history-icon {
      width: 22px;
      height: 22px;
      opacity: 0.7;
    }
    .history-title {
      font-size: 1rem;
      font-weight: 700;
      letter-spacing: 0.3px;
    }
    .history-subtitle {
      font-size: 0.7rem;
      opacity: 0.5;
      margin-top: 1px;
    }
    .history-close {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: inherit;
      font-size: 0.85rem;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
      flex-shrink: 0;
    }
    .history-close:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .direction-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      max-height: 420px;
      overflow-y: auto;
    }

    .direction-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .direction-info {
      display: flex;
      align-items: center;
      gap: 4px;
      width: 62px;
      flex-shrink: 0;
      justify-content: flex-end;
    }

    .direction-compass {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
    }

    .direction-label {
      font-size: 0.65rem;
      font-weight: 600;
      opacity: 0.5;
      letter-spacing: 0.3px;
      width: 20px;
      text-align: left;
    }

    .direction-bar-track {
      flex: 1;
      height: 22px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }

    .direction-bar {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, rgba(100, 180, 255, 0.6), rgba(100, 180, 255, 0.35));
      min-width: 2px;
      transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .direction-bar.top {
      background: linear-gradient(90deg, rgba(100, 180, 255, 0.9), rgba(100, 180, 255, 0.55));
    }

    .direction-time {
      width: 52px;
      font-size: 0.75rem;
      opacity: 0.6;
      text-align: right;
      flex-shrink: 0;
    }

    .direction-pct {
      width: 36px;
      font-size: 0.7rem;
      opacity: 0.4;
      text-align: right;
      flex-shrink: 0;
    }

    .history-loading {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 140px;
      opacity: 0.5;
      font-size: 0.85rem;
    }
    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255, 255, 255, 0.15);
      border-top-color: rgba(255, 255, 255, 0.6);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin-right: 10px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .history-empty {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 140px;
      opacity: 0.4;
      font-size: 0.85rem;
    }

    @media (max-width: 480px) {
      .history-panel {
        width: 95%;
        padding: 16px;
      }
    }
  `;

  /**
   * Bucket bearing data into 8 compass directions with time-weighted durations.
   * Each data point holds until the next one (step interpolation).
   */
  private _computeDirections(): DirectionBucket[] {
    const buckets = new Map<string, number>();
    for (const label of COMPASS_POINTS_8) {
      buckets.set(label, 0);
    }

    if (this.data.length < 2) return [];

    for (let i = 0; i < this.data.length - 1; i++) {
      const bearing = this.data[i].value;
      const duration = this.data[i + 1].time - this.data[i].time;
      if (duration <= 0) continue;

      // 360 / 8 = 45° per bucket
      const idx = Math.round(((bearing % 360) + 360) % 360 / 45) % 8;
      const label = COMPASS_POINTS_8[idx];
      buckets.set(label, (buckets.get(label) ?? 0) + duration);
    }

    // Fixed compass order N → NE → E → SE → S → SW → W → NW
    return COMPASS_POINTS_8.map(label => ({ label, duration: buckets.get(label) ?? 0 }));
  }

  private _formatDuration(ms: number): string {
    const totalMin = Math.round(ms / 60_000);
    if (totalMin < 60) return `${totalMin}m`;
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  /**
   * Render a Basmilius-style compass icon with needle rotated to point
   * in the given direction (degrees clockwise from north).
   */
  private _compassIcon(directionLabel: string) {
    const deg = COMPASS_8_DEGREES[directionLabel] ?? 0;
    return svg`
      <svg viewBox="0 0 64 64" class="direction-compass">
        <defs>
          <linearGradient id="cg-${directionLabel}" x1="23" y1="16.41" x2="41" y2="47.59" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#6b7280"/>
            <stop offset="0.45" stop-color="#6b7280"/>
            <stop offset="1" stop-color="#374151"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="18" stroke="#e5e7eb" stroke-miterlimit="10" stroke-width="2" fill="url(#cg-${directionLabel})"/>
        <path d="M36.47,39.46l-4.3-15.09A.17.17,0,0,0,32,24.2a.16.16,0,0,0-.17.17L27.51,39.46a.35.35,0,0,0,.07.29q.06.11.24,0l4-1.5a.47.47,0,0,1,.33,0l4,1.5c.13.07.22.07.28,0A.26.26,0,0,0,36.47,39.46Z"
              fill="#fff" stroke="#fff" stroke-miterlimit="10" stroke-width="0.5"
              transform="rotate(${deg} 32 32)"/>
      </svg>
    `;
  }

  render() {
    if (!this.open) {
      return html`<div class="history-overlay"></div>`;
    }

    const directions = this._computeDirections();
    const totalMs = directions.reduce((sum, d) => sum + d.duration, 0);
    const maxDuration = Math.max(...directions.map(d => d.duration), 0);

    return html`
      <div class="history-overlay open" role="dialog" aria-label="Wind direction history">
        <div class="history-backdrop" @click=${this._close}></div>
        <div class="history-panel" tabindex="-1" @keydown=${this._onKeyDown}>
          <div class="history-header">
            <div class="history-header-left">
              <div class="history-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"/>
                </svg>
              </div>
              <div>
                <div class="history-title">Wind Direction</div>
                <div class="history-subtitle">Last 24 hours</div>
              </div>
            </div>
            <button class="history-close" @click=${this._close} aria-label="Close">✕</button>
          </div>

          ${this.loading ? html`
            <div class="history-loading">
              <div class="loading-spinner"></div>
              Loading history...
            </div>
          ` : directions.length === 0 ? html`
            <div class="history-empty">No history data available</div>
          ` : html`
            <div class="direction-list">
              ${directions.map((d, i) => {
                const pct = totalMs > 0 ? (d.duration / totalMs) * 100 : 0;
                const barPct = maxDuration > 0 ? (d.duration / maxDuration) * 100 : 0;
                return html`
                  <div class="direction-row">
                    <div class="direction-info">
                      ${this._compassIcon(d.label)}
                      <div class="direction-label">${d.label}</div>
                    </div>
                    <div class="direction-bar-track">
                      <div class="direction-bar ${d.duration === maxDuration ? 'top' : ''}"
                           style="width: ${barPct}%"></div>
                    </div>
                    <div class="direction-time">${this._formatDuration(d.duration)}</div>
                    <div class="direction-pct">${pct.toFixed(0)}%</div>
                  </div>
                `;
              })}
            </div>
          `}
        </div>
      </div>
    `;
  }
}
