import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/Cta'
import { Arrow } from '@/components/Icon'
import { JsonLd } from '@/components/JsonLd'
import { getUseCases } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, graph } from '@/lib/seo'

const PATH = '/use-cases'
const trail = [
  { name: 'Home', path: '/' },
  { name: 'Use cases', path: PATH },
]

export const metadata: Metadata = buildMetadata(
  {
    title: 'Use cases — who HERE is for',
    description:
      'Three groups who need a shared map: studios running client work, community operators whose members want to build, and teams working in public.',
    primaryKeyword: 'HERE use cases',
    ogImageTitle: 'Who HERE is for',
  },
  PATH,
)

export default async function UseCasesIndex() {
  const useCases = await getUseCases()

  return (
    <>
      <div className="container">
        <Breadcrumbs trail={trail} />
        <div style={{ paddingBlock: 'clamp(2rem, 5vw, 3.5rem) var(--space-xl)' }}>
          <p className="eyebrow">Use cases</p>
          <h1 style={{ fontSize: 'var(--step-5)', maxWidth: '16ch' }}>Groups who owe each other something</h1>
          <p className="answer" style={{ marginTop: 'var(--space-m)' }}>
            HERE is built for groups whose work has consequences for other people: studios and agencies running client
            engagements, community operators turning discussion into commitments, and teams whose work is worth following
            in public. If nobody will ever ask you why you decided something, you probably do not need us.
          </p>
        </div>

        <div className="post-list">
          {useCases.map((useCase) => (
            <Link className="post-item" href={useCase.path} key={useCase.slug}>
              <span className="tag" style={{ justifySelf: 'start' }}>
                {useCase.audience}
              </span>
              <h2>{useCase.title}</h2>
              <p>{useCase.answer}</p>
              <span className="card__more">
                Read the use case <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <CtaBand
        cta={{
          title: 'Not sure which one you are?',
          text: 'Tell us what your group is trying to make happen and we will tell you honestly whether HERE fits it yet.',
          primary: { label: 'Request access', href: '/demo' },
          secondary: { label: 'See the platform', href: '/platform' },
        }}
      />
      <JsonLd data={graph(breadcrumbLd(trail))} />
    </>
  )
}
