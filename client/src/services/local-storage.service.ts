export function localStorageService(token: string): void {
  return localStorage.setItem("token", JSON.stringify(token));
}
