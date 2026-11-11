'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type VideoDialogProps = {
  src: string;
  /** Nombre del diálogo y del vídeo para lectores de pantalla. */
  dialogLabel: string;
  videoLabel: string;
  closeLabel: string;
  /** Reel 9:16 en lugar de demo 16:9. */
  vertical?: boolean;
  onClose: () => void;
};

/**
 * Vídeo a pantalla completa con sonido y controles. Lo comparten la demo de
 * SEBSBOT y los reels. Cierra con Escape o clic fuera, bloquea el scroll del
 * fondo y devuelve el foco a quien lo abrió.
 */
export default function VideoDialog({
  src,
  dialogLabel,
  videoLabel,
  closeLabel,
  vertical = false,
  onClose,
}: VideoDialogProps) {
  // En una ref para que el efecto corra una sola vez aunque el padre pase una función nueva.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Quien abrió el diálogo, leído en el primer render: en el efecto ya sería
  // tarde, porque `autoFocus` movió el foco al botón de cerrar.
  const [opener] = useState(() => document.activeElement as HTMLElement | null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      opener?.focus();
    };
  }, [opener]);

  // Portal a <body>: `.section-defer` (content-visibility) crea un bloque
  // contenedor y un `position: fixed` dentro quedaría recortado a la sección.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dialogLabel}
      className="anim-in fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label={closeLabel}
        autoFocus
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className={`anim-scale relative overflow-hidden rounded-2xl shadow-2xl ${
          vertical
            ? 'aspect-[9/16] h-[min(85svh,calc((100vw-2rem)*16/9))]'
            : 'aspect-video w-full max-w-6xl'
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <video
          src={src}
          autoPlay
          loop
          controls
          playsInline
          aria-label={videoLabel}
          className="h-full w-full object-contain"
        />
      </div>
    </div>,
    document.body
  );
}
