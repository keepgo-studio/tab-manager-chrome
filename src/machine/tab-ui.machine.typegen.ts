// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'xstate.after(1)#Tab.Hover.Opening': {
      type: 'xstate.after(1)#Tab.Hover.Opening';
    };
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
    'open tab or open saved window with new window': 'mousedown';
    'remove the tab or remove the tab from idb': 'remove';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'Clicked'
    | 'Hover'
    | 'Hover.Opened'
    | 'Hover.Opening'
    | 'Removed'
    | 'idle'
    | { Hover?: 'Opened' | 'Opening' };
  tags: never;
}
