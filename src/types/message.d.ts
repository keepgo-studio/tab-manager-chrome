declare global {
  interface BackData {
    win: ChromeWindow;
    tab: ChromeTab;
    tabId: number;
    windowId: number;
    extensionWidth: number;
    extensionHeight: number;
    outerHeight: number;
    moveInfo: {
      fromIndex: number;
      toIndex: number;
    };
  }

  interface FrontData {
    win: ChromeWindow;
    tabId: number;
    windowId: number;
    tabsLength: number;
    firstTabId: number;
  }

  interface IPortMessage {
    readonly type: ChromeEventType | AppEventType;
    readonly data: Partial<BackData>;
  }

  interface IFrontMessage {
    readonly type: UsersEventType | FrontMessageType;
    readonly data: Partial<BackData>;
  }

  const enum AppEventType {
    INIT="INIT",
    TERMINATE="TERMINATE"
  }
  const enum ChromeEventType {
    WINDOW_CREATED="WINDOW_CREATED",
    WINDOW_CLOSED="WINDOW_CLOSED",
    TAB_CREATED="TAB_CREATED",
    TAB_UPDATED="TAB_UPDATED",
    TAB_MOVED="TAB_MOVED",
    TAB_CLOSED="TAB_CLOSED",
    ACTIVE_CHANGED="ACTIVE_CHANGED",
  }
  const enum UsersEventType {
    OPEN_TAB="OPEN_TAB",
    CLOSE_TAB="CLOSE_TAB",
    CLOSE_WINDOW="CLOSE_WINDOW",
    SAVE_WINDOW="SAVE_WINDOW",
    OPEN_SAVED_WINDOW="OPEN_SAVED_WINDOW",
    DELETE_SAVED_WINDOW="DELETE_SAVED_WINDOW",
  }
  const enum FrontMessageType {
    SUCCESS,
    FAILED
  }
}

export {};
