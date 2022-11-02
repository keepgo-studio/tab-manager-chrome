import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { EventlessComponent } from '../../../core/Component.core';
import { UsersEventType } from '../../../shared/events';
import { closeWindow } from '../../../utils/browser-api';

const styled = css`
  .dialog-container {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%);
    border-radius: 999px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background: linear-gradient(
      90deg,
      rgb(255, 255, 255) 50%,
      rgb(215, 255, 231) 50%
    );
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.1);
    transition: ease 100ms;
  }

  .dialog-container svg {
    padding: 1px 4px;
    height: 15px;
  }

  .dialog-container svg:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .dialog-container .close {
    width: 13px;
    padding: 1px 4px 1px 6px;
    border-radius: 999px 0 0 999px;
  }

  .dialog-container .saved {
    width: 10px;
    padding: 1px 6px 1px 4px;
    border-radius: 0 999px 999px 0;
  }

  /* ----- if the tab list is save mode ----- */
  .dialog-container-save-mode {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%);
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: center;
    background: #fff;
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.1);
    transition: ease 100ms;
  }

  .dialog-container-save-mode .close-save-mode {
    width: 13px;
    height: 13px;
    padding: 2px;
    border-radius: 999px;
  }
  .dialog-container-save-mode svg:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

function normalRender(self: TabListMenu) {
  return html` <div class="dialog-container">
    <svg
      @click=${self.closeHandler}
      class="close"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z"
        fill="black"
      />
    </svg>

    <svg
      @click=${self.savedHandler}
      class="saved"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V4L14 0ZM16 16H2V2H13.17L16 4.83V16ZM9 9C7.34 9 6 10.34 6 12C6 13.66 7.34 15 9 15C10.66 15 12 13.66 12 12C12 10.34 10.66 9 9 9ZM3 3H12V7H3V3Z"
        fill="black"
      />
    </svg>
  </div>`;
}

function saveRender(self: TabListMenu) {
  return html` <div
    class="dialog-container-save-mode"
  >
    <svg
      @click=${self.closeHandler}
      class="close-save-mode"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z"
        fill="black"
      />
    </svg>
  </div>`;
}

@customElement('app-tab-list-menu')
export class TabListMenu extends EventlessComponent {
  @property()
  mode!: TAppMode;

  @property()
  win?: CurrentWindow;

  static styles = styled;

  closeHandler() {
    if (this.win === undefined) {
      console.error('Window data should passed to menu component')
      return;
    }

    closeWindow(this.win.id!);
  }

  savedHandler() {
    this.sendToFront({
      discriminator: 'IFrontMessage',
      sender: this.tagName,
      command: UsersEventType.SAVE_WINDOW,
      data: {
        win: this.win,
      },
    });
  }

  render() {
    switch (this.mode) {
      case 'normal':
        return normalRender(this);
      case 'save':
        return saveRender(this);
    }
  }
}
