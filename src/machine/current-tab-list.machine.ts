import { ActorRef, ActorRefFrom, createMachine, spawn } from 'xstate';
import { send } from 'xstate/lib/actions';
import { getAllChromeWindow } from '../utils/browser-api';
import { arrayToMap } from '../utils/utils';
import { messageMachine } from './message.machine';

export const currentTabListMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGECuAndYB2AXABLgIYBG+ANgJay4B0A4mAUeefhEcbQDID2REStigBiCL2xhaQgG68A1lJi4AtC3IqA7kPGbYAbQAMAXUSgADr1iVclCWZAAPRACYArG9oBGQwE4AzADsbgA0IACeiB4ALLRuhgn+hm5ewYEAHF4AvllhaJg4BMRkVDQMTPjq7JxEPPyCwiJgmLzotObknABmrQC2tMpqrFo6vHpGpkgglta29lPOCO6ePgHBYZEI6dG+cQmGSSlpmTl5GFh4hKQU1HSMzKzVXHwCQqLI5FZglebmEw4zGx2bAORYANhcsQyXncG0QPh2tHciWSqTc0NOIHyFyK11KdwqVQ4z3qkBE-ymgLmIIWiAhUMysIiUTcsXiKKO6JOuSx50KVxKt3KDzYxNqADEiJRyGSAEpMdDhCkWKxA+agRb+TK0aLbIKhZkIQK+QJ7DlojE87H84o3MqUCAykQfL4-P4mAGq6mgxDpdy0MGBLzpdaG3wuU3Bc3HbJWvmXW346SOsAiACq5mJ33xyumXuBPq20U8geDoc2-n8YNowUx1oTeKFDqdGazdtw+i8kxVswLtK2HgDQZDBs20X8nmRB1RMbr8dxgvtKfTmc42du+hc3bzvfVTl9g9LI7hCDclZr7MOFu5ZwKDcXdGbqdba-b+n826pfY1B5Lw-LdL+C4SKXjOXKxreOICu2yYtquuDrjQ+jRJ++Z7os2x-mWo6IIESQXtG4FzneC4wU+K5tjmbiobuNI-lsE5DthJ5+rsU5XrOcYkdBSbkS+CFvmCNFqnR+4MVhx6Gi42wXsRUGJkK-FkrmX7ofClaeL4WkBOkvhgrq47pCeSReAG7hyTajZlAAygAFmM+C9HAsBEDA5IepSaGiRh-pHgBCBeNEhg5Dy2C8BAcAOPWpFJvclSPGKdSvMInq0YWgSBCegRgp4gT7BxXIWfeMFxUSNRJRFECpSJha6qZ-44aeg77NOnKWpBlkPsK8WiuVkrSpA1Xev2dU1sxhrbLEXhgjNJrBtEkK6kVMVCqVCU1EN35iS4vgntEOVmq114Qby3EKUuMqbWpRouP4TGSZsHieC1BXtad8lWXQSlVZ5aX9jCXi7G49JanpBlasZhjATCbjLTxQoACrNL0Qhrld3mIL4bi7DsWmg-pepGWGjHRNNYJzdsi3pHD510HZDlObALkwOjhaBf4sS6ckYL+GDhMnqkwGGOklai2LlbRDTn2s-2KiAyeKQhVkQA */
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
                src: async (context, _) =>
                  (context.data = arrayToMap(
                    await getAllChromeWindow()
                  ) as CurrentWindowMapping),
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
