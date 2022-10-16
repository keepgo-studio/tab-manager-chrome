import { getSize } from "./utils/utils";

console.log("background is running");

/**
 * the background worker will send a events only the extension's window is created
 * the window's script will request connection to background
 */
var frontPort: RuntimePort | undefined;
var frontWinId: number | undefined;
const EXTENSION_ID = chrome.runtime.id;

interface UserInfo {
  "dark-mode": boolean;
  "outer-height": number;
  "size-mode": "mini" | "tablet" | "side";
}

const { frontWidth, frontHeight } = getSize('mini');

function sendMessage(type: ChromeEventType | AppEventType, data: Partial<BackData>) {
  const msg: IPortMessage = {
    type,
    data,
  };
  frontPort!.postMessage(msg)
}

chrome.runtime.onConnect.addListener((port) => {
  console.log(port.name);
  if (port.name === 'tab-manager') {
    if (!frontPort) {
      frontPort = port;
    } else {
      /**
       * extension window can open more than one since user can execute Ctrl + t (reopen recent closed tab)
       */
      port.postMessage({type: AppEventType.TERMINATE});
      port.disconnect();
    }
    frontPort.onDisconnect.addListener(() => (frontPort = undefined));
  } else if (port.name === 'content-script') {
    port.onMessage.addListener((msg, _) => {
      const { message, data } = msg;
      if (message === 'get address bar') {
        console.log('content-script', msg, frontPort);
        if (frontPort) {
          frontPort.postMessage({ message: 'get outer height' , outerHeight: data })
        }
      }
    })
  }
  
});

// when extension installed, only once
chrome.runtime.onInstalled.addListener(() => {
  // chrome.windows.create(
  //   {
  //     focused: true,
  //     type: "normal",
  //     url: "https://keepgo-studio.github.io/tab-manager-homepage/",
  //     state: "maximized",
  //   },
  // );
});

chrome.windows.onCreated.addListener((win: ChromeWindow) => {
  if (win.id && frontPort) {
    chrome.windows.get(win.id, { populate: true }, (justCreatedWindow) => {
      sendMessage(ChromeEventType.WINDOW_CREATED, { win: justCreatedWindow });
    });
  }
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (frontPort) {
    sendMessage(ChromeEventType.WINDOW_CLOSED, { windowId });
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  // Notice, that the onCreate does not guarantee that the tab has fully loaded.
  if (frontPort) {
    sendMessage(ChromeEventType.TAB_CREATED, { tab });
  }
});

chrome.tabs.onMoved.addListener((_, moveInfo) => {
  if (frontPort) {
    const { windowId } = moveInfo;

    sendMessage(ChromeEventType.TAB_MOVED, { moveInfo, windowId });
  }
});

chrome.tabs.onRemoved.addListener((tabId, { isWindowClosing, windowId }) => {
  if (!frontPort) return;

  if (isWindowClosing) {
    sendMessage(ChromeEventType.WINDOW_CLOSED, { windowId, tabId });
  }
  else {
    sendMessage(ChromeEventType.TAB_CLOSED, { windowId, tabId });
  }
});

chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  if (frontPort && !tab.url?.match(EXTENSION_ID)) {
    if (changeInfo.status !== "complete") return;

    sendMessage(ChromeEventType.TAB_UPDATED, { tab });
  }
});

chrome.tabs.onActivated.addListener(activeInfo => {
  const { tabId, windowId } = activeInfo;

  if (frontPort && windowId !== frontWinId) {
    sendMessage(ChromeEventType.ACTIVE_CHANGED, { tabId, windowId });
  }
})

// invoke app init(=constructor)
chrome.action.onClicked.addListener(() => {
  // open web
  if (!frontPort) {
    chrome.windows.create(
      {
        focused: true,
        type: "panel",
        url: "index.html",
        width: frontWidth,
        height: frontHeight,
        left: 20,
        top: 20,
      },
      (win) => (frontWinId = win?.id)
    );
  } else if (frontPort && frontWinId) {
    chrome.windows.update(frontWinId, { focused: true });
  }
});

chrome.windows.onBoundsChanged.addListener((win) => {
  if (frontPort && win.id === frontWinId) {
    sendMessage(AppEventType.INIT, {
      extensionWidth: frontWidth,
      extensionHeight: frontHeight,
    });
  }
});
