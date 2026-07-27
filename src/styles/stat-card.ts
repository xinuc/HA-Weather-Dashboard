import { css } from 'lit';

export const statCardStyles = css`
  :host {
    display: block;
  }

  .stat-card {
    /* Plain fallback first, then a faint category-accent wash on top
       (kept subtle so it complements the colourful meteocon icons). */
    background: var(--wdb-stat-bg, rgba(255, 255, 255, 0.05));
    background:
      linear-gradient(
        0deg,
        color-mix(in srgb, var(--stat-accent, transparent) 9%, transparent),
        color-mix(in srgb, var(--stat-accent, transparent) 9%, transparent)
      ),
      var(--wdb-stat-bg, rgba(255, 255, 255, 0.05));
    border: 1px solid var(--wdb-stat-border, rgba(255, 255, 255, 0.09));
    border-color: color-mix(in srgb, var(--stat-accent, transparent) 20%, var(--wdb-stat-border, rgba(255, 255, 255, 0.09)));
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .stat-icon {
    flex-shrink: 0;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9px;
    background: color-mix(in srgb, var(--stat-accent, transparent) 14%, transparent);
  }

  .stat-icon svg {
    width: 26px;
    height: 26px;
  }

  .stat-card.clickable {
    cursor: pointer;
    transition: background 0.15s ease, transform 0.12s ease;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .stat-card.clickable:hover {
    background: var(--wdb-stat-bg-hover, rgba(255, 255, 255, 0.09));
    background:
      linear-gradient(
        0deg,
        color-mix(in srgb, var(--stat-accent, transparent) 16%, transparent),
        color-mix(in srgb, var(--stat-accent, transparent) 16%, transparent)
      ),
      var(--wdb-stat-bg-hover, rgba(255, 255, 255, 0.09));
  }

  .stat-card.clickable:active {
    transform: scale(0.97);
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
