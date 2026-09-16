import type { LandingPage } from '@/lib/content/types'

export interface JourneyStep {
  n: string
  title: string
  text: string
  /** Where this step already exists in the product today. */
  link?: { label: string; href: string }
}

/** The seven steps, in the order a customer lives them. This is the spine of the page. */
export const journey: JourneyStep[] = [
  {
    n: '01',
    title: 'Start with an idea',
    text: 'Have an idea for a product or an online business? Tell us what you want to build, in your own words. No brief, no spec, no forms.',
  },
  {
    n: '02',
    title: 'Talk to your AI product manager',
    text: 'It asks the questions a good product manager would ask, understands what you actually mean, and turns the conversation into a detailed product plan.',
    link: { label: 'How a conversation becomes a commitment', href: '/platform/rooms' },
  },
  {
    n: '03',
    title: 'We build it',
    text: 'The plan goes to our Guardians, who turn it into a working product. Your first version arrives within 24 hours.',
  },
  {
    n: '04',
    title: 'Keep improving',
    text: 'Review it, give feedback, ask for changes, keep building. Your entire product context stays with you — every decision, every reason, every version.',
    link: { label: 'What the record keeps', href: '/trust' },
  },
  {
    n: '05',
    title: 'Get ready to launch',
    text: 'When the product is ready, your AI marketing manager learns your audience, your market, your positioning and your goals.',
  },
  {
    n: '06',
    title: 'Create and distribute',
    text: 'Generate content and go live across X, YouTube, Instagram, TikTok, Snapchat, Twitch and Kick — from one place.',
    link: { label: 'How publishing works', href: '/platform/broadcast' },
  },
  {
    n: '07',
    title: 'Find your customers',
    text: 'Everything we already know about your product builds a targeted lead-generation pipeline, connected to the systems you run on.',
    link: { label: 'The social layer for CRM', href: '/platform' },
  },
]

export const pipeline = ['Idea', 'Product', 'Marketing', 'Content', 'Distribution', 'Leads']

export const home: LandingPage = {
  _type: 'landing',
  slug: 'home',
  path: '/',
  updated: '2026-09-14',
  seo: {
    title: 'HERE & More — from an idea to a business',
    description:
      'Tell us what you want to build. An AI product manager plans it, Guardians build it, and the same context carries through marketing, content and customers.',
    primaryKeyword: 'HERE & More',
    ogImageTitle: 'You bring the idea. We build the business.',
  },
  eyebrow: 'From idea to business',
  title: 'You bring the idea. We build the business.',
  answer:
    'HERE & More turns an idea into a working business in one continuous journey. You describe what you want to build, an AI product manager turns that conversation into a product plan, Guardians build the first version within 24 hours, and the same context then carries through marketing, content, distribution and finding your first customers.',
  hero: {
    headline: 'You bring the idea.',
    headlineAccent: 'We build the business.',
    sub: 'Seven steps from a sentence you say out loud to a product with customers. Nothing is handed off to a stranger, and nothing you explain has to be explained twice.',
    primary: { label: 'Start with an idea', href: '/demo' },
    secondary: { label: 'See how it works', href: '#journey' },
    stats: [
      { value: '24h', label: 'to your first version' },
      { value: '7', label: 'platforms, one place' },
      { value: '1', label: 'continuous journey' },
    ],
  },
  body: [],
  faqs: [
    {
      question: 'What does HERE & More actually do?',
      answer:
        'It takes an idea and carries it to a business. An AI product manager turns your conversation into a product plan, Guardians build the first working version, and the same context then drives your marketing, your content, your distribution across seven platforms, and your lead pipeline — without you re-explaining the product at each stage.',
    },
    {
      question: 'Who are the Guardians?',
      answer:
        'Guardians are the builders who turn an approved product plan into a working product. A build is a job you authorise: it has a named payer, a budget, a scope and a stop condition, and it never starts as a side effect of a conversation.',
      readMore: { label: 'How spend is authorised', href: '/trust#spend' },
    },
    {
      question: 'Do I keep my product context if I leave?',
      answer:
        'Yes. Every decision, its reason, the evidence behind it and every version belong to you, and a full export is available on every plan. Access to your own records is never conditional on staying subscribed.',
      readMore: { label: 'What a plan never gates', href: '/pricing#never' },
    },
    {
      question: 'Is this available today?',
      answer:
        'HERE & More is in private access as of September 2026 while the first complete journey is verified with early builders. Each page labels what is shipped and what is still roadmap, and we will tell you which is which before you commit anything.',
      readMore: { label: 'Request access', href: '/demo' },
    },
  ],
  related: [
    { label: 'The platform', href: '/platform', description: 'What runs underneath the journey' },
    { label: 'Trust & provenance', href: '/trust', description: 'What the record keeps, and what it never does quietly' },
    { label: 'Pricing', href: '/pricing', description: 'Plans, and what a plan never gates' },
  ],
  cta: {
    title: 'Tell us what you want to build',
    text: 'One idea, described in your own words. You will have a product plan back before you have finished explaining it twice.',
    primary: { label: 'Start with an idea', href: '/demo' },
    secondary: { label: 'Read the pricing', href: '/pricing' },
  },
}
