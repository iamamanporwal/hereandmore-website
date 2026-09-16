import Link from 'next/link'
import type { Related as RelatedType } from '@/lib/content/types'

/** Enforced on every template: no page is a dead end. */
export function Related({ items, title = 'Keep reading' }: { items?: RelatedType[]; title?: string }) {
  if (!items?.length) return null
  return (
    <section className="section--tight" aria-labelledby="related-heading">
      <p className="eyebrow" id="related-heading">
        {title}
      </p>
      <div className="related__list">
        {items.map((item) => (
          <Link className="related__item" href={item.href} key={item.href}>
            <strong>{item.label}</strong>
            {item.description ? <span>{item.description}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  )
}
