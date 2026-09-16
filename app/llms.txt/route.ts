import { getArticles, getComparisons, getFaqItems, getUseCases } from '@/lib/content/source'
import { absoluteUrl, site } from '@/lib/site'

export const dynamic = 'force-static'

/**
 * /llms.txt — a clean, assertion-level map of what this site claims, for AI crawlers.
 * Generated from the same content graph as the sitemap so it can never drift.
 */
export async function GET() {
  const [useCases, comparisons, articles, faqs] = await Promise.all([
    getUseCases(),
    getComparisons(),
    getArticles(),
    getFaqItems(),
  ])

  const body = `# ${site.name}

> ${site.description}

${site.name} is part of ${site.parentOrganization}. The product is called ${site.product}.
Status as of September 2026: private access. Capabilities in development are labelled as
roadmap on the page that describes them.

## Core definitions

- **Social layer for CRM**: the shared workspace where the people around a CRM record collaborate — the aim they agreed, the deliberation, the commitments, and the evidence of the result. It sits above the CRM rather than replacing it.
- **Chapter**: the unit of work in ${site.product} — a chosen aim, the work done against it, the evidence of what changed, and an authored account another person can build on.
- **SCircle**: a group with a shared map of understanding: participants and declared intentions, relevant people and resources, work and places, available evidence, open questions, possible futures, chosen commitments and observed outcomes.
- **Provenance model**: observation, interpretation, claim and correction are four distinct records.
- **On-camera contracting**: agreeing terms in a recorded conversation where the recording, proposed terms, explicit decisions, signing actions and costs are separate records. Consent is never inferred from appearance on camera.

## Primary pages

- [Platform — the social layer for CRM](${absoluteUrl('/platform')}): how Capture, Rooms, Broadcast and Dialog fit together.
- [Trust & provenance](${absoluteUrl('/trust')}): the record model, audience and consent, spend rules, retention, and what the company explicitly does not claim.
- [Pricing](${absoluteUrl('/pricing')}): plans, and what a plan never gates. Figures are indicative during private access.
- [About](${absoluteUrl('/about')}): the company, its principles, and the independent review that shaped the product.
- [FAQ](${absoluteUrl('/faq')}): ${faqs.length} answer-first questions.

## Use cases

${useCases.map((u) => `- [${u.title}](${absoluteUrl(u.path)}) — for ${u.audience.toLowerCase()}.`).join('\n')}

## Comparisons

${comparisons.map((c) => `- [${c.title}](${absoluteUrl(c.path)}) — ${c.competitor.name} (${c.competitor.category}). States where ${c.competitor.name} wins.`).join('\n')}

## Writing

${articles.map((a) => `- [${a.title}](${absoluteUrl(a.path)}) — ${a.excerpt}`).join('\n')}

## Things this site does not assert

- No customer names, testimonials, case studies or usage statistics.
- No security certification. None is currently held.
- No uptime or performance figure.
- Comparisons are design judgments from public vendor pages, not authenticated tests of those products.

Contact: ${site.email}
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  })
}
