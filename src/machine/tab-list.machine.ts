import { ActorRef, createMachine, spawn } from "xstate";


export const tabListMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBUCGAjABAGwJawBdMBXXAOgBl8iBjbAe1kjIGEHZcA7KAYgA9CqAmDKoAZsIBOACgDMABnkBKHmix5CJclU11GzNoy5QA2vIC6iUAAcjBXPU5WQfRLIDsADjIAmAJwAjABsfkGyfp5+Pj4ArO4ANCAAnohBATFkQVlBMUEALPKynjGFAL6liWo41FqUNXpMEKzskDwAtvTETGCcUmaWSCC2HPaOzq4IHt7+waHhkdFxiSkIWe6Z2TGBAbEBe+WVGNWapHW6LU0AEvQAbmCS7Z1M2GCod-3Ow7ijToMTU75AiEwhEorEEslEO4smQSopFJ4QvIfO48gcQFUNERTjpaBcyNc7g8AEpgDp3TAEI5Yj6DL4-capTzyWF5ALuHxBdzydzcvwxZaIPyyPJkTyyCVslE7AKyHzozE1HE1ejWHrMADyas4xn4gmEogk9zkihUipO2hV2s12uMtJsdgcv1A-3cfkyuRReXcRXCqMFCHSovhihiYZRMW9aIqGOpSstmlV6qaWuTjy6YB6fQsn0dYz+bjdHqCXp94r8-shCB88gyfnrFfkezyLcK0cO6njZyISc4zEJ93Tz1e7xzdLzzpchfdORLqLLfryAYUovFEr2nj5uSCCrjFu7mF7-dug9J5LAlL3BHtQwnjNWngCZD88jCtfk3oCnjyQQD3tkZDBFkMTRD6AR5LEu6dhaPC9je9JOveEEBnEoo+Hk9bFCBYZRAEUHHNiuA8A0YDwXeBYIMhVZ7D4sJrjEHjehEEGyOUMacPQEBwM45qEQeJFNIYHDcLmIyIRRsSij6oQfl+qKyFssgBmkQSAZs+SFMUZQxrxtS4pgAnNPoECid84kuogDEZJuJR5J49k+Ii3rKYEdESo5YT5EUfj4Vien1PiA6SKZDISTkz4xOK4bFO4sqxAG3IshK7nCrKQQfr5Xb6QJIXmVO1avmQ0npWym55ApwooZyGzARpRQlKxOlXv5ibWimtoieOYn5hZ1a5IBsmeLEnKBDySnUZGsIhmGIHuJGsWZfu+lHu1ya5T1+UMesPjhHO0Q7eEApVtE7pAiCYTikEzIxItfHLW1BInsFXVmRtEycuscr+BKJYxF+j4Bjt3jZHV6QMXK7axtBd1WmtL2hb1NbeAEg3DSEKM+spGQhrW4ZzVGt21AAImALzCCZ8N5RMxS0eysWReEyKeH+zJislATCldV0fjuTXQ1o62ThMAC0v5VsLO3Pg2fgtt66HYe4bGlEAA */
createMachine({
  tsTypes: {} as import('./tab-list.machine.typegen').Typegen0,
  schema: {
    context: {} as {
      shouldShowDialog: boolean;
      isOpened: boolean;
    },
  },
  context: {
    shouldShowDialog: false,
    isOpened: false
  },
  predictableActionArguments: true,
  on: {
    open: {
      target: '.List closed',
      actions: 'Set tab list open',
    },
    close: {
      target: '.List opened',
      actions: 'Set tab list close',
    },
  },
  initial: 'List closed',
  states: {
    'List closed': {
      initial: 'Closing',
      states: {
        Closing: {
          after: {
            '300': {
              target: '#Tab list ui.List closed.Closed',
              actions: [],
              internal: false,
            },
          },
        },
        Closed: {
          on: {
            mouseenter: {
              target: 'Hover',
              actions: 'Show dialog',
            },
          },
        },
        Hover: {
          on: {
            mouseleave: {
              target: 'Closed',
              actions: 'Hide dialog',
            },
            'Remove tab list': {
              target: '#Tab list ui.Deleted',
            },
          },
        },
      },
    },
    'List opened': {
      initial: 'Opening',
      states: {
        Opening: {
          after: {
            '300': {
              target: '#Tab list ui.List opened.Opened',
              actions: [],
              internal: false,
            },
          },
        },
        Opened: {
          on: {
            mouseenter: {
              target: 'Hover',
              actions: 'Show dialog',
            },
          },
        },
        Hover: {
          on: {
            mouseleave: {
              target: 'Opened',
              actions: 'Hide dialog',
            },
            'Remove tab list': {
              target: '#Tab list ui.Deleted',
            },
          },
        },
      },
    },
    Deleted: {
      type: 'final',
    },
  },
  id: 'Tab list ui',
}, {
  actions: {
    'Hide dialog': (context, _) => context.shouldShowDialog = false,
    'Show dialog': (context, _) => context.shouldShowDialog = true,
    'Set tab list close': (context, _) => context.isOpened = false,
    'Set tab list open': (context, _) => context.isOpened = true
  }
})