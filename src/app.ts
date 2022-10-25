import './views/navbar/Navbar.styled';
import './views/main/Main.styled';
import './views/tab-list-ccontainer/TabListContainer.styled';

import { userSettings } from './store/local-storage';

/**
 * app class is managing routes endpoints and attach components to index.html
 */

export const FRONT_EVENT_NAME = 'from-main';

interface IElemMap {
  navbar: Element;
  appMain: Element;
  currentTabList: Element;
  savedTabList: Element;
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
      <app-tab-list-container mode=${AppMode.NORMAL} slot="current-tab"></app-tab-list-container>

      <app-tab-list-container mode=${AppMode.SAVE} slot="saved-tab"></app-tab-list-container>
    </app-main>
    
    <app-search></app-search>

    <app-message></app-message>
  `;

    this.elemMap = {
      navbar: this._main.querySelector('app-navbar')!,
      appMain: this._main.querySelector('app-main')!,
      currentTabList: this._main.querySelectorAll('app-tab-list-container')![0],
      savedTabList: this._main.querySelectorAll('app-tab-list-container')![1],
      search: this._main.querySelector('app-search')!,
      message: this._main.querySelector('app-message')!,
    };

    document.body.appendChild(this._main);
  }

  sendTo(elem: Element, msg: IPortMessage<AppEventType> | IPortMessage<ChromeEventType> | IFrontMessage) {
    elem.dispatchEvent(
      new CustomEvent(FRONT_EVENT_NAME, {
        detail: msg,
      })
    );
  }

  closeApp() {
    window.close();
  }

  resizeApp(width: number, height: number) {
    window.resizeTo(width, height);
  }
}
