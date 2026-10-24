import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { env } from '@app/config/env';
import type { Locale } from '@shared/i18n/types';
import { persistStorage } from '@shared/services/storage/safeStorage';

export type ThemeMode = 'light' | 'dark';

interface UiState {
  /** null = sigue al sistema hasta que la persona elija. */
  theme: ThemeMode | null;
  locale: Locale;
  setTheme: (theme: ThemeMode) => void;
  setLocale: (locale: Locale) => void;
}

/** Preferencias de interfaz en este dispositivo. */
export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: null,
      locale: env.defaultLocale,
      setTheme: (theme) => set({ theme }),
      setLocale: (locale) => set({ locale }),
    }),
    { name: `${env.appSlug}:ui:v1`, storage: persistStorage, version: 1 },
  ),
);
