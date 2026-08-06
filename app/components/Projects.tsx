import { ArrowUpRight, Github, Sparkles, Wrench } from 'lucide-react';
import { ACCENT, projects, type Project, type Tone } from '../lib/data';
import type { Dictionary } from '../lib/i18n';
import { AUTHOR } from '../lib/site';
import ProjectVideo from './ProjectVideo';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { TechIcons } from './TechIcons';

function TechList({ technologies, tone }: { technologies: string[]; tone: Tone }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {technologies.map((tech) => {
        const Icon = TechIcons[tech];
        return (
          <li
            key={tech}
            className="flex items-center gap-2 rounded-lg border border-neutral/20 bg-neutral/10 px-3 py-1.5"
          >
            {Icon && <Icon className={`h-4 w-4 ${tone.text}`} />}
            <span className="text-sm font-medium text-neutral">{tech}</span>
          </li>
        );
      })}
    </ul>
  );
}

/** Maqueta de ventana de navegador: da contexto visual sin cargar imágenes. */
function SitePreview({ project }: { project: Project }) {
  const tone = ACCENT[project.accent];

  return (
    <div className="overflow-hidden rounded-xl border border-neutral/15">
      <div className="flex items-center gap-2 border-b border-neutral/10 bg-neutral/10 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </span>
        <span className="truncate rounded bg-background/60 px-2 py-0.5 font-mono text-[11px] text-neutral-variant">
          {project.domain}
        </span>
      </div>

      <div
        className={`relative flex aspect-[16/9] items-center justify-center bg-gradient-to-br ${
          project.accent === 'primary'
            ? 'from-primary/20 via-card-bg to-tertiary/10'
            : project.accent === 'secondary'
              ? 'from-secondary/20 via-card-bg to-primary/10'
              : 'from-tertiary/20 via-card-bg to-secondary/10'
        }`}
      >
        <span
          className={`px-6 text-center text-2xl font-bold tracking-tight ${tone.text} opacity-90 sm:text-3xl`}
          aria-hidden="true"
        >
          {project.title}
        </span>
      </div>
    </div>
  );
}

export default function Projects({ dict }: { dict: Dictionary }) {
  const t = dict.projects;
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      className="section-defer relative overflow-hidden px-6 py-24 sm:px-12 lg:px-16 lg:py-32"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="orb orb--b right-1/4 bottom-1/4 h-96 w-96 bg-tertiary/5" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          description={t.description}
          accent="tertiary"
        />

        {/* Proyecto destacado */}
        {featured.map((project) => {
          const tone = ACCENT[project.accent];
          const copy = t.items[project.id];

          return (
            <Reveal key={project.id} className="mb-8">
              <article className="grid grid-cols-1 gap-8 rounded-2xl border border-neutral/10 bg-card-bg p-6 transition-colors hover:border-primary/30 sm:p-8 lg:grid-cols-2 lg:items-center">
                <div className="relative">
                  {project.videoUrl && (
                    <ProjectVideo
                      src={project.videoUrl}
                      // Las etiquetas se resuelven aquí, en el servidor: el
                      // diccionario las genera con funciones y esas no cruzan
                      // la frontera hacia un componente de cliente.
                      labels={{
                        video: t.videoLabel(project.title),
                        expand: t.videoExpand(project.title),
                        dialog: t.videoDialog(project.title),
                        close: t.close,
                      }}
                    />
                  )}
                  <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    {t.featuredBadge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-foreground sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className={`mt-1 mb-4 text-sm font-medium ${tone.text}`}>{copy.subtitle}</p>

                  <p className="mb-6 leading-relaxed text-neutral-variant">{copy.description}</p>

                  <div className="mb-6">
                    <TechList technologies={project.technologies} tone={tone} />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        {t.codeLink}
                        <span className="sr-only"> {t.ofProject(project.title)}</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-secondary/20 bg-secondary/10 px-4 py-3 text-sm font-medium text-secondary transition-colors hover:bg-secondary/20"
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        {t.demoLink}
                        <span className="sr-only"> {t.ofProject(project.title)}</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}

        {/* Resto de proyectos */}
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, index) => {
            const tone = ACCENT[project.accent];
            const copy = t.items[project.id];

            return (
              <Reveal as="li" key={project.id} delay={index * 90} className="h-full">
                <article
                  className={`group flex h-full flex-col rounded-2xl border border-neutral/10 bg-card-bg p-6 transition-[transform,border-color] duration-300 hover:-translate-y-2 ${tone.hoverBorder}`}
                >
                  <SitePreview project={project} />

                  <div className="mt-6 flex flex-1 flex-col">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                          {project.title}
                        </h3>
                        <p className={`mt-1 text-sm font-medium ${tone.text}`}>{copy.subtitle}</p>
                      </div>

                      {copy.status && (
                        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-neutral/20 bg-neutral/10 px-2.5 py-1 text-[11px] font-medium text-neutral">
                          <Wrench className="h-3 w-3" aria-hidden="true" />
                          {copy.status}
                        </span>
                      )}
                    </div>

                    <p className="mb-6 flex-1 text-sm leading-relaxed text-neutral-variant">
                      {copy.description}
                    </p>

                    <div className="mb-6">
                      <TechList technologies={project.technologies} tone={tone} />
                    </div>

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${tone.borderSoft} ${tone.bg} ${tone.text} hover:brightness-125`}
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        {t.visitLink}
                        <span className="sr-only"> {t.ofProject(project.title)}</span>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={150} className="mt-16 text-center">
          <a
            href={AUTHOR.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary/30 px-8 py-4 text-foreground transition-colors hover:bg-primary/10"
          >
            {t.moreOnGithub}
            <Github className="h-5 w-5" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
