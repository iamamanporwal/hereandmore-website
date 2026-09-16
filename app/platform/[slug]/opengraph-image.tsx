import { getFeatures } from '@/lib/content/source'
import { ogAlt, ogContentType, ogSize, renderOg } from '@/lib/og'

export const alt = ogAlt
export const size = ogSize
export const contentType = ogContentType

export async function generateStaticParams() {
  const features = await getFeatures()
  return features.map((feature) => ({ slug: feature.slug }))
}

export default async function Image({ params }: { params: { slug: string } }) {
  const features = await getFeatures()
  const feature = features.find((f) => f.slug === params.slug)
  return renderOg({ eyebrow: feature?.eyebrow ?? 'Platform', title: feature?.seo.ogImageTitle ?? feature?.title ?? 'Platform' })
}
