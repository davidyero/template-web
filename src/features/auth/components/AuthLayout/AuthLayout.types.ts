import type { FormEvent, ReactNode } from 'react';

export interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  /** Campos y botón principal. */
  children: ReactNode;
  /** Enlaces secundarios bajo el formulario. */
  footer?: ReactNode;
}
