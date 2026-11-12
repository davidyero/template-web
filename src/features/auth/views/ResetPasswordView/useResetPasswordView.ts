import { useMutation } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@davidyero/ui-web/toast';
import { paths } from '@app/router/paths';
import { CODE_LENGTH } from '@shared/constants/accountPolicy';
import { useErrorMessage } from '@shared/hooks/useErrorMessage';
import { authApi } from '../../api/authApi';
import { useRuleMessage } from '../../utils/useRuleMessage';
import { codeRule, emailRule, firstRuleOf, passwordRule } from '../../utils/validation';
import type { ResetErrors } from './ResetPasswordView.types';

export const useResetPasswordView = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const describe = useErrorMessage();
  const ruleMessage = useRuleMessage();
  const [email, setEmail] = useState((location.state as { email?: string } | null)?.email ?? '');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ResetErrors>({});

  const reset = useMutation({
    mutationFn: () => authApi.resetPassword(email.trim(), code.trim(), password),
    onSuccess: () => {
      toast.success(t('reset.done'));
      navigate(paths.login, { replace: true });
    },
    onError: (error) => toast.error(describe(error).message),
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const next: ResetErrors = {
      email: ruleMessage('email', firstRuleOf(emailRule, email)),
      code: ruleMessage('code', firstRuleOf(codeRule, code)),
      password: ruleMessage('password', firstRuleOf(passwordRule, password)),
    };
    setErrors(next);
    if (!next.email && !next.code && !next.password) reset.mutate();
  };

  return {
    t,
    email,
    setEmail,
    code,
    setCode: (value: string) => setCode(value.replace(/\D/g, '').slice(0, CODE_LENGTH)),
    password,
    setPassword,
    errors,
    loading: reset.isPending,
    onSubmit,
    goLogin: () => navigate(paths.login),
  };
};
