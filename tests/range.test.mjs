/**
 * Peticiones parciales de los reels (worker/range.mjs). Sin esto Safari no
 * reproduce los vídeos: pide `bytes=0-1` y exige un 206.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseRange } from '../worker/range.mjs';

test('parseRange', () => {
  const size = 1000;
  const cases = [
    ['bytes=0-1', { start: 0, end: 1 }], // lo primero que pide Safari
    ['bytes=0-', { start: 0, end: 999 }],
    ['bytes=500-', { start: 500, end: 999 }],
    ['bytes=900-5000', { start: 900, end: 999 }], // el final se recorta al tamaño
    ['bytes=-100', { start: 900, end: 999 }], // sufijo
    ['bytes=-5000', { start: 0, end: 999 }],
    ['bytes=1000-', 'unsatisfiable'],
    ['bytes=5-2', 'unsatisfiable'],
    ['bytes=-0', 'unsatisfiable'],
    [null, null],
    ['bytes=-', null],
    ['bytes=0-1,5-9', null], // varias partes: archivo entero
    ['items=0-1', null],
  ];
  for (const [header, expected] of cases) assert.deepEqual(parseRange(header, size), expected, String(header));
});
