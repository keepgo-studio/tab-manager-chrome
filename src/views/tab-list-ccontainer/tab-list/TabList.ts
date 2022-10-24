import { ThreeDotModes } from '../../components/ThreeDot';
import { css, html, PropertyValueMap, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { EventlessComponent } from '../../../core/Component.core';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './TabList.scss';
import { interpret } from 'xstate';
import { tabListMachine } from '../../../machine/tab-list.machine';

const uiService = interpret(tabListMachine);

const TAB_HEIGHT = 72;

@customElement('app-tab')
class Tab extends EventlessComponent {
  private _state;

  @property()
  mode: 'normal' | 'saved' = 'normal';

  @property({ type: Object })
  data!: CurrentWindow;

  constructor() {
    super();
    this._state = uiService.state;

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


    const maxCount = 4;
    const restNodesMaxHeight =
      (this.data.tabs.length > maxCount ? maxCount : this.data.tabs.length) *
      32;
    const setRestHeight = {
      height: this.isOpening
        ? `${restNodesMaxHeight}px`
        : `${windowNodeDefaultHeight}px`,
    };
    const shouldShowRestNodesOpacity = { opacity: this.isOpened ? '1' : '0' };
    const shouldShowRestNodesDisplay = {
      display: this.isOpening ? 'block' : 'none',
    };

    const shouldShowRestNodes = {
      height: this.isOpening
        ? `${restNodesMaxHeight + 72}px`
        : `${windowNodeDefaultHeight}px`,
    };

    // for only save mode
    const shouldStretchDecorator = {
      height: `${
        windowNodeDefaultHeight + (this.isOpening ? restNodesMaxHeight : 0)
      }px`,
    };

    let firstTabHtml;
    let restTabHtml;
    if (this.data.tabs.length > 0) {
      firstTabHtml = html` <app-tab></app-tab> `;

      restTabHtml = html` <app-tab></app-tab> `;
    }

    const dialogHtml =
      this.mode === 'normal'
        ? html`
            <app-tab-dialog-current
              .shouldShow=${this.shouldShowDialog}
              .win=${this.data}
            ></app-tab-dialog-current>
          `
        : html`
            <app-tab-dialog-saved
              .windowId=${this.data.id}
              .shouldShow=${this.shouldShowDialog}
            ></app-tab-dialog-saved>
          `;

    return html`
      <div
        class="node-container"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        style=${styleMap(shouldShowRestNodes)}
      >
        ${this.mode === 'saved'
          ? ''
          : html`
              <div
                class="mode-decorator"
                style=${styleMap(shouldStretchDecorator)}
              ></div>
            `}
        ${dialogHtml} ${firstTabHtml} ${restTabHtml}
      </div>
    `;
  }
}
