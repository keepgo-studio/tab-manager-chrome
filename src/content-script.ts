import { FrontInitEventType } from "./shared/events";

const msg:IRuntimeMessage<FrontInitEventType> = {
  sender: 'content',
  command: FrontInitEventType.SET_SIZE_SETTING,
  data: {
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
  }
}

chrome.runtime.sendMessage(msg)