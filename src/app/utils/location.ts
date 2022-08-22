export function moveHistory(path:string) {
  window.history.replaceState({}, '', path);
}

export function getPathName() {
  return window.location.pathname.split(/\//)[1];
}