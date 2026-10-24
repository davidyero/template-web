import { useMutation } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@davidyero/ui-web/toast';
import { paths } from '@app/router/paths';
import { useSessionStore } from '@app/store/sessionStore';
import { useErrorMessage } from '@shared/hooks/useErrorMessage';
import { authApi } from '../../api/authApi';
import { useRuleMessage } from '../../utils/useRuleMessage';
import { emailRule } from '../../utils/validation';
import type { LoginErrors } from './LoginView.types';

export const useLoginView = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const describe = useErrorMessage();
  const ruleMessage = useRuleMessage();
  const setSession = useSessionStore((s) => s.setSession);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});

  const login = useMutation({
    mutationFn: () => authApi.login(email.trim(), password),
    onSuccess: ({ tokens, user }) => {
      setSession(tokens, user);
      const from = (location.state as { from?: string } | null)?.from;
      navigate(from ?? paths.home, { replace: true });
    },
    onError: (error) => toast.error(describe(error).message),
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const emailCheck = emailRule.safeParse(email);
    const next: LoginErrors = {
      email: emailCheck.success
        ? undefined
        : ruleMessage('email', emailCheck.error.issues[0]?.message),
      password: password ? undefined : ruleMessage('password', 'required'),
    };
    setErrors(next);
    if (!next.email && !next.password) login.mutate();
  };

  return {
    t,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    loading: login.isPending,
    onSubmit,
    goForgot: () => navigate(paths.forgot),
    goRegister: () => navigate(paths.register),
  };
};
