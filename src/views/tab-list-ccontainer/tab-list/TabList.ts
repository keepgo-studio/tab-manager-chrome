import { ThreeDotModes } from '../../components/ThreeDot';
import { css, html, PropertyValueMap, unsafeCSS } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { EventlessComponent } from '../../../core/Component.core';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './TabList.scss';


@customElement('app-tab')
class Tab extends EventlessComponent {
  @property()
  mode: 'normal' | 'saved' = 'normal';

  @property({ type: Object })
  data!: CurrentWindow;

  @property({ reflect: true })
  occurTabId: Array<number> = [-1];

  @property()
  occurWindowId: Array<number> = [-1];

  @state()
  isOpening = false;

  @state()
  isOpened = false;

  @state()
  isHover = false;

  @query('.node-container')
  _nodeContainer!: Element;

  static get styles() {
    return css`
      ${super.styles}

      ${unsafeCSS(styles)}
    `;
  }

  private handleMouseEnter() {
    this.isHover = true;
  }

  private handleMouseLeave() {
    this.isHover = false;
  }

  private handleRestMouseEnter(e: Event) {
    const target = e.currentTarget as Element;

    if (this.mode === 'current') {
      target.setAttribute('hover', '');
    }
  }

  private handleRestMouseLeave(e: Event) {
    const target = e.currentTarget as Element;

    if (this.mode === 'current') {
      target.removeAttribute('hover');
    }
  }

  private handleButtonClick(e: Event) {
    /**
     * prevent invoke handleNodeClick listener
     */
    e.stopPropagation();

    if (!this.isOpened) {
      this.isOpening = true;

      setTimeout(() => {
        this.isOpened = true;
      }, 250);
    } else {
      this.isOpened = false;

      setTimeout(() => {
        this.isOpening = false;
      }, 250 / 2);
    }
  }

  private async handleCloseClick() {
    if (this.mode === 'current') {
      const isConfirmed = await new AppConfirm(
        'Are you really want to close this window?',
        'closing window'
      ).show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent('close-window', {
          detail: {
            windowId: this.data.id,
            tabsLength: this.data.tabs.length,
            firstTabId: this.data.tabs[0].id,
          },
        })
      );
    } else {
      const isConfirmed = await new AppConfirm(
        'Are you really want to remove this window?',
        'removing window'
      ).show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent('remove-saved-window', {
          detail: {
            windowId: this.data.id,
          },
        })
      );
    }
  }

  private async handleTabCloseClick(e: Event) {
    e.stopPropagation();

    const target = e.currentTarget as Element;

    const tabId = parseInt(target.parentElement!.id);

    if (this.mode === 'current') {
      const isConfirmed = await new AppConfirm(
        'Are you really want to close this tab?',
        'removing tab'
      ).show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent('close-tab', {
          detail: {
            tabId,
          },
        })
      );
    }
  }

  private async handleSavedClick() {
    if (this.mode === 'current') {
      const isConfirmed = await new AppConfirm(
        'Are you really want to save this window?',
        'saving window'
      ).show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent('save-window', {
          detail: {
            win: this.data,
          },
        })
      );
    }
  }

  private async handleNodeClick(e: Event) {
    if (this.mode === 'current') {
      const targetNode = e.currentTarget as Element;

      const tabId = Number.parseInt(targetNode.id);

      window.dispatchEvent(
        new CustomEvent('open-tab', {
          detail: {
            windowId: this.data.id,
            tabId: tabId,
          },
        })
      );
    } else if (this.mode === 'saved') {
      const isConfirmed = await new AppConfirm(
        'Are you really want to reopen this window?',
        'reopneing window'
      ).show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent('open-saved-window', {
          detail: {
            win: this.data,
          },
        })
      );
    }
  }

  private handleFaviconError(e: Event) {
    consoleLitComponent(this, 'faviocn loadFailed');

    const elem = e.currentTarget as Element;
    const newElem = document.createElement('three-dot');
    newElem.setAttribute('width', '5');
    newElem.setAttribute('height', '5');
    newElem.setAttribute('mode', 'dot-flashing');

    elem.parentNode!.replaceChild(newElem, elem);
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    setTimeout(() => {
      this._nodeContainer.classList.add('appear-animation');
    }, 20);
  }

  protected willUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (this.data.tabs.length === 0) {
      this._nodeContainer.classList.remove('appear-animation');

      setTimeout(() => {
        this.parentNode?.removeChild(this);
      }, 300);
    }
  }

  render() {
    if (typeof this.data.id === 'undefined') return html``;

    const windowNodeDefaultHeight = 72;

    const shouldShowDialogStyle = {
      opacity: this.isHover ? '1' : '0',
      zIndex: this.isHover ? '999' : '0',
    };
    const shouldRotateButton = {
      transform: this.isOpening ? 'rotate(45deg)' : '',
    };

    const maxCount = 4;
    const restNodesMaxHeight =
      (this.data.tabs.length > maxCount
        ? maxCount
        : this.data.tabs.length) * 32;
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

    const colorIfActiveTab = {
      color: '#3D73FF !important',
    };

    // for only save mode
    const shouldStretchDecorator = {
      height: `${
        windowNodeDefaultHeight + (this.isOpening ? restNodesMaxHeight : 0)
      }px`,
    };

    // consoleLitComponent(this, [this.occurTabId, this.occurWindowId])
    let firstTabHtml;
    let restTabHtml;
    if (this.data.tabs.length > 0) {
      const firstTab = this.data.tabs[0];
      firstTabHtml = html` <div
        id="${firstTab.id}"
        class="first"
        @click=${this.handleNodeClick}
      >
        <div class="first-fav-icon-container">
          ${this.mode === 'current'
            ? ''
            : html`
                <div
                  class="mode-decorator"
                  style=${styleMap(shouldStretchDecorator)}
                ></div>
              `}
          ${firstTab.favIconUrl
            ? html`<img
                src="${firstTab.favIconUrl}"
                @error=${this.handleFaviconError}
              />`
            : html`<three-dot
                width=${5}
                height=${5}
                mode=${ThreeDotModes['dot-flashing']}
              ></three-dot>`}
        </div>

        <div class="first-text-container">
          <h1
            style=${this.occurTabId[0] === firstTab.id
              ? styleMap(colorIfActiveTab)
              : ''}
          >
            ${firstTab.title}
          </h1>

          <a>${firstTab.url}</a>
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

      restTabHtml = html`
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

    const dialogHtml =
      this.mode === 'current'
        ? html`
            <div
              class="dialog-container"
              style=${styleMap(shouldShowDialogStyle)}
            >
              <svg
                @click=${this.handleCloseClick}
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
                @click=${this.handleSavedClick}
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
            </div>
          `
        : html`
            <div
              class="dialog-container-save-mode"
              style=${styleMap(shouldShowDialogStyle)}
            >
              <svg
                @click=${this.handleCloseClick}
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
            </div>
          `;

    return html`
      <div
        class="node-container"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        style=${styleMap(shouldShowRestNodes)}
      > 
        ${dialogHtml} ${this.data.tabs.length > 0 ? firstTabHtml : ''}
        ${this.data.tabs.length > 0 ? restTabHtml : ''}
      </div>
    `;
  }
}
