import Link from 'next/link'
import type { JourneyStep } from '@/content/home'
import { Arrow } from './Icon'

/**
 * The seven steps, as a single vertical run.
 *
 * The rail on the left is one continuous hairline; each step's marker fills as it comes
 * into view, so the line reads as a path being walked rather than a list being scrolled.
 */
export function Journey({ steps }: { steps: JourneyStep[] }) {
  return (
    <ol className="journey" id="journey-list">
      {steps.map((step, i) => (
        <li
          className="journey__step"
          key={step.n}
          data-reveal
          style={{ ['--i' as string]: i }}
        >
          <div className="journey__marker" aria-hidden="true">
            <span className="journey__dot" />
          </div>
          <div className="journey__body">
            <p className="journey__n">{step.n}</p>
            <h3 className="journey__title">{step.title}</h3>
            <p className="journey__text">{step.text}</p>
            {step.link ? (
              <Link className="journey__link" href={step.link.href}>
                {step.link.label} <Arrow />
              </Link>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}

/** idea → product → marketing → content → distribution → leads, as one chain. */
export function Pipeline({ stages }: { stages: string[] }) {
  return (
    <div className="pipeline" data-reveal role="img" aria-label={`One continuous journey: ${stages.join(' to ')}`}>
      {stages.map((stage, i) => (
        <div className="pipeline__stage" key={stage} style={{ ['--i' as string]: i }}>
          <span className="pipeline__dot" aria-hidden="true" />
          <span className="pipeline__label">{stage}</span>
        </div>
      ))}
    </div>
  )
}
