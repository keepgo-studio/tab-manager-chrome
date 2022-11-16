/**
 * Enums that doesn't need to iterate in router.ts are defined as 'const enum'
 *  since these are not needed at runtime.
 */

// only back can fire this event
export const enum AppLifeCycleEventType {
  SET_SIZE="SET_SIZE",
  TERMINATE="TERMINATE",
}
export const enum AppEventType {
  USER_SETTINGS_CHNAGED="USER_SETTINGS_CHNAGED",
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

// --------------------------------------------------

// only front and front's child can fire this event
export enum UsersEventType {
  CHANGE_MODE="CHANGE_MODE",
  // CLOSE_WINDOW="CLOSE_WINDOW",
  // OPEN_TAB="OPEN_TAB",
  // CLOSE_TAB="CLOSE_TAB",
  SAVE_WINDOW="SAVE_WINDOW",
  OPEN_SAVED_WINDOW="OPEN_SAVED_WINDOW",
  DELETE_SAVED_WINDOW="DELETE_SAVED_WINDOW",
  DELETE_SAVED_TAB="DELETE_SAVED_TAB",
  OPEN_SETTING="OPEN_SETTING",
}
export enum MessageEventType {
  SUCCESS="SUCCESS",
  FAILED="FAILED"
}
export enum FrontInitEventType {
  RESET_WINDOW_ID="RESET_WINDOW_ID",
  SET_WINDOWS_CONTENT="SET_WINDOWS_CONTENT",
  SET_SIZE_SETTING="SET_SIZE_SETTING"
}