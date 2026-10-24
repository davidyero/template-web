import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { paths } from '@app/router/paths';
import { useSessionStore } from '@app/store/sessionStore';
import { useMe } from '../../api/useMe';
import type { HomeItem } from './HomeView.types';

export const useHomeView = () => {
  const { t } = useTranslation('home');
  const navigate = useNavigate();
  const cachedName = useSessionStore((s) => s.user?.name ?? '');
  const me = useMe();
  // Ejemplo: aquí irán los datos de tu feature. Vacío para enseñar el estado vacío.
  const items: HomeItem[] = [];
  return {
    t,
    name: me.data?.name ?? cachedName,
    loading: me.isPending && !cachedName,
    error:
      me.isError && !cachedName
        ? { message: t('load.error'), onRetry: () => void me.refetch() }
        : null,
    items,
    goSettings: () => navigate(paths.settings),
  };
};
