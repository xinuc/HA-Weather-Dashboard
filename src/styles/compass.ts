import { css } from 'lit';

export const compassStyles = css`
  :host {
    display: block;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
    /* Ticks, numbers and labels are drawn with currentColor + per-element
       opacity, so the dial ink flips with the HA theme. */
    color: var(--wdb-instrument-ink, #eef3ff);
  }

  .compass-needle {
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* North tip points to the wind bearing — accent it in both themes. */
  .needle-n {
    fill: var(--wdb-sky, #2e96ff);
  }
`;
