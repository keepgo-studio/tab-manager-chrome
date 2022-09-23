export function moveHistory(path:string) {
  window.history.pushState({}, '', path);
}

export function getPathName() {
  return window.location.pathname.split(/\//)[1];
}