import { Github, Lock } from 'lucide-react';
import { content } from '../lib/content';
import type { Portfolio } from '../lib/content/schema';
import type { Dictionary, Locale } from '../lib/i18n';
import ProjectDemo from './ProjectDemo';
import { Chips, ExternalLink, Section } from './ui';

type Project = Portfolio['projects'][number];
type Props = { dict: Dictionary; locale: Locale };

function ProjectCard({ project, dict, locale }: Props & { project: Project }) {
  const t = dict.projects;
  const sibling = content.projects.find((other) => other.id === project.sameCodeAs);
  const { demo, app } = project.links;
  const media = project.media;
  // Portada: el póster o, si no hay, la primera captura.
  const poster = media && (media.poster ?? media.images?.[0]?.src);

  const demoButton = media && (
    <ProjectDemo
      poster={poster}
      video={media.video}
      images={media.images?.map((image) => ({ src: image.src, alt: image.alt[locale] }))}
      // Las etiquetas se resuelven aquí, en el servidor: el diccionario las
      // genera con funciones y esas no cruzan la frontera hacia el cliente.
      labels={{
        open: t.watchDemo,
        ofProject: t.ofProject(project.title),
        dialog: t.videoDialog(project.title),
        video: t.videoLabel(project.title),
        gallery: t.gallery(project.title),
        close: t.close,
      }}
    />
  );

  return (
    <article
      id={`proyecto-${project.id}`}
      className={`card reveal scroll-mt-28 p-5 sm:p-6 ${
        poster ? 'grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-center' : ''
      }`}
    >
      {poster && demoButton}

      <div>
        <h3 className="text-xl font-semibold text-foreground sm:text-2xl">{project.title}</h3>
        {project.description && (
          <p className="mt-2 leading-relaxed text-neutral-variant">{project.description[locale]}</p>
        )}

        {project.access && (
          <p className="mt-3 flex items-center gap-2 text-sm text-foreground">
            <Lock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            {project.access[locale]}
          </p>
        )}

        <div className="mt-4">
          <Chips items={project.technologies} />
        </div>

        {!poster && demoButton && <div className="mt-5">{demoButton}</div>}

        <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {demo && (
            <ExternalLink href={demo} srSuffix={t.ofProject(project.title)}>
              {t.demoLink}
            </ExternalLink>
          )}
          {app && (
            <ExternalLink href={app} srSuffix={t.ofProject(project.title)}>
              {t.appLink}
            </ExternalLink>
          )}
          {sibling && (
            <a href={`#proyecto-${sibling.id}`} className="link">
              {t.sameCodeAs(sibling.title)}
            </a>
          )}
        </p>
      </div>
    </article>
  );
}

export default function Projects({ dict, locale }: Props) {
  // ponytail: un solo grupo "mismo código"; si algún día hay dos, agrupar por par.
  const shared = content.projects.filter((project) => project.sameCodeAs);

  return (
    <Section id="projects" title={dict.nav.projects}>
      <div className="space-y-6">
        {content.projects.map((project) => {
          if (!project.sameCodeAs) {
            return <ProjectCard key={project.id} project={project} dict={dict} locale={locale} />;
          }
          if (project !== shared[0]) return null;

          return (
            <div
              key="shared"
              role="group"
              aria-labelledby="shared-code-title"
              className="rounded-2xl border border-primary/35 p-3 sm:p-4"
            >
              <p id="shared-code-title" className="px-2 pt-1 pb-4 font-medium text-foreground">
                {dict.projects.sharedTitle}
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {shared.map((item) => (
                  <ProjectCard key={item.id} project={item} dict={dict} locale={locale} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <a
        href={content.contact.github}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost mt-10"
      >
        <Github className="h-4 w-4" aria-hidden="true" />
        {dict.projects.moreOnGithub}
      </a>
    </Section>
  );
}
