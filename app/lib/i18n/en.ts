import type { Dictionary } from './es';

/**
 * English dictionary. Typed against the Spanish one: a missing or misspelled
 * key fails the build instead of rendering a blank.
 */
export const en: Dictionary = {
  meta: {
    role: 'Full Stack Developer',
    description:
      'Sebastián Pérez, full stack developer based in Ibagué, Colombia. I build fast websites and web apps with Next.js, Astro, Django and WordPress. Portfolio, experience and contact.',
    siteName: 'Sebastián Pérez — Portfolio',
    applicationName: "Sebastián Pérez's Portfolio",
    keywords: [
      'Sebastián Pérez',
      'full stack developer',
      'web developer Colombia',
      'freelance web developer',
      'Next.js',
      'React',
      'Django',
      'Astro',
      'Cloudflare Workers',
      'TypeScript',
      'WordPress maintenance',
      'developer portfolio',
    ],
  },

  nav: {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    projects: 'Projects',
    contact: 'Contact',
    hire: 'Hire me',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    switchLanguage: 'Switch language',
    languageName: 'English',
  },

  hero: {
    sectionLabel: 'Introduction',
    badge: 'Available for projects',
    greeting: "Hi, I'm",
    roleLead: 'Full Stack',
    roleAccent: 'Developer',
    description:
      'I build fast websites and web apps for clients in Colombia and the United States, using Next.js, Astro, PHP, WordPress and Django. From design to deployment, and from deployment to maintenance.',
    ctaProjects: 'View Projects',
    ctaContact: 'Get in touch',
    portraitAlt: (name: string, role: string) => `Portrait of ${name}, ${role.toLowerCase()}`,
    scrollHint: 'Go to the About section',
  },

  about: {
    eyebrow: 'About Me',
    title: 'A passion for building',
    description:
      'I am a full stack developer based in Ibagué, Colombia. I specialise in web products that pair a solid technical foundation with carefully crafted interfaces — and in keeping them healthy long after launch.',
    features: {
      dev: {
        title: 'Development',
        description: 'Clean, scalable and maintainable code built on modern technologies.',
      },
      design: {
        title: 'Design',
        description: 'Modern, intuitive interfaces that users actually enjoy.',
      },
      performance: {
        title: 'Performance',
        description: 'Relentless optimisation for genuinely fast experiences.',
      },
      collaboration: {
        title: 'Collaboration',
        description: 'Effective teamwork backed by clear communication.',
      },
    },
    stats: {
      projects: 'Projects delivered',
      years: 'Years coding',
      languages: 'Programming languages',
      clients: 'Active clients',
    },
  },

  experience: {
    eyebrow: 'Career',
    title: 'Professional Experience',
    description:
      'From the classroom to a development team, and from there to my own clients: where I have worked and what I built at each stage.',
    currentBadge: 'Current',
    items: {
      freelance: {
        role: 'Web Developer',
        period: '2025 — Present',
        duration: 'Ongoing',
        location: 'Remote · Colombia / USA',
        description:
          'Building and maintaining corporate websites for clients in the United States, from structuring the site through to deployment and ongoing support.',
        highlights: [
          'Corporate websites in Astro for Vetro Steel Design Studio and JP Media Groups.',
          'Ongoing maintenance of the Anderson Insurance Group WordPress site.',
          'Performance tuning, technical SEO and deployment on Cloudflare infrastructure.',
        ],
      },
      sinergia: {
        role: 'Junior Developer — Internship',
        period: 'January 2026 — June 2026',
        duration: '6 months',
        location: 'Ibagué, Colombia',
        description:
          'Professional internship within the development team, taking part in the full software lifecycle: requirements analysis, implementation, testing and deployment.',
        // TODO: replace these three bullets with what you actually worked on.
        highlights: [
          'Built backend features and user interfaces across the team’s products.',
          'Worked in an agile setup (Scrum), tracking tasks in Jira and using Git for version control.',
          'Fixed bugs, took part in code reviews with senior developers and wrote technical documentation.',
        ],
      },
    },
  },

  skills: {
    eyebrow: 'Skills',
    title: 'Tech Stack',
    description:
      'The tools I work with day to day to build robust, scalable applications.',
    categories: {
      frontend: 'Frontend',
      backend: 'Backend',
      'data-cloud': 'Database & Cloud',
      tools: 'Tools & Workflow',
    },
    meterLabel: (skill: string) => `${skill} proficiency`,
    footnote: 'Always learning and exploring new technologies',
  },

  projects: {
    eyebrow: 'Portfolio',
    title: 'Featured Projects',
    description:
      'Sites and platforms I have built or currently maintain, for clients in Colombia and the United States.',
    featuredBadge: 'Featured',
    codeLink: 'Source',
    demoLink: 'View demo',
    visitLink: 'Visit site',
    ofProject: (title: string) => `for ${title}`,
    moreOnGithub: 'See more on GitHub',
    videoLabel: (title: string) => `Video demo of ${title}`,
    videoExpand: (title: string) => `Watch the ${title} demo full screen`,
    videoDialog: (title: string) => `${title} demo`,
    close: 'Close',
    items: {
      sieki: {
        subtitle: 'E-commerce and admin dashboard',
        description:
          'E-commerce platform and admin dashboard for Epa Keratinas Ibagué, with payment processing, real-time inventory management and role-based administration.',
        status: null,
      },
      'vetro-steel': {
        subtitle: 'Corporate site · Utah, USA',
        description:
          'Institutional site for a studio that designs and fabricates architectural systems in tempered glass and stainless steel. Split commercial/residential catalogue, technical capabilities section and a quote request form.',
        status: null,
      },
      'jp-media-groups': {
        subtitle: 'Creative agency · Miami, NY, LA & Utah',
        description:
          'Site for an audiovisual agency operating in four US cities. Covers five service lines (production, photography, music videos, brand identity and digital strategy), team profiles and project enquiries.',
        status: null,
      },
      'anderson-insurance': {
        subtitle: 'WordPress maintenance · Utah, USA',
        description:
          'Ongoing maintenance for an independent insurance agency in Salt Lake City: core, theme and plugin updates, content management, performance tuning and technical SEO across dozens of coverage pages.',
        status: 'Under maintenance',
      },
    },
  },

  contact: {
    eyebrow: 'Contact',
    title: "Let's Work Together",
    description:
      'Got a project in mind, or a site that needs looking after? Tell me about it and I will come back with a proposal.',
    infoTitle: 'Contact details',
    labels: {
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
    },
    location: 'Ibagué, Tolima, Colombia',
    whyTitle: 'Why work with me?',
    reasons: [
      'Replies in under 24 hours',
      'Clean, well-documented code',
      'Clear and consistent communication',
      'Support and maintenance after delivery',
    ],
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      message: 'Message',
      messagePlaceholder: 'Tell me about your project...',
      submit: 'Send Message',
      sending: 'Sending',
      success: 'Message sent! I will get back to you shortly.',
      error: 'Something went wrong. Email me directly if it keeps failing.',
    },
  },

  footer: {
    tagline: (role: string, city: string) =>
      `${role} based in ${city}, Colombia. I build and maintain websites and web apps for clients in Colombia and the United States.`,
    navTitle: 'Navigation',
    servicesTitle: 'Services',
    services: [
      { name: 'Custom web development', href: '#contact' },
      { name: 'Corporate websites', href: '#projects' },
      { name: 'WordPress maintenance', href: '#projects' },
      { name: 'APIs and backend', href: '#skills' },
    ],
    madeWithPre: 'Made with',
    madeWithPost: 'and plenty of coffee',
    love: 'love',
    builtWith: 'Built with Next.js and deployed on Cloudflare',
  },
};
