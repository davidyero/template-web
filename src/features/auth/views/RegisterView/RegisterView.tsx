import type { ReactElement } from 'react';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperInput } from '@davidyero/ui-web/SuperInput';
import { SuperTypography } from '@davidyero/ui-web/SuperTypography';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { Fields } from './RegisterView.styles';
import { useRegisterView } from './useRegisterView';

/** Registro con los 5 campos del ecosistema, validados aquí y en el backend. */
const RegisterView = (): ReactElement => {
  const v = useRegisterView();
  return (
    <AuthLayout
      title={v.t('register.title')}
      subtitle={v.t('register.subtitle')}
      onSubmit={v.onSubmit}
      footer={
        <>
          <SuperTypography variant="bodySmall" color="textMuted">
            {v.t('register.hasAccount')}
          </SuperTypography>
          <SuperButton variant="ghost" onClick={v.goLogin}>
            {v.t('register.toLogin')}
          </SuperButton>
        </>
      }
    >
      <Fields>
        <SuperInput
          label={v.t('field.name')}
          autoComplete="name"
          leftIcon="user"
          value={v.values.name}
          onChange={(e) => v.set('name')(e.target.value)}
          onBlur={() => v.validateField('name')}
          error={v.errors.name}
          fullWidth
        />
        <SuperInput
          label={v.t('field.username')}
          autoComplete="username"
          autoCapitalize="none"
          hint={v.t('hint.username')}
          value={v.values.username}
          onChange={(e) => v.set('username')(e.target.value)}
          onBlur={() => v.validateField('username')}
          error={v.errors.username}
          fullWidth
        />
        <SuperInput
          label={v.t('field.email')}
          type="email"
          autoComplete="email"
          leftIcon="mail"
          value={v.values.email}
          onChange={(e) => v.set('email')(e.target.value)}
          onBlur={() => v.validateField('email')}
          error={v.errors.email}
          fullWidth
        />
        <SuperInput
          label={v.t('field.password')}
          type="password"
          autoComplete="new-password"
          hint={v.t('hint.password')}
          value={v.values.password}
          onChange={(e) => v.set('password')(e.target.value)}
          onBlur={() => v.validateField('password')}
          error={v.errors.password}
          fullWidth
        />
        <SuperInput
          label={v.t('field.passwordConfirmation')}
          type="password"
          autoComplete="new-password"
          value={v.values.passwordConfirmation}
          onChange={(e) => v.set('passwordConfirmation')(e.target.value)}
          onBlur={() => v.validateField('passwordConfirmation')}
          error={v.errors.passwordConfirmation}
          fullWidth
        />
      </Fields>
      <SuperButton type="submit" loading={v.loading} fullWidth>
        {v.t('register.submit')}
      </SuperButton>
    </AuthLayout>
  );
};

export default RegisterView;
