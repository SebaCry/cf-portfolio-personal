import { content } from '../lib/content';
import type { Dictionary, Locale } from '../lib/i18n';
import { Section } from './ui';

export default function About({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  return (
    <Section id="about" title={dict.nav.about}>
      <div className="max-w-prose space-y-5 text-lg leading-relaxed text-neutral-variant">
        {content.profile.bio[locale].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
