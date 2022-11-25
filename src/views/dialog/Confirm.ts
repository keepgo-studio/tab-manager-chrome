import { html, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { DialogComponent } from '@src/core/Dialog.core';

import styles from './Confirm.scss';

@customElement('app-confirm')
export class Confirm extends DialogComponent {

  @state()
  confirmMsg = '';

  @query('#dialog')
  dialog:Element | undefined;

  static styles = unsafeCSS(styles);

  private handleSubmit(e: Event) {
    const target = e.currentTarget as Element;

    if (target.className === 'confirm') {
      this.isConfirmed = true;
    } else {
      this.isConfirmed = false;
    }
  }

  constructor(confirmMsg: string = 'alert') {
    super();

    this.confirmMsg = confirmMsg;
  }

  render() {
    return html`
      <div id="dialog" theme=${this.userSetting.theme}>
        <div class="container">
          <h1>${this.confirmMsg}</h1>

          <button @click=${this.handleSubmit} class="confirm">confirm</button>
          <button @click=${this.handleSubmit} class="cancel">cancel</button>
        </div>
      </div>
    `;
  }
}
