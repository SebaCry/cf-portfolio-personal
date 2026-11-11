import { useEffect, useState, type RefObject } from 'react';

/**
 * Utilidades de los componentes de cliente con vídeo o animación. No llamar
 * durante el render: usan `window` y `navigator`, que no existen en el servidor.
 */

/** Conexión lenta, ahorro de datos o pantalla pequeña: el vídeo espera al clic. */
export function isFrugal(): boolean {
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  return (
    connection?.saveData === true ||
    (connection?.effectiveType != null && /2g/.test(connection.effectiveType)) ||
    window.matchMedia('(max-width: 767px)').matches
  );
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** true mientras el elemento está en pantalla. Con `once`, se queda en true la primera vez. */
export function useInView(
  ref: RefObject<Element | null>,
  { rootMargin = '0px', threshold = 0, once = false } = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin, threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, threshold, once]);

  return inView;
}
