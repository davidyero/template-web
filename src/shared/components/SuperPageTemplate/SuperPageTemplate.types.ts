import type { ReactNode } from 'react';

export interface SuperPageTemplateProps {
  title?: string;
  description?: string;
  /** Acciones a la derecha del título (botones). */
  actions?: ReactNode;
  /** narrow = formularios y lectura; default = contenido. */
  width?: 'narrow' | 'default';
  /** Mientras carga se pinta `skeleton` (del mismo tamaño que el contenido real). */
  loading?: boolean;
  skeleton?: ReactNode;
  /** Error con reintento: sustituye al contenido. */
  error?: { message: string; onRetry?: () => void } | null;
  children?: ReactNode;
}
