import AsyncStorage from '@react-native-async-storage/async-storage';

import type { StorageKey, StorageService } from './types';

export const storage: StorageService = {
  async get<T>(key: StorageKey): Promise<T | null> {
    const value = await AsyncStorage.getItem(key);

    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      await AsyncStorage.removeItem(key);
      return null;
    }
  },

  remove(key: StorageKey) {
    return AsyncStorage.removeItem(key);
  },

  set<T>(key: StorageKey, value: T) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
  },
};
