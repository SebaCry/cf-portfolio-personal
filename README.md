# Portafolio — Sebastián Pérez

Portafolio personal en Next.js 15 (App Router), desplegado en Cloudflare Workers con
[OpenNext](https://opennext.js.org/cloudflare).

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción
npm run lint
npm run preview      # build de OpenNext + previsualización en el runtime de Workers
npm run deploy       # despliegue a Cloudflare
```

## Dónde editar el contenido

Casi todo el contenido está separado de los componentes:

| Qué                                                     | Archivo                        |
| ------------------------------------------------------- | ------------------------------ |
| Dominio, nombre, correo, redes                           | `app/lib/site.ts`              |
| **Todos los textos en español**                          | `app/lib/i18n/es.ts`           |
| **Todos los textos en inglés**                           | `app/lib/i18n/en.ts`           |
| Estructura de proyectos, experiencia y skills (sin texto) | `app/lib/data.ts`             |
| Iconos de tecnologías                                    | `app/components/TechIcons.tsx` |
| Colores, animaciones, utilidades propias                 | `app/globals.css`              |

`SITE_URL` en `app/lib/site.ts` alimenta el canonical, el `sitemap.xml`, el `robots.txt`
y el JSON-LD. Si cambias de dominio, es el único sitio donde hay que tocarlo.

## Idiomas (i18n)

| URL    | Idioma   | Ruta en el repo    |
| ------ | -------- | ------------------ |
| `/`    | Español  | `app/(es)/page.tsx`    |
| `/en`  | Inglés   | `app/(en)/en/page.tsx` |

Son URLs reales, no un interruptor de cliente: cada idioma tiene su `<html lang>`, su
`<title>`, su canonical y su JSON-LD, y ambos declaran el mismo bloque de `hreflang`.
Un toggle puramente en cliente haría que Google indexara un solo idioma.

Cómo está montado y qué conviene no romper:

- **Dos root layouts** vía route groups (`app/(es)` y `app/(en)`). Next sólo permite fijar
  `<html lang>` desde un root layout, y hacen falta dos valores distintos. No existe
  `app/layout.tsx`; el documento compartido está en `app/components/RootDocument.tsx`.
- **`es.ts` es la fuente de verdad del tipo.** `en.ts` está declarado como `Dictionary`,
  así que si añades una clave en español y se te olvida en inglés, **el build falla** en
  lugar de renderizar un hueco.
- **El diccionario no llega al navegador.** Todo se resuelve en componentes de servidor;
  los chunks de cliente no contienen ni un texto de `es.ts`/`en.ts`.
- **Los componentes de cliente reciben sólo strings**, nunca el diccionario entero: éste
  contiene funciones (`videoLabel(title)`, `tagline(...)`) y las funciones no cruzan la
  frontera RSC. Por eso `Navbar` recibe `t={dict.nav}` y `ProjectVideo` recibe etiquetas
  ya resueltas.
- **`app/lib/i18n/config.ts` no importa los diccionarios** a propósito: es lo que importan
  los componentes de cliente para no arrastrar los dos idiomas al bundle.

Para añadir un idioma: crea `app/lib/i18n/fr.ts` tipado como `Dictionary`, añádelo a
`locales` y `dictionaries`, y crea `app/(fr)/fr/page.tsx` con su layout.

## Decisiones de rendimiento

Estas son deliberadas; conviene no revertirlas sin medir:

- **Sin librería de animación.** Las entradas del Hero son `@keyframes` de CSS y las
  revelaciones al hacer scroll usan `app/components/Reveal.tsx`, que comparte un único
  `IntersectionObserver` entre todas las instancias. Antes cada sección era un componente
  cliente con `framer-motion` y el contenido nacía en `opacity: 0`, así que no se veía
  nada hasta que hidrataba React.
- **Componentes de servidor por defecto.** Sólo son `'use client'` los que realmente
  necesitan estado: `Navbar`, `ThemeToggle`, `Reveal`, `ProjectVideo` y `ContactForm`.
- **`content-visibility: auto`** en las secciones (`.section-defer`): el navegador no
  calcula layout ni pinta lo que está fuera de pantalla.
- **Orbes decorativos**: se anima sólo `transform` con `will-change`, para que la capa
  desenfocada se rasterice una vez y no en cada frame.
- **Barras de habilidades**: se anima `transform: scaleX()`, no `width` (que fuerza
  recálculo de layout en cada frame).
- **Vídeo de demo**: no se descarga hasta que la tarjeta se acerca al viewport, y en
  móvil o con ahorro de datos sólo al pulsar play.
- **Fuentes vía `next/font`**, servidas desde el propio dominio. El `@import` de Google
  Fonts encadenaba CSS → CSS → fuentes antes de poder pintar texto.
- **Tema sin destello**: un script bloqueante en `<head>` (`app/layout.tsx`) aplica la
  clase `light` antes del primer pintado.

## Pendiente

- `public/assets/sieki-demo.mp4` pesa ~11 MB. Comprimirlo mejora bastante la sección de
  proyectos:

  ```bash
  ffmpeg -i public/assets/sieki-demo.mp4 -vf "scale=1280:-2" \
    -c:v libx264 -crf 28 -preset slow -an -movflags +faststart \
    public/assets/sieki-demo.min.mp4
  ```

  Después, actualizar `videoUrl` en `app/lib/data.ts`.

- La imagen de Open Graph es la foto de perfil (400×400). Para una tarjeta social más
  vistosa, añadir `public/og.png` de 1200×630 y apuntar `OG_IMAGE` en `app/layout.tsx`
  a ese archivo, cambiando `twitter.card` a `summary_large_image`.
