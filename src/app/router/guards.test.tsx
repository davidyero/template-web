import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { useSessionStore } from '@app/store/sessionStore';
import { PublicOnly, RequireAuth } from './guards';
import { paths } from './paths';

/** Pinta dónde acabó la navegación y el estado que lleva. */
const Where = ({ name }: { name: string }) => {
  const location = useLocation();
  return <div data-testid="where">{`${name}|${JSON.stringify(location.state)}`}</div>;
};

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<PublicOnly />}>
          <Route path={paths.login} element={<Where name="login" />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path={paths.home} element={<Where name="privado" />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

describe('guards', () => {
  afterEach(() => useSessionStore.getState().clear());

  it('sin sesión, una ruta protegida redirige al login recordando a dónde iba', () => {
    renderAt(paths.home);
    expect(screen.getByTestId('where')).toHaveTextContent(`login|{"from":"${paths.home}"}`);
  });

  it('con sesión, la ruta protegida se ve y el login lleva al inicio', () => {
    useSessionStore
      .getState()
      .setSession(
        { accessToken: 'a', refreshToken: 'r' },
        { id: '1', name: 'Ana', username: 'ana', email: 'ana@correo.com' },
      );
    renderAt(paths.login);
    expect(screen.getByTestId('where')).toHaveTextContent('privado');
  });
});
