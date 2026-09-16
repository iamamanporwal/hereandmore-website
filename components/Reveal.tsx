'use client'

import { useEffect } from 'react'

/**
 * One IntersectionObserver for the whole page.
 *
 * Anything marked `data-reveal` gets `data-inview="true"` when it first scrolls into
 * view; CSS does the rest. A single observer for every element costs ~700 bytes and
 * avoids the per-component observer sprawl that makes scroll animation janky.
 *
 * Elements are visible by default in CSS and only *start* hidden once this mounts
 * (the `js-reveal` flag on <html>), so with JavaScript off or broken nothing is lost.
 */
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    root.classList.add('js-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-inview', 'true')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    const targets = document.querySelectorAll('[data-reveal]')
    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return null
}
