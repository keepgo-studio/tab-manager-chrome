import './views/navbar/Navbar.styled';
import './views/main/Main.styled';
import './views/tab-list/TabList.styled';

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
      <app-tab-list .mode="normal" slot="current-tab"></app-tab-list>

      <app-tab-list .mode="saved" slot="saved-tab"></app-tab-list>
    </app-main>
    
    <app-search></app-search>

    <app-message></app-message>
  `;

    this.elemMap = {
      navbar: this._main.querySelector('app-navbar')!,
      appMain: this._main.querySelector('app-main')!,
      currentTabList: this._main.querySelector('app-current-tab-list')!,
      savedTabList: this._main.querySelector('app-saved-tab-list')!,
      search: this._main.querySelector('app-search')!,
      message: this._main.querySelector('app-message')!,
    };

    document.body.appendChild(this._main);
  }

  sendTo(
    elem: Element,
    msg: IPortMessage | IFrontMessage
  ) {
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
