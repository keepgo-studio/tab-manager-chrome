import {
  AppEventType,
  AppLifeCycleEventType,
  ChromeEventType,
  FrontInitEventType,
} from './shared/events';
import { getSize } from './utils/utils';

console.log('background is running');

const size = getSize('mini');

const extensionInfo: {
  id: string;
  frontPort: RuntimePort | undefined;
  /**
   * frontWinId : the background worker will send a events only the extension's window is created.
   * the window's script will request connection to background
   */
  frontWinId: number | undefined;
  frontWidth: number;
  frontHeight: number;
} = {
  id: chrome.runtime.id,
  frontPort: undefined,
  frontWinId: undefined,
  frontWidth: size.frontWidth,
  frontHeight: size.frontHeight,
};

function sendMessage(
  port: RuntimePort | undefined,
  command: ChromeEventType | AppLifeCycleEventType | AppEventType,
  data?: Partial<IBackData>
) {
  if (!port) return;

  const msg:
    | IPortMessage<ChromeEventType>
    | IPortMessage<AppLifeCycleEventType>
    | IPortMessage<AppEventType> = {
    discriminator: 'IPortMessage',
    command,
    data: data ?? {},
  };

  port.postMessage(msg);
}


async function init() {
  chrome.runtime.onInstalled.addListener(async () => {
    // chrome.windows.create(
    //   {
    //     focused: true,
    //     type: "normal",
    //     url: "https://keepgo-studio.github.io/tab-manager-homepage/",
    //     state: "maximized",
    //   },
    // );
    // chrome.windows.getAll({ populate: true, windowTypes: ['normal']}, allWindows => {
    //   allWindows.forEach(win => {
    //     win.tabs?.forEach(tab => {
    //       if (tab.id === undefined) return;
    //       chrome.tabs.reload(tab.id);
    //     })
    //   })
    // })  
  });
}

/**
 * craete connection between content-script, and front
 */
function createConnection() {
  chrome.runtime.onConnect.addListener((port) => {
    switch (port.name) {
      case 'front':
        if (!extensionInfo.frontPort) {
          extensionInfo.frontPort = port;

          console.log('connected to front');

          extensionInfo.frontPort.onDisconnect.addListener(() => {
            extensionInfo.frontPort = undefined;
            extensionInfo.frontWinId = undefined;
          });
        } else {
          /**
           * extension window can open more than one since user can execute Ctrl + t (reopen recent closed tab)
           */
          sendMessage(port, AppLifeCycleEventType.TERMINATE);
          port.disconnect();
        }
        break;
      case 'content-script':
        break;
    }
  });

  chrome.runtime.onMessage.addListener(
    (
      msg: IRuntimeMessage<FrontInitEventType | ChromeEventType>,
      senderInfo
    ) => {
      const { command, sender } = msg;

      switch (sender) {
        case 'front':
          if (command === FrontInitEventType.RESET_WINDOW_ID) {
            extensionInfo.frontWinId = senderInfo.tab!.windowId;
          }
          break;
      }
    }
  );
}

function startFront() {
  chrome.action.onClicked.addListener(() => {
    // open web
    if (extensionInfo.frontWinId) {
      /**
       * if front window is alive and not focused
       */
      chrome.windows.update(extensionInfo.frontWinId, { focused: true });
    } else {
      chrome.windows.create({
        focused: true,
        type: 'panel',
        url: 'index.html',
        width: extensionInfo.frontWidth,
        height: extensionInfo.frontHeight,
        left: 20,
        top: 20,
      });
    }
  });
}

function windowEventsHandler() {
  chrome.windows.onCreated.addListener((win: ChromeWindow) => {
    if (!extensionInfo.frontPort) return;

    if (!win.id) return;

    chrome.windows.get(win.id, { populate: true }, (justCreatedWindow) => {
      sendMessage(extensionInfo.frontPort, ChromeEventType.WINDOW_CREATED, {
        win: justCreatedWindow,
      });
    });
  });

  chrome.windows.onRemoved.addListener((windowId) => {
    if (!extensionInfo.frontPort) return;

    sendMessage(extensionInfo.frontPort, ChromeEventType.WINDOW_CLOSED, {
      windowId,
    });
  });

  chrome.windows.onBoundsChanged.addListener((win) => {
    if (!extensionInfo.frontPort) return;

    if (win.id !== extensionInfo.frontWinId) return;

    sendMessage(extensionInfo.frontPort, AppLifeCycleEventType.SET_SIZE, {
      extensionWidth: extensionInfo.frontWidth,
      extensionHeight: extensionInfo.frontHeight,
    });
  });

  chrome.windows.onFocusChanged.addListener((windowId) => {
    if (!extensionInfo.frontPort) return;

    if (
      windowId === chrome.windows.WINDOW_ID_NONE ||
      windowId === extensionInfo.frontWinId
    )
      return;

    sendMessage(extensionInfo.frontPort, ChromeEventType.FOCUS_CHANGED, {
      windowId,
    });
  });
}

function tabEventsHandler() {
  chrome.tabs.onCreated.addListener((tab) => {
    // Notice, that the onCreate does not guarantee that the tab has fully loaded.
    if (!extensionInfo.frontPort) return;

    sendMessage(extensionInfo.frontPort, ChromeEventType.TAB_CREATED, {
      tab,
      windowId: tab.windowId,
    });
  });

  chrome.tabs.onMoved.addListener((_, moveInfo) => {
    if (!extensionInfo.frontPort) return;

    const { windowId } = moveInfo;

    sendMessage(extensionInfo.frontPort, ChromeEventType.TAB_MOVED, {
      windowId,
      moveInfo,
    });
  });

  chrome.tabs.onRemoved.addListener((tabId, { isWindowClosing, windowId }) => {
    if (!extensionInfo.frontPort) return;

    if (!isWindowClosing) {
      sendMessage(extensionInfo.frontPort, ChromeEventType.TAB_CLOSED, {
        windowId,
        tabId,
      });
    }
  });

  chrome.tabs.onUpdated.addListener((_, changeInfo, tab) => {
    if (!extensionInfo.frontPort) return;

    if (tab.url?.match(extensionInfo.id)) return;

    if (changeInfo.status !== 'complete') return;

    sendMessage(extensionInfo.frontPort, ChromeEventType.TAB_UPDATED, { tab });
  });

  chrome.tabs.onActivated.addListener((activeInfo) => {
    if (!extensionInfo.frontPort) return;

    const { tabId, windowId } = activeInfo;

    if (windowId === extensionInfo.frontWinId) return;

    sendMessage(extensionInfo.frontPort, ChromeEventType.ACTIVE_CHANGED, {
      tabId,
      windowId,
    });
  });
}

function storageEventsHandler() {
  chrome.storage.onChanged.addListener((changes) => {
    if (!extensionInfo.frontPort) return;

    let userSettings: TUserSettingMap = {};

    if ('theme-mode' in changes) {
      userSettings.theme = changes['theme-mode'].newValue as TThemeMode;
    }

    if ('size-mode' in changes) {
      userSettings.size = changes['size-mode'].newValue as TSizeMode;
    }

    if ('lang-mode' in changes) {
      userSettings.lang = changes['lang-mode'].newValue as TLangMode;
    }

    sendMessage(extensionInfo.frontPort, AppEventType.USER_SETTINGS_CHNAGED, {
      userSettings,
    });
  });
}

init();

createConnection();

startFront();

windowEventsHandler();
tabEventsHandler();
storageEventsHandler();
