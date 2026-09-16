import type { LandingPage } from '@/lib/content/types'

export const platform: LandingPage = {
  _type: 'landing',
  slug: 'platform',
  path: '/platform',
  updated: '2026-09-14',
  seo: {
    title: 'The social layer for CRM platforms',
    description:
      'HERE is a social layer for CRM-based platforms: one shared map of aims, work, evidence and commitments, connected to the systems you already run.',
    primaryKeyword: 'social layer for CRM',
    ogImageTitle: 'The social layer for CRM',
  },
  journeyStep: { n: '—', title: 'What runs underneath all seven steps' },
  eyebrow: 'Platform',
  title: 'The social layer for CRM platforms and services',
  answer:
    'A social layer for CRM is the shared workspace where the people around a record collaborate: the aim they chose, the deliberation behind it, who committed to what, and the evidence of the result. HERE is that layer, built from four surfaces — Capture, Rooms, Broadcast and Dialog. It is what carries your product context through all seven steps from an idea to a business, so nothing is explained twice.',
  hero: {
    headline: 'The layer your CRM',
    headlineAccent: 'cannot hold.',
    sub: 'Seven steps only work if one thing is true underneath them: the context has to survive the handoffs. This is the layer that holds it.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'See what it replaces', href: '/compare' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'Which step of the journey does each surface serve?', id: 'steps' },
    {
      _type: 'table',
      caption: 'The seven steps, and what carries each one',
      columns: ['Step', 'What happens', 'What carries it'],
      rows: [
        ['01 · Start with an idea', 'You describe what you want to build', 'Rooms — a conversation with a destination'],
        ['02 · Talk to your AI product manager', 'The conversation becomes a product plan', 'Rooms — explore, crystallize, commit, complete'],
        ['03 · We build it', 'Guardians turn the plan into a working product', 'Studio, with each build authorised as its own job'],
        ['04 · Keep improving', 'Feedback, changes, and the context stays yours', 'Capture and Everything — provenance on every revision'],
        ['05 · Get ready to launch', 'Your AI marketing manager learns the product', 'The same record, read by a different service'],
        ['06 · Create and distribute', 'Content goes live across seven platforms', 'Broadcast — authored editions with recorded rights'],
        ['07 · Find your customers', 'A targeted lead pipeline, on the systems you run', 'The social layer, connected to your CRM'],
      ],
    },
    {
      _type: 'paragraph',
      text: 'Every row above hands the next one everything it already knows. That is the whole reason the layer exists — [see the seven steps in order](/#journey).',
    },
    { _type: 'heading', level: 2, text: 'Why does a CRM record lose the reasons behind it?', id: 'problem' },
    {
      _type: 'paragraph',
      text: 'Every organisation can tell you what happened. Almost none can tell you why. The reasoning lives in a call nobody recorded, a thread that scrolled away, and three people who have since moved on. When the same question returns — and it always returns — the group rebuilds its understanding from scratch.',
    },
    {
      _type: 'paragraph',
      text: 'HERE fixes that by making the reasoning a first-class record. Not a document someone remembers to write, but the natural byproduct of doing the work in one place.',
    },
    { _type: 'heading', level: 2, text: 'How is the social layer put together?', id: 'architecture' },
    {
      _type: 'paragraph',
      text: 'Five services, with one rule between them: an identity does not oblige you to join anything, and joining one thing never enrols you in another.',
    },
    {
      _type: 'table',
      caption: 'The service map',
      columns: ['Layer', 'What it holds', 'What it deliberately does not do'],
      rows: [
        ['JEM', 'Shared identity, sign-in, and the applicable authority relationships', 'Force participation in every service'],
        ['HERE', 'SCircles, CRM context, and the shared map across Capture, Broadcast and Rooms', 'Become another inbox'],
        ['Studio', 'Briefs, versions, chosen tools, reviews, deployment approvals and results', 'Own the conversation around the work'],
        ['Dialog', 'Serious legal and financial matters, on-camera contracting, separate budgets', 'Start because a keyword sounded important'],
        ['Everything', 'The continuing record of sources, versions, relationships and outcomes', 'Show a reader more than their scope permits'],
      ],
    },
    { _type: 'heading', level: 2, text: 'HERE at a glance', id: 'at-a-glance' },
    {
      _type: 'definitionList',
      items: [
        { term: '5 services', definition: 'JEM for identity, HERE for the social layer, Studio for the build harness, Dialog for serious matters, Everything for the continuing record.' },
        { term: '4 surfaces', definition: 'Capture, Rooms, Broadcast and Dialog — each hands the next its context, versions and permissions.' },
        { term: '4 record types', definition: 'Observation, interpretation, claim and correction are stored as four distinct things, never collapsed into one.' },
        { term: '4 conversation phases', definition: 'Explore, crystallize, commit and complete. A Room knows which one it is in.' },
        { term: '3 completion states', definition: 'Intended work, claimed completion and accepted outcome are asserted by different people.' },
        { term: '6 integration declarations', definition: 'Every connector states the identities it resolves, what it may read, what it may contribute, its reader scope, its freshness and its revocation behaviour.' },
        { term: 'Private access since September 2026', definition: 'Roadmap capabilities are labelled as roadmap on the page that describes them.' },
      ],
    },
    { _type: 'heading', level: 2, text: 'What is an SCircle?', id: 'scircle' },
    {
      _type: 'paragraph',
      text: 'An **SCircle** is a group with a shared map of understanding: the participants and their declared intentions, the relevant people and resources, the work and places, the available evidence, the open questions, the possible futures, the chosen commitments and the observed outcomes.',
    },
    {
      _type: 'callout',
      tone: 'note',
      title: 'Shared understanding is not forced agreement',
      text: 'Participants can disagree, and can hold private views inside a shared circle. The map records the disagreement rather than resolving it by deleting one side.',
    },
    { _type: 'heading', level: 2, text: 'How does HERE connect to the systems you already run?', id: 'integrations' },
    {
      _type: 'paragraph',
      text: 'HERE is open to a social network, a service, or a group within a network joining the shared world. That is an integration principle, not a claim that every provider is connected today. Each integration declares which identities and source groups it can resolve, what it may read or contribute, the reader scope, freshness, provenance and revocation behaviour.',
    },
    {
      _type: 'list',
      style: 'bullet',
      items: [
        'Joining one group does not expose another group, or a person’s wider network.',
        'An imported record stays attributable to the source it came from.',
        'Similar names do not merge identities, and a new connector never creates a shared super-account.',
        'When a membership changes, the source permission is re-checked rather than assumed.',
      ],
    },
    {
      _type: 'callout',
      tone: 'limit',
      title: 'What is shipped and what is roadmap',
      text: 'Capture, Rooms and the shared map are the working core. Broadcast editions, Dialog contracting and third-party connectors are being verified with early groups. We will tell you which is which before you commit anything — see [what we do not claim](/trust#claims).',
    },
  ],
  sections: [
    {
      eyebrow: 'The four movements',
      title: 'One arc, four surfaces',
      text: 'Each surface hands the next one its context, its versions and its permissions.',
      features: [
        { title: 'Capture', text: 'Evidence that arrives with its provenance attached and keeps it forever.', icon: 'record', href: '/platform/capture' },
        { title: 'Rooms', text: 'Explore, crystallize, commit, complete. A conversation with a destination.', icon: 'people', href: '/platform/rooms' },
        { title: 'Broadcast', text: 'Work people can follow, and an authored edition they can keep.', icon: 'broadcast', href: '/platform/broadcast' },
        { title: 'Dialog', text: 'On-camera contracting, entered deliberately and budgeted separately.', icon: 'contract', href: '/platform/dialog' },
      ],
    },
  ],
  faqs: [
    {
      question: 'What is a social layer for CRM?',
      answer:
        'A social layer for CRM is the shared space where people collaborate around a record: the chosen aim, the deliberation, the commitments, and the evidence of the outcome. The CRM stays the system of record for the account; the social layer keeps the understanding that produced those records and links back to them.',
    },
    {
      question: 'Which CRMs does HERE connect to?',
      answer:
        'HERE connects through permissioned integrations rather than a fixed list of logos. Each connector declares the identities it can resolve, what it may read and contribute, the reader scope and how access is revoked. Tell us which system you run and we will tell you plainly whether a path exists today.',
      readMore: { label: 'Integration principles', href: '/trust#integrations' },
    },
    {
      question: 'Is HERE a project management tool?',
      answer:
        'Not quite. Tasks and dates exist because commitments need them, but the container is a chapter — an aim, the work, the evidence and an authored account — rather than a board that empties itself. Intended work, claimed completion and accepted outcome are kept as three different states.',
      readMore: { label: 'How client work runs in HERE', href: '/use-cases/client-work' },
    },
    {
      question: 'Do I need Dialog to use HERE?',
      answer:
        'No. A HERE participant can design, develop, message, broadcast and use the studio without opening a Dialog account or buying Dialog intelligence. The reverse also holds: someone can hold a serious Dialog conversation without ever creating a HERE social profile.',
      readMore: { label: 'How the handoff works', href: '/platform/dialog' },
    },
  ],
  related: [
    { label: 'Trust & provenance', href: '/trust', description: 'The record model, spend rules and access checks' },
    { label: 'Client work', href: '/use-cases/client-work', description: 'The platform applied to studios and agencies' },
    { label: 'Pricing', href: '/pricing', description: 'Plans, and what a plan never gates' },
  ],
  cta: {
    title: 'See the layer on your own work',
    text: 'Bring one live project. We will map it into a chapter with you and show you exactly where your current tools lose the reasoning.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Compare with Circle', href: '/compare/here-vs-circle' },
  },
}
