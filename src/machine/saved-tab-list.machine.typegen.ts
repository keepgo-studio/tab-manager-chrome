// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.db.Start:invocation[0]': {
      type: 'done.invoke.db.Start:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.indexed-db': {
      type: 'done.invoke.indexed-db';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.indexed-db': {
      type: 'error.platform.indexed-db';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    'open idb': 'done.invoke.db.Start:invocation[0]';
    'transaction idb': 'done.invoke.indexed-db';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {};
  eventsCausingServices: {
    'open idb': 'Open' | 'xstate.init';
    'transaction idb':
      | 'Request'
      | 'done.invoke.db.Start:invocation[0]'
      | 'xstate.init';
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'Failed' | 'Loading' | 'Start' | 'Success';
  tags: never;
}
export interface Typegen1 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.db-machine': {
      type: 'done.invoke.db-machine';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.db-machine': {
      type: 'error.platform.db-machine';
      data: unknown;
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
    'Receive data': 'done.invoke.db-machine';
    'send command': 'Request data';
    'send message status':
      | 'done.invoke.db-machine'
      | 'error.platform.db-machine';
    'send open command': 'Open db server';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'DB' | 'Show message' | 'Terminate' | 'idle';
  tags: never;
}
