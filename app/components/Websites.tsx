import { ArrowUpRight } from 'lucide-react';
import { content } from '../lib/content';
import type { Dictionary } from '../lib/i18n';
import { Section } from './ui';

/**
 * Un índice: 9 sitios, cada uno una fila entera que enlaza (objetivo táctil
 * grande). Logo real del sitio, nombre grande y angosto; dominio y stack en una
 * línea monoespaciada, que en móvil ocupa la mitad que las etiquetas sueltas.
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
              className="site-row group flex items-center gap-4 py-4"
            >
              {/* alt vacío a propósito: el nombre del sitio va en el mismo enlace,
                  un alt "Logo de X" lo haría leer dos veces (árbol de decisión
                  de alt del W3C). Fondo blanco fijo: los logos están pensados
                  para fondo claro. 48x48 con width/height: sin CLS. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- logo ya optimizado (96x96 WebP o SVG) */}
              <img
                src={site.logo}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
                className="site-logo h-12 w-12 shrink-0 rounded-xl bg-white object-contain p-1.5 ring-1 ring-neutral/20"
              />
              <span className="grid min-w-0 flex-1 gap-x-6 gap-y-1 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
                <span className="display flex items-center gap-2 text-2xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                  {site.name}
                  <ArrowUpRight className="arrow-nudge h-5 w-5 shrink-0" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-neutral-variant sm:text-right">
                  {new URL(site.url).hostname.replace(/^www\./, '')}
                  <span aria-hidden="true"> · </span>
                  <span className="sr-only">, {dict.websites.stack}: </span>
                  {site.technologies.join(' · ')}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
