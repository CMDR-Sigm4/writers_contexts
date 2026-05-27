---
name: save_context
description: Save the current active context so it can be resumed later. Use when pausing a chapter or scene before switching to another task.
---

# Save Context

## Goal

Back up `06_active_context/working_draft.md` and `06_active_context/current_state.json` into `06_active_context/draft_saves/`.

## Procedure

1. Check that Node.js is available:

   ```bash
   node --version
   ```

2. Ask the user for a short save label, such as `chapter_2_alley_draft`.

3. Run:

   ```bash
   node .claude/skills/save_context/scripts/save_context.js "<label>"
   ```

4. Report the script output.

5. If the user wants to clear the active context after saving, run:

   ```bash
   node .claude/skills/save_context/scripts/save_context.js "<label>" --clear
   ```
