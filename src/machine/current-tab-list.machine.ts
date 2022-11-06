import { ActorRef, assign, createMachine, spawn } from 'xstate';
import { send } from 'xstate/lib/actions';
import { ChromeEventType, MessageEventType } from '../shared/events';
import { getAllChromeWindow } from '../utils/browser-api';
import { arrayToMap } from '../utils/utils';
import { messageMachine } from './message.machine';

export const currentTabListMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGECuAndYB2AXABLgIYBG+ANgJay4B0A4mAUeefhEcbQDID2REStigBiCL2xhaQgG68A1lJi4AtC3IqA7kPGbYAbQAMAXUSgADr1iVclCWZAAPRABYAnAGZahnz4BsABwATACsQQDshgCMHgA0IACeiCEuIbQhbobBUQEeMS5RfgC+RfFomDgExGRUNAxM+OrsnEQ8-ILCImCYvOi05uScAGa9ALa0ymqsWjq8ekamSCCW1rb2S84I7l6+-sFhkTHxSQgBLobpmeFubiGGfpEhJWUYWHiEpBTUdIzMrM1cPgCISiZDkKxgRrmcwLBwrGx2bAOTYBPxBWgPHIBe4hPx5OKJRBRGLhWhBdzYoLk3EuQLPEDlN5VT61H4NJocQHtSAiWFLeFrJEbRCo9GYgLYvy4-HHZKpS5ZII5fEFJ6lBmvSofGrfep-Nic1oAMSIlHIPIASkx0Ak+RYrAj1qBNn4om5aB5wndFRE8QEorKEOEJQr-fc-Jkgh4PPTGVrql86pQIOaRGCIVCYSY4Q7BciifcvLjQllwkE3IEAiFA1FomlwhTDMGgoF7lFY5r3gnWdIU2ARABVcycyGsu3LXOI-MIWu5dJou4BMsViXVwkIDwtsnuCuGHceStql4VLss3XJ1NDkeJ3D6KKLe2rKfCmeGTzzktL8uHwMucm0Bsbg8VEAkyQwWyPDUT2ZHUkz7Qdh04Udvn0IIHwnJ8nScIlayLBdS2-VdAzCLxyRuQol1RA9inVONT1gugL37K8kJvfQPHQgVn2dHDDDwz9lx-dc0SiACKVue5gkeDtoO1G9e0vRDcGQmh9BcTjJywzZa3fYtF0Eoj1zLC4yKXTcQmuPcXBkpk5J7JiEOvMcQg0zChR4185z0giVyrQN-QCMS3CrKIXBcL1gJjWjOxg+SHJY5S2L8VzHXc7DX3Cfj9MIvz1zcKJSVM79PQKqkbPjM84MUpyUPCFK8xfWtMo-bLfLXE4qVJQDgqjN9MvcSC6NinsEp5ccuK0okQjnUD7lCaM3D-AN1xbQKd2C8IYlraagnK+j5IAZQACzmfBRjgWAiBgXls35TS0u0wsWp8oSTmCWgbk+zdQvyykSnVbBeAgOAHCGuzdV+Rp-kNNpgWEHM3OnMtA3CMtaFm-1Ug8FwDxxvbhoh9loZaWHgYgBHUqRt0MTfYDgsk64-GI2lvEyM491xEIckGmLwbqSGORJk0zUgCmGo8zb3T8WnQMlJcK38jw0lCBscaCHwsRo49bO7Qn9QBIgxe49LyV-XFQ3C8lCh8XF8b5xi+yNyaEArUS9OJDI3QbAkThSPxWayPj1ddPxUjt3W6lG8m7sRxraVJLGoiCbEKz9oJA1Wj7PsCO5pv9CJw8qugABVulGIQkKdh6cLcUkPEyPFUcy0I3BrcCvAKUOIk2sJXSi7WKoY2hjtO87YEumAq+nCj0WDJPiy9RVlpOD3vFyDx7kWx48Ws6LZIj3Ap5fFRTfXFQaJKIA */
  createMachine(
    {
      context: {
        msgRef: null,
        data: {},
        prevWindowId: -1,
        status: MessageEventType.FAILED,
        command: undefined,
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
              data: Partial<IBackData>;
            }
          | { type: 'Close app' }
          | { type: 'Send status' },

        context: {} as {
          msgRef: any;
          data: IChromeWindowMapping;
          prevWindowId: number;
          status: MessageEventType;
          command: ChromeEventType | undefined;
        },
      },
      predictableActionArguments: true,
      entry: assign({
        msgRef: () => spawn(messageMachine, 'message-machine'),
      }),
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
          on: {
            'Close app': {
              target: 'Terminate',
            },
            'Update list': [
              {
                target: 'Updated',
                cond: 'WINDOW_CREATED',
                actions: ['WINDOW_CREATED', 'command update'],
              },
              {
                target: 'Updated',
                cond: 'WINDOW_CLOSED',
                actions: ['WINDOW_CLOSED', 'command update'],
              },
              {
                target: 'Updated',
                cond: 'TAB_CRAETED',
                actions: ['TAB_CRAETED', 'command update'],
              },
              {
                target: 'Updated',
                cond: 'TAB_UPDATED',
                actions: ['TAB_UPDATED', 'command update'],
              },
              {
                target: 'Updated',
                cond: 'TAB_MOVED',
                actions: ['TAB_MOVED', 'command update'],
              },
              {
                target: 'Updated',
                cond: 'TAB_CLOSED',
                actions: ['TAB_CLOSED', 'command update'],
              },
              {
                target: 'Updated',
                cond: 'ACTIVE_CHANGED',
                actions: ['ACTIVE_CHANGED', 'command update'],
              },
              {
                target: 'Updated',
                cond: 'FOCUS_CHANGED',
                actions: ['FOCUS_CHANGED', 'command update'],
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
      services: {
        'chrome api: get all windows': async (context, _) => {
          const allWindowsArray = await getAllChromeWindow();

          context.data = arrayToMap(allWindowsArray) as IChromeWindowMapping;
        },
      },
      guards: {
        WINDOW_CREATED: (_, event) =>
          event.command === ChromeEventType.WINDOW_CREATED,
        WINDOW_CLOSED: (_, event) =>
          event.command === ChromeEventType.WINDOW_CLOSED,
        TAB_CRAETED: (_, event) =>
          event.command === ChromeEventType.TAB_CREATED,
        TAB_UPDATED: (_, event) =>
          event.command === ChromeEventType.TAB_UPDATED,
        TAB_MOVED: (_, event) => 
        event.command === ChromeEventType.TAB_MOVED,
        TAB_CLOSED: (_, event) => 
        event.command === ChromeEventType.TAB_CLOSED,
        ACTIVE_CHANGED: (_, event) =>
          event.command === ChromeEventType.ACTIVE_CHANGED,
        FOCUS_CHANGED: (_, event) =>
          event.command === ChromeEventType.FOCUS_CHANGED,
      },
      actions: {

        WINDOW_CREATED(context, event) {
          const { win } = event.data;

          if (win === undefined || win.id === undefined) {
            context.status = MessageEventType.FAILED;
            return;
          }

          context.data[win.id] = win;
          context.status = MessageEventType.SUCCESS;
        },

        WINDOW_CLOSED(context, event) {
          const { windowId } = event.data;

          if (windowId === undefined) {
            context.status = MessageEventType.FAILED;
            return;
          }

          delete context.data[windowId];
          context.status = MessageEventType.SUCCESS;
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
            context.status = MessageEventType.FAILED;
            return;
          }

          context.data[windowId!].tabs!.splice(tab!.index, 0, tab!);
          context.status = MessageEventType.SUCCESS;
        },

        TAB_UPDATED(context, event) {
          const { tab } = event.data;

          if (tab === undefined) {
            context.status = MessageEventType.FAILED;
            return;
          }

          const { windowId } = tab;

          const tabIdx = context.data[windowId].tabs!.findIndex(
            (t) => t.id === tab.id
          );

          if (tabIdx === -1) {
            context.status = MessageEventType.FAILED;
            return;
          }

          context.data[windowId].tabs![tabIdx] = tab;
          context.status = MessageEventType.SUCCESS;
        },

        TAB_MOVED(context, event) {
          const { windowId, moveInfo } = event.data;

          if (windowId === undefined || moveInfo === undefined) {
            context.status = MessageEventType.FAILED;
            return;
          }

          const moveTab = context.data[windowId].tabs!.splice(
            moveInfo.fromIndex,
            1
          )[0];
          context.data[windowId].tabs!.splice(moveInfo.toIndex, 0, moveTab);
          context.status = MessageEventType.SUCCESS;
        },

        TAB_CLOSED(context, event) {
          const { tabId, windowId } = event.data;

          if (tabId === undefined || windowId === undefined) {
            context.status = MessageEventType.FAILED;
            return;
          }

          const tabIdx = context.data[windowId].tabs!.findIndex(
            (t) => t.id === tabId
          );

          context.data[windowId].tabs!.splice(tabIdx, 1);
          context.status = MessageEventType.SUCCESS;
        },

        ACTIVE_CHANGED(context, event) {
          const { tabId, windowId } = event.data;

          if (
            tabId === undefined ||
            windowId === undefined ||
            /** Since FOCUS_CHANGED can occur faster than WINDOW_CREATED,
             * we have to escape before error fired.
             */
            !(windowId in context.data)
          ) {
            context.status = MessageEventType.FAILED;
            return;
          }

          const tabIdx = context.data[windowId].tabs!.findIndex(
            (t) => t.id === tabId
          );

          if (context.prevWindowId in context.data) {
            context.data[context.prevWindowId].tabs!.forEach(
              (t) => (t.active = false)
            );
          }

          context.data[windowId].tabs![tabIdx].active = true;
          context.prevWindowId = windowId;
        },

        FOCUS_CHANGED(context, event) {
          const { windowId } = event.data;

          if (windowId === undefined) {
            context.status = MessageEventType.FAILED;
            return;
          }

          if (context.prevWindowId in context.data) {
            context.data[context.prevWindowId].focused = false;
          }

          /** Since FOCUS_CHANGED can occur faster than WINDOW_CREATED,
           * we have to escape before error fired.
           */
          if (windowId in context.data) {
            context.data[windowId].focused = true;
          }

          context.prevWindowId = windowId;
        },

        'command update': (context, event) => (context.command = event.command),

        'send status to message machine': send(
          (context) => ({
            type: 'Showing message',
            status: context.status,
            command: context.command,
          }),
          { to: (context) => context.msgRef }
        ),
      },
    }
  );
