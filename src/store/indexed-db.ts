import { openDB, DBSchema, IDBPDatabase } from 'idb';

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
    return (this._db = await openDB<TabManagerDB>('tab-manager-db', 1, {
      upgrade(db) {
        db.createObjectStore('saved-window', { autoIncrement: true });
      },
    }));
  }

  async loadAllWindows() {
    return await this._db.getAll('saved-window');
  }

  async savingWindow(win: CurrentWindow): Promise<boolean> {
    const transaction = this._db.transaction('saved-window', 'readwrite');

    transaction.store.put(win, win.id);

    return await transaction.done
      .then(() => {
        console.log('[idb]: saving window complete');
        return true;
      })
      .catch(() => {
        console.error('[idb]: saving had failed');
        return false;
      });
  }

  async removingWindow(windowId: number): Promise<boolean> {
    const transaction = this._db.transaction('saved-window', 'readwrite');

    transaction.store.delete(windowId);

    return transaction.done
      .then(() => {
        console.log('[idb]: saving window complete');
        return true;
      })
      .catch(() => {
        console.error('[idb]: saving had failed');
        return false;
      });
  }
  close() {
    this._db.close();
  }
}

const db = new DBHandler();

export default db;
