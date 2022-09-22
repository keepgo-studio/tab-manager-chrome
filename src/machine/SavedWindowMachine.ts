import { createMachine } from "xstate";
import db from "../indexedDB/db";
/*
  guard -> ALL CAPITAL
  state -> CamleSpace
  event -> lower letter
*/

export const SavedWindowMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QGUCGA3SB1AlgOwgHsB3AWVQGMALfMAOgBlDUJ8oBiIve-dQga3ppMEXARLlqtRs1Z4oCXoQqoALjkJ4A2gAYAuolAAHQrBzrNhkAA9EARgAsAZjoAmAByuArADYdATgB2Ox8HQPcAGhAAT0RA-3c6Ozt3H1dA1zsAnUCnAF88qOFsfCIyShpuGRY2djAAJ3rCerojABs1ADNmgFs6YtFSiQrpJhr5RTw+FQttfSsTM1mrWwQ-VzoveICvO1cnO127KNi1g7offx0ncKCDpx0fAqKMEvFyqSqmCFRIOhwIG0wOwAK6wBoAAnwqgalFmEOUFBB9QWpnMGjwK0Qrh0Ogu7jsgR8lwc-gcmS8J3sOk8SUCGRujxprn2zxAAzEZUklXo31+EDohCMYDw7FRSwxWLWQU2XlcfncwR8cs8VIQWSydB03n8CWCOgcnnyhXZr0G725o0IPz+EDAQJhYqQIEW6MsztWl0Csu8iq87gSXl2ao1eO1Xn8XmcDhjPlSbI5Qw+PJkNoFsDNTuMaOWHsQlx8dDCMd24QJ+wcIZ0mvDQSycacPnpCbNnOGn151v5dAzIjqjWarQ6qm69T6iYtIy+Xb+vcgk2magxugMztdudAq0ydiS-kyiocTcjN1cIa8BrowSCNKuvjjXhbIjbyatafYFDapjA4rdmLzCFSb0whuc8GUPOx-BDCDvQeA9gkVeJAgKE08GtOArAnLkp07cYoB-DcbHsQkizsB4I0CR5G1VGJEH9RIIOuAkmwgg5HzeLCO1TbsASBfDJX-Rx-CLCMclxA0nH9cI1T1fFwh8LJXAcasaTY80OJTPk-iFEU+PdTd81Itw9gkvZ-Xk4IoN2Oh3ANelQx8JwnAcVTn0tac0zoO0HW-Ncc34-S1j2JICWSA1iX8G5IJo9V9kSZxdnJFJY3cdwXKTNzOw8ucIF0v8AsNRJLkExVtScdwHEpaLSPcFx-GVMryRVdx-TSydOM0nLfIlPTCJirxhKuCjcXixVImi-xDlk1IcgDeVQla9TpDAaxzFyqUgn6iCY2rDxUj8QIoKuayaSJDxcQg-wFvbHk1v-CKSLI68HLjU9ot2QsGLKxwbhSJtkLyIA */
createMachine({
  context: {
    data: [] as CurrentWindow[],
    occurWindowId: -1,
  },
  tsTypes: {} as import("./SavedWindowMachine.typegen").Typegen0,
  schema: {
    services: {} as {
      "get all saved windows from Indexed DB": {
        data: void;
      };
      
      "saving window to Indexed DB": {
        data: void;
      }
    },

    events: {} as
      | {
          type: "user interaction occur";
          data: Partial<BackgroundData>;
          command: UserInteractionType;
        }
      | { type: "close" },
  },
  predictableActionArguments: true,
  initial: "Loading",
  states: {
    Loading: {
      invoke: {
        src: "get all saved windows from Indexed DB",
        onDone: [
          {
            target: "Lodaed",
          },
        ],
        onError: [{}],
      },
    },
    Lodaed: {
      initial: "idle",
      states: {
        idle: {
          on: {
            "user interaction occur": [
              {
                cond: "is opening saved window",
                target: "open",
              },
              {
                cond: "is removing saved window",
                target: "delete",
              },
              {
                cond: "is saving window",
                target: "saved",
              },
            ],
          },
        },
        open: {
          always: {
            target: "idle",
          },
        },
        delete: {
          always: {
            target: "idle",
          },
        },
        saved: {
          invoke: {
            src: "saving window to Indexed DB",
            onError: [
              {
                description: "need to fix\n",
              },
            ],
          },
          always: {
            target: "idle",
          },
        },
      },
      on: {
        close: {
          target: "exit",
        },
      },
    },
    exit: {
      type: "final",
    },
  },
  id: "SavedWindowMachine",
}, {
  guards: {
    "is opening saved window": (_, event) =>
    event.command === UserInteractionType.OPEN_SAVED_WINDOW,
    "is removing saved window": (_, event) => 
    event.command === UserInteractionType.REMOVE_SAVED_WINDOW,
    "is saving window": (_, event) =>
    event.command === UserInteractionType.SAVE_WINDOW
  },

  services: {
    "get all saved windows from Indexed DB": async (context) => {

      db.open().then(async () => {
        const allWindows = await db.loadAllWindows();
  
        context.data = [...allWindows];
      });

    },

    "saving window to Indexed DB": async (context, event) => {
      const { win } = event.data;
      
      db.savingWindow(win as CurrentWindow);
    }
  }
});
