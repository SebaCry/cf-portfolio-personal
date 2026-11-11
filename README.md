# Portafolio — Sebastián Pérez

Portafolio personal en Next.js 15 (App Router), desplegado en Cloudflare Workers con
[OpenNext](https://opennext.js.org/cloudflare).

## Desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # build de producción (typecheck + validación del contenido)
npx eslint app       # lint del código fuente
npm run preview      # build de OpenNext + previsualización en el runtime de Workers (:8787)
```

`npm run lint` (eslint sin ruta) también revisa `.open-next/` y `.wrangler/` y saca miles
de falsos errores: usa `npx eslint app`.

## Dónde editar el contenido

**Todo el contenido está en un solo archivo: `app/lib/content/portfolio.ts`**, en los dos
idiomas. Sale del JSON de Sebas y es la única fuente de verdad: no se añade ningún dato que
no esté ahí (nada de cifras inventadas ni porcentajes de habilidades).

| Qué                                                            | Archivo                         |
| -------------------------------------------------------------- | ------------------------------- |
| Perfil, contacto, experiencia, proyectos, sitios web, formación, habilidades e idiomas | `app/lib/content/portfolio.ts` |
| Video con código: SEBSMEDIA, reels, sus pipelines y el guion del reel destacado (clave `video`) | `app/lib/content/portfolio.ts` + `public/reels/` |
| Forma del contenido (tipos)                                    | `app/lib/content/schema.ts`     |
| Validaciones que tumban el build                               | `app/lib/content/index.ts`      |
| Texto de interfaz (menú, botones, etiquetas) en español        | `app/lib/i18n/es.ts`            |
| Texto de interfaz en inglés                                    | `app/lib/i18n/en.ts`            |
| Dominio, retrato/imagen OG y orden de las secciones (`SECTIONS`) | `app/lib/site.ts`             |
| Colores, botones y utilidades propias                          | `app/globals.css`               |

Cómo se edita:

- Un texto traducible es `{ es: '…', en: '…' }`. Los nombres propios que no cambian entre
  idiomas pueden ser un string normal.
- Los periodos son `'2024'` (solo año) o `'2026-02'` (año-mes); `end: null` significa
  "Actualidad". El texto ("Ago 2026 – Actualidad") se genera solo.
- Las URLs van con `https://` y en ASCII: las tildes se codifican (`á` → `%C3%A1`).
- Nunca enlaces un repo privado: da 404 a cualquier visitante.
- Dos proyectos con el mismo código se enlazan con `sameCodeAs` (en los dos sentidos).

Si algo no cuadra, **`npm run build` falla** y lista todos los problemas a la vez:

- Los tipos (`satisfies Portfolio`) detectan campos que faltan o sobran y traducciones
  que faltan.
- Los asserts de `index.ts` detectan periodos mal escritos o al revés, URLs no https o
  con tildes sin codificar, ids repetidos, `sameCodeAs` no recíproco, textos vacíos y
  una `metaDescription` de más de 160 caracteres.

Privacidad: solo se publica el primer teléfono, y no va en el JSON-LD. Las referencias
(teléfonos de terceros) no se publican; la página dice que están disponibles a solicitud.

### Añadir un reel

Los vídeos van en `public/reels/` comprimidos para la web (720 × 1280, ~2-6 MB; Workers
Assets no admite archivos de más de 25 MiB), con un póster webp del mismo nombre:

```bash
ffmpeg -i original.mp4 -vf "scale=720:1280:flags=lanczos,fps=30" -c:v libx264 -preset slow \
  -crf 26 -profile:v high -pix_fmt yuv420p -c:a aac -b:a 96k -ac 2 -movflags +faststart \
  public/reels/<id>.mp4
ffmpeg -ss <segundo> -i original.mp4 -frames:v 1 -vf "scale=432:768:flags=lanczos" \
  -c:v libwebp -quality 72 public/reels/<id>.webp
```

Luego una entrada en `video.studio.reels` o `video.clients.reels` de `portfolio.ts`.
`npm test` falla si el archivo o el póster no existen con esa misma mayúscula. Si un
vídeo se reemplaza, cámbiale el nombre: `/reels/*` se cachea un año como `immutable`.

`SITE_URL` en `app/lib/site.ts` alimenta el canonical, el `sitemap.xml`, el `robots.txt`
y el JSON-LD. Si cambias de dominio, es el único sitio donde hay que tocarlo.

## Despliegue

**Un `git push` NO despliega nada.** El repo no tiene CI: la publicación es manual.

```bash
npx wrangler login   # sólo la primera vez (abre el navegador)
npm run deploy       # build de OpenNext + subida a Cloudflare
```

El sitio queda en <https://sebasperez.cc> (el custom domain está declarado en
`wrangler.jsonc`; wrangler crea el registro DNS en el primer despliegue).

Antes de publicar conviene probarlo en el runtime real, que **no** es lo mismo que
`npm run dev`:

```bash
npm run preview      # levanta el worker en workerd, igual que en producción
```

Muchos fallos de Cloudflare (APIs de Node que no existen, `require` dinámicos, tamaño
del bundle) sólo aparecen ahí.

### Trampas que ya costaron un despliegue roto

1. **No uses `--turbopack` en el script `build`.** Turbopack genera chunks que se cargan
   con `require()` dinámico y el runtime de Workers no lo permite: el worker compila sin
   quejarse y luego devuelve **500 en todas las rutas**. En `dev` sí puede usarse.
2. **Las cabeceras de caché van en `public/_headers`, no en `next.config.ts`.** En
   Cloudflare los ficheros estáticos los sirve el binding `ASSETS`, que responde antes de
   llegar al worker de Next, así que `headers()` nunca se ejecuta para esas rutas.
3. **Los scripts usan `wrangler deploy` / `wrangler dev`, no `opennextjs-cloudflare
   deploy` / `preview`.** En Windows esos dos comandos de OpenNext fallan con
   `ERR_UNSUPPORTED_ESM_URL_SCHEME`: pasan una ruta `c:\...` a un `import()` dinámico,
   que en ESM exige formato `file://`. Llamar a wrangler directamente es equivalente
   mientras `open-next.config.ts` no configure caché incremental.
4. **Nada de `fs` ni APIs exclusivas de Node** en módulos que acaban en el Worker
   (incluido `app/lib/content/`): `fs` no existe en workerd.
5. **Sin `next/image`.** En Workers, sin un binding de imágenes, `/_next/image` devuelve el
   archivo original sin redimensionar (en preview, el PNG de 154 KB para un avatar de
   56 px). Las imágenes van como webp ya a su tamaño en `public/` con `<img>`. Si algún
   día se usa `next/image`, hay que mirar en `npm run preview` cuánto pesa lo que sirve.
6. **Los vídeos de `/reels/*` pasan por `worker/index.mjs`.** El binding `ASSETS` ignora
   la cabecera `Range` y siempre contesta 200 con el archivo entero, y Safari (iPhone y
   Mac) no reproduce un vídeo así. Por eso `wrangler.jsonc` apunta `main` a
   `worker/index.mjs`, que envuelve `.open-next/worker.js` y, solo para `/reels/*`
   (`assets.run_worker_first`), contesta 206 con el trozo pedido. Lo comprueba
   `tests/range.test.mjs`; en `npm run preview`:
   `curl -H "Range: bytes=0-1" -I localhost:8787/reels/glam-urban.mp4` debe dar 206.
   La demo de SEBSBOT (`sebsbot-demo…workers.dev/video.mp4`) tiene el mismo problema y
   vive en otro worker.

### www

`wrangler.jsonc` sólo declara el dominio raíz. Si quieres que `www.sebasperez.cc` funcione,
crea una **Redirect Rule** 301 hacia `sebasperez.cc` en el panel de Cloudflare (Rules >
Redirect Rules). Añadirlo como segundo custom domain haría que dos URLs sirvieran el
mismo contenido.

## Idiomas (i18n)

| URL    | Idioma   | Ruta en el repo        |
| ------ | -------- | ---------------------- |
| `/`    | Español  | `app/(es)/page.tsx`    |
| `/en`  | Inglés   | `app/(en)/en/page.tsx` |

Son URLs reales, no un interruptor de cliente: cada idioma tiene su `<html lang>`, su
`<title>`, su canonical y su JSON-LD, y ambos declaran el mismo bloque de `hreflang`.

- **Dos root layouts** vía route groups (`app/(es)` y `app/(en)`). Next sólo permite fijar
  `<html lang>` desde un root layout. No existe `app/layout.tsx`; el documento compartido
  (fuentes, script de tema, JSON-LD) está en `app/components/RootDocument.tsx`.
- **`es.ts` es la fuente de verdad del tipo `Dictionary`.** Si añades una clave en español
  y se te olvida en inglés, el build falla.
- **El contenido y los diccionarios no llegan al navegador.** Todo se resuelve en
  componentes de servidor; los componentes de cliente reciben sólo strings.
- **`app/lib/i18n/config.ts` y `app/lib/site.ts` no importan contenido** a propósito: los
  importan componentes de cliente.

Para añadir un idioma: crea `app/lib/i18n/fr.ts` tipado como `Dictionary`, añádelo a
`locales` y `dictionaries`, traduce cada `{ es, en }` de `portfolio.ts` (el build falla
hasta que lo hagas) y crea `app/(fr)/fr/page.tsx` con su layout.

## Decisiones de diseño y rendimiento

Deliberadas; conviene no revertirlas sin medir. Salen del análisis del 2026-11-11 (cuatro
revisiones: estrategia UX, dirección de arte, interacción y la mirada de quien visita).

- **La página les habla a empleadores.** Primero el trabajo: Hero → Proyectos → Video →
  Sitios web → Perfil (sobre mí, experiencia, formación, habilidades e idiomas juntos) →
  Contacto. El `h1` es el posicionamiento (`profile.tagline`, elegido por Sebas) y al lado
  van tres pruebas (`highlights`) que llevan a su proyecto. Pasó de ~11 a ~7 pantallas en
  escritorio.
- **Un solo acento verde** (lo eligió Sebas) sobre grafito con un toque de verde; nada más
  lleva color. Las puertas que esperan aprobación van con contorno y un punto que parpadea;
  lo aprobado, en verde sólido con ✓ (`primary` y `approved` son tokens aparte, hoy con el
  mismo verde). Contraste AA en los dos temas; `npm test` recalcula los ratios desde
  `globals.css`.
- **Dos moldes de sección** (`Section` en `ui.tsx`): `stage` (título grande y angosto arriba)
  y `aside` (título a la izquierda, tipo CV), con bandas que alternan fondo (`raised`). Las
  tarjetas usan `bg-surface`, que se invierte dentro de una banda.
- **Titulares angostos con la misma fuente**: Bricolage Grotesque variable con su eje
  `wdth` (clase `.display`); ninguna familia nueva.
- **Sin librería de animación ni revelados al hacer scroll.** Solo se mueve lo que tiene
  sentido o responde a una acción: la entrada del Hero y su sello «Aprobado» (`@keyframes`,
  una vez), la barra de progreso de lectura (CSS `animation-timeline`, sin JS), las tarjetas
  al pasar el ratón y los pipelines (`Pipeline.tsx`). Los pipelines solo avanzan en
  pantalla, tienen botón de pausa, no cambian de alto (cero CLS) y con
  `prefers-reduced-motion` no arrancan.
- **Video por capas**: los reels a la vista y el proceso (pipelines y «Del código al
  video») plegado en `<details>` nativos, sin JS.
- **Componentes de servidor por defecto.** Sólo declaran `'use client'` `Navbar`,
  `ThemeToggle`, `ProjectVideo`, `ContactForm`, `VideoDialog`, `Pipeline`, `ScriptSync`
  y `ReelCard`. `LanguageToggle` no lo declara, pero llega al cliente porque lo importa
  `Navbar`.
- **Reels: solo el póster hasta que hay intención.** Las tarjetas cargan un webp de
  ~10-30 KB (`loading="lazy"`); el vídeo se monta al pasar el ratón (mudo) o al hacer
  clic (modal con sonido). El reel destacado arranca mudo en escritorio al entrar en
  pantalla y se pausa al salir; en móvil, con ahorro de datos o con «reducir movimiento»
  espera al play. Lo mismo la demo de SEBSBOT, que además tiene botón de pausa y muestra
  un cuadro del propio vídeo como póster.
- **`content-visibility: auto`** en las secciones (`.section-defer`). Crea un bloque
  contenedor para `position: fixed`, por eso el modal del vídeo va en un portal a `<body>`.
- **Vídeo de demo de SEBSBOT** remoto: no se descarga hasta que la tarjeta se acerca al
  viewport, y en móvil o con ahorro de datos sólo al pulsar play.
- **Menú móvil accesible**: al abrirlo, `main` y `footer` quedan `inert`, el foco va al
  primer enlace y Escape lo devuelve al botón.
- **Fuentes vía `next/font`**, servidas desde el propio dominio.
- **`public/_headers`** marca `/_next/static/*` e `/images/*` como `immutable` durante un
  año.
- **Tema sin destello**: un script bloqueante en `<head>` (`RootDocument.tsx`) aplica la
  clase `light` antes del primer pintado.

## Pendiente

- La imagen de Open Graph es la foto de perfil (400×400). Para una tarjeta social más
  vistosa, añadir `public/og.png` de 1200×630, apuntar `OG_IMAGE` en `app/lib/site.ts` a
  ese archivo y cambiar `twitter.card` a `summary_large_image` en `app/lib/metadata.ts`.
