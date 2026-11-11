import type { Portfolio } from './schema';

/**
 * Contenido del portafolio: la única fuente de verdad, en los dos idiomas.
 * Sale del JSON de Sebas; aquí no se añade ningún dato que no esté en él.
 *
 * `satisfies Portfolio` hace que `next build` falle si falta o sobra un campo,
 * o si falta una traducción. Lo que los tipos no pueden comprobar (fechas,
 * URLs, ids, textos vacíos) lo validan los asserts de `index.ts`.
 *
 * Fuera a propósito: el segundo teléfono y las referencias (son teléfonos de
 * terceros), y el repo `django-sieki`, que es privado (da 404).
 */
export const portfolio = {
  profile: {
    name: 'Sebastián Pérez',
    role: { es: 'Desarrollador Full-Stack', en: 'Full-Stack Developer' },
    headline: {
      es: 'Desarrollador Full-Stack y fundador de SIEKI, estudio de software con el que diseño, construyo y mantengo aplicaciones web y automatizaciones para negocios locales.',
      en: 'Full-stack developer and founder of SIEKI, a software studio through which I design, build and maintain web applications and automations for local businesses.',
    },
    bio: {
      es: [
        'Construyo productos de principio a fin: APIs serverless sobre Cloudflare Workers, interfaces en React/Next.js y backends en Python/Django.',
        'Tecnólogo en Análisis y Desarrollo de Software con experiencia real en mantenimiento de software empresarial, refactorización de código legacy y migraciones tecnológicas.',
        'Trabajo de forma autónoma, documentada y asíncrona, con un enfoque AI-native: uso agentes de IA en mi flujo diario y verifico su salida con pruebas y revisión de código.',
      ],
      en: [
        'I build products end to end: serverless APIs on Cloudflare Workers, React/Next.js interfaces and Python/Django backends.',
        'Software Analysis and Development technologist with hands-on experience maintaining enterprise software, refactoring legacy code and carrying out technology migrations.',
        'I work autonomously and asynchronously, and I document what I build. My approach is AI-native: I use AI agents in my daily workflow and verify their output with tests and code review.',
      ],
    },
    metaDescription: {
      es: 'Sebastián Pérez, desarrollador full-stack en Ibagué y fundador de SIEKI: APIs en Cloudflare Workers, interfaces en React/Next.js y backends en Python/Django.',
      en: 'Sebastián Pérez, full-stack developer in Ibagué, Colombia, and founder of SIEKI: APIs on Cloudflare Workers, React/Next.js interfaces, Python/Django backends.',
    },
  },

  contact: {
    email: 'jspc513@gmail.com',
    phone: '+57 315 277 3333',
    location: { locality: 'Ibagué', region: 'Tolima', country: 'Colombia', countryCode: 'CO' },
    linkedin: 'https://linkedin.com/in/sebasti%C3%A1n-perez',
    github: 'https://github.com/SebaCry',
  },

  experience: [
    {
      role: { es: 'Fundador y Desarrollador Full-Stack', en: 'Founder & Full-Stack Developer' },
      company: { es: 'SIEKI · Estudio de software', en: 'SIEKI · Software studio' },
      mode: { es: 'Remoto', en: 'Remote' },
      start: '2024',
      end: null,
      technologies: [
        'Hono',
        'TypeScript',
        'Cloudflare Workers',
        'D1',
        'React',
        'Next.js',
        'PostgreSQL',
      ],
    },
    {
      role: { es: 'Desarrollador de Aplicaciones', en: 'Application Developer' },
      company: 'Glam Urban',
      mode: { es: 'Jornada parcial · Remoto', en: 'Part-time · Remote' },
      start: '2026-08',
      end: null,
      url: 'https://glam-urban.com',
    },
    {
      role: {
        es: 'Desarrollador (Prácticas profesionales)',
        en: 'Developer (Professional internship)',
      },
      company: 'Tecnologías Sinergia S.A.S',
      mode: { es: 'Jornada completa', en: 'Full-time' },
      start: '2026-02',
      end: '2026-07',
    },
  ],

  projects: [
    {
      id: 'sebsbot',
      title: 'SEBSBOT',
      description: {
        es: 'Centro de mando para dirigir agentes de IA (Claude Code) en más de 20 proyectos: un cerebro por proyecto que reparte el trabajo en ramas (código, debug, testing…) y aprobaciones desde el celular.',
        en: 'A command center for directing AI agents (Claude Code) across more than 20 projects: one brain per project that splits the work into branches (code, debugging, testing…), with approvals from my phone.',
      },
      technologies: [
        'Node.js',
        'Hono',
        'SQLite',
        'Claude Code',
        'Cloudflare Tunnel + Access',
        'PWA',
      ],
      links: {
        demo: 'https://sebsbot-demo.jspc513.workers.dev',
        video: 'https://sebsbot-demo.jspc513.workers.dev/video.mp4',
      },
    },
    {
      id: 'bunker-capilar-os',
      title: 'Bunker Capilar OS',
      description: {
        es: 'Back-office de una tienda de productos capilares: inventario con movimientos inmutables, punto de venta, turnos de caja e integración con Mercado Libre.',
        en: 'Back office for a hair-care products store: inventory with immutable stock movements, point of sale, cash-register shifts and a Mercado Libre integration.',
      },
      technologies: [
        'Hono',
        'TypeScript',
        'Cloudflare Workers',
        'Queues',
        'R2',
        'PostgreSQL (Neon)',
        'Drizzle',
        'Zod',
      ],
      links: { app: 'https://bunker-api-dev.jspc513.workers.dev/' },
      access: {
        es: 'Acceso por invitación (Cloudflare Access)',
        en: 'Invitation-only access (Cloudflare Access)',
      },
      sameCodeAs: 'epa-keratinas-ibague',
    },
    {
      id: 'epa-keratinas-ibague',
      title: 'EPA Keratinas Ibagué',
      description: {
        es: 'El mismo sistema en modo multiempresa para un salón y distribuidora: punto de venta, servicios con pago a estilistas y caja; reemplaza a Alegra.',
        en: 'The same system in multi-company mode for a salon and distributor: point of sale, services with stylist payouts and cash register. It replaces Alegra.',
      },
      technologies: ['Hono', 'TypeScript', 'Cloudflare Workers', 'PostgreSQL (Neon)', 'Drizzle'],
      links: { app: 'https://epa-api-dev.jspc513.workers.dev/' },
      access: {
        es: 'Acceso por invitación (Cloudflare Access)',
        en: 'Invitation-only access (Cloudflare Access)',
      },
      sameCodeAs: 'bunker-capilar-os',
    },
    {
      id: 'sieki',
      title: 'SIEKI',
      // Sin descripción: el JSON de Sebas no la trae para este proyecto.
      technologies: ['Django', 'React', 'Supabase', 'PostgreSQL'],
      links: { demo: 'https://django-sieki.onrender.com' },
    },
  ],

  // Datos de los README de SEBSMEDIA y de los reels, de la base de SEBSMEDIA
  // (video 4) y del src/guion.json de jp-media-reel. Sebas lo pidió el 2026-11-11.
  video: {
    intro: {
      es: 'Videos verticales hechos con código: las escenas son componentes de React (Remotion), la voz es de IA y cada corte cae en el segundo que marca un archivo de tiempos.',
      en: 'Vertical videos made with code: the scenes are React components (Remotion), the voice is AI, and every cut lands on the second set by a timing file.',
    },
    studio: {
      title: 'SEBSMEDIA',
      description: {
        es: 'Estudio personal para producir Shorts verticales con IA. Cada video recorre un circuito de 11 estaciones: Claude hace el trabajo creativo (tema, investigación con fuentes, guion), los scripts locales hacen la voz y el render, y en cada puerta el video espera mi aprobación. Nada se publica solo.',
        en: 'A personal studio for producing vertical Shorts with AI. Each video runs through a circuit of 11 stations: Claude does the creative work (topic, sourced research, script), local scripts handle the voice and the render, and at every gate the video waits for my approval. Nothing gets published on its own.',
      },
      technologies: ['Node.js', 'Hono', 'SQLite', 'Claude Code', 'Gemini TTS', 'Remotion'],
      access: {
        es: 'Herramienta privada: corre en mi PC y se maneja también desde el celular',
        en: 'Private tool: it runs on my PC and I can also drive it from my phone',
      },
      example: {
        es: 'Cada estación muestra lo que produjo para el video «Isaías 41:10 tiene dos manos, ¿las viste?», del canal Escrito Está.',
        en: 'Each station shows what it produced for the video "Isaías 41:10 tiene dos manos, ¿las viste?" (in Spanish), from the Escrito Está channel.',
      },
      circuit: [
        {
          label: { es: 'Tema', en: 'Topic' },
          detail: {
            es: 'Claude propone el tema, la curiosidad que lo sostiene y por qué le importa a quien lo ve.',
            en: 'Claude proposes the topic, the curiosity behind it and why it matters to the viewer.',
          },
          output: {
            es: 'Te sostengo de la mano: Dios no dice «no vas a tener miedo», dice «te tomo de la mano derecha».',
            en: 'I hold your hand: God doesn\'t say "you won\'t be afraid", he says "I take you by the right hand".',
          },
        },
        {
          label: { es: 'Diseño', en: 'Design' },
          detail: {
            es: 'Elijo el formato (curiosidad, reflexión, historia, versículo…) y uno de diez estilos visuales: cine 3D, sombras, cómic, tinta, vitral…',
            en: 'I pick the format (curiosity, reflection, story, verse…) and one of ten visual styles: 3D cinema, shadows, comic, ink, stained glass…',
          },
          output: {
            es: 'Un versículo · Sombras: siluetas negras contra una luz cálida, tinta y papel',
            en: 'A verse · Shadows: black silhouettes against warm light, ink and paper',
          },
          gate: true,
        },
        {
          label: { es: 'Investigación', en: 'Research' },
          detail: {
            es: 'Claude investiga con búsqueda web, y la verificación marca lo que no se leyó, las citas que no están y las cifras sin respaldo.',
            en: 'Claude researches with web search, and the fact check flags what wasn\'t read, quotes that aren\'t there and unsupported figures.',
          },
          output: {
            es: '10 versículos · 15 datos · Isaías 41:13: «quien te sostiene de tu mano derecha»',
            en: '10 verses · 15 facts · Isaiah 41:13: "who holds you by your right hand"',
          },
          gate: true,
        },
        {
          label: { es: 'Guion', en: 'Script' },
          detail: {
            es: 'Tres ganchos para comparar; otra mirada de Claude les pone nota de 0 a 10 y propone un cuarto, mejorado.',
            en: 'Three hooks to compare; a second Claude pass scores each one from 0 to 10 and proposes a fourth, improved one.',
          },
          output: {
            es: '13 segmentos · gancho elegido: «Lo has leído mil veces: ¿viste las dos manos?»',
            en: '13 segments · chosen hook: "You\'ve read it a thousand times: did you see the two hands?"',
          },
          gate: true,
        },
        {
          label: { es: 'Voz', en: 'Voice' },
          detail: {
            es: 'Gemini TTS, con la voz y el estilo de cada canal: un mp3 por segmento con el tiempo de cada palabra.',
            en: 'Gemini TTS, with each channel\'s voice and style: one mp3 per segment with the timing of every word.',
          },
          output: { es: 'Voz «Charon» · 0:46', en: '"Charon" voice · 0:46' },
          gate: true,
        },
        {
          label: { es: 'Escenas', en: 'Scenes' },
          detail: {
            es: 'Claude escribe la escena en el Remotion del canal, y se revisa con una foto por segmento.',
            en: 'Claude writes the scene in the channel\'s Remotion project, and it gets reviewed with one frame per segment.',
          },
          output: {
            es: '13 fotos · segmento 1: «Noche de tormenta con lluvia: tu mano en silueta sube temblando… y una mano de luz dorada baja desde la derecha»',
            en: '13 frames · segment 1: "A stormy night with rain: your silhouetted hand rises, trembling… and a hand of golden light comes down from the right"',
          },
        },
        {
          label: { es: 'Música', en: 'Music' },
          detail: {
            es: 'Corre en paralelo desde Diseño: una pista de la galería por género (226 de Kevin MacLeod, CC BY) o de la carpeta del canal.',
            en: 'Runs in parallel from Design onwards: a track from the gallery by genre (226 by Kevin MacLeod, CC BY) or from the channel\'s folder.',
          },
          output: 'esperanza.mp3',
          parallel: true,
        },
        {
          label: { es: 'Subtítulos', en: 'Captions' },
          detail: {
            es: 'El tiempo de cada palabra y un .srt; en pantalla van títulos de beat en lugar de subtítulos.',
            en: 'The timing of every word and an .srt file; on screen, beat titles take the place of captions.',
          },
          output: { es: '169 palabras · .srt listo', en: '169 words · .srt ready' },
        },
        {
          label: { es: 'Render', en: 'Render' },
          detail: {
            es: 'Remotion en el PC: 1080 × 1920, con el volumen a −14 LUFS.',
            en: 'Remotion on my PC: 1080 × 1920, with the volume at −14 LUFS.',
          },
          output: { es: '0:47 · 38,7 MB', en: '0:47 · 38.7 MB' },
        },
        {
          label: { es: 'Revisión', en: 'Review' },
          detail: {
            es: 'Chequeos automáticos y el video en el panel. Nada sigue sin mi visto bueno.',
            en: 'Automatic checks and the video in the dashboard. Nothing moves on without my sign-off.',
          },
          output: {
            es: '✓ 1080 × 1920 · ✓ −14 LUFS · ✓ 169 de 169 palabras · ✓ 0 ms de desfase · ✗ dura 0:47 (lo ideal: de 1:00 a 1:40)',
            en: '✓ 1080 × 1920 · ✓ −14 LUFS · ✓ 169 of 169 words · ✓ 0 ms drift · ✗ runs 0:47 (ideal: 1:00 to 1:40)',
          },
          gate: true,
        },
        {
          label: { es: 'Exportar', en: 'Export' },
          detail: {
            es: 'El MP4, título, descripción y hashtags, más un carrusel de Instagram, portadas e historias, listos para subir a mano.',
            en: 'The MP4, title, description and hashtags, plus an Instagram carousel, covers and stories, ready to upload by hand.',
          },
          output: {
            es: '«Isaías 41:10 tiene dos manos, ¿las viste?» · carrusel de 8 y 3 historias',
            en: '"Isaías 41:10 tiene dos manos, ¿las viste?" · an 8-slide carousel and 3 stories',
          },
        },
      ],
      reels: [
        {
          id: 'escrito-esta-isaias',
          title: 'Isaías 41:10 tiene dos manos, ¿las viste?',
          by: 'Escrito Está',
          file: '/reels/escrito-esta-isaias.mp4',
          poster: '/reels/escrito-esta-isaias.webp',
          seconds: 46.8,
          lang: 'es',
        },
        {
          id: 'escrito-esta-sol',
          title: 'El día que el sol obedeció: lo que dice el hebreo de Josué 10',
          by: 'Escrito Está',
          file: '/reels/escrito-esta-sol.mp4',
          poster: '/reels/escrito-esta-sol.webp',
          seconds: 56.6,
          lang: 'es',
        },
        {
          id: 'escrito-esta-pozo',
          title: 'La mujer del pozo: lo que pasó con Jesús al mediodía',
          by: 'Escrito Está',
          file: '/reels/escrito-esta-pozo.mp4',
          poster: '/reels/escrito-esta-pozo.webp',
          seconds: 60,
          lang: 'es',
        },
      ],
    },
    clients: {
      title: { es: 'Reels para marcas', en: 'Reels for brands' },
      description: {
        es: 'Reels verticales para el Instagram de mis clientes, hechos con Remotion: guion, voz de IA, mezcla a −14 LUFS y render a 1080 × 1920, en español y en inglés cuando el cliente lo necesita.',
        en: 'Vertical reels for my clients\' Instagram, made with Remotion: script, AI voice, a mix at −14 LUFS and a 1080 × 1920 render, in Spanish and English when the client needs it.',
      },
      technologies: ['Remotion', 'React', 'TypeScript', 'Gemini TTS', 'faster-whisper', 'Python', 'ffmpeg'],
      example: {
        es: 'Cada paso muestra lo que produjo para el reel de JP Media Groups.',
        en: 'Each step shows what it produced for JP Media Groups\' reel.',
      },
      pipeline: [
        {
          label: { es: 'Concepto', en: 'Concept' },
          detail: {
            es: 'Una idea que el reel pueda demostrar, sacada del sitio del cliente. La apruebo antes de producir nada.',
            en: 'An idea the reel can prove, taken from the client\'s website. I approve it before anything gets made.',
          },
          output: {
            es: '«Un día de rodaje, un mes de contenido»',
            en: '"One shoot day, a month of content"',
          },
          gate: true,
        },
        {
          label: { es: 'Fotos', en: 'Photos' },
          detail: {
            es: 'Si el reel dice que todo salió de un solo día, tiene que ser verdad: un script lee el EXIF de cada foto del cliente.',
            en: 'If the reel says it all came from one day, it has to be true: a script reads the EXIF data of every client photo.',
          },
          output: {
            es: '12 fotos de la misma mañana: 2023-10-21, de 09:32 a 10:21',
            en: '12 photos from the same morning: 2023-10-21, 09:32 to 10:21',
          },
        },
        {
          label: { es: 'Voz', en: 'Voice' },
          detail: {
            es: 'Voz de IA de Gemini, una toma continua por idioma.',
            en: 'An AI voice from Gemini, one continuous take per language.',
          },
          output: { es: 'Gemini «Puck» · español e inglés', en: 'Gemini "Puck" · Spanish and English' },
        },
        {
          label: { es: 'Tiempos', en: 'Timing' },
          detail: {
            es: 'faster-whisper marca cada palabra y un script escribe src/guion.json. De ahí sale cada corte.',
            en: 'faster-whisper timestamps every word and a script writes src/guion.json. Every cut comes from there.',
          },
          output: {
            es: '["¿Cuánto contenido sale de UN día de rodaje?", 0.1, 3.056]',
            en: '["How much content comes out of ONE shoot day?", 0.1, 3.029]',
          },
        },
        {
          label: { es: 'Escenas', en: 'Scenes' },
          detail: {
            es: 'Las escenas son componentes de React: una sola composición, y la prop lang elige textos, voz, mezcla y largo.',
            en: 'The scenes are React components: a single composition, and the lang prop picks the text, voice, mix and length.',
          },
          output: { es: '<Reel lang="es" />', en: '<Reel lang="en" />' },
        },
        {
          label: { es: 'Mezcla', en: 'Mix' },
          detail: {
            es: 'Voz, música, tics y wooshes en una sola pista, con la sonoridad medida.',
            en: 'Voice, music, ticks and whooshes in a single track, with measured loudness.',
          },
          output: { es: '−14 LUFS · pico real −2 dBTP', en: '−14 LUFS · −2 dBTP true peak' },
        },
        {
          label: { es: 'Render', en: 'Render' },
          detail: {
            es: 'Remotion renderiza una versión por idioma.',
            en: 'Remotion renders one version per language.',
          },
          output: {
            es: 'out/dia-de-rodaje-es.mp4 · 1080 × 1920 · 30 fps · 23,7 s',
            en: 'out/dia-de-rodaje-en.mp4 · 1080 × 1920 · 30 fps · 23.2 s',
          },
        },
        {
          label: { es: 'Control de calidad', en: 'Quality check' },
          detail: {
            es: 'Un script revisa formato, sonoridad, pico real, cortes y cuadros antes de entregar.',
            en: 'A script checks format, loudness, true peak, cuts and frames before delivery.',
          },
          output: {
            es: '$ bash scripts/qa.sh out/dia-de-rodaje-es.mp4',
            en: '$ bash scripts/qa.sh out/dia-de-rodaje-en.mp4',
          },
        },
      ],
      featured: {
        title: { es: 'Un día de rodaje, un mes de contenido', en: 'One shoot day, a month of content' },
        by: 'JP Media Groups',
        file: { es: '/reels/jp-media-es.mp4', en: '/reels/jp-media-en.mp4' },
        poster: { es: '/reels/jp-media-es.webp', en: '/reels/jp-media-en.webp' },
        script: {
          es: {
            fps: 30,
            lines: [
              ['¿Cuánto contenido sale de UN día de rodaje?', 0.1, 3.056],
              ['Todas estas fotos son de una sola mañana.', 3.988, 6.383],
              ['Publicando lunes, miércoles y viernes,', 7.01, 9.56],
              ['te alcanzan para cuatro semanas.', 9.56, 11.28],
              ['Doce publicaciones. Ni una repetida.', 12.073, 14.985],
              ['Un día de rodaje. Un mes de contenido.', 15.914, 18.393],
              ['Escríbenos FOTO por mensaje directo.', 19.144, 21.073],
            ],
            keys: [
              { name: 'vuelo', value: 3.206 },
              {
                name: 'posts',
                value: [4.006, 4.726, 5.446, 6.166, 6.886, 7.606, 8.326, 9.046, 9.766, 10.486, 11.206, 11.926],
              },
              { name: 'remate', value: 15.514 },
              { name: 'cierre', value: 18.694 },
            ],
          },
          en: {
            fps: 30,
            lines: [
              ['How much content comes out of ONE shoot day?', 0.1, 3.029],
              ['Every one of these photos was shot in a single morning.', 4.027, 6.933],
              ['Post on Monday, Wednesday and Friday,', 7.49, 9.51],
              ["and you're covered for four full weeks.", 9.85, 11.57],
              ['Twelve posts. Not one repeat.', 12.46, 14.598],
              ['One shoot day. A month of content.', 15.598, 17.84],
              ["Send us a DM, and let's plan yours.", 18.687, 20.59],
            ],
            keys: [
              { name: 'vuelo', value: 3.179 },
              {
                name: 'posts',
                value: [3.979, 4.699, 5.419, 6.139, 6.859, 7.579, 8.299, 9.019, 9.739, 10.459, 11.179, 11.899],
              },
              { name: 'remate', value: 15.198 },
              { name: 'cierre', value: 18.237 },
            ],
          },
        },
      },
      reels: [
        {
          id: 'glam-urban',
          title: { es: 'Antes y después', en: 'Before and after' },
          by: 'Glam Urban',
          file: '/reels/glam-urban.mp4',
          poster: '/reels/glam-urban.webp',
          seconds: 21.5,
          lang: 'es',
        },
        {
          id: 'keratinas-ibague',
          title: { es: 'Reel corporativo', en: 'Brand reel' },
          by: 'Diana Cedano · Keratinas Ibagué',
          file: '/reels/keratinas-ibague.mp4',
          poster: '/reels/keratinas-ibague.webp',
          seconds: 31,
          lang: 'es',
        },
      ],
    },
  },

  websites: [
    {
      name: 'Iglesia Jordán Ibagué',
      url: 'https://iglesiajordanibague.org',
      technologies: ['Next.js', 'Cloudflare Workers'],
    },
    {
      name: 'Vetro Steel Design Studio',
      url: 'https://www.vetrosteelut.com',
      technologies: ['Astro', 'Tailwind CSS'],
    },
    {
      name: 'JP Media Groups',
      url: 'https://www.jpmediagroups.com',
      technologies: ['Astro', 'Tailwind CSS'],
    },
    {
      name: 'American Wireless',
      url: 'https://americanwirelessut.com',
      technologies: ['Astro', 'Tailwind CSS'],
    },
    {
      name: 'Anderson Insurance Group',
      url: 'https://www.anderson.insure',
      technologies: ['WordPress', 'PHP', 'SEO'],
    },
    { name: 'ECC', url: 'https://ecc.edu.co', technologies: ['WordPress', 'SEO'] },
    { name: 'Healthy Xmile', url: 'https://healthyxmile.com', technologies: ['Astro'] },
    { name: 'Ortho Smile', url: 'https://orthodonsmile.com', technologies: ['Astro'] },
    {
      name: 'ROOFCORP',
      url: 'https://roofcorp-mvp.pages.dev',
      technologies: ['Astro', 'Tailwind CSS', 'Cloudflare Pages'],
    },
  ],

  education: [
    {
      title: {
        es: 'Tecnólogo en Análisis y Desarrollo de Software',
        en: 'Technologist in Software Analysis and Development',
      },
      institution: 'Servicio Nacional de Aprendizaje (SENA)',
      start: '2024',
      end: '2026',
    },
    {
      title: { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' },
      institution: 'Corporación Unificada Nacional (CUN)',
      start: '2026',
      end: null,
    },
    {
      title: { es: 'Desarrollo Backend', en: 'Backend Development' },
      institution: { es: 'Academia Platzi', en: 'Platzi' },
      start: '2024',
      end: null,
    },
  ],

  skills: [
    'Python',
    'Django',
    'TypeScript',
    'JavaScript',
    'React',
    'Next.js',
    'Node.js',
    'Hono',
    'PostgreSQL',
    'MySQL',
    'PHP',
    'Laravel',
    'Kotlin',
    'Docker',
    'Cloudflare Workers',
    'n8n',
    { es: 'Agentes de IA', en: 'AI agents' },
    'Git / GitHub',
  ],

  languages: [
    { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
    { name: { es: 'Inglés', en: 'English' }, level: { es: 'Intermedio', en: 'Intermediate' } },
  ],
} satisfies Portfolio;
