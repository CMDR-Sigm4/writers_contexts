---
name: create_world
description: Add a new worldbuilding concept, magic rule, institution, faction, or lore element. Use when an undocumented lore element is needed before writing or analysis.
---

# Create World Lore

## Goal

Create a lore file in `01_world/` that documents a world rule or setting element.

## Procedure

1. Ask the user what concept must be documented.
2. Ask for its limits, costs, weaknesses, and social reactions.
3. Draft a lore file with:
   - Core rules
   - Limitations / weaknesses
   - Common reactions
   - Narrative uses
   - Open questions
4. Before saving, use `test -f`, `rg --files`, or `find` to verify that the file does not already exist in `01_world/`.
5. If it exists, ask whether to rename, overwrite, or cancel.
6. Save the approved file in `01_world/`.
7. Summarize the lore element and any unresolved points.
