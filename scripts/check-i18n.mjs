#!/usr/bin/env node
// Validador de i18n. Corre en `prebuild`: un fallo tumba el build.
//   1. Cada namespace tiene las MISMAS claves en EN y ES.
//   2. Ninguna clave está vacía.
//   3. Toda clave literal usada en el código (`t('x')`) existe en su namespace.
// TypeScript no basta: una clave mal escrita en un `t()` dinámico pinta la clave cruda.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = join(dirname(fileURLToPath(import.meta.url)), '..', 'src');
const problems = [];

const keysOf = (file) => {
  const src = readFileSync(file, 'utf8');
  const keys = new Set();
  for (const m of src.matchAll(/^\s{2}(?:'([^']+)'|([A-Za-z_$][\w$]*)):\s*(['"`])(.*?)\3,?$/gm)) {
    const key = m[1] ?? m[2];
    keys.add(key);
    if (m[4].trim() === '') problems.push(`${file}: la clave '${key}' está vacía`);
  }
  return keys;
};

const namespaces = new Map();
const addNamespace = (ns, en, es) => {
  if (!existsSync(en) || !existsSync(es)) return problems.push(`${ns}: falta en.ts o es.ts`);
  const [ke, ks] = [keysOf(en), keysOf(es)];
  for (const k of ke) if (!ks.has(k)) problems.push(`${ns}: '${k}' está en EN pero NO en ES`);
  for (const k of ks) if (!ke.has(k)) problems.push(`${ns}: '${k}' está en ES pero NO en EN`);
  namespaces.set(ns, ks);
};

const shared = join(SRC, 'shared/i18n/translations');
for (const ns of ['common', 'errors'])
  addNamespace(ns, join(shared, `${ns}.en.ts`), join(shared, `${ns}.es.ts`));
const features = join(SRC, 'features');
for (const f of readdirSync(features)) {
  const dir = join(features, f, 'i18n');
  if (existsSync(dir)) addNamespace(f, join(dir, 'en.ts'), join(dir, 'es.ts'));
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return name === 'i18n' ? [] : walk(path);
    return /\.(ts|tsx)$/.test(name) && !/\.test\.tsx?$/.test(name) ? [path] : [];
  });

const nsOfSource = (src) => src.match(/useTranslation\(\s*'([\w-]+)'/)?.[1];
const nsOf = (file) => {
  const own = nsOfSource(readFileSync(file, 'utf8'));
  if (own) return own;
  // Una vista usa el `t` de su hook: el namespace sale del hook hermano.
  for (const sibling of readdirSync(dirname(file))) {
    if (/^use.*\.ts$/.test(sibling)) {
      const ns = nsOfSource(readFileSync(join(dirname(file), sibling), 'utf8'));
      if (ns) return ns;
    }
  }
  return 'common';
};

for (const file of walk(SRC)) {
  const src = readFileSync(file, 'utf8');
  if (!/\bt\(/.test(src)) continue;
  const fileNs = nsOf(file);
  for (const m of src.matchAll(/(?<![\w$])t\(\s*'([^']+)'/g)) {
    const [ns, key] = m[1].includes(':') ? m[1].split(':') : [fileNs, m[1]];
    if (!namespaces.get(ns)?.has(key))
      problems.push(`${basename(file)}: la clave '${ns}:${key}' no existe`);
  }
}

if (problems.length > 0) {
  console.error(`✗ check-i18n: ${problems.length} problema(s)`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
const total = [...namespaces.values()].reduce((n, s) => n + s.size, 0);
console.log(`✓ check-i18n: ${namespaces.size} namespaces, ${total} claves, EN/ES sincronizados`);
