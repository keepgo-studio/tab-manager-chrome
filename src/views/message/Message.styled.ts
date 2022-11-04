import { css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { EventComponent } from "../../core/Component.core";
import { ChromeEventType, MessageEventType, UsersEventType } from "../../shared/events";

const styled = css`
	#message {
		position: fixed;
		z-index: 1000;
		bottom:0;
		left:24px;
		font-weight: bold;
		font-size: 12px;
		padding: 5px 16px;
		line-height: 1.5em;
		transform: translateY(100%);
		transition: ease 300ms;
		color: #fff;
		padding: 4px 16px;
		max-width: 200px;
	}
	#message[SUCCESS] {
		background-color: #4F6EFC;
	}
	#message[FAILED] {
		background-color: #F83F4B;
	}
	.appear-msg {
		bottom:24px !important;
		transform: none !important;
	}
`;

function convertToMessage(command: UsersEventType, status: MessageEventType) {
	let lastStr = '';

	if (status === MessageEventType.FAILED) {
		lastStr = '실패하였습니다'
	} else {
		lastStr = '성공하였습니다'
	}

	let mainSentense = '';
	switch(command){
		case UsersEventType.DELETE_SAVED_TAB:
			mainSentense = '저장된 탭을 삭제하는데에';
			break;
		case UsersEventType.DELETE_SAVED_WINDOW:
			mainSentense = '저장된 창을 삭제하는데에';
			break;
		case UsersEventType.OPEN_SAVED_WINDOW:
			mainSentense = '저장된 창을 여는데에'
			break;
		case UsersEventType.SAVE_WINDOW:
			mainSentense = '창을 저장하는데에'
	}
	
	return mainSentense + ' ' + lastStr;
}
/** 
 * Message only gets data from message.machine.ts
 * */ 
@customElement('app-message')
class Message extends EventComponent {

	private sto: any | undefined = undefined;
	
	eventListener({ detail, }: CustomEvent<IFrontMessage<MessageEventType>>): void {
		const { message } = detail.data;

		this.msg = convertToMessage(message as UsersEventType, detail.command);

		this.messageDiv.setAttribute(detail.command, '');

		if (this.sto !== undefined) {
			clearTimeout(this.sto);
		}

		this.messageDiv.classList.add('appear-msg');

		this.sto = setTimeout(() => {
			this.messageDiv.classList.remove('appear-msg');
		}, 3000);
	}

	@state()
	msg = ''

	@query('#message')
	messageDiv!: Element;

	static styles = styled;

	render() {
		return html`
			<div id="message">
			<p>${this.msg}</p>
			</div>
		`;
	}
}