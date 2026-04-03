import { css } from 'lit';

export const skyHistoryStyles = css`
  :host {
    display: contents;
  }

  /* ─── Overlay Container ─── */

  .history-overlay {
    position: absolute;
    inset: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .history-overlay.open {
    opacity: 1;
    pointer-events: auto;
  }

  .history-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }

  /* ─── Panel ─── */

  .history-panel {
    position: relative;
    z-index: 1;
    background: rgba(10, 15, 30, 0.92);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px 10px 0 0;
    padding: 12px 0 10px;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    max-height: 65%;
  }

  .history-overlay.open .history-panel {
    transform: translateY(0);
  }

  .history-panel:focus {
    outline: none;
  }

  .history-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .history-title {
    font-size: 0.72rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.6);
  }

  .history-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    font-size: 1.1rem;
    cursor: pointer;
    padding: 2px 4px;
    border-radius: 4px;
    line-height: 1;
    transition: color 0.15s, background 0.15s;
  }

  .history-close:hover {
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.08);
  }

  /* ─── Timeline ─── */

  .history-timeline {
    display: flex;
    gap: 6px;
    padding: 12px 14px 4px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .history-timeline::-webkit-scrollbar {
    display: none;
  }

  /* ─── Entry ─── */

  .history-entry {
    flex: 0 0 auto;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    min-width: 72px;
  }

  /* ─── Thumbnail ─── */

  .history-thumb {
    position: relative;
    width: 72px;
    height: 50px;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: border-color 0.15s;
  }

  .history-entry.current .history-thumb {
    border-color: rgba(255, 255, 255, 0.35);
  }

  .thumb-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -52%);
    width: 60%;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.25));
  }

  .thumb-icon svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .thumb-moon {
    position: absolute;
    top: 3px;
    left: 4px;
    width: 12px;
    height: 12px;
    opacity: 0.8;
  }

  .thumb-moon svg {
    width: 100%;
    height: 100%;
  }

  .thumb-stars {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  /* ─── Labels ─── */

  .history-label {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .history-time {
    font-size: 0.62rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
  }

  .history-temp {
    font-size: 0.58rem;
    color: rgba(255, 255, 255, 0.4);
  }

  /* ─── Connector ─── */

  .history-connector {
    display: flex;
    align-items: center;
    padding: 2px 14px 0;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .history-connector::-webkit-scrollbar {
    display: none;
  }

  .connector-segment {
    flex: 0 0 72px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Account for gap between entries */
  .connector-segment + .connector-line {
    flex: 0 0 6px;
  }

  .connector-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
  }

  .connector-segment.current .connector-dot {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
  }

  .connector-line {
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
  }

  /* ─── Loading State ─── */

  .history-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    opacity: 0.5;
    font-size: 0.78rem;
  }

  .loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.15);
    border-top-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 10px;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* ─── Empty State ─── */

  .history-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    opacity: 0.4;
    font-size: 0.78rem;
  }
`;
