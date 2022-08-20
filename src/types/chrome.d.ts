export {}

declare global {
  enum WindowType {
    "normal",
    "popup",
    "panel",
    "app",
    "devtools"
  }

  interface Tab {
    id: number,
    favIconUrl: string,
    index: number,
    title: string,
    windowId: number,
    url: string
  }

  interface ChromeWindow {
    id: number,
    tabs: Tab[],
    type: WindowType,
    content: string
  }

  interface CurrentWindow extends ChromeWindow {
    active: boolean
  }

  interface SaveWindow extends ChromeWindow {
    category: string
  }
}