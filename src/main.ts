import App from "./app";
import { setDocumentTitle } from "./utils/utils";
import { FrontRouter, PortRouter } from "./router";
import { connectToBack } from "./utils/browser-api";

setDocumentTitle(chrome.runtime.getManifest().description ?? 'tab-manager');

window.onload = () => {
  // connect to worker
  let port = connectToBack('front');

  const app = new App();

  const pr = new PortRouter(app, port);
  const fr = new FrontRouter(app);

  pr.active();
  fr.activeMessageEvent();
  fr.activeUserEvent();
  fr.activeHistoryEvent();

  port.onDisconnect.addListener(() => {
    /**
     * retry connection if this window had disconnected with various reasons (e.g timeout)
     */
    console.log("[main.ts]:", "reconnection");
    location.reload();
  });
};