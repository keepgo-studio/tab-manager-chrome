import App from './app';
import { setDocumentTitle } from './utils/utils';
import { FrontRouter, PortRouter } from './router';
import { connectToBack } from './utils/browser-api';

setDocumentTitle(chrome.runtime.getManifest().description ?? 'tab-manager');

window.onload = async () => {
  // connect to worker
  let port = connectToBack('front');

  // start app
  const app = new App();

  // init router
  const pr = new PortRouter(app, port);
  const fr = new FrontRouter(app);

  // start port's router (back <-> front)
  pr.active();

  // start front's router (front <-> component)
  fr.activeUserEvent();
  fr.activeMessageEvent();
  fr.activeInitEvent();

  await app.initApp();

  chrome.commands.onCommand.addListener(async command => {
    console.log('main', command)
    
  })

  // retry connection if this window had disconnected with various reasons (e.g timeout)
  port.onDisconnect.addListener(() => {
    console.log('[main.ts]:', 'reconnection');
    location.reload();
  });
};
