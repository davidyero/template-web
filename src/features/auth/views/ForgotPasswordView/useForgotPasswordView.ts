import { useMutation } from '@tanstack/react-query';
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from '@davidyero/ui-web/toast';
import { paths } from '@app/router/paths';
import { useErrorMessage } from '@shared/hooks/useErrorMessage';
import { authApi } from '../../api/authApi';
import { useRuleMessage } from '../../utils/useRuleMessage';
import { emailRule } from '../../utils/validation';
import type { ForgotStep } from './ForgotPasswordView.types';

export const useForgotPasswordView = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const describe = useErrorMessage();
  const ruleMessage = useRuleMessage();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [step, setStep] = useState<ForgotStep>('request');

  const forgot = useMutation({
    mutationFn: () => authApi.forgotPassword(email.trim()),
    // Misma respuesta exista o no la cuenta: no se revela quién está registrado.
    onSuccess: () => setStep('sent'),
    onError: (err) => toast.error(describe(err).message),
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (step === 'sent') {
      navigate(paths.reset, { state: { email: email.trim() } });
      return;
    }
    const check = emailRule.safeParse(email);
    const message = check.success
      ? undefined
      : ruleMessage('email', check.error.issues[0]?.message);
    setError(message);
    if (!message) forgot.mutate();
  };

  return {
    t,
    email,
    setEmail,
    error,
    step,
    loading: forgot.isPending,
    onSubmit,
    goLogin: () => navigate(paths.login),
  };
};
