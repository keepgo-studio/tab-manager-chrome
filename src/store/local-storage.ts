class UserSettings {
  init() {
    chrome.storage.local.get(['dark-mode', 'outer-height'], (items) => {
      if (!items['dark-mode']) this.setDarkMode();
      if (!items['outer-height']) this.setOuterHeight();
    });
  }

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

  addChangeHandler(handler: {
    (changes: { [x: string]: any }): void;
    (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: 'sync' | 'local' | 'managed' | 'session'
    ): void;
  }) {
    chrome.storage.onChanged.addListener(handler);
  }
}

const userSettings = new UserSettings();

export { userSettings };
