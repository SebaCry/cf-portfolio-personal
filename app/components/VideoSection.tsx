import { Lock } from 'lucide-react';
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

function ReelWall({ reels, dict, locale }: Props & { reels: Reel[] }) {
  const t = dict.video;
  return (
    <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
      {reels.map((reel) => {
        const title = tr(reel.title, locale);
        const by = tr(reel.by, locale);
        const time = duration(reel.seconds);
        const foreign = reel.lang !== locale;
        return (
          <li key={reel.id}>
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
 * Video con código: SEBSMEDIA (su circuito animado + sus Shorts) y los reels
 * para clientes (su pipeline, el reel junto a su guion.json y los demás reels).
 */
export default function VideoSection({ dict, locale }: Props) {
  const t = dict.video;
  const { intro, studio, clients } = content.video;
  const { featured } = clients;
  const script = featured.script[locale];

  return (
    <Section id="video" title={t.title}>
      <p className="max-w-2xl text-lg leading-relaxed text-neutral-variant">{intro[locale]}</p>

      <article aria-labelledby="sebsmedia-title" className="mt-12">
        <h3 id="sebsmedia-title" className="text-xl font-semibold text-foreground">
          {studio.title}
        </h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-neutral-variant">
          {studio.description[locale]}
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-foreground">
          <Lock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          {studio.access[locale]}
        </p>
        <div className="mt-4">
          <Chips items={studio.technologies} />
        </div>

        <h4 className="mt-10 font-semibold text-foreground">{t.circuit}</h4>
        <p className="mt-1 mb-5 text-sm text-neutral-variant">{studio.example[locale]}</p>
        <Pipeline
          title={t.circuit}
          steps={resolveSteps(studio.circuit, locale)}
          labels={pipelineLabels(dict)}
        />
        <ReelWall reels={studio.reels} dict={dict} locale={locale} />
      </article>

      <article aria-labelledby="clients-title" className="mt-20">
        <h3 id="clients-title" className="text-xl font-semibold text-foreground">
          {clients.title[locale]}
        </h3>
        <p className="mt-2 max-w-3xl leading-relaxed text-neutral-variant">
          {clients.description[locale]}
        </p>
        <div className="mt-4">
          <Chips items={clients.technologies} />
        </div>

        <h4 className="mt-10 font-semibold text-foreground">{t.pipeline}</h4>
        <p className="mt-1 mb-5 text-sm text-neutral-variant">{clients.example[locale]}</p>
        <Pipeline
          title={t.pipeline}
          steps={resolveSteps(clients.pipeline, locale)}
          labels={pipelineLabels(dict)}
        />

        <h4 className="mt-12 font-semibold text-foreground">{t.codeToVideo}</h4>
        <p className="mt-1 mb-5 text-sm text-neutral-variant">
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
        <ReelWall reels={clients.reels} dict={dict} locale={locale} />
      </article>
    </Section>
  );
}
