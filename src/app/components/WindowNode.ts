import { ThreeDotModes } from "./ThreeDot";
import { css, html, PropertyValueMap } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { Component } from "../core/Component";
import { styleMap } from "lit/directives/style-map.js";
import { consoleLitComponent } from "../../utils/dev";
import { AppConfirm } from "./AppConfirm";

const OPENING_DURATION = 250; // ms

const windowNodeCss = css`
  .appear-animation {
    transform: scale(1) !important;
    opacity: 1 !important;
  }

  .node-container {
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
    background: linear-gradient(
      90deg,
      rgb(255, 255, 255) 50%,
      rgb(215, 255, 231) 50%
    );
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.1);
    transition: ease 100ms;
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

  /* 
    close svg css for "save" mode 
  */
  .dialog-container-save-mode {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-50%);
    border-radius: 999px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-items: center;
    background: #fff;
    box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.1);
    transition: ease 100ms;
  }

  .dialog-container-save-mode .close-save-mode {
    width: 13px;
    height: 13px;
    padding: 2px;
    border-radius: 999px;
  }
  .dialog-container-save-mode svg:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }


  .first {
    display: grid;
    grid-template-columns: 72px auto 30px;
    height: 72px;
  }

  .first-fav-icon-container {
    position: relative;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    /* should set z-index so .mode-decorator can show even the .rest opened */
    z-index: 999;
  }

  .first-fav-icon-container .mode-decorator {
    position: absolute;
    top:0;
    left:0;
    width: 7px;
    height: 100%;
    background-color: #FECC9D;
    border-radius: 7px 0 0 7px;
    transition: ease 300ms;
  }

  .first-fav-icon-container img {
    width: 32px;
    height: 32px;
    display: block;
  }

  .first-text-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: auto;
    padding-right: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .first-text-container h1 {
    font-weight: bold;
    padding: 2px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .first-text-container a {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    background-color: #d9d9d9;
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
    position:relative
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rest-tab-container button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 50%;
    background-color: #000;
    color: #fff;
    position: absolute;
    top: -5px;
    right: -5px;
    transition: ease 300ms;
    opacity: 0;
    cursor: pointer;
  }
  .rest-tab-container[hover] button {
    opacity: 1;
    z-index: 999;
  }
`;

@customElement("window-node")
class WindowNode extends Component {

  @property()
  mode!:string;

  @property({ type: Object })
  currentWindow!: CurrentWindow;

  @property()
  commandType?: ChromeEventType | UserInteractionType;
  
  @property({reflect: true})
  occurTabId: Array<number> = [-1];

  @property()
  occurWindowId: Array<number> = [-1];

  @state()
  isOpening = false;

  @state()
  isOpened = false;

  @state()
  isHover = false;

  @query(".node-container")
  _nodeContainer!: Element;

  static get styles() {
    return css`
      ${super.styles}

      ${windowNodeCss}
    `;
  }

  constructor() {
    super();
  }

  private handleMouseEnter() {
    this.isHover = true;
  }

  private handleMouseLeave() {
    this.isHover = false;
  }
  
  private handleRestMouseEnter(e: Event) {
    const target = e.currentTarget as Element;

    if (this.mode === "current") {
      target.setAttribute('hover', '');
    }
  }

  private handleRestMouseLeave(e: Event) {
    const target = e.currentTarget as Element;

    if (this.mode === "current") {
      target.removeAttribute('hover');
    }
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
      }, OPENING_DURATION / 2);
    }
  }

  private async handleCloseClick() {
    if (this.mode === "current") {
      const isConfirmed = await new AppConfirm('Are you really want to close this window?', 'closing window').show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent("close-window", {
          detail: {
            windowId: this.currentWindow.id,
            tabsLength: this.currentWindow.tabs.length,
            firstTabId: this.currentWindow.tabs[0].id,
          },
        })
      );
    } else {
      const isConfirmed = await new AppConfirm('Are you really want to remove this window?', 'removing window').show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent("remove-saved-window", {
          detail: {
            windowId: this.currentWindow.id
          }
        })
      )
    }
    
  }

  private async handleTabCloseClick(e: Event) {
    e.stopPropagation();

    const target = e.currentTarget as Element;

    const tabId = parseInt(target.parentElement!.id);

    if (this.mode === "current") {
      const isConfirmed = await new AppConfirm('Are you really want to close this tab?', 'removing tab').show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent("close-tab", {
          detail: {
            tabId
          }
        })
      )
    }
  }

  private async handleSavedClick() {
    if (this.mode === "current") {
      const isConfirmed = await new AppConfirm('Are you really want to save this window?', 'saving window').show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent("save-window", {
          detail: {
            win: this.currentWindow,
          },
        })
      );
    }
  }

  private async handleNodeClick(e: Event) {
    if (this.mode === "current") {
      const targetNode = e.currentTarget as Element;
  
      const tabId = Number.parseInt(targetNode.id);
  
      window.dispatchEvent(
        new CustomEvent("open-tab", {
          detail: {
            windowId: this.currentWindow.id,
            tabId: tabId,
          },
        })
      );
    } else if (this.mode === "saved") {
      const isConfirmed = await new AppConfirm('Are you really want to reopen this window?', 'reopneing window').show();

      if (!isConfirmed) return;

      window.dispatchEvent(
        new CustomEvent("open-saved-window", {
          detail: {
            win: this.currentWindow
          },
        })
      );
    }
  }

  private handleFaviconError(e:Event) {
    consoleLitComponent(this, 'faviocn loadFailed');
    
    const elem = e.currentTarget as Element;
    const newElem = document.createElement('three-dot');
    newElem.setAttribute('width', '5');
    newElem.setAttribute('height', '5');
    newElem.setAttribute('mode', 'dot-flashing');

    elem.parentNode!.replaceChild(newElem, elem);
  }

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    setTimeout(() => {
      this._nodeContainer.classList.add("appear-animation");
    }, 20);
  }

  protected willUpdate(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {

    if (this.currentWindow.tabs.length === 0) {
      this._nodeContainer.classList.remove("appear-animation");
  
      setTimeout(()=> {
        this.parentNode?.removeChild(this);
      }, 300);
    }
  }

  render() {
    if (typeof this.currentWindow.id === "undefined") return html``;
    
    const windowNodeDefaultHeight = 72;

    const shouldShowDialogStyle = {
      opacity: this.isHover ? "1" : "0",
      zIndex: this.isHover ? "999" : "0",
    };
    const shouldRotateButton = {
      transform: this.isOpening ? "rotate(45deg)" : "",
    };

    const maxCount = 4;
    const restNodesMaxHeight =
      (this.currentWindow.tabs.length > maxCount
        ? maxCount
        : this.currentWindow.tabs.length) * 32;
    const setRestHeight = {
      height: this.isOpening ? `${restNodesMaxHeight}px` : `${windowNodeDefaultHeight}px`,
    };
    const shouldShowRestNodesOpacity = { opacity: this.isOpened ? "1" : "0" };
    const shouldShowRestNodesDisplay = {
      display: this.isOpening ? "block" : "none",
    };

    const shouldShowRestNodes = {
      height: this.isOpening ? `${restNodesMaxHeight + 72}px` : `${windowNodeDefaultHeight}px`,
    };

    const colorIfActiveTab = {
      color: "#3D73FF !important",
    }

    // for only save mode
    const shouldStretchDecorator = {
      height: `${windowNodeDefaultHeight + (this.isOpening ? restNodesMaxHeight : 0)}px`
    }


    // consoleLitComponent(this, [this.occurTabId, this.occurWindowId])
    let firstTabHtml;
    let restTabHtml;
    if (this.currentWindow.tabs.length > 0) {
      const firstTab = this.currentWindow.tabs[0];
      firstTabHtml = html` <div
        id="${firstTab.id}"
        class="first"
        @click=${this.handleNodeClick}
      >
        <div class="first-fav-icon-container">
          ${
            this.mode === "current"? 
            '' : html`
            <div 
              class="mode-decorator"
              style=${styleMap(shouldStretchDecorator)}
            ></div>
            `}
          ${firstTab.favIconUrl?
          html`<img src="${firstTab.favIconUrl}" @error=${this.handleFaviconError}/>`
          :
          html`<three-dot width=${5} height=${5} mode=${ThreeDotModes["dot-flashing"]}></three-dot>`}
        </div>
  
        <div class="first-text-container">
          <h1 style=${this.occurTabId[0] === firstTab.id ? styleMap(colorIfActiveTab) : ''} >${firstTab.title}</h1>
  
          <a>${firstTab.url}</a>
        </div>
  
        <div class="button-container" @click=${this.handleButtonClick}>
          <svg
            style=${styleMap(shouldRotateButton)}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 0C3.36 0 0 3.36 0 7.5C0 11.64 3.36 15 7.5 15C11.64 15 15 11.64 15 7.5C15 3.36 11.64 0 7.5 0ZM11.25 8.25H8.25V11.25H6.75V8.25H3.75V6.75H6.75V3.75H8.25V6.75H11.25V8.25Z"
              fill="black"
            />
          </svg>
        </div>
      </div>`;
  
      restTabHtml = html`
        <div
          class="rest"
          style=${styleMap({
            ...shouldShowRestNodesOpacity,
            ...shouldShowRestNodesDisplay,
            ...setRestHeight,
          })}
        >
          ${repeat(
            this.currentWindow.tabs,
            (tab) => tab.id,
            (tab, idx) =>
              idx > 0
                ? html`
                    <div
                      id="${tab.id}"
                      class="rest-tab-container"
                      @click=${this.handleNodeClick}
                      @mouseenter=${this.handleRestMouseEnter}
                      @mouseleave=${this.handleRestMouseLeave}
                    >
                      <div class="rest-fav-icon-container">
                      ${tab.favIconUrl?
                        html`<img src=${tab.favIconUrl} />`
                        :
                        html`<three-dot width=${2} height=${2} mode=${ThreeDotModes["dot-flashing"]}></three-dot>`}
                      </div>
  
                      <div class="rest-text-container">
                        <a style=${this.occurTabId[0] === tab.id ? styleMap(colorIfActiveTab) : ''}>${tab.title}</a>

                      </div>
                      
                      <button @click=${this.handleTabCloseClick}><p>X</p></button>
                    </div>
                  `
                : ""
          )}
        </div>
      `;
    }
    
    const dialogHtml = (this.mode === "current") ? html`
    <div class="dialog-container" style=${styleMap(shouldShowDialogStyle)}>
      <svg
        @click=${this.handleCloseClick}
        class="close"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z"
          fill="black"
        />
      </svg>

      <svg
        @click=${this.handleSavedClick}
        class="saved"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V4L14 0ZM16 16H2V2H13.17L16 4.83V16ZM9 9C7.34 9 6 10.34 6 12C6 13.66 7.34 15 9 15C10.66 15 12 13.66 12 12C12 10.34 10.66 9 9 9ZM3 3H12V7H3V3Z"
          fill="black"
        />
      </svg>
    </div>
    ` : html`
    <div class="dialog-container-save-mode" style=${styleMap(shouldShowDialogStyle)}>
      <svg
        @click=${this.handleCloseClick}
        class="close-save-mode"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z"
          fill="black"
        />
      </svg>
    </div>
    `;

    return html`
      <div
        class="node-container"
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        style=${styleMap(shouldShowRestNodes)}
      >
        ${dialogHtml}

        ${this.currentWindow.tabs.length > 0 ? firstTabHtml : "" }
        ${this.currentWindow.tabs.length > 0 ? restTabHtml : "" }
      </div>
    `;
  }
}
