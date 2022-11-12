declare global {
  interface SaveWindow extends ChromeWindow {
    category: string;
  }

  interface IChromeWindowMapping {
    [windowId: number]: ChromeWindow;
  }

  type TThemeMode = 'dark' | 'light' | 'system';

  type TSizeMode = 'mini' | 'tablet' | 'side';

  type TLangMode = 'ko' | 'en' | 'ja' | 'zh'

  type TUserSettingMap = Partial<{
    size: TSizeMode;
    theme: TThemeMode;
    lang: TLangMode;
  }>
}

export {};
