/* figure lineup test (not a clip): LOOKS + minor roles + poses */
const EP = { no: 0, file: 'figtest', title: 'figtest', series: 'test', cover: [], chap: [['a', 'b1', 'b4']], factHead: ['', ''], facts: [['a', 'b']], src: '', factFoot: '', slim: true, badges: false };
const BEATS = [['cover', 1], ['b1', 3], ['b2', 3], ['b3', 3], ['b4', 3], ['facts', 1], ['next', 1], ['ask', 1], ['end', 1]];
const CAP = { next: ['a', 'b'], ask: ['a', 'b'], b1: ['a', 'b'], b2: ['a', 'b'], b3: ['a', 'b'], b4: ['a', 'b'] };
const ST = { A: [0, 0, 0], B: [200, 0, 0], C: [400, 0, 0], D: [600, 0, 0] };
const ENV = { A: [['gstudio', {}]], B: [['gstudio', {}]], C: [['gstudio', {}]], D: [['gstudio', {}]] };
const CAST = {};
for (let i = 0; i < 12; i++) CAST['p' + i] = ['person', 1, i];
['gambitKid', 'henri', 'antiquary', 'bellaKid', 'marauder', 'sarah', 'stormKid', 'hunter', 'horseman'].forEach((k, i) => (CAST['m' + i] = [k, 1]));
['gambit', 'rogue', 'storm', 'sinister'].forEach((k, i) => (CAST['n' + i] = [k, 1]));
const row = (pre, a, b, y, sp, ex) => { const o = {}; for (let i = a; i < b; i++) o[pre + i] = Object.assign({ p: [(i - (a + b - 1) / 2) * sp, y || 0], f: 0 }, ex ? ex(i) : {}); return o; };
const PZ = ['wave', 'give', 'reach', 'think', 'shrug', 'hold', 'down', 'cheer'];
const SC = {
  cover: { st: 'A', bg: 'palace', cam: [0, 0, 1.3, 0, 6.4, 0.5, 0], A: row('p', 0, 6, 0, 1.25) },
  b1: { cam: [0, 0, 1.3, 0, 6.4, 0.5, 0], A: row('p', 0, 6, 0, 1.25) },
  b2: { st: 'B', bg: 'palace', cam: [[0, 0, 1.3, 0, 6.4, 0.5, 0], [1.5, 0, 1.3, 0, 6.4, 0.5, 0.9]], A: row('p', 6, 12, 0, 1.25, (i) => ({ pose: PZ[i - 6], ex: ['happy', 'giggle', 'worried', 'angry', 'cry', 'sleepy'][i - 6] })) },
  b3: { st: 'C', bg: 'palace', cam: [0, 0, 1.2, 0, 7.6, 0.5, 0], A: row('m', 0, 9, 0, 1.1) },
  b4: { st: 'D', bg: 'palace', cam: [0, 0, 1.3, 0, 5.4, 0.5, 0.5], A: row('n', 0, 4, 0, 1.3, (i) => ({ pose: PZ[i] })) },
  facts: { cam: [0, 0, 1.3, 0, 5.4, 0.5, 0.5], A: {} }, next: { cam: [0, 0, 1.3, 0, 5.4, 0.5, 0.5], A: {} }, ask: { cam: [0, 0, 1.3, 0, 5.4, 0.5, 0.5], A: {} },
};
EP.light = 1.0; EP.toon = { w: 0.024 }; EP.bed = 'lively';
