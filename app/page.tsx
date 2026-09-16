import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { Journey, Pipeline } from '@/components/Journey'
import { LandingTemplate } from '@/components/templates/LandingTemplate'
import { journey, pipeline } from '@/content/home'
import { getLanding } from '@/lib/content/source'
import { buildMetadata, faqLd, graph } from '@/lib/seo'
import { absoluteUrl, site } from '@/lib/site'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLanding('/')
  return buildMetadata(page.seo, '/')
}

export default async function HomePage() {
  const page = await getLanding('/')

  /** The seven steps, described for a crawler exactly as they are for a reader. */
  const howToLd = {
    '@type': 'HowTo',
    '@id': `${absoluteUrl('/')}#journey`,
    name: 'From an idea to a business with HERE & More',
    description: page.answer,
    totalTime: 'P1D',
    step: journey.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.text,
      url: `${absoluteUrl('/')}#step-${s.n}`,
    })),
  }

  return (
    <>
      <LandingTemplate page={page} trail={[{ name: 'Home', path: '/' }]} variant="hero" finale="earth">
        <section className="section--tight split split--sticky" id="journey" aria-labelledby="journey-heading">
          <div data-reveal>
            <p className="eyebrow">From idea to business</p>
            <h2 id="journey-heading" style={{ fontSize: 'var(--step-4)', maxWidth: '12ch' }}>
              How does it actually work?
            </h2>
            <p className="lead" style={{ marginTop: 'var(--space-s)' }}>
              Seven steps. Each one hands the next everything it already knows, so nothing about your
              product has to be explained twice.
            </p>
            <a className="btn btn--secondary" href="/demo" style={{ marginTop: 'var(--space-l)' }}>
              Start with an idea
            </a>
          </div>
          <Journey steps={journey} />
        </section>

        <section className="section big-idea" aria-labelledby="big-idea-heading" data-reveal>
          <p className="eyebrow">The big idea</p>
          <h2 id="big-idea-heading">
            You bring the idea.
            <span className="italic big-idea__line">We help turn it into a business.</span>
          </h2>
          <p>Idea, product, marketing, content, distribution, leads — one continuous journey, not six tools.</p>
          <Pipeline stages={pipeline} />
        </section>
      </LandingTemplate>
      {page.faqs ? <JsonLd data={graph(faqLd(page.faqs), howToLd)} /> : null}
    </>
  )
}
