// Escala de layout de la app (márgenes, huecos, anchos). Los colores, radios, sombras y
// fuentes NO van aquí: salen de los tokens del design system como variables `--sd-*`.
export const space = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  xxl: '32px',
  xxxl: '48px',
} as const;

export const width = { narrow: '440px', default: '960px' } as const;

export const breakpoint = { md: '@media (min-width: 768px)' } as const;

/** Variable CSS de un token del design system: `token('surface')` → `var(--sd-surface)`. */
export const token = (name: string): string =>
  `var(--sd-${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)})`;
