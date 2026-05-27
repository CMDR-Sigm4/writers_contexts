---
name: review_draft
description: Review the current `working_draft.md` and provide narrative revision feedback without automatically modifying files. Use when the user asks for critique, consistency review, or draft revision notes.
---

# Draft Review

## Goal

Read `06_active_context/working_draft.md` and provide a critical narrative review. Do not modify any file automatically.

## Context Loading

1. Read `06_active_context/working_draft.md`.
   - If it is empty or only contains the placeholder, stop and tell the user there is no draft to review.
2. Read `06_active_context/current_state.json`.
3. Load only the active character sheets from `02_characters/` and relevant locations from `03_locations/`.
4. Read `00_meta/style_reference.md`.
5. Read `04_plot/master_outline.md`.

## Review Areas

For each area, cite short passages from the draft when useful:

- **Character consistency:** behavior, voice, motivations, emotional state, and known information.
- **Location consistency:** sensory detail, established geography, and new elements that should be documented.
- **Plot consistency:** alignment with outline, previous chapter questions, and timeline facts.
- **Lore consistency:** factions, systems, institutions, and undocumented lore.
- **Style and tone:** POV, rhythm, tense, repetition, weak phrasing, and alignment with `style_reference.md`.

## Feedback Rules

- Give concrete, scoped suggestions.
- Identify the exact issue and why it matters.
- Offer directions or small alternatives.
- Do not rewrite full paragraphs unless the user explicitly asks.
- Do not edit `working_draft.md` or any other file without explicit confirmation.

## Output Format

```markdown
## Draft Review — [Chapter/Title]

### Strengths
[What works well]

### Consistency Issues
[Character, place, plot, and lore issues]

### Style Suggestions
[Rhythm, POV, diction, tension, tense]

### New Elements to Document
[Characters, locations, lore, or items introduced]

### Open Questions Introduced by the Scene
[Unresolved tensions or mysteries, without predicting solutions]
```
