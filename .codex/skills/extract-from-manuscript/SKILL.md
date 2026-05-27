---
name: extract-from-manuscript
description: Extract characters, locations, lore, key items, plot, timeline, relationships, and active context from a chapter already archived in `07_manuscript/`. Use when reimporting or realigning an existing manuscript chapter.
---

# Extract From Manuscript

## Goal

Read an archived chapter in `07_manuscript/` and extract all structured information needed by the context system. This works like `analyze-chapter`, but the source is an existing manuscript file.

Everything written to project files must come **only from the manuscript text**. Do not add external lore, fandom knowledge, or guesses.

## Preparation

1. Choose the source file:
   - If the user supplied a filename, verify that it exists in `07_manuscript/`.
   - If it does not exist, list available files and ask which one to use.
   - If no filename was supplied, list available files and ask the user to choose.
2. Read the manuscript file fully.
3. Read `06_active_context/current_state.json`, if present.
4. Read `04_plot/timeline.md` and `04_plot/master_outline.md`.
5. Use `rg --files` or `find` to list existing files in `02_characters/`, `03_locations/`, and `01_world/`.
6. Read `05_items/key_items.md`, if present.

## Extraction Rules

Use the same extraction standards as `analyze-chapter`:

- Create or enrich character sheets in `02_characters/`.
- Create or enrich location files in `03_locations/`.
- Create or enrich lore files in `01_world/`.
- Update `05_items/key_items.md` for key items.
- Create or enrich a chapter summary in `04_plot/chapters/`.
- Update `04_plot/master_outline.md` only with text-supported facts.
- Add missing rows to `04_plot/timeline.md`.
- Update `02_characters/relations.md` with missing pairs or entries.

## Duplicate Avoidance

Before adding anything:

- Check whether the event, relationship entry, item entry, character detail, location detail, or lore note is already present.
- Do not duplicate existing `[Cap. X]` entries.
- If a file already contains a compatible but less detailed note, enrich it rather than creating a duplicate.
- If an element contradicts existing material, stop and ask the user how to handle it.

## Active Context

- Update `current_state.json` only if the extracted chapter is the most recent active chapter.
- Before writing to `working_draft.md`, read it:
  - If empty or placeholder-only, load the manuscript text into it.
  - If it contains prose, stop and ask whether to replace it, leave it unchanged, or run `save-context` first.

## Final Report

Report:

- Source manuscript file
- Created files
- Enriched files
- Variant files created and why
- Duplicates avoided
- Plot and timeline updates
- Active context changes or skipped updates
- Relationship updates
- Key item updates
- Ambiguities or contradictions that need user decisions
