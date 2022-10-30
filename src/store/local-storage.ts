/**
 *   "dark-mode": TThemeMode;
 *   "outer-height": number;
 *   "size-mode": TSizeMode;
 */
class UserSettings {
  static async geThemeMode() {
    return (await chrome.storage.local.get('dark-mode'))['dark-mode'];
  }
  static async seThemeMode(mode: TThemeMode = 'system') {
    return await chrome.storage.local.set({ 'dark-mode': mode });
  }

  static async getOuterHeight() {
    return (await chrome.storage.local.get('outer-height'))['outer-height'];
  }
  static async setOuterHeight(h = 120) {
    return await chrome.storage.local.set({ 'outer-height': h });
  }

  static async getSizeMode() {
    return (await chrome.storage.local.get('size-mode'))['size-mode'];
  }
  static async setSizeMode(sizeMode: TSizeMode = 'mini') {
    return await chrome.storage.local.set({ 'size-mode': sizeMode });
  }
}

export default UserSettings;