---
name: create_character
description: Create a new standard character sheet. Use when the story needs a new relevant character or a missing character profile.
---

# Create Character

## Goal

Create a coherent character file in `02_characters/` using the project format.

## Procedure

1. Ask the user for the character's role, motivation, fatal flaw, and narrative function.
2. If details are missing, make conservative suggestions and ask the user to approve or adjust them.
3. Build a sheet with:
   - Name
   - Role
   - Age, if known
   - Appearance
   - Voice and dialogue habits
   - Motivation
   - Fatal flaw
   - Secret, if any
   - Relationships
   - Canon notes
   - Dialogue sample
4. Derive a lowercase Markdown filename with spaces converted to underscores.
5. Before saving, use `test -f`, `rg --files`, or `find` to verify that the file does not already exist in `02_characters/`.
6. If it exists, ask whether to rename, overwrite, or cancel.
7. Save the approved sheet in `02_characters/`.
8. Summarize what was created and which details remain open.
