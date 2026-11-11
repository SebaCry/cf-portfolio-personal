/**
 * Diccionario en español: SOLO texto de interfaz (menú, etiquetas, botones).
 * El contenido del portafolio está en `app/lib/content/portfolio.ts`.
 *
 * Es la fuente de verdad del tipo `Dictionary`: `en.ts` está tipado contra
 * este archivo, así que si añades una clave aquí y se te olvida en inglés,
 * el build falla en vez de mostrar un hueco.
 */
export const es = {
  meta: {
    siteName: 'Sebastián Pérez — Portafolio',
    applicationName: 'Portafolio de Sebastián Pérez',
  },

  nav: {
    home: 'Inicio',
    about: 'Sobre mí',
    experience: 'Experiencia',
    projects: 'Proyectos',
    video: 'Video',
    websites: 'Sitios web',
    skills: 'Habilidades',
    education: 'Formación',
    contact: 'Contacto',
    hire: 'Contrátame',
    mainNav: 'Navegación principal',
    mobileNav: 'Navegación móvil',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    toLight: 'Cambiar a modo claro',
    toDark: 'Cambiar a modo oscuro',
    switchLanguage: 'Cambiar idioma',
    languageName: 'Español',
  },

  hero: {
    sectionLabel: 'Presentación',
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Contactar',
    portraitAlt: (name: string) => `Retrato de ${name}`,
  },

  period: {
    present: 'Actualidad',
  },

  experience: {
    site: 'Sitio web',
  },

  projects: {
    demoLink: 'Ver demo',
    appLink: 'Abrir aplicación',
    ofProject: (title: string) => `de ${title}`,
    sharedTitle: 'Dos productos, un mismo código multiempresa',
    sameCodeAs: (title: string) => `Mismo código que ${title}`,
    moreOnGithub: 'Más código en GitHub',
    videoLabel: (title: string) => `Demostración en vídeo de ${title}`,
    videoExpand: (title: string) => `Ver la demostración de ${title} en pantalla completa`,
    videoDialog: (title: string) => `Demostración de ${title}`,
    close: 'Cerrar',
  },

  video: {
    title: 'Video con código',
    circuit: 'El circuito, paso a paso',
    pipeline: 'Cómo se hace un reel',
    codeToVideo: 'Del código al video',
    codeHint: 'El video lee este archivo. Toca una línea para saltar a ese momento.',
    frame: 'cuadro',
    gate: 'Puerta',
    waiting: 'Espera mi aprobación',
    approved: 'Aprobado',
    auto: 'Sigue sola',
    parallel: 'En paralelo',
    output: 'Salida',
    pause: 'Pausar la animación',
    play: 'Reproducir la animación',
    watch: (title: string) => `Ver el reel «${title}»`,
    reelVideo: (title: string) => `Reel «${title}»`,
    langName: { es: 'en español', en: 'en inglés' },
    close: 'Cerrar',
  },

  websites: {
    stack: 'Tecnologías',
  },

  skills: {
    technical: 'Técnicas',
    languages: 'Idiomas',
  },

  contact: {
    description:
      '¿Tienes una vacante o un proyecto? Escríbeme por correo, por teléfono o con el formulario.',
    labels: {
      email: 'Email',
      phone: 'Teléfono',
      location: 'Ubicación',
    },
    references: 'Referencias disponibles a solicitud.',
    form: {
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Email',
      emailPlaceholder: 'tu@email.com',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntame sobre la vacante o el proyecto…',
      submit: 'Enviar mensaje',
      sending: 'Enviando',
      success: 'Mensaje enviado. Te responderé por correo.',
      error: 'No se pudo enviar el mensaje. Escríbeme directamente a mi correo.',
    },
  },

  footer: {
    navTitle: 'Secciones',
    builtWith: 'Hecho con Next.js y desplegado en Cloudflare Workers.',
  },
};

/**
 * El tipo se infiere del diccionario español. Sin `as const`, para que los
 * strings sean `string` y no literales: así el inglés puede tener otro texto
 * pero está obligado a tener exactamente las mismas claves.
 */
export type Dictionary = typeof es;
