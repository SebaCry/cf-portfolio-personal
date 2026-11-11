'use client';

import { Check, Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, useInView } from '../lib/media';

export type PipelineStep = {
  label: string;
  detail: string;
  output: string;
  gate?: boolean;
  parallel?: boolean;
};

type PipelineLabels = {
  gate: string;
  waiting: string;
  approved: string;
  auto: string;
  parallel: string;
  output: string;
  pause: string;
  play: string;
};

// Ritmo de la animación (ms). En una puerta, primero espera y luego se aprueba.
const STEP_MS = 2200;
const GATE_WAIT_MS = 1600;
const GATE_OK_MS = 1100;
const END_MS = 3600;

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Un pipeline que se recorre solo, estación por estación, mostrando lo que
 * produjo cada una en un caso real. Las puertas se detienen hasta "aprobarse".
 *
 * - Solo avanza mientras está en pantalla; con "reducir movimiento" no arranca.
 * - Botón de pausa (WCAG 2.2.2) y clic en una estación para verla con calma.
 * - Todos los paneles se apilan en la misma celda de la grilla: la altura es la
 *   del más alto y no cambia al avanzar (cero saltos de layout).
 */
export default function Pipeline({
  title,
  steps,
  labels,
}: {
  title: string;
  steps: PipelineStep[];
  labels: PipelineLabels;
}) {
  const [active, setActive] = useState(0);
  const [waiting, setWaiting] = useState(Boolean(steps[0].gate));
  const [playing, setPlaying] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLOListElement>(null);
  const inView = useInView(rootRef, { threshold: 0.3 });

  useEffect(() => setPlaying(!prefersReducedMotion()), []);

  // En móvil el riel es una fila que se desliza: el paso activo siempre a la vista.
  // Solo mueve la fila (scrollLeft), nunca la página. En escritorio no hay overflow.
  useEffect(() => {
    const rail = railRef.current;
    const item = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !item || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({
      left: item.offsetLeft - 16,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [active]);

  useEffect(() => {
    if (!playing || !inView) return;
    const step = steps[active];
    const isLast = active === steps.length - 1;
    const delay =
      step.gate && waiting ? GATE_WAIT_MS : isLast ? END_MS : step.gate ? GATE_OK_MS : STEP_MS;

    const id = setTimeout(() => {
      if (step.gate && waiting) return setWaiting(false);
      const next = (active + 1) % steps.length;
      setActive(next);
      setWaiting(Boolean(steps[next].gate));
    }, delay);
    return () => clearTimeout(id);
  }, [playing, inView, active, waiting, steps]);

  const select = (index: number) => {
    setPlaying(false);
    setActive(index);
    setWaiting(false);
  };

  const current = steps[active];
  const progress = active / (steps.length - 1);

  return (
    <div ref={rootRef} className="rounded-2xl border border-neutral/20 bg-surface p-4 sm:p-6">
      {/* grid-cols-1 = minmax(0,1fr): sin eso, la fila de píldoras (nowrap) estira
          la columna implícita en móvil y el panel se sale de la pantalla. */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[13.5rem_minmax(0,1fr)] lg:gap-10">
        {/* Riel. En escritorio, una línea que se llena hasta la estación activa. */}
        <div className="relative min-w-0">
          <span
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-[15.5px] hidden w-px bg-neutral/25 lg:block"
          />
          <span
            aria-hidden="true"
            className="absolute top-5 bottom-5 left-[15.5px] hidden w-px origin-top bg-approved transition-transform duration-500 ease-out lg:block"
            style={{ transform: `scaleY(${progress})` }}
          />

          <ol
            ref={railRef}
            aria-label={title}
            className="relative -mx-1 flex snap-x scroll-px-1 gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {steps.map((step, index) => {
              const isActive = index === active;
              const isDone = index < active;
              return (
                <li
                  key={step.label}
                  className={`relative shrink-0 snap-start ${step.parallel ? 'lg:pl-6' : ''}`}
                >
                  {step.parallel && (
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 left-4 hidden w-2 border-t border-dashed border-neutral/60 lg:block"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => select(index)}
                    aria-current={isActive ? 'step' : undefined}
                    // Móvil: una píldora de 44 px con el nombre. Escritorio: fila del riel.
                    className={`group flex min-h-11 items-center gap-2 rounded-full border py-1 pr-3.5 pl-1.5 text-left whitespace-nowrap lg:min-h-0 lg:w-full lg:gap-3 lg:rounded-lg lg:border-0 lg:p-0 lg:py-1 ${
                      isActive ? 'border-primary' : 'border-neutral/25'
                    }`}
                  >
                    <span
                      className={`relative grid h-8 w-8 shrink-0 place-items-center border font-mono text-[11px] font-semibold transition-colors duration-300 ${
                        step.gate ? 'rounded-md' : 'rounded-full'
                      } ${
                        isActive
                          ? 'pulse-ring border-primary bg-surface text-primary'
                          : isDone
                            ? 'border-approved bg-approved text-on-approved'
                            : 'border-neutral/40 bg-surface text-neutral-variant'
                      }`}
                    >
                      {isDone ? <Check className="h-4 w-4" aria-hidden="true" /> : pad(index + 1)}
                    </span>
                    <span
                      className={`text-sm ${
                        isActive
                          ? 'font-medium text-foreground'
                          : 'text-neutral-variant group-hover:text-foreground'
                      }`}
                    >
                      {step.label}
                      {step.gate && <span className="sr-only"> ({labels.gate})</span>}
                      {step.parallel && <span className="sr-only"> ({labels.parallel})</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 font-mono text-xs text-neutral-variant">
            <span className="tabular-nums">
              {pad(active + 1)} / {pad(steps.length)}
            </span>
            {current.gate ? (
              waiting ? (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary px-2 py-0.5 text-primary">
                  <span aria-hidden="true" className="blink h-1.5 w-1.5 rounded-full bg-primary" />
                  {labels.waiting}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full bg-approved px-2 py-0.5 text-on-approved">
                  <Check className="h-3 w-3" aria-hidden="true" />
                  {labels.approved}
                </span>
              )
            ) : (
              <span className="rounded-full border border-neutral/30 px-2 py-0.5">
                {current.parallel ? `∥ ${labels.parallel}` : labels.auto}
              </span>
            )}
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? labels.pause : labels.play}
              className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral/30 transition-colors hover:border-primary hover:text-primary"
            >
              {playing ? (
                <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="mt-3 grid">
            {steps.map((step, index) => (
              <div
                key={step.label}
                className={`[grid-area:1/1] transition-[opacity,visibility] duration-300 ${
                  index === active ? 'opacity-100' : 'invisible opacity-0'
                }`}
              >
                <p className="text-2xl font-semibold tracking-tight text-foreground">{step.label}</p>
                <p className="mt-2 leading-relaxed text-neutral-variant">{step.detail}</p>
                <div className="mt-5 rounded-lg border border-neutral/20 bg-background p-4">
                  <p className="font-mono text-[11px] tracking-wider text-neutral-variant uppercase">
                    → {labels.output}
                  </p>
                  {/* La clase `reveal` solo en el activo: se reinicia cada vez que le toca. */}
                  <p
                    className={`mt-2 font-mono text-sm leading-relaxed break-words text-foreground ${
                      index === active ? 'reveal' : ''
                    }`}
                  >
                    {step.output}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
