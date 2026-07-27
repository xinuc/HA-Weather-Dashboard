import { css } from 'lit';

export const dashboardStyles = css`
  :host {
    display: block;
    --wdb-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;

    /* Weather-native accents — shared by both themes */
    --wdb-sky: #2e96ff;
    --wdb-sun: #ffb627;
    --wdb-coral: #ff6b5a;
    --wdb-mint: #17d2a3;
    --wdb-iris: #897cf2;

    /* Canvas + surfaces — dark HA theme (default) */
    --wdb-canvas: linear-gradient(180deg, #151c30 0%, #1b2544 55%, #182038 100%);
    --wdb-text: #eef3ff;
    --wdb-text-muted: rgba(238, 243, 255, 0.62);
    --wdb-panel-bg: rgba(255, 255, 255, 0.055);
    --wdb-panel-border: rgba(255, 255, 255, 0.1);
    --wdb-stat-bg: rgba(255, 255, 255, 0.05);
    --wdb-stat-bg-hover: rgba(255, 255, 255, 0.09);
    --wdb-stat-border: rgba(255, 255, 255, 0.09);
    --wdb-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);

    /* Instruments (compass/gauge) — ink flips, needle uses accent */
    --wdb-instrument-ink: #dbe4f7;
    --wdb-compass-face-1: #2a3a5c;
    --wdb-compass-face-2: #1a2a4a;

    /* Weather-scene overlay text stays light in both themes (own scrim) */
    --wdb-scene-text: #ffffff;
  }

  /* Light HA theme — airy sky-wash canvas, dark ink, accents nudged for contrast */
  :host([data-theme='light']) {
    --wdb-sky: #1e7fe6;
    --wdb-sun: #e8930a;
    --wdb-coral: #f0503c;
    --wdb-mint: #06a986;
    --wdb-iris: #6c5ce0;

    --wdb-canvas: linear-gradient(180deg, #e9f2ff 0%, #f5faff 60%, #eef5ff 100%);
    --wdb-text: #182338;
    --wdb-text-muted: #5e6c86;
    --wdb-panel-bg: rgba(24, 52, 104, 0.045);
    --wdb-panel-border: rgba(24, 52, 104, 0.1);
    --wdb-stat-bg: rgba(24, 52, 104, 0.036);
    --wdb-stat-bg-hover: rgba(24, 52, 104, 0.07);
    --wdb-stat-border: rgba(24, 52, 104, 0.09);
    --wdb-shadow: 0 8px 28px rgba(30, 58, 110, 0.12);

    --wdb-instrument-ink: #33425c;
    --wdb-compass-face-1: #e4edfb;
    --wdb-compass-face-2: #cfddf1;
  }

  ha-card {
    background: var(--wdb-canvas);
    color: var(--wdb-text);
    font-family: var(--wdb-font);
    border-radius: var(--ha-card-border-radius, 16px);
    overflow: hidden;
    padding-bottom: 2px;
    box-shadow: var(--wdb-shadow);
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

  .scene-panel {
    position: relative;
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

  .wind-instrument.clickable {
    cursor: pointer;
  }

  .wind-instrument.clickable:active {
    transform: scale(0.97);
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
