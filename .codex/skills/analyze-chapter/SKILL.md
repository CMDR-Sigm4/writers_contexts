---
name: analyze-chapter
description: Import a `.txt` chapter file and extract characters, locations, lore, key items, plot, timeline, relationships, and active context. Use when the user provides an external chapter to integrate into the system.
---

# Analyze Chapter

## Goal

Read a user-provided chapter file and extract all structured information needed by the context system. Everything written to project files must come **only from the supplied text**. Do not add external lore, fandom knowledge, or guesses.

## Preparation

1. If the user did not provide a file path, ask for the `.txt` path and wait.
2. Read the chapter file fully.
3. Read `06_active_context/current_state.json`, if present.
4. Read `04_plot/timeline.md` and `04_plot/master_outline.md`.
5. Use `rg --files` or `find` to list existing files in `02_characters/`, `03_locations/`, and `01_world/`.
6. Read `05_items/key_items.md`, if present.

## Characters

For every character explicitly present in the text:

- If the character does not exist in `02_characters/`, create a sheet with only text-supported information:
  - Age, or "Not specified in the chapter"
  - Role
  - Appearance
  - Voice
  - Motivation
  - Fatal flaw
  - Secret, if present
  - Relationships
  - Canon notes with short textual evidence
  - Dialogue sample from the text
- Save as `02_characters/name_surname.md`.
- If the character exists, enrich the sheet without overwriting existing information.
- If the new chapter presents a substantially different version, create a variant file with a descriptive suffix and add cross-links under **Related Versions**.
- Do not create silent duplicates.

## Locations

For every location explicitly present in the text:

- If missing, create `03_locations/location_name.md` with:
  - General atmosphere
  - Sensory details: sight, sound, smell, touch
  - Points of interest
  - Narrative notes
- If existing, enrich it with compatible new details.
- If the same location has significantly changed by time, destruction, rebuilding, or function, create a variant file and link related versions.

## World Lore

For every lore element explicitly present in the text:

- If missing, create a file in `01_world/` with:
  - Core rules
  - Limits / weaknesses
  - Common reactions
  - Notes and open questions
- If existing, enrich compatible information.
- If the new chapter contradicts existing lore, stop and ask the user how to handle it: update the rule, create a variant, or record it as a revelation.

## Key Items

- Identify narratively relevant objects: weapons, tools, medicine, meaningful clothing, artifacts, documents, clues, or objects that affect plot or character development.
- Update `05_items/key_items.md` without duplicating existing entries.
- For new items, add a section under **ACTIVE ITEMS**.
- For changed items, append a `**[Cap. X]**` entry and update the current holder.
- For permanently removed items, move them to **RETIRED / DESTROYED ITEMS** and add final status.

## Plot

- Create or update the chapter summary in `04_plot/chapters/`.
- Include:
  - Summary
  - Characters present
  - Location
  - Open questions
  - Character emotional states at the end
  - Next-scene unresolved threads, only if left unresolved by the text
- Update `04_plot/master_outline.md` only with information supported by the chapter.
- Do not predict future chapters.

## Timeline

- Add missing events to `04_plot/timeline.md`.
- Use the columns:

  ```markdown
  | Date | Time | Event | Chapter | First Reveal | Type | Branch | Condition | Notes |
  ```

- Use `—` for unspecified dates or times.
- `First Reveal` is where the reader first learns the information.
- For flashbacks, use the chapter where the flashback appears as `First Reveal`.
- Avoid duplicates.

## Active Context

- Update `current_state.json` only if this is the most recent chapter in the active sequence.
- Before writing to `working_draft.md`, read it:
  - If empty or placeholder-only, load the chapter text into it.
  - If it contains prose, stop and ask whether to replace it, leave it unchanged, or run `save-context` first.

## Relationships

- Read `02_characters/relations.md`.
- Add new relationship pairs if needed.
- Append `**[Cap. X]**` entries for changed or newly documented dynamics.
- Do not rewrite previous entries.

## Final Report

Report:

- Created files
- Enriched files
- Variant files created and why
- Duplicates avoided
- Plot and timeline updates
- Active context changes or skipped updates
- Relationship updates
- Key item updates
- Ambiguities or contradictions that need user decisions
