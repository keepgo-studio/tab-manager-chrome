import { ActorRef, assign, createMachine, interpret, SendAction, spawn } from 'xstate';
import { error, send, sendParent } from 'xstate/lib/actions';
import db from '../store/indexed-db';
import { arrayToMap } from '../utils/utils';
import { messageMachine } from './message.machine';

export type DBGuards = UsersEventType | 'get all data';

const dbMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQEYDoDyA7ANgSyzDVgEMA3MAAgHcCIB7agYgcLQLPoGsjVNcCRUhRp1GCDvQDGJAC556WANoAGALqq1iUAAd6sPPMXaQAD0QBGFQA4LaawBYAzADZr1gJwuHjp9YA0IACeiABMAOyhaE4xsXGx4QC+iYF82PhswlS0WAzMYABOBfQFaDo4cgBmJQC2aGkCmeTZYtQSWJwyRsrqmiZ6Bt0m5ggWVna+bp7evgHBiA6h1tHxq05JKSANGbxgOGCyVFkQormMLIpEkjz16OmC9XsHR80nOXntnXIKPRrq-fpDD9hpYbBNnFMvD5nHMQggnKEHCs1nENqk7o1dvtDpRjqc8kxCsVSuUqrVbvwdo9sS8KG9Wp9pN9FJo+kgQAMgcZ2SMxmN7BD3FDZoE4T4VMiUTE0VsMVSYLJKCQcDhca98YxYBc2NdeHKHgqlSq1XSNdRYIyuj9Wf92ZyhjzQR5wa4hTMYaLEOsXJKpTLtgaDkbVXj3prCUUSmUKrJqgU6gG2IblSH1WHzZbmb82bpAQ7QLy+QLXdNoX5PQgAKwI31rBzJdGUh54CD7JgAJQAogBFACqnYAygAVHMcvPAx0IBwWZYWBwqFyhSsV0IeawN2VNnWtsAdnv94dKCxaO3j7kFhYztBzhdLiuVucbxNXHd7vuDkehE+5wYTi9Tq8b0XZd5inBcn3QAcAFcpCkOAtVHe0-zMMJwh9IC71A6wnAgtBO0jAomEQs8sBBBAInQ+dgIrKZcIwSpKh2JgMAABU7AA5Yjf3PFDRgcJFbxAuFEWWJdkk2LB6AgOATGfYhmjNAFuNIydwk8aJrBUUIbDWFdwiRSs6MxalnhNSBFNPZSyPCStKzQSsHDcGyKz8KJDM2OTk2NUNWngSyuRU-8bKRRYZ2c0CHA8CV3Mbe5t32JSArIpx+QwoSvRseyjJ2RL8140IXCca8qMwuEZzsmLN2g2D4Ny5DeScStlnWSK-GFD1QIicJazWf10Hw4k6p4hrbDQFQLFswr2vLCLNJ61Y+swBicv8vKRkWPTQggobAt4gBaFwKwO8TEiAA */
  createMachine(
    {
  tsTypes: {} as import('./saved-tab-list.machine.typegen').Typegen0,
  schema: {
    services: {} as {
      'open idb': { data: void };
      'save window': { data: void };
      'delete saved window': { data: void };
      'get all saved windows': { data: CurrentWindowMapping };
    },
    events: {} as
      | { type: 'OPEN' }
      | {
          type: 'REQUEST';
          command: DBGuards;
          data: Partial<IFrontData>;
        },
  },
  initial: 'Offline',
  states: {
    Online: {
      initial: 'idle',
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
        idle: {
          on: {
            REQUEST: [
              {
                target: 'save window',
                cond: 'save window',
              },
              {
                target: 'get all saved windows',
                cond: 'get all saved windows',
              },
              {
                target: 'delete saved window',
                cond: 'delete saved windows',
              },
            ],
          },
        },
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
        OPEN: {
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
        'open idb': async () => {
          console.log('idb server open');
          
          await db.open();

          sendParent('REMOTE.OPEN');
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
  /** @xstate-layout N4IgpgJg5mDOIC5QGUCGA3SACALqgRlgDYCWsOAdCREWAMQAyA8gMICCDFTACgKIByAbQAMAXUSgADgHtYJHCWkA7CSAAeiAKwAWAIwUA7MIDMugEyaANCACeiAGzCzFAJxuX9l9oAcZ7Wd0XAF8g6zRMCFwCYjJKFmUlMABjHGwcaSwIfDoAJV4AWSYAFV4KPJZeAEkANV4RcSQQGTkFZVUNBE0jCk1vTRdjAytbREHvCm13Tx8-AODQkHC06NJyCnilRJS0jKzGVg4y3gBFAFVeZCL61Wb5RRVGjs1zCj7dfuNhXSGDb11rOwIMwGFyuKZeXz+QIhMIYZaEVZxBLJVKRdKZbLMdicPJnC5XXQNKSyO5tR6IbQGbSubzaQbDQG6P49GGLOFolaxdbI7Zo3aYg44k7nS6CMxEpok1oPUAdSmaV50oYAxDeYyspYchFcjZbVG4fl0AC2cFgqCgJCUUGujVu0vaiDMfkMJnMDNGfQm4JmUO8GvZUW1a2QYCUfKwJtgZpgdBtxJa9wdQOdRlMFhVCB8xjBbmmkICftZSmkEDgqk1gZia2otBuUsT5IQxn8LrT7oQ9l0wkMkw8ENm0IWFbwQaRmxROwxdYTZNlWiGEzMHm8ypGmeZ7j7Prm-oilcRFBDYYNEdN5rA09JMvUFLMGcp9gounsL+Mncmwm8tM0u-hVZwl72o2AC09gZsBCqbn8lIrs+xhOiEIRAA */
  createMachine(
    {
  context: {
    msgStatus: MessageEventType.FAILED,
    data: {},
    dbRef: null,
    msgRef: null,
  },
  tsTypes: {} as import('./saved-tab-list.machine.typegen').Typegen1,
  schema: {
    context: {} as {
      msgStatus: MessageEventType;
      data: CurrentWindowMapping;
      dbRef: any;
      msgRef: any;
    },

    events: {} as
      | { type: 'LOCAL.OPEN' }
      | { type: 'REMOTE.OPEN' }
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

    actions: {} as 
    | { type: 'set' }
    | { type: 'request open db' }
    | { type: 'receive data' }
    | { type: 'request db with data' }
    | { type: 'send to message machine' }
  },
  initial: 'idle',
  states: {
    idle: {
      entry: 'set',
      on: {
        'LOCAL.OPEN': {
          target: 'idle',
          actions: 'request open db',
        },
        'REMOTE.OPEN': {
          target: 'Connected to db'
        }
      },
    },
    'Connected to db': {
      on: {
        'REMOTE.RECEIVE': {
          actions: 'receive data',
        },
        'LOCAL.REQUEST': {
          actions: 'request db with data',
        },
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

        'set': assign({
          dbRef: () => spawn(dbMachine, 'db-machine'),
          msgRef: () => spawn(messageMachine, 'message-machine')
        }),

        'request open db': send(
          { type: 'OPEN' },
          { to: (context) => context.dbRef! }
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
    }
  );
