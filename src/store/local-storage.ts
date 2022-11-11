/**
 *   "dark-mode": TThemeMode;
 *   "lang-mode": TLangMode;
 *   "size-mode": TSizeMode;
 */
class UserSettings {
  static async geThemeMode() {
    return (await chrome.storage.local.get('dark-mode'))['dark-mode'];
  }
  static async seThemeMode(mode: TThemeMode = 'system') {
    return await chrome.storage.local.set({ 'dark-mode': mode });
  }

  static async getLangMode() {
    return (await chrome.storage.local.get('lang-mode'))['lang-mode'];
  }
  static async setLangMode(mode: TLangMode = 'ko') {
    return await chrome.storage.local.set({ 'lang-mode': mode });
  }

  static async getSizeMode() {
    return (await chrome.storage.local.get('size-mode'))['size-mode'];
  }
  static async setSizeMode(sizeMode: TSizeMode = 'mini') {
    return await chrome.storage.local.set({ 'size-mode': sizeMode });
  }
}

export default UserSettings;