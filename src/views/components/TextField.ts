import { EventlessComponent } from '@src/core/Component.core';
import { html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './TextField.scss';

export const enum TextFieldEventType {
  INPUT = 'text',
}

export type InputDetail = { value: 'string' };

@customElement('app-text-field')
class TextField extends EventlessComponent {
  static styles = unsafeCSS(styles);

  @property()
  width: number | '100%' = '100%';

  @property()
  height: number = 48;

  @property()
  inputStyle: 'normal' | 'round' = 'normal';

  @property()
  placeholder = '';

  @property()
  maxlength = 30;

  inputHandler(e: InputEvent) {
    const target = e.currentTarget as HTMLInputElement;

    target.setAttribute('value', target.value);

    const valEvent = new CustomEvent('textinput', {
      detail: { value: target.value },
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
    this.dispatchEvent(valEvent);
  }

  protected render(): unknown {
    // 16 : 48 = font-size : height
    const ratioFontSize = (this.height * 16) / 48;

    // 16: 12 = ratioFontSize : focusedFontSize
    const ratioFocusFontSize = (ratioFontSize * 12) / 16;

    const inlintStlyeTag = html`
      <style>
        input {
          width: ${typeof this.width === 'number'
            ? `${this.width}px`
            : this.width};
          height: ${this.height}px;
          font-size: ${ratioFontSize}px;
          border-radius: ${this.inputStyle === 'normal' ? 4 : 999}px;
        }
        input,
        .label .text {
          font-size: ${ratioFontSize}px;
        }
        input:focus + .label .text {
          font-size: ${ratioFocusFontSize}px;
        }
        input:focus + .label .text,
        :not(input[value='']) + .label .text {
          font-size: ${ratioFocusFontSize}px;
          top: -5px;
        }
      </style>
    `;

    return html`
      ${inlintStlyeTag}

      <div class="input-container" theme=${this.userSetting.theme}>
        <i></i>

        <input
          autofocus
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
