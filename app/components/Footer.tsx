import { Github, Heart, Linkedin, Mail } from 'lucide-react';
import type { Dictionary } from '../lib/i18n';
import { AUTHOR } from '../lib/site';
import Reveal from './Reveal';

const socialLinks = [
  { icon: Github, href: AUTHOR.github, label: 'GitHub' },
  { icon: Linkedin, href: AUTHOR.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${AUTHOR.email}`, label: 'Email' },
];

export default function Footer({ dict }: { dict: Dictionary }) {
  const t = dict.footer;
  const year = new Date().getFullYear();

  const sections = [
    {
      title: t.navTitle,
      links: [
        { name: dict.nav.home, href: '#hero' },
        { name: dict.nav.about, href: '#about' },
        { name: dict.nav.experience, href: '#experience' },
        { name: dict.nav.skills, href: '#skills' },
        { name: dict.nav.projects, href: '#projects' },
        { name: dict.nav.contact, href: '#contact' },
      ],
    },
    { title: t.servicesTitle, links: t.services },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-neutral/10 px-6 py-16 sm:px-12 lg:px-16 lg:py-20">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="orb orb--a bottom-0 left-1/4 h-96 w-96 bg-primary/5" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <Reveal className="lg:col-span-2">
            <p className="mb-4 text-2xl font-bold">
              <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                {AUTHOR.name}
              </span>
            </p>
            <p className="mb-6 max-w-md leading-relaxed text-neutral-variant">
              {t.tagline(dict.meta.role, AUTHOR.locality)}
            </p>

            <ul className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="group inline-flex rounded-full border border-neutral/20 bg-card-bg p-3 transition-colors hover:border-primary/50 hover:bg-primary/10"
                    aria-label={label}
                  >
                    <Icon
                      className="h-5 w-5 text-neutral transition-colors group-hover:text-primary"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          {sections.map((section, index) => (
            <Reveal key={section.title} delay={100 + index * 80}>
              <h2 className="mb-4 font-bold text-foreground">{section.title}</h2>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="inline-block text-neutral-variant transition-[color,transform] duration-200 hover:translate-x-1 hover:text-primary"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral/10 pt-8 sm:flex-row">
          <p className="flex items-center gap-2 text-sm text-neutral-variant">
            © {year} {AUTHOR.name}. {t.madeWithPre}
            <Heart className="h-4 w-4 fill-error text-error" aria-hidden="true" />
            <span className="sr-only">{t.love}</span>
            {t.madeWithPost}
          </p>

          <p className="text-sm text-neutral-variant">{t.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
