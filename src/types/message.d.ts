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
    userSettings: {
      "theme-mode"?: TThemeMode;
      "size-mode"?: TSizeMode;
    }
  }

  interface IFrontData {
    win: ChromeWindow;
    tabId: number;
    windowId: number;
    tabsLength: number;
    firstTabId: number;
    message: string;
    mode: TAppMode;
  }

  type TAppMode  = "normal" | "save";

  interface IPortMessage<T> {
    discriminator: 'IPortMessage',
    readonly data: Partial<IBackData>;
    readonly command: T;
  }

  interface IFrontMessage<T> {
    discriminator: 'IFrontMessage'
    sender: string,
    readonly data: Partial<IFrontData>;
    readonly command: T;
  }
}

export {};
