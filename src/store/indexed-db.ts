import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface ITabManagerDB extends DBSchema {
  'saved-window': {
    key: number;
    value: CurrentWindow;
  };
}

class DBHandler {
  private _db!: IDBPDatabase<ITabManagerDB>;

  constructor() { }

  async open() {
    this._db = await openDB<ITabManagerDB>('tab-manager-db', 1, {
      upgrade(db) {
        db.createObjectStore('saved-window', { autoIncrement: true });
      },
    })

    console.log('[idb]: db server is open!');
  }

  async loadAllWindows() {
    return await this._db.getAll('saved-window');
  }

  async savingWindow(win: CurrentWindow) {
    const transaction = this._db.transaction('saved-window', 'readwrite');

    transaction.store.put(win, win.id);

    return await transaction.done
      .then(() => {
        console.log('[idb]: saving window complete');
      })
      .catch(err => {
        console.error('[idb]: saving had failed');
        throw err;
      });
  }

  async removingWindow(windowId: number) {
    const transaction = this._db.transaction('saved-window', 'readwrite');

    transaction.store.delete(windowId);

    return transaction.done
      .then(() => {
        console.log('[idb]: saving window complete');
      })
      .catch(err => {
        console.error('[idb]: saving had failed');
        throw err;
      });
  }

  async removingTab(windowId: number, tabId: number) {
    const transaction = this._db.transaction('saved-window', 'readwrite');

    const targetWindow = await transaction.store.get(windowId) as CurrentWindow;

    targetWindow.tabs = targetWindow.tabs.filter(tab => tab.id !== tabId);

    transaction.store.put(targetWindow, windowId);

    return transaction.done
      .then(() => {
        console.log('[idb]: complete removing the specific tab!');
      })
      .catch(err => {
        console.error('[idb]: error while removing the tab');
        throw err;
      });
  }
  close() {
    this._db.close();
  }
}

const db = new DBHandler();

export default db;
