import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { LandingTemplate } from '@/components/templates/LandingTemplate'
import { getLanding } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, faqLd, graph, organizationLd } from '@/lib/seo'

const PATH = '/about'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLanding(PATH)
  return buildMetadata(page.seo, PATH)
}

export default async function AboutPage() {
  const page = await getLanding(PATH)
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'About', path: PATH },
  ]
  return (
    <>
      <LandingTemplate page={page} trail={trail} />
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(page.faqs ?? []), organizationLd)} />
    </>
  )
}
