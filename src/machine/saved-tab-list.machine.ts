import { ActorRef, createMachine, spawn } from 'xstate';
import { done, send, sendParent } from 'xstate/lib/actions';
import db from '../store/indexed-db';
import { arrayToMap } from '../utils/utils';
import { messageMachine } from './message.machine';

export type DBGuards = UsersEventType | 'get all data';

const dbMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QQEYDoDyA7ANgSyzDVgEMA3MAAgHcCIB7agYgcLQLPoGsjVNcCRUhRp1GCDvQDGJAC556WANoAGALqq1iUAAd6sPPMXaQAD0QBOAOwAWNAA4VAJgCML1wGYb9mx4sAaEABPRCcrDzQPKKcbGycAVicLeJd4gF80wL5sfDZhKlosBmYwACdS+lK0HRw5ADNKgFs0bIE88gKxagksThkjZXVNEz0DAZNzBAsLO0dXdxcvHz9AkIQ4i0jo+3ifRZ2EjKz0HMEWsBwwWSp8iFEixhZFIkkeFpO23gurm467wuKPT6cgUgw06hG+kMoImllsDmcbk83l8AWCiA8CS2mNsADYLG4bPFcUcQK1cl9LtdKLd7sUmGUKlUavUmu9+BTzlTfhR-l0gdIQYpNMMkCBRtDjGLJi4VCpZoiFktUatEN4XNinLjcfF4l4PCpcR5SeSzjBZJQSDgcDS-nTGLAnmxXrwPpzzZbrbbefbqLABf1QSKIWKJeNpZYfAj5sjlmi1h4rFZNbqbCoPC4CS4TW6zVdPTbaQCHQzypVqrVZA1Ss1TWwPVbC3bi36A0KwaLdFDw6AZXKFTHFiiVuiEHqIlFMRZ8QTcTESZkybnCEwAEoAUQAigBVdcAZQAKp3xd2YRGEBmNe4bBZ7NO4obYqqEEl7GhptMrDqVF+k+lF3WYBrluu6HkoLhaKGp5Sr2GJuGg163veTiPjYz4pHYH7JE4ri4i4uJJjmHKCMBO77keTiQV2YxnrBF7wYhd64g+zFoaOabJnKXEqIkRozDYRF7gArlIUhwI6x5hrRZihF+CExEhzEoaxz72BE3FyriOyJrs9hEeuZalEwknQVgsIvnJjHIahz5aW+WEuFY9h3lY04LscmB1HUFJMPQOhgGCkI0TBMkIC4sRoDxKH2FYCQLLsTjPjEb4qGpGaJkmjk2LYGSLlg9AQHAJiAcQHS+kFkpmeeWlOJEzFzq5+LZXESVWPEaDxNxXidR4nXhERpxsIV3LepA5VQcFVV0cxb56u4+JqThPj2M+HhqWgN7TI4coZreAkAcuRANl6RZdPAE2VeZzHJmmc5aZiKhuKkz43hqnVcY5eFGvEX4DZ8FU9qFWoRFZSk2aOLj2LiHXcWEzHWN4gkiWJsDndRl3nu4KSRE4BpOM5PgqLOrVvpOMQGrqPE6vphkA9JMphG+X7yp1P0WD+OwvfYGpk+zrhQ0TFgDV5FJ0yFkwtaOYS1RpixWD+KRCwdYtTaFAC0uLPhrkUabr8rGrlQA */
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
          | { type: 'open' }
          | {
              type: 'REQUEST';
              command: DBGuards;
              data: Partial<IFrontData>;
            },
      },
      initial: 'Offline',
      states: {
        Online: {
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
            return arrayToMap(allTabList) as CurrentWindowMapping;
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
          await db.open();
          console.log('idb server open');
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
  /** @xstate-layout N4IgpgJg5mDOIC5QGUCGA3SACALqgRlgDYCWsOAdCREWAMQAyA8gMICCDFTACgKIByAbQAMAXUSgADgHtYJHCWkA7CSAAeiAEyaALBQBsATgDshgMz6zAVh2XN+qwBoQAT0QBGQ3uE-ht-f46OgC+wc5omBC4BMRklCzKSmAAxjjYONJYEPh0AEq8ALJMACq8FPksvACSAGq8IuJIIDJyCsqqGghWxsIUVgAcZmY6XpbCmlbuzm4ImmaGFL4+7kHC7oNDoeEY6TGk5BQJSkmp6ZnZjKwc5bwAigCqvMjFDaot8ooqTZ2TmhT9On6hn6mncPQsE2mHn6xkWvnWk36-XcDi2IAiu0I+3iiRSaSiGSyOWY7E4+QeTxe7kaUlkH3a30QOmMehMhnWKP6VismkMTlcHmGFEMIuBA2M7l5IP0aIxBL2cUOuNOBPOxKuZLuj2egk0NOadLaX1AnWZVn+Zi5xn07m6XKMUIQgzhvl5I3MKxlYXRO3lWMVRxO+NwaroAFs4LBUFASEooK8mu8jR0tLoDGyLNZbGZ7PyZrp9C7xnz9P01sJ+rLfdF-QdkGAlKqsBHYFGYHQE7TWp8U7M00ZTJmbHYHI7hnoNvNxnYQVZQt6lNIIHBVHKa7EDtRaG9DT3GQhJX8LDorF4Vl4WaXHZ49FZfIF9AEQt613hazjjnizkSd92GSbEG6c0dFBdkb1zfQxxAi0hn0UEs25KtInXbEKHrRsQ2bSNozAX96WNdQmU0MczFhJZT2Ma1LTLYwkMxDccDw5N9wAWkggUEDYoslh44RaPnIA */
  createMachine(
    {
      context: {
        msgStatus: MessageEventType.FAILED,
        data: {},
        dbRef: spawn(dbMachine, 'db-machine'),
        msgRef: spawn(messageMachine, 'message-machine'),
      },
      tsTypes: {} as import('./saved-tab-list.machine.typegen').Typegen1,
      schema: {
        context: {} as {
          msgStatus: MessageEventType;
          data: CurrentWindowMapping;
          dbRef: ActorRef<any>;
          msgRef: ActorRef<any>;
        },

        events: {} as
          | { type: 'LOCAL.OPEN' }
          | {
              type: 'REMOTE.RECEIVE';
              data?: CurrentWindowMapping;
            }
          | {
              type: 'LOCAL.REQUEST';
              commnad: DBGuards;
              data: Partial<IFrontData>;
            }
          | { type: 'messaging'; status: MessageEventType },
      },
      initial: 'idle',
      states: {
        idle: {
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
        'receive data': (context, event) => {
          if (event.data !== undefined) {
            context.data = event.data;
          }
        },

        'send to message machine': send(
          (_, event) => ({
            type: 'Showing message',
            status: event.status,
          }),
          { to: (context, _) => context.msgRef }
        ),

        'request open db': send(
          {
            type: 'open',
          },
          { to: (context, _) => context.dbRef }
        ),

        'request db with data': send(
          (_, event) => ({
            type: 'REQUEST',
            command: event.commnad,
            data: event.data,
          }),
          { to: (context, _) => context.dbRef }
        ),
      },
      guards: {
        'delete saved window': (_, event) =>
          event.commnad === UsersEventType.DELETE_SAVED_WINDOW,
        'get all saved window': (_, event) => event.commnad === 'get all data',
        'save window': (_, event) =>
          event.commnad === UsersEventType.SAVE_WINDOW,
      },
    }
  );
