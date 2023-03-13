
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.get-all-windows": { type: "done.invoke.get-all-windows"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.get-all-windows": { type: "error.platform.get-all-windows"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "chrome api: get all windows": "done.invoke.get-all-windows";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "ACTIVE_CHANGED": "Update list";
"FOCUS_CHANGED": "Update list";
"TAB_CLOSED": "Update list";
"TAB_CRAETED": "Update list";
"TAB_MOVED": "Update list";
"TAB_UPDATED": "Update list";
"WINDOW_CLOSED": "Update list";
"WINDOW_CREATED": "Update list";
"command update": "Update list";
"send status to message machine": "";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "ACTIVE_CHANGED": "Update list";
"FOCUS_CHANGED": "Update list";
"TAB_CLOSED": "Update list";
"TAB_CRAETED": "Update list";
"TAB_MOVED": "Update list";
"TAB_UPDATED": "Update list";
"WINDOW_CLOSED": "Update list";
"WINDOW_CREATED": "Update list";
        };
        eventsCausingServices: {
          "chrome api: get all windows": "Retry" | "xstate.init";
        };
        matchesStates: "Get all data" | "Get all data.Failed" | "Get all data.Loaded" | "Get all data.Loading" | "Show message" | "Terminate" | "Updated" | "idle" | { "Get all data"?: "Failed" | "Loaded" | "Loading"; };
        tags: never;
      }
  