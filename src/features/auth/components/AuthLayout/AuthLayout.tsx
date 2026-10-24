import type { ReactElement } from 'react';
import { SuperCard } from '@davidyero/ui-web/SuperCard';
import { SuperTypography } from '@davidyero/ui-web/SuperTypography';
import { SuperLocaleThemeSwitch } from '@shared/components/SuperLocaleThemeSwitch/SuperLocaleThemeSwitch';
import { Body, Footer, Form, Heading, Screen } from './AuthLayout.styles';
import type { AuthLayoutProps } from './AuthLayout.types';
import { useAuthLayout } from './useAuthLayout';

/** Marco de login, registro y recuperación: idioma y tema arriba, formulario en tarjeta. */
export const AuthLayout = ({
  title,
  subtitle,
  onSubmit,
  children,
  footer,
}: AuthLayoutProps): ReactElement => {
  const { appName } = useAuthLayout();
  return (
    <Screen>
      <SuperLocaleThemeSwitch />
      <Body>
        <SuperCard padding="lg">
          <Form onSubmit={onSubmit} noValidate>
            <Heading>
              <SuperTypography variant="label" color="primary">
                {appName}
              </SuperTypography>
              <SuperTypography variant="h1">{title}</SuperTypography>
              {subtitle && (
                <SuperTypography variant="body" color="textMuted">
                  {subtitle}
                </SuperTypography>
              )}
            </Heading>
            {children}
          </Form>
        </SuperCard>
        {footer && <Footer>{footer}</Footer>}
      </Body>
    </Screen>
  );
};
