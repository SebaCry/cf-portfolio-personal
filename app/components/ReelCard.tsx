'use client';

import { Play } from 'lucide-react';
import { useState, type PointerEvent } from 'react';
import { isFrugal } from '../lib/media';
import VideoDialog from './VideoDialog';

type ReelCardProps = {
  src: string;
  poster: string;
  title: string;
  by: string;
  duration: string;
  /** Idioma del audio cuando no es el de la página ("es"). */
  badge?: string;
  labels: { watch: string; video: string; close: string };
};

/**
 * Un reel en un marco de celular. Solo carga el póster (lazy); el vídeo se
 * monta al pasar el ratón (vista previa muda) o al hacer clic (modal con sonido).
 */
export default function ReelCard({ src, poster, title, by, duration, badge, labels }: ReelCardProps) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const startPreview = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && !isFrugal()) setIsPreviewing(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        onPointerEnter={startPreview}
        onPointerLeave={() => setIsPreviewing(false)}
        aria-label={labels.watch}
        className="group block w-full rounded-[1.4rem] text-left"
      >
        <span className="relative block aspect-[9/16] overflow-hidden rounded-[1.4rem] border-[5px] border-neutral/25 bg-black shadow-lg transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:-rotate-1 group-focus-visible:-translate-y-1">
          {/* eslint-disable-next-line @next/next/no-img-element -- el webp ya está a su tamaño; next/image no aporta aquí */}
          <img
            src={poster}
            alt=""
            width={432}
            height={768}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {isPreviewing && (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <span className="absolute inset-0 grid place-items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/70 bg-black/40 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
              <Play className="ml-0.5 h-5 w-5 fill-white text-white" aria-hidden="true" />
            </span>
          </span>
          <span className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white tabular-nums">
            {duration}
          </span>
          {badge && (
            <span className="absolute top-2 left-2 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[11px] text-white uppercase">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-3 block text-sm leading-snug font-medium text-foreground">{title}</span>
        <span className="mt-0.5 block text-xs text-neutral-variant">{by}</span>
      </button>

      {isOpen && (
        <VideoDialog
          src={src}
          dialogLabel={labels.video}
          videoLabel={labels.video}
          closeLabel={labels.close}
          vertical
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
