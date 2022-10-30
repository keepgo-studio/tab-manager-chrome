import { interpret } from 'xstate';
import { EventlessComponent } from '../../../core/Component.core';
import { customElement, property } from 'lit/decorators.js';
import { tabUiMachine } from '../../../machine/tab-ui.machine';
import { css, html, unsafeCSS } from 'lit';
import { ThreeDotModes } from '../../components/ThreeDot';
import { styleMap } from 'lit/directives/style-map.js';

import styles from "./Tab.scss";
import { UsersEventType } from '../../../shared/events';

const uiService = interpret(tabUiMachine);

@customElement('app-tab')
class Tab extends EventlessComponent {
  state = uiService.initialState;

  active;

  showCloseBtn;

  @property()
  idx?: number;

  @property()
  tabData!: CurrentTab;

  @property()
  isWindowFocused = false;

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(styles)}
    `;
  }

  constructor() {
    super();

    this.active = {
      color: '#3D73FF !important',
    };

    uiService.onTransition((s) => (this.state = s)).start();

    this.showCloseBtn = {
      opacity: this.state.matches('Hover') ? '1' : '0',
    };
  }

  handleTabClick() {
    this.sendToFront({
      discriminator: 'IFrontMessage',
      sender: this.tagName,
      command: UsersEventType.OPEN_TAB,
      data: {
        windowId: this.tabData.windowId,
        tabId: this.tabData.id
      }
    })
  }

  handleTabDelete() {
    this.sendToFront({
      discriminator: 'IFrontMessage',
      sender: this.tagName,
      command: UsersEventType.CLOSE_TAB,
      data: {
        windowId: this.tabData.windowId,
        tabId: this.tabData.id
      }
    })
  }

  handleFaviconError(e: Event) {
    const elem = e.currentTarget as Element;
    const newElem = document.createElement('three-dot');
    newElem.setAttribute('width', '5');
    newElem.setAttribute('height', '5');
    newElem.setAttribute('mode', 'dot-flashing');

    elem.parentNode!.replaceChild(newElem, elem);
  }
  
  handleTabMouseEnter() {
    uiService.send('mouseenter');
  }

  handleTabMouseLeave() {
    uiService.send('mouseleave');
  }

  render() {
    if (this.tabData === undefined) return html``;

    switch (this.sizeMode) {
      case 'mini':
        console.log(this.idx)
        if (this.idx) {
          const s= miniFirstTabRender(this)
          console.log(s);
          return s;
        } else {
          return miniTabRender(this);
        }
      case 'side':
        return;
      case 'tablet':
        return;
    }
  }
}


function miniFirstTabRender(self: Tab) {

  return html`
    <div class="first-fav-icon-container">
      ${self.tabData.favIconUrl
        ? html`<img src="${self.tabData.favIconUrl}" />`
        : html`<three-dot
            width=${5}
            height=${5}
            mode=${ThreeDotModes['dot-flashing']}
          ></three-dot>`}
    </div>

    <div class="first-text-container">
      <h1
        style=${self.isWindowFocused && self.tabData.active
          ? styleMap(self.active)
          : ''}
      >
        ${self.tabData.title}
      </h1>

      <a>${self.tabData.url}</a>
    </div>
  `;
}

function miniTabRender(self: Tab) {
  return html`
    <div
      class="rest-tab-container"
      @click=${self.handleTabClick}
      @mouseenter=${self.handleTabMouseEnter}
      @mouseleave=${self.handleTabMouseLeave}
    >
      <div class="rest-fav-icon-container">
        ${self.tabData.favIconUrl !== undefined
          ? html`<img src=${self.tabData.favIconUrl} />`
          : html`<three-dot
              width=${2}
              height=${2}
              mode=${ThreeDotModes['dot-flashing']}
            ></three-dot>`}
      </div>

      <div class="rest-text-container">
        <a
          style=${self.isWindowFocused && self.tabData.active
            ? styleMap(self.active)
            : ''}
          >${self.tabData.title}</a
        >
      </div>

      <button
        @click=${self.handleTabDelete}
        style=${styleMap(self.showCloseBtn)}
      >
        <p>X</p>
      </button>
    </div>
  `;
}