import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { LandingTemplate } from '@/components/templates/LandingTemplate'
import { getLanding, getPlans } from '@/lib/content/source'
import { breadcrumbLd, buildMetadata, faqLd, graph, offersLd } from '@/lib/seo'

const PATH = '/pricing'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLanding(PATH)
  return buildMetadata(page.seo, PATH)
}

export default async function PricingPage() {
  const page = await getLanding(PATH)
  const plans = await getPlans()
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: PATH },
  ]

  return (
    <>
      <LandingTemplate page={page} trail={trail}>
        <div className="plans">
          {plans.map((plan) => (
            <div className={`plan${plan.featured ? ' plan--featured' : ''}`} key={plan.name}>
              {plan.featured ? <span className="plan__badge">Most groups start here</span> : null}
              <h2 className="plan__name">{plan.name}</h2>
              <p className="plan__price">{plan.price}</p>
              <p className="plan__note">{plan.priceNote}</p>
              <p className="plan__summary">{plan.summary}</p>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link className={`btn ${plan.featured ? 'btn--primary' : 'btn--secondary'}`} href={plan.cta.href}>
                {plan.cta.label}
              </Link>
            </div>
          ))}
        </div>
      </LandingTemplate>
      <JsonLd data={graph(breadcrumbLd(trail), faqLd(page.faqs ?? []), offersLd(plans))} />
    </>
  )
}
