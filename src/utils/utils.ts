import { LitElement } from 'lit';
import { MessageEventType, UsersEventType } from '../shared/events';

export function isUserDarkMode() {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return true;
  }
  return false;
}

export function setDocumentTitle(t: string) {
  window.document.title = t;
}
export function consoleLitComponent(component: LitElement, ...msg: any[]) {
  console.log(`[${component.tagName}]:`, ...msg);
}

export function moveHistory(path: string) {
  window.history.pushState({}, '', path);
}

export function getPathName() {
  return window.location.pathname.split(/\//)[1];
}

export function getSize(mode: TSizeMode) {
  let diagnol = 0;
  let frontWidth = 0;
  let frontHeight = 0;

  if (mode === 'mini') {
    diagnol = 517.7;
    frontWidth = 367;
    frontHeight = Math.round(
      Math.sqrt(Math.pow(frontWidth, 2) + Math.pow(diagnol, 2))
    );
  } else if (mode === 'tablet') {
    
  } else if (mode === 'side') {
    
  }

  frontWidth += 16;
  return { frontWidth, frontHeight };
}

export function arrayToMap(list: Array<any>): Object {
  return list.reduce((acc:IChromeWindowMapping,curr)=> (acc[curr.id!]=curr,acc), {});
}

export function sendToFront(msg: IFrontMessage<UsersEventType | MessageEventType>) {
  window.dispatchEvent(new CustomEvent(msg.command, { detail: msg }));
}