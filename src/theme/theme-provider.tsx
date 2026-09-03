import { createContext, use, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { storage } from '@/services/storage';

import { themes } from './themes';

import type { ResolvedThemeMode, Theme, ThemeMode } from './themes';
import type { PropsWithChildren } from 'react';

type ThemeContextValue = {
  isReady: boolean;
  mode: ThemeMode;
  resolvedMode: ResolvedThemeMode;
  setMode: (mode: ThemeMode) => void;
  theme: Theme;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const themeModes: readonly ThemeMode[] = ['system', 'light', 'dark'];

const isThemeMode = (value: unknown): value is ThemeMode =>
  typeof value === 'string' && themeModes.includes(value as ThemeMode);

export function ThemeProvider({ children }: PropsWithChildren) {
  const systemMode = useColorScheme();
  const [mode, updateMode] = useState<ThemeMode>('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    storage
      .get<unknown>('app.theme-mode')
      .then((storedMode) => {
        if (isMounted && isThemeMode(storedMode)) {
          updateMode(storedMode);
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

  const setMode = (nextMode: ThemeMode) => {
    updateMode(nextMode);
    void storage.set('app.theme-mode', nextMode);
  };

  const resolvedMode: ResolvedThemeMode =
    mode === 'system' ? (systemMode === 'dark' ? 'dark' : 'light') : mode;

  return (
    <ThemeContext
      value={{
        isReady,
        mode,
        resolvedMode,
        setMode,
        theme: themes[resolvedMode],
      }}
    >
      {children}
    </ThemeContext>
  );
}

export function useTheme() {
  const context = use(ThemeContext);

  if (context === null) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return context;
}
