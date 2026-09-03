import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useTheme } from '@/theme';

import { AuthProvider, useAuth } from './auth-provider';
import { ErrorBoundaryProvider } from './error-boundary-provider';
import { LocalizationProvider, useLanguage } from './localization-provider';
import { QueryProvider } from './query-provider';

import type { PropsWithChildren } from 'react';

function BootstrapGate({ children }: PropsWithChildren) {
  const { isReady: isAuthReady } = useAuth();
  const { isReady: isLocalizationReady } = useLanguage();
  const { isReady: isThemeReady } = useTheme();
  const isReady = isAuthReady && isLocalizationReady && isThemeReady;

  useEffect(() => {
    if (isReady) {
      void SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return <View style={{ flex: 1 }} />;
  }

  return children;
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryProvider>
          <ThemeProvider>
            <LocalizationProvider>
              <AuthProvider>
                <ErrorBoundaryProvider>
                  <BootstrapGate>{children}</BootstrapGate>
                </ErrorBoundaryProvider>
              </AuthProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
