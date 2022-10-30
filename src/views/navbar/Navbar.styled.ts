import { css, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EventlessComponent } from '../../core/Component.core';
import { UsersEventType } from '../../shared/events';

const styled = css`
  nav {
    width: 100%;
    height: 65px;
    display: flex;
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.1);
  }

  #profile,
  #favicon,
  #window {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #profile:hover,
  #window:hover {
    background-color: rgba(202, 202, 202, 0.3);
    cursor: pointer;
  }

  #profile {
    width: 50px;
  }
  #profile img {
    width: 30px;
    height: fit-content;
  }

  #favicon {
    flex: 1;
  }
  #favicon img {
    width: 148px;
    height: fit-content;
  }

  #window {
    width: 50px;
  }
  #window img {
    width: 18px;
    height: fit-content;
  }
`;

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
        // alert
      },
    },
  ];

  static get styles() {
    return css`
      ${super.styles}
      ${styled}
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

    return html` <nav>${menu}</nav> `;
  }
}
