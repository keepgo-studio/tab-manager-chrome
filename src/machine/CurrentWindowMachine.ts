import { createMachine } from "xstate";
/*
  guard -> ALL CAPITAL
  state -> CamleSpace
  event -> lower letter
*/

export const CurrentWindowMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGECuAndYB2AXA6gJbYQD2A7gLICGAxgBbFgB0AMqdRMVAMRnYtiAN1IBrFmkw4CxMlTqMBbDl2xQEw0rWq5CpbAG0ADAF1EoAA6lYhXfvMgAHogBsL5gFYA7AA4AjADMPi4ALAFGfiEATD4ANCAAnogBfu5eHuFeUSEAnG45flEAvkXxklh4RCQUNAxMypzcPGCYpOjMFgA2OgBmbQC2zOXSVXK1iizsjWoa2CLadoamDlY2iw7OCCFGIczRXgGhfn5GXjm+IfFJCH5eux5RRhFRXi4eb345ASVlGBUy1XkdSUUwgkGYACUwP1SEIwAAVagAIx4K2stj02A2iB8IT8zCiRxiOR8ryMASuiA8Hh8zC+2UCLkefh8px+IGGlVkNQU9VB4KhMLhowoqKQIFWGPs4s2uPxhLxOSMJMOjMpCA8ORyzDcTxcviM3lyLnZnIBY15IJU4OQWB0CORYss6PWMqpOV2uRZoRcHvOwXVLgCUWYZx8AQO5MCRh8xVKHL+I25QImDTBECGdtwYBF5CdEpdmOxGo9ewKwRCvtyvhcgdZBNCJJyUQ8uRjPlNia5gPGfOtGYAqhYIPbESi0Wsi26tiFdj4MlEcgv0rkcuqfFrPD5goFolEAq3vvGzbne1bOODCBBOmAeAx0KR+mAAARgOF4Z9aWgYCdSrHT6kjB1CN3lxfd3i8Px1WOUICSeWcolSRdmxCTspG7C1gUmftmCvG8eGIWxf1dUBZVOUMaXnF5DTCF51z8DxmHnekAjxYNIjQ-5T0tbCLwzShYQdcdxUlEinEQWc5wXJdgxXLV103SiXF3KJwJCDxOKTHseLTSA706awwGIqdSMQQIvCA7Y8nCJ4Cl8DxoPJICzjyY0AmsnYSnjbBSDBeBxRPZMz141QoGM6VTK2LxoLCZgjEeCJ4ryYIXFJTSMJ5LDdIzQVBLHcL-0i853HcxVNVCbcCnVXJaUrLV3PivEXGVdLzUy1N+Ry6FBNzAri39ZgTg8QJAiCW46MSVwWzLalCmVGMAmDVruKyzrMzAUdkT66d5z2dIYm2N4QljZt1VbXYGIKL5ojeDJUOPLs2pTPs+PW+1epEwsIvEhBDj2ZVtkQ1LjkrKDJoQO58VOXclXJSDqWWoKdLWocR2zfLPsnb7NgAWlix5lIeDdVzuaLwZOElmHY8MYls1kvER7TVpwvCjMxv9izeWkjH1RdFqeY47no2lWMB1iMjuk0HvQp7guy5gBLhDHnSxwqfpx4JPFUxbmrYz4mWgmJaQsmidf1LINOlrikeZvjtsinHjiAh590OHYRryKJqsJPZfQ9cDIlZKXfhllbUzARwiPZsTNkiM44vDMaIk+IJHJZUNDQJ6lCQPBmra0zCJnt9Xdy113dY9g3wcguKEsZBlggRrygA */
  createMachine(
    {
      context: {
        data: {} as CurrentWindowMapping,
        occurWindowId: -1,
        occurTabId: -1,
      },
      tsTypes: {} as import("./CurrentWindowMachine.typegen").Typegen0,
      schema: {
        services: {} as {
          "get all windows by chrome api": {
            data: void;
          };
        },

        events: {} as
          | { type: "init"; command: ChromeEventType }
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
                init: {
                  actions: "init app",
                },
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
        "init app": () => {},

        "remove tab from target window": (context, event) => {
          const { tabId, windowId } = event.data;

          if (windowId && windowId in context.data) {
            const tabIdx = context.data[windowId].tabs.findIndex(
              (chromeTab) => chromeTab.id === tabId
            );

            context.data[windowId].tabs.splice(tabIdx, 1);
            context.occurWindowId = windowId!;
            context.occurTabId = tabId!;
          }
        },

        "remove target window from list": (context, event) => {
          const { windowId } = event.data;

          if (windowId) {
            delete context.data[windowId];
            context.occurWindowId = windowId;
          }
        },

        "create tab from target window": (context, event) => {
          const { tab, windowId } = event.data;

          /**
           * since CREATE_TAB can fired before the CREATE_WINDOW even though the window not
           * had loaded at currentWindowMap, I have to add gurad code to prevent a error that
           * can occur because app can't find winodwId which had not created yet.
           */
          if (windowId && windowId in context.data) {
            context.data[windowId].tabs.splice(tab!.index, 0, tab!);
            context.occurWindowId = windowId;
            context.occurTabId = tab!.id!;
          } else if (windowId && !(windowId in context.data)) {
            console.log("[xstate]: CREATE_TAB denied");
          }
        },

        "create target window from list": (context, event) => {
          const { win } = event.data;

          // ***TODO***
          // need to add text content via content-script which based on Chrome API
          // newWindow.tabs = newWindow.tabs.map((tab) => {

          //   Object.assign(tab, { textContent: })
          // })
          const newWindow = win as CurrentWindow;
          if (typeof newWindow.tabs === "undefined") newWindow.tabs = [];
          // ***TODO***
          context.data[newWindow.id!] = newWindow;
          context.occurWindowId = newWindow.id!;
        },

        "update tab from target window": (context, event) => {
          const { tab } = event.data;
          const windowId = tab?.windowId;

          if (windowId) {
            const tabIdx = context.data[windowId].tabs.findIndex(
              (chromeTab) => chromeTab.id === tab?.id
            );

            context.data[windowId].tabs[tabIdx] = tab!;
            context.occurWindowId = tab!.windowId;
            context.occurTabId = tab.id!;
          }
        },

        "moving tab from target window": (context, event) => {
          const { windowId, moveInfo } = event.data;

          if (windowId) {
            const moveTab = context.data[windowId].tabs.splice(
              moveInfo!.fromIndex,
              1
            )[0];

            context.data[windowId].tabs.splice(moveInfo!.toIndex, 0, moveTab);
            context.occurWindowId = windowId!;
            context.occurTabId = moveTab.id!;
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
          result.forEach((win) => {
            context.data[win.id!] = win;
          });
          // ***TODO***
        },
      },
    }
  );
