import { Model } from "./Model";
import { View } from "./View";

export class Contoller {
  private view: View;
  private model: Model;

  constructor(view:View, model:Model) {
    this.view = view;
    this.model = model;
  }


}