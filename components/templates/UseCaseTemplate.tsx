import type { UseCase } from '@/lib/content/types'
import { BlockContent } from '../blocks/BlockContent'
import type { Crumb } from '../Breadcrumbs'
import { CtaBand } from '../Cta'
import { Faq } from '../Faq'
import { Related } from '../Related'
import { PageHeader } from './PageHeader'

/**
 * USE-CASE TEMPLATE
 * Shape: audience → the situation today → outcomes → the workflow → detail → FAQ.
 * The "problem" section is written in the reader's words, which is what makes the
 * page rank for how people actually search and worth quoting when they ask an assistant.
 */
export function UseCaseTemplate({ useCase, trail }: { useCase: UseCase; trail: Crumb[] }) {
  return (
    <>
      <PageHeader
        trail={trail}
        step={useCase.journeyStep}
        eyebrow={`${useCase.eyebrow ?? 'Use case'} · ${useCase.audience}`}
        title={useCase.title}
        answer={useCase.answer}
        primary={useCase.cta?.primary}
        secondary={useCase.cta?.secondary}
      />

      <section className="section--tight">
        <div className="container">
          <div className="outcome-row">
            {useCase.outcomes.map((outcome) => (
              <div className="outcome" key={outcome.label}>
                <span className="value">{outcome.value}</span>
                <span className="label">{outcome.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sunken">
        <div className="container">
          <p className="eyebrow">The situation today</p>
          <h2 style={{ fontSize: 'var(--step-4)', maxWidth: '16ch' }}>What this usually looks like</h2>
          <div className="grid grid--3" style={{ marginTop: 'var(--space-l)' }}>
            {useCase.problem.map((item) => (
              <div className="card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split split--sticky">
          <div>
            <p className="eyebrow">How it runs</p>
            <h2 style={{ fontSize: 'var(--step-4)' }}>The workflow</h2>
            <p className="lead" style={{ marginTop: 'var(--space-s)' }}>
              Six moves. Each one leaves a record the next person can read.
            </p>
          </div>
          <ol className="steps" style={{ listStyle: 'none', padding: 0 }}>
            {useCase.workflow.map((step) => (
              <li className="step" key={step.title}>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {useCase.body.length ? (
        <section className="section--tight">
          <div className="container">
            <BlockContent blocks={useCase.body} />
          </div>
        </section>
      ) : null}

      {useCase.faqs?.length ? (
        <section className="section--tight">
          <div className="container">
            <Faq items={useCase.faqs} />
          </div>
        </section>
      ) : null}

      <div className="container">
        <Related items={useCase.related} />
      </div>

      {useCase.cta ? <CtaBand cta={useCase.cta} /> : null}
    </>
  )
}
