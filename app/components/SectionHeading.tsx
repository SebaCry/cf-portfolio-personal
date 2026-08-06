import { ACCENT } from '../lib/data';
import Reveal from './Reveal';

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: keyof typeof ACCENT;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  accent = 'primary',
}: SectionHeadingProps) {
  const tone = ACCENT[accent];

  return (
    <Reveal className="mb-16 text-center lg:mb-20">
      <p
        className={`mb-4 inline-block rounded-full border px-4 py-2 text-sm font-medium ${tone.bg} ${tone.borderSoft} ${tone.text}`}
      >
        {eyebrow}
      </p>
      <h2 className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl">
        <span className="bg-gradient-to-r from-foreground to-neutral bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <p className="mx-auto max-w-3xl text-lg leading-relaxed text-neutral-variant sm:text-xl">
        {description}
      </p>
    </Reveal>
  );
}
