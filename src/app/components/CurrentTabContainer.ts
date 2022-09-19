import { css, html, PropertyDeclaration, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Component } from "../core/Component";
import "./WindowNode";
import { repeat } from "lit/directives/repeat.js";
import { consoleLitComponent } from "../../utils/dev";

@customElement("current-tab-container")
class CurrentTabContainer extends Component {
  @property({ type: Boolean })
  shouldShowDialog: boolean = false;

  @property({ type: Array<CurrentWindow> })
  currentWindowList: CurrentWindow[] = [];

  @property()
  currentEventOccurWindowId = -1;

  constructor() { super(); }

  static get styles() {
    return css`
      ${super.styles}

      section {
        background-color: #F6FAFF;
        padding: 1rem;
        box-shadow: 0 1px 8px 4px rgba(0, 0, 0, 0.05);
        height: 100%;
        overflow: scroll;
      }

      section::-webkit-scrollbar {
        width: 4px;
        background-color: transparent;
      }

      section::-webkit-scrollbar-thumb {
        background-color: #D9D9D9;
        border-radius: 999px;
      }

    `;
  }

  render() {
    if (this.currentWindowList === undefined) return html`<section></section>`
    
    // consoleLitComponent(this, this.currentEventOccurWindowId);

    return html`
      <section>
      ${repeat(
        this.currentWindowList,
        (currentWindow) => currentWindow.id,
        (currentWindow) => html`
        <window-node .tabList=${ currentWindow.tabs }></window-node>
        `
      )}
      </section>
    `;
  }
}
