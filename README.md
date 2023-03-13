﻿# tab-manager-chrome
 
 # Download
 
 https://chrome.google.com/webstore/detail/tab-manager/fcjlfbcjannhplildiamopijamcbpjlg?hl=ko

```
tab-manager-chrome
├─src
│    │  app.ts
│    │  background.ts
│    │  content-script.ts
│    │  main.ts
│    │  router.ts
│    │  
│    ├─core
│    │      Component.core.ts
│    │      Dialog.core.ts
│    │      shaderd.scss
│    │
│    ├─machine
│    │      current-tab-list.machine.ts
│    │      current-tab-list.machine.typegen.ts
│    │      machine.test.ts
│    │      message.machine.ts
│    │      message.machine.typegen.ts
│    │      saved-tab-list.machine.ts
│    │      saved-tab-list.machine.typegen.ts
│    │      tab-list-ui.machine.ts
│    │      tab-list-ui.machine.typegen.ts
│    │      tab-list.machine.typegen.ts
│    │      tab-ui.machine.ts
│    │      tab-ui.machine.typegen.ts
│    │      tab.machine.typegen.ts
│    │
│    ├─store
│    │      indexed-db.ts
│    │      local-storage.ts
│    │
│    ├─types
│    │      app.d.ts
│    │      chrome-api.d.ts
│    │      message.d.ts
│    │      module.d.ts
│    │
│    ├─utils
│    │      browser-api.ts
│    │      utils.ts
│    │
│    └─views
│        ├─components
│        │      three-dots.css
│        │      ThreeDot.ts
│        │
│        ├─dialog
│        │      Alert.ts
│        │      Confirm.styled.ts
│        │
│        ├─main
│        │      Main.styled.ts
│        │
│        ├─message
│        │      Message.styled.ts
│        │
│        ├─navbar
│        │      Navbar.styled.ts
│        │      Navbar.test.ts
│        │
│        ├─search
│        │      Search.ts
│
└─webpack
        webpack.config.js
```

## have to work

* add click listeners for saved window node, and fixed styles for saved mode.

* 

## code style

* class variables order
 
 1. attributes
 2. state or properties
 3. style
 4. constructor
 5. methods
 6. lit methods


## data flow

 background -> main <-> app -> elemens
                ↑                  │
                ┖------------------┘
