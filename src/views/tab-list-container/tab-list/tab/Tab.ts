import { interpret } from 'xstate';
import { EventlessComponent } from '@src/core/Component.core';
import { customElement, property, state } from 'lit/decorators.js';
import { tabUiMachine } from '@src/machine/tab-ui.machine';
import { css, html, unsafeCSS } from 'lit';
import { ThreeDotModes } from '@src/views/components/ThreeDot';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './Tab.scss';
import { focusTab, removeTab } from '@src/utils/browser-api';
import { UsersEventType } from '@src/shared/events';
import { Confirm } from '@src/views/dialog/Confirm';

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

  @property()
  appMode!: TAppMode;

  @property({ hasChanged: () => true })
  tabData!: ChromeTab;

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
          'open tab or open saved window with new window': async () => {
            if (this.appMode === 'normal') {
              focusTab(this.tabData.windowId, this.tabData.id!, {
                top: 0,
                left: window.screen.width / 2,
                width: window.screen.width / 2,
                height: window.screen.height - 24,
                state: 'normal',
              });
            } else if (this.appMode === 'save') {
              if (!(await new Confirm('저장된 창을 여시겠습니까?').show()))
                return;

              this.sendToFront({
                discriminator: 'IFrontMessage',
                sender: this.tagName,
                command: UsersEventType.OPEN_SAVED_WINDOW,
                data: { windowId: this.tabData.windowId },
              });
            }
          },

          'remove the tab or remove the tab from idb': async () => {
            if (this.appMode === 'normal') {
              removeTab(this.tabData.id!);
            } else if (this.appMode === 'save') {
              if (!(await new Confirm('해당 탭을 삭제하시겠습니까?').show()))
                return;

              this.sendToFront({
                discriminator: 'IFrontMessage',
                sender: this.tagName,
                command: UsersEventType.DELETE_SAVED_TAB,
                data: {
                  tabId: this.tabData.id,
                  windowId: this.tabData.windowId,
                },
              });
            }
          },
        },
      })
    )
      .onTransition((s) => (this.state = s))
      .start();
  }

  tabClickHandler() {
    this.uiService.send('mousedown');
  }

  tabDeleteHandler() {
    this.uiService.send('remove');
  }

  faviconErrorHandler(e: Event, size: 'large' | 'small') {
    const elem = e.currentTarget as Element;
    const newElem = document.createElement('three-dot');

    let width = '0';
    let height = '0';
    if (size === 'large') {
      width = '5'; height = '5';
    } else if (size ==='small') {
      width = '2'; height = '2';
    }
    newElem.setAttribute('width', width);
    newElem.setAttribute('height', height);
    newElem.setAttribute('mode', 'dot-flashing');

    elem.parentNode!.replaceChild(newElem, elem);
  }

  tabMouseEnterHandler() {
    this.uiService.send('mouseenter');
  }

  tabMouseLeaveHandler() {
    this.uiService.send('mouseleave');
  }

  render() {
    if (this.tabData === undefined) return html``;

    switch (this.userSetting.size) {
      case 'mini':
        if (this.idx === 0) {
          return this.miniFirstTabRender();
        } else {
          return this.miniTabRender();
        }
      case 'side':
        return this.tabletRender();
      case 'tablet':
        return this.tabletRender();
    }
  }

  miniFirstTabRender() {
    return html`
      <div
        class="first-tab-container"
        @click=${this.tabClickHandler}
        @mouseenter=${this.tabMouseEnterHandler}
        @mouseleave=${this.tabMouseLeaveHandler}
      >
        <div class="first-fav-icon-container">
          ${this.tabData.favIconUrl
            ? html`<img
                src="${this.tabData.favIconUrl}"
                @error=${(e: Event) => this.faviconErrorHandler(e, 'large')}
              />`
            : html`<three-dot
                width=${5}
                height=${5}
                mode=${ThreeDotModes['dot-flashing']}
              ></three-dot>`}
        </div>

        <div class="first-text-container">
          <h1
            style=${this.appMode === 'normal' &&
            this.isWindowFocused &&
            this.tabData.active
              ? styleMap(this.active)
              : ''}
          >
            ${this.tabData.title}
          </h1>

          <a>${this.tabData.url}</a>
        </div>
      </div>
    `;
  }

  miniTabRender() {
    return html`
      <div
        class="rest-tab-container"
        @click=${this.tabClickHandler}
        @mouseenter=${this.tabMouseEnterHandler}
        @mouseleave=${this.tabMouseLeaveHandler}
      >
        <div class="rest-fav-icon-container">
          ${this.tabData.favIconUrl
            ? html`<img
                src=${this.tabData.favIconUrl}
                @error=${(e: Event) => this.faviconErrorHandler(e, 'small')}
              />`
            : html`<three-dot
                width=${2}
                height=${2}
                mode=${ThreeDotModes['dot-flashing']}
              ></three-dot>`}
        </div>

        <div class="rest-text-container">
          <a
            style=${this.appMode === 'normal' &&
            this.isWindowFocused &&
            this.tabData.active
              ? styleMap(this.active)
              : ''}
            >${this.tabData.title}</a
          >
        </div>

        <button
          @click=${this.tabDeleteHandler}
          style=${styleMap({
            display: this.state.matches('Hover') ? 'flex' : 'none',
            opacity: this.state.matches('Hover.Opened') ? '1' : '0',
          })}
        >
          <p>X</p>
        </button>
      </div>
    `;
  }

  tabletRender() {
    return html`
      <div
        class="tablet-tab-container"
        @click=${this.tabClickHandler}
        @mouseenter=${this.tabMouseEnterHandler}
        @mouseleave=${this.tabMouseLeaveHandler}
        theme=${this.userSetting.theme}
      >
        ${this.tabData.favIconUrl
          ? html`<img 
            src="${this.tabData.favIconUrl}" 
            @error=${(e: Event) => this.faviconErrorHandler(e, 'large')}
            />`
          : html`<three-dot
              width=${5}
              height=${5}
              mode=${ThreeDotModes['dot-flashing']}
            ></three-dot>`}

        <button
          @click=${this.tabDeleteHandler}
          style=${styleMap({
            display: this.state.matches('Hover') ? 'flex' : 'none',
            opacity: this.state.matches('Hover.Opened') ? '1' : '0',
          })}
        >
          <p>X</p>
        </button>
      </div>
    `;
  }
}
