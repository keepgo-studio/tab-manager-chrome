import { CSSResult, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Component } from "../core/Component";
import { getPathName } from "../../utils/location";

@customElement('chrome-window-main')
class ChromeWindowIndex extends Component {
  static get styles() {
    return css`
      ${super.styles}

      .container {
        padding: 1rem;
        height: calc(100vh - 65px);
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