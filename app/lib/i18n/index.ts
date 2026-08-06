import { en } from './en';
import { es, type Dictionary } from './es';
import type { Locale } from './config';

export * from './config';
export type { Dictionary };

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
