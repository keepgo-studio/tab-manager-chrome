console.log("background is running");

var isOpened = false;
var extensionWindowId: number | undefined;

var diagnol = 517.7;
var width = 344;
var height = Math.round(Math.sqrt(Math.pow(width, 2) + Math.pow(diagnol, 2)));
width += 16;

// when extension installed, only once
chrome.runtime.onInstalled.addListener(() => {
    /* 
        send event to main js
    */
});

chrome.windows.onCreated.addListener((window: ChromeWindow) => {
  if (window.id !== extensionWindowId && isOpened) {
    const message:MessageForm = {
      message: "CREATE_WINDOW",
      data: {
        window
      }
    }

    chrome.runtime.sendMessage(message);
  }

});

chrome.windows.onRemoved.addListener((windowId) => {
  if (extensionWindowId === windowId) {
    isOpened = false;
  }
});

chrome.tabs.onCreated.addListener(() => {});

chrome.tabs.onMoved.addListener(() => {});

chrome.tabs.onRemoved.addListener(() => {});

chrome.tabs.onUpdated.addListener(() => {});

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
      }
    );

    isOpened = true;
  }
});
