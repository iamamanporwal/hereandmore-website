import type { LandingPage } from '@/lib/content/types'

export const capture: LandingPage = {
  _type: 'landing',
  slug: 'capture',
  path: '/platform/capture',
  updated: '2026-09-14',
  seo: {
    title: 'Capture — evidence that keeps its provenance',
    description:
      'Capture records observations with occurrence time, owner, place and source version, so a result can always be traced back to the evidence behind it.',
    primaryKeyword: 'capture evidence with provenance',
    ogImageTitle: 'Evidence that keeps its provenance',
  },
  journeyStep: { n: '04', title: 'Keep improving — evidence with provenance' },
  eyebrow: 'Capture',
  title: 'Evidence that keeps its provenance',
  answer:
    'Capture is where observations enter HERE. Each one records what was observed, when it occurred, when it was recorded, who recorded it, where, and against which source version — so any later claim can be traced back to the evidence it rests on, including the corrections made along the way.',
  hero: {
    headline: 'What you saw,',
    headlineAccent: 'and when you saw it.',
    sub: 'Notes rot because they lose their context. A captured observation carries its context for the life of the record.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Back to the platform', href: '/platform' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'Which four fields do most tools throw away?', id: 'fields' },
    {
      _type: 'definitionList',
      items: [
        { term: 'Occurrence time vs recording time', definition: 'When it happened and when you wrote it down are different facts. A note written three days later is still useful — as long as everyone can see that it was.' },
        { term: 'Owner and place', definition: 'Who observed this, and where they were. Attribution is not a signature at the bottom; it is part of the record.' },
        { term: 'Source version', definition: 'The exact revision the observation refers to. When the source moves, the observation does not silently start describing something else.' },
        { term: 'Corrections', definition: 'A correction supersedes without erasing. The original claim, the disagreement and the revision all remain legible.' },
      ],
    },
    { _type: 'heading', level: 2, text: 'What does a captured observation look like?', id: 'example' },
    {
      _type: 'paragraph',
      text: 'An illustrative record, with the fields a note-taking app would have discarded:',
    },
    {
      _type: 'code',
      language: 'text',
      code: `observation  obs_4c1f9e
claim        "The onboarding call ran 40 minutes over because the
             collaborator could not find the project's purpose."
occurred     2026-09-08 09:14  (Europe/London)
recorded     2026-09-08 11:02  by A. Porwal
place        Remote — call, not a location
refers to    project/here-onboarding @ rev 4c1f  (pinned)
audience     private to owner
corrections  1 — occurred time revised from 09:40 on 2026-09-09,
             superseding, original retained`,
    },
    {
      _type: 'paragraph',
      text: 'Six months later that record still answers the question a note cannot: not only what somebody thought, but when they saw it, which version they were looking at, and what they later corrected.',
    },
    { _type: 'heading', level: 2, text: 'How is an observation different from an interpretation?', id: 'layers' },
    {
      _type: 'paragraph',
      text: 'Enrichment is useful and it is not new firsthand evidence. When HERE structures, summarises or extends an observation, the original stays intact and the derived material is labelled as interpretation. You can always get back to what was actually seen.',
    },
    {
      _type: 'callout',
      tone: 'evidence',
      title: 'Why this matters commercially',
      text: 'When a client asks why a decision was made, "because of this observation, recorded on this date, against this version" ends the conversation. A reconstructed memory starts one.',
    },
    { _type: 'heading', level: 2, text: 'Selecting evidence into the shared map', id: 'sharing' },
    {
      _type: 'paragraph',
      text: 'Capture is private by default. Sharing is an act: you select a specific revision of an observation, choose a named conversation, see the audience that will receive it, and get a durable receipt that it crossed. Preparing a preview is not the same as having shared — [see the record model](/trust#record).',
    },
    {
      _type: 'steps',
      items: [
        { title: 'Record', text: 'Text, an image, a conversation, a file or a place. The type does not change the provenance.' },
        { title: 'Select', text: 'Choose the exact revision that should travel, not the whole notebook.' },
        { title: 'Preview', text: 'See precisely who will be able to read it before anything moves.' },
        { title: 'Receipt', text: 'The share leaves a durable record on both sides, with the audience named.' },
      ],
    },
  ],
  faqs: [
    {
      question: 'How is Capture different from a notes app?',
      answer:
        'A notes app stores text. Capture stores an observation with its provenance: occurrence time, recording time, owner, place, source version and any later corrections. That difference is what lets a result be traced to its evidence months later.',
    },
    {
      question: 'Can I delete something I captured?',
      answer:
        'Yes. Sensitive payloads can be withdrawn under a retention rule. Permanence applies to the integrity of the record — that a claim was made, and later corrected — not indiscriminately to every private detail inside it.',
      readMore: { label: 'Retention and withdrawal', href: '/trust#retention' },
    },
  ],
  related: [
    { label: 'Rooms', href: '/platform/rooms', description: 'Where captured evidence becomes a decision' },
    { label: 'Trust & provenance', href: '/trust', description: 'The full record model' },
    { label: 'Platform overview', href: '/platform', description: 'How the four surfaces connect' },
  ],
  cta: {
    title: 'Evidence you can still use in a year',
    text: 'Most teams discover the gap during a dispute. It is cheaper to discover it now.',
    primary: { label: 'Request access', href: '/demo' },
  },
}

export const rooms: LandingPage = {
  _type: 'landing',
  slug: 'rooms',
  path: '/platform/rooms',
  updated: '2026-09-14',
  seo: {
    title: 'Rooms — conversations that end in a commitment',
    description:
      'Rooms move through explore, crystallize, commit and complete, so deliberation produces a named decision with an owner, constraints and acceptance criteria.',
    primaryKeyword: 'team decision making software',
    ogImageTitle: 'Conversations that end in a commitment',
  },
  journeyStep: { n: '02', title: 'Talk to your AI product manager' },
  eyebrow: 'Rooms',
  title: 'Conversations that end in a commitment',
  answer:
    'Rooms are project-linked conversations with four phases: explore, crystallize, commit and complete. Instead of scrolling away, a discussion produces a named decision — the chosen option, the decision owner, the constraints and the acceptance criteria — recorded before the work begins.',
  hero: {
    headline: 'Deliberation with',
    headlineAccent: 'a destination.',
    sub: 'This is where step two happens: a conversation that understands what you mean, and ends in a plan somebody has actually accepted.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Back to the platform', href: '/platform' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'The four phases', id: 'phases' },
    {
      _type: 'steps',
      items: [
        { title: 'Explore', text: 'Gather the evidence and the possibilities. Alternative futures stay visibly hypothetical — a proposal is never mistaken for a record.' },
        { title: 'Crystallize', text: 'Narrow to real options, with their effort, cost and uncertainty stated rather than implied.' },
        { title: 'Commit', text: 'A named owner chooses. The constraints and acceptance criteria are written down before work starts, not reconstructed after.' },
        { title: 'Complete', text: 'The claimed result is attached to the commitment with its evidence. Self-report, witness confirmation, disagreement and inconclusive are all valid outcomes.' },
      ],
    },
    { _type: 'heading', level: 2, text: 'Which three states do most tools collapse into one?', id: 'states' },
    {
      _type: 'table',
      columns: ['State', 'What it means', 'Who can assert it'],
      rows: [
        ['Intended work', 'Someone has taken this on', 'The person doing it'],
        ['Claimed completion', 'They say it is done', 'The person doing it'],
        ['Accepted outcome', 'The result was inspected and accepted', 'The decision owner or an independent witness'],
      ],
    },
    {
      _type: 'paragraph',
      text: 'A tick box that means all three at once is how teams end up disagreeing about what "done" meant. Keeping them apart costs one extra click and saves an argument.',
    },
    { _type: 'heading', level: 2, text: 'Nothing starts silently', id: 'spend' },
    {
      _type: 'paragraph',
      text: 'Opening a recording, reading a message, selecting a card or joining a group must never start a paid job. When a Room does trigger real work — a build, an edit, a production run — the scope, payer, budget and stop conditions are authorised as a separate record. [See the spend rules](/trust#spend).',
    },
  ],
  faqs: [
    {
      question: 'Is a Room just a channel with extra steps?',
      answer:
        'A channel has no destination; a Room does. The phases exist so that the group can see whether it is still exploring or already committed, and so that the decision produces a durable record with an owner and acceptance criteria rather than a message someone has to find again.',
    },
    {
      question: 'Can people disagree inside a Room?',
      answer:
        'Yes, and the disagreement is recorded rather than resolved by deletion. Shared understanding does not require unanimous belief; participants can hold private views inside a shared circle.',
    },
  ],
  related: [
    { label: 'Capture', href: '/platform/capture', description: 'The evidence a Room deliberates over' },
    { label: 'Dialog', href: '/platform/dialog', description: 'When a commitment needs to be contracted' },
    { label: 'Client work', href: '/use-cases/client-work', description: 'Rooms applied to billable projects' },
  ],
  cta: {
    title: 'End a conversation with something you can point at',
    text: 'Bring your messiest open decision. That is the one worth testing.',
    primary: { label: 'Request access', href: '/demo' },
  },
}

export const broadcast: LandingPage = {
  _type: 'landing',
  slug: 'broadcast',
  path: '/platform/broadcast',
  updated: '2026-09-14',
  seo: {
    title: 'Broadcast — publish an authored edition',
    description:
      'Broadcast turns live work into authored editions: drafts, scheduled and published states, contributor approval and versioned rights for each release.',
    primaryKeyword: 'build in public platform',
    ogImageTitle: 'Build in public, publish an edition',
  },
  journeyStep: { n: '06', title: 'Create and distribute' },
  eyebrow: 'Broadcast',
  title: 'Build in public, then publish an edition',
  answer:
    'Broadcast is where work becomes something other people can follow and keep. A live stream shows the work happening; an edition is the authored version — selected material, approved attribution, versioned rights — with the private working material left behind.',
  hero: {
    headline: 'A stream is not',
    headlineAccent: 'a story.',
    sub: 'Step six of the journey. Your product goes out as an authored edition, across seven platforms, from one place.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Back to the platform', href: '/platform' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'What is the difference between a draft and a published edition?', id: 'states' },
    {
      _type: 'paragraph',
      text: 'Private working material and the public edition need separate lifecycle states. You can see, at a glance, what is still yours alone, what is queued, and what an audience already holds. Once something is published, it does not quietly change underneath the people who read it — a new edition is a new version.',
    },
    { _type: 'heading', level: 2, text: 'Rights are decided per edition, not per account', id: 'rights' },
    {
      _type: 'paragraph',
      text: 'A released edition records who contributed, who approved, and what the recipient may actually do. Viewing, redistribution, adaptation, model training, likeness use and sublicensing are distinct permissions, and none of them are implied by the others.',
    },
    {
      _type: 'table',
      columns: ['Question the edition must answer', 'Why it cannot be left implicit'],
      rows: [
        ['What exactly is being sold or shared?', 'A viewing entitlement, a copy, an adaptation licence and a service are different products'],
        ['Which edition is covered?', 'The work evolves; a transaction has to identify the version it bought'],
        ['Who can authorise it?', 'The author, the people depicted, contributors and the client may be different parties'],
        ['What stays private?', 'Receiving an edition must never open the source archive behind it'],
      ],
    },
    {
      _type: 'callout',
      tone: 'limit',
      title: 'Roadmap, stated plainly',
      text: 'Live broadcast and recording exist today. Editions, contributor approval flows and commercial licensing are in active development with early groups. [What we do not claim](/trust#claims).',
    },
  ],
  faqs: [
    {
      question: 'What is the difference between a broadcast and an edition?',
      answer:
        'A broadcast is the work happening live — unedited, in the moment. An edition is the authored version made afterwards: selected material, approved attribution, a named audience and recorded rights. One is a window; the other is a publication.',
    },
    {
      question: 'Do collaborators have to approve what I publish?',
      answer:
        'If their material or likeness is in it, yes. Approval is recorded per contributor and per edition, and consent is never inferred from someone simply having appeared on camera.',
    },
  ],
  related: [
    { label: 'Building in public', href: '/use-cases/building-in-public', description: 'The workflow end to end' },
    { label: 'Capture', href: '/platform/capture', description: 'Where the source material comes from' },
    { label: 'Trust & provenance', href: '/trust', description: 'Rights, retention and audience scope' },
  ],
  cta: {
    title: 'Publish the work, keep the workings private',
    text: 'Bring a project you would like people to follow. We will shape the first edition with you.',
    primary: { label: 'Request access', href: '/demo' },
  },
}

export const dialog: LandingPage = {
  _type: 'landing',
  slug: 'dialog',
  path: '/platform/dialog',
  updated: '2026-09-14',
  seo: {
    title: 'On-camera contract signing with Dialog',
    description:
      'Dialog is where a conversation becomes a contract on camera: parties, context, audience and budget confirmed first, terms and decisions kept separate.',
    primaryKeyword: 'on-camera contract signing',
    ogImageTitle: 'On-camera contracting, entered on purpose',
  },
  journeyStep: { n: '—', title: 'When a working relationship becomes an obligation' },
  eyebrow: 'Dialog',
  title: 'On-camera contracting, entered on purpose',
  answer:
    'Dialog is a service for serious legal and financial conversations, including on-camera contracting. Parties agree terms in a recorded conversation, and the recording, the proposed terms, the explicit decisions, the signing actions and the costs are kept as five separate records — consent is never inferred from someone appearing or speaking on camera.',
  hero: {
    headline: 'When it stops being',
    headlineAccent: 'a conversation.',
    sub: 'Some agreements deserve a camera, a named purpose and a budget. Getting there should be a decision, not a slide.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Back to the platform', href: '/platform' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'What is on-camera contract signing?', id: 'definition' },
    {
      _type: 'paragraph',
      text: 'On-camera contracting is agreeing terms in a recorded conversation where each party can see what they are agreeing to and what is being retained. It suits the moment when a working relationship becomes an obligation: a scope and a fee, a licence, a partnership, a settlement.',
    },
    {
      _type: 'callout',
      tone: 'note',
      title: 'Appearing is not agreeing',
      text: 'The system must not infer consent or agreement merely from someone’s appearance or speech on camera. A decision is a separate, explicit record, made by a named party.',
    },
    { _type: 'heading', level: 2, text: 'How does the handoff from HERE work?', id: 'handoff' },
    {
      _type: 'paragraph',
      text: 'Moving work into Dialog is a deliberate handoff into a selected matter. It does not publicly broadcast the source conversation, and it never transfers an entire history.',
    },
    {
      _type: 'steps',
      items: [
        { title: 'Choose the matter', text: 'Its purpose and parties — or start a new one.' },
        { title: 'Preview exactly what crosses', text: 'The precise source versions, excerpts, files and participants. Private notes stay private unless their owner selects them.' },
        { title: 'Confirm audience and budget', text: 'The destination audience, the recording and sharing choices, and the additional expenditure, authorised explicitly.' },
        { title: 'Hold the conversation', text: 'On camera, with those references attached.' },
        { title: 'Keep five records', text: 'Recording, proposed terms, explicit decisions, contracting actions, costs and results — separately.' },
        { title: 'Return only what is permitted', text: 'The agreed outcome goes back to the originating work. Private analysis stays private.' },
      ],
    },
    { _type: 'heading', level: 2, text: 'What does a Dialog matter keep?', id: 'records' },
    {
      _type: 'table',
      caption: 'The five records a matter keeps, and who they belong to',
      columns: ['Record', 'What it holds', 'Who it is visible to'],
      rows: [
        ['Recording', 'The on-camera conversation, with its participants and its date', 'The parties to the matter'],
        ['Proposed terms', 'What was put forward, in the version it was put forward in', 'The parties to the matter'],
        ['Explicit decisions', 'What each named party actually accepted or declined', 'The parties to the matter'],
        ['Contracting actions', 'The signing or execution steps, each with its own timestamp', 'The parties to the matter'],
        ['Costs and results', 'Authorised budget, measured usage, outputs, and anything left unresolved', 'The payer, plus any shared sponsor'],
      ],
    },
    {
      _type: 'paragraph',
      text: 'Private analysis is a sixth record and belongs to whoever commissioned it. It has its own budget and its own audience, and it never travels back to the originating work.',
    },
    {
      _type: 'callout',
      tone: 'evidence',
      title: 'Not an automatic rule',
      text: 'A handoff is never triggered by a price threshold, a keyword, a model’s "seriousness" score, or somebody mentioning the word contract. A person decides.',
    },
    { _type: 'heading', level: 2, text: 'Do I need a HERE account to use Dialog?', id: 'independence' },
    {
      _type: 'paragraph',
      text: 'You can use Dialog natively: sign in with a JEM identity, fund the intelligence you want, and hold the conversation. No HERE profile is created in the background, no social features are subscribed to, no circle is joined, and no social graph is imported. Joining HERE later reuses the same identity, with an explicit decision about what becomes visible — and it never widens the audience of an earlier private matter.',
    },
  ],
  faqs: [
    {
      question: 'What is on-camera contract signing?',
      answer:
        'It is the practice of agreeing and executing a contract inside a recorded conversation, where each party can see the terms, the participants and what is being retained. In Dialog the recording, the proposed terms, the explicit decisions and the signing actions are stored as separate records, so agreement is never inferred from the video alone.',
    },
    {
      question: 'Is a recorded conversation legally binding?',
      answer:
        'That depends on your jurisdiction, the parties and the agreement itself — Dialog records evidence and explicit decisions, it does not supply legal advice or a representation basis. A studio approval and a commercial agreement are different records, and neither substitutes for the parties’ own consent.',
    },
    {
      question: 'What does a Dialog matter cost?',
      answer:
        'Dialog expenditure is authorised separately from anything you spend in HERE, with its own budget, validity period and stop conditions. Cancelling before entry creates no Dialog expenditure at all, and changing the parties, context or budget after confirmation requires a fresh appraisal.',
      readMore: { label: 'How spend is authorised', href: '/trust#spend' },
    },
  ],
  related: [
    { label: 'Rooms', href: '/platform/rooms', description: 'Where the commitment is formed first' },
    { label: 'Trust & provenance', href: '/trust', description: 'Audience scope, budgets and receipts' },
    { label: 'Client work', href: '/use-cases/client-work', description: 'Scope, fee and sign-off in practice' },
  ],
  cta: {
    title: 'Bring the agreement you keep postponing',
    text: 'We will walk the handoff with you — context, audience, budget — before anything is recorded.',
    primary: { label: 'Request access', href: '/demo' },
  },
}

export const features = [capture, rooms, broadcast, dialog]
