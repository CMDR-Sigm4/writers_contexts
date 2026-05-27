---
name: generate-gantt
description: Generate a Mermaid Gantt chart from the full narrative timeline. Use when the user wants a visual chronology or timeline chart.
---

# Generate Timeline Gantt

## Goal

Read `04_plot/timeline.md` and generate a Mermaid Gantt chart in `04_plot/timeline_gantt.md`.

## Procedure

1. Check that Node.js is available:

   ```bash
   node --version
   ```

   If Node.js is missing, tell the user how to install it for their operating system.

2. Run:

   ```bash
   node .codex/skills/generate-gantt/scripts/generate-gantt.js
   ```

3. If `04_plot/timeline_gantt.md` already exists, the script exits with code 3. If the user asked to regenerate or overwrite, rerun:

   ```bash
   node .codex/skills/generate-gantt/scripts/generate-gantt.js --force
   ```

4. Report the number of events, generated sections, and output path.
