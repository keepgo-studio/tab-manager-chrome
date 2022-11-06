import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { interpret } from 'xstate';
import { EventComponent } from '../../core/Component.core';
import { ContentMap, searchMachine } from '../../machine/search.machine';
import { FrontInitEventType } from '../../shared/events';

import styles from './Search.scss';

if (window.Worker) {
  const worker = new Worker(new URL('./search.worker.ts', import.meta.url));

  worker.postMessage('Hello World!');

  worker.onmessage = function (e) {
    console.log(e);
  };

  @customElement('app-search-page')
  class SearchPage extends LitElement {
    render() {}
  }

  @customElement('app-search')
  class Search extends EventComponent {
    _service = interpret(searchMachine);

    _contentPerTab: ContentMap = {};

    eventListener({
      detail,
    }: CustomEvent<IFrontMessage<FrontInitEventType>>): void {
      const { command, data } = detail;

      switch (command) {
        case FrontInitEventType.SET_WINDOWS_CONTENT:
          if (this._service.state.matches('idle')) {
            this._service.send({
              type: 'update',
              allWindows: data.allWindows!,
            });
          }
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
          this._contentPerTab = s.context.contentPerTab;
        })
        .start();
    }

    render() {
      return html`
        <app-search-page></app-search-page>

        <div id="search-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z"
              fill="white"
            />
          </svg>
        </div>
      `;
    }
  }
}
