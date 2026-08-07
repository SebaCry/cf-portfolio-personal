import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,

  // Tree-shaking de los barrel files: al bundle sólo entran los iconos que se
  // usan, no las ~1500 exportaciones de lucide-react.
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Las cabeceras de caché de los estáticos NO van aquí: en Cloudflare los
  // sirve el binding ASSETS sin pasar por el worker de Next, así que headers()
  // no llegaría a ejecutarse. Están en `public/_headers`.
};

export default nextConfig;
