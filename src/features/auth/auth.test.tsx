import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderView } from '../../test/render';
import { authApi } from './api/authApi';
import RegisterView from './views/RegisterView/RegisterView';

vi.mock('./api/authApi', () => ({
  authApi: { register: vi.fn(), login: vi.fn(), forgotPassword: vi.fn(), resetPassword: vi.fn() },
}));

const fill = async (label: string, value: string) => {
  await userEvent.type(screen.getByLabelText(label), value);
};

describe('Registro', () => {
  beforeEach(() => vi.mocked(authApi.register).mockReset());

  it('exige los 5 campos y no llama al backend si falta alguno', async () => {
    renderView(<RegisterView />);
    await userEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));
    // Nombre, usuario, correo, contraseña y confirmación: los 5.
    expect(await screen.findAllByText('Este campo es obligatorio.')).toHaveLength(5);
    expect(authApi.register).not.toHaveBeenCalled();
  });

  it('valida formato de usuario, correo, contraseña y que coincidan', async () => {
    renderView(<RegisterView />);
    await fill('Nombre', 'Ana');
    await fill('Nombre de usuario', 'Ana Pérez');
    await fill('Correo', 'ana@');
    await fill('Contraseña', 'corta');
    await fill('Repite la contraseña', 'otra');
    await userEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));
    expect(
      await screen.findByText('Solo minúsculas, números, punto o guion bajo.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Escribe un correo válido.')).toBeInTheDocument();
    expect(screen.getByText('Mínimo 8 caracteres.')).toBeInTheDocument();
    expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument();
    expect(authApi.register).not.toHaveBeenCalled();
  });

  it('con los 5 campos válidos envía el registro', async () => {
    vi.mocked(authApi.register).mockResolvedValue({
      user: { id: '1', name: 'Ana', username: 'ana', email: 'ana@correo.com' },
      tokens: { accessToken: 'a', refreshToken: 'r' },
    });
    renderView(<RegisterView />);
    await fill('Nombre', 'Ana');
    await fill('Nombre de usuario', 'ana');
    await fill('Correo', 'ana@correo.com');
    await fill('Contraseña', 'Clave1234');
    await fill('Repite la contraseña', 'Clave1234');
    await userEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }));
    await waitFor(() => expect(authApi.register).toHaveBeenCalledTimes(1));
    expect(vi.mocked(authApi.register).mock.calls[0]?.[0]).toEqual({
      name: 'Ana',
      username: 'ana',
      email: 'ana@correo.com',
      password: 'Clave1234',
      passwordConfirmation: 'Clave1234',
    });
  });
});
