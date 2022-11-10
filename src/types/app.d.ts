declare global {
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
