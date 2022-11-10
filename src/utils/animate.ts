import { LitElement } from 'lit';

type TStyleConfig = Partial<{
  'transition-duration': number;
}>;
abstract class AnimationComponent {
  protected io;

  protected styleConfig: TStyleConfig = {};

  constructor(config: TStyleConfig) {
    this.styleConfig = config;
    this.io = new IntersectionObserver(this.callback.bind(this), {
      threshold: 0.1,
    });
  }

  abstract callback(
    entries: Array<IntersectionObserverEntry>,
    observer: IntersectionObserver
  ): void;
  abstract attach(component: LitElement): void;
}

export class FadeIn extends AnimationComponent {
  setDefaultCss() {
    return `
      position: relative;
      transition: ease ${this.styleConfig['transition-duration']}ms;
      top: 15px;
      opacity: 0;
      z-index: 10;
    `;
  }

  fadeInCss() {
    return `
      ${this.setDefaultCss()}

      top:0;
      opacity: 1;
    `;
  }

  callback(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        entry.target.setAttribute('style', this.fadeInCss());
      } else {
        entry.target.setAttribute('style', this.setDefaultCss());
      }
    });
  }

  attach(component: Element) {
    this.io.observe(component);
  }

  detach(component: Element) {
    this.io.unobserve(component);
  }
}
