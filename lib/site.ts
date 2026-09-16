/**
 * Single source of truth for site-wide identity, navigation and entity signals.
 * Changing a name or URL here changes it in metadata, JSON-LD, sitemap and nav at once.
 */

/** The origin used when nothing usable is configured. */
const DEFAULT_SITE_URL = 'https://hereandmore.com'

/**
 * Resolve the canonical origin from the environment.
 *
 * Read server-side only. Every consumer — metadata, JSON-LD, sitemap, robots, OG images —
 * runs on the server or at build time, so the browser never needs this and there is no
 * reason to ship it there. Prefer the unprefixed SITE_URL; NEXT_PUBLIC_SITE_URL is still
 * honoured so an existing deployment keeps working, but it is the legacy spelling and
 * exposes the value to the client bundle for no benefit.
 *
 * In the browser both reads are undefined and this falls back to DEFAULT_SITE_URL, which
 * is the production origin — so a client component that ever does reach for it still gets
 * the right answer in production.
 *
 * `??` is deliberately not used: a host that defines the variable but leaves it blank
 * yields '', which is not nullish, so the fallback would never fire and every canonical,
 * sitemap entry and JSON-LD @id would be built from an empty string. That is not a loud
 * failure — it is a site that deploys with silently broken metadata.
 */
function resolveSiteUrl(): string {
  const raw = (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL)?.trim()
  if (!raw) return DEFAULT_SITE_URL

  // Tolerate a bare host ("hereandmore.com"), which is the usual way this is mistyped.
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`

  try {
    const { origin } = new URL(candidate)
    return origin
  } catch {
    return DEFAULT_SITE_URL
  }
}

export const SITE_URL = resolveSiteUrl()

export const site = {
  /** Entity name. Used verbatim everywhere — never abbreviated, never pluralised. */
  name: 'HERE & More',
  /** The product the company makes. */
  product: 'HERE',
  parentOrganization: 'Agana Studios',
  legalName: 'HERE & More',
  tagline: 'Directing a life. Building a world.',
  /** The 40–60 word answer-first definition. Mirrored in JSON-LD and /llms.txt. */
  description:
    'HERE & More builds HERE, a social layer for CRM-based platforms and services. It gives a group one shared map of aims, work, evidence and commitments — so a decision can be traced to the reason behind it, and finished work can be published with its provenance intact.',
  shortDescription: 'The social layer for CRM-based platforms and services.',
  email: 'hello@hereandmore.com',
  locale: 'en_GB',
  language: 'en',
  founded: '2026',
  /**
   * Profiles we actually control. These feed `sameAs` in Organization structured data, which
   * is how a search engine confirms the entity — so an unverified or wrong URL here is worse
   * than none at all. Empty until each one is confirmed; set NEXT_PUBLIC_SAME_AS to a
   * comma-separated list, or edit this array.
   */
  sameAs: (process.env.NEXT_PUBLIC_SAME_AS ?? '')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean),
  /** Leave empty until the handle is confirmed; an unowned @handle is a bad card attribution. */
  twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE ?? '',
} as const

export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export type NavItem = { label: string; href: string; description?: string }

export const primaryNav: { label: string; href: string; children?: NavItem[] }[] = [
  { label: 'How it works', href: '/#journey' },
  {
    label: 'Platform',
    href: '/platform',
    children: [
      { label: 'Capture', href: '/platform/capture', description: 'Evidence that keeps its provenance' },
      { label: 'Rooms', href: '/platform/rooms', description: 'Deliberation that ends in a commitment' },
      { label: 'Broadcast', href: '/platform/broadcast', description: 'Build in public, publish an edition' },
      { label: 'Dialog', href: '/platform/dialog', description: 'On-camera contracting, on purpose' },
    ],
  },
  {
    label: 'Use cases',
    href: '/use-cases',
    children: [
      { label: 'Client work', href: '/use-cases/client-work', description: 'Studios, agencies, product teams' },
      { label: 'Communities', href: '/use-cases/communities', description: 'Member-led groups that ship' },
      { label: 'Building in public', href: '/use-cases/building-in-public', description: 'Work people can follow' },
    ],
  },
  { label: 'Trust', href: '/trust' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
]

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Platform',
    items: [
      { label: 'Overview', href: '/platform' },
      { label: 'Capture', href: '/platform/capture' },
      { label: 'Rooms', href: '/platform/rooms' },
      { label: 'Broadcast', href: '/platform/broadcast' },
      { label: 'Dialog', href: '/platform/dialog' },
    ],
  },
  {
    title: 'Use cases',
    items: [
      { label: 'Client work', href: '/use-cases/client-work' },
      { label: 'Communities', href: '/use-cases/communities' },
      { label: 'Building in public', href: '/use-cases/building-in-public' },
      { label: 'All use cases', href: '/use-cases' },
    ],
  },
  {
    title: 'Compare',
    items: [
      { label: 'HERE vs Circle', href: '/compare/here-vs-circle' },
      { label: 'HERE vs HoneyBook', href: '/compare/here-vs-honeybook' },
      { label: 'All comparisons', href: '/compare' },
    ],
  },
  {
    title: 'Company',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Trust & provenance', href: '/trust' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Request access', href: '/demo' },
    ],
  },
]
