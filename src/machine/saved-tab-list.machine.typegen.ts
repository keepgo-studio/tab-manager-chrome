// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'done.invoke.db.Online.delete saved window:invocation[0]': {
      type: 'done.invoke.db.Online.delete saved window:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.db.Online.get all saved windows:invocation[0]': {
      type: 'done.invoke.db.Online.get all saved windows:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.db.Online.save window:invocation[0]': {
      type: 'done.invoke.db.Online.save window:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.db.Online.delete saved window:invocation[0]': {
      type: 'error.platform.db.Online.delete saved window:invocation[0]';
      data: unknown;
    };
    'error.platform.db.Online.get all saved windows:invocation[0]': {
      type: 'error.platform.db.Online.get all saved windows:invocation[0]';
      data: unknown;
    };
    'error.platform.db.Online.save window:invocation[0]': {
      type: 'error.platform.db.Online.save window:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    'delete saved window': 'done.invoke.db.Online.delete saved window:invocation[0]';
    'get all saved windows': 'done.invoke.db.Online.get all saved windows:invocation[0]';
    'save window': 'done.invoke.db.Online.save window:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    'open idb': 'OPEN';
    'send status':
      | 'done.invoke.db.Online.delete saved window:invocation[0]'
      | 'done.invoke.db.Online.get all saved windows:invocation[0]'
      | 'done.invoke.db.Online.save window:invocation[0]'
      | 'error.platform.db.Online.delete saved window:invocation[0]'
      | 'error.platform.db.Online.get all saved windows:invocation[0]'
      | 'error.platform.db.Online.save window:invocation[0]';
    'send to parent':
      | 'done.invoke.db.Online.delete saved window:invocation[0]'
      | 'done.invoke.db.Online.get all saved windows:invocation[0]'
      | 'done.invoke.db.Online.save window:invocation[0]'
      | 'error.platform.db.Online.delete saved window:invocation[0]'
      | 'error.platform.db.Online.get all saved windows:invocation[0]'
      | 'error.platform.db.Online.save window:invocation[0]';
  };
  eventsCausingServices: {
    'delete saved window': 'REQUEST';
    'get all saved windows': 'REQUEST';
    'save window': 'REQUEST';
  };
  eventsCausingGuards: {
    'delete saved windows': 'REQUEST';
    'get all saved windows': 'REQUEST';
    'save window': 'REQUEST';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'Error'
    | 'Offline'
    | 'Online'
    | 'Online.delete saved window'
    | 'Online.get all saved windows'
    | 'Online.idle'
    | 'Online.save window'
    | 'Success'
    | {
        Online?:
          | 'delete saved window'
          | 'get all saved windows'
          | 'idle'
          | 'save window';
      };
  tags: never;
}
export interface Typegen1 {
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
    'receive data': 'REMOTE.RECEIVE';
    'request db with data': 'LOCAL.REQUEST';
    'request open db': 'LOCAL.OPEN';
    'send to message machine': 'messaging';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates: 'Connected to db' | 'Send to message' | 'idle';
  tags: never;
}
