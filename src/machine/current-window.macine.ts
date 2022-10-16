import { assign, createMachine, spawn } from 'xstate';
import { respond, send } from 'xstate/lib/actions';

interface IContext {
  data: CurrentWindowMapping;
  prevOccurWindowId: -1;
  prevOccurTabId: -1;
  occurWindowId: -1;
  occurTabId: -1;
}

const WorkerMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QHUD2AnA1mdA6ZAhgC4CWAdlAAQBmGlRBsmAxAMIAW6qAtmAKIA3MGSIAVAJ4AHMAG0ADAF1EoSalglSqMspAAPRACYArAA5cAFgDMAdiNyjBuQE4AjADYD5gDQhxiF5bmuE4hTtaeBk4mVrYAvrE+aFg4+MTkVLTo9IwsHFy8gsJiUrIuSkggquqa2hX6CMZmMXYOzu6ePn4NlpYWocauRuZG1m5G8YkY2HiEpBQ0dAxMbJw8-EIiEtIyBuUqahokWjr1jRY2LY6uHt6+iD0uwaHmciZuzga24wkgSdOpcwyixyK3y6yKW1klj2lQONROhlM51s9iu7VuXSscj6ISMpjkbksYWGE1+UxSs3SCyyS1yqwKG2K23MMKqh2OdURTQuqLaN06iAcZlCTg+TkcLhc5lJfwpaXmmWyyzya0KmxKMiMrLhR1qoFOSOavOuHTuCA81hx4vMBhs5hMLgMMvJeAAIgB5AByfGY8m11V1CIQQ2xPLc0SsQzGAoQJgMT36Jmslneb0s8R+ZFQEDgOllM3lQJpOR0bPhnIQNpjTjcuBuUVa1hcNZMzuSbq9fFLOo5+sQYycuAMYzc4Tkn1GwxjliRnlxJjxePM5ic0p++e7Ad7ekQAFo3DH97g5CeTyY5PawkmmxnYkA */
  createMachine(
    {
      tsTypes: {} as import("./current-window.macine.typegen").Typegen0,
      schema: {
        context: {} as IContext,
        events: {} as { type: 'ChromeEventType'; command: ChromeEventType; context:IContext },
      },
      predictableActionArguments: true,
      initial: 'Wating for task',
      states: {
        'Wating for task': {
          on: {
            ChromeEventType: [
              {
                target: 'DONE',
                cond: 'WINDOW_CRAETED',
                actions: 'Push to windows list',
              },
              {
                target: 'DONE',
                cond: 'WINDOW_CLOSED',
                actions: 'Remove from windows list',
              },
              {
                target: 'DONE',
                cond: 'TAB_CREATED',
                actions: 'Push to tabs list',
              },
              {
                target: 'DONE',
                cond: 'TAB_UPDATED',
                actions: 'Update tab in tabs list',
              },
              {
                target: 'DONE',
                cond: 'TAB_CLOSED',
                actions: 'Remove from tabs list',
              },
              {
                target: 'DONE',
                cond: 'ACTIVE_CHANGED',
                actions: "Update tab's focus in tabs list",
              },
            ],
          },
        },
        DONE: {
          always: {
            target: 'Wating for task',
          },
        },
      },
      id: 'Worker',
    },
    {
      guards: {
        "WINDOW_CRAETED": (_, event) => event.command === ChromeEventType.WINDOW_CREATED,
        "WINDOW_CLOSED": (_, event) => event.command === ChromeEventType.WINDOW_CLOSED,
        "TAB_CREATED": (_, event) => event.command === ChromeEventType.TAB_CREATED,
        "TAB_UPDATED": (_, event) => event.command === ChromeEventType.TAB_UPDATED,
        "TAB_CLOSED": (_, event) => event.command === ChromeEventType.TAB_CLOSED,
        "ACTIVE_CHANGED": (_, event) => event.command === ChromeEventType.ACTIVE_CHANGED,
      },
      actions: {
        'Push to windows list': (context, event) => {
          console.log(context.data);
          if (1) {
            respond({ type: 'Success' });
          } else {
            respond({ type: 'Failed' });
          }
        },
      },
    }
  );

export const CurrentWindowMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGECuAndYB2AXABAO4CW2EA9ofgLYCGAxgBalgB0AMubRKVAMQVsbUgDdyAazZpMOAiTKUaDZkI5ce2KAlHl6tXMXLYA2gAYAumfOJQAB3KxiBozZAAPRAFoATAA4ALKwA7ACMAKwAnAFhQTER3gBsADQgAJ6IIUG+rKZhCWEAzFGF-qb+viEAvpUp0lh4RKQUVHRMLGrcvHxgmOTorLYANvoAZn3UrHWyjQotyu2cnZra2GJ6ziYWVq72jhuuHgieIVGsCUHeBeVBEaa+vhHhKelHIdnhpgUhmaZBpgkFSL+aq1DD1ORNRStFRsRYQSCsACSEEGYD4ACUwABHVBwAh6Qb0VDDAyabZIEC7JyGbAHLwhf7BIL5XwJBIVW4FC7PRClQLeCIRQqmEIFVlCkIJEEgKYNeTNJRtVRwhEAMVoxFRED45LsDmpLgph08YW+OX8EX8Yv8zLy3jCPIQYUZvhuCT5CW+pV+0tlENmiphHXhEFYAGVUPR6HBYDqLDt9fsjV4rkEcpkTkLbhLWY7-AkIqxIhFzndHhFQq7fWDpvKofNlepIN03E5dZTEzS6Qg3mnTN4graQv5h-3yo6vt5WDayv5ElFTP98tWZHLIXMlWx1Zrm5jcOhUu2qUnQMaQgLWAUAUVmflvBnfI6goFF4vwvbXQ9-tUaiBsOR4XgCk-RmBVoQWdReATPYu2TI4wnvR1nRyV93zCT9bilX8QLrDcgxVUNkVRaCDVpOCfF8ApgmddCYlyK5zwnU4BSFAoRTFAtTSw0FV39MCG1hJtQwAdT6SR0BIk93HpIIqMlKIshOfsHmSNJEHyEJWCzWJfko9DyhXcFQPrTdgzVDUtUk2DTy8U0pwCAFRRtfIEntR1zio-xIh0rJAQCXxDNrddAwg7gEQjKMYysw0bKOEcwlYByvlTFy3LUp0r0SwUKklLzvHKMJArXANwMbMKIGisjYpNBJTES-Nkucu0HXSxJNJYwp7ndApvE+Iq+JMoMABUemoUh9DASru0nM5-nzH48kBG0JzNCtZ3nXxFzZfrjLw9pt0silj2s6SEAqHI-lyeS7mZe4nxfVCEPQrJMJ23CQqEKbyNq7Ikqc21XJal5jl+VgPhY594itcIf0qIA */
  createMachine(
    {
      tsTypes: {} as import('./current-window.macine.typegen').Typegen1,
      schema:{ 
        context: {} as IContext,
        events: {} as 
          | { type: 'Request calculating', command: ChromeEventType }
          | { type: 'Exit' }
          | { type: 'Retry' },
        actions: {} as { type: 'request calculation'; command: ChromeEventType; context: IContext}
      },
      predictableActionArguments: true,
      initial: 'Loading',
      states: {
        Loading: {
          invoke: {
            src: 'Call all chrome windows',
            onDone: [
              {
                target: 'Loaded',
              },
            ],
            onError: [
              {
                target: 'Failed',
              },
            ],
          },
        },
        Loaded: {
          initial: 'Idle',
          states: {
            Idle: {
              on: {
                'Request calculating': {
                  target: 'Worker',
                },
              },
            },
            Worker: {
              invoke: {
                id: 'worker-machine',
                src: WorkerMachine,
                onDone: 'Success',
                onError: 'Failed',
              },
              entry: 'request calculation',
            },
            Failed: {
              always: {
                target: 'Idle',
              },
            },
            Success: {
              always: {
                target: 'Idle',
              },
            },
          },
          on: {
            Exit: {
              target: 'Terminate',
            },
          },
        },
        Terminate: {
          type: 'final',
        },
        Failed: {
          on: {
            Retry: {
              target: 'Loading',
            },
          },
        },
      },
      id: 'Current window machine',
    },
    {
      actions: {
        'request calculation': send(
          (context, event) => ({ type: 'ChromeEventType', command: event.command, context }),
          { to: 'worker-machine' }
        ),
      },
    }
  );
