type commandTypeToWorker = 'request searching';
type commandTypeToMain = 'return search data';

export interface ITabContent {
  tabId: number;
  windowId: number;
  title: string;
  url: string;
  textContent: string;
}

export type TabContentMap = { [tabId: number]: ITabContent }

export interface IMessageToWorker {
  command: commandTypeToWorker;
  data: Partial<{
    contentMap: TabContentMap;
    input: string;
  }>;
}

export interface IMatchedInfo {
	tabId: number;
  windowId: number;
	titleMatched: string;
	urlMatched: string;
	textContentMatched: string;
}

export interface IMessageToMain {
  command: commandTypeToMain;
  data: {
    matchedList: Array<IMatchedInfo>;
  };
}

export function sendToWorker(worker: Worker, msg: IMessageToWorker) {
  worker.postMessage(msg);
}

export const MAX_INPUT = 30;