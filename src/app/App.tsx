import type { ReactElement } from 'react';
import { AppProviders } from './providers/AppProviders';
import { AppRouter } from './router/AppRouter';

export const App = (): ReactElement => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
);
