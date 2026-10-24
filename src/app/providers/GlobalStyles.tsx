import { css, Global } from '@emotion/react';
import type { ReactElement } from 'react';

// Base mínima: el fondo y la fuente salen de los tokens (variables --sd-*).
const styles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html,
  body,
  #root {
    min-height: 100%;
  }
  body {
    margin: 0;
    background: var(--sd-background);
    color: var(--sd-text);
    font-family: var(--sd-font-family-base);
    -webkit-font-smoothing: antialiased;
  }
`;

export const GlobalStyles = (): ReactElement => <Global styles={styles} />;
