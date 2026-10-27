import { ArrowDown, MapPin } from 'lucide-react';
import Image from 'next/image';
import { content } from '../lib/content';
import type { Dictionary, Locale } from '../lib/i18n';
import { OG_IMAGE } from '../lib/site';
import { SocialLinks } from './ui';

/**
 * Componente de servidor: cero JavaScript en el cliente.
 * Entrada con keyframes de CSS; el fondo (halos, retícula) y el marco del
 * retrato también son CSS puro.
 */
export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const { profile, contact } = content;
  const { locality, region, country } = contact.location;
  // El apellido va con el degradado de acento.
  const [firstName, ...rest] = profile.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section
      id="hero"
      aria-label={t.sectionLabel}
      className="relative isolate flex min-h-svh items-center overflow-hidden px-6 pt-28 pb-16 sm:px-10"
    >
      {/* Fondo decorativo: halos y retícula, todo CSS (cero peticiones). */}
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="hero-glow absolute inset-0 -z-10" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div>
          <p className="anim-up inline-flex items-center gap-2 rounded-full border border-neutral/25 bg-card-bg/60 px-3 py-1 text-sm text-neutral-variant">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            {locality}, {region}, {country}
          </p>

          <h1
            className="anim-up mt-6 text-6xl leading-[0.92] font-extrabold tracking-[-0.035em] text-foreground sm:text-8xl"
            style={{ animationDelay: '60ms' }}
          >
            {firstName} <span className="text-gradient">{lastName}</span>
          </h1>

          <p
            className="anim-up mt-5 text-xl font-medium text-primary sm:text-2xl"
            style={{ animationDelay: '120ms' }}
          >
            {profile.role[locale]}
          </p>

          <p
            className="anim-up mt-6 max-w-2xl text-lg leading-relaxed text-neutral-variant"
            style={{ animationDelay: '180ms' }}
          >
            {profile.headline[locale]}
          </p>

          <div
            className="anim-up mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '240ms' }}
          >
            <a href="#projects" className="btn-primary">
              {t.ctaProjects}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn-ghost">
              {t.ctaContact}
            </a>
            <SocialLinks />
          </div>
        </div>

        <div
          className="anim-scale portrait-frame h-56 w-56 sm:h-64 sm:w-64 lg:h-80 lg:w-80"
          style={{ animationDelay: '100ms' }}
        >
          <div className="relative h-full w-full">
            <Image
              src={OG_IMAGE.url}
              alt={t.portraitAlt(profile.name)}
              fill
              sizes="(max-width: 640px) 224px, (max-width: 1024px) 256px, 320px"
              className="rounded-[1.1rem] object-cover"
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
