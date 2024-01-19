export class AppStorage {
  static get<T = Record<string, string>>(key: string) {
    const data = localStorage.getItem(key);

    if (!data) {
      return undefined;
    }

    return JSON.parse(data) as T;
  }

  static add<T = Record<string, string>>(key: string, value?: T) {
    if (!value) return;

    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }
}
