import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { env } from '@app/config/env';
import { useSessionStore } from '@app/store/sessionStore';
import { signOut } from '@shared/services/session/signOut';

export const useSettingsView = () => {
  const { t } = useTranslation('settings');
  const queryClient = useQueryClient();
  const email = useSessionStore((s) => s.user?.email ?? '');
  return {
    t,
    email,
    // Versión leída de package.json en el build (__APP_VERSION__), nunca escrita a mano.
    version: env.appVersion,
    onSignOut: () => signOut(queryClient),
  };
};
