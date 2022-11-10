// console.log('worker is on');

import {
  IMatchedInfo,
  IMessageToMain,
  IMessageToWorker,
  MAX_INPUT,
  TabContentMap,
} from './search.shared';

function sendToMain(msg: IMessageToMain) {
  const _msg = msg;

  self.postMessage(_msg);
}

const RETURN_CHARS = MAX_INPUT + 10;

function getNCharsWithHighLight(
  N: number,
  startIndex: number,
  endIndex: number,
  str: string
) {
  const halfN = N / 2;

  const midIndex = (startIndex + endIndex) / 2;

  let charN = '';
  if (midIndex < halfN) {
    charN = str.slice(0, N);

    charN =
      charN.slice(0, startIndex) +
      '<b>' +
      charN.slice(startIndex, endIndex) +
      '</b>' +
      charN.slice(endIndex);
  } else {
    charN = str.slice(midIndex - halfN, midIndex + halfN);

    startIndex -= midIndex - halfN;
    endIndex -= midIndex - halfN - 1;

    charN =
      charN.slice(midIndex - halfN, startIndex) +
      '<b>' +
      charN.slice(startIndex, endIndex) +
      '</b>' +
      charN.slice(endIndex);
  }

  return charN;
}

async function search(contentMap: TabContentMap, searchString: string) {
  const regexp = new RegExp(searchString, 'i');

  const l = searchString.length;

  const promises = Object.values(contentMap).map(
    async (tabContent): Promise<IMatchedInfo> =>
      new Promise((resolve) => {
        const titleMatchedIndex = regexp.exec(tabContent.title)?.index;
        const urlMatchedIndex = regexp.exec(tabContent.url)?.index;
        const textContentMatchedIndex = regexp.exec(
          tabContent.textContent
        )?.index;

        let isMatched = false;

        const result: IMatchedInfo = {
          tabId: tabContent.tabId,
          windowId: tabContent.windowId,
          titleMatched: '',
          urlMatched: '',
          textContentMatched: '',
        };

        if (titleMatchedIndex !== undefined) {
          result.titleMatched = getNCharsWithHighLight(
            RETURN_CHARS,
            titleMatchedIndex,
            titleMatchedIndex + l,
            tabContent.title
          );
          isMatched = true;
        }

        if (urlMatchedIndex !== undefined) {
          result.urlMatched = getNCharsWithHighLight(
            RETURN_CHARS,
            urlMatchedIndex,
            urlMatchedIndex + l,
            tabContent.url
          );
          isMatched = true;
        }

        if (textContentMatchedIndex !== undefined) {
          result.textContentMatched = getNCharsWithHighLight(
            RETURN_CHARS,
            textContentMatchedIndex,
            textContentMatchedIndex + l,
            tabContent.textContent
          );
          isMatched = true;
        }

        if (!isMatched) {
          result.tabId = -1;
        }

        resolve(result);
      })
  );

  return (await Promise.all(promises)).filter((result) => result.tabId !== -1);
}

self.onmessage = async (e) => {
  const { command, data } = e.data as IMessageToWorker;

  switch (command) {
    case 'request searching':
      let matchedList:IMatchedInfo[] = [];
      
      if (data.input !== '') {
        matchedList = await search(data.contentMap!, data.input!);
      }

      sendToMain({
        command: 'return search data',
        data: {
          matchedList,
        },
      });
      break;
  }
};
