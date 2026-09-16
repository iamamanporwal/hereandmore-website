'use client'

import { useEffect, useRef, useState } from 'react'
import { advance, makeDab, prepare, Rng, type PreparedStroke } from '@/lib/art/brush'
import { ART_H, ART_W, buildPlant, type Layer, type PlantTheme } from '@/lib/art/plant'

const LAYERS: Layer[] = ['back', 'mid', 'front']
const DURATION = 3400

/**
 * The plant, painted on canvas.
 *
 * Two things make this cheap despite being thousands of brush dabs:
 *
 *  1. The canvas is never cleared. Each frame lays down only the dabs that have just become
 *     due, so a frame costs a few dozen drawImage calls rather than a full repaint. When the
 *     last stroke finishes the loop stops for good — no idle requestAnimationFrame.
 *  2. The ambient sway afterwards is pure CSS on the three layer canvases. Transform only,
 *     so it composites and never repaints. That is the whole reason for painting into three
 *     separate canvases instead of one.
 */
export function PlantCanvas({ className = '' }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const refs = useRef<(HTMLCanvasElement | null)[]>([])
  const [painted, setPainted] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const canvases = refs.current.filter(Boolean) as HTMLCanvasElement[]
    if (canvases.length !== LAYERS.length) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rect = host.getBoundingClientRect()
    const cssW = Math.max(180, rect.width || 420)
    const cssH = cssW * (ART_H / ART_W)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const scale = (cssW / ART_W) * dpr

    const contexts = canvases.map((c) => {
      c.width = Math.round(cssW * dpr)
      c.height = Math.round(cssH * dpr)
      c.style.width = `${cssW}px`
      c.style.height = `${cssH}px`
      const ctx = c.getContext('2d', { alpha: true })!
      ctx.setTransform(scale, 0, 0, scale, 0, 0)
      return ctx
    })

    // Brush size follows the render scale, so a phone lays down proportionally fewer, larger
    // dabs for the same painted result.
    const dab = makeDab(Math.max(24, Math.round(44 * Math.min(1.4, scale))), new Rng(7))

    let prepared: { ps: PreparedStroke; layer: number }[] = []
    const load = (theme: PlantTheme) => {
      prepared = buildPlant(theme).map((s, i) => ({
        ps: prepare(s, dab, 1000 + i * 37),
        layer: LAYERS.indexOf(s.layer),
      }))
    }
    load(darkQuery.matches ? 'dark' : 'light')

    const paintTo = (t: number) => {
      for (const { ps, layer } of prepared) {
        const { t0, t1 } = ps.stroke
        const p = t1 <= t0 ? 1 : (t - t0) / (t1 - t0)
        if (p <= 0) continue
        advance(contexts[layer], ps, Math.min(1, p))
      }
    }

    /**
     * Switching scheme repaints in one pass rather than replaying the growth: the plant is
     * already there, so re-growing it would read as a glitch.
     */
    const onScheme = (event: MediaQueryListEvent) => {
      for (const ctx of contexts) ctx.clearRect(0, 0, ART_W, ART_H + 40)
      load(event.matches ? 'dark' : 'light')
      paintTo(1)
      host.dataset.grown = 'true'
    }
    darkQuery.addEventListener('change', onScheme)

    let raf = 0
    let cancelled = false

    if (reduced) {
      paintTo(1)
      setPainted(true)
      return () => darkQuery.removeEventListener('change', onScheme)
    }

    const start = performance.now()
    const tick = (now: number) => {
      if (cancelled) return
      const t = Math.min(1, (now - start) / DURATION)
      paintTo(t)
      if (t === 1) {
        // Done for good. The plant is now three static bitmaps that CSS animates.
        host.dataset.grown = 'true'
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    setPainted(true)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      darkQuery.removeEventListener('change', onScheme)
    }
  }, [])

  return (
    <div
      ref={hostRef}
      className={`plant ${className}`}
      data-painted={painted || undefined}
      role="img"
      aria-label="A painted illustration of a flowering stem: veined leaves, two buds, a small side flower and one open bloom."
    >
      {LAYERS.map((layer, i) => (
        <canvas
          key={layer}
          className={`plant__layer plant__layer--${layer}`}
          aria-hidden="true"
          ref={(el) => {
            refs.current[i] = el
          }}
        />
      ))}
    </div>
  )
}
