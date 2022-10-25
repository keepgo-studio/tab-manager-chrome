import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import { Component, EventComponent } from "../../core/Component.core";
import { consoleLitComponent } from "../../utils/utils";

const styled = css`
  main {
    position: relative;
    display: flex;
    width: fit-content;
    transition: ease 300ms;
  }

  .container {
    padding: 1rem;
    height: calc(100vh - 65px);
    width: fit-content;
    width: 100vw;
  }

  ::slotted(saved-tab-container),
  ::slotted(current-tab-container) {
    width: 100%;
  }
  .saved-mode {
    transform: translateX(-50%);
  }
`;

@customElement('app-main')
class Main extends EventComponent {
  receivedPortMessage?: IPortMessage<ChromeEventType> | undefined;
  receivedFrontMessage?: IFrontMessage | undefined;
  
  portMessageHandler(): void {}
  frontMessageHandler({ detail }: CustomEvent<IFrontMessage>): void {
    const { data } = detail;

    consoleLitComponent(this, detail);
    if (data.mode === AppMode.NORMAL) {
      this.renderRoot.querySelector('main')?.classList.remove('saved-mode');
    } else {
      this.renderRoot.querySelector('main')?.classList.add('saved-mode');
    }
  }
  
  static get styles() {
    return css`
      ${super.styles}
      ${styled}
    `
  };

  constructor() {
    super();

    this.attachFrontHandler(this);
  }

  render() {
    
    return html`
      <main>
        <div class="container">
          <slot name="current-tab"></slot>
        </div>
        <div class="container">
          <slot name="saved-tab"></slot>
        </div>
      </main>
    `;
  }
}