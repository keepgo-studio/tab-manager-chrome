// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'xstate.after(1)#Tab.Hover.Opening': {
      type: 'xstate.after(1)#Tab.Hover.Opening';
    };
    'xstate.init': { type: 'xstate.init' };
    'xstate.stop': { type: 'xstate.stop' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    'display close button': '' | 'mouseenter';
    'opacity close button': 'xstate.after(1)#Tab.Hover.Opening';
    'open tab': 'mousedown';
    'remove & hide close button':
      | 'mousedown'
      | 'mouseleave'
      | 'remove'
      | 'xstate.after(1)#Tab.Hover.Opening'
      | 'xstate.stop';
    'remove the tab': 'remove';
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
