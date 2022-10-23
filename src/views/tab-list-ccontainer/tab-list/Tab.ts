/**
 * mini-first
 * mini
 * 
 * tablet
 * 
 * side
 */

import { interpret } from "xstate";
import { EventlessComponent } from "../../../core/Component.core";
import { tabMachine } from "../../../machine/tab.machine";

const uiState = interpret(tabMachine);

class Tab extends EventlessComponent {
        
}