import type { MetadataRoute } from 'next'
import { absoluteUrl, SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Only the API surface. Never block /_next/static — the stylesheet and the
        // font files live there, and a crawler that cannot fetch them renders the
        // site unstyled and judges its layout and mobile-friendliness on that.
        disallow: ['/api/'],
      },
      /**
       * Named explicitly so AI crawlers have an unambiguous grant rather than an inference.
       * The pairs matter: the crawler that decides search citability is NOT the one that
       * gathers training data, and blocking one says nothing about the other.
       *   citability → OAI-SearchBot (ChatGPT), Claude-SearchBot (Claude), PerplexityBot
       *   training   → GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended
       *   discovery  → Googlebot, Applebot (covered by the wildcard rule above)
       */
      {
        userAgent: [
          'OAI-SearchBot',
          'Claude-SearchBot',
          'PerplexityBot',
          'ChatGPT-User',
          'Claude-User',
          'GPTBot',
          'ClaudeBot',
          'CCBot',
          'Google-Extended',
          'Google-CloudVertexBot',
          'Applebot',
          'Applebot-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
    host: SITE_URL,
  }
}
