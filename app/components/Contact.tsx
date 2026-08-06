import { Mail, MapPin, Phone } from 'lucide-react';
import { ACCENT, type Accent } from '../lib/data';
import type { Dictionary } from '../lib/i18n';
import { AUTHOR } from '../lib/site';
import ContactForm from './ContactForm';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const contactChannels = [
  { id: 'email', icon: Mail, accent: 'primary' },
  { id: 'phone', icon: Phone, accent: 'secondary' },
  { id: 'location', icon: MapPin, accent: 'tertiary' },
] as const satisfies readonly {
  id: keyof Dictionary['contact']['labels'];
  icon: typeof Mail;
  accent: Accent;
}[];

export default function Contact({ dict }: { dict: Dictionary }) {
  const t = dict.contact;

  const valueFor: Record<(typeof contactChannels)[number]['id'], string> = {
    email: AUTHOR.email,
    phone: AUTHOR.phone,
    location: t.location,
  };

  const hrefFor: Record<(typeof contactChannels)[number]['id'], string | null> = {
    email: `mailto:${AUTHOR.email}`,
    phone: AUTHOR.phoneHref,
    location: null,
  };

  return (
    <section
      id="contact"
      className="section-defer relative overflow-hidden px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="orb orb--a orb--slow top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary/5" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal dir="left" className="space-y-8">
            <div>
              <h3 className="mb-6 text-2xl font-bold text-foreground">{t.infoTitle}</h3>

              <ul className="space-y-4">
                {contactChannels.map((channel) => {
                  const tone = ACCENT[channel.accent];
                  const href = hrefFor[channel.id];
                  const content = (
                    <>
                      <span className={`rounded-lg border p-3 ${tone.bgStrong} ${tone.border}`}>
                        <channel.icon className={`h-5 w-5 ${tone.text}`} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm text-neutral-variant">
                          {t.labels[channel.id]}
                        </span>
                        <span className="block font-medium text-foreground">
                          {valueFor[channel.id]}
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={channel.id}>
                      {href ? (
                        <a
                          href={href}
                          className="flex items-center gap-4 rounded-xl border border-neutral/10 bg-card-bg p-4 transition-[transform,border-color] hover:translate-x-2 hover:border-primary/30"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4 rounded-xl border border-neutral/10 bg-card-bg p-4">
                          {content}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-tertiary/10 p-6">
              <h4 className="mb-3 text-lg font-bold text-foreground">{t.whyTitle}</h4>
              <ul className="space-y-2 text-neutral-variant">
                {t.reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2">
                    <span className="mt-1 text-primary" aria-hidden="true">
                      ✓
                    </span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal dir="right">
            <ContactForm t={t.form} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
