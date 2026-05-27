---
name: update-relations
description: Review `02_characters/relations.md` by reading available manuscript text, creating the file if missing, adding missing relationship pairs and entries, and correcting formal relationship states. Use when relationship tracking needs realignment.
---

# Update Relationships

## Goal

Build or update `02_characters/relations.md` so every significant relationship dynamic is documented with chapter-tagged entries.

## Procedure

1. Read `06_active_context/current_state.json` and get `capitolo_corrente`.
2. Determine scope:
   - If the user supplied a chapter number or name, work only on that chapter.
   - Otherwise, work through available chapters up to `capitolo_corrente`.
3. Gather sources:
   - Use `rg --files` or `find` to list files in `07_manuscript/`.
   - Read files one by one in ascending numeric order within scope.
   - If `working_draft.md` is non-empty and in scope, read it last.
   - Use `04_plot/chapters/` summaries as secondary sources when manuscript files are missing.
   - If no source exists, tell the user and stop.
4. Read or create `02_characters/relations.md`.
5. Identify meaningful interactions: dialogue, physical action, changed perception, revelations, conflict, important gestures, emotional shifts, or relationship-state changes.
6. For a new pair, add:

   ```markdown
   ## CharacterA <-> CharacterB
   **Formal type:** [ally, enemy, rival, guardian, mentor, etc.]
   **First appearance:** Cap. N

   **[Cap. N]** Description of the dynamic.
   ```

7. For existing pairs with missing chapter entries, append `**[Cap. N]**` at the end of the section.
8. For clearly incomplete existing entries, add a sparse `**[Cap. N — integration]**` note immediately below the relevant entry.
9. Update `**Formal type:**` only when the relationship has clearly changed.
10. Summarize new pairs, added entries, integrations, type changes, and ambiguities.
