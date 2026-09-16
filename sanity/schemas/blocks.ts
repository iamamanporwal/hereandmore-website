/**
 * Sanity object schemas mirroring `Block` in lib/content/types.ts.
 * Not wired up yet — this is the migration target, written alongside the types so the two
 * cannot drift. Add these to your Sanity Studio's schema array when the CMS is introduced.
 */
export const calloutBlock = {
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    {
      name: 'tone',
      type: 'string',
      options: { list: [
        { title: 'Note', value: 'note' },
        { title: 'Limit / honest caveat', value: 'limit' },
        { title: 'Evidence', value: 'evidence' },
      ] },
      initialValue: 'note',
      validation: (rule: any) => rule.required(),
    },
    { name: 'title', type: 'string' },
    { name: 'text', type: 'text', rows: 3, validation: (rule: any) => rule.required() },
  ],
}

export const tableBlock = {
  name: 'tableBlock',
  title: 'Table',
  type: 'object',
  fields: [
    { name: 'caption', type: 'string' },
    { name: 'columns', type: 'array', of: [{ type: 'string' }], validation: (rule: any) => rule.min(2).max(5) },
    {
      name: 'rows',
      type: 'array',
      of: [{ type: 'object', fields: [{ name: 'cells', type: 'array', of: [{ type: 'string' }] }] }],
    },
  ],
}

export const definitionListBlock = {
  name: 'definitionList',
  title: 'Definition list',
  type: 'object',
  fields: [
    {
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'term', type: 'string', validation: (rule: any) => rule.required() },
            { name: 'definition', type: 'text', rows: 2, validation: (rule: any) => rule.required() },
          ],
        },
      ],
    },
  ],
}

export const stepsBlock = {
  name: 'steps',
  title: 'Steps',
  type: 'object',
  fields: [
    {
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', validation: (rule: any) => rule.required() },
            { name: 'text', type: 'text', rows: 2, validation: (rule: any) => rule.required() },
          ],
        },
      ],
    },
  ],
}

/** The body field used by every document type. Portable Text + the custom blocks above. */
export const bodyField = {
  name: 'body',
  title: 'Body',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Paragraph', value: 'normal' },
        { title: 'Lead paragraph', value: 'lead' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
      ],
      marks: {
        decorators: [
          { title: 'Bold', value: 'strong' },
          { title: 'Italic', value: 'em' },
          { title: 'Code', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [{ name: 'href', type: 'url', validation: (rule: any) => rule.uri({ allowRelative: true }) }],
          },
        ],
      },
    },
    { type: 'callout' },
    { type: 'tableBlock' },
    { type: 'definitionList' },
    { type: 'steps' },
    { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', validation: (rule: any) => rule.required() }] },
  ],
}
