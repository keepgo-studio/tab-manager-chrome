// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "error.platform.CurrentWindowMachine.Loading:invocation[0]": {
      type: "error.platform.CurrentWindowMachine.Loading:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "get all windows by chrome api": "done.invoke.CurrentWindowMachine.Loading:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    "create tab from target window": "chrome event occur";
    "create target window from list": "chrome event occur";
    "init app": "init";
    "moving tab from target window": "chrome event occur";
    "remove tab from target window": "chrome event occur";
    "remove target window from list": "chrome event occur";
    "update tab from target window": "chrome event occur";
    "update tab that is activated": "chrome event occur";
  };
  eventsCausingServices: {
    "get all windows by chrome api":
      | "error.platform.CurrentWindowMachine.Loading:invocation[0]"
      | "xstate.init";
  };
  eventsCausingGuards: {
    "is creating tab": "chrome event occur";
    "is creating window": "chrome event occur";
    "is position moving tab": "chrome event occur";
    "is removing window": "chrome event occur";
    "is remvoing tab": "chrome event occur";
    "is tab active changed": "chrome event occur";
    "is updating tab": "chrome event occur";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Loaded"
    | "Loaded.CreateTab"
    | "Loaded.CreateWindow"
    | "Loaded.MoveTab"
    | "Loaded.RemoveTab"
    | "Loaded.RemoveWindow"
    | "Loaded.UpdateActiveTab"
    | "Loaded.UpdateTab"
    | "Loaded.idle"
    | "Loading"
    | "exit"
    | {
        Loaded?:
          | "CreateTab"
          | "CreateWindow"
          | "MoveTab"
          | "RemoveTab"
          | "RemoveWindow"
          | "UpdateActiveTab"
          | "UpdateTab"
          | "idle";
      };
  tags: never;
}
