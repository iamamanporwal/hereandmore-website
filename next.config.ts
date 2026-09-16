import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV === 'development'

/* Production stays strict. `next dev` is the exception: React needs eval() to rebuild
 * callstacks and decode source maps for the error overlay, and Turbopack needs a
 * websocket back to the dev server for HMR. Both allowances are gated on NODE_ENV, so
 * a built site never carries them. */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  ...(isDev ? ["worker-src 'self' blob:"] : []),
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
  // Clean-URL discipline: one canonical path per document.
  async redirects() {
    return [
      { source: '/features', destination: '/platform', permanent: true },
      { source: '/features/:slug', destination: '/platform/:slug', permanent: true },
      { source: '/product', destination: '/platform', permanent: true },
      { source: '/solutions', destination: '/use-cases', permanent: true },
      { source: '/solutions/:slug', destination: '/use-cases/:slug', permanent: true },
      { source: '/vs/:slug', destination: '/compare/here-vs-:slug', permanent: true },
      { source: '/alternatives/circle', destination: '/compare/here-vs-circle', permanent: true },
      { source: '/alternatives/honeybook', destination: '/compare/here-vs-honeybook', permanent: true },
      { source: '/security', destination: '/trust', permanent: true },
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      { source: '/terms', destination: '/legal/terms', permanent: true },
      { source: '/posts/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/feed', destination: '/rss.xml', permanent: true },
      { source: '/contact', destination: '/demo', permanent: true },
      { source: '/request-demo', destination: '/demo', permanent: true },
    ]
  },
}

export default nextConfig
