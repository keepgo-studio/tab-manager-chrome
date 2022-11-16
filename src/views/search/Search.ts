import { css, html, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { interpret } from 'xstate';
import { EventComponent } from '@src/core/Component.core';
import { searchMachine } from '@src/machine/search.machine';
import { AppEventType, FrontInitEventType } from '@src/shared/events';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { TabContentMap } from './search.shared';

import styles from './Search.scss';
import LoadingSvg from '@public/img/spin-1s-200px.svg';
import SearchSvg from '@public/img/search.svg';
import CloseSvg from '@public/img/close.svg';

import './SearchPage';
import { consoleLitComponent } from '@src/utils/utils';

@customElement('app-search')
class Search extends EventComponent {
  private _service = interpret(searchMachine);
  private _contentMap: TabContentMap = {};
  private _allWindows: IChromeWindowMapping = {};

  @state()
  _state = searchMachine.initialState;

  @query('app-search-page')
  appSearchPage?: Element;

  eventListener({
    detail,
  }: CustomEvent<
    IFrontMessage<FrontInitEventType> | IPortMessage<AppEventType>
  >): void {
    const { command, data } = detail;

    consoleLitComponent(this, command, data);
    switch (command) {
      case FrontInitEventType.SET_WINDOWS_CONTENT:
        this._service.send({
          type: 'update',
          allWindows: data.allWindows!,
        });
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
          this._allWindows = s.context.allWindows;
          this._contentMap = s.context.contentMap;
        }
      })
      .start();
  }

  clickHandler() {
    this._service.send('click icon');
  }

  render() {
    this.appSearchPage?.dispatchEvent(new CustomEvent('render'));

    return html`
      <app-search-page
        .allWindows=${this._allWindows}
        .visible=${this._state.matches('Search mode.Start')}
        .contentMap=${this._contentMap}
      ></app-search-page>

      <div
        id="search-icon"
        status=${this._state.matches('Search mode') ? 'ready' : 'loading'}
        @click=${this.clickHandler}
      >
        <div class="ready">
          ${this._state.matches('Search mode.Start')
            ? unsafeHTML(CloseSvg)
            : unsafeHTML(SearchSvg)}
        </div>
        <div class="loading">${unsafeHTML(LoadingSvg)}</div>
      </div>
    `;
  }
}
