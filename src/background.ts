console.log("background is running");

/**
 * the background worker will send a events only the extension's window is created
 * the window's script will request connection to background
 */
var frontPort: RuntimePort | undefined;
var frontWinId: number | undefined;
const EXTENSION_ID = chrome.runtime.id;

var diagnol = 517.7;
var frontWidth = 367;
var frontHeight = Math.round(
  Math.sqrt(Math.pow(frontWidth, 2) + Math.pow(diagnol, 2))
);
frontWidth += 16;

function sendMessage(message: ChromeEventType, data: Partial<BackgroundData>) {
  const msg: MessageForm = {
    message,
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
      port.postMessage({message: ChromeEventType.TERMINATE});
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
  chrome.windows.create(
    {
      focused: true,
      type: "normal",
      url: "https://keepgo-studio.github.io/tab-manager-homepage/",
      state: "maximized",
    },
  );
});

chrome.windows.onCreated.addListener((win: ChromeWindow) => {
  if (win.id && frontPort) {
    chrome.windows.get(win.id, { populate: true }, (justCreatedWindow) => {
      sendMessage(ChromeEventType.CREATE_WINDOW, { win: justCreatedWindow });
    });
  }
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (frontPort) {
    sendMessage(ChromeEventType.REMOVE_WINDOW, { windowId });
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  // Notice, that the onCreate does not guarantee that the tab has fully loaded.
  if (frontPort) {
    sendMessage(ChromeEventType.CREATE_TAB, { tab });
  }
});

chrome.tabs.onMoved.addListener((_, moveInfo) => {
  if (frontPort) {
    const { windowId } = moveInfo;

    sendMessage(ChromeEventType.MOVE_TAB, { moveInfo, windowId });
  }
});

chrome.tabs.onRemoved.addListener((tabId, { isWindowClosing, windowId }) => {
  if (!frontPort) return;

  if (isWindowClosing) {
    sendMessage(ChromeEventType.REMOVE_WINDOW, { windowId, tabId });
  }
  else {
    sendMessage(ChromeEventType.REMOVE_TAB, { windowId, tabId });
  }
});

chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
  if (frontPort && !tab.url?.match(EXTENSION_ID)) {
    if (changeInfo.status !== "complete") return;

    sendMessage(ChromeEventType.UPDATE_TAB, { tab });
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
    sendMessage(ChromeEventType.INIT, {
      extensionWidth: frontWidth,
      extensionHeight: frontHeight,
    });
  }
});
