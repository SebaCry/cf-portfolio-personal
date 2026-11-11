'use client';

import { useEffect, useRef, useState } from 'react';
import { isFrugal, useInView } from '../lib/media';

type ScriptKey = { name: string; value: number | number[] };

type ScriptSyncProps = {
  src: string;
  poster: string;
  fps: number;
  /** [texto, inicio, fin] en segundos, como en src/guion.json. */
  lines: [string, number, number][];
  keys: ScriptKey[];
  /** Clave del idioma dentro del JSON ("es" / "en"). */
  jsonKey: string;
  labels: { file: string; frame: string; video: string };
};

/** Segundos que una marca suelta (vuelo, remate…) queda resaltada. */
const FLASH = 0.5;

type State = 'todo' | 'active' | 'done';
const stateOf = (t: number, start: number, end: number): State =>
  t >= end ? 'done' : t >= start ? 'active' : 'todo';

// El hover va aparte en cada estado: en la línea activa taparía el resaltado.
const LINE: Record<State, string> = {
  todo: 'text-neutral hover:bg-neutral/10',
  active: 'bg-primary/15 text-foreground shadow-[inset_2px_0_0_var(--primary)]',
  done: 'text-neutral-variant hover:bg-neutral/10',
};

const NUMBER: Record<State, string> = {
  todo: '',
  active: 'rounded bg-primary text-on-primary',
  done: 'text-primary',
};

/**
 * Un reel junto al archivo de tiempos que lo genera: mientras corre el vídeo
 * se ilumina la línea que se está ejecutando. Clic en una línea = saltar ahí.
 *
 * En escritorio arranca en silencio al entrar en pantalla y se pausa al salir
 * (si nadie le subió el volumen). En móvil o con ahorro de datos no descarga
 * nada hasta que el usuario pulsa play, y entonces suena.
 */
export default function ScriptSync({ src, poster, fps, lines, keys, jsonKey, labels }: ScriptSyncProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const autoPaused = useRef(false);
  const started = useRef(false);
  const [frame, setFrame] = useState(0);
  const [frugal, setFrugal] = useState(true);
  const inView = useInView(boxRef, { threshold: 0.25 });

  useEffect(() => setFrugal(isFrugal()), []);

  // Reproducción automática en silencio solo en escritorio y solo en pantalla.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || frugal) return;
    if (inView && (!started.current || autoPaused.current)) {
      started.current = true;
      autoPaused.current = false;
      video.play().catch(() => {});
    } else if (!inView && !video.paused && video.muted) {
      autoPaused.current = true;
      video.pause();
    }
  }, [inView, frugal]);

  // timeupdate llega ~4 veces por segundo: para seguir cada cuadro se lee en rAF.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let raf = 0;
    const read = () => setFrame(Math.floor(video.currentTime * fps));
    const tick = () => {
      read();
      if (!video.paused) raf = requestAnimationFrame(tick);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    video.addEventListener('play', start);
    video.addEventListener('seeked', read);
    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener('play', start);
      video.removeEventListener('seeked', read);
    };
  }, [fps]);

  const seek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    video.play().catch(() => {});
  };

  const t = frame / fps;
  const row = 'block w-full rounded px-1 text-left transition-colors duration-150';

  return (
    <div
      ref={boxRef}
      className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:items-center"
    >
      <div className="mx-auto aspect-[9/16] w-full max-w-[14rem] overflow-hidden rounded-[1.6rem] border-[6px] border-neutral/25 bg-black shadow-xl">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="none"
          loop
          controls
          playsInline
          // Silencio solo cuando arranca solo (escritorio). En móvil, play suena.
          muted={!frugal}
          aria-label={labels.video}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl border border-neutral/20 bg-background">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-neutral/20 px-4 py-2 font-mono text-xs text-neutral-variant">
          <span>{labels.file}</span>
          <span className="tabular-nums" aria-hidden="true">
            t = {t.toFixed(2).padStart(5, '0')} s · {labels.frame} {frame}
          </span>
        </div>

        <div className="p-3 font-mono text-[12.5px] leading-6 sm:p-4">
          <p className="text-neutral-variant">{'{'}</p>
          <p className="pl-4 text-neutral-variant">&quot;fps&quot;: {fps},</p>
          <p className="pl-4 text-neutral-variant">&quot;{jsonKey}&quot;: {'{'}</p>
          <p className="pl-8 text-neutral-variant">&quot;frases&quot;: [</p>
          {lines.map(([text, start, end], index) => (
            <button
              key={start}
              type="button"
              onClick={() => seek(start)}
              className={`${row} pl-12 ${LINE[stateOf(t, start, end)]}`}
            >
              [&quot;{text}&quot;, {start}, {end}]{index < lines.length - 1 ? ',' : ''}
            </button>
          ))}
          <p className="pl-8 text-neutral-variant">],</p>

          {keys.map(({ name, value }, index) => {
            const times = Array.isArray(value) ? value : [value];
            const state = stateOf(t, times[0], times[times.length - 1] + FLASH);
            return (
              <button
                key={name}
                type="button"
                onClick={() => seek(times[0])}
                className={`${row} pl-8 ${LINE[state]}`}
              >
                &quot;{name}&quot;:{' '}
                {Array.isArray(value) ? (
                  <>
                    [
                    {value.map((time, i) => (
                      <span key={time}>
                        <span className={`px-0.5 transition-colors ${NUMBER[stateOf(t, time, time + FLASH)]}`}>
                          {time}
                        </span>
                        {i < value.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                    ]
                  </>
                ) : (
                  value
                )}
                {index < keys.length - 1 ? ',' : ''}
              </button>
            );
          })}

          <p className="pl-4 text-neutral-variant">{'}'}</p>
          <p className="text-neutral-variant">{'}'}</p>
        </div>
      </div>
    </div>
  );
}
