import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './TextField.scss';

export const enum TextFieldEventType {
  INPUT = 'text'
}

export type InputDetail = { value: 'string' }

@customElement('app-text-field')
class TextField extends LitElement {
  static styles = unsafeCSS(styles);

  @property()
  placeholder = '';

  @property() 
  maxlength = 30;

	inputHandler(e: InputEvent) {
		const target = e.currentTarget as HTMLInputElement;

		target.setAttribute('value', target.value)

    const valEvent = new CustomEvent('textinput', {
      detail: { value: target.value },
      /**
       * If an event is composed but does not bubble, it can only be received on the element that dispatches the event and on the host element containing the shadow root.
       * reference: https://lit.dev/docs/components/events/#shadowdom-retargeting
       */
      bubbles: false,
      composed: true,
    })

    if (e.defaultPrevented) {
      e.preventDefault();
    }
    this.dispatchEvent(valEvent);
	}

  protected render(): unknown {
    return html`
      <div class="input-container">

        <i></i>

        <input
				  @input=${this.inputHandler}
          type="text"
          id="search-input"
          name="text-field"
          value=""
          maxlength=${this.maxlength}
          aria-labelledby="label-search"
        />
        <label class="label" for="text-field" id="label-search">
          <div class="text">${this.placeholder}</div>
        </label>
      </div>
    `;
  }
}
