import { CSSResult, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Component } from "../core/Component";
import { getPathName } from "../utils/location";

@customElement('chrome-window-main')
class ChromeWindowIndex extends Component {
  static get styles() {
    return css`
      ${super.styles}

      .container {
        margin: 1rem;
        border-radius: 7px;
        background-color: #F6FAFF;
        box-shadow: 0 1px 8px 4px rgba(0, 0, 0, 0.05);
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