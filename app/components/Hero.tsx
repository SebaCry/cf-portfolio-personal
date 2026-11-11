import { ArrowDown, ArrowRight, Check, MapPin, Store } from 'lucide-react';
import { content } from '../lib/content';
import type { Dictionary, Locale } from '../lib/i18n';
import { AVATAR } from '../lib/site';
import { SocialLinks } from './ui';

/**
 * Componente de servidor: cero JavaScript en el cliente.
 *
 * Primero el mensaje (h1 = posicionamiento) y al lado tres pruebas que llevan
 * a su proyecto. El nombre va arriba, más pequeño, con el retrato como firma.
 * La única animación es la entrada (keyframes) y el sello de la primera prueba.
 */
export default function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const t = dict.hero;
  const { profile, contact, highlights } = content;
  const { locality, region, country } = contact.location;

  return (
    <section id="hero" aria-label={t.sectionLabel} className="px-6 pt-28 pb-16 sm:px-10 lg:pt-36 lg:pb-24">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <div className="anim-up flex items-center gap-4">
            {/* <img> y no next/image: en Workers, sin binding de imágenes, next/image
                sirve el PNG original (154 KB) para un avatar de 56 px. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- webp ya a su tamaño (1,5 KB) */}
            <img
              src={AVATAR}
              alt={t.portraitAlt(profile.name)}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/60 ring-offset-2 ring-offset-background"
            />
            <div>
              <p className="font-semibold text-foreground">{profile.name}</p>
              <p className="flex flex-wrap items-center gap-x-1.5 text-sm text-neutral-variant">
                <span>{profile.role[locale]}</span>
                <span aria-hidden="true" className="max-sm:hidden">
                  ·
                </span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap">
                  <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                  {locality}, {region}, {country}
                </span>
              </p>
            </div>
          </div>

          <h1
            className="anim-up display mt-8 text-[clamp(2.75rem,6.5vw,5.5rem)] leading-[0.95] font-extrabold tracking-[-0.03em] text-foreground"
            style={{ animationDelay: '60ms' }}
          >
            {profile.tagline[locale]}
          </h1>

          <p
            className="anim-up mt-6 max-w-xl text-lg leading-relaxed text-neutral-variant sm:text-xl"
            style={{ animationDelay: '120ms' }}
          >
            {profile.summary[locale]}
          </p>

          <div
            className="anim-up mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: '180ms' }}
          >
            <a href="#contact" className="btn-primary">
              {dict.nav.hire}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#projects" className="btn-ghost">
              {t.ctaProjects}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <SocialLinks />
          </div>
        </div>

        <nav aria-label={t.proofs} className="anim-up" style={{ animationDelay: '240ms' }}>
          <p className="mb-4 font-mono text-xs tracking-wider text-neutral-variant uppercase">
            {t.proofs}
          </p>
          <ul className="space-y-3">
            {highlights.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex items-center gap-4 rounded-xl border border-neutral/20 bg-surface p-3 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-primary/50 active:scale-[0.98]"
                >
                  <span className="relative grid h-16 w-20 shrink-0 place-items-center overflow-hidden rounded-lg bg-background sm:h-20 sm:w-28">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- webp ya a su tamaño (12-30 KB)
                      <img
                        src={item.image}
                        alt=""
                        width={224}
                        height={160}
                        decoding="async"
                        className="h-full w-full object-cover object-[50%_20%]"
                      />
                    ) : (
                      <Store className="h-8 w-8 text-primary" aria-hidden="true" />
                    )}
                    {/* El sello: la primera prueba son pedidos de aprobación de SEBSBOT. */}
                    {index === 0 && (
                      <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
                        <span className="stamp-wait [grid-area:1/1] rounded-full border border-primary bg-background/90 px-2 py-0.5 font-mono text-[10px] text-primary">
                          {dict.video.waiting}
                        </span>
                        <span className="stamp-ok [grid-area:1/1] inline-flex items-center gap-1 rounded-md border-2 border-approved bg-background/90 px-2 py-0.5 font-mono text-xs font-bold tracking-wider text-approved uppercase">
                          <Check className="h-3.5 w-3.5" />
                          {dict.video.approved}
                        </span>
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-foreground">{item.title}</span>
                    <span className="mt-1 block text-sm leading-snug text-neutral-variant">
                      {item.text[locale]}
                    </span>
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-neutral-variant transition-[transform,color] group-hover:translate-x-0.5 group-hover:text-primary max-sm:hidden"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
