import { getComparison, getComparisons } from '@/lib/content/source'
import { ogAlt, ogContentType, ogSize, renderOg } from '@/lib/og'

export const alt = ogAlt
export const size = ogSize
export const contentType = ogContentType

export async function generateStaticParams() {
  const comparisons = await getComparisons()
  return comparisons.map((comparison) => ({ slug: comparison.slug }))
}

export default async function Image({ params }: { params: { slug: string } }) {
  const comparison = await getComparison(params.slug)
  return renderOg({
    eyebrow: 'Comparison',
    title: comparison?.seo.ogImageTitle ?? comparison?.title ?? 'Comparison',
    footer: comparison ? `Including where ${comparison.competitor.name} wins` : undefined,
  })
}
