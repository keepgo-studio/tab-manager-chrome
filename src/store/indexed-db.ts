import { openDB, DBSchema, IDBPDatabase } from "idb";

interface TabManagerDB extends DBSchema {
    'saved-window': {
      key: number;
      value: CurrentWindow;
    };
}

class DBHandler {

    private _db!: IDBPDatabase<TabManagerDB>;

    constructor() {}

    async open() {
        return this._db = await openDB<TabManagerDB>('tab-manager-db', 1, {
            upgrade(db) {
                db.createObjectStore('saved-window', { autoIncrement: true });
            },
        });
    }

    async loadAllWindows() {
        return await this._db.getAll('saved-window');
    }

    async savingWindow(win: CurrentWindow) {
        const transaction = this._db.transaction('saved-window', 'readwrite');

        transaction.store.put(win, win.id);

        transaction.done
        	.then(() => {
						console.log('[idb]: saving window complete')
					})
					.catch(() => {
						console.error('[idb]: saving had failed')
					});
    }

		async removingWindow(windowId: number) {
			const transaction = this._db.transaction('saved-window', 'readwrite');

			transaction.store.delete(windowId);

			transaction.done
				.then(() => {
					console.log('[idb]: saving window complete')
				})
				.catch(() => {
					console.error('[idb]: saving had failed')
				});
		}
    close() {
        this._db.close();
    }
}

const db = new DBHandler();

export default db;