import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperEmptyState } from '@davidyero/ui-web/SuperEmptyState';
import { SuperPageTemplate } from '@shared/components/SuperPageTemplate/SuperPageTemplate';

export const CrashScreen = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <SuperPageTemplate width="narrow">
      <SuperEmptyState
        icon="error"
        title={t('crash.title')}
        description={t('crash.body')}
        action={
          <SuperButton onClick={() => window.location.reload()}>{t('crash.action')}</SuperButton>
        }
      />
    </SuperPageTemplate>
  );
};
