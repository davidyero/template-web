import { z } from 'zod';

// Contrato de sesión con /api/<slug>/auth del monolito. Si tu dominio devuelve más campos
// del usuario, añádelos aquí (zod descarta lo que no declares).

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
});
export type SessionUser = z.infer<typeof userSchema>;

export const tokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
export type Tokens = z.infer<typeof tokensSchema>;

export const authResponseSchema = z.object({ user: userSchema, tokens: tokensSchema });
export type AuthResponse = z.infer<typeof authResponseSchema>;
