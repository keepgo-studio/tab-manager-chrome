import { interpret } from 'xstate';
import { EventlessComponent } from '../../../../core/Component.core';
import { customElement, property, state } from 'lit/decorators.js';
import { tabUiMachine } from '../../../../machine/tab-ui.machine';
import { css, html, unsafeCSS } from 'lit';
import { ThreeDotModes } from '../../../components/ThreeDot';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './Tab.scss';
import { focusTab, removeTab } from '../../../../utils/browser-api';

@customElement('app-tab')
class Tab extends EventlessComponent {
  active;

  uiService;

  @state()
  state = tabUiMachine.initialState;

  @state()
  showCloseBtn = {};

  @property()
  idx?: number;

  @property({ hasChanged: () => true})
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

    this.uiService = interpret(
      tabUiMachine.withConfig({
        actions: {
          'open tab': () =>
            focusTab(this.tabData.windowId, this.tabData.id!, {
              top: 0,
              left: window.screen.width / 2,
              width: window.screen.width / 2,
              height: window.screen.height - 24,
              state: 'normal',
            }),

          'remove the tab': () => removeTab(this.tabData.id!),
        },
      })
    )
      .onTransition((s) => this.state = s)
      .start();
  }

  handleTabClick() {
    this.uiService.send('mousedown');
  }

  handleTabDelete() {
    this.uiService.send('remove');
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
    this.uiService.send('mouseenter');
  }

  handleTabMouseLeave() {
    this.uiService.send('mouseleave');
  }

  render() {
    if (this.tabData === undefined) return html``;

    switch (this.sizeMode) {
      case 'mini':
        if (this.idx === 0) {
          return miniFirstTabRender(this);
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
    <div
      class="first-tab-container"
      @click=${self.handleTabClick}
      @mouseenter=${self.handleTabMouseEnter}
      @mouseleave=${self.handleTabMouseLeave}
    >
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
        style=${styleMap({
          display: self.state.matches('Hover') ? 'flex' : 'none',
          opacity: self.state.matches('Hover.Opened') ? '1' : '0',
        })}
      >
        <p>X</p>
      </button>
    </div>
  `;
}
