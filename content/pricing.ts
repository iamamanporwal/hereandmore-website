import type { LandingPage, PricingPlan } from '@/lib/content/types'

/**
 * Commercial terms are not published while HERE & More is in private access.
 *
 * These tiers describe what each plan *contains*, which is true and useful, and quote no
 * figure we cannot stand behind. When the real numbers are agreed, set `price` and `amount`
 * on each plan — `amount` feeds Offer structured data, and a null amount is reported to
 * search engines as "price on application" rather than as free.
 */
export const plans: PricingPlan[] = [
  {
    name: 'Circle',
    price: 'Free',
    priceNote: 'one circle, up to 5 people',
    amount: 0,
    currency: 'GBP',
    summary: 'One idea, carried far enough to find out whether the loop holds for you.',
    features: [
      'One SCircle, up to 5 participants',
      'Your idea through to a product plan',
      'One Guardian build',
      'Capture with full provenance',
      'Export everything you put in, always',
    ],
    cta: { label: 'Start with an idea', href: '/demo' },
  },
  {
    name: 'Studio',
    price: 'Talk to us',
    priceNote: 'per participant, per month — quoted for your group',
    amount: null,
    currency: 'GBP',
    summary: 'For teams taking real products from an idea to customers, repeatedly.',
    features: [
      'Unlimited SCircles and chapters',
      'Guardian builds, authorised job by job',
      'Client-facing and internal audiences',
      'Broadcast and authored editions',
      'Distribution across seven platforms',
      'Permissioned integrations, receipts on every share',
    ],
    cta: { label: 'Get a quote', href: '/demo' },
    featured: true,
  },
  {
    name: 'World',
    price: 'Talk to us',
    priceNote: 'organisations, networks and platform partners',
    amount: null,
    currency: 'GBP',
    summary: 'For groups coordinating across services, with their own authority and access rules.',
    features: [
      'Everything in Studio',
      'Cross-network SCircle integrations',
      'Dialog on-camera contracting',
      'Custom reader scopes and retention',
      'Named custodian and continuity arrangements',
      'Exportable preservation packages',
    ],
    cta: { label: 'Talk to us', href: '/demo' },
  },
]

export const pricing: LandingPage = {
  _type: 'landing',
  slug: 'pricing',
  path: '/pricing',
  updated: '2026-09-14',
  seo: {
    title: 'Pricing — HERE & More',
    description:
      'Plans for a shared map, from a free circle to organisations coordinating across services. What a plan covers, and what we will never gate behind one.',
    primaryKeyword: 'HERE pricing',
    ogImageTitle: 'Pricing',
  },
  eyebrow: 'Pricing',
  title: 'Pay for capability, not for access to yourself',
  answer:
    'HERE & More is priced per participant, per month, with a free tier for one small circle. Figures are quoted directly while the product is in private access, because we would rather give you a real number for your group than publish one we have to walk back. Access to your own records and a full export is never gated behind a plan.',
  hero: {
    headline: 'Pay for capability,',
    headlineAccent: 'not for exit.',
    sub: 'Three plans, and one rule: nothing you created is ever held hostage by the tier you are on. Tell us your group size and what you are building, and you will get a real figure.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'See what you get', href: '/platform' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'What a plan never gates', id: 'never' },
    {
      _type: 'list',
      style: 'bullet',
      items: [
        'Your identity and your own records.',
        'A complete export of what you put in, in a portable form.',
        'The provenance attached to your evidence.',
        'The ability to correct or withdraw something sensitive.',
      ],
    },
    {
      _type: 'paragraph',
      text: 'Access to your own identity or a basic export should never depend on continued audience performance. That is a principle, not a promotional offer.',
    },
    { _type: 'heading', level: 2, text: 'Spending is separate from subscribing', id: 'spend' },
    {
      _type: 'paragraph',
      text: 'A subscription buys capability. Jobs that cost real money — a guardian build, video editing, a live production, a Dialog matter — are authorised one at a time, with a named payer, a budget, a validity period and stop conditions. Opening a recording or selecting a card never starts one. [Read the spend rules](/trust#spend).',
    },
    {
      _type: 'callout',
      tone: 'limit',
      title: 'Why there is no price list yet',
      text: 'HERE & More is in private access and commercial terms are being set with the first builders using it. Rather than publish a figure we would have to revise, we quote each group directly — normally within a day. A displayed plan would not in any case prove a working checkout or payout path.',
    },
  ],
  faqs: [
    {
      question: 'How much does HERE cost?',
      answer:
        'There is a free tier for one circle of up to five participants, a per-participant monthly plan for teams, and negotiated terms for organisations and platform partners. Figures are quoted directly rather than published while HERE & More is in private access — ask and you will normally have one within a day.',
    },
    {
      question: 'What happens to my data if I stop paying?',
      answer:
        'You keep the ability to export what you put in. Preservation of a record needs a real operating model — exportable packages, independent copies, a named custodian and format migration — and a lapsed subscription is not a reason to make your own history unreachable.',
      readMore: { label: 'Retention and continuity', href: '/trust#retention' },
    },
    {
      question: 'Do I pay for Dialog separately?',
      answer:
        'Yes. Dialog expenditure is authorised on its own, per matter, with its own budget and stop conditions. A HERE subscription does not buy Dialog intelligence, and a Dialog matter does not require a HERE subscription.',
      readMore: { label: 'How Dialog works', href: '/platform/dialog' },
    },
  ],
  related: [
    { label: 'Trust & provenance', href: '/trust', description: 'Spend rules, retention and access' },
    { label: 'Platform overview', href: '/platform', description: 'What you are actually buying' },
    { label: 'FAQ', href: '/faq', description: 'Short answers to the common questions' },
  ],
  cta: {
    title: 'Get a real number',
    text: 'Tell us your group size and what you are trying to make happen. We will quote the capability, not the seat count.',
    primary: { label: 'Request access', href: '/demo' },
  },
}
