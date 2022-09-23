import { css, html, PropertyDeclaration, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Component } from "../core/Component";
import "./WindowNode";
import { repeat } from "lit/directives/repeat.js";

@customElement("current-tab-container")
class CurrentTabContainer extends Component {
  @property({ type: Array<CurrentWindow> })
  currentWindowMap: CurrentWindowMapping;

  @property()
  occurWindowId!: Array<number>;

  @property()
  occurTabId!: Array<number>;

  @property()
  commandType?: ChromeEventType | UserInteractionType;

  @state()
  shouldShowDialog: boolean = false;

  constructor() {
    super();
    this.currentWindowMap = {};
  }

  static get styles() {
    return css`
      ${super.styles}

      section {
        background-color: #f6faff;
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
        background-color: #d9d9d9;
        border-radius: 999px;
      }
    `;
  }

  protected shouldUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): boolean {
    if (
      _changedProperties.has("commandType") &&
      this.commandType === ChromeEventType.REMOVE_WINDOW
    ) {
      return false;
    }

    return true;
  }

  render() {
    if (this.currentWindowMap === undefined) return html`<section></section>`;

    const nodeHtml = repeat(
      Object.values(this.currentWindowMap),
      (win) => win.id,
      (win) => html`
        <window-node
          .currentWindow=${win}
          .occurTabId=${win.id === this.occurWindowId[0]
            ? this.occurTabId[0]
            : -1}
          .occurWindowId=${win.id === this.occurWindowId[0]
            ? this.occurWindowId
            : -1}
          .commnadType=${this.commandType}
        ></window-node>
      `
    );

    return html`<section>${nodeHtml}</section>`;
  }
}
