# Botanical and Earth artwork — implementation plan

Date: 14 September 2026. Supersedes the SVG-only approach in `docs/STRATEGY.md` §5.

## What the research settled

| Finding | Source | Consequence for us |
|---|---|---|
| A digital brush is a **stamp texture applied repeatedly along a stroke path**, with optional jitter of rotation and size per stamp; opacity buildup produces the translucency of real media | USPTO 10902645 "Dynamic stamp texture for digital paintbrush"; differentiable stroke-reconstruction work | The plant must be *painted* from stamped strokes, not filled from Bézier outlines |
| Oil layering is **thin semi-transparent glazes over dried opaque layers** | Oil-technique references | Paint each form in 2–3 passes: opaque body, then glaze, then highlight |
| `feTurbulence` + `feDiffuseLighting` over a noise bump map produces a convincing raised-surface texture | Codrops, W3C Filter Effects | The impasto *idea* is right |
| **But**: applying a filter to an element that also animates its transform forces the browser to recompute the whole filter every frame instead of compositing a cached layer; `feTurbulence` needs genuine per-pixel work | svg-filter-lab performance notes, Taylor Hunt | A live filter on an animating plant would destroy the frame rate. **Bake, do not filter at runtime.** |

That last row is the architectural decision. The previous implementation was heading toward
live filters on animated groups, which is the documented worst case.

## Plant — Canvas 2D, painted once, animated on the compositor

**Why canvas:** it is the only medium here that can actually stamp thousands of textured dabs
with per-dab jitter. SVG can only fill outlines; a filter can only distort them afterwards.

### Brush engine
- `stamp(ctx, x, y, angle, size, colour, alpha)` draws one dab: a soft radial core plus a few
  offset bristle streaks, so each dab has internal structure rather than being a blurred circle.
- `stroke(path, opts)` walks the path at ~0.35× brush spacing and stamps, jittering per dab:
  position ±, angle ±, size ×, alpha ×, and hue/lightness ± (seeded, never `Math.random`).
- Paint order per form: **body** (opaque, mid tone) → **glaze** (semi-transparent shadow along
  one edge) → **highlight** (light-facing edge, higher alpha, smaller brush).
- One consistent light direction for the whole plant: upper-left, azimuth ~135°. Every
  highlight and every glaze is derived from it, which is what makes separate forms read as one
  painting rather than a collage.

### Depth layers
Five canvases, back to front: `back-leaves`, `stems`, `mid-leaves`, `front-leaves`, `blooms`.
Separate layers are what allow parallax later without repainting anything.

### Animation
1. **Growth (~3.4 s, one time).** A single `requestAnimationFrame` loop advances a clock. Every
   stroke carries a `[start, end]` window; strokes paint progressively along their path, so the
   plant is literally painted on: stems rise, leaves unfurl from their attachment point, petals
   sweep open around the disc. When the clock passes the last window the loop **stops
   permanently** — no idle rAF.
2. **Life (continuous, zero JavaScript).** Each layer canvas is then animated by CSS keyframes
   only: a slow rotate/translate sway, different amplitude and phase per depth, longest and
   largest at the front. Transform-only, so it composites and never repaints.

### Cost control
- Backing store at `min(devicePixelRatio, 2)`; stamp count scales with canvas area, so a phone
  paints roughly 40% of the dabs a desktop does.
- Offscreen dab sprite rendered once and `drawImage`d, rather than a gradient per dab.
- `IntersectionObserver` pauses the growth loop if the hero is scrolled away mid-intro.

### Accessibility and fallback
- Container is `role="img"` with a written description; canvases are `aria-hidden`.
- Server-rendered simplified SVG silhouette shows until the canvas reports its first frame,
  then cross-fades — so no-JS and pre-hydration views are never empty.
- `prefers-reduced-motion`: paint the finished plant in one pass on mount, no growth, no sway.

## Earth — WebGL2 fragment shader

**Why a shader:** the brief asks for dimensional, organic and realistic. A sphere with a real
terminator, atmospheric scattering, drifting cloud and land-clustered city lights is a handful
of maths per pixel on the GPU, and costs one draw call. Doing it with hundreds of SVG circles
is both less convincing and more expensive.

- Analytic ray/sphere intersection — no raymarching.
- Continents from 3D fbm sampled on the sphere normal, so they rotate correctly and never seam.
- Day side: albedo from the land/sea mask, Lambert term, specular glint on water only.
- Terminator: a warm scattering band where `N·L` crosses zero — the detail that sells realism.
- Night side: city lights masked by land, thresholded fbm for clustering, gentle per-cluster
  twinkle.
- Clouds: a second fbm layer on its own slower rotation, lit and casting a soft darkening.
- Atmosphere: Fresnel rim, wider and warmer toward the terminator.
- Rotation: ~1 revolution per 4 minutes. Calm, not a spinning globe.

### Cost control
- Renders at 0.75× CSS resolution, DPR capped at 1.5, upscaled by the compositor.
- `IntersectionObserver` stops the loop whenever the section is off-screen.
- Two fbm octave counts: 5 on desktop, 3 below 768px.

### Accessibility and fallback
- `prefers-reduced-motion`: one frame, then stop.
- No WebGL2, or context creation fails: the existing SVG Earth stays. It is server-rendered, so
  it is also what a crawler and a no-JS visitor see.

## Verification

Not "it looks smooth" — measured:
- Frame timing sampled over the growth animation and over the Earth's steady state, via the
  DevTools protocol, at desktop and at 390 px.
- Confirm the plant's rAF loop actually terminates after the intro.
- Confirm both fall back correctly with JavaScript disabled and under reduced motion.
- Existing SEO, contrast and overflow audits must stay green.


---

## Results (measured, 14 September 2026)

### Frame timing

Sampled over 100 frames via the DevTools protocol. Note these numbers come from **software**
WebGL (SwiftShader in headless Chrome) — real GPU hardware has considerably more headroom.

| Scene | Median | p95 | FPS |
|---|---|---|---|
| Plant growth, 1440px | 16.7 ms | 16.8 ms | 59.9 |
| Earth steady state, 1440px | 16.7 ms | 33.4 ms | 59.9 |
| Plant growth, 390px | 16.7 ms | 16.8 ms | 59.9 |
| Earth steady state, 390px | 16.7 ms | 16.7 ms | 59.9 |

### Behaviour

| | Normal motion | Reduced motion | No JavaScript |
|---|---|---|---|
| Plant painted | yes | yes, in a single pass | silhouette only |
| Growth loop reached the end and stopped | yes (`data-grown`) | never started | n/a |
| Layer sway animations | 3 running | `none` | n/a |
| WebGL Earth live | yes | one frame, then stopped | SVG stand-in |
| Server-rendered fallbacks present | — | — | both |

### Weight

Replacing the SVG artwork with painted canvas and a shader made the page **lighter**, because
473 SVG circles and a 9 KB inline plant left the HTML:

| | Before | After |
|---|---|---|
| Home HTML (gzip) | 45.9 KB | **13.8 KB** |
| JavaScript | 138 KB | 143 KB |
| Images | 0 | 0 |

+5 KB of JavaScript covers the whole brush engine, the plant geometry, the canvas component and
the Earth shader. Net saving ≈ 27 KB.

### What the iterations actually caught

- **Dab spacing was derived from stroke length, not brush width**, so strokes rendered as dotted
  trails. Spacing has to be ~0.2× the brush width for stamps to merge into a mark.
- **The leaf width profile never reached zero at the tip**, which made every leaf a sausage. A
  lanceolate leaf needs `sin(π·t^0.72)` — nonzero early, zero at the tip.
- **The petal profile had the opposite problem**: tapering to a point made the bloom look shaggy.
  Petals stay ~70% wide at the tip and round off.
- **The sun started in front of the globe**, giving a bright daylit planet that destroyed the
  section's contrast. It belongs almost directly behind, so we see the night face.
- **The atmospheric halo was ungated**, applying at full strength across the whole disc and
  washing the night side blue. Gating it to `d > 1` is what revealed the city lights.
- A stray pair of backticks in a GLSL comment terminated the JavaScript template literal holding
  the shader. Worth knowing: shader source in a template string cannot contain backticks.

### Open

- The plant's palette is fixed rather than theme-aware. It reads well on both grounds, but a
  cooler set of greens for dark mode would be better still.
- The Claude Design canvas artboards still show the previous SVG artwork; they would need
  rendered stills of the canvas and shader to match.


---

## Second pass (15 September 2026)

Three faults reported from a real browser, and what each turned out to be.

### 1. "The first few milliseconds look off and weird"

Not the animation at all — it was the **no-JS silhouette**. The flat SVG stand-in was rendering
at 0.55 opacity and only fading once the canvas reported its first dabs, so the actual opening
sequence was *clipart → painted*, which reads as a broken asset swap.

The silhouette exists for crawlers and for JavaScript being off. It should never be part of the
JS experience. An inline script in the document body now sets `class="js"` on the root during
parse, and `.js .plant-fallback` is `opacity: 0` with no transition. The opening is now
**blank → painted**, which is the intended effect: the canvas paints itself on.

| | `js` class | Silhouette opacity |
|---|---|---|
| JS on, 400 ms | yes | 0 |
| JS on, 5.6 s | yes | 0 |
| JS off | no | 0.55 |

### 2. "The flower looks blurry"

The dab sprite's alpha gradient began falling off at 45% of its radius and reached zero at the
rim — a soft airbrush core, not a loaded brush. Every mark inherited that softness.

The dab now holds full opacity to 68% of the radius and feathers only over the last 14%. Three
supporting changes: the bristle channels carved out of it got harder edges, the per-dab alpha
floor rose from 0.62 to 0.84 (paint laid on, not misted on), and dab spacing tightened from
0.20× to 0.16× the brush width so the crisper marks still merge into a continuous stroke.

### 3. "We want a much bigger plant with more stems and leaves"

Rebuilt from a single stalk into a branched specimen:

| | Before | After |
|---|---|---|
| Stem segments | 5 | 10 (4 real branches + 2 spurs) |
| Leaves | 13 | 26 |
| Blooms | 2 | 3 |
| Buds | 2 | 4 |

The branches carry their own leaves and their own flowers, which is what separates a plant from
a stalk with leaves attached. The stage also grew from 30rem to 34rem.

One colour fix fell out of this: shadowed petals were painted tan (`#bfb193`), which massed
into a muddy blob under each bloom. Shadowed white is a *cool* grey — `#dbd6cb` — and the warm
rib on lit petals was narrowed so it stops reading as a separate mark.

### Cost after the rebuild

Roughly twice the strokes, and still:

| Scene | Median | FPS |
|---|---|---|
| Plant growth, 1440px | 16.7 ms | 59.9 |
| Plant growth, 390px | 16.7 ms | 59.9 |
| Earth steady state, 1440 / 390px | 16.7 ms | 59.9 |

Three layer canvases at 855×1321 (DPR 2) ≈ 13.5 MB of canvas memory, 11.5 MB JS heap. The
growth loop still terminates (`data-grown`), and reduced motion still paints in a single pass
with no sway.
