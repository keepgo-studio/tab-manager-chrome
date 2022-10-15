export class UserSettings {
  async getDarkMode() {
    return await chrome.storage.local.get('dark-mode');
  }

  async getOuterHeight() {
    return await chrome.storage.local.get('outer-height');
  }

  async setDarkMode(mode = 'dark') {
    return await chrome.storage.local.set({ 'dark-mode': mode });
  }

  async setOuterHeight(h = 120) {
    return await chrome.storage.local.set({ 'outer-height': h });
  }
}