// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
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
    TAB_CLOSED: 'Update list';
    TAB_CRAETED: 'Update list';
    TAB_MOVED: 'Update list';
    TAB_UPDATED: 'Update list';
    WINDOW_CLOSED: 'Update list';
    WINDOW_CREATED: 'Update list';
    'send status to message machine': '';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    FOCUS_CHANGED: 'Update list';
    TAB_CLOSED: 'Update list';
    TAB_CRAETED: 'Update list';
    TAB_MOVED: 'Update list';
    TAB_UPDATED: 'Update list';
    WINDOW_CLOSED: 'Update list';
    WINDOW_CREATED: 'Update list';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'Get all data'
    | 'Get all data.Failed'
    | 'Get all data.Loaded'
    | 'Get all data.Loading'
    | 'Show message'
    | 'Terminate'
    | 'Updated'
    | 'idle'
    | { 'Get all data'?: 'Failed' | 'Loaded' | 'Loading' };
  tags: never;
}
