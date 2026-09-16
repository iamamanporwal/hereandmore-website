import type { Comparison } from '@/lib/content/types'

export const vsCircle: Comparison = {
  _type: 'comparison',
  slug: 'here-vs-circle',
  path: '/compare/here-vs-circle',
  updated: '2026-09-14',
  competitor: { name: 'Circle', category: 'Community platform', url: 'https://circle.so' },
  seo: {
    title: 'HERE vs Circle — an honest Circle alternative',
    description:
      'Circle hosts a membership beautifully. HERE turns discussion into accepted commitments with evidence — including where Circle is the better buy.',
    primaryKeyword: 'Circle alternative',
    ogImageTitle: 'HERE vs Circle',
  },
  eyebrow: 'Comparison',
  title: 'HERE vs Circle',
  answer:
    'Circle is a community platform for hosting a membership: spaces, courses, events and payments. HERE is a social layer for getting work done together: aims, commitments, evidence and authored outcomes. Choose Circle if your product is the membership itself. Choose HERE if the community exists to make something happen and keeps failing to.',
  summary: {
    hereWins: [
      'A path from discussion to an aim someone named actually accepted',
      'Evidence with provenance — occurrence time, owner, source version, corrections',
      'Intended work, claimed completion and accepted outcome kept as three states',
      'Audience previewed before anything is shared, with a durable receipt',
      'No leaderboard, no engagement score, no ranking of people',
    ],
    theyWin: [
      'A mature, polished membership product available today',
      'Courses, events, live rooms and member payments out of the box',
      'A large ecosystem, established integrations and a long support history',
      'Straightforward pricing you can buy this afternoon',
    ],
    chooseThemIf:
      'your business is the membership — you sell access, courses and events, and discussion is the product rather than the prelude to work.',
  },
  matrix: [
    { criterion: 'Primary unit', here: 'A chapter: aim → work → evidence → edition', them: 'A space: posts, threads and members' },
    { criterion: 'What a conversation produces', here: 'A commitment with an owner, constraints and acceptance criteria', them: 'A thread, optionally pinned' },
    { criterion: 'Evidence model', here: 'Observations with provenance and corrections', them: 'Posts and uploads' },
    { criterion: 'Publishing', here: 'Draft, approved edition, recorded rights per contributor', them: 'Posts and course content' },
    { criterion: 'Membership & payments', here: 'Roadmap, deliberately narrow', them: 'Mature: subscriptions, trials, paywalls', note: 'Circle is clearly ahead here' },
    { criterion: 'Courses & events', here: 'Not a goal', them: 'Core product', note: 'Circle is clearly ahead here' },
    { criterion: 'Progress measure', here: 'Whether the aim produced an accepted result', them: 'Engagement and activity' },
    { criterion: 'Cross-network groups', here: 'A group elsewhere can join an SCircle via a permissioned integration', them: 'Members join Circle' },
    { criterion: 'Availability', here: 'Private access, first loop being verified', them: 'Generally available', note: 'Circle is clearly ahead here' },
  ],
  body: [
    { _type: 'heading', level: 2, text: 'They are not really the same category', id: 'category' },
    {
      _type: 'paragraph',
      text: 'It is tempting to line up feature lists, but the honest version is simpler. Circle answers "where does my community live?" HERE answers "how does this group turn a conversation into something that actually changed?" Plenty of operators will want both, and Circle is the safer purchase today.',
    },
    { _type: 'heading', level: 2, text: 'The test that separates them', id: 'test' },
    {
      _type: 'paragraph',
      text: 'Ask your community one question: what did we decide six months ago, and why? If the answer lives in a thread that nobody can find, a community platform is not your problem — the missing layer is. That is the gap HERE is built for. [See how SCircles work](/use-cases/communities).',
    },
    {
      _type: 'callout',
      tone: 'limit',
      title: 'What this comparison is based on',
      text: 'Circle is compared from its public product pages and documentation as of September 2026. This is a design judgment, not an authenticated test of Circle’s backend, integrations or commercial terms. Vendor claims move; check the current pages before you buy.',
    },
  ],
  faqs: [
    {
      question: 'Is HERE a Circle alternative?',
      answer:
        'Only for one kind of buyer. If you need spaces, courses, events and member payments, Circle does that better today. If your community keeps having good conversations that never turn into accepted commitments with evidence, HERE addresses that directly and Circle does not attempt it.',
    },
    {
      question: 'Can I run both?',
      answer:
        'Yes, and several early groups intend to. A group living on another platform can form or join an SCircle through a permissioned integration, without importing unrelated groups or exposing anyone’s wider network.',
      readMore: { label: 'Integration principles', href: '/trust#integrations' },
    },
    {
      question: 'What does HERE cost compared with Circle?',
      answer:
        'HERE is in private access and prices are being set with early groups rather than published as a headline number we would have to walk back. Circle publishes tiered pricing publicly. Ask us directly and we will give you a real figure for your group size.',
      readMore: { label: 'Pricing', href: '/pricing' },
    },
  ],
  related: [
    { label: 'Communities', href: '/use-cases/communities', description: 'The use case behind this comparison' },
    { label: 'Platform overview', href: '/platform', description: 'What the social layer actually holds' },
    { label: 'HERE vs HoneyBook', href: '/compare/here-vs-honeybook', description: 'The client-work equivalent' },
  ],
  cta: {
    title: 'Test the gap, not the feature list',
    text: 'Bring one open question your community has been circling for months.',
    primary: { label: 'Request access', href: '/demo' },
  },
}

export const vsHoneybook: Comparison = {
  _type: 'comparison',
  slug: 'here-vs-honeybook',
  path: '/compare/here-vs-honeybook',
  updated: '2026-09-14',
  competitor: { name: 'HoneyBook', category: 'Client management & billing', url: 'https://honeybook.com' },
  seo: {
    title: 'HERE vs HoneyBook — an honest comparison',
    description:
      'HoneyBook runs the commercial wrapper: proposals, contracts, invoices. HERE runs the reasoning and evidence around the work. Where each one wins.',
    primaryKeyword: 'HoneyBook alternative',
    ogImageTitle: 'HERE vs HoneyBook',
  },
  eyebrow: 'Comparison',
  title: 'HERE vs HoneyBook',
  answer:
    'HoneyBook manages the commercial wrapper around client work: proposals, contracts, invoices, payments and scheduling. HERE manages the work itself and the reasoning behind it: the agreed aim, the options, the decision and its owner, the evidence, and the authored handover. They solve adjacent problems, and most studios feel both.',
  summary: {
    hereWins: [
      'The reasoning behind a decision survives the project',
      'Scope changes become explicit commitments with acceptance criteria',
      'Internal deliberation and client-facing material are separate audiences by default',
      'On-camera contracting when an agreement deserves more than a signature field',
      'Evidence that can be traced to its source version months later',
    ],
    theyWin: [
      'Invoicing, payments and payouts that work today, at scale',
      'Templates for proposals, contracts and questionnaires',
      'Scheduling, automated follow-ups and a mature client portal',
      'Immediate availability and predictable published pricing',
    ],
    chooseThemIf:
      'your bottleneck is getting paid — proposals, invoices, reminders and scheduling. HoneyBook is a better answer to that question than we will be for a long time.',
  },
  matrix: [
    { criterion: 'Core job', here: 'Hold the work and the reasoning', them: 'Run the commercial process', note: 'Different jobs, not better or worse' },
    { criterion: 'Proposals & invoices', here: 'Not built', them: 'Mature and complete', note: 'HoneyBook is clearly ahead here' },
    { criterion: 'Payments & payouts', here: 'Internal credits and budgets; settlement via specialist providers', them: 'Built in', note: 'HoneyBook is clearly ahead here' },
    { criterion: 'Decision record', here: 'Chosen option, owner, constraints, acceptance criteria', them: 'Not the product' },
    { criterion: 'Evidence & provenance', here: 'Observation, interpretation, claim and correction as distinct records', them: 'Files and messages' },
    { criterion: 'Scope change', here: 'A new commitment, optionally contracted on camera', them: 'A change order document' },
    { criterion: 'Client visibility', here: 'Per-item audience, previewed before sharing, with receipts', them: 'Client portal' },
    { criterion: 'Handover', here: 'An authored edition; the working archive stays yours', them: 'Files and final invoice' },
    { criterion: 'Availability', here: 'Private access', them: 'Generally available', note: 'HoneyBook is clearly ahead here' },
  ],
  body: [
    { _type: 'heading', level: 2, text: 'The honest split', id: 'split' },
    {
      _type: 'paragraph',
      text: 'HoneyBook is a finance-and-admin product that touches the client. HERE is a work-and-reasoning product that touches the client. If you removed HoneyBook you would struggle to bill; if you removed HERE you would struggle to explain. Most studios need both answers, and today they buy one and improvise the other.',
    },
    { _type: 'heading', level: 2, text: 'Where scope actually goes wrong', id: 'scope' },
    {
      _type: 'paragraph',
      text: 'Scope rarely breaks at the contract. It breaks in the fortnight after, in a message that reads "could we also…". A change order catches that only if someone writes one. A commitment with an owner and acceptance criteria catches it because that is where the work already lives. [See how client work runs](/use-cases/client-work).',
    },
    {
      _type: 'callout',
      tone: 'limit',
      title: 'What this comparison is based on',
      text: 'HoneyBook is compared from its public product pages as of September 2026. Vendor screenshots show how a vendor presents an interface; they are not an authenticated test of its backend or commercial terms.',
    },
  ],
  faqs: [
    {
      question: 'Is HERE a HoneyBook alternative?',
      answer:
        'Not for billing. HERE does not issue proposals or invoices, and we would rather say so than pretend. It is an alternative for the part HoneyBook does not attempt: keeping the aim, the deliberation, the decision owner and the evidence together so a project can be explained later.',
    },
    {
      question: 'Can HERE handle contracts?',
      answer:
        'Through Dialog, yes — as an on-camera contracting conversation where the parties, context, audience and budget are confirmed first, and the recording, terms, decisions and signing actions are kept as separate records. It is not a template-and-e-signature product.',
      readMore: { label: 'How Dialog works', href: '/platform/dialog' },
    },
  ],
  related: [
    { label: 'Client work', href: '/use-cases/client-work', description: 'The use case behind this comparison' },
    { label: 'Dialog', href: '/platform/dialog', description: 'Contracting on camera' },
    { label: 'HERE vs Circle', href: '/compare/here-vs-circle', description: 'The community equivalent' },
  ],
  cta: {
    title: 'Keep your billing. Fix the explaining.',
    text: 'Run one engagement as a chapter alongside the tools you already pay for.',
    primary: { label: 'Request access', href: '/demo' },
  },
}

export const comparisons = [vsCircle, vsHoneybook]
