/**
 * Datos del sitio que no dependen del idioma.
 * Los textos traducibles (rol, descripción, keywords) están en
 * `app/lib/i18n/es.ts` y `app/lib/i18n/en.ts`.
 */
export const SITE_URL = 'https://sebacry.me';

export const AUTHOR = {
  name: 'Sebastián Pérez',
  email: 'jspc513@gmail.com',
  phone: '+57 315 277 3333',
  phoneHref: 'tel:+573152773333',
  locality: 'Ibagué',
  region: 'Tolima',
  country: 'CO',
  github: 'https://github.com/SebaCry',
  linkedin: 'https://www.linkedin.com/in/sebastián-perez',
} as const;

export const SOCIAL_PROFILES = [AUTHOR.github, AUTHOR.linkedin];

export const OG_IMAGE = {
  url: '/images/image.png',
  width: 400,
  height: 400,
};

/** Temas sobre los que trabaja; se usa en `knowsAbout` del JSON-LD. */
export const KNOWS_ABOUT = [
  'Full stack web development',
  'Next.js',
  'React',
  'Astro',
  'Django',
  'TypeScript',
  'Cloudflare Workers',
  'WordPress',
  'PostgreSQL',
];
