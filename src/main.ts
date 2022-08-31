import App from "./app/App";

// on start event handler

const app = new App();

chrome.runtime.onMessage.addListener(
  ({ message, data }: MessageForm, sender, sendResponse) => {
    
    console.log("[main.ts]:",message)
    
    if (message === ChromeEventType.CREATE_WINDOW) {
      const { win } = data;

      app.createWindow(win!);
    } else if (message === ChromeEventType.REMOVE_WINDOW) {
      const { windowId } = data;

      app.removeWindow(windowId!);
    } else if (message === ChromeEventType.CREATE_TAB) {
      const { tab } = data;

      app.createTab(tab!);
    } else if (message === ChromeEventType.UPDATE_TAB) {
      const { tab } = data;

      app.updateTab(tab!);
    } else if (message === ChromeEventType.REMOVE_TAB) {
      const { tabId, windowId } = data;

      app.removeTab(tabId!, windowId!);
    } else if (message === ChromeEventType.MOVE_TAB) {
      const { moveInfo, windowId, tabId } = data;

      app.moveTab(windowId!, moveInfo!);
    }
  }
);
