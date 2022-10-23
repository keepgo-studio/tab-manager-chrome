import { ActorRef, createMachine, spawn } from "xstate";


export const tabListMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5QBUCGAjABAGwJawBcA6XCbMAYgFsB7AV1jDADsCwAnAbQAYBdRUAAcasXAVw1mAkAA9EAJgCsATiIB2ACzLtANh3dlADnkBmbiYA0IAJ6IAjCcVFuL7jsOGNiu15MaAvv5WaFh4hEQAEjQAbhzU9IzkqLE8-EggwqLiktJyCEqqmtrKegbGZpY2iIYmzq5aJsoman5ugcEYOPjEUbHs8QxgSSl2aUIiYhJS6XktOkQa7oZ28hp2itxqy1a2CA5qRBsuS14+in7tICFd4QAy3ZgA8oIskAOMLGxcfNKZkzkzaqaIiGZSKQxqRRqHR2NTKNQ7apOI7cBpNFoaAyXa5hAgUADG2BEYFSvwm2WmoDyUMRe3k8z0OmhajUdk8Jj0ymxnVxFBoL2YpPSfwpuUQNKq+R0TjsejmqJ0ygMam5oW6FFQEAguGYUEwBAwQvGWSmYoQigtRHkbK2PjWOg0rNpjgOjM0ULU9PWJkCQRAzBoEDg0hx3RIZDAZJNAKp9ihC1lTOUi2t+kquxWB0TLXk9O0dm4djsqpuPRiHCj-0psnFjiIDkUXkMhfkTQ08lp8KIbo09pzpnkJdxRHuhCeAsgldFgL23Fz9aUc8MMIh8ghtJ83EOLgL7aaTLZhiH3SnppnylpAFp5q5b3fCwFfUA */
createMachine({
  schema: {
    context: {} as {
      tabs: Array<ActorRef<any>>;
    },
  },
  on: {
    close: {
      target: '.idle',
    },
    open: {
      target: '.List Opened',
    },
    'adding tab': {
      actions: 'adding tab to list',
    },
  },
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
      entry: 'show dialog',
      on: {
        mouseleave: [
          {
            target: 'idle',
            cond: 'is not opened',
          },
          {
            target: 'List Opened',
            cond: 'is opened',
          },
        ],
      },
    },
    'List Opened': {
      on: {
        mouseenter: {
          target: 'Hover',
        },
      },
    },
  },
  id: 'Tab list',
}, {
})