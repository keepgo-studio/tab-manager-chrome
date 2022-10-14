const bgPort = chrome.runtime.connect({ name: 'content-script' });

bgPort.postMessage({
  message: 'get address bar',
  data: window.outerHeight - window.innerHeight
});