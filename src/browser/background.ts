// when extension icon clicked
chrome.action.onClicked.addListener(() => {
  // open web
  chrome.windows.create({
    focused: true,
    type: "popup",
    url: "index.html",
    width: 600,
    height: 400,
  });
});

//

// when extension installed, only once
chrome.runtime.onInstalled.addListener(() => {
    
    /* 
        send event to main js
    */

});

chrome.windows.onRemoved.addListener(() => {})

chrome.windows.onCreated.addListener(() => {})

chrome.tabs.onCreated.addListener(() => {})

chrome.tabs.onMoved.addListener(() => {})

chrome.tabs.onRemoved.addListener(() => {})

chrome.tabs.onUpdated.addListener(() => {})