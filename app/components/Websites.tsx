import { ArrowUpRight } from 'lucide-react';
import { content } from '../lib/content';
import type { Dictionary } from '../lib/i18n';
import { Section } from './ui';

/**
 * Un índice: 9 sitios, cada uno una fila entera que enlaza (objetivo táctil
 * grande). Nombre grande y angosto; dominio y stack en una línea monoespaciada,
 * que en móvil ocupa la mitad que las etiquetas sueltas.
 */
export default function Websites({ dict }: { dict: Dictionary }) {
  return (
    <Section id="websites" title={dict.nav.websites} layout="aside" raised>
      <ul className="divide-y divide-neutral/15 border-y border-neutral/15">
        {content.websites.map((site) => (
          <li key={site.url}>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-x-6 gap-y-1 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline"
            >
              <span className="display flex items-center gap-2 text-2xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                {site.name}
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </span>
              <span className="font-mono text-xs text-neutral-variant sm:text-right">
                {new URL(site.url).hostname.replace(/^www\./, '')}
                <span aria-hidden="true"> · </span>
                <span className="sr-only">, {dict.websites.stack}: </span>
                {site.technologies.join(' · ')}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
