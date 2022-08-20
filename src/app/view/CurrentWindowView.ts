import { LitElement, html, css, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";
import { View } from "../core/View";

@customElement('current-window-view')
export class CurrentWindowView extends View {
  @property()
  title = '';

  constructor() {
    super();


  }

  render(): TemplateResult<1> {
    return html`
      <div>
        Current Window View is here
      </div>
    `;
  }

}