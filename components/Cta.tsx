import Link from 'next/link'
import type { Cta as CtaType } from '@/lib/content/types'
import { Arrow } from './Icon'

export function CtaBand({ cta }: { cta: CtaType }) {
  return (
    <section className="night section" aria-labelledby="cta-heading">
      <div className="container cta">
        <div className="cta__inner">
          <div>
            <p className="eyebrow">What happens next</p>
            <h2 id="cta-heading">{cta.title}</h2>
            <p>{cta.text}</p>
          </div>
          <div className="btn-row">
            <Link className="btn btn--primary" href={cta.primary.href}>
              {cta.primary.label} <Arrow />
            </Link>
            {cta.secondary ? (
              <Link className="btn btn--secondary" href={cta.secondary.href}>
                {cta.secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
