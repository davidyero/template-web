import type { SuperPageTemplateProps } from './SuperPageTemplate.types';

export type PageState = 'loading' | 'error' | 'ready';

/** Qué pinta la plantilla: el error manda sobre la carga, la carga sobre el contenido. */
export const useSuperPageTemplate = ({ loading, error }: SuperPageTemplateProps): PageState => {
  if (error) return 'error';
  if (loading) return 'loading';
  return 'ready';
};
