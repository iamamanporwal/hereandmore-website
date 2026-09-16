import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { LandingTemplate } from '@/components/templates/LandingTemplate'
import { getLanding } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, graph } from '@/lib/seo'

const PATH = '/legal/terms'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLanding(PATH)
  return buildMetadata(page.seo, PATH)
}

export default async function TermsPage() {
  const page = await getLanding(PATH)
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Legal', path: '/legal/privacy' },
    { name: 'Terms of service', path: PATH },
  ]
  return (
    <>
      <LandingTemplate page={page} trail={trail} />
      <JsonLd data={graph(breadcrumbLd(trail))} />
    </>
  )
}
