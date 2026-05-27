---
name: create_location
description: Define a new location with sensory details and atmosphere. Use when characters enter a new important place or a missing location file is needed.
---

# Create Location

## Goal

Create a location file in `03_locations/` focused on atmosphere and usable sensory detail.

## Procedure

1. Ask the user for the location name, narrative function, mood, and any fixed details.
2. Draft a location sheet with:
   - General atmosphere
   - Sight
   - Sound
   - Smell
   - Touch / temperature
   - Points of interest
   - Narrative notes
3. If the user approves, derive a valid Markdown filename.
4. Before saving, use `test -f`, `rg --files`, or `find` to verify that the file does not already exist in `03_locations/`.
5. If it exists, ask whether to rename, overwrite, or cancel.
6. Save the approved file in `03_locations/`.
7. Summarize the created location and any details left undefined.
