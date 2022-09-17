import { createMachine } from "xstate";
/*
  guard -> ALL CAPITAL
  state -> CamleSpace
  event -> lower letter
*/

export const CurrentWindowMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGECuAndYB2AXA6gJbYQD2A7gLICGAxgBbFgB0AMqdRMVAMRnYtiAN1IBrFmkw4CxMlTqMBbDl2xQEw0rWq5CpbAG0ADAF1EoAA6lYhXfvMgAHogBsL5gFYA7AA4AjADMPi4ALAFGfiEATD4ANCAAnogBfu5eHuFeUSEAnG45flEAvkXxklh4RCQUNAxMypzcPGCYpOjMFgA2OgBmbQC2zOXSVXK1iizsjWoa2CLadoamDlY2iw7OCCFGIczRXgGhfn5GXjm+IfFJCH5eux5RRhFRXi4eb345ASVlGBUy1XkdSUUwgkGYACUwP1SEIwAAVagAIx4K2stj02A2iB8IT8zCiRxiOR8ryMASuiA8Hh8zC+2UCLkefh8px+IGGlVkNQU9VB4KhMLhowoqKQIFWGPs4s2uPxhLxOSMJMOjMpCA8ORyzDcTxcviM3lyLnZnIBY15IJU4OQWB0CORYss6PWMqpOV2uRZoRcHvOwXVLgCUWYZx8AQO5MCRh8xVKHL+I25QImDTBECGdtwYBF5CdEpdmOxGo9ewKwRCvtyvhcgdZBNCJJyUQ8uRjPlNia5gPGfOtGYAqhYIPbESi0Wsi26tiFdj4MlEcgv0rkcuqfFrPD5goFolEAq3vvGzbne1bOODCBBOmAeAx0KR+mAAARgOF4Z9aWgYCdSrHT6kjB1CN3lxfd3i8Px1WOUICSeWcolSRdmxCTspG7C1gUmftmEoWEHXHcVJVdUBNlnOcFyXYMVy1ddNxpHcAj3A8Qg8ND-lPS1sIvCA706awwF-EinEQQIvCA7Y8nCJ4Cl8DxoPJICzjyY0AiknYSnjbBSDBeBxRPZMz241QoCEqdSMQEIvGgsJmCMR4InsvJghcUl2KTHsuLTAVoXwsczOlCyEHOdw1MVTVQm3Ap1VyWlKy1NT7LxFxlXcjCeSw7yM0FfDcwC-8gv9ZgTg8QJAiCW4XkDFsy2pQplRjAJgzS80MtTfkM1tMBR2RfLi3nPZ0hibY3hCWNm3VVtdj8TVPiYwlqSYlrOMyjrM267M8qIwtApEhBDj2ZVtkQ1zjkrKDEkQO58VOXclXJSDqWWwyvLWocR2zfztsnXbNgAWlsx4XBm4lVzuazLpuZVaWDFlg1ZaG2WPLtWpTPseOYK8bz66c3lpIx9UXJqnmOO51xZZgmOOpiMgyStns81acLwuEvudH6Cr2v7gk8KJ90OHYyryKJoJiWlxMNMJDn1LI2OR9DUaMrKcaCv7jiAh5+ZSvEUmFmLCT2X1m1SIJfC+VD5Y4l7MrARxbBVvbIjOOzwwqiI5riSGTgp8SHgJ6lCQPLwGcwiYHf+3dea1wXdaZdVILshzCjGtxtzjEogA */
  createMachine(
    {
  context: {
    data: [] as CurrentWindow[],
    occurWindowId: -1
  },
  tsTypes: {} as import("./CurrentWindowMachine.typegen").Typegen0,
  schema: {
    services: {} as {
      "get all windows by chrome api": {
        data: void;
      };
    },

    events: {} as
      | {
          type: "chrome event occur";
          data: Partial<BackgroundData>;
          command: ChromeEventType;
        }
      | { type: "close" },
  },
  predictableActionArguments: true,
  id: "CurrentWindowMachine",
  initial: "Loading",
  states: {
    Loading: {
      invoke: {
        src: "get all windows by chrome api",
        onDone: [
          {
            target: "Loaded",
          },
        ],
        onError: [
          {
            target: "Loading",
            internal: false,
          },
        ],
      },
    },
    Loaded: {
      initial: "idle",
      states: {
        RemoveTab: {
          entry: "remove tab from target window",
          always: {
            target: "idle",
          },
        },
        RemoveWindow: {
          entry: "remove target window from list",
          always: {
            target: "idle",
          },
        },
        CreateTab: {
          entry: "create tab from target window",
          always: {
            target: "idle",
          },
        },
        CreateWindow: {
          entry: "create target window from list",
          always: {
            target: "idle",
          },
        },
        UpdateTab: {
          entry: "update tab from target window",
          always: {
            target: "idle",
          },
        },
        idle: {
          on: {
            "chrome event occur": [
              {
                cond: "is remvoing tab",
                target: "RemoveTab",
              },
              {
                cond: "is removing window",
                target: "RemoveWindow",
              },
              {
                cond: "is creating tab",
                target: "CreateTab",
              },
              {
                cond: "is creating window",
                target: "CreateWindow",
              },
              {
                cond: "is updating tab",
                target: "UpdateTab",
              },
              {
                cond: "is position moving tab",
                target: "MoveTab",
              },
            ],
          },
        },
        MoveTab: {
          entry: "moving tab from target window",
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
},
    {
      guards: {
        "is creating tab": (_, event) =>
          event.command === ChromeEventType.CREATE_TAB,
        "is creating window": (_, event) =>
          event.command === ChromeEventType.CREATE_WINDOW,
        "is removing window": (_, event) =>
          event.command === ChromeEventType.REMOVE_WINDOW,
        "is remvoing tab": (_, event) =>
          event.command === ChromeEventType.REMOVE_TAB,
        "is updating tab": (_, event) =>
          event.command === ChromeEventType.UPDATE_TAB,
        "is position moving tab": (_, event) =>
          event.command === ChromeEventType.MOVE_TAB,
      },
      actions: {
        "remove tab from target window": (context, event) => {
          const { tabId, windowId } = event.data;

          const windowIdx = context.data.findIndex(
            (chromeWindow) => chromeWindow.id === windowId
          );

          if (windowIdx !== -1) {
            const tabIdx = context.data[windowIdx].tabs.findIndex(
              (chromeTab) => chromeTab.id === tabId
            );

            context.data[windowIdx].tabs.splice(tabIdx, 1);
            context.occurWindowId = windowId!;
          }
        },

        "remove target window from list": (context, event) => {
          const { windowId } = event.data;

          context.data = context.data.filter(
            (chromeWindow) => chromeWindow.id !== windowId
          );
          context.occurWindowId = windowId!;
        },

        "create tab from target window": (context, event) => {
          const { tab, windowId } = event.data;

          const windowIdx = context.data.findIndex(
            (chromeWindow) => chromeWindow.id === windowId
          );
          
          if(windowIdx !== -1) {
            context.data[windowIdx].tabs.splice(tab!.index, 0, tab!);
            context.occurWindowId = windowId!;
          }
        },

        "create target window from list": (context, event) => {
          const { win } = event.data;

          const newWindow = win as CurrentWindow;
          if (typeof newWindow.tabs === "undefined") newWindow.tabs = [];
          // ***TODO***
          // need to add text content via content-script which based on Chrome API
          // newWindow.tabs = newWindow.tabs.map((tab) => {

          //   Object.assign(tab, { textContent: })
          // })
          // ***TODO***
          context.data.push(newWindow);
          context.occurWindowId = newWindow.id!;
        },

        "update tab from target window": (context, event) => {
          const { tab } = event.data;

          const windowIdx = context.data.findIndex(
            (chromeWindow) => chromeWindow.id === tab?.windowId
          );

          if (windowIdx !== -1) {
            const tabIdx = context.data[windowIdx].tabs.findIndex(
              (chromeTab) => chromeTab.id === tab?.id
            );

            context.data[windowIdx].tabs[tabIdx] = tab!;
            context.occurWindowId = tab!.windowId;
          }
        },

        "moving tab from target window": (context, event) => {
          const { windowId, moveInfo } = event.data;

          const windowIdx = context.data.findIndex(
            (chromeWindow) => chromeWindow.id === windowId
          );

          if (windowIdx !== -1) {
            const moveTab = context.data[windowIdx].tabs.splice(
              moveInfo!.fromIndex,
              1
            )[0];

            context.data[windowIdx].tabs.splice(moveInfo!.toIndex, 0, moveTab);
            context.occurWindowId = windowId!;
          }
        },
      },
      services: {
        "get all windows by chrome api": async (context) => {
          const result = (await chrome.windows.getAll({
            populate: true,
            windowTypes: ["normal"],
          })) as CurrentWindow[];

          // ***TODO***
          // need to add text content via content-script which based on Chrome API
          context.data = [...result];
          // ***TODO***
        },
      },
    }
  );
