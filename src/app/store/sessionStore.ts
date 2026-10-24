import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { env } from '@app/config/env';
import { persistStorage } from '@shared/services/storage/safeStorage';
import type { SessionUser, Tokens } from '@shared/services/session/sessionSchemas';

// JWT en localStorage vía Zustand persist, como el resto de webs del ecosistema: el backend
// vive en otro dominio y una cookie de terceros no sirve. El refresh token es rotativo.

/** Cómo terminó la última sesión: decide a dónde llevan las rutas protegidas. */
export type SessionEnd = 'expired' | 'signedOut';

interface SessionState {
  tokens: Tokens | null;
  user: SessionUser | null;
  endedBy: SessionEnd | null;
  setSession: (tokens: Tokens, user: SessionUser) => void;
  setTokens: (tokens: Tokens) => void;
  setUser: (user: SessionUser) => void;
  clear: (reason?: SessionEnd) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      tokens: null,
      user: null,
      endedBy: null,
      setSession: (tokens, user) => set({ tokens, user, endedBy: null }),
      setTokens: (tokens) => set({ tokens }),
      setUser: (user) => set({ user }),
      clear: (reason = 'expired') => set({ tokens: null, user: null, endedBy: reason }),
    }),
    { name: `${env.appSlug}:session:v1`, storage: persistStorage, version: 1 },
  ),
);
