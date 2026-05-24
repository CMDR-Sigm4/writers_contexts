'use strict';
/**
 * init-structure.js
 * Create the complete project folder and placeholder-file structure.
 * Skip everything that already exists. Produces the same result as the
 * init-structure skill run by the AI agent.
 *
 * Usage: node <runtime skill script path>
 */

const fs   = require('fs');
const path = require('path');
const { ROOT, join } = require('./_lib/paths');
const { log, ok, warn, err, checkNode } = require('./_lib/logger');

checkNode();

// ---------------------------------------------------------------------------
// Folders to create
// ---------------------------------------------------------------------------
const DIRS = [
  '00_meta',
  '01_world',
  '02_characters',
  '03_locations',
  '04_plot',
  path.join('04_plot', 'chapters'),
  '05_items',
  '06_active_context',
  path.join('06_active_context', 'draft_saves'),
  '07_manuscript',
];

// ---------------------------------------------------------------------------
// Placeholder files: [relative_path, content]
// ---------------------------------------------------------------------------
const PLACEHOLDERS = [
  [
    path.join('00_meta', 'index.md'),
    `# Meta Index

> **Read this file first in every new conversation.**
> It is the project map: it tells the AI which files to load based on the request.

## Folder Structure

| Folder | Contents | When to load |
|---|---|---|
| \`00_meta/\` | Rules, style, map (this file) | Always first |
| \`01_world/\` | Lore, magic, factions | Only if the scene involves lore |
| \`02_characters/\` | Character profiles | Only characters in the active scene |
| \`03_locations/\` | Locations and sensory details | Only the active scene location |
| \`04_plot/\` | Outline, timeline, chapter summaries | Before writing or reviewing |
| \`05_items/\` | Key items (\`key_items.md\`) | If the scene involves important objects |
| \`06_active_context/\` | Active state (\`current_state.json\`) and draft (\`working_draft.md\`) | Before writing or reviewing |
| \`07_manuscript/\` | Final text — **read-only, never modify** | To consult closed chapters |

## Retrieval Rules

1. \`00_meta/index.md\` — always first.
2. \`06_active_context/current_state.json\` — before writing or reviewing.
3. Load only the files needed for the active scene, never whole folders.
4. \`07_manuscript/\` — read-only, never modify.
5. \`02_characters/relations.md\` — read only entries \`[Cap. N]\` where N <= \`capitolo_corrente - 1\`.
`,
  ],
  [
    path.join('00_meta', 'project_rules.md'),
    `# Project Rules

<!-- Define the creative rules for your project here:
     tone, point of view, narrative limits, style conventions, etc. -->

`,
  ],
  [
    path.join('00_meta', 'style_reference.md'),
    `# Style Reference

## Tone

<!-- Describe the overall narrative tone, such as dark, ironic, lyrical... -->

## Narrative Voice

<!-- POV, tense, narrative distance -->

## Vocabulary

<!-- Keywords, characteristic expressions, terms to avoid -->

## Style Sample

<!-- Paste a short excerpt representative of the desired style here -->
`,
  ],
  [path.join('01_world', '.gitkeep'), ''],
  [path.join('02_characters', '.gitkeep'), ''],
  [
    path.join('02_characters', 'relations.md'),
    `# Relationship Dynamics Map

> **AI instruction:** Read only entries \`[Cap. N]\` where N <= \`capitolo_corrente\`.
> Entries from future chapters have not happened yet in the active timeline.

> **Section format:** \`## CharacterA <-> CharacterB\`
> Every update is annotated with \`**[Cap. X]**\` for traceability.

`,
  ],
  [path.join('03_locations', '.gitkeep'), ''],
  [
    path.join('04_plot', 'master_outline.md'),
    `# Master Outline

## Logline

<!-- One sentence summarizing the whole story -->

## Overall Structure

<!-- Macro-arcs, acts, major turning points -->

## Current State (AI Reminder)

<!-- Updated by new-chapter: current chapter and opening premise of the scene -->
`,
  ],
  [
    path.join('04_plot', 'timeline.md'),
    `# Timeline

| Date | Time | Event | Chapter | First Reveal | Type | Branch | Condition | Notes |
|---|---|---|---|---|---|---|---|---|
`,
  ],
  [
    path.join('05_items', 'key_items.md'),
    `# Key Items

| Name | Holder | Status | Chapter | Notes |
|---|---|---|---|---|
`,
  ],
  [
    path.join('06_active_context', 'current_state.json'),
    JSON.stringify({
      scena_attuale: '',
      obiettivo_scena: '',
      personaggi_presenti: [],
      luogo: '',
      capitolo_corrente: 0,
      domande_aperte: [],
    }, null, 2) + '\n',
  ],
  [
    path.join('06_active_context', 'working_draft.md'),
    '*[Insert the new chapter text here]*\n',
  ],
  [
    'USER_GUIDE.md',
    `# User Guide

> Run \`create-visual-schema\` to generate a visual schema of the project architecture.

`,
  ],
];

// ---------------------------------------------------------------------------
// Execution
// ---------------------------------------------------------------------------
const created   = [];
const skipped   = [];
const errors    = [];

log('Initializing project structure...');
log(`Root: ${ROOT}`);
console.log('');

log('--- Folders ---');
for (const dir of DIRS) {
  const abs = join(dir);
  try {
    if (fs.existsSync(abs)) {
      warn(`Folder already exists: ${dir}`);
      skipped.push(`📁 ${dir}/`);
    } else {
      fs.mkdirSync(abs, { recursive: true });
      ok(`Created: ${dir}/`);
      created.push(`📁 ${dir}/`);
    }
  } catch (e) {
    err(`Unable to create folder ${dir}: ${e.message}`, false);
    errors.push(`📁 ${dir}/`);
  }
}

console.log('');
log('--- File Placeholder ---');

for (const [rel, content] of PLACEHOLDERS) {
  const abs = join(rel);
  try {
    if (fs.existsSync(abs)) {
      warn(`File already exists (skipped): ${rel}`);
      skipped.push(`📄 ${rel}`);
    } else {
      const dir = path.dirname(abs);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        log(`Created parent folder: ${path.relative(ROOT, dir)}`);
      }
      fs.writeFileSync(abs, content, 'utf8');
      ok(`Created: ${rel}`);
      created.push(`📄 ${rel}`);
    }
  } catch (e) {
    if (e.code === 'EACCES' || e.code === 'EPERM') {
      err(`Permission denied on ${rel}: ${e.message}`, false);
    } else {
      err(`Error on ${rel}: ${e.message}`, false);
    }
    errors.push(`📄 ${rel}`);
  }
}

console.log('');
console.log('═══════════════════════════════════════');
console.log('  INITIALIZATION SUMMARY');
console.log('═══════════════════════════════════════');

if (created.length > 0) {
  console.log('\n✅ Created:');
  created.forEach(f => console.log(`   ${f}`));
}
if (skipped.length > 0) {
  console.log('\n⏭️  Already existing (skipped):');
  skipped.forEach(f => console.log(`   ${f}`));
}
if (errors.length > 0) {
  console.log('\n❌ Errors:');
  errors.forEach(f => console.log(`   ${f}`));
}

console.log('');
if (errors.length > 0) {
  console.error(`Completed with ${errors.length} error(s).`);
  process.exit(1);
} else {
  console.log('Structure ready. Use new-chapter to start writing.');
}
