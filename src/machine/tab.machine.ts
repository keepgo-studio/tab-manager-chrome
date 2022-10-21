import { createMachine } from "xstate";

export const tabMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBUCGAjAdASwgGzAGIBbAewFdYwwA7AFzACcBtABgF1FQAHU2bOtlI0uIAB6IAtABYAjADZMsgBwB2AKwAaEAE8pAZmkAmAL4ntaLAAlSANyaYAwnmwBjANaRCbTkhC9+QWFRCQRJWVlMOWlWeSMtXURZAE5FVnTY2VZ9dVl1OPUzCwxMG3tGJxcPL2ZZXx4+ASERP1CU9UxVbNl47T0EFLSM+SycvIKikEtSuyYSCioIUgB3Gh9RAKbg1qTlI0wjZWTY3sSw1Wko5Ov5ZOk94xVlSemyubJKMAJUe3W-TaCLVAoRkCiU+kOPQS-XCRxeJTejG8HA2jUBISkyWUmHk8lUqTU0IMsXh1lmSNq9X8aOaGIQ+n0kQZRm6pxhjNUZnMIBopAgcFE01wBFRgVpOzC6n0yj6Uniz25r3JmAAygALFYAAgg2FQeFIUFFWyB4ikI0wEMehNlYRUyVJM3Kqo1y01rn1VE16HIdDo2waYv9pvp8lYnWUuXybLl+lYDsRlTcnggmAA8txaJqXLA6Eb0RKjPJsdJVPIo0SEEZVPsMplspGJoqEcrnEnIImPNrdfrDf8aUG2sklNazlWa8NRg34vGW1Vk3nxcCpOoh9EThWstjayN6+Np02yeUFwOpLJpIpcfiixobTJWIUD8eTSD1Mp5LfpMl9FyTEA */
createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        mouseenter: {
          target: 'Hover',
        },
      },
    },
    Hover: {
      type: 'parallel',
      states: {
        'Show dialog': {},
        'Show close button': {},
        Clicked: {
          type: 'parallel',
          states: {
            'Open list': {},
            'Click dialog': {},
          },
          always: [
            {
              target: '.Click dialog',
              cond: 'Is mouse on dialog',
            },
            {
              target: '.Open list',
              cond: 'Is mouse on open button',
            },
          ],
        },
      },
      always: [
        {
          target: '.Show dialog',
          cond: 'Is mouse on first child',
        },
        {
          target: '.Show close button',
          cond: 'Is mouse on rest child',
        },
      ],
      on: {
        mousedown: {
          target: '.Clicked',
          internal: false,
        },
        mouseleave: {
          target: 'idle',
        },
      },
    },
  },
  id: 'Tab',
})