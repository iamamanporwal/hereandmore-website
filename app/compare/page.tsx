import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CtaBand } from '@/components/Cta'
import { Arrow } from '@/components/Icon'
import { JsonLd } from '@/components/JsonLd'
import { getComparisons } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, graph } from '@/lib/seo'

const PATH = '/compare'
const trail = [
  { name: 'Home', path: '/' },
  { name: 'Compare', path: PATH },
]

export const metadata: Metadata = buildMetadata(
  {
    title: 'Compare HERE with the tools you already use',
    description:
      'Honest comparisons, including where the other product wins and which buyer should choose it. Written to be useful, not to be flattering.',
    primaryKeyword: 'HERE comparison',
    ogImageTitle: 'Honest comparisons',
  },
  PATH,
)

export default async function CompareIndex() {
  const comparisons = await getComparisons()

  return (
    <>
      <div className="container">
        <Breadcrumbs trail={trail} />
        <div style={{ paddingBlock: 'clamp(2rem, 5vw, 3.5rem) var(--space-xl)' }}>
          <p className="eyebrow">Compare</p>
          <h1 style={{ fontSize: 'var(--step-5)', maxWidth: '16ch' }}>Where we win, and where we do not</h1>
          <p className="answer" style={{ marginTop: 'var(--space-m)' }}>
            Every comparison below names the buyer who should choose the other product. HERE is early, narrow and
            opinionated; several of these tools are mature and complete at what they do. Knowing which problem you actually
            have is worth more to you than a table where we win every row.
          </p>
        </div>

        <div className="post-list">
          {comparisons.map((comparison) => (
            <Link className="post-item" href={comparison.path} key={comparison.slug}>
              <span className="tag" style={{ justifySelf: 'start' }}>
                {comparison.competitor.category}
              </span>
              <h2>{comparison.title}</h2>
              <p>{comparison.answer}</p>
              <span className="card__more">
                Read the comparison <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <CtaBand
        cta={{
          title: 'Want a comparison we have not written?',
          text: 'Tell us what you are evaluating against and we will give you a straight answer, including when the answer is "use them".',
          primary: { label: 'Ask us', href: '/demo' },
          secondary: { label: 'See the platform', href: '/platform' },
        }}
      />
      <JsonLd data={graph(breadcrumbLd(trail))} />
    </>
  )
}
