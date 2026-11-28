/* Part D: camera, update */
const ZK = 1.45;
const fx = (lx, ly, lz, d, h, sx, fov) => ({ look: [lx, ly, lz], pos: [lx + (sx || 0) * ZK, ly + h * ZK, lz + d * ZK], fov: fov || 40 });
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; return fx(c[0] + lx, c[1] + ly, c[2] + lz, d, h, sx, fov); };
const raw = (look, pos) => ({ look, pos, fov: 40 });
const SX = (k, ly, d, h, sx) => fx(SIMX(k), ly, ST.SIM[2] + 0.3, d, h, sx);
const SHOT = {
  cover: [[0, raw([6, 2.6, 0.2], [-13.5, 4.0, 3.6])]], hook1: [[0, raw([6, 2.6, 0.2], [-12.4, 3.8, 3.6])]],
  hook2: [[0, raw([1.8, 2.0, 0.4], [1.2, 2.6, 10.5])]], hook3: [[0, raw([24, 3.4, 0.4], [-1, 4.2, 4.2])]], hook4: [[0, raw([24, 4.0, 0.4], [6, 4.6, 3.4])]],
  ar1: [[0, fr('ARAKA', 0, 2.6, 0.2, 12.5, 4.4, 0)]], ar2: [[0, fr('ARAKA', 1.4, 2.0, 1.4, 8.5, 2.8, 0.8)]], ar3: [[0, fr('ARAKA', 0, 2.3, 0.6, 11, 3.6, -0.6)]],
  ar4: [[0, fr('ARAKA', 0, 2.2, -1.2, 7, 1.8, 0)]], ar5: [[0, fr('ARAKA', -1.2, 2.0, 1.2, 8, 2.4, -0.8)]],
  s1: [[0, SX(1, 3.0, 9, 1.8, 0)]], s2: [[0, SX(2, 2.6, 10, 2.6, 0)]], s3: [[0, SX(3, 2.0, 9, 3.4, 0)]], s4: [[0, SX(4, 2.6, 10, 2.8, 0)]], s5: [[0, SX(5, 2.4, 8.5, 2.0, 0.6)]], s6: [[0, SX(6, 2.4, 8.5, 3.0, 0)]],
  s7: [[0, fr('S7', 0.9, 2.0, 0.3, 8.5, 1.8, 0)]], refr: [[0, fr('S7', 3.4, 2.8, 0.3, 11, 2.6, -1.5)]], ans1: [[0, fr('S7', 5.2, 4.0, 0.3, 13, 4.5, -2)]],
  bud1: [[0, fr('BUD', 0, 2.4, -0.4, 11, 3.4, 0)]],
  c1: [[0, fr('COUNT', 0, 2.8, 0, 15, 3.4, 0)]], c2: [[0, fr('COUNT', 0, 4.6, -1.4, 16, 2.4, 0)]], c3: [[0, fr('COUNT', -0.6, 2.6, 0.6, 12.5, 7.5, 0)]], c4: [[0, fr('COUNT', -0.6, 2.2, 1.0, 10, 6.5, 0.6)]],
  th1: [[0, fx(thx(4), 2.2, 0.3, 9.5, 2.8, -1)]], th2: [[0, fx(thx(16), 2.6, 0.3, 12, 3.4, 0)]], th3: [[0, raw([thx(62), 1.8, 0.2], [thx(30) - 7.5, 3.8, 1.6])]],
  why1: [[0, fr('CAUSE', -10, 2.4, -0.4, 9, 1.6, 0)]], why2: [[0, fr('CAUSE', -10, 2.4, -0.6, 7, 1.0, 0)]],
  dom1: [[0, fr('CAUSE', 0.3, 3.6, 0, 15, 3.4, -2)]], dom2: [[0, fr('CAUSE', 4.4, 3.0, 0, 10, 2.6, 0)]], dom3: [[0, fr('CAUSE', 0.4, 3.6, 0, 16, 5, 0)]],
  dom4: [[0, fr('CAUSE', -2.8, 3.4, 0, 13, 3.2, -1)]], dom5: [[0, fr('CAUSE', 0.4, 3.8, 0, 17, 4.6, 0)]],
  t1: [[0, fr('SEA', 0, 6, 0, 22, 2, 0)]], t2: [[0, fr('SEA', 0, 6.4, 0, 17, 3, 0)]], t3: [[0, fr('SEA', 0, 6.4, 0, 17, 1.6, 1)]],
  t4: [[0, fr('OCEAN', 0.6, 1.8, 0, 9, 1.0, 0)]], t5: [[0, fr('OCEAN', 2.0, 2.0, 0, 11, 1.4, 0)]],
  t6: [[0, fr('END', -12, 2.2, 0.3, 9, 2.2, 0)]],
  a1: [[0, raw([ST.END[0] + 4, 2.6, 0], [ST.END[0] - 19, 4.4, 4.6])]], a2: [[0, fr('END', -10, 2.4, 0.3, 10, 3, 0)]], a3: [[0, fr('END', -9, 2.0, -0.6, 7.5, 2.0, 0.6)]],
  a4: [[0, fr('END', -0.9, 1.8, 0.2, 7, 2.6, 0)]], a5: [[0, fr('END', 9, 2.0, -1.2, 7.5, 1.6, 0)]], a6: [[0, fr('END', 12, 3.4, 0.3, 13, 3, -2)]],
  pay1: [[0, fr('END', 13.5, 2.6, 0.8, 9, 2.0, -2)]], pay2: [[0, fr('END', 15.5, 3.6, 0.3, 11, 2.2, -1.5)]],
  recap: [[0, fr('END', 20, 4.4, 0.3, 14, 3, 0)]], ask: [[0, fr('END', 23, 2.4, 0.8, 8.5, 1.8, -1.5)]],
};
const CUT = new Set(['ar1', 'bud1', 'why1', 't1', 't4', 't6']);
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const sg = SHOT[id];
    sg.forEach((g, j) => {
      const t0 = at(id) + g[0], t1 = j + 1 < sg.length ? at(id) + sg[j + 1][0] : end(id), f = g[1], fe = push(f, 0.93);
      const cut = j === 0 && CUT.has(id);
      if (prev) {
        if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); }
        else { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[1] - f.look[1]) > 12; keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(far ? 2.2 : 1.1, (t1 - t0) * 0.45) }, f)); }
      } else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();

/* backgrounds + light */
const BG = { day: ['#22386b', '#6f9fd0'], past: ['#2a1d12', '#8a6a40'], night: ['#120c2a', '#3a2a68'], space: ['#05081a', '#101a40'], ocean: ['#0f2a5a', '#3f7fc0'], dawn: ['#2a1a3a', '#f0a070'], warm: ['#3a2a1a', '#c8a070'] };
function bgKey(t) {
  const id = beatAt(t);
  if (id.startsWith('ar')) return 'past';
  if (id === 'bud1') return 'warm';
  if (id.startsWith('why') || id.startsWith('dom')) return 'night';
  if (['t1', 't2', 't3'].includes(id)) return 'space';
  if (['t4', 't5'].includes(id)) return 'ocean';
  if (between(t, 'a6', 'end')) return 'dawn';
  return 'day';
}
function bgAt(t) { return BG[bgKey(t)]; }
const LT = { day: [0.75, 0.85, '#fff4e0'], past: [0.7, 0.8, '#ffd9a0'], warm: [0.75, 0.8, '#ffe0b0'], night: [0.55, 0.6, '#c8b8ff'], space: [0.55, 0.9, '#ffffff'], ocean: [0.8, 0.8, '#e8f4ff'], dawn: [0.65, 0.75, '#ffc090'] };

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const P3 = (st, x, y, z) => [ST[st][0] + x, ST[st][1] + y, ST[st][2] + z];
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
const UP = new T.Vector3(0, 1, 0), tmpV = new T.Vector3();
function onGlobe(o, lat, lon, lift) {
  const c = P3('SEA', 0, 6, 0), R = 5 + (lift || 0), la = lat * Math.PI / 180, lo = lon * Math.PI / 180;
  const n = tmpV.set(Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo));
  o.position.set(c[0] + n.x * R, c[1] + n.y * R, c[2] + n.z * R); o.quaternion.setFromUnitVectors(UP, n);
}

/* where the cow is in each beat: [x, walking amp] */
function cowPlan(t) {
  if (t < end('hook4')) return [-1.5 + t * 0.2, 1];
  if (between(t, 's7', 'ans1')) return [ST.S7[0] - 1 + (t - at('s7')) * 0.4, 1];
  if (between(t, 'th1', 'th3')) { if (inB(t, 'th1')) return [thx(0) + 0.2, 0]; if (inB(t, 'th2')) { const k = U.easeIO(sm(0.6, PLAN.th2 - 0.8, ph(t, 'th2'))); return [U.lerp(thx(0) + 0.2, thx(30), k), k > 0 && k < 1 ? 1 : 0]; } return [thx(30) + ph(t, 'th3') * 0.5, 0.6]; }
  if (t >= at('t6')) { const x = ST.END[0] - 15 + (t - at('t6')) * 1.0; return x < ST.END[0] + 29 ? [x, 1] : [ST.END[0] + 29, 0]; }
  return null;
}

function update(t, s, { camera, W, H }) {
  BUB.length = 0; const id = beatAt(t), bk = bgKey(t);
  { const L0 = LT[bk]; s.hemi.intensity = L0[0]; s.sun.intensity = L0[1]; s.sun.color.set(L0[2]); }
  s.fog.color.set(bgAt(t)[1]); s.fog.near = bk === 'space' ? 60 : t < at('ar1') ? 16 : 30; s.fog.far = bk === 'space' ? 160 : t < at('ar1') ? 52 : 95;

  /* cow + herder + rope + footprints */
  { const cp = cowPlan(t), C = s.cow, H0 = s.herder; vis(C, cp); vis(H0, cp); vis(s.rope, cp);
    s.dust.forEach((d) => (d.visible = false)); s.steps.forEach((f) => (f.visible = false));
    if (cp) {
      const x = cp[0]; C.position.set(x, 0, 0.4); C.rotation.y = 0; cowWalk(C, t, cp[1]);
      const herd = !(between(t, 'th1', 'th3')); vis(H0, herd); vis(s.rope, herd);
      if (herd) { H0.position.set(x + 2.6, 0, 0.55); face(H0, 1, 0); if (cp[1] > 0) walk(H0, t, cp[1]); else rest(H0); H0.userData.arms.L.rotation.set(0.9, 0, -0.3);
        H0.updateMatrixWorld(true); C.updateMatrixWorld(true); const a = new T.Vector3(), b = new T.Vector3(); H0.userData.arms.L.userData.hand.getWorldPosition(a); C.userData.head.getWorldPosition(b); b.x += 0.3; b.y -= 0.1;
        const pa = s.rope.geometry.attributes.position; pa.setXYZ(0, a.x, a.y, a.z); pa.setXYZ(1, b.x, b.y, b.z); pa.needsUpdate = true; s.rope.geometry.computeBoundingSphere(); }
      if (cp[1] > 0) s.dust.forEach((d, i) => { const u = ((t * 0.9 + i / 6) % 1); d.visible = true; d.position.set(x - 0.6 - u * 1.6, 0.25 + u * 0.4, 0.4 + Math.sin(i * 2) * 0.3); d.scale.setScalar(0.5 + u * 0.9); d.material.opacity = 0.45 * (1 - u); });
      if (t < end('hook4') || between(t, 's7', 'ans1') || t >= at('t6')) s.steps.forEach((f, i) => { const fx0 = x - 0.9 - i * 0.55; f.visible = true; f.position.set(fx0, 0.07, 0.4 + (i % 2 ? 0.18 : -0.18)); f.material.opacity = 0.75 * (1 - i / s.steps.length); });
      if (inB(t, 'hook2') && ph(t, 'hook2') > 2.2) C.userData.head.rotation.y = -0.35 * sm(2.2, 2.8, ph(t, 'hook2'));
    }
    const gateOn = t < end('hook4') ? 24 : t >= at('t6') ? ST.END[0] + 32 : null; vis(s.gate, gateOn !== null); if (gateOn !== null) s.gate.position.set(gateOn, 0, 0.4); }

  /* Araka */
  { const A = s.ar, on = between(t, 'ar1', 'ar5'); A.snow.forEach((f) => (f.visible = false)); A.heat.visible = false; A.cup.visible = false;
    A.st.forEach((c, i) => { setSit(c, true); rest(c); anjali(c, 0.6); c.userData.head.rotation.x = 0; c.position.y = ST.ARAKA[1]; });
    rest(A.t); A.t.userData.arms.R.rotation.set(-0.6 - Math.max(0, Math.sin(t * 2.2)) * 0.6, 0, 0.3); A.t.userData.head.rotation.y = Math.sin(t * 0.8) * 0.35;
    if (on && inB(t, 'ar3')) { const r = ph(t, 'ar3');
      const c0 = A.st[1], c1 = A.st[3], c2 = A.st[5], c3 = A.st[6];
      if (r > 0.6) { c0.userData.arms.L.rotation.set(-1.4, 0, 0.9); c0.userData.arms.R.rotation.set(-1.4, 0, -0.9); c0.position.x = A.st[1].position.x; c0.rotation.z = Math.sin(t * 40) * 0.03;
        A.snow.forEach((f, i) => { f.visible = true; const u = (t * 0.4 + i / 14) % 1; f.position.set(c0.position.x + Math.sin(i * 3) * 0.8, 2.6 - u * 2.4, c0.position.z + Math.cos(i * 3) * 0.6); }); }
      if (r > 1.4) { c1.userData.arms.R.rotation.set(-1.2, 0, -0.4 + Math.sin(t * 14) * 0.5); A.heat.visible = true; A.heat.position.set(c1.position.x, 1.6, c1.position.z); A.heat.material.opacity = 0.35 + 0.15 * Math.sin(t * 5); }
      if (r > 2.2) { c2.userData.arms.L.rotation.set(-0.8, 0, 0.9); c2.userData.arms.R.rotation.set(-0.8, 0, -0.9); c2.userData.head.rotation.x = 0.35; }
      if (r > 3.0) { c3.userData.arms.R.rotation.set(-2.2, 0, -0.2); A.cup.visible = true; c3.updateMatrixWorld(true); c3.userData.arms.R.userData.hand.getWorldPosition(A.cup.position); A.cup.position.y += 0.1; }
    }
    if (inB(t, 'ar5') && ph(t, 'ar5') > 0.8) { BUB.push({ o: A.st[2], dy: 1.9, txt: 'หา?!', c: '#fff', big: true }); BUB.push({ o: A.st[5], dy: 1.9, txt: 'ยาวจะตาย', c: '#fff' }); }
    if (inB(t, 'ar2')) A.st.forEach((c, i) => { c.position.y = ST.ARAKA[1] + Math.abs(Math.sin(t * 3 + i)) * 0.04; }); }

  /* simile garden */
  { const D = s.sim;
    { const r = inB(t, 's1') ? ph(t, 's1') : t < at('s1') ? 0 : 9; const k = sm(0.6, 2.8, r); D.dew.sun.position.y = 0.5 + U.lerp(0.2, 5.2, U.easeOut(k)); const dk = 1 - sm(2.0, 3.6, r); ss2(D.dew.drop, dk); }
    { const on = between(t, 's1', 's3'); D.bub.rain.forEach((q) => { const u = (t * 1.6 + q.userData.ph) % 1; q.position.y = 0.5 + 4.6 - u * 4.4; q.visible = on; });
      D.bub.bubs.forEach((b) => { const u = (t * 0.55 + b.userData.ph) % 1; const k = u < 0.7 ? U.easeOut(u / 0.7) : 0; b.scale.setScalar(Math.max(0.001, k * (0.7 + 0.5 * ((b.userData.ph * 7) % 1)))); b.visible = k > 0.01; }); }
    { const r = inB(t, 's3') ? ph(t, 's3') : -9; const k = U.easeIO(sm(0.5, 2.6, r)); const sx = U.lerp(-1.8, 1.8, k); D.stick.stick.position.x = SIMX(3) + sx + 0.25; D.stick.stick.visible = r > 0.2 && r < 3.4;
      D.stick.trail.forEach((q, i) => { const px = -1.6 + i * 0.21, tPass = 0.5 + 2.1 * U.clamp((px + 1.8) / 3.6); const age = r - tPass; q.visible = age > 0 && age < 0.9; q.material.opacity = 0.9 * (1 - age / 0.9); }); }
    { D.riv.fl.forEach((f) => { const u = (t * 0.32 + f.userData.ph) % 1, i = Math.min(11, Math.floor(u * 12)), w = u * 12 - i, a = D.riv.pts[i], b = D.riv.pts[i + 1]; f.position.set(SIMX(4) + U.lerp(a[0], b[0], w), 0.58 + U.lerp(a[1], b[1], w), ST.SIM[2] + U.lerp(a[2], b[2], w)); f.lookAt(SIMX(4) + b[0], 0.58 + b[1], ST.SIM[2] + b[2]); }); }
    { const r = inB(t, 's5') ? ph(t, 's5') : -9, m = D.spit.man; rest(m); m.userData.arms.L.rotation.set(0, 0, -0.5); m.userData.arms.R.rotation.set(0, 0, 0.5);
      let dv = false; for (const t0 of [1.0, 3.0]) { const q = r - t0; if (q > -0.3 && q < 0.15) m.userData.head.rotation.z = -0.25 * sm(-0.3, 0, q); if (q > 0 && q < 0.9) { dv = true; m.updateMatrixWorld(true); m.userData.head.getWorldPosition(tmpV); const k = q / 0.9; D.spit.drop.position.set(tmpV.x + 0.45 + k * 2.6, tmpV.y - 0.1 + Math.sin(k * Math.PI) * 0.6 - k * 1.6, tmpV.z + 0.3 + k * 1.0); D.spit.drop.scale.setScalar(1 - k * 0.6); } }
      D.spit.drop.visible = dv; }
    { const r = inB(t, 's6') ? ph(t, 's6') : -9, M0 = D.pan.meat; M0.visible = r > 0.5 && r < 2.9; const fall = U.easeIn ? U.easeIn(sm(0.5, 1.1, r)) : sm(0.5, 1.1, r) ** 2;
      const shrink = 1 - sm(1.3, 2.8, r); M0.position.set(SIMX(6) + 0.2, 0.5 + U.lerp(3.6, 1.42, fall), ST.SIM[2] + 0.1); M0.scale.set(Math.max(0.01, shrink), Math.max(0.01, shrink), Math.max(0.01, shrink)); M0.rotation.y = r; M0.material.color.set(shrink < 0.7 ? '#8a4a3a' : '#d8646a');
      D.pan.steam.forEach((st, i) => { const u = ((t * 0.7 + i / 6) % 1); st.visible = r > 1.2 && r < 3.6; st.position.set(SIMX(6) + Math.sin(i * 2.1) * 0.5, 2.0 + u * 2.2, ST.SIM[2] + Math.cos(i * 2.1) * 0.3); st.scale.setScalar(0.6 + u * 1.2); st.material.opacity = 0.5 * (1 - u); });
      D.pan.fire.userData.f.scale.set(1, 1 + Math.sin(t * 13) * 0.15, 1); } }

  /* Buddha + count */
  { const Bd = s.bud; Bd.monks.forEach((c, i) => { c.userData.head.rotation.x = 0.1 + Math.sin(t * 1.2 + i) * 0.04; });
    const C = s.cnt; const r1 = inB(t, 'c1') ? ph(t, 'c1') : t > end('c1') ? 9 : 0, barOn = between(t, 'c1', 'c2');
    C.bars.forEach((b, i) => { const k = U.easeBack(sm(0.4 + i * 0.5, 1.2 + i * 0.5, r1)); const fade = inB(t, 'c2') ? 1 - sm(0.2, 1.0, ph(t, 'c2')) : 1; b.scale.y = Math.max(0.01, 3 * k * fade); b.visible = barOn && k > 0.01 && fade > 0.02; const lb = b.userData.lb; lb.visible = b.visible && inB(t, 'c1'); lb.position.set(b.position.x, b.scale.y + 0.9, b.position.z); });
    const wr = inB(t, 'c2') ? ph(t, 'c2') : t > end('c2') ? 9 : -1; C.wall.count = Math.round(1200 * U.easeIO(sm(0.6, 3.4, wr))); C.wall.visible = between(t, 'c2', 'c2') && C.wall.count > 0;
    const mr = inB(t, 'c3') ? ph(t, 'c3') : t > end('c3') ? 9 : -1; const mn = Math.round(72000 * U.easeIO(sm(0.4, 3.6, mr))); C.meals.geometry.setDrawRange(0, mn); C.meals.visible = between(t, 'c3', 'c4') && mn > 0;
    { const dk = inB(t, 'c4') && ph(t, 'c4') > 1.0; if (dk !== C.meals.userData.darkOn) { C.meals.userData.darkOn = dk; const col = C.meals.geometry.attributes.color, sk = C.meals.userData.skip, cc = dk ? C.meals.userData.dark : C.meals.userData.base, bb = C.meals.userData.base; for (let i = 0; i < sk.length; i++) { const c0 = sk[i] ? cc : bb; col.setXYZ(i, c0.r, c0.g, c0.b); } col.needsUpdate = true; } }
    const bowlsOn = between(t, 'c3', 'c4'); C.bowls.forEach((b, i) => { b.visible = bowlsOn; setP(b, 'COUNT', -3.2 + i * 1.4, 0.32 + Math.abs(Math.sin(t * 2 + i)) * 0.05, 4.6 - (i % 2) * 0.5); });
    vis(C.mom, inB(t, 'c3')); vis(C.baby, inB(t, 'c3')); if (inB(t, 'c3')) { setP(C.mom, 'COUNT', 3.4, 0, 4.2); face(C.mom, -0.4, 1); lapHands(C.mom); setSit(C.baby, true); setP(C.baby, 'COUNT', 3.4, 0.55, 4.6); face(C.baby, -0.6, 1); } }

  /* Thai life road */
  { const Th = s.th, on = between(t, 'th1', 'th3'); vis(Th.you, inB(t, 'th2') && ph(t, 'th2') > 3.4 || inB(t, 'th3')); Th.you.userData.lb.visible = !inB(t, 'th3'); Th.you.children[0].scale.setScalar(1 + 0.08 * Math.sin(t * 4));
    const cx = s.cow.visible ? s.cow.position.x : -1e9; Th.ticks.forEach((tk) => { const lit = on && tk.position.x < cx; tk.material.color.set(lit ? P.gold : '#8a6a40'); }); }

  /* cause: tablet + dominoes */
  { const Z = s.cz; Z.glow.material.opacity = 0.45 + 0.2 * Math.sin(t * 2.5); vis(Z.verse, between(t, 'why1', 'why2'));
    const fallAt = (i) => (i < 5 ? at('dom1') + (1.2 + i * 0.75) * dur('dom1') / PLAN.dom1 : at('dom2') + 1.4 * dur('dom2') / PLAN.dom2);
    const tilt = Math.asin(1.9 / 3.0) * 0.98;
    let rewind = 0, lifted = 0;
    if (inB(t, 'dom4')) { const r = ph(t, 'dom4'); rewind = U.easeIO(sm(0.2, 1.2, r)); lifted = U.easeIO(sm(1.6, 2.8, r)); }
    if (inB(t, 'dom5') || t >= end('dom5')) { rewind = 1; lifted = 1; }
    Z.dom.forEach((d, i) => { const q = U.clamp((t - fallAt(i)) / 0.45); let ang = (i < 5 ? tilt : Math.PI / 2 * 0.98) * (q * q); if (rewind > 0) ang *= 1 - rewind; d.rotation.z = -ang;
      d.position.set(ST.CAUSE[0] - 4.5 + i * 1.9, i === 0 ? lifted * 3.2 : 0, ST.CAUSE[2]); d.visible = !(i === 0 && lifted >= 0.999 && inB(t, 'dom5')); d.userData.lb.visible = !(i === 0 && lifted > 0.5); });
    { const k = between(t, 'dom1', 'dom3') ? U.easeBack(sm(0, 0.5, (t - fallAt(4) - 0.4) * PLAN.dom1 / dur('dom1'))) : 0; Z.cradle.scale.setScalar(Math.max(0.001, k)); Z.cradle.visible = k > 0.01; setP(Z.cradle, 'CAUSE', -4.5 + 4 * 1.9 + 0.6, 0, 2.0); }
    { const on = inB(t, 'dom4') && ph(t, 'dom4') > 1.0; Z.hand.visible = on; if (on) { const r = ph(t, 'dom4'); const dn = sm(1.0, 1.6, r), up = sm(1.6, 2.8, r); Z.hand.position.set(ST.CAUSE[0] - 4.7, 6.8 - dn * 3.1 + up * 3.2, ST.CAUSE[2]); } } }

  /* sea */
  { const Sx = s.sea, gOn = between(t, 't1', 't3'); vis(Sx.globe, gOn); vis(Sx.stars, gOn); vis(Sx.gy, gOn && t >= at('t2')); vis(Sx.gt, gOn && t >= at('t2') && false);
    Sx.globe.rotation.y = t * 0.05; vis(Sx.ring, gOn && t >= at('t2')); vis(Sx.ringT, false);
    let ylon = 10, ylat = 12;
    if (inB(t, 't3')) { const k = U.easeIO(sm(0.6, 4.6, ph(t, 't3'))); ylon = U.lerp(10, 165, k); ylat = U.lerp(12, 30, Math.sin(k * Math.PI)); }
    if (t >= end('t3')) ylon = 165;
    onGlobe(Sx.gy, ylat, ylon, 0.05); onGlobe(Sx.ring, ylat, ylon, 0.12); Sx.ring.rotateX(-Math.PI / 2); Sx.ring.material.depthTest = false; Sx.ring.renderOrder = 6; Sx.ring.material.opacity = 0.6 + 0.3 * Math.sin(t * 5);
    const arOn = inB(t, 't3'); Sx.arrows.forEach((a, i) => { a.visible = arOn && i < 2; if (!a.visible) return; const u = (t * 0.6 + i * 0.5) % 1; if (i === 0) { a.rotation.set(0, 0, Math.PI); a.position.fromArray(P3('SEA', 3.2 - u * 5.4, 4.6, 6.0)); } else { a.rotation.set(0, 0, -Math.PI / 2); a.position.fromArray(P3('SEA', -2.6, 7.8 - u * 4.2, 6.0)); } });
    Sx.windLab.forEach((lb, i) => { lb.visible = false; lb.position.fromArray(i ? P3('SEA', -1.6, 8.9, 6.4) : P3('SEA', 1.2, 3.6, 6.4)); });
    const oOn = between(t, 't4', 't5'); vis(Sx.ocean, oOn); vis(Sx.oy, oOn); vis(Sx.ot, oOn); Sx.splash.visible = false;
    if (oOn) { const pa = Sx.ocean.geometry.attributes.position; for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), y = pa.getY(i); pa.setZ(i, Math.sin(x * 0.35 + t * 1.6) * 0.12 + Math.cos(y * 0.4 + t * 1.2) * 0.1); } pa.needsUpdate = true;
      const r4 = inB(t, 't4') ? ph(t, 't4') : -1, r5 = inB(t, 't5') ? ph(t, 't5') : -1; let ty = -2.2, yx = 7, yz = -2;
      if (r4 >= 0) { ty = U.lerp(-2.2, 0.05, U.easeOut(sm(1.8, 2.6, r4))) - 2.3 * sm(4.4, 5.3, r4); yx = 7.5 - r4 * 0.1; }
      if (r5 >= 0) { ty = U.lerp(-2.2, 0.05, U.easeOut(sm(2.0, 2.8, r5))); yx = U.lerp(6.5, 1.25, U.easeIO(sm(0, 3.0, r5))); yz = U.lerp(-1.5, -0.2, sm(0, 3.0, r5)); }
      setP(Sx.oy, 'OCEAN', yx, 0.12 + Math.sin(t * 1.8) * 0.06, yz); Sx.oy.rotation.set(Math.sin(t * 1.3) * 0.05, 0.3 + Math.sin(t * 0.5) * 0.15, Math.sin(t * 1.6) * 0.06);
      setP(Sx.ot, 'OCEAN', 0, ty - 0.1, 0); Sx.ot.rotation.set(0, -0.3, 0.25 * U.clamp(ty + 2.2)); Sx.ot.userData.neck.rotation.z = 0.3 + Math.sin(t * 2) * 0.1;
      Sx.ot.userData.fl.forEach((f, i) => { f.rotation.x = Math.sin(t * 3 + i) * 0.4; });
      const sp = r4 >= 0 ? sm(2.0, 3.2, r4) : r5 >= 0 ? sm(2.3, 3.5, r5) : 0; if (sp > 0 && sp < 1) { Sx.splash.visible = true; setP(Sx.splash, 'OCEAN', 1.3, 0.12, 0); Sx.splash.scale.setScalar(1 + sp * 3); Sx.splash.material.opacity = 0.8 * (1 - sp); }
      if (r5 > 3.2 && r5 < 5.6) BUB.push({ o: Sx.oy, dy: 1.0, dx: -0.5, txt: 'เกือบ!', c: '#fff', big: true }); } }

  /* end road */
  { const E = s.end, me = E.me; rest(me); setSit(me, false); me.userData.ring.visible = true; E.gift.visible = false; E.ants.forEach((a) => (a.visible = false)); vis(E.medi, false);
    const onE = t >= at('t6'); vis(me, onE); vis(E.old, onE); vis(E.calm, between(t, 'a5', 'end')); E.lights.forEach((o, i) => { const sh = t >= at('a1') && (inB(t, 'a1') ? ph(t, 'a1') > 1.4 + i * 0.7 : true); o.visible = sh; o.position.y = ST.END[1] + 3.2 + Math.sin(t * 2 + i) * 0.15; });
    let mx = ST.END[0] - 11.5, mz = 2.2, wk = 0, fx0 = 1, fz0 = 0;
    if (inB(t, 't6')) { const r = ph(t, 't6'); fx0 = 0.4; fz0 = -1; if (r > 2.8) { fx0 = 1; fz0 = 0.6; } }
    else if (inB(t, 'a1')) { fx0 = 0.6; fz0 = 1; }
    else if (inB(t, 'a2')) { const k = U.easeIO(sm(0.4, 4.4, ph(t, 'a2'))); mx = U.lerp(ST.END[0] - 11.5, ST.END[0] - 8.0, k); mz = U.lerp(2.2, 0.0, k); wk = k > 0 && k < 1 ? 1 : 0; fx0 = 1; fz0 = -0.6; }
    else if (inB(t, 'a3')) { const r = ph(t, 'a3'); mx = ST.END[0] - 8.0; mz = 0; fx0 = -0.6; fz0 = -1; me.userData.arms.R.rotation.set(-1.3 * sm(0.4, 1.2, r), 0, 0.1); me.userData.arms.L.rotation.set(-1.3 * sm(0.4, 1.2, r), 0, -0.1);
      E.gift.visible = true; me.updateMatrixWorld(true); me.userData.arms.R.userData.hand.getWorldPosition(tmpV); const k = sm(1.6, 2.6, r); const ox = E.old.position;
      E.gift.position.set(U.lerp(tmpV.x - 0.15, ox.x + 0.3, k), U.lerp(tmpV.y, 0.95, k), U.lerp(tmpV.z, ox.z + 0.4, k)); if (r > 2.8) BUB.push({ o: E.old, dy: 1.8, txt: 'ขอบใจนะหลาน', c: '#fff' }); }
    else if (inB(t, 'a4')) { const r = ph(t, 'a4'); const k = U.easeIO(sm(0, 1.6, r)); mx = U.lerp(ST.END[0] - 8.0, ST.END[0] - 1.6, k); mz = 0.3; wk = k < 1 ? 1 : 0; fx0 = 1; fz0 = 0.2; if (k >= 1) { me.userData.head.rotation.x = 0.45; }
      E.ants.forEach((a, i) => { a.visible = true; const u = (t * 0.12 + i / 12) % 1; a.position.set(ST.END[0] - 0.2 + Math.sin(i) * 0.08, 0.08, 2.4 - u * 4.2); }); }
    else if (t >= at('a5')) { mx = ST.END[0] + 9; mz = -1.3; if (inB(t, 'a5') && ph(t, 'a5') < 1.0) { const k = U.easeIO(sm(0, 1.0, ph(t, 'a5'))); mx = U.lerp(ST.END[0] + 6.5, ST.END[0] + 9, k); mz = U.lerp(0.2, -1.3, k); wk = 1; } else { setSit(me, true); lapHands(me); me.userData.eyes.forEach((e) => (e.scale.y = 0.15)); }
      if (t >= at('a6')) { setSit(me, false); rest(me); me.userData.eyes.forEach((e) => (e.scale.y = 1)); const k = (t - at('a6')) * 0.5; mx = ST.END[0] + 9 + k; mz = 1.6; wk = 1; } fx0 = t >= at('a6') ? 1 : 0; fz0 = t >= at('a6') ? 0 : 1; }
    if (!(t >= at('a5') && t < at('a6') && ph(t, 'a5') >= 1.0) && !inB(t, 'a5')) me.userData.eyes.forEach((e) => (e.scale.y = 1));
    me.position.set(mx, 0, mz); face(me, fx0, fz0); if (wk) walk(me, t, 1);
    if (t >= at('a6')) E.lights.forEach((o, i) => { o.position.set(me.position.x - 1.2 - i * 0.9, 2.4 + Math.sin(t * 2 + i) * 0.2, me.position.z + Math.sin(t + i) * 0.4); });
    vis(E.sunrise, t >= at('a6')); E.sunrise.position.set(ST.END[0] + 26, 3 + 6 * sm(at('a6'), at('pay2') + 2, t), -48);
    E.calm.material.opacity = 0.4 + 0.2 * Math.sin(t * 2); E.calm.position.set(ST.END[0] + 9, 1.2, -1.3); if (t >= at('a6')) E.calm.visible = false; }

  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.12); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
  window.__dbg = { s, camera };
}
function ss2(o, k) { o.scale.setScalar(Math.max(0.0001, k)); o.visible = k > 0.002; }
