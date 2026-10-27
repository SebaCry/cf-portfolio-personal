import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { content } from '../lib/content';

/** Sección con el título fijo a la izquierda en escritorio, como un CV. */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="section-defer border-t border-neutral/15 px-6 py-20 sm:px-10 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
        <h2
          id={`${id}-title`}
          className="section-title text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:sticky lg:top-28 lg:self-start"
        >
          {title}
        </h2>
        <div className="reveal-auto min-w-0">{children}</div>
      </div>
    </section>
  );
}

/** Etiquetas de tecnologías de un proyecto, sitio o cargo. */
export function Chips({ items, label }: { items: string[]; label?: string }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-neutral/20 bg-neutral/10 px-2 py-0.5 font-mono text-xs text-foreground"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Fila de línea de tiempo: periodo a la izquierda, detalle a la derecha. */
export function PeriodRow({ period, children }: { period: string; children: ReactNode }) {
  return (
    <li className="reveal grid gap-1 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-6">
      <p className="text-sm text-neutral-variant tabular-nums sm:pt-1">{period}</p>
      <div>{children}</div>
    </li>
  );
}

/** Enlace externo con el nombre del destino para lectores de pantalla. */
export function ExternalLink({
  href,
  children,
  srSuffix,
}: {
  href: string;
  children: ReactNode;
  srSuffix?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="link">
      {children}
      {srSuffix && <span className="sr-only"> {srSuffix}</span>}
      <ArrowUpRight className="arrow-nudge h-4 w-4" aria-hidden="true" />
    </a>
  );
}

const SOCIALS = [
  { icon: Github, href: content.contact.github, label: 'GitHub' },
  { icon: Linkedin, href: content.contact.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${content.contact.email}`, label: 'Email' },
];

/** Redes sociales: las comparten Hero, Contacto y Footer. */
export function SocialLinks() {
  return (
    <ul className="flex gap-2">
      {SOCIALS.map(({ icon: Icon, href, label }) => (
        <li key={label}>
          <a
            href={href}
            {...(href.startsWith('mailto:')
              ? {}
              : { target: '_blank', rel: 'noopener noreferrer' })}
            aria-label={label}
            className="lift inline-flex h-11 w-11 items-center justify-center rounded-lg border border-neutral/25 text-neutral-variant hover:border-primary hover:text-primary"
          >
            <Icon className="h-5 w-5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
