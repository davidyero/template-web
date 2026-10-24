import type { ReactElement } from 'react';
import { SuperAlert } from '@davidyero/ui-web/SuperAlert';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperInput } from '@davidyero/ui-web/SuperInput';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { Stack } from './ForgotPasswordView.styles';
import { useForgotPasswordView } from './useForgotPasswordView';

const ForgotPasswordView = (): ReactElement => {
  const v = useForgotPasswordView();
  return (
    <AuthLayout
      title={v.t('forgot.title')}
      subtitle={v.t('forgot.subtitle')}
      onSubmit={v.onSubmit}
      footer={
        <SuperButton variant="ghost" leftIcon="arrowLeft" onClick={v.goLogin}>
          {v.t('backToLogin')}
        </SuperButton>
      }
    >
      <Stack>
        <SuperInput
          label={v.t('field.email')}
          type="email"
          autoComplete="email"
          leftIcon="mail"
          value={v.email}
          onChange={(e) => v.setEmail(e.target.value)}
          error={v.error}
          disabled={v.step === 'sent'}
          fullWidth
        />
        {v.step === 'sent' && <SuperAlert tone="success">{v.t('forgot.sent')}</SuperAlert>}
      </Stack>
      <SuperButton type="submit" loading={v.loading} fullWidth>
        {v.step === 'sent' ? v.t('reset.title') : v.t('forgot.submit')}
      </SuperButton>
    </AuthLayout>
  );
};

export default ForgotPasswordView;
