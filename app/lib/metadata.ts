import type { Metadata } from 'next';
import {
  getDictionary,
  hreflangAlternates,
  localePath,
  ogLocale,
  type Locale,
} from './i18n';
import { AUTHOR, KNOWS_ABOUT, OG_IMAGE, SITE_URL, SOCIAL_PROFILES } from './site';

/**
 * Metadata equivalente para cada idioma. Ambas versiones declaran el mismo
 * bloque de `hreflang`, que es lo que Google necesita para entender que son
 * traducciones de la misma página y no contenido duplicado.
 */
export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const path = localePath(locale);
  const title = `${AUTHOR.name} — ${dict.meta.role}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${AUTHOR.name}`,
    },
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    authors: [{ name: AUTHOR.name, url: SITE_URL }],
    creator: AUTHOR.name,
    publisher: AUTHOR.name,
    applicationName: dict.meta.applicationName,
    category: 'technology',
    alternates: {
      canonical: path,
      languages: hreflangAlternates,
    },
    openGraph: {
      type: 'website',
      locale: ogLocale[locale],
      url: `${SITE_URL}${path === '/' ? '' : path}`,
      siteName: dict.meta.siteName,
      title,
      description: dict.meta.description,
      images: [{ ...OG_IMAGE, alt: title }],
    },
    twitter: {
      // 'summary' encaja con la foto cuadrada de 400x400. Si algún día pones
      // una tarjeta de 1200x630, cambia a 'summary_large_image'.
      card: 'summary',
      title,
      description: dict.meta.description,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    formatDetection: {
      telephone: true,
      email: true,
      address: false,
    },
  };
}

export function buildJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  const path = localePath(locale);
  const pageUrl = `${SITE_URL}${path === '/' ? '/' : path}`;
  const lang = locale === 'es' ? 'es-CO' : 'en';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        // El @id es el mismo en ambos idiomas a propósito: es la misma persona,
        // no dos entidades distintas.
        '@id': `${SITE_URL}/#person`,
        name: AUTHOR.name,
        url: SITE_URL,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        jobTitle: dict.meta.role,
        description: dict.meta.description,
        email: `mailto:${AUTHOR.email}`,
        telephone: AUTHOR.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: AUTHOR.locality,
          addressRegion: AUTHOR.region,
          addressCountry: AUTHOR.country,
        },
        sameAs: SOCIAL_PROFILES,
        knowsAbout: KNOWS_ABOUT,
        knowsLanguage: ['es', 'en'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: dict.meta.siteName,
        description: dict.meta.description,
        inLanguage: lang,
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#profilepage`,
        url: pageUrl,
        name: `${AUTHOR.name} — ${dict.meta.role}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        inLanguage: lang,
      },
    ],
  };
}
