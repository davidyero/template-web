import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from '@davidyero/ui-web/toast';
import { paths } from '@app/router/paths';
import { useSessionStore } from '@app/store/sessionStore';
import { setSessionExpiredHandler } from '@shared/services/http/httpClient';

/** Sesión caducada sin remedio: se cierra, se avisa y se lleva al login. */
export const SessionWatcher = (): null => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  useEffect(() => {
    setSessionExpiredHandler(() => {
      if (!useSessionStore.getState().tokens) return;
      useSessionStore.getState().clear('expired');
      queryClient.clear();
      toast.warning(t('sessionExpired'));
      navigate(paths.login, { replace: true });
    });
  }, [navigate, t, queryClient]);
  return null;
};
