import type { Dictionary } from './es';

/** English UI text. Typed against `es.ts`: a missing key fails the build. */
export const en: Dictionary = {
  meta: {
    siteName: 'Sebastián Pérez — Portfolio',
    applicationName: 'Sebastián Pérez Portfolio',
  },

  nav: {
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    websites: 'Websites',
    skills: 'Skills',
    education: 'Education',
    contact: 'Contact',
    hire: 'Hire me',
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    switchLanguage: 'Change language',
    languageName: 'English',
  },

  hero: {
    sectionLabel: 'Introduction',
    ctaProjects: 'View projects',
    ctaContact: 'Get in touch',
    portraitAlt: (name: string) => `Portrait of ${name}`,
  },

  period: {
    present: 'Present',
  },

  experience: {
    site: 'Website',
  },

  projects: {
    demoLink: 'View demo',
    appLink: 'Open app',
    ofProject: (title: string) => `for ${title}`,
    sharedTitle: 'Two products, one multi-company codebase',
    sameCodeAs: (title: string) => `Same codebase as ${title}`,
    moreOnGithub: 'More code on GitHub',
    videoLabel: (title: string) => `Video demo of ${title}`,
    videoExpand: (title: string) => `Watch the ${title} demo full screen`,
    videoDialog: (title: string) => `${title} demo`,
    close: 'Close',
  },

  websites: {
    stack: 'Stack',
  },

  skills: {
    technical: 'Technical',
    languages: 'Languages',
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
