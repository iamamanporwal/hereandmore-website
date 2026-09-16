import type { UseCase } from '@/lib/content/types'

export const clientWork: UseCase = {
  _type: 'useCase',
  slug: 'client-work',
  path: '/use-cases/client-work',
  updated: '2026-09-14',
  audience: 'Studios, agencies and product teams',
  journeyStep: { n: '01–07', title: 'The whole journey, run for a client' },
  seo: {
    title: 'Client collaboration platform for studios',
    description:
      'Run client work in one place: the agreed aim, the deliberation, the evidence and the sign-off — so nobody has to reconstruct why a decision was made.',
    primaryKeyword: 'client collaboration platform',
    ogImageTitle: 'Client work that remembers its reasons',
  },
  eyebrow: 'Use case',
  title: 'Client work that remembers its reasons',
  answer:
    'A client collaboration platform holds the work, the client and the reasoning in one shared space. In HERE, an engagement is a chapter: the agreed aim, the options considered, the decision and its owner, the evidence of the result, and an authored account you can hand over at the end — with private working material kept separate from what the client sees.',
  problem: [
    {
      title: 'The reasoning is in a call nobody recorded',
      text: 'Six months later the client asks why you chose the expensive option. The answer was in a call, a thread and someone’s memory. Two of those are gone.',
    },
    {
      title: 'Scope moves faster than anyone writes it down',
      text: 'A request in a message becomes work, and work becomes an invoice, and nobody can point at the moment it was agreed.',
    },
    {
      title: 'Handover is an archaeology project',
      text: 'A new account lead inherits a folder of files and a CRM full of outcomes with no reasons attached.',
    },
  ],
  outcomes: [
    { value: 'One chapter', label: 'per engagement, instead of five tools' },
    { value: 'Named owner', label: 'on every consequential decision' },
    { value: 'Two audiences', label: 'client-facing and internal, never confused' },
  ],
  workflow: [
    { title: 'Start with the client’s idea', text: 'They describe what they want. Your AI product manager turns that conversation into a plan with a reason, constraints, and the change the client expects to observe.' },
    { title: 'Deliberate in a Room', text: 'Options with their effort and uncertainty. The client sees the options page; the internal margin conversation stays internal.' },
    { title: 'Commit, then build', text: 'The chosen option, the decision owner, the constraints and the acceptance criteria — recorded before Guardians start building, and before anything is billable.' },
    { title: 'Capture as you go', text: 'Evidence arrives with its provenance, against the source version it actually refers to.' },
    { title: 'Contract what needs contracting', text: 'A change of scope moves into an on-camera Dialog matter, with the context, audience and budget previewed first.' },
    { title: 'Author the handover', text: 'Select material into an edition the client keeps. The working archive stays yours.' },
  ],
  body: [
    { _type: 'heading', level: 2, text: 'What can a client see, and what stays internal?', id: 'audiences' },
    {
      _type: 'paragraph',
      text: 'Every chapter has an audience, and the audience is visible before anything moves. Selecting an observation to share shows you exactly who will receive it, and leaves a receipt on both sides. Paying for an edition never exposes the source archive behind it — [see the record model](/trust#record).',
    },
    { _type: 'heading', level: 2, text: 'What does a scope change look like as a record?', id: 'scope-example' },
    {
      _type: 'paragraph',
      text: 'An illustrative change, a fortnight into an engagement, in the form the record actually keeps:',
    },
    {
      _type: 'code',
      language: 'text',
      code: `commitment   cmt_8b41
origin       message from client, 2026-09-08 16:22
             "could we also pull the onboarding emails into this?"
classified   proposed new commitment  (not a task, not billable yet)
aim          v3 — supersedes v2, reason recorded
owner        R. Okafor  (decision owner, client side: L. Marsh)
scope        4 templates, existing copy, no new integrations
criteria     accepted when a new user receives all 4 in staging
estimate     2 Guardian builds · £—  authorised 2026-09-09 09:40
excluded     copywriting, list migration, deliverability audit
state        accepted outcome  2026-09-19  witness: L. Marsh`,
    },
    {
      _type: 'paragraph',
      text: 'The line that matters is **excluded**. Six weeks later, when somebody asks why the list migration was never done, the answer is a record rather than a memory.',
    },
    { _type: 'heading', level: 2, text: 'Where the money becomes explicit', id: 'money' },
    {
      _type: 'paragraph',
      text: 'A pledge, a booking, an approval, a delivery and a settled payout are five different states. Treating them as one is how agencies end up chasing work they already delivered. HERE keeps internal credits, estimates, held amounts and externally settled money as separate records.',
    },
    {
      _type: 'table',
      columns: ['Moment', 'What is recorded', 'What it is not'],
      rows: [
        ['Scope agreed', 'A commitment with owner, constraints and acceptance criteria', 'An invoice'],
        ['Work claimed done', 'A claimed completion with attached evidence', 'An accepted outcome'],
        ['Client accepts', 'An accepted outcome, attributable to a named person', 'A payment'],
        ['Payment settles', 'A settled record against that accepted outcome', 'Proof the client was happy'],
      ],
    },
  ],
  faqs: [
    {
      question: 'What is a client collaboration platform?',
      answer:
        'It is a shared workspace where a team and its clients hold the work and the reasoning together: the agreed aim, the options, the decisions and their owners, the evidence, and the deliverable. It differs from a client portal, which mostly shares files and invoices, and from a CRM, which records the account rather than the understanding behind it.',
    },
    {
      question: 'Can clients see everything in the chapter?',
      answer:
        'No. Audience is chosen per item and previewed before anything crosses. Internal deliberation, private notes and margin conversations stay internal unless their owner explicitly selects them.',
    },
    {
      question: 'How does this compare to HoneyBook or SuiteDash?',
      answer:
        'Those tools are strong at the commercial wrapper — agreement, invoice, client portal. HERE is stronger at the reasoning and the evidence around the work itself. If billing automation is your bottleneck, they win; if "why did we decide that" is your bottleneck, we do.',
      readMore: { label: 'Full comparison', href: '/compare/here-vs-honeybook' },
    },
  ],
  related: [
    { label: 'Rooms', href: '/platform/rooms', description: 'Deliberation that ends in a commitment' },
    { label: 'HERE vs HoneyBook', href: '/compare/here-vs-honeybook', description: 'Where each tool actually wins' },
    { label: 'Pricing', href: '/pricing', description: 'What a plan covers' },
  ],
  cta: {
    title: 'Run one engagement as a chapter',
    text: 'Pick a live client project. In a fortnight you will know whether the reasoning survives.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'See the platform', href: '/platform' },
  },
}

export const communities: UseCase = {
  _type: 'useCase',
  slug: 'communities',
  path: '/use-cases/communities',
  updated: '2026-09-14',
  audience: 'Community and network operators',
  journeyStep: { n: '01–04', title: 'From an idea a group shares to a product' },
  seo: {
    title: 'Community platform for organizations that ship',
    description:
      'Give a member-led community a path from a good conversation to a shared aim someone accepts — with visible commitments, evidence and outcomes.',
    primaryKeyword: 'community platform for organizations',
    ogImageTitle: 'From discussion to a shared aim',
  },
  eyebrow: 'Use case',
  title: 'From a good discussion to a shared aim',
  answer:
    'A community platform for organizations should do more than host discussion. HERE gives a group an SCircle: a shared map of participants, declared intentions, work, places, evidence, open questions, commitments and outcomes — so a conversation can become something a named person has actually accepted.',
  problem: [
    { title: 'A community that talks but never ships', text: 'Good threads, real energy, and nothing anyone can point at three months later.' },
    { title: 'No path from discovery to commitment', text: 'People find each other, agree something would be good, and then the thread scrolls away.' },
    { title: 'Engagement metrics measure the wrong thing', text: 'Posts and hours tell you the room is warm. They do not tell you whether anything changed.' },
  ],
  outcomes: [
    { value: 'Declared', label: 'intentions, visible to the circle' },
    { value: 'Accepted', label: 'commitments with a named owner' },
    { value: 'Observed', label: 'outcomes, not engagement scores' },
  ],
  workflow: [
    { title: 'Form the SCircle', text: 'A group with a declared purpose and a shared map, rather than a channel list.' },
    { title: 'Surface open questions', text: 'The map holds what is unresolved as a first-class item, not a stale pinned post.' },
    { title: 'Turn a thread into an aim', text: 'With a reason, constraints and an observable intended change.' },
    { title: 'Invite a specific role', text: 'Participation, responsibility, authority and public credit stay four separate things.' },
    { title: 'Record the outcome', text: 'Including the attempts that failed — they are how a community learns.' },
    { title: 'Publish what is worth keeping', text: 'An edition that teaches the method, with approved attribution.' },
  ],
  body: [
    { _type: 'heading', level: 2, text: 'Can a group from another network join?', id: 'federation' },
    {
      _type: 'paragraph',
      text: 'A group that lives on another platform can form or join an SCircle through a permissioned integration, without importing unrelated groups or exposing a person’s wider network. Each integration declares what it can resolve, what it may read or contribute, the reader scope and how access is revoked. An imported record stays attributable to its source.',
    },
    { _type: 'heading', level: 2, text: 'What does a thread becoming a commitment look like?', id: 'thread-example' },
    {
      _type: 'table',
      caption: 'One open question, followed from a conversation to an observed outcome',
      columns: ['Stage', 'What exists', 'Who it belongs to'],
      rows: [
        ['Open question', '"Nobody can find our back catalogue." Raised by 3 members over 5 weeks', 'The SCircle'],
        ['Declared intention', '2 members say they would work on it; 1 offers a budget', 'Named participants'],
        ['Aim', 'A member can find any past session in under a minute. Reconsider if usage stays flat for 30 days', 'A named decision owner'],
        ['Commitment', 'Build a searchable index. Accepted, with criteria agreed before starting', 'One accepting member'],
        ['Work', '2 Guardian builds, authorised with a budget and a stop condition', 'The payer'],
        ['Observed outcome', '41 searches in the first fortnight, 2 members found sessions they had forgotten', 'Evidence, with witnesses'],
        ['Published', 'A short chapter explaining the method, with approved attribution', 'The author'],
      ],
    },
    {
      _type: 'paragraph',
      text: 'Nothing in that table is an engagement metric. Every row names a person, and the last row is the only one that counts as a result.',
    },
    { _type: 'heading', level: 2, text: 'Why is there no leaderboard?', id: 'metrics' },
    {
      _type: 'paragraph',
      text: 'Ranking people by hours or posts rewards the loudest participant and hides the person doing quiet maintenance. A published success often rests on invisible work by someone else. HERE tracks whether a commitment produced an accepted result, whether uncertainty went down, and whether another person successfully built on it — and refuses to collapse those into one number.',
    },
    {
      _type: 'callout',
      tone: 'note',
      title: 'A shared map, not a shared opinion',
      text: 'Participants can disagree and hold private views. The map records the disagreement rather than deciding it.',
    },
  ],
  faqs: [
    {
      question: 'What is an SCircle?',
      answer:
        'An SCircle is a group with a shared map of understanding: its participants and their declared intentions, the relevant people and resources, the work and places, the available evidence, the open questions, the possible futures, the chosen commitments and the observed outcomes. It is the unit of group participation in HERE.',
    },
    {
      question: 'How is this different from Circle or Mighty Networks?',
      answer:
        'Those are excellent at hosting a membership: courses, spaces, events, payments. HERE is built for the step after the conversation — turning a thread into an aim someone accepts, with evidence and an outcome. Many operators will run both.',
      readMore: { label: 'HERE vs Circle', href: '/compare/here-vs-circle' },
    },
  ],
  related: [
    { label: 'HERE vs Circle', href: '/compare/here-vs-circle', description: 'Where each one wins' },
    { label: 'Platform overview', href: '/platform', description: 'SCircles and the shared map' },
    { label: 'Building in public', href: '/use-cases/building-in-public', description: 'Publishing what the group learned' },
  ],
  cta: {
    title: 'Give your community somewhere to commit',
    text: 'Bring one circle and one open question. We will map it with you.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Compare with Circle', href: '/compare/here-vs-circle' },
  },
}

export const buildingInPublic: UseCase = {
  _type: 'useCase',
  slug: 'building-in-public',
  path: '/use-cases/building-in-public',
  updated: '2026-09-14',
  audience: 'Teams whose work is worth following',
  journeyStep: { n: '06', title: 'Create and distribute' },
  seo: {
    title: 'Build in public, keep the workings private',
    description:
      'Stream the work, then publish an authored edition with approved attribution and recorded rights — while private material stays private.',
    primaryKeyword: 'building in public',
    ogImageTitle: 'Build in public, keep the workings private',
  },
  eyebrow: 'Use case',
  title: 'Build in public without publishing everything',
  answer:
    'Building in public works when the audience gets an authored account rather than an undifferentiated feed. HERE separates the live broadcast from the published edition: you select what becomes the story, record contributor approval and rights for that edition, and keep the working material behind it private.',
  problem: [
    { title: 'The feed eats the story', text: 'Daily posts are cheap to make and impossible to return to. Nobody can find the thing that mattered.' },
    { title: 'Consent is assumed', text: 'A collaborator appears in a stream and discovers later that they are in the highlight reel.' },
    { title: 'Publishing exposes more than intended', text: 'Sharing the outcome accidentally opens the archive behind it.' },
  ],
  outcomes: [
    { value: 'Draft → published', label: 'as separate, visible states' },
    { value: 'Per edition', label: 'contributor approval and rights' },
    { value: 'Kept private', label: 'everything not explicitly selected' },
  ],
  workflow: [
    { title: 'Work in the open', text: 'Broadcast the session. The source recording keeps its own lineage.' },
    { title: 'Capture as evidence', text: 'What you noticed, when, against which version.' },
    { title: 'Draft the edition', text: 'Select material. Preview it exactly as the intended audience will see it.' },
    { title: 'Get approval', text: 'Each contributor approves their material and likeness for this edition.' },
    { title: 'Publish and offer one thing', text: 'A bounded chapter, plus one concrete way for a reader to participate.' },
    { title: 'Keep the lineage', text: 'Any marketing activity derived from the broadcast retains its source and its own authorised interval.' },
  ],
  body: [
    { _type: 'heading', level: 2, text: 'One offer at a time, each with its own terms', id: 'offers' },
    {
      _type: 'paragraph',
      text: 'A single "support me" button flattens very different transactions. Supporting the work, reading an edition, commissioning something new, joining the project, buying an artifact, learning a method, booking a service and licensing a particular use are eight distinct offers. Each gets its own terms and its own fulfilment state.',
    },
    { _type: 'heading', level: 2, text: 'Marketing that cannot run forever', id: 'residual' },
    {
      _type: 'paragraph',
      text: 'Activity derived from a broadcast — clips, campaigns, continued promotion — retains its broadcast lineage and its own authorised work interval. That authorisation is bounded. It is never a standing permission for indefinite unbounded activity, and it never starts because someone opened a recording.',
    },
  ],
  faqs: [
    {
      question: 'Does building in public mean publishing everything?',
      answer:
        'No. It means publishing an authored account of real work. In HERE the private working material and the public edition are separate lifecycle states, and only what an author explicitly selects — with contributor approval — reaches an audience.',
    },
    {
      question: 'Who owns an edition with several contributors?',
      answer:
        'Rights are recorded per edition and per contributor rather than assumed by the platform. Viewing, redistribution, adaptation, model training, likeness use and sublicensing are separate permissions, and none is implied by publishing.',
      readMore: { label: 'How editions work', href: '/platform/broadcast' },
    },
  ],
  related: [
    { label: 'Broadcast', href: '/platform/broadcast', description: 'Live work and authored editions' },
    { label: 'Communities', href: '/use-cases/communities', description: 'Groups that ship together' },
    { label: 'Trust & provenance', href: '/trust', description: 'Consent, rights and retention' },
  ],
  cta: {
    title: 'Publish one chapter properly',
    text: 'One bounded story, approved attribution, and one concrete offer at the end of it.',
    primary: { label: 'Request access', href: '/demo' },
  },
}

export const useCases = [clientWork, communities, buildingInPublic]
