type commandTypeToWorker = 'request searching';
type commandTypeToMain = 'return search data';

export interface IMessageToWorker {
  command: commandTypeToWorker;
  data: Partial<{
    contentMap: TabContentMap;
    input: string;
  }>;
}

export interface IMatchedInfo {
	tabId: number;
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