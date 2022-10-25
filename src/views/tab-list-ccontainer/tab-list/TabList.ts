import { ThreeDotModes } from '../../components/ThreeDot';
import { css, html, PropertyValueMap, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { EventlessComponent } from '../../../core/Component.core';
import { styleMap } from 'lit/directives/style-map.js';
import { interpret, State, StateMachine } from 'xstate';
import { tabListMachine } from '../../../machine/tab-list.machine';
import { TabStyle } from './Tab';
import { IComponentEventType } from '../../../router';

import styles from './TabList.scss';

import './Tab';

const uiService = interpret(tabListMachine);

const TAB_HEIGHT = 72;
const MAX_REST_CNT = 4;

@customElement('app-tab-list')
class Tab extends EventlessComponent {
  private _state = uiService.initialState;

  private jsStyleMap = {
    restStyle: {},
    shouldShowRestNodes: {},
    shouldStretchDecorator: {},
    shouldRotateButton: {},
    active: {},
  };

  @property()
  mode: 'normal' | 'saved' = 'normal';

  @property({ type: Object })
  data!: CurrentWindow;

  constructor() {
    super();

    uiService
      .onTransition((s) => {
        this._state = s;
      })
      .start();
  }

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(styles)}
    `;
  }

  private handleMouseEnter() {
    uiService.send('mouseenter');
  }

  private handleMouseLeave() {
    uiService.send('mouseleave');
  }

  private handleButtonClick(e: Event) {
    /**
     * prevent invoke handleNodeClick listener
     */
    e.stopPropagation();

    if (this._state.context.isOpened) {
      uiService.send('open');
    } else {
      uiService.send('close');
    }
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    setTimeout(() => {
      this.renderRoot
        .querySelector('.node-container')
        ?.classList.add('appear-animation');
    }, 20);
  }

  render() {
    if (typeof this.data.id === 'undefined' || this.data.tabs.length === 0)
      return html``;

    const restNodesMaxHeight =
      (this.data.tabs.length > MAX_REST_CNT
        ? MAX_REST_CNT
        : this.data.tabs.length) * 32;

    this.jsStyleMap = {
      restStyle: {
        opacity: this._state.context.isOpened ? '1' : '0',
        display: this._state.matches('List opened.Opening') ? 'block' : 'none',
        height: this._state.matches('List opened.Opening')
          ? `${restNodesMaxHeight}px`
          : `${TAB_HEIGHT}px`,
      },
      shouldShowRestNodes: {
        height: this._state.matches('List opened.Opening')
          ? `${restNodesMaxHeight + TAB_HEIGHT}px`
          : `${TAB_HEIGHT}px`,
      },
      shouldStretchDecorator: {
        display: this.mode === 'saved' ? 'block' : 'none',
        height: `${
          TAB_HEIGHT +
          (this._state.matches('List opened.Opening') ? restNodesMaxHeight : 0)
        }px`,
      },
      shouldRotateButton: {
        transform: this._state.matches('List opened.Opening')
          ? 'rotate(45deg)'
          : '',
      },
      active: {
        color: '#3D73FF !important',
      },
    };

    const dialogHtml =
      this.mode === 'normal'
        ? html`
            <app-tab-dialog-current
              .shouldShow=${this._state.context.shouldShowDialog}
              .win=${this.data}
            ></app-tab-dialog-current>
          `
        : html`
            <app-tab-dialog-saved
              .windowId=${this.data.id}
              .shouldShow=${this._state.context.shouldShowDialog}
            ></app-tab-dialog-saved>
          `;

    const firstTab = this.data.tabs[0];
    const restTabs = this.data.tabs.slice(1);

    const isFocused = this.data.focused;

    return html`
      <div
        class="node-container"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        style=${styleMap(this.jsStyleMap.shouldShowRestNodes)}
      >
        <div
          id="${firstTab.id}"
          class="first"
          @click=${() =>
            this.sendToFront(IComponentEventType.USER_EVENT, {
              sender: this.constructor.name,
              data: {},
              type: UsersEventType.OPEN_TAB,
            })}
        >
          <div
            class="mode-decorator"
            style=${styleMap(this.jsStyleMap.shouldStretchDecorator)}
          ></div>

          <div class="first-fav-icon-container">
            ${firstTab.favIconUrl
              ? html`<img src="${firstTab.favIconUrl}" />`
              : html`<three-dot
                  width=${5}
                  height=${5}
                  mode=${ThreeDotModes['dot-flashing']}
                ></three-dot>`}
          </div>

          <div class="first-text-container">
            <h1
              style=${firstTab.active && isFocused ? styleMap(this.jsStyleMap.active) : ''}
            >
              ${firstTab.title}
            </h1>

            <a>${firstTab.url}</a>
          </div>

          <div class="button-container" @click=${this.handleButtonClick}>
            <svg
              style=${styleMap(this.jsStyleMap.shouldRotateButton)}
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 0C3.36 0 0 3.36 0 7.5C0 11.64 3.36 15 7.5 15C11.64 15 15 11.64 15 7.5C15 3.36 11.64 0 7.5 0ZM11.25 8.25H8.25V11.25H6.75V8.25H3.75V6.75H6.75V3.75H8.25V6.75H11.25V8.25Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <div class="rest" style=${styleMap(this.jsStyleMap.restStyle)}>
          ${repeat(
            restTabs,
            (tab) => tab.id,
            (tab) => html`
              <app-tab id=${tab.id} .isWindowFocused=${isFocused} .tabStyle=${TabStyle.MINI}></app-tab>
            `
          )}
        </div>

        ${dialogHtml}
      </div>
    `;
  }
}
