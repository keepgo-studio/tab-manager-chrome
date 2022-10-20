
export function connectToBack(name: string) {
  return chrome.runtime.connect({ name });
}

/**
 * get all windows by chrome api
 * @returns ChromeWindow[]
 */
export async function getAllChromeWindow(): Promise<ChromeWindow[]> {
  return await chrome.windows.getAll();
}