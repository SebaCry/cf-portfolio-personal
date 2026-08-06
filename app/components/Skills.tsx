import { Database, Globe, Layers, Terminal } from 'lucide-react';
import { ACCENT, skillCategories } from '../lib/data';
import type { Dictionary } from '../lib/i18n';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { TechIcons } from './TechIcons';

const categoryIcons = {
  globe: Globe,
  terminal: Terminal,
  database: Database,
  layers: Layers,
} as const;

export default function Skills({ dict }: { dict: Dictionary }) {
  const t = dict.skills;

  return (
    <section
      id="skills"
      className="section-defer relative overflow-hidden px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="orb orb--a top-1/4 left-1/4 h-96 w-96 bg-primary/5" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {skillCategories.map((category, categoryIndex) => {
            const tone = ACCENT[category.accent];
            const CategoryIcon = categoryIcons[category.icon];

            return (
              <Reveal
                key={category.id}
                delay={categoryIndex * 90}
                dir={categoryIndex % 2 === 0 ? 'left' : 'right'}
              >
                <article
                  className={`h-full rounded-2xl border border-neutral/10 bg-card-bg p-6 transition-colors sm:p-8 ${tone.hoverBorder}`}
                >
                  <header className="mb-6 flex items-center gap-4">
                    <span className={`rounded-xl border p-3 ${tone.bgStrong} ${tone.border}`}>
                      <CategoryIcon className={`h-6 w-6 ${tone.text}`} aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                      {t.categories[category.id]}
                    </h3>
                  </header>

                  <ul className="space-y-4">
                    {category.skills.map((skill, skillIndex) => {
                      const SkillIcon = TechIcons[skill.name];

                      return (
                        <li key={skill.name}>
                          <div className="mb-2 flex items-center justify-between">
                            <span className="flex items-center gap-3">
                              {SkillIcon && (
                                <SkillIcon className={`h-5 w-5 shrink-0 ${tone.text}`} />
                              )}
                              <span className="font-medium text-foreground">{skill.name}</span>
                            </span>
                            <span className="text-sm text-neutral">{skill.level}%</span>
                          </div>

                          <div
                            className="h-2 overflow-hidden rounded-full bg-neutral/10"
                            role="meter"
                            aria-valuenow={skill.level}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={t.meterLabel(skill.name)}
                          >
                            <div
                              className={`skill-bar h-full w-full rounded-full ${tone.bar}`}
                              style={
                                {
                                  '--level': skill.level / 100,
                                  '--bar-delay': `${skillIndex * 70}ms`,
                                } as React.CSSProperties
                              }
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200} className="mt-16 text-center">
          <p className="text-neutral-variant">{t.footnote}</p>
          <span className="anim-bob mt-4 inline-block text-4xl" aria-hidden="true">
            🚀
          </span>
        </Reveal>
      </div>
    </section>
  );
}
