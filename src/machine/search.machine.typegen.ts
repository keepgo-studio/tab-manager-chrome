// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.fetch actor': {
      type: 'done.invoke.fetch actor';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.fetch actor': {
      type: 'error.platform.fetch actor';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    'fetch and return': 'done.invoke.fetch actor';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {
    'fetch and return': 'update';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | 'Loading'
    | 'Search mode'
    | 'Search mode.Ready'
    | 'Search mode.Start'
    | 'Search mode.prev'
    | { 'Search mode'?: 'Ready' | 'Start' };
  tags: never;
}
