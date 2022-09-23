import "./components/Navbar";
import "./components/Search";
import "./components/ChromeWindowMain";
import "./components/CurrentTabContainer";
import "./components/SavedTabContainer";
import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { interpret } from "xstate";
import { CurrentWindowMachine } from "../machine/CurrentWindowMachine";
import { SavedWindowMachine } from "../machine/SavedWindowMachine";
import db from "../indexedDB/db";

const currentWindowMachine = interpret(CurrentWindowMachine);
const savedWindowMachine = interpret(SavedWindowMachine);

@customElement("app-")
class App extends LitElement {
  
  @state()
  currentWindowMap: CurrentWindowMapping;
  @state()
  occurWindowId: Array<number>;
  @state()
  occurTabId: Array<number>;
  
  @state()
  savedWindowMap : CurrentWindowMapping;
  @state()
  occurSavedWindowId?: number;

  @state()
  commandType?: ChromeEventType | UserInteractionType;

  constructor() {
    super();
    this.currentWindowMap = {};
    this.occurWindowId = [-1];
    this.occurTabId = [-1];

    this.savedWindowMap = {};

    db.open();

    currentWindowMachine.onTransition((state) => {
       if (state.changed) {
          const { data, occurWindowId, occurTabId } = state.context;

          if (state.event.type === 'chrome event occur' || state.event.type === 'init') {
            this.commandType = state.event.command;
          }

          this.occurWindowId = [occurWindowId];
          this.occurTabId = [occurTabId];
          
          this.currentWindowMap = { ...data };
          
          // console.log("[xstate]:", this.currentWindowMap);
        }
      })
      .start();

    savedWindowMachine.onTransition((state) => {
      if (state.changed) {
        const { data, occurWindowId } = state.context;

        this.savedWindowMap = { ...state.context.data };
        this.occurSavedWindowId = occurWindowId;

        // console.log("[xstate]:", state.context);

        if (state.event.type === "user interaction occur") {
          this.commandType = state.event.command;
        }
      }
    })
    .start();
  }

  static init() {
    currentWindowMachine.send({
      type: "init",
      command: ChromeEventType.INIT
    });
  }

  static createWindow(win: ChromeWindow) {
    currentWindowMachine.send({
      type: "chrome event occur",
      data: { win },
      command: ChromeEventType.CREATE_WINDOW,
    });
  }

  static createTab(tab: ChromeTab) {
    currentWindowMachine.send({
      type: "chrome event occur",
      data: { tab, windowId: tab.windowId },
      command: ChromeEventType.CREATE_TAB,
    });
  }

  static removeWindow(windowId: number) {
    currentWindowMachine.send({
      type: "chrome event occur",
      data: { windowId },
      command: ChromeEventType.REMOVE_WINDOW,
    });
  }

  static moveTab(windowId: number, moveInfo: { fromIndex: number; toIndex: number }) {
    currentWindowMachine.send({
      type: "chrome event occur",
      data: { windowId, moveInfo },
      command: ChromeEventType.MOVE_TAB,
    });
  }

  static removeTab(tabId: number, windowId: number) {
    currentWindowMachine.send({
      type: "chrome event occur",
      data: { windowId, tabId },
      command: ChromeEventType.REMOVE_TAB,
    });
  }

  static updateTab(tab: ChromeTab) {
    currentWindowMachine.send({
      type: "chrome event occur",
      data: { tab },
      command: ChromeEventType.UPDATE_TAB,
    });
  }

  static saveWindow(win: CurrentWindow) {
    savedWindowMachine.send({
      type: "user interaction occur",
      data: { win },
      command: UserInteractionType.SAVE_WINDOW
    })
  }

  removeSaveWindow() {}

  searchTab() {}

  static openTab(tabId: number, windowId: number) {
    const leftMargin = 384;
    const customWidth = window.screen.width - 384 - 20; // 20 is right margin of window
    const customHeight = window.screen.height - 20;

    chrome.windows.update(windowId, { 
      focused: true,
      top: 20,
      left: leftMargin,
      width: customWidth,
      height: customHeight,
      state: "normal"
    }, (w) => {
      if (w.id && w.state !== "normal") {
        chrome.windows.update(w.id, { state: "normal" });
      }
      chrome.tabs.update(tabId, { active: true });
    })
  }

  static closeWindow(firstTabId: number) {
    /**
     * since I made removing animation for WindowNode which requires that REMOVE_TAB
     * event should fire earlier than REMOVE_WINDOW, I use chrome.tabs.remove() rather
     * than chrome.windows.remove().
     */
    chrome.tabs.remove(firstTabId);
  }

  render() {
    // consoleLitComponent(this, 'render')
    return html`
      <app-navbar></app-navbar>

      <chrome-window-main>
        <current-tab-container
          .currentWindowMap=${this.currentWindowMap}
          .occurWindowId=${this.occurWindowId}
          .occurTabId=${this.occurTabId}
          .commandType=${this.commandType}
        ></current-tab-container>

        <saved-tab-container
          .savedWindowMap=${this.savedWindowMap}
          .occurWindowId=${this.occurSavedWindowId}
          .commandType=${this.commandType}
        ></saved-tab-container>
          
        <search-component></search-component>
      </chrome-window-main>
    `;
  }
}

export default App;
