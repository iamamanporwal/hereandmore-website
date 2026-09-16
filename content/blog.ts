import type { Article } from '@/lib/content/types'

const socialLayer: Article = {
  _type: 'article',
  slug: 'what-is-a-social-layer-for-crm',
  path: '/blog/what-is-a-social-layer-for-crm',
  published: '2026-09-10',
  updated: '2026-09-14',
  authorId: 'aman-porwal',
  topic: 'Product thinking',
  readingMinutes: 6,
  featured: true,
  pillar: { label: 'The platform', href: '/platform', description: 'How the social layer is built' },
  seo: {
    title: 'What is a social layer for CRM?',
    description:
      'A definition, the four things a social layer must hold, and how to tell whether your organisation is missing one. Written for people evaluating tools.',
    primaryKeyword: 'what is a social layer',
    ogImageTitle: 'What is a social layer for CRM?',
  },
  eyebrow: 'Definition',
  title: 'What is a social layer for CRM?',
  excerpt:
    'Your CRM knows what happened to the account. It does not know why anyone decided that. The social layer is the missing half.',
  answer:
    'A social layer for CRM is the shared workspace where the people around a record collaborate: the aim they agreed, the deliberation that shaped it, who committed to what, and the evidence of the result. The CRM remains the system of record for the account; the social layer holds the understanding that produced those records, and links the two together.',
  body: [
    { _type: 'heading', level: 2, text: 'The gap, in one question', id: 'gap' },
    {
      _type: 'paragraph',
      text: 'Open your CRM and find a deal that closed nine months ago. You will see the stages, the dates, the amount and the owner. Now answer this: why did the team choose that approach over the other one? The record is silent. The reasoning happened in a call, a thread and three people’s heads, and the record has no field for it.',
    },
    {
      _type: 'paragraph',
      text: 'That is not a failure of your CRM. A CRM is a system of record for *accounts*. The gap is a different kind of system: one that records understanding.',
    },
    { _type: 'heading', level: 2, text: 'Four things a social layer must hold', id: 'four' },
    {
      _type: 'steps',
      items: [
        { title: 'The aim', text: 'A chosen direction with a reason, its constraints, and the change you expect to observe. Versioned, with a named decision owner, and a statement of what would cause you to reconsider.' },
        { title: 'The deliberation', text: 'The options that were actually on the table, with their cost, effort and uncertainty — including the ones you rejected. A decision without its rejected alternatives cannot be evaluated later.' },
        { title: 'The commitment', text: 'Who accepted what, under which constraints, with what acceptance criteria, agreed before the work began rather than reconstructed afterwards.' },
        { title: 'The evidence', text: 'Observations with occurrence time, recording time, owner, place and source version — and the corrections that followed.' },
      ],
    },
    { _type: 'heading', level: 2, text: 'Why chat tools do not count', id: 'chat' },
    {
      _type: 'paragraph',
      text: 'Chat holds all four, badly. Everything is present and nothing is addressable. A thread optimises for the most recent message, which is precisely the opposite of what a record needs. Search helps you find a sentence; it does not help you find a decision, because a decision in chat is not an object — it is an impression distributed across forty messages and two people who have since left.',
    },
    {
      _type: 'quote',
      text: 'A conversation with no destination will always lose to a conversation with one, because only the second leaves something behind.',
    },
    { _type: 'heading', level: 2, text: 'The same decision, with and without one', id: 'side-by-side' },
    {
      _type: 'table',
      caption: 'A pricing decision, nine months later',
      columns: ['Question asked in the review', 'What the CRM can answer', 'What a social layer can answer'],
      rows: [
        ['What did we charge?', '£18,000, closed 14 March', 'Same'],
        ['Why that figure?', 'Nothing', 'Option B of three, chosen for a fixed delivery date; the cheaper option assumed a team of two'],
        ['Who decided?', 'The record owner — which is whoever last edited it', 'R. Okafor, named as decision owner before the work began'],
        ['What did we believe at the time?', 'Nothing', 'Effort estimated at 6 weeks, confidence stated as low, flagged for reconsideration if scope moved'],
        ['Did it work?', 'The deal closed', 'Delivered in 9 weeks; the estimate was wrong in a way that is now written down'],
      ],
    },
    {
      _type: 'paragraph',
      text: 'The CRM is not failing at its job in that table. It answers the account questions correctly. It simply has no field for the reasoning, which is why the next pricing decision starts from zero.',
    },
    { _type: 'heading', level: 2, text: 'How to tell if you are missing one', id: 'diagnostic' },
    {
      _type: 'list',
      style: 'number',
      items: [
        'Pick a decision your team made six months ago that is still in effect.',
        'Ask three people why it was made. Count how many answers you get.',
        'Try to find the evidence it rested on, and check whether that evidence still refers to the version it was about.',
        'Ask who accepted the result, and how you would know.',
      ],
    },
    {
      _type: 'paragraph',
      text: 'If step two produces three answers, the understanding was never recorded — it was only ever remembered. That is the layer we build. [See how HERE holds it](/platform), or read [the record model](/trust#record) if you are the person who has to sign off on it.',
    },
    {
      _type: 'callout',
      tone: 'note',
      title: 'A social layer is not a replacement',
      text: 'It sits above the systems you already run and connects through a permissioned integration. If a vendor tells you their social layer replaces your CRM, they are selling you a second CRM.',
    },
  ],
  faqs: [
    {
      question: 'Is a social layer the same as social CRM?',
      answer:
        'No. Social CRM usually means pulling social media activity into a CRM record. A social layer is the opposite direction: it is the collaborative space where people form the aims and decisions that the CRM later records the outcome of.',
    },
    {
      question: 'Does a social layer need to integrate with my CRM?',
      answer:
        'It needs a permissioned path, not a full merge. A good integration declares what it can resolve, what it may read or contribute, the reader scope and how access is revoked — and an imported record stays attributable to its source.',
    },
  ],
  related: [
    { label: 'The platform', href: '/platform', description: 'The social layer in product form' },
    { label: 'HERE vs Circle', href: '/compare/here-vs-circle', description: 'A community platform is a different animal' },
  ],
}

const vanityScore: Article = {
  _type: 'article',
  slug: 'against-the-vanity-score',
  path: '/blog/against-the-vanity-score',
  published: '2026-09-08',
  updated: '2026-09-14',
  authorId: 'aman-porwal',
  topic: 'Principles',
  readingMinutes: 5,
  pillar: { label: 'Trust & provenance', href: '/trust', description: 'How progress is recorded instead' },
  seo: {
    title: 'Against the vanity score',
    description:
      'Why HERE refuses a global reputation number, and what we measure instead: accepted results, reduced uncertainty and work someone else could build on.',
    primaryKeyword: 'engagement metrics problem',
    ogImageTitle: 'Against the vanity score',
  },
  eyebrow: 'Principles',
  title: 'Against the vanity score',
  excerpt:
    'A leaderboard of hours rewards the loudest participant and hides the person doing the quiet maintenance that everything else depends on.',
  answer:
    'HERE deliberately does not publish a global reputation score, a leaderboard or an engagement ranking. Progress is measured against a chosen aim: whether the commitment produced an accepted result, whether uncertainty decreased, whether a reusable artifact was created, and whether another person successfully built on it. Those measures are not interchangeable, so we do not collapse them into one number.',
  body: [
    { _type: 'heading', level: 2, text: 'The predecessor had one, and refused to show it', id: 'history' },
    {
      _type: 'paragraph',
      text: 'The archived system that preceded HERE computed a weighted activity score over time, and accumulated the positive changes into a second, grander number. Both were implemented. Both were then deliberately gated off, because the aggregates underneath them were not reliable enough to show anyone. An independent review in September 2026 called that restraint the right call. We agree, and we have kept it.',
    },
    { _type: 'heading', level: 2, text: 'What a ranking actually rewards', id: 'rewards' },
    {
      _type: 'list',
      style: 'bullet',
      items: [
        'Broadcast duration rewards whoever can afford to be online, not whoever moved the work forward.',
        'Post counts reward the fastest typist in the room.',
        'A single composite score rewards whichever input is easiest to inflate.',
        'Every ranking quietly punishes the person who spent the week fixing something nobody saw break.',
      ],
    },
    {
      _type: 'paragraph',
      text: 'A person can learn a great deal from a failed attempt. A quiet act of maintenance can be more valuable than a launch. A published success usually depends on invisible work by somebody else. If a record cannot represent those three facts, it is a performance contest wearing the clothes of a history.',
    },
    { _type: 'heading', level: 2, text: 'What we measure instead', id: 'instead' },
    {
      _type: 'table',
      columns: ['Question', 'Why it transfers'],
      rows: [
        ['Did the commitment produce an accepted result?', 'Acceptance has a named person attached; a score does not'],
        ['Did the result improve the situation it aimed at?', 'Ties progress to the aim rather than to activity'],
        ['Did uncertainty decrease?', 'Rewards the work of finding out, including when the answer is no'],
        ['Was a reusable artifact created?', 'Distinguishes output from residue'],
        ['Did someone else build on it?', 'The only measure of influence that cannot be self-issued'],
      ],
    },
    {
      _type: 'paragraph',
      text: 'None of these is a ranking of people, and none of them can be farmed. They also do not average into a headline figure, which is the point. [How the record is structured](/trust#record).',
    },
    {
      _type: 'callout',
      tone: 'limit',
      title: 'Establish a baseline before setting a target',
      text: 'Our own first measurements are deliberately concrete: can a new user form a chapter, can another person understand and accept a role, can both identify what is private, can a result be traced to its evidence, and does the next project benefit from the last one. Numeric targets come after baselines, not before.',
    },
  ],
  faqs: [
    {
      question: 'Will HERE ever add a reputation score?',
      answer:
        'Not before the underlying aggregates are reliable and the meaning of progression has been redesigned around contribution and learning. Shipping a number that looks authoritative before then would be worse than shipping nothing.',
    },
  ],
  related: [
    { label: 'Trust & provenance', href: '/trust', description: 'The record model in full' },
    { label: 'Communities', href: '/use-cases/communities', description: 'Groups without a leaderboard' },
  ],
}

const explainLater: Article = {
  _type: 'article',
  slug: 'run-a-project-you-can-explain-a-year-later',
  path: '/blog/run-a-project-you-can-explain-a-year-later',
  published: '2026-09-04',
  updated: '2026-09-14',
  authorId: 'here-team',
  topic: 'Practice',
  readingMinutes: 7,
  pillar: { label: 'Client work', href: '/use-cases/client-work', description: 'The full workflow' },
  seo: {
    title: 'Run a project you can explain a year later',
    description:
      'Six habits that make client work defensible: a versioned aim, rejected options kept, a named decision owner, acceptance criteria and evidence.',
    primaryKeyword: 'client project documentation',
    ogImageTitle: 'Run a project you can explain a year later',
  },
  eyebrow: 'Practice',
  title: 'Run a project you can explain a year later',
  excerpt:
    'Six habits, none of which require our software. They are cheaper to adopt now than to reconstruct during a dispute.',
  answer:
    'A project is explainable a year later when six things were recorded while the work was happening: a versioned aim with its reason, the options that were rejected, the named decision owner, the acceptance criteria agreed before work started, evidence tied to a source version, and an authored handover. None of these requires special software — only the discipline of writing them down at the moment they are cheap.',
  body: [
    { _type: 'heading', level: 2, text: 'The six habits', id: 'habits' },
    {
      _type: 'steps',
      items: [
        { title: 'Write the aim with its reason', text: 'Not "redesign the onboarding" but "reduce the number of new collaborators who need a guided tour, because every tour costs us a day." State what would make you reconsider it.' },
        { title: 'Keep the options you rejected', text: 'A decision without its alternatives cannot be evaluated later. Record the effort, cost and uncertainty you believed at the time, not the ones you learned afterwards.' },
        { title: 'Name the decision owner', text: 'Consensus is not an owner. When somebody asks who chose this, the answer should be a person, not a meeting.' },
        { title: 'Agree acceptance criteria before starting', text: 'Written after the work, criteria describe whatever was built. Written before, they describe what was wanted. The gap between the two is the most useful thing you will learn all quarter.' },
        { title: 'Tie evidence to a version', text: 'A screenshot with no version is an anecdote. The same screenshot with the revision it refers to is evidence.' },
        { title: 'Author the handover', text: 'Not a folder — an account. What you attempted, what changed, and what you learned, in the order a stranger needs them.' },
      ],
    },
    { _type: 'heading', level: 2, text: 'Three states people collapse and regret', id: 'states' },
    {
      _type: 'paragraph',
      text: 'Intended work, claimed completion and accepted outcome are three different facts asserted by potentially different people. A single tick box that means all three is the single most common cause of "I thought that was done".',
    },
    { _type: 'heading', level: 2, text: 'The scope conversation nobody has', id: 'scope' },
    {
      _type: 'paragraph',
      text: 'Scope rarely breaks at the contract. It breaks a fortnight later, in a message that begins "could we also". Treat that message as what it is — a proposed new commitment — and either accept it with its own criteria or decline it. A change order catches this only if somebody remembers to write one; a commitment record catches it because that is where the work already lives.',
    },
    {
      _type: 'quote',
      text: 'Every project produces a record. The only question is whether you write it while it is cheap, or reconstruct it while it is expensive.',
    },
    {
      _type: 'paragraph',
      text: 'HERE exists because these six habits are unreasonable to sustain by hand. But adopt them in whatever you use today — the habits are the point, and [our version of them is here](/use-cases/client-work).',
    },
  ],
  faqs: [
    {
      question: 'Is this just documentation?',
      answer:
        'Documentation is written after the fact and describes what exists. These six records are written during the work and describe what was intended, which is the part that disappears. That is why they survive a dispute and a wiki page does not.',
    },
  ],
  related: [
    { label: 'Client work', href: '/use-cases/client-work', description: 'The habits, in product form' },
    { label: 'Rooms', href: '/platform/rooms', description: 'Where a decision gets its owner' },
  ],
}

const vocabulary: Article = {
  _type: 'article',
  slug: 'the-here-vocabulary',
  path: '/blog/the-here-vocabulary',
  published: '2026-09-12',
  updated: '2026-09-14',
  authorId: 'here-team',
  topic: 'Reference',
  readingMinutes: 4,
  pillar: { label: 'The platform', href: '/platform', description: 'Where the vocabulary is implemented' },
  seo: {
    title: 'The HERE vocabulary, defined',
    description:
      'Plain definitions of the terms HERE uses, what each one does in the product, and what a user should be able to inspect for each.',
    primaryKeyword: 'what is an SCircle',
    ogImageTitle: 'The HERE vocabulary',
  },
  eyebrow: 'Reference',
  title: 'The HERE vocabulary',
  excerpt:
    'Every term below has a job in the product and something a user can inspect. If it has neither, it should not be in the vocabulary.',
  answer:
    'HERE uses a small set of named concepts: PRIME (a continuing identity), AIM (a chosen direction with a reason), SCircle (a group with a shared map of understanding), Golden Record (durable attributable records of contributions), CANOPY (the supporting arrangements that make participation sustainable), and The Garden (the living network of people, work and opportunities).',
  body: [
    {
      _type: 'paragraph',
      lead: true,
      text: 'A vocabulary earns its place only when each word does a job that a plain word could not. Here is each term, what it does, and — more usefully — what you should be able to inspect when you encounter one.',
    },
    {
      _type: 'table',
      caption: 'The vocabulary, with its inspectable surface',
      columns: ['Term', 'Its job in the product', 'What you can inspect'],
      rows: [
        ['PRIME', 'The continuing identity of the person participating: their aims, contributions, relationships and authored representation', 'Who is acting, which representation is involved, and what authority it holds'],
        ['AIM', 'A chosen direction with a reason, constraints and an observable intended change', 'Current version, decision owner, criteria, and what would cause reconsideration'],
        ['SCircle', 'A group with a shared map of understanding — participants, intentions, work, evidence, questions, commitments, outcomes', 'Who is present, what they declared, and what participation would require'],
        ['Golden Record', 'Durable, attributable records of contributions, their evidence, revisions and subsequent influence', 'Claim, evidence, author, witness, disagreements, permissions and custody'],
        ['CANOPY', 'The protective and supporting arrangements that make participation sustainable', 'Actual services, custodians, access rules, continuity arrangements and responsibilities'],
        ['The Garden', 'The living network of people, work, places and opportunities that can grow together', 'Invitations, offers, compatible aims, shared projects and continuing relationships'],
      ],
    },
    { _type: 'heading', level: 2, text: 'Why each term must be inspectable', id: 'inspectable' },
    {
      _type: 'paragraph',
      text: 'A named concept with nothing behind it is branding. The test we apply is simple: if a user cannot open the thing and see who is acting, on what authority, with what evidence, then the word is decoration and it should be cut. That test has already removed several terms from this list.',
    },
    {
      _type: 'callout',
      tone: 'note',
      title: 'The Golden Record is not a ranking',
      text: 'It is a set of attributable claims and works with provenance — not a universal numerical ranking of people. Corrections and disagreements are recorded without pretending the original claim never existed. [Why we refuse the score](/blog/against-the-vanity-score).',
    },
  ],
  faqs: [
    {
      question: 'What is an SCircle?',
      answer:
        'An SCircle is a group with a shared map of understanding: the participants and their declared intentions, the relevant people and resources, the work and places, the available evidence, the open questions, the possible futures, the chosen commitments and the observed outcomes.',
    },
    {
      question: 'What is a PRIME?',
      answer:
        'A PRIME is the continuing identity of a person participating in HERE — their chosen aims, contributions, relationships and authored representation. When a PRIME acts, you can inspect who is speaking, which representation is involved and what authority it has.',
    },
  ],
  related: [
    { label: 'The platform', href: '/platform', description: 'The vocabulary as product surfaces' },
    { label: 'FAQ', href: '/faq', description: 'Short answers to common questions' },
  ],
}

export const articles: Article[] = [socialLayer, vocabulary, vanityScore, explainLater]
