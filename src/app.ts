import './views/navbar/Navbar.styled';
import './views/main/Main.styled';
import './views/tab-list-ccontainer/TabListContainer.styled';
import './views/search/Search';
import './views/message/Message.styled';

import {
  ChromeEventType,
  MessageEventType,
  UserSettingsEventType,
  UsersEventType,
  FrontInitEventType,
} from './shared/events';

/**
 * app class is managing routes endpoints and attach components to index.html
 */

export const FRONT_EVENT_NAME = 'from-main';

export const USER_SETTINGS_CHNAGED = 'user-settings-changed';

interface IElemMap {
  navbar: Element;
  appMain: Element;
  currentTabListContainer: Element;
  savedTabListContainer: Element;
  search: Element;
  message: Element;
}

export default class App {
  private _main: Element;

  public elemMap: IElemMap;

  constructor() {
    this._main = document.createElement('main');

    this._main.innerHTML = `
    <app-navbar></app-navbar>

    <app-main>
      <app-tab-list-container mode=${'normal'} slot="current-tab"></app-tab-list-container>

      <app-tab-list-container mode=${'save'} slot="saved-tab"></app-tab-list-container>
    </app-main>
    
    <app-search></app-search>

    <app-message></app-message>
  `;

    this.elemMap = {
      navbar: this._main.querySelector('app-navbar')!,
      appMain: this._main.querySelector('app-main')!,
      currentTabListContainer: this._main.querySelectorAll(
        'app-tab-list-container'
      )![0],
      savedTabListContainer: this._main.querySelectorAll(
        'app-tab-list-container'
      )![1],
      search: this._main.querySelector('app-search')!,
      message: this._main.querySelector('app-message')!,
    };

    document.body.appendChild(this._main);
  }

  sendTo(
    elem: Element,
    msg:
      | IPortMessage<FrontInitEventType | ChromeEventType>
      | IFrontMessage<UsersEventType | MessageEventType | FrontInitEventType>
  ) {
    elem.dispatchEvent(
      new CustomEvent(FRONT_EVENT_NAME, {
        detail: msg,
      })
    );
  }

  sendUserSetting(msg: IPortMessage<UserSettingsEventType>) {
    Object.values(this.elemMap).forEach((elem) => {
      elem.dispatchEvent(
        new CustomEvent(USER_SETTINGS_CHNAGED, {
          detail: msg,
        })
      );
    });
  }

  closeApp() {
    window.close();
  }

  resizeApp(width: number, height: number) {
    window.resizeTo(width, height);
  }

  initWindowId() {
    const runtimeMsg: IRuntimeMessage<FrontInitEventType> = {
      sender: 'front',
      command: FrontInitEventType.RESET_WINDOW_ID,
      data: {}
    };
    chrome.runtime.sendMessage(runtimeMsg);
  }
}
