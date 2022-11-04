// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': { type: '' };
    'done.invoke.db.Online.delete saved tab:invocation[0]': {
      type: 'done.invoke.db.Online.delete saved tab:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
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
    'done.invoke.db.Start:invocation[0]': {
      type: 'done.invoke.db.Start:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'error.platform.db.Online.delete saved tab:invocation[0]': {
      type: 'error.platform.db.Online.delete saved tab:invocation[0]';
      data: unknown;
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
    'error.platform.db.Start:invocation[0]': {
      type: 'error.platform.db.Start:invocation[0]';
      data: unknown;
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    'delete saved tab': 'done.invoke.db.Online.delete saved tab:invocation[0]';
    'delete saved window': 'done.invoke.db.Online.delete saved window:invocation[0]';
    'get all saved windows': 'done.invoke.db.Online.get all saved windows:invocation[0]';
    'open server': 'done.invoke.db.Start:invocation[0]';
    'save window': 'done.invoke.db.Online.save window:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    'send to parent':
      | 'done.invoke.db.Online.delete saved tab:invocation[0]'
      | 'done.invoke.db.Online.delete saved window:invocation[0]'
      | 'done.invoke.db.Online.get all saved windows:invocation[0]'
      | 'done.invoke.db.Online.save window:invocation[0]'
      | 'error.platform.db.Online.delete saved tab:invocation[0]'
      | 'error.platform.db.Online.delete saved window:invocation[0]'
      | 'error.platform.db.Online.get all saved windows:invocation[0]'
      | 'error.platform.db.Online.save window:invocation[0]'
      | 'error.platform.db.Start:invocation[0]';
    'set connection with parent': '' | 'done.invoke.db.Start:invocation[0]';
  };
  eventsCausingServices: {
    'delete saved tab': 'REQUEST';
    'delete saved window': 'REQUEST';
    'get all saved windows': 'REQUEST';
    'open server': 'OPEN';
    'save window': 'REQUEST';
  };
  eventsCausingGuards: {
    'delete saved tab': 'REQUEST';
    'delete saved windows': 'REQUEST';
    'get all saved windows': 'REQUEST';
    'save window': 'REQUEST';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'Error'
    | 'Offline'
    | 'Online'
    | 'Online.delete saved tab'
    | 'Online.delete saved window'
    | 'Online.get all saved windows'
    | 'Online.idle'
    | 'Online.save window'
    | 'Start'
    | 'Success'
    | {
        Online?:
          | 'delete saved tab'
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
    'get all saved data': 'REMOTE.OPEN' | 'REMOTE.RECEIVE';
    'open new window': 'LOCAL.REQUEST';
    'receive data': 'REMOTE.RECEIVE';
    'request db with data': 'LOCAL.REQUEST';
    'request open db': 'LOCAL.OPEN';
    'send to message machine': 'REMOTE.RECEIVE';
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    DELETE_SAVED_TAB: 'LOCAL.REQUEST';
    DELETE_SAVED_WINDOW: 'LOCAL.REQUEST';
    OPEN_SAVED_WINDOW: 'LOCAL.REQUEST';
    SAVE_WINDOW: 'LOCAL.REQUEST';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'Connected to db'
    | 'Connected to db.Done'
    | 'Connected to db.Ready'
    | 'Connected to db.Update'
    | 'Send to message'
    | 'idle'
    | { 'Connected to db'?: 'Done' | 'Ready' | 'Update' };
  tags: never;
}
