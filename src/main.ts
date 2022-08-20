import App from "./app/App";

const app = new App();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  
  const { command, data } = message;

  // error
  if (command === "CREATE_WINDOW") {
    // app.createWindow(data);

  } else if ("") {

  }
});

// on start event handler
window.onload = () => {

};

// on end event handler
window.onclose = () => {

};
