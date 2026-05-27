---
name: extract-from-image
description: Analyze a user-provided image or visual reference through an interactive questionnaire, then create or enrich character, location, item, or lore files from the image and the user's answers. Use when the user shares, links, or points to an image and wants narrative context extracted from it.
---

# Extract From Image

## Goal

Turn a user-provided image into useful project context without over-inventing. The image may be:

- **Canonical image**: a direct depiction of a character, location, item, or lore element that should become project truth.
- **Visual reference**: inspiration for mood, design, posture, palette, atmosphere, clothing, architecture, or other details that may be adapted rather than copied literally.

## Intake

1. Accept any available image source:
   - image attached in chat;
   - local file path supplied by the user;
   - project-relative file path;
   - another user-described way of locating the image.
2. If the image is a local path and is not already visible in the conversation, use the available image-viewing tool before analysis.
3. Ask first whether the image is:
   - a canonical image;
   - a visual reference;
   - a mix of both.
4. Ask what the user wants to extract:
   - character;
   - location;
   - item;
   - world/lore element;
   - mood/style reference;
   - multiple categories.

## Interactive Questionnaire

Ask only useful questions. Prefer 3-6 focused questions, then continue if the answers show ambiguity.

For a **character**, ask about:
- name or working name;
- role in the story;
- which visible traits are literal versus inspirational;
- personality, emotional temperature, posture, social status, and voice;
- whether to create a new file or enrich an existing file.

For a **location**, ask about:
- location name or working name;
- narrative function;
- whether the image depicts the exact place or only atmosphere;
- sensory details to preserve;
- dangers, social use, history, or symbolic meaning.

For an **item**, ask about:
- item name;
- current holder or location;
- whether visible materials, damage, marks, or scale are canon;
- narrative importance;
- state changes to record in `05_items/key_items.md`.

For a **world/lore element**, ask about:
- what rule, faction, ritual, technology, creature, institution, or cultural signal the image suggests;
- limits, costs, taboos, common reactions, and contradictions with existing lore.

## File Selection

Before writing, check for existing candidates:

- characters: `02_characters/`
- locations: `03_locations/`
- items: `05_items/key_items.md`
- lore: `01_world/`
- relationships, only if interpersonal dynamics are explicitly extracted: `02_characters/relations.md`

If an existing file seems relevant, ask whether to enrich it or create a variant/new file. If the user already names the target entity or says "use this as reference for X," treat that as permission to enrich the existing matching file.

## Automatic Propagation

After updating the primary file, automatically search for existing project entries that mention the changed entity or the replaced traits. Update any entry that now conflicts with the new image-derived context.

Check only relevant files:

- active draft: `06_active_context/working_draft.md`;
- written chapters that already contain the entity: `07_manuscript/`;
- chapter summaries: `04_plot/chapters/`;
- master outline and timeline: `04_plot/master_outline.md`, `04_plot/timeline.md`;
- style samples and project rules when they contain old visual or voice details: `00_meta/style_reference.md`, `00_meta/project_rules.md`;
- item list when the image creates or changes carried/worn/used objects: `05_items/key_items.md`;
- location or world files when the image changes a place, institution, atmosphere, or lore rule;
- relationships only when the image or user answers change interpersonal dynamics.

Propagation rules:

1. Replace obsolete descriptions in existing prose when the entity is already present.
2. Add a concise non-diegetic reference entry to `04_plot/timeline.md` for important visual/reference updates.
3. Update chapter summaries if the changed details affect how the chapter should be remembered.
4. Do not invent future plot events while propagating.
5. Do not update unrelated files merely because they are in the same folder.
6. Report explicitly when `relations.md` or `key_items.md` was checked but did not need changes.

## Writing Rules

1. Separate **observed visual evidence** from **user-confirmed interpretation**.
2. Do not infer future plot events.
3. Do not import copyrighted or franchise-specific claims unless they are present in project files or stated by the user.
4. If the image is only a reference, adapt details into original story language instead of copying proprietary names or exact designs.
5. Keep file updates concise and useful for future scene writing.
6. Propagate the change to conflicting existing entries before final response.
7. Mark uncertain points under **Open Questions**.

## Output Formats

When creating or enriching a **character file**, include or update:
- Appearance
- Posture and movement
- Clothing / objects carried
- Voice and dialogue habits, if inferable or user-confirmed
- Personality cues
- Narrative function
- Visual evidence
- User-confirmed interpretation
- Open questions

When creating or enriching a **location file**, include or update:
- General atmosphere
- Sight
- Sound
- Smell
- Touch / temperature
- Points of interest
- Social or narrative function
- Visual evidence
- User-confirmed interpretation
- Open questions

When updating **key_items.md**, use the existing table/section style and include:
- name;
- holder or physical location;
- status;
- chapter tag if known;
- concise notes from image and user answers.

When creating or enriching **lore**, include:
- core rule or concept;
- visible signs;
- limits / costs;
- common reactions;
- narrative uses;
- contradictions or open questions.

## Final Response

Report:

- image classification: canonical, reference, or mixed;
- files created or updated;
- existing entries that were automatically updated;
- relevant files checked but intentionally left unchanged;
- what was extracted from the image;
- what came from the user's answers;
- unresolved questions.
