import { createMachine } from 'xstate';
import {
  ChromeEventType,
  MessageEventType,
  UsersEventType,
} from '../shared/events';
import { sendToFront } from '../utils/utils';

export const enum MessageStyle {
  'top',
  'bottom',
}

export const messageMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QFk6wIYwHQCUwGMwBLANzAAJYAXdKgV1gGIBlACwHsB3IgOynIC2aTGADaABgC6iUAAd2sIlSLseMkAA9EAJnEBWLAE4AzAHYALAA5zFgIzbb4w+YA0IAJ6JbxvQF9fbqiwGNgAIqpgjBLSSCDyisqq6loI2oYAbFh6bp4Ilsb+ASA87BBw6kEhYLgExGSUNPTwsfFKKmqxKebaOYiWhljGQ8MjI-6BwmER6q2JHaApxoYGS+LpTnYOTq4eiIa2WPmjxwVFlSIzCm1JnYgAtOm9CA+FvkA */
  createMachine(
    {
      tsTypes: {} as import('./message.machine.typegen').Typegen0,
      initial: 'Receive status',
      schema: {
        events: {} as {
          type: 'Showing message';
          status: MessageEventType;
          command: UsersEventType | ChromeEventType | undefined;
        }, // check current-tab-list.machine and saved-tab-list.machine
      },
      states: {
        'Receive status': {
          on: {
            'Showing message': {
              target: 'Done',
            },
          },
        },
        Done: {
          entry: 'send to front message data',
          always: {
            target: 'Receive status',
          },
        },
      },
      id: 'Message',
    },
    {
      actions: {
        'send to front message data': (_, event) => {
          if (event.command === undefined) return;

          if (!(event.command in UsersEventType)) return;

          sendToFront({
            discriminator: 'IFrontMessage',
            sender: '[xstate-message-machine]',
            /** @type {MessageEventType} */
            command: event.status,
            data: { message: event.command },
          });
        },
      },
    }
  );
