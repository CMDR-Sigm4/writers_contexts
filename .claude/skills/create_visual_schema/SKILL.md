---
name: create_visual_schema
description: Generate a Mermaid visual diagram of the full project architecture, including folders and skills. Use when the user asks for the visual project guide, architecture diagram, or regenerated visual guide.
---

# Visual Architecture Schema

## Goal

Generate a Mermaid diagram of the project architecture and save it to `00_meta/architecture_schema.md`.

## Procedure

1. Check that Node.js is available:

   ```bash
   node --version
   ```

   If it fails, tell the user how to install Node.js for their operating system.

2. Run:

   ```bash
   node .claude/skills/create_visual_schema/scripts/create_visual_schema.js
   ```

3. If `00_meta/architecture_schema.md` or `00_meta/architecture_schema.svg` already exists, the script exits with code 3. If the user asked to regenerate or overwrite, rerun:

   ```bash
   node .claude/skills/create_visual_schema/scripts/create_visual_schema.js --force
   ```

4. Report the script output and tell the user that the Mermaid diagram can be opened in a Markdown editor with Mermaid support.
