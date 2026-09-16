/**
 * The content contract.
 *
 * Every template reads these types and nothing else. `lib/content/source.ts` is the only
 * module that knows where the data physically comes from. Today it is typed TS in /content;
 * tomorrow it is Sanity (see /sanity/schemas, which mirror these shapes one-to-one).
 *
 * `Block` is deliberately close to Sanity Portable Text: a discriminated union on `_type`,
 * walked by `components/blocks/BlockContent.tsx`.
 */

export type Block =
  | { _type: 'heading'; level: 2 | 3 | 4; text: string; id?: string }
  | { _type: 'paragraph'; text: string; lead?: boolean }
  | { _type: 'list'; style: 'bullet' | 'number'; items: string[] }
  | { _type: 'quote'; text: string; attribution?: string }
  | { _type: 'table'; caption?: string; columns: string[]; rows: string[][] }
  | { _type: 'definitionList'; items: { term: string; definition: string }[] }
  | { _type: 'callout'; tone: 'note' | 'limit' | 'evidence'; title?: string; text: string }
  | { _type: 'steps'; items: { title: string; text: string }[] }
  | { _type: 'code'; language?: string; code: string }
  | { _type: 'figure'; src: string; alt: string; width: number; height: number; caption?: string }

/** Inline text in `paragraph`, `list`, `table` and `definitionList` supports a tiny, safe subset:
 *  `[label](/path)`, `**bold**`, `*italic*`, `` `code` ``. Parsed in components/blocks/RichText.tsx. */

export interface Seo {
  /** ≤ 60 characters. The `<title>`; the site name suffix is appended by the layout. */
  title: string
  /** ≤ 155 characters. Written as a sentence, not a keyword list. */
  description: string
  /** The one keyword this page owns. Used for internal QA, never stuffed into copy. */
  primaryKeyword?: string
  /** Set true only for utility pages that must stay out of the index. */
  noindex?: boolean
  ogImageTitle?: string
}

export interface Related {
  label: string
  href: string
  description?: string
}

/** Which of the seven steps this page belongs to, so every page states where it sits. */
export interface JourneyRef {
  n: string
  title: string
}

export interface BaseDocument {
  slug: string
  journeyStep?: JourneyRef
  /** The route this document is served at. Canonical, lowercase, no trailing slash. */
  path: string
  seo: Seo
  /** The 40–60 word answer-first block rendered directly under the H1. Must stand alone. */
  answer: string
  title: string
  eyebrow?: string
  updated: string
  body: Block[]
  faqs?: FaqItem[]
  related?: Related[]
  cta?: Cta
}

export interface Cta {
  title: string
  text: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

export interface FaqItem {
  question: string
  /** Answer-first: first sentence must answer the question completely. Plain text + inline links. */
  answer: string
  /** Optional deep link to the page that answers it in full. */
  readMore?: { label: string; href: string }
  category?: string
}

export interface Author {
  id: string
  name: string
  role: string
  url?: string
  sameAs?: string[]
}

export interface Article extends BaseDocument {
  _type: 'article'
  excerpt: string
  published: string
  authorId: string
  topic: string
  readingMinutes: number
  /** The pillar this article supports. Rendered as an in-body link and in "Keep reading". */
  pillar: Related
  featured?: boolean
}

export interface LandingPage extends BaseDocument {
  _type: 'landing'
  hero: {
    headline: string
    /** Rendered in display italic. Keep to two or three words. */
    headlineAccent?: string
    sub: string
    primary: { label: string; href: string }
    secondary?: { label: string; href: string }
    stats?: { value: string; label: string }[]
  }
  sections?: FeatureSection[]
}

export interface FeatureSection {
  eyebrow?: string
  title: string
  text?: string
  features?: { title: string; text: string; icon?: IconName; href?: string }[]
}

export interface UseCase extends BaseDocument {
  _type: 'useCase'
  audience: string
  /** The situation before HERE, in the reader's own words. */
  problem: { title: string; text: string }[]
  outcomes: { value: string; label: string }[]
  workflow: { title: string; text: string }[]
}

export interface Comparison extends BaseDocument {
  _type: 'comparison'
  competitor: { name: string; category: string; url?: string }
  /** Stated plainly and fairly. Credibility here is the whole point of the page. */
  summary: { hereWins: string[]; theyWin: string[]; chooseThemIf: string }
  matrix: { criterion: string; here: string; them: string; note?: string }[]
}

export type IconName =
  | 'aim'
  | 'people'
  | 'layers'
  | 'broadcast'
  | 'record'
  | 'map'
  | 'shield'
  | 'spark'
  | 'contract'
  | 'clock'

export interface GlossaryTerm {
  term: string
  definition: string
  href?: string
}

export interface PricingPlan {
  name: string
  /** PLACEHOLDER until commercial terms are confirmed — see docs/STRATEGY.md §8. */
  price: string
  priceNote: string
  /** Machine-readable for Offer JSON-LD. Null means "not published". */
  amount: number | null
  currency: string
  summary: string
  features: string[]
  cta: { label: string; href: string }
  featured?: boolean
}
