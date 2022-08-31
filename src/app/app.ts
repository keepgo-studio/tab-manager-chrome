import "./components/Navbar";
import "./components/Search";
import "./components/ChromeWindowMain";
import "./components/CurrentTabContainer";
import "./components/SaveTabContainer";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { interpret } from "xstate";
import { CurrentWindowMachine } from "../machine/CurrentWindowMachine";

@customElement("app-")
class App extends LitElement {
  private _machine;

  @property()
  _currentWindowList: CurrentWindow[];

  constructor() {
    super();
    this._currentWindowList = [];

    this._machine = interpret(CurrentWindowMachine)
      .onTransition((state) => {
        /* 
          need to fix : list update fired twice.
            it looks like the 'after type' event make an error...
            but don't know why since I think after event didn't do
            anything at all :(
        */
        if (state.changed) {
          this._currentWindowList = state.context.data;

          console.log(this._currentWindowList);
        }
      })
      .start();
  }

  createWindow(win: ChromeWindow) {
    this._machine.send({
      type: "chrome event occur",
      data: { win },
      command: ChromeEventType.CREATE_WINDOW,
    });
  }

  createTab(tab: ChromeTab) {
    this._machine.send({
      type: "chrome event occur",
      data: { tab, windowId: tab.windowId },
      command: ChromeEventType.CREATE_TAB,
    });
  }

  removeWindow(windowId: number) {
    this._machine.send({
      type: "chrome event occur",
      data: { windowId },
      command: ChromeEventType.REMOVE_WINDOW,
    });
  }

  moveTab(
    windowId: number,
    moveInfo: { fromIndex: number; toIndex: number }
  ) {
    this._machine.send({
      type: "chrome event occur",
      data: { windowId, moveInfo },
      command: ChromeEventType.MOVE_TAB
    })
  }

  removeTab(tabId: number, windowId: number) {
    this._machine.send({
      type: "chrome event occur",
      data: { windowId, tabId },
      command: ChromeEventType.REMOVE_TAB,
    });
  }

  updateTab(tab: ChromeTab) {
    this._machine.send({
      type: "chrome event occur",
      data: { tab },
      command: ChromeEventType.UPDATE_TAB,
    });
  }

  saveWindow() {}

  removeSaveWindow() {}

  searchTab() {}

  render() {
    return html`
      <app-navbar></app-navbar>

      <main>
        <chrome-window-main>
          <current-tab-container></current-tab-container>

          <save-tab-container></save-tab-container>
        </chrome-window-main>

        <search-component></search-component>
      </main>
    `;
  }
}

export default App;
