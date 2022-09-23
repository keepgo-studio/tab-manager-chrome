// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    "get all saved windows from Indexed DB": "done.invoke.SavedWindowMachine.Loading:invocation[0]";
    "saving window to Indexed DB": "done.invoke.SavedWindowMachine.Lodaed.saved:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {
    "get all saved windows from Indexed DB": "xstate.init";
    "saving window to Indexed DB": "user interaction occur";
  };
  eventsCausingGuards: {
    "is opening saved window": "user interaction occur";
    "is removing saved window": "user interaction occur";
    "is saving window": "user interaction occur";
  };
  eventsCausingDelays: {};
  matchesStates:
    | "Loading"
    | "Lodaed"
    | "Lodaed.delete"
    | "Lodaed.idle"
    | "Lodaed.open"
    | "Lodaed.saved"
    | "exit"
    | { Lodaed?: "delete" | "idle" | "open" | "saved" };
  tags: never;
}
