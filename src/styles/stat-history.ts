import { css } from 'lit';

export const statHistoryStyles = css`
  :host {
    display: contents;
  }

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
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .history-panel {
    position: relative;
    width: 90%;
    max-width: 520px;
    background: linear-gradient(180deg, rgba(18, 30, 52, 0.97) 0%, rgba(14, 24, 44, 0.97) 100%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transform: translateY(20px) scale(0.96);
    transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .history-overlay.open .history-panel {
    transform: translateY(0) scale(1);
  }

  .history-panel:focus {
    outline: none;
  }

  /* Header */
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
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    opacity: 0.9;
  }

  .history-icon svg {
    width: 28px;
    height: 28px;
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

  /* Summary stats row */
  .history-summary {
    display: flex;
    margin-bottom: 16px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    overflow: hidden;
  }

  .summary-item {
    flex: 1;
    text-align: center;
    padding: 10px 6px;
  }

  .summary-item + .summary-item {
    border-left: 1px solid rgba(255, 255, 255, 0.06);
  }

  .summary-label {
    font-size: 0.6rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.45;
    margin-bottom: 3px;
  }

  .summary-value {
    font-size: 1.1rem;
    font-weight: 700;
  }

  .summary-value.min {
    color: #64b5f6;
  }

  .summary-value.max {
    color: #ef9a6e;
  }

  .summary-value.avg {
    color: rgba(255, 255, 255, 0.8);
  }

  .summary-value.current {
    color: #81c784;
  }

  /* Chart container */
  .chart-container {
    position: relative;
    width: 100%;
    aspect-ratio: 2.8 / 1;
    min-height: 120px;
  }

  .chart-svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  /* Loading state */
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

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Empty state */
  .history-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 140px;
    opacity: 0.4;
    font-size: 0.85rem;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .history-panel {
      width: 95%;
      padding: 16px;
    }

    .summary-value {
      font-size: 0.95rem;
    }
  }
`;
