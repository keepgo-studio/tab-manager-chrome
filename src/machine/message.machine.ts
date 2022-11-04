import { createMachine } from "xstate";

export const enum MessageStyle {
  'top',
  'bottom'
}

export const messageMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFk6wIYwHQCUwGMwBLANzAAJYAXdKgV1gGIBlACwHsB3IgOynIC2aTGADaABgC6iUAAd2sIlSLseMkAA9EAJnEBWLAE4AzAHYALAA5zFgIzbb4w+YA0IAJ6JbxvQF9fbqiwGNgAIqpgjBLSSCDyisqq6loI2oYAbFh6bp4Ilsb+ASA87BBw6kEhYLgExGSUNPTwsfFKKmqxKebaOYiWhljGQ8MjI-6BwmER6q2JHaApxoYGS+LpTnYOTq4eiIa2WPmjxwVFlSIzCm1JnYgAtOm9CA+FvkA */
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
    Done: {
      always: {
        target: 'Receive status',
      },
    },
  },
  id: 'Message',
});