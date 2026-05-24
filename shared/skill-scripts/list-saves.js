'use strict';
/**
 * list-saves.js
 * List available saves in 06_active_context/draft_saves/.
 *
 * Usage: node <runtime restore-context list-saves script path>
 */

const fs   = require('fs');
const path = require('path');
const { join } = require('./_lib/paths');
const { ok, warn, err, checkNode } = require('./_lib/logger');

checkNode();

const SAVES_DIR = join('06_active_context', 'draft_saves');

if (!fs.existsSync(SAVES_DIR)) {
  warn('Folder draft_saves/ not found. No saves available.');
  process.exit(0);
}

let entries;
try { entries = fs.readdirSync(SAVES_DIR); }
catch (e) { err(`Unable to read draft_saves/: ${e.message}`); }

const labels = new Set();
const orphans = [];

for (const entry of entries) {
  if (entry.endsWith('_draft.md')) {
    labels.add(entry.slice(0, -'_draft.md'.length));
  } else if (!entry.endsWith('_state.json') && entry !== '.gitkeep') {
    orphans.push(entry);
  }
}

if (labels.size === 0) {
  warn('No saves found in draft_saves/.');
  process.exit(0);
}

console.log('');
console.log('Available saves in draft_saves/:');
console.log('');

const sorted = [...labels].sort();
sorted.forEach((label, i) => {
  const hasDraft = fs.existsSync(join('06_active_context', 'draft_saves', `${label}_draft.md`));
  const hasState = fs.existsSync(join('06_active_context', 'draft_saves', `${label}_state.json`));

  let chapterInfo = '';
  if (hasState) {
    try {
      const state = JSON.parse(fs.readFileSync(join('06_active_context', 'draft_saves', `${label}_state.json`), 'utf8'));
      if (state.capitolo_corrente !== undefined) chapterInfo = `  [Cap. ${state.capitolo_corrente}]`;
      if (state.luogo) chapterInfo += `  location: ${state.luogo}`;
    } catch (_) {}
  }

  const flags = [];
  if (!hasDraft) flags.push('missing draft');
  if (!hasState) flags.push('missing state');
  const flagStr = flags.length > 0 ? `  ⚠️ (${flags.join(', ')})` : '';

  console.log(`  ${i + 1}. ${label}${chapterInfo}${flagStr}`);
});

if (orphans.length > 0) {
  console.log('');
  warn(`Orphan files in draft_saves/ (unpaired): ${orphans.join(', ')}`);
}

console.log('');
ok(`${labels.size} save(s) found.`);
