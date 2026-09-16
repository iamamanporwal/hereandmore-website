/**
 * The Sanity side of the content contract.
 *
 * Deliberately dependency-free: Sanity's HTTP API is a GET with a GROQ query string, so
 * fetching it needs no client library and adds nothing to the bundle. `isSanityConfigured`
 * is what `source.ts` branches on — with no project id the site reads the typed content in
 * /content exactly as before, so an unconfigured deploy behaves identically to today.
 *
 * The projections below mirror `lib/content/types.ts` field for field, and the schemas that
 * produce them are in /sanity/schemas. They have not been run against a populated dataset —
 * create the dataset, then verify each document type renders before switching a route over.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_READ_TOKEN
const apiVersion = '2024-10-01'

export const isSanityConfigured = Boolean(projectId)

export async function groq<T>(query: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!projectId) return null

  const search = new URLSearchParams({ query })
  for (const [key, value] of Object.entries(params)) search.set(`$${key}`, JSON.stringify(value))

  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`

  try {
    const res = await fetch(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      // Content is fetched at build time; a published document triggers a rebuild or an
      // on-demand revalidation rather than a per-request fetch.
      next: { revalidate: 3600, tags: ['content'] },
    })
    if (!res.ok) {
      console.error(`[sanity] query failed: ${res.status}`)
      return null
    }
    const body = (await res.json()) as { result: T }
    return body.result
  } catch (error) {
    console.error('[sanity] query threw', error)
    return null
  }
}

/** Shared projection: the fields every document type carries. */
const BASE = `
  "slug": slug.current,
  path,
  seo,
  answer,
  title,
  eyebrow,
  journeyStep,
  "updated": updated,
  body,
  faqs,
  related,
  cta
`

export const QUERIES = {
  landing: `*[_type == "landingPage" && path == $path][0]{ ${BASE}, hero, sections, "_type": "landing" }`,
  features: `*[_type == "landingPage" && path match "/platform/*"] | order(path asc){ ${BASE}, hero, sections, "_type": "landing" }`,
  useCases: `*[_type == "useCase"] | order(path asc){ ${BASE}, audience, problem, outcomes, workflow, "_type": "useCase" }`,
  useCase: `*[_type == "useCase" && slug.current == $slug][0]{ ${BASE}, audience, problem, outcomes, workflow, "_type": "useCase" }`,
  comparisons: `*[_type == "comparison"] | order(path asc){ ${BASE}, competitor, summary, matrix, "_type": "comparison" }`,
  comparison: `*[_type == "comparison" && slug.current == $slug][0]{ ${BASE}, competitor, summary, matrix, "_type": "comparison" }`,
  articles: `*[_type == "article"] | order(published desc){
    ${BASE}, excerpt, published, topic, readingMinutes, pillar, featured,
    "authorId": author->slug.current, "_type": "article"
  }`,
  article: `*[_type == "article" && slug.current == $slug][0]{
    ${BASE}, excerpt, published, topic, readingMinutes, pillar, featured,
    "authorId": author->slug.current, "_type": "article"
  }`,
  plans: `*[_type == "pricingPlan"] | order(order asc){ name, price, priceNote, amount, currency, summary, features, cta, featured }`,
  authors: `*[_type == "author"]{ "id": slug.current, name, role, url, sameAs }`,
} as const
