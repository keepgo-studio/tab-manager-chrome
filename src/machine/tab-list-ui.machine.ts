import { createMachine } from "xstate";


export const tabListUiMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBUCGAjABAGwJawBdMBXXAOlwmzDIHkAHMAO0gGIBtABgF1FR6A9rFwFcApnxAAPRAFZOANjIAOWQE4AzBoDsugEwBGACycNAGhABPRHoVqyBhU4UHlRjWtl6NAXx8W0LDxCEnJKajIAYWwhNi5eJBBBYVFxSRkEL04yUwMDNTVVBW09QotrBEcDB2d1TnqCowVlPwCMHHwiUgoqGgAJAQA3MAAnVmQBKChqeMlkkTEJRIyNWWqFTk1ZZU5ZDSNteXMrGwMNGqdtA8M9Tm0z1pBAjpDu8P6h0fHJ6bB2AwS-CECzSy0Qq3Wm1WOz2ByO5XBhguClk2g0pgUtgUj2ewS6YV6rBGYAAtp9MAR2njZol5qklqAMsoDHoctodmp6oZOPlZAjKiiVMphZpDE0tIUcVTOqEetRWGTiLAwNRUMMaUCUot0ohmay7hyuQYeZ5+Xomjk9LplPsrkZHEY9FKgjLSAqBEqwMwCKMNUlgfSdQhHfz8kYyFpI9pPEZUUYmn5-CAmAIIHBJLjXeQACIqsA+iBzAPasEIYr8zGyZFozjeG3KNTOl74uU0BjMSBFrWgxmIFzKMhqQzKPTMvLuNFmlyDgoFTg2jTCowtJOZ14EiLRWKF2nFnvSPuuQfD0d5Yw6Y4VAyycP1O-Lq7aedqbGr6Xr1tkAbDEZdkEMg8ED0UoyHUHR4w8NQDHuS9EGg85HGcXQ7EQ3YmzxWV3j-QNS1caowLtSDoLOCsqzveoXCHNFbF8N8XXXbCS17BAAFoFH5FjvBnWdDhvHRlBKWi-CAA */
createMachine({
  tsTypes: {} as import('./tab-list-ui.machine.typegen').Typegen0,
  predictableActionArguments: true,
  initial: 'idle',
  on: {
    mouseenter: {
      target: '.idle',
      actions: 'Show dialog',
    },
  },
  states: {
    Deleted: {
      type: 'final',
    },
    idle: {
      initial: 'Hover',
      states: {
        Opened: {
          entry: 'toggle',
          always: {
            target: 'Hover',
          },
        },
        Closed: {
          entry: 'toggle',
          always: {
            target: 'Hover',
          },
        },
        Hover: {
          on: {
            Toggle: [
              {
                target: 'Closed',
                cond: 'list is not opened',
              },
              {
                target: 'Opened',
                cond: 'list is opened',
              },
            ],
          },
        },
      },
      on: {
        'remove tab list': {
          target: 'Deleted',
        },
        mouseleave: {
          target: '#Tab list ui',
          actions: 'Hide dialog',
        },
      },
    },
  },
  id: 'Tab list ui',
}, {
  guards: {
    'list is opened': () => false,
    'list is not opened': () => false,
  },
  actions: {
    'Hide dialog': () => {},
    'Show dialog': () => {},
    'toggle': () => {},
  }
})