import "./components/Navbar";
import "./components/Search";
import "./components/ChromeWindowMain";
import "./components/CurrentTabContainer";
import "./components/SaveTabContainer";
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
  commandType?: ChromeEventType | UserInteractionType;

  @state()
  occurSavedWindowId?: number;

  @state()
  savedWindowList : CurrentWindow[];

  constructor() {
    super();
    this.currentWindowMap = {};
    this.occurWindowId = [-1];
    this.occurTabId = [-1];
    this.savedWindowList = [];

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
      // if (state.changed) {
      //   console.log(state);
      // }
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

  static saveWindow(windowId: number) {
    // savedWindowMachine.send()
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

      <main>
        <chrome-window-main>
          <current-tab-container
            .currentWindowMap=${this.currentWindowMap}
            .occurWindowId=${this.occurWindowId}
            .occurTabId=${this.occurTabId}
            .commandType=${this.commandType}
          ></current-tab-container>

          <save-tab-container></save-tab-container>
        </chrome-window-main>

        <search-component></search-component>
      </main>
    `;
  }
}

export default App;
