import App from './app';
import {
  AppEventType,
  AppLifeCycleEventType,
  ChromeEventType,
  FrontInitEventType,
  MessageEventType,
  UsersEventType,
} from './shared/events';

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
          | IPortMessage<ChromeEventType>
          | IPortMessage<AppLifeCycleEventType>
          | IPortMessage<AppEventType>
      ) => {
        console.log('[main]:', msg.command, msg.data);
        switch (msg.command) {
          case AppLifeCycleEventType.SET_SIZE:
            this._app.resizeApp();
            break;

          case AppLifeCycleEventType.TERMINATE:
            this._app.closeApp();
            break;

          case ChromeEventType.WINDOW_CREATED:
          case ChromeEventType.WINDOW_CLOSED:
          case ChromeEventType.TAB_CREATED:
          case ChromeEventType.TAB_UPDATED:
          case ChromeEventType.TAB_MOVED:
          case ChromeEventType.TAB_CLOSED:
          case ChromeEventType.FOCUS_CHANGED:
          case ChromeEventType.ACTIVE_CHANGED:
            this._app.sendTo(this._app.elemMap.currentTabListContainer, msg);
            break;

          case AppEventType.USER_SETTINGS_CHNAGED:
            this._app.updateUserSetting(msg);
            this._app.resizeApp();
            break;
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

  attachEvent(
    command: UsersEventType | FrontInitEventType | MessageEventType,
    target: Element
  ) {
    const _app = this._app;

    window.addEventListener(command, function (e: CustomEvent) {
      const msg: IFrontMessage<
        UsersEventType | FrontInitEventType | MessageEventType
      > = e.detail;

      _app.sendTo(target, msg);
    } as EventListener);
  }

  activeUserEvent() {
    for (const command in UsersEventType) {
      let target: Element;

      switch (command) {
        case UsersEventType.CHANGE_MODE:
          target = this._app.elemMap.appMain;
          break;
        case UsersEventType.SAVE_WINDOW:
        case UsersEventType.OPEN_SAVED_WINDOW:
        case UsersEventType.DELETE_SAVED_WINDOW:
        case UsersEventType.DELETE_SAVED_TAB:
          target = this._app.elemMap.savedTabListContainer;
          break;
        case UsersEventType.OPEN_SETTING:
          target = this._app.elemMap.setting;
      }

      this.attachEvent(command as UsersEventType, target!);
    }
  }

  activeInitEvent() {
    const _app = this._app;

    for (const command in FrontInitEventType) {
      let target: Element;

      switch (command) {
        case FrontInitEventType.SET_WINDOWS_CONTENT:
          target = _app.elemMap.search;

          this.attachEvent(command as FrontInitEventType, target!);
          break;
        case FrontInitEventType.RESET_WINDOW_ID:
          _app.initWindowId();
          break;
      }
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

      this.attachEvent(command as MessageEventType, target!);
    }
  }
}
