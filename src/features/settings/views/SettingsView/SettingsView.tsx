import type { ReactElement } from 'react';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperCard } from '@davidyero/ui-web/SuperCard';
import { SuperTypography } from '@davidyero/ui-web/SuperTypography';
import { SuperLocaleThemeSwitch } from '@shared/components/SuperLocaleThemeSwitch/SuperLocaleThemeSwitch';
import { SuperPageTemplate } from '@shared/components/SuperPageTemplate/SuperPageTemplate';
import { Footer, Section } from './SettingsView.styles';
import { useSettingsView } from './useSettingsView';

const SettingsView = (): ReactElement => {
  const v = useSettingsView();
  return (
    <SuperPageTemplate title={v.t('title')} width="narrow">
      <SuperCard padding="lg">
        <Section>
          <SuperTypography variant="h3">{v.t('section.preferences')}</SuperTypography>
          <SuperLocaleThemeSwitch align="start" />
        </Section>
      </SuperCard>
      <SuperCard padding="lg">
        <Section>
          <SuperTypography variant="h3">{v.t('section.account')}</SuperTypography>
          <SuperTypography variant="body" color="textMuted">
            {v.t('account.signedInAs', { email: v.email })}
          </SuperTypography>
          <SuperButton variant="danger" leftIcon="logout" onClick={v.onSignOut}>
            {v.t('signOut')}
          </SuperButton>
        </Section>
      </SuperCard>
      <Footer>
        <SuperTypography variant="caption" color="textMuted">
          {v.t('version', { version: v.version })}
        </SuperTypography>
        <SuperTypography variant="caption" color="textMuted">
          {v.t('signature')}
        </SuperTypography>
      </Footer>
    </SuperPageTemplate>
  );
};

export default SettingsView;
