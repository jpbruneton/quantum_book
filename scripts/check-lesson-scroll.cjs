const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const frames = new Map();
const listeners = new Map();
let frameId = 0;
const windowMock = {
  scrollY: 0,
  requestAnimationFrame(fn) { frames.set(++frameId, fn); return frameId; },
  cancelAnimationFrame(id) { frames.delete(id); },
  addEventListener(name, fn, options) {
    assert.equal(options.passive, true);
    listeners.set(name, fn);
  },
  removeEventListener(name) { listeners.delete(name); },
};
const exportsMock = {};
const js = ts.transpileModule(fs.readFileSync('lib/lessonScroll.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
// No document mock: threshold tracking must not inspect or measure lesson DOM.
vm.runInNewContext(js, { exports: exportsMock, window: windowMock });
function flush() {
  const queued = [...frames.values()];
  frames.clear();
  queued.forEach(fn => fn());
}
function scroll(y) {
  windowMock.scrollY = y;
  listeners.get('scroll')();
}
const changes = [];
const stop = exportsMock.observeScrollThreshold(280, visible => changes.push(visible));
assert.deepEqual(changes, [false]);
for (let y = 1; y <= 500; y++) scroll(y);
assert.equal(frames.size, 1, 'Scroll bursts schedule only one frame');
flush();
assert.deepEqual(changes, [false, true]);
for (let y = 500; y <= 1000; y++) { scroll(y); flush(); }
assert.deepEqual(changes, [false, true], 'No state updates while remaining above the threshold');
scroll(280); flush();
assert.deepEqual(changes, [false, true, false], 'Returning across the threshold hides the control');
scroll(800);
stop();
assert.equal(frames.size, 0, 'Unmount cancels pending work');
assert.equal(listeners.size, 0, 'Unmount removes the listener');
const stopRestored = exportsMock.observeScrollThreshold(400, visible => changes.push(visible));
assert.equal(changes.at(-1), true, 'Restored scroll positions are handled on mount');
stopRestored();
console.log('Isolated scroll controls: frame batching, thresholds, restored position and cleanup checked.');
