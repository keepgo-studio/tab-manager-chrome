import { CSSResult, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Component } from "../core/Component";
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

      .container {
        padding: 1rem;
        height: calc(100vh - 65px);
        width: fit-content;
        transition: ease 300ms;

        /* set relative for current-tab-container and saved-tab-container */
        position: relative;
        display: flex;
        overflow-x: hidden;
      }

      ::slotted(saved-tab-container) {
        margin-left: 2rem;
      }

      .save-mode {
        transform: translateX(-50%);
      }
    `
  };

  handleLocationChange() {
    const container = this.renderRoot.querySelector('.container')!;

    if (getPathName() === "index.html") {
      container.classList.remove('save-mode');
    } else {
      container.classList.add('save-mode');
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
      <div class="container"> 
        <slot></slot>
      </div>
    `;
  }
}