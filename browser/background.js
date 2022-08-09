chrome.action.onClicked.addListener(() => {
    // open web
    chrome.windows.create(
        {
            focused: true,
            type: "popup",
            url: "index.html"
        }
    )
})