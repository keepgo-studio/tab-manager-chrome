declare global {
  interface ITabContent {
    tabId: number;
    windowId: number;
    title: string;
    url: string;
    textContent: string;
  }

  type TabContentMap = { [tabId: number]: ITabContent }

  interface SaveWindow extends ChromeWindow {
    category: string;
  }

  interface IChromeWindowMapping {
    [windowId: number]: ChromeWindow;
  }

  type TThemeMode = 'dark' | 'light' | 'system';

  type TSizeMode = 'mini' | 'tablet' | 'side';
}

export {};
