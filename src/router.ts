import { LitElement } from "lit";
import App from "./app";

export class PortRouter {
  private _app: App;
  private _port: RuntimePort;

  constructor(app: App, port: RuntimePort) {
    this._app = app;
    this._port = port;
  }

  active() {
    this._port.onMessage.addListener(({ type, data }: IPortMessage, _) => {
      switch(type) {
        case AppEventType.INIT:
          const { extensionWidth, extensionHeight } = data;
          window.resizeTo(extensionWidth!, extensionHeight!);
          break;
        
        case AppEventType.TERMINATE:
          window.close();
          break;

        case ChromeEventType.WINDOW_CREATED:
        case ChromeEventType.WINDOW_CLOSED:
        case ChromeEventType.TAB_CREATED:
        case ChromeEventType.TAB_UPDATED:
        case ChromeEventType.TAB_MOVED:
        case ChromeEventType.TAB_CLOSED:
        case ChromeEventType.ACTIVE_CHANGED:
          this._app.sendToCurrentTabList(type, data);
      }
    })
  }
}

export const enum IComponentEventType {
  USER_EVENT="USER_EVENT",
  MESSAGE_STATUS="MESSAGE_STATUS",
  POPSTATE="POPSTATE"
}

export class FrontRouter {
  private _app: App;

  constructor(app: App) {
    this._app = app;
  }

  activeUserEvent() {
    const a = this._app;

    window.addEventListener(IComponentEventType.USER_EVENT, function (e: CustomEvent) {
      const { sender, type, data }: IFrontMessage = e.detail;

      console.log("[router]",sender);

      switch(type) {
        case UsersEventType.OPEN_TAB:
        case UsersEventType.CLOSE_TAB:
        case UsersEventType.CLOSE_WINDOW:
        case UsersEventType.SAVE_WINDOW:
        case UsersEventType.OPEN_SAVED_WINDOW:
        case UsersEventType.DELETE_SAVED_WINDOW:
          a.sendToSavedTabList(type, data);
      }
    } as EventListener)
  }

  activeMessageEvent() {
    const a = this._app;

    window.addEventListener(IComponentEventType.MESSAGE_STATUS, function (e: CustomEvent) {
      const { sender, type, data }: IFrontMessage = e.detail;

      console.log("[router]:",sender);

      switch (type) {
        case MessageEventType.SUCCESS:
        case MessageEventType.FAILED:
          a.sendToMessage(type, data);
      }

    } as EventListener)
  }

  activeHistoryEvent() {
    window.addEventListener(IComponentEventType.POPSTATE, () => {
      this._app.sendToMain();
    })
  }
}