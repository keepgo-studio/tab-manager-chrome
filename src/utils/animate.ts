type TStyleConfig = Partial<{
  'transition-duration': number;
}>;

abstract class Animation {
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

  attach(component: Element) {
    this.io.observe(component);
  }

  detach(component: Element) {
    this.io.unobserve(component);
  }
}

export class FadeInOut extends Animation {
  setDefaultCss(elem: HTMLElement) {
    elem.style['position'] = 'relative';
    elem.style[
      'transition'
    ] = `ease ${this.styleConfig['transition-duration']}ms`;
    elem.style['top'] = '15px';
    elem.style['opacity'] = '0';
    elem.style['zIndex'] = '10';
  }

  fadeInCss(elem: HTMLElement) {
    elem.style['top'] = '0';
    elem.style['opacity'] = '1';
  }

  callback(entries: Array<IntersectionObserverEntry>) {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.fadeInCss(entry.target as HTMLElement);
      } else {
        this.setDefaultCss(entry.target as HTMLElement);
      }
    });
  }
}

export class ZoomInOut extends Animation {
  setDefaultCss(elem: HTMLElement) {
    elem.style[
      'transition'
    ] = `ease ${this.styleConfig['transition-duration']}ms`;
    elem.style['transform'] = 'scale(1.1)';
    elem.style['opacity'] = '0';
  }

  ZoomInCss(elem: HTMLElement) {
    elem.style['transform'] = '';
    elem.style['opacity'] = '1';
  }

  callback(entries: IntersectionObserverEntry[]): void {
    entries.forEach((entry: IntersectionObserverEntry) => {
      if (entry.isIntersecting) {
        this.ZoomInCss(entry.target as HTMLElement);
      } else {
        this.setDefaultCss(entry.target as HTMLElement);
      }
    });
  }
}
