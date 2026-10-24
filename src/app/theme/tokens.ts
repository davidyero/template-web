import { defineTokens } from '@davidyero/ui-web/theme';

/**
 * EL aspecto de la app, en un solo archivo. Los componentes de @davidyero/ui-web leen estos
 * tokens como variables CSS: cambiar aquí cambia toda la app, en claro y en oscuro. Lo que
 * no definas cae a los valores neutros de la librería.
 *
 * Contraste: `onPrimary` solo sobre `primary` pleno; cada fondo soft con su texto
 * (`primarySoft`→`primarySoftText`…). Comprueba siempre los dos modos.
 */
export const appTokens = defineTokens({
  light: {
    background: '#f7f7fb',
    surface: '#ffffff',
    surfaceSunken: '#f0f0f6',
    primary: '#4f46e5',
    primaryHover: '#4338ca',
    onPrimary: '#ffffff',
    primarySoft: '#eef2ff',
    primarySoftText: '#3730a3',
    focusRing: '#818cf8',
    fontFamily: { base: 'Inter, system-ui, sans-serif', heading: 'Inter, system-ui, sans-serif' },
    radius: { md: '12px', lg: '16px' },
  },
  dark: {
    background: '#0f1020',
    surface: '#17182b',
    surfaceSunken: '#111222',
    primary: '#a5b4fc',
    primaryHover: '#c7d2fe',
    onPrimary: '#1e1b4b',
    primarySoft: '#25264a',
    primarySoftText: '#c7d2fe',
    focusRing: '#a5b4fc',
    fontFamily: { base: 'Inter, system-ui, sans-serif', heading: 'Inter, system-ui, sans-serif' },
    radius: { md: '12px', lg: '16px' },
  },
});

/** Color de la barra del navegador en móvil (meta theme-color), por modo. */
export const themeColor = { light: '#4f46e5', dark: '#0f1020' } as const;
