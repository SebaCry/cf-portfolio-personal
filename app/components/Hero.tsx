import { ArrowDown, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';
import type { Dictionary } from '../lib/i18n';
import { AUTHOR } from '../lib/site';

const socials = [
  { icon: Github, href: AUTHOR.github, label: 'GitHub' },
  { icon: Linkedin, href: AUTHOR.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${AUTHOR.email}`, label: 'Email' },
];

/**
 * Componente de servidor: cero JavaScript en el cliente.
 * Las animaciones de entrada son keyframes de CSS, así que arrancan en el
 * primer pintado en lugar de esperar a que hidrate una librería de animación.
 */
export default function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;

  return (
    <section
      id="hero"
      aria-label={t.sectionLabel}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Orbes decorativos */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="orb orb--a top-1/4 -left-20 h-96 w-96 bg-primary/20" />
        <div className="orb orb--b bottom-1/4 -right-20 h-96 w-96 bg-tertiary/20" />
        <div className="orb orb--a orb--slow top-1/2 left-1/3 h-80 w-80 bg-secondary/10" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Columna de texto */}
          <div className="space-y-8">
            <p className="anim-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-primary">{t.badge}</span>
            </p>

            <div className="space-y-4">
              <h1
                className="anim-up text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl"
                style={{ animationDelay: '60ms' }}
              >
                <span className="block text-foreground">{t.greeting}</span>
                <span className="block bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                  {AUTHOR.name}
                </span>
              </h1>

              <p
                className="anim-up flex flex-wrap items-center gap-x-3 text-xl text-neutral sm:text-2xl lg:text-3xl"
                style={{ animationDelay: '120ms' }}
              >
                <span>{t.roleLead}</span>
                <span className="text-secondary">{t.roleAccent}</span>
              </p>
            </div>

            <p
              className="anim-up max-w-xl text-base leading-relaxed text-neutral-variant sm:text-lg"
              style={{ animationDelay: '180ms' }}
            >
              {t.description}
            </p>

            <div
              className="anim-up flex flex-col gap-4 sm:flex-row"
              style={{ animationDelay: '240ms' }}
            >
              <a
                href="#projects"
                className="group rounded-full bg-primary px-8 py-4 text-center font-medium text-white transition-transform hover:scale-[1.03] active:scale-95"
              >
                <span className="flex items-center justify-center gap-2">
                  {t.ctaProjects}
                  <ArrowDown
                    className="h-5 w-5 transition-transform group-hover:translate-y-1"
                    aria-hidden="true"
                  />
                </span>
              </a>

              <a
                href="#contact"
                className="rounded-full border-2 border-primary/30 px-8 py-4 text-center font-medium text-foreground backdrop-blur-sm transition-colors hover:bg-primary/10"
              >
                {t.ctaContact}
              </a>
            </div>

            <ul className="anim-up flex gap-6" style={{ animationDelay: '300ms' }}>
              {socials.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group inline-flex rounded-full border border-neutral/20 bg-card-bg p-3 transition-colors hover:border-primary/50 hover:bg-primary/10"
                    aria-label={label}
                  >
                    <Icon
                      className="h-6 w-6 text-neutral transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna de imagen */}
          <div
            className="anim-scale relative flex items-center justify-center"
            style={{ animationDelay: '100ms' }}
          >
            <div className="relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/25 via-tertiary/25 to-secondary/25 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-primary/30 shadow-2xl shadow-primary/20">
                <Image
                  src="/images/image.png"
                  alt={t.portraitAlt(AUTHOR.name, dict.meta.role)}
                  fill
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
                  className="object-cover"
                  priority
                  fetchPriority="high"
                />
              </div>

              <div
                className="orb orb--sm orb--b -top-4 -right-4 h-20 w-20 bg-tertiary/30"
                aria-hidden="true"
              />
              <div
                className="orb orb--sm orb--a -bottom-4 -left-4 h-16 w-16 bg-secondary/30"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="anim-in absolute bottom-8 left-1/2 -translate-x-1/2 p-2"
        style={{ animationDelay: '900ms' }}
        aria-label={t.scrollHint}
      >
        <ArrowDown className="anim-bob h-6 w-6 text-neutral" aria-hidden="true" />
      </a>
    </section>
  );
}
