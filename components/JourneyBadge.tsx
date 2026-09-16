import Link from 'next/link'
import type { JourneyRef } from '@/lib/content/types'

/**
 * Ties an interior page back to the step of the journey it serves.
 *
 * Every page on this site is part of one story — idea to business in seven steps. Without
 * this, a visitor who arrives on a deep page has no idea which part of that story they are
 * standing in, and the page reads as a different product.
 */
export function JourneyBadge({ step }: { step?: JourneyRef }) {
  if (!step) return null
  return (
    <Link className="journey-badge" href="/#journey">
      <span className="journey-badge__n">{step.n}</span>
      <span className="journey-badge__label">{step.title}</span>
      <span className="journey-badge__all">of seven steps</span>
    </Link>
  )
}
