/* Part D v2: camera, backgrounds, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const mfr = (lon, lat, ly, d, h, sx) => { const [x, z] = mapXZ(lon, lat); const look = [x, ly, z]; return { look, pos: [x + (sx || 0), ly + h * 1.25, z + d * 1.25], fov: 40 }; };
const SHOT = {
  cover: [[0, L.LAND ? fr('PEN', -2.6, 2.3, -0.6, 6.2, 0.4, -1.2) : fr('PEN', 0, 2.5, -0.6, 6.2, 0.4, 0.6)]],
  hook1: [[0, fr('HEAV', 0, 4.4, -1, 11, 0.4, 0.6)]],
  hook2: [[0, fr('HEAV', 0, 3.2, 0.5, 7, 0.4, 1.2)]],
  src1: [[0, mfr(84, 26, 0.3, 15, 19, 0)], [2.2, mfr(PL.ind[0], PL.ind[1] + 4, 0.5, 9, 11, 0)]],
  src2: [[0, mfr(93, 17, 0.4, 19, 24, 0)]],
  fam1: [[0, fr('HERM', 0.6, 3.0, -1, 13, 1.2, 0)]],
  fam2: [[0, fr('HERM', -2.8, 3.4, -2.2, 8, 0.4, -0.6)]],
  fam3: [[0, fr('HERM', 2.0, 2.4, -0.6, 6.5, 0.6, 1.0)]],
  fam4: [[0, fr('HERM', 1.4, 1.9, 0.6, 5.4, 0.6, 0.4)]],
  fam5: [[0, fr('HERM', 2.8, 1.8, 0.6, 6.5, 0.6, 0.4)]],
  fam6: [[0, fr('HERM', 0, 2.6, -0.4, 11, 1.0, 0.4)]],
  fam7: [[0, fr('HERM', -2.3, 2.6, -0.8, 6.2, 0.4, -0.6)]],
  fam8: [[0, fr('HERM', -0.6, 2.4, 0, 9.5, 0.8, 0.6)]],
  fam9: [[0, fr('HERM', 1.2, 1.6, 0.9, 3.8, 0.3, 0.4)]],
  tp1: [[0, fr('PEN', 0, 3.0, -1.4, 13.5, 1.2, 0)]],
  tp2: [[0, fr('PEN', 0, 2.4, -0.6, 7.5, 0.7, 0.9)]],
  tp3: [[0, fr('PEN', 0, 2.4, -0.6, 7, 0.6, -0.9)]],
  tp4: [[0, fr('PEN', 0, 2.0, -0.6, 4.6, 0.3, 0.5)]],
  bn1: [[0, fr('PEN', 1.1, 3.4, -0.8, 10.5, 0.4, 0.8)]],
  bn2: [[0, fr('PEN', 1.1, 3.2, -0.8, 9.5, 0.4, 1.2)]],
  bn3: [[0, fr('PEN', 0.6, 3.6, -1.2, 10.5, 0.5, 0.4)]],
  bn4: [[0, fr('PEN', 0, 3.4, -0.4, 9.5, 0.4, -0.8)]],
  bn5: [[0, fr('PEN', 0, 2.6, -0.8, 7, 0.4, 0)]],
  bn6: [[0, fr('PEN', -3.2, 2.6, -1.8, 6.5, 0.4, -0.4)]],
  bn7: [[0, fr('PEN', -3.0, 2.4, -1.8, 7.5, 0.6, 0.6)]],
  bn8: [[0, fr('PEN', -2.2, 2.4, -1.6, 7.5, 0.8, 1.2)]],
  bn9: [[0, fr('PEN', 3.4, 2.3, -2.4, 5.8, 0.4, 0.6)]],
  lk1: [[0, fr('LANKA', 1.0, 3.0, -1, 13, 1.6, 2.0)]],
  lk2: [[0, fr('LANKA', -3.2, 2.8, -0.6, 10, 1.0, 0.6)]],
  lk3: [[0, fr('LANKA', 0, 4.4, -2, 11, 0.6, 0.6)]],
  kl1: [[0, fr('KAIL', 0, 4.4, -1, 13, 0.6, 2.4)]],
  kl2: [[0, fr('KAIL', 0, 3.0, 0.2, 9.5, 0.2, 1.4)]],
  kl3: [[0, fr('TOP', -0.2, 2.6, -2.6, 6.5, 0.6, 0.6)], [2.2, fr('KAIL', 0, 2.6, 0.4, 7.5, 0.3, -1.2), true]],
  kl4: [[0, fr('KAIL', 0, 6.0, -4, 18, 0.6, 1.6)]],
  kl5: [[0, fr('KAIL', 0, 3.2, 0.4, 8.5, 0.3, -0.8)]],
  kl6: [[0, fr('ELL', 0, 4.6, -2, 11.5, 0.2, 0.4)]],
  sv1: [[0, fr('HEAV', 0, 3.0, 0, 11, 0.8, 1.6)]],
  sv2: [[0, fr('HEAV', 0, 4.2, -1, 10, 0.2, 0)]],
  sv3: [[0, fr('AYO', 0, 2.2, -1.0, 8.5, 1.8, 1.0)]],
  sv4: [[0, fr('LANKA', 0, 2.8, -2.4, 6.5, 0.4, 0.6)], [2.8, fr('AYO', 0, 1.9, -0.8, 6.2, 1.5, 0.8), true]],
  recap: [[0, fr('AYO', 0, 2.6, -1, 10, 1.8, 0.6)]],
  next: [[0, fr('AYO', 0, 2.2, -1.0, 7.5, 1.6, 0.8)]],
  ask: [[0, fr('PEN', 0, 2.6, -1.0, 6.5, 0.4, 0.4)]],
};
const CUT = new Set(['hook1', 'src1', 'fam1', 'tp1', 'lk1', 'kl1', 'kl6', 'sv1', 'sv3', 'sv4', 'recap', 'ask']);
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const segsS = SHOT[id];
    segsS.forEach((sg, j) => {
      const t0 = at(id) + sg[0], t1 = j + 1 < segsS.length ? at(id) + segsS[j + 1][0] : end(id), f = sg[1], fe = push(f, 0.93);
      const cut = j === 0 ? CUT.has(id) : !!sg[2];
      if (prev) {
        if (cut) { keys.push(Object.assign({ t: t0 - 0.002 }, prev)); keys.push(Object.assign({ t: t0 }, f)); }
        else { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[1] - f.look[1], prev.look[2] - f.look[2]) > 10; keys.push(Object.assign({ t: t0 }, prev)); keys.push(Object.assign({ t: t0 + Math.min(far ? 2.2 : 1.1, (t1 - t0) * 0.45) }, f)); }
      } else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();
/* real cuts inside beats need the iris too */
IRIS.push({ t: at('kl3', 2.2) - 0.2, dur: 0.4, type: 'iris' }, { t: at('sv4', 2.8) - 0.25, dur: 0.5, type: 'iris' });

const BG = { pen: ['#1c0e06', '#8a4a1e'], map: ['#0f1630', '#1b2a55'], sky: ['#26327a', '#6f82d6'], dark: ['#151432', '#3f3f7a'], lanka: ['#0b1430', '#2a3f7a'], herm: ['#2a4a6a', '#9fc4d8'], ell: ['#3a2a1a', '#c9a070'], ayo: ['#2a1608', '#c9803a'] };
function sceneOf(t) {
  const id = beatAt(t);
  if (id === 'sv4') return rel(t, 'sv4') < 2.8 ? 'lanka' : 'ayo';
  if (['cover', 'ask', 'end'].includes(id) || id.startsWith('tp') || id.startsWith('bn')) return 'pen';
  if (['hook1', 'hook2', 'sv1', 'sv2'].includes(id)) return 'heav';
  if (id.startsWith('src')) return 'map';
  if (id.startsWith('fam')) return 'herm';
  if (id.startsWith('lk')) return 'lanka';
  if (id === 'kl6') return 'ell';
  if (id.startsWith('kl')) return 'kail';
  return 'ayo';
}
function bgKey(t) { const sc = sceneOf(t), id = beatAt(t); if (sc === 'pen') return 'pen'; if (sc === 'heav') return id === 'sv2' ? 'sky' : 'dark'; if (sc === 'kail') return ['kl3', 'kl4'].includes(id) ? 'dark' : 'sky'; return sc; }
function bgAt(t) { return BG[bgKey(t)]; }

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const P3 = (st, x, y, z) => [ST[st][0] + x, ST[st][1] + y, ST[st][2] + z];
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
const say = (o, txt, o2) => BUB.push(Object.assign({ o, txt, c: '#fff', dy: 2.1 }, o2 || {}));
function resetFig(ch) { ch.rotation.set(0, ch.rotation.y, 0); rest(ch); ch.userData.head.rotation.set(0, 0, 0); ch.userData.eyes.forEach((e) => (e.scale.y = 1)); }
function headsLeft(t) {
  if (t < at('hook1')) return 1;
  if (t < at('tp2')) return 10;
  if (inB(t, 'tp2')) return rel(t, 'tp2') > 2.8 ? 9 : 10;
  if (inB(t, 'tp3')) return Math.max(1, 9 - Math.floor(Math.max(0, rel(t, 'tp3') - 0.3) / 0.62 + (rel(t, 'tp3') > 0.3 ? 1 : 0)));
  if (t < at('bn5')) return 1;
  if (inB(t, 'bn5')) return 1 + Math.min(9, Math.floor(sm(0.5, 2.3, rel(t, 'bn5')) * 9.99));
  return 10;
}
function headRemoveTimes() { const out = [at('tp2', 2.8)]; for (let i = 0; i < 8; i++) out.push(at('tp3', 0.3 + i * 0.62)); return out; }
const HRT = headRemoveTimes();
function ravArms(R, k, wob, t) { R.userData.xarms.forEach((a, i) => { a.rotation.z = a.userData.base * k + (wob ? Math.sin(t * 2 + i) * 0.08 : 0); a.rotation.x = 0; a.visible = true; }); }
function devaFlee(d, t, i, st, x0, x1, z) { d.visible = true; resetFig(d); d.scale.setScalar(0.85); const k = ((t * 0.22 + i * 0.27) % 1); setP(d, st, U.lerp(x0, x1, k), 0, z + (i % 2) * 1.1); face(d, Math.sign(x1 - x0), 0.1); walk(d, t * 1.5 + i, 1.2); d.userData.arms.L.rotation.set(0, 0, -2.6); d.userData.arms.R.rotation.set(0, 0, 2.6); }

function update(t, s, { camera, W, H }) {
  BUB.length = 0; const id = beatAt(t), sc = sceneOf(t), bk = bgKey(t);
  { const LT = { pen: [0.55, 0.8, '#ffc890'], map: [0.8, 0.8, '#ffffff'], sky: [0.6, 0.8, '#fff4e8'], dark: [0.5, 0.6, '#c8c8ff'], lanka: [0.6, 0.8, '#d8e8ff'], herm: [0.75, 0.9, '#fff4e0'], ell: [0.7, 0.85, '#ffe0b0'], ayo: [0.65, 0.85, '#ffd8a0'] }[bk];
    s.hemi.intensity = LT[0]; s.sun.intensity = LT[1]; s.sun.color.set(LT[2]); }
  s.fog.color.set(bgAt(t)[1]); s.fog.near = 40; s.fog.far = 125;
  const R = s.rav; R.visible = false; resetFig(R); R.scale.setScalar(1.15); R.userData.sword.visible = false; ravArms(R, 1, true, t);
  const hl = headsLeft(t); R.userData.xheads.forEach((h, i) => { const on = i < hl - 1; h.visible = on; if (inB(t, 'bn5')) { const born = at('bn5', 0.5 + i * 0.2); h.scale.setScalar(Math.max(0.001, U.easeBack(sm(born, born + 0.3, t)))); } else h.scale.setScalar(1); });
  s.devas.forEach((d) => (d.visible = false)); vis(s.push, false); vis(s.vish, false); s.vglow.visible = false; vis(s.man, false); s.vorb.visible = false;
  s.sparks.forEach((q) => (q.visible = false)); s.notes.forEach((n) => (n.visible = false)); s.kring.material.opacity = 0;
  s.KG.position.set(0, 0, 0); s.KG.rotation.set(0, 0, 0);

  /* ---------- penance forest ---------- */
  { const p = s.pen, on = sc === 'pen'; vis(p.f, on); vis(p.kum, on); vis(p.vib, on); vis(p.brahma, false); p.glow.visible = false; p.flare.visible = false;
    if (on) {
      p.f.userData.f.scale.set(1, 1 + 0.15 * Math.sin(t * 9), 1);
      R.visible = true; setSit(R, true); setP(R, 'PEN', 0, 0, -1.2); face(R, 0, 1); lapHands(R); ravArms(R, 0.55, true, t);
      resetFig(p.kum); setSit(p.kum, true); lapHands(p.kum); setP(p.kum, 'PEN', -3.3, 0, -2.0); face(p.kum, 0.4, 1); p.kum.rotation.order = 'YXZ'; p.kum.rotation.z = 0;
      resetFig(p.vib); setSit(p.vib, false); anjali(p.vib); setP(p.vib, 'PEN', 3.5, 0, -2.6); face(p.vib, -0.3, 1);
      const meditate = between(t, 'tp1', 'tp3'); if (meditate) { R.userData.eyes.forEach((e) => (e.scale.y = 0.2)); p.kum.userData.eyes.forEach((e) => (e.scale.y = 0.2)); p.vib.userData.eyes.forEach((e) => (e.scale.y = 0.2)); }
      /* head offered: flare + sparks */
      for (let k = 0; k < HRT.length; k++) { const u = sm(HRT[k], HRT[k] + 0.6, t); if (u > 0 && u < 1) { p.flare.visible = true; setP(p.flare, 'PEN', 0, 1.2, 1.1); p.flare.scale.setScalar(2 + u * 4); p.flare.material.opacity = 1 - u; s.sparks.forEach((q, j) => { q.visible = true; setP(q, 'PEN', Math.sin(j * 2.1) * 0.6 * u, 1 + u * 2.6 + j * 0.1, 1.1 + Math.cos(j * 1.7) * 0.5 * u); q.material.opacity = 0.9 * (1 - u); }); } }
      const swordUp = (k) => { R.userData.sword.visible = true; R.userData.arms.R.rotation.set(-2.5 * k, 0, -0.6 * k); };
      if (id === 'cover') { swordUp(1); R.userData.head.rotation.x = -0.15; p.flare.visible = true; setP(p.flare, 'PEN', 0, 1.3, 1.1); p.flare.scale.setScalar(4 + Math.sin(t * 6) * 0.4); p.flare.material.opacity = 0.7; }
      if (inB(t, 'tp2') || inB(t, 'tp3')) { const r = inB(t, 'tp2') ? rel(t, 'tp2') : rel(t, 'tp3'); const near = HRT.some((h) => t > h - 0.9 && t < h + 0.1); if (near) swordUp(1); }
      if (inB(t, 'tp4')) { const r = rel(t, 'tp4'); swordUp(sm(0.2, 1.4, r)); R.userData.eyes.forEach((e) => (e.scale.y = 1)); R.userData.head.rotation.x = -0.2; }
      const bra = t >= at('bn1') && t < at('bn6');
      if (bra) { vis(p.brahma, true); const k = inB(t, 'bn1') ? U.easeOut(sm(0, 1.2, rel(t, 'bn1'))) : 1; setP(p.brahma, 'PEN', 2.3, U.lerp(7, 0.5, k), -0.5); p.brahma.scale.setScalar(1.0); face(p.brahma, -1, 0.4); p.glow.visible = true; p.glow.position.copy(p.brahma.position).add(s.tmpA.set(0, 1.3, -0.5)); p.glow.material.opacity = 0.6 + 0.2 * Math.sin(t * 3); p.brahma.userData.arms.R.rotation.set(-1.2, 0, 0.2);
        R.userData.head.rotation.y = 0.5 * k; R.userData.eyes.forEach((e) => (e.scale.y = 1));
        if (inB(t, 'bn1') && rel(t, 'bn1') < 1.2) swordUp(1 - sm(0.3, 1.0, rel(t, 'bn1')));
        if (inB(t, 'bn1')) { const rk = sm(0.2, 1.4, rel(t, 'bn1')); setP(s.kring, 'PEN', 1.9, 0.05, -0.9); s.kring.scale.setScalar(0.6 + rk * 4); s.kring.material.opacity = 0.9 * (1 - rk) * (rk > 0 ? 1 : 0); }
        if (inB(t, 'bn2')) { const r = rel(t, 'bn2'); if (r > 0.3 && r < 2.6) say(R, 'ขอเป็นอมตะ!', { dy: 2.0 }); if (r > 2.4) { p.brahma.userData.head.rotation.y = Math.sin(r * 9) * 0.35; say(p.brahma, 'ไม่ได้', { dy: 2.2, c: '#ffb3b3' }); } }
        if (inB(t, 'bn4')) { const r = rel(t, 'bn4'); vis(s.man, true); const k2 = U.easeOut(sm(0.3, 1.8, r)); setP(s.man, 'PEN', U.lerp(-4, -1.5, k2), 0, 1.4); face(s.man, 1, -0.2); resetFig(s.man); if (k2 < 1) walk(s.man, t, 1); R.userData.head.rotation.y = -0.5; }
        if (inB(t, 'bn5')) { const g = sm(0.4, 2.4, rel(t, 'bn5')); p.flare.visible = true; p.flare.position.copy(R.position).add(s.tmpA.set(0, 1.9, 0.2)); p.flare.scale.setScalar(4 + g * 3); p.flare.material.opacity = 0.5 * Math.sin(g * Math.PI); } }
      if (between(t, 'bn6', 'bn8')) { const K = p.kum; K.userData.eyes.forEach((e) => (e.scale.y = 1));
        if (inB(t, 'bn6')) { const r = rel(t, 'bn6'); K.userData.arms.R.rotation.set(-2.2, 0, 0.2); if (r > 0.6) say(K, 'ขอให้เทวดา…', { dy: 2.0 }); if (r > 3.2) { p.flare.visible = true; p.flare.material.opacity = 0.6; p.flare.scale.setScalar(1.2); K.userData.head.getWorldPosition(p.flare.position); p.flare.position.z += 0.5; } }
        if (inB(t, 'bn7')) { const r = rel(t, 'bn7'); if (r < 1.6) say(K, '…นอนหลับ!?', { dy: 2.0 }); const k = U.easeIO(sm(1.6, 2.8, r)); K.rotation.order = 'YXZ'; K.rotation.z = k * 1.3; K.position.y += k * 0.3; K.userData.eyes.forEach((e) => (e.scale.y = 1 - k * 0.9)); if (r > 2.8) say(K, 'Zzz', { dy: 1.5, big: true }); }
        if (inB(t, 'bn8')) { const r = rel(t, 'bn8'); K.rotation.order = 'YXZ'; K.rotation.z = 1.3; K.position.y += 0.3 + Math.sin(t * 2) * 0.03; K.userData.eyes.forEach((e) => (e.scale.y = 0.1)); say(K, 'Zzz', { dy: 1.5, big: true }); R.userData.head.rotation.y = -0.6; if (r > 1.6) say(R, 'ตื่นนน!', { dy: 2.2 }); } }
      if (t >= at('bn9')) { const K = p.kum; K.rotation.order = 'YXZ'; K.rotation.z = 1.3; K.position.y += 0.3; K.userData.eyes.forEach((e) => (e.scale.y = 0.1)); }
      if (inB(t, 'bn9')) { p.glow.visible = true; p.glow.position.copy(p.vib.position).add(s.tmpA.set(0, 1.6, -0.4)); p.glow.material.opacity = 0.55 + 0.15 * Math.sin(t * 3); p.vib.userData.eyes.forEach((e) => (e.scale.y = 0.25)); }
      if (id === 'ask') { ravArms(R, 1, true, t); R.userData.head.rotation.x = -0.15; say(R, '?', { big: true, dy: 2.3 }); }
    } }

  /* ---------- heaven (hook / sv) ---------- */
  if (sc === 'heav') {
    R.visible = true; setSit(R, false); setP(R, 'HEAV', 0, 0.3, -1.0); face(R, 0, 1); R.userData.sword.visible = true; R.userData.arms.R.rotation.set(-2.2, 0, 0.3);
    vis(s.push, true); setP(s.push, 'HEAV', 0, -0.05 + 0.1 * Math.sin(t * 2), -1.0); s.push.scale.setScalar(0.95); s.push.rotation.y = 0;
    if (id === 'hook1' || id === 'sv1') s.devas.forEach((d, i) => devaFlee(d, t, i, 'HEAV', -2.5, 8, 1.6 + (i % 3) * 0.7));
    if (id === 'hook1' && rel(t, 'hook1') > 1.2) say(R, 'ฮ่า ๆ ๆ', { dy: 2.6 });
    if (id === 'hook2') { vis(s.man, true); const k = U.easeBack(sm(1.0, 1.8, rel(t, 'hook2'))); s.man.scale.setScalar(Math.max(0.001, 0.5 * k)); resetFig(s.man); setP(s.man, 'HEAV', 0.9, 0, 2.2); face(s.man, -0.3, -1); if (rel(t, 'hook2') > 2.2) say(s.man, '?', { big: true, dy: 1.4 }); }
    if (id === 'sv1' && rel(t, 'sv1') > 1.4) say(s.devas[1], 'หนีเร็ว!', { dy: 1.9 });
    if (id === 'sv2') { R.visible = false; vis(s.push, false); const r = rel(t, 'sv2');
      s.devas.forEach((d, i) => { d.visible = true; resetFig(d); d.scale.setScalar(0.85); const a = -1.2 + i * 0.6; setP(d, 'HEAV', Math.sin(a) * 3.2, 0, 0.4 + Math.cos(a) * 1.4); face(d, -Math.sin(a), -1); anjali(d); });
      const down = U.easeIO(sm(2.8, 4.6, r)); vis(s.vish, down < 0.98); s.vish.scale.setScalar(Math.max(0.001, 1.5 * (1 - down))); setP(s.vish, 'HEAV', 0, 1.6 + 0.12 * Math.sin(t * 2), -1.5); face(s.vish, 0, 1); resetFig(s.vish); anjali(s.vish, 0.5); s.vish.userData.xarms.forEach((a) => (a.rotation.z = a.userData.base + 0.9 * a.userData.side));
      s.vglow.visible = true; setP(s.vglow, 'HEAV', 0, 3.0, -2); s.vglow.material.opacity = 0.6 * (1 - down * 0.5);
      if (down > 0.3) { s.vorb.visible = true; setP(s.vorb, 'HEAV', 0, 2.4 - down * 5, -1.5 + down * 2); } }
  }

  /* ---------- map ---------- */
  { const m = s.map, on = sc === 'map'; m.g.visible = on;
    if (on) {
      const r1 = inB(t, 'src1') ? rel(t, 'src1') : 99; vis(m.book, true); m.book.scale.setScalar(Math.max(0.001, U.easeBack(sm(0.8, 1.4, r1)))); m.book.rotation.y = t * 0.6; m.book.position.y = 0.8 + 0.08 * Math.sin(t * 3);
      vis(m.labs.ind, t >= at('src1', 2.4)); vis(m.labs.th, inB(t, 'src2') && rel(t, 'src2') > 3.0);
      m.arcs.forEach((ln, i) => { const k = inB(t, 'src2') ? sm(0.4 + i * 0.35, 1.6 + i * 0.35, rel(t, 'src2')) : 0; ln.geometry.setDrawRange(0, Math.round(k * 61)); ln.visible = k > 0; });
      const dk = inB(t, 'src2') ? sm(0.4, 2.0, rel(t, 'src2')) : 0; m.dot.visible = dk > 0 && dk < 1; if (m.dot.visible) m.dot.position.copy(m.arcs[1].userData.pts[Math.round(dk * 60)]);
      for (const nm in s.reg.meshes) { const me = s.reg.meshes[nm].material; let e = 0; if (nm === 'India' && t < at('src2', 1)) e = 0.3; if (nm === 'Thailand' && t >= at('src2', 2.4)) e = 0.3 + 0.2 * Math.sin(t * 4); me.emissive.set(nm === 'Thailand' ? P.coral : '#3f6aa8'); me.emissiveIntensity = e; }
    } }

  /* ---------- hermitage ---------- */
  { const h = s.h, on = sc === 'herm'; ['vis', 'kub', 'kai', 'kid', 'kum', 'vib', 'sur', 'push', 'aura'].forEach((k) => vis(h[k], on));
    if (on) {
      [h.vis, h.kub, h.kai, h.kid, h.kum, h.vib, h.sur].forEach((c) => { resetFig(c); face(c, 0, 1); });
      ravArms(h.kid, 1, true, t); h.kid.userData.xheads.forEach((q) => (q.visible = true));
      h.vis.userData.head.rotation.y = Math.sin(t * 0.6) * 0.15; lapHands(h.vis);
      const pr = (t * 0.5) % 6.283; setP(h.push, 'HERM', -3.2 + Math.cos(pr) * 1.6, 3.6 + Math.sin(t * 1.3) * 0.2, -3.6 + Math.sin(pr) * 1.2); h.push.rotation.y = -pr;
      h.aura.material.opacity = (inB(t, 'fam1') || inB(t, 'fam2') || inB(t, 'fam7') ? 0.55 : 0.25) + 0.15 * Math.sin(t * 3);
      const pop = (c, s0, tb) => { const k = U.easeBack(sm(tb, tb + 0.45, t)); c.scale.setScalar(Math.max(0.001, s0 * k)); c.visible = k > 0.01; };
      pop(h.kid, 0.62, at('fam4', 0.4)); pop(h.kum, 0.8, at('fam5', 0.3)); pop(h.vib, 0.6, at('fam5', 1.0)); pop(h.sur, 0.58, at('fam5', 2.2)); pop(h.kai, 1.0, at('fam3', 0.2));
      if (inB(t, 'fam1')) { h.kub.userData.arms.R.rotation.set(0, 0, 1.6); }
      if (inB(t, 'fam2')) { h.kub.userData.arms.R.rotation.set(-2.4, 0, 0.6); h.kub.userData.head.rotation.x = -0.3; }
      if (inB(t, 'fam4')) { const r = rel(t, 'fam4'); if (r > 1.0) say(h.kid, 'อุแว้!', { dy: 1.6 }); }
      if (inB(t, 'fam6') || inB(t, 'fam8')) { face(h.kai, -1, 0.2); h.kai.userData.arms.R.rotation.set(-1.5, 0, 0); h.kid.userData.head.rotation.y = -0.9; face(h.kid, -0.6, 1); if (inB(t, 'fam6') && rel(t, 'fam6') > 3.0) say(h.kid, 'ฮึ่ม!', { dy: 1.5 }); }
      if (inB(t, 'fam7')) { h.kub.userData.arms.L.rotation.set(0, 0, -1.6); h.kub.userData.arms.R.rotation.set(0, 0, 1.6); }
      if (inB(t, 'fam9')) { face(h.kid, -0.5, 1); h.kid.userData.head.rotation.x = 0.15; say(h.kid, '…', { dy: 1.5 }); }
    } }

  /* ---------- Lanka ---------- */
  { const K = s.lk, on = sc === 'lanka'; vis(K.th, on); K.army.forEach((a) => (a.visible = false));
    if (on) {
      const kub = s.h.kub;
      if (id.startsWith('lk')) {
        R.visible = true; setSit(R, false); R.scale.setScalar(1.15);
        if (inB(t, 'lk1') || inB(t, 'lk2')) { const k = inB(t, 'lk1') ? U.easeOut(sm(0, 3.0, rel(t, 'lk1'))) : 1; setP(R, 'LANKA', U.lerp(7, 2.0, k), 0.7, U.lerp(4, 0.2, k)); face(R, -1, -0.4); if (k < 1) walk(R, t, 1); R.userData.sword.visible = true; R.userData.arms.R.rotation.set(-1.2, 0, 0.2);
          K.army.forEach((a, i) => { a.visible = true; resetFig(a); setP(a, 'LANKA', U.lerp(9 + (i % 3), 3.6 + (i % 3) * 0.9, k), 0.7, U.lerp(5, 1.2, k) + Math.floor(i / 3) * 1.2); face(a, -1, -0.3); if (k < 1) walk(a, t + i, 1); });
          vis(kub, true); resetFig(kub); kub.scale.setScalar(1.15); const kk = inB(t, 'lk2') ? U.easeIO(sm(0.8, 4.6, rel(t, 'lk2'))) : 0; setP(kub, 'LANKA', U.lerp(-0.6, -8, kk), 0.7, U.lerp(-1.2, 0.6, kk)); face(kub, kk > 0 ? -1 : 1, kk > 0 ? 0.2 : 0.5); if (kk > 0 && kk < 1) walk(kub, t, 0.6); kub.userData.head.rotation.x = kk > 0 ? 0.35 : 0;
          if (inB(t, 'lk1') && rel(t, 'lk1') > 3.0) say(R, 'ลงกาเป็นของข้า!', { dy: 2.6 }); }
        if (inB(t, 'lk3')) { const r = rel(t, 'lk3'), up = U.easeIO(sm(1.6, 4.8, r)); vis(s.push, true); s.push.scale.setScalar(0.95); s.push.rotation.y = 0; setP(s.push, 'LANKA', U.lerp(0, -2, up), U.lerp(1.0, 7, up), U.lerp(0.5, -1, up)); setP(R, 'LANKA', U.lerp(0, -2, up), U.lerp(1.3, 7.3, up), U.lerp(0.5, -1, up)); face(R, 0, 1); R.userData.arms.L.rotation.set(0, 0, -2.4); R.userData.arms.R.rotation.set(0, 0, 2.4); }
      }
      if (id === 'sv4') { R.visible = true; setSit(R, true); setP(R, 'LANKA', 0, 1.3, -2.4); face(R, 0, 1); R.userData.head.rotation.x = -0.2 + Math.sin(t * 8) * 0.05; R.userData.sword.visible = true; R.userData.arms.R.rotation.set(-1.0, 0, 0.3); say(R, 'ฮ่า ๆ ๆ ใครจะทำอะไรข้าได้', { dy: 2.5 }); }
    } }
  if (sc !== 'lanka' && sc !== 'herm') vis(s.h.kub, false);

  /* ---------- Kailash ---------- */
  { const on = sc === 'kail'; s.kglow.material.opacity = 0.4 + 0.12 * Math.sin(t * 2);
    s.shiva.position.y = 11.7; resetFig(s.shiva); setSit(s.shiva, true); lapHands(s.shiva); resetFig(s.parv); setSit(s.parv, true); anjali(s.parv, 0.4);
    if (on) {
      R.visible = true; setSit(R, false);
      if (inB(t, 'kl1')) { const r = rel(t, 'kl1'), k = U.easeOut(sm(0, 2.4, r)), bump = r > 2.4 ? Math.sin(Math.min(1, (r - 2.4) / 0.5) * Math.PI) * 0.4 : 0; vis(s.push, true); s.push.scale.setScalar(0.95); s.push.rotation.y = 0; setP(s.push, 'KAIL', U.lerp(-9, 0, k), U.lerp(5, 3.2, k) + bump * 0.4, U.lerp(9, 2.2 + bump, k)); R.position.copy(s.push.position).add(s.tmpA.set(0, 0.3, 0)); face(R, 0.2, -1); if (r > 2.6) say(R, 'ไปไม่ได้!?', { dy: 2.4 }); }
      if (between(t, 'kl2', 'kl5')) {
        setP(R, 'KAIL', 0, 0, 0.3); face(R, 0, 1); R.userData.arms.L.rotation.set(0, 0, -2.7); R.userData.arms.R.rotation.set(0, 0, 2.7); R.userData.xarms.forEach((a) => { a.rotation.z = a.userData.side * (2.1 + Math.abs(a.userData.base) * 0.15); });
        if (inB(t, 'kl2')) { const r = rel(t, 'kl2'), sh = sm(0.8, 2.0, r); s.KG.position.set(Math.sin(t * 40) * 0.12 * sh, sh * 0.6 + Math.sin(t * 31) * 0.08 * sh, 0); s.KG.rotation.z = Math.sin(t * 23) * 0.012 * sh; if (r > 1.2) say(R, 'ฮึบบบ!', { dy: 2.6 }); }
        const k3 = inB(t, 'kl3') ? rel(t, 'kl3') : 99;
        if (inB(t, 'kl3')) { if (k3 < 2.2) { s.KG.position.y = 0.6; s.shiva.position.y = 11.7 - 0.15 * sm(0.6, 1.0, k3); const rk = sm(0.9, 2.0, k3); s.kring.material.opacity = 0.9 * (1 - rk) * (rk > 0 ? 1 : 0); s.kring.position.set(-0.7, 11.4 + 0.6, -18.6); s.kring.scale.setScalar(0.6 + rk * 4); }
          else { const sl = sm(2.2, 2.5, k3); s.KG.position.y = 0.6 * (1 - sl) + (k3 < 2.9 ? Math.sin(t * 50) * 0.06 : 0); } }
        if (k3 >= 2.4 || t >= at('kl4')) { R.scale.set(1.15 * 1.08, 1.15 * 0.8, 1.15 * 1.08); R.userData.eyes.forEach((e) => (e.scale.y = 0.3)); }
        if (inB(t, 'kl3') && k3 > 2.5) say(R, 'อ๊ากกกกก!!', { big: true, dy: 2.2, c: '#ffb3b3' });
        if (inB(t, 'kl4') && rel(t, 'kl4') < 2.0) say(R, 'อ๊ากก…', { dy: 2.0 });
      }
      if (t >= at('kl2') && t < at('kl3', 2.2)) s.parv.rotation.z = -0.25;
      if (inB(t, 'kl5')) { const r = rel(t, 'kl5'); setP(R, 'KAIL', 0, 0, 0.3); face(R, 0, 1); const free = r > 3.2; if (!free) { R.scale.set(1.24, 0.92, 1.24); R.userData.arms.L.rotation.set(0, 0, -2.7); R.userData.arms.R.rotation.set(0, 0, 2.7); R.userData.xarms.forEach((a) => (a.rotation.z = a.userData.side * 2.3)); R.userData.head.rotation.z = Math.sin(t * 3) * 0.12; }
        else { R.userData.sword.visible = true; R.userData.arms.R.rotation.set(-2.6 * sm(3.2, 3.8, r), 0, 0.2); const rk = sm(3.2, 4.4, r); setP(s.kring, 'KAIL', 0, 0.05, 0.3); s.kring.scale.setScalar(0.6 + rk * 3); s.kring.material.opacity = 0.9 * (1 - rk); }
        s.notes.forEach((n, i) => { const u = ((r * 0.35 + i * 0.125) % 1); n.visible = r < 3.4; n.position.set(R.position.x + Math.sin(i * 2.3 + u * 3) * 0.9, R.position.y + 2.2 + u * 3.2, R.position.z + 0.3); n.material.opacity = Math.sin(u * Math.PI); }); }
    } }

  /* ---------- Ellora ---------- */
  { const on = sc === 'ell'; s.ell.vis.forEach((p, i) => { p.visible = on; if (on) { resetFig(p); setP(p, 'ELL', -2.2 + i * 3.6 + Math.sin(t * 0.5 + i) * 0.3, 0, 2.6 + i * 0.3); face(p, i ? -0.3 : 0.3, -1); p.userData.arms.R.rotation.set(i ? -2.2 : 0, 0, 0.3); } }); }

  /* ---------- Ayodhya ---------- */
  { const A = s.ay, on = sc === 'ayo'; vis(A.f, on); vis(A.king, on); A.pr.forEach((p) => vis(p, on)); A.glow.visible = on; A.orb.visible = false;
    if (on) { const big = inB(t, 'sv3') ? sm(3.0, 4.4, rel(t, 'sv3')) : 1; A.f.scale.setScalar(1.2 + big * 0.5); A.f.userData.f.scale.set(1, 1 + 0.2 * Math.sin(t * 9), 1); A.glow.scale.setScalar(4 + big * 4); A.glow.material.opacity = 0.45 + big * 0.35 + 0.08 * Math.sin(t * 5);
      A.pr.forEach((p, i) => { p.userData.head.rotation.x = 0.15 * Math.sin(t * 2 + i); });
      if (inB(t, 'sv3')) { const r = rel(t, 'sv3'), k = U.clamp((r - 0.8) / 2.2); if (r > 0.8 && r < 3.1) { A.orb.visible = true; setP(A.orb, 'AYO', 0, U.lerp(8, 1.0, k * k), 0); } }
      if (id === 'sv4' || id === 'next') { const r = id === 'sv4' ? rel(t, 'sv4') - 2.8 : 3; A.glow.scale.setScalar(8 + Math.min(1, r / 2) * 3); } } }

  /* camera + bubbles */
  VE.camAt(CAM, t, camera, 0.12);
  if (inB(t, 'kl3') && rel(t, 'kl3') > 2.3 && rel(t, 'kl3') < 2.9) { camera.position.x += Math.sin(t * 60) * 0.12; camera.position.y += Math.sin(t * 47) * 0.1; }
  camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
}
