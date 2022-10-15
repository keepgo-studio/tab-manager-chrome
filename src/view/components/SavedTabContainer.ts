import { css, html, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Component } from "../core/Component";
import "./WindowNode";
import { repeat } from "lit/directives/repeat.js";

@customElement("saved-tab-container")
class SavedTabContainer extends Component {
  @property()
  savedWindowMap: CurrentWindowMapping;

  @property()
  occurWindowId?: number;

  @property()
  commandType?: ChromeEventType | UserInteractionType;

  @state()
  shouldShowDialog: boolean = false;

  constructor() {
    super();
    this.savedWindowMap = {};
  }

  static get styles() {
    return css`
      ${super.styles}

      section {
        background-color: rgba(254, 204, 157, 0.15);
        padding: 1rem;
        box-shadow: 0 1px 8px 4px rgba(0, 0, 0, 0.05);
        height: 100%;
        width: 100%;
        overflow: scroll;
        overflow: scroll;
        transition: ease 300ms;
        border-radius: 7px;
      }

      section::-webkit-scrollbar {
        width: 4px;
        background-color: transparent;
      }

      section::-webkit-scrollbar-thumb {
        background-color: #d9d9d9;
        border-radius: 999px;
      }
    `;
  }

  render() {
    if (this.savedWindowMap === undefined) return html`<section></section>`;

    const nodeHtml = repeat(
      Object.values(this.savedWindowMap),
      (win) => win.id,
      (win) => html`
        <window-node
          .currentWindow=${win}
          .occurWindowId=${win.id === this.occurWindowId? this.occurWindowId : -1}
          .commnadType=${this.commandType}
          mode="saved"
        ></window-node>
      `
    );

    return html`<section>${nodeHtml}</section>`;
  }
}
