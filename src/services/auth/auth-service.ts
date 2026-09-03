import { secureStorage } from '@/services/storage';

export const authService = {
  clearSession: async () => {
    await Promise.all([
      secureStorage.remove('auth.access-token'),
      secureStorage.remove('auth.refresh-token'),
    ]);
  },
  getAccessToken: () => secureStorage.get('auth.access-token'),
  setAccessToken: (token: string) => secureStorage.set('auth.access-token', token),
};
