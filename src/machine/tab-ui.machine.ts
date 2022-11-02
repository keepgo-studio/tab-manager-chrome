import { createMachine } from "xstate";

export const tabUiMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBUCGAjAdACQPYDcwAnTAeQAcwA7ASyqgGIAPWAF1VbE1QDNOiAFAEYAlAzRY8hEhWp0oAbQAMAXUShyuWDVY1cVdSCaIArAA4AzJiEAWJQDYTAJic2LToQE57AGhABPUwsbTE8wzxMIjwsAdmCAX3i-CRwCYgYiMABbNOU1JBBNbV19Q2MEISUlGNDYkwtqmJihewszP0CEG08lTG6wkxjHE3snJU9E5IxU6QYcgFdYMAAbMFRCPMMinT0DAvKhSMwqqsqzM09KzzaOxBtu63sni0Gle-szJ8mQFJoIVbmuEWYGo-E2BW2JT2oAORxOSjOFyuNwCpgRjyeQiEZhsg0+n2+KQAwssaABjADWkAY4I0Wh2pX2iAs9k8fQ8ZhiOJiJhsZhMJluFQcfXCNhcPXs2KETkJGEBwIguAA7lRaYV6VCyncnELKvZRWFxU5JdLZd8qLgIHBDCkpMQyJQqJAtprdtqEDEnGZMPZmtcLJ4nA1zhYhSZKqFwpZ7G93DEInLJGkZE75K7iu6mQgLCzMMH7kp3CypRdw1jDZ44jHzK4kzNiBmGdCjIhvT6C3Zi5iy6ic3Eo2EE5zvcGhBZ6wAlbJpCBNrXZrHB6z+uO516eIU2J6VpSRMyuYf1v6redZmGmGJbgWVwNmcbFvf1knkqlziFuxkXio9TBDEYeD0uZVJ4NhCgeg4RE8e4Hl6QhJmeX6tggAC0vh9mhxwnDyPKxhECaOIkiRAA */
createMachine({
  tsTypes: {} as import('./tab-ui.machine.typegen').Typegen0,
  schema: {
    events: {} as
      | { type: 'mousedown' }
      | { type: 'mouseenter' }
      | { type: 'mouseleave' }
      | { type: 'remove' },
  },
  predictableActionArguments: true,
  on: {
    mousedown: {
      target: '.Clicked',
    },
  },
  initial: 'idle',
  states: {
    Hover: {
      exit: 'remove & hide close button',
      initial: 'Opening',
      states: {
        Opened: {
          entry: 'opacity close button',
          type: 'final',
        },
        Opening: {
          entry: 'display close button',
          after: {
            '1': {
              target: '#Tab.Hover.Opened',
              actions: [],
              internal: false,
            },
          },
        },
      },
      on: {
        remove: {
          target: 'Removed',
        },
        mouseleave: {
          target: 'idle',
        },
      },
    },
    Removed: {
      entry: 'remove the tab',
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
    'remove the tab': () => {},
    'remove & hide close button': () => {},
    'display close button': () => {},
    'opacity close button': () => {},
  }
})
