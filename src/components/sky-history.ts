import { LitElement, html, svg } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { skyHistoryStyles } from '../styles/sky-history';
import { skyGradientCSS } from '../sky-color';
import { getConditionIcon, getMoonIcon } from '../icons';
import { SkyHistoryEntry } from '../sky-history-store';

// Simplified stars for thumbnails — static, no animation
const THUMB_STARS = [
  { cx: 10, cy: 8, r: 0.6, opacity: 0.5 },
  { cx: 32, cy: 14, r: 0.8, opacity: 0.4 },
  { cx: 55, cy: 6, r: 0.5, opacity: 0.45 },
  { cx: 18, cy: 30, r: 0.7, opacity: 0.35 },
  { cx: 48, cy: 22, r: 0.55, opacity: 0.5 },
  { cx: 62, cy: 35, r: 0.6, opacity: 0.3 },
];

@customElement('wdb-sky-history')
export class SkyHistory extends LitElement {
  @property({ type: Array }) entries: readonly SkyHistoryEntry[] = [];
  @property({ type: Boolean }) loading = false;
  @property({ type: Boolean }) open = false;
  @property() tempUnit = '°C';

  @query('.history-panel') private _panel?: HTMLElement;
  @query('.history-timeline') private _timeline?: HTMLElement;
  @query('.history-connector') private _connector?: HTMLElement;

  static styles = skyHistoryStyles;

  connectedCallback(): void {
    super.connectedCallback();
    this._onDocClick = this._onDocClick.bind(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onDocClick, true);
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('open')) {
      if (this.open) {
        // Focus the panel so Escape key works
        requestAnimationFrame(() => {
          this._panel?.focus();
        });
        // Listen for clicks anywhere in the document to close on outside click
        // Use capture phase + RAF to avoid the opening click from immediately closing
        requestAnimationFrame(() => {
          document.addEventListener('click', this._onDocClick, true);
        });
      } else {
        document.removeEventListener('click', this._onDocClick, true);
      }
    }

    // Auto-scroll to latest entry when panel opens or entries arrive
    const shouldScroll =
      (changed.has('open') && this.open) ||
      (changed.has('entries') && this.open && this.entries.length > 0);

    if (shouldScroll) {
      setTimeout(() => {
        if (this._timeline) {
          this._timeline.scrollLeft = this._timeline.scrollWidth;
        }
        if (this._connector) {
          this._connector.scrollLeft = this._connector.scrollWidth;
        }
      }, 350);
    }
  }

  private _close(): void {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
  }

  /** Close when clicking anywhere outside the history panel */
  private _onDocClick(e: MouseEvent): void {
    if (!this.open || !this._panel) return;
    // Check if the click target is inside the panel (composedPath crosses shadow DOM)
    const path = e.composedPath();
    if (!path.includes(this._panel)) {
      this._close();
    }
  }

  private _onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this._close();
    }
  }

  private _onTimelineScroll(): void {
    if (!this._timeline || !this._connector) return;
    const t = this._timeline;
    const c = this._connector;
    const maxT = t.scrollWidth - t.clientWidth;
    const maxC = c.scrollWidth - c.clientWidth;
    if (maxT > 0 && maxC > 0) {
      c.scrollLeft = (t.scrollLeft / maxT) * maxC;
    }
  }

  private _formatTime(ts: number): string {
    const d = new Date(ts);
    const now = new Date();
    const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

    // Show "Yesterday" prefix if the entry is from a different calendar day
    if (d.getDate() !== now.getDate() || d.getMonth() !== now.getMonth()) {
      return `Y ${time}`;
    }
    return time;
  }

  private _renderThumb(entry: SkyHistoryEntry, isCurrent: boolean) {
    const bgStyle = `background: ${skyGradientCSS(entry.skyGradient)}`;
    const icon = getConditionIcon(entry.condition);

    return html`
      <div class="history-entry ${isCurrent ? 'current' : ''}">
        <div class="history-thumb" style=${bgStyle}>
          ${entry.showStars ? html`
            <svg class="thumb-stars" viewBox="0 0 72 50" preserveAspectRatio="xMidYMid slice">
              ${THUMB_STARS.map(s => svg`
                <circle cx=${s.cx} cy=${s.cy} r=${s.r} fill="#fff" opacity=${s.opacity}/>
              `)}
            </svg>
          ` : ''}
          ${entry.showMoon && entry.moonPhase ? html`
            <div class="thumb-moon">${unsafeHTML(getMoonIcon(entry.moonPhase))}</div>
          ` : ''}
          <div class="thumb-icon">${unsafeHTML(icon)}</div>
        </div>
        <div class="history-label">
          <span class="history-time">${this._formatTime(entry.timestamp)}</span>
          ${entry.temperature !== undefined ? html`
            <span class="history-temp">${Math.round(entry.temperature)}${this.tempUnit}</span>
          ` : ''}
        </div>
      </div>
    `;
  }

  private _renderConnector() {
    return this.entries.map((_, i) => {
      const isCurrent = i === this.entries.length - 1;
      return html`
        ${i > 0 ? html`<div class="connector-line"></div>` : ''}
        <div class="connector-segment ${isCurrent ? 'current' : ''}">
          <div class="connector-dot"></div>
        </div>
      `;
    });
  }

  render() {
    return html`
      <div
        class="history-overlay ${this.open ? 'open' : ''}"
        role="dialog"
        aria-label="Sky condition history"
      >
        <div class="history-backdrop" @click=${this._close}></div>
        <div class="history-panel" tabindex="-1" @keydown=${this._onKeyDown}>
          <div class="history-header">
            <span class="history-title">Sky History</span>
            <button
              class="history-close"
              @click=${this._close}
              aria-label="Close sky history"
            >✕</button>
          </div>

          ${this.loading ? html`
            <div class="history-loading">
              <div class="loading-spinner"></div>
              Loading sky history...
            </div>
          ` : this.entries.length === 0 ? html`
            <div class="history-empty">No sky history available</div>
          ` : html`
            <div class="history-timeline" @scroll=${this._onTimelineScroll}>
              ${this.entries.map((entry, i) =>
                this._renderThumb(entry, i === this.entries.length - 1)
              )}
            </div>

            <div class="history-connector">
              ${this._renderConnector()}
            </div>
          `}
        </div>
      </div>
    `;
  }
}
