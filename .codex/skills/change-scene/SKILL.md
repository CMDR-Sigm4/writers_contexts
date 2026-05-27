---
name: change-scene
description: Quickly update the active context when the scene changes. Use when location, active characters, current scene description, or scene goal changes mid-chapter.
---

# Scene Change

## Goal

Update only the relevant fields in `06_active_context/current_state.json`, preserving `capitolo_corrente` and `domande_aperte`.

## Procedure

1. Read `06_active_context/current_state.json`.

2. Ask only for missing update fields:
   - New active scene description
   - New scene goal
   - New active characters
   - New location

3. Build a partial JSON object with only the fields that changed.

4. Run:

   ```bash
   node .codex/skills/change-scene/scripts/change-scene.js '{"scena_attuale":"...","obiettivo_scena":"...","personaggi_presenti":["..."],"luogo":"..."}'
   ```

5. If characters or location changed, load the corresponding files in `02_characters/` and `03_locations/`.

6. If narrative date or time changed, optionally update `04_plot/timeline.md` with a transition row.

7. Report what changed and what context was loaded.
