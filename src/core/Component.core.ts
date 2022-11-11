import { LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { FRONT_EVENT_NAME, USER_SETTINGS_CHNAGED } from '@src/app';
import UserSettings from '@src/store/local-storage';
import { globalStyles } from '@src/shared/styles';
import {
  ChromeEventType,
  FrontInitEventType,
  MessageEventType,
  UserSettingsEventType,
  UsersEventType,
} from '@src/shared/events';

export class Component extends LitElement {
  /**
   * global style (e.g dark mode, size mode)
   */
  static styles = globalStyles;

  sendToFront(
    msg: IFrontMessage<UsersEventType | MessageEventType | FrontInitEventType>
  ) {
    window.dispatchEvent(new CustomEvent(msg.command, { detail: msg }));
  }

  @state()
  themeMode: TThemeMode = 'light';

  @state()
  sizeMode: TSizeMode = 'mini';

  @state()
  langMode: TLangMode = 'ko';

  async userEventsListener({
    detail,
  }: CustomEvent<IPortMessage<UserSettingsEventType>>) {
    if (detail.command === UserSettingsEventType.SIZE_MODE) {
      this.sizeMode = await UserSettings.getSizeMode();
    }

    if (detail.command === UserSettingsEventType.THEME_MODE) {
      this.themeMode = await UserSettings.geThemeMode();
    }
    
    if (detail.command === UserSettingsEventType.LANG_MODE) {
      this.langMode = await UserSettings.getLangMode();
    }
  }

  constructor() {
    super();

    this.addEventListener(
      USER_SETTINGS_CHNAGED,
      this.userEventsListener as unknown as EventListener
    );
  }
}

export abstract class EventComponent extends Component {
  abstract eventListener({
    detail,
  }: CustomEvent<
    | IPortMessage<ChromeEventType>
    | IFrontMessage<UsersEventType | MessageEventType | FrontInitEventType>
  >): void;

  constructor() {
    super();

    this.addEventListener(
      FRONT_EVENT_NAME,
      this.eventListener as EventListener
    );
  }
}

export abstract class EventlessComponent extends Component {}
