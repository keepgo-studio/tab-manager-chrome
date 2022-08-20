import { LitElement, TemplateResult } from "lit";

export abstract class View extends LitElement{
  constructor() {
    super();

    this.render();
  }

  abstract render(): TemplateResult;

}