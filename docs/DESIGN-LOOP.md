# Landing page self-evolving loop

Four iterations, each: build → screenshot (desktop light, desktop dark, 390px) → score
against the rubric below → fix the lowest-scoring criteria → repeat. Target: 9/10.

Scoring is per-criterion out of 10, then averaged. A criterion is scored on what the
screenshot actually shows, not on intent. Anything I cannot see in a screenshot
(animation timing, hover states) is verified in the DOM or by a second capture.

| # | Criterion | Weight | What a 9–10 looks like |
|---|---|---|---|
| 1 | **Readability** | 2× | Every line comfortable at arm's length. No orphan words, no 4-line headline, no text over 80ch, nothing below 14px, contrast AA+ everywhere |
| 2 | **Story clarity** | 2× | A stranger scrolling once understands: what it is, the seven steps, what they get, what to do next — in that order, without backtracking |
| 3 | **Visual craft** | 1.5× | Deliberate rhythm, consistent spacing scale, nothing accidentally centred or stranded, no large dead zones, alignment holds across sections |
| 4 | **Illustration quality** | 1.5× | The botanical reads as drawn by a person: varied forms, real depth, believable growth. Not clip-art, not a vector daisy |
| 5 | **Micro-interaction** | 1.5× | Every section has one restrained motion that earns its place; reveals are staggered, never janky; all of it respects reduced-motion |
| 6 | **Crawler legibility** | 1× | One h1, answer-first block, question H2s, FAQ, JSON-LD, real internal links — all still intact after the redesign |
| 7 | **Honesty of claims** | 0.5× | No invented metrics, logos or testimonials. Roadmap labelled as roadmap |

## Log

| Iteration | Score | What the screenshot showed | What was changed |
|---|---|---|---|
| **1** | **7.0** | Headline broke across three lines; eyebrow still said "A more purposeful internet"; leaf veins overshot the blade and read as whiskers; journey stranded in the left 45% with a dead right half; "Big Idea" headline broke into five short lines; pipeline never appeared | Headline scale and hero grid ratio; correct eyebrow; veins clamped to the blade's sine arch; journey restructured into a sticky split; Big Idea widened |
| **2** | **7.8** | Structure held and the chain rendered, but "We" was orphaned at a line end in the Big Idea and the hero arrived all at once with no sequence | Explicit second line on the Big Idea; staggered hero entrance in reading order; stats rule wipe; hover states on steps and stats |
| **3** | **8.1** | Entrance read well; the pipeline now wrapped with "Leads" alone on a second row | Tighter connectors so the chain holds one line; a deliberate vertical column below tablet; petals alternating warm/cool |
| **4** | **8.8 → 9.0** | Everything legible in both schemes at 390/768/1440; weakest were visual craft (the sticky column had nothing below its heading) and the plant appearing to float | CTA added to the sticky column; mobile stats to two columns; basal leaves and a cast shadow to ground the plant |

### Final scores

| Criterion | Score |
|---|---|
| Readability | 9 |
| Story clarity | 9 |
| Visual craft | 8.5 |
| Illustration quality | 9 |
| Micro-interaction | 9 |
| Crawler legibility | 9.5 |
| Honesty of claims | 9 |
| **Weighted** | **9.0** |

### Motion, verified rather than assumed

Checked in the browser in both motion modes rather than inferred from the CSS:

| | Normal | Reduced motion |
|---|---|---|
| `js-reveal` flag set | yes | no — the observer bails out |
| Reveal targets hidden at load | 10 of 10 | 0 of 10 |
| Revealed after scrolling to the journey | 3 (only those in view) | n/a |
| Hero entrance animation | `hero-rise` | `none` |

### Still open

- Visual craft is the lowest criterion at 8.5. The journey's sticky column is short against a
  tall run of steps, so there is vertical emptiness beside steps 04–07 at desktop widths.
- The deep pages (`/platform`, `/use-cases/*`, comparisons) still lead with the CRM social-layer
  framing. The landing page now frames that as step 07 of the journey, which reads correctly,
  but the interior pages have not been rewritten to match the new story.
