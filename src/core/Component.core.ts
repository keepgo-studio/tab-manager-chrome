import { LitElement } from 'lit';
import { state } from 'lit/decorators';
import { FRONT_EVENT_NAME } from '../app';
import { globalStyles } from '../views/shared/styles';
import { IComponentEventType } from '../router';
import styles from './shared.scss';

export class Component extends LitElement {
  /**
   * global style (e.g dark mode, size mode)
   */
  static styles = globalStyles;

  sendToFront(
    eventType: IComponentEventType,
    msg: IFrontMessage<UsersEventType | MessageEventType>
  ) {
    window.dispatchEvent(new CustomEvent(eventType, { detail: msg }));
  }
}

export abstract class EventComponent extends Component {

  abstract frontMessageHandler({
    detail,
  }: CustomEvent<IFrontMessage<UsersEventType | MessageEventType>>): void;

  attachFrontHandler(self: Element) {
    self.addEventListener(
      FRONT_EVENT_NAME,
      this.frontMessageHandler as EventListener
    );
  }

  abstract portMessageHandler({
    detail,
  }: CustomEvent<IPortMessage<ChromeEventType>>): void;

  attachPortHandler(self: Element) {
    self.addEventListener(
      FRONT_EVENT_NAME,
      this.portMessageHandler as EventListener
    );
  }
}

export abstract class EventlessComponent extends Component {}
