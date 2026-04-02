import { css } from 'lit';

export const statCardStyles = css`
  :host {
    display: block;
  }

  .stat-card {
    background: var(--wdb-stat-bg, rgba(100, 149, 237, 0.18));
    border: 1px solid var(--wdb-stat-border, rgba(255, 255, 255, 0.08));
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stat-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stat-icon svg {
    width: 32px;
    height: 32px;
  }

  .stat-name {
    font-size: 0.7rem;
    opacity: 0.7;
  }

  .stat-value {
    font-size: 1.1rem;
    font-weight: 700;
  }
`;
