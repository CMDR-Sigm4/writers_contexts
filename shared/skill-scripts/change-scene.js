'use strict';
/**
 * change-scene.js
 * Update current_state.json with the new scene values.
 * Always preserve capitolo_corrente and domande_aperte.
 *
 * Usage: node <runtime skill script path> '<json>'
 *
 * Updatable fields: scena_attuale, obiettivo_scena, personaggi_presenti, luogo
 */

const fs   = require('fs');
const { join } = require('./_lib/paths');
const { log, ok, warn, err, checkNode } = require('./_lib/logger');
const { skillCommand, skillScriptPath } = require('./_lib/runtime');

checkNode();

const rawArg = process.argv[2];

if (!rawArg || rawArg.trim() === '') {
  err(
    'Missing JSON argument.\n' +
    `  Usage: node ${skillScriptPath('change-scene')} '{"luogo":"...","personaggi_presenti":[...],"obiettivo_scena":"...","scena_attuale":"..."}'\n` +
    '  At least one field must be supplied. capitolo_corrente and domande_aperte are always preserved.'
  );
}

let updates;
try { updates = JSON.parse(rawArg); }
catch (e) { err(`Invalid JSON: ${e.message}\n  Received value: ${rawArg}`); }

if (typeof updates !== 'object' || Array.isArray(updates)) err('The JSON must be an object.');

const ALLOWED_FIELDS = new Set(['scena_attuale', 'obiettivo_scena', 'personaggi_presenti', 'luogo']);
const LOCKED_FIELDS  = new Set(['capitolo_corrente', 'domande_aperte']);

for (const key of Object.keys(updates)) {
  if (LOCKED_FIELDS.has(key)) {
    warn(`Field "${key}" cannot be changed by change-scene — ignored.`);
    delete updates[key];
  } else if (!ALLOWED_FIELDS.has(key)) {
    warn(`Field unknown "${key}" — ignored.`);
    delete updates[key];
  }
}

if (Object.keys(updates).length === 0) {
  err('No valid fields to update. Allowed fields: scena_attuale, obiettivo_scena, personaggi_presenti, luogo.');
}

const STATE_PATH = join('06_active_context', 'current_state.json');

log('Reading current_state.json...');
if (!fs.existsSync(STATE_PATH)) err(`File not found: 06_active_context/current_state.json\n  Run ${skillCommand('init-structure')}.`);

let state;
try { state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8')); }
catch (e) { err(`Unable to read/parse current_state.json: ${e.message}`); }

ok('current_state.json loaded.');
log('Applying updates...');

for (const [key, value] of Object.entries(updates)) {
  log(`  ${key}: "${JSON.stringify(state[key])}" → "${JSON.stringify(value)}"`);
  state[key] = value;
}

const REQUIRED_FIELDS = { scena_attuale: '', obiettivo_scena: '', personaggi_presenti: [], luogo: '', capitolo_corrente: 0, domande_aperte: [] };
for (const [field, defaultVal] of Object.entries(REQUIRED_FIELDS)) {
  if (state[field] === undefined) {
    state[field] = defaultVal;
    warn(`Field "${field}" missing — added with default value.`);
  }
}

log('Writing current_state.json...');
try { fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n', 'utf8'); }
catch (e) {
  if (e.code === 'EACCES' || e.code === 'EPERM') err(`Permission denied: ${e.message}`);
  err(`Error writing current_state.json: ${e.message}`);
}

ok('current_state.json updated.');

console.log('');
console.log('═══════════════════════════════════════');
console.log('  SCENE CHANGE — STATE UPDATED');
console.log('═══════════════════════════════════════');
console.log(`  Current chapter  : ${state.capitolo_corrente}`);
console.log(`  Location              : ${state.luogo || '(not specified)'}`);
console.log(`  Active characters: ${(state.personaggi_presenti || []).join(', ') || '(none)'}`);
console.log(`  Current scene      : ${state.scena_attuale || '(empty)'}`);
console.log(`  Scene goal    : ${state.obiettivo_scena || '(not specified)'}`);
console.log('');
console.log('  -> The agent must now load any new character and location profiles.');
