import {
  ChromeEventType,
  MessageEventType,
  UsersEventType,
  FrontInitEventType,
  AppEventType,
} from './shared/events';
import UserSettings from './store/local-storage';

import '@views/navbar/Navbar.styled';
import '@src/views/main/Main.styled';
import '@src/views/tab-list-container/TabListContainer';
import '@views/message/Message.styled';
import '@views/search/Search';
import '@views/setting/Setting';

/**
 * app class is managing routes endpoints and attach components to index.html
 */

export const FRONT_EVENT_NAME = 'from-main';

interface IElemMap {
  navbar: Element;
  appMain: Element;
  currentTabListContainer: Element;
  savedTabListContainer: Element;
  search: Element;
  message: Element;
  setting: Element;
}

export default class App {
  private _main: Element;

  private _userSetting: TUserSettingMap = {};

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

    <app-setting></app-setting>
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
      setting: this._main.querySelector('app-setting')!,
    };

    document.body.appendChild(this._main);
  }

  async initApp() {
    const theme = await UserSettings.geThemeMode();
    const lang = await UserSettings.getLangMode();
    const size = await UserSettings.getSizeMode();

    if (theme === undefined) {
      await UserSettings.setThemeMode('light');
    }

    if (lang === undefined) {
      await UserSettings.setLangMode('ko');
    }

    if (size === undefined) {
      await UserSettings.setSizeMode('mini');
    }

    this._userSetting.lang = lang;
    this._userSetting.size = size;
    this._userSetting.theme = theme;
  }

  sendTo(
    elem: Element,
    msg:
      | IPortMessage<FrontInitEventType | ChromeEventType | AppEventType>
      | IFrontMessage<UsersEventType | MessageEventType | FrontInitEventType>
  ) {
    elem.dispatchEvent(
      new CustomEvent(FRONT_EVENT_NAME, {
        detail: msg,
      })
    );
  }

  updateUserSetting(msg: IPortMessage<AppEventType>) {
    if (msg.data.userSettings!.theme !== undefined) {
      this._userSetting.theme = msg.data.userSettings!.theme;
    }

    if (msg.data.userSettings!.lang !== undefined) {
      this._userSetting.lang = msg.data.userSettings!.lang;
    }

    if (msg.data.userSettings!.size !== undefined) {
      this._userSetting.size = msg.data.userSettings!.size;
    }
    UserSettings.pushUpdateToEntries(msg.data.userSettings!);
  }

  closeApp() {
    window.close();
  }

  async resizeApp() {
    const data = await UserSettings.getSizeValues();
    const { width, height } = data[this._userSetting.size!];
    window.resizeTo(width, height);
  }

  initWindowId() {
    const runtimeMsg: IRuntimeMessage<FrontInitEventType> = {
      sender: 'front',
      command: FrontInitEventType.RESET_WINDOW_ID,
      data: {},
    };
    chrome.runtime.sendMessage(runtimeMsg);
  }
}
