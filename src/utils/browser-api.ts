export function connectToBack(name: string) {
  return chrome.runtime.connect({ name });
}

/**
 * get all windows by chrome api
 * @returns ChromeWindow[]
 */
export async function getAllChromeWindow(): Promise<ChromeWindow[]> {
  return await chrome.windows.getAll({
    populate: true,
    windowTypes: ['normal'],
  });
}

export function focusTab(
  windowId: number,
  tabId: number,
  config: Partial<{
    top: number;
    left: number;
    width: number;
    height: number;
    state: chrome.windows.windowStateEnum;
  }>
) {
  const { top, left, width, height, state } = config;

  chrome.windows.update(
    windowId,
    {
      focused: true,
      top,
      left,
      width,
      height,
      state,
    },
    (w) => {
      if (w.id && w.state !== state) {
        chrome.windows.update(w.id, {
          top,
          left,
          width,
          height,
          state,
        });
      }

      chrome.tabs.update(tabId, { active: true });
    }
  );
}

export function removeTab(tabId: number) {
  chrome.tabs.remove(tabId);
}

export function closeWindow(windowId: number) {
  chrome.windows.remove(windowId);
}