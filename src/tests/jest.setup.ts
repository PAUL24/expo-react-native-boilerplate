import { jest } from '@jest/globals';
import { setUpTests } from 'react-native-reanimated';

setUpTests();

const mockAsyncStorageData = new Map<string, string>();

jest.mock('@react-native-async-storage/async-storage', () => ({
  __esModule: true,
  default: {
    clear: jest.fn(async () => {
      mockAsyncStorageData.clear();
    }),
    getItem: jest.fn(async (key: string) => mockAsyncStorageData.get(key) ?? null),
    removeItem: jest.fn(async (key: string) => {
      mockAsyncStorageData.delete(key);
    }),
    setItem: jest.fn(async (key: string, value: string) => {
      mockAsyncStorageData.set(key, value);
    }),
  },
}));

jest.mock(
  'react-native-safe-area-context',
  () =>
    jest.requireActual<{ default: typeof import('react-native-safe-area-context') }>(
      'react-native-safe-area-context/jest/mock',
    ).default,
);

jest.mock('expo-localization', () => ({
  getLocales: () => [{ languageCode: 'en', languageTag: 'en-NZ' }],
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
  ImpactFeedbackStyle: { Light: 'light' },
}));

jest.mock('expo-secure-store', () => ({
  deleteItemAsync: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
  getItemAsync: jest.fn<() => Promise<string | null>>().mockResolvedValue(null),
  setItemAsync: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
}));
