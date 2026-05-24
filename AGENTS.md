# Persistent Instructions for Codex

## Critical Rules

- Completely ignore, without loading into context, every file declared in `.gitignore` and `.claudeignore` anywhere in the project.
- Use only project files. Do not use external searches, wikis, fandom pages, or prior knowledge, even if the setting resembles a known universe.
- Never modify `07_manuscript/` except when a skill explicitly needs to archive a closed chapter. For ordinary consultation it is read-only.

## Chat Startup

- Read `00_meta/index.md` before any narrative response.
- After `00_meta/index.md`, always load the operational rules in `00_meta/rules/`.
- Before writing or reviewing, read `06_active_context/current_state.json`.

## Retrieval

1. `00_meta/index.md` always comes first.
2. `00_meta/rules/` contains the project operational rules.
3. `06_active_context/current_state.json` must be read before writing or reviewing.
4. Load only the files needed for the active scene, never whole folders.
5. `02_characters/relations.md`: read only entries `[Cap. N]` where N <= `capitolo_corrente`.
6. `05_items/key_items.md`: read only entries `[Cap. N]` where N <= `capitolo_corrente`.
7. `04_plot/timeline.md`: for contextual work, read only rows where `First Reveal` <= `capitolo_corrente`, except for retrospective requests or maintenance skills.

## No Future Predictions

- Do not predict chapters that have not been written yet.
- In `04_plot/chapters/`, the "next scene link" field must contain only what the text leaves unresolved.
- In `04_plot/master_outline.md`, "Current State" means where the story has arrived, not where it will go.
- In `current_state.json`, `obiettivo_scena` is the goal of the current scene, not of the next chapter.
- If there are no explicit indications, write: "To be defined by the user."

## Codex Skills

- Local Codex skills live in `.codex/skills/<skill-name>/SKILL.md`.
- Old skills in `.claude/skills/` are a legacy archive: do not use them as the primary source when an equivalent exists in `.codex/skills/`.
- Codex skill names use hyphens, for example `new-chapter`, `save-context`, `update-timeline`.
- Shared JavaScript implementations live in `shared/skill-scripts/`; `.codex/skills/` and `.claude/skills/` script files should remain thin wrappers.
- Never delete `shared/skill-scripts/` during reset, cleanup, or skill migration work.
- Whenever a skill creates or changes structural folders or other skills, update `USER_GUIDE.md`.

## /compact Instructions

Always preserve: the state of `current_state.json`, active characters and their locations, relationship changes in `relations.md`, narrative decisions made, and files created or modified during the session.
