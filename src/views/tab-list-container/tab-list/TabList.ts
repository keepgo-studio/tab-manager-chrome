import { css, html, PropertyValueMap, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { EventlessComponent } from '@src/core/Component.core';
import { styleMap } from 'lit/directives/style-map.js';
import { interpret } from 'xstate';
import { tabListUiMachine } from '@src/machine/tab-list-ui.machine';

import stylesMini from './TabList-mini.scss';

import './Menu.styled';
import './tab/Tab';

@customElement('app-tab-list')
class TabList extends EventlessComponent {
  uiService;

  @state()
  isOpened = false;

  @state()
  shouldShowMenu = false;

  @state()
  state = tabListUiMachine.initialState;

  @property()
  appMode!: TAppMode;

  @property({ type: Object, hasChanged: () => true })
  winData!: ChromeWindow;

  constructor() {
    super();

    this.uiService = interpret(
      tabListUiMachine.withConfig({
        guards: {
          'list is not opened': () => !this.isOpened,
          'list is opened': () => this.isOpened,
        },
        actions: {
          toggle: () => (this.isOpened = !this.isOpened),
          'Hide dialog': () => (this.shouldShowMenu = false),
          'Show dialog': () => (this.shouldShowMenu = true),
        },
      })
    )
      .onTransition((s) => (this.state = s))
      .start();
  }

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(stylesMini)}
    `;
  }

  handleMouseEnter() {
    this.uiService.send('mouseenter');
  }

  handleMouseLeave() {
    this.uiService.send('mouseleave');
  }

  handleButtonClick(e: Event) {
    /**
     * prevent invoke handleNodeClick listener
     */
    e.stopPropagation();

    this.uiService.send('Toggle');
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    
    this.renderRoot
      .querySelector('.node-container')
      ?.classList.add('appear-animation');
  }

  render() {
    if (typeof this.winData === 'undefined' || this.winData.tabs!.length === 0)
      return html``;

    switch (this.sizeMode) {
      case 'mini':
        return miniRender(this);
      case 'side':
        return;
      case 'tablet':
        return;
    }
  }
}

function miniRender(self: TabList) {
  const dialogHtml = html`
    <app-tab-list-menu
      .mode=${self.appMode}
      .win=${self.winData}
      style=${styleMap({
        transition: 'ease 300ms',
        opacity: self.shouldShowMenu ? '1' : '0',
      })}
    ></app-tab-list-menu>
  `;

  const firstTabHtml = html`
    <div class="first">
      <app-tab
        .appMode=${self.appMode}
        .idx=${0}
        .tabData=${self.winData.tabs![0]}
        .isWindowFocused=${self.winData.focused}
      ></app-tab>

      <div class="button-container" @click=${self.handleButtonClick}>
        <svg
          style=${styleMap({
            transform: self.isOpened ? 'rotate(45deg)' : '',
          })}
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
  `;

  const restTabs = self.winData.tabs!.slice(1);
  const restTabsHtml = html`
    <div
      class="rest"
      style=${styleMap({
        maxHeight: self.isOpened ? `132px` : `0px`,
        opacity: self.isOpened ? '1' : '0',
      })}
    >
      <ul>
        ${repeat(
          restTabs,
          (tab) => tab.id,
          (tab) => html`
            <li>
              <app-tab
                .appMode=${self.appMode}
                .tabData=${tab}
                .isWindowFocused=${self.winData.focused}
              ></app-tab>
            </li>
          `
        )}
      </ul>
    </div>
  `;

  return html`
    <div
      class="node-container"
      @mouseenter=${self.handleMouseEnter}
      @mouseleave=${self.handleMouseLeave}
    >
      <div
        class="mode-decorator"
        style=${styleMap({
          display: self.appMode === 'save' ? 'initial' : 'none',
        })}
      ></div>

      ${firstTabHtml} ${restTabsHtml} ${dialogHtml}
    </div>
  `;
}
