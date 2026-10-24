import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '@app/theme/useThemeMode';
import { useUiStore } from '@app/store/uiStore';
import { LOCALES, type Locale } from '@shared/i18n/types';

export const useSuperLocaleThemeSwitch = () => {
  const { t } = useTranslation();
  const locale = useUiStore((s) => s.locale);
  const setLocale = useUiStore((s) => s.setLocale);
  const setTheme = useUiStore((s) => s.setTheme);
  const mode = useThemeMode();
  const options = useMemo(
    () => LOCALES.map((value) => ({ value, label: t(`locale.${value}`) })),
    [t],
  );
  return {
    locale,
    options,
    onLocale: (value: Locale) => setLocale(value),
    dark: mode === 'dark',
    onDark: (dark: boolean) => setTheme(dark ? 'dark' : 'light'),
    labels: { locale: t('locale.label'), theme: t('theme.label') },
  };
};
