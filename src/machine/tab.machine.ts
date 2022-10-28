import { createMachine } from "xstate";

export const tabMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBUCGAjAdACQPYDcwAnAYiLAFsCwBtABgF1FQAHXWASwBcPcA7ZiAAeiAJwA2AByZJAJgDMdAIwBWeZIDsSgCyqANCACeiJbKWYl48Vrp0V40ZIniAvi4NoseQqSoBXWDAAGzBUQnomJBA2Th5+QREEFUkVTA15URUNWVFZFVlteQNjBEl5TFtbFVsNbWq67TcPDEwOCBCSf0CwPi5iCMEY7l4BKMTk1PEC0W1HSTkMyWKTeVTKyvntcVtMppBPTABhII4AYwBrSBIBqKG40dBE9W1MDOT1DXFVOo1lhFNxJgrMC6LItKJ5Fp5HtPJ1cAFILgAO58G6sdjDeJjRBZP4AoHA7ZgpQQqFudwgPi4CBwQQHbzEQYY+4JRDpWQyFS6OpmJR0TKyP6iDQEqzpKR0SHaPIwloAEWCYD6TNiI1Z-zokhedlksiq8nk2m0vyMJjMFkJdGlxpSyVlWDaIRVmIewkQ2jKmByli+BQKn1EeLBFpBxNJSmhFIOxzOlwgzpZ2IQetSnyttRJAONRVNGvKPusktkcnEsw09oTaqTgdzAFpUqJG432aIlEpNGDyS4gA */
createMachine({
  tsTypes: {} as import("./tab.machine.typegen").Typegen0,
  predictableActionArguments: true,
  schema: {
    events: {} as 
    | { type: 'mousedown' }
    | { type: 'mouseenter' }
    | { type: 'mouseleave' }
    | { type: 'remove' }
  },
  on: {
    mousedown: {
      target: '.Clicked',
    },
  },
  initial: 'idle',
  states: {
    Hover: {
      entry: 'show close button',
      on: {
        remove: {
          target: 'Delete',
        },
        mouseleave: {
          target: 'idle',
        },
      },
    },
    Delete: {
      type: 'final',
    },
    idle: {
      on: {
        mouseenter: {
          target: 'Hover',
        },
      },
    },
    Clicked: {
      entry: 'open tab',
      always: {
        target: 'idle',
      },
    },
  },
  id: 'Tab',
}, {
  actions: {
    "open tab": () => {},
    "show close button": () => {}
  }
})
