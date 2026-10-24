export interface FieldError {
  field: string;
  rule: string;
}

/** Error normalizado: el cliente solo razona con `code` (nunca con el `message` del servidor). */
export class AppError extends Error {
  constructor(
    readonly code: string,
    readonly status: number,
    readonly details: FieldError[] = [],
    readonly requestId?: string,
  ) {
    super(code);
    this.name = 'AppError';
  }
}
