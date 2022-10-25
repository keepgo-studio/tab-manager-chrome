declare global {
  interface IBackData {
    win: ChromeWindow;
    tab: ChromeTab;
    tabId: number;
    windowId: number;
    extensionWidth: number;
    extensionHeight: number;
    moveInfo: {
      fromIndex: number;
      toIndex: number;
    };
  }

  interface IFrontData {
    win: ChromeWindow;
    tabId: number;
    windowId: number;
    tabsLength: number;
    firstTabId: number;
    message: string;
    mode: AppMode;
  }

  interface IPortMessage<T> {
    readonly type: T;
    readonly data: Partial<IBackData>;
  }

  interface IFrontMessage {
    sender: string,
    readonly type: UsersEventType | MessageEventType;
    readonly data: Partial<IFrontData>;
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
    CHANGE_MODE="CHANGE_MODE",
    OPEN_TAB="OPEN_TAB",
    CLOSE_TAB="CLOSE_TAB",
    CLOSE_WINDOW="CLOSE_WINDOW",
    SAVE_WINDOW="SAVE_WINDOW",
    OPEN_SAVED_WINDOW="OPEN_SAVED_WINDOW",
    DELETE_SAVED_WINDOW="DELETE_SAVED_WINDOW",
  }
  const enum MessageEventType {
    SUCCESS,
    FAILED
  }
}

export {};
