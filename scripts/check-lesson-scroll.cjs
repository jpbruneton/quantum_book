const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const frames = new Map();
const listeners = new Map();
const positions = new Map([['first', 200], ['second', 600], ['third', 1200]]);
let measurements = 0;
let frameId = 0;
let resize;
let fontsReady;
let disconnected = false;
const windowMock = {
  scrollY: 0,
  requestAnimationFrame(fn) { frames.set(++frameId, fn); return frameId; },
  cancelAnimationFrame(id) { frames.delete(id); },
  addEventListener(name, fn) { listeners.set(name, fn); },
  removeEventListener(name) { listeners.delete(name); },
};
const documentMock = {
  getElementById(id) {
    return positions.has(id) ? { getBoundingClientRect() {
      measurements++;
      return { top: positions.get(id) - windowMock.scrollY };
    }} : null;
  },
  querySelector() { return {}; },
  addEventListener(name, fn) { listeners.set(name, fn); },
  removeEventListener(name) { listeners.delete(name); },
  fonts: { ready: { then(fn) { fontsReady = fn; } } },
};
const moduleMock = { exports: {} };
const js = ts.transpileModule(fs.readFileSync('lib/lessonScroll.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
vm.runInNewContext(js, {
  exports: moduleMock.exports,
  window: windowMock,
  document: documentMock,
  ResizeObserver: class {
    constructor(fn) { resize = fn; }
    observe() {}
    disconnect() { disconnected = true; }
  },
});
const changes = [];
const stop = moduleMock.exports.observeLessonScroll(
  ['first', 'missing', 'second', 'third'], (...change) => changes.push(change),
);
function flush() {
  const queued = [...frames.values()];
  frames.clear();
  queued.forEach(fn => fn());
}
function scroll(y) {
  windowMock.scrollY = y;
  listeners.get('scroll')();
}
assert.deepEqual(changes.at(-1), ['first', false]);
assert.equal(measurements, 3);
for (let y = 1; y <= 500; y++) scroll(y);
assert.equal(frames.size, 1, 'Scroll bursts schedule only one update per frame');
flush();
assert.deepEqual(changes.at(-1), ['second', true]);
assert.equal(measurements, 3, 'Scrolling does not remeasure the document');
const previousChanges = changes.length;
scroll(550); flush();
assert.equal(changes.length, previousChanges, 'No React update inside the same section');
scroll(1100); flush();
assert.deepEqual(changes.at(-1), ['third', true]);
scroll(0); flush();
assert.deepEqual(changes.at(-1), ['first', false], 'Upward scrolling restores the first section');
positions.set('second', 900);
scroll(700); resize(); flush();
assert.deepEqual(changes.at(-1), ['first', true], 'Image or content resizing refreshes positions');
positions.set('second', 750);
fontsReady(); flush();
assert.deepEqual(changes.at(-1), ['second', true], 'Font loading refreshes positions');
positions.set('second', 950);
listeners.get('toggle')(); flush();
assert.deepEqual(changes.at(-1), ['first', true], 'Expanding details refreshes positions');
positions.set('second', 700);
listeners.get('resize')(); flush();
assert.deepEqual(changes.at(-1), ['second', true], 'Viewport resizing refreshes positions');
scroll(1200);
stop();
assert.equal(frames.size, 0);
assert.equal(listeners.size, 0);
assert.ok(disconnected);
fontsReady();
assert.equal(frames.size, 0, 'Late font callbacks do not revive an unmounted lesson');
const stopEmpty = moduleMock.exports.observeLessonScroll([], (...change) => changes.push(change));
assert.deepEqual(changes.at(-1), ['', true], 'Lessons without a TOC keep the back-to-top control');
stopEmpty();
console.log('Scroll tracking: cached positions, frame batching, layout changes and cleanup checked.');
