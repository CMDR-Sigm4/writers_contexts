---
name: update-timeline
description: Review `04_plot/timeline.md` by reading available manuscript text, creating the file if missing, adding missing events, and correcting factual inconsistencies. Use when the timeline needs realignment.
---

# Update Timeline

## Goal

Build or update `04_plot/timeline.md` from narrative sources, ensuring significant events are recorded correctly.

## Procedure

1. Read `06_active_context/current_state.json` and get `capitolo_corrente`.
2. Determine scope:
   - If the user supplied a chapter number or name, work only on that chapter.
   - Otherwise, work through available chapters up to `capitolo_corrente`.
3. Gather sources:
   - Use `rg --files` or `find` to list files in `07_manuscript/`.
   - Read files one by one in ascending numeric order within scope.
   - If `working_draft.md` is non-empty and in scope, read it last as the most recent text.
   - If no source exists, tell the user and stop.
4. Read or create `04_plot/timeline.md` with columns:

   ```markdown
   | Date | Time | Event | Chapter | First Reveal | Type | Branch | Condition | Notes |
   |---|---|---|---|---|---|---|---|---|
   ```

5. For each chapter, extract significant events:
   - `Date` and `Time`: use `—` if unspecified.
   - `Event`: one concise sentence.
   - `Chapter`: where the event happens diegetically.
   - `First Reveal`: where the reader first learns it.
   - `Type`: `Present`, `Flashback`, `Flashforward`, or `Branch`.
   - `Branch`: `main` by default.
   - `Condition`: `—` by default; use flags for branching narrative.
   - `Notes`: explicit consequences only.
6. Avoid duplicates by comparing chapter and event meaning.
7. Correct factual inconsistencies and report them.
8. Summarize added events, corrections, and ambiguities.
