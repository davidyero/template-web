import type { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperEmptyState } from '@davidyero/ui-web/SuperEmptyState';
import { SuperSkeleton } from '@davidyero/ui-web/SuperSkeleton';
import { SuperTypography } from '@davidyero/ui-web/SuperTypography';
import { Actions, Head, HeadText, Page } from './SuperPageTemplate.styles';
import type { SuperPageTemplateProps } from './SuperPageTemplate.types';
import { useSuperPageTemplate } from './useSuperPageTemplate';

/**
 * Plantilla base de TODA vista: título, descripción, acciones y los estados de carga y
 * error. Ninguna vista monta su propio layout.
 */
export const SuperPageTemplate = (props: SuperPageTemplateProps): ReactElement => {
  const { title, description, actions, width = 'default', skeleton, error, children } = props;
  const state = useSuperPageTemplate(props);
  const { t } = useTranslation();
  return (
    <Page $width={width}>
      {(title || actions) && (
        <Head>
          <HeadText>
            {title && <SuperTypography variant="h1">{title}</SuperTypography>}
            {description && (
              <SuperTypography variant="body" color="textMuted">
                {description}
              </SuperTypography>
            )}
          </HeadText>
          {actions && <Actions>{actions}</Actions>}
        </Head>
      )}
      {state === 'loading' && (skeleton ?? <SuperSkeleton variant="text" lines={4} />)}
      {state === 'error' && error && (
        <SuperEmptyState
          icon="error"
          title={error.message}
          action={
            error.onRetry && (
              <SuperButton variant="secondary" onClick={error.onRetry}>
                {t('page.retry')}
              </SuperButton>
            )
          }
        />
      )}
      {state === 'ready' && children}
    </Page>
  );
};
