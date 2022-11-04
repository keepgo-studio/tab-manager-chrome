import { css, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { EventComponent } from '../../core/Component.core';
import { repeat } from 'lit/directives/repeat.js';
import { interpret } from 'xstate';
import { currentTabListMachine } from '../../machine/current-tab-list.machine';
import { savedTabListMachine } from '../../machine/saved-tab-list.machine';

import styles from './TabListContainer.scss';

import './tab-list/TabList';
import { consoleLitComponent } from '../../utils/utils';
import {
  ChromeEventType,
  UsersEventType,
} from '../../shared/events';

const currentService = interpret(currentTabListMachine);

const savedService = interpret(savedTabListMachine);

@customElement('app-tab-list-container')
class TabListContainer extends EventComponent {
  eventListener({
    detail,
  }: CustomEvent<
    | IFrontMessage<UsersEventType>
    | IPortMessage<ChromeEventType>
  >): void {
    const { command, data } = detail;

    switch (detail.discriminator) {
      case 'IFrontMessage':
        savedService.send('LOCAL.REQUEST', {
          command,
          data,
        });
        break;
        
      case 'IPortMessage':
        currentService.send('Update list', {
          command,
          data,
        });
        break;
    }
  }

  private _mode;

  @state()
  windowMap: CurrentWindowMapping = {};

  private startMachine(mode: TAppMode) {
    switch (mode) {
      case 'normal':
        currentService
          .onTransition((s) => {

            if (s.matches('Get all data.Failed')) {
              currentService.send('Retry');
            } else if (s.matches('idle')) {
              this.windowMap = { ...s.context.data };
            }
          })
          .start();
        break;

      case 'save':
        savedService
          .onTransition((s) => {

            // if (s.matches('xstate.init')) {
            //   savedService.send('LOCAL.OPEN');
            // }

            if (s.changed) {
              this.windowMap = { ...s.context.data };
            }
          })
          .start();

        savedService.send('LOCAL.OPEN');
        break;
    }
  }

  constructor() {
    super();

    this._mode = this.getAttribute('mode')! as TAppMode;

    this.startMachine(this._mode);
  }

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(styles)}
    `;
  }

  render() {
    if (this.windowMap === undefined) return html`<section></section>`;

    return html`
      <section class=${this._mode}>
        ${repeat(
          Object.values(this.windowMap),
          (win) => win.id,
          (win) => html`
            <app-tab-list .appMode=${this._mode} .winData=${win}> </app-tab-list>
          `
        )}
      </section>
      <div class="gradient"></div>
    `;
  }
}
