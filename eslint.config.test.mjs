import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ESLint } from 'eslint';

// `npm run lint` es `eslint` sin argumentos: recorre todo el repo. La salida de
// `npm run preview`/`deploy` y los worktrees de agentes en `.claude/` tienen que
// quedar fuera, o el lint falla con miles de problemas que no son del código.
test('eslint ignora artefactos de build y worktrees, no el código', async () => {
  const eslint = new ESLint();

  for (const file of [
    '.open-next/worker.js',
    '.wrangler/tmp/bundle.js',
    '.claude/worktrees/agente/app/page.tsx',
  ]) {
    assert.equal(await eslint.isPathIgnored(file), true, `${file} debería ignorarse`);
  }

  assert.equal(await eslint.isPathIgnored('app/components/Hero.tsx'), false);
});
