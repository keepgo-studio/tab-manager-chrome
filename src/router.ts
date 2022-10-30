import App from './app';
import { AppEventType, ChromeEventType, MessageEventType, UserSettingsEventType, UsersEventType } from './shared/events';

export class PortRouter {
  private _app: App;
  private _port: RuntimePort;

  constructor(app: App, port: RuntimePort) {
    this._app = app;
    this._port = port;
  }

  active() {
    this._port.onMessage.addListener(
      (
        msg:
          | IPortMessage<ChromeEventType | AppEventType>
          | IPortMessage<UserSettingsEventType>
      ) => {
        // console.log('[main]:', msg.command, msg.data);
        switch (msg.command) {
          case AppEventType.SET_SIZE:
            const { extensionWidth, extensionHeight } = msg.data;
            this._app.resizeApp(extensionWidth!, extensionHeight!);
            break;

          case AppEventType.TERMINATE:
            this._app.closeApp();
            break;

          case ChromeEventType.WINDOW_CREATED:
          case ChromeEventType.WINDOW_CLOSED:
          case ChromeEventType.TAB_CREATED:
          case ChromeEventType.TAB_UPDATED:
          case ChromeEventType.TAB_MOVED:
          case ChromeEventType.TAB_CLOSED:
          case ChromeEventType.FOCUS_CHANGED:
            this._app.sendTo(this._app.elemMap.currentTabListContainer, msg);
            break;

          case UserSettingsEventType.SIZE_MODE:
          case UserSettingsEventType.THEME_MODE:
            this._app.sendUserSetting(msg);
        }
      }
    );
  }
}

export class FrontRouter {
  private _app: App;

  constructor(app: App) {
    this._app = app;
  }

  activeUserEvent() {
    const _app = this._app;

    for (const command in UsersEventType) {
      let target: Element;

      switch (command) {
        case UsersEventType.CHANGE_MODE:
          target = _app.elemMap.appMain;
          break;
        case UsersEventType.OPEN_TAB:
        case UsersEventType.CLOSE_TAB:
        case UsersEventType.CLOSE_WINDOW:
          target = _app.elemMap.currentTabListContainer;
          break;
        case UsersEventType.SAVE_WINDOW:
        case UsersEventType.OPEN_SAVED_WINDOW:
        case UsersEventType.DELETE_SAVED_WINDOW:
          target = _app.elemMap.savedTabListContainer;
      }

      window.addEventListener(command, function (e: CustomEvent) {
        const msg: IFrontMessage<UsersEventType> = e.detail;

        _app.sendTo(target, msg);
      } as EventListener);
    }
  }

  activeMessageEvent() {
    const _app = this._app;

    for (const command in MessageEventType) {
      let target: Element;

      switch (command) {
        case MessageEventType.SUCCESS:
        case MessageEventType.FAILED:
          target = _app.elemMap.message;
      }

      window.addEventListener(command, function (e: CustomEvent) {
        const msg: IFrontMessage<MessageEventType> = e.detail;

        _app.sendTo(target, msg);
      } as EventListener);
    }
  }
}
