/**
 * Enums that doesn't need to iterate in router.ts are defined as 'const enum'
 *  since these are not needed at runtime.
 */
export const enum AppEventType {
  SET_SIZE="SET_SIZE",
  TERMINATE="TERMINATE",
}
export const enum ChromeEventType {
  WINDOW_CREATED="WINDOW_CREATED",
  WINDOW_CLOSED="WINDOW_CLOSED",
  TAB_CREATED="TAB_CREATED",
  TAB_UPDATED="TAB_UPDATED",
  TAB_MOVED="TAB_MOVED",
  TAB_CLOSED="TAB_CLOSED",
  FOCUS_CHANGED="FOCUS_CHANGED",
  ACTIVE_CHANGED="ACTIVE_CHANGED",
}
export const enum UserSettingsEventType {
  THEME_MODE="theme-mode",
  SIZE_MODE="size-mode"
}
export enum UsersEventType {
  CHANGE_MODE="CHANGE_MODE",
  // CLOSE_WINDOW="CLOSE_WINDOW",
  // OPEN_TAB="OPEN_TAB",
  // CLOSE_TAB="CLOSE_TAB",
  SAVE_WINDOW="SAVE_WINDOW",
  OPEN_SAVED_WINDOW="OPEN_SAVED_WINDOW",
  DELETE_SAVED_WINDOW="DELETE_SAVED_WINDOW",
}
export enum MessageEventType {
  SUCCESS="SUCCESS",
  FAILED="FAILED"
}
