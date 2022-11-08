import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './TextField.scss';

@customElement('app-text-field')
class TextField extends LitElement {
  static styles = unsafeCSS(styles);

	inputHandler(e: InputEvent) {
		const target = e.currentTarget as HTMLInputElement;

		target.setAttribute('value', target.value)
	}

  protected render(): unknown {
    return html`
      <div class="input-container">
        <input
				@input
          type="text"
          id="fname"
          name="fname"
          value=""
          aria-labelledby="label-fname"
        />
        <label class="label" for="fname" id="label-fname">
          <div class="text">First Name</div>
        </label>
      </div>
    `;
  }
}
