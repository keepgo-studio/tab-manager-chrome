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
    mode: TAppMode;
    allWindows: IChromeWindowMapping;
  }

  type TAppMode = 'normal' | 'save';

  interface IPortMessage<T> {
    readonly discriminator: 'IPortMessage';
    readonly data: Partial<IBackData>;
    readonly command: T;
  }

  interface IFrontMessage<T> {
    readonly discriminator: 'IFrontMessage';
    readonly sender: string;
    readonly data: Partial<IFrontData>;
    readonly command: T;
  }

  interface IRuntimeMessage<T> {
    sender: 'front' | 'back' | 'content';
    readonly command: T;
    readonly data: Partial<{ textContent: string }>;
  }
}

export {};
