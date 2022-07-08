function save(key: string, value: any): void {
  return localStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string): void {
  return localStorage.removeItem(key);
}

function get(key: string): any {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (e) {
    console.log(e);
  }
}

export const localStorageService = {
  save,
  remove,
  get
};
