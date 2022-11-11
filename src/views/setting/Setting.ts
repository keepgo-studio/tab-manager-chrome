import { EventComponent } from '@src/core/Component.core';
import { ZoomInOut } from '@src/utils/animate';
import { css, html, unsafeCSS } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { repeat } from 'lit/directives/repeat.js';

import styles from './Setting.scss';
import SettingSvg from '@public/img/setting.svg';
import CloseRoundSvg from '@public/img/close-round.svg';

import '@views/components/SelectField';

const ZoomInObserver = new ZoomInOut({ 'transition-duration': 300 });

@customElement('app-setting')
class Setting extends EventComponent {
  private _themeList: TThemeMode[] = ['dark', 'light', 'system'];

  private _sizeListMap: Array<{ mode: TSizeMode; imgSrc: string }> = [
    { mode: 'mini', imgSrc: './img/theme-mini.png' },
    { mode: 'tablet', imgSrc: './img/theme-tablet.png' },
    { mode: 'side', imgSrc: './img/theme-side.png' },
  ];

  private _langListMap: Array<{
    mode: TLangMode;
    text: string;
    imgSrc: string;
  }> = [
    { mode: 'ko', text: '한국어', imgSrc: './img/flag-south-korea.png' },
    { mode: 'en', text: 'English', imgSrc: './img/flag-usa.png' },
    { mode: 'ja', text: '日本語', imgSrc: './img/flag-japan.png' },
    { mode: 'zh', text: '中国人', imgSrc: './img/flag-china.png' },
  ];

  @state()
  visible = false;

  @query('section')
  section?: Element;

  eventListener(): void {
    this.visible = true;
  }

  static get styles() {
    return css`
      ${super.styles}
      ${unsafeCSS(styles)}
    `;
  }

  constructor() {
    super();

    this.addEventListener('selected', this.themeSelectHandler as EventListener);
  }
  closeClickHandler() {
    ZoomInObserver.setDefaultCss(this.section! as HTMLElement);

    setTimeout(() => {
      this.visible = false;
    }, 250);
  }

  protected updated() {
    ZoomInObserver.detach(this.section!);
    ZoomInObserver.attach(this.section!);
  }

  themeSelectHandler(e: CustomEvent) {
    const { selectedThemeMode } = e.detail;

    console.log(selectedThemeMode);
  }

  render() {
    return html`
      <section
        class="container"
        style=${styleMap({
          display: this.visible ? 'flex' : 'none',
        })}
      >
        <div class="close-container">
          <i @click=${this.closeClickHandler}> ${unsafeHTML(CloseRoundSvg)} </i>
        </div>

        <div class="setting-container">
          <header>${unsafeHTML(SettingSvg)} <span>Setting</span></header>

          <ul class="setting-list">
            <li class="li-theme">
              <h1>Theme mode</h1>

              <app-select-field
                .selected=${this.themeMode}
                .optionList=${this._themeList}
              ></app-select-field>
            </li>

            <li class="li-size">
              <h1>Size mode</h1>

              <ol>
                ${repeat(
                  this._sizeListMap,
                  (sizeMap) => sizeMap.mode,
                  (sizeMap) => html`
                    <li
                      class="${this.sizeMode === sizeMap.mode
                        ? 'selected'
                        : ''}"
                    >
                      <img src="${sizeMap.imgSrc}" />
                      <p>${sizeMap.mode}</p>
                    </li>
                  `
                )}
              </ol>
            </li>

            <li class="li-lang">
              <h1>Language</h1>

              <ol>
                ${repeat(
                  this._langListMap,
                  (langMap) => langMap.mode,
                  (langMap) => html`
                    <li>
                      <div
                        class="select-box ${this.langMode === langMap.mode
                          ? 'selected'
                          : ''}"
                      >
                        <i></i>
                        <span>${langMap.text}</span>
                      </div>
                      <img src="${langMap.imgSrc}" />
                    </li>
                  `
                )}
              </ol>
            </li>
          </ul>
        </div>
      </section>
    `;
  }
}
