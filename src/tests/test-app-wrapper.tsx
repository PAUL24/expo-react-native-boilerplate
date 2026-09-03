import { I18nextProvider } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider } from '@/theme';
import { i18n } from '@/translations';

import type { PropsWithChildren } from 'react';

export function TestAppWrapper({ children }: PropsWithChildren) {
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider>{children}</ThemeProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
