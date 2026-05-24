'use strict';
/**
 * reset-project.js
 * Reset the project to a clean state by deleting narrative content
 * while preserving structure and system files.
 *
 * DESTRUCTIVE OPERATION — requires Codex to obtain double confirmation
 * from the user before calling this script.
 *
 * Usage: node <runtime skill script path> --confirmed
 */

const fs   = require('fs');
const path = require('path');
const { ROOT, join } = require('./_lib/paths');
const { log, ok, warn, err, checkNode } = require('./_lib/logger');
const { skillScriptPath } = require('./_lib/runtime');

checkNode();

if (!process.argv.includes('--confirmed')) {
  err(
    'Missing --confirmed flag.\n' +
    '  This script is destructive and must be called only after\n' +
    '  double confirmation from the user through the AI agent.\n' +
    `  Usage: node ${skillScriptPath('reset-project')} --confirmed`
  );
}

log('Project reset started...');
log(`Root: ${ROOT}`);
console.log('');

const deleted   = [];
const recreated = [];
const preserved = [];
const errors    = [];

function removeFile(rel) {
  const abs = join(rel);
  try {
    if (fs.existsSync(abs)) {
      fs.rmSync(abs, { force: true });
      ok(`Deleted: ${rel}`);
      deleted.push(`🗑️  ${rel}`);
    }
  } catch (e) {
    if (e.code === 'EACCES' || e.code === 'EPERM') {
      err(`Permission denied on ${rel}: ${e.message}`, false);
    } else {
      err(`Error deleting ${rel}: ${e.message}`, false);
    }
    errors.push(`${rel}`);
  }
}

const HIDDEN_PRESERVE = new Set(['.gitkeep', '.gitignore', '.claudeignore']);

function emptyDir(rel) {
  const abs = join(rel);
  if (!fs.existsSync(abs)) {
    warn(`Folder not found, skipping: ${rel}`);
    return;
  }
  let entries;
  try {
    entries = fs.readdirSync(abs);
  } catch (e) {
    err(`Unable to read folder ${rel}: ${e.message}`, false);
    errors.push(rel);
    return;
  }
  for (const entry of entries) {
    if (HIDDEN_PRESERVE.has(entry)) continue;
    const absEntry = path.join(abs, entry);
    try {
      const stat = fs.statSync(absEntry);
      if (stat.isDirectory()) {
        fs.rmSync(absEntry, { recursive: true, force: true });
      } else {
        fs.rmSync(absEntry, { force: true });
      }
      ok(`Deleted: ${path.join(rel, entry)}`);
      deleted.push(`🗑️  ${path.join(rel, entry)}`);
    } catch (e) {
      err(`Error deleting ${path.join(rel, entry)}: ${e.message}`, false);
      errors.push(path.join(rel, entry));
    }
  }
}

function writePlaceholder(rel, content) {
  const abs = join(rel);
  try {
    const dir = path.dirname(abs);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(abs, content, 'utf8');
    ok(`Recreated: ${rel}`);
    recreated.push(`📄 ${rel}`);
  } catch (e) {
    if (e.code === 'EACCES' || e.code === 'EPERM') {
      err(`Permission denied on ${rel}: ${e.message}`, false);
    } else {
      err(`Error recreating ${rel}: ${e.message}`, false);
    }
    errors.push(rel);
  }
}

log('--- Emptying narrative folders ---');
const DIRS_TO_EMPTY = [
  '01_world', '02_characters', '03_locations',
  path.join('04_plot', 'chapters'), '05_items',
  path.join('06_active_context', 'draft_saves'), '07_manuscript',
];
for (const dir of DIRS_TO_EMPTY) emptyDir(dir);

console.log('');
log('--- Deleting individual files ---');
const FILES_TO_DELETE = [
  path.join('04_plot', 'timeline.md'),
  path.join('04_plot', 'master_outline.md'),
  path.join('04_plot', 'timeline_gantt.md'),
  path.join('06_active_context', 'working_draft.md'),
  path.join('06_active_context', 'current_state.json'),
  path.join('02_characters', 'relations.md'),
  path.join('05_items', 'key_items.md'),
];
for (const f of FILES_TO_DELETE) removeFile(f);

console.log('');
log('--- Recreating placeholder files ---');

writePlaceholder(path.join('04_plot', 'master_outline.md'),
`# Master Outline

## Logline

<!-- One sentence summarizing the whole story -->

## Overall Structure

<!-- Macro-arcs, acts, major turning points -->

## Current State (AI Reminder)

<!-- Updated by new-chapter: current chapter and opening premise of the scene -->
`);

writePlaceholder(path.join('04_plot', 'timeline.md'),
`# Timeline

| Date | Time | Event | Chapter | First Reveal | Type | Branch | Condition | Notes |
|---|---|---|---|---|---|---|---|---|
`);

writePlaceholder(path.join('02_characters', 'relations.md'),
`# Relationship Dynamics Map

> **AI instruction:** Read only entries \`[Cap. N]\` where N <= \`capitolo_corrente\`.
> Entries from future chapters have not happened yet in the active timeline.

> **Section format:** \`## CharacterA <-> CharacterB\`
> Every update is annotated with \`**[Cap. X]**\` for traceability.

`);

writePlaceholder(path.join('05_items', 'key_items.md'),
`## ACTIVE ITEMS

## RETIRED / DESTROYED ITEMS
`);

writePlaceholder(path.join('06_active_context', 'current_state.json'),
  JSON.stringify({ scena_attuale: '', obiettivo_scena: '', personaggi_presenti: [], luogo: '', capitolo_corrente: 0, domande_aperte: [] }, null, 2) + '\n'
);

writePlaceholder(path.join('06_active_context', 'working_draft.md'),
  '*[Insert the new chapter text here]*\n'
);

const PRESERVED_LIST = [
  path.join('00_meta', 'index.md'), path.join('00_meta', 'project_rules.md'),
  path.join('00_meta', 'style_reference.md'),
  path.join('00_meta', 'architecture_schema.md'), path.join('00_meta', 'architecture_schema.svg'),
  'USER_GUIDE.md',
  'VISUAL_USER_GUIDE.svg', 'CLAUDE.md',
  '.codex/ (Codex skills)',
  '.claude/ (skills, settings, keybindings legacy)',
  'shared/skill-scripts/ (shared JavaScript runtime for Codex and Claude skills)',
  'Hidden files (.gitkeep, .gitignore, .claudeignore)',
];
for (const f of PRESERVED_LIST) preserved.push(`🛡️  ${f}`);

console.log('');
console.log('═══════════════════════════════════════');
console.log('  PROJECT RESET SUMMARY');
console.log('═══════════════════════════════════════');

if (deleted.length > 0)   { console.log('\n🗑️  Deleted:');              deleted.forEach(f => console.log(`   ${f}`)); }
if (recreated.length > 0) { console.log('\n📄 Placeholders recreated:'); recreated.forEach(f => console.log(`   ${f}`)); }
if (preserved.length > 0) { console.log('\n🛡️  Preserved:');            preserved.forEach(f => console.log(`   ${f}`)); }
if (errors.length > 0)    { console.log('\n❌ Errors:');                errors.forEach(f => console.log(`   ${f}`)); }

console.log('');
if (errors.length > 0) {
  console.error(`Reset completed with ${errors.length} error(s).`);
  process.exit(1);
} else {
  console.log('The project is ready for a new story.');
}
