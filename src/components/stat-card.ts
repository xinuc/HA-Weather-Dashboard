import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { statCardStyles } from '../styles/stat-card';

@customElement('wdb-stat-card')
export class StatCard extends LitElement {
  @property() name = '';
  @property() value = '';
  @property() unit = '';
  @property() icon = '';

  static styles = statCardStyles;

  render() {
    return html`
      <div class="stat-card">
        <div class="stat-icon">${unsafeHTML(this.icon)}</div>
        <div class="stat-content">
          <div class="stat-name">${this.name}</div>
          <div class="stat-value">${this.value}${this.unit ? ` ${this.unit}` : ''}</div>
        </div>
      </div>
    `;
  }
}
