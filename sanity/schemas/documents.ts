/**
 * Sanity document schemas, one per type in lib/content/types.ts.
 * Field names are identical to the TS interfaces so the GROQ projection in
 * lib/content/source.ts will be a near-direct mapping.
 */
import { bodyField } from './blocks'
import { answerField, ctaField, faqsField, relatedField, seoField, slugField } from './shared'

export const landingPage = {
  name: 'landingPage',
  title: 'Landing page',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (rule: any) => rule.required() },
    slugField,
    { name: 'path', type: 'string', description: 'Canonical route, e.g. /platform/capture', validation: (rule: any) => rule.required() },
    { name: 'eyebrow', type: 'string' },
    seoField,
    answerField,
    {
      name: 'hero',
      type: 'object',
      fields: [
        { name: 'headline', type: 'string', validation: (rule: any) => rule.required() },
        { name: 'headlineAccent', type: 'string', description: 'Rendered in display italic. Two or three words.' },
        { name: 'sub', type: 'text', rows: 2 },
        { name: 'primary', type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] },
        { name: 'secondary', type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] },
        {
          name: 'stats',
          type: 'array',
          of: [{ type: 'object', fields: [{ name: 'value', type: 'string' }, { name: 'label', type: 'string' }] }],
        },
      ],
    },
    bodyField,
    {
      name: 'sections',
      title: 'Feature sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'eyebrow', type: 'string' },
            { name: 'title', type: 'string' },
            { name: 'text', type: 'text', rows: 2 },
            {
              name: 'features',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string' },
                    { name: 'text', type: 'text', rows: 2 },
                    { name: 'icon', type: 'string', options: { list: ['aim', 'people', 'layers', 'broadcast', 'record', 'map', 'shield', 'spark', 'contract', 'clock'] } },
                    { name: 'href', type: 'string' },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    faqsField,
    relatedField,
    ctaField,
    { name: 'updated', type: 'date', validation: (rule: any) => rule.required() },
  ],
  preview: { select: { title: 'title', subtitle: 'path' } },
}

export const article = {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (rule: any) => rule.required() },
    slugField,
    { name: 'path', type: 'string' },
    { name: 'eyebrow', type: 'string' },
    { name: 'excerpt', type: 'text', rows: 2, validation: (rule: any) => rule.required().max(200) },
    seoField,
    answerField,
    { name: 'author', type: 'reference', to: [{ type: 'author' }], validation: (rule: any) => rule.required() },
    { name: 'topic', type: 'string' },
    { name: 'published', type: 'date', validation: (rule: any) => rule.required() },
    { name: 'updated', type: 'date', validation: (rule: any) => rule.required() },
    { name: 'readingMinutes', type: 'number', validation: (rule: any) => rule.required().min(1) },
    {
      name: 'pillar',
      title: 'Pillar page this supports',
      description: 'Every article must link up to a pillar. This is the content cluster, enforced.',
      type: 'object',
      fields: [
        { name: 'label', type: 'string' },
        { name: 'href', type: 'string' },
        { name: 'description', type: 'string' },
      ],
      validation: (rule: any) => rule.required(),
    },
    { name: 'featured', type: 'boolean', initialValue: false },
    bodyField,
    faqsField,
    relatedField,
  ],
  preview: { select: { title: 'title', subtitle: 'topic' } },
}

export const useCase = {
  name: 'useCase',
  title: 'Use case',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (rule: any) => rule.required() },
    slugField,
    { name: 'path', type: 'string' },
    { name: 'eyebrow', type: 'string' },
    { name: 'audience', type: 'string', validation: (rule: any) => rule.required() },
    seoField,
    answerField,
    {
      name: 'problem',
      title: 'The situation today',
      description: 'Written in the reader’s own words, not ours.',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'text', type: 'text', rows: 2 }] }],
      validation: (rule: any) => rule.min(3).max(3),
    },
    {
      name: 'outcomes',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'value', type: 'string' }, { name: 'label', type: 'string' }] }],
      validation: (rule: any) => rule.min(3).max(3),
    },
    {
      name: 'workflow',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'text', type: 'text', rows: 2 }] }],
    },
    bodyField,
    faqsField,
    relatedField,
    ctaField,
    { name: 'updated', type: 'date' },
  ],
  preview: { select: { title: 'title', subtitle: 'audience' } },
}

export const comparison = {
  name: 'comparison',
  title: 'Comparison',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (rule: any) => rule.required() },
    slugField,
    { name: 'path', type: 'string' },
    seoField,
    answerField,
    {
      name: 'competitor',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', validation: (rule: any) => rule.required() },
        { name: 'category', type: 'string' },
        { name: 'url', type: 'url' },
      ],
    },
    {
      name: 'summary',
      type: 'object',
      fields: [
        { name: 'hereWins', type: 'array', of: [{ type: 'string' }] },
        {
          name: 'theyWin',
          title: 'Where they win',
          description: 'Required, and must be genuine. A comparison that concedes nothing is not believed or cited.',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (rule: any) => rule.required().min(3),
        },
        { name: 'chooseThemIf', type: 'text', rows: 2, validation: (rule: any) => rule.required() },
      ],
    },
    {
      name: 'matrix',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'criterion', type: 'string' },
            { name: 'here', type: 'string' },
            { name: 'them', type: 'string' },
            { name: 'note', type: 'string', description: 'Use to mark where the competitor is ahead.' },
          ],
        },
      ],
    },
    bodyField,
    faqsField,
    relatedField,
    ctaField,
    { name: 'updated', type: 'date' },
  ],
  preview: { select: { title: 'title', subtitle: 'competitor.name' } },
}

export const author = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', validation: (rule: any) => rule.required() },
    { name: 'role', type: 'string' },
    slugField,
    { name: 'url', type: 'string' },
    { name: 'sameAs', type: 'array', of: [{ type: 'url' }], description: 'Feeds Person structured data.' },
  ],
}

export const pricingPlan = {
  name: 'pricingPlan',
  title: 'Pricing plan',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', validation: (rule: any) => rule.required() },
    { name: 'price', type: 'string', description: 'Display string, e.g. "£24" or "Talk to us".' },
    { name: 'priceNote', type: 'string' },
    { name: 'amount', type: 'number', description: 'Machine-readable for Offer structured data. Leave empty if not published.' },
    { name: 'currency', type: 'string', initialValue: 'GBP' },
    { name: 'summary', type: 'text', rows: 2 },
    { name: 'features', type: 'array', of: [{ type: 'string' }] },
    { name: 'cta', type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'href', type: 'string' }] },
    { name: 'featured', type: 'boolean', initialValue: false },
    { name: 'order', type: 'number' },
  ],
}
