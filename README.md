# tab-manager-chrome

```
tab-manager-chrome
│
├─public
│  │  index.html
│  │  manifest.json
│  │
│  ├─css
│  │      reset.css
│  └─img
│         ...
│
├─src
│  │  background.ts
│  │  content-script.ts
│  │  main.ts
│  │
│  ├─app
│  │  │  app.ts
│  │  │
│  │  ├─components
│  │  │      ChromeWindowMain.ts
│  │  │      CurrentTabContainer.ts
│  │  │      Dialog.ts
│  │  │      Navbar.ts
│  │  │      SavedTabContainer.ts
│  │  │      Search.ts
│  │  │      Tab.ts
│  │  │      WindowNode.ts
│  │  │
│  │  ├─core
│  │  │      Component.ts
│  │  │
│  │  ├─shared
│  │  │      store.ts
│  │  │      styles.ts
│  │  │
│  │  └─utils
│  │          chrome-api.ts
│  │
│  ├─indexedDB
│  │      db.ts
│  │
│  ├─machine
│  │      CurrentWindowMachine.ts
│  │      SavedWindowMachine.ts
│  │      ...
│  │
│  ├─types
│  │      chrome-api.d.ts
│  │      global.d.ts
│  │
│  └─utils
│          chrome-api.ts
│          dev.ts
│          location.ts
│          utils.ts
│
└─webpack
        webpack.config.js
```

## have to work

* add click listeners for saved window node, and fixed styles for saved mode.

* 