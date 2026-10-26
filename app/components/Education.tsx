import { content, formatPeriod, tr } from '../lib/content';
import type { Dictionary, Locale } from '../lib/i18n';
import { PeriodRow, Section } from './ui';

export default function Education({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section id="education" title={dict.nav.education}>
      <ol className="space-y-8">
        {content.education.map((item) => (
          <PeriodRow
            key={item.title[locale]}
            period={formatPeriod(item.start, item.end, locale, dict.period.present)}
          >
            <h3 className="text-lg font-semibold text-foreground">{item.title[locale]}</h3>
            <p className="mt-1 text-neutral-variant">{tr(item.institution, locale)}</p>
          </PeriodRow>
        ))}
      </ol>
    </Section>
  );
}
