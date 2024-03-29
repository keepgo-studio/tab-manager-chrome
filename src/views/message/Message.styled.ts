import { css, html } from "lit";
import { customElement, query, state } from "lit/decorators.js";
import { EventComponent } from "@src/core/Component.core";
import { MessageEventType, UsersEventType } from "@src/shared/events";
import GlobalLangMap from "@src/data/lang";

const enum MessageStyle {
	top="top",
	bottom="bottom"
}

const styled = css`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	#message {
		position: fixed;
		z-index: 999;
		transition: ease 300ms;
		color: #fff;
	}
	#message[SUCCESS] {
		background-color: #4F6EFC;
	}
	#message[FAILED] {
		background-color: #F83F4B;
	}
	.top {
		top: 72px;
		left: 50%;
		transform: translate(-50%, -150%);
		font-size: 11px;
		border-radius: 999px;
		padding: 4px 14px;
		white-space: nowrap;
	}
	.top-appear-msg {
		transform: translate(-50%, 0);
	}
	.bottom {
		bottom:0;
		left:24px;
		font-size: 12px;
		font-weight: bold;
		padding: 4px 16px;
		line-height: 1.5em;
		transform: translateY(100%);
		max-width: 200px;
	}
	.bottom-appear-msg {
		bottom:24px !important;
		transform: none !important;
		
	}
`;
/** 
 * Message only gets data from message.machine.ts
 * */ 
@customElement('app-message')
class Message extends EventComponent {

	private msgStyle: MessageStyle = MessageStyle.top;

	private sto: any | undefined = undefined;
	
	convertToMessage(command: UsersEventType, status: MessageEventType) {
		let lastStr = '';
	
		if (status === MessageEventType.FAILED) {
			lastStr = GlobalLangMap[this.userSetting.lang!].Message.FAILED;
		} else {
			lastStr = GlobalLangMap[this.userSetting.lang!].Message.SUCCESS;
		}
	
		let mainSentense = '';
		switch(command){
			case UsersEventType.DELETE_SAVED_TAB:
				mainSentense = GlobalLangMap[this.userSetting.lang!].Message.DELETE_SAVED_TAB;
				break;
			case UsersEventType.DELETE_SAVED_WINDOW:
				mainSentense = GlobalLangMap[this.userSetting.lang!].Message.DELETE_SAVED_WINDOW;
				break;
			case UsersEventType.OPEN_SAVED_WINDOW:
				mainSentense = GlobalLangMap[this.userSetting.lang!].Message.OPEN_SAVED_WINDOW;
				break;
			case UsersEventType.SAVE_WINDOW:
				mainSentense = GlobalLangMap[this.userSetting.lang!].Message.SAVE_WINDOW;
		}
		
		return mainSentense + ' ' + lastStr;
	}

	eventListener({ detail, }: CustomEvent<IFrontMessage<MessageEventType>>): void {
		const { message } = detail.data;

		// this.msgStyle = msgStyle; // needed to add later
		this.msg = this.convertToMessage(message as UsersEventType, detail.command);

		this.messageDiv.setAttribute(detail.command, '');

		if (this.sto !== undefined) {
			clearTimeout(this.sto);
		}

		this.messageDiv.classList.add(`${this.msgStyle}-appear-msg`);

		this.sto = setTimeout(() => {
			this.messageDiv.classList.remove(`${this.msgStyle}-appear-msg`);
		}, 3000);
	}

	@state()
	msg = ''

	@query('#message')
	messageDiv!: Element;

	static styles = styled;

	render() {
		if (this.userSetting.lang === undefined) this.userSetting.lang = 'en'
		
		switch(this.msgStyle) {
			case MessageStyle.top:
				return html`
				<div id="message" class="top">
					<p>${this.msg}</p>
				</div>
				`
			case MessageStyle.bottom:
				return html`
				<div id="message" class="bottom">
					<p>${this.msg}</p>
				</div>
			`;
		}
	}
}