/* Part D: camera, light, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; if (['HOME', 'OFFICE', 'CAFE', 'BAR'].includes(st)) h *= 0.62; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const fx = (st, l, p0) => { const c = ST[st]; return { look: [c[0] + l[0], c[1] + l[1], c[2] + l[2]], pos: [c[0] + p0[0], c[1] + p0[1], c[2] + p0[2]], fov: 40 }; };
const COVERF = fr('STREET', 0, 0.6, -4.5, 17, 15, 0);
const OVER = fr('TOWN', 0, 0, 3, 26, 36, 0);
const SHOT = {
  cover: [[0, COVERF]],
  hook1: [[0, fx('TEMPLE', [-4.6, 1.0, 5.2], [-2.0, 3.2, 13.5])]], hook2: [[0, fx('TEMPLE', [0, 2.4, -1], [0, 6.5, 19])]], hook3: [[0, fx('TEMPLE', [2.4, 1.3, 5.2], [3.4, 2.6, 11.8])]],
  c0a: [[0, fx('TEMPLE', [0, 1.3, -0.8], [4.5, 2.9, 7.0])]], c0b: [[0, fx('TEMPLE', [0.3, 1.2, -0.4], [12.5, 4.2, 4.5])]], c0c: [[0, fx('TEMPLE', [0, 1.8, -2.0], [2.6, 3.5, 3.6])]],
  c0d: [[0, fx('TEMPLE', [8.5, 2.6, 3.4], [8.5, 3.6, 20])]], c0e: [[0, fx('TEMPLE', [0, 2.4, 0], [0, 6.5, 18])]],
  c1a: [[0, fr('HOME', -1.4, 1.6, -1.4, 6.5, 1.9, 1.0)]], c1b: [[0, fr('HOME', -0.9, 1.6, -1.2, 8.5, 2.6, 0)]],
  c1c: [[0, fr('HOME', 1.8, 0.9, 1.4, 6.0, 3.0, 0)]], c1d: [[0, fr('HOME', -0.4, 1.5, -0.6, 8, 2.6, 0)]],
  c1e: [[0, fr('HOME', 0.1, 1.2, -3.4, 5.0, 1.5, 0)]], c1f: [[0, fr('HOME', 2.0, 1.8, -2.8, 7.5, 1.8, -1.0)]],
  c2a: [[0, fr('OFFICE', 0, 1.5, -0.9, 7.5, 2.2, 0.6)]], c2b: [[0, fr('OFFICE', -0.3, 1.3, -0.8, 5.2, 1.4, 0)]],
  c2c: [[0, fr('OFFICE', 0, 1.6, -0.9, 9, 2.6, 0)]], c2d: [[0, fr('OFFICE', 0, 1.3, -0.5, 5.5, 1.6, 0)]], c2e: [[0, fr('OFFICE', -2.4, 1.6, -1.8, 9, 2.6, 0.5)]],
  c3a: [[0, fr('CAFE', 0, 1.5, -0.8, 6.5, 2.0, 0.6)]], c3b: [[0, fr('CAFE', 0, 1.6, -0.6, 9, 2.6, 0)]],
  c3c: [[0, fr('CAFE', 1.3, 1.6, -0.3, 10, 2.8, 0)]], c3d: [[0, fr('CAFE', 0, 1.5, -0.8, 6.8, 2.0, -0.6)]],
  c4a: [[0, fr('OFFICE', 0.8, 1.6, -0.7, 8.5, 2.6, 0)]], c4b: [[0, fr('OFFICE', 0, 1.5, -1.1, 5.2, 1.3, 0.6)]],
  c4c: [[0, fr('OFFICE', 0.8, 1.6, -0.7, 9, 2.6, 0)]], c4d: [[0, fr('OFFICE', 0, 2.0, -0.8, 7, 1.9, 0)]],
  c4e: [[0, fr('OFFICE', 0, 1.9, -0.8, 7.5, 2.1, -0.6)]], c4f: [[0, fr('OFFICE', 0, 1.6, -0.6, 10, 3, 0)]], c4g: [[0, fr('OFFICE', 0.8, 1.5, -0.7, 8, 2.4, 0)]],
  c5a: [[0, fr('BAR', -0.9, 1.5, -0.4, 8.5, 2.6, 0.5)]], c5b: [[0, fr('BAR', -1.0, 1.5, -0.5, 7, 2.0, 0)]],
  c5c: [[0, fr('BAR', -0.3, 1.9, 0, 10, 3, 0)]], c5d: [[0, fr('BAR', 2.8, 1.0, 1.4, 6.5, 2.2, 0.4)]],
  c5e: [[0, fr('BAR', -1.0, 1.6, -0.4, 7.5, 2.2, -0.5)]], c5f: [[0, fr('BAR', 0, 2.0, 0, 11, 3.6, 0)]], c5g: [[0, fr('BAR', -0.8, 1.5, -0.4, 6.8, 1.9, 0)]],
  p1: [[0, fr('STREET', 3, 1.3, 0, 8.5, 2.6, 0)]], p2: [[0, fr('STREET', 0, 1.0, -2, 15, 11, 0)]],
  p3: [[0, OVER]], p4: [[0, fr('TOWN', 0, 0, 7, 25, 35, 1.5)]], p5: [[0, fr('STREET', 0, 1.3, 0, 7.5, 2.2, 0)]],
  p6: [[0, fx('HOME', [-2.7, 1.1, -2.5], [1.9, 2.9, -0.4])]], p7: [[0, COVERF]],
  recap: [[0, fr('TOWN', 0, 0, 1, 28, 38, 0)]], ask: [[0, fr('STREET', 0, 0.6, -4, 15, 13, 0)]],
};
const CAM = (() => {
  const keys = []; let prev = null;
  const push = (f, k) => ({ look: f.look, pos: f.pos.map((v, i) => f.look[i] + (v - f.look[i]) * k), fov: f.fov });
  for (const id of ORDER) {
    if (id === 'end') continue; const sh = SHOT[id];
    sh.forEach((sg, j) => {
      const t0 = at(id) + sg[0], t1 = j + 1 < sh.length ? at(id) + sh[j + 1][0] : end(id), f = sg[1], fe = push(f, 0.93);
      if (prev && id !== 'hook1') { const far = Math.hypot(prev.look[0] - f.look[0], prev.look[2] - f.look[2]) > 12; const tg = Math.min(far ? 2.0 : 1.1, (t1 - t0) * 0.45); keys.push(Object.assign({ t: t0 }, prev));
        if (far) keys.push({ t: t0 + tg / 2, look: prev.look.map((v, i) => (v + f.look[i]) / 2), pos: prev.pos.map((v, i) => (v + f.pos[i]) / 2 + (i === 1 ? 7 : 0)), fov: 40 });
        keys.push(Object.assign({ t: t0 + tg }, f)); }
      else keys.push(Object.assign({ t: t0 }, f));
      keys.push(Object.assign({ t: t1 }, fe)); prev = fe;
    });
  }
  keys.push(Object.assign({ t: DUR }, prev)); return keys;
})();
const IRIS = [{ t: end('cover') - 0.25, dur: 0.5, type: 'iris' }];

/* time-of-day look per beat */
const LOOK = {
  night: { bg: ['#070b1e', '#1a2650'], fog: '#141d40', hemi: 0.42, sun: 0.25, win: 1.0, lamp: 0.85, stars: 1 },
  day: { bg: ['#3a6ab0', '#a9d0f0'], fog: '#a9c8ea', hemi: 0.78, sun: 0.8, win: 0, lamp: 0, stars: 0 },
  dawn: { bg: ['#2a2f6a', '#e9a07a'], fog: '#c99a8a', hemi: 0.7, sun: 0.55, win: 0.4, lamp: 0.4, stars: 0.3 },
  noon: { bg: ['#2f78c8', '#bfe4ff'], fog: '#b8daf5', hemi: 1.0, sun: 1.0, win: 0, lamp: 0, stars: 0 },
  after: { bg: ['#3a6ab0', '#f0d6a0'], fog: '#d8c8a8', hemi: 0.9, sun: 0.85, win: 0, lamp: 0, stars: 0 },
  dusk: { bg: ['#1c1838', '#c4607a'], fog: '#5a3a5a', hemi: 0.6, sun: 0.45, win: 0.8, lamp: 0.7, stars: 0.4 },
};
function lookKey(id) {
  if (id === 'cover' || id[0] === 'p' || id === 'recap' || id === 'ask' || id === 'end') return 'night';
  if (id.startsWith('c1')) return 'dawn'; if (id.startsWith('c3')) return 'noon'; if (id.startsWith('c4')) return 'after'; if (id.startsWith('c5')) return 'dusk';
  return 'day';
}
const mixC = (a, b, k) => { const ca = new T.Color(a), cb = new T.Color(b); return '#' + ca.lerp(cb, k).getHexString(); };
function lookAt(t) {
  const id = beatAt(t), i = ORDER.indexOf(id), cur = LOOK[lookKey(id)]; if (i <= 0) return cur;
  const pv = LOOK[lookKey(ORDER[i - 1])], k = U.easeIO(U.clamp(rel(t, id) / 1.6)); if (pv === cur || k >= 1) return cur;
  return { bg: [mixC(pv.bg[0], cur.bg[0], k), mixC(pv.bg[1], cur.bg[1], k)], fog: mixC(pv.fog, cur.fog, k), hemi: U.lerp(pv.hemi, cur.hemi, k), sun: U.lerp(pv.sun, cur.sun, k), win: U.lerp(pv.win, cur.win, k), lamp: U.lerp(pv.lamp, cur.lamp, k), stars: U.lerp(pv.stars, cur.stars, k) };
}
function bgAt(t) { return lookAt(t).bg; }

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
const say = (o, txt, c, dy, dx) => BUB.push({ o, txt, c: c || '#fff', dy: dy || 2.2, dx: dx || 0 });
const CORAL = '#ffb3b3';
const LAYPOS = [[-2.6, 0.3], [-1.3, 1.0], [0, 1.4], [1.3, 1.0], [-3.4, -0.6]];
const TONSEAT = [2.6, 0.3];
const ANT0 = [1.0, 2.4], ANT1 = [3.8, 0.2];

function ringsAt(t) {
  /* returns [radius list, expanding?] for payoff beats */
  if (t < at('p3') && t >= end('cover')) return null;
  if (t < end('cover')) return { c: [ST.STREET[0], ST.STREET[2]], r: [3, 7.5, 12, 16.5], a: 1, R: 30 };
  if (between(t, 'p3', 'p5')) { const r = t - at('p3'); return { c: [ST.STREET[0], ST.STREET[2]], r: [0, 1, 2, 3, 4].map((i) => (r * 7 - i * 4.5)), a: 1, R: Math.max(0, r * 7) }; }
  if (inB(t, 'p6')) { const r = rel(t, 'p6'), q = 1 - U.easeIO(sm(0.4, 4.2, r)); return { c: [ST.HOME[0] - 2.6, ST.HOME[2] - 2.0], r: [0, 1, 2].map((i) => q * (28 - i * 8)), a: 0.9, R: 99 }; }
  return { c: [ST.STREET[0], ST.STREET[2]], r: [0, 1, 2, 3].map((i) => ((t * 3.2 + i * 6) % 24)), a: 0.8, R: 99 };
}

let scene0 = null;
function update(t, s, { camera, W, H }) {
  if (!scene0) { scene0 = s.ton.parent; }
  BUB.length = 0; const id = beatAt(t), lk = lookAt(t);
  /* light */
  s.hemi.intensity = lk.hemi; s.sun.intensity = lk.sun; s.fog.color.set(lk.fog);
  for (const h of s.houses) h.userData.winMat.emissiveIntensity = lk.win * 0.9;
  for (const l of s.lamps) l.userData.gl.material.opacity = lk.lamp;
  s.stars.material.opacity = lk.stars;
  s.winPane.material.emissiveIntensity = 0.3 + lk.win * 0.5;
  s.bulbs.forEach((b, i) => { b.children[0].material.opacity = Math.max(0.15, lk.lamp) * (0.8 + 0.2 * Math.sin(t * 3 + i)); });
  s.car.userData.hl.material.opacity = lk.lamp * 0.9;

  /* ---------- ต้น ---------- */
  const N = s.ton; rest(N); setSit(N, false); N.rotation.set(0, 0, 0); N.visible = true; N.scale.setScalar(1);
  s.tonPhone.visible = false; s.tonPen.visible = false; s.tonGlass.visible = false; s.tonGlow.material.opacity = 0; N.userData.ring.visible = true;
  const tonAt = (st, x, y, z) => setP(N, st, x, y, z);
  const night = id === 'cover' || id[0] === 'p' || id === 'recap' || id === 'ask';
  if (between(t, 'hook1', 'c0e')) {
    if (between(t, 'hook1', 'hook3')) { const r = t - at('hook1'), k = U.easeIO(sm(0, 3, r)); tonAt('TEMPLE', U.lerp(6.5, 2.4, k), 0.12, U.lerp(7, 5.2, k)); if (k < 1) { face(N, -1, -0.4); walk(N, t, 1); } else { face(N, 0.1, 1); if (inB(t, 'hook3')) N.userData.arms.R.rotation.set(0, 0, 2.5 + Math.sin(t * 8) * 0.3); } }
    else { setSit(N, true); tonAt('TEMPLE', TONSEAT[0], 0.14, TONSEAT[1]); face(N, -0.7, -0.7); anjali(N, inB(t, 'c0a') || inB(t, 'c0c') ? 1 : 0.0); }
  } else if (between(t, 'c1a', 'c1f')) {
    if (inB(t, 'c1a') || inB(t, 'c1b') || inB(t, 'c1e')) { setSit(N, true); tonAt('HOME', -1.35, 0.55, -1.7); face(N, 1, 0.35); if (inB(t, 'c1a')) { const k = sm(2.2, 3.0, rel(t, 'c1a')); N.userData.arms.R.rotation.set(-2.4 * k, 0, 0.2); N.userData.head.rotation.y = Math.sin(t * 2) * 0.2; } }
    else if (inB(t, 'c1c')) { const r = rel(t, 'c1c'), k = U.easeIO(sm(0.2, 3.6, r)); tonAt('HOME', U.lerp(4.4, 0.2, k), 0.16, 1.5); face(N, -1, 0); if (k > 0 && k < 1) walk(N, t, 1); }
    else if (inB(t, 'c1d')) { tonAt('HOME', -0.4, 0.16, -0.6); face(N, 0.2, 1); const r = rel(t, 'c1d'); const k = sm(dur('c1d') * 0.5, dur('c1d') * 0.5 + 0.6, r); N.userData.arms.L.rotation.set(-1.6 - k * 0.4, 0, -0.7 + k * 0.5); N.userData.arms.R.rotation.set(-1.6 - k * 0.4, 0, 0.7 - k * 0.5); }
    else { const r = rel(t, 'c1f'), k = U.easeIO(sm(0, 1.4, r)); tonAt('HOME', U.lerp(-0.4, 2.0, k), 0.16, U.lerp(-0.6, -3.2, k)); face(N, 0.3, -1); if (k < 1) walk(N, t, 1); else { N.userData.arms.R.rotation.set(0, 0, 2.6 + Math.sin(t * 9) * 0.35); } }
  } else if (between(t, 'c2a', 'c2e') || between(t, 'c4a', 'c4g')) {
    if (inB(t, 'c2e')) { const r = rel(t, 'c2e'), k = U.easeIO(sm(1.0, 2.8, r)); tonAt('OFFICE', U.lerp(0, -3.0, k), 0.16, U.lerp(-1.3, -2.4, k)); face(N, -1, -0.3); if (k > 0 && k < 1) walk(N, t, 1); if (r > 3.0) say(N, 'ขอเบิกปากกา 1 ด้ามครับ'); }
    else { setSit(N, true); tonAt('OFFICE', 0, 0.42, -1.3); face(N, 0, 1); }
    if (inB(t, 'c2b')) { const r = rel(t, 'c2b'), k = sm(0.6, 1.4, r); N.userData.arms.R.rotation.set(-1.3 * k, 0, 0.1); s.tonPen.visible = k > 0.95; if (r > 1.6) say(N, 'แค่ปากกาเอง…', CORAL); }
    if (inB(t, 'c2c')) { N.userData.arms.R.rotation.set(-1.3, 0, 0.1); s.tonPen.visible = true; }
    if (inB(t, 'c4b')) { N.userData.head.rotation.x = 0.15; if (rel(t, 'c4b') > 0.6) say(N, 'ส่งแล้วครับ เมลคงเด้ง…', CORAL); }
    if (inB(t, 'c4d') || inB(t, 'c4e')) { s.tonPhone.visible = true; N.userData.arms.R.rotation.set(-1.25, 0, 0.25); N.userData.head.rotation.x = 0.25; if (inB(t, 'c4e') && rel(t, 'c4e') > 1.2) say(N, 'เช็กก่อนแชร์…', '#fff'); }
    if (inB(t, 'c4g')) { N.userData.head.rotation.x = 0.2 * Math.sin(Math.min(1, rel(t, 'c4g') / 0.6) * Math.PI); if (rel(t, 'c4g') > 0.5 && rel(t, 'c4g') < 3) say(N, 'ขอโทษครับ ขอส่งเย็นนี้'); }
  } else if (between(t, 'c3a', 'c3d')) {
    setSit(N, true); tonAt('CAFE', 0, 0.42, -1.45); face(N, 0, 1); s.tonPhone.visible = true; N.userData.arms.R.rotation.set(-1.25, 0, 0.25); N.userData.head.rotation.x = 0.22;
    if (inB(t, 'c3a') && rel(t, 'c3a') > 1.0) say(N, 'ว่างไหม ไปดูหนังกัน', CORAL, 2.3);
    if (inB(t, 'c3d') && rel(t, 'c3d') > 0.4) say(N, 'ไปกับเพื่อนเราดีกว่า', '#fff', 2.3);
  } else if (between(t, 'c5a', 'c5g')) {
    tonAt('BAR', 0.2, 0.16, -0.2); face(N, -1, 0.3);
    if (inB(t, 'c5g')) { const r = rel(t, 'c5g'); s.tonGlass.visible = true; const k = sm(0.6, 1.2, r) * (1 - sm(2.6, 3.2, r)); N.userData.arms.R.rotation.set(-1.0 - k * 0.6, 0, 0.3 + k * 0.4); if (r > 0.3) say(N, 'น้ำส้มครับ!'); }
  } else if (night) {
    if (inB(t, 'p6')) { tonAt('HOME', -2.6, 1.0, -1.85); N.rotation.x = -Math.PI / 2; s.tonGlow.material.opacity = 0.55 * sm(2.5, 4.5, rel(t, 'p6')); s.tonGlow.position.set(ST.HOME[0] - 2.6, 1.4, ST.HOME[2] - 2.6); N.userData.ring.visible = false; }
    else if (inB(t, 'p1')) { const r = rel(t, 'p1'); tonAt('STREET', U.lerp(6.5, 0.6, U.clamp(r / dur('p1'))), 0.08, 0.2); face(N, -1, 0); walk(N, t, 0.8); }
    else { tonAt('STREET', 0, 0.08, 0.2); face(N, 0, 1); s.tonGlow.material.opacity = 0.7; s.tonGlow.position.set(ST.STREET[0], 1.3, ST.STREET[2] + 0.2);
      if (inB(t, 'p5')) { N.userData.head.rotation.x = -0.25; } else { anjali(N, 0); } }
  }
  if (!(between(t, 'c3a', 'c3d') || inB(t, 'c4d') || inB(t, 'c4e'))) s.tonPhone.visible = false;

  /* ---------- temple ---------- */
  { const on = t < end('c0e') + 1.5 || id === 'recap';
    s.monk.visible = true; anjali(s.monk, 0); s.monk.userData.arms.R.rotation.set(-1.0, 0, 0.2); s.fan.visible = true;
    if (between(t, 'c0a', 'c0c')) { const tl = t - at('c0a'); if (tl > 0.6 && tl < 9.8) say(s.monk, tl < 5 ? 'ปาณาติปาตา เวระมะณี…' : '…สิกขาปะทัง สะมาทิยามิ', '#fff', 1.9); }
    s.lay.forEach((c, i) => { setSit(c, true); const q = LAYPOS[i]; setP(c, 'TEMPLE', q[0], 0.14, q[1]); face(c, -q[0], -2.0 - q[1]); anjali(c, inB(t, 'c0a') || inB(t, 'c0c') ? 1 : 0); c.visible = on; });
    s.givers.forEach((c, i) => { const tl = t - at('hook1') + 0.6 - i * 0.7, k = U.easeIO(sm(0, 2.6, tl)); const x0 = 1 + i * 1.6, z0 = 9, x1 = -6.4 + i * 0.7, z1 = 5.6 + (i % 2) * 0.5;
      setP(c, 'TEMPLE', U.lerp(x0, x1, k), 0.12, U.lerp(z0, z1, k)); face(c, x1 - x0, z1 - z0); if (k > 0 && k < 1) walk(c, t + i, 1); else rest(c);
      c.userData.gift.visible = k < 1; if (k < 1) c.userData.arms.R.rotation.set(-0.9, 0, 0.1); c.visible = between(t, 'hook1', 'hook3'); });
    s.steps.forEach((q) => { const k = inB(t, 'c0d') ? U.easeBack(sm(STEPT(q.i), STEPT(q.i) + 0.5, rel(t, 'c0d'))) : (t > end('c0d') && t < end('c0e') ? 1 : 0); q.b.scale.set(1, Math.max(0.001, q.h * k), 1); q.b.visible = k > 0.01;
      q.lb.visible = q.lb2.visible = k > 0.6; q.lb.material.opacity = q.lb2.material.opacity = U.clamp((k - 0.6) / 0.3); setP(q.lb, 'TEMPLE', 6.2 + q.i * 1.55, q.h * k + 0.55, 3.4); setP(q.lb2, 'TEMPLE', 6.2 + q.i * 1.55, q.h * k + 1.15, 3.4); }); }

  /* ---------- home ---------- */
  { s.bed.userData.blanket.position.y = inB(t, 'p6') ? 1.15 : 0.72; s.bed.userData.blanket.scale.z = inB(t, 'p6') ? 0.8 : 1; s.bed.userData.blanket.position.z = inB(t, 'p6') ? 0.65 : 0.45;
    const ch = between(t, 'c1a', 'c1f');
    /* mosquito */
    let mp = null;
    if (ch || inB(t, 'cover')) {
      const c = [ST.HOME[0] - 1.35, 2.0, ST.HOME[2] - 1.5];
      if (inB(t, 'c1f')) { const r = rel(t, 'c1f'), k = sm(1.6, 4.6, r); const a = [N.position.x + 0.3, 2.1, N.position.z - 0.4], b = [ST.HOME[0] + 2.2, 2.2, ST.HOME[2] - 9]; mp = a.map((v, i) => U.lerp(v, b[i], k)); mp[1] += Math.sin(t * 9) * 0.06; }
      else if (inB(t, 'c1c')) mp = [ST.HOME[0] + 2.2, 2.3 + Math.sin(t * 7) * 0.1, ST.HOME[2] - 2 + Math.cos(t * 3) * 0.6];
      else if (inB(t, 'c1d')) mp = [N.position.x + Math.sin(t * 5) * 0.12, 2.35 + Math.sin(t * 7) * 0.05, N.position.z + 0.45];
      else mp = [c[0] + Math.cos(t * 2.6) * 0.7, c[1] + Math.sin(t * 5) * 0.12, c[2] + Math.sin(t * 2.6) * 0.7];
    }
    s.mos.visible = !!mp && t < at('c1f', 4.4); if (mp) { s.mos.position.set(mp[0], mp[1], mp[2]); s.mos.rotation.y = -t * 2.6; s.mos.userData.wings.forEach((w, i) => (w.rotation.x = Math.PI / 2 + Math.sin(t * 60 + i) * 0.6)); }
    if (inB(t, 'c1a') && rel(t, 'c1a') > 0.5 && rel(t, 'c1a') < 2.6) say(s.mos, 'หึ่งงงง~', '#fff', 0.7);
    /* ants */
    s.ants.forEach((a, i) => { const u = ((t * 0.06 + i / s.ants.length) % 1); setP(a, 'HOME', U.lerp(ANT0[0], ANT1[0], u), 0.2, U.lerp(ANT0[1], ANT1[1], u)); a.rotation.y = Math.atan2(-(ANT1[1] - ANT0[1]), ANT1[0] - ANT0[0]); a.scale.set(1, 1, 1); a.visible = true; });
    if (inB(t, 'c1c') || inB(t, 'c1d')) { const sq = s.ants[0]; const k = inB(t, 'c1d') ? 1 : sm(2.0, 2.2, rel(t, 'c1c')); setP(sq, 'HOME', 2.35, 0.18, 1.45); if (k > 0) sq.scale.set(1.4, 0.15, 1.4); }
    /* candle */
    const cl = inB(t, 'c1e') ? 1 - 0.7 * U.easeIO(sm(1.0, 3.8, rel(t, 'c1e'))) : inB(t, 'c1f') ? U.lerp(0.3, 1, U.easeIO(sm(0.5, 3, rel(t, 'c1f')))) : 1;
    s.candle.userData.set(cl); s.candle.userData.fl.material.opacity = 0.75 + 0.25 * Math.sin(t * 13); }

  /* ---------- office ---------- */
  { const pick = between(t, 'c2b', 'c2d') ? 1 : 0; s.cupPens[0].visible = !pick;
    /* colleagues */
    const [a, b] = s.cow; setSit(a, true); setSit(b, true); setP(a, 'OFFICE', -3.4, 0.42, -1.3); setP(b, 'OFFICE', 3.4, 0.42, -1.3); face(a, 0, 1); face(b, 0, 1); rest(a); rest(b);
    if (inB(t, 'c2e')) { setSit(a, false); setP(a, 'OFFICE', -4.2, 0.16, -2.0); face(a, 1, 0.3); if (rel(t, 'c2e') > 3.6) say(a, 'ได้เลย!', '#fff'); }
    if (inB(t, 'c4f')) { const r = rel(t, 'c4f'); a.userData.arms.R.rotation.set(-1.3, 0.6, 0); b.userData.arms.L.rotation.set(-1.3, -0.6, 0); if (r > 0.6) say(a, 'ได้ข่าวว่าต้น…', CORAL); if (r > 2.0) say(b, 'จริงเหรอ!?', CORAL); }
    /* boss */
    const B0 = s.boss; rest(B0); setSit(B0, false);
    if (between(t, 'c4a', 'c4g')) { const r = t - at('c4a'), k = U.easeIO(sm(0.2, 1.6, r)); setP(B0, 'OFFICE', U.lerp(3.4, 1.6, k), 0.16, U.lerp(-3.3, 0.2, k)); face(B0, k < 1 ? -0.5 : -0.8, k < 1 ? 1 : -0.6); if (k > 0 && k < 1) walk(B0, t, 1);
      if (inB(t, 'c4a') && r > 1.8) say(B0, 'งานเมื่อวานล่ะ?', '#fff'); if (inB(t, 'c4g') && rel(t, 'c4g') > 3.0) say(B0, 'โอเค ขอบใจที่บอกตรงๆ', '#fff'); }
    else { setSit(B0, true); setP(B0, 'OFFICE', 3.4, 0.42, -3.6); face(B0, 0, 1); }
    /* wallet + coins */
    const cd = inB(t, 'c2d') ? rel(t, 'c2d') : -1;
    s.coins.forEach((c, i) => { if (cd < 0) { c.visible = false; return; } const u = U.clamp((cd - 0.9 - i * 0.22) / 1.6); c.visible = u > 0 && u < 1; const ang = i * 0.8;
      setP(c, 'OFFICE', -0.1 + Math.cos(ang) * u * 1.0, 1.15 + Math.sin(u * Math.PI) * 0.9 - u * 1.0, -0.3 + Math.sin(ang) * u * 0.6 + 0.2 * u); c.rotation.y = t * 6 + i; c.material.opacity = 1; });
    const ws = cd >= 0 ? 0.6 * (1 - 0.6 * U.easeIO(sm(1.0, 3.5, cd))) : 0.6; s.wallet.scale.setScalar(ws);
    /* news card */
    const nk = inB(t, 'c4d') ? U.easeBack(sm(0.3, 0.9, rel(t, 'c4d'))) : inB(t, 'c4e') ? 1 - sm(3.8, 4.4, rel(t, 'c4e')) : 0; s.news.visible = nk > 0.01; s.news.scale.setScalar(Math.max(0.001, nk)); setP(s.news, 'OFFICE', 0.9, 2.55 + Math.sin(t * 2) * 0.05, -0.6);
    if (inB(t, 'c4e')) { const q = sm(1.6, 2.2, rel(t, 'c4e')); s.news.rotation.z = q * 0.25; } else s.news.rotation.z = 0; }

  /* ---------- cafe ---------- */
  { const F0 = s.friend, G = s.gf; rest(F0); rest(G); const on3 = inB(t, 'c3c'); const onP = between(t, 'p3', 'p5') || id === 'recap' || id === 'cover';
    vis(F0, on3 || onP); vis(G, on3 || onP); G.userData.ring && (G.userData.ring.visible = false);
    if (on3) { const r = rel(t, 'c3c'), k = U.easeOut(sm(0, 1.0, r)); setP(G, 'CAFE', 2.4, 0.16, 0.9); face(G, -1, 0.2); G.userData.arms.R.rotation.set(-1.2, 0, 0.2); s.gfPhone.visible = true;
      setP(F0, 'CAFE', U.lerp(6, 3.5, k), 0.16, 0.4); face(F0, -1, 0.1); if (k < 1) walk(F0, t, 1); else { F0.userData.arms.L.rotation.set(0, 0, -0.9); F0.userData.arms.R.rotation.set(0, 0, 0.9); } if (r > 1.2) say(F0, 'นั่นแฟนเรานะ!', CORAL); }
    else if (onP) { setP(G, 'CAFE', 2.6, 0.16, 1.6); setP(F0, 'CAFE', 3.4, 0.16, 1.6); face(G, 0.3, 1); face(F0, -0.3, 1); G.userData.arms.R.rotation.set(0, 0, 0.5); F0.userData.arms.L.rotation.set(0, 0, -0.5); s.gfPhone.visible = false; } }

  /* ---------- bar ---------- */
  { const [f1, f2] = s.bf; rest(f1); rest(f2); setP(f1, 'BAR', -2.4, 0.16, -0.1); face(f1, 1, -0.2); setP(f2, 'BAR', -1.3, 0.16, -1.8); face(f2, 0.2, 1);
    f1.userData.arms.R.rotation.set(-1.0, 0, 0.2); f2.userData.arms.R.rotation.set(-0.9, 0, 0.2);
    if (inB(t, 'c5a')) { const r = rel(t, 'c5a'); f1.userData.arms.R.rotation.set(-1.4 - Math.sin(r * 4) * 0.15, 0, 0.4); if (r > 0.6) say(f1, 'แก้วเดียวน่า!', '#fff'); }
    if (inB(t, 'c5e')) { const r = rel(t, 'c5e'); f1.rotation.z = Math.sin(r * 3) * 0.18; f1.userData.head.rotation.z = Math.sin(r * 3 + 1) * 0.3; } else f1.rotation.z = 0;
    if (inB(t, 'c5g')) { const k = sm(0.8, 1.3, rel(t, 'c5g')) * (1 - sm(2.6, 3.2, rel(t, 'c5g'))); f1.userData.arms.R.rotation.set(-1.0 - k * 0.6, 0, 0.2 + k * 0.4); }
    /* dominoes */
    s.dom.forEach((d, i) => { let a = 0; if (inB(t, 'c5d')) { const r = rel(t, 'c5d') - 1.0 - i * 0.45; a = r <= 0 ? 0 : -(i === 4 ? 1.45 : 0.5) * Math.pow(U.clamp(r / 0.45), 2); } else if (t >= end('c5d') && t < end('c5e')) a = -(i === 4 ? 1.45 : 0.5); d.rotation.z = a; d.visible = between(t, 'c5d', 'c5e'); });
    s.glasses.forEach((g0) => (g0.visible = true)); }

  /* ---------- payoff: rings + beings ---------- */
  { const R = ringsAt(t);
    s.rings.forEach((m, i) => { if (!R || R.r[i] == null) { m.visible = false; return; } const r = R.r[i]; m.visible = r > 0.2; m.scale.setScalar(Math.max(0.01, r)); m.position.set(R.c[0], 0.25, R.c[1]); m.material.opacity = R.a * 0.85 * (1 - U.clamp(r / 30)); });
    const on = !!R || id === 'recap';
    s.beings.visible = on;
    if (on) { const col = s.beings.geometry.attributes.color, d = s.beings.userData.d, RR = R ? R.R : 99;
      for (let i = 0; i < col.count; i++) { const lit = d[i] < RR, k = lit ? 1 : 0.18, g = i % 3 === 0; col.setXYZ(i, (g ? 1.0 : 0.18) * k, (g ? 0.79 : 0.9) * k, (g ? 0.29 : 0.77) * k); }
      col.needsUpdate = true; }
    /* station glows + labels in p4 */
    const P4 = [['HOME', 2.2, 2.4, -4.0], ['CAFE', 3.0, 1.8, 1.6], ['OFFICE', -2.0, 1.6, -0.3], ['OFFICE', 3.2, 0.2, 12.6], ['BAR', -2, 1.2, 12.5]];
    if (!s.p4a) s.p4a = P4.map((q) => { const o = new T.Object3D(); setP(o, q[0], q[1], q[2], q[3]); scene0.add(o); return o; });
    s.pLabels.forEach((lb, i) => { lb.visible = false; const r = inB(t, 'p4') ? rel(t, 'p4') - P4T[i] : -1; if (r > 0) BUB.push({ o: s.p4a[i], txt: ['ยุงที่รอด', 'คู่ที่ไม่แตก', 'ของที่ไม่หาย', 'ความจริง', 'คนบนถนน'][i], c: '#fff', dy: 1.5, small: true }); });
    s.giftGlows.forEach((g0, i) => { if (i >= 5) { g0.material.opacity = 0; return; } const q = P4[i]; setP(g0, q[0], q[1], q[2] + 1, q[3]); const r = between(t, 'p4', 'p5') ? t - at('p4') - P4T[i] : -1; g0.material.opacity = 0.75 * U.clamp(r / 0.4) * (0.85 + 0.15 * Math.sin(t * 4 + i)); });
    /* the spared mosquito flies over the house at night, a car passes safely on the street */
    if (between(t, 'p3', 'p5')) { s.mos.visible = true; s.mos.scale.setScalar(3.2); s.mos.position.set(ST.HOME[0] + 2.2 + Math.cos(t) * 1.2, 4 + Math.sin(t * 3) * 0.3, ST.HOME[2] - 4 + Math.sin(t) * 1.2); s.mos.userData.wings.forEach((w, i) => (w.rotation.x = Math.PI / 2 + Math.sin(t * 60 + i) * 0.6)); } else s.mos.scale.setScalar(1.6);
    if (night) { const u = (t * 0.07) % 1; s.car.position.set(ST.BAR[0] + U.lerp(-24, 24, u) - 8, 0, -13 + 0.9); s.car.rotation.y = 0; } else { setP(s.car, 'BAR', 1.8, 0, 6.2); } }

  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.1); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; b.vis = v.z < 1 && v.x > -1.2 && v.x < 1.2; }
  window.__dbg = { s, camera };
}
