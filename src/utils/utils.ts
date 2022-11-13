import { LitElement } from 'lit';
import { MessageEventType, UsersEventType } from '@src/shared/events';

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

export function arrayToMap(list: Array<any>): Object {
  return list.reduce(
    (acc: IChromeWindowMapping, curr) => ((acc[curr.id!] = curr), acc),
    {}
  );
}

export function sendToFront(
  msg: IFrontMessage<UsersEventType | MessageEventType>
) {
  window.dispatchEvent(new CustomEvent(msg.command, { detail: msg }));
}

export function checkUrlValid(url: string) {
  return /^https?:\/\/*/.test(url);
}

export async function fetchTextContent(tab: ChromeTab) {
  if (tab.url === undefined) return undefined;

  let text: string | undefined;

  try {
    text = await fetch(tab.url, {
      method: 'GET',
      headers: { 
        Accept: 'text/html',
        'User-agent': 'Mozilla/5.0'
      },
    })
      .then((respond) => respond.text())
      .then((html) => html);
  } catch (err) {
    console.error(err);
  }

  return text;
}

export function extractTextContentFromHtml(htmlStr: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlStr, 'text/html');

  // remove all unnecessary tags
  doc.querySelectorAll('style').forEach((e) => e.remove());
  doc.querySelectorAll('script').forEach((e) => e.remove());

  // remove all unnecessary spaces
  return doc.body.textContent?.replace(/[\n\r]+|[\s]{2,}/g, ' ') || '';
}
