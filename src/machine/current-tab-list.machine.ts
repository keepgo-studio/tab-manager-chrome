import { ActorRef, ActorRefFrom, createMachine, spawn } from 'xstate';
import { send } from 'xstate/lib/actions';
import { getAllChromeWindow } from '../utils/browser-api';
import { messageMachine } from './message.machine';

export const currentTabListMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGECuAndYB2AXABLgIYBG+ANgJay4B0A4mAUeefhEcbQDID2REStigBiCL2xhaQgG68A1lJi4AtC3IqA7kPGbYAbQAMAXUSgADr1iVclCWZAAPRACYAbIdoBGQwE4AzADsvr5uvgAsAKxuXgA0IACeiOG+gbSRhpleKTFevl4ukQC+RfFomDgExGRUNAxM+OrsnEQ8-ILCImCYvOi05uScAGa9ALa0ymqsWjq8ekamSCCW1rb2S84I7p4+AcGhEdFxiYjBLumZl15ukS6+Li4lZRhYeISkFNR0jMyszVx8ARCUTIchWMCNczmBYOFY2OzYBybNx3WiBAAcBXC-g8kV8ePC8SSCBC50KmUCgS8gUiGMMbieIHKryqH1q3waTQ4APakBEMKWcLWiI2iBRvjRmJc2Nx+IiROSqQuWRyXjyBWKpSZL0q7xqX3qvzY3NaADEiJRyHyAEpMdAJAUWKzw9agTb+dFuWjhdHYn1eDKGPEBBUIQLhTyBwyFfGGamhRnM3XVT51SgQK0iUHgyHQkyw53CpGIX1euPRHHS9EBcIuUPowKeGmZXyZNzoh7YxM6t4p9nSDNgEQAVXM3Ih7Mdy0LCOLCE9ZYDbkrPprdZOW2CaJSIWxgRcZ27FV7bIN6czo-Hqdw+i8iydq1novngUXFZRq-8tdDQXRtHJWQFOiRzAUeLJ6teA4XmOnATl8+guPe06Pq6Tglq+tDlsuH7Vl+67EuEGHNtGKJUu4EQMlqSYnvqaaDiOMG4HBND6P4SFCk+broW+2FVmuoa0pE-6BtkbgRj42Rgcmp50dBV6TuE7Ezqhmzopi3q+h6oReA2kTov4oZuI23j+BkLj0oYvpeF+Uk0ZB55DpesHXvokRKShIpcfO7bencYQRtWvjooYBkbq+EoAWqhGREE9K2aytF0A5DHyfBbjuS6nloS+QmGOE7YuL6ERqdioYPOc9whK+5k+sFbiUc8x4JZBTlMRA-L5oKylZZs1keLQ-itvVHqZD6KJleE4S0B+ISBTcPjhPFEH9gAygAFnM+CjHAsBEDAHUZUWz6lphS4rrh34bvpmGXNGQVyj4jyMtgvAQHADjUc1-Y-I0fwmm0QLCAWHlzvuAlxt6lwuAGeWmfSDXak1y0Gj9XItADb0QMDmVzmNaI6YE-j+NsRlgxuKR-rd2TaeqhRLX2KOcn96PmpakDY0dXl41SDZEyTlL4acKQDUTRN5Y2UUI59yN1KjzPEBznHZdKoYBcqcYeg8oTuPTMlJYOisqULU1YQeeX1eE1mq0FN0qjT+R01RPZfQarXs11IPPgUg20ENeTRJSUWBBNU0zdWLixTpMW64ltAACrdKMQiwYbPWIKkEqacFhT1fu2T1hi3rXOGhVRPkYQx5B62bdtsC7TAqdztkeL-lKET7n49KRKGaq5fpRNREG0T95X7KN8+KgqxuKhCSEc+YmNQRiYtJRFEAA */
  createMachine(
    {
  context: {
    msgStatus: MessageEventType.FAILED,
    msgRef: spawn(messageMachine, 'message-machine'),
    data: {},
  },
  tsTypes: {} as import('./current-tab-list.machine.typegen').Typegen0,
  schema: {
    events: {} as
      | { type: 'Loading' }
      | { type: 'Loaded' }
      | { type: 'Failed' }
      | { type: 'Retry' }
      | {
          type: 'Update list';
          command: ChromeEventType;
          backData: Partial<IBackData>;
        }
      | { type: 'Close app' }
      | { type: 'Send status' },

    context: {} as {
      msgStatus: MessageEventType;
      msgRef: ActorRef<any>;
      data: CurrentWindowMapping;
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
        TAB_CRAETED: (_, event) =>
          event.command === ChromeEventType.TAB_CREATED,
        TAB_UPDATED: (_, event) =>
          event.command === ChromeEventType.TAB_UPDATED,
        TAB_MOVED: (_, event) => event.command === ChromeEventType.TAB_MOVED,
        TAB_CLOSED: (_, event) => event.command === ChromeEventType.TAB_CLOSED,
        ACTIVE_CHANGED: (_, event) =>
          event.command === ChromeEventType.ACTIVE_CHANGED,
      },
      actions: {
        WINDOW_CREATED(context, event) {
          const { win } = event.backData;

          if (win === undefined || win.id === undefined) {
            context.msgStatus = MessageEventType.FAILED;
            return;
          }

          context.data[win.id] = win as CurrentWindow;
          context.msgStatus = MessageEventType.SUCCESS;
        },

        WINDOW_CLOSED(context, event) {
          const { windowId } = event.backData;

          if (windowId === undefined) {
            context.msgStatus = MessageEventType.FAILED;
            return;
          }

          delete context.data[windowId];
          context.msgStatus = MessageEventType.SUCCESS;
        },

        TAB_CRAETED(context, event) {
          const { tab, windowId } = event.backData;

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
            context.msgStatus = MessageEventType.FAILED;
            return;
          }

          context.data[windowId!].tabs.splice(tab!.index, 0, tab!);
          context.msgStatus = MessageEventType.SUCCESS;
        },

        TAB_UPDATED(context, event) {
          const { tab } = event.backData;

          if (tab === undefined) {
            context.msgStatus = MessageEventType.FAILED;
            return;
          }

          const { windowId } = tab;

          const tabIdx = context.data[windowId].tabs.findIndex(
            (t) => t.id === tab.id
          );

          if (tabIdx === -1) {
            context.msgStatus = MessageEventType.FAILED;
            return;
          }

          context.data[windowId].tabs[tabIdx] = tab;
          context.msgStatus = MessageEventType.SUCCESS;
        },

        TAB_MOVED(context, event) {
          const { windowId, moveInfo } = event.backData;

          if (windowId === undefined || moveInfo === undefined) {
            context.msgStatus = MessageEventType.FAILED;
            return;
          }

          const moveTab = context.data[windowId].tabs.splice(
            moveInfo.fromIndex,
            1
          )[0];
          context.data[windowId].tabs.splice(moveInfo.toIndex, 0, moveTab);
          context.msgStatus = MessageEventType.SUCCESS;
        },

        TAB_CLOSED(context, event) {
          const { tabId, windowId } = event.backData;

          if (tabId === undefined || windowId === undefined) {
            context.msgStatus = MessageEventType.FAILED;
            return;
          }

          const tabIdx = context.data[windowId].tabs.findIndex(
            (t) => t.id === tabId
          );

          context.data[windowId].tabs.splice(tabIdx, 1);
          context.msgStatus = MessageEventType.SUCCESS;
        },

        'send status to message machine': send(
          { type: 'Showing message' },
          { to: 'message-machine' }
        ),
      },
    }
  );
