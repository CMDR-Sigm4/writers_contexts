---
name: update_items
description: Review `05_items/key_items.md` by reading available manuscript text, creating the file if missing, adding key items and missing chapter entries, and correcting item state errors. Use when key item tracking needs realignment.
---

# Update Key Items

## Goal

Build or update `05_items/key_items.md` so every narratively relevant object is tracked with chapter-tagged entries.

## Procedure

1. Read `06_active_context/current_state.json` and get `capitolo_corrente`.
2. Determine scope:
   - If the user supplied a chapter number or name, work only on that chapter.
   - Otherwise, work through available chapters up to `capitolo_corrente`.
3. Gather sources:
   - Use `rg --files` or `find` to list files in `07_manuscript/`.
   - Read files one by one in ascending numeric order within scope.
   - If `working_draft.md` is non-empty and in scope, read it last.
   - If no source exists, tell the user and stop.
4. Read or create `05_items/key_items.md`.
5. Identify narratively relevant objects: weapons, tools, medicine, meaningful clothing, artifacts, documents, clues, or anything that affects plot or character development.
6. For each new item, create a section under **ACTIVE ITEMS**:

   ```markdown
   ### <Item Name>
   **Current holder:** <person or location>
   **First appearance:** Cap. N

   **[Cap. N]** Description of first appearance and initial state.
   ```

7. For existing items with missing chapter entries, append a new `**[Cap. N]**` entry. Do not rewrite previous entries.
8. Update `**Current holder:**` when the holder changes.
9. If an item leaves the narrative permanently, append the final entry, move it to **RETIRED / DESTROYED ITEMS**, and add `**Final status:**`.
10. Correct factual header inconsistencies and report them.
11. Summarize created items, added entries, retired items, corrections, and ambiguities.
