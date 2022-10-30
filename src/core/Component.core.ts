import { LitElement } from 'lit';
import { state } from 'lit/decorators.js';
import { FRONT_EVENT_NAME, USER_SETTINGS_CHNAGED } from '../app';
import UserSettings from '../store/local-storage';
import { globalStyles } from '../shared/styles';
import {
  ChromeEventType,
  MessageEventType,
  UserSettingsEventType,
  UsersEventType,
} from '../shared/events';

export class Component extends LitElement {
  /**
   * global style (e.g dark mode, size mode)
   */
  static styles = globalStyles;

  sendToFront(msg: IFrontMessage<UsersEventType | MessageEventType>) {
    window.dispatchEvent(new CustomEvent(msg.command, { detail: msg }));
  }

  @state()
  themeMode: TThemeMode = 'system';

  @state()
  sizeMode: TSizeMode = 'mini';

  async userEventsListener({
    detail,
  }: CustomEvent<IPortMessage<UserSettingsEventType>>) {
    if (detail.command === UserSettingsEventType.SIZE_MODE) {
      this.sizeMode = await UserSettings.getSizeMode();
    }

    if (detail.command === UserSettingsEventType.THEME_MODE) {
      this.themeMode = await UserSettings.geThemeMode();
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
    | IFrontMessage<UsersEventType | MessageEventType>
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
