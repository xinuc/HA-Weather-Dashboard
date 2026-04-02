import { css } from 'lit';

export const dashboardStyles = css`
  :host {
    display: block;
    --wdb-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
    --wdb-panel-bg: rgba(255,255,255,0.08);
    --wdb-panel-border: rgba(255,255,255,0.1);
    --wdb-text: #fff;
    --wdb-text-muted: rgba(255,255,255,0.75);
    --wdb-stat-bg: rgba(100,149,237,0.18);
    --wdb-stat-border: rgba(255,255,255,0.08);
  }

  ha-card {
    background: var(--ha-card-background,
      linear-gradient(180deg, #1a3a5c 0%, #1e4d6e 50%, #1a3a5c 100%)
    );
    color: var(--primary-text-color, var(--wdb-text));
    font-family: var(--wdb-font);
    border-radius: var(--ha-card-border-radius, 16px);
    overflow: hidden;
    padding-bottom: 2px;
    box-shadow: var(--ha-card-box-shadow, 0 8px 32px rgba(0,0,0,0.4));
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 16px 24px 8px;
    flex-wrap: wrap;
    gap: 4px 16px;
  }

  .header-left {
    display: flex;
    align-items: baseline;
    gap: 16px;
    flex-wrap: wrap;
  }

  .header-title {
    font-size: 1.6rem;
    font-weight: 800;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .header-location {
    font-size: 1rem;
    font-weight: 400;
    opacity: 0.9;
  }

  .header-date {
    font-size: 0.85rem;
    opacity: 0.75;
  }

  .main-panels {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 12px;
    padding: 8px 16px;
  }

  .panel {
    background: var(--wdb-panel-bg);
    border-radius: 12px;
    border: 1px solid var(--wdb-panel-border);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px 0;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    opacity: 0.8;
  }

  .stats-section {
    padding: 8px 16px 16px;
  }

  .stats-label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    opacity: 0.7;
    padding: 4px 0 8px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .wind-panel {
    padding: 0 16px 12px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
  }

  .wind-instruments {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 8px;
    align-items: start;
  }

  .wind-instrument {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wind-sublabel {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    opacity: 0.7;
    text-align: center;
    margin-bottom: 4px;
  }

  .wind-svg-container {
    width: 100%;
    max-width: 170px;
    aspect-ratio: 1;
  }

  .gauge-svg-container {
    width: 100%;
    max-width: 210px;
  }

  .wind-value {
    text-align: center;
    margin-top: auto;
  }

  .wind-value-primary {
    font-size: 1.2rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .wind-value-secondary {
    font-size: 0.7rem;
    opacity: 0.7;
  }

  /* Narrow (mobile < 500px) */
  :host([narrow]) .main-panels {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  :host([narrow]) .header {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 16px 16px 6px;
    gap: 0;
  }

  :host([narrow]) .header-left {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  :host([narrow]) .header-location {
    order: -1;
    font-size: 0.9rem;
  }

  :host([narrow]) .header-title {
    font-size: 1.4rem;
  }

  :host([narrow]) .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  :host([narrow]) .wind-svg-container,
  :host([narrow]) .gauge-svg-container {
    max-width: 160px;
  }

  :host([narrow]) .wind-value-primary {
    font-size: 1rem;
  }

  /* Wide (desktop >= 768px): 5-column stats */
  :host([wide]) .stats-grid {
    grid-template-columns: repeat(5, 1fr);
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
