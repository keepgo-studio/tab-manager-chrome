declare global {
  
  interface BackgroundData {
    window: ChromeWindow;
    tab: ChromeTab
  }

  interface MessageForm {
    readonly message: string,
    readonly data: Partial<BackgroundData>
  }
  
  interface CurrentTab extends ChromeTab {
    textContent: string
  }
  
  interface CurrentWindow extends ChromeWindow {
    tabs: ChromeTab[]
  }
  
  interface SaveWindow extends ChromeWindow {
    category: string
  }
}

export {};