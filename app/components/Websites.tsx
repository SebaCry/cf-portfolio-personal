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
            className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6"
          >
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-block min-w-0"
            >
              <span className="flex items-center gap-1.5 font-semibold text-foreground group-hover:text-primary">
                {site.name}
                <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </span>
              <span className="block truncate text-sm text-neutral-variant">
                {new URL(site.url).hostname.replace(/^www\./, '')}
              </span>
            </a>
            <Chips items={site.technologies} label={dict.websites.stack} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
