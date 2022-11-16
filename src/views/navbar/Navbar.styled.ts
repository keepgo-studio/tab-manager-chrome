import { css, html, TemplateResult, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EventlessComponent } from '@src/core/Component.core';
import { UsersEventType } from '@src/shared/events';

import styles from './Navbar.scss';

@customElement('app-navbar')
class Navbar extends EventlessComponent {
  private _mode: TAppMode = 'normal';

  @state()
  icons = [
    {
      id: 'window',
      path: './img/window-light.png',
      clickHandler: () => {
        this._mode = this._mode === 'normal' ? 'save' : 'normal';

        this.sendToFront({
          discriminator: 'IFrontMessage',
          sender: this.tagName,
          command: UsersEventType.CHANGE_MODE,
          data: { mode: this._mode },
        });
      },
    },
    {
      id: 'favicon',
      path: './img/favicon-light.png',
      clickHandler: () => {},
    },

    {
      id: 'profile',
      path: './img/person_round-light.png',
      clickHandler: () => {
        this.sendToFront({
          discriminator: 'IFrontMessage',
          sender: this.tagName,
          command: UsersEventType.OPEN_SETTING,
          data: {}
        })
      },
    },
  ];

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(styles)}
    `;
  }

  render(): TemplateResult {
    const menu = this.icons.map(
      ({ id, path, clickHandler }) =>
        html`
          <div id=${id} @click="${clickHandler}">
            <img .src="${path}" />
          </div>
        `
    );

    return html` <nav sizeMode=${this.userSetting.size}>${menu}</nav> `;
  }
}
