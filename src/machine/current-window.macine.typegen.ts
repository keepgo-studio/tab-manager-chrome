// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions:
      | 'Remove from windows list'
      | 'Push to tabs list'
      | 'Update tab in tabs list'
      | 'Remove from tabs list'
      | "Update tab's focus in tabs list";
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    'Push to tabs list': 'ChromeEventType';
    'Push to windows list': 'ChromeEventType';
    'Remove from tabs list': 'ChromeEventType';
    'Remove from windows list': 'ChromeEventType';
    'Update tab in tabs list': 'ChromeEventType';
    "Update tab's focus in tabs list": 'ChromeEventType';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    ACTIVE_CHANGED: 'ChromeEventType';
    TAB_CLOSED: 'ChromeEventType';
    TAB_CREATED: 'ChromeEventType';
    TAB_UPDATED: 'ChromeEventType';
    WINDOW_CLOSED: 'ChromeEventType';
    WINDOW_CRAETED: 'ChromeEventType';
  };
  eventsCausingDelays: {};
  matchesStates: 'DONE' | 'Wating for task';
  tags: never;
}
export interface Typegen1 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    'Call all chrome windows': 'done.invoke.Current window machine.Loading:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: 'Call all chrome windows';
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    'request calculation': 'Request calculating';
  };
  eventsCausingServices: {
    'Call all chrome windows': 'Retry' | 'xstate.init';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'Failed'
    | 'Loaded'
    | 'Loaded.Failed'
    | 'Loaded.Idle'
    | 'Loaded.Success'
    | 'Loaded.Worker'
    | 'Loading'
    | 'Terminate'
    | { Loaded?: 'Failed' | 'Idle' | 'Success' | 'Worker' };
  tags: never;
}
