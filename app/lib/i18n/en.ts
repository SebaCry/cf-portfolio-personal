import type { Dictionary } from './es';

/** English UI text. Typed against `es.ts`: a missing key fails the build. */
export const en: Dictionary = {
  meta: {
    siteName: 'Sebastián Pérez — Portfolio',
    applicationName: 'Sebastián Pérez Portfolio',
  },

  nav: {
    home: 'Home',
    projects: 'Projects',
    video: 'Video',
    websites: 'Websites',
    profile: 'Profile',
    contact: 'Contact',
    hire: 'Hire me',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    lightMode: 'Light mode',
    switchLanguage: 'Change language',
    languageName: 'English',
  },

  hero: {
    sectionLabel: 'Introduction',
    ctaProjects: 'View projects',
    portraitAlt: (name: string) => `Portrait of ${name}`,
    proofs: 'Featured work',
  },

  period: {
    present: 'Present',
  },

  profile: {
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    site: 'Website',
  },

  projects: {
    demoLink: 'Live demo',
    watchDemo: 'Watch demo',
    gallery: (title: string) => `${title} screenshots`,
    appLink: 'Open app',
    ofProject: (title: string) => `for ${title}`,
    sharedTitle: 'Two products, one multi-company codebase',
    sameCodeAs: (title: string) => `Same codebase as ${title}`,
    moreOnGithub: 'More code on GitHub',
    videoLabel: (title: string) => `Video demo of ${title}`,
    videoDialog: (title: string) => `${title} demo`,
    close: 'Close',
  },

  video: {
    title: 'Video made with code',
    circuit: 'The circuit, step by step',
    pipeline: 'How a reel gets made',
    codeToVideo: 'From code to video',
    howItWorks: 'See how it gets made',
    codeHint: 'The video reads this file. Tap a line to jump to that moment.',
    frame: 'frame',
    gate: 'Gate',
    waiting: 'Waiting for my approval',
    approved: 'Approved',
    auto: 'Runs on its own',
    parallel: 'In parallel',
    output: 'Output',
    pause: 'Pause the animation',
    play: 'Play the animation',
    watch: (title: string) => `Watch the reel "${title}"`,
    reelVideo: (title: string) => `Reel "${title}"`,
    langName: { es: 'in Spanish', en: 'in English' },
    close: 'Close',
  },

  websites: {
    stack: 'Stack',
  },

  contact: {
    description: 'Have a role or a project in mind? Reach me by email, by phone or with the form.',
    labels: {
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
    },
    references: 'References available upon request.',
    form: {
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      message: 'Message',
      messagePlaceholder: 'Tell me about the role or the project…',
      submit: 'Send message',
      sending: 'Sending',
      success: 'Message sent. I will reply by email.',
      error: 'The message could not be sent. Email me directly instead.',
    },
  },

  footer: {
    navTitle: 'Sections',
    builtWith: 'Built with Next.js and deployed on Cloudflare Workers.',
  },
};
