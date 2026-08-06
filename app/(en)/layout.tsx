import type { Metadata, Viewport } from 'next';
import RootDocument from '../components/RootDocument';
import { buildMetadata } from '../lib/metadata';

export const metadata: Metadata = buildMetadata('en');

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
  ],
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
