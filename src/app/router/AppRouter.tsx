import { lazy, Suspense, type ReactElement } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { SuperLoader } from '@davidyero/ui-web/SuperLoader';
import { AppLayout } from '@app/layouts/AppLayout/AppLayout';
import { AppErrorBoundary } from '@app/providers/AppErrorBoundary';
import { SessionWatcher } from '@app/providers/SessionWatcher';
import { PublicOnly, RequireAuth } from './guards';
import { paths } from './paths';

const LoginView = lazy(() => import('@features/auth/views/LoginView/LoginView'));
const RegisterView = lazy(() => import('@features/auth/views/RegisterView/RegisterView'));
const ForgotPasswordView = lazy(
  () => import('@features/auth/views/ForgotPasswordView/ForgotPasswordView'),
);
const ResetPasswordView = lazy(
  () => import('@features/auth/views/ResetPasswordView/ResetPasswordView'),
);
const HomeView = lazy(() => import('@features/home/views/HomeView/HomeView'));
const SettingsView = lazy(() => import('@features/settings/views/SettingsView/SettingsView'));
const NotFoundView = lazy(() => import('@app/views/NotFoundView/NotFoundView'));

const Root = (): ReactElement => (
  <AppErrorBoundary>
    <SessionWatcher />
    <Suspense fallback={<SuperLoader />}>
      <Outlet />
    </Suspense>
  </AppErrorBoundary>
);

const routes = [
  {
    element: <Root />,
    children: [
      {
        element: <PublicOnly />,
        children: [
          { path: paths.login, element: <LoginView /> },
          { path: paths.register, element: <RegisterView /> },
          { path: paths.forgot, element: <ForgotPasswordView /> },
          { path: paths.reset, element: <ResetPasswordView /> },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: paths.home, element: <HomeView /> },
              { path: paths.settings, element: <SettingsView /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFoundView /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export const AppRouter = (): ReactElement => <RouterProvider router={router} />;
