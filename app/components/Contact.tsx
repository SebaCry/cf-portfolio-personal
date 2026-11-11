import { content } from '../lib/content';
import type { Dictionary } from '../lib/i18n';
import ContactForm from './ContactForm';
import { Section, SocialLinks } from './ui';

export default function Contact({ dict }: { dict: Dictionary }) {
  const t = dict.contact;
  const { email, phone, location } = content.contact;

  const channels = [
    { label: t.labels.email, value: email, href: `mailto:${email}` },
    { label: t.labels.phone, value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
    {
      label: t.labels.location,
      value: `${location.locality}, ${location.region}, ${location.country}`,
    },
  ];

  return (
    <Section id="contact" title={dict.nav.contact} intro={t.description} raised>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div>
          <dl className="space-y-5">
            {channels.map((channel) => (
              <div key={channel.label}>
                <dt className="text-sm text-neutral-variant">{channel.label}</dt>
                <dd className="mt-1 text-lg font-medium text-foreground">
                  {/* `.link`: en pantalla táctil no hay hover, así que tiene que verse enlace. */}
                  {channel.href ? (
                    <a href={channel.href} className="link">
                      {channel.value}
                    </a>
                  ) : (
                    channel.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8">
            <SocialLinks />
          </div>

          <p className="mt-8 text-sm text-neutral-variant">{t.references}</p>
        </div>

        <ContactForm t={t.form} />
      </div>
    </Section>
  );
}
