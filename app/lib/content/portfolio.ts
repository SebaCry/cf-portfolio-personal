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
      description: {
        es: 'Primer sistema de EPA Keratinas Ibagué, desarrollado en SIEKI: aplicación web con backend en Django, interfaz en React y base de datos en Supabase.',
        en: 'The first system built for EPA Keratinas Ibagué at SIEKI: a web app with a Django backend, a React front end and a Supabase database.',
      },
      technologies: ['Django', 'React', 'Supabase', 'PostgreSQL'],
      links: { demo: 'https://django-sieki.onrender.com' },
    },
  ],

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
