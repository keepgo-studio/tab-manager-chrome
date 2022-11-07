type commandTypeWorker = 'fetch text content for all windows' | 'sync content map' | 'input';
type commandTypeMain = 'return fetch data' | 'return search result';

export interface ISearchWorkerMessage {
	command: commandTypeWorker;
	data: Partial<{
		allWindwos: IChromeWindowMapping;
		inputValue: string;
	}>;
}
export interface ISearchMainMessage {
	command: commandTypeMain;
	data: Partial<{
		tabContent: ITabContent;

		matchedInfo: Array<{
			tabId: number;
			titleMatched: string;
			urlMatched: string;
			textContentMatched: string;
		}>
	}>;
}

export function sendToWorker(worker: Worker, msg: ISearchWorkerMessage) {
	worker.postMessage(msg);
}