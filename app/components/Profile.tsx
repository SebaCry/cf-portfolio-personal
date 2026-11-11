import { content, formatPeriod, tr } from '../lib/content';
import type { Period } from '../lib/content/schema';
import type { Dictionary, Locale } from '../lib/i18n';
import { Chips, ExternalLink, PeriodRow, Section } from './ui';

const LABEL = 'font-mono text-xs tracking-wider text-neutral-variant uppercase';

/**
 * Sobre mí, experiencia, formación, habilidades e idiomas en una sola sección,
 * después del trabajo: a quien llega le interesa primero qué construyo.
 * Habilidades como etiquetas, sin porcentajes: no hay datos que los respalden.
 */
export default function Profile({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.profile;
  const { profile, experience, education, skills, languages } = content;
  const period = (start: Period, end: Period | null) =>
    formatPeriod(start, end, locale, dict.period.present);

  return (
    <Section id="profile" title={dict.nav.profile}>
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
        <div>
          <h3 className={LABEL}>{t.about}</h3>
          <p className="mt-4 text-xl leading-relaxed text-foreground">{profile.headline[locale]}</p>
          <div className="mt-5 space-y-4 leading-relaxed text-neutral-variant">
            {profile.bio[locale].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className={`${LABEL} mt-12`}>{t.skills}</h3>
          <div className="mt-4">
            <Chips items={skills.map((skill) => tr(skill, locale))} />
          </div>

          <h3 className={`${LABEL} mt-10`}>{t.languages}</h3>
          <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-2">
            {languages.map((language) => (
              <div key={language.name[locale]} className="flex items-baseline gap-2">
                <dt className="font-semibold text-foreground">{language.name[locale]}</dt>
                <dd className="text-neutral-variant">{language.level[locale]}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className={LABEL}>{t.experience}</h3>
          <ol className="mt-5 space-y-8">
            {experience.map((job) => {
              const company = tr(job.company, locale);
              return (
                <PeriodRow key={company} period={period(job.start, job.end)}>
                  <h4 className="text-lg font-semibold text-foreground">{job.role[locale]}</h4>
                  <p className="mt-0.5 text-foreground">{company}</p>
                  <p className="mt-0.5 text-sm text-neutral-variant">{job.mode[locale]}</p>
                  {job.url && (
                    <p className="mt-2 text-sm">
                      <ExternalLink href={job.url} srSuffix={company}>
                        {t.site}
                      </ExternalLink>
                    </p>
                  )}
                  {job.technologies && (
                    <div className="mt-3">
                      <Chips items={job.technologies} />
                    </div>
                  )}
                </PeriodRow>
              );
            })}
          </ol>

          <h3 className={`${LABEL} mt-12`}>{t.education}</h3>
          <ol className="mt-5 space-y-6">
            {education.map((item) => (
              <PeriodRow key={item.title[locale]} period={period(item.start, item.end)}>
                <h4 className="font-semibold text-foreground">{item.title[locale]}</h4>
                <p className="mt-0.5 text-neutral-variant">{tr(item.institution, locale)}</p>
              </PeriodRow>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
