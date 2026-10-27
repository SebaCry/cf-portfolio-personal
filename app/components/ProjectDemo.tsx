'use client';

import { Play, X } from 'lucide-react';
import { useRef, useState } from 'react';

/**
 * Botón "Ver demo" + <dialog> nativo con el vídeo y/o las capturas.
 *
 * showModal() hace casi todo el trabajo de accesibilidad: el resto de la
 * página queda inerte (el foco no sale del diálogo), Esc lo cierra y al
 * cerrarse el foco vuelve al botón. Va a la capa superior (top layer), así que
 * `.section-defer` no lo recorta y no hace falta un portal.
 *
 * El vídeo pesa varios MB: el <video> solo se monta con el diálogo abierto, y
 * al cerrarlo se desmonta (deja de sonar y de descargar).
 *
 * Las etiquetas llegan resueltas desde el servidor: el diccionario las genera
 * con funciones y esas no cruzan la frontera servidor -> cliente.
 */
type Props = {
  poster?: string;
  video?: string;
  images?: { src: string; alt: string }[];
  labels: { open: string; ofProject: string; dialog: string; video: string; gallery: string; close: string };
};

export default function ProjectDemo({ poster, video, images = [], labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const trigger = (
    <>
      <Play className="h-4 w-4 fill-current" aria-hidden="true" />
      {labels.open}
      <span className="sr-only"> {labels.ofProject}</span>
    </>
  );

  return (
    <>
      {poster ? (
        <button type="button" onClick={open} className="demo-poster group/poster">
          {/* Decorativa: el nombre del botón es su texto. 16:9 fijo, sin CLS. */}
          {/* eslint-disable-next-line @next/next/no-img-element -- WebP ya optimizado; next/image solo en el Hero */}
          <img src={poster} alt="" width={960} height={540} loading="lazy" decoding="async" />
          <span className="btn-primary demo-poster-cta">{trigger}</span>
        </button>
      ) : (
        <button type="button" onClick={open} className="btn-primary">
          {trigger}
        </button>
      )}

      <dialog
        ref={dialogRef}
        aria-label={labels.dialog}
        className="demo-dialog"
        onClose={() => setIsOpen(false)}
        // Clic en el fondo (fuera de la caja): cierra. Dentro, el target es un hijo.
        onClick={(event) => event.target === event.currentTarget && close()}
      >
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-semibold text-foreground">{labels.dialog}</p>
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              autoFocus
              className="rounded-full p-2 text-neutral-variant transition-colors hover:bg-neutral/15 hover:text-foreground"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {video && isOpen && (
            <video
              src={video}
              poster={poster}
              autoPlay
              controls
              playsInline
              aria-label={labels.video}
              className="aspect-video w-full rounded-lg bg-black"
            />
          )}

          {images.length > 0 && (
            // Galería: scroll horizontal con snap. tabIndex para poder
            // desplazarla con el teclado (axe: scrollable-region-focusable).
            <ul
              aria-label={labels.gallery}
              tabIndex={0}
              className={`flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 ${video ? 'mt-4' : ''}`}
            >
              {images.map((image) => (
                <li key={image.src} className="w-full shrink-0 snap-center">
                  {/* eslint-disable-next-line @next/next/no-img-element -- WebP ya optimizado; next/image solo en el Hero */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={1280}
                    height={720}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full rounded-lg bg-neutral/10 object-contain"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </dialog>
    </>
  );
}
