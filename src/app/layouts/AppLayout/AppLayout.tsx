import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';
import { SuperButton } from '@davidyero/ui-web/SuperButton';
import { SuperTypography } from '@davidyero/ui-web/SuperTypography';
import { Bar, BarInner, Nav, Shell } from './AppLayout.styles';
import { useAppLayout } from './useAppLayout';

/** Layout de las rutas con sesión: barra con el nombre de la app y la navegación. */
export const AppLayout = (): ReactElement => {
  const { appName, navLabel, items, isActive, go } = useAppLayout();
  return (
    <Shell>
      <Bar>
        <BarInner>
          <SuperTypography variant="title" weight="bold">
            {appName}
          </SuperTypography>
          <Nav aria-label={navLabel}>
            {items.map((item) => (
              <SuperButton
                key={item.path}
                size="sm"
                variant={isActive(item.path) ? 'secondary' : 'ghost'}
                leftIcon={item.icon}
                aria-current={isActive(item.path) ? 'page' : undefined}
                onClick={() => go(item.path)}
              >
                {item.label}
              </SuperButton>
            ))}
          </Nav>
        </BarInner>
      </Bar>
      <Outlet />
    </Shell>
  );
};
