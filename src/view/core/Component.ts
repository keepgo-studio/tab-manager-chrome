import { LitElement } from "lit";
import { globalStyles } from "../shared/styles";

export class Component extends LitElement {
  constructor() { super() }
  /**
   * global style (e.g dark mode, size mode)
   */
  static styles = globalStyles;

  /**
   * message function should needed
   */
}