---
name: init_structure
description: Create the complete folder and placeholder-file structure for the writing project if it does not already exist. Use when initializing or repairing the project structure.
---

# Initialize Project Structure

## Goal

Create all folders and placeholder files required by the writing-context system, skipping anything that already exists.

## Procedure

1. Check that Node.js is available:

   ```bash
   node --version
   ```

   If Node.js is missing, tell the user how to install it for their operating system.

2. Run:

   ```bash
   node .claude/skills/init_structure/scripts/init_structure.js
   ```

3. Report the script output: created folders, skipped files, and any errors.
