import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { FieldError } from '@shared/services/errors/AppError';
import { normalizeError } from '@shared/services/errors/normalizeError';
import { errorsEs } from '@shared/i18n/translations/errors.es';

export interface ErrorView {
  code: string;
  message: string;
  /** Errores por campo (VALIDATION_ERROR). */
  fields: FieldError[];
}

const isKnown = (code: string): code is keyof typeof errorsEs => code in errorsEs;

/** Texto de un error por su código (`errors:<CODE>`), con UNKNOWN de respaldo. */
export const useErrorMessage = (): ((error: unknown) => ErrorView) => {
  const { t } = useTranslation('errors');
  return useCallback(
    (error: unknown): ErrorView => {
      const appError = normalizeError(error);
      const code = isKnown(appError.code) ? appError.code : 'UNKNOWN';
      return { code, message: t(code), fields: appError.details };
    },
    [t],
  );
};
