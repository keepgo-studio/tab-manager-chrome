import { createMachine, spawn } from 'xstate';
import { send } from 'xstate/lib/actions';
import db from '../store/indexed-db';
import { arrayToMap } from '../utils/utils';

const dbMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQEYDoAyB7AhhAlgHZQDEEWhYaRAblgNZVERgAekAtKgNoAMAuolAAHLLHwAXfBSEhWiABwAmBWgCcvAGxKALAEYFAVl4KFOgOwAaEAE9ESzQGY0Cx45289vb0seGdAL4B1qiYuATEJGAATtFY0WjCADY4EgBm8QC21IQs7BBcKHyCSCCi4lIypfIIyqoa2vpGJmZWtvZeaMY+anpOeuamSkEh6ADKEjjREmQUTIR0jGihE1MSCLRYAMap0oTFxbLlknuyNe7maA6GmvpK5jqGSrxK1nYIen5o3t7mDwqeQxqBQjEArSbTKKxeKJFLpLLLcYQ9abHaVfYCQ6lY7os6IC5XTQ3O4PJ4vN6KZw-Xg6bQ02nmNRqUGoEgAJTAAEcAK5wCRYkRiE5VUA1HSvdoIBw6NCaOXmLS8RzAzwslAkADywjAGJKgoqp2qiHFFI+zzQfU05me5iBmgUtsCoMIWBY8FKoWweCIUCOQtxRoQTxlvh0fg8yo0ejUpqUSkMsvln0Mjj6NzVaDG3K2Wzg7v1wsIeI+Lxlty0DncNLUjNjThcbmVfj8rXcGYAYjh8ElIH6DSK5IgvLpZR5tE4PDoazHJc8lA23BY3J9GY5zBnVtM+4Xi31nM9U-GVHSiY5TWpNBb5YY9LeHtG1IY1duA6LEBxNKaOAmmb+-3+FE0IIgiAA */
  createMachine(
    {
  tsTypes: {} as import('./saved-tab-list.machine.typegen').Typegen0,
  schema: {
    services: {} as {
      'transaction idb': { data: CurrentWindowMapping };
      'open idb': { data: void };
    },
    events: {} as
      | {
          type: 'Request' | 'xstate.init';
          command: UsersEventType | undefined;
          data: IFrontData;
        }
      | { type: 'Open' },
  },
  type: 'parallel',
  on: {
    Request: {
      target: '.Loading',
    },
    Open: {
      target: '.Start',
    },
  },
  states: {
    Loading: {
      invoke: {
        src: 'transaction idb',
        id: 'indexed-db',
        onDone: [
          {
            target: 'Success',
          },
        ],
        onError: [
          {
            target: 'Failed',
          },
        ],
      },
    },
    Success: {
      type: 'final',
    },
    Failed: {
      type: 'final',
    },
    Start: {
      invoke: {
        src: 'open idb',
        onDone: [
          {
            target: 'Loading',
          },
        ],
        onError: [
          {
            target: 'Failed',
          },
        ],
      },
      type: 'final',
    },
  },
  id: 'db',
},
    {
      services: {
        'open idb': async () => {
          await db.open();
        },

        'transaction idb': async (_, event) => {
          if (event.type === 'Request') {
            if (event.command === UsersEventType.SAVE_WINDOW) {
              const win = event.data.win as CurrentWindow;
  
              if (win === undefined || win.id === undefined) return {};
  
              await db.savingWindow(win);
            } else if (event.command === UsersEventType.DELETE_SAVED_WINDOW) {
              const { windowId } = event.data;
  
              await db.removingWindow(windowId);
            }
          }

          const allTabList = await db.loadAllWindows();

          if (allTabList !== undefined) {
            return arrayToMap(allTabList) as CurrentWindowMapping;
          }

          return {};
        },
      },
    }
  );

export const savedTabListMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUCGA3SACALqgRlgDYCWsOAdCREWAMQBKYAjgK5w5YSp4DaADAF1EoAA4B7WCRwlxAOxEgAHogCMAZlUUAHADYA7Ku36ArABoQAT0QAmYxX7b1zl6-UBfdxbSYIuAsRklNS0dADCRJJgWKiiogLCSCASUjLyiioIqiYALBbWCDb8ORQmnt4Y2HiEpORUNPQA8qJgclyEsGAATphdCYop0rIKSZkAtOompbo25laI6to2OqblID5VAbWUACIAQnQQ8mBUcujiANYnEPhjALaoAMYAFiRyYP1Jg2kjoJkmNn0FAAnPwZtp+CZVKZ9NpVPkFpMKG4Uc41hs-NVAnV9nRul1xF0KKIiDwAGaEu4UG73J6vd6fMSSIbpUaIAFA0HgyHQkyw+HzQpOZGotzoyqYrZBCjIZ7iADuWDucFgqBgdEZyWZPwyiBmwIc-JMxt5-IRCCcni8IDk4ggcEUGP8NWlITAA21w11CByNnNwOWs3Fvmd2N2ew9qS9bIQ6n4BsmwJykKhMLh5psuimZWtTqx2xlcsVytgqpgkZZv2UiH0gJBumMENTfPTgrsuhFopcwc2LrqABVunc3jx3V9Pay-gt48iTEmU6bWwUiiUcxUQ-mghWdTGxsKTDM5gUxrore4gA */
  createMachine(
    {
      context: {
        msgStatus: MessageEventType.FAILED,
        data: {},
      },
      tsTypes: {} as import('./saved-tab-list.machine.typegen').Typegen1,
      schema: {
        context: {} as {
          msgStatus: MessageEventType;
          data: CurrentWindowMapping;
        },

        events: {} as
          | { type: 'Close app' }
          | { type: 'Request data'; command: UsersEventType | undefined }
          | { type: 'Open db server' },
      },
      initial: 'idle',
      states: {
        idle: {
          on: {
            'Request data': {
              target: 'DB',
              actions: 'send command',
            },
            'Close app': {
              target: 'Terminate',
            },
            'Open db server': {
              target: 'DB',
              actions: 'send open command',
            },
          },
        },
        DB: {
          invoke: {
            src: dbMachine,
            id: 'db-machine',
            onDone: [
              {
                target: 'Show message',
                actions: 'Receive data',
              },
            ],
            onError: [
              {
                target: 'Show message',
              },
            ],
          },
        },
        'Show message': {
          entry: 'send message status',
          always: {
            target: 'idle',
          },
        },
        Terminate: {
          type: 'final',
        },
      },
      id: 'Saved tab list',
    },
    {
      actions: {
        'send open command': send({ type: 'Open' }, { to: 'db-machine' }),
        'send command': send(
          (_, event) => ({ type: 'Request', command: event.command }),
          { to: 'db-machine' }
        ),
        'Receive data': (context, event) =>  {
          console.log(context, event);
        },
        'send message status': () => () => {}
      },
    }
  );
