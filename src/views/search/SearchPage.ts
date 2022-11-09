import { css, html, LitElement, PropertyValueMap, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { EventlessComponent } from '../../core/Component.core';
import { FadeIn } from '../../utils/animate';
import { InputDetail } from '../components/TextField';
import {
  IMatchedInfo,
  IMessageToMain,
  IMessageToWorker,
  MAX_INPUT,
} from './search.shared';
import { repeat } from 'lit/directives/repeat.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import styles from './SearchPage.scss';

import '../components/TextField';

const fadeInObserver = new FadeIn({ 'transition-duration': 500 });

@customElement('app-search-page-tab') 
class SearchPageTab extends LitElement {

}

@customElement('app-search-page')
class SearchPage extends EventlessComponent {
  _worker = new Worker(new URL('./search.worker.ts', import.meta.url));

  @property()
  contentMap: TabContentMap = {};

  @property()
  visible!: boolean;

  @state()
  matchedList: Array<IMatchedInfo> = [];

  @query('app-text-field')
  textField?: Element;

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(styles)}
    `;
  }

  constructor() {
    super();

    this.addEventListener('textinput', this.textInputHandler as EventListener);

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

    if (!value) return;

    const msg: IMessageToWorker = {
      command: 'request searching',
      data: {
        contentMap: this.contentMap,
        input: value,
      },
    };
    this._worker.postMessage(msg);
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    fadeInObserver.detach(this.textField!);
    fadeInObserver.attach(this.textField!);
  }

  render() {
    console.log(this.contentMap);
    return html` <section
      class="container"
      style=${styleMap({
        display: this.visible ? 'block' : 'none',
      })}
    >
      <div class="filter"></div>

      <app-text-field
        .placeholder=${'탭 검색하기'}
        .maxlength=${MAX_INPUT}
      ></app-text-field>

      <div class="matched-container">
        ${repeat(
          this.matchedList,
          (matchedInfo) => matchedInfo.tabId,
          (matchedInfo) => html`
          <p>
            ${unsafeHTML(JSON.stringify(matchedInfo))}
          </p>
          `
        )}
      </div>
    </section>`;
  }
}
