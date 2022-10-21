import { LitElement } from "lit";
import App from "./app";

export class PortRouter {
  private _app: App;
  private _port: RuntimePort;

  constructor(app: App, port: RuntimePort) {
    this._app = app;
    this._port = port;
  }

  activeAppEvent() {
    this._port.onMessage.addListener(msg => {
      switch(msg.type) {
        case AppEventType.INIT:
          const { extensionWidth, extensionHeight } = msg.data;
          this._app.resizeApp(extensionWidth!, extensionHeight!);
          break;
        
        case AppEventType.TERMINATE:
          this._app.closeApp();
          break;
      }
    })
  }
  
  activeChromeEvent() {
    this._port.onMessage.addListener((msg: IPortMessage, _) => {
      switch(msg.type) {
        case ChromeEventType.WINDOW_CREATED:
        case ChromeEventType.WINDOW_CLOSED:
        case ChromeEventType.TAB_CREATED:
        case ChromeEventType.TAB_UPDATED:
        case ChromeEventType.TAB_MOVED:
        case ChromeEventType.TAB_CLOSED:
        case ChromeEventType.ACTIVE_CHANGED:
          this._app.sendTo(this._app.elemMap.currentTabList, msg);
      }
    })
  }
}

export const enum IComponentEventType {
  USER_EVENT="USER_EVENT",
  MESSAGE_STATUS="MESSAGE_STATUS",
}

export class FrontRouter {
  private _app: App;

  constructor(app: App) {
    this._app = app;
  }

  activeUserEvent() {
    const a = this._app;

    window.addEventListener(IComponentEventType.USER_EVENT, function (e: CustomEvent) {
      const msg: IFrontMessage = e.detail;

      console.log("[router]",msg.sender);

      switch(msg.type) {
        case UsersEventType.CHANGE_MODE:
          a.sendTo(a.elemMap.appMain, msg);
          break;
        case UsersEventType.OPEN_TAB:
        case UsersEventType.CLOSE_TAB:
        case UsersEventType.CLOSE_WINDOW:
        case UsersEventType.SAVE_WINDOW:
        case UsersEventType.OPEN_SAVED_WINDOW:
        case UsersEventType.DELETE_SAVED_WINDOW:
          a.sendTo(a.elemMap.savedTabList, msg);
      }
    } as EventListener)
  }

  activeMessageEvent() {
    const a = this._app;

    window.addEventListener(IComponentEventType.MESSAGE_STATUS, function (e: CustomEvent) {
      const msg: IFrontMessage = e.detail;

      console.log("[router]:",msg.sender);
      
      switch (msg.type) {
        case MessageEventType.SUCCESS:
        case MessageEventType.FAILED:
          a.sendTo(a.elemMap.message, msg);
      }

    } as EventListener)
  }
}