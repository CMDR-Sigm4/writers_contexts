'use strict';

const path = require('path');
const { join } = require('./paths');

const runtime = process.env.SKILL_RUNTIME === 'claude' ? 'claude' : 'codex';
const isClaude = runtime === 'claude';

function toRuntimeName(codexName) {
  return isClaude ? codexName.replace(/-/g, '_') : codexName;
}

function skillCommand(codexName) {
  return `/${toRuntimeName(codexName)}`;
}

function skillScriptPath(codexSkillName, codexScriptName = `${codexSkillName}.js`) {
  const skillName = toRuntimeName(codexSkillName);
  const scriptName = isClaude ? codexScriptName.replace(/-/g, '_') : codexScriptName;
  return path.join(`.${runtime}`, 'skills', skillName, 'scripts', scriptName);
}

function skillsDir() {
  return join(`.${runtime}`, 'skills');
}

module.exports = {
  runtime,
  isClaude,
  toRuntimeName,
  skillCommand,
  skillScriptPath,
  skillsDir,
};
