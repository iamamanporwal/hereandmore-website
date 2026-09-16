import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { LandingTemplate } from '@/components/templates/LandingTemplate'
import { getLanding } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, faqLd, graph } from '@/lib/seo'

const PATH = '/trust'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLanding(PATH)
  return buildMetadata(page.seo, PATH)
}

export default async function TrustPage() {
  const page = await getLanding(PATH)
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Trust & provenance', path: PATH },
  ]
  return (
    <>
      <LandingTemplate page={page} trail={trail} />
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(page.faqs ?? []))} />
    </>
  )
}
