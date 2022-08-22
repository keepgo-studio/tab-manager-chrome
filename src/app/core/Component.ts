import { LitElement, TemplateResult } from "lit";
import { globalStyles } from "../shared/styles";

export abstract class Component extends LitElement{
  
  static styles = globalStyles;

  constructor() {
    super();
  }

  abstract render(): TemplateResult;
}