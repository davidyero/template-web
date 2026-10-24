import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { loaderStore } from '@davidyero/ui-web/loader';
import { env } from '@app/config/env';
import { useSessionStore } from '@app/store/sessionStore';
import { normalizeError } from '@shared/services/errors/normalizeError';
import { tokensSchema, type Tokens } from '@shared/services/session/sessionSchemas';

declare module 'axios' {
  interface AxiosRequestConfig {
    /** No levanta el loader global (polling, refetch en segundo plano, autosave). */
    silent?: boolean;
    /** No intenta refrescar el token (la propia llamada de refresh). */
    skipAuthRefresh?: boolean;
    _retried?: boolean;
    /** Cierre del loader de esta petición (idempotente). */
    _release?: () => void;
  }
}

export const http = axios.create({ baseURL: env.apiBaseUrl, timeout: 20_000 });

/** Se dispara cuando la sesión caducó sin remedio (logout + login + aviso). */
let onSessionExpired: () => void = () => undefined;
export const setSessionExpiredHandler = (handler: () => void): void => {
  onSessionExpired = handler;
};

const release = (config?: InternalAxiosRequestConfig): void => {
  config?._release?.();
  if (config) config._release = undefined;
};

http.interceptors.request.use((config) => {
  const token = useSessionStore.getState().tokens?.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  // Loader de pantalla completa en toda petición que no sea silenciosa.
  if (!config.silent && !config._release) config._release = loaderStore.start();
  return config;
});

// Refresh ÚNICO: si varias peticiones caducan a la vez, todas esperan al mismo.
let refreshing: Promise<Tokens> | null = null;

const refreshTokens = async (): Promise<Tokens> => {
  const refreshToken = useSessionStore.getState().tokens?.refreshToken;
  if (!refreshToken) throw new Error('no refresh token');
  const { data } = await http.post<unknown>(
    '/auth/refresh',
    { refreshToken },
    { silent: true, skipAuthRefresh: true },
  );
  const tokens = tokensSchema.parse((data as { tokens: unknown }).tokens);
  useSessionStore.getState().setTokens(tokens);
  return tokens;
};

http.interceptors.response.use(
  (response) => {
    release(response.config);
    return response;
  },
  async (error: AxiosError) => {
    const config = error.config;
    release(config);
    const appError = normalizeError(error);

    if (
      config &&
      !config.skipAuthRefresh &&
      !config._retried &&
      appError.code === 'TOKEN_EXPIRED'
    ) {
      try {
        refreshing ??= refreshTokens().finally(() => {
          refreshing = null;
        });
        const tokens = await refreshing;
        config._retried = true;
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return http(config);
      } catch {
        onSessionExpired();
        return Promise.reject(appError);
      }
    }

    if (
      (appError.code === 'UNAUTHORIZED' || appError.code === 'TOKEN_EXPIRED') &&
      !config?.skipAuthRefresh
    ) {
      onSessionExpired();
    }
    return Promise.reject(appError);
  },
);
