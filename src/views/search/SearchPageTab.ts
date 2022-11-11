import { css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { Component } from '@src/core/Component.core';
import { focusTab } from '@src/utils/browser-api';
import { ThreeDotModes } from '@views/components/ThreeDot';
import { IMatchedInfo } from './search.shared';

import styles from './SearchPageTab.scss';

@customElement('app-search-page-tab')
class SearchPageTab extends Component {
  @property()
  tabData!: ChromeTab;

  @property()
  matchedInfo!: IMatchedInfo;

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(styles)}
      `;
    };

  clickHandler() {
    focusTab(this.tabData.windowId, this.tabData.id!, {
      top: 0,
      left: window.screen.width / 2,
      width: window.screen.width / 2,
      height: window.screen.height - 24,
      state: 'normal',
    })
  }

  render() {
    return html`
      <div 
        class="matched-tab-container"
        @click=${this.clickHandler}
      >
        <div class="fav-icon-container">
          ${this.tabData.favIconUrl
            ? html`<img src="${this.tabData.favIconUrl}" />`
            : html`
                <three-dot
                  width=${5}
                  height=${5}
                  mode=${ThreeDotModes['dot-flashing']}
                ></three-dot>
              `}
        </div>

        <div class="text-container">
          <h1>${this.tabData.title}</h1>

          <a>${this.tabData.url}</a>
        </div>

        <ul class="info-container">
        ${this.matchedInfo.titleMatched !== '' ? html`
          <li>
            <h3 class="tag title">제목</h3>
            <p>${unsafeHTML(this.matchedInfo.titleMatched)}</p>
          </li>
        ` : ''}
        ${this.matchedInfo.urlMatched !== '' ? html`
          <li>
            <h3 class="tag url">url</h3>
            <p>${unsafeHTML(this.matchedInfo.urlMatched)}</p>
          </li>
        ` : ''}
        ${this.matchedInfo.textContentMatched !== '' ? html`
          <li>
            <h3 class="tag text-content">본문</h3>
            <p>${unsafeHTML(this.matchedInfo.textContentMatched)}</p>
          </li>
        ` : ''}
        </ul>
      </div>
    `;
  }
}
