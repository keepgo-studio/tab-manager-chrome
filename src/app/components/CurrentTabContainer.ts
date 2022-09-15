import { css, html, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Component } from "../core/Component";
import { map } from "lit/directives/map.js";
import "./WindowNode";
import { consoleLitComponent } from "../../utils/dev";

@customElement("current-tab-container")
class CurrentTabContainer extends Component {
  @property({ type: Array })
  currentWindowList: CurrentWindow[] = [];

  @property({ type: Boolean })
  shouldShowDialog: boolean = false;

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

  protected shouldUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): boolean {
    const p1 = _changedProperties.get("currentWindowList");

    return !(typeof p1 === "undefined" || p1 === null);
  }

  mouseEnterHandler(e: Event) {
    this.shouldShowDialog = true;
    const target = e.currentTarget as Element;
    target.classList.add('show');
  }
  
  mouseLeaveHandler(e: Event) {
    this.shouldShowDialog = false;
    const target = e.currentTarget as Element;
    target.classList.remove('show');
  }

  render() {
    
    consoleLitComponent(this, 'render');

    return html`
      <section>
      ${map(
        this.currentWindowList,
        (currentWindow) => html`<window-node .tabList=${ currentWindow.tabs }></window-node>`
      )}
      </section>
    `;
  }
}
