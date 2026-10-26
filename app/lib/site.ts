import type { Dictionary } from './i18n/es';

/**
 * Datos del sitio que no son contenido. El contenido (perfil, contacto,
 * proyectos…) está en `app/lib/content/portfolio.ts`.
 *
 * Este archivo lo importa `Navbar` (cliente): no importes aquí `content`, o
 * los dos idiomas del portafolio acabarían en el bundle del navegador.
 */
export const SITE_URL = 'https://sebacry.me';

/** Retrato del Hero y tarjeta de Open Graph. */
export const OG_IMAGE = {
  url: '/images/image.png',
  width: 400,
  height: 400,
};

/** Secciones de la página, en orden. Las comparten Navbar y Footer. */
export const SECTIONS = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'projects', label: 'projects' },
  { id: 'websites', label: 'websites' },
  { id: 'skills', label: 'skills' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
] as const satisfies readonly { id: string; label: keyof Dictionary['nav'] }[];
