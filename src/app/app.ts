import "./components/Navbar";
import "./components/Search";
import "./components/ChromeWindowMain";
import "./components/CurrentTabContainer";
import "./components/SaveTabContainer";
import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { interpret } from "xstate";
import { CurrentWindowMachine } from "../machine/CurrentWindowMachine";

const machine = interpret(CurrentWindowMachine);

@customElement("app-")
class App extends LitElement {
  
  @state()
  currentWindowList: CurrentWindow[] = [] 

  @state()
  currentEventOccurWindowId: number = -1;

  constructor() {
    super();

    machine.onTransition((state) => {
       if (state.changed) {
          this.currentWindowList = [ ...state.context.data ];
          this.currentEventOccurWindowId = state.context.occurWindowId;
          // console.log("[xstate]:", this.currentWindowList);
        }
      })
      .start();
  }

  static createWindow(win: ChromeWindow) {
    machine.send({
      type: "chrome event occur",
      data: { win },
      command: ChromeEventType.CREATE_WINDOW,
    });
  }

  static createTab(tab: ChromeTab) {
    machine.send({
      type: "chrome event occur",
      data: { tab, windowId: tab.windowId },
      command: ChromeEventType.CREATE_TAB,
    });
  }

  static removeWindow(windowId: number) {
    machine.send({
      type: "chrome event occur",
      data: { windowId },
      command: ChromeEventType.REMOVE_WINDOW,
    });
  }

  static moveTab(windowId: number, moveInfo: { fromIndex: number; toIndex: number }) {
    machine.send({
      type: "chrome event occur",
      data: { windowId, moveInfo },
      command: ChromeEventType.MOVE_TAB,
    });
  }

  static removeTab(tabId: number, windowId: number) {
    machine.send({
      type: "chrome event occur",
      data: { windowId, tabId },
      command: ChromeEventType.REMOVE_TAB,
    });
  }

  static updateTab(tab: ChromeTab) {
    machine.send({
      type: "chrome event occur",
      data: { tab },
      command: ChromeEventType.UPDATE_TAB,
    });
  }

  static saveWindow(windowId: number) {

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

  static closeWindow(windowId: number) {
    chrome.windows.remove(windowId);
  }

  render() {
    // consoleLitComponent(this, 'render')
    return html`
      <app-navbar></app-navbar>

      <main>
        <chrome-window-main>
          <current-tab-container
            .currentWindowList=${this.currentWindowList}
            .currentEventOccurWindowId=${this.currentEventOccurWindowId}
          ></current-tab-container>

          <save-tab-container></save-tab-container>
        </chrome-window-main>

        <search-component></search-component>
      </main>
    `;
  }
}

export default App;
