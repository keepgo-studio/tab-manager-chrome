// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    'Hide dialog': 'mouseleave';
    'Show dialog': 'mouseenter';
    toggle: 'Toggle';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    'list is not opened': 'Toggle';
    'list is opened': 'Toggle';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'Deleted'
    | 'idle'
    | 'idle.Closed'
    | 'idle.Hover'
    | 'idle.Opened'
    | { idle?: 'Closed' | 'Hover' | 'Opened' };
  tags: never;
}
