/* story kit: globals needed by episode data */
const T = THREE, P = FK.pal, U = VE.u, L = FK.land();
const COL = { gold: P.gold, teal: P.teal, coral: P.coral, w: '#fff' };
/* recap phrase timing (k-recap.js): RT = recapTiming(BEATS, SUB). RT.p(id, i, off) = seconds into beat `id` when subtitle phrase i starts (+off), RT.e(id, i) = when it ends, RT.n(id) = count.
   Phrases share the beat's voice clip by length; DATA.vo.marks[id] (spoken onsets, seconds into the clip) pins them exactly. Stretches BEATS like VE.beats does, so times hold once a voice-over is attached. */
function recapTiming(BEATS, SUB, lead) {
  lead = lead == null ? 0.3 : lead; const vo = window.DATA && DATA.vo, segs = (vo && vo.segs) || [], marks = (vo && vo.marks) || {}, TM = {};
  BEATS.filter((b) => b[0] !== 'cover' && b[0] !== 'end').forEach((b, i) => { const s = segs[i]; if (s) b[1] = Math.max(b[1], +(s[1] - s[0] + lead + 0.6).toFixed(2));
    const ph = (SUB || {})[b[0]]; if (!ph) return; const span = s ? s[1] - s[0] : b[1] - lead - 0.6, len = ph.map((p) => p.replace(/[{}]/g, '').length), tot = len.reduce((x, y) => x + y, 0), mk = marks[b[0]]; let acc = 0;
    TM[b[0]] = ph.map((p, j) => { const t0 = mk && mk.length === ph.length ? lead + mk[j] : lead + span * acc / tot; acc += len[j]; return [t0, lead + span * acc / tot]; });
    if (mk && mk.length === ph.length) TM[b[0]].forEach((q, j, a) => { q[1] = j + 1 < a.length ? a[j + 1][0] : lead + span; }); });
  const g = (id, i) => (TM[id] && TM[id][Math.max(0, Math.min(TM[id].length - 1, i))]) || [0, 0];
  return { p: (id, i, off) => g(id, i)[0] + (off || 0), e: (id, i) => g(id, i)[1], n: (id) => (TM[id] ? TM[id].length : 0) };
}
