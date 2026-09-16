/**
 * Server-rendered stand-in for the painted plant.
 *
 * Deliberately a flat silhouette rather than a detailed drawing: it exists only so the hero is
 * never empty before hydration, for a crawler, and with JavaScript off. The canvas cross-fades
 * over it once the first dabs land. Keeping it simple keeps ~7 KB out of every page.
 */
export function PlantFallback() {
  return (
    <svg className="plant-fallback" viewBox="0 0 440 680" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMax meet">
      <g fill="none" stroke="#647e51" strokeLinecap="round">
        <path d="M214 676 C194 520 232 386 232 386 C250 268 211 152 211 152" strokeWidth="7" />
        <path d="M232 378 C198 344 148 300 148 300" strokeWidth="4" />
        <path d="M240 330 C280 320 312 286 312 286" strokeWidth="4" />
        <path d="M236 246 C274 232 306 206 306 206" strokeWidth="3" />
      </g>
      <g fill="#5c7a4b" opacity="0.9">
        <path d="M210 618 Q120 560 54 574 Q140 616 210 618Z" />
        <path d="M215 608 Q300 556 376 558 Q292 610 215 608Z" />
        <path d="M206 552 Q126 470 58 476 Q136 550 206 552Z" />
        <path d="M211 544 Q300 470 380 474 Q294 544 211 544Z" />
        <path d="M218 486 Q140 404 70 408 Q148 484 218 486Z" />
        <path d="M226 436 Q310 376 384 378 Q302 436 226 436Z" />
        <path d="M232 384 Q158 318 94 322 Q164 382 232 384Z" />
        <path d="M239 336 Q308 290 370 292 Q304 336 239 336Z" />
        <path d="M241 290 Q180 244 126 246 Q186 290 241 290Z" />
        <path d="M236 246 Q292 212 342 214 Q288 246 236 246Z" />
        <path d="M228 202 Q186 166 154 168 Q192 202 228 202Z" />
        <path d="M209 668 Q160 646 116 650 Q166 670 209 668Z" />
      </g>
      <g fill="#efe9d9">
        <circle cx="211" cy="150" r="52" />
        <circle cx="312" cy="286" r="22" />
        <ellipse cx="148" cy="288" rx="13" ry="21" transform="rotate(-24 148 288)" />
        <ellipse cx="306" cy="196" rx="11" ry="18" transform="rotate(22 306 196)" />
      </g>
      <circle cx="211" cy="150" r="14" fill="#b98a24" />
      <circle cx="312" cy="286" r="6" fill="#b98a24" />
    </svg>
  )
}
