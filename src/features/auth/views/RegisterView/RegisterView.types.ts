import type { RegisterInput, RuleField } from '../../utils/validation';

export type RegisterValues = RegisterInput;
export type RegisterErrors = Partial<Record<RuleField, string>>;
