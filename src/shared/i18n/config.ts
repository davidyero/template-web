import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { NAMESPACES, resources } from './resources';
import type { Locale } from './types';

export const initI18n = (locale: Locale): typeof i18n => {
  if (i18n.isInitialized) return i18n;
  void i18n.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: 'es',
    ns: NAMESPACES,
    defaultNS: 'common',
    keySeparator: false,
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  return i18n;
};

export { i18n };
