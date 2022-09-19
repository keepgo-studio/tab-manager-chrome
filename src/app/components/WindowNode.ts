import { css, html, PropertyValueMap } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { Component } from "../core/Component";
import { styleMap } from "lit/directives/style-map.js";

const OPENING_DURATION = 250; // ms

@customElement("window-node")
class WindowNode extends Component {
  private _windowId = -1;

  @property({ type: Array<CurrentTab> })
  tabList:CurrentTab[] = [];

  @state()
  isOpening = false;

  @state()
  isOpened = false;

  @state()
  isHover = false;

  @query('.node-container')
  _nodeContainer!: Element;

  static get styles() {
    return css`
      ${super.styles}

      .appear-animation {
        transform: scale(1) !important;
        opacity: 1 !important;
      }

      .node-container{
        transform: scale(0.5);
        opacity: 0;

        background-color: #fff;
        border-radius: 7px;
        margin-bottom: 1rem;
        transition: ease 300ms;
        cursor: pointer;
        position: relative;
        z-index: 10;
        box-shadow: 0 1px 6px 2px rgba(0, 0, 0, 0.05);
      }

      .node-container:hover {
        transform: scale(1.01);
      }

      .dialog-container {
        position: absolute;
        top: 0;
        right: 0;
        transform: translateY(-50%);
        border-radius: 999px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background: linear-gradient(90deg, rgb(255, 255, 255) 50%, rgb(215, 255, 231) 50%);
        box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.1);
        transition: ease 300ms;
      }

      .dialog-container svg {
        padding: 1px 4px;
        height: 15px;
      }

      .dialog-container svg:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }

      .dialog-container .close {
        width: 13px;
        padding: 1px 4px 1px 6px;
        border-radius: 999px 0 0 999px;
      }
      
      .dialog-container .saved {
        width: 10px;
        padding: 1px 6px 1px 4px;
        border-radius: 0 999px 999px 0;
      }

      .first {
        display: grid;
        grid-template-columns: 72px auto 30px;
      }
      
      .first-fav-icon-container {
        padding: 20px;
      }

      .first-fav-icon-container img{
        width: 32px;
        height: 32px;
        display: block;
      }

      .first-text-container {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }
      
      .first-text-container h1 {
        font-weight: bold;
        width: 170px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        padding: 2px 0;
      }

      .first-text-container a {
        font-size: 12px;
        width: 170px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }

      .button-container {
        background-color: rgba(205, 205, 205, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .button-container svg {
        transition: ease 300ms;
      }

      .rest {
        position: absolute;
        top: 72px;
        left: 0;
        padding: 1rem;
        z-index: 1;
        background-color: #fff;
        overflow-y: scroll;

        /* 
          since showing rest tab list shouldn't faster than node's growing height,
          so I set short trasnition duration. 
        */
        transition: ease ${OPENING_DURATION}ms;

        width: 100%;
        /*
          you can find dynamic height in the function render()
        */
      }

      .rest::-webkit-scrollbar {
        width: 4px;
        background-color: transparent;
      }

      .rest::-webkit-scrollbar-thumb {
        background-color: #D9D9D9;
        border-radius: 999px;
      }

      /* set margin bottom for tabs except for last child */
      .rest-tab-container:not(:last-child) {
        margin-bottom: 6px;
      }

      .rest-tab-container {
        display: flex;
        align-items: center;
        padding: 4px 5px;
        background-color: rgba(217, 217, 217, 0.3);
        border-radius: 999px;
        transition: ease 300ms;
        pointer: cursor;
      }
      
      .rest-tab-container:hover {
        background-color: rgba(217, 217, 217, 0.8);
      }

      .rest-fav-icon-container {
        margin: 0 10px;
      }
      .rest-fav-icon-container img {
        width: 14px;
        height: 14px;
        display: block;
      }

      .rest-text-container {
        font-size: 12px;
        width: 170px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      `;
  }

  private handleMouseEnter() {
    this.isHover = true;
  }
  
  private handleMouseLeave() {
    this.isHover = false;
  }
  
  private handleButtonClick(e: Event) {
    /** 
     * prevent invoke handleNodeClick listener
    */
    e.stopPropagation();

    if (!this.isOpened) {
      this.isOpening = true;

      setTimeout(() => {
        this.isOpened = true;
      }, OPENING_DURATION);
    } else {
      this.isOpened = false;

      setTimeout(() => {
        this.isOpening = false;
      }, OPENING_DURATION);
    }

  }

  private handleCloseClick(e: Event) {
    window.dispatchEvent(new CustomEvent('close-window', {
      detail: {
        windowId: this._windowId,
      }
    }))
  }

  private handleSavedClick() {
    window.dispatchEvent(new CustomEvent('save-window', {
      detail: {
        windowId: this._windowId,
      }
    }))
  }

  private handleNodeClick(e: Event) {
    const targetNode = e.currentTarget as Element;

    const tabId = Number.parseInt(targetNode.id);

    window.dispatchEvent(new CustomEvent('open-tab', {
      detail: {
        windowId: this._windowId,
        tabId: tabId,
      }
    }))
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    setTimeout(() => {
      this._nodeContainer.classList.add('appear-animation');
    }, 20);
  }

  render() {
    this._windowId = this.tabList[0].windowId;

    const shouldShowDialogStyle = { opacity: this.isHover ? "1" : "0", zIndex: this.isHover ? "999" : "0" };
    const shouldRotateButton = { transform: this.isOpening ? "rotate(45deg)" : "" };
    
    const restNodesMaxHeight = ((this.tabList.length > 5) ? 5 : this.tabList.length) * 32;
    const setRestHeight = { height: this.isOpening ? `${restNodesMaxHeight}px` : "72px" };
    const shouldShowRestNodesOpacity = { opacity: this.isOpened ? "1" : "0" };
    const shouldShowRestNodesDisplay = { display: this.isOpening ? "block" : "none" };

    const shouldShowRestNodes = { height: this.isOpening ? `${restNodesMaxHeight + 72}px` : "72px" };

    const firstTab = this.tabList[0];
    const firstTabHtml = html`
    <div 
      id="${firstTab.id}" 
      class="first" 
      @click=${this.handleNodeClick}
    >
    
      <div class="first-fav-icon-container">
        <img src=${firstTab.favIconUrl}>
      </div>

      <div class="first-text-container">
        <h1>${firstTab.title}</h1>

        <a>${firstTab.url}</a>
      </div>

      <div class="button-container"
        @click=${this.handleButtonClick}
      >

        <svg style=${ styleMap(shouldRotateButton) } width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 0C3.36 0 0 3.36 0 7.5C0 11.64 3.36 15 7.5 15C11.64 15 15 11.64 15 7.5C15 3.36 11.64 0 7.5 0ZM11.25 8.25H8.25V11.25H6.75V8.25H3.75V6.75H6.75V3.75H8.25V6.75H11.25V8.25Z" fill="black"/>
        </svg>
      </div>
    </div>`;
    
    const restTabHtml = html`
      <div class="rest"
        style=${styleMap({
          ...shouldShowRestNodesOpacity,
          ...shouldShowRestNodesDisplay,
          ...setRestHeight
        })}
      >

       ${repeat(
        this.tabList,
        (tab) => tab.id,
        (tab, idx) => (idx > 0) ? html`
          <div 
            id="${tab.id}" 
            class="rest-tab-container"
            @click=${this.handleNodeClick}
            >
            <div class="rest-fav-icon-container">
              <img src=${tab.favIconUrl}>
            </div>

            <div class="rest-text-container">
              <a>${tab.title}</a>
            </div>
          </div>
        `: "")}

      </div>
    `;
    return html`
    <div class="node-container"
      @mouseenter=${this.handleMouseEnter} 
      @mouseleave=${this.handleMouseLeave} 

      style=${styleMap(shouldShowRestNodes)}
      >

      <div class="dialog-container" 
        style=${ styleMap(shouldShowDialogStyle) }
        >
        <svg @click=${this.handleCloseClick} class="close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z" fill="black"/>
        </svg>

        <svg @click=${this.handleSavedClick} class="saved" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V4L14 0ZM16 16H2V2H13.17L16 4.83V16ZM9 9C7.34 9 6 10.34 6 12C6 13.66 7.34 15 9 15C10.66 15 12 13.66 12 12C12 10.34 10.66 9 9 9ZM3 3H12V7H3V3Z" fill="black"/>
        </svg>
      </div>

      ${firstTabHtml}

      ${restTabHtml}

    </div>
    `;
  }
}
