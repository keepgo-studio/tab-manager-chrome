console.log("background is running");

var isOpened = false;
var extensionWindowId: number | undefined;
var extensionTabId: number | undefined;

var diagnol = 517.7;
var width = 344;
var height = Math.round(Math.sqrt(Math.pow(width, 2) + Math.pow(diagnol, 2)));
width += 16;

// when extension installed, only once
chrome.runtime.onInstalled.addListener(() => {

});

chrome.windows.onCreated.addListener((win: ChromeWindow) => {
  if (win.id && win.id !== extensionWindowId) {

    if (isOpened) {
      chrome.windows.get(win.id, { populate: true }, (justCreatedWindow) => {
        const message: MessageForm = {
          message: ChromeEventType.CREATE_WINDOW,
          data: { win: justCreatedWindow },
        };
  
        chrome.runtime.sendMessage(message);
      });
    }

    // setDataLocal({
    //   key: `current-window-${window.id}`,
    //   window: window as CurrentWindow,
    // });

    /* 
      ************************************
      test code
      ************************************
    */

    // getDataLocal(null).then((d) => {});

    /*
     ************************************
     */
  }
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (extensionWindowId === windowId) {
    isOpened = false;
  }

  if (isOpened) {
    const message: MessageForm = {
      message: ChromeEventType.REMOVE_WINDOW,
      data: { windowId },
    };

    chrome.runtime.sendMessage(message);
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  // Notice, that the onCreate does not guarantee that the tab has fully loaded.
  if (tab.windowId && extensionWindowId !== tab.windowId ) {

    if (!isOpened) return;

    const message: MessageForm = {
      message: ChromeEventType.CREATE_TAB,
      data: { tab },
    };

    chrome.runtime.sendMessage(message);
  }
});

chrome.tabs.onMoved.addListener((_, moveInfo) => {
  const { windowId } = moveInfo;
  if (windowId === extensionWindowId) return;

  if (isOpened) {
    const message: MessageForm = {
      message: ChromeEventType.MOVE_TAB,
      data: { moveInfo, windowId },
    };

    chrome.runtime.sendMessage(message);
  }
});

chrome.tabs.onRemoved.addListener((tabId, { isWindowClosing, windowId }) => {
  if (windowId === extensionWindowId) return;

  if (isOpened && !isWindowClosing) {
    const message: MessageForm = {
      message: ChromeEventType.REMOVE_TAB,
      data: { windowId, tabId },
    };

    chrome.runtime.sendMessage(message);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // if (changeInfo.status !== "complete") return;

  if (isOpened && extensionWindowId !== tab.windowId) {
    const message: MessageForm = {
      message: ChromeEventType.UPDATE_TAB,
      data: { tab },
    };

    chrome.runtime.sendMessage(message);
  }
});

// invoke app init(=constructor)
chrome.action.onClicked.addListener((tab) => {
  // open web
  if (!isOpened) {
    chrome.windows.create(
      {
        focused: true,
        type: "panel",
        url: "index.html",
        width,
        height,
        left: 20,
        top: 20,
      },
      (window) => {
        extensionWindowId = window!.id;

        isOpened = true;
      }
    );
  }
});