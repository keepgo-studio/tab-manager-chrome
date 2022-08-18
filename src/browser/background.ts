var isOpened = false
var id: number | undefined;

var diagnol = 517.7
var width = 344;
var height = Math.round(Math.sqrt(Math.pow(width, 2) + Math.pow(diagnol, 2)))

// invoke app init(=constructor)
chrome.action.onClicked.addListener(() => {
  // open web
  if (!isOpened) {
      chrome.windows.create({
        focused: true,
        type: "popup",
        url: "index.html",
        width,
        height,
        left:20,
        top:20
      }, (window) => { id = window!.id });

      isOpened = true;
  }
});

//

// when extension installed, only once
chrome.runtime.onInstalled.addListener(() => {
    
    /* 
        send event to main js
    */

});

chrome.windows.onRemoved.addListener((windowId) => {
    if (windowId === id) {
        isOpened = false;
    }
})

chrome.windows.onCreated.addListener(() => {})

chrome.tabs.onCreated.addListener(() => {})

chrome.tabs.onMoved.addListener(() => {})

chrome.tabs.onRemoved.addListener(() => {})

chrome.tabs.onUpdated.addListener(() => {})