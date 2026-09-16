/**
 * Accessibility audit — contrast in BOTH colour schemes, plus alt text.
 *
 * Needs a headless Chrome with remote debugging on 9222 and the site on :3111:
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *     --headless --disable-gpu --remote-debugging-port=9222 --user-data-dir=/tmp/cdp &
 *   npm run build && npm start -- -p 3111
 *   node scripts/a11y-audit.mjs
 *
 * Alpha is composited down the ancestor chain and color(srgb …) is parsed, so the
 * ratios are the real ones — a naive checker reports false failures on both.
 */
/* Contrast audit via CDP. Handles rgba()/color(srgb) and composites alpha down the ancestor chain. */
const targets = await (await fetch('http://localhost:9222/json')).json()
const page = targets.find((t) => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
let id = 0; const pending = new Map()
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } })
await new Promise((r) => ws.addEventListener('open', r))
const send = (m, p = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method: m, params: p })) })
await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })

const EXPR = String.raw`(() => {
  // Parse rgb()/rgba() (0-255) and color(srgb r g b / a) (0-1) into [r,g,b,a] 0-255.
  const parse = (str) => {
    if (!str) return null
    const nums = (str.match(/-?[\d.]+(?:e-?\d+)?/g) || []).map(Number)
    if (!nums.length) return null
    const isUnit = /^color\(/.test(str)
    const scale = isUnit ? 255 : 1
    const [r, g, b] = [nums[0] * scale, nums[1] * scale, nums[2] * scale]
    const a = nums.length > 3 ? nums[3] : 1
    return [r, g, b, a]
  }
  const over = (fg, bg) => fg.slice(0,3).map((c, i) => c * fg[3] + bg[i] * (1 - fg[3])).concat(1)
  const lum = (c) => { const [r,g,b] = c.slice(0,3).map(v => { v /= 255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4) }); return 0.2126*r + 0.7152*g + 0.0722*b }
  const bgOf = (el) => {
    const stack = []
    for (let n = el; n; n = n.parentElement) {
      const c = parse(getComputedStyle(n).backgroundColor)
      if (c && c[3] > 0) { stack.push(c); if (c[3] === 1) break }
    }
    let base = [255,255,255,1]
    for (let i = stack.length - 1; i >= 0; i--) base = over(stack[i], base)
    return base
  }
  const fails = []
  for (const el of document.querySelectorAll('p, li, a, h1, h2, h3, h4, span, dt, dd, td, th, summary, button, figcaption, cite, strong, em, time')) {
    if (!el.textContent.trim() || el.children.length > 0) continue
    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) continue
    if (el.closest('.visually-hidden')) continue
    const bg = bgOf(el)
    const fg = over(parse(cs.color), bg)
    const size = parseFloat(cs.fontSize), weight = +cs.fontWeight || 400
    const large = size >= 24 || (size >= 18.66 && weight >= 700)
    const l1 = lum(fg), l2 = lum(bg)
    const ratio = (Math.max(l1,l2) + 0.05) / (Math.min(l1,l2) + 0.05)
    const min = large ? 3 : 4.5
    if (ratio < min - 0.01) fails.push({ t: el.textContent.trim().slice(0,34), r: +ratio.toFixed(2), need: min, px: Math.round(size), cls: (el.className||'').toString().split(' ')[0] })
  }
  const seen = new Set(); const uniq = fails.filter(f => !seen.has(f.cls + f.r) && seen.add(f.cls + f.r))
  return JSON.stringify({ fails: uniq.slice(0,8), noAlt: [...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length })
})()`

let problems = 0
for (const scheme of ['light', 'dark']) {
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] })
  for (const route of ['/', '/platform', '/pricing', '/compare/here-vs-circle', '/blog/the-here-vocabulary', '/trust', '/faq', '/use-cases/client-work', '/demo', '/legal/privacy']) {
    await send('Page.navigate', { url: 'http://localhost:3111' + route })
    await new Promise((r) => setTimeout(r, 800))
    const r = await send('Runtime.evaluate', { expression: EXPR, returnByValue: true })
    const v = JSON.parse(r.result.result.value)
    if (v.fails.length || v.noAlt) { problems++; console.log(scheme.padEnd(5), route, JSON.stringify(v)) }
  }
}
console.log(problems ? `${problems} pages with issues` : '✓ contrast passes AA in both schemes')
ws.close()
