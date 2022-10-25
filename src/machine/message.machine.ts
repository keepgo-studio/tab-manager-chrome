import { createMachine } from "xstate";

export const enum MessageStyle {
  'top',
  'bottom'
}

export const messageMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFk6wIYwHQCUwGMwBLANzAAJYAXdKgV1gGIBlACwHsB3IgOynIC2aTGADaABgC6iUAAd2sIlSLseMkAA9EAZgAcANiwB2XQEYArLr0BOfeIAsAJgA0IAJ47H140e3aj+ham2o7a1gC+ka487BBw6qiwGNh4hKQU1LQM6vKKyqrqWggWRlj2RraOjuLWjnbi+q4eCH7iWI6+2vrVFQG6EeGuiclgWGxcgsIwOQpKKmpImoj6XVjmVSHa5uZGpvbmje6e3kad5vbW4o772hZRIMMiM3nzhYimNWUV3dW19YFNRDXUw+PxGA66bZGezaeyRSJAA */
createMachine({
  tsTypes: {} as import("./message.machine.typegen").Typegen0,
  initial: 'Receive status',
  states: {
    'Receive status': {
      on: {
        'Showing message': {
          target: 'Done',
        },
      },
    },
    'Done': {
      type: 'final',
    },
  },
  id: 'Message',
});