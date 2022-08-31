import { css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Component } from "../core/Component";

@customElement('current-tab-container')
class CurrentTabContainer extends Component {

  static get styles() {
    return css`
      ${super.styles}

      .container {
        width: 100%;
        height: 100%;
        padding: 1rem;
      }
    `
  };

  render() {
    
    return html`
      <div>

      </div>
    `;
  }
}