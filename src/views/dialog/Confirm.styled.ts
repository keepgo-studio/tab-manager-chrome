import { css, html, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { DialogComponent } from '../../core/Dialog.core';

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

`;

@customElement('app-confirm')
export class Confirm extends DialogComponent {

  @state()
  confirmMsg = '';

  @query('#dialog')
  dialog: Element | undefined;

  static styles = styled;

  private handleSubmit(e: Event) {
    const target = e.currentTarget as Element;

    if (target.className === 'confirm') {
      this.isConfirmed = true;
    } else {
      this.isConfirmed = false;
    }
  }

  constructor(confirmMsg: string = 'alert') {
    super();

    this.confirmMsg = confirmMsg;
  }

  render() {
    return html`
      <div id="dialog">
        <div class="container">
          <h1>${this.confirmMsg}</h1>

          <button @click=${this.handleSubmit} class="confirm">confirm</button>
          <button @click=${this.handleSubmit} class="cancel">cancel</button>
        </div>
      </div>
    `;
  }
}
