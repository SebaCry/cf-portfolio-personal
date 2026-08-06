'use client';

import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Dictionary } from '../lib/i18n';
import type { Locale } from '../lib/i18n/config';
import { AUTHOR } from '../lib/site';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';

/**
 * Recibe sólo `dict.nav`, que son puros strings y cruzan sin problema la
 * frontera servidor -> cliente. El diccionario completo NO se puede pasar:
 * contiene funciones y React no sabe serializarlas a través del límite RSC.
 */
type NavbarProps = {
  t: Dictionary['nav'];
  locale: Locale;
};

export default function Navbar({ t, locale }: NavbarProps) {

  const navLinks = [
    { name: t.home, href: '#hero', id: 'hero' },
    { name: t.about, href: '#about', id: 'about' },
    { name: t.experience, href: '#experience', id: 'experience' },
    { name: t.skills, href: '#skills', id: 'skills' },
    { name: t.projects, href: '#projects', id: 'projects' },
    { name: t.contact, href: '#contact', id: 'contact' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('hero');

  // Scroll: listener pasivo + rAF. Sin `passive` el navegador tiene que
  // esperar a saber si vas a llamar preventDefault antes de desplazar,
  // que es lo que hacía que el scroll se sintiera pesado.
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
    const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact']
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

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  // Cerrar con Escape.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className="nav-surface fixed top-0 right-0 left-0 z-50 border-b border-transparent"
        data-scrolled={isScrolled}
      >
        <nav aria-label={t.mainNav} className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16">
          <div className="flex h-20 items-center justify-between">
            <a href="#hero" className="text-lg font-bold sm:text-2xl">
              <span className="bg-gradient-to-r from-primary via-tertiary to-secondary bg-clip-text text-transparent">
                {AUTHOR.name}
              </span>
            </a>

            <div className="hidden items-center gap-6 lg:flex xl:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  data-active={activeId === link.id}
                  className="nav-link relative text-neutral-variant transition-colors hover:text-foreground data-[active=true]:text-foreground"
                  aria-current={activeId === link.id ? 'true' : undefined}
                >
                  {link.name}
                </a>
              ))}

              <LanguageToggle locale={locale} label={t.switchLanguage} />
              <ThemeToggle toLight={t.toLight} toDark={t.toDark} />

              <a
                href="#contact"
                className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 font-medium text-white transition-transform hover:scale-105 active:scale-95"
              >
                {t.hire}
              </a>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <LanguageToggle locale={locale} label={t.switchLanguage} />
              <ThemeToggle toLight={t.toLight} toDark={t.toDark} />
              <button
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
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg lg:hidden"
      >
        <nav
          aria-label={t.mobileNav}
          className="flex h-full flex-col items-center justify-center gap-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-medium text-neutral-variant transition-colors hover:text-foreground"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3 text-lg font-medium text-white"
          >
            {t.hire}
          </a>
        </nav>
      </div>
    </>
  );
}
