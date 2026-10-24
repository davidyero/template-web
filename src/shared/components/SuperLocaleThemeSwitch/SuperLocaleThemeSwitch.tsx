import type { ReactElement } from 'react';
import { SuperDropdown } from '@davidyero/ui-web/SuperDropdown';
import { SuperSwitch } from '@davidyero/ui-web/SuperSwitch';
import type { Locale } from '@shared/i18n/types';
import { Row } from './SuperLocaleThemeSwitch.styles';
import type { SuperLocaleThemeSwitchProps } from './SuperLocaleThemeSwitch.types';
import { useSuperLocaleThemeSwitch } from './useSuperLocaleThemeSwitch';

/** Idioma (SuperDropdown) y tema (SuperSwitch): arriba en login y registro, y en Ajustes. */
export const SuperLocaleThemeSwitch = ({
  align = 'end',
  className,
}: SuperLocaleThemeSwitchProps): ReactElement => {
  const { locale, options, onLocale, dark, onDark, labels } = useSuperLocaleThemeSwitch();
  return (
    <Row $align={align} className={className}>
      <SuperDropdown<Locale>
        size="sm"
        value={locale}
        onChange={onLocale}
        options={options}
        ariaLabel={labels.locale}
      />
      <SuperSwitch checked={dark} onChange={onDark} label={labels.theme} />
    </Row>
  );
};
