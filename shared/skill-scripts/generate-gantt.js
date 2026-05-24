'use strict';
/**
 * generate-gantt.js
 * Read 04_plot/timeline.md and generate a Mermaid Gantt chart in 04_plot/timeline_gantt.md.
 *
 * Usage: node <runtime skill script path> [--force]
 */

const fs   = require('fs');
const path = require('path');
const { join } = require('./_lib/paths');
const { log, ok, warn, err, checkNode } = require('./_lib/logger');
const { skillCommand, skillScriptPath } = require('./_lib/runtime');

checkNode();

const force = process.argv.includes('--force');

const TIMELINE_PATH = join('04_plot', 'timeline.md');
const GANTT_PATH    = join('04_plot', 'timeline_gantt.md');

log('Reading 04_plot/timeline.md...');
if (!fs.existsSync(TIMELINE_PATH)) err(`File not found: 04_plot/timeline.md\n  Run ${skillCommand('init-structure')} to create it.`);

const content = fs.readFileSync(TIMELINE_PATH, 'utf8');
ok('timeline.md loaded.');

if (fs.existsSync(GANTT_PATH) && !force) {
  warn('04_plot/timeline_gantt.md already exists.\n  Use --force to overwrite it, or explicitly confirm overwrite to the AI agent.');
  process.exit(3);
}

function parseMarkdownTable(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.startsWith('|'));
  if (lines.length < 3) return { headers: [], rows: [] };
  const headers = lines[0].split('|').map(h => h.trim()).filter(Boolean);
  const rows = [];
  for (let i = 2; i < lines.length; i++) {
    const cells = lines[i].split('|').map(c => c.trim()).filter(Boolean);
    if (cells.length === 0) continue;
    const row = {};
    headers.forEach((h, idx) => { row[h] = cells[idx] !== undefined ? cells[idx] : ''; });
    rows.push(row);
  }
  return { headers, rows };
}

log('Parsing event table...');
const { rows } = parseMarkdownTable(content);

if (rows.length === 0) warn('The timeline contains no events. The Gantt chart will be empty but will still be generated.');
ok(`Found ${rows.length} events.`);

let _dayOffset = 0;
const BASE_DATE = new Date('0100-01-01T00:00:00Z');

function normalizeDate(dateStr, timeStr) {
  const d = (dateStr || '').trim();
  const t = (timeStr || '').trim();
  const isoMatch = d.match(/^(\d{4}-\d{2}-\d{2})$/);
  if (isoMatch) return t ? `${d} ${t}` : `${d} 00:00`;
  const isoFull = d.match(/^(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2})$/);
  if (isoFull) return `${isoFull[1]} ${isoFull[2]}`;
  const dayMatch = d.match(/[Gg]iorno\s*(\d+)/);
  if (dayMatch) {
    const iso = new Date(BASE_DATE.getTime() + (parseInt(dayMatch[1], 10) - 1) * 86400000).toISOString().slice(0, 10);
    return t ? `${iso} ${t.slice(0, 5)}` : `${iso} 00:00`;
  }
  _dayOffset++;
  const iso = new Date(BASE_DATE.getTime() + _dayOffset * 86400000).toISOString().slice(0, 10);
  if (d) warn(`Unrecognized date: "${d}" — using placeholder date ${iso}.`);
  return `${iso} 00:00`;
}

let _evtCounter = 0;
const evtId = (prefix) => `${prefix}_${++_evtCounter}`;
const mermaidText = (str) => (str || '').replace(/:/g, ' -').replace(/\r/g, '').trim();

log('Generating Mermaid sections...');

const TYPE_SECTIONS = { 'Flashback': 'Flashback', 'Flashforward': 'Flashforward', 'Branch': 'Branches', 'Bivio': 'Branches' };
const sections = new Map();

for (const row of rows) {
  const tipo = (row['Type'] || row['Tipo'] || row['tipo'] || '').trim();
  const cap  = (row['Chapter'] || row['Chapter'] || row['capitolo'] || '').trim();
  const sectionName = TYPE_SECTIONS[tipo] || (cap ? `Ch. ${cap}` : 'General');
  if (!sections.has(sectionName)) sections.set(sectionName, []);
  sections.get(sectionName).push({
    row,
    dateStr: normalizeDate(row['Date'] || row['Data'] || row['data'] || '', row['Time'] || row['Ora'] || row['ora'] || ''),
    isMilestone: tipo === 'Branch' || tipo === 'Bivio',
  });
}

const SPECIAL_SECTIONS = new Set(['Flashback', 'Flashforward', 'Branches']);
const chapterSections  = [...sections.keys()].filter(k => !SPECIAL_SECTIONS.has(k)).sort((a, b) => {
  const numA = parseInt((a.match(/\d+/) || ['0'])[0], 10);
  const numB = parseInt((b.match(/\d+/) || ['0'])[0], 10);
  return numA - numB;
});
const orderedSections = [...chapterSections, ...[...sections.keys()].filter(k => SPECIAL_SECTIONS.has(k))];

const lines = [
  '```mermaid', 'gantt',
  '    title Narrative Timeline',
  '    dateFormat YYYY-MM-DD HH:mm',
  '    axisFormat %d %b %Y', '',
];

for (const sectionName of orderedSections) {
  lines.push(`    section ${sectionName}`);
  for (const { row, dateStr, isMilestone } of sections.get(sectionName)) {
    const evName = mermaidText(row['Event'] || row['Evento'] || row['evento'] || 'Event');
    const id     = evtId(isMilestone ? 'biv' : 'evt');
    const ramo   = (row['Branch'] || row['Ramo'] || row['ramo'] || '').trim();
    let label    = evName;
    if (ramo && ramo !== '-') label += ` [${ramo}]`;
    if (label.length > 60) label = label.slice(0, 57) + '...';
    lines.push(isMilestone
      ? `    ${label} :milestone, ${id}, ${dateStr}, 0min`
      : `    ${label} :${id}, ${dateStr}, 1h`);
  }
  lines.push('');
}
lines.push('```', '');

const ganttOutput =
  `# Timeline Gantt\n\n` +
  `> Automatically generated by \`${skillScriptPath('generate-gantt')}\`\n` +
  `> Source: \`04_plot/timeline.md\`\n\n` +
  lines.join('\n');

log('Writing 04_plot/timeline_gantt.md...');
const plotDir = join('04_plot');
if (!fs.existsSync(plotDir)) fs.mkdirSync(plotDir, { recursive: true });

try { fs.writeFileSync(GANTT_PATH, ganttOutput, 'utf8'); }
catch (e) {
  if (e.code === 'EACCES' || e.code === 'EPERM') err(`Permission denied: ${e.message}`);
  err(`Error writing timeline_gantt.md: ${e.message}`);
}
ok('04_plot/timeline_gantt.md written.');

console.log('');
console.log('═══════════════════════════════════════');
console.log('  GANTT GENERATED');
console.log('═══════════════════════════════════════');
console.log(`  File   : 04_plot/timeline_gantt.md`);
console.log(`  Events : ${rows.length}`);
console.log(`  Sections: ${orderedSections.join(', ') || '(none)'}`);
console.log('');
console.log('View the file with a Markdown editor that supports Mermaid.');
