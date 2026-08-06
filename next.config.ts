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

  async headers() {
    return [
      {
        // Estos assets sólo cambian cuando los reemplazas a mano, así que
        // cachearlos un año evita volver a descargar megas en cada visita.
        source: '/:folder(assets|images)/:file*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
