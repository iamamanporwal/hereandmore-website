/** Reusable field groups shared by every document type. */

/** Mirrors `Seo` in lib/content/types.ts. Length rules match the SEO checklist. */
export const seoField = {
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    {
      name: 'title',
      type: 'string',
      description: 'Max 60 characters. The site name is appended automatically.',
      validation: (rule: any) => rule.required().max(60),
    },
    {
      name: 'description',
      type: 'text',
      rows: 2,
      description: 'Max 155 characters. Write a sentence, not a keyword list.',
      validation: (rule: any) => rule.required().max(155),
    },
    {
      name: 'primaryKeyword',
      type: 'string',
      description: 'The one keyword this page owns. Internal QA only — never stuff it into the copy.',
    },
    { name: 'ogImageTitle', type: 'string', description: 'Overrides the headline on the social card.' },
    { name: 'noindex', type: 'boolean', initialValue: false },
  ],
}

/** Mirrors `BaseDocument.answer`. The single most important field on the site. */
export const answerField = {
  name: 'answer',
  title: 'Answer-first summary',
  type: 'text',
  rows: 4,
  description:
    '40–60 words, rendered directly under the H1. Must answer the page’s question completely while standing alone, out of context — this is the block an AI system quotes.',
  validation: (rule: any) => rule.required().min(160).max(600),
}

export const faqsField = {
  name: 'faqs',
  title: 'FAQs',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'question', type: 'string', validation: (rule: any) => rule.required() },
        {
          name: 'answer',
          type: 'text',
          rows: 3,
          description: 'The first sentence must answer the question completely.',
          validation: (rule: any) => rule.required(),
        },
        { name: 'category', type: 'string' },
        {
          name: 'readMore',
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'string' },
          ],
        },
      ],
      preview: { select: { title: 'question', subtitle: 'category' } },
    },
  ],
}

export const relatedField = {
  name: 'related',
  title: 'Keep reading',
  type: 'array',
  description: 'At least two. No page on this site is allowed to be a dead end.',
  validation: (rule: any) => rule.min(2),
  of: [
    {
      type: 'object',
      fields: [
        { name: 'label', type: 'string', validation: (rule: any) => rule.required() },
        { name: 'href', type: 'string', validation: (rule: any) => rule.required() },
        { name: 'description', type: 'string' },
      ],
    },
  ],
}

export const ctaField = {
  name: 'cta',
  title: 'Closing call to action',
  type: 'object',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'text', type: 'text', rows: 2 },
    {
      name: 'primary',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'href', type: 'string' },
      ],
    },
    {
      name: 'secondary',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'href', type: 'string' },
      ],
    },
  ],
}

export const slugField = {
  name: 'slug',
  type: 'slug',
  options: { source: 'title', maxLength: 72, slugify: (input: string) => input.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 72) },
  validation: (rule: any) => rule.required(),
}
