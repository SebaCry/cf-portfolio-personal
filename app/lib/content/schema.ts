import type { Locale } from '../i18n/config';

/** Un valor por idioma. Añadir un idioma en config.ts rompe el build hasta traducirlo todo. */
export type L<T> = Record<Locale, T>;

/** Texto igual en todos los idiomas (nombres propios) o uno por idioma. */
export type Text = string | L<string>;

/** '2024' (solo año) o '2026-02' (año-mes). El formato exacto lo valida `index.ts`. */
export type Period = `${number}` | `${number}-${number}`;

export type Portfolio = {
  profile: {
    name: string;
    role: L<string>;
    /** Primera frase del perfil: va en el Hero. */
    headline: L<string>;
    /** Resto del perfil, por párrafos: va en "Sobre mí". */
    bio: L<string[]>;
    /** <meta description> y JSON-LD. Máximo 160 caracteres (lo valida `index.ts`). */
    metaDescription: L<string>;
  };
  contact: {
    email: string;
    /** Único teléfono que se publica. No va en el JSON-LD. */
    phone: string;
    location: { locality: string; region: string; country: string; countryCode: string };
    /** URLs ASCII: las tildes van codificadas (%C3%A1). */
    linkedin: string;
    github: string;
  };
  experience: {
    role: L<string>;
    company: Text;
    mode: L<string>;
    start: Period;
    /** null = actualidad. */
    end: Period | null;
    url?: string;
    technologies?: string[];
  }[];
  projects: {
    /** kebab-case, único: es el ancla `#proyecto-<id>`. */
    id: string;
    title: string;
    /** Opcional: solo si el JSON de Sebas trae descripción (SIEKI no la trae). */
    description?: L<string>;
    technologies: string[];
    /** Solo enlaces públicos: nunca un repo privado. */
    links: { demo?: string; app?: string };
    /**
     * Modal "Ver demo": vídeo remoto (se descarga solo al abrir) y/o capturas.
     * `poster` y las capturas son WebP 16:9 en /images/proyectos/.
     */
    media?: {
      poster?: string;
      video?: string;
      images?: { src: string; alt: L<string> }[];
    };
    /** Nota de acceso restringido, p. ej. Cloudflare Access. */
    access?: L<string>;
    /** id del proyecto que comparte el mismo código (la relación debe ser recíproca). */
    sameCodeAs?: string;
  }[];
  websites: {
    name: string;
    url: string;
    technologies: string[];
    /** Logo sacado del propio sitio: /images/sitios/<slug>.svg|webp, cuadrado. */
    logo: string;
  }[];
  education: { title: L<string>; institution: Text; start: Period; end: Period | null }[];
  skills: Text[];
  languages: { name: L<string>; level: L<string> }[];
};
