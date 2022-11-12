import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './SelectField.scss';
import ArrowBackSvg from '@public/img/arrow-back.svg';
import CheckCircleSvg from '@public/img/check-circle.svg';

@customElement('app-select-field')
class SelectField extends LitElement {
  @property()
  selected = '';

  @property({ type: Array<String> })
  optionList = [];

  @state()
  clicked = false;

  static styles = unsafeCSS(styles);

  headerClickHandler() {
    this.clicked = !this.clicked;
  }

  boxClickHandler(e: Event) {
    const target = e.currentTarget as Element;

    if (e.defaultPrevented) {
      e.preventDefault();
    }

    const selectEvent = new CustomEvent('selected', {
      detail: { selectedThemeMode: target.id },
      /**
       * If an event is composed but does not bubble, it can only be received on the element that dispatches the event and on the host element containing the shadow root.
       * reference: https://lit.dev/docs/components/events/#shadowdom-retargeting
       */
      bubbles: false,
      composed: true,
    });

    if (e.defaultPrevented) {
      e.preventDefault();
    }
    this.dispatchEvent(selectEvent);

    this.clicked = false;
  }

  protected render() {
    return html`
      <div class="container">
        <div class="select-header" @click=${this.headerClickHandler}>
          <span>
            <b>${this.optionList.find((option) => option === this.selected)}</b>
          </span>

          <button clicked=${this.clicked}>${unsafeHTML(ArrowBackSvg)}</button>
        </div>

        <ul
          class="select-box"
          style=${styleMap({
            maxHeight: this.clicked ? `132px` : `0px`,
            opacity: this.clicked ? '1' : '0',
          })}
        >
          ${repeat(
            this.optionList,
            (option) => option,
            (option) => html` <li
              id=${option}
              @click=${this.boxClickHandler}
              selected=${option === this.selected}
            >
              ${option}
              ${option === this.selected
                ? html`<i>${unsafeHTML(CheckCircleSvg)}</i>`
                : ''}
            </li>`
          )}
        </ul>
      </div>
    `;
  }
}
