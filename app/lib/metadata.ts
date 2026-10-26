import type { Metadata } from 'next';
import { content, tr } from './content';
import {
  getDictionary,
  hreflangAlternates,
  htmlLang,
  localePath,
  ogLocale,
  type Locale,
} from './i18n';
import { OG_IMAGE, SITE_URL } from './site';

const { profile, contact } = content;

/**
 * Metadata equivalente para cada idioma. Ambas versiones declaran el mismo
 * bloque de `hreflang`, que es lo que Google necesita para entender que son
 * traducciones de la misma página y no contenido duplicado.
 */
export function buildMetadata(locale: Locale): Metadata {
  const dict = getDictionary(locale);
  const path = localePath(locale);
  const title = `${profile.name} — ${profile.role[locale]}`;
  const description = profile.metaDescription[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${profile.name}`,
    },
    description,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    publisher: profile.name,
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
      description,
      images: [{ ...OG_IMAGE, alt: title }],
    },
    twitter: {
      // 'summary' encaja con la foto cuadrada de 400x400. Si algún día pones
      // una tarjeta de 1200x630, cambia a 'summary_large_image'.
      card: 'summary',
      title,
      description,
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

/** JSON-LD de la persona. Sin teléfono a propósito: solo se muestra en la página. */
export function buildJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  const path = localePath(locale);
  const pageUrl = `${SITE_URL}${path === '/' ? '/' : path}`;
  const lang = htmlLang[locale];

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        // El @id es el mismo en ambos idiomas a propósito: es la misma persona,
        // no dos entidades distintas.
        '@id': `${SITE_URL}/#person`,
        name: profile.name,
        url: SITE_URL,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        jobTitle: profile.role[locale],
        description: profile.metaDescription[locale],
        email: `mailto:${contact.email}`,
        address: {
          '@type': 'PostalAddress',
          addressLocality: contact.location.locality,
          addressRegion: contact.location.region,
          addressCountry: contact.location.countryCode,
        },
        sameAs: [contact.github, contact.linkedin],
        knowsAbout: content.skills.map((skill) => tr(skill, locale)),
        knowsLanguage: ['es', 'en'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: dict.meta.siteName,
        description: profile.metaDescription[locale],
        inLanguage: lang,
        publisher: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#profilepage`,
        url: pageUrl,
        name: `${profile.name} — ${profile.role[locale]}`,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        inLanguage: lang,
      },
    ],
  };
}
