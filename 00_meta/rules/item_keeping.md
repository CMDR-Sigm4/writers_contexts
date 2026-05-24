---
description: Rules for consulting and updating the key item registry (`key_items.md`).
alwaysApply: false
---

# Item Keeping

## When to Load `key_items.md`

- A tracked key item is mentioned, used, or moved in the active scene.
- You need to verify an item's current holder or location before using it in a scene.
- A chapter is being closed (`close-chapter`) and key items changed during it.

Do not load the file by default: load it only when the context requires it.

## Temporal Reading Rule

**Read only entries `[Cap. N]` where N <= `capitolo_corrente` (from `current_state.json`).**
Later entries contain developments that have not been reached yet — do not read them.
For items in **RETIRED / DESTROYED ITEMS**, load them only if they are explicitly relevant to the scene.

## File Structure

`key_items.md` is divided into two sections:

- **ACTIVE ITEMS:** items still in play. Each entry has a header with holder and first appearance, followed by `[Cap. N]` blocks in chronological order.
- **RETIRED / DESTROYED ITEMS:** items that have left the narrative. They keep their history for consistency, but do not affect active scenes.

## What to Track for Each Item

- Current holder (or physical location if nobody carries it)
- Relevant physical state (broken, damaged, hidden, etc.)
- Last significant narrative interaction

## Update Protocol

**Fundamental rule: append, never overwrite — with one exception.**

1. Find the item's section in `key_items.md`.
2. Add a new `**[Cap. X]**` entry at the end of the section.
3. Do not modify earlier `[Cap. N]` entries for narrative reasons — they are immutable history.
   - **Exception — factual error:** if an entry contains an objectively wrong fact (wrong measurement, misspelled name, physical property contradicting the manuscript), correct the original entry directly and add an inline note: `[corrected at Cap. X]`.
   - This exception applies only to objective facts verifiable in the manuscript, not to narrative reinterpretations.
4. If an item moves from active to retired/destroyed: move it to **RETIRED / DESTROYED ITEMS** and update the `**Final status:**` line.
5. If an item is new: create a new section under **ACTIVE ITEMS** with the standard header.

## Standard Header for a New Item

```markdown
### Item Name
**Current holder:** [name or location]
**First appearance:** Cap. X

**[Cap. X]** Description of first appearance and initial state.
```

## Do Not

- Do not rewrite or update existing `[Cap. N]` entries.
- Do not invent items not documented in the manuscript text.
- Do not move an "active" item without a `[Cap. N]` entry that justifies it.
- Do not load the whole RETIRED section unless relevant — it wastes context.
