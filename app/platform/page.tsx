import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { MapMotif } from '@/components/MapMotif'
import { LandingTemplate } from '@/components/templates/LandingTemplate'
import { getLanding } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, faqLd, graph, softwareLd } from '@/lib/seo'

const PATH = '/platform'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLanding(PATH)
  return buildMetadata(page.seo, PATH)
}

export default async function PlatformPage() {
  const page = await getLanding(PATH)
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Platform', path: PATH },
  ]

  return (
    <>
      <LandingTemplate page={page} trail={trail}>
        <figure className="diagram">
          <MapMotif />
          <figcaption>
            One chapter as the map holds it: an aim, the people and places attached to it, the work, the evidence
            it rests on, the commitment made, and the outcome an author can publish.
          </figcaption>
        </figure>
      </LandingTemplate>
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(page.faqs ?? []), softwareLd)} />
    </>
  )
}
