import type { ReactElement } from 'react';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperInput } from '@davidyero/ui-web/SuperInput';
import { SuperTypography } from '@davidyero/ui-web/SuperTypography';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { ForgotRow } from './LoginView.styles';
import { useLoginView } from './useLoginView';

const LoginView = (): ReactElement => {
  const v = useLoginView();
  return (
    <AuthLayout
      title={v.t('login.title')}
      subtitle={v.t('login.subtitle')}
      onSubmit={v.onSubmit}
      footer={
        <>
          <SuperTypography variant="bodySmall" color="textMuted">
            {v.t('login.noAccount')}
          </SuperTypography>
          <SuperButton variant="ghost" onClick={v.goRegister}>
            {v.t('login.toRegister')}
          </SuperButton>
        </>
      }
    >
      <SuperInput
        label={v.t('field.email')}
        type="email"
        autoComplete="email"
        leftIcon="mail"
        value={v.email}
        onChange={(e) => v.setEmail(e.target.value)}
        error={v.errors.email}
        fullWidth
      />
      <SuperInput
        label={v.t('field.password')}
        type="password"
        autoComplete="current-password"
        leftIcon="lock"
        value={v.password}
        onChange={(e) => v.setPassword(e.target.value)}
        error={v.errors.password}
        fullWidth
      />
      <ForgotRow>
        <SuperButton variant="ghost" size="sm" onClick={v.goForgot}>
          {v.t('login.forgot')}
        </SuperButton>
      </ForgotRow>
      <SuperButton type="submit" loading={v.loading} fullWidth>
        {v.t('login.submit')}
      </SuperButton>
    </AuthLayout>
  );
};

export default LoginView;
