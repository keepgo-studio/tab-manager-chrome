import { createMachine } from "xstate";

export const tabUiMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBUCGAjAdACQPYDcwAnTAeQAcwA7ASyqgGIAPWAF1VbE1QDNOiAFAEYAlAzRY8hEhWp0oAbQAMAXUShyuWDVY1cVdSCaIArADYAHJiEAWJWYBM9pQE4zAZhsuANCACeiA4OJpguYS5C5gDsNg5mShYWAL5JvhI4BMQMALa4AK6wkLgA7lTKakggmtq6+obGCC5RITYWNp4udi4mSkK+AQhxNqFCZuYOLg42JpMmKWkYGdIMRGC5hOWG1Tp6BpUNTS1tHV09ff6IQk6YMWET7Wcm7fMg6VJZuQVgADZgqBuqLZaHZ1faXGzDJRQqFmKIWMxmNw2KL9cFKawIxwOCwmExCJTuZKpV6LGgQX45fKFaj8TaVba1PagBq2SHQ+xwhFIlEXBBCSYYsbwpR4-GWdwvdIAYW+NAAxgBrSAMOkaYGM+qIQ6YVrtLynXqowZXEZjMJRbEmCzdFLEqi4CBwQxvTIyShUSBAmq7TUIRFCTAOIQWKJCdxKKbuWE2I1OAPhbpuEVRZpRFySxbvN1yehekFMoyIdxBwOedwWkzNaImWMRnXhYIJUbmObEl3SPMasGDKLuUvtCtV2E13lmYYJysmIIp0MODNYABKa0yEE7Pu7+Jc6NDiXce4RVpiRrcNy8TX3Y3D5fnmDJvzXoOZiFiRtsZnrYR6Ioh5bGN5l8pKqu9LquuT58lcwxTGECI2GGMwirWIS3BETgxHiZiRPOD4Fg0AC0ZhGnhDh9gmZFkRKtpAA */
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
        mousedown: {
          target: 'Clicked',
        },
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
        target: 'Hover',
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
