/**
 * A small oil-brush engine for canvas 2D.
 *
 * The model is the standard one for digital paint: a dab sprite is stamped repeatedly along a
 * stroke path, with the rotation, size and opacity of each dab jittered, so that overlapping
 * translucent stamps build up the way real media does. The dab itself carries bristle streaks,
 * which is what stops a stroke reading as a blurred line.
 *
 * Everything is seeded. No Math.random anywhere: the same plant must paint identically on
 * every load, and identically in a screenshot taken a week later.
 */

export type Point = [number, number]

export class Rng {
  private s: number
  constructor(seed: number) {
    this.s = (seed * 9301 + 49297) % 233280 || 1
  }
  next(): number {
    this.s = (this.s * 9301 + 49297) % 233280
    return this.s / 233280
  }
  /** Signed value in [-r, r]. */
  range(r: number): number {
    return (this.next() * 2 - 1) * r
  }
  between(a: number, b: number): number {
    return a + this.next() * (b - a)
  }
}

/** A quadratic segment with a width profile. */
export interface Stroke {
  a: Point
  c: Point
  b: Point
  /** Peak brush width in artwork units. */
  width: number
  colour: string
  /** 0–1. Opaque body passes sit near 0.9; glazes near 0.25. */
  alpha: number
  /** Dabs per unit length. Lower is rougher and cheaper. */
  density?: number
  /** Window in the growth timeline, 0–1. */
  t0: number
  t1: number
  /** Taper shape: 'leaf' swells in the middle, 'stem' holds, 'tip' fades to a point. */
  profile?: 'leaf' | 'stem' | 'tip' | 'petal'
  /** Extra wobble of the path itself, for strokes that should look hand-drawn. */
  wobble?: number
}

export function quad(a: Point, c: Point, b: Point, t: number): Point {
  const mt = 1 - t
  return [mt * mt * a[0] + 2 * mt * t * c[0] + t * t * b[0], mt * mt * a[1] + 2 * mt * t * c[1] + t * t * b[1]]
}

function quadAngle(a: Point, c: Point, b: Point, t: number): number {
  const mt = 1 - t
  const dx = 2 * mt * (c[0] - a[0]) + 2 * t * (b[0] - c[0])
  const dy = 2 * mt * (c[1] - a[1]) + 2 * t * (b[1] - c[1])
  return Math.atan2(dy, dx)
}

function widthAt(profile: Stroke['profile'], t: number): number {
  switch (profile) {
    case 'stem':
      // Thick at the base, easing off toward the growing tip.
      return 1 - t * 0.45
    case 'tip':
      return Math.pow(1 - t, 0.7)
    case 'petal':
      // Narrow at the disc, full through the body, and still ~70% wide at the tip. A petal is
      // rounded off, not pointed: tapering it to zero is what makes a bloom look shaggy.
      return Math.pow(Math.sin(Math.PI * (0.13 + t * 0.74)), 0.34)
    case 'leaf':
    default:
      // Lanceolate: broadens low, then runs to an actual point. Reaching zero at t=1 is the
      // whole difference between a leaf and a sausage.
      return Math.pow(Math.sin(Math.PI * Math.pow(t, 0.72)), 0.58)
  }
}

/**
 * The dab: a soft elliptical core with a handful of bristle gaps carved out of it.
 * Rendered once as a white alpha mask and tinted per stroke.
 */
export function makeDab(size: number, rng: Rng): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')!
  const r = size / 2

  // A firm core with only a narrow feather at the rim. The previous falloff started fading at
  // 45% of the radius, which made every mark read as airbrush rather than loaded paint.
  const g = ctx.createRadialGradient(r, r, 0, r, r, r)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.68, 'rgba(255,255,255,1)')
  g.addColorStop(0.86, 'rgba(255,255,255,0.86)')
  g.addColorStop(0.96, 'rgba(255,255,255,0.34)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.ellipse(r, r, r, r * 0.82, 0, 0, Math.PI * 2)
  ctx.fill()

  // Bristle gaps. Without these a stamp is just a blurred blob and the stroke looks airbrushed.
  ctx.globalCompositeOperation = 'destination-out'
  for (let i = 0; i < 7; i++) {
    const y = r + rng.range(r * 0.72)
    const w = size * rng.between(0.018, 0.045)
    const gg = ctx.createLinearGradient(0, y, size, y)
    gg.addColorStop(0, 'rgba(0,0,0,0)')
    gg.addColorStop(0.18, `rgba(0,0,0,${rng.between(0.4, 0.85)})`)
    gg.addColorStop(0.82, `rgba(0,0,0,${rng.between(0.4, 0.85)})`)
    gg.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = gg
    ctx.fillRect(0, y - w / 2, size, w)
  }
  ctx.globalCompositeOperation = 'source-over'
  return c
}

/** A colourised copy of the dab mask. Built once per stroke, reused for every stamp. */
export function tint(dab: HTMLCanvasElement, colour: string): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = dab.width
  c.height = dab.height
  const ctx = c.getContext('2d')!
  ctx.drawImage(dab, 0, 0)
  ctx.globalCompositeOperation = 'source-in'
  ctx.fillStyle = colour
  ctx.fillRect(0, 0, c.width, c.height)
  return c
}

export function shift(colour: string, dl: number): string {
  // Colours arrive as #rrggbb; nudge lightness without dragging in a colour library.
  const n = parseInt(colour.slice(1), 16)
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  const r = clamp(((n >> 16) & 255) + dl)
  const g = clamp(((n >> 8) & 255) + dl)
  const b = clamp((n & 255) + dl)
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
}

export interface PreparedStroke {
  stroke: Stroke
  sprites: HTMLCanvasElement[]
  steps: number
  /** Index of the next dab to lay down. The canvas is never cleared, so painting is additive. */
  cursor: number
  rng: Rng
}

export function prepare(stroke: Stroke, dab: HTMLCanvasElement, seed: number): PreparedStroke {
  const chord = Math.hypot(stroke.b[0] - stroke.a[0], stroke.b[1] - stroke.a[1])
  const bow = Math.hypot(stroke.c[0] - (stroke.a[0] + stroke.b[0]) / 2, stroke.c[1] - (stroke.a[1] + stroke.b[1]) / 2)
  const len = chord + bow * 0.6
  const density = stroke.density ?? 1.5
  // Dab spacing is a fraction of the BRUSH WIDTH, not of the stroke length — that is what makes
  // stamps overlap into a continuous mark instead of a dotted trail. ~0.2× width is the point
  // where an oil brush stops showing individual dabs but still shows its bristle direction.
  const spacing = Math.max(0.9, (stroke.width * 0.16) / density)
  const steps = Math.max(6, Math.min(560, Math.round(len / spacing)))
  return {
    stroke,
    // Three tints per stroke: body, a lighter and a darker. Picking between them per dab gives
    // colour variation across a stroke for three canvas operations rather than one per dab.
    sprites: [tint(dab, stroke.colour), tint(dab, shift(stroke.colour, 16)), tint(dab, shift(stroke.colour, -18))],
    steps,
    cursor: 0,
    rng: new Rng(seed),
  }
}

/**
 * Lay down every dab that has become due. Returns the number of dabs drawn, which is how the
 * caller knows whether the frame did any work at all.
 */
export function advance(ctx: CanvasRenderingContext2D, ps: PreparedStroke, progress: number): number {
  const target = Math.round(progress * ps.steps)
  if (target <= ps.cursor) return 0
  const { stroke, rng } = ps
  let drawn = 0

  for (let i = ps.cursor; i < target; i++) {
    const t = i / ps.steps
    const [x, y] = quad(stroke.a, stroke.c, stroke.b, t)
    const wobble = stroke.wobble ?? 0
    const px = x + rng.range(stroke.width * 0.16 + wobble)
    const py = y + rng.range(stroke.width * 0.16 + wobble)

    const w = stroke.width * widthAt(stroke.profile, t) * rng.between(0.86, 1.14)
    if (w <= 0.4) continue

    const angle = quadAngle(stroke.a, stroke.c, stroke.b, t) + rng.range(0.28)
    const sprite = ps.sprites[rng.next() < 0.62 ? 0 : rng.next() < 0.5 ? 1 : 2]

    ctx.save()
    ctx.globalAlpha = Math.min(1, stroke.alpha * rng.between(0.84, 1))
    ctx.translate(px, py)
    ctx.rotate(angle)
    ctx.drawImage(sprite, -w / 2, -w / 2, w, w * rng.between(0.82, 1.06))
    ctx.restore()
    drawn++
  }

  ps.cursor = target
  return drawn
}
