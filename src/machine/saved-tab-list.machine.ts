import {
  assign,
  createMachine,
  spawn,
} from 'xstate';
import { send, sendParent } from 'xstate/lib/actions';
import { MessageEventType, UsersEventType } from '@src/shared/events';
import db from '@src/store/indexed-db';
import { arrayToMap } from '@src/utils/utils';
import { messageMachine } from './message.machine';

export type DBGuards = UsersEventType | 'get all data';

const dbMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQEYDoDyA7ANgSyzDVgEMA3MAAgHcCIB7agYgcLQLPoGsjVNcCRUhRp1GCDvQDGJAC556WANoAGALqq1iUAAd6sPPMXaQAD0QBGAKwqVaAMxWAnPYsAOewCYVbgCwuAGhAAT0QANjDfNA97X0iAdj8nb18AX1Sgvmx8NmEqWiwGZjAAJxL6ErQdHDkAMwqAWzQsgVzyfLFqCSxOGSNldU0TPQN+k3MEC183O0cXdy8ff3sg0IRfK09o+x34n08XK0irdMz0bMFmsBwwWSo8iFFCxhZFIkkeZvPW3mvb+-ajwKRW6vTkCgGGnUw30hgh40sVgss2crg83iSKxCiHiFjC21i1is6LC8VOIBaOV+NzulAeTyKTFK5Uq1TqjS+-CpVxpAIoQM6oOk4MUmiGSBAIzhxglEymMwcqIWGOWq0QNjcBN8eM8pN8nj8JwyFO+3JgskoJBwODpgIZjFgrzYH14psu5st1tt-Pt1FgQr6ELF0IlUrGssR3kV83RS0C2IQ8TCmpi9gi9jceIsGfJlPdt09NvpwIdTLKFSqNVk9RKTTzbA9VqLdpLfoDIsh4t0sPDoDl0xRMcWmLVCCOdhivl8tjcSOTblzbudEBuTAASgBRACKAFUNwBlAAqXclPfhEcTTnxYSOnhs9ivSPiWLWcXiaBsM88z7cbicU0XLlLjwFcwHXbc9yPJQLC0UMzxlPscSvNAbzCO8VAfG8LGfUdk3sD9bBUbV-EzNCLEAi5l1XTddwPY9PFg7tRnPRDL2vW970fbCX3VeIrAI2wyPcTZkwon52FA8DaKg+xGNPZiELMJD2LQzisJwhN4n-ASVDCB9cWRJwxO5CA-lpelZBIFAnXeHpuFdIC2FM3lvUgShLJQdt+mDOSwxYpTJk2Qc0WHVUEzcKNUycFQLCcQ59WMy5nP+VzHg8ssWUrdla05SjqRSiyrK8oNBhDJjpSwBFJn8YLlTjHiEDCCwtknPTooOFRkkA-cAFcpCkOBHRPPzFImSIolQzxtRUKw9j0txR0fASLGRLwIpmtJjT4DdyxKJhhvgyqL3GlDb2m2bdIzUcUh09xdPibxiXIrbzlqWoqSYDAAAUNwAOQOhSjtYqYol0u88X-PinA8eJR31fEdl2GwrA2P9NrONB90skpZBs9g7M+PgsZIHHitFUrfMOqqNgsD80Jq0l7Aw5w4e1NBCJmm8H3seI5u67HceZCs2WrDkiYFsnOzK+SKuppE6am6LGeZpxRw8dmOaa4kdisJF0mNLB6FM+AJXrIR2l9GFAaqlbSWiJxtZcKbtT8VnQcI1wXFne8wkSpyzL5NzWyt2WLxW2J2fp5ZHBRpxfFHXWtg5vwka0+w-aIRsvWLToTfK3sAvDrYXHiaYHrvKcVtwsI7E1nnsM8KZfZexz3lAkOC7GrTTvp5ELvmuGFQ5qxdhp0kM55Aq7Q8jv-Llawk4etxcSfeHRyTTUOd8JmrySIyW7y2fRvCVwe6mvu5quhMmffDmDicJMVCTbq+oG2A85lzvLC0-E-xmtEHrb1hppfUBIMxuBrrpCInhAI7RZEfIGhcoYflcLFZIeES6DwnDsbecVUSRBgQfN6VIEHU08HDXUYCjhaQftOB2-MSayFIReRW7NrCRAdugiBqsEzThaojLSMVl6HEXMw1iABaMIo5JEaw5nI2wjd9apCAA */
  createMachine(
    {
  tsTypes: {} as import('./saved-tab-list.machine.typegen').Typegen0,
  schema: {
    services: {} as {
      'open server': { data: void };
      'save window': { data: void };
      'delete saved window': { data: void };
      'get all saved windows': { data: IChromeWindowMapping };
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
      entry: 'set connection with parent',
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
              {
                target: 'delete saved tab',
                cond: 'delete saved tab',
              },
            ],
          },
        },
        'delete saved tab': {
          invoke: {
            src: 'delete saved tab',
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
    },
    Success: {
      entry: 'send to parent',
      always: {
        target: 'Online',
      },
    },
    Error: {
      entry: 'send to parent',
      always: {
        target: 'Online',
      },
    },
    Offline: {
      on: {
        OPEN: {
          target: 'Start',
        },
      },
    },
    Start: {
      invoke: {
        src: 'open server',
        onDone: [
          {
            target: 'Online',
          },
        ],
        onError: [
          {
            target: 'Error',
          },
        ],
      },
    },
  },
  id: 'db',
},
    {
      services: {
        'open server': async () => await db.open(),

        'save window': async (_, event) => {
          const win = event.data.win;

          // console.log('[xstate-saved-tab-list-machine]', win);
          if (win === undefined) {
            console.error('[xstate-save-machine]: window data not seneded to machine');
            return;
          }
          await db.savingWindow(win);
        },

        'delete saved window': async (_, event) => {
          const { windowId } = event.data;

          await db.removingWindow(windowId!);
        },

        'get all saved windows': async () => {
          const allTabList = await db.loadAllWindows();

          if (allTabList !== undefined) {
            return arrayToMap(allTabList) as IChromeWindowMapping;
          }

          return {};
        },

        'delete saved tab': async (_, event) => {
          const { windowId, tabId } = event.data;

          await db.removingTab(windowId!, tabId!);
        }
      },

      guards: {
        'delete saved windows': (_, event) =>
          event.command === UsersEventType.DELETE_SAVED_WINDOW,
        'get all saved windows': (_, event) => event.command === 'get all data',
        'save window': (_, event) =>
          event.command === UsersEventType.SAVE_WINDOW,
        'delete saved tab': (_, event) =>
          event.command === UsersEventType.DELETE_SAVED_TAB
      },

      actions: {
        'set connection with parent': sendParent('REMOTE.OPEN'),

        'send to parent': sendParent((_, event) => {
          let data = undefined;

          const respond: {
            type: string;
            data?: IChromeWindowMapping;
            status: MessageEventType;
          } = {
            type: 'REMOTE.RECEIVE',
            data,
            status: MessageEventType.FAILED
          };

          if (
            event.type ===
            'done.invoke.db.Online.get all saved windows:invocation[0]'
          ) {
            respond.data = event.data;
          }

          if (/error/.test(event.type)) {
            respond.status = MessageEventType.FAILED
          } else {
            respond.status = MessageEventType.SUCCESS
          }

          return respond;
        }),
      },
    }
  );

export const savedTabListMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGUCGA3SACALqgRlgDYCWsOAdCREWAMQAyA8gMICCDFTACgKIByAbQAMAXUSgADgHtYJHCWkA7CSAAeiACyaKANgAcAdk37hAVgsAmMwEZhugDQgAnlusVNATk-79lgMyB2mYAviFOaJgQuATEZJTUtHQASrwAskwAKrxcfEJiqjJyCsqqGgiWlRTCNma6lsb62pY2mv5Orghmlvoe3r421vqDw2ERGNh4hKTkFCzKSmAAxjiT0lgQ+BTJYKgQzoysHNu8AIoAqrzImSLiSCBF8ooq9+V+OsKGwzaGjf66hnaLi0mmEfR8nm0tW6ZmE-jGIEik1iM0o8yUixWaw2Wx2ewOzHYnFSFyuNxsdyksiepVebkseksXkh-k8ulqALMHUQPU8FG83jMhhsg0M5n08PCiIm0SmcVm6Mxq1l602212+0ORJOpOugkslIe1JKL1AbyZ1S+It+Jn+gO5CH8vnBnmM-jstmsCKRspR8TmC2WytwqtxGoJR2JZ0uev8hseJrKiHelu+NolAKBnUCuhdbo9g1CUp9MWm-sVQexaoAIsp6KkMtkTixeABJABqvFuhWNzyTCBs-h6FDsnksY8MkNhngdTt6zMhfk8Qusukl4yipflaMDWJVOIo50kEFQqxS6SyOVSLY7XYK9wTfbpFQtYvdwlMrIB1gdEuqwgA+wLEnQd3W9GUt1RChkDAJR9wAWzgWBUBgOhuwfXtaTNHlXzhOxPzZQwf2BR1AQoQIhxGQEbF0ZcwilJRpAgOBVBLOUoMSMAe2KJ9sIQP9YStWwfGsTRagdbpegFAYhhGGxwM3djy13YMcFDdV8W4mlTXURA6l6IxYRqTRYVqPxZ00XMBR8UUDF0MxPAU5EywVFSqy2WtFi0xNn0Gd0R2ETxKKIwc-EMWdnWskxxxXOp12lRS-VcjFK33NUjxPVZvN43SB2E-kDEMXQ4Taf4agisEF38cwfhsIxDCc30XJ3FK9xDHFsqw3L-GMRlmTaNkOUMLkSMsAD+QFIq6mXScTMayD-RguD2sQ2BkJgTqdPKTRLFneyXTsGwfH0MwjHmpTyE2-sAFpHBI66zAm6znv6XR6JCIA */
  createMachine(
    {
  context: {
    data: {},
    dbRef: null,
    msgRef: null,
    command: undefined
  },
  tsTypes: {} as import('./saved-tab-list.machine.typegen').Typegen1,
  schema: {
    context: {} as {
      data: IChromeWindowMapping;
      dbRef: any;
      msgRef: any;
      command: UsersEventType | undefined
    },

    events: {} as
      | { type: 'LOCAL.OPEN' }
      | { type: 'REMOTE.OPEN' }
      | {
          type: 'REMOTE.RECEIVE';
          data?: IChromeWindowMapping;
          status: MessageEventType;
        }
      | {
          type: 'LOCAL.REQUEST';
          command: DBGuards;
          data: Partial<IFrontData>;
        }
      | { type: 'messaging'; status: MessageEventType },

    actions: {} as
      | { type: 'request open db' }
      | { type: 'receive data' }
      | { type: 'request db with data' }
      | { type: 'send to message machine' },
  },
  entry: assign({
    dbRef: () => spawn(dbMachine, 'db-machine'),
    msgRef: () => spawn(messageMachine, 'message-machine'),
  }),
  initial: 'idle',
  states: { 
    idle: {
      on: {
        'LOCAL.OPEN': {
          target: 'idle',
          actions: 'request open db',
          internal: false,
        },
        'REMOTE.OPEN': {
          target: '#Saved tab list.Connected to db.Update',
        },
      },
    },
    'Connected to db': {
      initial: 'Ready',
      states: {
        Ready: {
          on: {
            'LOCAL.REQUEST': [
              {
                target: 'Done',
                cond: 'SAVE_WINDOW',
                actions: 'request db with data',
              },
              {
                cond: 'OPEN_SAVED_WINDOW',
                actions: 'open new window'
              },
              {
                target: 'Done',
                cond: 'DELETE_SAVED_WINDOW',
                actions: 'request db with data',
              },
              {
                target: 'Done',
                cond: 'DELETE_SAVED_TAB',
                actions: 'request db with data',
              },
            ],
          },
        },
        Done: {
          on: {
            'REMOTE.RECEIVE': {
              target: 'Update',
            },
          },
        },
        Update: {
          entry: 'get all saved data',
          on: {
            'REMOTE.RECEIVE': {
              target: '#Saved tab list.Send to message',
              actions: ['receive data', 'send to message machine'],
            },
          },
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
      guards: {
        'SAVE_WINDOW': (_, event) => event.command === UsersEventType.SAVE_WINDOW,
        'OPEN_SAVED_WINDOW': (_, event) => event.command === UsersEventType.OPEN_SAVED_WINDOW,
        'DELETE_SAVED_WINDOW': (_, event) => event.command === UsersEventType.DELETE_SAVED_WINDOW,
        'DELETE_SAVED_TAB': (_, event) => event.command === UsersEventType.DELETE_SAVED_TAB,
      },
      actions: {
        'open new window': () => {},
        
        'request open db': send(
          { type: 'OPEN' },
          { to: (context) => context.dbRef }
        ),

        'receive data': (context, event) => {
          // console.log('[xstate-saved-tab-list-machine]: received data from idb', event)
          if (event.data !== undefined) {
            context.data = event.data;
          }
        },

        'request db with data': send(
          (context, event) => {
          
            /**
             * Actually, this actions won't meet 'get all data' command, but we have to
             * escape since typescript doesn't realize the structure
             */
            if (event.command !== 'get all data') {
              context.command = event.command;
            }

            return {
              type: 'REQUEST',
              command: event.command,
              data: event.data,
            }
          },
          { to: (context) => context.dbRef }
        ),

        'send to message machine': send(
          (context, event) => {
            /**
             * won't send to message if the app think the command doesn't need to show to user
             */
            if (context.command === undefined) {
              return { type: ''}
            }

            return {
              type: 'Showing message',
              status: event.status,
              command: context.command
            }
          },
          { to: (context) => context.msgRef }
        ),

        'get all saved data': send({
          type: 'REQUEST',
          command: 'get all data'
        }, { to: (context) => context.dbRef })
      },
    }
  );
