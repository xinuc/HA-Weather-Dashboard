import { LitElement } from 'lit';

type Constructor<T = {}> = new (...args: any[]) => T;

export interface OverlayMixinInterface {
  open: boolean;
  _panel?: HTMLElement;
  _close(): void;
  _onDocClick(e: MouseEvent): void;
  _onKeyDown(e: KeyboardEvent): void;
}

/**
 * Mixin that adds overlay panel behaviour to a LitElement:
 *   – dispatches a 'close' event
 *   – closes on Escape key
 *   – closes on click outside the .history-panel element
 *   – focuses the panel when opened
 *   – manages document-level click listener lifecycle
 *
 * Requirements for the consuming class:
 *   – must have `@property({ type: Boolean }) open`
 *   – must have `@query('.history-panel') _panel`
 */
export function OverlayMixin<T extends Constructor<LitElement>>(superClass: T) {
  class OverlayMixinClass extends superClass {
    declare open: boolean;
    declare _panel?: HTMLElement;

    connectedCallback(): void {
      super.connectedCallback();
      this._onDocClick = this._onDocClick.bind(this);
    }

    disconnectedCallback(): void {
      super.disconnectedCallback();
      document.removeEventListener('click', this._onDocClick, true);
    }

    updated(changed: Map<string, unknown>): void {
      super.updated(changed);
      if (changed.has('open')) {
        if (this.open) {
          // Focus the panel so Escape key works
          requestAnimationFrame(() => {
            this._panel?.focus();
          });
          // Use capture phase + RAF to avoid the opening click from immediately closing
          requestAnimationFrame(() => {
            document.addEventListener('click', this._onDocClick, true);
          });
        } else {
          document.removeEventListener('click', this._onDocClick, true);
        }
      }
    }

    _close(): void {
      this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    }

    /** Close when clicking anywhere outside the history panel */
    _onDocClick(e: MouseEvent): void {
      if (!this.open || !this._panel) return;
      const path = e.composedPath();
      if (!path.includes(this._panel)) {
        this._close();
      }
    }

    _onKeyDown(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        this._close();
      }
    }
  }

  return OverlayMixinClass as unknown as Constructor<OverlayMixinInterface> & T;
}
