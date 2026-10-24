import { z } from 'zod';

// ÚNICO lugar donde se lee import.meta.env. El resto de la app importa `env`.
const schema = z.object({
  VITE_API_URL: z.string().url(),
  VITE_APP_SLUG: z.string().regex(/^[a-z0-9-]+$/),
  VITE_DEFAULT_LOCALE: z.enum(['es', 'en']).default('es'),
});

const parsed = schema.parse(import.meta.env);

export const env = {
  /** Base de las llamadas: el dominio de esta app dentro del monolito. */
  apiBaseUrl: `${parsed.VITE_API_URL.replace(/\/+$/, '')}/api/${parsed.VITE_APP_SLUG}`,
  appSlug: parsed.VITE_APP_SLUG,
  defaultLocale: parsed.VITE_DEFAULT_LOCALE,
  appVersion: __APP_VERSION__,
} as const;
