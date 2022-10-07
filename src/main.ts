import App from "./app/app";

window.document.title = chrome.runtime.getManifest().description!;

function connectToBack() {
  return chrome.runtime.connect({ name: "tab-manager" });
}

window.onload = () => {
  // connect to worker
  let port = connectToBack();

  port.onMessage.addListener(({ message, data }: MessageForm, _) => {
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
    } else if (message === ChromeEventType.ACTIVE_CHANGED) {
      const { tabId, windowId } = data;

      App.activeChanged(tabId!, windowId!);
    } else if (message === ChromeEventType.REMOVE_TAB) {
      const { tabId, windowId } = data;

      App.removeTab(tabId!, windowId!);
    } else if (message === ChromeEventType.MOVE_TAB) {
      const { moveInfo, windowId } = data;

      App.moveTab(windowId!, moveInfo!);
    } else if (message === ChromeEventType.TERMINATE) {
      window.close();
    }
  });

  const eventsFromComponents = [
    // from WindowNode
    {
      name: "open-tab",
      handler: (e: CustomEvent) => {
        App.openTab(e.detail.tabId, e.detail.windowId);
      },
    },
    {
      name: "close-window",
      handler: (e: CustomEvent) => {
        const { windowId, tabsLength, firstTabId } = e.detail;
  
        if (tabsLength === 1) {
          App.closeWindow("tab", firstTabId);
        } else {
          App.closeWindow("window", windowId);
        }
      },
    },
    {
      name: "save-window",
      handler: (e: CustomEvent) => {
        App.saveWindow(e.detail.win);
      },
    },
    {
      name: "remove-saved-window",
      handler: (e: CustomEvent) => {
        App.removeSavedWindow(e.detail.windowId);
      },
    },
    {
      name: "open-saved-window",
      handler: (e: CustomEvent) => {
        App.openSavedWindow(e.detail.win);
      },
    },
  ];

  // attach custom events that comes from users
  eventsFromComponents.forEach((eventObj) => {
    const { name, handler } = eventObj;

    window.addEventListener(name, handler as EventListener);
  });

  // init ui
  App.init();

  port.onDisconnect.addListener(() => {
    /**
     * retry connection if this window had disconnected with various reasons (e.g timeout)
     */
    console.log("[main.ts]:", "reconnection");
    location.reload();
  })
};