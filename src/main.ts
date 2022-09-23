import App from "./app/app";

chrome.runtime.onMessage.addListener(
  ({ message, data }: MessageForm, sender, sendResponse) => {
    console.log("[main.ts]:", message);

    if (message === ChromeEventType.INIT) {
      const { extensionWidth, extensionHeight } = data;

      window.resizeTo(extensionWidth!, extensionHeight!);
      App.init();
    } else if (message === ChromeEventType.CREATE_WINDOW) {
      const { win } = data;

      App.createWindow(win!);
    } else if (message === ChromeEventType.REMOVE_WINDOW) {
      const { windowId } = data;

      App.removeWindow(windowId!);
    } else if (message === ChromeEventType.CREATE_TAB) {
      const { tab } = data;

      App.createTab(tab!);
    } else if (message === ChromeEventType.UPDATE_TAB) {
      const { tab } = data;

      App.updateTab(tab!);
    } else if (message === ChromeEventType.REMOVE_TAB) {
      const { tabId, windowId } = data;

      App.removeTab(tabId!, windowId!);
    } else if (message === ChromeEventType.MOVE_TAB) {
      const { moveInfo, windowId, tabId } = data;

      App.moveTab(windowId!, moveInfo!);
    }
  }
);

const eventsFromComponents = [
  // from WindowNode
  {
    name: 'open-tab',
    handler: (e: CustomEvent) => {
      App.openTab(e.detail.tabId, e.detail.windowId);
    }
  },
  {
    name: 'close-window',
    handler: (e: CustomEvent) => {
      App.closeWindow(e.detail.firstTabId);
    }
  },
  {
    name: 'save-window',
    handler: (e: CustomEvent) => {
      App.saveWindow(e.detail.windowId);
    }
  }
]
  
window.onload = () => {
  eventsFromComponents.forEach(eventObj => {
    const { name, handler } = eventObj;

    window.addEventListener(name, handler as EventListener);
  });

  App.init();
}

window.onclose = () => {
  eventsFromComponents.forEach(eventObj => {
    const { name, handler } = eventObj;
  
    window.removeEventListener(name, handler as EventListener);
  });
}