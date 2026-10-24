import { useSyncExternalStore } from 'react';

/** `true` mientras la media query se cumpla (p. ej. `(prefers-color-scheme: dark)`). */
export const useMediaQuery = (query: string): boolean =>
  useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
