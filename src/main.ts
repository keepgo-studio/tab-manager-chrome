import App from "./app/App";

export const app = new App();

chrome.runtime.onMessage.addListener(
  ({ message, data }: MessageForm, sender, sendResponse) => {

    if (message === "CREATE_WINDOW") {
      app.createWindow(data.window!);
    } else if ("") {
      
    }
  }
);

// on start event handler
window.onload = () => {

};

// on end event handler
window.onclose = () => {};
