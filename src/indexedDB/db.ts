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
        this._db.add('saved-window', win);
    }

    close() {
        this._db.close();
    }
}

const db = new DBHandler;

export default db;