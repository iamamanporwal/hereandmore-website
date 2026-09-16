/**
 * The plant, described as brush strokes rather than outlines.
 *
 * Proportions: taller than wide, widest around 40% of the height, tapering to a single
 * dominant bloom set slightly off the vertical axis. Leaves sit in opposite pairs low down and
 * alternate higher up, which is how most real stems actually grow, and several sit *behind*
 * the stem so the plant has a front and a back rather than being flat.
 *
 * One light direction governs everything: upper-left. Every highlight is on the upper-left
 * edge of a form and every glaze on the lower-right. That consistency is what makes separate
 * painted forms read as one painting.
 */
import { Rng, type Point, type Stroke } from './brush'

export type Layer = 'back' | 'mid' | 'front'
export interface LayeredStroke extends Stroke {
  layer: Layer
}

export const ART_W = 440
export const ART_H = 680

/**
 * Two palettes. On ivory the greens can be fully saturated and the petals near-white; on a
 * near-black ground both would glare, so the dark set is cooler and a step down in value.
 */
interface Palette {
  LEAF: { dark: string; mid: string; light: string; glow: string }
  STEM: { mid: string; dark: string; light: string }
  PETAL: { body: string; warm: string; shade: string; cool: string }
  DISC: { dark: string; mid: string; light: string }
}

const PALETTES: Record<'light' | 'dark', Palette> = {
  light: {
    LEAF: { dark: '#3d5236', mid: '#5c7a4b', light: '#8fa86c', glow: '#b6c98a' },
    STEM: { mid: '#657f52', dark: '#47603d', light: '#8ba173' },
    PETAL: { body: '#fffdf6', warm: '#f7edd6', shade: '#dbd6cb', cool: '#f0eee5' },
    DISC: { dark: '#7d5a12', mid: '#b98a24', light: '#eac674' },
  },
  dark: {
    LEAF: { dark: '#2c3f2a', mid: '#4a6640', light: '#7c9662', glow: '#9db77c' },
    STEM: { mid: '#546c45', dark: '#374b31', light: '#7b9165' },
    PETAL: { body: '#f2efe4', warm: '#e6d8b8', shade: '#b8b2a5', cool: '#dcd9cd' },
    DISC: { dark: '#6a4c10', mid: '#a97c1f', light: '#d8b45f' },
  },
}

export type PlantTheme = keyof typeof PALETTES

let LEAF = PALETTES.light.LEAF
let STEM = PALETTES.light.STEM
let PETAL = PALETTES.light.PETAL
let DISC = PALETTES.light.DISC

/** Light direction, in artwork space. Up and to the left. */
const LIGHT: Point = [-0.62, -0.78]

function unit(a: Point, b: Point) {
  const dx = b[0] - a[0]
  const dy = b[1] - a[1]
  const len = Math.hypot(dx, dy) || 1
  return { dx: dx / len, dy: dy / len, len, nx: -dy / len, ny: dx / len }
}

/** Which side of this axis faces the light: +1 if the positive normal does, -1 otherwise. */
function litSide(a: Point, b: Point): number {
  const { nx, ny } = unit(a, b)
  return nx * LIGHT[0] + ny * LIGHT[1] >= 0 ? 1 : -1
}

const off = (p: Point, nx: number, ny: number, d: number): Point => [p[0] + nx * d, p[1] + ny * d]

/**
 * A leaf as a painter lays one in: two or three sweeping body strokes with a filbert, a glaze
 * down the shadow edge, a highlight along the lit edge, then the midrib last.
 */
function leaf(
  base: Point,
  tip: Point,
  width: number,
  layer: Layer,
  t0: number,
  t1: number,
  rng: Rng,
): LayeredStroke[] {
  const { nx, ny, len } = unit(base, tip)
  const lit = litSide(base, tip)
  const mid: Point = [(base[0] + tip[0]) / 2, (base[1] + tip[1]) / 2]
  const bow = rng.between(0.16, 0.3) * len * (rng.next() < 0.5 ? 1 : -1) * 0.12
  const out: LayeredStroke[] = []

  // Body: parallel sweeps across the blade, widest in the middle.
  const lanes = width > 26 ? [-0.3, -0.02, 0.28] : [-0.2, 0.2]
  lanes.forEach((lane, i) => {
    const c = off(mid, nx, ny, lane * width * 1.55 + bow)
    out.push({
      layer,
      a: base,
      c,
      b: off(tip, nx, ny, lane * width * 0.18),
      width: width * (lanes.length === 3 ? 0.72 : 0.88),
      colour: layer === 'back' ? LEAF.dark : i === 1 ? LEAF.mid : LEAF.mid,
      alpha: 0.85,
      profile: 'leaf',
      t0: t0 + i * 0.012,
      t1,
      density: 1.4,
    })
  })

  if (layer !== 'back') {
    // Shadow glaze along the edge turned away from the light.
    out.push({
      layer,
      a: off(base, nx, ny, -lit * width * 0.1),
      c: off(mid, nx, ny, -lit * width * 0.5 + bow),
      b: tip,
      width: width * 0.42,
      colour: LEAF.dark,
      alpha: 0.3,
      profile: 'leaf',
      t0: t0 + 0.05,
      t1: t1 + 0.02,
      density: 1.1,
    })
    // Highlight along the lit edge.
    out.push({
      layer,
      a: off(base, nx, ny, lit * width * 0.14),
      c: off(mid, nx, ny, lit * width * 0.44 + bow),
      b: tip,
      width: width * 0.24,
      colour: layer === 'front' ? LEAF.glow : LEAF.light,
      alpha: 0.5,
      profile: 'leaf',
      t0: t0 + 0.07,
      t1: t1 + 0.03,
      density: 1.2,
    })
    // Midrib, drawn last and kept thin.
    out.push({
      layer,
      a: base,
      c: off(mid, nx, ny, bow * 0.5),
      b: tip,
      width: Math.max(1.6, width * 0.1),
      colour: LEAF.dark,
      alpha: 0.34,
      profile: 'tip',
      t0: t0 + 0.06,
      t1: t1 + 0.02,
      density: 1.6,
      wobble: 0.5,
    })
  }
  return out
}

/** One flower: outer sweep, mid ring, a tight core, then the disc. */
function bloom(at: Point, scale: number, t0: number, t1: number, rng: Rng, layer: Layer): LayeredStroke[] {
  const out: LayeredStroke[] = []
  const span = t1 - t0
  const ring = (count: number, length: number, wide: number, phase: number, colour: string, alpha: number, slot: [number, number]) => {
    for (let i = 0; i < count; i++) {
      const ang = (Math.PI * 2 * i) / count + phase + rng.range(0.1)
      const l = length * scale * rng.between(0.84, 1.14)
      const dir: Point = [Math.cos(ang), Math.sin(ang)]
      const tip: Point = [at[0] + dir[0] * l, at[1] + dir[1] * l]
      const bend = rng.range(0.22)
      const c: Point = [
        at[0] + dir[0] * l * 0.55 - dir[1] * l * bend,
        at[1] + dir[1] * l * 0.55 + dir[0] * l * bend,
      ]
      // Petals facing the light are painted warmer and brighter.
      const facing = dir[0] * LIGHT[0] + dir[1] * LIGHT[1]
      const body = facing > 0.25 ? PETAL.body : facing < -0.3 ? PETAL.shade : PETAL.cool
      const start = t0 + slot[0] * span + (i / count) * span * 0.16
      out.push({
        layer,
        a: at,
        c,
        b: tip,
        width: wide * scale,
        colour: colour === 'auto' ? body : colour,
        alpha,
        profile: 'petal',
        t0: start,
        t1: start + span * (slot[1] - slot[0]),
        density: 1.5,
      })
      if (facing > 0.1) {
        out.push({
          layer,
          a: at,
          c,
          b: tip,
          width: wide * scale * 0.26,
          colour: PETAL.warm,
          alpha: 0.3,
          profile: 'petal',
          t0: start + 0.01,
          t1: start + span * (slot[1] - slot[0]),
          density: 1.4,
        })
      }
    }
  }

  ring(12, 86, 34, 0.18, 'auto', 0.97, [0, 0.42])
  ring(9, 58, 26, 0.62, 'auto', 0.94, [0.3, 0.66])
  ring(6, 30, 18, 1.15, PETAL.warm, 0.9, [0.55, 0.82])

  // Disc: a dark seat, a mid body, then a lit crescent on the upper-left.
  const disc = 17 * scale
  out.push({
    layer,
    a: [at[0] - disc * 0.7, at[1] + disc * 0.2],
    c: [at[0], at[1] + disc * 0.9],
    b: [at[0] + disc * 0.7, at[1] + disc * 0.2],
    width: disc * 1.5,
    colour: DISC.dark,
    alpha: 0.95,
    profile: 'stem',
    t0: t0 + span * 0.74,
    t1: t0 + span * 0.9,
    density: 2,
  })
  out.push({
    layer,
    a: [at[0] - disc * 0.5, at[1]],
    c: [at[0], at[1] - disc * 0.3],
    b: [at[0] + disc * 0.5, at[1]],
    width: disc * 1.25,
    colour: DISC.mid,
    alpha: 0.9,
    profile: 'stem',
    t0: t0 + span * 0.8,
    t1: t0 + span * 0.95,
    density: 2.2,
  })
  out.push({
    layer,
    a: [at[0] - disc * 0.52, at[1] - disc * 0.18],
    c: [at[0] - disc * 0.1, at[1] - disc * 0.6],
    b: [at[0] + disc * 0.3, at[1] - disc * 0.42],
    width: disc * 0.5,
    colour: DISC.light,
    alpha: 0.75,
    profile: 'leaf',
    t0: t0 + span * 0.86,
    t1: t1,
    density: 2.4,
  })
  return out
}

function bud(at: Point, angle: number, scale: number, t0: number, t1: number): LayeredStroke[] {
  const dir: Point = [Math.cos(angle), Math.sin(angle)]
  const tip: Point = [at[0] + dir[0] * 44 * scale, at[1] + dir[1] * 44 * scale]
  const c: Point = [at[0] + dir[0] * 22 * scale - dir[1] * 6, at[1] + dir[1] * 22 * scale + dir[0] * 6]
  return [
    { layer: 'mid', a: at, c, b: tip, width: 21 * scale, colour: PETAL.cool, alpha: 0.95, profile: 'leaf', t0, t1, density: 1.6 },
    { layer: 'mid', a: at, c, b: tip, width: 8 * scale, colour: PETAL.body, alpha: 0.6, profile: 'tip', t0: t0 + 0.01, t1, density: 1.6 },
    { layer: 'mid', a: at, c: [at[0] + dir[0] * 12, at[1] + dir[1] * 12], b: [at[0] + dir[0] * 20 * scale, at[1] + dir[1] * 20 * scale], width: 16 * scale, colour: LEAF.mid, alpha: 0.9, profile: 'leaf', t0: t0 + 0.02, t1: t1 + 0.02, density: 1.6 },
  ]
}

export function buildPlant(theme: PlantTheme = 'light'): LayeredStroke[] {
  // Palette is selected before any stroke is generated, so every colour in the returned
  // list already belongs to the right scheme.
  LEAF = PALETTES[theme].LEAF
  STEM = PALETTES[theme].STEM
  PETAL = PALETTES[theme].PETAL
  DISC = PALETTES[theme].DISC

  const rng = new Rng(20260915)
  const out: LayeredStroke[] = []

  // --- Stems -------------------------------------------------------------
  // A main stalk plus four real branches. Branches carry their own leaves and their own
  // flowers, which is what separates a plant from a single stalk with leaves stuck on it.
  const stemSegments: { a: Point; c: Point; b: Point; w: number; t0: number; t1: number }[] = [
    { a: [212, 678], c: [190, 520], b: [228, 392], w: 10, t0: 0, t1: 0.18 },
    { a: [228, 392], c: [248, 270], b: [206, 132], w: 7, t0: 0.16, t1: 0.31 },
    // Branch A — low left, reaching well out and up.
    { a: [206, 546], c: [140, 494], b: [74, 416], w: 5.4, t0: 0.2, t1: 0.3 },
    { a: [74, 416], c: [60, 366], b: [66, 306], w: 4, t0: 0.28, t1: 0.36 },
    // Branch B — mid right.
    { a: [230, 448], c: [312, 396], b: [368, 318], w: 5.2, t0: 0.23, t1: 0.33 },
    { a: [368, 318], c: [384, 286], b: [378, 248], w: 3.8, t0: 0.31, t1: 0.38 },
    // Branch C — upper left.
    { a: [236, 340], c: [176, 306], b: [128, 252], w: 4, t0: 0.3, t1: 0.39 },
    // Branch D — upper right.
    { a: [240, 284], c: [296, 254], b: [326, 206], w: 3.6, t0: 0.33, t1: 0.42 },
    // Two short spurs, for the small buds.
    { a: [216, 470], c: [180, 452], b: [152, 424], w: 2.8, t0: 0.34, t1: 0.41 },
    { a: [234, 232], c: [268, 214], b: [292, 180], w: 2.6, t0: 0.36, t1: 0.44 },
  ]
  for (const seg of stemSegments) {
    out.push({ layer: 'mid', a: seg.a, c: seg.c, b: seg.b, width: seg.w, colour: STEM.mid, alpha: 0.96, profile: 'stem', t0: seg.t0, t1: seg.t1, density: 1.8 })
    out.push({ layer: 'mid', a: seg.a, c: seg.c, b: seg.b, width: seg.w * 0.4, colour: STEM.dark, alpha: 0.42, profile: 'stem', t0: seg.t0 + 0.008, t1: seg.t1, density: 1.6, wobble: 0.7 })
    out.push({ layer: 'mid', a: [seg.a[0] - seg.w * 0.24, seg.a[1]], c: [seg.c[0] - seg.w * 0.3, seg.c[1]], b: [seg.b[0] - seg.w * 0.2, seg.b[1]], width: seg.w * 0.24, colour: STEM.light, alpha: 0.52, profile: 'stem', t0: seg.t0 + 0.012, t1: seg.t1, density: 1.6 })
  }

  // --- Leaves ------------------------------------------------------------
  const leaves: [Point, Point, number, Layer][] = [
    // Basal rosette.
    [[206, 672], [92, 646], 25, 'mid'],
    [[216, 666], [330, 636], 23, 'back'],
    [[210, 656], [150, 612], 19, 'front'],
    // Main stalk, opposite pairs low, alternating above.
    [[208, 620], [64, 534], 44, 'back'],
    [[215, 606], [368, 512], 42, 'front'],
    [[204, 566], [58, 462], 39, 'front'],
    [[212, 552], [378, 452], 37, 'back'],
    [[220, 492], [88, 396], 34, 'mid'],
    [[228, 446], [372, 352], 32, 'front'],
    [[233, 396], [110, 316], 28, 'back'],
    [[238, 348], [352, 268], 24, 'mid'],
    [[240, 296], [146, 232], 20, 'front'],
    [[236, 248], [318, 186], 17, 'back'],
    [[228, 200], [172, 154], 14, 'mid'],
    [[218, 164], [268, 128], 12, 'front'],
    // Branch A foliage.
    [[150, 494], [46, 470], 24, 'back'],
    [[112, 452], [24, 386], 26, 'front'],
    [[74, 412], [8, 340], 22, 'mid'],
    [[68, 356], [128, 300], 18, 'back'],
    // Branch B foliage.
    [[288, 410], [398, 400], 24, 'back'],
    [[330, 364], [424, 306], 25, 'front'],
    [[368, 314], [300, 262], 19, 'mid'],
    [[374, 272], [430, 224], 16, 'back'],
    // Branch C and D foliage.
    [[186, 312], [112, 300], 17, 'front'],
    [[140, 268], [78, 240], 14, 'mid'],
    [[292, 252], [356, 250], 15, 'front'],
  ]
  leaves.forEach((l, i) => {
    const start = 0.22 + (i / leaves.length) * 0.4
    out.push(...leaf(l[0], l[1], l[2], l[3], start, start + 0.12, rng))
  })

  // --- Buds and blooms ---------------------------------------------------
  out.push(...bud([152, 424], -2.5, 1.1, 0.6, 0.7))
  out.push(...bud([292, 180], -0.78, 0.95, 0.63, 0.73))
  out.push(...bud([128, 252], -1.9, 0.85, 0.66, 0.76))
  out.push(...bud([326, 206], -0.6, 0.8, 0.68, 0.78))
  out.push(...bloom([66, 300], 0.5, 0.64, 0.84, rng, 'front'))
  out.push(...bloom([378, 242], 0.44, 0.68, 0.87, rng, 'front'))
  out.push(...bloom([206, 128], 1, 0.72, 1, rng, 'front'))

  return out
}
