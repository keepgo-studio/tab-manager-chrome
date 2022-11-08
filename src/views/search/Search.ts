import { css, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { interpret } from 'xstate';
import { EventComponent } from '../../core/Component.core';
import { searchMachine } from '../../machine/search.machine';
import { FrontInitEventType } from '../../shared/events';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import styles from './Search.scss';
import LoadingSvg from '../../../public/img/spin-1s-200px.svg';
import SearchSvg from '../../../public/img/search.svg';

import './SearchPage';

@customElement('app-search')
class Search extends EventComponent {
  _service = interpret(searchMachine);
  _contentList: Array<ITabContent> = [];

  _tabContentMap: TabContentMap = {};

  @state()
  _state = searchMachine.initialState;

  eventListener({
    detail,
  }: CustomEvent<IFrontMessage<FrontInitEventType>>): void {
    const { command, data } = detail;

    switch (command) {
      case FrontInitEventType.SET_WINDOWS_CONTENT:
        if (!this._state.matches('Loading')) {
          this._service.send({
            type: 'update',
            allWindows: data.allWindows!,
          });
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

    this._service
      .onTransition((s) => {
        if (s.changed) {
          this._state = s;
          this._tabContentMap = s.context.tabContentMap;
        }
      })
      .start();
  }

  clickHandler() {
    this._service.send('click icon');
  }

  render() {
    return html`
      <app-search-page
        .visible=${this._state.matches('Search mode')}
      ></app-search-page>

      <div
        id="search-icon"
        status=${['Search mode', 'Ready'].some(this._state.matches)
          ? 'ready'
          : 'preparing'}
        @click=${this.clickHandler}
      >
        <div class="preparing">${unsafeHTML(LoadingSvg)}</div>
        <div class="ready">${unsafeHTML(SearchSvg)}</div>
      </div>
    `;
  }
}
