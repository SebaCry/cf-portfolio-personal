import { localePath, locales, type Locale } from '../lib/i18n/config';

const LABEL: Record<Locale, string> = { es: 'ES', en: 'EN' };
const FULL_NAME: Record<Locale, string> = { es: 'Español', en: 'English' };

/**
 * Selector de idioma: sólo dos enlaces, sin estado.
 *
 * Usa <a> y no <Link> a propósito. Cada idioma tiene su propio root layout
 * (`app/(es)` y `app/(en)`), y Next hace recarga completa al cruzar de uno a
 * otro; un <Link> daría la falsa impresión de navegación de cliente.
 */
export default function LanguageToggle({
  locale,
  label,
  section,
}: {
  locale: Locale;
  label: string;
  /** Sección visible (la calcula Navbar): al cambiar de idioma se vuelve a ella. */
  section?: string;
}) {
  const hash = section && section !== 'hero' ? `#${section}` : '';

  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex items-center rounded-full border border-neutral/30 bg-neutral/10 p-0.5 text-xs font-semibold"
    >
      {locales.map((code) =>
        code === locale ? (
          <span
            key={code}
            aria-current="true"
            // 44 px de alto en táctil; compacto en la barra de escritorio.
            className="inline-flex min-h-11 items-center rounded-full bg-primary px-2.5 text-on-primary lg:min-h-0 lg:py-1"
          >
            {LABEL[code]}
            <span className="sr-only"> — {FULL_NAME[code]}</span>
          </span>
        ) : (
          <a
            key={code}
            href={`${localePath(code)}${hash}`}
            hrefLang={code}
            className="inline-flex min-h-11 items-center rounded-full px-2.5 text-neutral-variant transition-colors hover:text-foreground lg:min-h-0 lg:py-1"
          >
            {LABEL[code]}
            <span className="sr-only"> — {FULL_NAME[code]}</span>
          </a>
        )
      )}
    </div>
  );
}
