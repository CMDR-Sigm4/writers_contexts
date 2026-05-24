'use strict';
/**
 * restore-context.js
 * Copy draft_saves/<label>_* → active context.
 *
 * Usage: node <runtime skill script path> "<label>"
 */

const fs   = require('fs');
const path = require('path');
const { join } = require('./_lib/paths');
const { log, ok, warn, err, checkNode } = require('./_lib/logger');
const { skillCommand, skillScriptPath } = require('./_lib/runtime');

checkNode();

const args  = process.argv.slice(2);
const label = args.find(a => !a.startsWith('--'));

if (!label || label.trim() === '') {
  err(
    'Missing <label> argument.\n' +
    `  Usage: node ${skillScriptPath('restore-context')} "<label>"\n` +
    `  To list saves: node ${skillScriptPath('restore-context', 'list-saves.js')}`
  );
}

const safeLabel = label.trim();
log(`Restoring save: "${safeLabel}"`);
console.log('');

const SAVES_DIR  = join('06_active_context', 'draft_saves');
const DRAFT_SRC  = join('06_active_context', 'draft_saves', `${safeLabel}_draft.md`);
const STATE_SRC  = join('06_active_context', 'draft_saves', `${safeLabel}_state.json`);
const DRAFT_DEST = join('06_active_context', 'working_draft.md');
const STATE_DEST = join('06_active_context', 'current_state.json');

if (!fs.existsSync(SAVES_DIR)) {
  err(`Folder draft_saves/ not found.\n  No saves available. Run ${skillCommand('save-context')}.`);
}

log('--- Save file check ---');

const hasDraft = fs.existsSync(DRAFT_SRC);
const hasState = fs.existsSync(STATE_SRC);

if (!hasDraft && !hasState) {
  err(`Save "${safeLabel}" not found in draft_saves/.\n  Use list-saves.js to see available saves.`);
}
if (!hasDraft) warn(`Missing draft for "${safeLabel}". working_draft.md will not be restored.`);
if (!hasState) warn(`Missing state for "${safeLabel}". current_state.json will not be restored.`);

if (fs.existsSync(DRAFT_DEST)) {
  const existing = fs.readFileSync(DRAFT_DEST, 'utf8').trim();
  if (existing && existing !== '*[Insert the new chapter text here]*') {
    warn('current working_draft.md is not empty — it will be overwritten.');
  }
}

const activeContextDir = join('06_active_context');
if (!fs.existsSync(activeContextDir)) {
  log('06_active_context/ folder not found, creating it...');
  try { fs.mkdirSync(activeContextDir, { recursive: true }); ok('Created.'); }
  catch (e) { err(`Unable to create 06_active_context/: ${e.message}`); }
}

console.log('');
log('--- Restore ---');

if (hasDraft) {
  try {
    log(`Restoring ${safeLabel}_draft.md → working_draft.md`);
    fs.copyFileSync(DRAFT_SRC, DRAFT_DEST);
    ok('working_draft.md restored.');
  } catch (e) { err(`Error restoring working_draft.md: ${e.message}`); }
}

if (hasState) {
  try {
    log(`Restoring ${safeLabel}_state.json → current_state.json`);
    fs.copyFileSync(STATE_SRC, STATE_DEST);
    ok('current_state.json restored.');
  } catch (e) { err(`Error restoring current_state.json: ${e.message}`); }
}

if (hasState) {
  console.log('');
  log('--- Restored state ---');
  try {
    const state = JSON.parse(fs.readFileSync(STATE_DEST, 'utf8'));
    console.log(`  Current chapter : ${state.capitolo_corrente}`);
    console.log(`  Location             : ${state.luogo || '(not specified)'}`);
    console.log(`  Characters        : ${(state.personaggi_presenti || []).join(', ') || '(none)'}`);
    console.log(`  Current scene     : ${state.scena_attuale || '(empty)'}`);
    console.log('');
    console.log('  -> The agent must now load the listed character and location profiles.');
  } catch (_) { warn('current_state.json is not valid JSON — check it manually.'); }
}

console.log('');
console.log('═══════════════════════════════════════');
console.log('  RESTORE COMPLETE');
console.log('═══════════════════════════════════════');
console.log(`  Save: ${safeLabel}`);
if (hasDraft) console.log('  ✅ working_draft.md restored');
if (hasState) console.log('  ✅ current_state.json restored');
console.log('');
console.log('The previous set has been restored. You can continue writing.');
