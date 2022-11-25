import { css, html, PropertyValueMap, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { EventlessComponent } from '@src/core/Component.core';
import { FadeInOut } from '@src/utils/animate';
import { InputDetail } from '@views/components/TextField';
import {
  IMatchedInfo,
  IMessageToMain,
  IMessageToWorker,
  MAX_INPUT,
  TabContentMap,
} from './search.shared';
import { repeat } from 'lit/directives/repeat.js';

import styles from './SearchPage.scss';

import '@views/components/TextField';
import './SearchPageTab';
import GlobalLangMap from '@src/data/lang';

const fadeInObserver = new FadeInOut({ 'transition-duration': 500 });

@customElement('app-search-page')
class SearchPage extends EventlessComponent {
  _worker = new Worker(new URL('./search.worker.ts', import.meta.url));

  _value = '';

  @property()
  allWindows: IChromeWindowMapping = {};

  @property()
  contentMap: TabContentMap = {};

  @property()
  visible!: boolean;

  @state()
  matchedList: Array<IMatchedInfo> = [];

  @query('app-text-field')
  textField?: Element;

  @query('.tab-container')
  tabContainer?: Element;

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(styles)}
    `;
  }

  constructor() {
    super();

    this.addEventListener('textinput', this.textInputHandler as EventListener);

    this.addEventListener('render', () => {
      const msg: IMessageToWorker = {
        command: 'request searching',
        data: {
          contentMap: this.contentMap,
          input: this._value,
        },
      };
      this._worker.postMessage(msg);
    });

    this._worker.onmessage = (e) => {
      const { command, data } = e.data as IMessageToMain;

      switch (command) {
        case 'return search data':
          this.matchedList = data.matchedList;
          break;
      }
    };
  }

  textInputHandler(e: CustomEvent) {
    const { value } = e.detail as InputDetail;

    if (e.defaultPrevented) {
      e.preventDefault();
    }

    this._value = value;

    const msg: IMessageToWorker = {
      command: 'request searching',
      data: {
        contentMap: this.contentMap,
        input: value,
      },
    };
    this._worker.postMessage(msg);
  }

  protected updated() {
    fadeInObserver.detach(this.textField!);
    fadeInObserver.detach(this.tabContainer!);

    fadeInObserver.attach(this.textField!);
    fadeInObserver.attach(this.tabContainer!);
  }

  render() {
    if (this.userSetting.lang === undefined) this.userSetting.lang = 'en'

    return html` 
    <section
      class="container"
      style=${styleMap({
        display: this.visible ? 'block' : 'none',
      })}
      sizeMode=${this.userSetting.size}
      theme=${this.userSetting.theme}
    >
      <div class="filter"></div>

      <app-text-field
        .width=${'100%'}
        .height=${44}
        .inputStyle=${'round'}
        .placeholder=${GlobalLangMap[this.userSetting.lang!].Search.placeholder}
        .maxlength=${MAX_INPUT}
      ></app-text-field>

      <div class="tab-container">
        <div class="screen">
          ${repeat(
            this.matchedList,
            (matchedInfo) => matchedInfo.tabId,
            (matchedInfo) => html`
              <app-search-page-tab
                .tabData=${this.allWindows[matchedInfo.windowId].tabs?.find(
                  (tab) => tab.id === matchedInfo.tabId
                )}
                .matchedInfo=${matchedInfo}
              >
              </app-search-page-tab>
            `
          )}
          ${this._value !== '' && this.matchedList.length === 0
            ? html`
                <div class="undefined">
                  <p><b>"${this._value}"</b>${GlobalLangMap[this.userSetting.lang!].Search.errorMessage} 😢</p>
                </div>
              `
            : ''}
        </div>
      </div>
    </section>`;
  }
}
