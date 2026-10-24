import type { ReactElement } from 'react';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperInput } from '@davidyero/ui-web/SuperInput';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { Fields } from './ResetPasswordView.styles';
import { useResetPasswordView } from './useResetPasswordView';

const ResetPasswordView = (): ReactElement => {
  const v = useResetPasswordView();
  return (
    <AuthLayout
      title={v.t('reset.title')}
      subtitle={v.t('reset.subtitle')}
      onSubmit={v.onSubmit}
      footer={
        <SuperButton variant="ghost" leftIcon="arrowLeft" onClick={v.goLogin}>
          {v.t('backToLogin')}
        </SuperButton>
      }
    >
      <Fields>
        <SuperInput
          label={v.t('field.email')}
          type="email"
          autoComplete="email"
          value={v.email}
          onChange={(e) => v.setEmail(e.target.value)}
          error={v.errors.email}
          fullWidth
        />
        <SuperInput
          label={v.t('field.code')}
          inputMode="numeric"
          autoComplete="one-time-code"
          value={v.code}
          onChange={(e) => v.setCode(e.target.value)}
          error={v.errors.code}
          fullWidth
        />
        <SuperInput
          label={v.t('field.newPassword')}
          type="password"
          autoComplete="new-password"
          hint={v.t('hint.password')}
          value={v.password}
          onChange={(e) => v.setPassword(e.target.value)}
          error={v.errors.password}
          fullWidth
        />
      </Fields>
      <SuperButton type="submit" loading={v.loading} fullWidth>
        {v.t('reset.submit')}
      </SuperButton>
    </AuthLayout>
  );
};

export default ResetPasswordView;
