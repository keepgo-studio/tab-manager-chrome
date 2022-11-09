// console.log('worker is on');

import {
  IMatchedInfo,
  IMessageToMain,
  IMessageToWorker,
  MAX_INPUT,
} from './search.shared';

function sendToMain(msg: IMessageToMain) {
  const _msg = msg;

  self.postMessage(_msg);
}

function get100CharsWithHighLight(
  startIndex: number,
  endIndex: number,
  str: string
) {
  const midIndex = (startIndex + endIndex) / 2;

  let char100 = '';
  if (midIndex < 50) {
    char100 = str.slice(0, 100);

    char100 =
      char100.slice(0, startIndex) +
      '<b>' +
      char100.slice(startIndex, endIndex) +
      '</b>' +
      char100.slice(endIndex);
  } else {
    char100 = str.slice(midIndex - 50, midIndex + 50);

    startIndex -= midIndex - 50;
    endIndex -= midIndex - 50;

    char100 =
      char100.slice(midIndex - 50, startIndex) +
      '<b>' +
      char100.slice(startIndex, endIndex) +
      '</b>' +
      char100.slice(endIndex);
  }

  return char100;
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
          titleMatched: '',
          urlMatched: '',
          textContentMatched: '',
        };

        if (titleMatchedIndex !== undefined) {
          result.titleMatched = get100CharsWithHighLight(
            titleMatchedIndex,
            titleMatchedIndex + l,
            tabContent.title
          );
          isMatched = true;
        }

        if (urlMatchedIndex !== undefined) {
          result.urlMatched = get100CharsWithHighLight(
            urlMatchedIndex,
            urlMatchedIndex + l,
            tabContent.url
          );
          isMatched = true;
        }

        if (textContentMatchedIndex !== undefined) {
          result.textContentMatched = get100CharsWithHighLight(
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
      console.log(data.contentMap);
      const matchedList = await search(data.contentMap!, data.input!);
      sendToMain({
        command: 'return search data',
        data: {
          matchedList,
        },
      });
      break;
  }
};
