import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { interpret } from 'xstate';
import { EventComponent } from '../../core/Component.core';
import { searchMachine } from '../../machine/search.machine';
import { FrontInitEventType } from '../../shared/events';
import { ISearchMainMessage } from './search.shared';
import { extractTextContentFromHtml, sumArr } from '../../utils/utils';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import styles from './Search.scss';
import LoadingSvg from '../../../public/img/spin-1s-200px.svg';
import SearchSvg from '../../../public/img/search.svg';

@customElement('app-search-page')
class SearchPage extends LitElement {
  render() { }
}

@customElement('app-search')
class Search extends EventComponent {
  _service = interpret(searchMachine);
  _worker = new Worker(new URL('./search.worker.ts', import.meta.url));
  _contentMap: IContentMapping = {};

  _tabMaxCnt?: number;

  @state()
  _state = searchMachine.initialState;

  eventListener({ detail }: CustomEvent<IFrontMessage<FrontInitEventType>>): void {
    const { command, data } = detail;

    switch (command) {
      case FrontInitEventType.SET_WINDOWS_CONTENT:
        this._service.send({
          type: 'request to worker',
          allWindows: data.allWindows!,
          worker: this._worker
        })
        
        // get all tab count to check loading all content is completed
        this._tabMaxCnt = 0;
        this._tabMaxCnt = sumArr(Object.values(data.allWindows!).map(win => win.tabs!.length));
        break;
    }
  }

  static get styles() {
    return css`
        ${super.styles}
        ${unsafeCSS(styles)}
      `;
  }

  constructor() {
    super();

    this._service.onTransition((s) => this._state = s).start();

    this._worker.onmessage = (e) => {
      const { command, data }: ISearchMainMessage = e.data
  
      switch (command) {
        case 'return fetch data':
          const { tab, fetchData } = data;
          
          this._contentMap[tab!.id!] = {
            title: tab?.title || '',
            url: tab?.url || '',
            textContent: extractTextContentFromHtml(fetchData!) || ''
          };

          if (Object.values(this._contentMap).length === this._tabMaxCnt) {
            this._service.send('load all tabs completed');
          }
          break;
      }
    };
    
  }

  render() {
    return html`
        <app-search-page></app-search-page>

        <div id="search-icon" status=${this._state.matches('idle.Ready') ? 'ready' : 'preparing'}>
          <div class="preparing">
            ${unsafeHTML(LoadingSvg)}
          </div>
          <div class="ready">
            ${unsafeHTML(SearchSvg)}
          </div>
        </div>
      `;
  }
}
