/**
 * mini-first
 * mini
 *
 * tablet
 *
 * side
 */

import { interpret } from 'xstate';
import { EventlessComponent } from '../../../core/Component.core';
import { customElement, property } from 'lit/decorators.js';
import { tabMachine } from '../../../machine/tab.machine';
import { html } from 'lit';
import { ThreeDotModes } from '../../components/ThreeDot';
import { styleMap } from 'lit/directives/style-map.js';
import { IComponentEventType } from '../../../router';

export const enum TabStyle {
  MINI,
  TABLET,
  SIDE,
}
const uiService = interpret(tabMachine);

@customElement('app-tab')
class Tab extends EventlessComponent {
  private _state = uiService.initialState;

  private active;

  private showCloseBtn;

  @property()
  tabStyle: TabStyle = TabStyle.MINI
  
  @property()
  idx!: number;

  @property()
  tabData!: CurrentTab;
  
  @property()
  isWindowFocused = false;

  constructor() {
    super();
  
    this.active = {
      color: '#3D73FF !important',
    };

    uiService.onTransition(s => this._state = s).start();

    this.showCloseBtn = {
      opacity: this._state.matches('Hover') ? '1' : '0'
    }
  }

  handleTabClick() {
    this.sendToFront(IComponentEventType.USER_EVENT, {
      sender: this.constructor.name,
      data: {},
      type: UsersEventType.OPEN_TAB
    })
  }

  handleTabMouseEnter() {
    uiService.send('mouseenter')
  }

  handleTabMouseLeave() {
    uiService.send('mouseleave')
  }

  handleTabDelete() {
    this.sendToFront(IComponentEventType.USER_EVENT, {
      sender: this.constructor.name,
      data: { tabId: this.tabData.id },
      type: UsersEventType.CLOSE_TAB
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


  miniTabRender() {
    console.log(this.tabData);
    return html`
        <div
          class="rest-tab-container"
          @click=${this.handleTabClick}
          @mouseenter=${this.handleTabMouseEnter}
          @mouseleave=${this.handleTabMouseLeave}
        >
          <div class="rest-fav-icon-container">
            ${this.tabData.favIconUrl !== undefined
              ? html`<img src=${this.tabData.favIconUrl} />`
              : html`<three-dot
                  width=${2}
                  height=${2}
                  mode=${ThreeDotModes['dot-flashing']}
                ></three-dot>`}
          </div>

          <div class="rest-text-container">
            <a
              style=${this.tabData.active && this.isWindowFocused
                ? styleMap(this.active)
                : ''}
              >${this.tabData.title}</a
            >
          </div>

          <button 
          @click=${this.handleTabDelete}
          style=${styleMap(this.showCloseBtn)}
          >
            <p>X</p>
          </button>
        </div>
    `;
  }

  render() {
    switch(this.tabStyle) {
      case TabStyle.MINI:
        return this.miniTabRender();
      case TabStyle.SIDE:
      case TabStyle.TABLET:
    }
    return ;
  }
}
