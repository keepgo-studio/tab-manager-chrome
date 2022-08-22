import { LitElement, TemplateResult } from "lit";

export abstract class View extends LitElement{
  constructor() {
    super();
  }

  abstract render(): TemplateResult;

  /*
   more code
  */
}