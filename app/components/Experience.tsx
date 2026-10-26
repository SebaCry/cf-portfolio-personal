import { content, formatPeriod, tr } from '../lib/content';
import type { Dictionary, Locale } from '../lib/i18n';
import { Chips, ExternalLink, PeriodRow, Section } from './ui';

export default function Experience({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section id="experience" title={dict.nav.experience}>
      <ol className="space-y-10">
        {content.experience.map((job) => {
          const company = tr(job.company, locale);

          return (
            <PeriodRow
              key={company}
              period={formatPeriod(job.start, job.end, locale, dict.period.present)}
            >
              <h3 className="text-lg font-semibold text-foreground">{job.role[locale]}</h3>
              <p className="mt-1 text-foreground">{company}</p>
              <p className="mt-1 text-sm text-neutral-variant">{job.mode[locale]}</p>
              {job.url && (
                <p className="mt-2 text-sm">
                  <ExternalLink href={job.url} srSuffix={company}>
                    {dict.experience.site}
                  </ExternalLink>
                </p>
              )}
              {job.technologies && (
                <div className="mt-4">
                  <Chips items={job.technologies} />
                </div>
              )}
            </PeriodRow>
          );
        })}
      </ol>
    </Section>
  );
}
