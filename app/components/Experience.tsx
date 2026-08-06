import { Briefcase, CalendarDays, Check, MapPin } from 'lucide-react';
import { experiences } from '../lib/data';
import type { Dictionary } from '../lib/i18n';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';

export default function Experience({ dict }: { dict: Dictionary }) {
  const t = dict.experience;

  return (
    <section
      id="experience"
      className="section-defer relative overflow-hidden px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="orb orb--b top-1/3 right-1/4 h-96 w-96 bg-secondary/5" />
      </div>

      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          accent="secondary"
        />

        <ol className="relative space-y-8">
          {/* Línea de la línea de tiempo */}
          <span
            className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-primary/50 via-neutral/20 to-transparent md:left-[19px]"
            aria-hidden="true"
          />

          {experiences.map((job, index) => {
            const copy = t.items[job.id];

            return (
              <Reveal as="li" key={job.id} delay={index * 100} className="relative pl-12 md:pl-16">
                {/* Punto de la línea de tiempo */}
                <span
                  className={`absolute top-6 left-0 flex h-8 w-8 items-center justify-center rounded-full border md:h-10 md:w-10 ${
                    job.current ? 'border-primary/40 bg-primary/20' : 'border-neutral/20 bg-card-bg'
                  }`}
                  aria-hidden="true"
                >
                  <Briefcase
                    className={`h-4 w-4 md:h-5 md:w-5 ${job.current ? 'text-primary' : 'text-neutral'}`}
                  />
                </span>

                <article className="rounded-2xl border border-neutral/10 bg-card-bg p-6 transition-colors hover:border-primary/30 sm:p-8">
                  <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground sm:text-2xl">{copy.role}</h3>
                      <p className="mt-1 font-medium text-primary">{job.company}</p>
                    </div>

                    {job.current && (
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                        </span>
                        {t.currentBadge}
                      </span>
                    )}
                  </header>

                  <div className="mb-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-variant">
                    <span className="inline-flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      {copy.period}
                      <span className="text-neutral/60">·</span>
                      {copy.duration}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {copy.location}
                    </span>
                  </div>

                  <p className="mb-5 leading-relaxed text-neutral-variant">{copy.description}</p>

                  <ul className="mb-6 space-y-2">
                    {copy.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3 text-neutral-variant">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-wrap gap-2">
                    {job.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-lg border border-neutral/20 bg-neutral/10 px-3 py-1.5 text-sm font-medium text-neutral"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
