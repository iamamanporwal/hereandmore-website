/**
 * The only module that knows where content physically lives.
 *
 * Today: typed TypeScript in /content, bundled at build time → every route is static.
 * Tomorrow: Sanity. To migrate, replace the body of the functions below with GROQ queries
 * (schemas are already written in /sanity/schemas) and keep the signatures identical.
 * No template, page or component imports from /content directly — that is the whole point.
 *
 * Async signatures are used throughout even though the local source is synchronous, so the
 * swap to a network-backed CMS does not change a single call site.
 */
import { home } from '@/content/home'
import { platform } from '@/content/platform'
import { capture, rooms, broadcast, dialog, features } from '@/content/features'
import { clientWork, communities, buildingInPublic, useCases } from '@/content/use-cases'
import { vsCircle, vsHoneybook, comparisons } from '@/content/comparisons'
import { trust } from '@/content/trust'
import { pricing, plans } from '@/content/pricing'
import { faqPage, faqItems } from '@/content/faq'
import { about, demo } from '@/content/about'
import { privacy, terms } from '@/content/legal'
import { articles } from '@/content/blog'
import { authors, getAuthor } from '@/content/authors'
import { groq, isSanityConfigured, QUERIES } from './sanity'
import type { Article, Author, Comparison, FaqItem, LandingPage, PricingPlan, UseCase } from './types'

/**
 * Every getter below reads Sanity when it is configured and falls back to the local content
 * otherwise — including when a query returns nothing, so a half-populated dataset degrades to
 * the built-in copy instead of rendering an empty page.
 */
async function fromSanity<T>(query: string, params: Record<string, string>, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback
  const result = await groq<T>(query, params)
  if (result === null || result === undefined) return fallback
  if (Array.isArray(result) && result.length === 0) return fallback
  return result
}

const landingPages: LandingPage[] = [
  home,
  platform,
  capture,
  rooms,
  broadcast,
  dialog,
  trust,
  pricing,
  faqPage,
  about,
  demo,
  privacy,
  terms,
]

export async function getLanding(path: string): Promise<LandingPage> {
  const local = landingPages.find((p) => p.path === path)
  if (!local) throw new Error(`No landing page registered for "${path}". Add it to lib/content/source.ts.`)
  return fromSanity<LandingPage>(QUERIES.landing, { path }, local)
}

export async function getFeatures(): Promise<LandingPage[]> {
  return fromSanity<LandingPage[]>(QUERIES.features, {}, features)
}

export async function getUseCases(): Promise<UseCase[]> {
  return fromSanity<UseCase[]>(QUERIES.useCases, {}, useCases)
}

export async function getUseCase(slug: string): Promise<UseCase | undefined> {
  const local = useCases.find((u) => u.slug === slug)
  if (!local) return undefined
  return fromSanity<UseCase>(QUERIES.useCase, { slug }, local)
}

export async function getComparisons(): Promise<Comparison[]> {
  return fromSanity<Comparison[]>(QUERIES.comparisons, {}, comparisons)
}

export async function getComparison(slug: string): Promise<Comparison | undefined> {
  const local = comparisons.find((c) => c.slug === slug)
  if (!local) return undefined
  return fromSanity<Comparison>(QUERIES.comparison, { slug }, local)
}

export async function getArticles(): Promise<Article[]> {
  const local = [...articles].sort((a, b) => (a.published < b.published ? 1 : -1))
  return fromSanity<Article[]>(QUERIES.articles, {}, local)
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  const local = articles.find((a) => a.slug === slug)
  if (!local) return undefined
  return fromSanity<Article>(QUERIES.article, { slug }, local)
}

export async function getFaqItems(): Promise<FaqItem[]> {
  return faqItems
}

export async function getPlans(): Promise<PricingPlan[]> {
  return fromSanity<PricingPlan[]>(QUERIES.plans, {}, plans)
}

export async function getAuthors(): Promise<Author[]> {
  return fromSanity<Author[]>(QUERIES.authors, {}, authors)
}

export { getAuthor }

/** Everything that should appear in the sitemap, with its last modification date. */
export async function getAllRoutes(): Promise<{ path: string; updated: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }[]> {
  const routes: { path: string; updated: string; priority: number; changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' }[] = []

  const priorityFor = (path: string): number => {
    if (path === '/') return 1
    if (['/platform', '/trust', '/pricing'].includes(path)) return 0.9
    if (path.startsWith('/platform/') || path.startsWith('/use-cases/') || path.startsWith('/compare/')) return 0.8
    if (['/use-cases', '/compare', '/blog', '/faq', '/demo'].includes(path)) return 0.7
    if (path.startsWith('/blog/')) return 0.6
    if (path.startsWith('/legal/')) return 0.2
    return 0.5
  }

  const add = (path: string, updated: string, changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly') => {
    routes.push({ path, updated, priority: priorityFor(path), changeFrequency })
  }

  for (const page of landingPages) {
    if (page.seo.noindex) continue
    add(page.path, page.updated, page.path === '/' ? 'weekly' : 'monthly')
  }
  add('/use-cases', '2026-09-14')
  add('/compare', '2026-09-14')
  add('/blog', (await getArticles())[0]?.updated ?? '2026-09-14', 'weekly')
  for (const u of useCases) add(u.path, u.updated)
  for (const c of comparisons) add(c.path, c.updated)
  for (const a of articles) add(a.path, a.updated)

  return routes
}
