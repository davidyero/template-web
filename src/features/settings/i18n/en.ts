import type { StringRecord } from '@shared/i18n/types';
import type { settingsEs } from './es';

export const settingsEn: StringRecord<typeof settingsEs> = {
  title: 'Settings',
  'section.preferences': 'Preferences',
  'section.account': 'Account',
  'account.signedInAs': 'Signed in as {{email}}',
  signOut: 'Sign out',
  version: 'Version {{version}}',
  signature: 'by @Davidyero 🐘',
};
