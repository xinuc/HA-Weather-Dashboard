import { css } from 'lit';

export const weatherSceneStyles = css`
  .weather-scene-panel {
    display: flex;
    flex-direction: column;
  }

  .weather-scene {
    position: relative;
    width: calc(100% - 32px);
    aspect-ratio: 16 / 11;
    margin: 12px 16px 8px;
    border-radius: 8px;
    overflow: hidden;
    transition: background 0.5s ease;
  }

  .weather-scene.sky-day {
    background: linear-gradient(180deg, #5b9bd5 0%, #7ab8e0 60%, #a0cce8 100%);
  }

  .weather-scene.sky-night {
    background: linear-gradient(180deg, #0a1628 0%, #162040 40%, #1a2a4a 80%, #1e3050 100%);
  }

  .weather-scene.sky-overcast {
    background: linear-gradient(180deg, #6a7a8a 0%, #8a9aaa 60%, #a0aab5 100%);
  }

  .weather-scene.sky-stormy {
    background: linear-gradient(180deg, #3a4050 0%, #4a5060 40%, #5a6070 80%, #4a5565 100%);
  }

  .weather-scene.sky-night-overcast {
    background: linear-gradient(180deg, #1a2030 0%, #2a3040 40%, #3a4555 80%, #354050 100%);
  }

  .weather-icon-container {
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -55%);
    width: 45%;
    max-width: 150px;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  .weather-icon-container:hover {
    transform: translate(-50%, -55%) scale(1.05);
  }

  .weather-icon-container:active {
    transform: translate(-50%, -55%) scale(0.97);
  }

  .weather-icon-container svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .weather-info {
    position: absolute;
    bottom: 0;
    right: 0;
    text-align: right;
    padding: 12px 16px;
    background: linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 100%);
    border-radius: 0 0 8px 0;
    width: 60%;
  }

  .condition-text {
    font-size: 0.9rem;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }

  .temp-display {
    font-size: 2.2rem;
    font-weight: 700;
    text-shadow: 0 2px 6px rgba(0,0,0,0.3);
    line-height: 1.1;
  }

  .scene-details {
    display: flex;
    gap: 10px;
    font-size: 0.7rem;
    opacity: 0.85;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .moon-icon {
    position: absolute;
    top: 8px;
    left: 12px;
    width: 36px;
    height: 36px;
    opacity: 0.85;
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.4));
    pointer-events: none;
  }

  .moon-icon svg {
    width: 100%;
    height: 100%;
  }

  .stars {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: none;
  }

  .weather-scene.show-stars .stars {
    display: block;
  }

  /* AQI badge is positioned by its own shadow DOM styles */

  :host([narrow]) .weather-scene {
    aspect-ratio: 16 / 10;
  }

  :host([narrow]) .temp-display {
    font-size: 1.8rem;
  }

`;
