type commandTypeWorker = 'fetch text content for tab' | 'sync content map' | 'input';
type commandTypeMain = 'return fetch data' | 'return search result';

export interface ISearchWorkerMessage {
	command: commandTypeWorker;
	data: Partial<{
		tab: ChromeTab;
		contentMap: IContentMapping;
		inputValue: string;
	}>;
}
export interface ISearchMainMessage {
	command: commandTypeMain;
	data: Partial<{
		tab: ChromeTab,
		fetchData: string,
		matchedInfo: Array<{
			titleMatched: string,
			urlMatched: string,
			textContentMatched: string
		}>
	}>;
}

export function sendToWorker(worker: Worker, msg: ISearchWorkerMessage) {
	worker.postMessage(msg);
}