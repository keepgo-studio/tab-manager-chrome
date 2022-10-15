class PortRouter {
  private _port: RuntimePort;

  get port() {
    return this._port;
  }
  set port(port: RuntimePort) {
    this._port = port;
  }

  constructor(port: RuntimePort) {
    this._port = port;
  }

  active() {
    this._port.onMessage.addListener(({ type, data }: IPortMessage, _) => {
      if (type === AppEventType.INIT) {

      }
      else if (type === AppEventType.TERMINATE) {
        
      }
      else if (type === ChromeEventType.WINDOW_CREATED) {

      }
      else if (type === ChromeEventType.WINDOW_CLOSED) {

      }
      else if (type === ChromeEventType.TAB_CREATED) {

      }
      else if (type === ChromeEventType.TAB_UPDATED) {

      }
      else if (type === ChromeEventType.TAB_MOVED) {

      }
      else if (type === ChromeEventType.TAB_CLOSED) {

      }
      else if (type === ChromeEventType.ACTIVE_CHANGED) {

      }
    })
  }
}

class FrontRouter {
  constructor() {

  }

  activeUserEvent() {
    window.addEventListener('user-event', function (e: CustomEvent) {
      const { type, data }: IFrontMessage = e.detail;

      if (UsersEventType.OPEN_TAB) {

      }
      else if (UsersEventType.CLOSE_TAB) {

      }
      else if (UsersEventType.CLOSE_WINDOW) {

      }
      else if (UsersEventType.SAVE_WINDOW) {

      }
      else if (UsersEventType.OPEN_SAVED_WINDOW) {

      }
      else if (UsersEventType.DELETE_SAVED_WINDOW) {

      }
    } as EventListener)
  }

  activeMessageEvent() {
    window.addEventListener('message-status', function (e: CustomEvent) {
      if (FrontMessageType.SUCCESS) {

      } else if (FrontMessageType.FAILED) {

      }
    } as EventListener)
  }
}