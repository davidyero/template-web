#!/usr/bin/env node
// Convierte la plantilla en una app nueva:
//   npm run init -- --slug mi-app --name "Mi App"
// Renombra package.json (versión 0.1.0), VITE_APP_SLUG en todos los .env, el nombre
// visible (i18n EN/ES, <title>, manifest de la PWA) y deja un README propio. Al terminar
// se borra a sí mismo y quita el script `init`.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE_NAME = 'template-web';
const TEMPLATE_TITLE = 'Template';

const fail = (message) => {
  console.error(`✗ init: ${message}`);
  process.exit(1);
};

const arg = (flag) => {
  const i = process.argv.indexOf(flag);
  return i === -1 ? undefined : process.argv[i + 1];
};
const slug = arg('--slug');
const name = arg('--name');
if (!slug || !name) fail('uso: npm run init -- --slug <slug> --name "<Nombre visible>"');
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
  fail(`slug inválido "${slug}" (minúsculas, números y guiones)`);
if (name.includes("'") || name.includes('`')) fail('el nombre no puede llevar comillas');

const file = (rel) => join(ROOT, rel);
const read = (rel) => readFileSync(file(rel), 'utf8');
const write = (rel, content) => writeFileSync(file(rel), content);
const replaceIn = (rel, from, to) => {
  const before = read(rel);
  const after = before.replace(from, to);
  if (before === after) fail(`no encontré lo que reemplazar en ${rel}`);
  write(rel, after);
};

const pkg = JSON.parse(read('package.json'));
if (pkg.name !== TEMPLATE_NAME)
  fail(`este proyecto ya se inicializó (package.json se llama "${pkg.name}")`);

// package.json y package-lock.json
pkg.name = slug;
pkg.version = '0.1.0';
pkg.description = name;
delete pkg.scripts.init;
write('package.json', `${JSON.stringify(pkg, null, 2)}\n`);
if (existsSync(file('package-lock.json'))) {
  const lock = JSON.parse(read('package-lock.json'));
  lock.name = slug;
  lock.version = '0.1.0';
  if (lock.packages?.['']) Object.assign(lock.packages[''], { name: slug, version: '0.1.0' });
  write('package-lock.json', `${JSON.stringify(lock, null, 2)}\n`);
}

// Slug del dominio en el monolito
for (const env of [
  '.env.example',
  '.env.development',
  '.env.staging',
  '.env.production',
  '.env.test',
]) {
  if (existsSync(file(env))) replaceIn(env, /^VITE_APP_SLUG=.*$/m, `VITE_APP_SLUG=${slug}`);
}

// Nombre visible
for (const rel of [
  'src/shared/i18n/translations/common.es.ts',
  'src/shared/i18n/translations/common.en.ts',
]) {
  replaceIn(rel, `appName: '${TEMPLATE_TITLE}',`, `appName: '${name}',`);
}
replaceIn('index.html', `<title>${TEMPLATE_TITLE}</title>`, `<title>${name}</title>`);
replaceIn('vite.config.ts', `const APP_NAME = '${TEMPLATE_TITLE}';`, `const APP_NAME = '${name}';`);

// README de la app nueva
write(
  'README.md',
  `# ${name}

App web del ecosistema super-davidyero, creada desde \`davidyero/template-web\`.

- Backend: dominio \`${slug}\` del monolito (\`super-davidyero-backend/src/domains/${slug}/\`),
  en \`/api/${slug}\`. Contrato de auth: \`/auth/register|login|refresh|forgot-password|reset-password|logout\` y \`/me\`.
- Design system: \`@davidyero/ui-web\`. El aspecto de la app está en \`src/app/theme/tokens.ts\`.
- Despliegue: push a \`main\` → AWS Amplify (\`amplify.yml\`). CI en GitHub Actions.

\`\`\`bash
npm run dev         # contra el monolito local (VITE_API_URL en .env.development)
npm run typecheck && npm run lint && npm test && npm run build
\`\`\`

Versión: sube \`package.json\` en cada cambio; se ve al pie de Ajustes.
`,
);

rmSync(file('scripts/init.mjs'));
console.log(`✓ init: "${name}" (${slug}) listo. Siguiente: npm i && npm run dev`);
