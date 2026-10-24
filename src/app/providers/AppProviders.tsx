import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useMemo, type ReactElement, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { SuperLoaderOverlay } from '@davidyero/ui-web/SuperLoaderOverlay';
import { SuperToast } from '@davidyero/ui-web/SuperToast';
import { SuperThemeProvider } from '@davidyero/ui-web/theme';
import { appIcons } from '@app/theme/icons';
import { appTokens, themeColor } from '@app/theme/tokens';
import { useThemeMode } from '@app/theme/useThemeMode';
import { useUiStore } from '@app/store/uiStore';
import { i18n, initI18n } from '@shared/i18n/config';
import { GlobalStyles } from './GlobalStyles';

initI18n(useUiStore.getState().locale);

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 60_000 } },
});

/** Idioma → i18next + <html lang>. */
const LocaleSync = (): null => {
  const locale = useUiStore((s) => s.locale);
  useEffect(() => {
    void i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
};

/** Design system: tokens de la app, textos accesibles desde i18n, loader y toasts globales. */
const DesignSystem = ({ children }: { children: ReactNode }): ReactElement => {
  const { t } = useTranslation();
  const mode = useThemeMode();
  const labels = useMemo(
    () => ({
      showPassword: t('a11y.showPassword'),
      hidePassword: t('a11y.hidePassword'),
      close: t('a11y.close'),
      loading: t('a11y.loading'),
      dismiss: t('a11y.dismiss'),
    }),
    [t],
  );
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor[mode]);
  }, [mode]);
  return (
    <SuperThemeProvider tokens={appTokens} mode={mode} labels={labels} icons={appIcons}>
      <GlobalStyles />
      {children}
      {/* UNO solo en toda la app: lo gobiernan los interceptores HTTP vía loaderStore. */}
      <SuperLoaderOverlay />
      <SuperToast />
    </SuperThemeProvider>
  );
};

export const AppProviders = ({ children }: { children: ReactNode }): ReactElement => (
  <QueryClientProvider client={queryClient}>
    <LocaleSync />
    <DesignSystem>{children}</DesignSystem>
  </QueryClientProvider>
);
