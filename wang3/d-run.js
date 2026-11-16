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
  w3: [[0, fr('WIN', 1.6, 1.3, 0.3, 7.4, 2.0, 0.4)]], w4: [[0, fr('WIN', 2.0, 1.8, -1.4, 7.4, 1.0, 0.6)]], w5: [[0, kp('S', 14, 3)]],
  sprof: [[0, kp('S', 13, 2.6)]], s1: [[0, fr('SUM', 0, 3.0, 0, 12.5, 2.6, 0)]], s2: [[0, fr('SUM', -1.0, 1.4, -1.0, 8.4, 2.0, 0)]],
  s3: [[0, fr('SUM', -3.6, 5.6, -0.6, 11.5, 4.2, -0.6)]], s4: [[0, fr('SUM', 0.6, 2.6, 0.4, 10.5, 2.0, 0)]],
  s5: [[0, fr('SUM', 3.0, 7.0, -0.6, 7.4, 2.2, 0)]], s6: [[0, fr('SUM', 0.8, 4.4, 0, 14.5, 2.2, 0)]], s7: [[0, fr('SUM', 0, 3.4, -1.6, 8.2, 0.4, 0)]],
  m1: [[0, fr('HOUSE', 0, 1.8, -0.4, 9.6, 2.0, 0)]], m2: [[0, fr('HOUSE', 0.4, 1.9, -0.4, 9.0, 1.8, 0.4)]],
  rprof: [[0, kp('R', 13, 2.6)]], r1: [[0, fr('RAIN', 1.2, 2.2, 0, 12, 2.4, 0)]], r2: [[0, fr('RAIN', 0, 2.5, -1.8, 9.4, 0.6, 0)]],
  r3: [[0, fr('RAIN', 1.8, 1.9, 0, 10.5, 2.0, 0.6)]], r4: [[0, fr('RAIN', 0, 1.3, 0.4, 9.2, 2.4, 0)]],
  c1: [[0, fr('KAP', 0, 2.2, 2.8, 16, 8.5, 0)]], c2: [[0, fr('KAP', 0.5, 2.9, 7.4, 10, 1.8, 0)]],
  c3: [[0, fr('COURT', -3.4, 1.5, 0.4, 7.6, 2.6, 0)]], c4: [[0, fr('COURT', 3.4, 1.5, 0.4, 7.6, 2.6, 0)]], c5: [[0, fr('COURT', 0, 2.2, 0.2, 16, 3.6, 0)]],
  t1: [[0, fr('KAP', 0, 2.4, 4.0, 11, 2.0, 0)]], t2: [[0, fr('KAP', -0.8, 2.0, 4.2, 9.5, 1.6, -0.4)]], t3: [[0, fr('KAP', 0, 2.0, 4.4, 10.5, 1.8, 0.4)]],
  t4: [[0, fr('KAP', 0.4, 2.8, 4.0, 10, 1.6, 0)]],
  t5: [[0, fr('ROAD', -6, 1.9, 1.8, 11, 2.4, 0)], [2.0, fr('ROAD', 3.5, 1.9, 1.8, 11.5, 2.4, 0)]],
  t6: [[0, fr('GATE', 0, 2.6, 0.5, 14, 3.0, -0.4)]], t7: [[0, fr('KAP', 0, 6.0, -3.0, 29, 5, 0)]],
  n1: [[0, fr('TEMPLE', 0, 5.4, -1.5, 22, 2.4, 0)]], n2: [[0, fr('TEMPLE', 0, 6.0, -2.6, 12.5, 1.2, 0)]], n3: [[0, fr('TEMPLE', 0, 5.6, -2.4, 15, 1.6, 0.6)]],
  moral: [[0, fr('KAP', 0, 7.4, -0.6, 25, 3.0, 0)]], moral2: [[0, fr('KAP', 0, 7.2, -0.6, 23, 2.6, 0)]], recap: [[0, KO]], ask: [[0, KO]],
};
const CUT = new Set(['hook2', 'hook3', 'map1', 'birth', 'build', 'w1', 'w5', 's1', 'm1', 'rprof', 'r1', 'c1', 'c3', 't1', 't5', 't6', 't7', 'n1', 'moral']);
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
const NIGHT = ['hook2', 't1', 't2', 't3', 't4', 't6'];
function bgKey(t) {
  const id = beatAt(t);
  if (NIGHT.includes(id)) return 'night';
  if (['map1', 'seasons'].includes(id)) return 'map';
  if (['n1', 'n2', 'n3'].includes(id)) return 'temple';
  if (['moral', 'moral2'].includes(id)) return 'dusk';
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
    ['W', 'S', 'R'].forEach((k, i) => { const g = inB(t, 'build') ? U.easeOut(sm(0.6 + i * 1.3, 2.2 + i * 1.3, bRel)) : 1; K.pal[k].scale.set(0.85, Math.max(0.01, 0.85 * g), 0.85); });
    K.workers.forEach((w, i) => { const on = inB(t, 'build'); vis(w, on); if (on) { const a = t * 0.8 + i * 1.05; setP(w, 'KAP', Math.cos(a) * (6 + (i % 2) * 2), 0, 1.0 + Math.sin(a) * 1.4); face(w, -Math.sin(a), Math.cos(a)); walk(w, t + i, 1); } });
    const pop = (o, on, t0) => { o.visible = on; if (on) o.scale.multiplyScalar(1); };
    ['W', 'S', 'R'].forEach((k, i) => {
      const lt = inB(t, 'tiers') && ph(t, 'tiers', 5.4) > 0.6 + i * 0.6; pop(K.labs[k], lt);
      vis(K.names[k], (inB(t, 'hook3') && ph(t, 'hook3', 4.6) > 1.0 + i * 0.4) || (inB(t, 'build') && bRel > 4.6));
      vis(K.nums[k], inB(t, 'ask') && ph(t, 'ask', 5.6) > 0.5 + i * 0.4);
      vis(K.life[k], inB(t, 'moral') && ph(t, 'moral', 5.6) > 1.6 + i * 0.6 || inB(t, 'moral2'));
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
    const r3 = inB(t, 's3') ? ph(t, 's3', 5.6) : -1, rainK = between(t, 's4', 's6') ? 1 : inB(t, 's3') ? sm(4.4, 5.4, r3) : 0;
    Sm.rain.visible = on && rainK > 0; if (Sm.rain.visible) { rainAt(Sm.rain, t, 5.5, 0.3); setP(Sm.rain, 'SUM', 0, 0, 0); Sm.rain.material.opacity = 0.75 * rainK; }
    Sm.bells.forEach((b, i) => { b.rotation.z = Math.sin(t * 2.2 + i) * (between(t, 's1', 's6') ? 0.25 : 0.08); b.rotation.x = Math.sin(t * 1.7 + i * 2) * 0.12; });
    Sm.spray.visible = on; if (on) { const pos = Sm.spray.geometry.attributes.position; for (let i = 0; i < 80; i++) { const u = (i / 80 + t * 0.7) % 1, a = i * 2.4; const r = u * 0.8; pos.setXYZ(i, ST.SUM[0] - 2.2 + Math.cos(a) * r, 0.5 + Math.sin(u * Math.PI) * 1.4, 1.0 + Math.sin(a) * r); } pos.needsUpdate = true; }
    /* wind through the netted windows */
    const wOn = on && (inB(t, 's1') || inB(t, 's2') || (inB(t, 's7') && dn(t, 's7', 2.4, 3.0) > 0.5)); Sm.wind.visible = wOn;
    if (wOn) { const pos = Sm.wind.geometry.attributes.position; Sm.windSeed.forEach((q, i) => { const u = (q[0] + t * 0.45) % 1; const x0 = i % 2 ? -2.6 : 2.6; pos.setXYZ(i, ST.SUM[0] + x0 + q[2] * 0.5 + Math.sin(u * 5 + i) * 0.4, 3.0 + q[1] + Math.sin(u * 3) * 0.3, -2.6 + u * 5.2); }); pos.needsUpdate = true; }
    /* pump (s3): worker turns the wheel, water climbs the pipe, tank fills */
    Sm.wheel.rotation.z = inB(t, 's3') ? -t * 4 : 0; rest(Sm.pumper); face(Sm.pumper, 1, 0.6);
    if (inB(t, 's3')) { Sm.pumper.userData.arms.R.rotation.set(-1.2 + Math.sin(t * 4) * 0.5, 0, 0.2); Sm.pumper.userData.arms.L.rotation.set(-1.2 - Math.sin(t * 4) * 0.5, 0, -0.2); }
    Sm.tank.scale.y = 0.4 + 0.6 * (inB(t, 's3') ? sm(0.6, 4.0, r3) : t > end('s3') ? 1 : 0.4);
    /* pebbles onto the stretched hide (s5, s6) */
    const rp = inB(t, 's5') ? ph(t, 's5', 5.2) : inB(t, 's6') ? ph(t, 's6', 5.6) + 5 : -1; rest(Sm.dropper); face(Sm.dropper, -1, 0);
    let boomK = 0;
    Sm.pebbles.forEach((pb, i) => { const t0 = 1.6 + i * 0.9; const u = rp >= 0 ? sm(t0, t0 + 0.55, rp) : 0; pb.visible = rp >= t0 - 0.3 && u < 1; setP(pb, 'SUM', 3.8 - u * 1.0, 8.6 - u * u * 1.4, -0.6 + (i % 3 - 1) * 0.3); if (u >= 1 && rp < t0 + 1.0) boomK = Math.max(boomK, 1 - (rp - t0 - 0.55) / 0.45); });
    if (rp >= 0) { const thr = Math.max(0, Math.sin((rp - 1.3) * 7)); Sm.dropper.userData.arms.R.rotation.set(-1.0 - thr * 0.8, 0, 0.3); }
    Sm.boom.material.opacity = 0.8 * boomK; Sm.boom.scale.setScalar(1 + (1 - boomK) * 2.5); Sm.hideTop.position.y = 0.52 - boomK * 0.06;
    rest(Sm.p); lapHands(Sm.p); Sm.p.userData.head.rotation.x = between(t, 's4', 's6') ? -0.35 : 0;
    if (inB(t, 's6') && ph(t, 's6', 5.6) > 1.8) BUB.push({ o: Sm.p, dy: 2.0, dx: -0.4, txt: 'ครืนน… ครืนน…', c: '#fff' });
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
    const r2 = inB(t, 'r2') ? ph(t, 'r2', 5.4) : -1; Rr.paint.forEach((p, i) => { p.scale.setScalar(r2 >= 0 && ((r2 > 1.2 && r2 < 3.0 && i === 0) || (r2 > 3.0 && i === 1)) ? 1.08 : 1); });
    const lv = Rr.win.userData.leaves; lv[0].rotation.y = -1.35 * (0.5 + 0.5 * Math.sin(t * 0.9)) * (r2 >= 0 ? 1 : 0.5); lv[1].rotation.y = 1.35 * (0.5 + 0.5 * Math.cos(t * 0.9));
    rest(Rr.p); lapHands(Rr.p); Rr.p.userData.head.rotation.y = inB(t, 'r4') ? Math.sin(t * 1.2) * 0.25 : 0;
    Rr.mus.forEach((l, i) => { const play = between(t, 'r3', 'r4'); l.position.y = ST.RAIN[1] + (play ? Math.abs(Math.sin(t * 4 + i)) * 0.06 : 0); l.userData.arms.R.rotation.set(-0.9 + (play ? Math.sin(t * 6 + i) * 0.35 : 0), 0, 0.3); l.userData.arms.L.rotation.set(-0.9, 0, -0.3); vis(l, on); });
    Rr.notes.forEach((n, i) => { const play = between(t, 'r3', 'r4'); const u = (t * 0.4 + i / 6) % 1, ml = Rr.mus[i % 4]; n.visible = play; n.position.set(ml.position.x + Math.sin(u * 6 + i) * 0.3, 1.6 + u * 2.2, ml.position.z); n.material.opacity = 1 - u; });
    const both = inB(t, 'r1'); Rr.cool.visible = Rr.warm.visible = both;
    if (both) { for (const [pp, sx] of [[Rr.cool, 1], [Rr.warm, -1]]) { const pos = pp.geometry.attributes.position; for (let i = 0; i < 70; i++) { const u = (i / 70 + t * 0.3) % 1, a = i * 2.4; pos.setXYZ(i, ST.RAIN[0] + sx * (1.0 + u * 1.6) + Math.cos(a) * 0.3, 0.6 + u * 2.6, -0.7 + Math.sin(a) * 0.6); } pos.needsUpdate = true; } }
  }
  /* ---------- servants' court ---------- */
  { const Cc = s.court, on = between(t, 'c3', 'c5'); const fL = inB(t, 'c4') ? 0.35 : 1, fR = inB(t, 'c3') ? 0.35 : 1;
    Cc.sv.forEach((c, i) => { rest(c); const left = i < 3; c.userData.arms.R.rotation.set(-1.1 - Math.max(0, Math.sin(t * 3 + i)) * 0.4, 0, 0.2); c.userData.head.rotation.x = left ? 0.25 : -0.05; void on; });
    if (inB(t, 'c3') && ph(t, 'c3', 5) > 2.0) BUB.push({ o: Cc.sv[1], dy: 2.0, txt: 'ปลายข้าวอีกแล้ว…', c: '#fff' });
    if (inB(t, 'c4') && ph(t, 'c4', 5.6) > 2.0) BUB.push({ o: Cc.sv[4], dy: 2.0, txt: 'มีเนื้อด้วย!', c: '#fff' });
    Cc.tables[0].material.emissive = Cc.tables[0].material.emissive || new T.Color(); Cc.tables[1].material.emissive.set('#5a3a00'); Cc.tables[1].material.emissiveIntensity = inB(t, 'c4') ? 0.4 + 0.2 * Math.sin(t * 4) : 0.1; void fL; void fR;
    vis(Cc.labL, on); vis(Cc.labR, inB(t, 'c4') || inB(t, 'c5') || (inB(t, 'c3') && false)); }
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
  /* ---------- temple ---------- */
  { const Tp = s.temple, r2 = inB(t, 'n2') ? ph(t, 'n2', 6) : -1;
    const seas = r2 >= 0 ? Math.min(2, Math.floor(r2 / 2)) : inB(t, 'n3') ? 2 : 0;
    const CL = ['#ffc94a', '#4fb8ff', '#f4f0e8'][seas]; Tp.cloak.material.color.set(CL); Tp.cloak.material.emissive.set(seas === 1 ? '#103a6a' : '#6a4a00');
    Tp.cloak.visible = between(t, 'n1', 'n3'); Tp.halo.rotation.z = t * 0.3;
    const flash = r2 >= 0 ? 1 - sm(0, 0.6, r2 % 2) : 0; Tp.sparks.forEach((sp, i) => { sp.visible = flash > 0.02; const a = i * 0.63 + t; sp.position.set(Math.cos(a) * 1.6, 5.4 + Math.sin(i * 1.3) * 1.2, -2.6); sp.material.opacity = flash; }); }

  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.12); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
