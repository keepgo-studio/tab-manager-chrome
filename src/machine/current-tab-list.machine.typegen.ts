// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions:
      | 'WINDOW_CLOSED'
      | 'TAB_CRAETED'
      | 'TAB_UPDATED'
      | 'TAB_MOVED'
      | 'TAB_CLOSED'
      | 'ACTIVE_CHANGED'
      | 'Send context data';
    services: never;
    guards: 'ACTIVE_CHANGED';
    delays: never;
  };
  eventsCausingActions: {
    ACTIVE_CHANGED: 'Working';
    'Send context data': 'Working';
    TAB_CLOSED: 'Working';
    TAB_CRAETED: 'Working';
    TAB_MOVED: 'Working';
    TAB_UPDATED: 'Working';
    WINDOW_CLOSED: 'Working';
    WINDOW_CREATED: 'Working';
    'get context data': 'xstate.init';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    ACTIVE_CHANGED: 'Working';
    TAB_CLOSED: 'Working';
    TAB_CRAETED: 'Working';
    TAB_MOVED: 'Working';
    TAB_UPDATED: 'Working';
    WINDOW_CLOSED: 'Working';
    WINDOW_CREATED: 'Working';
  };
  eventsCausingDelays: {};
  matchesStates: 'Finished' | 'Start';
  tags: never;
}
