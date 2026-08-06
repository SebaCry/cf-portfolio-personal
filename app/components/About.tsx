import { Code2, Palette, Rocket, Users } from 'lucide-react';
import { ACCENT, type Accent } from '../lib/data';
import type { Dictionary } from '../lib/i18n';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

const features = [
  { id: 'dev', icon: Code2, accent: 'primary' },
  { id: 'design', icon: Palette, accent: 'tertiary' },
  { id: 'performance', icon: Rocket, accent: 'secondary' },
  { id: 'collaboration', icon: Users, accent: 'primary' },
] as const satisfies readonly { id: keyof Dictionary['about']['features']; icon: typeof Code2; accent: Accent }[];

const stats = [
  { id: 'projects', value: '4+' },
  { id: 'years', value: '2+' },
  { id: 'languages', value: '+5' },
  { id: 'clients', value: '3' },
] as const satisfies readonly { id: keyof Dictionary['about']['stats']; value: string }[];

export default function About({ dict }: { dict: Dictionary }) {
  const t = dict.about;

  return (
    <section id="about" className="section-defer px-6 py-24 sm:px-12 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          accent="secondary"
        />

        <ul className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mb-20 lg:grid-cols-4">
          {features.map((feature, index) => {
            const tone = ACCENT[feature.accent];
            const copy = t.features[feature.id];

            return (
              <Reveal as="li" key={feature.id} delay={index * 80} className="h-full">
                <article
                  className={`group h-full rounded-2xl border border-neutral/10 bg-card-bg p-6 transition-[transform,border-color] duration-300 hover:-translate-y-2 ${tone.hoverBorder}`}
                >
                  <span className={`mb-4 inline-flex rounded-xl p-3 ${tone.bgStrong}`}>
                    <feature.icon className={`h-6 w-6 ${tone.text}`} aria-hidden="true" />
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-foreground">{copy.title}</h3>
                  <p className="leading-relaxed text-neutral-variant">{copy.description}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal
          as="dl"
          delay={120}
          className="grid grid-cols-2 gap-8 rounded-2xl border border-neutral/10 bg-card-bg p-8 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.id} className="text-center">
              <dd className="mb-2 bg-gradient-to-r from-primary to-tertiary bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                {stat.value}
              </dd>
              <dt className="text-sm tracking-wider text-neutral-variant uppercase">
                {t.stats[stat.id]}
              </dt>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
