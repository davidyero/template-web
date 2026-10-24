import axios from 'axios';
import { z } from 'zod';
import { AppError } from './AppError';

// Envelope de error de los dominios del monolito: { error: { code, details?, requestId? } }.
const envelopeSchema = z.object({
  error: z.object({
    code: z.string(),
    details: z.array(z.object({ field: z.string(), rule: z.string() })).optional(),
    requestId: z.string().optional(),
  }),
});

/** Cualquier cosa lanzada → AppError. Sin respuesta = NETWORK_ERROR; timeout = TIMEOUT. */
export const normalizeError = (error: unknown): AppError => {
  if (error instanceof AppError) return error;
  if (axios.isAxiosError(error)) {
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT')
      return new AppError('TIMEOUT', 0);
    if (!error.response) return new AppError('NETWORK_ERROR', 0);
    const parsed = envelopeSchema.safeParse(error.response.data);
    if (parsed.success) {
      const { code, details, requestId } = parsed.data.error;
      return new AppError(code, error.response.status, details ?? [], requestId);
    }
    return new AppError('UNKNOWN', error.response.status);
  }
  return new AppError('UNKNOWN', 0);
};
