'use strict';
require('../common');

// Harden the thread interactions on the exit path.
// Ensure workers are able to bail out safe at
// arbitrary execution points. By using a number of
// internal modules as load candidates, the expectation
// is that those will be at various control flow points
// preferrably in the C++ land.

const { Worker } = require('worker_threads');
for (let i = 0; i < 10; i++) {
  new Worker("const modules = ['fs', 'assert', 'async_hooks'," +
    "'buffer', 'child_process', 'net', 'http', 'https', 'os'," +
    "'path', 'v8', 'vm'];" +
    'modules.forEach((module) => {' +
    'const m = require(module);' +
    '});', { eval: true });
}

// Allow workers to go live.
setTimeout(() => {
  process.exit(0);
}, 200);
