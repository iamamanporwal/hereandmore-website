# HERE & More — website strategy

Version 2.0 · 15 September 2026 · Owner: aman@aganastudios.com

Source material: `HERE-review.pdf` (research review, 8 Sep 2026), the studio direction note
of 12 Sep 2026 ("HERE, Dialog and the shared game"), and the supplied visual reference.

---

## 1. What the company actually does

**HERE & More turns an idea into a working business, in seven steps.**

You describe what you want to build. An AI product manager turns that conversation into a
product plan. Guardians build the first working version. You keep improving it. An AI marketing
manager learns your audience. Content goes live across seven platforms. A lead pipeline is built
from everything already known about the product.

```
Idea → Product → Marketing → Content → Distribution → Leads
```

**What makes that possible is a social layer for CRM-based platforms.** Seven steps only work
if the context survives the handoffs — otherwise the idea is re-explained to a designer, a
developer, a marketer and an ad writer, losing something each time. The layer is what carries
the aim, the deliberation, the commitments and the evidence through every step.

So the site has two levels, and both are load-bearing:

| Level | Owns | Pages |
|---|---|---|
| **The journey** — what you get | The promise, the seven steps, the outcome | `/`, `/#journey`, and a step badge on every interior page |
| **The layer** — why it works | The mechanism, the provenance, the trust case | `/platform`, `/trust`, the feature pages |

The unit of value is a **chapter**: a chosen aim, the work done against it, the evidence of what
changed, and an authored account that another person can build on.

```
Observe → understand the present → choose an aim → explore alternatives → commit →
act → inspect the result → revise → author and share → enable another contribution
```

### The service map (used verbatim as the site's product IA)

| Layer | What it does |
|---|---|
| **JEM** | Shared identity and sign-in. Holding an identity does not enrol you in every service. |
| **HERE** | The social layer: SCircles, CRM context, and a shared map of understanding across Capture, Broadcast and Rooms. |
| **Capture** | Observations with provenance — occurrence time, recording time, owner, place, source version, corrections. |
| **Broadcast** | Building in public: live work, episodes, recordings, versioned editions, participant approval. |
| **Rooms** | Deliberation that leads to action — explore, crystallize, commit, complete. |
| **Studio (IDS)** | The design-and-build harness: briefs, versions, tools, reviews, deployment approvals, results. |
| **Dialog** | Serious legal and financial conversations, on-camera contracting, separately authorised spend. |
| **Everything** | The continuing record of sources, versions, relationships and outcomes, under reader scope. |

### ICP

| # | Segment | Trigger to buy | Primary page |
|---|---|---|---|
| 1 | **Studios, agencies and product teams (5–200)** running real client work | Work is scattered across CRM, chat, docs and calls; nobody can reconstruct *why* a decision was made | `/use-cases/client-work` |
| 2 | **Community and network operators** running member-led projects | A community that talks but never ships; no path from discovery to a shared aim | `/use-cases/communities` |
| 3 | **Platform and CRM teams** that need a social layer rather than another silo | Their product records outcomes but cannot host the collaboration around them | `/platform` |

Buyer: founder, ops lead, studio principal, community director. Champion: project lead.
Blocker: security/legal — hence a first-class `/trust` page.

### Differentiation (each claim traceable to source material)

1. **The chapter, not the feed.** Aim → work → evidence → authored edition, in one container.
2. **Provenance by default.** Observation, interpretation, claim and correction are distinct records.
3. **Separation of identity, membership, visibility and spend.** Joining does not expose your network;
   opening a card never starts a paid job.
4. **A deliberate handoff for serious matters.** Context, parties, audience and budget are previewed
   before anything crosses into an on-camera Dialog matter.
5. **Honest progress.** Progress is measured against a chosen aim. No vanity score, no ranking of people.
6. **Open to other networks.** A group elsewhere can join an SCircle through a permissioned integration
   without importing an unrelated graph.

### Competitive set

Circle / Mighty Networks (community), HoneyBook / SuiteDash (client ops), Notion / Linear (work),
Ghost / Substack / Patreon (publishing), Frame.io (review + provenance), CoachAccountable (accountability).
None combine a shared social map, provenance, and an explicit path to contracting.

---

## 2. Information architecture — only pages that earn their place

```
/                                Home — the seven-step story + the answer block
/platform                        PILLAR · product hub
  /platform/capture              Feature — evidence with provenance
  /platform/rooms                Feature — deliberation that ends in a commitment
  /platform/broadcast            Feature — building in public, authored editions
  /platform/dialog               Feature — on-camera contracting
/use-cases                       Index
  /use-cases/client-work         Use case — studios & agencies
  /use-cases/communities         Use case — community operators
  /use-cases/building-in-public  Use case — teams that publish their work
/compare                         Index
  /compare/here-vs-circle        Comparison
  /compare/here-vs-honeybook     Comparison
/pricing                         Plans + what a plan does NOT do
/trust                           PILLAR · provenance, privacy, spend control, security
/blog                            Index
  /blog/[slug]                   Article template (3 seed posts)
/faq                             Answer-first FAQ (AEO/GEO surface)
/about                           Entity page — org, people, principles
/demo                            Conversion — request access
/legal/privacy, /legal/terms     Required
/rss.xml, /sitemap.xml, /robots.txt, /llms.txt
```

Deliberately **not** built: a careers page with no roles, a customers page with no customers,
a resources maze, per-integration landing pages before integrations exist.

---

## 3. The seven keywords

Chosen for intent × achievable competition × business value. Each has exactly one owner page;
no two pages compete for the same term.

| # | Keyword | Intent | Why it wins | Owner page |
|---|---|---|---|---|
| 1 | `social layer for CRM` | Commercial investigation | Category-defining, near-zero incumbent ownership, highest strategic value — the term we intend to *be* the answer to | `/platform` |
| 2 | `client collaboration platform` | Commercial | Real budget attached; ICP 1's exact words; mid competition beatable with depth | `/use-cases/client-work` |
| 3 | `community platform for organizations` | Commercial | ICP 2 head term; we differentiate on "from discussion to shared aim" | `/use-cases/communities` |
| 4 | `Circle alternative` | High-intent commercial | Alternative-seekers convert 3–5× category terms; low difficulty | `/compare/here-vs-circle` |
| 5 | `HoneyBook alternative` | High-intent commercial | Same mechanic for ICP 1; captures dissatisfaction with client-portal tools | `/compare/here-vs-honeybook` |
| 6 | `on-camera contract signing` | Informational → commercial | Distinctive, unclaimed, strong AI-citation surface; defines a category we own | `/platform/dialog` |
| 7 | `audit trail for collaborative work` | Informational | Blocker-facing; unlocks security review; feeds every AI answer about provenance | `/trust` |

Brand terms (`HERE & More`, `HERE app`, `Agana Studios`) are owned by `/` and `/about`.
Definitional long-tails ("what is a social layer", "what is an SCircle") are owned by `/faq`
and the glossary post, which link up to the pillars.

### Keyword → page → internal-link map

```
        ┌──────────────── / (brand, category) ────────────────┐
        │                      │                              │
   /platform ①            /use-cases                      /trust ⑦
   (PILLAR)                /  |  \                        (PILLAR)
   /capture              ②   ③   building-in-public          │
   /rooms                 \   |   /                           │
   /broadcast              \  |  /                            │
   /dialog ⑥ ──────────────►/compare/here-vs-circle ④        │
        │                  /compare/here-vs-honeybook ⑤       │
        └────────────► /pricing ◄──── every page's CTA ───────┘
                            │
                         /demo (conversion)
        /blog/* ──► links up to its pillar (platform | trust | use case)
        /faq   ──► links down to the page that answers each question in full
```

Rules enforced in code (`components/templates/*`):
- Every page renders a breadcrumb (and `BreadcrumbList` JSON-LD).
- Every page declares `related: []` → rendered as a "Keep reading" block.
- Body copy links with descriptive anchors, never "click here".
- Comparison and use-case pages always link to the pillar *and* to pricing.

---

## 4. SEO / AEO / GEO content strategy

**Answer-first.** Every page opens with a 40–60 word definitional answer in a `<p class="answer">`
directly under the H1. This is the block an AI system lifts. It must be true standing alone,
without the surrounding page.

**Extractable structure.** One H1. H2s phrased as the question a person actually asks.
Short paragraphs. Tables for comparisons. Definition lists for vocabulary. Numbers with units.

**Evidence, not adjectives.** We cite the 8 Sep 2026 research review (210 offerings across 37 models),
name the mechanisms, and state limits openly — including what is planned rather than shipped.
Honest limits are *why* an AI system quotes you rather than paraphrasing a competitor.

**Entity signals.** Consistent `Organization` (HERE & More, part of Agana Studios) with `sameAs`,
`SoftwareApplication` for the product, `Person` for authors, `DefinedTerm` for the vocabulary,
`FAQPage`, `BlogPosting`, `BreadcrumbList`, `Offer` on pricing. Same name string everywhere:
"HERE & More". Product is "HERE". Never mixed.

**`/llms.txt`** gives AI crawlers a clean map of what the site asserts, with URLs.

**Voice.** Short sentences. Concrete nouns. No "revolutionise", no "seamless", no "unlock".
The brand line stays literary ("Directing a life. Building a world."); the explanation stays plain.

---

## 5. Design direction (Claude Design)

**Premium editorial, not SaaS dashboard.** Warm ivory ground, high-contrast serif display,
restrained sans UI, hairline rules, generous whitespace, minimal rounding, soft warm shadows.
Calm and cinematic — the page should feel like a well-set book that happens to be software.

| Decision | Value | Why |
|---|---|---|
| Ground | Ivory `#fbf8f2`, sunken `#f4f0e6`, card `#fffdf9` | Warm, never grey; the whole palette mixes toward paper |
| Ink | `#1c1813` / muted `#4a4239` / subtle `#635a4d` | Warm charcoal rather than black; subtle clears AA at 12px |
| Accent | Sage `#47604e`, ember `#8a5620` for honest caveats | Colour lives in the illustration, not the chrome |
| Display face | **Bodoni Moda** (variable, optical sizing, italic) | A true Didone: the thick/thin contrast is the editorial signal |
| UI face | **Instrument Sans** | Restrained modern grotesque; deliberately not Inter |
| Rules | 1px at 10% warm ink | Hairlines, not borders |
| Rounding | 12px cards, pill buttons, 3px inputs | Minimal — enough to feel soft, not enough to feel like a widget |
| Shadow | `0 1px 2px / 0 22px 48px -28px` warm | A sheet of paper lifted, never a floating chip |

Below roughly 20px a Didone goes spindly, so small headings use the `.h-ui` class and the
sans face. That rule is why the type never looks fragile at card and label sizes.

### The two illustrations

Neither is an SVG drawing any more. The research that drove the change is in
`docs/ARTWORK-PLAN.md`; the decisive constraint is that applying an SVG filter to an element
that also animates its transform forces the browser to recompute the filter every frame rather
than compositing a cached layer — which rules out live painterly filters on moving artwork.

**The hero plant** (`components/PlantCanvas.tsx`, `lib/art/`). Painted on canvas with a real
brush engine: a dab sprite carrying bristle streaks is stamped along each stroke path with
seeded jitter in position, angle, size, opacity and tint, and every form is laid down in three
passes — opaque body, shadow glaze, lit highlight — against one light direction. It paints
itself on, then the loop **stops permanently**; the ambient sway afterwards is CSS transforms on
three depth-layer canvases, so it composites and never repaints. The palette switches with the
colour scheme and repaints in one pass rather than re-growing. A flat SVG silhouette is
server-rendered underneath **for crawlers and for JavaScript being off only** — an inline script
sets `class="js"` during parse so the silhouette is never shown to a visitor who will get the
painting, which would otherwise read as clipart swapping for art.

**The Earth finale** (`components/EarthCanvas.tsx`). A single WebGL2 fragment shader over one
triangle: an orthographic sphere whose normal is recovered analytically, continents from
domain-warped fbm on the rotated normal, a narrow warm terminator band, city lights clustered
onto land by a thresholded second fbm, an independently drifting cloud deck, and a Fresnel
atmosphere gated to outside the limb. Renders at 0.75× resolution with DPR capped at 1.5, and
the loop stops whenever the section is off screen or the tab is hidden. Falls back to a compact
gradient SVG when WebGL2 is unavailable.

Measured: 60 fps median for both, at 1440px and at 390px, on software WebGL.

### Interaction

Understated and smooth throughout: 0.2–0.3s eases, 1–3px lifts, no bounce, no parallax tricks.
The chapter loop is a real ARIA tablist you can click and arrow-key through; the FAQ is native
`<details>`; the comparison table has sticky headers. Two client islands, ~2 KB total.

## 6. Technical SEO checklist (all implemented)

| Area | Implementation |
|---|---|
| Rendering | Next.js 16 App Router, fully static (SSG) for every content route |
| Semantics | One `h1`/page, `header/nav/main/article/aside/footer`, `<time datetime>`, `<dl>` for terms |
| Metadata | Per-route `generateMetadata`, unique title ≤60ch + description ≤155ch, `metadataBase` |
| Canonicals | Absolute self-canonical on every route via `alternates.canonical` |
| Indexation | `robots.ts` (allow all, block `/api/`), `noindex` on thin/legal-utility routes as needed |
| Sitemap | `sitemap.ts` generated from the content graph with `lastModified`, priority, changeFrequency |
| Structured data | Organization, WebSite+SearchAction, SoftwareApplication, BreadcrumbList, FAQPage, BlogPosting, ItemList, Offer, DefinedTerm |
| Social | `opengraph-image.tsx` per template, Twitter summary_large_image |
| URLs | Lowercase, hyphenated, no trailing slash, no params; `/vs/*`, `/features`, `/product` → 301 |
| CWV | Self-hosted fonts via next/font with metric-adjusted fallbacks (no CLS), no blocking JS, no above-fold images |
| A11y | WCAG 2.2 AA, verified: skip link, visible focus rings, ≥4.5:1 contrast in **both** colour schemes (`npm run audit:a11y`), `<details>` FAQ that works without JS, ARIA tablist with roving tabindex, labelled landmarks, reduced-motion |
| Security | CSP, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame-ancestors none |
| Images | SVG-first; `next/image` wrapper with explicit dimensions for future CMS media |

---

## 7. CMS architecture (Sanity-ready, not Sanity-coupled)

Content lives behind one interface so the CMS can be swapped in without touching a template:

```
content/*.ts          → typed source data (today)
lib/content/types.ts  → the contract: Page, Article, UseCase, Comparison, FaqItem, Author
lib/content/source.ts → getPage / getArticles / getComparison … (local today, Sanity tomorrow)
sanity/schemas/*.ts   → the matching Sanity document schemas, already written
```

Every template reads *only* from `lib/content/source.ts`. Swapping in Sanity means replacing the
body of ~8 functions and adding a `sanity` client. Portable-text is anticipated by the `Block[]`
body type, which the renderer already walks.

---

## 8. What this site deliberately does not claim

No customer logos, testimonials, case studies, uptime figures, certifications or funding claims
have been invented. Pricing figures are marked `PLACEHOLDER` in `content/pricing.ts` and must be
confirmed before launch. Roadmap capabilities are labelled as roadmap, matching the research
review's own restraint about what is implemented versus planned.


---

## 9. Verification

Two scripts in `/scripts` encode the rules above so a regression fails loudly:

| Command | Checks |
|---|---|
| `npm run audit` | One h1/page · title ≤ 60 chars *including* the brand suffix · description 70–155 · self-referencing absolute canonical · answer block present · JSON-LD parses and carries BreadcrumbList · alt text · every internal link resolves · no orphan pages · crawl files serve |
| `npm run audit:a11y` | Contrast against the real composited background (alpha and `color(srgb …)` handled) in light **and** dark, plus missing alt text |

Both were run against the production build. Current status: 25 routes, 32 internal link
targets, 0 problems; contrast passes AA in both schemes.

**Measured payload (15 September 2026).** 0 KB of images — the hero plant is painted on canvas
and the Earth is a shader — 10 KB CSS, 127 KB of self-hosted font subsets, 10–18 KB of HTML per
page (**13.8 KB gzipped** on the home page). JavaScript is 152 KB: the App Router + React
runtime floor is ~138 KB of that, and our own client code is the brush engine, the Earth shader,
the reveal observer, the header and the access form. The LCP element is server-rendered text in
a `font-display: swap` face, so it paints on the first frame. Both artworks hold 60 fps median
at 1440px and 390px — see `docs/ARTWORK-PLAN.md`.

Findings fixed during the build, kept here because they are the ones that recur:
- Seven titles exceeded 60 characters once `· HERE & More` was appended.
- `transform-origin: center` on SVG resolves against the viewBox, not the shape, without
  `transform-box: fill-box` — the motif's pulses were drifting away from their nodes.
- Grid children default to `min-width: auto`, letting a scrollable table widen its track and
  push the whole page sideways at 390px.
- `content-visibility: auto` on the FAQ left the answers unpainted off-screen. Removed: those
  answers are the most-quoted content on the site.
- `--fg-subtle` and `--ember` failed AA in light mode at 12px. Darkened to 5.1:1 and 5.6:1.

From an independent audit with [claude-seo](https://github.com/AgriciDaniel/claude-seo) (v2.3.1),
run against a local production build:

- **`robots.txt` was blocking our own stylesheet.** `Disallow: /_next/static/chunks/` covered
  10 of the 13 assets on the page, the CSS bundle included. A crawler that cannot fetch the
  stylesheet renders the site unstyled and judges its layout and mobile-friendliness on that.
  Removed. `npm run audit` now cross-checks robots rules against the assets the page loads.
- **`Claude-SearchBot` was missing** from the explicit crawler grants. The pairs are routinely
  conflated and they are not interchangeable: `OAI-SearchBot` and `Claude-SearchBot` govern
  *search citability*, while `GPTBot` and `ClaudeBot` govern *training*. Naming one says
  nothing about the other. The robots rule now groups them by what they actually govern.
- **Zero outbound links sitewide.** The comparison pages said they were judged from each
  vendor's public pages but never linked them. They do now.
- **The home `<h1>` extracted as "…a life.Building a world."** — a block-level `<span>` with no
  whitespace before it. Invisible on screen, wrong in every text extraction.
- **A renamed colour token left `var(--paper)` dangling** in the dark CTA band, which made the
  button invisible against it. The audit now fails on any `var()` that never resolves.
- **Speculation Rules were absent** (preload score 50/100 → 75/100). Added prerender for the
  three routes that follow a first visit, and document-level prefetch for the rest.
- **Content quality scored 72–79/100 with zero filler and zero AI-writing patterns**, but every
  page flagged `low-density` — their measure of named entities plus numbers per 100 tokens.
  Fixed where it made the page genuinely better: question-form H2s matching real queries,
  an at-a-glance spec block on `/platform`, a table of the five records a Dialog matter keeps,
  and a worked example of an actual captured observation on `/platform/capture` (that page went
  0.13 → 0.38 density, 72 → 79 quality). Not fixed by stuffing proper nouns into prose to move
  a proxy metric — several explainer pages still flag, and that is the honest trade.

From the editorial redesign:
- A CSS `transform` on an SVG element **replaces** its `transform` attribute rather than
  composing with it — the bloom's petals all stacked unrotated until the rotation moved to a
  wrapper `<g>`.
- An SVG `feTurbulence` grain filter over gradient fills destroyed the colour entirely. Removed;
  the painterly quality comes from seeded irregularity and a drop-shadow instead.
- A `background: radial-gradient(...)` with no solid `background-color` makes contrast
  uncomputable — for auditors and for us. Every dark section now sets a flat colour first.
- The home page shipped at 103 KB gzipped: the botanical was rendered twice and the Earth
  carried 800+ circles. Now 40 KB, visually identical.


---

## 10. Completion pass — 15 September 2026

Everything outstanding from the previous status read, and what happened to it.

| Item | State |
|---|---|
| Interior pages reframed around the journey | **Done.** Every page carries a step badge linking to `/#journey`; `/platform` maps all seven steps to the surface that carries each; Guardians and the AI product manager now appear across the platform, use-case, trust, FAQ and about pages |
| Pricing placeholders | **Done, without inventing figures.** The tiers describe what they contain; the two paid tiers quote directly. Set `price` and `amount` per plan when terms are agreed — `amount: null` is reported as price-on-application, never as free |
| Legal drafts | **Done.** Both policies rewritten to describe what the site and product actually do — including that this site sets no cookies and loads no third-party tags. Each still states plainly that counsel has not reviewed it |
| Invented `sameAs` handles | **Removed.** A wrong `sameAs` is worse for entity resolution than none. Now driven by `NEXT_PUBLIC_SAME_AS`, and the Twitter card handle is omitted entirely when unset |
| Search Console / Bing verification | **Mechanism done.** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION`; the tags are omitted from the HTML when unset. Creating the properties needs your accounts |
| `/demo` posted nowhere | **Done.** Real accessible form — labelled fields, announced errors, focus moved to the first invalid field, honeypot — posting to `/api/access`. Delivery via `ACCESS_WEBHOOK_URL` or `RESEND_API_KEY`; with neither set the submission is accepted and logged and the UI tells the person to email instead, so it is never a dead end |
| Sanity not wired | **Done.** `lib/content/sanity.ts` queries the HTTP API with no client dependency; every getter in `source.ts` reads Sanity when configured and falls back to the local content otherwise — including on an empty result, so a half-populated dataset degrades instead of rendering blank pages. **The GROQ has not been run against a real dataset** |
| Low-density explainer pages | **Partly.** `/use-cases/client-work` 0.11 → **0.29**, `/use-cases/communities` 0.12 → **0.23**, both now passing with real worked examples. `/trust`, `/faq`, `/compare/here-vs-honeybook` and the social-layer essay still flag |
| Plant palette not theme-aware | **Done.** Two palettes; switching scheme repaints in one pass rather than replaying the growth |
| Design canvas artboards lag the site | **Open** — they still show the pre-canvas SVG artwork |

### Why four pages still flag low-density

The measure is named entities plus numbers per 100 tokens. `/faq` is deliberately terse — that
is what an FAQ is. `/trust` is principle-heavy prose whose value is the commitments it makes.
Raising either further means seeding proper nouns into sentences that do not want them, which
is the keyword-stuffing this strategy exists to avoid. Recorded as a deliberate trade, not an
oversight.

### Still needs you, not me

- **Real pricing figures** — the structure is ready for them.
- **A lawyer** on both legal pages before general availability.
- **The domain, the contact address and any social profiles you actually own.**
- **One environment variable** to make `/demo` deliver (`ACCESS_WEBHOOK_URL` is the fastest).
- **Search Console and Bing properties**, then submit `/sitemap.xml`.
