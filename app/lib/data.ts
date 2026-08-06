/**
 * Estructura del portafolio: lo que NO cambia entre idiomas.
 * Los textos traducibles (subtítulos, descripciones, periodos) viven en
 * `app/lib/i18n/es.ts` y `app/lib/i18n/en.ts`, enlazados por `id`.
 */

export type Accent = 'primary' | 'secondary' | 'tertiary';

export type Project = {
  /** Enlaza con `projects.items[id]` del diccionario. */
  id: 'sieki' | 'vetro-steel' | 'jp-media-groups' | 'anderson-insurance';
  /** Nombre propio: igual en todos los idiomas. */
  title: string;
  technologies: string[];
  /** Dominio que se muestra en la barra del navegador de la tarjeta. */
  domain?: string;
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  featured?: boolean;
  accent: Accent;
};

export const projects: Project[] = [
  {
    id: 'sieki',
    title: 'SIEKI',
    technologies: ['Django', 'React', 'Supabase', 'PostgreSQL'],
    videoUrl: '/assets/sieki-demo.mp4',
    githubUrl: 'https://github.com/SebaCry/django-sieki',
    demoUrl: 'https://django-sieki.onrender.com',
    domain: 'django-sieki.onrender.com',
    featured: true,
    accent: 'primary',
  },
  {
    id: 'vetro-steel',
    title: 'Vetro Steel Design Studio',
    technologies: ['Astro', 'TypeScript', 'Tailwind CSS'],
    demoUrl: 'https://www.vetrosteelut.com/',
    domain: 'vetrosteelut.com',
    accent: 'secondary',
  },
  {
    id: 'jp-media-groups',
    title: 'JP Media Groups',
    technologies: ['Astro', 'TypeScript', 'Tailwind CSS'],
    demoUrl: 'https://www.jpmediagroups.com/',
    domain: 'jpmediagroups.com',
    accent: 'tertiary',
  },
  {
    id: 'anderson-insurance',
    title: 'Anderson Insurance Group',
    technologies: ['WordPress', 'PHP', 'SEO'],
    demoUrl: 'https://www.anderson.insure/',
    domain: 'anderson.insure',
    accent: 'primary',
  },
];

export type Experience = {
  /** Enlaza con `experience.items[id]` del diccionario. */
  id: 'freelance' | 'sinergia';
  /** Nombre propio de la empresa: igual en todos los idiomas. */
  company: string;
  technologies: string[];
  current?: boolean;
};

export const experiences: Experience[] = [
  {
    id: 'freelance',
    company: 'Freelance',
    technologies: ['Astro', 'WordPress', 'TypeScript', 'Tailwind CSS', 'Cloudflare'],
    current: true,
  },
  {
    id: 'sinergia',
    company: 'Tecnologías Sinergia SAS',
    technologies: ['Python', 'Django', 'JavaScript', 'PostgreSQL', 'Git', 'Scrum'],
  },
];

export type SkillCategory = {
  /** Enlaza con `skills.categories[id]` del diccionario. */
  id: 'frontend' | 'backend' | 'data-cloud' | 'tools';
  accent: Accent;
  icon: 'globe' | 'terminal' | 'database' | 'layers';
  /** Los nombres de las tecnologías no se traducen. */
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    accent: 'primary',
    icon: 'globe',
    skills: [
      { name: 'React', level: 80 },
      { name: 'Next.js', level: 80 },
      { name: 'TypeScript', level: 90 },
      { name: 'Astro', level: 85 },
      { name: 'Tailwind CSS', level: 85 },
    ],
  },
  {
    id: 'backend',
    accent: 'secondary',
    icon: 'terminal',
    skills: [
      { name: 'Django', level: 95 },
      { name: 'FastAPI', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'Python', level: 90 },
      { name: 'PHP', level: 75 },
    ],
  },
  {
    id: 'data-cloud',
    accent: 'tertiary',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 85 },
      { name: 'Supabase', level: 92 },
      { name: 'Cloudflare', level: 80 },
      { name: 'AWS', level: 75 },
    ],
  },
  {
    id: 'tools',
    accent: 'secondary',
    icon: 'layers',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 80 },
      { name: 'WordPress', level: 82 },
      { name: 'CI/CD', level: 82 },
      { name: 'Jira', level: 85 },
      { name: 'Scrum', level: 88 },
    ],
  },
];

/**
 * Clases de Tailwind por acento.
 * Ojo: Tailwind no puede generar clases construidas en tiempo de ejecución
 * (`bg-${color}/20` no existe en el CSS final), por eso van escritas completas.
 */
export const ACCENT = {
  primary: {
    text: 'text-primary',
    bg: 'bg-primary/10',
    bgStrong: 'bg-primary/20',
    border: 'border-primary/30',
    borderSoft: 'border-primary/20',
    hoverBorder: 'hover:border-primary/40',
    bar: 'bg-primary',
  },
  secondary: {
    text: 'text-secondary',
    bg: 'bg-secondary/10',
    bgStrong: 'bg-secondary/20',
    border: 'border-secondary/30',
    borderSoft: 'border-secondary/20',
    hoverBorder: 'hover:border-secondary/40',
    bar: 'bg-secondary',
  },
  tertiary: {
    text: 'text-tertiary',
    bg: 'bg-tertiary/10',
    bgStrong: 'bg-tertiary/20',
    border: 'border-tertiary/30',
    borderSoft: 'border-tertiary/20',
    hoverBorder: 'hover:border-tertiary/40',
    bar: 'bg-tertiary',
  },
} as const;

export type Tone = (typeof ACCENT)[Accent];
