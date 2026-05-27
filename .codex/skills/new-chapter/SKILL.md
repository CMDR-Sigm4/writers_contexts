---
name: new-chapter
description: Set up the initial scene and active context for writing a new chapter. Use at the start of a new chapter or writing session.
---

# New Chapter

## Goal

Prepare `06_active_context/` for drafting a new chapter.

## Procedure

1. Check that Node.js is available:

   ```bash
   node --version
   ```

2. Run the safety check:

   ```bash
   node .codex/skills/new-chapter/scripts/new-chapter.js '{}'
   ```

   If `working_draft.md` is not empty, the script exits with code 2. Stop immediately, warn the user, and ask whether to run `save-context` first or whether they explicitly allow clearing the draft. Use `--force` only with explicit permission.

3. Ask for:
   - Active characters
   - Location
   - Scene goal
   - What is physically happening at the opening
   - Chapter number, if not inferable

4. Build:

   ```json
   {
     "scena_attuale": "Brief visual description of what is happening",
     "obiettivo_scena": "Narrative goal of the scene",
     "personaggi_presenti": ["character_file_1"],
     "luogo": "location_file",
     "capitolo_corrente": 1
   }
   ```

5. Run the script, adding `--force` only if explicitly authorized:

   ```bash
   node .codex/skills/new-chapter/scripts/new-chapter.js '<json>'
   ```

6. Load the listed character files from `02_characters/` and the location file from `03_locations/`.

7. Read `02_characters/relations.md`, using only entries `[Cap. N]` where N <= `capitolo_corrente - 1`.

8. Read the previous chapter summary from `04_plot/chapters/` if present.

9. Read `04_plot/master_outline.md` and update **Current State (AI Reminder)** with the current chapter and opening premise.

10. Tell the user the stage is ready and invite them to begin writing in `working_draft.md`.
