/**
 * SEO audit — run against a built site (`npm run build && npm start`, then `npm run audit`).
 *
 * Checks the rules the strategy depends on, so a regression fails loudly instead of
 * quietly costing rankings:
 *   · exactly one h1 per page
 *   · title ≤ 60 characters INCLUDING the brand template
 *   · description 70–155 characters
 *   · self-referencing absolute canonical
 *   · an answer-first block present
 *   · JSON-LD parses and includes a BreadcrumbList on every non-home page
 *   · every internal link resolves (no 404s, no orphan pages)
 *   · images have alt text; html has a lang attribute
 */
const BASE = process.env.AUDIT_BASE ?? 'http://localhost:3111'

const routes = [
  '/', '/platform', '/platform/capture', '/platform/rooms', '/platform/broadcast', '/platform/dialog',
  '/use-cases', '/use-cases/client-work', '/use-cases/communities', '/use-cases/building-in-public',
  '/compare', '/compare/here-vs-circle', '/compare/here-vs-honeybook',
  '/pricing', '/trust', '/faq', '/about', '/demo', '/blog',
  '/blog/what-is-a-social-layer-for-crm', '/blog/the-here-vocabulary',
  '/blog/against-the-vanity-score', '/blog/run-a-project-you-can-explain-a-year-later',
  '/legal/privacy', '/legal/terms',
]

const problems = []
const warnings = []
const linkTargets = new Set()

const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const fail = (route, msg) => problems.push(`${route} — ${msg}`)
const warn = (route, msg) => warnings.push(`${route} — ${msg}`)

for (const route of routes) {
  const res = await fetch(BASE + route)
  if (!res.ok) { fail(route, `HTTP ${res.status}`); continue }
  const html = await res.text()

  const h1s = html.match(/<h1[\s>]/g) ?? []
  if (h1s.length !== 1) fail(route, `${h1s.length} h1 elements (expected 1)`)

  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '')
  if (!title) fail(route, 'missing title')
  else if (title.length > 60) fail(route, `title ${title.length} chars: "${title}"`)
  else if (title.length < 20) warn(route, `title only ${title.length} chars: "${title}"`)

  const desc = decode(html.match(/name="description" content="(.*?)"/s)?.[1] ?? '')
  if (!desc) fail(route, 'missing description')
  else if (desc.length > 155) fail(route, `description ${desc.length} chars`)
  else if (desc.length < 70) warn(route, `description only ${desc.length} chars`)

  const canonical = html.match(/rel="canonical" href="(.*?)"/)?.[1]
  const expected = route === '/' ? 'https://hereandmore.com' : `https://hereandmore.com${route}`
  if (canonical !== expected) fail(route, `canonical "${canonical}" ≠ "${expected}"`)

  if (!html.includes('class="answer"')) fail(route, 'no answer-first block')
  if (!/<html lang="/.test(html)) fail(route, 'missing lang attribute')

  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt=/.test(img)) fail(route, 'img without alt')
  }

  const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((m) => m[1])
  if (!ldBlocks.length) fail(route, 'no JSON-LD')
  let types = []
  for (const block of ldBlocks) {
    try {
      const parsed = JSON.parse(block.replace(/\\u003c/g, '<'))
      types.push(...(parsed['@graph'] ?? [parsed]).map((n) => n['@type']))
    } catch (error) {
      fail(route, `JSON-LD does not parse: ${error.message}`)
    }
  }
  if (route !== '/' && !types.includes('BreadcrumbList')) fail(route, 'no BreadcrumbList')
  if (route === '/' && !types.includes('Organization')) fail(route, 'no Organization')

  if (!/property="og:image"/.test(html)) fail(route, 'no og:image')

  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) linkTargets.add(m[1])
}

// Every internal link must resolve.
for (const target of [...linkTargets].sort()) {
  if (target.startsWith('/_next') || target === '/') continue
  const res = await fetch(BASE + target, { method: 'HEAD' })
  if (!res.ok) fail('link graph', `${target} → HTTP ${res.status}`)
}

// Orphan check: every content route must be linked from somewhere.
for (const route of routes) {
  if (route !== '/' && !linkTargets.has(route)) warn('link graph', `${route} is not linked from any audited page`)
}

for (const file of ['/sitemap.xml', '/robots.txt', '/rss.xml', '/llms.txt', '/manifest.webmanifest']) {
  const res = await fetch(BASE + file)
  if (!res.ok) fail('crawl files', `${file} → HTTP ${res.status}`)
}

// robots.txt must never block the stylesheet or the fonts: a crawler that cannot fetch
// them renders the site unstyled and judges its layout on that.
{
  const robots = await (await fetch(BASE + '/robots.txt')).text()
  const home = await (await fetch(BASE + '/')).text()
  const assets = [...home.matchAll(/(?:href|src)="(\/_next\/[^"]+)"/g)].map((m) => m[1])
  const disallowed = robots.split('\n').filter((l) => /^disallow:/i.test(l.trim())).map((l) => l.split(':')[1].trim()).filter(Boolean)
  for (const asset of new Set(assets)) {
    const blocked = disallowed.find((d) => asset.startsWith(d))
    if (blocked) fail('robots.txt', `blocks its own asset: "${blocked}" covers ${asset}`)
  }
  for (const bot of ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot']) {
    if (!robots.includes(bot)) warn('robots.txt', `${bot} not named — it governs AI-search citability`)
  }
}

// Every CSS custom property referenced must resolve. A renamed token silently turns a
// declaration invalid, which is how a button once went invisible on the dark band.
{
  const cssHref = (await (await fetch(BASE + '/')).text()).match(/href="(\/_next\/static\/[^"]+\.css)"/)?.[1]
  if (!cssHref) warn('stylesheet', 'no stylesheet link found on the home page')
  else {
    const css = await (await fetch(BASE + cssHref)).text()
    const defined = new Set([...css.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]))
    // Injected by next/font on <html>, or set inline per element on the SVG motifs.
    // Set inline per element: next/font on <html>, or index/timing on motion elements.
    const runtime = new Set(['--font-sans', '--font-serif', '--delay', '--len', '--i'])
    for (const used of new Set([...css.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]))) {
      if (!defined.has(used) && !runtime.has(used)) fail('stylesheet', `var(${used}) is never defined`)
    }
  }
}

console.log(`\nAudited ${routes.length} routes and ${linkTargets.size} internal link targets.\n`)
if (warnings.length) {
  console.log(`⚠︎  ${warnings.length} warnings`)
  for (const w of warnings) console.log('   ' + w)
  console.log()
}
if (problems.length) {
  console.log(`✗  ${problems.length} problems`)
  for (const p of problems) console.log('   ' + p)
  process.exit(1)
}
console.log('✓  All checks passed.')
