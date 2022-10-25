import { css, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { EventComponent } from '../../core/Component.core';
import { repeat } from 'lit/directives/repeat.js';
import { interpret } from 'xstate';
import { currentTabListMachine } from '../../machine/current-tab-list.machine';
import { savedTabListMachine } from '../../machine/saved-tab-list.machine';

import styles from "./TabListContainer.scss";

import './tab-list/TabList'
import { consoleLitComponent } from '../../utils/utils';

const currentService = interpret(currentTabListMachine);
const savedService = interpret(savedTabListMachine);


@customElement('app-tab-list-container')
class TabListContainer extends EventComponent {
  receivedPortMessage?: IPortMessage<ChromeEventType> | undefined;
  receivedFrontMessage?: IFrontMessage | undefined;

  frontMessageHandler({ detail }: CustomEvent<IFrontMessage>): void {
    const { type, data } = detail;

    savedService.send({
      type: 'Request data',
      command: type as UsersEventType,
      data
    })
  }

  portMessageHandler({ detail }: CustomEvent<IPortMessage<ChromeEventType>>): void {
    const { type, data } = detail;

    consoleLitComponent(this, detail);
    if (currentService.state.matches('idle'))
    currentService.send({
      backData: data,
      command: type,
      type: 'Update list'
    })
  }

  @state()
  windowMap: CurrentWindowMapping = {};

  private _mode;

  constructor() {
    super();

    this._mode = this.getAttribute('mode')! as AppMode;

    if (this._mode === AppMode.NORMAL) {
      currentService
      .onTransition((s) => {
        
        if (s.matches('Get all data.Failed')) {
          currentService.send('Retry');
        } else if (s.matches('idle')) {
          this.windowMap = { ...s.context.data };
        }
      })
      .start();

      this.attachPortHandler(this);
    } else if (this._mode === AppMode.SAVE){
      savedService
      .onTransition((s) => {
        this.windowMap = { ...s.context.data };
      })
      .start();

      savedService.send('Open db server');

      this.attachFrontHandler(this);
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

    const nodeHtml = repeat(
      Object.values(this.windowMap),
      (win) => win.id,
      (win) => html`
        <app-tab-list .mode=${this._mode} .data=${win}> </app-tab-list>
      `
    );

    return html`
      <section>${nodeHtml}</section>
      <div class="gradient"></div>
    `;
  }
}
