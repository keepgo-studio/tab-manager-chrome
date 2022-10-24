/**
 * mini-first
 * mini
 *
 * tablet
 *
 * side
 */

import { interpret, StateMachine } from 'xstate';
import { EventlessComponent } from '../../../core/Component.core';
import { customElement, property } from 'lit/decorators.js';
import { tabMachine } from '../../../machine/tab.machine';
import { html } from 'lit';
import { ThreeDotModes } from '../../components/ThreeDot';
import { styleMap } from 'lit/directives/style-map';

export const enum TabStyle {
  MINI_FIRST,
  MINI,
  TABLET,
  SIDE,
}
const uiService = interpret(tabMachine);

@customElement('app-tab')
class Tab extends EventlessComponent {
  private state;

  private active;

  @property()
  tabStyle: TabStyle = TabStyle.MINI_FIRST
  
  @property()
  idx!: number;

  @property()
  tabData!: CurrentTab;

  constructor() {
    super();

    this.active = {
      color: '#3D73FF !important',
    };
  }

  handleTabClick() {}

  handleFaviconError(e: Event) {
    const elem = e.currentTarget as Element;
    const newElem = document.createElement('three-dot');
    newElem.setAttribute('width', '5');
    newElem.setAttribute('height', '5');
    newElem.setAttribute('mode', 'dot-flashing');

    elem.parentNode!.replaceChild(newElem, elem);
  }

  firstTabRender() {
    return html` <div
      id="${this.tabData.id}"
      class="first"
      @click=${this.handleTabClick}
    >
      <div class="first-fav-icon-container">
        ${this.tabData.favIconUrl
          ? html`<img
              src="${this.tabData.favIconUrl}"
              @error=${this.handleFaviconError}
            />`
          : html`<three-dot
              width=${5}
              height=${5}
              mode=${ThreeDotModes['dot-flashing']}
            ></three-dot>`}
      </div>

      <div class="first-text-container">
        <h1 style=${this.tabData.active ? styleMap(this.active) : ''}>
          ${this.tabData.title}
        </h1>

        <a>${this.tabData.url}</a>
      </div>

      <div class="button-container" @click=${this.handleButtonClick}>
        <svg
          style=${styleMap(shouldRotateButton)}
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
    </div>`;
  }

  restTabRender() {
    const shouldShowDialogStyle = {
      opacity: this._state.matches('') ? '1' : '0',
      zIndex: this._state.matches('Hover') ? '999' : '0',
    };
    const shouldRotateButton = {
      transform: this.isOpening ? 'rotate(45deg)' : '',
    };

    return html`
      <div
        class="rest"
        style=${styleMap({
          ...shouldShowRestNodesOpacity,
          ...shouldShowRestNodesDisplay,
          ...setRestHeight,
        })}
      >
        ${repeat(
          this.data.tabs,
          (tab) => tab.id,
          (tab, idx) =>
            idx > 0
              ? html`
                  <div
                    id="${tab.id}"
                    class="rest-tab-container"
                    @click=${this.handleNodeClick}
                    @mouseenter=${this.handleRestMouseEnter}
                    @mouseleave=${this.handleRestMouseLeave}
                  >
                    <div class="rest-fav-icon-container">
                      ${tab.favIconUrl
                        ? html`<img src=${tab.favIconUrl} />`
                        : html`<three-dot
                            width=${2}
                            height=${2}
                            mode=${ThreeDotModes['dot-flashing']}
                          ></three-dot>`}
                    </div>

                    <div class="rest-text-container">
                      <a
                        style=${this.occurTabId[0] === tab.id
                          ? styleMap(colorIfActiveTab)
                          : ''}
                        >${tab.title}</a
                      >
                    </div>

                    <button @click=${this.handleTabCloseClick}>
                      <p>X</p>
                    </button>
                  </div>
                `
              : ''
        )}
      </div>
    `;
  }

  render() {
    return;
  }
}
