import { ArrowUpRight } from 'lucide-react';
import { content } from '../lib/content';
import type { Dictionary } from '../lib/i18n';
import { Chips, Section } from './ui';

/** Lista densa en lugar de tarjetas: son 9 sitios y se leen mejor en filas. */
export default function Websites({ dict }: { dict: Dictionary }) {
  return (
    <Section id="websites" title={dict.nav.websites}>
      <ul className="divide-y divide-neutral/15 border-y border-neutral/15">
        {content.websites.map((site) => (
          <li
            key={site.url}
            className="site-row reveal group grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
          >
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-4"
            >
              {/* alt vacío a propósito: el nombre del sitio va en el mismo enlace,
                  un alt "Logo de X" lo haría leer dos veces (árbol de decisión
                  de alt del W3C). Fondo blanco fijo: los logos están pensados
                  para fondo claro. 48x48 con width/height: sin CLS. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- WebP ya optimizado; next/image solo en el Hero */}
              <img
                src={site.logo}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="site-logo h-12 w-12 shrink-0 rounded-xl bg-white object-contain p-1.5 ring-1 ring-neutral/20"
              />
              <span className="min-w-0">
                <span className="flex items-center gap-1.5 font-semibold text-foreground transition-colors group-hover:text-primary">
                  {site.name}
                  <ArrowUpRight className="arrow-nudge h-4 w-4 shrink-0" aria-hidden="true" />
                </span>
                <span className="block truncate text-sm text-neutral-variant">
                  {new URL(site.url).hostname.replace(/^www\./, '')}
                </span>
              </span>
            </a>
            <Chips items={site.technologies} label={dict.websites.stack} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
