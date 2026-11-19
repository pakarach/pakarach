/* Part D: camera shots, backgrounds, update */
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { st, look, pos: [look[0] + (sx || 0), look[1] + h, look[2] + d], fov: fov || 40 }; };
const mfr = (lon, lat, ly, d, h, sx) => { const [x, z] = mapXZ(lon, lat); const look = [x, ly, z]; return { st: 'MAP', look, pos: [x + (sx || 0), ly + h, z + d], fov: 40 }; };
const SHOT = {
  cover: [[0, fr('CASTLE', 0.05, 2.9, 2.0, 12, 1.7)]],
  hook1: [[0, fr('CASTLE', -1.35, 2.5, 1.6, 8.6, 1.4, 0.4)]],
  hook2: [[0, fr('CASTLE', 1.45, 2.3, 2.6, 8.4, 1.3, -0.3)]],
  hook3: [[0, mfr(110, 10, 0.4, 15, 20)], [2.0, mfr(110, 9, 0.4, 12, 16)]],
  zosia1: [[0, mfr(40, 40, 0.4, 16, 20)], [1.0, mfr(PL.pien[0], PL.pien[1] + 1.4, 0.4, 5.5, 7)], [2.4, fr('POL', 0, 0.3, 0.8, 6.5, 9.5), true]],
  zosia2: [[0, fr('POL', 0.1, 0.4, -1.2, 3.6, 5.2)], [2.7, fr('POL', -0.2, 0.4, 2.3, 3.4, 4.6)]],
  map1: [[0, mfr(PL.pien[0], PL.pien[1] + 1, 0.4, 7, 9)], [1.2, mfr(PL.kis[0], PL.kis[1] + 1.4, 0.4, 5.5, 7)]],
  petar1: [[0, fr('VIL', 0, 2.4, 0.4, 15, 6)]],
  petar2: [[0, fr('VIL', 6.0, 1.9, -1.4, 9.5, 4)]],
  fromb: [[0, fr('VIL', -2.6, 2.0, 1.6, 9, 2.6)]],
  dig: [[0, fr('VIL', 0, 1.1, 1.2, 3.6, 4.8)]],
  stake: [[0, fr('VIL', 0, 1.6, 1.3, 7.5, 4.2)]],
  news: [[0, fr('VIL', 0, 3.0, 1.4, 10, 3)]],
  paole1: [[0, fr('MED', 0, 1.8, -2.0, 13, 7)]],
  paole2: [[0, fr('MED', 0, 2.2, -0.4, 8, 2.4)]],
  fluck: [[0, fr('MED', 2.2, 2.1, 1.8, 9.5, 3)]],
  spread: [[0, mfr(10, 47, 0.4, 13, 16)]],
  cliff2: [[0, fr('LAB', -1.3, 2.3, 0, 9, 3.8)]],
  sci1: [[0, fr('LAB', -1.2, 2.2, 0, 6.2, 3.2)]],
  sci2: [[0, fr('LAB', -1.6, 2.2, 0, 6.4, 3)]],
  sci3: [[0, fr('LAB', 4.4, 3.2, 0.6, 6.8, 1.2)]],
  myth: [[0, fr('LAB', 4.4, 3.3, 0.6, 5.4, 0.9, 0.3)]],
  sci4: [[0, fr('LAB', -1.0, 2.4, 0, 7.2, 3)]],
  ex1: [[0, mfr(-20, 42, 0.4, 16, 18)], [1.4, mfr(PL.exeter[0], PL.exeter[1] + 1.4, 0.4, 6, 7.5)]],
  ex2: [[0, fr('EXE', 0, 2.1, 0.6, 9.5, 3)]],
  ex3: [[0, fr('EXE', 3.4, 1.6, -3.0, 7.5, 2.8)]],
  ex4: [[0, fr('EXE', 1.5, 1.9, 0.8, 6.2, 1.5)]],
  ex5: [[0, fr('EXE', 7.6, 2.0, -1.0, 9.5, 3.4)]],
  ex6: [[0, fr('EXE', 2.6, 1.8, 1.2, 7.4, 2.4)]],
  ex7: [[0, fr('EXE', 5.4, 1.6, -3.0, 7, 2.4)]],
  ex8: [[0, fr('EXE', -0.4, 2.6, -1.0, 13, 4.5)]],
  cliff4: [[0, fr('CASTLE', 1.45, 2.5, 2.6, 9, 1.4)], [2.4, fr('CASTLE', 0.1, 2.6, 2.0, 12, 1.8)]],
  tam1: [[0, mfr(100, 5, 0.4, 14, 16)], [1.2, mfr(PL.tambora[0], PL.tambora[1] + 1.4, 0.4, 6, 7.5)], [2.6, fr('VOLC', 0, 6.5, -4, 24, 3.5), true]],
  tam2: [[0, fr('VOLC', 0, 9.5, -4, 30, 5)]],
  tam3: [[0, fr('GLOBE', 0, 0.4, 0, 12.5, 1.2)]],
  dio1: [[0, fr('VILLA', 0, 3.0, 0, 16, 4)]],
  dio2: [[0, fr('VILLA', 0, 2.3, -1.4, 8, 2.4)]],
  dio3: [[0, fr('VILLA', -0.6, 2.3, -3.0, 6.4, 1.6, 0.4)]],
  poli1: [[0, fr('VILLA', 0.7, 2.8, -2.2, 7.6, 1.6, 0.3)]],
  poli2: [[0, fr('VILLA', 0.4, 3.6, 3.0, 9, 0.6)]],
  chain: [[0, fr('VILLA', 0, 3.4, 0, 19, 6)]],
  dra1: [[0, fr('LIB', -0.6, 2.6, 0, 13, 3.4)]],
  dra2: [[0, fr('LIB', 0.6, 3.0, 0.6, 6.2, 0.6)]],
  dra3: [[0, fr('LIB', -2.4, 2.2, 0, 7.2, 1.6)]],
  dra4: [[0, fr('LIB', 3.1, 2.4, -2.2, 8.4, 1.2)]],
  dra5: [[0, fr('LIB', 1.4, 2.4, 1.0, 9.5, 2)]],
  nos1: [[0, fr('CINE', 0, 3.4, 0, 15.5, 2.6)]],
  nos2: [[0, fr('CINE', 0.6, 2.9, -4.6, 8, 0.4)]],
  nos3: [[0, fr('CINE', 6.0, 2.2, 0.6, 7.6, 2)]],
  nos4: [[0, fr('CINE', 1.4, 3.4, -0.6, 15, 2.6)]],
  bat1: [[0, mfr(-60, 25, 0.4, 16, 18)], [1.2, mfr(PL.bats[0], PL.bats[1] + 1.4, 0.4, 6.5, 8)], [2.6, fr('CAVE', 0, 4.4, -1.8, 10.5, -1.8), true]],
  bat2: [[0, fr('CAVE', 0.0, 4.6, -2.2, 6.4, -1.4)]],
  bat3: [[0, fr('CAVE', 0.5, 4.6, -2.2, 5.6, -1.2)]],
  th1: [[0, fr('BLOOD', -0.6, 2.8, 0, 12, 3.2)]],
  th2: [[0, fr('BLOOD', -0.8, 2.6, 0.4, 9.5, 2)]],
  recap: [[0, fr('CASTLE', 0.1, 3.0, 2.0, 15, 2)]],
  ask: [[0, fr('CASTLE', 0.1, 3.0, 2.0, 13.5, 1.8)]],
};
const CUT = new Set(['hook3', 'map1', 'petar1', 'paole1', 'spread', 'cliff2', 'ex1', 'ex2', 'cliff4', 'tam1', 'tam3', 'dio1', 'dra1', 'nos1', 'bat1', 'th1', 'recap']);
const SEGS = []; /* [t0, station] */
const IRIS = [];
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const sg = SHOT[id];
    sg.forEach((g, j) => {
      const t0 = at(id) + ph(id, g[0]), t1 = j + 1 < sg.length ? at(id) + ph(id, sg[j + 1][0]) : end(id), f = g[1], fe = push(f, 0.93);
      const cut = j === 0 ? CUT.has(id) : !!g[2];
      SEGS.push([t0, f.st]); if (cut && prev) IRIS.push({ t: t0 - 0.25, dur: 0.5, type: 'iris' });
      if (prev) {
        if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); }
        else { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[2] - f.look[2]) > 10; keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(far ? 1.6 : 1.1, (t1 - t0) * 0.45) }, f)); }
      } else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();
const stAt = (t) => { let s0 = SEGS[0][1]; for (const sg of SEGS) if (t >= sg[0]) s0 = sg[1]; return s0; };

const BG = {
  CASTLE: ['#0b0e24', '#2a2450'], POL: ['#1c2c3a', '#5a7a8a'], VIL: ['#080c20', '#1e2848'], MED: ['#1a2238', '#6a7a98'], LAB: ['#081418', '#163038'],
  EXE: ['#20283c', '#7a86a0'], VOLC: ['#2a1418', '#a04a30'], GLOBE: ['#05060f', '#141a34'], VILLA: ['#141a28', '#3a4a5e'], LIB: ['#1e140e', '#4a3024'],
  CINE: ['#0e080c', '#2a141c'], CAVE: ['#0c1a18', '#2a4a40'], BLOOD: ['#2a4a7a', '#6a9ad0'], MAP: ['#0f1630', '#1b2a55'],
};
const LT = { CASTLE: [0.55, 0.5, '#b8c0ff'], POL: [0.8, 0.85, '#fff4e0'], VIL: [0.45, 0.45, '#a8b8ff'], MED: [0.75, 0.7, '#e8f0ff'], LAB: [0.6, 0.8, '#c8fff4'], EXE: [0.7, 0.65, '#e0e8ff'],
  VOLC: [0.55, 0.7, '#ffb080'], GLOBE: [0.7, 0.9, '#ffffff'], VILLA: [0.55, 0.55, '#c0ccff'], LIB: [0.7, 0.75, '#ffd8a8'], CINE: [0.5, 0.6, '#ffd0d8'], CAVE: [0.8, 0.8, '#d8fff0'], BLOOD: [0.85, 0.85, '#ffffff'], MAP: [0.8, 0.8, '#ffffff'] };
function bgAt(t) { return BG[stAt(t)]; }

const vis = (o, on) => { o.visible = !!on; };
const ss = (o, k) => { o.scale.setScalar(Math.max(0.0001, k)); o.visible = k > 0.002; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const BUB = [];
let FLASH = 0;
const pop = (k) => U.easeBack(U.clamp(k));

function update(t, s, { camera, W, H }) {
  BUB.length = 0; FLASH = 0; const id = beatAt(t), stN = stAt(t);
  for (const k in s.st) s.st[k].visible = k === stN;
  { const l = LT[stN]; s.hemi.intensity = l[0]; s.sun.intensity = l[1]; s.sun.color.set(l[2]); }
  s.fog.color.set(BG[stN][1]); s.fog.near = stN === 'VOLC' ? 60 : stN === 'MAP' ? 60 : 30; s.fog.far = stN === 'VOLC' || stN === 'MAP' ? 160 : 90;
  s.pt.intensity = 0;
  const r = rk(t, id);

  /* ---------- CASTLE ---------- */
  if (stN === 'CASTLE') { const C = s.c.castle;
    C.bats.forEach((b, i) => { const a = t * 0.6 + i * 0.9, rr = 4 + (i % 3) * 1.4; b.position.set(Math.cos(a) * rr, 7.5 + Math.sin(t * 1.3 + i) * 0.8 + (i % 2) * 1.5, -8 + Math.sin(a) * rr * 0.6); b.rotation.y = -a; flap(b, t + i); });
    C.castle.userData.wins.forEach((w, i) => (w.material.color.setHSL(0.11, 1, 0.55 + 0.12 * Math.sin(t * 3 + i * 2))));
    C.fog.forEach((f, i) => { f.position.x = -10 + ((i * 4 + t * 0.4) % 24); });
    const ct = C.count; rest(ct); ct.visible = true; face(ct, 0.25, 1);
    ct.userData.cape.rotation.y = Math.sin(t * 1.2) * 0.06; ct.userData.head.rotation.y = Math.sin(t * 0.8) * 0.15;
    if (id === 'hook1') { armUp(ct, 'R', 0.55 * sm(0.4, 1.0, r), -0.4); armUp(ct, 'L', 0.2 * sm(0.4, 1.0, r)); }
    if (id === 'cover' || id === 'recap' || id === 'ask') armUp(ct, 'R', 0.45, -0.4);
    let lid = 1; if (id === 'hook2') lid = sm(0.3, 1.3, r); C.coffin.userData.lid.rotation.z = -2.1 * U.easeOut(lid);
    C.peasant.userData.head.rotation.z = Math.sin(t * 1.5) * 0.06;
    let q = 0, cv = 1; if (id === 'cliff4') { q = pop(sm(0.3, 0.8, r)); cv = pop(sm(2.4, 3.0, r)); if (r > 2.4) FLASH = 0.35 * (1 - sm(2.4, 2.9, r)); }
    ss(C.q, q * 1.5); C.q.position.y = 3.7 + Math.sin(t * 3) * 0.1;
    ct.scale.setScalar(Math.max(0.001, 1.25 * cv)); ct.visible = cv > 0.01;
    if (id === 'cliff4' && r > 2.6) BUB.push({ o: ct, dy: 2.6, txt: 'หล่อขึ้นได้ไง?', c: '#fff' });
    if (id === 'hook2' && r > 1.6) BUB.push({ o: C.coffin, dy: 2.7, dx: 0, txt: 'ตัวจริงหน้าตาแบบนี้', c: '#fff' });
  }

  /* ---------- POL ---------- */
  if (stN === 'POL') { const C = s.c.pol;
    C.arch.forEach((a, i) => { rest(a); a.userData.arms.R.rotation.set(-1.0 + Math.sin(t * 6 + i) * 0.25, 0, 0.3); a.userData.head.rotation.x = 0.25; });
    const gS = id === 'zosia2' ? sm(0.3, 1.0, r) : 0, gL = id === 'zosia2' ? sm(2.7, 3.3, r) : 0;
    C.glowS.material.opacity = gS * (0.6 + 0.3 * Math.sin(t * 5)); C.glowL.material.opacity = gL * (0.6 + 0.3 * Math.sin(t * 5));
    if (id === 'zosia2' && r > 0.8 && r < 2.6) BUB.push({ o: C.sickle, dy: 0.7, txt: 'เคียว', c: '#fff' });
    if (id === 'zosia2' && r > 3.2) BUB.push({ o: C.lock, dy: 0.6, txt: 'แม่กุญแจ', c: '#fff' });
  }

  /* ---------- MAP ---------- */
  if (stN === 'MAP') { const C = s.c.map;
    const show = { pien: inB(t, 'zosia1') || (inB(t, 'map1') && r < 0.8), kis: inB(t, 'map1') && r > 1.2, med: between(t, 'spread', 'spread') || inB(t, 'ex1'), vienna: inB(t, 'spread'), paris: inB(t, 'spread') && r > 1.6, london: inB(t, 'spread') && r > 2.2,
      exeter: inB(t, 'ex1') && r > 1.8, tambora: inB(t, 'hook3') || inB(t, 'tam1'), bkk: inB(t, 'hook3') && r > 1.6, bats: inB(t, 'bat1') && r > 1.0 };
    for (const k in C.pins) { const on = !!show[k]; C.pins[k].visible = on; C.pins[k].position.y = 0.3 + 0.08 * Math.sin(t * 3 + k.length); if (C.labs[k]) vis(C.labs[k], on); }
    const dr = (ln, k) => { ln.geometry.setDrawRange(0, Math.round(U.clamp(k) * 61)); ln.visible = k > 0; return k; };
    const kTb = dr(C.arcs.tb, inB(t, 'hook3') ? sm(1.6, 3.0, r) : 0), kPk = dr(C.arcs.pk, inB(t, 'map1') ? sm(0.1, 1.3, r) : 0), kMe = dr(C.arcs.me, inB(t, 'ex1') ? sm(0.2, 1.8, r) : 0);
    const kKv = dr(C.arcs.kv, inB(t, 'spread') ? sm(0.3, 1.3, r) : 0), kVp = dr(C.arcs.vp, inB(t, 'spread') ? sm(1.3, 2.2, r) : 0), kVl = dr(C.arcs.vl, inB(t, 'spread') ? sm(1.8, 2.9, r) : 0);
    let mv = null; if (inB(t, 'map1') && kPk > 0 && kPk < 1) mv = [C.arcs.pk, kPk]; else if (inB(t, 'ex1') && kMe > 0 && kMe < 1) mv = [C.arcs.me, kMe]; else if (inB(t, 'hook3') && kTb > 0 && kTb < 1) mv = [C.arcs.tb, kTb];
    if (mv) { C.mover.position.copy(mv[0].userData.pts[Math.round(mv[1] * 60)]); C.mover.visible = true; } else C.mover.visible = false;
    [[C.arcs.kv, kKv], [C.arcs.vp, kVp], [C.arcs.vl, kVl]].forEach((q, i) => { const p = C.papers[i]; p.visible = q[1] > 0; if (p.visible) { p.position.copy(q[0].userData.pts[Math.round(q[1] * 60)]); p.position.y += 0.6; p.rotation.y = Math.sin(t * 2 + i) * 0.3; } });
    let rc = null; if (inB(t, 'hook3') || inB(t, 'tam1')) rc = 'tambora'; else if (inB(t, 'zosia1')) rc = 'pien'; else if (inB(t, 'bat1')) rc = 'bats'; else if (inB(t, 'ex1') && r > 1.8) rc = 'exeter'; else if (inB(t, 'map1') && r > 1.2) rc = 'kis';
    if (rc) { const [x, z] = mapXZ(PL[rc][0], PL[rc][1]); C.ring.position.set(x - ST.MAP[0], 0.45, z); const k = (t * 1.2) % 1; C.ring.scale.setScalar(0.6 + k * 1.6); C.ring.material.opacity = 0.9 * (1 - k); C.ring.visible = true; } else C.ring.visible = false;
    for (const nm in C.reg.meshes) { const me = C.reg.meshes[nm].material; let e = 0;
      if (nm === 'Thailand' && (inB(t, 'hook3') || inB(t, 'tam1'))) e = 0.35 + 0.2 * Math.sin(t * 4);
      if (nm === 'Indonesia' && (inB(t, 'hook3') || inB(t, 'tam1'))) e = 0.3;
      if (nm === 'Poland' && inB(t, 'zosia1')) e = 0.35; if (nm === 'Serbia' && (inB(t, 'map1') || inB(t, 'spread'))) e = 0.4;
      if (nm === 'United States of America' && inB(t, 'ex1')) e = 0.3; if (['Mexico', 'Guatemala', 'Honduras', 'Nicaragua', 'Brazil', 'Colombia', 'Venezuela', 'Peru'].includes(nm) && inB(t, 'bat1')) e = 0.3;
      me.emissive.set(nm === 'Thailand' ? P.coral : '#6f7aff'); me.emissiveIntensity = e; }
  }

  /* ---------- VIL ---------- */
  if (stN === 'VIL') { const C = s.c.vil;
    const nDead = inB(t, 'petar2') ? Math.min(9, Math.floor(sm(0.3, 3.6, r) * 9 + 0.0001)) : t >= end('petar2') ? 9 : 0;
    C.graves.forEach((g, i) => { const k = inB(t, 'petar2') ? sm(0.3 + i * 0.37, 0.6 + i * 0.37, r) : t >= end('petar2') ? 1 : 0; ss(g, 0.85 * pop(k)); C.dream[i].material.opacity = inB(t, 'petar2') ? 0.8 * sm(0.3 + i * 0.37, 0.45 + i * 0.37, r) * (1 - sm(0.7 + i * 0.37, 1.1 + i * 0.37, r)) : 0; });
    C.huts.forEach((h, i) => { const dark = i < Math.ceil(nDead / 2); h.userData.win.material.color.set(dark ? '#2a2a3a' : '#ffd27a'); });
    /* ghost */
    let gv = 0; if (inB(t, 'petar1')) gv = sm(1.2, 2.6, r); if (inB(t, 'petar2')) gv = 1 - sm(3.8, 4.8, r);
    C.ghost.visible = gv > 0.01; if (C.ghost.visible) { const gx = inB(t, 'petar2') ? U.lerp(-1.2, 9.0, sm(0.2, 4.0, r)) : -1.2; C.ghost.position.set(gx, 0.3 + gv * 0.9 + Math.sin(t * 2) * 0.15, inB(t, 'petar2') ? -1.6 : -2.2); C.ghost.scale.setScalar(Math.max(0.001, gv)); face(C.ghost, inB(t, 'petar2') ? 1 : 0, 1); armUp(C.ghost, 'R', 0.4, -0.8); armUp(C.ghost, 'L', 0.4, -0.8); }
    /* villagers */
    C.vills.forEach((v, i) => { rest(v); face(v, i < 2 ? 0.6 : -0.6, 1); v.userData.torch.userData.f.scale.y = 1 + 0.2 * Math.sin(t * 9 + i); armUp(v, 'R', 0.35, -0.3);
      if (inB(t, 'fromb')) { armUp(v, 'R', 0.55 + 0.15 * Math.sin(t * 7 + i), -0.3); }
      if (between(t, 'dig', 'stake')) face(v, (i < 2 ? 1 : -1) * 0.9, 0.4); });
    /* Frombald */
    const fv = t >= at('fromb'); C.from.visible = fv; if (fv) { rest(C.from); const k = inB(t, 'fromb') ? U.easeOut(sm(0.2, 1.8, r)) : 1; C.from.position.set(U.lerp(-7, -2.4, k), 0, 1.8); face(C.from, k < 1 ? 1 : 0.3, k < 1 ? 0 : 1); if (k < 1 && k > 0) walk(C.from, t, 1);
      if (between(t, 'dig', 'stake')) face(C.from, 0.9, 0.2); }
    if (inB(t, 'fromb') && r > 1.6 && r < 3.6) BUB.push({ o: C.vills[0], dy: 2.2, txt: 'ขุดเลย! ไม่งั้นย้ายหนี', c: '#ffb3b3' });
    if (inB(t, 'fromb') && r > 3.4) BUB.push({ o: C.from, dy: 2.3, txt: '…ก็ได้', c: '#fff' });
    /* coffin, stake, fire */
    const cv = t >= at('dig') && t < at('stake') + ph('stake', 3.2); C.coffin.visible = cv; C.dirt.visible = t >= at('dig') && t < end('stake');
    if (cv) { C.coffin.userData.lid.rotation.z = -2.1 * U.easeOut(inB(t, 'dig') ? sm(0.3, 1.3, r) : 1); C.corpse.userData.blood.scale.setScalar(1 + 0.15 * Math.sin(t * 5)); }
    if (inB(t, 'dig') && r > 2.0) BUB.push({ o: C.coffin, dy: 1.6, txt: 'ไม่เน่าเลย!', c: '#ffb3b3' });
    const sk = inB(t, 'stake') ? sm(0.5, 1.0, r) : 0; C.stake.visible = inB(t, 'stake') && r < 3.2; C.stake.position.set(0.05, U.lerp(3.5, 0.55, U.easeIO(sk)), 1.6);
    if (inB(t, 'stake') && r > 1.0 && r < 1.6) { C.flash.material.opacity = 0.9 * (1 - sm(1.0, 1.6, r)); FLASH = 0.5 * (1 - sm(1.0, 1.5, r)); } else C.flash.material.opacity = 0;
    const fk = inB(t, 'stake') ? sm(2.0, 3.0, r) : inB(t, 'news') ? 1 - sm(0.5, 2.0, r) * 0.7 : 0; ss(C.fire, 1.6 * fk); if (fk > 0) { C.fire.userData.f.scale.y = 1 + 0.25 * Math.sin(t * 11); s.pt.intensity = 1.2 * fk; s.pt.position.set(ST.VIL[0], 2.5, 2.4); }
    /* newspaper */
    const pk = inB(t, 'news') ? U.easeIO(sm(0.4, 2.6, r)) : 0; C.paper.visible = pk > 0; if (pk > 0) { C.paper.position.set(0, U.lerp(1.4, 3.1, pk), U.lerp(1.4, 6.2, pk)); C.paper.rotation.set(0, (1 - pk) * 4, (1 - pk) * 0.6); C.paper.scale.setScalar(U.lerp(0.3, 1, pk)); }
  }

  /* ---------- MED ---------- */
  if (stN === 'MED') { const C = s.c.med;
    C.graves.forEach((g, i) => { const k = inB(t, 'paole1') ? sm(0.4 + i * 0.17, 0.6 + i * 0.17, r) : t >= end('paole1') ? 1 : 0; ss(g, 0.72 * pop(k)); });
    const gv = inB(t, 'paole2') ? sm(0.2, 1.4, r) : inB(t, 'fluck') ? 1 - sm(0.0, 1.0, r) : 0; C.ghost.visible = gv > 0.01;
    if (C.ghost.visible) { C.ghost.position.set(0, 0.2 + gv * 0.6 + Math.sin(t * 2) * 0.12, -1.0); C.ghost.scale.setScalar(Math.max(0.001, 1.1 * gv)); face(C.ghost, 0, 1); rest(C.ghost); armUp(C.ghost, 'R', 0.3, -0.6); }
    if (inB(t, 'paole2') && r > 1.6) BUB.push({ o: C.ghost, dy: 2.4, txt: 'ทหารที่ตกเกวียนตาย', c: '#fff' });
    C.docs.forEach((d, i) => { const k = inB(t, 'fluck') ? U.easeOut(sm(0.1 + i * 0.2, 1.6 + i * 0.2, r)) : t >= end('fluck') ? 1 : 0; d.visible = t >= at('fluck'); rest(d); d.position.set(U.lerp(-8, -0.6 + i * 1.3, k), 0, 2.4 - i * 0.2); face(d, k < 1 ? 1 : 0.6, k < 1 ? 0 : 0.6); if (k > 0 && k < 1) walk(d, t + i, 1); });
    const sk = inB(t, 'fluck') ? sm(2.6, 2.9, r) : t >= end('fluck') ? 1 : 0; C.seal.visible = sk > 0; C.seal.scale.setScalar(sk > 0 ? 1 + 0.6 * (1 - sk) : 0.001);
    C.quill.rotation.x = Math.sin(t * 10) * 0.15;
    if (inB(t, 'fluck') && r > 3.0) BUB.push({ o: C.docs[2], dy: 2.3, txt: 'ยืนยัน… เป็นแวมไพร์', c: '#ffb3b3' });
    const pos = C.snow.geometry.attributes.position, sd = C.snowSeed; for (let i = 0; i < pos.count; i++) { const y = 9 - ((sd[i * 3 + 1] * 9 + t * (0.6 + sd[i * 3] * 0.5)) % 9); pos.setXYZ(i, (sd[i * 3] - 0.5) * 24 + Math.sin(t + i) * 0.2, y, (sd[i * 3 + 2] - 0.5) * 16); } pos.needsUpdate = true;
  }

  /* ---------- LAB ---------- */
  if (stN === 'LAB') { const C = s.c.lab;
    C.body.position.set(-0.5, 1.55, 0); C.body.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
    let inf = 0; if (inB(t, 'sci1')) inf = U.easeOut(sm(0.5, 3.0, r)); else if (between(t, 'sci2', 'myth')) inf = 1; else if (inB(t, 'sci4')) inf = 1 - sm(1.2, 2.6, r);
    C.belly.position.set(-0.95, 1.72 + inf * 0.1, 0); C.belly.scale.set(1 + inf * 0.7, 1 + inf * 0.7, 1 + inf * 0.7);
    C.bub.forEach((b, i) => { const on = inB(t, 'sci1') && r > 0.4; b.visible = on; if (on) { const k = ((r - 0.4) * 0.5 + i / 14) % 1; b.position.set(-0.95 + Math.sin(i * 2.1) * 0.35, 1.55 + k * 0.6, Math.cos(i * 1.7) * 0.3); b.material.opacity = 0.85 * (1 - k); } });
    C.drips.forEach((d, i) => { const on = inB(t, 'sci2'); d.visible = on && r > 0.8; if (on) { const k = ((r - 0.8) * 0.7 + i * 0.25) % 1; d.position.set(-1.6 + i * 0.03, 1.85 - k * 0.7, 0.33); d.scale.setScalar(0.5); } });
    const pk = inB(t, 'sci2') ? sm(1.0, 3.5, r) : between(t, 'sci3', 'sci4') ? 1 : 0; ss(C.puddle, pk); C.puddle.position.set(-1.6, 1.112, 0.45);
    const sr = inB(t, 'sci3') ? U.easeIO(sm(0.8, 3.2, r)) : inB(t, 'myth') ? 1 : 0; C.skin.position.y = 2.25 - 0.42 * sr; C.ruler.visible = between(t, 'sci3', 'myth');
    C.lens.visible = between(t, 'sci3', 'myth'); C.lens.rotation.z = t;
    if (inB(t, 'myth') && r > 1.2) BUB.push({ o: C.finger, dy: 4.0, dx: -0.6, txt: 'เล็บไม่ได้งอก ผิวหดต่างหาก', c: '#fff' });
    const st = inB(t, 'sci4') ? sm(0.3, 0.9, r) : 0; C.st.visible = inB(t, 'sci4'); C.st.position.set(-1.0, U.lerp(3.8, 1.5, U.easeIO(st)), 0); C.st.rotation.z = 0;
    C.puff.forEach((p, i) => { const k = inB(t, 'sci4') ? sm(1.0 + i * 0.15, 2.6 + i * 0.15, r) : 0; p.material.opacity = k > 0 && k < 1 ? 0.7 * (1 - k) : 0; p.position.set(-1.55 + k * 0.4 * Math.sin(i), 1.95 + k * 1.8, Math.cos(i * 2) * k * 0.5); p.scale.setScalar(0.4 + k * 1.2); });
    C.rings.forEach((g, i) => { const k = inB(t, 'sci4') ? ((r - 1.0) * 0.9 + i / 3) % 1 : 0; const on = inB(t, 'sci4') && r > 1.0 && r < 4.2; g.visible = on; g.material.opacity = on ? 0.8 * (1 - k) : 0; g.scale.setScalar(0.4 + k * 2.4); g.position.set(-1.5, 2.0, 0); g.rotation.set(0, 0, 0); });
    if (inB(t, 'sci4') && r > 1.2) BUB.push({ o: C.body, dy: 0.2, dx: -1.2, txt: 'อ๊าาา…', c: '#fff', big: true });
    ss(C.q, inB(t, 'cliff2') ? 1.3 * pop(sm(0.6, 1.1, r)) : 0); C.q.position.y = 2.75 + Math.sin(t * 3) * 0.1;
  }

  /* ---------- EXE ---------- */
  if (stN === 'EXE') { const C = s.c.exe;
    const pos = C.snow.geometry.attributes.position, sd = C.snowSeed; for (let i = 0; i < pos.count; i++) { const y = 9 - ((sd[i * 3 + 1] * 9 + t * (0.5 + sd[i * 3] * 0.4)) % 9); pos.setXYZ(i, (sd[i * 3] - 0.5) * 24 + Math.sin(t * 0.7 + i) * 0.3, y, (sd[i * 3 + 2] - 0.5) * 16); } pos.needsUpdate = true;
    ss(C.stones.mercy, 0.9 * pop(t >= at('ex3') ? sm(ph('ex3', 2.6), ph('ex3', 3.1), rel(t, 'ex3')) + (t >= end('ex3') ? 1 : 0) : 0));
    ss(C.stones.edwin, 0.9 * pop(t >= at('ex7') ? sm(ph('ex7', 1.6), ph('ex7', 2.1), rel(t, 'ex7')) + (t >= end('ex7') ? 1 : 0) : 0));
    [C.george, C.mercy, C.edwin].forEach((c) => { rest(c); face(c, 0, 1); });
    const mv = inB(t, 'ex3') ? 1 - sm(1.0, 2.6, r) : t < at('ex3') ? 1 : 0; C.mercy.visible = mv > 0.01; C.mercy.scale.setScalar(Math.max(0.001, 0.95 * mv)); C.mercy.position.y = (1 - mv) * 1.2;
    const ev = inB(t, 'ex7') ? 1 - sm(0.3, 1.6, r) : t < at('ex7') ? 1 : 0; C.edwin.visible = ev > 0.01; C.edwin.scale.setScalar(Math.max(0.001, 1.0 * ev)); C.edwin.position.y = (1 - ev) * 1.2;
    let cough = null; if (inB(t, 'ex2')) cough = [C.mercy, 0]; if (inB(t, 'ex4')) cough = [C.edwin, 0];
    C.cough.forEach((p, i) => { const k = cough ? ((r * 0.9 + i / 3) % 1) : 0; p.visible = !!cough; if (cough) { cough[0].updateMatrixWorld(true); cough[0].getWorldPosition(s.v); p.position.set(s.v.x - ST.EXE[0] + 0.1, 1.35 + k * 0.5, s.v.z + 0.45 + k * 0.4); p.material.opacity = 0.7 * (1 - k); p.scale.setScalar(0.25 + k * 0.4); } });
    if (cough) cough[0].userData.head.rotation.x = 0.15 * Math.max(0, Math.sin(t * 7));
    C.george.userData.head.rotation.x = between(t, 'ex7', 'ex8') ? 0.35 : 0.1; if (inB(t, 'ex3') || inB(t, 'ex7')) face(C.george, 0.4, 0.6);
    /* men + crypt */
    C.men.forEach((m, i) => { rest(m); const k = inB(t, 'ex5') ? U.easeOut(sm(0.3 + i * 0.2, 2.0 + i * 0.2, r)) : t >= end('ex5') ? 1 : 0; m.visible = between(t, 'ex5', 'ex6'); m.position.set(U.lerp(2 + i * 1.2, 7.2 + i * 0.7, k), 0, U.lerp(1.6, 0.0 - i * 0.3, k)); face(m, k < 1 ? 1 : 0.2, k < 1 ? -0.3 : -1); if (k > 0 && k < 1) walk(m, t + i, 1); m.userData.arms.R.rotation.set(-0.3, 0, 0.3); });
    C.cdoor.rotation.y = inB(t, 'ex5') ? -1.6 * sm(2.4, 3.4, r) : t >= end('ex5') ? -1.6 : 0; C.cdoor.position.x = Math.sin(-C.cdoor.rotation.y) * 0.4;
    if (inB(t, 'ex5') && r > 3.2) BUB.push({ o: C.crypt, dy: 2.9, txt: 'ศพยังไม่เน่า!', c: '#ffb3b3' });
    const fk = inB(t, 'ex6') ? sm(0.2, 1.0, r) : 0; ss(C.fire, fk); if (fk > 0) { C.fire.userData.f.scale.y = 1 + 0.25 * Math.sin(t * 11); s.pt.intensity = fk; s.pt.position.set(ST.EXE[0] + 3.6, 2, 2.4); }
    C.cup.visible = inB(t, 'ex6') && r > 2.0;
    if (inB(t, 'ex6')) { const k = sm(2.2, 3.4, r); C.edwin.userData.arms.R.rotation.set(-1.6 * k, 0, 0.14 - 0.5 * k); }
    if (inB(t, 'ex2') && r > 1.8) BUB.push({ o: C.mercy, dy: 2.1, txt: 'แค่กๆ', c: '#fff' });
    if (inB(t, 'ex4') && r > 1.0) BUB.push({ o: C.edwin, dy: 2.2, txt: 'แค่กๆๆ', c: '#ffb3b3' });
  }

  /* ---------- VOLC ---------- */
  if (stN === 'VOLC') { const C = s.c.volc;
    const e = inB(t, 'tam1') ? sm(ph('tam1', 2.6), ph('tam1', 4.8), rel(t, 'tam1')) * 0.45 : inB(t, 'tam2') ? 0.45 + 0.55 * sm(0, 4.0, r) : 0;
    C.ash.forEach((p, i) => { const k = (t * 0.25 + i / 26) % 1; const spread = 1 + e * 6; p.position.set(Math.sin(i * 2.3) * k * 3 * spread, 7.8 + k * (6 + e * 14), -4 + Math.cos(i * 1.7) * k * 2 * spread); const sc = (1.5 + k * 5) * (0.4 + e * 1.4); p.scale.set(sc, sc, 1); p.material.opacity = Math.min(0.9, e * 2) * (1 - k * 0.55); p.visible = e > 0.01; });
    C.glow.material.opacity = 0.5 + 0.4 * Math.sin(t * 6) * 0.5 + e * 0.3; s.pt.intensity = 1.5; s.pt.position.set(ST.VOLC[0], 9, 0);
    C.lava.forEach((l, i) => { l.scale.y = 0.6 + 0.4 * sm(0, 1, e * 2 - i * 0.1); });
  }

  /* ---------- GLOBE ---------- */
  if (stN === 'GLOBE') { const C = s.c.globe;
    const k = inB(t, 'tam3') ? U.easeIO(sm(0.2, 3.6, r)) : 1; C.g.rotation.y = FK.faceLon(U.lerp(118, 12, k)); C.g.rotation.x = U.lerp(0.05, 0.55, k);
    C.veil.material.opacity = 0.15 + 0.45 * k; C.sun.material.opacity = 1 - 0.65 * k;
    C.snow.forEach((f, i) => { const q = (t * 0.25 + i / 14) % 1; f.position.set(-1.6 + (i % 7) * 0.5, 4.2 - q * 2.6, 3.2); f.material.opacity = k * 0.9 * (1 - q); f.visible = k > 0.4; });
  }

  /* ---------- VILLA ---------- */
  if (stN === 'VILLA') { const C = s.c.villa;
    const pos = C.rain.geometry.attributes.position, sd = C.rain.userData.seed; for (let i = 0; i < pos.count / 2; i++) { const x = (sd[i * 3] - 0.5) * 26, z = (sd[i * 3 + 2] - 0.5) * 16 + 2, y = 10 - ((sd[i * 3 + 1] * 10 + t * 9) % 10); pos.setXYZ(i * 2, x, y, z); pos.setXYZ(i * 2 + 1, x - 0.05, y - 0.5, z); } pos.needsUpdate = true;
    for (const lt of [[at('dio1') + ph('dio1', 1.2)], [at('dio2') + ph('dio2', 3.2)], [at('chain') + ph('chain', 0.6)]]) { const d = t - lt[0]; if (d > 0 && d < 0.5) { FLASH = Math.max(FLASH, 0.45 * (1 - d / 0.5) * (d < 0.08 || d > 0.16 ? 1 : 0.3)); s.hemi.intensity = 0.55 + 1.2 * (1 - d / 0.5); } }
    C.candle.userData.f.scale.y = 0.45 * (1 + 0.15 * Math.sin(t * 13)); s.pt.intensity = 0.9; s.pt.position.set(ST.VILLA[0], 2.4, -1.5);
    [C.byron, C.mary, C.percy, C.poli].forEach((p, i) => { rest(p); p.userData.head.rotation.y = Math.sin(t * 0.9 + i) * 0.25; if (inB(t, 'dio2')) armUp(p, i % 2 ? 'R' : 'L', 0.25 + 0.15 * Math.sin(t * 5 + i), -0.6); });
    const fk = inB(t, 'dio3') ? pop(sm(0.6, 1.2, r)) : between(t, 'poli1', 'chain') ? 1 : 0; C.frank.visible = fk > 0.01; C.frank.position.y = 1.15 + (inB(t, 'dio3') ? 0.35 * sm(0.6, 1.4, r) : 0); C.frank.scale.setScalar(Math.max(0.001, fk));
    if (inB(t, 'poli1')) { armFwd(C.poli, 'R', 0.6 + 0.08 * Math.sin(t * 12)); }
    const vk = inB(t, 'poli1') ? pop(sm(0.6, 1.2, r)) : between(t, 'poli2', 'chain') ? 1 : 0; C.vbook.visible = vk > 0.01; C.vbook.scale.setScalar(Math.max(0.001, vk)); C.vbook.position.y = 1.15 + (inB(t, 'poli1') ? 0.4 * sm(0.6, 1.3, r) : 0.4);
    const rv = inB(t, 'poli1') ? sm(1.6, 3.0, r) : inB(t, 'poli2') || inB(t, 'chain') ? 1 : 0; C.ruth.visible = rv > 0.01; C.ruth.scale.setScalar(Math.max(0.001, 1.15 * rv)); C.ruth.position.set(0, 1.25 + Math.sin(t * 1.6) * 0.08, -0.2); C.ruth.rotation.y = Math.sin(t * 0.7) * 0.4; rest(C.ruth); armUp(C.ruth, 'R', 0.35, -0.6);
    C.ruthGlow.material.opacity = 0.6 * rv; C.ruthGlow.position.set(0, 2.5, -0.2);
    const mk2 = inB(t, 'poli2') ? pop(sm(0.2, 0.8, r)) : 0; C.mag.visible = mk2 > 0.01; C.mag.scale.setScalar(Math.max(0.001, 0.75 * mk2)); C.mag.position.set(0.0, 2.6, 3.0);
    const sk = inB(t, 'poli2') ? pop(sm(1.8, 2.2, r)) : 0; C.stamp.visible = sk > 0.01; C.stamp.scale.setScalar(Math.max(0.001, sk)); C.stamp.position.set(0.3, 1.95, 3.08); C.stamp.scale.multiplyScalar(0.8); C.stamp.rotation.z = -0.18;
    C.stack.forEach((b, i) => { const k = inB(t, 'poli2') ? pop(sm(2.6 + i * 0.18, 2.9 + i * 0.18, r)) : inB(t, 'chain') ? 1 : 0; ss(b, k); b.position.set(2.6, 0.4 + i * 0.19, 3.2); });
  }

  /* ---------- LIB ---------- */
  if (stN === 'LIB') { const C = s.c.lib;
    rest(C.stoker); face(C.stoker, 0, 1); armFwd(C.stoker, 'R', 0.7 + (between(t, 'dra1', 'dra2') ? 0.08 * Math.sin(t * 12) : 0));
    if (inB(t, 'dra3')) C.stoker.userData.head.rotation.y = Math.sin(t * 6) * 0.35 * (1 - sm(2.4, 3.2, r));
    const n1 = inB(t, 'dra2') ? pop(sm(0.2, 0.7, r)) * (1 - sm(2.6, 3.0, r)) : 0; C.name1.visible = n1 > 0.01; C.name1.scale.setScalar(Math.max(0.001, n1));
    const sk = inB(t, 'dra2') ? sm(1.4, 1.9, r) * (1 - sm(2.6, 3.0, r)) : 0; C.strike.visible = sk > 0.01; C.strike.scale.set(Math.max(0.001, sk), 1, 1);
    const n2 = inB(t, 'dra2') ? pop(sm(2.8, 3.3, r)) : 0; C.name2.visible = n2 > 0.01; C.name2.scale.setScalar(Math.max(0.001, n2));
    if (inB(t, 'dra1') && r > 1.4) BUB.push({ o: C.stoker, dy: 2.3, txt: 'ตัวร้ายชื่ออะไรดี…', c: '#fff' });
    /* count + harker */
    const cv = t >= at('dra4'); C.count.visible = cv; C.harker.visible = inB(t, 'dra4');
    if (cv) { rest(C.count); C.count.userData.cape.rotation.y = Math.sin(t * 1.2) * 0.06;
      if (inB(t, 'dra4')) { C.count.position.set(1.6, 0, -2.0); face(C.count, 0.5, -1); C.harker.position.set(4.6, 0, -2.0); face(C.harker, -0.5, -1); rest(C.harker);
        const rc = sm(2.6, 3.0, r); if (rc > 0) { face(C.count, -0.6, 1); C.count.position.x = 1.6 - 0.3 * rc; C.count.rotation.x = -0.12 * rc; armUp(C.count, 'L', 0.5 * rc, -0.8); }
        if (r > 1.0 && r < 2.6) BUB.push({ o: C.mirror, dy: 4.3, txt: 'เงาแดร็กคูล่า… หายไป!', c: '#fff' });
        if (r > 3.0) BUB.push({ o: C.count, dy: 2.7, txt: 'กระเทียม! ไม่เอา!', c: '#ffb3b3' }); }
      if (inB(t, 'dra5')) { const k = sm(0.6, 4.2, r); C.count.rotation.x = 0; C.count.position.set(U.lerp(-1.2, 2.6, k), 0, 1.3); face(C.count, 1, 0.2); walk(C.count, t * 0.6, 0.6); } }
    C.refl.visible = inB(t, 'dra4');
    C.garlic.forEach((g, i) => { const k = inB(t, 'dra4') ? pop(sm(2.3 + i * 0.08, 2.6 + i * 0.08, r)) : inB(t, 'dra5') ? 1 : 0; ss(g, k); });
    const bk = inB(t, 'dra5') ? sm(0.2, 1.0, r) : 0; C.beam.material.opacity = 0.22 * bk; C.beam.visible = bk > 0; C.sun.material.opacity = bk;
  }

  /* ---------- CINE ---------- */
  if (stN === 'CINE') { const C = s.c.cine;
    C.proj.material.opacity = 0.05 + 0.02 * Math.sin(t * 23); C.back.material.color.setScalar(0.33 + 0.03 * Math.sin(t * 17));
    C.aud.forEach((a, i) => { rest(a); a.userData.head.rotation.z = Math.sin(t * 1.3 + i) * 0.05; if (inB(t, 'nos2') && r > 1.8) armUp(a, i % 2 ? 'L' : 'R', 0.5 * sm(1.8, 2.2, r), -0.5); });
    const o = C.orlok; rest(o); let dis = 0; if (inB(t, 'nos2')) dis = sm(1.8, 3.8, r); if (t >= end('nos2')) dis = 1;
    if (t < at('nos2') || inB(t, 'nos2')) { face(o, 0, 1); armUp(o, 'R', 0.4, -1.0); armUp(o, 'L', 0.4, -1.0); o.userData.arms.R.rotation.z += Math.sin(t * 3) * 0.08; }
    if (inB(t, 'nos2')) { face(o, sm(0.8, 1.6, r) * 0.8, 1); }
    o.visible = dis < 0.98; o.scale.setScalar(Math.max(0.001, 1.35 * (1 - dis * 0.9))); o.position.y = 0.15 + dis * 0.3;
    o.traverse((m) => { if (m.material && m.material.color && m !== o) { m.material.transparent = true; m.material.opacity = 1 - dis; } });
    const rk2 = inB(t, 'nos2') ? sm(0.8, 1.6, r) : t >= end('nos2') ? 0.8 : 0; C.ray.material.opacity = 0.55 * rk2; C.winF.material.color.set(rk2 > 0.1 ? '#e8e8e8' : '#2a2a2a');
    const pos = C.dust.geometry.attributes.position, sd = C.dustSeed; for (let i = 0; i < pos.count; i++) { const k = U.clamp(dis * 1.3 - sd[i * 3] * 0.3); pos.setXYZ(i, 0.6 + (sd[i * 3 + 1] - 0.5) * 1.2 + k * (sd[i * 3 + 2] - 0.5) * 2, 0.4 + sd[i * 3] * 2.2 + k * 3, 0.3 + (sd[i * 3 + 2] - 0.5) * 0.6); } pos.needsUpdate = true; C.dust.visible = dis > 0.02 && dis < 1 && inB(t, 'nos2'); C.dust.material.opacity = 1 - sm(0.7, 1, dis);
    /* court */
    const g1 = inB(t, 'nos3') ? Math.max(0, Math.sin(U.clamp((r - 0.6) / 0.5) * Math.PI)) + Math.max(0, Math.sin(U.clamp((r - 1.3) / 0.5) * Math.PI)) : 0; C.gavel.rotation.z = 0.9 * g1;
    const fk = inB(t, 'nos3') ? sm(1.7, 2.4, r) : 0; ss(C.rf, fk); if (fk > 0) { C.rf.userData.f.scale.y = 1 + 0.25 * Math.sin(t * 11); s.pt.intensity = fk; s.pt.position.set(ST.CINE[0] + 6.8, 2.4, 1.6); }
    C.reels.forEach((rl, i) => { rl.visible = !(i > 0 && inB(t, 'nos3') && r > 2.8) && !(i > 0 && t >= end('nos3')); if (i === 0) { const k = inB(t, 'nos3') ? U.easeOut(sm(2.2, 3.4, r)) : t >= end('nos3') ? 1 : 0; rl.position.set(5.3 - k * 0.2, 1.88, 0.5 + k * 0.7); rl.rotation.z = k * 6; } });
    { const rl = C.reels[0]; C.safe.position.copy(rl.position); C.safe.material.opacity = inB(t, 'nos3') ? sm(3.0, 3.6, r) * 0.9 : 0; }
    if (inB(t, 'nos3') && r > 3.4) BUB.push({ o: C.reels[0], dy: 0.9, txt: 'รอด!', c: '#fff' });
    if (inB(t, 'nos1') && r > 2.0) BUB.push({ o: C.aud[2], dy: 1.9, txt: 'ว้าย!', c: '#fff' });
  }

  /* ---------- CAVE ---------- */
  if (stN === 'CAVE') { const C = s.c.cave;
    C.bats.forEach((b, i) => { flap(b, t + i, 2.5); b.userData.wings[0].rotation.y = 1.25 + Math.sin(t * 2 + i) * 0.12; b.userData.wings[1].rotation.y = -1.25 - Math.sin(t * 2 + i) * 0.12; b.position.y = 4.6; b.rotation.z = Math.PI + Math.sin(t + i) * 0.05; });
    const hb = C.hungry; if (inB(t, 'bat2')) { hb.rotation.z = Math.PI + Math.sin(t * 20) * 0.06 * sm(1.6, 2.2, r); hb.scale.setScalar(1.25 * (1 - 0.15 * sm(0.5, 3.5, r))); } else hb.scale.setScalar(1.25 * (inB(t, 'bat3') ? 0.85 + 0.15 * sm(3.0, 4.0, r) : 1));
    const fp = inB(t, 'bat3') ? U.easeOut(sm(0.3, 1.2, r)) : 0; C.friend.position.x = -3.2 + 3 * 1.6 + fp * 0.55;
    const fl = inB(t, 'bat1') || inB(t, 'bat2'); C.flyer.visible = fl; if (fl) { const a = t * 1.4; C.flyer.position.set(Math.cos(a) * 3.0, 2.8 + Math.sin(a * 2) * 0.5, -0.6 + Math.sin(a) * 1.2); C.flyer.rotation.y = -a; flap(C.flyer, t); }
    const dk = inB(t, 'bat3') ? sm(1.4, 3.0, r) : 0; C.drop.visible = dk > 0 && dk < 1; C.friend.updateMatrixWorld(true); C.friend.getWorldPosition(s.v); const fx = s.v.x - ST.CAVE[0]; hb.getWorldPosition(s.v); const hx = s.v.x - ST.CAVE[0];
    C.drop.position.set(U.lerp(fx, hx, dk), 4.3 + Math.sin(dk * Math.PI) * 0.35, -1.9); C.drop.rotation.z = Math.PI; C.drop.scale.setScalar(0.8);
    ss(C.heart, inB(t, 'bat3') ? 1.2 * pop(sm(3.1, 3.5, r)) : 0); C.heart.position.set((fx + hx) / 2, 3.2 + Math.sin(t * 3) * 0.1, -1.8);
    if (inB(t, 'bat2') && r > 1.6) BUB.push({ o: hb, dy: -1.3, txt: 'หิว… คืนที่ 3', c: '#fff' });
    if (inB(t, 'bat3') && r > 0.8 && r < 3.0) BUB.push({ o: C.friend, dy: -1.3, txt: 'เอานี่ไป', c: '#fff' });
  }

  /* ---------- BLOOD ---------- */
  if (stN === 'BLOOD') { const C = s.c.blood;
    C.donor.userData.arms.R.rotation.set(-0.3, 0, 1.3); C.donor.userData.head.rotation.z = 0;
    rest(C.nurse); armFwd(C.nurse, 'R', 0.5 + 0.1 * Math.sin(t * 2));
    const fill = inB(t, 'th1') ? sm(0.4, 4.0, r) : 1; C.bag.children[0].scale.y = 0.35 + 0.65 * fill; C.bag.children[0].position.y = 0.35 * (0.35 + 0.65 * fill) + (1 - (0.35 + 0.65 * fill)) * 0.35 * 0;
    C.bags.forEach((b, i) => { const k = inB(t, 'th1') ? pop(sm(0.6 + i * 0.13, 0.9 + i * 0.13, r)) : 1; ss(b, 0.62 * k); });
    const bv = inB(t, 'th2'); C.bat.visible = bv; C.heart.visible = bv && r > 2.2; if (bv) { const k = U.easeOut(sm(0.2, 1.8, r)); C.bat.position.set(U.lerp(6, 0.8, k), 3.0 + Math.sin(t * 3) * 0.2, U.lerp(2, 1.0, k)); flap(C.bat, t); C.bat.rotation.y = -0.4; C.heart.position.set(0.8, 4.0 + Math.sin(t * 3) * 0.1, 1.0); C.heart.scale.setScalar(1.0 * pop(sm(2.2, 2.6, r)) + 0.001); }
    if (inB(t, 'th1') && r > 1.4) BUB.push({ o: C.donor, dy: 2.1, dx: 0.6, txt: 'ไม่เจ็บเลย', c: '#fff' });
    C.drop.rotation.y = t * 0.8;
  }

  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, stN === 'MAP' || stN === 'GLOBE' ? 0.05 : 0.12);
  if (inB(t, 'tam2')) { camera.position.x += Math.sin(t * 37) * 0.05; camera.position.y += Math.sin(t * 29) * 0.05; }
  camera.updateMatrixWorld(true);
  const v = s.v;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
