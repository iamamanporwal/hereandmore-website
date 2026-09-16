import type { Metadata, Viewport } from 'next'
import { Bodoni_Moda, Instrument_Sans } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { Reveal } from '@/components/Reveal'
import { graph, organizationLd, softwareLd, websiteLd } from '@/lib/seo'
import { SITE_URL, site } from '@/lib/site'
import './globals.css'

/* Self-hosted at build time by next/font: no third-party request, no CLS, no FOUT.
 * Bodoni Moda is a true Didone — high stroke contrast, editorial, and used only at
 * display sizes. Instrument Sans carries every piece of interface text. */
const sans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  adjustFontFallback: true,
})

const serif = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
  axes: ['opsz'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.shortDescription}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  category: 'technology',
  alternates: { canonical: '/', types: { 'application/rss+xml': `${SITE_URL}/rss.xml` } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
  manifest: '/manifest.webmanifest',
  // Set these once the properties are created; omitted entirely when unset.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: site.locale,
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image', ...(site.twitter ? { site: site.twitter } : {}) },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ef' },
    { media: '(prefers-color-scheme: dark)', color: '#0c1310' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  /* suppressHydrationWarning covers only this element's own attributes, which is where
   * browser extensions (dark-mode toggles, grammar checkers) write before React loads.
   * Nothing of ours differs between server and client. */
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <Reveal />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={graph(organizationLd, websiteLd, softwareLd)} />
        {/* Speculation Rules: the next navigation is painted before it is asked for.
            Prerender is limited to the three routes that actually follow a first visit;
            everything else is a cheaper prefetch on hover. */}
        <script
          type="speculationrules"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              prerender: [
                {
                  source: 'list',
                  urls: ['/platform', '/pricing', '/demo'],
                  eagerness: 'moderate',
                },
              ],
              prefetch: [
                {
                  source: 'document',
                  where: { and: [{ href_matches: '/*' }, { not: { href_matches: '/api/*' } }] },
                  eagerness: 'moderate',
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
