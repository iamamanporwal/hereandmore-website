import type { LandingPage } from '@/lib/content/types'

/**
 * Legal copy. Complete and accurate to how the site and product actually behave, but not yet
 * reviewed by counsel — each page says so plainly rather than implying otherwise. Have a
 * lawyer read both before general availability.
 */

export const privacy: LandingPage = {
  _type: 'landing',
  slug: 'privacy',
  path: '/legal/privacy',
  updated: '2026-09-14',
  seo: {
    title: 'Privacy policy',
    description: 'What HERE & More collects, why, how long it is kept, and how to have it removed.',
  },
  eyebrow: 'Legal',
  title: 'Privacy policy',
  answer:
    'HERE & More collects the minimum needed to operate the service and to answer you when you get in touch. We do not sell personal data, we do not use it to train third-party models, and you can request a copy or a deletion at any time by writing to hello@hereandmore.com.',
  hero: {
    headline: 'Privacy',
    headlineAccent: 'policy.',
    sub: 'Last updated 14 September 2026.',
    primary: { label: 'Contact us', href: 'mailto:hello@hereandmore.com' },
  },
  body: [
    {
      _type: 'callout',
      tone: 'note',
      title: 'What this site does when you read it',
      text: 'Nothing. There is no analytics script, no advertising pixel, no third-party tag and no cookie set on these pages. Fonts are served from our own domain rather than a font CDN, so reading this site does not report your visit to anyone.',
    },
    { _type: 'heading', level: 2, text: 'What do you collect?', id: 'collect' },
    {
      _type: 'definitionList',
      items: [
        { term: 'When you get in touch', definition: 'Your name, your email address and whatever you choose to tell us about what you want to build. We use it to answer you and to decide whether we can help.' },
        { term: 'When you hold an account', definition: 'The identity records needed to sign you in, and the content you create in the product, held under the audience scope you choose.' },
        { term: 'Server logs', definition: 'Standard request logs kept briefly for security and to keep the service running. They are not used to build a profile of you.' },
      ],
    },
    { _type: 'heading', level: 2, text: 'What do you never do?', id: 'never' },
    {
      _type: 'list',
      style: 'bullet',
      items: [
        'We do not sell personal data, and we do not share it for advertising.',
        'We do not use your content to train third-party models.',
        'We do not widen the audience of anything you created without an explicit act by you.',
        'We do not make export of your own records conditional on a paid plan.',
        'We do not start a paid job — a Guardian build, an edit, a Dialog matter — as a side effect of you reading, opening or joining something.',
      ],
    },
    { _type: 'heading', level: 2, text: 'Who else can see it?', id: 'processors' },
    {
      _type: 'paragraph',
      text: 'Only the people and services needed to run what you asked for: our hosting provider, and any payment or delivery provider involved in a transaction you initiate. Each integration you connect declares what it may read and contribute before it is connected — [the integration rules are here](/trust#integrations). We will name the specific sub-processors and hosting regions that apply to your organisation during access.',
    },
    { _type: 'heading', level: 2, text: 'How long is it kept, and how do I remove it?', id: 'retention' },
    {
      _type: 'paragraph',
      text: 'Contact messages are kept while a conversation is live and for a reasonable period afterwards. Product content is kept for as long as you hold an account. Sensitive payloads can be withdrawn under a retention rule while the integrity of the surrounding record is preserved — the fact that a claim was made and later corrected survives, the private detail inside it need not.',
    },
    {
      _type: 'paragraph',
      text: 'Write to **hello@hereandmore.com** to request a copy of what we hold, a correction, or a deletion. You can also export everything you put into the product yourself, on any plan.',
    },
    { _type: 'heading', level: 2, text: 'Your rights', id: 'rights' },
    {
      _type: 'paragraph',
      text: 'Where UK or EU data protection law applies, you have the right to access your data, correct it, have it deleted, restrict or object to processing, and receive it in a portable form. You may also complain to your supervisory authority — in the UK, the Information Commissioner’s Office. We answer rights requests without charge and normally within a month.',
    },
    {
      _type: 'callout',
      tone: 'limit',
      title: 'Not yet reviewed by counsel',
      text: 'This policy accurately describes how the site and product behave today, and it has not been through legal review. It will be before general availability.',
    },
  ],
  related: [
    { label: 'Trust & provenance', href: '/trust', description: 'How the record model works' },
    { label: 'Terms of service', href: '/legal/terms' },
  ],
}

export const terms: LandingPage = {
  _type: 'landing',
  slug: 'terms',
  path: '/legal/terms',
  updated: '2026-09-14',
  seo: {
    title: 'Terms of service',
    description: 'The terms under which HERE & More provides access to HERE during private access.',
  },
  eyebrow: 'Legal',
  title: 'Terms of service',
  answer:
    'These terms cover access to HERE during its private access period. HERE is provided as-is while capabilities are being verified, you retain ownership of what you create, and either side can end the arrangement with notice and a complete export.',
  hero: {
    headline: 'Terms of',
    headlineAccent: 'service.',
    sub: 'Last updated 14 September 2026.',
    primary: { label: 'Contact us', href: 'mailto:hello@hereandmore.com' },
  },
  body: [
    { _type: 'heading', level: 2, text: 'What these terms cover', id: 'scope' },
    {
      _type: 'paragraph',
      text: 'They cover access to HERE & More during its private access period, for the person or organisation we have granted access to. Capabilities are labelled on each page as shipped, being verified, or roadmap, and that labelling is the commitment — we do not promise a capability that a page marks as roadmap.',
    },
    { _type: 'heading', level: 2, text: 'What you own', id: 'ownership' },
    {
      _type: 'paragraph',
      text: 'You own the ideas you bring and the content you create, including the product plans, the work produced from them and the record of how they were decided. Publishing an edition grants only the permissions recorded for that edition: viewing, redistribution, adaptation, model training, likeness use and sublicensing are separate, and none is implied by any other.',
    },
    { _type: 'heading', level: 2, text: 'What we own', id: 'ours' },
    {
      _type: 'paragraph',
      text: 'The software, the services and our own brand remain ours. Nothing here transfers them to you, and nothing here lets us claim your work because it passed through our software.',
    },
    { _type: 'heading', level: 2, text: 'What a Guardian build is, contractually', id: 'builds' },
    {
      _type: 'paragraph',
      text: 'A build is a job you authorise, not a standing arrangement. Each one carries a named payer, a budget, a defined scope and a stop condition, and it does not begin as a side effect of a conversation. Output belongs to you on the terms above. If a build cannot be completed within its authorised scope we stop and tell you, rather than continuing and billing.',
    },
    { _type: 'heading', level: 2, text: 'Spend', id: 'spend' },
    {
      _type: 'paragraph',
      text: 'Every paid job is authorised individually. Changing the parties, the scope or the budget after confirmation requires a fresh authorisation. If a charge has an uncertain result it is reconciled before anything is retried, so you are not charged twice for one piece of work.',
    },
    { _type: 'heading', level: 2, text: 'Acceptable use', id: 'use' },
    {
      _type: 'list',
      style: 'bullet',
      items: [
        'Do not use the service to build or distribute anything unlawful, or anything that infringes someone else’s rights.',
        'Do not misrepresent who you are, or publish an edition containing someone’s likeness or contribution without their recorded approval.',
        'Do not attempt to reach records outside the audience scope granted to you.',
      ],
    },
    { _type: 'heading', level: 2, text: 'Availability and liability', id: 'availability' },
    {
      _type: 'paragraph',
      text: 'During private access the service is provided as-is and without an availability warranty, because capabilities are still being verified. Our liability is limited to the amount you have paid us in the preceding twelve months. Nothing here limits liability that cannot lawfully be limited.',
    },
    { _type: 'heading', level: 2, text: 'Ending the arrangement', id: 'ending' },
    {
      _type: 'paragraph',
      text: 'Either side may end the arrangement with reasonable notice. You keep the ability to export what you put in, on any plan and after it ends. We will not hold your product context hostage to a renewal.',
    },
    { _type: 'heading', level: 2, text: 'Changes and governing law', id: 'changes' },
    {
      _type: 'paragraph',
      text: 'If we change these terms materially we will tell you before the change applies to you. These terms are governed by the law of England and Wales.',
    },
    {
      _type: 'callout',
      tone: 'limit',
      title: 'Not yet reviewed by counsel',
      text: 'These terms accurately describe how we intend to operate, and they have not been through legal review. They will be before general availability.',
    },
  ],
  related: [
    { label: 'Privacy policy', href: '/legal/privacy' },
    { label: 'Trust & provenance', href: '/trust', description: 'The record and spend model' },
  ],
}
