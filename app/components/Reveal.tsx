'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';

/**
 * Un único IntersectionObserver compartido por todas las instancias.
 * Antes cada componente creaba su propio observer (framer-motion useInView);
 * con ~40 elementos revelables eso era ~40 observers corriendo en cada scroll.
 */
let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null;

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = 'true';
          obs.unobserve(entry.target); // se revela una sola vez
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    );
  }

  return sharedObserver;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Retardo en milisegundos para escalonar elementos hermanos. */
  delay?: number;
  /** Dirección desde la que entra el elemento. */
  dir?: 'up' | 'left' | 'right' | 'scale';
  /** Etiqueta HTML a renderizar. */
  as?: ElementType;
  id?: string;
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  dir = 'up',
  as: Tag = 'div',
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = getObserver();

    // Sin soporte de IntersectionObserver mostramos el contenido de inmediato.
    if (!observer) {
      el.dataset.visible = 'true';
      return;
    }

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <Tag
      id={id}
      ref={ref}
      className={`reveal ${className}`}
      data-dir={dir}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
