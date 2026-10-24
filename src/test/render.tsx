import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { Providers } from './Providers';

/** Render de una vista con tema, i18n, router en memoria y TanStack Query, como en la app. */
export const renderView = (ui: ReactElement, route = '/'): RenderResult =>
  render(<Providers route={route}>{ui}</Providers>);
