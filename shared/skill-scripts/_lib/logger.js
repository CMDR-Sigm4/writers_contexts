'use strict';

const fs   = require('fs');
const path = require('path');

// Project root: 3 levels above _lib (shared/skill-scripts/_lib)
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');
const LOG_FILE     = path.join(PROJECT_ROOT, 'skill.log');

// Skill name derived from the wrapper script path when possible.
const callerScript = process.argv[1] || 'unknown';
const callerDir = path.basename(path.dirname(callerScript));
const skillName = callerDir === 'scripts'
  ? path.basename(path.dirname(path.dirname(callerScript)))
  : path.basename(path.dirname(callerScript));

function _timestamp() {
  return new Date().toISOString().replace('T', ' ').slice(0, 19);
}

function _appendLog(level, msg) {
  const line = `[${_timestamp()}] [${skillName}] [${level}] ${msg}\n`;
  try {
    fs.appendFileSync(LOG_FILE, line, 'utf8');
  } catch (_) {
    // Silent: file logging is best-effort.
  }
}

const log  = (msg) => { console.log(`[INFO]  ${msg}`);  _appendLog('INFO',  msg); };
const ok   = (msg) => { console.log(`[OK]    ${msg}`);  _appendLog('OK',    msg); };
const warn = (msg) => { console.warn(`[WARN]  ${msg}`); _appendLog('WARN',  msg); };

/**
 * Print an error and exit with code 1 by default.
 * Pass exit=false to print without exiting.
 */
const err = (msg, exit = true) => {
  console.error(`[ERROR] ${msg}`);
  _appendLog('ERROR', msg);
  if (exit) process.exit(1);
};

/**
 * Verify that Node.js is >= 14. We are already inside Node, so only check the version.
 */
const checkNode = () => {
  const [major] = process.versions.node.split('.').map(Number);
  if (major < 14) {
    err(
      `Node.js 14+ required. Current version: ${process.versions.node}.\n` +
      '  Windows : winget install OpenJS.NodeJS   or https://nodejs.org\n' +
      '  macOS   : brew install node              or https://nodejs.org\n' +
      '  Linux   : sudo apt install nodejs  (Debian/Ubuntu)\n' +
      '            sudo dnf install nodejs  (Fedora/RHEL)'
    );
  }
};

module.exports = { log, ok, warn, err, checkNode };
