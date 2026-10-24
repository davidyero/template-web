// Política de cuenta: los MISMOS números que el dominio del backend. Una regla que valida
// un solo lado no es regla: si cambias algo aquí, cámbialo también en el monolito.
export const PASSWORD_POLICY = { minLength: 8, maxLength: 128 } as const;
export const USERNAME_POLICY = { minLength: 3, maxLength: 20, pattern: /^[a-z0-9._]+$/ } as const;
export const NAME_MAX = 80;
export const CODE_LENGTH = 6;
