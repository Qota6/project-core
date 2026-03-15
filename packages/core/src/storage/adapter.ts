/**
 * StorageAdapter — データ永続化の抽象インターフェース
 *
 * localStorage → Supabase への移行を透過的に行うための設計。
 * アプリケーション側はこのインターフェースのみに依存する。
 */
export interface StorageAdapter {
  loadData<T>(key: string): Promise<T | null>;
  saveData<T>(key: string, data: T): Promise<void>;
}
