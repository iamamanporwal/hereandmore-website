import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { LandingTemplate } from '@/components/templates/LandingTemplate'
import { getFeatures, getLanding } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, faqLd, graph } from '@/lib/seo'

/** Statically generated at build time — one HTML file per feature, no runtime rendering. */
export async function generateStaticParams() {
  const features = await getFeatures()
  return features.map((feature) => ({ slug: feature.slug }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const features = await getFeatures()
  const feature = features.find((f) => f.slug === slug)
  if (!feature) return {}
  return buildMetadata(feature.seo, feature.path)
}

export default async function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const features = await getFeatures()
  const feature = features.find((f) => f.slug === slug)
  if (!feature) notFound()

  const platform = await getLanding('/platform')
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Platform', path: platform.path },
    { name: feature.eyebrow ?? feature.title, path: feature.path },
  ]

  return (
    <>
      <LandingTemplate page={feature} trail={trail} />
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(feature.faqs ?? []))} />
    </>
  )
}
