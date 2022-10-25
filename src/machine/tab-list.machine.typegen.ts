// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.after(300)#Tab list ui.List closed.Closing': {
      type: 'xstate.after(300)#Tab list ui.List closed.Closing';
    };
    'xstate.after(300)#Tab list ui.List opened.Opening': {
      type: 'xstate.after(300)#Tab list ui.List opened.Opening';
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
    'Hide dialog': 'mouseleave';
    'Set tab list close': 'close';
    'Set tab list open': 'open';
    'Show dialog': 'mouseenter';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'Deleted'
    | 'List closed'
    | 'List closed.Closed'
    | 'List closed.Closing'
    | 'List closed.Hover'
    | 'List opened'
    | 'List opened.Hover'
    | 'List opened.Opened'
    | 'List opened.Opening'
    | {
        'List closed'?: 'Closed' | 'Closing' | 'Hover';
        'List opened'?: 'Hover' | 'Opened' | 'Opening';
      };
  tags: never;
}
