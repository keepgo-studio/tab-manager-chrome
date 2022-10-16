import { CSSResult, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Component } from "../../core/Component";
import { getPathName } from "../../utils/location";

@customElement('chrome-window-main')
class ChromeWindowMain extends Component {

  constructor() {
    super();

    /**
     * I have to set overflow hidden to body tag since the two tab container
     * is larger than 100vw.
     */
    document.body.style.overflow = 'hidden';
  }
  
  static get styles() {
    return css`
      ${super.styles}

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
      .save-mode {
        transform: translateX(-50%);
      }
    `
  };

  handleLocationChange() {
    const main = this.renderRoot.querySelector('main')!;

    if (getPathName() === "index.html") {
      main.classList.remove('save-mode');
    } else {
      main.classList.add('save-mode');
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    
    window.addEventListener('popstate', this.handleLocationChange.bind(this))
  }
  
  disconnectedCallback(): void {
    window.removeEventListener('popstate', this.handleLocationChange)

    super.disconnectedCallback();
  }

  @property()
  _pathname: string = getPathName();
  
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