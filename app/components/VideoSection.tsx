import { ChevronDown, Lock } from 'lucide-react';
import type { ReactNode } from 'react';
import { content, tr } from '../lib/content';
import type { Reel, Step } from '../lib/content/schema';
import type { Dictionary, Locale } from '../lib/i18n';
import Pipeline from './Pipeline';
import ReelCard from './ReelCard';
import ScriptSync from './ScriptSync';
import { Chips, Section } from './ui';

type Props = { dict: Dictionary; locale: Locale };

/** 46.8 -> '0:47' */
function duration(seconds: number) {
  const total = Math.round(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

/** Los pasos llegan al cliente ya traducidos: solo strings. */
function resolveSteps(steps: Step[], locale: Locale) {
  return steps.map(({ label, detail, output, gate, parallel }) => ({
    label: label[locale],
    detail: detail[locale],
    output: tr(output, locale),
    gate,
    parallel,
  }));
}

function pipelineLabels({ video: t }: Dictionary) {
  const { gate, waiting, approved, auto, parallel, output, pause, play } = t;
  return { gate, waiting, approved, auto, parallel, output, pause, play };
}

/** En móvil, una fila que se desliza (sin huérfanos); desde `sm`, una rejilla de 3. */
function ReelWall({ reels, dict, locale }: Props & { reels: Reel[] }) {
  const t = dict.video;
  return (
    // scroll-px: el snap alinea al borde del contenedor e ignora su padding.
    <ul className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
      {reels.map((reel) => {
        const title = tr(reel.title, locale);
        const by = tr(reel.by, locale);
        const time = duration(reel.seconds);
        const foreign = reel.lang !== locale;
        return (
          <li key={reel.id} className="w-[42%] shrink-0 snap-start sm:w-auto">
            <ReelCard
              src={reel.file}
              poster={reel.poster}
              title={title}
              by={by}
              duration={time}
              badge={foreign ? reel.lang : undefined}
              labels={{
                watch: `${t.watch(title)} — ${by}, ${time}${foreign ? `, ${t.langName[reel.lang]}` : ''}`,
                video: t.reelVideo(title),
                close: t.close,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
}

/**
 * «Ver cómo se hace»: el proceso queda plegado y los reels a la vista. Es un
 * <details> nativo (cero JS, Ctrl+F lo encuentra); con el mismo `name` se
 * comportan como acordeón. Cerrado, el Pipeline de dentro no se ve y no anima.
 */
function HowItWorks({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details name="video-como" className="group border-b border-neutral/20 first-of-type:border-t">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-foreground transition-colors hover:text-primary [&::-webkit-details-marker]:hidden">
        {summary}
        <ChevronDown
          className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="pb-8">{children}</div>
    </details>
  );
}

function Intro({ titleId, title, description, technologies, children }: {
  titleId: string;
  title: string;
  description: string;
  technologies: string[];
  children?: ReactNode;
}) {
  return (
    <div>
      <h3 id={titleId} className="display text-3xl font-bold text-foreground sm:text-4xl">
        {title}
      </h3>
      <p className="mt-3 max-w-xl leading-relaxed text-neutral-variant">{description}</p>
      {children}
      <div className="mt-5">
        <Chips items={technologies} />
      </div>
    </div>
  );
}

/**
 * Video con código: SEBSMEDIA y los reels para marcas. Primero la prueba (los
 * reels), y el proceso (pipelines animados y el reel junto a su guion.json)
 * plegado detrás de «Ver cómo se hace».
 */
export default function VideoSection({ dict, locale }: Props) {
  const t = dict.video;
  const { intro, studio, clients } = content.video;
  const { featured } = clients;
  const script = featured.script[locale];
  const featuredReel: Reel = {
    id: 'jp-media',
    title: featured.title[locale],
    by: featured.by,
    file: featured.file[locale],
    poster: featured.poster[locale],
    seconds: featured.seconds[locale],
    lang: locale,
  };
  const twoColumns = 'grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-start lg:gap-12';

  return (
    <Section id="video" title={t.title} intro={intro[locale]}>
      <article aria-labelledby="sebsmedia-title" id="sebsmedia" className="scroll-mt-28">
        <div className={twoColumns}>
          <Intro
            titleId="sebsmedia-title"
            title={studio.title}
            description={studio.description[locale]}
            technologies={studio.technologies}
          >
            <p className="mt-3 flex items-center gap-2 text-sm text-foreground">
              <Lock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {studio.access[locale]}
            </p>
          </Intro>
          <ReelWall reels={studio.reels} dict={dict} locale={locale} />
        </div>

        <div className="mt-10">
          <HowItWorks summary={`${t.howItWorks} · ${t.circuit}`}>
            <p className="mb-5 text-sm text-neutral-variant">{studio.example[locale]}</p>
            <Pipeline
              title={t.circuit}
              steps={resolveSteps(studio.circuit, locale)}
              labels={pipelineLabels(dict)}
            />
          </HowItWorks>
        </div>
      </article>

      <article aria-labelledby="clients-title" className="mt-24">
        <div className={twoColumns}>
          <Intro
            titleId="clients-title"
            title={clients.title[locale]}
            description={clients.description[locale]}
            technologies={clients.technologies}
          />
          <ReelWall reels={[featuredReel, ...clients.reels]} dict={dict} locale={locale} />
        </div>

        <div className="mt-10">
          <HowItWorks summary={`${t.howItWorks} · ${t.pipeline}`}>
            <p className="mb-5 text-sm text-neutral-variant">{clients.example[locale]}</p>
            <Pipeline
              title={t.pipeline}
              steps={resolveSteps(clients.pipeline, locale)}
              labels={pipelineLabels(dict)}
            />
          </HowItWorks>
          <HowItWorks summary={t.codeToVideo}>
            <p className="mb-5 text-sm text-neutral-variant">
              {featured.by} · {featured.title[locale]}. {t.codeHint}
            </p>
            <ScriptSync
              src={featured.file[locale]}
              poster={featured.poster[locale]}
              fps={script.fps}
              lines={script.lines}
              keys={script.keys}
              jsonKey={locale}
              labels={{
                file: 'src/guion.json',
                frame: t.frame,
                video: t.reelVideo(featured.title[locale]),
              }}
            />
          </HowItWorks>
        </div>
      </article>
    </Section>
  );
}
