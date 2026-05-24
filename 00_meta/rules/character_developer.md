---
description: Rules for expanding character sheets and maintaining character voice and consistency in active scenes.
alwaysApply: false
---

# Character Development

## When This Applies

When you create or update a character sheet in `02_characters/`, or when you need to generate dialogue or reactions consistent with a character.

## Rules

- Load the character sheet from `02_characters/` before writing dialogue or reactions — do not rely on chat memory.
- Load `02_characters/relations.md` only when analyzing interpersonal dynamics; read only entries `[Cap. N]` where N <= `capitolo_corrente`.
- Respect the character voices and behavior rules defined in `00_meta/project_rules.md`:
  - **Daphne:** stillness, precise movement, refusal to waste force.
  - **Milo:** sudden motion, curiosity, appetite, mistakes disguised as play.
  - **Liang Wei:** fluent English with accented cadence, short amused fragments, occasional Chinese words when irritated or tired; irritation used as cover for care.
  - **Mei-Lin Chen:** clipped, managerial, practical.
  - **Old Bao:** weight, breath, old patience.
- If a character is new and does not yet have a sheet, use `create-character` before writing them into a scene.
- Character sheets grow by accumulation — add information, do not overwrite existing material.
- If a character file grows beyond 2-3 pages, split it (for example, `daphne_base.md` + `daphne_past.md`).

## Do Not

- Do not give a character information they do not yet know at that point in the story.
- Do not modify already closed `[Cap. N]` entries in `relations.md`.
