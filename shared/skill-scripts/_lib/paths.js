'use strict';
const path = require('path');

// ROOT = project root (three levels up from shared/skill-scripts/_lib/)
const ROOT = path.resolve(__dirname, '..', '..', '..');

/**
 * Resolve a path relative to the project root.
 * Use path.join for cross-platform compatibility (Windows/macOS/Linux).
 */
const join = (...args) => path.join(ROOT, ...args);

module.exports = { ROOT, join };
