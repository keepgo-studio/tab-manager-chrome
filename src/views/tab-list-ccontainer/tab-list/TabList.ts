import { css, html, PropertyValueMap, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { EventlessComponent } from '../../../core/Component.core';
import { styleMap } from 'lit/directives/style-map.js';
import { interpret } from 'xstate';
import { tabListUiMachine } from '../../../machine/tab-list-ui.machine';

import stylesMini from  "./TabList-mini.scss"

import "./Menu.styled"
import './tab/Tab';

const uiService = interpret(tabListUiMachine);

const TAB_HEIGHT = 72;
const MAX_REST_CNT = 4;


@customElement('app-tab-list')
class TabList extends EventlessComponent {
  state = uiService.initialState;

  jsStyleMap = {
    restStyle: {},
    shouldShowRestNodes: {},
    shouldStretchDecorator: {},
    shouldRotateButton: {},
    active: {},
  };

  @property()
  appMode!: TAppMode;

  @property({ type: Object })
  winData!: CurrentWindow;

  constructor() {
    super();

    uiService.onTransition((s) => this.state = s).start();
  }

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(stylesMini)}
    `;
  }

  handleMouseEnter() {
    uiService.send('mouseenter');
  }

  handleMouseLeave() {
    uiService.send('mouseleave');
  }

  handleButtonClick(e: Event) {
    /**
     * prevent invoke handleNodeClick listener
     */
    e.stopPropagation();

    if (this.state.context.isOpened) {
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
    if (typeof this.winData === 'undefined' || this.winData.tabs.length === 0)
      return html``;

    // const restNodesMaxHeight =
    //   (this.winData.tabs.length > MAX_REST_CNT
    //     ? MAX_REST_CNT
    //     : this.winData.tabs.length) * 32;

    // this.jsStyleMap = {
    //   restStyle: {
    //     opacity: this.state.context.isOpened ? '1' : '0',
    //     display: this.state.matches('List opened.Opening') ? 'block' : 'none',
    //     height: this.state.matches('List opened.Opening')
    //       ? `${restNodesMaxHeight}px`
    //       : `${TAB_HEIGHT}px`,
    //   },
    //   shouldShowRestNodes: {
    //     height: this.state.matches('List opened.Opening')
    //       ? `${restNodesMaxHeight + TAB_HEIGHT}px`
    //       : `${TAB_HEIGHT}px`,
    //   },
    //   shouldStretchDecorator: {
    //     display: this.appMode === 'save' ? 'block' : 'none',
    //     height: `${
    //       TAB_HEIGHT +
    //       (this.state.matches('List opened.Opening') ? restNodesMaxHeight : 0)
    //     }px`,
    //   },
    //   shouldRotateButton: {
    //     transform: this.state.matches('List opened.Opening')
    //       ? 'rotate(45deg)'
    //       : '',
    //   },
    //   active: {
    //     color: '#3D73FF !important',
    //   },
    // };

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
      .win=${self.appMode === 'normal' ? self.winData : ''}
      .shouldShow=${self.state.context.shouldShowDialog}
    ></app-tab-list-menu>
  `;

  const firstTabHtml = html`
    <div class="first">
      <div
        class="mode-decorator"
        style=${styleMap(self.jsStyleMap.shouldStretchDecorator)}
      ></div>

      <app-tab
      .idx=${0}
      .tabData=${self.winData.tabs[0]}
      .isWindowFocused=${self.winData.focused}
      ></app-tab>

      <div class="button-container" @click=${self.handleButtonClick}>
        <svg
          style=${styleMap(self.jsStyleMap.shouldRotateButton)}
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

  const restTabs = self.winData.tabs.slice(1);
  const restTabsHtml = html`
    <div class="rest" style=${styleMap(self.jsStyleMap.restStyle)}>
    ${repeat(
        restTabs,
        (tab) => tab.id,
        (tab) => html`
          <app-tab
            .tabData=${tab}
            .isWindowFocused=${self.winData.focused}
          ></app-tab>
        `)}
    </div>
  `;


  return html`
    <div
      class="node-container"
      @mouseenter=${self.handleMouseEnter}
      @mouseleave=${self.handleMouseLeave}
      style=${styleMap(self.jsStyleMap.shouldShowRestNodes)}
    >
      ${firstTabHtml}

      ${restTabsHtml}
      
      ${dialogHtml}
    </div>
  `;
}
