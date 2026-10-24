import { Link } from 'react-router-dom';
import type { SuperLinkComponent } from '@davidyero/ui-web/theme';

// Enlace interno para el design system: `SuperButton href="/ruta"` navega con el router
// sin recargar la página. Los enlaces externos siguen siendo <a> normales.
export const RouterLink: SuperLinkComponent = ({ href, ...rest }) => <Link to={href} {...rest} />;
