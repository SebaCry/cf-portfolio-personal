/**
 * Validación del contenido: app/lib/content (portfolio.ts + asserts de index.ts),
 * diccionarios, privacidad, assets locales y enlaces externos.
 *
 *   npm test                                        # comprobaciones offline
 *   CHECK_LINKS=1 npm test                          # + enlaces externos por red
 *   CV_JSON=/ruta/a/cv.json npm test                # + compara con el JSON de Sebas
 *   $env:CHECK_LINKS=1; $env:CV_JSON='...'; npm test  # ídem en PowerShell
 *
 * El JSON de Sebas NO se versiona: tiene teléfonos y nombres de terceros (referencias).
 *
 * Sin dependencias: Node >= 22.18 importa los .ts directamente (type stripping).
 * Es .mjs y no .ts a propósito: tsconfig incluye `**\/*.ts` y `next build` intentaría
 * compilarlo.
 */
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { registerHooks } from 'node:module';

// Los .ts del repo importan sin extensión ('./portfolio', './i18n'), como espera Next.
registerHooks({
  resolve(specifier, context, next) {
    try {
      return next(specifier, context);
    } catch (error) {
      if (!specifier.startsWith('.') || /\.\w+$/.test(specifier)) throw error;
      try {
        return next(`${specifier}.ts`, context);
      } catch {
        return next(`${specifier}/index.ts`, context);
      }
    }
  },
});

// Importar index.ts ejecuta sus asserts: si el contenido es inválido, este import lanza.
const { content, formatPeriod, tr } = await import('../app/lib/content/index.ts');
const { getDictionary, locales } = await import('../app/lib/i18n/index.ts');
const { buildJsonLd } = await import('../app/lib/metadata.ts');
const { OG_IMAGE, SECTIONS, SITE_URL } = await import('../app/lib/site.ts');

const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const sourceFiles = (dir) =>
  readdirSync(new URL(dir, root), { recursive: true })
    .map((f) => `${dir}${f.replaceAll('\\', '/')}`)
    .filter((f) => /\.(tsx?|css)$/.test(f));
const appSources = sourceFiles('app/').map((f) => [f, read(f)]);
const dupes = (list) => list.filter((x, i) => list.indexOf(x) !== i);

const URL_KEYS = new Set(['url', 'demo', 'app', 'video', 'linkedin', 'github']);
const contentUrls = [];
(function walk(value, path) {
  if (typeof value === 'string' && URL_KEYS.has(path.split('.').pop())) contentUrls.push([path, value]);
  else if (value && typeof value === 'object')
    for (const [key, child] of Object.entries(value)) walk(child, `${path}.${key}`);
})(content, 'portfolio');

describe('contenido', () => {
  test('textos por idioma: ninguno largo sin traducir (en idéntico a es)', () => {
    const bad = [];
    (function walk(value, path) {
      if (!value || typeof value !== 'object') return;
      const keys = Object.keys(value);
      if (keys.length === locales.length && locales.every((l) => keys.includes(l))) {
        const [a, b] = [JSON.stringify(value.es), JSON.stringify(value.en)];
        // ponytail: heurística por longitud; los nombres cortos pueden coincidir a propósito.
        if (a === b && a.length > 30) bad.push(`${path}: ${a.slice(0, 50)}…`);
        return;
      }
      for (const [key, child] of Object.entries(value)) walk(child, `${path}.${key}`);
    })(content, 'portfolio');
    assert.deepEqual(bad, []);
  });

  // Los componentes usan estos valores como `key` de React (Chips, listas).
  test('sin duplicados en listas que se usan como key', () => {
    const lists = [
      ['projects.id', content.projects.map((p) => p.id)],
      ['websites.name', content.websites.map((w) => w.name)],
      ['skills', content.skills.map((s) => tr(s, 'es'))],
      ...content.projects.map((p) => [`${p.id}.technologies`, p.technologies]),
      ...content.websites.map((w) => [`${w.name}.technologies`, w.technologies]),
      ...content.experience.map((e, i) => [`experience[${i}].technologies`, e.technologies ?? []]),
    ];
    assert.deepEqual(lists.flatMap(([where, list]) => dupes(list).map((x) => `${where}: ${x}`)), []);
  });

  test('sameCodeAs no se apunta a sí mismo (index.ts no lo detecta)', () => {
    assert.deepEqual(content.projects.filter((p) => p.sameCodeAs === p.id).map((p) => p.id), []);
  });

  test('formatPeriod', () => {
    assert.equal(formatPeriod('2026-08', null, 'es', 'Actualidad'), 'Ago 2026 – Actualidad');
    assert.equal(formatPeriod('2026-08', null, 'en', 'Present'), 'Aug 2026 – Present');
    assert.equal(formatPeriod('2026-02', '2026-07', 'es', 'x'), 'Feb 2026 – Jul 2026');
    assert.equal(formatPeriod('2024', '2026', 'en', 'x'), '2024 – 2026');
  });

  test('sin TODO / FIXME / lorem en los archivos de contenido', () => {
    const files = ['app/lib/content/portfolio.ts', 'app/lib/i18n/es.ts', 'app/lib/i18n/en.ts'];
    const hits = files.flatMap((f) =>
      read(f)
        .split('\n')
        .map((line, i) => [line, i])
        .filter(([line]) => /\b(TODO|FIXME|XXX)\b|lorem ipsum/i.test(line))
        .map(([line, i]) => `${f}:${i + 1} ${line.trim()}`)
    );
    assert.deepEqual(hits, []);
  });
});

describe('privacidad', () => {
  test('el único teléfono en app/ es el de Sebas', () => {
    const phones = appSources.flatMap(([f, src]) =>
      [...src.matchAll(/\+\d{1,3}[\s\d-]{8,}\d/g)].map((m) => `${f}: ${m[0]}`)
    );
    assert.deepEqual(
      phones.filter((p) => !p.endsWith(`: ${content.contact.phone}`)),
      [],
      'teléfonos de terceros en el código'
    );
    assert.equal(content.contact.phone, '+57 315 277 3333');
  });

  test('el JSON-LD no lleva teléfono', () => {
    for (const locale of locales) {
      const json = JSON.stringify(buildJsonLd(locale));
      assert.ok(!/telephone/i.test(json), `${locale}: tiene "telephone"`);
      assert.ok(!json.includes(content.contact.phone), `${locale}: incluye el número`);
    }
  });

  test('ningún enlace al repo privado django-sieki ni al repo de Anderson', () => {
    const hits = appSources
      .filter(([, src]) => /github\.com\/SebaCry\/django-sieki|anderson-life-insurance/i.test(src))
      .map(([f]) => f);
    assert.deepEqual(hits, []);
  });

  test('el único enlace a GitHub es el perfil', () => {
    const bad = contentUrls.filter(([, url]) => /github\.com/i.test(url) && url !== 'https://github.com/SebaCry');
    assert.deepEqual(bad, []);
  });

  test('Anderson enlaza solo a https://www.anderson.insure', () => {
    const anderson = content.websites.filter((w) => /anderson/i.test(w.name));
    assert.deepEqual(
      anderson.map((w) => w.url),
      ['https://www.anderson.insure']
    );
  });
});

describe('diccionarios es ↔ en', () => {
  const kind = (v) => (v === null ? 'null' : Array.isArray(v) ? 'array' : typeof v);
  const structure = [];
  const empty = [];
  const untranslated = [];
  const [es, en] = [getDictionary('es'), getDictionary('en')];

  (function walk(a, b, path) {
    const [ka, kb] = [kind(a), kind(b)];
    if (ka !== kb) return structure.push(`${path}: es=${ka} en=${kb}`);
    if (ka === 'object') {
      for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) walk(a[k], b[k], `${path}.${k}`);
    } else if (ka === 'array') {
      if (a.length !== b.length) structure.push(`${path}: es tiene ${a.length} elementos, en ${b.length}`);
      a.slice(0, b.length).forEach((x, i) => walk(x, b[i], `${path}[${i}]`));
    } else if (ka === 'function') {
      walk(a('X'), b('X'), `${path}()`);
    } else if (ka === 'string') {
      if (!a.trim() || !b.trim()) empty.push(path);
      else if (a === b && a.length > 30) untranslated.push(`${path}: "${a.slice(0, 50)}…"`);
    }
  })(es, en, 'dict');

  test('misma estructura', () => assert.deepEqual(structure, []));
  test('ningún texto vacío', () => assert.deepEqual(empty, []));
  test('ningún texto largo sin traducir', () => assert.deepEqual(untranslated, []));
});

describe('estructura de la página', () => {
  // HomePage.tsx y SECTIONS (Navbar, Footer) deben ir en el mismo orden.
  test('el orden de HomePage coincide con SECTIONS', () => {
    const main = read('app/components/HomePage.tsx').split('<main>')[1].split('</main>')[0];
    const ids = [...main.matchAll(/<(\w+) /g)]
      .map((m) => m[1])
      .filter((name) => name !== 'Hero')
      .map((name) => read(`app/components/${name}.tsx`).match(/\bid="([\w-]+)"/)?.[1] ?? `${name}: sin id`);
    assert.deepEqual(ids, SECTIONS.map((s) => s.id));
  });

  // Windows no distingue mayúsculas, Cloudflare sí.
  test('OG_IMAGE existe en public/ con la misma mayúscula y sus medidas', () => {
    const parts = OG_IMAGE.url.split('/').filter(Boolean);
    let dir = new URL('public/', root);
    for (const part of parts) {
      assert.ok(readdirSync(dir).includes(part), `no existe ${part} en ${dir.pathname}`);
      dir = new URL(`${part}/`, dir);
    }
    const buf = readFileSync(new URL(`public${OG_IMAGE.url}`, root));
    assert.equal(buf.subarray(1, 4).toString(), 'PNG');
    assert.deepEqual(
      { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) },
      { width: OG_IMAGE.width, height: OG_IMAGE.height }
    );
  });
});

describe('fidelidad al JSON de Sebas', { skip: !process.env.CV_JSON && 'define CV_JSON=<ruta a cv.json>' }, () => {
  const cv = process.env.CV_JSON ? JSON.parse(readFileSync(process.env.CV_JSON, 'utf8')) : {};
  const sameList = (a, b) => assert.deepEqual(a, b);

  test('perfil: headline + bio es exactamente el perfil', () => {
    assert.equal([content.profile.headline.es, ...content.profile.bio.es].join(' '), cv.perfil);
    assert.equal(content.profile.name, cv.nombre);
    assert.equal(content.profile.role.es, cv.titulo);
  });

  test('contacto: email, primer teléfono, LinkedIn, GitHub', () => {
    assert.equal(content.contact.email, cv.contacto.email);
    assert.equal(content.contact.phone, cv.contacto.telefonos[0]);
    assert.equal(decodeURI(content.contact.linkedin), cv.contacto.linkedin);
    assert.equal(content.contact.github, cv.contacto.github);
    const { locality, region, country } = content.contact.location;
    assert.equal(`${locality}, ${region}, ${country}`, cv.contacto.ubicacion);
  });

  test('experiencia', () => {
    sameList(
      content.experience.map((e) => ({
        cargo: e.role.es,
        empresa: tr(e.company, 'es'),
        modalidad: e.mode.es,
        periodo: formatPeriod(e.start, e.end, 'es', 'Actualidad'),
        ...(e.url && { sitio: e.url }),
        ...(e.technologies && { stack: e.technologies }),
      })),
      cv.experiencia.map(({ cargo, empresa, modalidad, periodo, sitio, stack }) => ({
        cargo, empresa, modalidad, periodo, ...(sitio && { sitio }), ...(stack && { stack }),
      }))
    );
  });

  test('proyectos: nombre, stack, enlaces y descripción del JSON', () => {
    sameList(
      content.projects.map((p) => ({
        nombre: p.title,
        stack: p.technologies,
        enlaces: [p.links.demo, p.links.app, p.links.video].filter(Boolean),
        acceso: Boolean(p.access),
      })),
      cv.proyectos.map((p) => ({
        nombre: p.nombre,
        stack: p.stack,
        // `github` fuera a propósito: django-sieki es privado.
        enlaces: [p.demo, p.url, p.video].filter(Boolean),
        acceso: Boolean(p.acceso),
      }))
    );
    const invented = content.projects
      .filter((p) => cv.proyectos.find((c) => c.nombre === p.title)?.descripcion !== p.description?.es)
      .map((p) => `${p.id}: "${p.description?.es}"`);
    assert.deepEqual(invented, [], 'descripción que no está en el JSON');
  });

  test('sitios web, formación, habilidades e idiomas', () => {
    sameList(
      content.websites.map((w) => ({ nombre: w.name, url: w.url, stack: w.technologies })),
      cv.sitios_web
    );
    sameList(
      content.education.map((e) => ({
        titulo: e.title.es,
        institucion: tr(e.institution, 'es'),
        periodo: formatPeriod(e.start, e.end, 'es', 'Actualidad'),
      })),
      cv.educacion
    );
    sameList(content.skills.map((s) => tr(s, 'es')), cv.habilidades.tecnicas);
    sameList(
      content.languages.map((l) => ({ idioma: l.name.es, nivel: l.level.es })),
      cv.habilidades.idiomas
    );
  });

  test('ni referencias ni otros teléfonos del JSON en app/', () => {
    const secrets = [
      ...cv.contacto.telefonos.slice(1),
      ...cv.referencias.flatMap((r) => [r.nombre, r.telefono]),
    ];
    const digits = (s) => s.replace(/\D/g, '');
    const hits = appSources.flatMap(([f, src]) =>
      secrets
        .filter((s) => src.includes(s) || (/\d{7}/.test(digits(s)) && digits(src).includes(digits(s))))
        .map(() => `${f}: dato de terceros`)
    );
    assert.deepEqual(hits, []);
  });
});

describe('enlaces externos', () => {
  const urls = [['SITE_URL', SITE_URL], ...contentUrls];

  test('https, ASCII y sin host local', () => {
    const bad = urls.filter(
      ([, url]) => !URL.canParse(url) || !/^https:\/\/[!-~]+$/.test(url) || /\/\/(localhost|127\.)/.test(url)
    );
    assert.deepEqual(bad, []);
  });

  test('responden por red', {
    skip: !process.env.CHECK_LINKS && 'define CHECK_LINKS=1 para comprobarlos por red',
    timeout: 120_000,
  }, async (t) => {
    const probe = async (url) => {
      try {
        const opts = { redirect: 'follow', signal: AbortSignal.timeout(20_000) };
        let res = await fetch(url, { ...opts, method: 'HEAD' });
        if (res.status >= 400) res = await fetch(url, opts); // hay servidores que no aceptan HEAD
        // Desafío de Cloudflare (Bot Fight Mode / WAF): un navegador lo pasa, fetch no.
        if (res.headers.get('cf-mitigated') === 'challenge') return 'cf-challenge';
        return `${res.status} ${res.headers.get('content-type') ?? ''}`;
      } catch (e) {
        return e.name === 'TimeoutError' ? 'timeout' : (e.cause?.code ?? e.message);
      }
    };
    const results = await Promise.all(urls.map(async ([where, url]) => [where, url, await probe(url)]));
    const bad = [];
    for (const [where, url, result] of results) {
      const status = Number.parseInt(result, 10);
      // 999: LinkedIn bloquea clientes que no son navegador. Render duerme las apps gratuitas.
      if (/^(999|429|timeout|cf-challenge)/.test(result)) t.diagnostic(`${where}: no verificable (${result}) ${url}`);
      else if (!(status < 400)) bad.push(`${where}: ${result} ${url}`);
      else if (where.endsWith('.video') && !/video\//.test(result)) bad.push(`${where}: no es vídeo (${result})`);
    }
    assert.deepEqual(bad, []);
  });
});
