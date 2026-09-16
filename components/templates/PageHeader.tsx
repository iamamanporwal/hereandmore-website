import Link from 'next/link'
import type { ReactNode } from 'react'
import { JourneyBadge } from '../JourneyBadge'
import { Breadcrumbs, type Crumb } from '../Breadcrumbs'
import type { JourneyRef } from '@/lib/content/types'
import { Arrow } from '../Icon'

/**
 * Shared page opening. Guarantees the same document order on every template:
 * breadcrumb → eyebrow → single h1 → answer-first paragraph → actions.
 * That order is what makes the answer block reliably extractable.
 */
export function PageHeader({
  trail,
  eyebrow,
  title,
  accent,
  answer,
  primary,
  secondary,
  aside,
  step,
}: {
  trail: Crumb[]
  step?: JourneyRef
  eyebrow?: string
  title: string
  accent?: string
  answer: string
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string }
  aside?: ReactNode
}) {
  return (
    <div className="container">
      <Breadcrumbs trail={trail} />
      <div className={aside ? 'hero__grid' : undefined} style={{ paddingBlock: 'clamp(2rem, 5vw, 3.5rem) var(--space-xl)' }}>
        <div>
          <JourneyBadge step={step} />
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 style={{ fontSize: 'var(--step-5)', maxWidth: '18ch' }}>
            {title}
            {accent ? <span className="accent"> {accent}</span> : null}
          </h1>
          <p className="answer" style={{ marginTop: 'var(--space-m)' }}>
            {answer}
          </p>
          {primary ? (
            <div className="btn-row hero__actions">
              <Link className="btn btn--primary" href={primary.href}>
                {primary.label} <Arrow />
              </Link>
              {secondary ? (
                <Link className="btn btn--secondary" href={secondary.href}>
                  {secondary.label}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
        {aside ? <div className="hero__aside">{aside}</div> : null}
      </div>
    </div>
  )
}
