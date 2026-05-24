# Persistent Instructions

## Critical Rules

- Completely ignore (do not read or load into context) every file declared in any `.gitignore` and `.claudeignore` anywhere in the project.
- After reading this file, the agent must explicitly confirm to the user: "I have read CLAUDE.md!" The message must be sent automatically.

## Chat Startup

**Read `00_meta/index.md` before any narrative response.** It is the project map: it tells the agent which files to load based on the request.

## Sources

Use only project files. Do not use external searches, wikis, fandom pages, or prior knowledge, even if the setting resembles a known universe.

## Retrieval

1. `00_meta/index.md` — always first.
2. `06_active_context/current_state.json` — before writing or reviewing.
3. Load only the files needed for the active scene, never whole folders.
4. `07_manuscript/` — read-only, never modify.

## No Future Predictions

Do not predict chapters that have not been written yet:
- `04_plot/chapters/` -> "next scene link": only what the text leaves unresolved.
- `04_plot/master_outline.md` -> "Current State": where the story has arrived, not where it will go.
- `current_state.json` -> `obiettivo_scena`: goal of the current scene, not of the next chapter.
- If there are no explicit indications: "To be defined by the user."

## System Maintenance

Update `USER_GUIDE.md` every time you create or modify skills or structural folders.
Shared JavaScript implementations live in `shared/skill-scripts/`; preserve this folder during reset, cleanup, and skill migration work.

## /compact Instructions

Always preserve: the state of `current_state.json`, active characters and their locations, relationship changes in `relations.md`, narrative decisions made, and files created or modified during the session.
