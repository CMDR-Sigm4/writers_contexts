---
description: Rules for generating summaries, updating the timeline, and maintaining plot consistency.
alwaysApply: false
---

# Plot Keeping

## When This Applies

When you generate or update chapter summaries, edit `timeline.md`, `master_outline.md`, or files in `04_plot/chapters/`.

## Rules

- Get the current chapter number from `06_active_context/current_state.json` -> field `capitolo_corrente`.
- Chapter summaries go in `04_plot/chapters/ch{N}_summary.md` — use the chapter number as `N`.
- `master_outline.md` -> "Current State": record where the story has arrived, not where it will go.
- Do not predict chapters that have not been written yet. If there are no explicit indications, write "To be defined by the user."
- Add entries to `relations.md` only with `[Cap. N]` tags at the end of the correct section — do not touch previous entries.

## Rules for `timeline.md`

**Contextual reading:** read only rows where `First Reveal` <= `capitolo_corrente`. Rows with `First Reveal = —` are always readable. For `generate-gantt` and retrospective analysis: use the full table.

**Columns:**
- `Chapter`: the chapter/scene where the event is set narratively.
- `First Reveal`: the chapter/scene where this information is revealed to the reader/player for the first time. In linear narrative it matches `Chapter`. In nonlinear narrative it may differ — use this field for temporal filtering.
- `Type`: `Present`, `Flashback`, `Flashforward`, or `Branch`.
- `Branch`: `main` by default. For branching narrative, enter the branch name.
- `Condition`: `—` = no condition (universal event). For branching narrative: `flag:flag_name` or a description of the required state. `*` = all active branches.

**Updating:** add new rows at the bottom of the table. Do not modify existing rows except for factual errors. For events with `Type = Flashback`, set `First Reveal` to the chapter where the flashback appears in the text, not to the diegetic date of the event.

## Do Not

- Do not overwrite existing entries in `relations.md`.
- Do not set `obiettivo_scena` in `current_state.json` by looking ahead to future chapters.
- Do not use only the `Chapter` column as the temporal filter — always use `First Reveal`.
