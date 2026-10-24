import { z } from 'zod';
import {
  CODE_LENGTH,
  NAME_MAX,
  PASSWORD_POLICY,
  USERNAME_POLICY,
} from '@shared/constants/accountPolicy';

// Los `message` son claves de regla: la vista las traduce con `auth:rules.<campo>.<regla>`.
// Son los mismos tokens que devuelve el backend en VALIDATION_ERROR.details[].rule.

export const nameRule = z.string().trim().min(1, 'required').max(NAME_MAX, 'max_length');
export const usernameRule = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, 'required')
  .min(USERNAME_POLICY.minLength, 'min_length')
  .max(USERNAME_POLICY.maxLength, 'max_length')
  .regex(USERNAME_POLICY.pattern, 'pattern');
export const emailRule = z.string().trim().min(1, 'required').email('email');
export const passwordRule = z
  .string()
  .min(1, 'required')
  .min(PASSWORD_POLICY.minLength, 'min_length')
  .max(PASSWORD_POLICY.maxLength, 'max_length')
  .refine((v) => /[A-Z]/.test(v), 'uppercase')
  .refine((v) => /[a-z]/.test(v), 'lowercase')
  .refine((v) => /[0-9]/.test(v), 'digit');
export const codeRule = z
  .string()
  .trim()
  .regex(new RegExp(`^\\d{${CODE_LENGTH}}$`), 'code_format');

/** Registro: los 5 campos obligatorios del ecosistema. */
export const registerSchema = z
  .object({
    name: nameRule,
    username: usernameRule,
    email: emailRule,
    password: passwordRule,
    passwordConfirmation: z.string().min(1, 'required'),
  })
  .refine((v) => v.password === v.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'mismatch',
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export type RuleField =
  | 'name'
  | 'username'
  | 'email'
  | 'password'
  | 'passwordConfirmation'
  | 'code';

/** Primera regla incumplida por campo (validación de todo el formulario). */
export const rulesOf = <T>(
  schema: z.ZodType<T>,
  value: unknown,
): Partial<Record<RuleField, string>> => {
  const result = schema.safeParse(value);
  if (result.success) return {};
  const rules: Partial<Record<RuleField, string>> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as RuleField | undefined;
    if (field && !rules[field]) rules[field] = issue.message;
  }
  return rules;
};
