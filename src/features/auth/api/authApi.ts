import { http } from '@shared/services/http/httpClient';
import type { Locale } from '@shared/i18n/types';
import { authResponseSchema, type AuthResponse } from '@shared/services/session/sessionSchemas';
import type { RegisterInput } from '../utils/validation';

// Contrato de auth del monolito: /api/<slug>/auth/*.
export const authApi = {
  register: async (input: RegisterInput, uiLanguage: Locale): Promise<AuthResponse> =>
    authResponseSchema.parse((await http.post('/auth/register', { ...input, uiLanguage })).data),
  login: async (email: string, password: string): Promise<AuthResponse> =>
    authResponseSchema.parse((await http.post('/auth/login', { email, password })).data),
  forgotPassword: async (email: string): Promise<void> => {
    await http.post('/auth/forgot-password', { email });
  },
  resetPassword: async (email: string, code: string, newPassword: string): Promise<void> => {
    await http.post('/auth/reset-password', { email, code, newPassword });
  },
};
