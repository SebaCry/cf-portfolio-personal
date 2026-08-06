/**
 * Diccionario en español. Es la fuente de verdad del tipo `Dictionary`:
 * `en.ts` está tipado contra este archivo, así que si añades una clave aquí
 * y se te olvida en inglés, el build falla en vez de mostrar un hueco.
 */
export const es = {
  meta: {
    role: 'Desarrollador Full Stack',
    description:
      'Sebastián Pérez, desarrollador full stack en Ibagué, Colombia. Construyo sitios y aplicaciones web rápidas con Next.js, Astro, Django y WordPress. Portafolio, experiencia y contacto.',
    siteName: 'Sebastián Pérez — Portafolio',
    applicationName: 'Portafolio de Sebastián Pérez',
    keywords: [
      'Sebastián Pérez',
      'desarrollador full stack',
      'desarrollador web Colombia',
      'desarrollador web Ibagué',
      'Next.js',
      'React',
      'Django',
      'Astro',
      'Cloudflare Workers',
      'TypeScript',
      'mantenimiento WordPress',
      'portafolio desarrollador',
    ],
  },

  nav: {
    home: 'Inicio',
    about: 'Sobre Mí',
    experience: 'Experiencia',
    skills: 'Habilidades',
    projects: 'Proyectos',
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
    badge: 'Disponible para proyectos',
    greeting: 'Hola, soy',
    roleLead: 'Desarrollador',
    roleAccent: 'Full Stack',
    description:
      'Construyo sitios y aplicaciones web rápidas para clientes en Colombia y Estados Unidos, con Next.js, Astro, PHP, WordPress y Django. Del diseño al despliegue, y del despliegue al mantenimiento.',
    ctaProjects: 'Ver Proyectos',
    ctaContact: 'Contáctame',
    portraitAlt: (name: string, role: string) => `Retrato de ${name}, ${role.toLowerCase()}`,
    scrollHint: 'Ir a la sección Sobre mí',
  },

  about: {
    eyebrow: 'Sobre Mí',
    title: 'Pasión por crear',
    description:
      'Soy desarrollador full stack en Ibagué, Colombia. Me especializo en construir productos web que combinan una base técnica sólida con interfaces cuidadas, y en mantenerlos vivos después del lanzamiento.',
    features: {
      dev: {
        title: 'Desarrollo',
        description: 'Código limpio, escalable y mantenible con las últimas tecnologías.',
      },
      design: {
        title: 'Diseño',
        description: 'Interfaces modernas e intuitivas que deleitan a los usuarios.',
      },
      performance: {
        title: 'Performance',
        description: 'Optimización constante para experiencias ultra rápidas.',
      },
      collaboration: {
        title: 'Colaboración',
        description: 'Trabajo en equipo efectivo con comunicación clara.',
      },
    },
    stats: {
      projects: 'Proyectos entregados',
      years: 'Años programando',
      languages: 'Lenguajes de programación',
      clients: 'Clientes activos',
    },
  },

  experience: {
    eyebrow: 'Trayectoria',
    title: 'Experiencia Profesional',
    description:
      'Del aula al equipo de desarrollo y de ahí a clientes propios: dónde he trabajado y qué construí en cada etapa.',
    currentBadge: 'Actualmente',
    items: {
      freelance: {
        role: 'Desarrollador Web',
        period: '2025 — Actualidad',
        duration: 'En curso',
        location: 'Remoto · Colombia / EE. UU.',
        description:
          'Desarrollo y mantenimiento de sitios corporativos para clientes en Estados Unidos, desde el diseño de la estructura hasta el despliegue y el soporte posterior.',
        highlights: [
          'Sitios corporativos en Astro para Vetro Steel Design Studio y JP Media Groups.',
          'Mantenimiento continuo del sitio WordPress de Anderson Insurance Group.',
          'Optimización de rendimiento, SEO técnico y despliegue en infraestructura de Cloudflare.',
        ],
      },
      sinergia: {
        role: 'Desarrollador Junior — Prácticas profesionales',
        period: 'Enero 2026 — Junio 2026',
        duration: '6 meses',
        location: 'Ibagué, Colombia',
        description:
          'Prácticas profesionales dentro del equipo de desarrollo, participando en el ciclo completo de construcción de software: análisis de requerimientos, implementación, pruebas y despliegue.',
        // TODO: personaliza estos tres puntos con lo que realmente hiciste allí.
        highlights: [
          'Desarrollo de funcionalidades en el backend y en las interfaces de usuario de los productos del equipo.',
          'Trabajo bajo metodologías ágiles (Scrum) con seguimiento de tareas en Jira y control de versiones con Git.',
          'Corrección de errores, revisión de código con desarrolladores senior y documentación técnica.',
        ],
      },
    },
  },

  skills: {
    eyebrow: 'Habilidades',
    title: 'Stack Tecnológico',
    description:
      'Las herramientas con las que trabajo a diario para construir aplicaciones robustas y escalables.',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      'data-cloud': 'Base de datos & Cloud',
      tools: 'Herramientas & Workflow',
    },
    meterLabel: (skill: string) => `Nivel de ${skill}`,
    footnote: 'Siempre aprendiendo y explorando nuevas tecnologías',
  },

  projects: {
    eyebrow: 'Portafolio',
    title: 'Proyectos Destacados',
    description:
      'Sitios y plataformas que he construido o que mantengo hoy, para clientes en Colombia y Estados Unidos.',
    featuredBadge: 'Destacado',
    codeLink: 'Código',
    demoLink: 'Ver demo',
    visitLink: 'Visitar sitio',
    ofProject: (title: string) => `de ${title}`,
    moreOnGithub: 'Ver más en GitHub',
    videoLabel: (title: string) => `Demostración en vídeo de ${title}`,
    videoExpand: (title: string) => `Ver la demostración de ${title} en pantalla completa`,
    videoDialog: (title: string) => `Demostración de ${title}`,
    close: 'Cerrar',
    items: {
      sieki: {
        subtitle: 'E-commerce y panel administrativo',
        description:
          'Plataforma de comercio electrónico y panel administrativo para Epa Keratinas Ibagué, con procesamiento de pagos, gestión de inventario en tiempo real y roles de administración.',
        status: null as string | null,
      },
      'vetro-steel': {
        subtitle: 'Sitio corporativo · Utah, EE. UU.',
        description:
          'Sitio institucional para un estudio de diseño y fabricación de sistemas arquitectónicos en vidrio templado y acero inoxidable. Catálogo dividido en línea comercial y residencial, sección de capacidades técnicas y formulario de solicitud de cotización.',
        status: null as string | null,
      },
      'jp-media-groups': {
        subtitle: 'Agencia creativa · Miami, NY, LA & Utah',
        description:
          'Sitio para una agencia audiovisual con presencia en cuatro ciudades de EE. UU. Presenta cinco líneas de servicio (producción, fotografía, videos musicales, identidad de marca y estrategia digital), perfil del equipo y captación de proyectos.',
        status: null as string | null,
      },
      'anderson-insurance': {
        subtitle: 'Mantenimiento WordPress · Utah, EE. UU.',
        description:
          'Mantenimiento continuo del sitio de una agencia de seguros independiente de Salt Lake City: actualizaciones de core, tema y plugins, gestión de contenidos, optimización de rendimiento y SEO técnico sobre una estructura de decenas de páginas de coberturas.',
        status: 'En mantenimiento' as string | null,
      },
    },
  },

  contact: {
    eyebrow: 'Contacto',
    title: 'Trabajemos Juntos',
    description:
      '¿Tienes un proyecto en mente o un sitio que necesita mantenimiento? Cuéntame y te respondo con una propuesta.',
    infoTitle: 'Información de contacto',
    labels: {
      email: 'Email',
      phone: 'Teléfono',
      location: 'Ubicación',
    },
    location: 'Ibagué, Tolima, Colombia',
    whyTitle: '¿Por qué trabajar conmigo?',
    reasons: [
      'Respuesta en menos de 24 horas',
      'Código limpio y bien documentado',
      'Comunicación clara y constante',
      'Soporte y mantenimiento después de la entrega',
    ],
    form: {
      name: 'Nombre',
      namePlaceholder: 'Tu nombre',
      email: 'Email',
      emailPlaceholder: 'tu@email.com',
      message: 'Mensaje',
      messagePlaceholder: 'Cuéntame sobre tu proyecto...',
      submit: 'Enviar Mensaje',
      sending: 'Enviando',
      success: '¡Mensaje enviado! Te responderé lo antes posible.',
      error: 'Hubo un error al enviar. Escríbeme directamente por correo si sigue fallando.',
    },
  },

  footer: {
    tagline: (role: string, city: string) =>
      `${role} en ${city}, Colombia. Construyo y mantengo sitios y aplicaciones web para clientes en Colombia y Estados Unidos.`,
    navTitle: 'Navegación',
    servicesTitle: 'Servicios',
    services: [
      { name: 'Desarrollo web a medida', href: '#contact' },
      { name: 'Sitios corporativos', href: '#projects' },
      { name: 'Mantenimiento WordPress', href: '#projects' },
      { name: 'APIs y backend', href: '#skills' },
    ],
    madeWithPre: 'Hecho con',
    madeWithPost: 'y mucho café',
    love: 'amor',
    builtWith: 'Construido con Next.js y desplegado en Cloudflare',
  },
};

/**
 * El tipo se infiere del diccionario español. Sin `as const`, para que los
 * strings sean `string` y no literales: así el inglés puede tener otro texto
 * pero está obligado a tener exactamente las mismas claves.
 */
export type Dictionary = typeof es;
