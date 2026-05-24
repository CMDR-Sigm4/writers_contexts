---
description: Rules for consulting and verifying narrative world lore (magic, factions, history).
alwaysApply: false
---

# World Guide

## When This Applies

When the active scene requires checks about world rules, factions, past history, or key items.

## Rules

- Use only files in `01_world/` as lore sources. No wikis, fandom pages, or prior knowledge — even if the setting resembles a known universe.
- Load only the lore file needed for the active scene, never the whole `01_world/` folder.
- Before introducing a lore element into a scene, verify that it is documented in `01_world/` or `05_items/key_items.md`.
- If an element is not documented: tell the user and ask whether to create it with `create-world` before using it.
- Key items (artifacts, clues, physical keys) must be tracked in `05_items/key_items.md` — always verify the current holder before using them in a scene. For item reading and update rules, consult `00_meta/rules/item_keeping.md`.

## Do Not

- Do not invent lore rules, place names, or factions not present in project files.
- Do not load more lore files than necessary; it wastes context.
