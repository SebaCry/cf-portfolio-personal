import { htmlLang, type Locale } from '../i18n/config';
import { portfolio } from './portfolio';
import type { Period, Portfolio, Text } from './schema';

/**
 * Punto de entrada del contenido. Solo lo importan componentes de servidor:
 * en un componente de cliente arrastraría los dos idiomas al bundle.
 */
export const content: Portfolio = portfolio;

export function tr(text: Text, locale: Locale): string {
  return typeof text === 'string' ? text : text[locale];
}

/** '2026-08' -> 'Ago 2026' / 'Aug 2026'; '2024' -> '2024'. */
function formatPeriodPart(period: Period, locale: Locale): string {
  const [year, month] = period.split('-').map(Number);
  if (!month) return String(year);
  const name = new Intl.DateTimeFormat(htmlLang[locale], { month: 'short', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, month - 1)))
    .replace('.', '');
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${year}`;
}

export function formatPeriod(start: Period, end: Period | null, locale: Locale, present: string) {
  return `${formatPeriodPart(start, locale)} – ${end ? formatPeriodPart(end, locale) : present}`;
}

/* ---------------------------------------------------------------------------
   Validación de lo que los tipos no pueden expresar. Corre al importar el
   módulo: el prerender de `next build` lo evalúa y el throw tumba el build con
   todos los problemas a la vez. Sin `fs`: este módulo también va al Worker.
--------------------------------------------------------------------------- */
const problems: string[] = [];
const URL_KEYS = new Set(['url', 'demo', 'app', 'video', 'linkedin', 'github']);

(function walk(value: unknown, path: string) {
  if (typeof value === 'string') {
    if (value.trim() === '') problems.push(`${path}: texto vacío`);
    if (URL_KEYS.has(path.split('.').pop()!) && !/^https:\/\/[!-~]+$/.test(value))
      problems.push(`${path}: la URL debe ser https:// y ASCII (codifica las tildes)`);
  } else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) walk(child, `${path}.${key}`);
  }
})(content, 'portfolio');

for (const { start, end } of [...content.experience, ...content.education]) {
  for (const period of [start, end])
    if (period !== null && !/^\d{4}(-(0[1-9]|1[0-2]))?$/.test(period))
      problems.push(`periodo inválido: ${period} (usa 'AAAA' o 'AAAA-MM')`);
  if (end !== null && end < start) problems.push(`periodo al revés: ${start} – ${end}`);
}

const ids = content.projects.map((project) => project.id);
ids.forEach((id, index) => {
  if (!/^[a-z0-9-]+$/.test(id)) problems.push(`id de proyecto no kebab-case: ${id}`);
  if (ids.indexOf(id) !== index) problems.push(`id de proyecto duplicado: ${id}`);
});
for (const project of content.projects) {
  const sibling = content.projects.find((other) => other.id === project.sameCodeAs);
  if (project.sameCodeAs && sibling?.sameCodeAs !== project.id)
    problems.push(`sameCodeAs de ${project.id} debe apuntar a un proyecto que le apunte de vuelta`);
}

for (const [locale, text] of Object.entries(content.profile.metaDescription))
  if (text.length > 160)
    problems.push(`metaDescription.${locale}: ${text.length} > 160 caracteres`);

if (problems.length > 0)
  throw new Error(
    `Contenido inválido en app/lib/content/portfolio.ts:\n- ${problems.join('\n- ')}`
  );
