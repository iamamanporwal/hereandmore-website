import Link from 'next/link'
import type { ReactNode } from 'react'
import type { LandingPage } from '@/lib/content/types'
import { BlockContent } from '../blocks/BlockContent'
import { Breadcrumbs, type Crumb } from '../Breadcrumbs'
import { CtaBand } from '../Cta'
import { EarthFinale } from '../EarthFinale'
import { Faq } from '../Faq'
import { Arrow, Icon } from '../Icon'
import { PlantCanvas } from '../PlantCanvas'
import { PlantFallback } from '../PlantFallback'
import { Related } from '../Related'
import { PageHeader } from './PageHeader'

/**
 * LANDING PAGE TEMPLATE
 * Used by: home, /platform, every feature page, /pricing, /trust, /faq, /about, /demo, legal.
 * `variant="hero"` renders the full-bleed opening with stats and the map motif;
 * `variant="page"` renders the compact opening used everywhere else.
 */
export function LandingTemplate({
  page,
  trail,
  variant = 'page',
  finale = 'band',
  children,
  afterBody,
}: {
  page: LandingPage
  trail: Crumb[]
  variant?: 'hero' | 'page'
  /** 'earth' renders the cinematic closing section instead of the plain night band. */
  finale?: 'band' | 'earth'
  /** Injected between the answer and the body — used for interactive sections. */
  children?: ReactNode
  /** Injected after the body, before the FAQ — used for pricing tables, plan grids. */
  afterBody?: ReactNode
}) {
  return (
    <>
      {variant === 'hero' ? (
        <section className="hero">
          <div className="container">
            <div className="hero__grid">
              <div>
                {page.eyebrow ? <p className="eyebrow">{page.eyebrow}</p> : <p className="eyebrow">A more purposeful internet</p>}
                <h1>
                  {page.hero.headline}{' '}
                  {page.hero.headlineAccent ? <span className="accent">{page.hero.headlineAccent}</span> : null}
                </h1>
                <p className="hero__sub">{page.hero.sub}</p>
                <div className="btn-row hero__actions">
                  <Link className="btn btn--primary" href={page.hero.primary.href}>
                    {page.hero.primary.label} <Arrow />
                  </Link>
                  {page.hero.secondary ? (
                    <Link className="btn btn--secondary" href={page.hero.secondary.href}>
                      {page.hero.secondary.label}
                    </Link>
                  ) : null}
                </div>
                {page.hero.stats ? (
                  <dl className="hero__stats">
                    {page.hero.stats.map((stat) => (
                      <div className="hero__stat" key={stat.label}>
                        <dt className="visually-hidden">{stat.label}</dt>
                        <dd style={{ margin: 0 }}>
                          <span className="value">{stat.value}</span>
                          <span className="label">{stat.label}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
              <div className="hero__aside">
                <div className="plant-stage">
                  <PlantFallback />
                  <PlantCanvas />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-l)', borderTop: '1px solid var(--line)' }}>
              <p className="eyebrow">What HERE is</p>
              <p className="answer">{page.answer}</p>
            </div>
          </div>
        </section>
      ) : (
        <PageHeader
          trail={trail}
          step={page.journeyStep}
          eyebrow={page.eyebrow}
          title={page.hero.headline}
          accent={page.hero.headlineAccent}
          answer={page.answer}
          primary={page.hero.primary}
          secondary={page.hero.secondary}
        />
      )}

      {variant === 'hero' ? null : (
        <div className="container">
          <p className="lead" style={{ maxWidth: '52ch' }}>
            {page.hero.sub}
          </p>
        </div>
      )}

      {children ? (
        <section className="container" style={{ paddingBlock: 'var(--space-l)' }}>
          {children}
        </section>
      ) : null}

      {page.body.length ? (
        <section className="section--tight">
          <div className="container">
            <BlockContent blocks={page.body} />
          </div>
        </section>
      ) : null}

      {afterBody ? (
        <section className="container" style={{ paddingBlock: 'var(--space-l)' }}>
          {afterBody}
        </section>
      ) : null}

      {page.sections?.map((section) => (
        <section className="section section--bordered" key={section.title}>
          <div className="container">
            {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
            <h2 style={{ fontSize: 'var(--step-4)', maxWidth: '16ch' }}>{section.title}</h2>
            {section.text ? (
              <p className="lead" style={{ marginTop: 'var(--space-s)' }}>
                {section.text}
              </p>
            ) : null}
            {section.features ? (
              <div className="grid grid--4" style={{ marginTop: 'var(--space-l)' }}>
                {section.features.map((feature) =>
                  feature.href ? (
                    <Link className="card" href={feature.href} key={feature.title}>
                      {feature.icon ? (
                        <span className="card__icon">
                          <Icon name={feature.icon} />
                        </span>
                      ) : null}
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                      <span className="card__more">
                        Read more <Arrow />
                      </span>
                    </Link>
                  ) : (
                    <div className="card" key={feature.title}>
                      {feature.icon ? (
                        <span className="card__icon">
                          <Icon name={feature.icon} />
                        </span>
                      ) : null}
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </div>
                  ),
                )}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {page.faqs?.length ? (
        <section className="section--tight">
          <div className="container">
            <Faq items={page.faqs} title={page.path === '/faq' ? null : 'Questions'} />
          </div>
        </section>
      ) : null}

      <div className="container">
        <Related items={page.related} />
      </div>

      {page.cta ? (
        finale === 'earth' ? (
          <EarthFinale
            cta={page.cta}
            quote={{
              text: 'A record worth inheriting is built one chapter at a time.',
              attribution: 'HERE & More',
            }}
          />
        ) : (
          <CtaBand cta={page.cta} />
        )
      ) : null}
    </>
  )
}
