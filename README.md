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

| Qué                                              | Archivo                     |
| ------------------------------------------------ | --------------------------- |
| Dominio, nombre, correo, redes, descripción SEO   | `app/lib/site.ts`           |
| Proyectos, experiencia laboral, habilidades       | `app/lib/data.ts`           |
| Iconos de tecnologías                             | `app/components/TechIcons.tsx` |
| Colores, animaciones, utilidades propias          | `app/globals.css`           |

`SITE_URL` en `app/lib/site.ts` alimenta el canonical, el `sitemap.xml`, el `robots.txt`
y el JSON-LD. Si cambias de dominio, es el único sitio donde hay que tocarlo.

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
