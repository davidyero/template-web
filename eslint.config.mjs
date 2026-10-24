// Preset del ecosistema en modo estricto: una app nueva nace sin deuda, así que las
// reglas de texto, i18n y color son error desde el primer commit.
import davidyero from 'eslint-config-davidyero/web';

export default davidyero({ strict: true });
