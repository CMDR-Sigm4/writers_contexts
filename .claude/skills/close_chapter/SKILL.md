---
name: close_chapter
description: Close the current chapter and update the project memory. Use when the draft is finished and must be archived, summarized, and reflected in timeline, relations, and key items.
---

# Close Chapter

## Goal

Archive the current draft safely, then update the long-term memory files.

## Procedure

1. Read the full contents of `06_active_context/working_draft.md`.
   - If it is empty or only the placeholder, stop and tell the user there is no chapter to close.
2. Read `06_active_context/current_state.json` and get `capitolo_corrente`. If missing, ask the user for the chapter number.
3. Analyze the draft for:
   - Summary of events
   - Active characters
   - Location
   - Open questions
   - Character emotional states
   - New information and state changes
4. Archive the exact prose in `07_manuscript/` using the chapter number, for example `chapter_01.md`.
   - If the manuscript file exists, read it first and ask before appending or overwriting.
5. Create or update the chapter summary in `04_plot/chapters/`.
6. Update `04_plot/timeline.md` with significant events, using `First Reveal` as the temporal reading filter.
7. Update `04_plot/master_outline.md`, especially **Current State**, without predicting future chapters.
8. Update `02_characters/relations.md`:
   - Add new relationship pairs if needed.
   - Append `**[Cap. X]**` entries to existing pairs.
   - Do not rewrite previous chapter entries.
9. Update `05_items/key_items.md`:
   - Add new key items.
   - Append state or holder changes.
   - Move retired or destroyed items to the retired section when justified.
10. Only after confirming the manuscript archive exists and contains the prose, clear `working_draft.md` to the placeholder and update `current_state.json` as needed.
11. Report every file created or changed and any ambiguities.
