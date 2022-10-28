import { ActorRef, assign, createMachine, interpret, SendAction, spawn } from 'xstate';
import { error, send, sendParent } from 'xstate/lib/actions';
import db from '../store/indexed-db';
import { arrayToMap } from '../utils/utils';
import { messageMachine } from './message.machine';

export type DBGuards = UsersEventType | 'get all data';

export const dbMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQEYDoDyA7ANgSyzDVgEMA3MAAgHcCIB7agYgcLQLPoGsjVNcCRUhRp1GCDvQDGJAC556WANoAGALqq1iUAAd6sPPMXaQAD0QBOAOwAWNAA4bAZnsqAjCos37ANhU+AGhAAT0QnACY3NCcYp1twpx8AVnCbNySAXwygvmx8NmEqWiwGZjAAJ3L6crQdHDkAM2qAWzRcgQLyIrFqCSxOGSNldU0TPQMhk3MECy8HZ1cPL19-INCEGysraJi0lySfJzT7TOyQdvzeMBwwWSpCiFESxhZFIkkeNvQ8wTbr2-uXUexVKfQGcgUww06jG+kMkKmlls8xc7k83j8gRCYSsTh2MXstmcbicKhUpxy3w6Vxud0oDyepSYFSqNTqjRaX34lz+tMBFGBPTB0ghik0oyQIHG8OMkumHhUdkcqKWGNW2IQKQs+Js4Ss-nCXi2WUp3N+MFklBIOBw9KBjMYsFebA+vCpPItVptdoFDuosGFg0h4phkulkzllkcKMW6JWWPWuqSOrJPhs1icSQsFPO7vNty9toZIMdzMq1Vq9VkTXKrQu+ct1qL9pL-sDoqhEt0cIjoHlZKVCzRy0xa0QSXsUViNhsKnCPmzSScFhNubNhCYACUAKIARQAqtuAMoAFS7Up7CMjCCcbiiblnfgs9kJ6QnSTHN5sPjQs1m9gsNxXAsCJwlXesNx3A9jzPNwtDDS9ZT7MI7zQB9-E8F8rDfE5PwOPEyVTQlfEiCJwLzSC90PU8lHCeDuwmK9kJvVD0KfLCcI-DUbCSZNCMVHwAP1E5yLQI8AFcpCkOAnXPcMmLMRA9R-NjMNfXjcI1ewCMItxsLcI1MysUTt3LcomDkxCsERBBlLQx81OwjSuPWXFtn4nwgL0+d01EjAGgaS4mHoHQwChWFGKQxSEAfOwDXTXwDk2HwEyUiwf3CJJCIOYijgSUTCGoelZDkKg3CYAAqSzIus68AFo73sT9CT47KF3wixDSyM4sHoCA4BMCChC6P0IplWrmME8JolcBIDO8vwXLCBI0HTWYUs6zyJ3sPzqV5AEfUgUaEJqmy03sNAkm-CxPCylKnM-YlLsI1I0zmtwfF2j0CybQ7BWef0xt7aK022XUgN8NNPBUKwmo1JdtSysl7ASCdvxnL7BCBhTpnnPFVOfdT30-ICfzW6wDMyrZGtEiSpJk7GovlTKpysLLeKc+dAM-CIf1iFxwncW8eMzEyzMZiborcPU4vSQTeasZJeLww18WXG7paujGzlyALLglmzdR5wW0H4zKySsbMFwKsAitgEq6TcA3ryNrTcVNwjsMOTMszAnWUGd5iGpSz86uTP9n2plRtMcTLuoyIA */
  createMachine(
    {
  tsTypes: {} as import("./saved-tab-list.machine.typegen").Typegen0,
  schema: {
    services: {} as {
      'open idb': { data: void };
      'save window': { data: void };
      'delete saved window': { data: void };
      'get all saved windows': { data: CurrentWindowMapping };
    },
    events: {} as
      | { type: 'open' }
      | {
          type: 'REQUEST';
          command: DBGuards;
          data: Partial<IFrontData>;
        },
  },
  initial: 'Offline',
  entry: () => console.log('entered in db'),
  states: {
    Online: {
      entry: () => console.log('db is online'),
      type: 'parallel',
      states: {
        'save window': {
          invoke: {
            src: 'save window',
            onDone: [
              {
                target: '#db.Success',
              },
            ],
            onError: [
              {
                target: '#db.Error',
              },
            ],
          },
        },
        'delete saved window': {
          invoke: {
            src: 'delete saved window',
            onDone: [
              {
                target: '#db.Success',
              },
            ],
            onError: [
              {
                target: '#db.Error',
              },
            ],
          },
        },
        'get all saved windows': {
          invoke: {
            src: 'get all saved windows',
            onDone: [
              {
                target: '#db.Success',
              },
            ],
            onError: [
              {
                target: '#db.Error',
              },
            ],
          },
        },
      },
      on: {
        REQUEST: [
          {
            target: '.save window',
            cond: 'save window',
          },
          {
            target: '.get all saved windows',
            cond: 'get all saved windows',
          },
          {
            target: '.delete saved window',
            cond: 'delete saved windows',
          },
        ],
      },
    },
    Success: {
      entry: ['send to parent', 'send status'],
      always: {
        target: 'Online',
      },
    },
    Error: {
      entry: ['send to parent', 'send status'],
      always: {
        target: 'Online',
      },
    },
    Offline: {
      on: {
        open: {
          target: 'Online',
          actions: 'open idb',
        },
      },
    },
  },
  id: 'db',
},
    {
      services: {
        'save window': async (_, event) => {
          if (event.type === 'REQUEST') {
            const win = event.data.win as CurrentWindow;

            db.savingWindow(win);
          }
        },

        'delete saved window': async (_, event) => {
          if (event.type === 'REQUEST') {
            const { windowId } = event.data;

            await db.removingWindow(windowId!);
          }
        },

        'get all saved windows': async () => {
          const allTabList = await db.loadAllWindows();

          if (allTabList !== undefined) {
            return {
              data: arrayToMap(allTabList) as CurrentWindowMapping
            };
          }

          return {};
        },
      },

      guards: {
        'delete saved windows': (_, event) =>
          event.command === UsersEventType.DELETE_SAVED_WINDOW,
        'get all saved windows': (_, event) => event.command === 'get all data',
        'save window': (_, event) =>
          event.command === UsersEventType.SAVE_WINDOW,
      },

      actions: {
        'open idb': () => {
          console.log('idb server open');
          
          db.open();

          sendParent('REMOTE.RECEIVE');
        },

        'send to parent': (_, event) => {
          let data = undefined;

          const respond: {
            type: string;
            data?: CurrentWindowMapping;
          } = {
            type: 'REMOTE.RECEIVE',
            data,
          };

          if (
            event.type ===
            'done.invoke.db.Online.get all saved windows:invocation[0]'
          ) {
            respond.data = event.data;
          }

          sendParent(respond);
        },

        'send status': (_, event) => {
          if (/error/.test(event.type)) {
            sendParent({ type: 'messaging', status: MessageEventType.FAILED });
          } else {
            sendParent({ type: 'messaging', status: MessageEventType.SUCCESS });
          }
        },
      },
    }
  );

export const savedTabListMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUCGA3SACALqgRlgDYCWsOAdCREWAMQAyA8gMICCDFTACgKIByAbQAMAXUSgADgHtYJHCWkA7CSAAeiAKwAWAIwUA7MIDMugEyaANCACeiAGzCzFAJxuX9l9oAcZ7Wd0XAF8g6zRMCFwCYjJKFmUlMABjHGwcaSwIfDoAJV4AWSYAFV4KPJZeAEkANV4RcSQQGTkFZVUNBE0jCk1vTRdjAytbREHvCm13Tx8-AODQkHC06NJyCnilRJS0jKzGVg4y3gBFAFVeZCL61Wb5RRVGjs1zCj7dfuNhXSGDb11rOwIMwGFyuKZeXz+QIhMIYZaEVZxBLJVKRdKZbLMdicPJnC5XXQNKSyO5tR6IbQGbSubzaQbDQG6P49GGLOFolaxdbI7Zo3aYg44k7nS6CMxEpok1oPUAdSmaV50oYAxDeYyspYchFcjZbVG4fl0AC2cFgqCgJCUUGujVu0vaiDMfkMJnMDNGfQm4JmUO8GvZUW1a2QYCUfKwJtgZpgdBtxJa9wdQOdRlMFhVCB8xjBbmmkICftZSmkEDgqk1gZia2otBuUsT5IQxn8LrT7oQ9l0wkMkw8ENm0IWFbwQaRmxROwxdYTZNlWiGEzMHm8ypGmeZ7j7Prm-oilcRFBDYYNEdN5rA09JMvUFLMGcp9gounsL+Mncmwm8tM0u-hVZwl72o2AC09gZqBIQhEAA */
  createMachine(
    {
  context: {
    msgStatus: MessageEventType.FAILED,
    data: {},
    dbRef: null,
    msgRef: spawn(messageMachine, 'message-machine'),
  },
  tsTypes: {} as import("./saved-tab-list.machine.typegen").Typegen1,
  schema: {
    context: {} as {
      msgStatus: MessageEventType;
      data: CurrentWindowMapping;
      dbRef: any;
      msgRef: any;
    },

    events: {} as
      | { type: 'LOCAL.OPEN' }
      | {
          type: 'REMOTE.RECEIVE';
          data?: CurrentWindowMapping;
        }
      | {
          type: 'LOCAL.REQUEST';
          command: DBGuards;
          data: Partial<IFrontData>;
        }
      | { type: 'messaging'; status: MessageEventType },
  },
  initial: 'idle',
  states: {
    idle: {
      entry: [
        assign({
          dbRef: () => {
            const s = spawn(dbMachine, 'db-machine')
            console.log(s)

            return s;
          }
        })
      ],
      on: {
        'LOCAL.OPEN': {
          target: 'Connected to db',
          actions: 'request open db',
        },
      },
    },
    'Connected to db': {
      on: {
        'REMOTE.RECEIVE': {
          actions: 'receive data',
        },
        'LOCAL.REQUEST': [
          {
            cond: 'save window',
            actions: 'request db with data',
          },
          {
            cond: 'delete saved window',
            actions: 'request db with data',
          },
          {
            cond: 'get all saved window',
            actions: 'request db with data',
          },
        ],
        messaging: {
          target: 'Send to message',
          actions: 'send to message machine',
        },
      },
    },
    'Send to message': {
      always: {
        target: 'Connected to db',
      },
    },
  },
  id: 'Saved tab list',
},
    {
      actions: {

        'request open db': send(
          { type: 'open' },
          { to: (context) => context.dbRef!}
        ),

        'receive data': (context, event) => {
          if (event.data !== undefined) {
            context.data = event.data;
          }
        },

        'request db with data': send(
          (_, event) => ({
            type: 'REQUEST',
            command: event.command,
            data: event.data,
          }),
          { to: (context) => context.dbRef! }
        ),

        'send to message machine': send(
          (_, event) => ({
            type: 'Showing message',
            status: event.status,
          }),
          { to: (context) => context.msgRef }
        ),
      },
      guards: {
        'delete saved window': (_, event) =>
          event.command === UsersEventType.DELETE_SAVED_WINDOW,
        'get all saved window': (_, event) => event.command === 'get all data',
        'save window': (_, event) =>
          event.command === UsersEventType.SAVE_WINDOW,
      },
    }
  );
