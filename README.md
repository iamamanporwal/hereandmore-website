# HERE & More — marketing website

Production site for HERE & More, built with Next.js 16 (App Router), React 19 and TypeScript.
Every content route is statically generated. No UI framework, no CSS framework, no runtime
dependencies beyond React.

**Read [`docs/STRATEGY.md`](docs/STRATEGY.md) first** — it contains the positioning, the
information architecture, the seven target keywords and their page mapping, the internal-link
rules, and the SEO/AEO/GEO approach that the code implements.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static generation of all 25 routes + OG images
npm start          # serve the production build
```

Set `NEXT_PUBLIC_SITE_URL` before deploying (see `.env.example`). It drives canonicals,
the sitemap, OpenGraph URLs and JSON-LD, so a wrong value silently breaks all four.

## Verification

```bash
npm run typecheck
npm run audit        # SEO + link graph, against a running production build on :3111
npm run audit:a11y   # contrast in both colour schemes, needs headless Chrome on :9222
```

`npm run audit` is the one to wire into CI. It fails the build on a long title, a missing
canonical, a broken internal link, an unparseable JSON-LD block or a page with no answer block.

## How it is organised

```
app/                    Routes. One folder per URL; dynamic segments are fully prerendered.
  layout.tsx            Fonts, global metadata, Organization/WebSite/SoftwareApplication JSON-LD
  globals.css           The entire design system: tokens, type scale, components
  sitemap.ts robots.ts  Generated from the content graph
  rss.xml/ llms.txt/    Feed for readers, assertion map for AI crawlers
  */opengraph-image.tsx Per-page social cards, rendered to PNG at build time

components/
  templates/            The six reusable templates (see below)
  blocks/               Block renderer + safe inline formatter
  BotanicalMotif.tsx    The hero illustration — SVG, grows on load
  EarthFinale.tsx       The dark closing section — SVG Earth at night
  *.tsx                 Header, Footer, Faq, Cta, Related, Breadcrumbs, MapMotif, LoopStepper

content/                All copy, as typed TypeScript. The only place words live.
lib/
  content/types.ts      The content contract every template reads
  content/source.ts     The only module that knows where content comes from ← swap point
  seo.ts                Metadata builder + structured-data helpers
  site.ts               Names, nav, entity signals
sanity/                 Schemas mirroring the contract, ready for the CMS migration
scripts/                The two audit scripts
```

## Templates

| Template | Used by | Shape |
|---|---|---|
| `LandingTemplate` | home, platform, features, pricing, trust, faq, about, demo, legal | hero → answer → optional island → body → feature grids → FAQ → related → CTA |
| `UseCaseTemplate` | `/use-cases/*` | audience → outcomes → the situation today → workflow → body → FAQ |
| `ComparisonTemplate` | `/compare/*` | verdict both ways → who should choose them → matrix → body → FAQ |
| `ArticleTemplate` | `/blog/*` | dateline → answer + TOC → body → pillar link → FAQ |
| `Faq` | anywhere | native `<details>`, works without JS, emits FAQPage JSON-LD |
| `PageHeader` | all of the above | breadcrumb → eyebrow → one h1 → answer → actions |

Adding a page means adding a typed object in `content/`, registering it in
`lib/content/source.ts`, and adding a route that calls the right template. The sitemap,
JSON-LD, OG image and audit coverage follow automatically.

## Content rules the code enforces

1. **One answer block per page.** 40–60 words, directly under the h1, true standing alone.
   It is what an AI system quotes. `npm run audit` fails if it is missing.
2. **No page is a dead end.** Every document declares `related`; the Sanity schema requires two.
3. **Comparisons concede.** `summary.theyWin` is required and has a minimum of three entries.
4. **Roadmap is labelled as roadmap.** Unshipped capability gets a `callout` with `tone: 'limit'`.

## Before launch

Everything below needs a decision or an account that only you have. Nothing else is outstanding.

- [ ] **Pricing figures.** `content/pricing.ts` quotes directly rather than publishing numbers.
      Set `price` and `amount` per plan when terms are agreed; `amount: null` renders as
      price-on-application in structured data.
- [ ] **Legal review.** Both pages in `content/legal.ts` are complete and accurate but say
      plainly that counsel has not read them. Have a lawyer read them.
- [ ] **Entity facts.** Confirm the domain, the contact address and any profiles you own, then
      set `NEXT_PUBLIC_SAME_AS` and `NEXT_PUBLIC_TWITTER_HANDLE`. Unset means those signals are
      omitted rather than guessed.
- [ ] **Make `/demo` deliver.** Set `ACCESS_WEBHOOK_URL` (anything accepting a JSON POST) or
      `RESEND_API_KEY`. Until then submissions are accepted and logged, and the form tells the
      person to email instead.
- [ ] **`NEXT_PUBLIC_SITE_URL`** pointed at production.
- [ ] **Search Console and Bing** properties verified via
      `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION`, then
      submit `/sitemap.xml`.
- [ ] **Sanity (optional).** Set the three `NEXT_PUBLIC_SANITY_*` / `SANITY_API_READ_TOKEN`
      variables and the site reads the CMS instead of `/content`, with no template changes.
      The GROQ in `lib/content/sanity.ts` has not been run against a populated dataset — verify
      each document type renders before switching a route over.

## What this site does not claim

No customer logos, testimonials, case studies, usage statistics, uptime figures or security
certifications have been invented. Where a capability is not shipped, the page says so. This is
a positioning decision as much as an honesty one: AI systems cite sources that state their
limits, and buyers forgive a narrow product faster than an overstated one.
