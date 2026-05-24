'use strict';
/**
 * new-chapter.js
 * Safety check on working_draft.md + writing current_state.json.
 *
 * Usage: node <runtime skill script path> '<json>' [--force]
 *
 * Exit codes:
 *   0  Success
 *   2  working_draft.md is not empty (without --force) — the agent must ask for confirmation
 *   1  Generic error
 */

const fs   = require('fs');
const { join } = require('./_lib/paths');
const { log, ok, warn, err, checkNode } = require('./_lib/logger');
const { skillCommand, skillScriptPath } = require('./_lib/runtime');

checkNode();

const args   = process.argv.slice(2);
const rawArg = args.find(a => !a.startsWith('--'));
const force  = args.includes('--force');

if (!rawArg || rawArg.trim() === '') {
  err(
    'Missing JSON argument.\n' +
    `  Usage: node ${skillScriptPath('new-chapter')} '{"scena_attuale":"...","obiettivo_scena":"...","personaggi_presenti":[...],"luogo":"...","capitolo_corrente":N}'\n` +
    '  Options: --force  (skips the working_draft.md check)'
  );
}

let data;
try { data = JSON.parse(rawArg); }
catch (e) { err(`Invalid JSON: ${e.message}\n  Received value: ${rawArg}`); }

const REQUIRED = ['scena_attuale', 'obiettivo_scena', 'personaggi_presenti', 'luogo', 'capitolo_corrente'];
const missing  = REQUIRED.filter(f => data[f] === undefined || data[f] === null || data[f] === '');
if (missing.length > 0) err(`Missing required fields: ${missing.join(', ')}`);
if (!Array.isArray(data.personaggi_presenti)) err('personaggi_presenti must be an array.');
if (typeof data.capitolo_corrente !== 'number' || !Number.isInteger(data.capitolo_corrente) || data.capitolo_corrente < 1) {
  err('capitolo_corrente must be a positive integer.');
}

const DRAFT_PATH = join('06_active_context', 'working_draft.md');
const STATE_PATH = join('06_active_context', 'current_state.json');

log('Safety check: working_draft.md...');

if (!fs.existsSync(DRAFT_PATH)) {
  warn('working_draft.md not found — it will be created.');
} else {
  const content = fs.readFileSync(DRAFT_PATH, 'utf8').trim();
  const isEmpty = content === '' || content === '*[Insert the new chapter text here]*';
  if (!isEmpty && !force) {
    console.error(
      '[WARNING] working_draft.md is NOT empty. It contains unsaved text.\n' +
      '  Options:\n' +
      `  1. Run ${skillCommand('save-context')} to set the work aside.\n` +
      '  2. Call with --force to overwrite (you WILL LOSE the current content).\n' +
      '\n' +
      '  Process stopped. No changes made.'
    );
    process.exit(2);
  }
  if (!isEmpty && force) warn('--force active: non-empty working_draft.md will be overwritten.');
}

ok('Safety check passed.');

const activeContextDir = join('06_active_context');
if (!fs.existsSync(activeContextDir)) {
  log('06_active_context/ folder not found, creating it...');
  try { fs.mkdirSync(activeContextDir, { recursive: true }); ok('Created.'); }
  catch (e) { err(`Unable to create 06_active_context/: ${e.message}`); }
}

const newState = {
  scena_attuale:       String(data.scena_attuale),
  obiettivo_scena:     String(data.obiettivo_scena),
  personaggi_presenti: data.personaggi_presenti,
  luogo:               String(data.luogo),
  capitolo_corrente:   data.capitolo_corrente,
  domande_aperte:      [],
};

log('Writing current_state.json...');
try { fs.writeFileSync(STATE_PATH, JSON.stringify(newState, null, 2) + '\n', 'utf8'); }
catch (e) {
  if (e.code === 'EACCES' || e.code === 'EPERM') err(`Permission denied: ${e.message}`);
  err(`Error writing current_state.json: ${e.message}`);
}
ok('current_state.json written.');

log('Clearing working_draft.md...');
try { fs.writeFileSync(DRAFT_PATH, '*[Insert the new chapter text here]*\n', 'utf8'); }
catch (e) {
  if (e.code === 'EACCES' || e.code === 'EPERM') err(`Permission denied: ${e.message}`);
  err(`Error clearing working_draft.md: ${e.message}`);
}
ok('working_draft.md cleared.');

console.log('');
console.log('═══════════════════════════════════════');
console.log(`  CHAPTER ${newState.capitolo_corrente} — ENVIRONMENT READY`);
console.log('═══════════════════════════════════════');
console.log(`  Current chapter  : ${newState.capitolo_corrente}`);
console.log(`  Location              : ${newState.luogo}`);
console.log(`  Characters         : ${newState.personaggi_presenti.join(', ') || '(none)'}`);
console.log(`  Current scene      : ${newState.scena_attuale}`);
console.log(`  Scene goal    : ${newState.obiettivo_scena}`);
console.log('');
console.log('  -> The agent must now:');
console.log('     1. Load character profiles from 02_characters/');
console.log('     2. Load the location from 03_locations/');
console.log('     3. Read relations.md (entries <= capitolo_corrente - 1)');
console.log('     4. Read the previous chapter summary from 04_plot/chapters/ (if present)');
console.log('     5. Update master_outline.md — Current State section');
