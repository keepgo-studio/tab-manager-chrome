import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

const styled = css`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;    
}
h1 {
  font-size: inherit;
  font-weight: inherit;
}
button {
  background: none;
  border: none;
  cursor: pointer;
}

#dialog {
  position: fixed;
  top:0;
  left:0;
  z-index: 1000;
  backdrop-filter: blur(4px);
  width: 100vw;
  height: 100vh;
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 300px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 1px 6px 2px rgba(0, 0, 0, 0.05);
}
.container * {
  padding: 1.25rem;
}
.container h1 {
  grid-column: 1 / 3; 
}
.container button:hover {
  background-color: rgba(205, 205, 205, 0.5);
}

#message {
  position: fixed;
  z-index: 1000;
  bottom:0;
  left:24px;
  font-weight: ;
  font-size: 1.5rem
  padding: 5px 16px;
  transform: translateY(100%);
  transition: ease 300ms;
  color: #fff;
  padding: 12px 24px;
}
#message[isConfirmed='true'] {
  background-color: #4F6EFC;
}
#message[isConfirmed='false'] {
  background-color: #F83F4B;
}
.appear-msg {
  bottom:24px !important;
  transform: none !important;
}
`;

@customElement('app-confirm')
export class Confirm extends LitElement {
  @state()
  isConfirmed?: boolean;

  @state()
  dialogStr = '';

  @state()
  msgStr = '';

  @query('#dialog')
  dialog: Element | undefined;

  @query('#message')
  message: Element | undefined;

  static styles = styled;

  wait() {
    return new Promise((res, _) => {
      const loop = () => {
        setTimeout(() => {
          if (this.isConfirmed !== undefined) {
            return res(this.isConfirmed);
          }
          loop();
        }, 100);
      };
      loop();
    });
  }

  appaer() {
    const prev = document.body.querySelector(this.tagName);
    if (prev) {
      prev.remove();
    }
    document.body.appendChild(this);
  }

  disappear() {
    this.dialog!.remove();
    this.message!.classList.add('appear-msg');

    setTimeout(() => {
      this.message!.classList.remove('appear-msg');

      setTimeout(() => {
        this.remove();
      }, 500);
    }, 3000);
  }

  async show() {
    this.appaer();

    await this.wait();

    this.disappear();

    return this.isConfirmed;
  }

  private handleSubmit(e: Event) {
    const target = e.currentTarget as Element;

    if (target.className === 'confirm') {
      this.isConfirmed = true;
      this.msgStr = `${this.msgStr} has success! 😊`;
    } else {
      this.isConfirmed = false;
      this.msgStr = `${this.msgStr} has failed... 😒`;
    }

    this.message?.setAttribute('isConfirmed', this.isConfirmed.toString());
  }

  constructor(dialogStr: string = 'alert', msgStr: string = 'alert') {
    super();

    this.dialogStr = dialogStr;
    this.msgStr = msgStr;
  }

  render() {
    return html`
      <div id="dialog">
        <div class="container">
          <h1>${this.dialogStr}</h1>

          <button @click=${this.handleSubmit} class="confirm">confirm</button>
          <button @click=${this.handleSubmit} class="cancel">cancel</button>
        </div>
      </div>

      <div id="message">
        <h1>${this.msgStr}</h1>
      </div>
    `;
  }
}
