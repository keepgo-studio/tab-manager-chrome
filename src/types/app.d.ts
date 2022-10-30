declare global {
  interface CurrentTab extends ChromeTab {
    textContent: string;
  }

  interface CurrentWindow extends ChromeWindow {
    tabs: ChromeTab[];
  }

  interface SaveWindow extends ChromeWindow {
    category: string;
  }

  interface StorageSaveForm {
    key: string;
    window: CurrentWindow;
  }

  interface CurrentWindowMapping {
    [windowId: number]: CurrentWindow
  }

  type TThemeMode = "dark" | "light" | "system";

  type TSizeMode = "mini" | "tablet" | "side";
}

export {};