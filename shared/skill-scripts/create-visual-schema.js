'use strict';
/**
 * create-visual-schema.js
 * Generate a Mermaid diagram of the project architecture
 * and save it to 00_meta/architecture_schema.md.
 *
 * Usage: node <runtime skill script path> [--force]
 */

const fs   = require('fs');
const path = require('path');
const { ROOT, join } = require('./_lib/paths');
const { log, ok, warn, err, checkNode } = require('./_lib/logger');
const { runtime, toRuntimeName, skillsDir, skillScriptPath } = require('./_lib/runtime');

checkNode();

const force = process.argv.includes('--force');

const OUT_MD  = join('00_meta', 'architecture_schema.md');
const OUT_SVG = join('00_meta', 'architecture_schema.svg');

if ((fs.existsSync(OUT_MD) || fs.existsSync(OUT_SVG)) && !force) {
  warn('Architecture schema already exists in 00_meta/.\n  Use --force to overwrite it, or explicitly confirm overwrite to the AI agent.');
  process.exit(3);
}

log('Reading available skills...');

const SKILLS_DIR = skillsDir();
let skillNames = [];

if (fs.existsSync(SKILLS_DIR)) {
  try {
    skillNames = fs.readdirSync(SKILLS_DIR)
      .filter(entry => {
        if (entry === '_lib') return false; // exclude shared library folder
        const p = path.join(SKILLS_DIR, entry);
        return fs.statSync(p).isDirectory();
      })
      .sort();
    ok(`${skillNames.length} skills found.`);
  } catch (e) { warn(`Unable to read .${runtime}/skills/: ${e.message}`); }
} else {
  warn(`.${runtime}/skills/ folder not found — the diagram will not include skills.`);
}

const BASE_SKILL_GROUPS = {
  'Setup & Maintenance': ['init-structure', 'reset-project', 'create-visual-schema'],
  'Content Creation':  ['create-character', 'create-location', 'create-world'],
  'Chapter Management':    ['new-chapter', 'change-scene', 'close-chapter', 'save-context', 'restore-context'],
  'Analysis & Updates': ['analyze-chapter', 'extract-from-manuscript', 'extract-from-image', 'update-items', 'update-relations', 'update-timeline'],
  'Review & Visualization': ['review-draft', 'generate-gantt'],
};
const SKILL_GROUPS = Object.fromEntries(
  Object.entries(BASE_SKILL_GROUPS).map(([group, skills]) => [group, skills.map(toRuntimeName)])
);

const categorized = new Set(Object.values(SKILL_GROUPS).flat());
const uncategorized = skillNames.filter(s => !categorized.has(s));
if (uncategorized.length > 0) SKILL_GROUPS['Other'] = uncategorized;

log('Generating Mermaid diagram...');

const mermaidLines = [
  '```mermaid', 'flowchart TD', '',
  '    %% -- CENTRAL NODE --',
  '    INDEX["📋 00_meta/index.md\\nProject map"]',
  '    STATE["⚙️ 06_active_context/\\ncurrent_state.json\\n+ working_draft.md"]', '',
  '    %% -- REPOSITORY --',
  '    WORLD["🌍 01_world/\\nLore · Magic · Factions"]',
  '    CHARS["👤 02_characters/\\nProfiles · relations.md"]',
  '    LOCS["📍 03_locations/\\nLocations · sensory details"]',
  '    PLOT["📖 04_plot/\\nOutline · Timeline · Chapters"]',
  '    ITEMS["🗝️ 05_items/\\nkey_items.md"]',
  '    MANU["📜 07_manuscript/\\nFinal text (read-only)"]',
  '    SAVES["💾 draft_saves/\\nContext saves"]', '',
  '    %% -- MAIN DATA FLOW --',
  '    INDEX --> STATE',
  '    STATE --> MANU',
  '    STATE <--> CHARS',
  '    STATE <--> LOCS',
  '    STATE <--> PLOT',
  '    STATE --> SAVES',
  '    SAVES --> STATE',
  '    PLOT <--> ITEMS',
  '    PLOT <--> WORLD', '',
];

let groupIdx = 0;
for (const [groupName, skills] of Object.entries(SKILL_GROUPS)) {
  const presentSkills = skills.filter(s => skillNames.includes(s));
  if (presentSkills.length === 0) continue;
  const groupId = `GRP${groupIdx++}`;
  mermaidLines.push(`    %% -- ${groupName.toUpperCase()} --`);
  mermaidLines.push(`    subgraph ${groupId}["🛠 ${groupName}"]`);
  mermaidLines.push('        direction TB');
  for (const skill of presentSkills) {
    mermaidLines.push(`        SK_${skill.replace(/[^a-zA-Z0-9]/g, '_')}["/${skill}"]`);
  }
  mermaidLines.push('    end', '');
}

mermaidLines.push('    %% -- SKILL CONNECTIONS --', '    GRP0 --> INDEX');
if (SKILL_GROUPS['Content Creation']?.some(s => skillNames.includes(s))) {
  mermaidLines.push('    GRP1 --> CHARS', '    GRP1 --> LOCS', '    GRP1 --> WORLD');
}
if (SKILL_GROUPS['Chapter Management']?.some(s => skillNames.includes(s))) mermaidLines.push('    GRP2 --> STATE');
if (SKILL_GROUPS['Analysis & Updates']?.some(s => skillNames.includes(s))) {
  mermaidLines.push('    GRP3 --> PLOT', '    GRP3 --> CHARS', '    GRP3 --> ITEMS');
}
if (SKILL_GROUPS['Review & Visualization']?.some(s => skillNames.includes(s))) {
  mermaidLines.push('    GRP4 --> PLOT', '    GRP4 --> STATE');
}

mermaidLines.push('', '    %% -- STYLES --',
  '    style INDEX fill:#4A90D9,color:#fff,stroke:#2c6aa0',
  '    style STATE fill:#E8A838,color:#fff,stroke:#b07820',
  '    style MANU  fill:#5cb85c,color:#fff,stroke:#3d8b3d',
  '    style SAVES fill:#9B59B6,color:#fff,stroke:#6c3483',
  '```'
);

const now = new Date().toISOString().slice(0, 10);
const output =
  `# Project Architecture Schema\n\n` +
  `> Automatically generated by \`${skillScriptPath('create-visual-schema')}\` on ${now}\n\n` +
  `## Legend\n\n` +
  `| Node | Meaning |\n|---|---|\n` +
  `| 📋 index.md | Entry point — the AI reads it first |\n` +
  `| ⚙️ active_context | Operating core — current state and draft |\n` +
  `| 📜 manuscript | Final archive — read-only |\n` +
  `| 💾 draft_saves | Checkpoints — save/restore work |\n\n` +
  `## Diagram\n\n` +
  mermaidLines.join('\n') + '\n';

const metaDir = join('00_meta');
if (!fs.existsSync(metaDir)) fs.mkdirSync(metaDir, { recursive: true });

log('Writing 00_meta/architecture_schema.md...');
try { fs.writeFileSync(OUT_MD, output, 'utf8'); }
catch (e) {
  if (e.code === 'EACCES' || e.code === 'EPERM') err(`Permission denied: ${e.message}`);
  err(`Error writing architecture_schema.md: ${e.message}`);
}
ok('00_meta/architecture_schema.md written.');

console.log('');
console.log('═══════════════════════════════════════');
console.log('  VISUAL SCHEMA GENERATED');
console.log('═══════════════════════════════════════');
console.log('  File   : 00_meta/architecture_schema.md');
console.log(`  Skills : ${skillNames.length}`);
console.log('');
console.log('Open the file in a Markdown editor with Mermaid support to view it.');
