# Meta Index

The AI reads this file first in every chat to decide which files to load.

## Project Structure

- `00_meta/`: Configuration and rules — **always read first.**
  - `rules/`: **Project operational rules — always load.**
    - `scene_writing.md`: How to write, review, and develop scenes.
    - `plot_keeping.md`: How to manage summaries and the timeline.
    - `world_guide.md`: How to consult and verify lore.
    - `character_developer.md`: How to expand character sheets.
    - `item_keeping.md`: How to consult and update `key_items.md` — load only if a key item is involved in the scene or chapter.
    - `system_maintenance.md`: Requirement to update `USER_GUIDE.md` after every structural change.
  - `project_rules.md`: Creative rules for the project (tone, POV, narrative limits).
  - `style_reference.md`: Style and narrative voice sample — read before writing prose.
- `01_world/`: Lore, magic, factions — load **only when relevant** to the active scene.
- `02_characters/`: Character profiles — load **only the characters present in the scene**.
  - `relations.md`: Chronological relationship log — load when analyzing interpersonal dynamics. **Read only entries `[Cap. N]` where N <= `capitolo_corrente` from `current_state.json`.**
- `03_locations/`: Locations and sensory details — load **only the active location**.
- `04_plot/`: Plot summaries and chronology.
  - `master_outline.md`: Logline, macro-arcs, current state.
  - `timeline.md`: Unified chronology (present, flashbacks, flashforwards, branches).
  - `chapters/`: Summaries for closed chapters.
- `05_items/`: Key items and holders (`key_items.md`).
- `06_active_context/`: Current state (`current_state.json`) and active draft (`working_draft.md`).
- `07_manuscript/`: **FINAL TEXT** — read-only. Never modify.
- `shared/skill-scripts/`: Shared JavaScript runtime for Codex and legacy Claude skill wrappers. Preserve during reset and maintenance workflows.
