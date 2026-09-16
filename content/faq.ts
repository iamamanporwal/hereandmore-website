import type { FaqItem, LandingPage } from '@/lib/content/types'

export const faqItems: FaqItem[] = [
  {
    category: 'The basics',
    question: 'What is HERE & More?',
    answer:
      'HERE & More is a product company building HERE, a social layer for CRM-based platforms and services. HERE gives a group one shared map of aims, work, evidence and commitments, so decisions keep their reasons and finished work keeps its provenance.',
    readMore: { label: 'About the company', href: '/about' },
  },
  {
    category: 'The basics',
    question: 'How does HERE & More turn an idea into a business?',
    answer:
      'In seven steps. You describe what you want to build; an AI product manager turns that conversation into a product plan; Guardians build the first working version within 24 hours; you review and keep improving; an AI marketing manager learns your audience and positioning; content goes live across seven platforms from one place; and everything already known about your product builds a targeted lead pipeline.',
    readMore: { label: 'See the seven steps', href: '/#journey' },
  },
  {
    category: 'The basics',
    question: 'Who are the Guardians?',
    answer:
      'Guardians are the builders who turn an approved product plan into a working product. A build is a job you authorise: it has a named payer, a budget, a defined scope and a stop condition, and it never starts as a side effect of a conversation.',
    readMore: { label: 'How spend is authorised', href: '/trust#spend' },
  },
  {
    category: 'The basics',
    question: 'What does the AI product manager actually do?',
    answer:
      'It asks the questions a good product manager would ask, works out what you actually mean, and turns the conversation into a detailed product plan with a named decision owner, constraints and acceptance criteria recorded before any building starts.',
    readMore: { label: 'How a conversation becomes a commitment', href: '/platform/rooms' },
  },
  {
    category: 'The basics',
    question: 'What is a social layer for CRM?',
    answer:
      'A social layer for CRM is the shared workspace where the people around a record collaborate: the aim they agreed, the deliberation that shaped it, who committed to what, and the evidence of the result. The CRM stays the system of record for the account; the social layer holds the understanding behind it.',
    readMore: { label: 'The full definition', href: '/blog/what-is-a-social-layer-for-crm' },
  },
  {
    category: 'The basics',
    question: 'What is a chapter?',
    answer:
      'A chapter is the unit of work in HERE: a chosen aim, the paths considered, the decisions, the collaborators, the work, the evidence, an authored account and offers to participate. It can be private, shared with a small group, published, supported or licensed — and it does not have to be a video at any stage.',
    readMore: { label: 'How chapters work', href: '/platform' },
  },
  {
    category: 'The basics',
    question: 'What is an SCircle?',
    answer:
      'An SCircle is a group with a shared map of understanding: the participants and their declared intentions, the relevant people and resources, the work and places, the available evidence, the open questions, the possible futures, the chosen commitments and the observed outcomes.',
    readMore: { label: 'The vocabulary', href: '/blog/the-here-vocabulary' },
  },
  {
    category: 'Fit',
    question: 'Does HERE replace my CRM, chat tool or project tracker?',
    answer:
      'No. HERE sits above the systems you already run and connects through permissioned integrations. It holds the reasoning, the commitments and the evidence — the part those tools were never built to keep.',
    readMore: { label: 'Platform overview', href: '/platform' },
  },
  {
    category: 'Fit',
    question: 'Who is HERE for?',
    answer:
      'Groups who owe each other something: studios and agencies running client work, community operators whose members want to build rather than only talk, and teams whose work is worth following in public. If nobody will ever ask you why you decided something, you probably do not need us.',
    readMore: { label: 'Use cases', href: '/use-cases' },
  },
  {
    category: 'Fit',
    question: 'Is HERE a Circle or HoneyBook alternative?',
    answer:
      'Partly, and we are specific about which part. Circle is better at hosting a membership; HoneyBook is better at proposals and invoices. HERE is better at turning a conversation into an accepted commitment with evidence behind it. Several groups run HERE alongside both.',
    readMore: { label: 'Read the comparisons', href: '/compare' },
  },
  {
    category: 'Trust',
    question: 'What is an audit trail for collaborative work?',
    answer:
      'It records not only what changed, but who claimed it, on what evidence, against which version, and who accepted the result. A conventional audit log answers "what happened"; this also answers "on what basis" — the question that actually arises when something is disputed.',
    readMore: { label: 'The record model', href: '/trust#record' },
  },
  {
    category: 'Trust',
    question: 'Can opening something in HERE cost me money?',
    answer:
      'No. Opening a recording, reading a message, selecting a card or joining a group must never start a paid job. Jobs that cost money are authorised separately, with a named payer, a budget, a validity period and stop conditions.',
    readMore: { label: 'The spend rules', href: '/trust#spend' },
  },
  {
    category: 'Trust',
    question: 'Is HERE certified to a security standard?',
    answer:
      'Not yet, and we will not imply otherwise. When a certification is achieved, the trust page will name the standard, the auditing body and the date it was issued.',
    readMore: { label: 'What we do not claim', href: '/trust#claims' },
  },
  {
    category: 'Trust',
    question: 'Who can read what I put into HERE?',
    answer:
      'Only the audience you select, and you see that audience before anything crosses. Every read is scoped through the actual resource and the actual caller, rather than a shared team-wide key, and a share leaves a durable receipt on both sides.',
    readMore: { label: 'Audience and consent', href: '/trust#consent' },
  },
  {
    category: 'Dialog',
    question: 'What is on-camera contract signing?',
    answer:
      'It is agreeing and executing a contract inside a recorded conversation, where each party can see the terms, the participants and what is retained. In Dialog the recording, the proposed terms, the explicit decisions and the signing actions are separate records, so agreement is never inferred from the video alone.',
    readMore: { label: 'How Dialog works', href: '/platform/dialog' },
  },
  {
    category: 'Dialog',
    question: 'Do I need a HERE account to use Dialog?',
    answer:
      'No. You can use Dialog natively with a JEM identity, fund the intelligence you want, and hold the conversation. No HERE profile is created in the background, no circle is joined, and no social graph is imported. Joining HERE later reuses the same identity.',
    readMore: { label: 'Dialog', href: '/platform/dialog' },
  },
  {
    category: 'Commercial',
    question: 'How much does HERE cost?',
    answer:
      'There is a free tier for one circle of up to five participants, a per-participant monthly plan for teams, and negotiated terms for organisations and platform partners. Figures are quoted directly rather than published while HERE & More is in private access — ask and you will normally have one within a day.',
    readMore: { label: 'Pricing', href: '/pricing' },
  },
  {
    category: 'Commercial',
    question: 'Can I export everything?',
    answer:
      'Yes, on every plan, including the free one. Access to your own identity and a basic export is never gated behind a subscription or behind audience performance.',
    readMore: { label: 'What a plan never gates', href: '/pricing#never' },
  },
  {
    category: 'Commercial',
    question: 'Is HERE available today?',
    answer:
      'HERE is in private access while the first complete loop — chosen aim, shared work, observed result, authored edition — is verified with early groups. Request access and we will tell you plainly which parts are shipped and which are roadmap.',
    readMore: { label: 'Request access', href: '/demo' },
  },
]

export const faqPage: LandingPage = {
  _type: 'landing',
  slug: 'faq',
  path: '/faq',
  updated: '2026-09-14',
  seo: {
    title: 'Frequently asked questions — HERE & More',
    description:
      'Straight answers about what HERE is, who it is for, how the record works, what it costs, and what we will not claim before it is true.',
    primaryKeyword: 'HERE & More FAQ',
    ogImageTitle: 'Frequently asked questions',
  },
  eyebrow: 'FAQ',
  title: 'Questions, answered first',
  answer:
    'HERE & More turns an idea into a working business in seven steps, carried by a social layer that keeps your product context through every one of them. It is in private access as of September 2026. Below are the questions we are asked most, answered in the first sentence, with a link to the page that answers each one in full.',
  hero: {
    headline: 'Answers first,',
    headlineAccent: 'context after.',
    sub: 'Every answer below begins with the answer. If the first sentence does not settle it, we have written it badly.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Read about trust', href: '/trust' },
  },
  body: [],
  faqs: faqItems,
  related: [
    { label: 'The platform', href: '/platform', description: 'How the social layer works' },
    { label: 'Trust & provenance', href: '/trust', description: 'The record model in full' },
    { label: 'Pricing', href: '/pricing', description: 'Plans and principles' },
  ],
  cta: {
    title: 'Still have a question?',
    text: 'Ask it directly. A person answers, usually the same day.',
    primary: { label: 'Request access', href: '/demo' },
  },
}
