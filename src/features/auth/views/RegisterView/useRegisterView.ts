import { useMutation } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from '@davidyero/ui-web/toast';
import { paths } from '@app/router/paths';
import { useSessionStore } from '@app/store/sessionStore';
import { useUiStore } from '@app/store/uiStore';
import { useErrorMessage } from '@shared/hooks/useErrorMessage';
import { authApi } from '../../api/authApi';
import { detailsToRules, useRuleMessage } from '../../utils/useRuleMessage';
import { registerSchema, rulesOf, type RuleField } from '../../utils/validation';
import type { RegisterErrors, RegisterValues } from './RegisterView.types';

const EMPTY: RegisterValues = {
  name: '',
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const useRegisterView = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const describe = useErrorMessage();
  const ruleMessage = useRuleMessage();
  const setSession = useSessionStore((s) => s.setSession);
  const locale = useUiStore((s) => s.locale);
  const [values, setValues] = useState<RegisterValues>(EMPTY);
  const [errors, setErrors] = useState<RegisterErrors>({});

  const toMessages = (rules: Partial<Record<RuleField, string>>): RegisterErrors =>
    Object.fromEntries(
      Object.entries(rules).map(([field, rule]) => [field, ruleMessage(field as RuleField, rule)]),
    );

  const register = useMutation({
    mutationFn: () => authApi.register(registerSchema.parse(values), locale),
    onSuccess: ({ tokens, user }) => {
      setSession(tokens, user);
      navigate(paths.home, { replace: true });
    },
    onError: (error) => {
      const view = describe(error);
      if (view.code === 'AUTH_USERNAME_TAKEN')
        return setErrors({ username: ruleMessage('username', 'taken') });
      if (view.code === 'AUTH_EMAIL_TAKEN')
        return setErrors({ email: ruleMessage('email', 'taken') });
      const rules = detailsToRules(view.fields);
      if (view.code === 'VALIDATION_ERROR' && Object.keys(rules).length > 0)
        return setErrors(toMessages(rules));
      toast.error(view.message);
    },
  });

  const set = (field: keyof RegisterValues) => (value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  /** Al salir de un campo se valida solo ese (sin gritar errores antes de tiempo). */
  const validateField = (field: keyof RegisterValues): void => {
    const rule = rulesOf(registerSchema, values)[field];
    setErrors((prev) => ({ ...prev, [field]: ruleMessage(field, rule) }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const rules = rulesOf(registerSchema, values);
    setErrors(toMessages(rules));
    if (Object.keys(rules).length === 0) register.mutate();
  };

  return {
    t,
    values,
    set,
    errors,
    validateField,
    loading: register.isPending,
    onSubmit,
    goLogin: () => navigate(paths.login),
  };
};
