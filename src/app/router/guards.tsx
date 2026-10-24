import type { ReactElement } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSessionStore } from '@app/store/sessionStore';
import { paths } from './paths';

/** Solo sin sesión (login, registro, olvido): con sesión, al inicio. */
export const PublicOnly = (): ReactElement => {
  const authed = useSessionStore((s) => s.tokens !== null);
  return authed ? <Navigate to={paths.home} replace /> : <Outlet />;
};

/** Con sesión. Sin ella, al login recordando a dónde iba. */
export const RequireAuth = (): ReactElement => {
  const authed = useSessionStore((s) => s.tokens !== null);
  const location = useLocation();
  return authed ? (
    <Outlet />
  ) : (
    <Navigate to={paths.login} replace state={{ from: location.pathname }} />
  );
};
