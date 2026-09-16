import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { AccessForm } from '@/components/AccessForm'
import { LandingTemplate } from '@/components/templates/LandingTemplate'
import { getLanding } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, faqLd, graph } from '@/lib/seo'
import { site } from '@/lib/site'

const PATH = '/demo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLanding(PATH)
  return buildMetadata(page.seo, PATH)
}

export default async function DemoPage() {
  const page = await getLanding(PATH)
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Request access', path: PATH },
  ]

  return (
    <>
      <LandingTemplate page={page} trail={trail}>
        <AccessForm />
      </LandingTemplate>
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(page.faqs ?? []))} />
    </>
  )
}
