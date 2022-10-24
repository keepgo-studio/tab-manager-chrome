// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.after(500)#Tab list ui.List closed.opening': {
      type: 'xstate.after(500)#Tab list ui.List closed.opening';
    };
    'xstate.after(500)#Tab list ui.List opened.opening': {
      type: 'xstate.after(500)#Tab list ui.List opened.opening';
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
    | 'List closed.Hover'
    | 'List closed.opened'
    | 'List closed.opening'
    | 'List opened'
    | 'List opened.Hover'
    | 'List opened.opened'
    | 'List opened.opening'
    | {
        'List closed'?: 'Hover' | 'opened' | 'opening';
        'List opened'?: 'Hover' | 'opened' | 'opening';
      };
  tags: never;
}
