import { CSSResult, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Component } from "../core/Component";
import { getPathName } from "../../utils/location";

@customElement('chrome-window-main')
class ChromeWindowMain extends Component {

  static get styles() {
    return css`
      ${super.styles}

      .container {
        padding: 1rem;
        height: calc(100vh - 65px);

        /* set relative for current-tab-container and saved-tab-container */
        position: relative;
        display: flex;
        overflow-x: hidden;
      }

      ::slotted(saved-tab-container) {
        margin-left: 2rem;
      }
    `
  };


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