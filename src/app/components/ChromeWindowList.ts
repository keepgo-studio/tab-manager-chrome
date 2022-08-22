import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Component } from "../core/Component";
import { getPathName } from "../utils/location";

@customElement('chrome-window-list')
class ChromeWindowList extends Component {
  @property()
  _pathname: string = getPathName();
  
  render() {
    return html`
      <div @>
      
      <slot></slot>
      </div>
    `;
  }
}