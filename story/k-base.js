/* story kit: beats + captions (needs EP, BEATS, CAP from the episode file) */
const B = FK.beats(BEATS, window.DATA && DATA.vo), at = B.at, end = B.end, DUR = B.DUR, dur = B.dur;
const inB = (t, id) => t >= at(id) && t < end(id);
const rel = (t, id) => t - at(id);
const between = (t, a, b) => t >= at(a) && t < end(b);
const ORDER = BEATS.map((b) => b[0]);
const beatAt = (t) => { for (let i = ORDER.length - 1; i >= 0; i--) if (t >= at(ORDER[i])) return ORDER[i]; return 'cover'; };
function segs(str, base) {
  const out = []; const re = /\{([^}]*)\}|\[([^\]]*)\]|<([^>]*)>/g; let i = 0, m;
  while ((m = re.exec(str))) { if (m.index > i) out.push([str.slice(i, m.index), base || '#fff']); out.push([m[1] || m[2] || m[3], m[1] ? P.gold : m[2] ? P.teal : P.coral]); i = re.lastIndex; }
  if (i < str.length) out.push([str.slice(i), base || '#fff']); return out;
}
const CAPY = 600;
const caps = [{ t0: 0, t1: end('cover'), y: 340, instant: true, lines: EP.cover.map((r) => [r[0], [r[1], COL[r[2]] || r[2]]]) }];
for (const id in CAP) {
  const c = CAP[id], long1 = c[0].length > 26, long2 = c[1].length > 30;
  const lines = [[long1 ? 60 : 74].concat(segs(c[0])), [c[1].length < 14 ? 96 : long2 ? 56 : 66].concat(segs(c[1]))];
  caps.push({ t0: at(id) + 0.15, t1: end(id) - 0.05, y: CAPY, lines });
}
const CHAP = EP.chap;
