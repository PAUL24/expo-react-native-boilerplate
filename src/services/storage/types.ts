export type StorageKey = 'app.language' | 'app.theme-mode';

export type StorageService = {
  get<T>(key: StorageKey): Promise<T | null>;
  remove(key: StorageKey): Promise<void>;
  set<T>(key: StorageKey, value: T): Promise<void>;
};

export type SecureStorageKey = 'auth.access-token' | 'auth.refresh-token';

export type SecureStorageService = {
  get(key: SecureStorageKey): Promise<string | null>;
  remove(key: SecureStorageKey): Promise<void>;
  set(key: SecureStorageKey, value: string): Promise<void>;
};
