export class UserSettings {
  async getDarkMode() {
    return await chrome.storage.local.get('dark-mode');
  }
}