// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    'updating contents': 'done.invoke.Search.Update map:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {
    'updating contents': 'update';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'Search mode' | 'Update map' | 'idle';
  tags: never;
}
