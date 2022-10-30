import { html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js'
import { EventComponent } from '../../core/Component.core';
import { UsersEventType } from '../../shared/events';

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
  private mode: TAppMode = 'normal';

  @state()
  classes = { 'saved-mode': this.mode === 'save' || false };

  eventListener({ detail }: CustomEvent<IFrontMessage<UsersEventType>>): void {
    const { data } = detail;

    this.mode = data.mode === 'normal' ? 'save' : 'normal';
  }

  static get styles() {
    return css`
      ${super.styles}
      ${styled}
    `;
  }

  render() {
    return html`
      <main class=${classMap(this.classes)}>
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
