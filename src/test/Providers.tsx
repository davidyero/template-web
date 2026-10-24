import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SuperThemeProvider } from '@davidyero/ui-web/theme';
import { appTokens } from '@app/theme/tokens';
import { initI18n } from '@shared/i18n/config';

initI18n('es');

const labels = {
  showPassword: 'Mostrar contraseña',
  hidePassword: 'Ocultar contraseña',
  close: 'Cerrar',
  loading: 'Cargando',
  dismiss: 'Descartar',
};

/** Los mismos providers que la app (tema, i18n, router en memoria y TanStack Query). */
export const Providers = ({ children, route = '/' }: { children: ReactNode; route?: string }) => {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return (
    <QueryClientProvider client={client}>
      <SuperThemeProvider tokens={appTokens} mode="light" labels={labels}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </SuperThemeProvider>
    </QueryClientProvider>
  );
};
