type IconProps = { className?: string };

export const TechIcons: Record<string, React.FC<IconProps>> = {
  React: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="8" ry="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="8"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(-60 12 12)"
      />
    </svg>
  ),

  'Next.js': ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.6 16V8.4l7.1 8.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15.1 8.2v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),

  TypeScript: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 10h5.5M7.75 10v7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18.8 10.6a3.3 3.3 0 0 0-1.9-.6c-1.2 0-2 .6-2 1.5 0 2 4 1.4 4 3.5 0 1-.9 1.7-2.2 1.7a3.7 3.7 0 0 1-2.2-.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),

  JavaScript: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="1.5" y="1.5" width="21" height="21" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9.6 9.5v5.4c0 1-.6 1.6-1.5 1.6-.7 0-1.2-.3-1.5-.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M17.6 10.2a2.9 2.9 0 0 0-1.7-.7c-1 0-1.7.5-1.7 1.3 0 1.8 3.6 1.2 3.6 3.2 0 .9-.8 1.5-1.9 1.5a3.2 3.2 0 0 1-2-.7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),

  Astro: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.358 23.994c-1.49-1.362-1.926-4.22-1.303-6.292.858 1.041 2.048 1.371 3.28 1.558 1.902.288 3.77.18 5.538-.687.202-.1.388-.23.608-.36.166.48.209.965.151 1.458-.14 1.201-.738 2.129-1.69 2.834-.38.282-.783.535-1.176.802-1.207.822-1.534 1.786-1.08 3.177l.045.15a3.203 3.203 0 0 1-1.43-1.223 3.395 3.395 0 0 1-.577-1.83c-.005-.32-.005-.642-.048-.958-.105-.77-.467-1.116-1.149-1.136-.699-.02-1.253.411-1.4 1.092-.011.052-.027.104-.043.163zM1.998 16.083s3.152-1.535 6.313-1.535l2.384-7.38c.09-.356.35-.598.643-.598.294 0 .554.242.643.598l2.384 7.38c3.744 0 6.313 1.535 6.313 1.535L15.322.898C15.168.466 14.909.2 14.56.2H9.44c-.35 0-.598.266-.762.698L1.998 16.083z" />
    </svg>
  ),

  'Tailwind CSS': ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),

  'Node.js': ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 1.8 21 7v10l-9 5.2L3 17V7l9-5.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.6v6.2c0 .9-.5 1.4-1.3 1.4-.6 0-1.1-.3-1.4-.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 10a3.4 3.4 0 0 0-1.9-.6c-1.1 0-1.9.5-1.9 1.3 0 1.9 4 1.2 4 3.3 0 .9-.9 1.6-2.1 1.6-1 0-1.7-.3-2.2-.8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),

  Python: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  ),

  Django: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.529 3.109-2.625.561-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z" />
    </svg>
  ),

  FastAPI: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.375 0 0 5.375 0 12c0 6.627 5.375 12 12 12s12-5.373 12-12c0-6.625-5.373-12-12-12zm-.624 21.62v-7.528H7.19L13.203 2.38v7.528h4.029L11.376 21.62z" />
    </svg>
  ),

  'API Design': ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
      <circle cx="8" cy="6" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="14" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="10" cy="18" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  ),

  PHP: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <ellipse cx="12" cy="12" rx="11" ry="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.4 15.2 6.9 8.6h2.4c1.2 0 1.8.6 1.6 1.7-.2 1.1-1 1.7-2.2 1.7H7.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.6 15.2 13.1 8.6M12.6 11.9h2.3c.7 0 1.1.4 1 1l-.5 2.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.1 15.2 18.6 8.6h1.7c1 0 1.5.6 1.3 1.7-.2 1.1-.9 1.7-1.9 1.7h-1.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),

  WordPress: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.1 9.6h3.3l2.4 7 1.5-4.4-1-2.6H8.1M13.4 9.6h3.1l-2.6 7.6-1.6-4.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 9.6c.6 0 1 .4 1 1.2 0 .8-.5 1.7-.8 2.6l-1.3 3.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  ),

  SEO: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.3 15.3 4.7 4.7" strokeLinecap="round" />
      <path d="M7.8 11.6 9.9 9.3l1.9 1.7 2.4-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  PostgreSQL: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <ellipse cx="12" cy="5.8" rx="7.5" ry="3.3" />
      <path d="M4.5 5.8v12.4c0 1.8 3.4 3.3 7.5 3.3s7.5-1.5 7.5-3.3V5.8" strokeLinecap="round" />
      <path d="M4.5 12c0 1.8 3.4 3.3 7.5 3.3s7.5-1.5 7.5-3.3" strokeLinecap="round" />
    </svg>
  ),

  MySQL: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M2.5 18.5c2.5 0 3.5-2 4.6-5.2 1-2.9 2-4.8 3.4-4.8 1.3 0 1.9 1.2 2.4 3.4.5 2.2 1.1 3.4 2.3 3.4" strokeLinecap="round" />
      <path d="M15.2 15.3c1.7.4 3 1.3 3.6 2.5" strokeLinecap="round" />
      <circle cx="19.2" cy="8.6" r="1.2" fill="currentColor" stroke="none" />
      <path d="M17.6 5.4c2 0 3.9 1.6 3.9 3.6 0 1.5-.6 2.5-1.4 3.4" strokeLinecap="round" />
    </svg>
  ),

  Supabase: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.4 1.2a.7.7 0 0 1 1.24.55l-.63 8.05h6.36c1 0 1.55 1.16.92 1.94l-9.7 11.98a.7.7 0 0 1-1.24-.55l.63-8.05H4.62c-1 0-1.55-1.16-.92-1.94L13.4 1.2Z" />
    </svg>
  ),

  Cloudflare: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.5088 16.8447c.1475-.5068.0908-.9248-.1553-1.2407-.2139-.2686-.5537-.4141-1.0078-.4268h-7.5293c-.1904 0-.3369-.1621-.3203-.3525.0117-.127.0879-.2422.2041-.2949l6.8789-3.1348c.7373-.335 1.3135-.9873 1.5771-1.7871l.7021-2.123c.0254-.0752.0371-.1533.0371-.2314 0-.4424-.3604-.8027-.8027-.8027H8.1709c-3.7949 0-7.0986 2.7334-7.8066 6.4502l-.2568 1.3477c-.0117.0635-.0195.1279-.0195.1914 0 .5889.4775 1.0654 1.0654 1.0654h6.9443c.1904 0 .3369.1621.3203.3525-.0127.127-.0889.2422-.2041.2949l-6.9209 3.1572c-.71.3242-1.2686.9561-1.5322 1.7334l-.7568 2.2256c-.0273.0781-.0391.1602-.0391.2432 0 .4424.3604.8027.8027.8027h7.8242c3.7959 0 7.0986-2.7334 7.8066-6.4502l.2764-1.3906z" />
      <path d="M23.4941 15.203c-.2549-.3271-.6475-.5127-1.1055-.5127h-3.6113a.121.121 0 0 1-.1211-.1055c-.0078-.0635.0391-.1211.1055-.1279l3.3184-.7256c.5488-.1211 1.0117-.4697 1.2686-1.0176l.3271-.6963c.0156-.0322.0234-.0674.0234-.1016 0-.1348-.1094-.2432-.2432-.2432h-3.6572c-1.9072 0-3.6123 1.3779-4.0254 3.2529l-.2139 1.0078a1.209 1.209 0 0 0-.0088.1562c0 .6514.5283 1.1777 1.1777 1.1777h3.4902a.1207.1207 0 0 1 .1201.1055c.0088.0635-.0391.1211-.1045.1279l-3.3633.7256c-.5391.1172-.9922.457-1.2529.9883l-.3604.7295a.5596.5596 0 0 0-.0488.2305c0 .3105.252.5625.5625.5625h3.7129c1.9092 0 3.6152-1.3779 4.0273-3.2529l.2051-1.0117c.0117-.0518.0166-.1045.0166-.1572 0-.2803-.0869-.5518-.2549-.7812z" />
    </svg>
  ),

  AWS: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="m3 7 2.2 6L7 8.6 8.8 13 11 7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.6 12.4c.9.5 1.9.7 2.9.7 1.4 0 2.3-.5 2.3-1.4 0-2-5-1-5-3.4 0-1 1-1.7 2.6-1.7.9 0 1.8.2 2.6.6" strokeLinecap="round" />
      <path d="M2.6 17.4c3.2 1.9 6.8 2.9 10.4 2.9 2.9 0 5.7-.6 8.3-1.8" strokeLinecap="round" />
      <path d="m19.6 16.4 1.9-.3.1 1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  Git: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187" />
    </svg>
  ),

  Docker: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={className} aria-hidden="true">
      <rect x="3" y="11" width="2.8" height="2.8" rx=".4" />
      <rect x="6.4" y="11" width="2.8" height="2.8" rx=".4" />
      <rect x="9.8" y="11" width="2.8" height="2.8" rx=".4" />
      <rect x="13.2" y="11" width="2.8" height="2.8" rx=".4" />
      <rect x="6.4" y="7.8" width="2.8" height="2.8" rx=".4" />
      <rect x="9.8" y="7.8" width="2.8" height="2.8" rx=".4" />
      <rect x="9.8" y="4.6" width="2.8" height="2.8" rx=".4" />
      <path d="M2 15.2c0 3.4 2.6 5.4 6.6 5.4 5.2 0 9.1-2.6 10.5-7.2 1.6.3 2.7-.5 3.2-1.7-1.1-.7-2.4-.6-3.2-.1-.2-1.2-.9-2.1-1.8-2.6-.8 1-1 2.5-.3 3.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),

  'CI/CD': ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4" strokeLinecap="round" />
      <path d="M20.6 3.6v4.1h-4.1" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  ),

  Jira: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z" />
    </svg>
  ),

  Scrum: ({ className = 'w-6 h-6' }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className} aria-hidden="true">
      <path d="M20.8 9.2A9 9 0 1 0 21 13" strokeLinecap="round" />
      <path d="M21.4 4.6v4.8h-4.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7.4V12l3 1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};
