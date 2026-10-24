import 'i18next';
import type { resources } from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    keySeparator: false;
    resources: (typeof resources)['es'];
    returnNull: false;
  }
}
