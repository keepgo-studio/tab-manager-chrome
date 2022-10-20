

import { userSettings } from './store/local-storage';

/**
 * app class is managing routes endpoints and attach components to index.html
 */
export default class App {
  private _main: Element;
  private _navbar: Element;
  private _appMain: Element;
  private _currentTabList: Element;
  private _savedTabList: Element;
  private _search: Element;
  private _message: Element;

  private eventName = 'from-main';

  constructor() {
    this._main = document.createElement('main');

    this._main.innerHTML = `
    <app-navbar></app-navbar>

    <app-main>
      <app-current-tab-list slot="current-tab"></app-current-tab-list>

      <app-saved-tab-list slot="saved-tab"></app-saved-tab-list>
    </app-main>
    
    <app-search></app-search>

    <app-message></app-message>
  `;

    this._navbar = this._main.querySelector('app-navbar')!;
    this._appMain = this._main.querySelector('app-main')!;
    this._currentTabList = this._main.querySelector('app-current-tab-list')!;
    this._savedTabList = this._main.querySelector('app-saved-tab-list')!;
    this._search = this._main.querySelector('app-search')!;
    this._message = this._main.querySelector('app-message')!;

    document.body.appendChild(this._main);

    // userSettings.addChangeHandler((changes: { [x: string]: any; }) => {
    //   if (changes['dark-mode']) {
    //     this.sendToAll(
    //       'dark-mode',
    //       this._navbar,
    //       this._appMain,
    //       this._currentTabList,
    //       this._savedTabList,
    //       this._search,
    //       this._message
    //     );
    //   }
    // })
  }

  sendToAll(type: string, ...allElem: Element[]) {
    allElem.forEach((elem) => {
      elem.dispatchEvent(
        new CustomEvent(this.eventName, {
          detail: {
            type,
          },
        })
      );
    });
  }

  sendToCurrentTabList(type: ChromeEventType, data: Partial<IBackData>) {
    this._currentTabList.dispatchEvent(
      new CustomEvent(this.eventName, {
        detail: {
          type,
          data,
        },
      })
    );
  }

  sendToSavedTabList(type: UsersEventType, data: Partial<IFrontData>) {
    this._savedTabList.dispatchEvent(
      new CustomEvent(this.eventName, {
        detail: {
          type,
          data,
        },
      })
    );
  }

  sendToMessage(type: MessageEventType, data: Partial<IFrontData>) {
    this._message.dispatchEvent(
      new CustomEvent(this.eventName, {
        detail: {
          type,
          data,
        },
      })
    );
  }

  sendToMain() {
    this._appMain.dispatchEvent(new CustomEvent(this.eventName));
  }
}
