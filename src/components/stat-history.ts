import { LitElement, html, svg } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { statHistoryStyles } from '../styles/stat-history';

export interface HistoryDataPoint {
  time: number;   // unix ms
  value: number;
}

/**
 * Stat history overlay — shows a 24h SVG area chart for a sensor.
 *
 * Receives pre-fetched data from the parent card so it stays
 * a pure presentation component with no HA dependency.
 */
@customElement('wdb-stat-history')
export class StatHistory extends LitElement {
  @property({ type: Boolean }) open = false;
  @property({ type: Boolean }) loading = false;
  @property() statName = '';
  @property() statUnit = '';
  @property() statIcon = '';
  @property({ type: Array }) data: HistoryDataPoint[] = [];

  @query('.history-panel') private _panel?: HTMLElement;

  static styles = statHistoryStyles;

  updated(changed: Map<string, unknown>): void {
    if (changed.has('open') && this.open) {
      // Focus the panel so Escape key works
      requestAnimationFrame(() => {
        this._panel?.focus();
      });
    }
  }

  // ── helpers ──────────────────────────────────────────────

  private _stats() {
    if (this.data.length === 0) return { min: 0, max: 0, avg: 0, current: 0 };
    let min = Infinity, max = -Infinity, sum = 0;
    for (const d of this.data) {
      if (d.value < min) min = d.value;
      if (d.value > max) max = d.value;
      sum += d.value;
    }
    return {
      min,
      max,
      avg: sum / this.data.length,
      current: this.data[this.data.length - 1].value,
    };
  }

  private _formatVal(v: number): string {
    if (Math.abs(v) >= 100) return v.toFixed(0);
    return v.toFixed(1);
  }

  /**
   * Format axis label with enough decimals to avoid duplicates.
   * Uses the step between grid lines to decide precision.
   */
  private _formatAxisVal(v: number, step: number): string {
    if (step >= 10) return v.toFixed(0);
    if (step >= 0.5) return v.toFixed(1);
    return v.toFixed(2);
  }

  private _formatTime(ts: number): string {
    return new Date(ts).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  }

  // ── chart rendering ──────────────────────────────────────

  /**
   * Build an SVG area chart.
   * Layout:
   *   Left margin 42px (y-axis labels)
   *   Right margin 8px
   *   Top margin 12px
   *   Bottom margin 24px (x-axis labels)
   */
  private _renderChart(stats: { min: number; max: number; avg: number; current: number }) {
    const data = this.data;
    if (data.length < 2) {
      return html`<div class="history-empty">Not enough data</div>`;
    }

    const W = 480, H = 160;
    const ML = 42, MR = 8, MT = 12, MB = 24;
    const cw = W - ML - MR;
    const ch = H - MT - MB;

    const { min, max } = stats;
    const range = max - min || 1;
    const pad = range * 0.1;
    const vMin = min - pad;
    const vMax = max + pad;
    const vRange = vMax - vMin;

    const tMin = data[0].time;
    const tMax = data[data.length - 1].time;
    const tRange = tMax - tMin || 1;

    // Map data → SVG coordinates
    const toX = (t: number) => ML + ((t - tMin) / tRange) * cw;
    const toY = (v: number) => MT + (1 - (v - vMin) / vRange) * ch;

    const points = data.map(d => ({ x: toX(d.time), y: toY(d.value) }));

    // Build smooth path using monotone cubic interpolation
    const linePath = this._monotonePath(points);
    // Area: same path + close at bottom
    const areaPath = `${linePath} L ${points[points.length - 1].x},${MT + ch} L ${points[0].x},${MT + ch} Z`;

    // Grid lines (4 intervals → 5 lines)
    const gridLines = [];
    const gridCount = 4;
    const gridStep = vRange / gridCount;
    for (let i = 0; i <= gridCount; i++) {
      const y = MT + (i / gridCount) * ch;
      const val = vMax - (i / gridCount) * vRange;
      gridLines.push({ y, label: this._formatAxisVal(val, gridStep) });
    }

    // Time labels (every ~4 hours, up to 6 labels)
    const timeLabels = this._computeTimeLabels(tMin, tMax, 6);

    return html`
      <div class="chart-container">
        <svg class="chart-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(100,180,255,0.35)" />
              <stop offset="100%" stop-color="rgba(100,180,255,0.02)" />
            </linearGradient>
          </defs>

          <!-- Grid lines -->
          ${gridLines.map(g => svg`
            <line x1="${ML}" y1="${g.y}" x2="${W - MR}" y2="${g.y}"
                  stroke="rgba(255,255,255,0.06)" stroke-width="0.5" />
            <text x="${ML - 4}" y="${g.y + 3.5}"
                  fill="rgba(255,255,255,0.3)" font-size="8" text-anchor="end"
                  font-family="system-ui, sans-serif">${g.label}</text>
          `)}

          <!-- Time labels -->
          ${timeLabels.map(t => svg`
            <text x="${toX(t.time)}" y="${H - 4}"
                  fill="rgba(255,255,255,0.3)" font-size="8" text-anchor="middle"
                  font-family="system-ui, sans-serif">${t.label}</text>
            <line x1="${toX(t.time)}" y1="${MT}" x2="${toX(t.time)}" y2="${MT + ch}"
                  stroke="rgba(255,255,255,0.04)" stroke-width="0.5" />
          `)}

          <!-- Area fill -->
          <path d="${areaPath}" fill="url(#areaFill)" />

          <!-- Line -->
          <path d="${linePath}" fill="none"
                stroke="rgba(100,180,255,0.8)" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" />

          <!-- Min marker -->
          ${this._renderMarker(data, points, min, '#64b5f6')}

          <!-- Max marker -->
          ${this._renderMarker(data, points, max, '#ef9a6e')}

          <!-- Current value dot -->
          <circle cx="${points[points.length - 1].x}" cy="${points[points.length - 1].y}"
                  r="3" fill="#81c784" stroke="rgba(0,0,0,0.3)" stroke-width="0.8" />
        </svg>
      </div>
    `;
  }

  /**
   * Find the data point closest to a target value and render a small marker.
   */
  private _renderMarker(
    data: HistoryDataPoint[],
    points: Array<{ x: number; y: number }>,
    targetVal: number,
    color: string,
  ) {
    let idx = 0;
    let closest = Infinity;
    for (let i = 0; i < data.length; i++) {
      const diff = Math.abs(data[i].value - targetVal);
      if (diff < closest) { closest = diff; idx = i; }
    }
    const p = points[idx];
    // Don't render if it overlaps with current (last) point
    if (idx === data.length - 1) return '';
    return svg`
      <circle cx="${p.x}" cy="${p.y}" r="2.5"
              fill="${color}" stroke="rgba(0,0,0,0.3)" stroke-width="0.6" />
    `;
  }

  /**
   * Monotone cubic Hermite interpolation (Fritsch–Carlson).
   * Produces a smooth, non-overshooting curve through all points.
   */
  private _monotonePath(pts: Array<{ x: number; y: number }>): string {
    if (pts.length < 2) return '';
    if (pts.length === 2) {
      return `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y}`;
    }

    const n = pts.length;
    // Compute slopes
    const dx: number[] = [];
    const dy: number[] = [];
    const m: number[] = [];

    for (let i = 0; i < n - 1; i++) {
      dx.push(pts[i + 1].x - pts[i].x);
      dy.push(pts[i + 1].y - pts[i].y);
      m.push(dy[i] / (dx[i] || 1));
    }

    // Tangents
    const tangent: number[] = [m[0]];
    for (let i = 1; i < n - 1; i++) {
      if (m[i - 1] * m[i] <= 0) {
        tangent.push(0);
      } else {
        tangent.push((m[i - 1] + m[i]) / 2);
      }
    }
    tangent.push(m[n - 2]);

    // Fritsch–Carlson monotonicity
    for (let i = 0; i < n - 1; i++) {
      if (Math.abs(m[i]) < 1e-10) {
        tangent[i] = 0;
        tangent[i + 1] = 0;
      } else {
        const a = tangent[i] / m[i];
        const b = tangent[i + 1] / m[i];
        const s = a * a + b * b;
        if (s > 9) {
          const t = 3 / Math.sqrt(s);
          tangent[i] = t * a * m[i];
          tangent[i + 1] = t * b * m[i];
        }
      }
    }

    // Build cubic bezier path
    let path = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < n - 1; i++) {
      const d = dx[i] / 3;
      const cp1x = pts[i].x + d;
      const cp1y = pts[i].y + tangent[i] * d;
      const cp2x = pts[i + 1].x - d;
      const cp2y = pts[i + 1].y - tangent[i + 1] * d;
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pts[i + 1].x},${pts[i + 1].y}`;
    }
    return path;
  }

  /**
   * Generate up to `maxLabels` evenly-spaced time labels for the x-axis.
   */
  private _computeTimeLabels(tMin: number, tMax: number, maxLabels: number) {
    const range = tMax - tMin;
    const labels: Array<{ time: number; label: string }> = [];

    // Target nice intervals (1h, 2h, 3h, 4h, 6h, 8h, 12h)
    const niceIntervals = [
      3600_000, 7200_000, 10800_000, 14400_000,
      21600_000, 28800_000, 43200_000,
    ];
    let interval = niceIntervals[0];
    for (const ni of niceIntervals) {
      if (range / ni <= maxLabels) { interval = ni; break; }
    }

    // Align to hour boundaries
    const startHour = new Date(tMin);
    startHour.setMinutes(0, 0, 0);
    let t = startHour.getTime();
    if (t < tMin) t += interval;

    while (t < tMax) {
      labels.push({ time: t, label: this._formatTime(t) });
      t += interval;
    }

    return labels;
  }

  // ── event handlers ───────────────────────────────────────

  private _close(): void {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  private _onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this._close();
    }
  }

  // ── render ───────────────────────────────────────────────

  render() {
    // Skip all computation when hidden — the overlay is opacity:0 anyway
    if (!this.open) {
      return html`<div class="history-overlay"></div>`;
    }

    const stats = this._stats();

    return html`
      <div
        class="history-overlay open"
        role="dialog"
        aria-label="${this.statName} history"
      >
        <div class="history-backdrop" @click=${this._close}></div>
        <div class="history-panel" tabindex="-1" @keydown=${this._onKeyDown}>
          <!-- Header -->
          <div class="history-header">
            <div class="history-header-left">
              ${this.statIcon ? html`
                <div class="history-icon">${unsafeHTML(this.statIcon)}</div>
              ` : ''}
              <div>
                <div class="history-title">${this.statName}</div>
                <div class="history-subtitle">Last 24 hours</div>
              </div>
            </div>
            <button
              class="history-close"
              @click=${this._close}
              aria-label="Close history"
            >✕</button>
          </div>

          ${this.loading ? html`
            <div class="history-loading">
              <div class="loading-spinner"></div>
              Loading history...
            </div>
          ` : this.data.length < 2 ? html`
            <div class="history-empty">No history data available</div>
          ` : html`
            <!-- Summary -->
            <div class="history-summary">
              <div class="summary-item">
                <div class="summary-label">Min</div>
                <div class="summary-value min">${this._formatVal(stats.min)}${this.statUnit ? ` ${this.statUnit}` : ''}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Max</div>
                <div class="summary-value max">${this._formatVal(stats.max)}${this.statUnit ? ` ${this.statUnit}` : ''}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Avg</div>
                <div class="summary-value avg">${this._formatVal(stats.avg)}${this.statUnit ? ` ${this.statUnit}` : ''}</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Now</div>
                <div class="summary-value current">${this._formatVal(stats.current)}${this.statUnit ? ` ${this.statUnit}` : ''}</div>
              </div>
            </div>

            <!-- Chart -->
            ${this._renderChart(stats)}
          `}
        </div>
      </div>
    `;
  }
}
