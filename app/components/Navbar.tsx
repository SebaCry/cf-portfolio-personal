'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { Dictionary } from '../lib/i18n';
import type { Locale } from '../lib/i18n/config';
import { SECTIONS } from '../lib/site';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

/**
 * Recibe sólo strings (`dict.nav` y el nombre), que cruzan sin problema la
 * frontera servidor -> cliente. No importa `content`: arrastraría todo el
 * portafolio, en los dos idiomas, al bundle del navegador.
 */
type NavbarProps = {
  t: Dictionary['nav'];
  locale: Locale;
  name: string;
};

export default function Navbar({ t, locale, name }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Scroll: listener pasivo + rAF, para no bloquear el desplazamiento.
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 24);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sección activa mediante IntersectionObserver (no cuesta nada en el scroll).
  useEffect(() => {
    const sections = ['hero', ...SECTIONS.map((section) => section.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Menú móvil abierto: el resto de la página queda `inert` (el foco no se
  // escapa detrás del panel), se bloquea el scroll del fondo, el foco va al
  // primer enlace y Escape cierra devolviendo el foco al botón.
  useEffect(() => {
    if (!isMenuOpen) return;

    const background = document.querySelectorAll('main, footer');
    background.forEach((el) => el.setAttribute('inert', ''));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      background.forEach((el) => el.removeAttribute('inert'));
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className="nav-surface fixed top-0 right-0 left-0 z-50 border-b border-transparent"
        data-scrolled={isScrolled}
      >
        <nav aria-label={t.mainNav} className="mx-auto max-w-6xl px-6 sm:px-10">
          <div className="flex h-16 items-center justify-between gap-6">
            <a href="#hero" className="font-semibold tracking-tight text-foreground">
              {name}
            </a>

            <div className="hidden items-center gap-6 xl:flex">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  data-active={activeId === section.id}
                  className="nav-link relative text-sm text-neutral-variant transition-colors hover:text-foreground data-[active=true]:text-foreground"
                  aria-current={activeId === section.id ? 'true' : undefined}
                >
                  {t[section.label]}
                </a>
              ))}

              <LanguageToggle locale={locale} label={t.switchLanguage} />
              <ThemeToggle toLight={t.toLight} toDark={t.toDark} />

              <a href="#contact" className="btn-primary !px-4 !py-2 text-sm">
                {t.hire}
              </a>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <LanguageToggle locale={locale} label={t.switchLanguage} />
              <ThemeToggle toLight={t.toLight} toDark={t.toDark} />
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="p-2 text-foreground"
                aria-label={isMenuOpen ? t.closeMenu : t.openMenu}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Menú móvil. `hidden` cuando está cerrado para que no reciba foco. */}
      <div
        id="mobile-menu"
        hidden={!isMenuOpen}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg xl:hidden"
      >
        <nav
          aria-label={t.mobileNav}
          className="flex h-full flex-col items-center justify-center gap-6"
        >
          {SECTIONS.map((section, index) => (
            <a
              key={section.id}
              ref={index === 0 ? firstLinkRef : undefined}
              href={`#${section.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-medium text-neutral-variant transition-colors hover:text-foreground"
            >
              {t[section.label]}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
