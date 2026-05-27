---
name: reset-project
description: Reset the project to a clean state, deleting narrative content while preserving structure and system files. Use only when starting a new story from scratch.
---

# Reset Project

## Goal

Return the project to a clean state by deleting narrative content while preserving system configuration and workflows.

Always preserve `shared/skill-scripts/`; it contains the shared JavaScript runtime used by both Codex and legacy Claude skill wrappers.

## Safety

This is destructive. Require double confirmation:

1. Warn the user that all narrative content will be deleted: characters, locations, lore, plot, timeline, chapter summaries, active drafts, saves, and manuscript.
2. Ask for a first explicit confirmation.
3. Ask for a second confirmation with the exact phrase: `RESET`.
4. Do not proceed unless the user writes exactly `RESET`.

## Procedure

1. Check that Node.js is available:

   ```bash
   node --version
   ```

2. Run:

   ```bash
   node .codex/skills/reset-project/scripts/reset-project.js --confirmed
   ```

3. Report deleted files, recreated placeholders, preserved files, and any errors.
