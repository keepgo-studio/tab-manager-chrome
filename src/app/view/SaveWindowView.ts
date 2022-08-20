import { LitElement, html, css, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";
import { View } from "../core/View";

@customElement('save-window-view')
export class SaveWindowView extends View {
  @property()
  title = '';

  constructor() {
    super();

  }

  render(): TemplateResult<1> {
    return html`
      <div>
        Save Window View is here
      </div>
    `;
  }

}