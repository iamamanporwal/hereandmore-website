import type { Comparison } from '@/lib/content/types'
import { BlockContent } from '../blocks/BlockContent'
import type { Crumb } from '../Breadcrumbs'
import { CtaBand } from '../Cta'
import { Faq } from '../Faq'
import { Related } from '../Related'
import { site } from '@/lib/site'
import { PageHeader } from './PageHeader'

/**
 * COMPARISON TEMPLATE
 * Leads with the verdict, states where the competitor wins in their own right, and
 * names the buyer who should choose them. A comparison page that never concedes anything
 * is not trusted by readers and is not quoted by assistants.
 */
export function ComparisonTemplate({ comparison, trail }: { comparison: Comparison; trail: Crumb[] }) {
  const them = comparison.competitor.name

  return (
    <>
      <PageHeader
        trail={trail}
        step={comparison.journeyStep}
        eyebrow={`Comparison · ${comparison.competitor.category}`}
        title={comparison.title}
        answer={comparison.answer}
        primary={comparison.cta?.primary}
        secondary={{ label: 'See the platform', href: '/platform' }}
      />

      <section className="section--tight">
        <div className="container">
          <div className="verdict">
            <div className="verdict__col">
              <h2>Where {site.product} wins</h2>
              <ul>
                {comparison.summary.hereWins.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="verdict__col verdict--them">
              <h2>Where {them} wins</h2>
              <ul>
                {comparison.summary.theyWin.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="callout callout--limit" style={{ marginTop: 'var(--space-m)' }}>
            <p className="callout__title">Choose {them} if…</p>
            <p>{comparison.summary.chooseThemIf}</p>
            {comparison.competitor.url ? (
              <p style={{ marginTop: 'var(--space-s)' }}>
                {/* We say this page is judged from their public pages, so we link them.
                    A comparison that will not point at its source is not evidence. */}
                <a href={comparison.competitor.url} rel="noopener nofollow" target="_blank">
                  See {them}’s own product pages
                </a>
              </p>
            ) : null}
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="eyebrow">Side by side</p>
          <h2 style={{ fontSize: 'var(--step-4)', marginBottom: 'var(--space-m)' }}>
            {site.product} vs {them}
          </h2>
          <div className="table-wrap">
            <table className="matrix">
              <caption>Feature comparison, with the places {them} is ahead marked plainly.</caption>
              <thead>
                <tr>
                  <th scope="col">Criterion</th>
                  <th scope="col">{site.product}</th>
                  <th scope="col">{them}</th>
                </tr>
              </thead>
              <tbody>
                {comparison.matrix.map((row) => (
                  <tr key={row.criterion}>
                    <th scope="row">{row.criterion}</th>
                    <td>{row.here}</td>
                    <td>
                      {row.them}
                      {row.note ? <span className="note">{row.note}</span> : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {comparison.body.length ? (
        <section className="section--tight">
          <div className="container">
            <BlockContent blocks={comparison.body} />
          </div>
        </section>
      ) : null}

      {comparison.faqs?.length ? (
        <section className="section--tight">
          <div className="container">
            <Faq items={comparison.faqs} />
          </div>
        </section>
      ) : null}

      <div className="container">
        <Related items={comparison.related} />
      </div>

      {comparison.cta ? <CtaBand cta={comparison.cta} /> : null}
    </>
  )
}
