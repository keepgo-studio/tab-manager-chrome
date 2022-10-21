import { ActorRefFrom, createMachine, spawn } from 'xstate';
import { getAllChromeWindow } from '../utils/browser-api';

export const currentTabListMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGECuAndYB2AXABLgIYBG+ANgJay4B0A4mAREcbQDID2REl2UAYgidsYWnwBunANZiYuALRFy5BQHc+wtbADaABgC6iUAAdOsSrkojjIAB6IATADY9tPQA4AzF4CsHgE5HR29fAIAaEABPRAB2WK9aXy8AgMCAFljnAPiPAF88yLRMHAJiMioaBiZ8FjYuHj5BMExOdFoTclYAMzaAW1p5JRV1TU5tfSMkEDMLKxtphwQXN08ffyCQvwjoxABGPWcPJJSc9N89AN9zrwKijCw8QlIKajpGZlYiDm5efgFkORzGB8EQTCZJrZZpZrNhbEtnI4ArRYkjHHtnAkAgdHJEYghAr53KcgmEPB5rrE7iBio8yi9Ku8anVvg0IJABAAlHDs9CQ6bQ+ZwxaIRHI1FBDFYnF4uIJE6pDJZHKxfKFGkPUrPCpvaqfNgAMSIlHIHO5uHQUX5pnMMIWoCWXg8zlo6S8sV8SJxji8iNlCAOGIVqV8qL0CT2avuJSe5VeVUoEFNAgAqiY6iDGdaZrahfC4rjdghPXtiakAno9GFnEdHNTaVq44zxEmwACgbAQWCIYYobnYfmCelS149OiPOlwxTHOlC-jnOl0sGAl5I3trp765rYwzdQB1NrSJpCERiSQyMRqQ8tbOCgcihA+F3xcOxFee9Hh3z+n0uvSnbwPHXbFhyjDUY3pHUqgPdAj3+Fp0DaDoulwXp0AGK9YJvXsBX7e17EQJ8UViV932CA4PX9SMlz0SdKwuRxYgOcNbnVBsdygugAGUAAtxnwPo4FgIgYC5HlsKmG05nvB0nEY2hyWuDFggSN851FWd3Dow4KwrddWPVbBOHZeBpnYyD4yZfVWV+Jo+2k-CllRf14liV0SUcWi3zSVjozpbVLL1Wovh+HhIHsu1hVkhB0mdWhMSYlJzirDF0hc2IaIAgJMmyXItwggLmw+YLDWNU0IAivMH1il0Er2JKLl8VKqLHIl3R8DFfVRTzfHy-ym11YqWUqmSCOWNKiyOJdknLbLHE9VI9j6xtdwTVsRscuI3VoAIjlVC4rk8y5-QXIl-3LVcgI3Os2O3CzmxguCoA2qKxtnKjAloJFKxYvx0RnZaOMCgAVFo+j4VgwBewcciJPZ5rHI7VK8f1yTc9rVwSDwkQpZxAfu3VeP4wTYGEmBoYfTETs0mbUku9dzhuvyVs4inooUGd-SuMtZt53aCgKIA */
  createMachine({
  initial: 'Get data',
  states: {
    'Get data': {
      initial: 'Loading',
      states: {
        Loading: {
          invoke: {
            src: getAllChromeWindow,
            id: 'get-all-windows',
            onDone: [
              {
                target: 'Loaded',
              },
            ],
            onError: [
              {
                target: 'Failed',
              },
            ],
          },
          on: {
            'Close app': {
              target: '#Current tab list.Terminate',
            },
          },
        },
        Loaded: {
          on: {
            Render: {
              target: '#Current tab list.idle',
            },
          },
        },
        Failed: {
          on: {
            Retry: {
              target: 'Loading',
            },
          },
        },
      },
    },
    idle: {
      on: {
        'Update list': {
          target: 'Working',
        },
        'Close app': {
          target: 'Terminate',
        },
      },
    },
    Working: {
      invoke: {
        src: 'WorkerMachine',
        id: 'worker',
        onDone: [
          {
            target: 'Show message',
          },
        ],
        onError: [
          {
            target: 'Show message',
          },
        ],
      },
    },
    Terminate: {
      type: 'final',
    },
    'Show message': {
      on: {
        Render: {
          target: 'idle',
        },
      },
    },
  },
  id: 'Current tab list',
});

const workerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHUD2AnA1mdA6AygC4CG6hAxGlgJYB2UA2gAwC6ioADqrNYdarXYgAHogDMARgCsuMXLFSJATgDsKhQCYAbFoA0IAJ6IJADgm4TcgCwapSjVaYmrSrQF83+qtjxFSFbzpGCTYkEC4ePgEhUQRJGXkFZTVNHX0jBA0TJlwdLRUtJWcpLTErMQ8vDB8CEjJKaqCGDVDObl5+QTDY+Nl5RVV1KW09Q3EVJVwpJhmlKQKdMwkVSpBvHFr-Bpp6BjFW8PaortAe6T65AZThtLGEKxUTC5sJLRM1LKYpVfXfOoDGrsrAcIh1ot1xOdElchiN0oh5ipcK98g8tE41C4ftUNn56oFdlIQUdOjFIQl+slYbcMvktLgZjNYUUNMtsVhcf9tpgmlpiZFSRC4lDKYNUqMMpYGYyJIyvrYdB5PCBaKgIHAhL9NmQhKDjmT7hp4QgJOclK8VKYlEwJFlVCZ2TUAGJ0aiwAAWkF1JPBp0QWnKU0ZYiYDzEWUexrEE1wVgtWgclgkNis7mVv29At9IkQAFoJXmpGJcEpS0UCmJLEwlAolW4gA */
  createMachine(
    {
  context: {
    data: {},
    isSuccess: false,
    ref: spawn(currentTabListMachine, 'current-tab-list'),
  },
  tsTypes: {} as import('./current-tab-list.machine.typegen').Typegen0,
  schema: {
    context: {} as {
      data: CurrentWindowMapping;
      isSuccess: boolean;
      ref: ActorRefFrom<any>;
    },
    events: {} as
      | { type: 'xstate.init'; data: CurrentWindowMapping; }
      | {
          type: 'Working';
          command: ChromeEventType;
          backData: Partial<IBackData>;
        },
  },
  predictableActionArguments: true,
  entry: 'get context data',
  initial: 'Start',
  states: {
    Start: {
      on: {
        Working: [
          {
            target: 'Finished',
            cond: 'WINDOW_CREATED',
            actions: 'WINDOW_CREATED',
          },
          {
            target: 'Finished',
            cond: 'WINDOW_CLOSED',
            actions: 'WINDOW_CLOSED',
          },
          {
            target: 'Finished',
            cond: 'TAB_CRAETED',
            actions: 'TAB_CRAETED',
          },
          {
            target: 'Finished',
            cond: 'TAB_UPDATED',
            actions: 'TAB_UPDATED',
          },
          {
            target: 'Finished',
            cond: 'TAB_MOVED',
            actions: 'TAB_MOVED',
          },
          {
            target: 'Finished',
            cond: 'TAB_CLOSED',
            actions: 'TAB_CLOSED',
          },
          {
            target: 'Finished',
            cond: 'ACTIVE_CHANGED',
            actions: 'ACTIVE_CHANGED',
          },
        ],
      },
    },
    Finished: {
      entry: 'Send context data',
    },
  },
  id: 'Worker',
},
    {
      guards: {
        WINDOW_CREATED: (_, event) => event.command === ChromeEventType.WINDOW_CREATED,
        WINDOW_CLOSED: (_, event) => event.command === ChromeEventType.WINDOW_CLOSED,
        TAB_CRAETED: (_, event) => event.command === ChromeEventType.TAB_CREATED,
        TAB_UPDATED: (_, event) => event.command === ChromeEventType.TAB_UPDATED,
        TAB_MOVED: (_, event) => event.command === ChromeEventType.TAB_MOVED,
        TAB_CLOSED: (_, event) => event.command === ChromeEventType.TAB_CLOSED,
      },
      actions: {
        'get context data': (context, event) => {
          context.data = event.data;
        },

        WINDOW_CREATED: (context, event) => {
          const { win } = event.backData;

          if (win === undefined || win.id === undefined) {
            context.isSuccess = false;
            return;
          }

          context.data[win.id] = win as CurrentWindow;
        },
      },
    }
  );
