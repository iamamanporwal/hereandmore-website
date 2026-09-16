import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { ComparisonTemplate } from '@/components/templates/ComparisonTemplate'
import { getComparison, getComparisons } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, comparisonLd, faqLd, graph } from '@/lib/seo'

export async function generateStaticParams() {
  const comparisons = await getComparisons()
  return comparisons.map((comparison) => ({ slug: comparison.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const comparison = await getComparison(slug)
  if (!comparison) return {}
  return buildMetadata(comparison.seo, comparison.path)
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const comparison = await getComparison(slug)
  if (!comparison) notFound()

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Compare', path: '/compare' },
    { name: `vs ${comparison.competitor.name}`, path: comparison.path },
  ]

  return (
    <>
      <ComparisonTemplate comparison={comparison} trail={trail} />
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(comparison.faqs ?? []), comparisonLd(comparison))} />
    </>
  )
}
