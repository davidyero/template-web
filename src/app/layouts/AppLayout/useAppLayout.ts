import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { paths } from '@app/router/paths';
import type { NavItem } from './AppLayout.types';

export const useAppLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const items: NavItem[] = [
    { path: paths.home, icon: 'home', label: t('nav.home') },
    { path: paths.settings, icon: 'settings', label: t('nav.settings') },
  ];
  return {
    appName: t('appName'),
    navLabel: t('nav.aria'),
    items,
    isActive: (path: string) => pathname === path,
    go: (path: string) => navigate(path),
  };
};
