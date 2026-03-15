import type { StorageAdapter } from './adapter';

const PREFIX = '{{project-slug}}:';

export class LocalStorageAdapter implements StorageAdapter {
  async loadData<T>(key: string): Promise<T | null> {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  }

  async saveData<T>(key: string, data: T): Promise<void> {
    localStorage.setItem(PREFIX + key, JSON.stringify(data));
  }
}
