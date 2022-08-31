declare global {
  
  interface BackgroundData {
    win: ChromeWindow;
    tab: ChromeTab;
    tabId: number,
    windowId: number,
    
    moveInfo: {
      fromIndex: number,
      toIndex: number
    }
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

  interface StorageSaveForm {
    key: string,
    window: CurrentWindow
  }

  const enum ChromeEventType {
    REMOVE_TAB = "REMOVE_TAB",
    REMOVE_WINDOW = "REMOVE_WINDOW",
    CREATE_TAB = "CREATE_TAB",
    CREATE_WINDOW = "CREATE_WINDOW",
    UPDATE_TAB = "UPDATE_TAB",
    MOVE_TAB = "MOVE_TAB"
  }
}

export {};