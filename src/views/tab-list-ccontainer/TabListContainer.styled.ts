import { css, html, unsafeCSS } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { EventComponent } from '../../core/Component.core';
import { repeat } from 'lit/directives/repeat.js';
import { interpret } from 'xstate';
import { currentTabListMachine } from '../../machine/current-tab-list.machine';
import { savedTabListMachine } from '../../machine/saved-tab-list.machine';

import styles from "./TabListContainer.scss";

const currentService = interpret(currentTabListMachine);
const savedService = interpret(savedTabListMachine);


@customElement('app-tab-list-container')
class TabListContainer extends EventComponent {
  receivedPortMessage?: IPortMessage | undefined;
  receivedFrontMessage?: IFrontMessage | undefined;

  frontMessageHandler({ detail }: CustomEvent<IFrontMessage>): void {
    const { type, data } = detail;

    savedService.send({
      type: 'Request data',
      command: type as UsersEventType,
      data
    })
  }

  portMessageHandler({ detail }: CustomEvent<IPortMessage>): void {
    const { type, data } = detail;

    if (currentService.state.matches('idle'))
    currentService.send({
      backData: data,
      command: type,
      type: 'Update list'
    })
  }

  @property()
  mode: 'normal' | 'saved' = 'normal';

  @state()
  windowMap: CurrentWindowMapping = {};

  constructor() {
    super();

    if (this.mode === 'normal') {
      currentService
      .onTransition((s) => {
        if (s.matches('Get all data.Failed')) {
          currentService.send('Retry');
        } else {
          this.windowMap = { ...s.context.data };
        }
      })
      .start();

      this.attachPortHandler();
    } else {
      savedService
      .onTransition((s) => {
        this.windowMap = { ...s.context.data };
      });

      savedService.send('Open db server');

      this.attachFrontHandler();
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
        <app-tab .mode=${this.mode} .data=${win}> </app-tab>
      `
    );

    return html`
      <section>${nodeHtml}</section>
      <div class="gradient"></div>
    `;
  }
}
