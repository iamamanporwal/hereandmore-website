/**
 * The signature motif: a shared map of understanding drawing itself.
 * Inline SVG, ~2 KB, no image request, no client JS. Animation is CSS-only and
 * collapses to a static drawn state under prefers-reduced-motion.
 */
type Node = { id: string; x: number; y: number; label?: string; accent?: boolean; r?: number }

const NODES: Node[] = [
  { id: 'aim', x: 250, y: 60, label: 'Aim', accent: true, r: 7 },
  { id: 'person-a', x: 96, y: 140, label: 'People' },
  { id: 'person-b', x: 404, y: 132 },
  { id: 'place', x: 60, y: 268, label: 'Places' },
  { id: 'work', x: 250, y: 214, label: 'Work', accent: true, r: 6 },
  { id: 'evidence', x: 178, y: 330, label: 'Evidence' },
  { id: 'commit', x: 366, y: 262, label: 'Commitment' },
  { id: 'outcome', x: 430, y: 372, label: 'Outcome', accent: true, r: 6 },
  { id: 'question', x: 316, y: 384 },
  { id: 'edition', x: 96, y: 408, label: 'Edition' },
]

const EDGES: [string, string][] = [
  ['aim', 'person-a'],
  ['aim', 'person-b'],
  ['aim', 'work'],
  ['person-a', 'work'],
  ['person-b', 'commit'],
  ['work', 'commit'],
  ['work', 'evidence'],
  ['person-a', 'place'],
  ['place', 'evidence'],
  ['evidence', 'edition'],
  ['commit', 'outcome'],
  ['evidence', 'question'],
  ['question', 'outcome'],
  ['evidence', 'outcome'],
]

const byId = (id: string) => NODES.find((n) => n.id === id)!

export function MapMotif({ className = 'map-motif' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 500 460" role="img" aria-labelledby="map-motif-title">
      <title id="map-motif-title">
        A diagram of a shared map: an aim connected to people, places, work, evidence, commitments and an authored outcome.
      </title>

      {EDGES.map(([from, to], i) => {
        const a = byId(from)
        const b = byId(to)
        const len = Math.round(Math.hypot(b.x - a.x, b.y - a.y))
        return (
          <line
            key={`${from}-${to}`}
            className="edge"
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            style={{ ['--len' as string]: len, animationDelay: `${0.1 + i * 0.07}s` }}
          />
        )
      })}

      {NODES.map((n, i) => (
        <g key={n.id}>
          {n.accent ? <circle className="pulse" cx={n.x} cy={n.y} r={(n.r ?? 5) * 2.6} style={{ animationDelay: `${i * 0.4}s` }} /> : null}
          <circle
            className={`node${n.accent ? ' node--accent' : ''}`}
            cx={n.x}
            cy={n.y}
            r={n.r ?? 4.5}
            style={{ animationDelay: `${0.7 + i * 0.08}s` }}
          />
          {n.label ? (
            <text x={n.x + (n.r ?? 5) + 9} y={n.y + 3.5} style={{ animationDelay: `${1.1 + i * 0.08}s` }}>
              {n.label}
            </text>
          ) : null}
        </g>
      ))}
    </svg>
  )
}
