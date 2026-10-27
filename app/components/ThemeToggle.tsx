'use client';

import { Moon, Sun } from 'lucide-react';
import { type MouseEvent, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

type Theme = 'light' | 'dark';

export default function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // El script bloqueante de RootDocument ya puso la clase antes del primer
    // pintado; aquí sólo sincronizamos el estado de React con el DOM.
    setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
  }, []);

  const applyTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    // flushSync: la View Transition captura el DOM al volver el callback, así
    // que el interruptor tiene que estar ya en su posición nueva.
    flushSync(() => setTheme(next));
    document.documentElement.classList.toggle('light', next === 'light');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Modo privado o almacenamiento bloqueado: el tema sigue funcionando,
      // sólo no se recuerda entre visitas.
    }
  };

  // El tema nuevo se abre en círculo desde el clic (CSS: .theme-vt en globals.css).
  // Sin View Transitions o con movimiento reducido, cambia sin animación.
  const toggleTheme = (event: MouseEvent) => {
    const root = document.documentElement;
    if (!document.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches)
      return applyTheme();
    const { clientX: x, clientY: y } = event;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-r', `${r}px`);
    root.classList.add('theme-vt');
    document.startViewTransition(applyTheme).finished.finally(() => root.classList.remove('theme-vt'));
  };

  const isDark = theme !== 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={theme === null}
      className="relative h-7 w-14 shrink-0 rounded-full border border-neutral/30 bg-neutral/20 transition-colors hover:border-primary/50 disabled:cursor-default"
      aria-label={isDark ? toLight : toDark}
      aria-pressed={!isDark}
    >
      <span
        className="absolute top-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary shadow-lg transition-transform duration-300 ease-out"
        style={{ transform: isDark ? 'translateX(0)' : 'translateX(24px)' }}
      >
        {/* Ambos iconos van montados y sólo se alterna la opacidad: evita
            que el primer clic tenga que crear un nodo nuevo. */}
        <Moon
          className="absolute h-3 w-3 text-on-primary transition-opacity"
          style={{ opacity: isDark ? 1 : 0 }}
          aria-hidden="true"
        />
        <Sun
          className="absolute h-3 w-3 text-on-primary transition-opacity"
          style={{ opacity: isDark ? 0 : 1 }}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
