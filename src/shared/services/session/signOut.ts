import type { QueryClient } from '@tanstack/react-query';
import { useSessionStore } from '@app/store/sessionStore';
import { http } from '@shared/services/http/httpClient';

/** Cierra la sesión. El aviso al servidor es de mejor esfuerzo (sin red, el refresh caduca solo). */
export const signOut = (queryClient: QueryClient): void => {
  const tokens = useSessionStore.getState().tokens;
  if (tokens)
    void http
      .post('/auth/logout', { refreshToken: tokens.refreshToken }, { silent: true })
      .catch(() => undefined);
  useSessionStore.getState().clear('signedOut');
  queryClient.clear();
};
