import type { MetadataRoute } from 'next';
import { locales, localePath } from './lib/i18n/config';
import { SITE_URL } from './lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Cada URL declara sus alternativas de idioma, que es lo que Google usa
  // para agrupar las dos versiones como traducciones de la misma página.
  const languages = Object.fromEntries(
    locales.map((locale) => {
      const path = localePath(locale);
      return [locale, `${SITE_URL}${path === '/' ? '' : path}`];
    })
  );

  return locales.map((locale) => {
    const path = localePath(locale);
    return {
      url: `${SITE_URL}${path === '/' ? '' : path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: locale === 'es' ? 1 : 0.9,
      alternates: { languages },
    };
  });
}
