import type { LandingPage } from '@/lib/content/types'

export const about: LandingPage = {
  _type: 'landing',
  slug: 'about',
  path: '/about',
  updated: '2026-09-14',
  seo: {
    title: 'About HERE & More',
    description:
      'HERE & More builds HERE, a social layer for CRM-based platforms. Who we are, what we believe, and what we will not claim before it is true.',
    primaryKeyword: 'HERE & More',
    ogImageTitle: 'About HERE & More',
  },
  eyebrow: 'About',
  title: 'A more purposeful internet, built one chapter at a time',
  answer:
    'HERE & More is a product company that turns an idea into a working business: an AI product manager plans it, Guardians build it, and a social layer carries the same context through marketing, content, distribution and customers. It is part of Agana Studios and is in private access as of September 2026, verifying the complete journey with early builders before widening.',
  hero: {
    headline: 'We are building the layer',
    headlineAccent: 'that remembers.',
    sub: 'Software that helps a group direct its attention, do real work together, and leave a record worth inheriting.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Read the platform', href: '/platform' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'Why we started here', id: 'why' },
    {
      _type: 'paragraph',
      text: 'We kept meeting the same failure. Somebody has an idea, and getting it to a business means re-explaining it to a designer, then a developer, then a marketer, then whoever writes the ads — losing something at every handoff. The work gets recorded; the reasoning does not.',
    },
    {
      _type: 'paragraph',
      text: 'Our first instinct was to build a bigger world: a map, a simulation, an economy. An honest external review of the predecessor system in September 2026 told us something more useful. We had many of the ingredients and no complete journey. The advice was to make one thing work end to end — an idea carried all the way to customers — before building the universe around it. We took it.',
    },
    { _type: 'heading', level: 2, text: 'What we believe', id: 'beliefs' },
    {
      _type: 'definitionList',
      items: [
        { term: 'Reasoning is infrastructure', definition: 'The why is not documentation overhead. It is the asset that makes the next decision cheaper, and almost every tool throws it away.' },
        { term: 'Restraint is a feature', definition: 'We would rather ship nothing than ship a number that looks authoritative and is not. Several capabilities exist in our code and stay switched off for exactly this reason.' },
        { term: 'Consent is explicit or it is absent', definition: 'Not inferred from presence, not implied by a subscription, not bundled into a tick box that also means four other things.' },
        { term: 'A record should survive us', definition: 'Exportable packages, independent copies, a named custodian and format migration. If your history only works while we exist, it is not a record — it is a rental.' },
      ],
    },
    { _type: 'heading', level: 2, text: 'How we build', id: 'how' },
    {
      _type: 'paragraph',
      text: 'We build HERE in HERE. Each cycle — the original need, the chosen change, the implementation, the verification, the release and the observed result — runs through the same loop we are asking you to use. It is an uncomfortable way to work and a reliable way to find out whether the product is true.',
    },
    {
      _type: 'callout',
      tone: 'evidence',
      title: 'The review that shaped this',
      text: 'An independent research review dated 8 September 2026 examined the archived predecessor system against 210 product offerings across 37 business models. It found real problems — unsafe financial state transitions, an over-broad transfer path, uneven integration authorisation — and it set the bar for what must be verified before HERE touches real money or real organisations. [What we do not claim](/trust#claims).',
    },
  ],
  faqs: [
    {
      question: 'Who is behind HERE & More?',
      answer:
        'HERE & More is a small product team, part of Agana Studios, building HERE. We are in private access as of September 2026 and work directly with the first groups using it rather than behind a support queue.',
    },
    {
      question: 'Is HERE generally available?',
      answer:
        'Not yet. It is in private access while the first complete loop is verified with early groups. Every page on this site labels roadmap capabilities as roadmap, and we will tell you exactly which parts are shipped before you commit anything.',
    },
  ],
  related: [
    { label: 'Trust & provenance', href: '/trust', description: 'What we record and what we refuse' },
    { label: 'The platform', href: '/platform', description: 'What we have actually built' },
    { label: 'Blog', href: '/blog', description: 'How we think about the problem' },
  ],
  cta: {
    title: 'Come and break it',
    text: 'Early groups get direct access to the people building this, and a standing invitation to tell us where it fails.',
    primary: { label: 'Request access', href: '/demo' },
  },
}

export const demo: LandingPage = {
  _type: 'landing',
  slug: 'demo',
  path: '/demo',
  updated: '2026-09-14',
  seo: {
    title: 'Request access to HERE',
    description:
      'Tell us what your group is trying to make happen. We will show you the loop on your own work and say plainly what is shipped and what is roadmap.',
    primaryKeyword: 'HERE request access',
    ogImageTitle: 'Request access',
  },
  eyebrow: 'Request access',
  title: 'Bring one real thing',
  answer:
    'HERE is in private access. To join, tell us about one live project or one open question your group has been circling. We map it into a chapter with you, show you which parts are shipped and which are roadmap, and you decide whether the loop holds.',
  hero: {
    headline: 'Bring one',
    headlineAccent: 'real thing.',
    sub: 'Not a hypothetical evaluation. One live project, one collaborator, one question you keep failing to close.',
    primary: { label: 'Request access', href: '#main' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'What happens next', id: 'next' },
    {
      _type: 'steps',
      items: [
        { title: 'You tell us the aim', text: 'What the group is trying to make happen, and what has stopped it so far. Two paragraphs is plenty.' },
        { title: 'We map one chapter', text: 'Together, in a call. If your work does not fit the model, that is the most useful thing either of us learns that week.' },
        { title: 'You run it for a fortnight', text: 'One real project, with the people who would actually use it. We stay reachable throughout.' },
        { title: 'You decide', text: 'No pressure, no automated sequence, no invoice that arrives before you asked for one.' },
      ],
    },
    {
      _type: 'callout',
      tone: 'note',
      title: 'What we will tell you unprompted',
      text: 'Which capabilities are shipped, which are being verified, and which are roadmap. If another tool is a better fit for your bottleneck, we will say so — that is cheaper for both of us than an unhappy quarter.',
    },
  ],
  faqs: [
    {
      question: 'How long does access take?',
      answer:
        'We onboard a small number of groups at a time so that each one gets direct contact with the people building HERE. Write to us with what you are trying to make happen and we will reply with a real answer about timing.',
    },
    {
      question: 'Do I need to move off my current tools?',
      answer:
        'No. Most early groups run HERE alongside their CRM and their billing tools. HERE holds the reasoning and the evidence; the systems you already pay for keep doing what they are good at.',
    },
  ],
  related: [
    { label: 'Pricing', href: '/pricing', description: 'What a plan covers' },
    { label: 'Trust & provenance', href: '/trust', description: 'For the person who has to approve it' },
    { label: 'The platform', href: '/platform', description: 'What you would be trying' },
  ],
}
