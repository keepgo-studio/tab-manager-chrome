import "./components/Navbar";
import "./components/Search";
import "./components/ChromeWindowMain";
import "./components/CurrentTabContainer";
import "./components/SavedTabContainer";
import { html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { interpret } from "xstate";
import { CurrentWindowMachine } from "../machine/CurrentWindowMachine";
import { SavedWindowMachine } from "../machine/SavedWindowMachine";
import { UserSettings } from "../store/local-storage";

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

        this.savedWindowMap = { ...data };
        this.occurSavedWindowId = occurWindowId;

        // console.log("[xstate]:", state.context, this.savedWindowMap);

        if (state.event.type === "user interaction occur") {
          this.commandType = state.event.command;
        }
      }
    })
    .start();

    new UserSettings().getDarkMode().then(v => {
      if (v) {
        document.body.setAttribute('dark-mode', 'true');
      } else {  
        document.body.setAttribute('dark-mode', 'false');
      }
    });
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

  static activeChanged(tabId: number, windowId: number) {
    currentWindowMachine.send({
      type: "chrome event occur",
      data: { tabId, windowId },
      command: ChromeEventType.ACTIVE_CHANGED,
    })
  }

  static openTab(tabId: number, windowId: number, _: number) {
    const leftMargin = 423;
    const customWidth = window.screen.width - 423 - 20; // 20 is right margin of window
    const customHeight = window.screen.height - 40 ;
    console.log(window.screen.height, customHeight);

    chrome.windows.update(windowId, { 
      focused: true,
      top: 20,
      left: leftMargin,
      width: customWidth,
      height: customHeight,
      state: "normal"
    }, (w) => {
      if (w.id && w.state !== "normal") {
        chrome.windows.update(w.id, { 
          state: "normal",
          top: 20,
          left: leftMargin,
          width: customWidth,
          height: customHeight,
         });
      }
      
      chrome.tabs.update(tabId, { active: true });
    })
  }

  static closeTab(tabId: number) {
    chrome.tabs.remove(tabId);
  }

  static closeWindow(isWindowOrTab: string, id: number) {
    if (isWindowOrTab === "window") {
      chrome.windows.remove(id);
    }
    /**
     * since I made removing animation for WindowNode which requires that REMOVE_TAB
     * event should fire earlier than REMOVE_WINDOW, I use chrome.tabs.remove() rather
     * than chrome.windows.remove(). --> only if window has only one tab.
     */
    else if (isWindowOrTab === "tab") {
      chrome.tabs.remove(id);
    }
  }

  static saveWindow(win: CurrentWindow) {
    savedWindowMachine.send({
      type: "user interaction occur",
      data: { win },
      command: UserInteractionType.SAVE_WINDOW
    })
  }

  static removeSavedWindow(windowId: number) {
    savedWindowMachine.send({
      type: "user interaction occur",
      data: { windowId },
      command: UserInteractionType.REMOVE_SAVED_WINDOW
    })
  }
  
  static openSavedWindow(win: CurrentWindow) {
    const leftMargin = 384;
    const customWidth = window.screen.width - 384 - 20; // 20 is right margin of window
    const customHeight = window.screen.height - 20;

    const tabUrls = win.tabs.map(tab => tab.url!);

    chrome.windows.create({
      focused: true,
      top: 20,
      left: leftMargin,
      height: customHeight,
      width: customWidth,
      url: tabUrls,
      state: "normal"
    })
  }
  
  static searchTab() {}

  render() {
    // consoleLitComponent(this, 'render')
    return html`
      <app-navbar></app-navbar>

      <chrome-window-main>
        <current-tab-container
          slot="current-tab"
          .currentWindowMap=${this.currentWindowMap}
          .occurWindowId=${this.occurWindowId}
          .occurTabId=${this.occurTabId}
          .commandType=${this.commandType}
        ></current-tab-container>

        <saved-tab-container
          slot="saved-tab"
          .savedWindowMap=${this.savedWindowMap}
          .occurWindowId=${this.occurSavedWindowId}
          .commandType=${this.commandType}
        ></saved-tab-container>

      </chrome-window-main>
      
      <search-component></search-component>
    `;
  }
}

export default App;
