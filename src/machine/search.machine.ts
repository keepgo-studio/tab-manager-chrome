import { createMachine } from "xstate";
import { ISearchWorkerMessage, sendToWorker } from "../views/search/search.shared";

export const searchMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUwEMBOBjAFgOgEsIAbMPABQzAAdMCA7KAYmIHs0IACNY4zgFzQAjWJyysAttVL9IAbQAMAXUShqrWAX4FW9VSAAeiAEwKFeAOwA2AKxXjNgDQgAnibt4bxgL7fnqTFxCEjAmLGICLABrTkjdRRUkEHVNbV19IwQ7AEY8bIcFAGYFG2yLGwsADmznNwRjKys8ysbWtsaLX390bHwiUiYqAEcAVzh+AVZOAHdWDCiwDAT9FK0dPSTM42zcwvKFbK8bSqqATgUrWsRKwrwFHz8QAN68Z9xOCVYIUPDImLj6Mskqs0htQJkcnkCsVSuUqjVXCZsgAWZrtdGdLogehfOD6N59EIUKi0DAMKArDRrdKbRAWCxXeoVO4PbqBQmkPAAJXQEDqaipoIyiGRxgseQs2ROTkRTPF9yxBOCpEpqXWwvqp0Z2SslU82VOhqNxtOlUVPSCBI+uNV1LBhkQVnOeFMhUONlhFWqjOMxluBxNgbNjwJtqFtIQAFoDYzIzY8KazEnk0nkb5fEA */
  createMachine({
  tsTypes: {} as import('./search.machine.typegen').Typegen0,
  schema: {
    events: {} as
      | {
          type: 'request to worker';
          worker: Worker;
          allWindows: IChromeWindowMapping;
        }
      | { type: 'click icon' }
      | { type: 'load all tabs completed' }
  },
  initial: 'idle',
  states: {
    idle: {
      initial: 'Preparing',
      states: {
        Preparing: {
          on: {
            'load all tabs completed': {
              target: 'Ready',
            },
          },
        },
        Ready: {},
      },
      on: {
        'click icon': {
          target: 'Search mode',
        },
        'request to worker': {
          actions: 'request',
        },
      },
    },
    'Search mode': {
      on: {
        'click icon': {
          target: 'idle',
        },
      },
    },
  },
  id: 'Search',
}, {
  actions: {
    'request': (_, event) => {
      const allTabList = Object.values(event.allWindows).map(win => win.tabs);

      allTabList.forEach(tabList => tabList.forEach((tab: ChromeTab) => {
        sendToWorker(event.worker, {
          command: 'fetch text content for tab',
          data: { tab }
        });
      }))
    }
  }
});