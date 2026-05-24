---
description: Rules for keeping system documentation up to date whenever skills, commands, or folders change.
alwaysApply: true
---

# System Maintenance

## When This Applies

Every time you create, modify, or delete: skills (`.codex/skills/` or legacy `.claude/skills/`), shared scripts (`shared/skill-scripts/`), commands, structural folders, or configuration files.

## Rules

- Update `USER_GUIDE.md` immediately after every structural change — do not postpone it until the end of the session.
- Update `00_meta/index.md` if you add or remove folders from the project structure.
- Every new skill in `.codex/skills/` must have a dedicated section in `USER_GUIDE.md` with when to use it and what it does.
- Every new rule in `00_meta/rules/` must be listed in `00_meta/index.md` with a short description.
- Keep reusable JavaScript in `shared/skill-scripts/`; `.codex/skills/` and `.claude/skills/` script files should remain thin runtime wrappers unless there is a strong reason to diverge.
- Preserve `shared/skill-scripts/` during reset, cleanup, migration, and skill-maintenance workflows.
- Do not create empty placeholder files — every file must contain minimally useful content before being saved.

## Do Not

- Do not rename structural folders without updating every reference in `index.md`, `AGENTS.md`, `CLAUDE.md`, and `USER_GUIDE.md`.
- Do not delete skills without removing the matching section from `USER_GUIDE.md`.
- Do not delete `shared/skill-scripts/`; it is shared system infrastructure for both Codex and legacy Claude skills.
