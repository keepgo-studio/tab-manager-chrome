import { LitElement } from "lit";
import { globalStyles } from "../components/shared/styles";
import { IComponentEventType } from "../router";
import styles from "./shared.scss";

export class Component extends LitElement {

  constructor() { super() }
  /**
   * global style (e.g dark mode, size mode)
   */
  static styles = globalStyles;

  /**
   * message function should needed
   */
  sendToFront(eventType: IComponentEventType, msg: IFrontMessage) {
    window.dispatchEvent(new CustomEvent(eventType, { detail: msg}))
  };
}