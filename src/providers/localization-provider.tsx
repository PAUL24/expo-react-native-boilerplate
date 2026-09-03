import { createContext, use, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

import { storage } from '@/services/storage';
import { i18n } from '@/translations';
import type { Language } from '@/translations';

import type { PropsWithChildren } from 'react';

type LocalizationContextValue = {
  isReady: boolean;
  language: Language;
  setLanguage: (language: Language) => Promise<void>;
};

const LocalizationContext = createContext<LocalizationContextValue | null>(null);
const languages: readonly Language[] = ['en', 'fr'];

const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && languages.includes(value as Language);

export function LocalizationProvider({ children }: PropsWithChildren) {
  const initialLanguage: Language = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const [language, updateLanguage] = useState<Language>(initialLanguage);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    storage
      .get<unknown>('app.language')
      .then(async (storedLanguage) => {
        const nextLanguage = isLanguage(storedLanguage) ? storedLanguage : initialLanguage;
        await i18n.changeLanguage(nextLanguage);

        if (isMounted) {
          updateLanguage(nextLanguage);
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
  }, [initialLanguage]);

  const setLanguage = async (nextLanguage: Language) => {
    await Promise.all([
      i18n.changeLanguage(nextLanguage),
      storage.set('app.language', nextLanguage),
    ]);
    updateLanguage(nextLanguage);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <LocalizationContext value={{ isReady, language, setLanguage }}>
        {children}
      </LocalizationContext>
    </I18nextProvider>
  );
}

export function useLanguage() {
  const context = use(LocalizationContext);

  if (context === null) {
    throw new Error('useLanguage must be used within LocalizationProvider.');
  }

  return context;
}
