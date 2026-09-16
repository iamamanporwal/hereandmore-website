import Link from 'next/link'
import type { FaqItem } from '@/lib/content/types'
import { RichText } from './blocks/RichText'

/**
 * Native <details> accordion: keyboard accessible, findable by in-page search,
 * fully functional with JavaScript disabled, and zero client JS.
 */
export function Faq({ items, headingLevel = 2, title = 'Questions' }: { items: FaqItem[]; headingLevel?: 2 | 3; title?: string | null }) {
  if (!items.length) return null
  const Heading = `h${headingLevel}` as 'h2' | 'h3'

  const grouped = items.reduce<Record<string, FaqItem[]>>((acc, item) => {
    const key = item.category ?? ''
    ;(acc[key] ??= []).push(item)
    return acc
  }, {})
  const categories = Object.keys(grouped)
  const hasCategories = categories.some(Boolean)

  return (
    <section className="stack-m" aria-labelledby="faq-heading">
      {title ? (
        <Heading id="faq-heading" style={{ fontSize: 'var(--step-3)' }}>
          {title}
        </Heading>
      ) : (
        <h2 id="faq-heading" className="visually-hidden">
          Frequently asked questions
        </h2>
      )}

      {categories.map((category, categoryIndex) => (
        <div key={category || 'default'}>
          {hasCategories && category ? <p className="eyebrow" style={{ marginTop: 'var(--space-l)' }}>{category}</p> : null}
          {/* No content-visibility here: FAQ answers are the pages' most-quoted content and must always be painted. */}
          <div className="faq">
            {grouped[category].map((item, index) => (
              <details
                className="faq__item"
                key={item.question}
                name="faq"
                /* The first answer is open on load: collapsed content is less likely to
                   qualify for rich results, and this is the one most readers want. */
                open={categoryIndex === 0 && index === 0}
              >
                <summary>
                  <h3 style={{ display: 'inline', font: 'inherit' }}>{item.question}</h3>
                </summary>
                <div className="faq__answer">
                  <p>
                    <RichText text={item.answer} />
                  </p>
                  {item.readMore ? (
                    <p style={{ marginTop: 'var(--space-xs)' }}>
                      <Link href={item.readMore.href}>{item.readMore.label} →</Link>
                    </p>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
