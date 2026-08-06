/**
 * Configuración de idiomas SIN importar los diccionarios.
 *
 * Los componentes de cliente (Navbar, LanguageToggle) importan de aquí: si
 * importaran de `index.ts` arrastrarían `es.ts` y `en.ts` enteros al bundle
 * del navegador, duplicando todo el texto del sitio.
 */

export type Locale = 'es' | 'en';

export const locales: Locale[] = ['es', 'en'];

/** El español no lleva prefijo: vive en `/`, la URL que ya estaba indexada. */
export const defaultLocale: Locale = 'es';

/** Ruta raíz de cada idioma. */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}`;
}

/** Valor del atributo `lang` de <html>. */
export const htmlLang: Record<Locale, string> = {
  es: 'es-CO',
  en: 'en',
};

/** Valor de `og:locale`. */
export const ogLocale: Record<Locale, string> = {
  es: 'es_CO',
  en: 'en_US',
};

/**
 * Mapa hreflang que se emite en todas las páginas.
 * `x-default` apunta al español, que es la versión por defecto.
 */
export const hreflangAlternates: Record<string, string> = {
  'es-CO': '/',
  en: '/en',
  'x-default': '/',
};
