import type { Metadata } from 'next'
import { SITE_URL, absoluteUrl, site } from './site'
import type { Article, Comparison, FaqItem, Seo } from './content/types'

/**
 * One metadata builder for every route. Guarantees a self-referencing absolute canonical,
 * a unique title and description, and matching OpenGraph/Twitter cards.
 */
export function buildMetadata(seo: Seo, path: string, extra?: Partial<Metadata>): Metadata {
  const url = absoluteUrl(path)
  const title = seo.title
  const ogImage = absoluteUrl(path === '/' ? '/opengraph-image' : `${path}/opengraph-image`)

  return {
    title,
    description: seo.description,
    alternates: { canonical: url },
    robots: seo.noindex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
        },
    openGraph: {
      type: 'website',
      url,
      title,
      description: seo.description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: seo.description,
      ...(site.twitter ? { site: site.twitter, creator: site.twitter } : {}),
      images: [ogImage],
    },
    ...extra,
  }
}

/* ------------------------------------------------------------------ */
/* Structured data                                                      */
/* ------------------------------------------------------------------ */

export const organizationLd = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: SITE_URL,
  description: site.description,
  email: site.email,
  foundingDate: site.founded,
  parentOrganization: { '@type': 'Organization', name: site.parentOrganization },
  ...(site.sameAs.length ? { sameAs: [...site.sameAs] } : {}),
  logo: { '@type': 'ImageObject', url: absoluteUrl('/icon.svg'), width: 512, height: 512 },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: site.email,
    availableLanguage: ['English'],
  },
}

export const websiteLd = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: site.name,
  description: site.description,
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
}

export const softwareLd = {
  '@type': 'SoftwareApplication',
  '@id': `${SITE_URL}/#software`,
  name: site.product,
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Collaboration',
  operatingSystem: 'Web',
  url: absoluteUrl('/platform'),
  description:
    'A social layer for CRM-based platforms and services. One shared map of aims, work, evidence and commitments for a group.',
  publisher: { '@id': `${SITE_URL}/#organization` },
  featureList: [
    'Shared map of understanding (SCircles)',
    'Observations with provenance',
    'Deliberation with explore, crystallize, commit and complete phases',
    'Commitments with acceptance criteria',
    'Authored editions with contributor approval',
    'On-camera contracting',
  ],
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqLd(items: FaqItem[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: stripMarkup(f.answer) },
    })),
  }
}

export function articleLd(article: Article, authorName: string) {
  return {
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(article.path)}#article`,
    headline: article.title,
    description: article.excerpt,
    abstract: article.answer,
    datePublished: article.published,
    dateModified: article.updated,
    author: { '@type': 'Person', name: authorName, url: absoluteUrl('/about') },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(article.path) },
    image: absoluteUrl(`${article.path}/opengraph-image`),
    articleSection: article.topic,
    wordCount: undefined,
    inLanguage: 'en-GB',
    isPartOf: { '@id': `${SITE_URL}/#website` },
  }
}

export function comparisonLd(c: Comparison) {
  return {
    '@type': 'ItemList',
    name: `${site.product} compared with ${c.competitor.name}`,
    description: c.answer,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: { '@type': 'SoftwareApplication', name: site.product, applicationCategory: 'BusinessApplication', url: absoluteUrl('/platform') },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: { '@type': 'SoftwareApplication', name: c.competitor.name, applicationCategory: 'BusinessApplication', ...(c.competitor.url ? { url: c.competitor.url } : {}) },
      },
    ],
  }
}

export function offersLd(plans: { name: string; amount: number | null; currency: string; summary: string }[]) {
  return {
    '@type': 'Product',
    name: site.product,
    description: softwareLd.description,
    brand: { '@id': `${SITE_URL}/#organization` },
    offers: plans.map((p) => ({
      '@type': 'Offer',
      name: p.name,
      description: p.summary,
      priceCurrency: p.currency,
      ...(p.amount !== null ? { price: p.amount } : { price: '0', priceSpecification: { '@type': 'PriceSpecification', valueAddedTaxIncluded: false } }),
      availability: 'https://schema.org/PreOrder',
      url: absoluteUrl('/pricing'),
    })),
  }
}

export function definedTermsLd(terms: { term: string; definition: string }[], path: string) {
  return {
    '@type': 'DefinedTermSet',
    '@id': `${absoluteUrl(path)}#glossary`,
    name: 'The HERE vocabulary',
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: stripMarkup(t.definition),
      inDefinedTermSet: `${absoluteUrl(path)}#glossary`,
    })),
  }
}

/** Wraps any set of nodes in one @graph so a page emits a single, connected JSON-LD block. */
export function graph(...nodes: Record<string, unknown>[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

/** Structured data must never contain our inline link/emphasis syntax. */
export function stripMarkup(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
}
