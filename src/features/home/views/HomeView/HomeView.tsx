import type { ReactElement } from 'react';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperCard } from '@davidyero/ui-web/SuperCard';
import { SuperEmptyState } from '@davidyero/ui-web/SuperEmptyState';
import { SuperSkeleton } from '@davidyero/ui-web/SuperSkeleton';
import { SuperTypography } from '@davidyero/ui-web/SuperTypography';
import { SuperPageTemplate } from '@shared/components/SuperPageTemplate/SuperPageTemplate';
import { Skeletons } from './HomeView.styles';
import { useHomeView } from './useHomeView';

/** Vista protegida de ejemplo: carga con skeleton, error con reintento y estado vacío. */
const HomeView = (): ReactElement => {
  const v = useHomeView();
  return (
    <SuperPageTemplate
      title={v.t('title', { name: v.name })}
      description={v.t('subtitle')}
      loading={v.loading}
      error={v.error}
      skeleton={
        <Skeletons>
          <SuperSkeleton variant="block" height="120px" />
          <SuperSkeleton variant="text" lines={3} />
        </Skeletons>
      }
    >
      <SuperCard padding="lg">
        {v.items.length === 0 ? (
          <SuperEmptyState
            icon="sparkles"
            title={v.t('empty.title')}
            description={v.t('empty.body')}
            action={
              <SuperButton variant="secondary" onClick={v.goSettings}>
                {v.t('empty.action')}
              </SuperButton>
            }
          />
        ) : (
          v.items.map((item) => (
            <SuperTypography key={item.id} variant="body">
              {item.title}
            </SuperTypography>
          ))
        )}
      </SuperCard>
    </SuperPageTemplate>
  );
};

export default HomeView;
