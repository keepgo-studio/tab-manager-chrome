import { ActorRef, assign, createMachine, spawn } from 'xstate';
import { send } from 'xstate/lib/actions';
import { ChromeEventType } from '../shared/events';
import { getAllChromeWindow } from '../utils/browser-api';
import { arrayToMap } from '../utils/utils';
import { messageMachine } from './message.machine';

export const currentTabListMachine = createMachine(
  {
    tsTypes: {} as import('./current-tab-list.machine.typegen').Typegen0,
    context: {
      msgRef: null,
      data: {},
      prevWindowId: -1,
    },
    schema: {
      events: {} as
        | { type: 'Loading' }
        | { type: 'Loaded' }
        | { type: 'Failed' }
        | { type: 'Retry' }
        | {
            type: 'Update list';
            command: ChromeEventType;
            data: Partial<IBackData>;
          }
        | { type: 'Close app' }
        | { type: 'Send status' },

      context: {} as {
        msgRef: any;
        data: CurrentWindowMapping;
        prevWindowId: number;
      },
    },
    predictableActionArguments: true,
    initial: 'Get all data',
    states: {
      'Get all data': {
        initial: 'Loading',
        states: {
          Loading: {
            invoke: {
              src: 'chrome api: get all windows',
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
            always: {
              target: '#Current tab list.idle',
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
        entry: assign({
          msgRef: () => spawn(messageMachine, 'message-machine'),
        }),
        on: {
          'Close app': {
            target: 'Terminate',
          },
          'Update list': [
            {
              target: 'Updated',
              cond: 'WINDOW_CREATED',
              actions: 'WINDOW_CREATED',
            },
            {
              target: 'Updated',
              cond: 'WINDOW_CLOSED',
              actions: 'WINDOW_CLOSED',
            },
            {
              target: 'Updated',
              cond: 'TAB_CRAETED',
              actions: 'TAB_CRAETED',
            },
            {
              target: 'Updated',
              cond: 'TAB_UPDATED',
              actions: 'TAB_UPDATED',
            },
            {
              target: 'Updated',
              cond: 'TAB_MOVED',
              actions: 'TAB_MOVED',
            },
            {
              target: 'Updated',
              cond: 'TAB_CLOSED',
              actions: 'TAB_CLOSED',
            },
            {
              target: 'Updated',
              cond: 'ACTIVE_CHANGED',
              actions: 'ACTIVE_CHANGED',
            },
            {
              target: 'Updated',
              cond: 'FOCUS_CHANGED',
              actions: 'FOCUS_CHANGED',
            },
          ],
        },
      },
      Updated: {
        always: {
          target: 'Show message',
        },
      },
      Terminate: {
        type: 'final',
      },
      'Show message': {
        always: {
          target: 'idle',
          actions: 'send status to message machine',
        },
      },
    },
    id: 'Current tab list',
  },
  {
    guards: {
      WINDOW_CREATED: (_, event) =>
        event.command === ChromeEventType.WINDOW_CREATED,
      WINDOW_CLOSED: (_, event) =>
        event.command === ChromeEventType.WINDOW_CLOSED,
      TAB_CRAETED: (_, event) => event.command === ChromeEventType.TAB_CREATED,
      TAB_UPDATED: (_, event) => event.command === ChromeEventType.TAB_UPDATED,
      TAB_MOVED: (_, event) => event.command === ChromeEventType.TAB_MOVED,
      TAB_CLOSED: (_, event) => event.command === ChromeEventType.TAB_CLOSED,
      ACTIVE_CHANGED: (_, event) =>
        event.command === ChromeEventType.ACTIVE_CHANGED,
      FOCUS_CHANGED: (_, event) =>
        event.command === ChromeEventType.FOCUS_CHANGED,
    },
    services: {
      'chrome api: get all windows': async (context, _) => {
        const allWindowsArray = await getAllChromeWindow();

        context.data = arrayToMap(allWindowsArray) as CurrentWindowMapping;
      },
    },
    actions: {
      WINDOW_CREATED(context, event) {
        const { win } = event.data;

        if (win === undefined || win.id === undefined) {
          // context.msgStatus = MessageEventType.FAILED;
          return;
        }

        context.data[win.id] = win as CurrentWindow;
        // context.msgStatus = MessageEventType.SUCCESS;
      },

      WINDOW_CLOSED(context, event) {
        const { windowId } = event.data;

        if (windowId === undefined) {
          // context.msgStatus = MessageEventType.FAILED;
          return;
        }

        delete context.data[windowId];
        // context.msgStatus = MessageEventType.SUCCESS;
      },

      TAB_CRAETED(context, event) {
        const { tab, windowId } = event.data;

        /**
         * since CREATE_TAB can fired before the CREATE_WINDOW even though the window not
         * had loaded at currentWindowMap, I have to add gurad code to prevent a error that
         * can occur because app can't find winodwId which had not created yet.
         */
        if (
          tab === undefined ||
          windowId === undefined ||
          !(windowId in context.data)
        ) {
          // context.msgStatus = MessageEventType.FAILED;
          return;
        }

        context.data[windowId!].tabs.splice(tab!.index, 0, tab!);
        // context.msgStatus = MessageEventType.SUCCESS;
      },

      TAB_UPDATED(context, event) {
        const { tab } = event.data;

        if (tab === undefined) {
          // context.msgStatus = MessageEventType.FAILED;
          return;
        }

        const { windowId } = tab;

        const tabIdx = context.data[windowId].tabs.findIndex(
          (t) => t.id === tab.id
        );

        if (tabIdx === -1) {
          // context.msgStatus = MessageEventType.FAILED;
          return;
        }

        context.data[windowId].tabs[tabIdx] = tab;
        // context.msgStatus = MessageEventType.SUCCESS;
      },

      TAB_MOVED(context, event) {
        const { windowId, moveInfo } = event.data;

        if (windowId === undefined || moveInfo === undefined) {
          // context.msgStatus = MessageEventType.FAILED;
          return;
        }

        const moveTab = context.data[windowId].tabs.splice(
          moveInfo.fromIndex,
          1
        )[0];
        context.data[windowId].tabs.splice(moveInfo.toIndex, 0, moveTab);
        // context.msgStatus = MessageEventType.SUCCESS;
      },

      TAB_CLOSED(context, event) {
        const { tabId, windowId } = event.data;

        if (tabId === undefined || windowId === undefined) {
          // context.msgStatus = MessageEventType.FAILED;
          return;
        }

        const tabIdx = context.data[windowId].tabs.findIndex(
          (t) => t.id === tabId
        );

        context.data[windowId].tabs.splice(tabIdx, 1);
        // context.msgStatus = MessageEventType.SUCCESS;
      },

      ACTIVE_CHANGED(context, event) {
        const { tabId, windowId } = event.data;

        if (tabId === undefined || windowId === undefined) {
          // context.msgStatus = MessageEventType.FAILED;
          return;
        }

        const tabIdx = context.data[windowId].tabs.findIndex(
          (t) => t.id === tabId
        );

        if (context.prevWindowId !== -1) {
          context.data[context.prevWindowId].tabs.forEach(t => t.active = false);
        }

        context.data[windowId].tabs[tabIdx].active = true;

        context.prevWindowId = windowId;
      },

      FOCUS_CHANGED(context, event) {
        const { windowId } = event.data;

        if (windowId === undefined) {
          // context.msgStatus = MessageEventType.FAILED;
          return;
        }

        if (context.prevWindowId !== -1) {
          context.data[context.prevWindowId].focused = false;
        }

        context.data[windowId].focused = true;

        context.prevWindowId = windowId;
      },

      'send status to message machine': send(
        { type: 'Showing message' },
        { to: (context) => context.msgRef }
      ),
    },
  }
);
