'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle({ toLight, toDark }: { toLight: string; toDark: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // El script bloqueante de RootDocument ya puso la clase antes del primer
    // pintado; aquí sólo sincronizamos el estado de React con el DOM.
    setTheme(document.documentElement.classList.contains('light') ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.toggle('light', next === 'light');
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Modo privado o almacenamiento bloqueado: el tema sigue funcionando,
      // sólo no se recuerda entre visitas.
    }
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
