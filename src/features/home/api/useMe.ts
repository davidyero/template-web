import { useQuery } from '@tanstack/react-query';
import { useSessionStore } from '@app/store/sessionStore';
import { http } from '@shared/services/http/httpClient';
import { userSchema, type SessionUser } from '@shared/services/session/sessionSchemas';

/** Perfil de la persona (`GET /me`): refresca el usuario guardado en la sesión. */
export const useMe = () =>
  useQuery<SessionUser>({
    queryKey: ['me'],
    queryFn: async () => {
      const user = userSchema.parse((await http.get('/me')).data);
      useSessionStore.getState().setUser(user);
      return user;
    },
  });
