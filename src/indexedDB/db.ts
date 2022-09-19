import { openDB, DBSchema } from "idb";

interface TabManagerDB extends DBSchema {
    'saved-window': {
      key: string;
      value: number;
    };
}

class DBHandler {

    constructor() {

    }
    
    async open() {
        const db = await openDB<TabManagerDB>('tab-manager-db', 1, {
            upgrade(db) {
            db.createObjectStore('saved-window');
            },
        });
    }
}
