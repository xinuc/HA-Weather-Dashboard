import { css } from 'lit';

export const compassStyles = css`
  :host {
    display: block;
  }

  svg {
    width: 100%;
    height: auto;
    display: block;
  }

  .compass-needle {
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
