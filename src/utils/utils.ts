import { LitElement } from "lit";

export function isUserDarkMode() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  return false;
}

export function setDocumentTitle(t: string) {
  window.document.title = t;
}
export function consoleLitComponent(component: LitElement, ...msg:any[] ) {
  console.log(`[${component.tagName}]:`, msg);
}

export function moveHistory(path:string) {
  window.history.pushState({}, '', path);
}

export function getPathName() {
  return window.location.pathname.split(/\//)[1];
}

export function connectToBack(name: string) {
  return chrome.runtime.connect({ name });
}