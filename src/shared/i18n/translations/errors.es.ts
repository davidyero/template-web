// Clave = `error.code` del envelope del monolito. Lo que no esté aquí cae a UNKNOWN.
export const errorsEs = {
  UNKNOWN: 'Algo salió mal. Inténtalo de nuevo.',
  NETWORK_ERROR: 'Sin conexión. Revisa tu internet e inténtalo de nuevo.',
  TIMEOUT: 'El servidor tardó demasiado. Inténtalo de nuevo.',
  INTERNAL_ERROR: 'Error del servidor. Ya estamos avisados.',
  VALIDATION_ERROR: 'Revisa los campos marcados.',
  UNAUTHORIZED: 'Tu sesión terminó. Vuelve a entrar.',
  TOKEN_EXPIRED: 'Tu sesión terminó. Vuelve a entrar.',
  FORBIDDEN: 'No tienes permiso para hacer esto.',
  NOT_FOUND: 'No encontramos lo que buscabas.',
  RATE_LIMITED: 'Demasiados intentos. Espera un momento.',
  AUTH_INVALID_CREDENTIALS: 'Correo o contraseña incorrectos.',
  AUTH_EMAIL_TAKEN: 'Ya existe una cuenta con ese correo.',
  AUTH_USERNAME_TAKEN: 'Ese nombre de usuario ya está en uso.',
  AUTH_INVALID_CODE: 'El código no es válido o caducó.',
} as const;
