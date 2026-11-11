import type { Locale } from '../i18n/config';

/** Un valor por idioma. Añadir un idioma en config.ts rompe el build hasta traducirlo todo. */
export type L<T> = Record<Locale, T>;

/** Texto igual en todos los idiomas (nombres propios) o uno por idioma. */
export type Text = string | L<string>;

/** '2024' (solo año) o '2026-02' (año-mes). El formato exacto lo valida `index.ts`. */
export type Period = `${number}` | `${number}-${number}`;

/** Una estación de un pipeline de video, con lo que produjo en un caso real. */
export type Step = {
  label: L<string>;
  detail: L<string>;
  /** Lo que salió de esta estación en el ejemplo (va en monoespaciada). */
  output: Text;
  /** Puerta: el video se detiene hasta que Sebas lo aprueba. */
  gate?: boolean;
  /** Corre en paralelo con las estaciones siguientes. */
  parallel?: boolean;
};

/** Un reel publicado en el portafolio. Los archivos viven en `public/reels/`. */
export type Reel = {
  /** kebab-case, único. */
  id: string;
  title: Text;
  /** Cliente o canal. */
  by: Text;
  /** Ruta en public/, p. ej. '/reels/glam-urban.mp4'. El test comprueba que existe. */
  file: string;
  poster: string;
  seconds: number;
  /** Idioma del audio: se marca cuando no coincide con el de la página. */
  lang: Locale;
};

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
    /** Titular del Hero (h1): el posicionamiento. Lo eligió Sebas el 2026-11-11. */
    tagline: L<string>;
    /** Línea bajo el titular. */
    summary: L<string>;
  };
  /** Pruebas del Hero: tarjetas que llevan a un trabajo de la misma página. */
  highlights: {
    title: string;
    text: L<string>;
    /** Ancla en la página: '#proyecto-<id>' o '#sebsmedia'. Lo comprueba el test. */
    href: `#${string}`;
    /** Miniatura en public/. Sin ella, la tarjeta lleva un icono. */
    image?: string;
  }[];
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
  /**
   * Video con código. No va en `projects` a propósito: esa lista es exactamente
   * la del JSON de Sebas (lo comprueba `CV_JSON=… npm test`).
   */
  video: {
    intro: L<string>;
    studio: {
      title: string;
      description: L<string>;
      technologies: string[];
      access: L<string>;
      /** De qué video salen los `output` del circuito. */
      example: L<string>;
      circuit: Step[];
      reels: Reel[];
    };
    clients: {
      title: L<string>;
      description: L<string>;
      technologies: string[];
      example: L<string>;
      pipeline: Step[];
      /** El reel que se muestra junto a su guion.json, sincronizado. */
      featured: {
        title: L<string>;
        by: string;
        file: L<string>;
        poster: L<string>;
        /** Duración de cada versión, en segundos. */
        seconds: L<number>;
        /** Extracto real de src/guion.json: [texto, inicio, fin] en segundos. */
        script: L<{
          fps: number;
          lines: [string, number, number][];
          keys: { name: string; value: number | number[] }[];
        }>;
      };
      reels: Reel[];
    };
  };
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
