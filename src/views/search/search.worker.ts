// console.log('worker is on');

import { ISearchMainMessage, ISearchWorkerMessage } from "./search.shared";

let contentMap: IContentMapping = {};

function checkUrlValid(url:string) {
  return /^https?:\/\/*/.test(url);
}

async function fetchTextContent(tab: ChromeTab) {
  if (tab.url === undefined) return undefined;

  if (!checkUrlValid(tab.url)) return undefined;

  let text: string | undefined;

  try {
    text = await fetch(tab.url)
    .then(respond => respond.text())
    .then(html => html);
  } catch (err) {
    console.error(err)
  }

  return text;
}

self.onmessage = async function(e) {
  const { command, data }:ISearchWorkerMessage = e.data;
  
  switch(command) {
    case 'fetch text content for tab':
      const fetchData = await fetchTextContent(data.tab!) || '';

      const msg: ISearchMainMessage = {
        command: 'return fetch data',
        data: { tab: data.tab!, fetchData }
      }

      self.postMessage(msg)
      break;
    case 'sync content map':
      contentMap = data.contentMap!;
      break;
    case 'input':
      break;
  }
}

