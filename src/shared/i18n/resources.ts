import { authEn } from '@features/auth/i18n/en';
import { authEs } from '@features/auth/i18n/es';
import { homeEn } from '@features/home/i18n/en';
import { homeEs } from '@features/home/i18n/es';
import { settingsEn } from '@features/settings/i18n/en';
import { settingsEs } from '@features/settings/i18n/es';
import { commonEn } from './translations/common.en';
import { commonEs } from './translations/common.es';
import { errorsEn } from './translations/errors.en';
import { errorsEs } from './translations/errors.es';

// Registro de namespaces. Cada feature nueva añade aquí su `i18n/{es,en}.ts`.
export const resources = {
  es: { common: commonEs, errors: errorsEs, auth: authEs, home: homeEs, settings: settingsEs },
  en: { common: commonEn, errors: errorsEn, auth: authEn, home: homeEn, settings: settingsEn },
} as const;

export type Namespace = keyof (typeof resources)['es'];
export const NAMESPACES = Object.keys(resources.es) as Namespace[];
