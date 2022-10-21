import { assert } from "chai";
import { interpret } from "xstate"
import { currentTabListMachine } from "./current-tab-list.machine";

const service = interpret(currentTabListMachine);

let state = service.initialState;

service.onTransition(s => state = s).start();


describe('[Machine test]', () => {
  it('cheking getting all data works', done => {
    if (state.matches('Get all data.Loaded')) {
      done();
    }
  })

  // it('check calculation is working fine', done => {
  //   if (state.matches('idle')) {
  //     service.send({ type: 'Update list', commnad: 'Update'})
  //   }
  // })
})