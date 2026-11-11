/**
 * Cabecera Range (un solo rango, en bytes) -> { start, end } inclusivos.
 *
 * - null: no hay rango que entender (sin cabecera, varias partes, otra unidad):
 *   se responde el archivo entero con 200, como permite el RFC 9110.
 * - 'unsatisfiable': el rango cae fuera del archivo -> 416.
 *
 * Safari no reproduce un vídeo si el servidor no contesta 206 a `bytes=0-1`.
 */
export function parseRange(header, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header?.trim() ?? '');
  if (!match || (match[1] === '' && match[2] === '')) return null;

  const [, first, last] = match;
  if (first === '') {
    // Sufijo: los últimos N bytes.
    const length = Number(last);
    if (length === 0) return 'unsatisfiable';
    return { start: Math.max(size - length, 0), end: size - 1 };
  }

  const start = Number(first);
  const end = last === '' ? size - 1 : Math.min(Number(last), size - 1);
  if (start >= size || start > end) return 'unsatisfiable';
  return { start, end };
}
