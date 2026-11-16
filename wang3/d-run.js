const ZK = 1.45;
/* Part D: camera, update */
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const mfr = (lon, lat, ly, d, h, sx) => { const [x, z] = mapXZ(lon, lat); const look = [x, ly, z]; return { look, pos: [x + (sx || 0), ly + h * 1.25, z + d * 1.25], fov: 40 }; };
const KO = fr('KAP', 0, 6.2, -2.6, 27, 4.2, 0);
const kp = (k, d, h, sx) => fr('KAP', PAL[k][0], 4.6, PAL[k][1], d || 12.5, h || 2.6, sx || 0);
const SHOT = {
  cover: [[0, KO]], hook1: [[0, kp('W', 12, 2.4, -0.6)], [1.6, kp('S', 13, 2.6, 0)], [3.2, kp('R', 12, 2.4, 0.6)]],
  hook2: [[0, fr('GATE', 0, 2.6, 0.5, 13, 2.6, 0.4)]], hook3: [[0, fr('KAP', 0, 5.6, -1.6, 23, 3.6, 0)]],
  map1: [[0, mfr(88, 21, 0.3, 17, 21, 0)], [2.4, mfr(PL.kap[0], PL.kap[1] + 1.6, 0.5, 6, 7.5, 0)]],
  seasons: [[0, mfr(91, 19, 0.4, 15, 19, 0)]],
  birth: [[0, fr('BIRTH', 0, 3.4, 0.8, 11.5, 2.6, 0)]], fear: [[0, fr('BIRTH', -0.6, 3.6, 1.2, 13.5, 3.2, 0)]],
  build: [[0, fr('KAP', 0, 5.4, -2.6, 25, 5, 0)]], tiers: [[0, KO]],
  wprof: [[0, kp('W', 13, 2.6)]], w1: [[0, fr('WIN', 0.6, 1.7, -0.3, 8.6, 1.6, 0)]], w2: [[0, fr('WIN', -1.8, 1.8, -1.4, 7.2, 0.9, -0.6)]],
  w3: [[0, fr('WIN', 1.6, 1.3, 0.3, 7.4, 2.0, 0.4)]], w4: [[0, fr('WIN', 2.0, 1.8, -1.4, 7.4, 1.0, 0.6)]],
  sprof: [[0, kp('S', 13, 2.6)]], s1: [[0, fr('SUM', 0, 3.0, 0, 12.5, 2.6, 0)]], s2: [[0, fr('SUM', -1.0, 1.4, -1.0, 8.4, 2.0, 0)]],
  s3: [[0, fr('SUM', -3.6, 5.6, -0.6, 11.5, 4.2, -0.6)]], s4: [[0, fr('SUM', 0.6, 2.6, 0.4, 10.5, 2.0, 0)]],
  s5: [[0, fr('SUM', 3.0, 7.0, -0.6, 7.4, 2.2, 0)], [3.4, fr('SUM', 0.8, 4.4, 0, 14.5, 2.2, 0)]], s7: [[0, fr('SUM', 0, 3.4, -1.6, 8.2, 0.4, 0)]],
  m1: [[0, fr('HOUSE', 0, 1.8, -0.4, 9.6, 2.0, 0)]], m2: [[0, fr('HOUSE', 0.4, 1.9, -0.4, 9.0, 1.8, 0.4)]],
  rprof: [[0, kp('R', 13, 2.6)]], r1: [[0, fr('RAIN', 1.2, 2.2, 0, 12, 2.4, 0)]],
  r3: [[0, fr('RAIN', 1.8, 1.9, 0, 10.5, 2.0, 0.6)]], r4: [[0, fr('RAIN', 0, 1.3, 0.4, 9.2, 2.4, 0)]],
  c2: [[0, fr('KAP', 0.5, 2.9, 7.4, 10, 1.8, 0)]],
  p1: [[0, fr('PLEA', 0, 2.0, -0.6, 12.5, 3.2, 0)]], p2: [[0, fr('PLEA', 0, 1.9, -2.2, 8.5, 1.8, 0.3)]], p3: [[0, fr('PLEA', 0, 2.2, -0.4, 13.5, 3.6, 0)]], p4: [[0, fr('PLEA', -0.2, 2.2, -2.8, 8.5, 3.4, 0)]],
  t5b: [[0, fr('PLEA', 0, 1.8, -0.8, 11, 4.0, 0)]],
  q1: [[0, fr('KAP', 0, 2.6, 3.5, 9.5, 2.2, 0)]], q2: [[0, fr('ROAD', -5, 1.9, 2.4, 12, 2.4, 0)], [2.4, fr('ROAD', 7, 1.9, 2.4, 12, 2.4, 0)]], q3: [[0, fr('GATE', 0, 2.2, 3.0, 10, 1.8, -0.6)]], q4: [[0, fr('KAP', 0, 2.8, 3.8, 11, 2.4, 0)]],
  t1: [[0, fr('KAP', 0, 2.4, 4.0, 11, 2.0, 0)]], t2: [[0, fr('KAP', -0.8, 2.0, 4.2, 9.5, 1.6, -0.4)]], t3: [[0, fr('KAP', 0, 2.0, 4.4, 10.5, 1.8, 0.4)]],
  t4: [[0, fr('KAP', 0.4, 2.8, 4.0, 10, 1.6, 0)]],
  t5: [[0, fr('ROAD', -6, 1.9, 1.8, 11, 2.4, 0)], [2.0, fr('ROAD', 3.5, 1.9, 1.8, 11.5, 2.4, 0)]],
  t6: [[0, fr('GATE', 0, 2.6, 0.5, 14, 3.0, -0.4)]], t7: [[0, fr('KAP', 0, 6.0, -3.0, 29, 5, 0)]],
  f1: [[0, fr('KAP', 11, 2.2, 4.6, 10.5, 2.2, 0)]], f2: [[0, fr('HALL', 1.2, 1.9, 0.6, 9.5, 2.2, 0)]], f3: [[0, fr('KAP', 2, 5.4, -1, 24, 5, 0)]],
  f5: [[0, fr('KAP', 0, 3.6, -1.6, 21, 7, 0)]],
  g1: [[0, mfr(83.5, 26.6, 0.4, 7.5, 9.5, 0)]], g2: [[0, mfr(PL.kap[0], PL.kap[1] + 0.9, 0.5, 4.2, 5.2, 0)]],
  g3: [[0, fr('HALL', 0, 3.4, -0.6, 15, 6, 0)]], g4: [[0, fr('HALL', 0, 2.6, -2.8, 8.5, 2.2, 0)]], g5: [[0, mfr(82.4, 27.4, 0.4, 6.5, 8.5, 0)]],
  l1: [[0, fr('HALL', 0, 3.4, -0.6, 15, 6, 0)]], l2: [[0, fr('HALL', 0, 2.4, -1.2, 10.5, 3.4, 0)]],
  moral: [[0, fr('KAP', 0, 3.4, -1.0, 21, 6, 0)]], moral2: [[0, fr('KAP', 0, 7.2, -0.6, 23, 2.6, 0)]], recap: [[0, KO]], ask: [[0, KO]],
};
const CUT = new Set(['hook2', 'hook3', 'map1', 'g3', 'g5', 'birth', 'build', 'w1', 'sprof', 's1', 'm1', 'rprof', 'r1', 'p1', 'c2', 'p2', 't1', 't5', 't5b', 't6', 't7', 'q1', 'q2', 'q3', 'q4', 'f2', 'f3', 'l1']);
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const segsS = SHOT[id];
    segsS.forEach((sg, j) => {
      const t0 = at(id) + sg[0] * dur(id) / BEATS[ORDER.indexOf(id)][1], t1 = j + 1 < segsS.length ? at(id) + segsS[j + 1][0] * dur(id) / BEATS[ORDER.indexOf(id)][1] : end(id), f = sg[1], fe = push(f, 0.93);
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
const BG = { temple: ['#1a0d0a', '#4a1e14'], map: ['#0f1630', '#1b2a55'], day: ['#2a4a85', '#8fc0e8'], night: ['#070b1e', '#16224a'], dusk: ['#2a1a40', '#d0806a'], room: ['#3a2a20', '#7a5a40'] };
const NIGHT = ['hook2', 't1', 't2', 't3', 't4', 't5b', 't6'];
const DUSK = ['f1', 'f2', 'f3', 'moral'];
function bgKey(t) {
  const id = beatAt(t);
  if (NIGHT.includes(id)) return 'night';
  if (['map1', 'seasons', 'g1', 'g2', 'g5'].includes(id)) return 'map';
  if (DUSK.includes(id)) return 'dusk';
  return 'day';
}
function bgAt(t) { return BG[bgKey(t)]; }

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const P3 = (st, x, y, z) => [ST[st][0] + x, ST[st][1] + y, ST[st][2] + z];
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
/* day 0..1 night inside a beat: day first half, night second half */
const dn = (t, id, a, b) => sm(a, b, ph(t, id, BEATS[ORDER.indexOf(id)][1]));
function skyCol(o, k, day, night) { o.material.color.set(day).lerp(new T.Color(night), k); }

function update(t, s, { camera, W, H }) {
  BUB.length = 0; const id = beatAt(t), bk = bgKey(t);
  { const LT = { night: [0.62, 0.55, '#b8c8ff'], dusk: [0.6, 0.7, '#ffc0a0'], temple: [0.7, 0.7, '#ffe0c0'], map: [0.8, 0.8, '#ffffff'], day: [0.72, 0.9, '#fff4e0'] }[bk]; s.hemi.intensity = LT[0]; s.sun.intensity = LT[1]; s.sun.color.set(LT[2]); }
  s.fog.color.set(bgAt(t)[1]); s.fog.near = bk === 'night' ? 24 : 40;
  const K = s.kap, night = bk === 'night';
  /* ---------- KAP ---------- */
  { const bRel = inB(t, 'build') ? ph(t, 'build', 6) : t >= end('build') ? 9 : 9;
    const rf3 = inB(t, 'f3') ? ph(t, 'f3', 6.4) : -1;
    ['W', 'S', 'R'].forEach((k, i) => { let g = inB(t, 'build') ? U.easeOut(sm(0.6 + i * 1.3, 2.2 + i * 1.3, bRel)) : 1, tilt = 0;
      if (rf3 >= 0) { const q = sm(2.2 + i * 0.5, 3.6 + i * 0.5, rf3); g = 1 - q * q; tilt = q * 0.35 * (i % 2 ? -1 : 1); }
      if (inB(t, 'f5') || inB(t, 'moral')) g = 0;
      if (inB(t, 'moral2')) g = U.easeOut(sm(0.3 + i * 0.35, 1.4 + i * 0.35, ph(t, 'moral2', 5.6)));
      K.pal[k].scale.set(0.85, Math.max(0.01, 0.85 * g), 0.85); K.pal[k].rotation.z = tilt; K.pal[k].visible = g > 0.02; });
    K.ruins.visible = (rf3 > 3.0) || inB(t, 'f5') || inB(t, 'moral');
    /* army + Vidudabha (f1, f3) */
    const armyOn = inB(t, 'f1') || inB(t, 'f3'); const ra = inB(t, 'f1') ? ph(t, 'f1', 5.4) / 5.4 : rf3 >= 0 ? rf3 / 6.4 : 0;
    const front = inB(t, 'f1') ? U.lerp(18, 9.5, ra) : U.lerp(9.5, 3.5, U.clamp(ra * 1.6));
    vis(K.vh, armyOn); vis(K.vk, armyOn);
    if (armyOn) { setP(K.vh, 'KAP', front, 0, 5.4); K.vh.rotation.y = Math.PI; gallop(K.vh, t, 0.5); setSit(K.vk, true); rest(K.vk); K.vk.position.set(K.vh.position.x, 1.15, K.vh.position.z); K.vk.rotation.y = -Math.PI / 2; K.vk.scale.setScalar(0.85);
      if (inB(t, 'f1') && ra > 0.45) BUB.push({ o: K.vk, dy: 2.4, txt: 'วิฑูฑภะ', c: '#fff' }); }
    K.army.forEach((c, i) => { vis(c, armyOn); if (!armyOn) return; const row = Math.floor(i / 4), col = i % 4; setP(c, 'KAP', front + 1.8 + row * 1.2, 0, 3.8 + col * 1.1); c.rotation.y = -Math.PI / 2; walk(c, t + i * 0.3, 0.8); c.userData.arms.R.rotation.set(0, 0, 0.3); });
    K.dust.forEach((d, i) => { const q = rf3 >= 0 ? sm(2.2 + (i % 3) * 0.5, 4.6 + (i % 3) * 0.5, rf3) : 0; d.visible = q > 0 && q < 1; const k3 = ['W', 'S', 'R'][i % 3]; setP(d, 'KAP', PAL[k3][0] + (i > 2 ? 1.2 : -1.2), 1 + q * 3, PAL[k3][1] + 1); d.scale.setScalar(2 + q * 5); d.material.opacity = 0.7 * (1 - q); });
    K.workers.forEach((w, i) => { const on = inB(t, 'build'); vis(w, on); if (on) { const a = t * 0.8 + i * 1.05; setP(w, 'KAP', Math.cos(a) * (6 + (i % 2) * 2), 0, 1.0 + Math.sin(a) * 1.4); face(w, -Math.sin(a), Math.cos(a)); walk(w, t + i, 1); } });
    const pop = (o, on, t0) => { o.visible = on; if (on) o.scale.multiplyScalar(1); };
    ['W', 'S', 'R'].forEach((k, i) => {
      const lt = inB(t, 'tiers') && ph(t, 'tiers', 5.4) > 0.6 + i * 0.6; pop(K.labs[k], lt);
      vis(K.names[k], (inB(t, 'hook3') && ph(t, 'hook3', 4.6) > 1.0 + i * 0.4) || (inB(t, 'build') && bRel > 4.6));
      vis(K.nums[k], inB(t, 'ask') && ph(t, 'ask', 5.6) > 0.5 + i * 0.4);
      vis(K.life[k], inB(t, 'moral2') && ph(t, 'moral2', 5.6) > 1.6 + i * 0.4);
      for (const grp of [K.labs, K.life]) grp[k].position.y = (k === 'S' ? 9.4 : 8.6) + 0.12 * Math.sin(t * 3 + i); setP(K.nums[k], 'KAP', PAL[k][0], 3.4 + 0.12 * Math.sin(t * 3 + i), PAL[k][1] + 3.2);
    });
    const dayK = !night; const snowOn = dayK; K.snow.visible = snowOn;
    if (snowOn) { const pos = K.snow.geometry.attributes.position; K.snowSeed.forEach((q, i) => { const yy = 8.8 * (1 - ((q[1] + t * 0.11) % 1)); pos.setXYZ(i, PAL.W[0] + q[0] + Math.sin(t + i) * 0.25, yy, PAL.W[1] + q[2]); }); pos.needsUpdate = true; }
    K.rain.visible = dayK; if (dayK) rainAt(K.rain, t, 7, 0.4);
    K.sunS.visible = K.sunCore.visible = dayK; K.sunS.scale.setScalar(5 + 0.4 * Math.sin(t * 2));
    vis(K.cloud, dayK); vis(K.cloudW, dayK);
    /* dome (t7) + ghosts walking through it */
    const d7 = inB(t, 't7') ? ph(t, 't7', 6) : -1; K.dome.visible = d7 >= 0; K.dome.material.opacity = 0.3 * sm(0.2, 1.0, d7);
    /* prince */
    const P0 = K.prince; let pOn = false; rest(P0); P0.rotation.set(0, 0, 0);
    if (['cover', 'hook1', 'hook3', 'tiers'].includes(id)) { pOn = true; setP(P0, 'KAP', 0, 0, 3.5); face(P0, 0, 1); P0.userData.arms.R.rotation.z = 0.14 + (id === 'hook3' ? 0 : 0); if (id === 'hook3' && ph(t, 'hook3', 4.6) > 0.8) BUB.push({ o: P0, dy: 2.2, txt: '?', c: '#fff', big: true }); }
    if (inB(t, 'c2')) { pOn = true; const k = ph(t, 'c2', 5.6) / 5.6; setP(P0, 'KAP', U.lerp(-3.4, 2.6, k), 0, 7.4); face(P0, 1, 0.15); walk(P0, t * 0.6, 0.5); }
    if (between(t, 't1', 't4')) { pOn = true; setP(P0, 'KAP', 0.9, 0, 3.6); face(P0, -0.6, 1); P0.userData.head.rotation.x = inB(t, 't1') ? 0.0 : 0.15;
      if (inB(t, 't1') && ph(t, 't1', 5) > 1.4) BUB.push({ o: P0, dy: 2.3, txt: '…', c: '#fff', big: true }); }
    const cq1 = inB(t, 'q1') ? ph(t, 'q1', 5) : -1, cq4 = inB(t, 'q4') ? ph(t, 'q4', 6) : -1;
    if (cq1 >= 0 || cq4 >= 0) { pOn = true; const out = cq4 >= 0 ? U.easeIO(sm(2.2, 4.4, cq4)) : 0; setP(P0, 'KAP', 0, 0, 3.5 + out * 2.4); face(P0, 0, 1); if (out > 0 && out < 1) walk(P0, t, 0.8);
      if (cq1 >= 0 && cq1 > 1.4) BUB.push({ o: P0, dy: 2.2, txt: '?', c: '#fff', big: true }); }
    { const on = cq1 >= 0 || cq4 >= 0; K.cage.visible = on; if (on) { const drop = cq1 >= 0 ? U.easeOut(sm(0.2, 1.0, cq1)) : 1; setP(K.cage, 'KAP', 0, (1 - drop) * 6, 3.5); const open = cq4 >= 0 ? U.easeIO(sm(0.6, 2.0, cq4)) : 0;
      K.cage.children.forEach((b) => { if (b.userData.a == null) return; const front = Math.sin(b.userData.a) > 0.5; b.scale.y = front ? Math.max(0.01, 1 - open) : 1; b.position.y = front ? 1.5 * b.scale.y + (1 - b.scale.y) * 3.0 : 1.5; }); } }
    vis(P0, pOn);
    const brOn = inB(t, 'c2'); vis(K.bearer, brOn); vis(K.para, brOn);
    if (brOn) { K.bearer.position.copy(P0.position).add(new T.Vector3(-1.1, 0, -0.5)); face(K.bearer, 1, 0.15); walk(K.bearer, t * 0.6 + 0.4, 0.5); K.bearer.userData.arms.R.rotation.set(-0.3, 0, 2.2); K.para.position.copy(P0.position).add(new T.Vector3(-0.35, 0.4, -0.2)); K.para.rotation.z = -0.12; }
    /* ghosts: t2 old, t3 sick + dead; t7 all three walk through the dome */
    const gp = [[-2.6, 0, 4.6], [-1.6, 0, 6.2], [2.6, 0, 6.0]];
    K.ghosts.forEach((g, i) => { let on = false, k = 0;
      if (between(t, 't2', 't4')) { const st = i === 0 ? at('t2') + 0.6 : at('t3') + 0.6 + (i - 1) * 1.2; k = U.easeOut(sm(st, st + 0.8, t)); on = k > 0; setP(g, 'KAP', gp[i][0], 0, gp[i][1]);
        if (i === 1) { g.rotation.set(0, 0, Math.PI / 2); g.position.y += 0.4; } else if (i === 0) face(g, 0.6, 1); else g.rotation.set(0, 0.3, 0);
        if (inB(t, 't4')) k *= 1 - sm(4.8, 6.0, ph(t, 't4', 6.4)); }
      if (d7 >= 0) { on = true; const q = sm(0.8 + i * 0.5, 4.8 + i * 0.5, d7); k = 1 - sm(5.0, 5.9, d7); const ang = 2.6 - i * 2.0; const r = U.lerp(15, 4.5, q); setP(g, 'KAP', Math.cos(ang) * r, 0, -3.6 + Math.sin(ang) * r * 0.5 + 3); g.rotation.set(i === 1 ? 0 : 0, 0, i === 1 ? 0 : 0); if (i === 0) face(g, -Math.cos(ang), -Math.sin(ang)); if (i !== 2) walk(g, t + i, 0.8); }
      g.visible = on && k > 0.01; g.scale.setScalar(Math.max(0.001, k) * (i === 2 ? 0.9 : 1));
      const lb = K.ghostLabs[i]; lb.visible = g.visible && (between(t, 't2', 't3') || d7 >= 0); lb.position.set(g.position.x, (i === 2 ? 2.2 : 2.6) + (i === 1 ? -0.2 : 0), g.position.z);
    });
    /* badges (t4): pop above the prince, then crack into gold dust */
    const r4 = inB(t, 't4') ? ph(t, 't4', 6.4) : -1;
    K.badges.forEach((b, i) => { const sh = sm(3.4 + i * 0.35, 3.7 + i * 0.35, r4); const k = r4 >= 0 ? U.easeBack(sm(0.4 + i * 0.4, 0.9 + i * 0.4, r4)) * (1 - sh) : 0; b.visible = k > 0.01; b.scale.set(b.userData.sx || (b.userData.sx = b.scale.x), b.userData.sy || (b.userData.sy = b.scale.y), 1); b.scale.x = b.userData.sx * k; b.scale.y = b.userData.sy * k; setP(b, 'KAP', -0.9, 3.7 - i * 0.95, 4.2); });
    K.shards.visible = r4 > 3.4 && r4 < 6.0;
    if (K.shards.visible) { const pos = K.shards.geometry.attributes.position; K.shardSeed.forEach((q, i) => { const k0 = sm(3.4 + q[3] * 0.35, 6.0, r4); pos.setXYZ(i, ST.KAP[0] - 0.9 + q[0] * (1.6 + 3 * k0), 3.7 - q[3] * 0.95 + q[1] * 0.4 - k0 * k0 * 3.0, 4.2 + q[2] * 2 * k0); }); pos.needsUpdate = true; K.shards.material.opacity = 0.9 * (1 - sm(5.0, 6.0, r4)); }
    /* modern person (moral) */
    const mOn = between(t, 'moral', 'moral2'); vis(K.modern, mOn); if (mOn) { setP(K.modern, 'KAP', 0, 0, 7.0); face(K.modern, 0, 1); rest(K.modern); if (inB(t, 'moral2')) { K.modern.userData.arms.R.rotation.set(-0.2, 0, 2.4); } }
    /* night sky */
    K.stars.material.opacity = night ? 0.9 : 0; K.stars.position.x = ST[{ hook2: 'GATE', t6: 'GATE' }[id] || 'KAP'][0];
    K.moon.visible = K.moonG.visible = night; const mst = { hook2: 'GATE', t6: 'GATE' }[id] || 'KAP'; setP(K.moon, mst, -7, 14, -20); setP(K.moonG, mst, -7, 14, -20.5);
  }
  /* ---------- map ---------- */
  { const m = s.map, on = between(t, 'map1', 'seasons'); const pk = inB(t, 'map1') ? U.easeBack(sm(2.2, 2.8, ph(t, 'map1', 5.6))) : inB(t, 'seasons') ? 1 : 0;
    m.pin.visible = pk > 0.01; m.pin.scale.setScalar(Math.max(0.01, pk)); m.pin.position.y = 0.4 + 0.08 * Math.sin(t * 3);
    vis(m.lab, inB(t, 'map1') && ph(t, 'map1', 5.6) > 2.8); m.mini.visible = inB(t, 'map1') && ph(t, 'map1', 5.6) > 3.2;
    vis(m.np, inB(t, 'map1') && ph(t, 'map1', 5.6) < 2.4); vis(m.ind, inB(t, 'map1') && ph(t, 'map1', 5.6) < 2.4); vis(m.th, inB(t, 'seasons'));
    for (const nm in s.reg.meshes) { const me = s.reg.meshes[nm].material; let e = 0; me.emissive = me.emissive || new T.Color();
      if (nm === 'Nepal' && inB(t, 'map1')) e = 0.3; if (nm === 'Thailand' && inB(t, 'seasons')) e = 0.35 + 0.15 * Math.sin(t * 4); if (nm === 'India' && inB(t, 'seasons')) e = 0.2;
      me.color.set(nm === 'Thailand' && inB(t, 'seasons') ? P.coral : nm === 'India' ? '#35609c' : nm === 'Nepal' ? '#5a7ad0' : P.land); me.emissive.set(nm === 'Thailand' ? P.coral : '#5f7ae0'); me.emissiveIntensity = e; }
    void on; }
  /* ---------- birth courtyard ---------- */
  { const Bq = s.birth, rb = inB(t, 'birth') ? ph(t, 'birth', 5.6) : -1, rf = inB(t, 'fear') ? ph(t, 'fear', 5) : -1;
    const ic = rb >= 0 ? U.easeBack(sm(1.6, 2.2, rb)) : rf >= 0 ? 1 - sm(0.2, 0.8, rf) : 0;
    for (const [o, lb, sx] of [[Bq.crownI, Bq.labA, -1], [Bq.bowlI, Bq.labB, 1]]) { o.visible = ic > 0.01; o.scale.setScalar(Math.max(0.01, ic)); setP(o, 'BIRTH', sx * 1.5, 3.1 + 0.15 * Math.sin(t * 3 + sx), 1.0); o.rotation.y = t * 0.8; lb.visible = ic > 0.5 && rb > 2.4; setP(lb, 'BIRTH', sx * 1.5, 4.2, 1.0); }
    if (Bq.bowlI.visible) Bq.bowlI.rotation.x = Math.PI;
    rest(Bq.sage); face(Bq.sage, -0.6, 1); Bq.sage.userData.arms.L.rotation.set(-0.9, 0, -0.5 - 0.3 * Math.sin(t * 3)); rest(Bq.king);
    if (rf >= 0) { const k = sm(0.6, 4.6, rf); const x = -1.6 + Math.sin(k * Math.PI * 2) * 1.4; setP(Bq.king, 'BIRTH', x, 0.3, 1.8); face(Bq.king, Math.cos(k * Math.PI * 2) > 0 ? 1 : -1, 0.3); walk(Bq.king, t, 0.7); Bq.king.userData.arms.L.rotation.set(-1.6, 0, 0.4);
      if (rf > 1.2) BUB.push({ o: Bq.king, dy: 2.4, txt: 'ลูกต้องสุขที่สุด!', c: '#fff' }); }
    else { setP(Bq.king, 'BIRTH', -1.6, 0.3, 0.6); face(Bq.king, 0.6, 1); }
    const gw = rf >= 0 ? U.easeOut(sm(1.6, 3.6, rf)) : t >= end('fear') ? 1 : 0; Bq.gate.scale.set(1, Math.max(0.01, gw), 1); Bq.gate.visible = gw > 0.01; }
  /* ---------- winter room ---------- */
  { const Wr = s.win, on = between(t, 'w1', 'w4');
    Wr.glow.material.opacity = inB(t, 'w2') ? 0.4 + 0.3 * Math.sin(t * 4) : 0.25;
    const rw = inB(t, 'w1') ? ph(t, 'w1', 5) : -1; Wr.warm.visible = on;
    if (on) { const pos = Wr.warm.geometry.attributes.position; Wr.warmSeed.forEach((q, i) => { const k = (q[1] + t * 0.25) % 1, yy = Math.min(3.0, 0.4 + k * 4.2); pos.setXYZ(i, ST.WIN[0] + q[0], yy - (yy >= 3.0 ? Math.sin(t * 2 + i) * 0.05 : 0), q[2] - 0.5); }); pos.needsUpdate = true; Wr.warm.material.opacity = rw >= 0 ? 0.9 : 0.35; }
    rest(Wr.p); lapHands(Wr.p); Wr.p.rotation.y = 0;
    if (inB(t, 'w2')) { Wr.p.rotation.y = -0.6 * sm(0.4, 1.4, ph(t, 'w2', 5.4)); }
    if (inB(t, 'w3')) { const r = ph(t, 'w3', 5.2); Wr.p.rotation.y = 0.7; Wr.p.userData.arms.R.rotation.set(-1.2 - Math.max(0, Math.sin(r * 4)) * 0.4, 0, 0.2); if (r > 2.6) BUB.push({ o: Wr.p, dy: 2.1, dx: -0.3, txt: 'อุ่นท้อง~', c: '#fff' }); }
    Wr.steam.forEach((sp, i) => { const u = (t * 0.5 + i / 4) % 1; sp.visible = on; setP(sp, 'WIN', 2.2 + Math.sin(i * 2 + t) * 0.12, 0.95 + u * 1.3, 0.9); sp.scale.setScalar(0.4 + u * 0.7); sp.material.opacity = 0.55 * (1 - u); });
    /* window: day open -> night closed (w4); other beats: open day */
    const k4 = inB(t, 'w4') ? dn(t, 'w4', 2.4, 3.2) : 0; Wr.win.userData.set(inB(t, 'w4') ? 1 - k4 : 0.9); skyCol(Wr.win.userData.sky, k4, '#8fc8ff', '#14204a');
    Wr.sunW.visible = on; Wr.sunW.material.color.set(k4 > 0.5 ? '#fff6d8' : '#ffd070'); setP(Wr.sunW, 'WIN', 2.7, 2.15 - k4 * 0.2, -2.6); Wr.sunW.scale.setScalar(k4 > 0.5 ? 0.6 : 0.9);
    const cOn = inB(t, 'w4') && k4 > 0.6; Wr.cold.visible = cOn;
    if (cOn) { const pos = Wr.cold.geometry.attributes.position, r = ph(t, 'w4', 5.6); Wr.coldSeed.forEach((q, i) => { const u = (q[0] + r * 0.6) % 1; const z = -2.0 + u * 1.2; pos.setXYZ(i, ST.WIN[0] + 2.4 + q[2] * 0.8, 1.8 + q[1], u < 0.5 ? -1.5 - u : -2.5 + (u - 0.5) * 0.0 + z * 0); }); pos.needsUpdate = true; }
  }
  /* ---------- summer room ---------- */
  { const Sm = s.sum, on = between(t, 's1', 's7');
    const r3 = inB(t, 's3') ? ph(t, 's3', 5.6) : -1, rainK = between(t, 's4', 's5') ? 1 : inB(t, 's3') ? sm(4.4, 5.4, r3) : 0;
    Sm.rain.visible = on && rainK > 0; if (Sm.rain.visible) { rainAt(Sm.rain, t, 5.5, 0.3); setP(Sm.rain, 'SUM', 0, 0, 0); Sm.rain.material.opacity = 0.75 * rainK; }
    Sm.bells.forEach((b, i) => { b.rotation.z = Math.sin(t * 2.2 + i) * (between(t, 's1', 's5') ? 0.25 : 0.08); b.rotation.x = Math.sin(t * 1.7 + i * 2) * 0.12; });
    Sm.spray.visible = on; if (on) { const pos = Sm.spray.geometry.attributes.position; for (let i = 0; i < 80; i++) { const u = (i / 80 + t * 0.7) % 1, a = i * 2.4; const r = u * 0.8; pos.setXYZ(i, ST.SUM[0] - 2.2 + Math.cos(a) * r, 0.5 + Math.sin(u * Math.PI) * 1.4, 1.0 + Math.sin(a) * r); } pos.needsUpdate = true; }
    /* wind through the netted windows */
    const wOn = on && (inB(t, 's1') || inB(t, 's2') || (inB(t, 's7') && dn(t, 's7', 2.4, 3.0) > 0.5)); Sm.wind.visible = wOn;
    if (wOn) { const pos = Sm.wind.geometry.attributes.position; Sm.windSeed.forEach((q, i) => { const u = (q[0] + t * 0.45) % 1; const x0 = i % 2 ? -2.6 : 2.6; pos.setXYZ(i, ST.SUM[0] + x0 + q[2] * 0.5 + Math.sin(u * 5 + i) * 0.4, 3.0 + q[1] + Math.sin(u * 3) * 0.3, -2.6 + u * 5.2); }); pos.needsUpdate = true; }
    /* pump (s3): worker turns the wheel, water climbs the pipe, tank fills */
    Sm.wheel.rotation.z = inB(t, 's3') ? -t * 4 : 0; rest(Sm.pumper); face(Sm.pumper, 1, 0.6);
    if (inB(t, 's3')) { Sm.pumper.userData.arms.R.rotation.set(-1.2 + Math.sin(t * 4) * 0.5, 0, 0.2); Sm.pumper.userData.arms.L.rotation.set(-1.2 - Math.sin(t * 4) * 0.5, 0, -0.2); }
    Sm.tank.scale.y = 0.4 + 0.6 * (inB(t, 's3') ? sm(0.6, 4.0, r3) : t > end('s3') ? 1 : 0.4);
    /* pebbles onto the stretched hide (s5, s6) */
    const rp = inB(t, 's5') ? ph(t, 's5', 6) : -1; rest(Sm.dropper); face(Sm.dropper, -1, 0);
    let boomK = 0;
    Sm.pebbles.forEach((pb, i) => { const t0 = 1.0 + i * 0.75; const u = rp >= 0 ? sm(t0, t0 + 0.55, rp) : 0; pb.visible = rp >= t0 - 0.3 && u < 1; setP(pb, 'SUM', 3.8 - u * 1.0, 8.6 - u * u * 1.4, -0.6 + (i % 3 - 1) * 0.3); if (u >= 1 && rp < t0 + 1.0) boomK = Math.max(boomK, 1 - (rp - t0 - 0.55) / 0.45); });
    if (rp >= 0) { const thr = Math.max(0, Math.sin((rp - 1.3) * 7)); Sm.dropper.userData.arms.R.rotation.set(-1.0 - thr * 0.8, 0, 0.3); }
    Sm.boom.material.opacity = 0.8 * boomK; Sm.boom.scale.setScalar(1 + (1 - boomK) * 2.5); Sm.hideTop.position.y = 0.52 - boomK * 0.06;
    rest(Sm.p); lapHands(Sm.p); Sm.p.userData.head.rotation.x = between(t, 's4', 's5') ? -0.35 : 0;
    if (inB(t, 's5') && ph(t, 's5', 6) > 3.6) BUB.push({ o: Sm.p, dy: 2.0, dx: -0.4, txt: 'ครืนน… ครืนน…', c: '#fff' });
    if (inB(t, 's4') && ph(t, 's4', 5) > 1.6) BUB.push({ o: Sm.p, dy: 2.0, dx: -0.4, txt: 'ฝนตก…ในบ้าน!', c: '#fff' });
    const k7 = inB(t, 's7') ? dn(t, 's7', 2.4, 3.0) : 0; Sm.win.userData.set(inB(t, 's7') ? k7 : 0.9); skyCol(Sm.win.userData.sky, k7, '#ffe08a', '#14204a');
    const hOn = inB(t, 's7') && k7 < 0.5; Sm.heat.visible = hOn;
    if (hOn) { const pos = Sm.heat.geometry.attributes.position; for (let i = 0; i < 80; i++) { const u = (i / 80 + t * 0.6) % 1; pos.setXYZ(i, ST.SUM[0] + Math.sin(i * 1.7) * 0.8, 3.4 + Math.cos(i * 2.3) * 0.9, -2.55 + Math.sin(u * Math.PI) * 0.25); } pos.needsUpdate = true; }
  }
  /* ---------- modern house ---------- */
  { const Hm = s.house, on = between(t, 'm1', 'm2'), r1 = inB(t, 'm1') ? ph(t, 'm1', 5.4) : -1, r2 = inB(t, 'm2') ? ph(t, 'm2', 6) : -1;
    const open = r1 >= 0 ? 1 - sm(1.4, 2.2, r1) : r2 >= 0 ? sm(0.6, 1.4, r2) : 0; Hm.win.userData.set(open);
    const nk = r2 >= 0 ? 1 : 0; skyCol(Hm.win.userData.sky, nk, '#ffd88a', '#14204a');
    Hm.sunW.visible = on; Hm.sunW.material.color.set(nk ? '#fff6d8' : '#ffc050'); setP(Hm.sunW, 'HOUSE', 1.0, 2.3, -2.6); Hm.sunW.scale.setScalar(nk ? 0.6 : 1.0);
    rest(Hm.person); face(Hm.person, 0.3, 1);
    if (r1 >= 0) { if (r1 < 1.4) { const k = sm(0, 1.2, r1); setP(Hm.person, 'HOUSE', U.lerp(-1.4, 0.0, k), 0, U.lerp(0.6, -1.6, k)); face(Hm.person, 0.4, -1); walk(Hm.person, t, 1); } else { setP(Hm.person, 'HOUSE', 0.0, 0, -1.6); face(Hm.person, 0, -1); Hm.person.userData.arms.R.rotation.set(-1.5 * (1 - sm(2.2, 2.6, r1)), 0, 0.2); } if (r1 > 2.6) { setP(Hm.person, 'HOUSE', -1.4, 0, 0.6); face(Hm.person, 0.3, 1); const fan = Math.sin(t * 14) * 0.25; Hm.person.userData.arms.R.rotation.set(-1.6 + fan, 0, 0.3); BUB.push({ o: Hm.person, dy: 2.1, txt: 'ร้อนน้อยลง', c: '#fff' }); } }
    if (r2 >= 0) { setP(Hm.person, 'HOUSE', -1.4, 0, 0.6); face(Hm.person, 0.3, 1); Hm.person.userData.arms.L.rotation.set(0, 0, -0.4); Hm.person.userData.arms.R.rotation.set(0, 0, 0.4); if (r2 > 3.0) BUB.push({ o: Hm.person, dy: 2.1, txt: 'เย็นสบาย', c: '#fff' }); }
    const hp = Hm.heat.geometry.attributes.position, cp = Hm.cool.geometry.attributes.position; Hm.heat.visible = on; Hm.cool.visible = r2 >= 0;
    if (on) { Hm.seed.forEach((q, i) => { let x, y, z;
      if (r1 >= 0) { const u = (q[0] + t * 0.35) % 1; const stream = i < 70; if (stream) { const cut = sm(1.8, 2.4, r1); x = 0.6 + q[1] * 0.12 * (1 + u * 6); y = 1.6 + q[2] * 0.3; z = -2.6 + u * 3.6; if (u > 1 - cut) { y = -5; } } else { x = q[1] * 0.55; y = 0.4 + q[2] * 0.9; z = q[3] * 0.6 - 0.4; } }
      else { const u = sm(0.8 + (i % 10) * 0.12, 4.4 + (i % 10) * 0.12, r2); x = U.lerp(q[1] * 0.55, 0.6 + q[1] * 0.08, u); y = U.lerp(0.4 + q[2] * 0.9, 2.0 + q[2] * 0.2, u); z = U.lerp(q[3] * 0.6 - 0.4, -3.4, u); if (u >= 1) y = -5; }
      hp.setXYZ(i, ST.HOUSE[0] + x, y, z); });
      hp.needsUpdate = true;
      if (r2 >= 0) { for (let i = 0; i < 110; i++) { const q = Hm.seed[i], u = (q[0] + t * 0.3) % 1, k = sm(1.0, 1.6, r2); cp.setXYZ(i, ST.HOUSE[0] + 0.6 + q[1] * 0.1 * (1 + u * 8), 1.8 + q[2] * 0.25 - u * 0.6, -2.5 + u * 4 * k); } cp.needsUpdate = true; } }
  }
  /* ---------- rainy-season room ---------- */
  { const Rr = s.rain, on = between(t, 'r1', 'r4'); Rr.out.visible = on || inB(t, 'rprof'); if (Rr.out.visible) rainAt(Rr.out, t, 6, 0.4);
    const r2 = inB(t, 'r1') ? ph(t, 'r1', 5.6) : -1; Rr.paint.forEach((p, i) => { p.scale.setScalar(r2 >= 0 && ((r2 > 1.2 && r2 < 3.0 && i === 0) || (r2 > 3.0 && i === 1)) ? 1.08 : 1); });
    const lv = Rr.win.userData.leaves; lv[0].rotation.y = -1.35 * (0.5 + 0.5 * Math.sin(t * 0.9)) * (r2 >= 0 ? 1 : 0.5); lv[1].rotation.y = 1.35 * (0.5 + 0.5 * Math.cos(t * 0.9));
    rest(Rr.p); lapHands(Rr.p); Rr.p.userData.head.rotation.y = inB(t, 'r4') ? Math.sin(t * 1.2) * 0.25 : 0;
    Rr.mus.forEach((l, i) => { const play = between(t, 'r3', 'r4'); l.position.y = ST.RAIN[1] + (play ? Math.abs(Math.sin(t * 4 + i)) * 0.06 : 0); l.userData.arms.R.rotation.set(-0.9 + (play ? Math.sin(t * 6 + i) * 0.35 : 0), 0, 0.3); l.userData.arms.L.rotation.set(-0.9, 0, -0.3); vis(l, on); });
    Rr.notes.forEach((n, i) => { const play = between(t, 'r3', 'r4'); const u = (t * 0.4 + i / 6) % 1, ml = Rr.mus[i % 4]; n.visible = play; n.position.set(ml.position.x + Math.sin(u * 6 + i) * 0.3, 1.6 + u * 2.2, ml.position.z); n.material.opacity = 1 - u; });
    const both = inB(t, 'r1'); Rr.cool.visible = Rr.warm.visible = both;
    if (both) { for (const [pp, sx] of [[Rr.cool, 1], [Rr.warm, -1]]) { const pos = pp.geometry.attributes.position; for (let i = 0; i < 70; i++) { const u = (i / 70 + t * 0.3) % 1, a = i * 2.4; pos.setXYZ(i, ST.RAIN[0] + sx * (1.0 + u * 1.6) + Math.cos(a) * 0.3, 0.6 + u * 2.6, -0.7 + Math.sin(a) * 0.6); } pos.needsUpdate = true; } }
  }
  /* ---------- servants' court ---------- */
  vis(s.court.labL, false); vis(s.court.labR, false);
  /* ---------- road (t5) ---------- */
  { const Rd = s.road, r = inB(t, 't5') ? ph(t, 't5', 6) : -1; const cx = r >= 0 ? U.lerp(-11, 13, U.easeIO(sm(0.2, 5.8, r))) : -11;
    setP(Rd.ch, 'ROAD', cx, 0, 0.8); gallop(Rd.ch.userData.horse, t, r >= 0 ? 0.6 : 0); setSit(Rd.p, false); rest(Rd.p); setP(Rd.p, 'ROAD', cx - 0.1, 0.92, 0.8); face(Rd.p, 0.3, 1);
    Rd.sights.forEach((o, i) => { const sx = -6 + i * 5; const k = r >= 0 ? U.easeBack(sm(sx - 1.5, sx + 0.5, cx)) : 0; o.visible = k > 0.01; o.scale.setScalar(Math.max(0.01, k) * (i === 2 ? 0.9 : 1)); Rd.labs[i].visible = k > 0.6; });
    if (r >= 0) { const near = Rd.sights.findIndex((o, i) => Math.abs(cx - (-6 + i * 5)) < 1.6); if (near >= 0) BUB.push({ o: Rd.p, dy: 2.0, txt: near === 3 ? '!' : '?', c: '#fff', big: true }); } }
  /* ---------- gate (hook2, t6) ---------- */
  { const G = s.gate, gOn = inB(t, 'hook2') || inB(t, 't6'); vis(G.h, gOn); vis(G.p, gOn); vis(G.channa, gOn);
    if (gOn) { const r = inB(t, 'hook2') ? ph(t, 'hook2', 5) / 5 : ph(t, 't6', 5.6) / 5.6; const z = U.lerp(6.5, -5.5, U.easeIO(sm(0.08, 0.95, r)));
      setP(G.h, 'GATE', 0, 0, z); G.h.rotation.y = Math.PI / 2; gallop(G.h, t, 1); G.h.position.y = Math.abs(Math.sin(t * 12)) * 0.08;
      setSit(G.p, true); rest(G.p); G.p.position.set(G.h.position.x, G.h.position.y + 1.25, G.h.position.z + 0.0); G.p.rotation.y = Math.PI; G.p.scale.setScalar(0.85);
      setP(G.channa, 'GATE', 0.9, 0, z + 1.4); G.channa.rotation.y = Math.PI; walk(G.channa, t * 1.4, 1.2); } }
  /* ---------- pleasure hall ---------- */
  { const Pl = s.plea, onB = between(t, 'p1', 'p4') || inB(t, 't5b'), sleep = inB(t, 't5b'), r3 = inB(t, 'p3') ? ph(t, 'p3', 5.6) : -1;
    Pl.dancers.forEach((d, i) => { let on = onB, k = 1; if (d.userData.extra) { if (between(t, 'p1', 'p2')) on = false; if (r3 >= 0) k = U.easeBack(sm(1.2 + (i - 8) * 0.18, 1.6 + (i - 8) * 0.18, r3)); }
      d.visible = on && k > 0.01; if (!d.visible) return; const h = d.userData.home; rest(d); d.rotation.set(0, 0, 0); d.scale.setScalar(0.8 * Math.max(0.01, k));
      if (!sleep) { setP(d, 'PLEA', h[0] + Math.sin(t * 1.3 + i) * 0.25, 0.4 + Math.abs(Math.sin(t * 3 + i)) * 0.12, h[1]); face(d, Math.sin(t * 2 + i) * 0.8, 1); d.userData.arms.L.rotation.set(0, 0, -1.6 - Math.sin(t * 3 + i) * 0.6); d.userData.arms.R.rotation.set(0, 0, 1.6 + Math.sin(t * 3 + i + 1) * 0.6); }
      else { setP(d, 'PLEA', h[0] * 1.05, 0.62, h[1] + (i % 2) * 0.2); d.rotation.set(0, (i * 1.3) % 3, Math.PI / 2 * (i % 2 ? 1 : -1)); } });
    rest(Pl.p); lapHands(Pl.p); setSit(Pl.p, true); Pl.p.userData.head.rotation.x = 0; vis(Pl.p, onB); vis(Pl.yaso, onB && !sleep);
    if (inB(t, 'p4')) { Pl.p.userData.head.rotation.x = 0.25; if (ph(t, 'p4', 4.6) > 1.2) BUB.push({ o: Pl.p, dy: 2.2, txt: '…', c: '#fff', big: true }); }
    if (sleep) { const r = ph(t, 't5b', 6.4); Pl.p.userData.head.rotation.y = Math.sin(r * 0.8) * 0.6; if (r > 2.8) BUB.push({ o: Pl.p, dy: 2.2, dx: -0.3, txt: 'เหมือนป่าช้า…', c: '#fff' });
      [1, 6, 10].forEach((di, j) => { const d = Pl.dancers[di]; if (d.visible && r > 0.6 + j * 0.5) BUB.push({ o: d, dy: 1.0, txt: ['ครอก~', 'zZz', 'งึมงำ…'][j], c: '#cfe0ff' }); }); }
    vis(Pl.king, r3 >= 0); if (r3 >= 0) { rest(Pl.king); setP(Pl.king, 'PLEA', 4.8, 0.4, 1.6); face(Pl.king, -1, 0.3); Pl.king.userData.arms.R.rotation.set(0, 0, 2.2 + Math.sin(t * 6) * 0.2); if (r3 > 0.6) BUB.push({ o: Pl.king, dy: 2.4, txt: 'เพิ่มนางรำอีก!', c: '#fff' }); }
    Pl.lamps.forEach((l, i) => { l.material.opacity = (sleep ? 0.35 : 0.9) + 0.1 * Math.sin(t * 7 + i); });
    Pl.smoke.forEach((sp, i) => { const u = (t * 0.25 + i / 3) % 1; sp.visible = inB(t, 'p1'); setP(sp, 'PLEA', 4.4 + Math.sin(u * 4 + i) * 0.3, 1.2 + u * 2.6, -2.6); sp.scale.setScalar(0.5 + u * 1.2); sp.material.opacity = 0.45 * (1 - u); }); }
  /* ---------- gate by day (q3) ---------- */
  { const G = s.gate, on = inB(t, 'q3'); vis(G.monk, on); vis(G.dad, on); vis(G.mom, on);
    if (on) { const r = ph(t, 'q3', 6.6); const k = U.easeIO(sm(1.6, 5.6, r)); setP(G.monk, 'GATE', 0, 0, U.lerp(3.2, -1.0, k)); face(G.monk, 0, -1); if (k > 0 && k < 1) walk(G.monk, t, 0.8); else rest(G.monk);
      setP(G.dad, 'GATE', -1.6, 0, 4.4); face(G.dad, 0.4, -1); setP(G.mom, 'GATE', 1.5, 0, 4.4); face(G.mom, -0.4, -1); rest(G.dad); rest(G.mom);
      G.dad.userData.arms.R.rotation.set(-1.2, 0, 0.3); G.mom.userData.arms.L.rotation.set(-2.2, 0, -0.3);
      if (r > 0.8) BUB.push({ o: G.dad, dy: 2.5, txt: 'ลูกเอ๋ย…', c: '#fff' }); }
    G.tears.forEach((d, i) => { const who = i < 3 ? G.dad : G.mom; d.visible = on; if (!on) return; const u = (t * 1.2 + i / 3) % 1; who.userData.head.getWorldPosition(s.anchorV); d.position.set(s.anchorV.x + (i % 2 ? 0.18 : -0.18), s.anchorV.y - 0.05 - u * 0.9, s.anchorV.z + 0.35); d.scale.setScalar(1 - u * 0.5); }); }
  /* ---------- road reused for q2 (story borrowed from Vipassi) ---------- */
  if (inB(t, 'q2')) { const Rd = s.road; setP(Rd.ch, 'ROAD', -9, 0, 0.8); setP(Rd.p, 'ROAD', -9.1, 0.92, 0.8); Rd.sights.forEach((o, i) => { o.visible = true; o.scale.setScalar(i === 2 ? 0.9 : 1); Rd.labs[i].visible = true; }); }
  /* ---------- map: mahajanapada discs ---------- */
  { const m = s.map, D = m.discs; const g1 = inB(t, 'g1') ? ph(t, 'g1', 6) : -1, g5 = inB(t, 'g5') ? ph(t, 'g5', 5.6) : -1, gOn = between(t, 'g1', 'g2') || inB(t, 'g5');
    for (const k in D) { const o = D[k]; let a = 0, sc = o.r;
      if (k === 'kos' || k === 'mag') { a = g1 >= 0 ? U.easeOut(sm(0.6 + (k === 'mag' ? 0.6 : 0), 1.4 + (k === 'mag' ? 0.6 : 0), g1)) : (inB(t, 'g2') || g5 >= 0) ? 1 : 0; if (k === 'mag' && g5 >= 0) a = 0; if (k === 'kos' && g5 >= 0) sc = o.r * U.lerp(1, 1.85, U.easeIO(sm(1.0, 3.2, g5))); }
      else a = (g1 >= 0 && g1 > 2.4) || inB(t, 'g2') || g5 >= 0 ? 1 : 0;
      o.d.visible = o.ring.visible = a > 0.01 && gOn; o.lb.visible = o.d.visible && a > 0.5; o.d.scale.setScalar(Math.max(0.01, sc * a)); o.ring.scale.setScalar(Math.max(0.01, sc * a)); o.d.material.opacity = (k === 'kos' && g5 >= 0 ? 0.42 : 0.55) * a; }
    D.kap.ring.scale.setScalar(D.kap.ring.scale.x * (1 + (inB(t, 'g2') ? 0.25 * Math.sin(t * 5) : 0)));
    m.approx.visible = inB(t, 'g1'); if (gOn) { m.pin.visible = true; m.pin.scale.setScalar(0.8); m.lab.visible = false; m.mini.visible = false; } }
  /* ---------- assembly hall ---------- */
  { const Hl = s.hall; const lay = between(t, 'g3', 'g4') || inB(t, 'f2'); const sang = between(t, 'l1', 'l2');
    const l1 = inB(t, 'l1') ? ph(t, 'l1', 6) : -1; const morph = l1 >= 0 ? sm(1.4, 3.2, l1) : sang ? 1 : 0;
    Hl.nobles.forEach((n, i) => { const k = (lay || l1 >= 0) ? 1 - U.clamp(morph * 1.6 - (i % 5) * 0.12) : 0; n.visible = k > 0.02 && !inB(t, 'f2'); n.scale.setScalar(Math.max(0.01, 0.85 * k)); rest(n); lapHands(n);
      if (inB(t, 'g3')) { n.userData.head.rotation.y = Math.sin(t * 1.5 + i) * 0.4; n.userData.arms.R.rotation.set(-1.0 + Math.sin(t * 4 + i * 1.7) * 0.4, 0, 0.3); }
      if (inB(t, 'g4')) { const up = sm(1.6 + (i % 5) * 0.15, 2.2 + (i % 5) * 0.15, ph(t, 'g4', 6)); n.userData.arms.R.rotation.set(0, 0, 0.14 + up * 2.7); } });
    Hl.monks.forEach((m, i) => { const k = sang ? U.clamp(morph * 1.6 - (i % 5) * 0.12) : 0; m.visible = k > 0.02; m.scale.setScalar(Math.max(0.01, 0.85 * k)); anjali(m, 0.8); });
    vis(Hl.leader, lay && !inB(t, 'f2')); if (inB(t, 'g4')) { const r = ph(t, 'g4', 6); Hl.leader.position.y = ST.HALL[1] + 0.9 + 0.05 * Math.abs(Math.sin(t * 3)); if (r > 2.6) BUB.push({ o: Hl.leader, dy: 2.4, txt: 'มติสภา…', c: '#fff' }); }
    vis(Hl.elder, sang && morph > 0.6); vis(Hl.cand, inB(t, 'l2'));
    if (inB(t, 'l2')) { const r = ph(t, 'l2', 6.4); const round = Math.min(4, Math.floor(r / 1.3)); if (r > 0.6) BUB.push({ o: Hl.elder, dy: 2.2, txt: round === 0 ? 'ขอเสนอญัตติ…' : 'ท่านใดเห็นด้วย พึงนิ่ง (' + Math.min(3, round) + ')', c: '#fff' }); }
    const l4 = -1; vis(Hl.bowl, l4 >= 0);
    Hl.tickets.forEach((tk, i) => { const seat = Hl.seats[i]; const q = l4 >= 0 ? U.easeIO(sm(0.8 + i * 0.32, 1.5 + i * 0.32, l4)) : 0; tk.visible = l4 >= 0;
      const x0 = ST.HALL[0] + seat[0] * 0.8, z0 = seat[1] + 0.3, x1 = ST.HALL[0] + (i - 4.5) * 0.06, z1 = 0.6; tk.position.set(U.lerp(x0, x1, q), 1.3 + Math.sin(q * Math.PI) * 1.4 - q * 0.2, U.lerp(z0, z1, q)); tk.rotation.z = q * 0.4 * (i % 2 ? 1 : -1); });
    /* f2: Vidudabha visits, maid washes his seat with milk */
    const f2 = inB(t, 'f2') ? ph(t, 'f2', 6) : -1; vis(Hl.vidu, f2 >= 0); vis(Hl.maid, f2 >= 0 && f2 > 1.8); vis(Hl.bucket, Hl.maid.visible); vis(Hl.milk, Hl.maid.visible);
    if (f2 >= 0) { const k = U.easeIO(sm(0, 1.8, f2)); setP(Hl.vidu, 'HALL', U.lerp(-0.4, 3.0, k), 0.5, U.lerp(-3.4, 0.6, k)); face(Hl.vidu, k < 1 ? 1 : -0.6, 1); if (k < 1 && k > 0) walk(Hl.vidu, t, 1); else rest(Hl.vidu);
      setP(Hl.maid, 'HALL', 0.9, 0.5, -3.0); face(Hl.maid, -1, -0.3); setSit(Hl.maid, true); Hl.maid.userData.arms.R.rotation.set(-1.2 + Math.sin(t * 6) * 0.3, 0, 0.3);
      setP(Hl.bucket, 'HALL', 1.5, 0.7, -2.6); setP(Hl.milk, 'HALL', 0.1, 0.92, -3.4);
      if (f2 > 2.4) BUB.push({ o: Hl.maid, dy: 1.9, txt: 'ที่นั่งลูกทาสีนั่ง ล้างด้วยนม!', c: '#fff' }); if (f2 > 4.0) BUB.push({ o: Hl.vidu, dy: 2.3, txt: '!!', c: '#ffb3b3', big: true }); } }
  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.12); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
