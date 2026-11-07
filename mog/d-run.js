const ZK = 1.45;
/* Part D: camera, update, hud, audio, run */
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const mfr = (lon, lat, ly, d, h, sx) => { const [x, z] = mapXZ(lon, lat); const look = [x, ly, z]; return { look, pos: [x + (sx || 0), ly + h * 1.25, z + d * 1.25], fov: 40 }; };
const SHOT = {
  cover: [[0, fr('TEMPLE', 0.5, 3.4, -1.2, 16.2, 2.6, 0)]], hook1: [[0, fr('TEMPLE', 0, 3.9, -1.2, 20.5, 3.2, -0.8)]],
  hook2: [[0, fr('TEMPLE', 2.3, 2.9, -0.6, 11, 2.3, 1.3)]], hook3: [[0, fr('TEMPLE', 0, 4.0, -1.5, 18, 3, 0)]], hook4: [[0, fr('TEMPLE', 0, 4.6, -2.5, 12.5, 1.8, 0)]],
  map1: [[0, mfr(88, 25, 0.3, 14, 18, 0)], [2.2, mfr(PL.raj[0], PL.raj[1] + 1.6, 0.5, 6.5, 8, 0)]],
  profile: [[0, fr('VIL', 0, 3.4, 0.2, 12, 4.6, 0)]], friends: [[0, fr('VIL', 0, 2.1, 0.6, 7, 2.6, 0.6)]],
  fest1: [[0, fr('FEST', 0, 3.2, 0, 12.5, 4.4, 1)]], fest2: [[0, fr('FEST', 0, 2.8, 1.6, 7.5, 2.2, 0.5)]], leave: [[0, fr('FEST', 4.5, 2.4, 1.8, 11, 3.6, 0)]],
  sanjaya: [[0, fr('SAN', 0, 2.6, 0, 12, 4.4, 0)]], promise: [[0, fr('SAN', 0, 2.2, 2.5, 7, 2.2, 0)]],
  assaji: [[0, fr('ROAD', -1.8, 2.2, 0.6, 10.5, 3.2, -1)]], verse: [[0, fr('ROAD', -0.7, 2.2, 0.6, 7.5, 2.4, 0)]], run: [[0, fr('ROAD', 3.2, 2.2, 0.8, 11, 3.4, 0)]],
  ordain: [[0, fr('VEL', 0, 2.6, 0.6, 13, 6.5, 0)]],
  nod: [[0, fr('HUT', 0, 2.0, 0.9, 8, 2.6, 0)]], budapp: [[0, fr('HUT', -0.8, 2.1, 0.7, 9.5, 2.8, 0)]],
  trA: [[0, fr('HUT', 0, 2.0, 0.9, 8.5, 2.6, 0.6)]], trB: [[0, fr('HUT', 0.8, 2.1, 0.8, 10, 3, 0)]], trC: [[0, fr('HUT', 0, 2.1, 0.8, 10, 3.2, -0.6)]],
  modern: [[0, fr('HUT', 1.8, 2.2, 0.9, 10, 3, 0)]], arahant: [[0, fr('HUT', 0, 2.2, 0.9, 8, 2.4, 0)]],
  etad: [[0, fr('VEL', 0, 2.6, 0.6, 11, 4.6, 0)]],
  f1a: [[0, fr('SKY', 0, 2.9, 0, 15, 4, 0)]], f1b: [[0, fr('SKY', 0.3, 2.6, 0, 12, 3, 0.8)]],
  f2: [[0, fr('MIG', 0.4, 2.6, 0, 13, 4, 0)]],
  f3: [[0, fr('SKY', 7.6, 2.4, 0.6, 9.5, 2.6, 0)], [3.5, fr('PRETA', 0, 2.3, 0.3, 9.5, 2.6, 0)]],
  turn: [[0, fr('MIG', 0, 3.2, 0, 16, 6, 0)]], jeal: [[0, fr('JEAL', 0.4, 2.0, 0.2, 9, 3, 0)]],
  cave: [[0, fr('CAVE', 0, 2.8, 0, 14, 5, 0)]], esc1: [[0, fr('CAVE', 0.9, 2.2, 0, 11, 3.4, 1.8)]], esc2: [[0, fr('CAVE', 0, 3.2, -0.6, 12, 3, 0)]],
  esc3: [[0, fr('CAVE', 0, 1.7, -0.5, 7.5, 0.5, 0)]], why: [[0, fr('CAVE', 0, 1.5, -0.8, 4.6, 0.1, 0)]],
  past1: [[0, fr('PAST', -1.5, 1.8, 0.4, 8, 2.6, 0)]], past2: [[0, fr('PAST', -2.4, 1.9, 0.4, 9.5, 3, 0)]], past3: [[0, fr('PAST', 1.6, 2.0, 1.0, 11, 3.4, 0)]],
  past4: [[0, fr('PAST', 4.6, 2.0, 1.4, 9, 2.8, 0)]], past5: [[0, fr('PAST', 4.4, 2.0, 1.2, 7.5, 2.2, 0)]],
  karma: [[0, fr('CAVE', 0, 2.0, -0.4, 9, 1.0, 0)]], arkarma: [[0, fr('CAVE', 0, 2.2, -0.4, 11, 1.4, -1)]], strike: [[0, fr('CAVE', 0, 2.0, -0.2, 10, 1.6, 0)]],
  rise: [[0, fr('CAVE', 0, 2.4, -0.4, 10, 1.4, 0)]],
  nibb: [[0, fr('VEL', 0.4, 2.3, 0.6, 8.5, 2.6, 0)], [2.85, fr('CAVE', 0, 4.2, -0.8, 15, 3, 0), true]],
  empty: [[0, fr('VEL', 0, 2.6, 0.4, 10.5, 4.2, 0)]],
  r1: [[0, mfr(PL.san[0] + 0.5, PL.san[1] + 2.4, 0.5, 6, 6.5, 0)]], r2: [[0, mfr(PL.san[0] + 1.8, PL.san[1] + 1.9, 0.6, 5.2, 4.2, 0)]],
  r3: [[0, mfr(72, 33, 0.5, 13, 15, 0)]], r4: [[0, mfr(100, 18.5, 0.5, 11, 12.5, 0)]], r5: [[0, mfr(PL.bkk[0], PL.bkk[1] + 1.6, 0.5, 5, 5.5, 0)]],
  ea: [[0, mfr(123, 34, 0.5, 15, 16, 0)]],
  moral: [[0, fr('TEMPLE', 0, 4.0, -1.2, 20, 3.2, 0)]], back: [[0, fr('TEMPLE', 2.6, 2.8, -0.6, 10.5, 2.1, 1.3)]], recap: [[0, fr('TEMPLE', 0, 4.4, -1.2, 22, 3.4, 0)]], ask: [[0, fr('TEMPLE', 2.6, 2.6, -0.4, 8.8, 1.6, 1.1)]],
};
const CUT = new Set(['map1', 'profile', 'past1', 'karma', 'r1', 'moral']);
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' })).concat([{ t: at('nibb', 2.85) - 0.25, dur: 0.5, type: 'iris' }]);
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const segsS = SHOT[id];
    segsS.forEach((sg, j) => {
      const t0 = at(id) + sg[0], t1 = j + 1 < segsS.length ? at(id) + segsS[j + 1][0] : end(id), f = sg[1], fe = push(f, 0.92);
      const cut = j === 0 ? CUT.has(id) : !!sg[2];
      if (prev) {
        if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); }
        else { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[1] - f.look[1]) > 12; keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(far ? 2.0 : 1.1, (t1 - t0) * 0.45) }, f)); }
      } else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();

/* backgrounds */
const BG = {
  temple: ['#1a0d0a', '#4a1e14'], map: ['#0f1630', '#1b2a55'], day: ['#22386b', '#6f9fd0'], night: ['#070b1e', '#16224a'], sky: ['#3a3f8f', '#a9b4ff'],
  dusk: ['#1c1530', '#5a3a68'], past: ['#2a1d12', '#7a5a34'], preta: ['#11121c', '#2a2a40'],
};
function bgKey(t) {
  const id = beatAt(t);
  if (['cover', 'hook1', 'hook2', 'hook3', 'hook4', 'moral', 'back', 'recap', 'ask', 'end'].includes(id)) return 'temple';
  if (['map1', 'r1', 'r2', 'r3', 'r4', 'r5', 'ea'].includes(id)) return 'map';
  if (['nod', 'budapp', 'trA', 'trB', 'trC', 'modern', 'arahant'].includes(id)) return 'night';
  if (['f1a', 'f1b'].includes(id) || (id === 'f3' && rel(t, 'f3') < 3.5)) return 'sky';
  if (id === 'f3') return 'preta';
  if (id.startsWith('past')) return 'past';
  if (between(t, 'turn', 'rise') || (id === 'nibb' && rel(t, 'nibb') > 2.85)) return 'dusk';
  return 'day';
}
const mixC = (a, b, k) => { const ca = new T.Color(a), cb = new T.Color(b); return '#' + ca.lerp(cb, k).getHexString(); };
function bgAt(t) { return BG[bgKey(t)]; }

const vis = (o, on) => { o.visible = !!on; };
const ss = (o, k) => { o.scale.setScalar(Math.max(0.0001, k)); o.visible = k > 0.002; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const P3 = (st, x, y, z) => [ST[st][0] + x, ST[st][1] + y, ST[st][2] + z];
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const lerp3 = (a, b, k) => a.map((v, i) => U.lerp(v, b[i], k));
let lastCrowd = -1;
const BUB = [];

function update(t, s, { camera, W, H }) {
  BUB.length = 0; const id = beatAt(t);
  { const LT = { night: [0.5, 0.45, '#a8b8ff'], dusk: [0.55, 0.6, '#ffb8c8'], past: [0.7, 0.75, '#ffd9a0'], temple: [0.7, 0.7, '#ffe0c0'], sky: [0.85, 0.8, '#ffffff'], preta: [0.65, 0.6, '#b0c0ff'], map: [0.8, 0.8, '#ffffff'], day: [0.72, 0.85, '#fff4e0'] }[bgKey(t)]; s.hemi.intensity = LT[0]; s.sun.intensity = LT[1]; s.sun.color.set(LT[2]); }
  s.fog.color.set(bgAt(t)[1]); s.fog.near = bgKey(t) === 'night' ? 20 : 38;
  /* temple */
  { const tp = s.temple; tp.ring.material.opacity = 0.5 + 0.4 * Math.sin(t * 4); tp.ring.scale.setScalar(1 + 0.05 * Math.sin(t * 4));
    const hl = t < end('hook4') || t >= at('moral'); tp.ring.visible = tp.mglow.visible = hl && !(inB(t, 'hook1') && rel(t, 'hook1') < 2.4);
    tp.mglow.material.opacity = 0.45 + 0.25 * Math.sin(t * 3); vis(tp.labS, (inB(t, 'hook2') && rel(t, 'hook2') > 1.4) || inB(t, 'back')); }
  /* map */
  { const m = s.map, onMap = inB(t, 'map1') || between(t, 'r1', 'ea');
    for (const k in m.pins) { const show = k === 'raj' ? inB(t, 'map1') && rel(t, 'map1') > 1.6 : k === 'san' ? between(t, 'r1', 'r4') : between(t, 'r4', 'r5') && (k === 'bkk' ? rel(t, 'r4') > 1.6 : rel(t, 'r4') > { cm: 2.6, ubon: 3.4, krabi: 4.2 }[k]);
      const pk = show ? 1 : 0; m.pins[k].visible = pk; m.pins[k].position.y = 0.36 + 0.08 * Math.sin(t * 3 + k.length); if (m.labs[k]) vis(m.labs[k], show && !(k === 'raj' && false)); }
    vis(m.labs.lon, inB(t, 'r3') && rel(t, 'r3') < 3.2); vis(m.labs.xian, inB(t, 'ea')); vis(m.labs.kyoto, inB(t, 'ea'));
    const rp = inB(t, 'r2') ? U.easeOut(sm(0.6, 2.0, rel(t, 'r2'))) : between(t, 'r3', 'r3') ? 1 : 0;
    m.caskets.forEach((c, i) => { c.visible = rp > 0.01 && t < at('r4'); c.position.y = 0.6 + rp * 0.9; c.rotation.y = t; const lb = m.casketLab[i]; lb.visible = inB(t, 'r2') && rel(t, 'r2') > 2.0; lb.position.set(c.position.x + (i ? 0.45 : -0.4), c.position.y + 0.42, c.position.z); });
    const dr = (ln, k) => { ln.geometry.setDrawRange(0, Math.round(U.clamp(k) * 61)); ln.visible = k > 0; };
    const r3 = rel(t, 'r3'), r4 = rel(t, 'r4');
    dr(m.arcs.toLon, inB(t, 'r3') ? sm(0.3, 1.8, r3) : 0); dr(m.arcs.back, inB(t, 'r3') ? sm(3.0, 4.6, r3) : 0);
    dr(m.arcs.toTh, between(t, 'r4', 'r5') ? sm(0.2, 1.6, r4) : 0); dr(m.arcs.cm, between(t, 'r4', 'r5') ? sm(2.0, 2.6, r4) : 0); dr(m.arcs.ub, between(t, 'r4', 'r5') ? sm(2.8, 3.4, r4) : 0); dr(m.arcs.kr, between(t, 'r4', 'r5') ? sm(3.6, 4.2, r4) : 0);
    let mv = null; if (inB(t, 'r3') && r3 < 1.9) mv = [m.arcs.toLon, sm(0.3, 1.8, r3)]; else if (inB(t, 'r3') && r3 > 2.9) mv = [m.arcs.back, sm(3.0, 4.6, r3)]; else if (inB(t, 'r4') && r4 < 1.7) mv = [m.arcs.toTh, sm(0.2, 1.6, r4)];
    if (mv) { const p = mv[0].userData.pts[Math.round(mv[1] * 60)]; m.mover.position.copy(p); m.mover.visible = true; } else m.mover.visible = false;
    const cr = inB(t, 'r5') ? U.easeOut(sm(0.6, 4.0, rel(t, 'r5'))) : 0; m.crowd.geometry.setDrawRange(0, Math.round(cr * 900)); m.crowd.visible = cr > 0;
    for (const l of m.lanterns) { const on = inB(t, 'ea'); l.visible = on; if (on) { const k = (rel(t, 'ea') * 0.18 + l.userData.ph) % 1; l.position.y = 0.4 + k * 3.2; l.scale.setScalar(sm(0, 0.1, k) * (1 - sm(0.85, 1, k)) + 0.001); } }
    for (const nm in s.reg.meshes) { const me = s.reg.meshes[nm].material; let e = 0;
      if (nm === 'Thailand') me.color.set(t >= at('r4') ? P.coral : P.land);
      if (nm === 'India' && (inB(t, 'map1') || between(t, 'r1', 'r3'))) e = 0.25; if (nm === 'Thailand' && between(t, 'r4', 'r5')) e = 0.3 + 0.2 * Math.sin(t * 4); if (['China', 'Japan'].includes(nm) && inB(t, 'ea')) e = 0.3;
      me.emissive = me.emissive || new T.Color(); me.emissive.set(nm === 'Thailand' ? P.coral : nm === 'India' ? '#3f6aa8' : '#6f7aff'); me.emissiveIntensity = e; }
    vis(m.stupa, t >= at('r1'));
    void onMap; }
  /* village kids: chase */
  { const k = s.kid.k, u = s.kid.u, on = t < end('friends') + 0.5; vis(k, on); vis(u, on);
    if (on) { const a = t * 1.6; setP(k, 'VIL', Math.cos(a) * 1.6, 0, 0.6 + Math.sin(a) * 0.9); setP(u, 'VIL', Math.cos(a - 0.9) * 1.6, 0, 0.6 + Math.sin(a - 0.9) * 0.9);
      face(k, -Math.sin(a), Math.cos(a) * 0.6); face(u, -Math.sin(a - 0.9), Math.cos(a - 0.9) * 0.6); walk(k, t, 1); walk(u, t + 0.3, 1); } }
  /* festival */
  { const F = s.fest; F.dancers.forEach((d, i) => { d.position.y = 1.35 + Math.abs(Math.sin(t * 5 + i)) * 0.25; d.rotation.y = Math.sin(t * 2 + i) * 0.8; d.userData.arms.L.rotation.z = -1.2 - Math.sin(t * 6 + i) * 0.6; d.userData.arms.R.rotation.z = 1.2 + Math.sin(t * 6 + i) * 0.6; });
    const fade = inB(t, 'fest2') ? sm(1.0, 3.6, rel(t, 'fest2')) : t >= end('fest2') ? 1 : 0;
    F.crowd.forEach((c, i) => { const k = U.clamp(fade * 1.6 - (i % 5) * 0.12); c.scale.setScalar(Math.max(0.001, 0.62 * (1 - k))); c.visible = k < 0.99; c.position.y = ST.FEST[1] + 1.0 + Math.abs(Math.sin(t * 4 + i)) * 0.08 * (1 - fade); });
    F.dancers.forEach((d, i) => { const k = U.clamp(fade * 1.6 - 0.3 - i * 0.1); d.scale.setScalar(Math.max(0.001, 0.75 * (1 - k))); d.visible = k < 0.99; });
    F.motes.forEach((m, i) => { const k = U.clamp(fade * 1.4 - (i % 6) * 0.08); m.visible = inB(t, 'fest2') && k > 0 && k < 1; setP(m, 'FEST', -3 + (i % 6) * 1.2, 1.4 + k * 4 + (i % 2), -1.2 - (i % 3) * 0.4); m.material.opacity = 0.8 * (1 - k); });
    const on = between(t, 'fest1', 'leave'); vis(F.k, on); vis(F.u, on);
    if (on) {
      if (t < at('leave')) { const turn = inB(t, 'fest2') ? sm(0.4, 1.4, rel(t, 'fest2')) : 0; setP(F.k, 'FEST', 0.75, 1.0, 1.9); setP(F.u, 'FEST', -0.75, 1.0, 1.9);
        F.k.rotation.y = U.lerp(Math.PI - 0.3, 0.15, turn); F.u.rotation.y = U.lerp(Math.PI + 0.3, -0.15, turn); rest(F.k); rest(F.u); F.k.userData.body.position.y = F.u.userData.body.position.y = 0.55; }
      else { const r = rel(t, 'leave'), k = U.clamp(r / 4.6); for (const [c, dz, ph] of [[F.k, 0.5, 0], [F.u, -0.4, 0.4]]) { const x = U.lerp(0.4, 8, k), y = x > 5.6 ? Math.max(0, 1 - (x - 5.6) * 1.2) : 1; setP(c, 'FEST', x + (dz > 0 ? 0.6 : -0.2), y, 1.9 + dz); face(c, 1, 0.15); walk(c, t + ph, 1); } }
    } }
  /* Sanjaya */
  { const Sj = s.san, on = between(t, 'sanjaya', 'promise'); vis(Sj.k, on); vis(Sj.u, on); Sj.spark.visible = false;
    Sj.t.userData.arms.R.rotation.z = 0.4 + Math.sin(t * 3) * 0.3; Sj.t.userData.arms.R.rotation.x = -0.6;
    if (on) {
      if (inB(t, 'sanjaya')) { for (const [c, x] of [[Sj.k, 0.75], [Sj.u, -0.75]]) { setSit(c, true); lapHands(c); setP(c, 'SAN', x, 0, 0.9); face(c, 0, -1); c.userData.head.rotation.y = Math.sin(t * 1.5 + x) * 0.3; } if (rel(t, 'sanjaya') > 2.4) BUB.push({ o: Sj.k, dy: 1.6, txt: '?', c: '#fff', big: true }); }
      else { const r = rel(t, 'promise'), k = U.easeIO(sm(0.2, 1.4, r)); for (const [c, x, sgn] of [[Sj.k, 0.75, 1], [Sj.u, -0.75, -1]]) { setSit(c, false); rest(c); setP(c, 'SAN', x * U.lerp(1, 0.75, k), 0, 2.5); c.rotation.y = U.lerp(Math.PI, -sgn * Math.PI / 2, k); const ar = c.userData.arms; const sh = sm(1.4, 2.2, r); ar.L.rotation.set(-1.3 * sh, 0, -0.14); ar.R.rotation.set(-1.3 * sh, 0, 0.14); }
        Sj.spark.visible = r > 2.0; setP(Sj.spark, 'SAN', 0, 1.0, 2.5); Sj.spark.scale.setScalar(1.2 + 0.3 * Math.sin(t * 6)); }
    } }
  /* road */
  { const R = s.road, on = between(t, 'assaji', 'run'); vis(R.a, on); vis(R.u, on); vis(R.k, on); vis(R.labA, inB(t, 'assaji') && rel(t, 'assaji') > 1.4); R.rays.visible = inB(t, 'verse');
    if (on) {
      if (inB(t, 'assaji')) { const r = rel(t, 'assaji'); setP(R.a, 'ROAD', U.lerp(-3.2, -0.6, r / dur('assaji')), 0, 0.6); face(R.a, 1, 0); walk(R.a, t * 0.5, 0.3); anjali(R.a, 0.7); setP(R.u, 'ROAD', U.lerp(-7, -2.4, U.clamp(r / dur('assaji'))), 0, 0.7); face(R.u, 1, 0.1); walk(R.u, t, 0.8); }
      if (inB(t, 'verse')) { setP(R.a, 'ROAD', -0.3, 0, 0.6); face(R.a, -1, 0.35); anjali(R.a, 0.7); setP(R.u, 'ROAD', -2.0, 0, 0.7); face(R.u, 1, 0.35); rest(R.u); const g = sm(1.5, 4.5, rel(t, 'verse')); R.u.userData.ring.scale.setScalar(1 + g * 0.8); R.u.userData.ring.material.opacity = 0.85 + 0.15 * Math.sin(t * 6); setP(R.rays, 'ROAD', -0.3, 1.4, 0.2); R.rays.material.opacity = 0.55 + 0.25 * Math.sin(t * 2); }
      if (t >= end('assaji') + 0.0) R.labA.position.set(R.a.position.x, 2.5, R.a.position.z);
      else R.labA.position.set(R.a.position.x, 2.5, R.a.position.z);
      if (inB(t, 'run')) { const r = rel(t, 'run'); setP(R.a, 'ROAD', -0.3, 0, 0.6); face(R.a, 1, 0.3); R.u.userData.ring.scale.setScalar(1.6);
        const k = U.clamp(r / 2.4); setP(R.u, 'ROAD', U.lerp(-2.0, 4.4, k), 0, 0.8); face(R.u, 1, 0.1); if (k < 1) walk(R.u, t * 1.6, 1.4); else { rest(R.u); face(R.u, 1, -0.2); }
        setP(R.k, 'ROAD', 5.6, 0, 0.6); face(R.k, -1, 0.3); const g = sm(2.8, 3.8, r); R.k.userData.ring.scale.setScalar(1 + g * 0.8); }
      else { setP(R.k, 'ROAD', 5.6, 0, 0.6); face(R.k, -1, 0.3); R.k.userData.ring.scale.setScalar(1); }
    } }
  /* Veluvana */
  { const V = s.vel, layOn = t < at('ordain', 3.0), monkOn = t >= at('ordain', 3.0) && t < at('empty');
    vis(V.kl, layOn); vis(V.ul, layOn); vis(V.k, monkOn && t < at('nibb')); vis(V.u, monkOn && t < at('nibb'));
    const cc = t < at('ordain', 2.6) ? 0 : t >= at('ordain', 4.6) ? 1 : sm(2.6, 4.6, rel(t, 'ordain')); const step = Math.round(cc * 20) / 20;
    if (step !== lastCrowd) { lastCrowd = step; const a = new T.Color('#ece6d6'), b = new T.Color(ROBE); for (let i = 0; i < 70; i++) { const kk = U.clamp(step * 1.8 - (i / 70) * 0.8); V.crowd.setColorAt(i, a.clone().lerp(b, kk)); } V.crowd.instanceColor.needsUpdate = true; }
    if (inB(t, 'etad')) { const r = rel(t, 'etad'), k = U.easeIO(sm(0.4, 1.6, r)); setSit(V.k, false); rest(V.k); setP(V.k, 'VEL', U.lerp(1.2, 0.4, k), 0, U.lerp(1.0, 2.6, k)); face(V.k, 0, 1); V.k.userData.ring.scale.setScalar(1 + 0.25 * Math.sin(t * 5)); }
    else if (monkOn) { setSit(V.k, true); anjali(V.k); setP(V.k, 'VEL', 1.2, 0, 1.0); V.k.rotation.y = 0; V.k.userData.ring.scale.setScalar(1); }
    vis(V.badge, inB(t, 'etad') && rel(t, 'etad') > 1.4); V.badge.position.set(V.k.position.x, 2.45 + 0.05 * Math.sin(t * 3), V.k.position.z + 0.3);
    V.mats.forEach((m) => { m.visible = inB(t, 'empty'); m.material.opacity = 0.7 + 0.25 * Math.sin(t * 2.5); m.userData.gl.visible = m.visible; m.userData.gl.material.opacity = 0.5 + 0.3 * Math.sin(t * 2.5); });
    const nb = inB(t, 'nibb') && rel(t, 'nibb') < 2.9; vis(V.mog, nb);
    if (nb) { setP(V.mog, 'VEL', 0.5, 0, 0.9); face(V.mog, -0.2, -1); const bow = sm(0.6, 1.6, rel(t, 'nibb')); anjali(V.mog); V.mog.rotation.x = 0; V.mog.userData.body.rotation.x = 0; V.mog.rotation.order = 'YXZ'; V.mog.rotation.x = -0.35 * Math.sin(bow * Math.PI); }
    V.b.userData.halo.rotation.z = t * 0.3; }
  /* forest hut */
  { const Hh = s.hut, m = Hh.m, night = between(t, 'nod', 'arahant'); Hh.stars.material.opacity = night ? 0.9 : 0; vis(m, between(t, 'nod', 'arahant'));
    rest(m); setSit(m, true); lapHands(m); m.rotation.set(0, 0, 0); setP(m, 'HUT', 0, 0, 0.9); m.userData.eyes.forEach((e) => (e.scale.y = 1));
    vis(Hh.b, between(t, 'budapp', 'trC')); Hh.light.visible = false; vis(Hh.w, inB(t, 'modern')); vis(Hh.desk, inB(t, 'modern'));
    if (Hh.b.visible) { const k = inB(t, 'budapp') ? U.easeOut(sm(0.2, 1.4, rel(t, 'budapp'))) : 1; Hh.b.scale.setScalar(1.15 * Math.max(0.01, k)); setP(Hh.b, 'HUT', -2.1, 0, 0.5); face(Hh.b, 1, 0.25); Hh.b.userData.arms.R.rotation.set(-0.9, 0, 0.3); Hh.b.userData.halo.rotation.z = t; }
    if (inB(t, 'nod')) { const r = rel(t, 'nod'), d = sm(1.2, 2.2, r); m.userData.head.rotation.x = d * (0.25 + 0.3 * Math.max(0, Math.sin(r * 2.4))); m.userData.eyes.forEach((e) => (e.scale.y = 1 - d * 0.85)); if (r > 2.2) BUB.push({ o: m, dy: 2.2, dx: 0.6, txt: 'Zz…', c: '#fff' }); }
    if (inB(t, 'budapp')) { m.userData.head.rotation.x = 0.1 - sm(0.8, 1.6, rel(t, 'budapp')) * 0.1; }
    if (inB(t, 'trA')) { const r = rel(t, 'trA'); const ph = r < 2.2 ? 0 : r < 4.4 ? 1 : 2; if (ph === 0) m.userData.head.rotation.y = Math.sin(r * 5) * 0.35 * (1 - sm(1.6, 2.2, r)); if (ph === 1) anjali(m); if (ph === 2) { anjali(m); m.userData.head.rotation.x = Math.max(0, Math.sin(r * 9)) * 0.12; BUB.push({ o: m, dy: 2.3, dx: 0.7, txt: 'อิติปิโส…', c: '#fff' }); } }
    if (inB(t, 'trB')) { const r = rel(t, 'trB');
      if (r < 3.3) { const a = m.userData.arms, w = Math.sin(r * 12) * 0.12; a.L.rotation.set(-0.2, 0, -2.75 + w); a.R.rotation.set(-0.2, 0, 2.75 - w); }
      else { setSit(m, false); const k = U.easeIO(sm(3.4, 4.4, r)); setP(m, 'HUT', U.lerp(0, 1.4, k), 0, U.lerp(0.9, 0.9, k)); face(m, k < 1 ? 1 : 0.3, 0.3); if (k < 1) walk(m, t, 0.8); else { const a = m.userData.arms; const sp = sm(4.5, 4.9, r) * (1 - sm(5.1, 5.4, r)); a.L.rotation.set(-1.0 - sp * 0.6, 0, 0.2); a.R.rotation.set(-1.0 - sp * 0.6, 0, -0.2); m.userData.head.rotation.x = -0.55 * sm(5.3, 5.8, r); } Hh.stars.material.opacity = 0.9 + 0.1 * Math.sin(t * 9); } }
    if (inB(t, 'trC')) { const r = rel(t, 'trC');
      if (r < 2.4) { Hh.light.visible = true; setP(Hh.light, 'HUT', 0, 1.2, 0.9); Hh.light.material.opacity = 0.75 * sm(0.2, 1.2, r); Hh.light.scale.setScalar(3 + r * 1.2); }
      else if (r < 4.8) { setSit(m, false); const k = (r - 2.4) / 2.4, x = Math.sin(k * Math.PI * 2) * 1.3; setP(m, 'HUT', x, 0, 1.0); face(m, Math.cos(k * Math.PI * 2) > 0 ? 1 : -1, 0.15); walk(m, t * 0.6, 0.5); }
      else { setSit(m, false); rest(m); const k = U.easeIO(sm(4.9, 5.7, r)); m.rotation.set(0, 0, k * Math.PI / 2); setP(m, 'HUT', U.lerp(0, 0.7, k), U.lerp(0, 0.42, k), 0.9); m.userData.eyes.forEach((e) => (e.scale.y = 1 - k * 0.8)); } }
    if (inB(t, 'modern')) { const r = rel(t, 'modern'), w = Hh.w; face(w, -0.2, 1); rest(w); if (r < 1.8) { w.userData.head.rotation.x = 0.2 * Math.max(0, Math.sin(r * 3)); BUB.push({ o: w, dy: 2.1, dx: 0.5, txt: 'ง่วง…', c: '#fff' }); } else { const a = w.userData.arms, q = Math.sin(r * 12) * 0.12; a.L.rotation.set(-0.2, 0, -2.75 + q); a.R.rotation.set(-0.2, 0, 2.75 - q); }
      setSit(m, true); anjali(m); }
    if (inB(t, 'arahant')) { const r = rel(t, 'arahant'), k = sm(0.6, 2.2, r); anjali(m, 0); lapHands(m); m.userData.ring.scale.setScalar(1 + k * 2.2); m.userData.ring.material.opacity = 0.9 * (1 - k * 0.5); Hh.light.visible = true; setP(Hh.light, 'HUT', 0, 1.3, 0.9); Hh.light.material.opacity = 0.9 * k; Hh.light.scale.setScalar(2 + k * 5); }
    else m.userData.ring.scale.setScalar(1); }
  /* heaven */
  { const K = s.sky, sk = K.sakka; const shake = inB(t, 'f1b') ? Math.max(0, 1 - Math.abs(rel(t, 'f1b') - 2.2) / 1.2) : 0;
    K.pal.rotation.z = Math.sin(t * 34) * 0.045 * shake; setP(K.pal, 'SKY', -0.5 + Math.sin(t * 41) * 0.12 * shake, -0.2, -2.6);
    const startled = inB(t, 'f1b') ? sm(1.2, 1.6, rel(t, 'f1b')) * (1 - sm(3.4, 3.9, rel(t, 'f1b'))) : 0;
    sk.position.y = ST.SKY[1] + 0.2 + Math.abs(Math.sin(t * 4)) * 0.2 * (1 - startled); sk.rotation.y = startled ? 0.5 : Math.sin(t * 2) * 0.6;
    sk.userData.arms.L.rotation.set(0, 0, startled ? -2.6 : -1.3 - Math.sin(t * 5) * 0.5); sk.userData.arms.R.rotation.set(0, 0, startled ? 2.6 : 1.3 + Math.sin(t * 5) * 0.5);
    if (inB(t, 'f1b') && rel(t, 'f1b') > 3.9) anjali(sk);
    K.ap.forEach((a, i) => { a.position.y = ST.SKY[1] + 0.2 + Math.abs(Math.sin(t * 4 + i * 1.5)) * 0.2; a.rotation.y = Math.sin(t * 2 + i) * 0.7; a.userData.arms.L.rotation.z = -1.0 - Math.sin(t * 5 + i) * 0.4; a.userData.arms.R.rotation.z = 1.0 + Math.sin(t * 5 + i) * 0.4; });
    const mOn = (inB(t, 'f1a') && rel(t, 'f1a') > 2.0) || inB(t, 'f1b') || (inB(t, 'f3') && rel(t, 'f3') < 3.6); vis(K.m, mOn);
    if (inB(t, 'f1a') || inB(t, 'f1b')) { setP(K.m, 'SKY', 2.8, 0.2 + (inB(t, 'f1b') ? Math.max(0, Math.sin(sm(0.6, 1.1, rel(t, 'f1b')) * Math.PI)) * 0.5 : 0), 1.3); face(K.m, -1, -0.4); anjali(K.m, 0.6); if (inB(t, 'f1a')) K.m.scale.setScalar(Math.max(0.01, U.easeBack(sm(2.0, 2.6, rel(t, 'f1a'))))); else K.m.scale.setScalar(1); }
    if (inB(t, 'f3') && rel(t, 'f3') < 3.6) { setP(K.m, 'SKY', 6.4, 0.0, 1.2); face(K.m, 1, -0.2); K.m.scale.setScalar(1); rest(K.m); const r = rel(t, 'f3'); if (r > 0.5 && r < 1.9) BUB.push({ o: K.m, dy: 2.1, txt: '?', c: '#fff', big: true }); if (r > 1.8) BUB.push({ o: K.sky ? K.deva : K.deva, dy: 2.2, txt: 'ให้ทาน รักษาศีล', c: '#fff' }); }
    K.deva.position.y = ST.SKY[1] + Math.abs(Math.sin(t * 3)) * 0.12; face(K.deva, -0.8, 0.6);
    const orbOn = inB(t, 'f1a') && rel(t, 'f1a') > 0.4 && rel(t, 'f1a') < 2.3; s.cave.orb.visible = false;
    K.orbOn = orbOn; if (orbOn) { const k = U.easeOut(sm(0.4, 2.1, rel(t, 'f1a'))); K.orbPos = P3('SKY', 2.8, U.lerp(-7, 0.9, k), 1.3); }
    const rp = inB(t, 'f1b') ? sm(0.9, 2.2, rel(t, 'f1b')) : inB(t, 'f2') ? sm(2.4, 3.6, rel(t, 'f2')) : -1;
    s.ripple.visible = rp >= 0 && rp < 1; if (s.ripple.visible) { const c = inB(t, 'f1b') ? P3('SKY', 2.8, 0.35, 1.3) : P3('MIG', 3.0, 0.1, 1.4); s.ripple.position.set(c[0], c[1], c[2]); s.ripple.scale.setScalar(0.5 + rp * 6); s.ripple.material.opacity = 0.8 * (1 - rp); } }
  /* mansion */
  { const G = s.mig, r = rel(t, 'f2'), sh = inB(t, 'f2') ? Math.max(0, 1 - Math.abs(r - 3.4) / 1.0) : 0;
    G.h.rotation.z = Math.sin(t * 34) * 0.04 * sh; setP(G.h, 'MIG', -0.6 + Math.sin(t * 43) * 0.1 * sh, 0, -1.8);
    const calm = inB(t, 'f2') ? sm(4.4, 5.0, r) : t > end('f2') ? 1 : 0, jump = inB(t, 'f2') ? sm(2.6, 2.9, r) * (1 - sm(4.0, 4.4, r)) : 0;
    G.monks.forEach((c, i) => { rest(c); setP(c, 'MIG', -2.2 + i * 1.3, jump * Math.abs(Math.sin(t * 9 + i)) * 0.35, 0.6);
      if (calm > 0.5) { face(c, 0, 1); anjali(c); } else if (jump > 0) { face(c, 0, 1); c.userData.arms.L.rotation.z = -2.4; c.userData.arms.R.rotation.z = 2.4; }
      else { face(c, i === 1 ? 0 : i === 0 ? 1 : -1, 0.6); c.userData.head.rotation.x = Math.max(0, Math.sin(t * 7 + i * 2)) * 0.18; c.userData.arms.R.rotation.z = 0.5 + Math.sin(t * 6 + i) * 0.4; } });
    if (inB(t, 'f2') && r < 2.4) { BUB.push({ o: G.monks[0], dy: 2.0, txt: 'ฮ่าๆๆ', c: '#fff' }); BUB.push({ o: G.monks[2], dy: 2.0, txt: 'แล้วไงต่อ', c: '#fff' }); }
    vis(G.m, between(t, 'f2', 'turn')); anjali(G.m, 0.5); }
  /* preta */
  { const Pr = s.pre; Pr.p.rotation.z = Math.sin(t * 1.3) * 0.05; Pr.mist.forEach((m, i) => { m.position.x = ST.PRETA[0] - 4 + i * 1.2 + Math.sin(t * 0.5 + i) * 0.6; });
    if (inB(t, 'f3') && rel(t, 'f3') > 3.6) { const r = rel(t, 'f3'); if (r > 3.9 && r < 5.3) BUB.push({ o: Pr.m, dy: 2.1, txt: '?', c: '#fff', big: true }); if (r > 5.2) BUB.push({ o: Pr.p, dy: 2.6, txt: 'ตระหนี่ ไม่เคยให้ใคร', c: '#fff' }); } }
  /* jealous ascetics */
  { const J = s.jeal, r = rel(t, 'jeal'); J.f.userData.f.scale.set(1, 1 + Math.sin(t * 13) * 0.15, 1);
    J.a.forEach((c, i) => { c.userData.head.rotation.y = Math.sin(t * 2 + i) * 0.25; c.userData.arms.R.rotation.set(-0.8, 0, 0.3 + Math.sin(t * 4 + i) * 0.3); });
    const on = inB(t, 'jeal'); vis(J.thief, on && r > 1.8); vis(J.bag, on && r > 2.6);
    if (on) { const k = U.easeOut(sm(1.8, 3.2, r)); setP(J.thief, 'JEAL', U.lerp(4.5, 1.5, k), 0, U.lerp(2.6, 1.7, k)); face(J.thief, -1, -0.3); if (k < 1) walk(J.thief, t, 1); else rest(J.thief);
      const b = sm(3.4, 4.3, r), a0 = J.a[2].position, t0 = J.thief.position; J.bag.position.set(U.lerp(a0.x + 0.4, t0.x - 0.3, b), 1.0 + Math.sin(b * Math.PI) * 0.6, U.lerp(a0.z + 0.4, t0.z, b));
      if (r > 1.0 && r < 3.4) BUB.push({ o: J.a[1], dy: 1.9, txt: 'คนไปหาพระพุทธเจ้าหมด!', c: '#fff' }); } }
  /* cave */
  { const C = s.cave, m = C.m; const caveOn = between(t, 'cave', 'nibb'); const ring = [[-3.3, 0.0], [-2.4, 1.5], [2.4, 1.5], [3.3, 0.0]];
    let mScale = 1; m.userData.eyes.forEach((e) => (e.scale.y = 1)); m.userData.ring.material.opacity = 0.85; C.orb.visible = false; C.grains.visible = false; C.dust.forEach((d) => (d.visible = false)); C.pillar.material.opacity = 0; C.motes.forEach((q) => (q.visible = false)); C.roof.rotation.z = 0;
    const thOn = between(t, 'cave', 'strike') || (inB(t, 'rise') && rel(t, 'rise') < 2.6);
    C.thieves.forEach((c, i) => { vis(c, thOn); if (!thOn) return; rest(c); let p = ring[i], k = 1;
      if (inB(t, 'cave')) { k = U.easeOut(sm(0.3 + i * 0.25, 2.6 + i * 0.25, rel(t, 'cave'))); p = [p[0] * (1 + (1 - k) * 1.5), p[1] + (1 - k) * 5]; if (k < 1) walk(c, t + i, 1); }
      if (inB(t, 'esc1') && rel(t, 'esc1') > 2.4) { const q = sm(2.4, 3.4, rel(t, 'esc1')); p = [p[0] * U.lerp(1, 0.55, q), U.lerp(p[1], 1.0, q)]; c.userData.head.rotation.y = Math.sin(t * 4 + i) * 0.6 * q; }
      if (inB(t, 'esc2') && rel(t, 'esc2') > 2.2) { c.userData.head.rotation.x = -0.5; }
      if (between(t, 'esc3', 'arkarma')) { const q = inB(t, 'esc3') ? sm(1.0, 4.5, rel(t, 'esc3')) : 1; p = [p[0] * U.lerp(1, 0.72, q), U.lerp(p[1], 1.2, q)]; }
      if (inB(t, 'strike')) { p = [p[0] * 0.72, 1.2]; const r = rel(t, 'strike'), up = sm(0.5, 1.2, r) * (1 - sm(1.35, 1.6, r)); c.userData.arms.R.rotation.set(-0.4, 0, 0.14 + up * 2.6); c.userData.arms.L.rotation.set(-0.4, 0, -0.14 - up * 2.6); }
      if (inB(t, 'rise')) { const q = U.easeIO(sm(0.0, 2.4, rel(t, 'rise'))); p = [p[0] * U.lerp(0.72, 2.6, q), U.lerp(1.2, 7, q)]; if (q > 0 && q < 1) walk(c, t * 1.5 + i, 1.2); }
      setP(c, 'CAVE', p[0], 0, p[1]); face(c, -p[0], -p[1] - 0.8); void k; });
    vis(m, caveOn); if (caveOn) { setSit(m, true); lapHands(m); setP(m, 'CAVE', 0, 0.1, -0.9); m.rotation.set(0, 0, 0);
      if (inB(t, 'esc1')) { const r = rel(t, 'esc1'); mScale = 1 - sm(0.9, 1.5, r); if (r > 1.4 && r < 3.8) { C.orb.visible = true; const a = P3('CAVE', 0, 0.8, -0.9), b = P3('CAVE', 1.56, 0.6, -0.42), c2 = P3('CAVE', 6, 4.5, -2.5); const k1 = sm(1.5, 2.4, r), k2 = sm(2.5, 3.7, r); C.orb.position.fromArray(k2 > 0 ? lerp3(b, c2, U.easeIO(k2)) : lerp3(a, b, U.easeIO(k1))); C.orb.scale.setScalar(k1 > 0.95 && k2 < 0.1 ? 0.35 : 1); } C.kh.scale.setScalar(1 + (r > 2.2 && r < 2.7 ? 1.5 : 0)); }
      if (inB(t, 'esc2')) { const r = rel(t, 'esc2'); mScale = sm(0, 0.4, r) * (1 - sm(1.4, 1.9, r)); if (r > 1.8 && r < 4.2) { C.orb.visible = true; const k = U.easeIO(sm(1.9, 3.8, r)); C.orb.position.fromArray(P3('CAVE', 0, U.lerp(0.9, 9, k), -0.9)); } C.roof.rotation.z = (r > 2.4 && r < 3.0) ? Math.sin(t * 40) * 0.05 : 0; }
      if (between(t, 'esc3', 'arkarma')) { m.userData.eyes.forEach((e) => (e.scale.y = 0.15)); if (inB(t, 'esc3')) mScale = sm(0, 0.4, rel(t, 'esc3')); m.userData.ring.scale.setScalar(1 + 0.15 * Math.sin(t * 2)); }
      if (inB(t, 'strike')) { const r = rel(t, 'strike'); m.userData.eyes.forEach((e) => (e.scale.y = 0.15)); mScale = r < 1.55 ? 1 : 0;
        C.dust.forEach((d, i) => { const q = sm(1.45, 3.2, r); d.visible = q > 0 && q < 1; setP(d, 'CAVE', Math.cos(i * 1.7) * q * 1.4, 0.6 + q * 0.8, -0.9 + Math.sin(i * 1.7) * q); d.scale.setScalar(1 + q * 3); d.material.opacity = 0.75 * (1 - q); });
        if (r > 1.55) { C.grains.visible = true; grains(C, 0); } }
      if (inB(t, 'rise')) { const r = rel(t, 'rise'), k = U.easeIO(sm(0.5, 2.6, r)); C.grains.visible = r < 2.8; grains(C, k); mScale = r < 2.6 ? 0 : r < 3.6 ? U.easeBack(sm(2.6, 3.0, r)) : 1 - sm(3.6, 4.0, r); m.userData.ring.scale.setScalar(1.4);
        if (r > 3.6) { C.orb.visible = true; const q = U.easeIO(sm(3.7, 5.4, r)); C.orb.position.fromArray(P3('CAVE', U.lerp(0, -10, q), U.lerp(1, 7, q), -0.9)); } }
      if (inB(t, 'nibb')) { const r = rel(t, 'nibb'); vis(m, r > 2.85); mScale = 1 - sm(5.2, 6.6, r); m.userData.eyes.forEach((e) => (e.scale.y = 0.15)); C.pillar.material.opacity = 0.45 * sm(3.2, 4.6, r);
        C.motes.forEach((q, i) => { const u = ((r - 3) * 0.35 + i / 14) % 1; q.visible = r > 3.2; setP(q, 'CAVE', Math.cos(i * 2.4) * 0.8, 0.5 + u * 6, -0.9 + Math.sin(i * 2.4) * 0.6); q.material.opacity = 0.9 * (1 - u); }); }
      m.scale.setScalar(Math.max(0.001, mScale)); m.visible = m.visible && mScale > 0.01; }
    if (s.sky.orbOn) { C.orb.visible = true; C.orb.position.fromArray(s.sky.orbPos); } }
  /* past life */
  { const Q = s.past, on = between(t, 'past1', 'past5'); for (const k of ['son', 'wife', 'dad', 'mom', 'cart']) vis(Q[k], on); Q.junk.forEach((j) => (j.visible = false)); Q.motes.forEach((q) => (q.visible = false)); Q.bowl.visible = false;
    if (on) {
      for (const k of ['son', 'wife', 'dad', 'mom']) { rest(Q[k]); Q[k].rotation.set(0, Q[k].rotation.y, 0); }
      let cx = -0.6;
      if (between(t, 'past1', 'past2')) { setSit(Q.dad, true); setSit(Q.mom, true); setP(Q.dad, 'PAST', -2.4, 0, 0.3); setP(Q.mom, 'PAST', -1.2, 0, 0.3); face(Q.dad, 0.3, 1); face(Q.mom, 0.3, 1); setP(Q.cart, 'PAST', 3.5, 0, -3.5); Q.cart.rotation.y = 0.4;
        if (inB(t, 'past1')) { setP(Q.son, 'PAST', 0.2, 0, 1.0); face(Q.son, -1, -0.25); Q.bowl.visible = true; Q.son.userData.arms.R.rotation.set(-1.2 - Math.sin(t * 3) * 0.1, 0, 0.1); vis(Q.wife, false); }
        else { const r = rel(t, 'past2'); setP(Q.son, 'PAST', 0.4, 0, 1.2); face(Q.son, -0.6, 0.4); Q.son.userData.head.rotation.x = 0.35 * sm(2.5, 3.2, r); const k = U.easeOut(sm(0, 1.6, r)); setP(Q.wife, 'PAST', U.lerp(-6.5, -3.8, k), 0, 1.4); face(Q.wife, 1, 0); if (k < 1) walk(Q.wife, t, 1); else { Q.wife.userData.arms.R.rotation.set(-1.3, 0, 0.2); Q.wife.userData.arms.L.rotation.set(0, 0, -0.9); }
          Q.junk.forEach((j, i) => { const q = sm(1.6 + i * 0.12, 1.9 + i * 0.12, r); j.visible = q > 0; j.scale.setScalar(q); }); if (r > 2.2) BUB.push({ o: Q.wife, dy: 2.1, txt: 'บ้านรกเพราะพ่อแม่เธอ!', c: '#fff' }); } }
      else {
        const r3 = rel(t, 'past3'); cx = inB(t, 'past3') ? U.lerp(-0.8, 3.6, U.easeIO(sm(0.6, dur('past3') - 0.2, r3))) : 3.6; setP(Q.cart, 'PAST', cx, 0, 1.1); Q.cart.rotation.y = 0;
        const shk = inB(t, 'past4') ? sm(3.6, 4.0, rel(t, 'past4')) * Math.sin(t * 30) * 0.06 : 0; Q.cart.rotation.z = shk;
        setSit(Q.dad, true); setSit(Q.mom, true); setP(Q.dad, 'PAST', cx - 0.45, 0.85, 1.1); setP(Q.mom, 'PAST', cx + 0.45, 0.85, 1.1); face(Q.dad, 0.2, 1); face(Q.mom, 0.2, 1); Q.dad.scale.setScalar(0.85); Q.mom.scale.setScalar(0.85);
        vis(Q.wife, false);
        if (inB(t, 'past3')) { setP(Q.son, 'PAST', cx + 2.6, 0, 2.3); face(Q.son, 1, 0); walk(Q.son, t, sm(0.6, 1, r3) * (1 - sm(dur('past3') - 0.4, dur('past3'), r3))); }
        if (inB(t, 'past4')) { const r = rel(t, 'past4'), k = U.easeIO(sm(0.4, 1.8, r)); setP(Q.son, 'PAST', U.lerp(cx + 2.6, 6.6, k), 0, U.lerp(2.3, 2.9, k)); face(Q.son, k < 1 ? 1 : -1, k < 1 ? 0.4 : -0.3); if (k < 1 && k > 0) walk(Q.son, t, 1);
          if (r > 1.9) BUB.push({ o: Q.son, dy: 2.2, txt: 'โจรมาแล้ว!!', c: '#ffb3b3' }); if (r > 3.4) { Q.son.userData.arms.R.rotation.set(0, 0, 2.5); }
          if (r > 3.0) { const pa = sm(3.0, 3.4, r); [Q.dad, Q.mom].forEach((c, i) => { c.userData.arms.L.rotation.set(-0.6, 0, -1.4 * pa - Math.sin(t * 8 + i) * 0.2); }); } }
        if (inB(t, 'past5')) { const r = rel(t, 'past5'); setP(Q.son, 'PAST', 6.6, 0, 2.9); face(Q.son, -1, -0.3); Q.son.userData.arms.R.rotation.set(0, 0, 2.5 * (1 - sm(3.6, 4.4, r))); Q.son.userData.head.rotation.x = 0.4 * sm(4.4, 5.0, r);
          const fd = sm(4.0, 6.2, r); [Q.dad, Q.mom].forEach((c, i) => { c.userData.arms.L.rotation.set(-0.6, 0, -1.4 - Math.sin(t * 8 + i) * 0.25); c.userData.arms.R.rotation.set(-0.6, 0, 1.4 + Math.sin(t * 8 + i) * 0.25); c.scale.setScalar(Math.max(0.001, 0.85 * (1 - fd))); c.visible = fd < 0.98; });
          Q.motes.forEach((q, i) => { const u = U.clamp((r - 4.0) / 2.6 - (i % 4) * 0.08); q.visible = u > 0 && u < 1; setP(q, 'PAST', cx + (i % 2 ? 0.45 : -0.45) + Math.sin(i * 2) * 0.3, 1.4 + u * 4, 1.1 + Math.cos(i) * 0.3); q.material.opacity = 0.9 * (1 - u); }); }
      }
    } }
  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.12); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
function grains(C, k) {
  const pos = C.grains.geometry.attributes.position, sd = C.grains.userData.seed, c = P3('CAVE', 0, 0, -0.9);
  for (let i = 0; i < pos.count; i++) {
    const fx = c[0] + sd[i * 3], fz = c[2] + sd[i * 3 + 2], fy = 0.14 + sd[i * 3 + 1] * 0.05;
    const a = i * 2.39996, rr = 0.55 * Math.sqrt((i % 60) / 60), hy = (i / pos.count) * 1.75;
    const tx = c[0] + Math.cos(a) * rr * (1 - hy * 0.25), ty = 0.15 + hy, tz = c[2] + Math.sin(a) * rr * 0.8;
    pos.setXYZ(i, U.lerp(fx, tx, k), U.lerp(fy, ty, k), U.lerp(fz, tz, k));
  }
  pos.needsUpdate = true;
}
