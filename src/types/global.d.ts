declare global {
  interface BackgroundData {
    win: ChromeWindow;
    tab: ChromeTab;
    tabId: number;
    windowId: number;

    moveInfo: {
      fromIndex: number;
      toIndex: number;
    };

    extensionWidth: number;
    extensionHeight: number;

    outerHeight: number;
  }
  
  // needed interface for machines
  interface TransactionData {}

  interface MessageForm {
    readonly message: ChromeEventType | UserInteractionType | 'get outer height';
    readonly data: Partial<BackgroundData>;
  }

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

  const enum ChromeEventType {
    INIT="INIT",
    REMOVE_TAB="REMOVE_TAB",
    REMOVE_WINDOW="REMOVE_WINDOW",
    CREATE_TAB="CREATE_TAB",
    CREATE_WINDOW="CREATE_WINDOW",
    UPDATE_TAB="UPDATE_TAB",
    ACTIVE_CHANGED="ACTIVE_CHANGED",
    MOVE_TAB="MOVE_TAB",
    TERMINATE="TERMINATE"
  }

  const enum UserInteractionType {
    OPEN_SAVED_WINDOW="OPEN_SAVED_WINDOW",
    REMOVE_SAVED_WINDOW="REMOVE_SAVED_WINDOW",
    SAVE_WINDOW="SAVE_WINDOW"
  }
}

export {};
