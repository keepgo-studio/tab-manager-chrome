/**
 *   "theme-mode": TThemeMode;
 *   "lang-mode": TLangMode;
 *   "size-mode": TSizeMode;
 */

import { AppEventType } from "@src/shared/events";


class UserSettings {
  static entries: Element[] = [];

  static attachToObserver(elem: Element) {
    this.entries.push(elem);
  }

  static pushUpdateToEntries(userSettings: TUserSettingMap) {
    this.entries.forEach((elem) =>
      elem.dispatchEvent(
        new CustomEvent(AppEventType.USER_SETTINGS_CHNAGED, { detail: userSettings })
      )
    );
  }
  
  static detachFromObserver(elem: Element) {
    this.entries = this.entries.filter(_elem => _elem !== elem);
  }

  static async geThemeMode() {
    return (await chrome.storage.local.get('theme-mode'))['theme-mode'];
  }
  
  static async setThemeMode(mode: TThemeMode = 'system') {
    return await chrome.storage.local.set({ 'theme-mode': mode });
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

  static async getAllSettings() {
    return await chrome.storage.local.get([
      'size-mode',
      'lang-mode',
      'theme-mode'
    ]);

  }
}

export default UserSettings;
