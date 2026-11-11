'use client';

import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { isFrugal, prefersReducedMotion, useInView } from '../lib/media';
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
  pause: string;
  play: string;
};

type ProjectVideoProps = {
  src: string;
  /** Cuadro del propio vídeo (webp en public/). Sin él, un degradado CSS. */
  poster?: string;
  labels: VideoLabels;
};

/**
 * El vídeo de demo pesa varios MB, así que:
 *
 *  - hasta que hace falta solo se ve el póster (lazy, unos 26 KB);
 *  - el vídeo se monta al acercarse al viewport, salvo en móvil, con ahorro
 *    de datos o con "reducir movimiento": ahí espera al clic;
 *  - mientras corre en bucle tiene un botón de pausa (WCAG 2.2.2).
 */
export default function ProjectVideo({ src, poster, labels }: ProjectVideoProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  // Hasta montar se asume que no: el servidor no sabe qué conexión hay.
  const [canAutoplay, setCanAutoplay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isNear = useInView(containerRef, { rootMargin: '200px', once: true });

  useEffect(() => setCanAutoplay(!isFrugal() && !prefersReducedMotion()), []);

  const isLoaded = isClicked || (isNear && canAutoplay);

  const openExpanded = () => {
    setIsClicked(true);
    setIsExpanded(true);
  };

  const togglePause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
    setIsPaused(!video.paused);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="group/video relative aspect-video w-full overflow-hidden rounded-xl bg-neutral/5"
      >
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element -- webp ya a su tamaño; next/image no aporta
          <img
            src={poster}
            alt=""
            width={960}
            height={540}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-card-bg to-card-bg" />
        )}

        {isLoaded && (
          <video
            ref={videoRef}
            src={src}
            // Mismo póster (ya en caché): sin él, el vídeo tapa la imagen con negro mientras carga.
            poster={poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={labels.video}
            onPlay={() => setIsPaused(false)}
            onPause={() => setIsPaused(true)}
            className="absolute inset-0 h-full w-full object-cover"
          />
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

        {isLoaded && (
          <button
            type="button"
            onClick={togglePause}
            aria-label={isPaused ? labels.play : labels.pause}
            className="absolute right-3 bottom-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            {isPaused ? (
              <Play className="ml-0.5 h-4 w-4 fill-white" aria-hidden="true" />
            ) : (
              <Pause className="h-4 w-4 fill-white" aria-hidden="true" />
            )}
          </button>
        )}
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
