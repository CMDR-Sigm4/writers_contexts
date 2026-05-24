'use strict';
/**
 * save-context.js
 * Copy working_draft.md and current_state.json into draft_saves/<label>_*.
 *
 * Usage: node <runtime skill script path> "<label>" [--clear]
 */

const fs   = require('fs');
const path = require('path');
const { join } = require('./_lib/paths');
const { log, ok, warn, err, checkNode } = require('./_lib/logger');
const { skillCommand, skillScriptPath } = require('./_lib/runtime');

checkNode();

const args  = process.argv.slice(2);
const label = args.find(a => !a.startsWith('--'));
const clear = args.includes('--clear');

if (!label || label.trim() === '') {
  err(
    'Missing <label> argument.\n' +
    `  Usage: node ${skillScriptPath('save-context')} "<label>" [--clear]\n` +
    `  Example: node ${skillScriptPath('save-context')} "chapter_2_pause"`
  );
}

const safeLabel = label.trim().replace(/[^\w\-\.]/g, '_');

log(`Label: "${safeLabel}"`);
if (clear) log('--clear mode active: the active context will be cleared after saving.');
console.log('');

const DRAFT_SRC  = join('06_active_context', 'working_draft.md');
const STATE_SRC  = join('06_active_context', 'current_state.json');
const SAVES_DIR  = join('06_active_context', 'draft_saves');
const DRAFT_DEST = join('06_active_context', 'draft_saves', `${safeLabel}_draft.md`);
const STATE_DEST = join('06_active_context', 'draft_saves', `${safeLabel}_state.json`);

log('--- Source file check ---');

if (!fs.existsSync(DRAFT_SRC)) err(`File not found: 06_active_context/working_draft.md\n  Run ${skillCommand('init-structure')}.`);
if (!fs.existsSync(STATE_SRC)) err(`File not found: 06_active_context/current_state.json\n  Run ${skillCommand('init-structure')}.`);

ok('Source files found.');

const draftContent = fs.readFileSync(DRAFT_SRC, 'utf8');
if (draftContent.trim() === '' || draftContent.trim() === '*[Insert the new chapter text here]*') {
  warn('working_draft.md is empty or contains only the placeholder. The save will be empty.');
}

if (!fs.existsSync(SAVES_DIR)) {
  log('Folder draft_saves/ not found, creating it...');
  try { fs.mkdirSync(SAVES_DIR, { recursive: true }); ok('draft_saves/ folder created.'); }
  catch (e) { err(`Unable to create draft_saves/: ${e.message}`); }
}

if (fs.existsSync(DRAFT_DEST) || fs.existsSync(STATE_DEST)) {
  warn(`Save "${safeLabel}" already exists — it will be overwritten.`);
}

console.log('');
log('--- Save ---');

try {
  log(`Copying working_draft.md → draft_saves/${safeLabel}_draft.md`);
  fs.copyFileSync(DRAFT_SRC, DRAFT_DEST);
  ok('Draft saved.');
} catch (e) { err(`Error copying working_draft.md: ${e.message}`); }

try {
  log(`Copying current_state.json → draft_saves/${safeLabel}_state.json`);
  fs.copyFileSync(STATE_SRC, STATE_DEST);
  ok('State saved.');
} catch (e) { err(`Error copying current_state.json: ${e.message}`); }

if (clear) {
  console.log('');
  log('--- Active context cleanup ---');
  try { fs.writeFileSync(DRAFT_SRC, '*[Insert the new chapter text here]*\n', 'utf8'); ok('working_draft.md cleared.'); }
  catch (e) { err(`Error clearing working_draft.md: ${e.message}`); }
  try {
    const emptyState = { scena_attuale: '', obiettivo_scena: '', personaggi_presenti: [], luogo: '', capitolo_corrente: 0, domande_aperte: [] };
    fs.writeFileSync(STATE_SRC, JSON.stringify(emptyState, null, 2) + '\n', 'utf8');
    ok('current_state.json reset.');
  } catch (e) { err(`Error resetting current_state.json: ${e.message}`); }
}

console.log('');
console.log('═══════════════════════════════════════');
console.log('  SAVE COMPLETE');
console.log('═══════════════════════════════════════');
console.log(`  Label  : ${safeLabel}`);
console.log(`  Draft  : 06_active_context/draft_saves/${safeLabel}_draft.md`);
console.log(`  State  : 06_active_context/draft_saves/${safeLabel}_state.json`);
if (clear) console.log('  Cleanup: active context cleared ✅');
console.log('');
console.log('Use restore-context to resume the work later.');
