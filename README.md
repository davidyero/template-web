# template-web

Plantilla de las webs del ecosistema super-davidyero. Una app nueva sale de aquí con
todo lo innegociable ya hecho, en vez de volver a generarlo archivo por archivo.

## Qué trae

- **Vite + React 19 + TypeScript estricto**, arquitectura vertical slice (`app/`,
  `features/`, `shared/`).
- **Design system `@davidyero/ui-web`** instalado por git, sin copias locales de los
  `Super*`. El aspecto de la app vive en **un solo archivo**: `src/app/theme/tokens.ts`.
- **Auth completa** contra el contrato del monolito: login (con idioma y tema arriba),
  registro con los **5 campos** validados con Zod y errores por campo desde i18n, olvido y
  reset de contraseña con código, refresh token rotativo, guards de rutas y aviso de sesión
  caducada.
- **Inicio** (vista protegida de ejemplo con skeleton, error con reintento y estado vacío)
  y **Ajustes** (idioma, tema, cerrar sesión, versión leída de `package.json` y firma).
- **Loader global** en cada petición (interceptores de axios → `loaderStore` de la
  librería; `silent: true` para polling y segundo plano) y **errores centralizados**
  (envelope del monolito → `AppError` → `toast` con el texto de `errors:<CODE>`).
- **i18n EN/ES** por feature con claves planas; `scripts/check-i18n.mjs` corre en
  `prebuild` y tumba el build si EN y ES no cuadran o si un `t('…')` usa una clave que no
  existe.
- **Calidad**: ESLint con `eslint-config-davidyero/web` en **modo estricto** (texto sin
  i18n, texto crudo sin `SuperTypography`, viñetas ad-hoc y colores literales son error),
  Prettier, Husky + lint-staged, `check:barrels`, tests con Vitest y CI en GitHub Actions.
- **PWA** (`vite-plugin-pwa`, autoUpdate) y `amplify.yml` para AWS Amplify.

## Crear una app nueva

```bash
cd /Volumes/DevSSD/Projects/Web
gh repo create davidyero/<slug> --template davidyero/template-web --private --clone
cd <slug>
npm i
npm run init -- --slug <slug> --name "<Nombre visible>"
npm run dev
```

`init` renombra `package.json` (versión 0.1.0), pone `VITE_APP_SLUG` en todos los `.env`,
cambia el nombre visible (i18n EN/ES, `<title>`, manifest de la PWA), deja un README
propio y se borra a sí mismo. Si el proyecto ya se inicializó, falla y no toca nada.

> El SSH de este Mac es la cuenta `SuperGretaBot`: en un repo nuevo de `davidyero`, el
> remoto que crea `gh` va por HTTPS y funciona. Si lo cambias a SSH, invita antes a
> `SuperGretaBot` como colaboradora.

## Cambiar el aspecto

Todo está en `src/app/theme/tokens.ts`: colores de claro y oscuro, fuentes, radios y
sombras. Los componentes de la librería leen esos tokens como variables CSS (`--sd-*`),
así que no hay que tocar ningún componente. Reglas de contraste: `onPrimary` solo sobre
`primary` pleno y cada fondo soft con su texto (`primarySoft` → `primarySoftText`…).
Compruébalo en los dos modos.

Si te falta un aspecto, una variante o una prop, **se añade a `@davidyero/ui-web`** (y se
sube la etiqueta), nunca un componente nuevo en la app. Los iconos se registran por nombre
en `src/app/theme/icons.ts` (ids de Iconify).

## Lo que hay que pedirle al backend

Un **dominio** en el monolito (`super-davidyero-backend/src/domains/<slug>/`, skill
`integrar-dominio-backend`) con este contrato, que es el que ya usa LingoVida:

| Método y ruta                | Cuerpo                                                              | Respuesta                  |
| ---------------------------- | ------------------------------------------------------------------- | -------------------------- |
| `POST /auth/register`        | `name, username, email, password, passwordConfirmation, uiLanguage` | `{ user, tokens }` (201)   |
| `POST /auth/login`           | `email, password`                                                   | `{ user, tokens }`         |
| `POST /auth/refresh`         | `refreshToken`                                                      | `{ tokens }`               |
| `POST /auth/logout`          | `refreshToken`                                                      | 204                        |
| `POST /auth/forgot-password` | `email`                                                             | 204, exista o no la cuenta |
| `POST /auth/reset-password`  | `email, code, newPassword`                                          | 204                        |
| `GET /me`                    | —                                                                   | `user`                     |

`user = { id, name, username, email }` y `tokens = { accessToken, refreshToken }`. Los
errores van con el envelope `{ error: { code, details?: [{ field, rule }], requestId? } }`;
los códigos que la app traduce están en `src/shared/i18n/translations/errors.*.ts` y las
reglas por campo en `features/auth/i18n`. La política de contraseña y de usuario de
`src/shared/constants/accountPolicy.ts` tiene que ser **la misma** que la del dominio.

## Scripts

```bash
npm run dev            # VITE_API_URL de .env.development (monolito local)
npm run typecheck
npm run lint           # 0 avisos permitidos
npm test
npm run build          # prebuild: check-i18n
npm run check:barrels
```

Versión: sube `package.json` en cada cambio; se ve al pie de Ajustes.
