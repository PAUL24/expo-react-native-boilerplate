import { getLocales } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';

export const resources = {
  en: { translation: en },
  fr: { translation: fr },
} as const;

export type Language = keyof typeof resources;

const deviceLanguage: Language = getLocales()[0]?.languageCode === 'fr' ? 'fr' : 'en';

// i18next's documented plugin initialization API is an instance method.
// eslint-disable-next-line import/no-named-as-default-member
void i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: deviceLanguage,
  resources,
});

export { i18n };
