/*
  only for type aliasing chrome API
*/
declare global {
  type ChromeWindow = chrome.windows.Window;

  type WindowType = chrome.windows.windowTypeEnum;

  type ChromeTab = chrome.tabs.Tab;

  type RuntimePort = chrome.runtime.Port;
}

export {}