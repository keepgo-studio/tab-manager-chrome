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

  sendToFront(eventType: IComponentEventType, msg: IFrontMessage) {
    window.dispatchEvent(new CustomEvent(eventType, { detail: msg }));
  }
}


export abstract class EventComponent extends Component {
  abstract receivedPortMessage?: IPortMessage;

  abstract receivedFrontMessage?: IFrontMessage;

  abstract frontMessageHandler({ detail }: CustomEvent<IFrontMessage>): void;
  
  abstract portMessageHandler({ detail }: CustomEvent<IPortMessage>): void;

  attachFrontHandler() {
    window.addEventListener(FRONT_EVENT_NAME, this.frontMessageHandler as EventListener);
  }
  
  attachPortHandler() {
    window.addEventListener(FRONT_EVENT_NAME, this.portMessageHandler as EventListener);
  }
}

export abstract class EventlessComponent extends Component {}