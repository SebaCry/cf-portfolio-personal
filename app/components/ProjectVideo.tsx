'use client';

import { Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Las etiquetas llegan ya resueltas desde el servidor. El diccionario las
 * genera con funciones (`videoLabel(title)`), y las funciones no cruzan la
 * frontera servidor -> cliente.
 */
type VideoLabels = {
  video: string;
  expand: string;
  dialog: string;
  close: string;
};

type ProjectVideoProps = {
  src: string;
  labels: VideoLabels;
};

/**
 * El vídeo de demo pesa varios MB. Antes se descargaba con autoPlay en cuanto
 * se parseaba el HTML, compitiendo con el CSS, las fuentes y la imagen del
 * Hero por el ancho de banda. Ahora:
 *
 *  - no se descarga nada hasta que la tarjeta se acerca al viewport;
 *  - en móvil o con "ahorro de datos" sólo se carga si el usuario pulsa play;
 *  - el póster es un marcador CSS, así que no añade ninguna petición.
 */
export default function ProjectVideo({ src, labels }: ProjectVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || isLoaded) return;

    // Conexión lenta, ahorro de datos o pantalla pequeña: esperamos al clic.
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const isFrugal =
      connection?.saveData === true ||
      (connection?.effectiveType != null && /2g/.test(connection.effectiveType)) ||
      window.matchMedia('(max-width: 767px)').matches;

    if (isFrugal || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isLoaded]);

  // Bloquear el scroll de fondo y cerrar con Escape mientras el modal está abierto.
  useEffect(() => {
    if (!isExpanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isExpanded]);

  const openExpanded = () => {
    setIsLoaded(true);
    setIsExpanded(true);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="group/video relative aspect-video w-full overflow-hidden rounded-xl bg-neutral/5"
      >
        {isLoaded ? (
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={labels.video}
            className="h-full w-full object-cover"
          />
        ) : (
          /* Póster hecho con CSS: cero peticiones extra. */
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-card-bg to-card-bg" />
        )}

        <button
          type="button"
          onClick={openExpanded}
          className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/30"
          aria-label={labels.expand}
        >
          <span
            className={`flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/70 bg-black/40 backdrop-blur-sm transition-transform group-hover/video:scale-110 ${
              isLoaded ? 'opacity-0 group-hover/video:opacity-100' : 'opacity-100'
            }`}
          >
            <Play className="ml-1 h-7 w-7 fill-white text-white" aria-hidden="true" />
          </span>
        </button>
      </div>

      {isExpanded &&
        // Portal a <body>: `.section-defer` (content-visibility) crea un bloque
        // contenedor y un `position: fixed` dentro quedaría recortado a la sección.
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={labels.dialog}
            className="anim-in fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setIsExpanded(false)}
          >
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
              aria-label={labels.close}
              autoFocus
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className="anim-scale relative aspect-video w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <video
                src={src}
                autoPlay
                loop
                controls
                aria-label={labels.video}
                className="h-full w-full object-contain"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
