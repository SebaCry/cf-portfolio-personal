import { Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import { buildJsonLd } from '../lib/metadata';
import { htmlLang, type Locale } from '../lib/i18n';
import '../globals.css';

/**
 * Las fuentes se sirven desde el propio dominio vía next/font.
 * Antes llegaban por @import dentro de globals.css, lo que encadenaba
 * CSS -> CSS de Google -> archivos de fuente antes de poder pintar texto.
 */
const display = Bricolage_Grotesque({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const mono = JetBrains_Mono({
  variable: '--font-mono-code',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
});

/**
 * Aplica el tema antes del primer pintado para evitar el destello.
 * Tiene que ser un script bloqueante en <head>: si esperara a React, el
 * usuario vería primero el tema por defecto y luego el suyo.
 */
const themeScript = `
(function(){try{
  var t=localStorage.getItem('theme');
  if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
  if(t==='light'){document.documentElement.classList.add('light');}
}catch(e){}})();
`;

/**
 * Cuerpo del documento compartido por los dos root layouts (`app/(es)` y
 * `app/(en)`). Cada idioma necesita su propio <html lang>, que en Next sólo
 * puede fijarse desde un root layout, de ahí los route groups.
 */
export default function RootDocument({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={htmlLang[locale]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)) }}
        />
        {/* Sin JS no hay IntersectionObserver: el contenido se muestra igual. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.skill-bar{transform:scaleX(var(--level,1))!important}`}</style>
        </noscript>
      </head>
      <body className={`${display.variable} ${mono.variable} antialiased`}>{children}</body>
    </html>
  );
}
