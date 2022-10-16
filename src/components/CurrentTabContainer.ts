import { css, html, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { Component } from "../../core/Component";
import "./WindowNode";
import { repeat } from "lit/directives/repeat.js";
import { getPathName } from "../../utils/location";

@customElement("current-tab-container")
class CurrentTabContainer extends Component {
  @property()
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

      :host{
        position:relative;
      }

      section {
        background-color: #f6faff;
        padding: 1rem 1rem 0 1rem;
        box-shadow: 0 1px 8px 4px rgba(0, 0, 0, 0.05);
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        transition: ease 300ms;
        border-radius: 7px;
        position: relative;
      }

      .gradient {
        background: linear-gradient(0deg, #F6FAFF 30%, rgba(246, 250, 255, 0) 100%);
        height: 1.5rem;
        width: 100%;
        position: absolute;
        bottom:0;
        left:-4px;
        z-index: 10;
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

  // protected shouldUpdate(
  //   _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  // ): boolean {
  //   if (
  //     _changedProperties.has("commandType") &&
  //     this.commandType === ChromeEventType.REMOVE_WINDOW
  //   ) {
  //     return false;
  //   }

  //   return true;
  // }

  render() {
    if (this.currentWindowMap === undefined) return html`<section></section>`;

    // console.log(this.occurTabId, this.occurWindowId)
    const nodeHtml = repeat(
      Object.values(this.currentWindowMap),
      (win) => win.id,
      (win) => html`
        <window-node
          .currentWindow=${win}
          .occurTabId=${win.id === this.occurWindowId[0]
            ? this.occurTabId
            : [-1]}
          .occurWindowId=${win.id === this.occurWindowId[0]
            ? this.occurWindowId
            : [-1]}
          .commnadType=${this.commandType}
          mode="current"
        >
        </window-node>
      `
    );

    return html`
    <section>${nodeHtml}</section>
    <div class="gradient"></div>
    `;
  }
}
