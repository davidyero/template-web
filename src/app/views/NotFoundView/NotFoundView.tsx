import type { ReactElement } from 'react';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperEmptyState } from '@davidyero/ui-web/SuperEmptyState';
import { SuperPageTemplate } from '@shared/components/SuperPageTemplate/SuperPageTemplate';
import { Center } from './NotFoundView.styles';
import { useNotFoundView } from './useNotFoundView';

const NotFoundView = (): ReactElement => {
  const { title, body, action, goHome } = useNotFoundView();
  return (
    <SuperPageTemplate width="narrow">
      <Center>
        <SuperEmptyState
          icon="error"
          title={title}
          description={body}
          action={<SuperButton onClick={goHome}>{action}</SuperButton>}
        />
      </Center>
    </SuperPageTemplate>
  );
};

export default NotFoundView;
