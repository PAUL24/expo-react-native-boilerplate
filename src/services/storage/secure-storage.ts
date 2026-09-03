import * as SecureStore from 'expo-secure-store';

import type { SecureStorageService } from './types';

const webSessionStorage = new Map<string, string>();
const secureStoreOptions: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
};

const isWeb = process.env.EXPO_OS === 'web';

export const secureStorage: SecureStorageService = {
  async get(key) {
    if (isWeb) {
      return webSessionStorage.get(key) ?? null;
    }

    return SecureStore.getItemAsync(key);
  },

  async remove(key) {
    if (isWeb) {
      webSessionStorage.delete(key);
      return;
    }

    await SecureStore.deleteItemAsync(key);
  },

  async set(key, value) {
    if (isWeb) {
      webSessionStorage.set(key, value);
      return;
    }

    await SecureStore.setItemAsync(key, value, secureStoreOptions);
  },
};
