---
name: restore_context
description: Restore a previously saved active context to resume a paused chapter or scene. Use when the user wants to continue from a saved draft context.
---

# Restore Context

## Goal

Load a saved context from `06_active_context/draft_saves/` back into `06_active_context/`.

## Procedure

1. Check that Node.js is available:

   ```bash
   node --version
   ```

2. List available saves:

   ```bash
   node .claude/skills/restore_context/scripts/list_saves.js
   ```

3. Ask the user which save to restore.

4. Warn the user that restoring will overwrite the current `working_draft.md` and `current_state.json`. Ask for confirmation.

5. If confirmed, run:

   ```bash
   node .claude/skills/restore_context/scripts/restore_context.js "<chosen_label>"
   ```

6. Read the script output, then load the indicated characters and location just as in `new_chapter`.

7. Tell the user that the previous context has been restored and is ready to continue.
