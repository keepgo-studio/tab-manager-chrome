import { createMachine } from "xstate";
/*
  guard -> ALL CAPITAL
  state -> CamleSpace
  event -> lower letter
*/

export const CurrentWindowMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGECuAndYB2AXA6gJbYQD2A7gLICGAxgBbFgB0AMqdRMVAMRnYtiAN1IBrFmkw4CxMlTqMBbDl2xQEw0rWq5CpbAG0ADAF1jJxKAAOpWIV37LIAB6IArACYANCACeiABYAgE5mIw8jSICAdgA2NwAOAEYEtwBfNJ9JLDwiEgoaBiZlTm4eMExSdGYrABsdADMqgFtmbOk8uULFFnZStQ1sEW0HQ1NzJxs7UadXBGiPAOZo5JSVgGYQhOikn38EBPWwiMijAKM3TcuMrIwcmXz5IqU+iEhmACUwZtIhMAAVagAIx4EyQICm9j02Fm7hWzASwSMsUi0QCsXWRmie0QSTxSxSsWimOiwWJwViNxA7VysgKCmKr3eXx+f06FFBpkmtihjnBczc8MRyNR6MxRJxB2CCWYhIWcUiSICHipNIeXQZLxU72QWB0AOBnIs4MhM35cJlwpRWLFyOCkqSkVisoSRI8wSSwQ9biMSVVdw6dKePRKbwgbT1uDA7PIRu502hsIQgstSOtaIxdodAXWMrlF2JQVzwX9Ulpj26jO14YAqlYIPrASCwdYeWbQAKhWnRZnYva-IhSUYXbFYq7PR51tKEqX7jHK1rOO9CBBamAeAx0KRmmAAARgP54XdaWgYFsQtuJ80IDx9hFIwVJXO5gKXB1JUcjhYo4JuT1k2dAwrTVemrZgVzXDd6C3Hd90PXBj1oU90AMJJjVbBM+Q7RBb1CYVH2fBJX3WSVf2HOUPA8RFtixGdMmpANyw1Z5QKXcMIPXTdtz3A9pEQ5CDA8dCL0wmFr1w+8CyfQ4iLfAcEEdRIv0WEI+0uaJAKY+kWNDZdV046DuLgviTzPdZhNNK9sJvO98J2QjiOzJEvxRNE4nWFV6LVecQN09j9KgmCePg-izwCCzLywlwcNsh97Jkxz5KIjwRzHJIQnCcJ1k09VtJDJl-MgrjYN4o9TJQtwItEpMJLs6SXzk-ZpJSuU+0dT0-xynydIK8CAuK4KTKQs9Yiq3kxOs2q4vq2SSPkpIPDRL8YjcaVBTcdIvMY3LgyrNi+sg4h7HPSyormbYHV9JJmHWS4glid0jASDw3EpLayx2hdWLDZhKF+A1my5E1Iom6Lky7EUbV7fsmvWTEv2JBIznStEuqDL6-OYOsGyjABBWhdD+Js42B6rrxTST01tbF5solrXWiTxMSxHY6NuD7uvy6sN1qWwwBOkGk0dDxrsLd1lQ2vEMXfD9mBROGiKfDYSypbBSDeeBwW89HfNebh43GpMYmzYdMsidYP0Z780eAnqwJZf6mwN9swaJaJlmSSjgiozFf3fLFjidBb0QSZ7NvZucdbt-aHbZINnas13ondlYFvdH2jD9pKPUDi4kZ9KdkRt5iuf23UwEbYEE7OxA3Y9tPvcOTO3FIr1c9W2IAlddZR2LvK9p+8v9RjavQbmOvU69jOs6anNrrN0dkYeoxsveyPbdLn7scroFR6TCfPfTpuZ8HQ4wn-CliSJDbw4Yjmo83vS1z3682+CV8qIWlEYmeuamvxBElwpzEixB5VeEcgIlwHu8P6RMq6k0NteA+Ddp4t3mmAwOwckiJHcmzO+68oGLi3vWfU+NCYAxftZZBU9j5oKaiLNwucHqyQWqkPuu0iGQEoWDKcko+xLDNliTwSNXwaTXpA-uSgwDOHsNwuYeJKKylereZU6w4hehls6eWuZWaTldOwr6cjEAAFoYYmMYdKU4VjrEBAyBkIAA */
  createMachine(
    {
  context: {
    data: {} as CurrentWindowMapping,
    occurWindowId: -1,
    occurTabId: -1,
  },
  tsTypes: {} as import('./CurrentWindowMachine.typegen').Typegen0,
  schema: {
    services: {} as {
      'get all windows by chrome api': {
        data: void;
      };
    },

    events: {} as
      | { type: 'init'; command: ChromeEventType }
      | {
          type: 'chrome event occur';
          data: Partial<BackgroundData>;
          command: ChromeEventType;
        }
      | { type: 'close' },
  },
  predictableActionArguments: true,
  id: 'CurrentWindowMachine',
  initial: 'Loading',
  states: {
    Loading: {
      invoke: {
        src: 'get all windows by chrome api',
        onDone: [
          {
            target: 'Loaded',
          },
        ],
        onError: [
          {
            target: 'Loading',
            internal: false,
          },
        ],
      },
    },
    Loaded: {
      initial: 'idle',
      states: {
        RemoveTab: {
          entry: 'remove tab from target window',
          always: {
            target: 'idle',
          },
        },
        RemoveWindow: {
          entry: 'remove target window from list',
          always: {
            target: 'idle',
          },
        },
        CreateTab: {
          entry: 'create tab from target window',
          always: {
            target: 'idle',
          },
        },
        CreateWindow: {
          entry: 'create target window from list',
          always: {
            target: 'idle',
          },
        },
        UpdateTab: {
          entry: 'update tab from target window',
          always: {
            target: 'idle',
          },
        },
        idle: {
          on: {
            'chrome event occur': [
              {
                target: 'RemoveTab',
                cond: 'is remvoing tab',
              },
              {
                target: 'RemoveWindow',
                cond: 'is removing window',
              },
              {
                target: 'CreateTab',
                cond: 'is creating tab',
              },
              {
                target: 'CreateWindow',
                cond: 'is creating window',
              },
              {
                target: 'UpdateTab',
                cond: 'is updating tab',
              },
              {
                target: 'MoveTab',
                cond: 'is position moving tab',
              },
              {
                target: 'UpdateActiveTab',
                cond: 'is tab active changed',
              },
            ],
            init: {
              actions: 'init app',
            },
          },
        },
        MoveTab: {
          entry: 'moving tab from target window',
          always: {
            target: 'idle',
          },
        },
        UpdateActiveTab: {
          entry: 'update tab that is activated',
          always: {
            target: 'idle',
          },
        },
      },
      on: {
        close: {
          target: 'exit',
        },
      },
    },
    exit: {
      type: 'final',
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
        "is tab active changed": (_, event) =>
          event.command === ChromeEventType.ACTIVE_CHANGED
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

          if (win?.type !== "normal") return;
          
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
            
            if (tabIdx === -1) return;
            
            context.data[windowId].tabs[tabIdx] = tab!;
            context.occurWindowId = tab!.windowId;
            context.occurTabId = tab.id!;
          }
        },

        "update tab that is activated": (context, event) => {
          const { tabId, windowId } = event.data;

          context.occurWindowId = windowId!;
          context.occurTabId = tabId!;
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
