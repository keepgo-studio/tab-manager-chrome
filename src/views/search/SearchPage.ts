import { css, html, PropertyValueMap, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { EventlessComponent } from '../../core/Component.core';
import { FadeIn } from '../../utils/animate';

import styles from './SearchPage.scss';

import '../components/TextField';

const fadeInObserver = new FadeIn({ 'transition-duration': 500 });

@customElement('app-search-page')
class SearchPage extends EventlessComponent {
  _worker = new Worker(new URL('./search.worker.ts', import.meta.url));

  @property()
  visible!: boolean;

  @query('app-text-field')
  textField?: Element;

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(styles)}
    `;
  }

  constructor() {
    super();
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    fadeInObserver.detach(this.textField!);
    fadeInObserver.attach(this.textField!);
  }

  render() {
    return html` <section
      class="container"
      style=${styleMap({
        display: this.visible ? 'block' : 'none',
      })}
    >
      <app-text-field></app-text-field>

      <div class="filter"></div>
    </section>`;
  }
}
