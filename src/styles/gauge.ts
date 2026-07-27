import { css } from 'lit';

export const gaugeStyles = css`
  :host {
    display: block;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
    /* Ticks, numbers, unit label and needle use currentColor so the gauge
       ink flips with the HA theme; the colour bands stay fixed. */
    color: var(--wdb-instrument-ink, #eef3ff);
  }

  .gauge-needle {
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
