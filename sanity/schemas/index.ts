import { calloutBlock, definitionListBlock, stepsBlock, tableBlock } from './blocks'
import { article, author, comparison, landingPage, pricingPlan, useCase } from './documents'

/** Drop this array into your Sanity Studio config when the CMS is introduced. */
export const schemaTypes = [
  // documents
  landingPage,
  article,
  useCase,
  comparison,
  author,
  pricingPlan,
  // objects
  calloutBlock,
  tableBlock,
  definitionListBlock,
  stepsBlock,
]
