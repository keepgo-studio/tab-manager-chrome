import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./ThreeDot.css";

export enum ThreeDotModes {
  'dot-elastic'='dot-elastic',
  'dot-pulse'='dot-pulse',
  'dot-flashing'='dot-flashing',
  'dot-collision'='dot-collision',
  'dot-revolution'='dot-revolution',
  'dot-carousel'='dot-carousel',
  'dot-typing'='dot-typing',
  'dot-windmill'='dot-windmill',
  'dot-bricks'='dot-bricks',
  'dot-floating'='dot-floating',
  'dot-fire'='dot-fire',
  'dot-spin'='dot-spin',
  'dot-falling'='dot-falling',
  'dot-stretching'='dot-stretching',
}

@customElement('three-dot')
class ThreeDot extends LitElement{
  @property()
  mode = ThreeDotModes['dot-elastic'];

  @property()
  width = 10;

  @property()
  height = 10;

  static styles = unsafeCSS(styles);

  render() {
    // 15 : 10 = distance : this.width;
    const distance = 15 * this.width / 10;

    return html`
      <style>
        #custom, #custom::before, #custom::after {
          width:${this.width}px;
          height:${this.height}px;
        }
        #custom::before {
          left: -${distance}px;
        }
        #custom::after {
          left: ${distance}px
        }

      </style>
      <div id="custom" class=${this.mode}></div>
    `
  }
}