declare global {
  interface IContent {
    title: string,
    url: string,
    textContent: string
  }
  
  interface IContentMapping {
    [tabId: number]: IContent
  }  

  interface SaveWindow extends ChromeWindow {
    category: string;
  }

  interface IChromeWindowMapping {
    [windowId: number]: ChromeWindow
  }

  type TThemeMode = "dark" | "light" | "system";

  type TSizeMode = "mini" | "tablet" | "side";
}

export {};