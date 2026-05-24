# Shared Skill Scripts

This folder contains the shared JavaScript runtime used by both Codex and legacy Claude skills.

- `.codex/skills/*/scripts/*.js` files are thin wrappers that set `SKILL_RUNTIME=codex`.
- `.claude/skills/*/scripts/*.js` files are thin wrappers that set `SKILL_RUNTIME=claude`.
- Shared logic lives here to avoid maintaining duplicate JavaScript implementations.

This folder is system infrastructure. Do not delete it during project resets, story resets, cleanup workflows, or skill migration work.
