import { useQueryClient } from '@tanstack/react-query';
import { createContext, use, useEffect, useState } from 'react';

import { authService } from '@/services/auth/auth-service';

import type { PropsWithChildren } from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  isReady: boolean;
  logout: () => Promise<void>;
  setSession: (accessToken: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    authService
      .getAccessToken()
      .then((token) => {
        if (isMounted) {
          setAccessToken(token);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const logout = async () => {
    await authService.clearSession();
    setAccessToken(null);
    queryClient.clear();
  };

  const setSession = async (token: string) => {
    await authService.setAccessToken(token);
    setAccessToken(token);
  };

  return (
    <AuthContext value={{ isAuthenticated: accessToken !== null, isReady, logout, setSession }}>
      {children}
    </AuthContext>
  );
}

export function useAuth() {
  const context = use(AuthContext);

  if (context === null) {
    throw new Error('useAuth must be used within AuthProvider.');
  }

  return context;
}
