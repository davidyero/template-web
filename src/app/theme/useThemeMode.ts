import { useUiStore, type ThemeMode } from '@app/store/uiStore';
import { useMediaQuery } from '@shared/hooks/useMediaQuery';

/** Modo efectivo: el elegido o, si no hay, el del sistema. */
export const useThemeMode = (): ThemeMode => {
  const chosen = useUiStore((s) => s.theme);
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  return chosen ?? (systemDark ? 'dark' : 'light');
};
