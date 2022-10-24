import { ActorRef, createMachine, spawn } from "xstate";


export const tabListMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBUCGAjABAGwJawBdMBXXAOgBl8iBjbAe1kjPoAcwA7XDqAYgA9CqAmDKoAZiIBOACgCsABgUBKXmix5CJclS11GzNp25QA2goC6iUK0a4Cueh2sh+iAMwB2ABxkATACcAIwAbAEh7gHeAX5+cp4ANCAAnoghQXJkIdkhciEALAru3oruAL5lSeo41NqUtfpMECzsHJC8ALb0xEyc0uZWSCC2sPaOzkNuCF6+gaHhkdGx8UmpCNmeWTlywUFxQQcVVRg1WqT1egxNZAAS9ABuYFKd3UzYYKiPAy4jY04uUxm-mCYQiURicUSKUQnmyZEUSiU3jCCj8nnyRxA1U0RHOuloV2Yd0ezwASmAuo9MAQTjjvkNfg5-pM0t4FPD8kFPH4Qp4FJ4+QE5KtEAF3PkyN53NLOWi9kF3H5MdjanjakY2s0NSYBEIRGJJE95EpVCqzjp1a1DK0TPSbHYmRNQIDPAEsnk0flPMVIuiRQgMhLEUo5KG0XIvRjKljaaqLVoNdbOO0uj0wH0nnbhg7xgCPK73SFPd6pQE-dCEH4FJkArWywoDvkm0Uo8cNHGLkRE81iU8Xmn3p8wFnGbmWdMC7ki+iS778v73AoJVLpQdvIK8iFlbHzZ3MN3bg8++TKWBqTuCCOc8znaygmQAgoItWl54gt58iF-V73GRQtk5Fib0gnyOJt3bc1eA1K9RkdPMEFA-14glPx8lrEpANDGIgnA05cVwXhGmHSwfmvJ1XEQRCKwOPx4RXOQvC9KJQPKTEOHoCA4BcM18L3IitRtHhSNgsdb0rCMyG9cIl3fdF3B2dx-XSEI-22AoihKIpcJxOp8UwfiWmTCBhL+cipgYzJ10UfJvFsvxkS9JTgjo6V7IiApigCbSOz0gzeykEy4PHHkazkKUwxKN9FWFCs+XZaVXLFBUQiXbzd18wljIZMj4KrFSpJSzl13yeSxSQnktgA9xpy9QI0t4vSD21ITspEm8KPElSghk7w4h5YJ+UU6iJIREMw08CM33q3TLSMwzNUC0SOoYzY-EiadYjWyIYrWWI3RBMEIilEI2Tkaa1QTK0eyPALWtM3LeTIRVAmlIs5Hfbwgn9NbfBydT3AyBjFVbGMIIa2aFruoKxKrXxuqKvqwm670lMyYNUQFCIBS8c7yAAETAd4RCy+02rMxASlork3zCyJUW8b82UlBKgjFE6TqXLdox47RFvaqYAFovwrAXUIqCogA */
createMachine({
  tsTypes: {} as import('./tab-list.machine.typegen').Typegen0,
  schema: {
    context: {} as {
      shouldShowDialog: boolean;
      isOpened: boolean;
    },
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
      initial: 'opening',
      states: {
        opening: {
          after: {
            '500': {
              target: '#Tab list ui.List closed.opened',
              actions: [],
              internal: false,
            },
          },
        },
        opened: {
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
              target: 'opened',
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
      initial: 'opening',
      states: {
        opening: {
          after: {
            '500': {
              target: '#Tab list ui.List opened.opened',
              actions: [],
              internal: false,
            },
          },
        },
        opened: {
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
              target: 'opened',
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