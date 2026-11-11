/**
 * Entrada del Worker (`main` en wrangler.jsonc): envuelve el worker que genera
 * OpenNext para añadir una sola cosa, peticiones parciales en `/reels/*`.
 *
 * Por qué: el binding ASSETS ignora la cabecera Range y siempre contesta 200
 * con el archivo entero, y Safari (iPhone y Mac) no reproduce un vídeo así.
 * `assets.run_worker_first` manda solo `/reels/*` por aquí; todo lo demás lo
 * siguen sirviendo ASSETS y OpenNext como antes.
 *
 * Es .mjs a propósito: `.open-next/worker.js` no existe hasta `opennextjs-cloudflare
 * build`, y el typecheck de `next build` (que solo mira .ts/.tsx) no debe tocarlo.
 */
import openNext from '../.open-next/worker.js';
import { parseRange } from './range.mjs';

export default {
  async fetch(request, env, ctx) {
    if (!new URL(request.url).pathname.startsWith('/reels/')) {
      return openNext.fetch(request, env, ctx);
    }

    const asset = await env.ASSETS.fetch(request);
    if (!asset.ok) return asset; // 404, o 304 de una petición condicional

    const headers = new Headers(asset.headers);
    headers.set('Accept-Ranges', 'bytes');
    const range = request.headers.get('Range');
    if (!range) return new Response(asset.body, { status: asset.status, headers });

    // ponytail: lee el archivo entero para recortarlo; vale hasta unos pocos MB
    // por reel. Si crecen mucho, servirlos desde R2, que ya entiende Range.
    const body = await asset.arrayBuffer();
    const size = body.byteLength;
    const part = parseRange(range, size);

    if (part === null) return new Response(body, { status: 200, headers });
    if (part === 'unsatisfiable') {
      headers.set('Content-Range', `bytes */${size}`);
      headers.delete('Content-Length');
      return new Response(null, { status: 416, headers });
    }

    headers.set('Content-Range', `bytes ${part.start}-${part.end}/${size}`);
    headers.set('Content-Length', String(part.end - part.start + 1));
    return new Response(body.slice(part.start, part.end + 1), { status: 206, headers });
  },
};
