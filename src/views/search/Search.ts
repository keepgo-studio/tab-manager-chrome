import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { interpret } from 'xstate';
import { EventComponent } from '../../core/Component.core';
import { searchMachine } from '../../machine/search.machine';
import { FrontInitEventType } from '../../shared/events';
import { ISearchMainMessage } from './search.shared';
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
  _contentList: Array<ITabContent> = [];

  _tabContentMap: TabContentMap = {};

  @state()
  _state = searchMachine.initialState;

  eventListener({ detail }: CustomEvent<IFrontMessage<FrontInitEventType>>): void {
    const { command, data } = detail;

    switch (command) {
      case FrontInitEventType.SET_WINDOWS_CONTENT:
        if (!this._state.matches('Loading')) {
          this._service.send({
            type: 'update',
            allWindows: data.allWindows!,
          })        
        }
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

    this._service.onTransition((s) => {
      if (s.changed) {
        this._state = s;
  
        this._tabContentMap = s.context.tabContentMap;
  
        console.log(s.value);
      }
    }).start();

    this._worker.onmessage = (e) => {
      const { command, data }: ISearchMainMessage = e.data
    };
    
  }

  clickHandler() {
    this._service.send('click icon');
  }

  render() {
    return html`
        <app-search-page></app-search-page>

        <div id="search-icon" status=${this._state.matches('Ready') ? 'ready' : 'preparing'}>
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
