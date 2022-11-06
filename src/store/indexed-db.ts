import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface ITabManagerDB extends DBSchema {
  'saved-window': {
    key: number;
    value: ChromeWindow;
  };

  'content-map': {
    key: number;
    value: IContent
  }
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

  async savingWindow(win: ChromeWindow) {
    const transaction = this._db.transaction('saved-window', 'readwrite');

    transaction.store.put(win, win.id);

    return await transaction.done
      .then(() => {
        console.log('[idb]: saving window complete');
      })
      .catch(err => {
        console.error('[idb]: saving window had failed');
        throw err;
      });
  }

  async removingWindow(windowId: number) {
    const transaction = this._db.transaction('saved-window', 'readwrite');

    transaction.store.delete(windowId);

    return transaction.done
      .then(() => {
        console.log('[idb]: removing window complete');
      })
      .catch(err => {
        console.error('[idb]: removing window had failed');
        throw err;
      });
  }

  async removingTab(windowId: number, tabId: number) {
    const transaction = this._db.transaction('saved-window', 'readwrite');

    const targetWindow = await transaction.store.get(windowId);

    if (targetWindow === undefined) {
      console.error('there no such window is in idb')
      return;
    }
    targetWindow.tabs = targetWindow.tabs!.filter(tab => tab.id !== tabId);

    transaction.store.put(targetWindow, windowId);

    return transaction.done
      .then(() => {
        console.log('[idb]: complete removing the specific tab!');
      })
      .catch(err => {
        console.error('[idb]: error while removing the tab', err);
      });
  }
  
  async loadAllContents() {
    return await this._db.getAll('content-map');
  }

  async savingContent(windowId: number, content: IContent) {
    const transaction = this._db.transaction('content-map', 'readwrite');

    transaction.store.put(content, windowId);

    return await transaction.done
      .then(() => {
        console.log('[idb]: saving content complete');
      })
      .catch(err => {
        console.error('[idb]: saving content had failed');
        throw err;
      });
  }

  async removingContent(windowId: number) {
    const transaction = this._db.transaction('content-map', 'readwrite');

    transaction.store.delete(windowId);

    return transaction.done
      .then(() => {
        console.log('[idb]: saving content complete');
      })
      .catch(err => {
        console.error('[idb]: removing content had failed');
        throw err;
      });
  }

  close() {
    this._db.close();
  }
}

const db = new DBHandler();

export default db;
