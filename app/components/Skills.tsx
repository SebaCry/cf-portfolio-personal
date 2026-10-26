import { content, tr } from '../lib/content';
import type { Dictionary, Locale } from '../lib/i18n';
import { Section } from './ui';

/** Habilidades como etiquetas, sin porcentajes: no hay datos que los respalden. */
export default function Skills({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.skills;

  return (
    <Section id="skills" title={dict.nav.skills}>
      <h3 className="font-medium text-neutral-variant">{t.technical}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {content.skills.map((skill) => {
          const name = tr(skill, locale);
          return (
            <li
              key={name}
              className="rounded-lg border border-neutral/20 bg-card-bg px-3 py-1.5 text-foreground"
            >
              {name}
            </li>
          );
        })}
      </ul>

      <h3 className="mt-12 font-medium text-neutral-variant">{t.languages}</h3>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {content.languages.map((language) => (
          <div
            key={language.name[locale]}
            className="flex items-baseline justify-between gap-4 rounded-lg border border-neutral/20 bg-card-bg px-4 py-3"
          >
            <dt className="font-semibold text-foreground">{language.name[locale]}</dt>
            <dd className="text-neutral-variant">{language.level[locale]}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
