import type { StringRecord } from '@shared/i18n/types';
import type { homeEs } from './es';

export const homeEn: StringRecord<typeof homeEs> = {
  title: 'Hi, {{name}}',
  subtitle: 'This is the starting point of your app.',
  'empty.title': 'Nothing here yet',
  'empty.body': 'Once your feature has data, it will show up in this view.',
  'empty.action': 'Go to Settings',
  'load.error': 'We could not load your data.',
};
