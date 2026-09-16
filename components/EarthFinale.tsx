import Link from 'next/link'
import type { Cta } from '@/lib/content/types'
import { EarthCanvas } from './EarthCanvas'
import { Arrow } from './Icon'

/**
 * The closing section: Earth at night, seen from orbit, cropped by the edge of the page.
 *
 * The planet itself is a WebGL fragment shader (see EarthCanvas). What is server-rendered here
 * is a compact gradient stand-in — enough that the section is never a black rectangle before
 * hydration, for a crawler, or with WebGL unavailable. The canvas cross-fades over it.
 */
export function EarthFinale({ cta, quote }: { cta: Cta; quote?: { text: string; attribution: string } }) {
  return (
    <section className="earth" aria-labelledby="earth-heading">
      <div className="earth__sky" aria-hidden="true">
        <svg className="earth__fallback" viewBox="0 0 1280 900" preserveAspectRatio="xMidYMax slice" role="presentation">
          <defs>
            <radialGradient id="ef-halo" cx="0.5" cy="0.5" r="0.5">
              <stop offset="70%" stopColor="#6fc0ea" stopOpacity="0" />
              <stop offset="77%" stopColor="#6fc0ea" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3f7fb0" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ef-globe" cx="0.32" cy="0.22" r="0.95">
              <stop offset="0%" stopColor="#123243" />
              <stop offset="35%" stopColor="#081b26" />
              <stop offset="100%" stopColor="#000305" />
            </radialGradient>
          </defs>
          <circle cx="840" cy="760" r="560" fill="url(#ef-halo)" />
          <circle cx="840" cy="760" r="430" fill="url(#ef-globe)" />
          <circle cx="840" cy="760" r="430" fill="none" stroke="#cfe9f7" strokeOpacity="0.4" strokeWidth="1.4" />
        </svg>
        <EarthCanvas />
      </div>

      <div className="container earth__inner">
        <div className="earth__copy">
          <p className="eyebrow">What happens next</p>
          <h2 id="earth-heading">{cta.title}</h2>
          <p>{cta.text}</p>
          <div className="btn-row" style={{ marginTop: 'var(--space-l)' }}>
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

        {quote ? (
          <figure className="earth__quote">
            <blockquote>{quote.text}</blockquote>
            <figcaption>{quote.attribution}</figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  )
}
