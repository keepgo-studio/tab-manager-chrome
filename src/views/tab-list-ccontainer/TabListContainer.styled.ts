import { css, html, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { EventComponent } from '../../core/Component.core';
import { repeat } from 'lit/directives/repeat.js';
import { interpret } from 'xstate';
import { currentTabListMachine } from '../../machine/current-tab-list.machine';
import { savedTabListMachine } from '../../machine/saved-tab-list.machine';
import {
  ChromeEventType,
  FrontInitEventType,
  UsersEventType,
} from '../../shared/events';

import styles from './TabListContainer.scss';

import './tab-list/TabList';
import { createNewWindow } from '../../utils/browser-api';

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
        this._savedService!.send('LOCAL.REQUEST', {
          command,
          data,
        });

        
        break;
        
      case 'IPortMessage':
        this._currentService!.send('Update list', {
          command,
          data,
        });
        break;
    }
  }

  private _savedService;
  private _currentService;
  private _mode;

  @state()
  windowMap: IChromeWindowMapping = {};

  constructor() {
    super();

    this._mode = this.getAttribute('mode')! as TAppMode;

    if (this._mode === 'normal') {
      this._currentService = interpret(currentTabListMachine);

      this._currentService
          .onTransition((s) => {

            if (s.matches('Get all data.Failed')) {
              this._currentService!.send('Retry');
            }
            else if (s.matches('idle')) {
              this.sendToFront({
                discriminator: 'IFrontMessage',
                sender: this.tagName,
                command: FrontInitEventType.SET_WINDOWS_CONTENT,
                data: { allWindows: s.context.data }
              })
              
              this.windowMap = { ...s.context.data };
            }
          })
          .start();
    } else {
      this._savedService = interpret(savedTabListMachine.withConfig({
        actions: {
          "open new window": (_, event) => {
            const { windowId } = event.data;
            
            if (windowId === undefined) {
              console.error('no window Id');
              return;
            }

            createNewWindow(this.windowMap[windowId].tabs as ChromeTab[], {
              focused: true,
              top: 0,
              left: window.screen.width / 2,
              width: window.screen.width / 2,
              height: window.screen.height - 24,
              type: 'normal'
            });
          }
        }
      }));

      this._savedService
          .onTransition((s) => {

            if (s.changed) {
              this.windowMap = { ...s.context.data };
            }
          })
          .start();

        this._savedService.send('LOCAL.OPEN');
    }
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
