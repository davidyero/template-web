import type { StringRecord } from '../types';
import type { commonEs } from './common.es';

export const commonEn: StringRecord<typeof commonEs> = {
  appName: 'Template',
  'nav.home': 'Home',
  'nav.settings': 'Settings',
  'nav.aria': 'Main navigation',
  'locale.label': 'Language',
  'locale.es': 'Español',
  'locale.en': 'English',
  'theme.label': 'Dark mode',
  'a11y.showPassword': 'Show password',
  'a11y.hidePassword': 'Hide password',
  'a11y.close': 'Close',
  'a11y.loading': 'Loading',
  'a11y.dismiss': 'Dismiss',
  sessionExpired: 'Your session ended. Please sign in again.',
  'crash.title': 'Something went wrong',
  'crash.body': 'Reload the page. If it happens again, let us know.',
  'crash.action': 'Reload',
  'notFound.title': 'This page does not exist',
  'notFound.body': 'The link may be wrong or the page may have moved.',
  'notFound.action': 'Go home',
  'page.retry': 'Retry',
};
