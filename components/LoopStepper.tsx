'use client'

import { useRef, useState } from 'react'

/**
 * The product loop, made operable: click or arrow-key through each stage and see
 * exactly what the system records at that moment. ~1 KB of client JS, full ARIA
 * tablist semantics with roving tabindex.
 */
type Stage = { id: string; label: string; title: string; text: string; records: [string, string][] }

const STAGES: Stage[] = [
  {
    id: 'observe',
    label: 'Observe',
    title: 'Something is noticed',
    text: 'An observation enters the map with its provenance attached. Nothing is interpreted yet — this is what was seen, by whom, and against which version.',
    records: [
      ['Observation', 'occurred 09:14 · recorded 11:02 · owner A. Porwal'],
      ['Source version', 'rev 4c1f — pinned, not floating'],
      ['Audience', 'private to owner'],
    ],
  },
  {
    id: 'aim',
    label: 'Choose an aim',
    title: 'A direction, with a reason',
    text: 'The group states what it wants to change and why, what constrains it, and what would cause it to reconsider. The aim is versioned and has a named decision owner.',
    records: [
      ['Aim', 'v2 · owner named · supersedes v1'],
      ['Reconsider if', 'stated up front, not after the fact'],
      ['Observable change', 'defined before work begins'],
    ],
  },
  {
    id: 'explore',
    label: 'Explore',
    title: 'Alternatives stay hypothetical',
    text: 'Options are compared with their effort, cost and uncertainty. A proposed future is visibly a proposal — it can never be mistaken for something that happened.',
    records: [
      ['Options', '3 considered · 2 rejected, kept'],
      ['State', 'hypothetical — clearly marked'],
      ['Evidence', 'linked by revision, not by title'],
    ],
  },
  {
    id: 'commit',
    label: 'Commit',
    title: 'Somebody accepts something specific',
    text: 'The chosen option, the decision owner, the constraints and the acceptance criteria are recorded before the work starts. Authority over real resources comes from an actual grant, never from seniority in the interface.',
    records: [
      ['Commitment', 'accepted by name · scope pinned'],
      ['Acceptance criteria', 'agreed in advance'],
      ['Spend', 'authorised separately, with a stop condition'],
    ],
  },
  {
    id: 'inspect',
    label: 'Inspect',
    title: 'Claimed is not accepted',
    text: 'The result is attached to the commitment with its evidence. Self-report, witness confirmation, disagreement and inconclusive are all legitimate outcomes — and they are stored as different ones.',
    records: [
      ['Claimed completion', 'by the person who did the work'],
      ['Accepted outcome', 'by the decision owner or a witness'],
      ['Disagreement', 'recorded, not resolved by deletion'],
    ],
  },
  {
    id: 'author',
    label: 'Author',
    title: 'The part worth keeping',
    text: 'The author selects material into a draft edition, previews it exactly as the intended audience will see it, collects contributor approval, and publishes with rights recorded for that edition.',
    records: [
      ['Edition', 'draft → approved → published'],
      ['Rights', 'per contributor, per edition'],
      ['Private archive', 'stays behind'],
    ],
  },
]

export function LoopStepper() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const move = (next: number) => {
    const index = (next + STAGES.length) % STAGES.length
    setActive(index)
    tabs.current[index]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      move(active + 1)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      move(active - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      move(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      move(STAGES.length - 1)
    }
  }

  const stage = STAGES[active]

  return (
    <div className="loop">
      <div className="loop__nav" role="tablist" aria-label="The product loop" aria-orientation="vertical" onKeyDown={onKeyDown}>
        {STAGES.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el
            }}
            className="loop__tab"
            role="tab"
            type="button"
            id={`loop-tab-${s.id}`}
            aria-selected={i === active}
            aria-controls={`loop-panel-${s.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="loop__panel" role="tabpanel" id={`loop-panel-${stage.id}`} aria-labelledby={`loop-tab-${stage.id}`} tabIndex={0}>
        <h3>{stage.title}</h3>
        <p>{stage.text}</p>
        <dl className="loop__record">
          {stage.records.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
