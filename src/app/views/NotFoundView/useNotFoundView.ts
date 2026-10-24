import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/router/paths';

export const useNotFoundView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return {
    title: t('notFound.title'),
    body: t('notFound.body'),
    action: t('notFound.action'),
    goHome: () => navigate(paths.home, { replace: true }),
  };
};
