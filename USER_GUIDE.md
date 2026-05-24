# Practical User Guide: How to Use the AI Context System

This file is for **you**, the human user. It explains how the project is structured, what each file is for, and how to get the best results from the AI agent while writing.

## Core Idea: Give the AI Only What It Needs

The main problem with narrative AI work is the **context window**. If the AI tries to read *your whole book* to understand one scene, it will lose important details, get confused, hallucinate, and respond slowly.

This system solves that by splitting information into focused compartments. The AI always reads the main index (`00_meta/index.md`) first, then opens **only the specific files** needed for the scene you are working on.

---

## 1. Folder Map and Purpose

The golden rule: **one file per concept.**

* `.codex/`: Local Codex configuration for this project.
  * `skills/`: Automated workflows in Codex format. Each skill lives in `.codex/skills/<skill-name>/SKILL.md`.
  * Codex skill names use hyphens instead of underscores: for example `new-chapter`, `save-context`, `update-timeline`.

* `.claude/`: Legacy Claude Code configuration — kept as a source archive, but no longer the primary location for Codex.
  * `skills/`: Old Claude workflows. If an equivalent exists in `.codex/skills/`, use the Codex version.

* `shared/skill-scripts/`: Shared JavaScript runtime for Codex and legacy Claude skills.
  * Skill script files inside `.codex/skills/` and `.claude/skills/` are thin wrappers.
  * The actual reusable JavaScript logic lives here and must be preserved during resets and skill maintenance.

* `00_meta/`: The AI's directional brain.
  * `index.md`: The map the AI uses to find files. Update it only when you add structural folders.
  * `project_rules.md`: Absolute creative rules for the AI, such as POV, tone, and narrative limits.
  * `style_reference.md`: Style and voice sample. Read before writing prose.
  * `rules/`: Operational project rules loaded by the AI:
    * `scene_writing.md` — writing, reviewing, and developing scenes.
    * `plot_keeping.md` — summaries and timeline management.
    * `world_guide.md` — consulting and verifying lore.
    * `character_developer.md` — expanding character sheets.
    * `item_keeping.md` — consulting and updating `key_items.md`.
    * `system_maintenance.md` — updating this guide after structural changes.

* `01_world/`: Narrative world rules.
  * Use files such as `magic.md`, `ancient_history.md`, or `faction_a.md`. The AI should read them only when the scene needs that lore.

* `02_characters/`: Character sheets.
  * Create one file for each important character. Include appearance, motivation, flaws, and dialogue examples.
  * `relations.md`: Chronological relationship log. The AI reads only entries up to the current chapter.

* `03_locations/`: Key locations.
  * Use files such as `harbor_tavern.md` or `black_castle.md`. These help the AI add consistent sensory details.

* `04_plot/`: Plot memory.
  * `master_outline.md`: Logline, macro-arcs, and current state.
  * `timeline.md`: Real chronology, including present events, flashbacks, flashforwards, and branches.
  * `chapters/`: Closed chapter summaries.

* `05_items/`: Key items.
  * `key_items.md` tracks important objects, holders, and state changes.

* `06_active_context/`: The current workbench.
  * `current_state.json`: Who is present, where the scene is, the scene goal, the current chapter number (`capitolo_corrente`), and open questions.
  * `working_draft.md`: The chapter or scene currently being written.

* `07_manuscript/`: The vault.
  * Final text. Treat it as read-only except when a closing workflow archives a finished chapter.

---

## 2. How to Interact With the AI

Because the AI knows how to move through these folders, your prompts can stay short and powerful.

Ideal workflow:

1. Prepare the scene in `06_active_context/current_state.json`.
2. Start writing in `06_active_context/working_draft.md`.
3. Ask the AI for focused help.

Example prompts:

* "Milo is about to approach the bin in `working_draft.md`. Read his character sheet and give me three possible body-language beats."
* "Check the alley social rules in `01_world/`. Would Old Bao challenge Daphne here?"
* "Reread the Chapter 1 summary. Has Liang already fed Milo inside the kitchen?"

---

## 3. Skills

The project includes reusable workflows. In Codex they live in `.codex/skills/`; you can refer to them by name or ask for the action in natural language.

Legacy Claude command names often used underscores, such as `/new_chapter`. Codex skill names use hyphens, such as `new-chapter`.

### `new-chapter`

Use at the beginning of a writing session for a new chapter.

It checks whether `working_draft.md` is empty. If it is not empty, the AI stops and asks whether to run `save-context` first or proceed with explicit permission to clear it. Then it gathers the active characters, location, chapter number, and scene goal; creates `current_state.json`; loads relevant relationships; updates `master_outline.md`; and invites you to begin writing in `working_draft.md`.

### `close-chapter`

Use when the chapter in `working_draft.md` is finished.

It archives the exact prose in `07_manuscript/`, creates a chapter summary in `04_plot/chapters/`, updates `timeline.md`, `master_outline.md`, `relations.md`, and `key_items.md`, then clears the draft only after the manuscript backup is confirmed.

### `create-character`

Use when creating a new relevant character.

It asks for role, motivation, flaw, and other core details, then creates a standard character sheet in `02_characters/`.

### `create-location`

Use when characters arrive somewhere new.

It creates a location file in `03_locations/`, focused on sensory detail and atmosphere.

### `create-world`

Use when defining a world rule, magic system element, faction, institution, or other lore concept.

It creates a lore file in `01_world/`, with special attention to limitations and costs.

### `change-scene`

Use when the scene changes mid-chapter: new location, new active characters, or a changed scene goal.

It updates only `current_state.json`. If the narrative date or time changed, the AI may also update `timeline.md`.

### `create-visual-schema`

Use when you want a visual overview of the project architecture.

It reads the project map and generates a Mermaid diagram in `00_meta/architecture_schema.md`. Open it in a Markdown editor with Mermaid support.

### `save-context`

Use when you want to pause the current chapter and work on something else.

It backs up `working_draft.md` and `current_state.json` into `06_active_context/draft_saves/`.

### `restore-context`

Use when returning to a previously saved draft context.

It lists available saves, asks which one to restore, warns that the current active context will be overwritten, then restores the selected draft and state.

### `generate-gantt`

Use when you want a visual chronological overview.

It reads `timeline.md` and generates a Mermaid Gantt chart in `04_plot/timeline_gantt.md`.

### `init-structure`

Use when starting a new project or checking that all required folders and placeholder files exist.

It creates missing folders and placeholders without overwriting existing files.

### `analyze-chapter`

Use when importing an already written `.txt` chapter into the system.

It extracts structured information exclusively from the supplied text: characters, locations, lore, key items, plot summary, timeline rows, relationship updates, and active context.

### `review-draft`

Use when you want critical feedback on the current `working_draft.md`.

It reads the active draft, relevant character sheets and locations, project style, and plot context, then returns strengths, consistency issues, style suggestions, new elements to document, and open questions. It does not modify files automatically.

### `extract-from-manuscript`

Use when reimporting a chapter already archived in `07_manuscript/`.

It works like `analyze-chapter`, but starts from a manuscript file. It avoids duplicate timeline and registry entries when possible.

### `extract-from-image`

Use when you provide an image, visual reference, or local image path and want the AI to extract narrative context from it.

It first asks whether the image is canonical, a visual reference, or a mix. Then it asks focused questions about what to extract: character, location, item, lore, mood, or multiple categories. After the questionnaire, it creates new project files or enriches existing ones while separating visual evidence from user-confirmed interpretation.

When an image changes an existing entity, the skill also searches the relevant project memory and prose files, then updates conflicting entries automatically: active draft, existing chapter text, chapter summaries, master outline, timeline, style samples, key items, locations, world files, and relationships when applicable.

### `update-timeline`

Use when you want to realign `timeline.md` without waiting for `close-chapter`.

It reads the available text, compares it with the timeline, adds missing events, and reports ambiguities.

### `update-items`

Use when key items have changed and you want to update `05_items/key_items.md`.

It identifies new items, holder changes, destroyed or retired items, and appends chapter-tagged entries.

### `update-relations`

Use when relationship documentation may be missing or outdated.

It reads available text up to the current chapter, compares it with `relations.md`, adds missing relationship pairs, appends new `[Cap. N]` entries, and updates formal relationship types only when justified.

### `reset-project`

Use only when starting over with a new story.

This is a destructive operation with double confirmation. It deletes narrative content while preserving system files and workflows, then recreates required placeholders.

The recreated `key_items.md` placeholder uses the current section-based format: `## ACTIVE ITEMS` and `## RETIRED / DESTROYED ITEMS`.

---

## 4. Nonlinear Narrative

The system supports flashbacks, flashforwards, and branching narrative.

### Logline vs Scene Goal

`master_outline.md` contains the stable story DNA. `current_state.json` contains only the goal of the current scene or chapter.

### Writing Out of Order

1. Use `new-chapter` to set the chapter and narrative time.
2. Load the relevant character and location versions.
3. Let `timeline.md` place the event in chronological order, even if you write it later.

### Branches

Use the `Branch` column in `timeline.md` to track alternate narrative paths.

Use the `Condition` column for required flags or states, such as `flag:character_survives`.

---

## 5. Node.js Scripts

Some skills use deterministic Node.js scripts for file operations. They require Node.js 14+.

| Skill | Script | Notes |
|---|---|---|
| `init-structure` | `init-structure.js` | Creates folders and placeholders |
| `reset-project` | `reset-project.js` | Requires `--confirmed` after double confirmation |
| `save-context` | `save-context.js` | Accepts `--clear` to clear active context |
| `restore-context` | `restore-context.js` + `list-saves.js` | Lists saves, then restores |
| `change-scene` | `change-scene.js` | Updates only supplied JSON fields |
| `new-chapter` | `new-chapter.js` | Safety check + writes `current_state.json` |
| `generate-gantt` | `generate-gantt.js` | Accepts `--force` to overwrite |
| `create-visual-schema` | `create-visual-schema.js` | Accepts `--force` to overwrite |

Codex scripts live in `.codex/skills/<skill-name>/scripts/`, but those files are wrappers around the shared implementation in `shared/skill-scripts/`. Legacy Claude wrappers do the same from `.claude/skills/<skill_name>/scripts/`. The shared folder is versioned system infrastructure and must not be deleted by reset or cleanup workflows.

Scripts write runtime logs to `skill.log` in the project root, which is ignored by git and by the AI.

Install Node.js:

| System | Command |
|---|---|
| Windows | `winget install OpenJS.NodeJS` or nodejs.org |
| macOS | `brew install node` or nodejs.org |
| Linux (Debian/Ubuntu) | `sudo apt install nodejs` |
| Linux (Fedora/RHEL) | `sudo dnf install nodejs` |

Verify with `node --version`.

### AI-Only Skills

These do not require Node.js. The AI reads project files, reasons about the narrative, and writes or updates files directly:

| Skill | Purpose |
|---|---|
| `close-chapter` | Archives the chapter and updates memory files |
| `create-character` | Creates a character sheet |
| `create-location` | Creates a location sheet |
| `create-world` | Creates a lore element |
| `analyze-chapter` | Imports a `.txt` chapter and extracts context |
| `extract-from-manuscript` | Reimports a chapter from `07_manuscript/` |
| `extract-from-image` | Extracts context from an image or visual reference |
| `review-draft` | Critiques the current draft without automatic edits |
| `update-timeline` | Realigns `timeline.md` |
| `update-items` | Realigns `key_items.md` |
| `update-relations` | Realigns `relations.md` |

### Notes

- If a script errors, read the `[ERROR]` message; it explains what to do.
- `.codex/skills/` contains the active Codex skills. `.claude/` remains legacy and is excluded from AI context by `.claudeignore`.
- `shared/skill-scripts/` contains the shared JavaScript implementation used by both `.codex/skills/` and `.claude/skills/`.
- `skill.log` is created automatically the first time a script runs. It is ignored by git and by the AI.

---

## 6. Maintenance Tips

The system works as long as it stays tidy.

* **Split, don't pile up:** If a character file grows too long, split it into focused files such as `aloy_base.md` and `aloy_flashback.md`.
* **Keep active context small:** `current_state.json` should describe only the scene you are writing right now, not the whole book.
* **`capitolo_corrente` is your narrative clock:** keep it aligned with the real current chapter. If you skip chapters or reimport old material, update it manually.
* **Do not casually edit `relations.md`:** it is updated by skills with `[Cap. N]` entries. If you add something manually, use the same format.
