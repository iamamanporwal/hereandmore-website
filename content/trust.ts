import type { LandingPage } from '@/lib/content/types'

export const trust: LandingPage = {
  _type: 'landing',
  slug: 'trust',
  path: '/trust',
  updated: '2026-09-14',
  seo: {
    title: 'Audit trail for collaborative work',
    description:
      'How HERE records evidence, corrections, audience, consent and spend — and what it refuses to do quietly. The record model, stated plainly.',
    primaryKeyword: 'audit trail for collaborative work',
    ogImageTitle: 'Trust, provenance and the record',
  },
  journeyStep: { n: '04', title: 'Keep improving — the context stays with you' },
  eyebrow: 'Trust',
  title: 'An audit trail you would be willing to read out loud',
  answer:
    'An audit trail for collaborative work records not only what changed, but who claimed it, on what evidence, at which version, and who accepted it. HERE keeps observation, interpretation, claim and correction as four distinct records. It is what makes step four of the journey true: every decision, every reason and every version of your product stays yours.',
  hero: {
    headline: 'The record is',
    headlineAccent: 'the product.',
    sub: 'Your product context is the thing you are actually buying. This is exactly what is kept, who can see it, and what can never happen quietly.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Read the FAQ', href: '/faq' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'What does the record actually store?', id: 'record' },
    {
      _type: 'definitionList',
      items: [
        { term: 'Observation', definition: 'What was observed, when it occurred, when it was recorded, by whom, where, and against which source version.' },
        { term: 'Interpretation', definition: 'Anything derived, structured or summarised from an observation. Labelled as interpretation. Enrichment is not new firsthand evidence.' },
        { term: 'Claim', definition: 'An assertion made from evidence, with its author, its witnesses, its uncertainty and the edition it belongs to.' },
        { term: 'Correction', definition: 'A superseding record. The original claim, the disagreement and the revision all remain legible; nothing is quietly rewritten.' },
      ],
    },
    {
      _type: 'paragraph',
      text: 'A useful entry in the record states the aim, the contribution, the result, the evidence, the witnesses, the uncertainty, the relevant edition and any subsequent uses. That is a heavier record than a timestamped log line, and it is the reason the record is still worth something a year later.',
    },
    { _type: 'heading', level: 2, text: 'Who can see what, and when?', id: 'consent' },
    {
      _type: 'list',
      style: 'bullet',
      items: [
        'Sharing is an act, not a setting. You select a specific revision, see the audience, and get a receipt.',
        'Private notes and personal analysis stay private unless their owner explicitly selects them.',
        'Consent is never inferred from someone appearing or speaking on camera.',
        'Receiving a published edition never opens the source archive behind it.',
        'Joining a service later does not retroactively widen the audience of an earlier private matter.',
      ],
    },
    { _type: 'heading', level: 2, text: 'Can opening something in HERE cost me money?', id: 'spend' },
    {
      _type: 'paragraph',
      text: 'Conversation context, expenditure authorisation and observed usage are three separate records. Opening a recording, reading a message, selecting a card or joining a group must not silently start a paid job.',
    },
    {
      _type: 'table',
      columns: ['Record', 'What it holds'],
      rows: [
        ['Conversation context', 'The work or matter, its purpose and its audience'],
        ['Expenditure authorisation', 'The selected job — a Guardian build, a video edit, a live production, a Dialog matter — with its payer, any shared sponsor or split, the budget, its validity and its stop conditions'],
        ['Observed usage and result', 'Measured cost where available, estimates labelled separately, outputs, and any unresolved or interrupted work'],
      ],
    },
    {
      _type: 'paragraph',
      text: 'Changing the parties, the selected context or the budget after confirmation requires a fresh appraisal of that change. If a charge has an uncertain result, it is reconciled before anything is retried — no double charging, no duplicate work.',
    },
    { _type: 'heading', level: 2, text: 'What does each reader actually see?', id: 'levels' },
    {
      _type: 'table',
      caption: 'The same chapter, read at four different access levels',
      columns: ['Reader', 'Sees', 'Cannot see'],
      rows: [
        ['The author', 'Everything: private notes, rejected options, margins, drafts, every revision', '—'],
        ['A collaborator in the SCircle', 'The aim, the decision and its owner, commitments, shared evidence, the work', 'Private notes, personal analysis, anything not explicitly selected'],
        ['The client or an invited guest', 'The options put to them, the agreed scope and criteria, the delivered edition, receipts', 'Internal deliberation, estimates, margins, the source archive'],
        ['A reader of a published edition', 'The authored account and whatever the rights for that edition permit', 'The project behind it, its revisions, and every unselected source'],
      ],
    },
    {
      _type: 'paragraph',
      text: 'A reader never moves up a level by accident. Buying an edition does not make somebody a collaborator, and joining an SCircle later does not open anything that was private before they arrived.',
    },
    { _type: 'heading', level: 2, text: 'How is access to an integration scoped?', id: 'integrations' },
    {
      _type: 'paragraph',
      text: 'Scope is derived through the actual resource and the actual caller, with role checks appropriate to reading, connecting, changing credentials and executing. Every integration declares which identities and source groups it can resolve, what it may read or contribute, the reader scope, freshness, provenance and revocation behaviour.',
    },
    {
      _type: 'callout',
      tone: 'evidence',
      title: 'Where this discipline comes from',
      text: 'An independent review of the archived predecessor system, dated 8 September 2026, identified unsafe financial state transitions, an over-broad project transfer path and inconsistent integration authorisation. Those findings set the bar for what must be verified before HERE touches real money or real organisations. We would rather show you the list than pretend it never existed.',
    },
    { _type: 'heading', level: 2, text: 'How are corrections and deletions handled?', id: 'retention' },
    {
      _type: 'paragraph',
      text: 'Permanence applies to the integrity of the record — that a claim was made and later corrected — not indiscriminately to every private detail inside it. Sensitive payloads can be withdrawn under a retention rule while the fact of the correction survives.',
    },
    {
      _type: 'paragraph',
      text: 'Preservation needs a real operating model rather than a promise: exportable packages, independent copies, a named custodian, recoverable access arrangements, format migration, and resources for ongoing storage. A legacy mandate should be chosen while the author is still able to express it.',
    },
    { _type: 'heading', level: 2, text: 'What we do not claim', id: 'claims' },
    {
      _type: 'list',
      style: 'bullet',
      items: [
        'No security certification is claimed. When an audit is completed, this page will name the standard, the auditor and the date.',
        'No uptime figure is published until there is a measured one to publish.',
        'Capabilities in development are labelled as roadmap on the page that describes them.',
        'Comparisons with other products are design judgments from public evidence, not authenticated tests of their systems.',
      ],
    },
  ],
  faqs: [
    {
      question: 'What is an audit trail for collaborative work?',
      answer:
        'It is a record of not just what changed, but who claimed it, on what evidence, against which version, and who accepted the result. A conventional audit log answers "what happened"; a collaborative audit trail also answers "on what basis", which is the question that actually arises in a dispute.',
    },
    {
      question: 'Is HERE SOC 2 or ISO 27001 certified?',
      answer:
        'No, and we will not imply otherwise. HERE is in private access. When a certification is achieved, this page will state the standard, the auditing body and the date it was issued.',
    },
    {
      question: 'Can I get my data out?',
      answer:
        'Yes, always, on every plan. Export is not a retention lever. Preservation of a record needs exportable packages, independent copies and a named custodian, and none of that works if the export button is a paid feature.',
      readMore: { label: 'Pricing principles', href: '/pricing#never' },
    },
    {
      question: 'Where is data stored and who can read it?',
      answer:
        'Every read is scoped through the resource and the caller rather than a shared team-wide key, so a reader sees what their role permits and nothing wider. Specific hosting regions and sub-processors are confirmed per organisation during access — ask and we will answer precisely.',
    },
  ],
  related: [
    { label: 'Capture', href: '/platform/capture', description: 'Where provenance is created' },
    { label: 'Dialog', href: '/platform/dialog', description: 'Consent and contracting on camera' },
    { label: 'Pricing', href: '/pricing', description: 'What a plan never gates' },
  ],
  cta: {
    title: 'Send this page to your security reviewer',
    text: 'If they have questions it does not answer, we would like to hear them — that is how the page gets better.',
    primary: { label: 'Request access', href: '/demo' },
    secondary: { label: 'Read the FAQ', href: '/faq' },
  },
}
