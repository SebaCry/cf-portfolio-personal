import type { Dictionary } from './i18n/es';

/**
 * Datos del sitio que no son contenido. El contenido (perfil, contacto,
 * proyectos…) está en `app/lib/content/portfolio.ts`.
 *
 * Este archivo lo importa `Navbar` (cliente): no importes aquí `content`, o
 * los dos idiomas del portafolio acabarían en el bundle del navegador.
 */
export const SITE_URL = 'https://sebasperez.cc';

/** Retrato pequeño del Hero: webp de 112 px (2x de 56). 1,5 KB contra 154 KB del PNG. */
export const AVATAR = '/images/avatar.webp';

/** Tarjeta de Open Graph (el retrato en PNG). */
export const OG_IMAGE = {
  url: '/images/image.png',
  width: 400,
  height: 400,
};

/** Secciones de la página, en orden. Las comparten Navbar y Footer. */
export const SECTIONS = [
  { id: 'projects', label: 'projects' },
  { id: 'video', label: 'video' },
  { id: 'websites', label: 'websites' },
  { id: 'profile', label: 'profile' },
  { id: 'contact', label: 'contact' },
] as const satisfies readonly { id: string; label: keyof Dictionary['nav'] }[];
