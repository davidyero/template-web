import { useTranslation } from 'react-i18next';

export const useAuthLayout = () => {
  const { t } = useTranslation();
  return { appName: t('appName') };
};
