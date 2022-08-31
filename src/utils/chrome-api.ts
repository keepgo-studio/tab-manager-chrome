export function generateKey(windowId: number) {
  
}

export function setDataLocal(data: StorageSaveForm) {
  chrome.storage.local.set(data, () => {
    console.log('data saved perfectly');
  });
}

export function removeDataLocal(key: string) {
  chrome.storage.local.remove(key);
}

export async function getDataLocal(key:string | null) {
  return new Promise((res, rej) => {
    chrome.storage.local.get(key, (item) => {
      res(item);
    });
  });
}

export async function findDataLocal(key:string) {
  const result = await chrome.storage.local.get(key);

  return new Promise((res, rej) => {
    if (result) res('find data');
    else rej('error: there no such data in here');
  })
}