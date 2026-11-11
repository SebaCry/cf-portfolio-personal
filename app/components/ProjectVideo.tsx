'use client';

import { Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { isFrugal, useInView } from '../lib/media';
import VideoDialog from './VideoDialog';

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
  const [isClicked, setIsClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // Hasta montar se asume frugal: el servidor no sabe qué conexión hay.
  const [frugal, setFrugal] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isNear = useInView(containerRef, { rootMargin: '200px', once: true });

  useEffect(() => setFrugal(isFrugal()), []);

  const isLoaded = isClicked || (isNear && !frugal);

  const openExpanded = () => {
    setIsClicked(true);
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

      {isExpanded && (
        <VideoDialog
          src={src}
          dialogLabel={labels.dialog}
          videoLabel={labels.video}
          closeLabel={labels.close}
          onClose={() => setIsExpanded(false)}
        />
      )}
    </>
  );
}
