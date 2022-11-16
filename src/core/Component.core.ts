import { LitElement } from 'lit';
import { FRONT_EVENT_NAME } from '@src/app';
import UserSettings from '@src/store/local-storage';
import { globalStyles } from '@src/shared/styles';
import {
  AppEventType,
  ChromeEventType,
  FrontInitEventType,
  MessageEventType,
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

  userSetting: TUserSettingMap = {};

  userEventsListener({ detail }: CustomEvent<TUserSettingMap>) {
    if (detail.lang) {
      this.userSetting.lang = detail.lang;
    }
    if (detail.size) {
      this.userSetting.size = detail.size;
    }
    if (detail.theme) {
      this.userSetting.theme = detail.theme;
    }
    this.requestUpdate();
  }

  connectedCallback(): void {
    super.connectedCallback();

    UserSettings.getAllSettings().then(setting => {
      this.userSetting.lang = setting['lang-mode']
      this.userSetting.size = setting['size-mode']
      this.userSetting.theme = setting['theme-mode']

      this.requestUpdate();
    })

    this.addEventListener(
      AppEventType.USER_SETTINGS_CHNAGED,
      this.userEventsListener as EventListener
    );

    UserSettings.attachToObserver(this);
  }

  disconnectedCallback(): void {
    this.removeEventListener(
      AppEventType.USER_SETTINGS_CHNAGED,
      this.userEventsListener as EventListener
    );

    UserSettings.detachFromObserver(this);
    super.disconnectedCallback();
  }

  constructor() {
    super();
  }
}

export abstract class EventComponent extends Component {
  abstract eventListener({
    detail,
  }: CustomEvent<
    | IPortMessage<ChromeEventType | AppEventType>
    | IFrontMessage<UsersEventType | MessageEventType | FrontInitEventType>
  >): void;

  connectedCallback(): void {
    super.connectedCallback();

    this.addEventListener(
      FRONT_EVENT_NAME,
      this.eventListener as EventListener
    );
  }

  disconnectedCallback(): void {
    this.removeEventListener(
      FRONT_EVENT_NAME,
      this.eventListener as EventListener
    );
    super.disconnectedCallback();
  }
}

export abstract class EventlessComponent extends Component {
  constructor() {
    super();
  }
}
