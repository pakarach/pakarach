/* Part D: camera, update */
const ZK = 1.45;
const fr = (st, lx, ly, lz, d, h, sx, fov) => { const c = ST[st]; const look = [c[0] + lx, c[1] + ly, c[2] + lz]; return { look, pos: [look[0] + (sx || 0) * ZK, look[1] + h * ZK, look[2] + d * ZK], fov: fov || 40 }; };
const mfr = (lon, lat, ly, d, h, sx) => { const [x, z] = mapXZ(lon, lat); const look = [x, ly, z]; return { look, pos: [x + (sx || 0), ly + h, z + d], fov: 40 }; };
const SHOT = {
  cover: [[0, fr('COV', 0.3, 4.3, -0.5, 14.5, 0.5, 0)]], hook1: [[0, fr('CAL', 0, 3.4, 0, 11, 1.5, 0)]], hook2: [[0, fr('CAL', -1.8, 3.6, 0, 10, 1.8, -1.0)]],
  hook3: [[0, fr('CAL', 0, 3.6, 0, 13, 2.6, 0.8)]], hook4: [[0, fr('CAL', 1.9, 2.4, 1.0, 7.5, 1.6, 1.2)]],
  c12: [[0, fr('CLK', 0, 5.0, -1.0, 16.5, 2.4, 0)]], c13: [[0, fr('CLK', 0.8, 4.4, 0, 15.5, 3.4, 1)]],
  loki1: [[0, fr('VAL', 0, 2.3, -1.5, 12, 3.2, 0)]], loki2: [[0, fr('VAL', 3.0, 2.1, -1.4, 9.5, 2.6, 1.0)]], loki3: [[0, fr('VAL', 0.4, 2.1, -1.8, 8.2, 2.0, 0)]],
  supper: [[0, fr('SUP', 0, 2.0, -1.8, 8.8, 1.9, 0)]], supper2: [[0, fr('SUP', -1.2, 1.8, -1.8, 6.6, 1.6, -0.5)]], cliff1: [[0, fr('SUP', 0, 2.5, -1.5, 12, 3.2, 0)]],
  fri1: [[0, fr('HAR', -6, 4.8, -3.2, 12, 3.0, 0)]], fri2: [[0, fr('HAR', 3.8, 2.4, -1, 10.5, 3.0, 1)]], fri3: [[0, fr('HAR', -4.0, 2.5, -1.2, 8.6, 2.4, 0.5)]],
  cliff2: [[0, fr('HAR', 0, 3.4, -2, 17, 6.5, 0)]],
  tmp1: [[0, fr('TMP', 0, 2.6, -0.6, 12.5, 3.4, 0)]], tmp2: [[0, fr('TMP', -2.8, 2.1, 0.4, 8.0, 2.0, -0.6)]], tmp3: [[0, fr('TMP', 0, 3.2, -1, 14.5, 4.6, 0)]],
  ros1: [[0, mfr(PL.paris[0] - 4, PL.paris[1] - 6, 0.3, 20, 24, 0)], [1.8, mfr(PL.paris[0], PL.paris[1] + 0.6, 0.6, 6, 7.5, 0)]],
  ros2: [[0, fr('PAR', -0.5, 2.0, 0, 8.6, 2.4, 0)]], ros3: [[0, fr('PAR', 1.0, 2.1, 0, 9.6, 2.4, 0.6)]], ros4: [[0, fr('PAR', -3.4, 1.9, 0.7, 7.2, 2.2, 0)]], ros5: [[0, fr('PAR', 3.4, 2.0, -0.3, 7.4, 1.5, 0.4)]],
  law1: [[0, fr('WALL', -2.2, 2.3, 0.6, 9.2, 2.2, -0.6)]], law2: [[0, fr('WALL', 1.4, 2.5, 0.8, 10.5, 2.6, 0.8)]],
  law3: [[0, mfr(-70, 47, 0.3, 12, 15, 0)], [2.0, mfr(-14, 55, 0.3, 12, 15, 0)]], law4: [[0, fr('SEA', -1, 4.2, -3.5, 26, 4.4, 0)]], law5: [[0, fr('SEA', -2.4, 3.4, -3.2, 19, 3.2, 0)]], law6: [[0, fr('SEA', -2, 3.6, -3, 17, 4.2, 1)]],
  movie: [[0, fr('CIN', 0, 2.6, -0.5, 11.5, 2.4, 0)]], cliff5: [[0, fr('CIN', 0, 3.8, 0, 17, 5.5, 0)]],
  tow1: [[0, fr('TOW', 0.8, 12.6, -1, 18, 0.8, 0.6)]], tow2: [[0, fr('TOW', 0.6, 12.4, -1, 12, 0.6, 1.0)]], tow3: [[0, fr('TOW', 0, 1.8, 2.6, 8.5, 3.6, 0)]],
  road1: [[0, fr('ROAD', 0, 2.2, 0, 12.5, 3.8, 0)]], road2: [[0, fr('ROAD', 0, 3.4, -1.5, 12.5, 2.4, 0)]], road3: [[0, fr('ROAD', 0.6, 3.2, -1.0, 11.5, 2.4, 0.3)]],
  cof1: [[0, fr('OFF', 0.2, 2.0, -0.6, 7.2, 2.0, 0.5)]], cof2: [[0, fr('OFF', 0.2, 2.4, -0.6, 8.8, 2.4, 0)]], cof3: [[0, fr('OFF', 0, 2.8, -0.8, 10.5, 3.0, -0.6)]], cliff6: [[0, fr('OFF', 0, 3.2, -1, 14.5, 4.6, 0)]],
  w1: [[0, mfr(-84, 12, 0.3, 14, 17, 0)], [2.4, mfr(8, 36, 0.3, 14, 17, 0)]], w3: [[0, mfr(12.5, 40, 0.3, 8.5, 10.5, 0)]], w4: [[0, mfr(100.5, 12, 0.3, 10, 12.5, 0)]],
  thai1: [[0, fr('THA', -1.6, 3.6, -1.5, 15, 2.2, 0)]], thai2: [[0, fr('THA', 0.6, 2.4, 0.4, 7.6, 1.8, 0)]], thai3: [[0, fr('THA', 3.6, 1.8, 1.0, 7.2, 1.6, 0.4)]],
  math1: [[0, fr('CAL', 0, 2.4, 2.7, 11.5, 1.6, 0)]], math2: [[0, fr('CAL', 0, 3.1, 0, 9.4, 1.4, 0)]], recap: [[0, fr('CAL', 0, 3.4, 0, 15, 2.6, 0)]], ask: [[0, fr('CAL', 1.0, 2.9, 0.5, 10.5, 2.0, 0.8)]],
};
const CUT = new Set(['hook1', 'ros1', 'ros2', 'law3', 'law4', 'w1', 'thai1', 'math1']);
const IRIS = [...CUT].map((id) => ({ t: at(id) - 0.25, dur: 0.5, type: 'iris' }));
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

/* backgrounds + fog per place */
const BG = { night: ['#03050c', '#161a33'], world: ['#1d2b5c', '#5a7cbc'], map: ['#0f1630', '#1b2a55'], hall: ['#24130a', '#5a3214'], room: ['#2a2238', '#8a7258'], sea: ['#070b1c', '#18223e'], paris: ['#2a2050', '#b98068'], thai: ['#2a3a7a', '#e2a86a'], tow: ['#1a2a5c', '#7aa0d8'] };
const PLACE = (id) => {
  if (id === 'cover') return 'night';
  if (['ros1', 'law3', 'w1', 'w3', 'w4'].includes(id)) return 'map';
  if (id.startsWith('loki')) return 'hall'; if (id.startsWith('supper') || id === 'cliff1') return 'room';
  if (['law4', 'law5', 'law6'].includes(id)) return 'sea'; if (id.startsWith('ros')) return 'paris'; if (id.startsWith('thai')) return 'thai';
  if (id === 'tow1' || id === 'tow2') return 'tow'; return 'world';
};
const mixC = (a, b, k) => { const ca = new T.Color(a), cb = new T.Color(b); return '#' + ca.lerp(cb, k).getHexString(); };
function bgAt(t) {
  const id = beatAt(t), p = PLACE(id), i = ORDER.indexOf(id), prevId = ORDER[i - 1], pp = prevId ? PLACE(prevId) : p;
  if (pp === p || CUT.has(id)) return BG[p];
  const k = U.clamp((t - at(id)) / 1.2); return [mixC(BG[pp][0], BG[p][0], k), mixC(BG[pp][1], BG[p][1], k)];
}

const vis = (o, on) => { o.visible = !!on; };
const sm = (a, b, x) => U.clamp((x - a) / (b - a));
const P3 = (st, x, y, z) => [ST[st][0] + x, ST[st][1] + y, ST[st][2] + z];
const setP = (o, st, x, y, z) => o.position.set(ST[st][0] + x, ST[st][1] + y, ST[st][2] + z);
const BUB = [];
let curFace = new Map();
function setFace(mesh, tex) { if (curFace.get(mesh) !== tex) { mesh.material.map = tex; mesh.material.needsUpdate = true; curFace.set(mesh, tex); } }
/* calendar flip: pages [[time, tex]] -> face shows latest, flap shows previous page lifting for 0.45 s */
function calFlip(cal, pages, r) {
  const u = cal.userData; let cur = pages[0][1], prev = null, k = 1;
  for (let i = 1; i < pages.length; i++) if (r >= pages[i][0]) { prev = pages[i - 1][1]; cur = pages[i][1]; k = U.clamp((r - pages[i][0]) / 0.45); }
  setFace(u.face, cur); if (prev && k < 1) { u.flap.visible = true; setFace(u.flap, prev); const e = k * k; u.flap.rotation.x = -k * 0.7; u.flap.rotation.z = k * 0.35; u.flap.position.set(k * 0.6, 2.56 - e * 2.6, 0.19 + k * 0.9); u.flap.material.opacity = 1 - U.clamp((k - 0.6) / 0.4); } else u.flap.visible = false;
}
function drawTick(tex, k, crash) {
  const x = tex.userData.x, w = 512, h = 320; x.fillStyle = '#10142a'; x.fillRect(0, 0, w, h); x.strokeStyle = 'rgba(255,255,255,.12)'; x.lineWidth = 2;
  for (let i = 1; i < 5; i++) { x.beginPath(); x.moveTo(0, i * 64); x.lineTo(w, i * 64); x.stroke(); }
  x.fillStyle = '#fff'; x.font = KF(800, 34); x.textAlign = 'left'; x.textBaseline = 'top'; x.fillText('WALL ST. · FRI 13', 18, 14);
  x.beginPath(); const n = 40; for (let i = 0; i <= n * k; i++) { const u = i / n, y = 150 + Math.sin(u * 17) * 14 - u * 30 + (crash ? Math.pow(Math.max(0, u - 0.55) / 0.45, 1.6) * 150 : 0); if (i === 0) x.moveTo(20 + u * 470, y); else x.lineTo(20 + u * 470, y); }
  x.strokeStyle = crash ? '#ff5d73' : '#2ee6c5'; x.lineWidth = 7; x.stroke(); tex.needsUpdate = true;
}

function update(t, s, { camera, W, H }) {
  BUB.length = 0;
  const id = beatAt(t), pl = PLACE(id);
  s.hemi.intensity = 0.95; s.sun.intensity = 0.9;
  const bg = bgAt(t); s.fog.color.set(mixC(bg[1], '#1a2240', 0.35));
  s.fog.near = pl === 'map' ? 300 : 40; s.fog.far = pl === 'map' ? 600 : 115;

  /* ----- CAL ----- */
  { const C = s.cal, u = C.cal.userData;
    if (inB(t, 'hook1')) calFlip(C.cal, [[0, s.tex.feb], [1.4, s.tex.mar], [2.8, s.tex.nov]], rel(t, 'hook1'));
    else if (t >= at('math2')) calFlip(C.cal, [[0, s.tex.nov], [0.9, s.tex.aug]], rel(t, 'math2'));
    else { setFace(u.face, s.tex.nov); u.flap.visible = false; }
    C.cat.userData.tail.rotation.z = Math.sin(t * 2.2) * 0.25; C.cat.userData.head.rotation.z = Math.sin(t * 1.3) * 0.08;
    C.cat.rotation.y = inB(t, 'hook4') ? U.lerp(-2.4, -1.3, U.easeIO(sm(0.3, 1.2, rel(t, 'hook4')))) : -2.4;
    const h2 = rel(t, 'hook2'); setFace(C.lift, inB(t, 'hook2') ? (h2 > 2.4 ? s.tex.lift['14'] : h2 > 0.7 ? s.tex.lift['12'] : s.tex.lift.idle) : s.tex.lift.idle);
    const w = C.worker; rest(w); w.userData.head.rotation.y = 0;
    if (inB(t, 'hook2')) { w.userData.head.rotation.y = h2 > 2.6 ? Math.sin(t * 9) * 0.45 : 0; if (h2 > 2.8) BUB.push({ o: w, dy: 2.3, txt: 'วันนี้ไม่บินดีกว่า…', c: '#fff' }); }
    if (inB(t, 'hook3')) { w.userData.arms.R.rotation.set(-2.2, 0, 0.3); w.userData.head.rotation.z = 0.25; }
    const pk = sm(1.6, dur('hook2') - 0.1, h2); vis(C.plane3, inB(t, 'hook2') && pk > 0 && pk < 1); setP(C.plane3, 'CAL', U.lerp(-14, 12, pk), 7.4 + pk * 1.5, -7); C.plane3.rotation.z = 0.15;
    const m1 = rel(t, 'math1'), showC = between(t, 'math1', 'math1');
    C.cards.forEach((p, i) => { const k = showC ? U.easeBack(sm(0.4 + i * 0.25, 0.8 + i * 0.25, m1)) : 0; const up = i === 4 && showC ? U.easeBack(sm(3.0, 3.6, m1)) : 0;
      p.visible = k > 0.01; p.scale.setScalar(Math.max(0.01, 0.8 * k * (1 + up * 0.25))); setP(p, 'CAL', -2.7 + i * 0.9, 0.62 + up * 0.5, 2.7); });
  }
  /* ----- COV ----- */
  if (t < end('cover') + 0.3) { const Cv = s.cov, fl = Math.sin(t * 37) > 0.93 ? 0.4 : 1; Cv.sgn.material.opacity = fl; Cv.sglow.material.opacity = 0.7 * fl;
    const ck = U.clamp(t / 2.4); setP(Cv.ccat, 'COV', U.lerp(-2.4, -0.8, ck), Math.abs(Math.sin(t * 7)) * 0.04, 1.6); Cv.ccat.rotation.y = 0.15; Cv.ccat.userData.tail.rotation.z = Math.sin(t * 2.5) * 0.3; Cv.ccat.userData.head.rotation.y = 0.6;
    Cv.fogS.forEach((f, i) => { f.position.x = ST.COV[0] - 8 + i * 3.2 + Math.sin(t * 0.4 + i) * 0.6; });
    Cv.shade.position.y = 0.18 + Math.sin(t * 1.5) * 0.03;
    if (pl === 'night') { const lf = t > 0.95 && t < 1.07 ? 1.4 : 0; s.hemi.intensity = 0.45 + lf; s.sun.intensity = 0.25 + lf * 0.4; } }
  /* ----- CLK ----- */
  { const K = s.clk; K.clk.userData.mh.rotation.z = -t * 1.1; K.clk.userData.hh.rotation.z = -t * 0.09 - 0.6;
    const on = between(t, 'c12', 'c13'), r1 = rel(t, 'c12'), r2 = rel(t, 'c13');
    K.months.forEach((b, i) => {
      if (i < 12) { const a = (-100 + i * (200 / 11)) * Math.PI / 180, k = on ? U.easeBack(sm(0.4 + i * 0.16, 0.7 + i * 0.16, r1 + (inB(t, 'c13') ? 99 : 0))) : 0;
        b.visible = k > 0.01; b.scale.setScalar(Math.max(0.01, k)); setP(b, 'CLK', Math.sin(a) * 3.6, 0, -1.5 + Math.cos(a) * 3.2); b.rotation.y = a; }
      else { const d = inB(t, 'c13') ? U.clamp((r2 - 0.5) / 0.6) : 0, land = d >= 1, push = U.easeIO(sm(1.8, 3.2, r2));
        b.visible = inB(t, 'c13') && r2 > 0.5; setP(b, 'CLK', U.lerp(0, 5.2, push), land ? Math.abs(Math.sin((r2 - 1.1) * 7)) * 0.25 * (1 - push) : (1 - d * d) * 6, 2.6); b.rotation.z = land ? Math.sin(r2 * 9) * 0.2 : 0; b.scale.setScalar(1.05); }
    }); }
  /* ----- VAL ----- */
  { const V = s.val, r2 = rel(t, 'loki2'), r3 = rel(t, 'loki3'), dim = inB(t, 'loki3') ? sm(1.4, 2.6, r3) : t >= end('loki3') ? 1 : 0;
    V.fire.userData.f.scale.y = (1 + Math.sin(t * 13) * 0.12) * (1 - dim * 0.5);
    const lokiIn = t >= at('loki2'), lk = U.easeIO(sm(0.3, 2.4, r2)); vis(V.loki, lokiIn && t < end('loki3'));
    setP(V.loki, 'VAL', inB(t, 'loki2') ? U.lerp(8.5, 4.4, lk) : 4.4, 0.2, -1.4); V.loki.rotation.y = -1.2; if (inB(t, 'loki2') && lk < 1) walk(V.loki, t, 1); else rest(V.loki);
    if (inB(t, 'loki2') && r2 > 2.4) { V.loki.userData.arms.R.rotation.set(0, 0, 2.4); BUB.push({ o: V.loki, dy: 2.0, txt: 'ขอร่วมงานด้วยคน~', c: '#fff' }); }
    V.gods.forEach((g, i) => { rest(g); const look = t >= at('loki2') + 1.2 && t < end('loki3') ? 0.9 : 0; g.userData.head.rotation.y = look + Math.sin(t * 1.5 + i) * 0.08;
      if (i === 6) { const fade = inB(t, 'loki3') ? sm(1.3, 3.8, r3) : t >= end('loki3') ? 1 : 0; g.visible = fade < 0.98; g.scale.setScalar(0.78 * Math.max(0.01, 1 - fade)); if (g.userData.ring) g.userData.ring.material.opacity = 0.85 * (1 - fade); }
      else if (inB(t, 'loki3') && r3 > 1.5) { g.userData.arms.L.rotation.set(-0.5, 0, -1.2); g.userData.arms.R.rotation.set(-0.5, 0, 1.2); } });
    if (inB(t, 'loki3')) V.gods[0].userData.arms.R.rotation.set(-1.4, 0, 0.2);
    const ak = sm(0.5, 1.3, r3), from = P3('VAL', -3.4, 1.45, -1.9), to = P3('VAL', 0.47, 1.3, -2.05);
    vis(V.arrow, inB(t, 'loki3') && ak > 0 && ak < 1); V.arrow.position.set(U.lerp(from[0], to[0], ak), U.lerp(from[1], to[1], ak) + Math.sin(ak * Math.PI) * 0.6, U.lerp(from[2], to[2], ak));
    V.motes.forEach((q, i) => { const u = inB(t, 'loki3') ? U.clamp((r3 - 1.4) / 2.6 - (i % 5) * 0.07) : 0; q.visible = u > 0 && u < 1; q.position.set(to[0] + Math.sin(i * 2.1) * 0.35, 1.0 + u * 4.2, to[2] + Math.cos(i * 1.3) * 0.3); q.material.opacity = 0.9 * (1 - u); });
    if (pl === 'hall') { s.hemi.intensity = 0.95 - dim * 0.4; s.sun.intensity = 0.9 - dim * 0.45; }
  }
  /* ----- SUP ----- */
  { const Sp = s.sup, r1 = rel(t, 'supper'), r2 = rel(t, 'supper2');
    Sp.thirteen.forEach((f, i) => { rest(f); f.userData.head.rotation.y = Math.sin(t * 1.2 + i * 1.7) * 0.12;
      const p = f.position; const nk = inB(t, 'supper') ? U.easeBack(sm(0.6 + i * 0.26, 0.85 + i * 0.26, r1)) * U.clamp((dur('supper') - r1) / 0.3) : 0;
      Sp.nums[i].visible = nk > 0.01; Sp.nums[i].scale.set(1.1 * nk, 1.1 * nk * 200 / 640, 1); Sp.nums[i].position.set(p.x, 1.85, p.z + 0.05);
      if (inB(t, 'supper2') || inB(t, 'cliff1')) { if (i !== 4) f.userData.head.rotation.y = (p.x < Sp.thirteen[4].position.x ? 0.7 : -0.7) * sm(0.8, 1.6, r2 + (inB(t, 'cliff1') ? 9 : 0)); } });
    const ju = Sp.thirteen[4], jk = inB(t, 'supper2') || inB(t, 'cliff1') ? sm(0.3, 1.0, r2 + (inB(t, 'cliff1') ? 9 : 0)) : 0;
    ju.userData.body.material.color.set(mixC('#9a7a5a', '#c84a5a', jk)); ju.rotation.y = -0.4 * jk; ju.userData.arms.R.rotation.set(-0.9 * jk, 0, 0.3);
    vis(Sp.bag, jk > 0.5); ju.userData.arms.R.userData.hand.getWorldPosition(Sp.bag.position); }
  /* ----- HAR ----- */
  if (between(t, 'fri1', 'cliff2')) { const Hh = s.har, pos = Hh.water.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, Math.sin(x * 0.8 + t * 1.6) * 0.08 + Math.cos(y * 0.9 + t * 1.2) * 0.07); } pos.needsUpdate = true;
    Hh.ship.rotation.z = Math.sin(t * 1.1) * 0.04; Hh.ship.position.y = -0.25 + Math.sin(t * 1.4) * 0.06;
    const r2 = rel(t, 'fri2'); Hh.sailors.forEach((sl, i) => { rest(sl); sl.rotation.y = 0.2; if (inB(t, 'fri2') && r2 > 0.9) sl.userData.head.rotation.y = Math.sin(t * 8 + i) * 0.45; });
    if (inB(t, 'fri2') && r2 > 0.9) { Hh.sailors[1].userData.arms.L.rotation.set(-1.2, 0, 0.9); Hh.sailors[1].userData.arms.R.rotation.set(-1.2, 0, -0.9); BUB.push({ o: Hh.sailors[1], dy: 2.0, txt: 'วันศุกร์ ไม่ออกเรือ!', c: '#fff' }); }
    const r3 = rel(t, 'fri3'); calFlip(Hh.hcal, [[0, s.tex.fri], [2.0, s.tex.sat]], inB(t, 'fri3') ? r3 : t >= end('fri3') ? 9 : 0);
    const cw = t >= at('fri3'), wk = inB(t, 'fri3') ? U.easeIO(sm(0, 1.6, r3)) : 1; vis(Hh.bride, cw); vis(Hh.groom, cw);
    setP(Hh.bride, 'HAR', U.lerp(-8.5, -4.6, wk), 1.2, 0.5); setP(Hh.groom, 'HAR', U.lerp(-9.3, -5.4, wk), 1.2, 0.5); [Hh.bride, Hh.groom].forEach((c) => { if (wk < 1) { walk(c, t, 1); c.rotation.y = 1.2; } else { rest(c); c.rotation.y = 0.5; } });
    if (inB(t, 'fri3') && r3 > 2.4) { Hh.groom.userData.arms.R.rotation.set(-1.3, 0, -0.6); BUB.push({ o: Hh.groom, dy: 2.0, dx: -0.4, txt: 'เลื่อนเป็นวันเสาร์ดีกว่า', c: '#fff' }); }
  } else { s.har.hcal.userData.flap.visible = false; setFace(s.har.hcal.userData.face, s.tex.fri); s.har.bride.visible = s.har.groom.visible = false; }
  /* ----- TMP ----- */
  { const Tm = s.tmp, r1 = rel(t, 'tmp1'), gk = inB(t, 'tmp1') ? U.easeIO(sm(0.8, 3.0, r1)) : t >= end('tmp1') ? 1 : 0;
    setFace(Tm.tcal.userData.face, s.tex.c1307); Tm.tcal.userData.flap.visible = false;
    Tm.knights.forEach((k, i) => { rest(k); setP(k, 'TMP', -1.35 + i * 0.9, 0, 0.0); k.rotation.y = 0; if (gk > 0.95) { k.userData.arms.L.rotation.set(0, 0, -2.5); k.userData.arms.R.rotation.set(0, 0, 2.5); } });
    const GX = [-2.6, 2.6, -1.3, 1.3], GZ = [1.1, 1.1, 1.9, 1.9];
    Tm.guards.forEach((g, i) => { rest(g); const sx = 8 + i * 0.8; setP(g, 'TMP', U.lerp(sx, GX[i], gk), 0, U.lerp(2.6, GZ[i], gk)); g.rotation.y = gk < 1 ? -1.4 : Math.PI + (GX[i] < 0 ? -0.4 : 0.4); if (gk > 0 && gk < 1) walk(g, t, 1); g.userData.arms.R.rotation.set(-0.3, 0, 0.3); }); }
  /* ----- PAR ----- */
  { const Pp = s.par, r2 = rel(t, 'ros2'), r3 = rel(t, 'ros3'), r4 = rel(t, 'ros4'), r5 = rel(t, 'ros5');
    setFace(Pp.pcal.userData.face, s.tex.c1868); Pp.pcal.userData.flap.visible = false; setFace(Pp.pcal2.userData.face, s.tex.nov); Pp.pcal2.userData.flap.visible = false;
    const playing = inB(t, 'ros2') || (inB(t, 'ros3') && r3 < 1.0); const fade = inB(t, 'ros3') ? sm(1.6, 4.4, r3) : t >= end('ros3') ? 1 : 0;
    const ro = Pp.ross; lapHands(ro); if (playing) { ro.userData.arms.L.rotation.set(-1.0 + Math.sin(t * 11) * 0.15, 0, 0.3); ro.userData.arms.R.rotation.set(-1.0 + Math.cos(t * 13) * 0.15, 0, -0.3); ro.userData.head.rotation.z = Math.sin(t * 3) * 0.1; }
    ro.visible = fade < 0.98; ro.scale.setScalar(Math.max(0.01, 1 - fade));
    Pp.notes.forEach((n, i) => { const u = ((t * 0.5 + i / 6) % 1), on = playing; n.visible = on && t >= at('ros2'); n.position.set(ST.PAR[0] - 0.8 + Math.sin(i * 2.4 + u * 3) * 1.2, 1.8 + u * 3.2, 0.4); n.material.opacity = Math.sin(u * Math.PI); });
    Pp.pmotes.forEach((q, i) => { const u = inB(t, 'ros3') ? U.clamp((r3 - 1.6) / 2.8 - (i % 4) * 0.08) : 0; q.visible = u > 0 && u < 1; q.position.set(ST.PAR[0] + 0.15 + Math.sin(i * 2) * 0.35, 1.0 + u * 4, -0.4 + Math.cos(i) * 0.3); q.material.opacity = 0.9 * (1 - u); });
    const bi = Pp.bio; lapHands(bi); if (inB(t, 'ros4')) bi.userData.arms.R.rotation.set(-1.1 + Math.sin(t * 10) * 0.12, 0.2, -0.3);
    const bk = inB(t, 'ros4') ? U.easeBack(sm(1.2, 1.8, r4)) : t >= end('ros4') ? 1 : 0; Pp.book1.scale.setScalar(0.3 + 0.12 * bk); Pp.book1.position.y = 1.05 + 0.15 * bk;
    const c2 = inB(t, 'ros5') ? U.easeBack(sm(0.8, 1.4, r5)) : 0; Pp.pcal2.visible = c2 > 0.01; Pp.pcal2.scale.setScalar(0.8 * Math.max(0.01, c2)); }
  /* ----- WALL ----- */
  { const Wl = s.wall, r1 = rel(t, 'law1'), r2 = rel(t, 'law2');
    const bk = inB(t, 'law1') ? U.easeBack(sm(0.4, 1.1, r1)) : t >= end('law1') ? 1 : 0; Wl.bk.scale.setScalar(Math.max(0.01, bk)); Wl.bk.rotation.y = 0.35 + Math.sin(t * 0.8) * 0.08;
    rest(Wl.law); if (inB(t, 'law1') && r1 > 1.2) Wl.law.userData.arms.R.rotation.set(0, 0, 2.3);
    if (between(t, 'law1', 'law2')) drawTick(Wl.tick, inB(t, 'law1') ? 0.55 : U.lerp(0.55, 1, sm(0.3, 2.6, r2)), inB(t, 'law2'));
    Wl.brokers.forEach((b, i) => { rest(b); const panic = inB(t, 'law2') && r2 > 1.4; b.position.y = panic ? Math.abs(Math.sin(t * 8 + i)) * 0.25 : 0; b.rotation.y = panic ? Math.sin(t * 5 + i) * 0.6 : 0.3;
      if (panic) { b.userData.arms.L.rotation.set(0, 0, -2.4 - Math.sin(t * 9 + i) * 0.4); b.userData.arms.R.rotation.set(0, 0, 2.4 + Math.sin(t * 9 + i) * 0.4); } });
    if (inB(t, 'law2') && r2 > 2.0) BUB.push({ o: Wl.brokers[2], dy: 2.0, txt: 'ศุกร์ 13! ขายด่วน!', c: '#ffb3b3' }); }
  /* ----- SEA ----- */
  { const Se = s.sea, r4 = rel(t, 'law4'), r5 = rel(t, 'law5'), storm = inB(t, 'law5') ? 1 : inB(t, 'law4') ? sm(2.5, dur('law4'), r4) * 0.6 : inB(t, 'law6') ? 0.3 : 0;
    if (between(t, 'law4', 'law6')) { const pos = Se.sea.geometry.attributes.position, a = 0.12 + storm * 0.3;
      for (let i = 0; i < pos.count; i++) { const x = pos.getX(i), y = pos.getY(i); pos.setZ(i, Math.sin(x * 0.6 + t * 2.2) * a + Math.cos(y * 0.7 + t * 1.7) * a * 0.8); } pos.needsUpdate = true;
      const rp = Se.rain.geometry.attributes.position, b = Se.rain.userData.base; for (let i = 0; i < rp.count; i++) { rp.setY(i, ((b[i * 3 + 1] - t * 11) % 14 + 14) % 14); rp.setX(i, b[i * 3] - ((b[i * 3 + 1] - t * 11) % 14) * 0.15 * storm); } rp.needsUpdate = true; }
    Se.rain.visible = between(t, 'law4', 'law6') && storm > 0.05; Se.rain.material.opacity = 0.25 + storm * 0.5;
    const arr = inB(t, 'law4') ? U.easeOut(sm(0, 3.6, r4)) : 1, drift = inB(t, 'law5') ? U.easeIO(sm(0.4, 3.0, r5)) : t >= end('law5') ? 1 : 0;
    const sx = U.lerp(9, 2.4, arr) - drift * 4.2, sz = -3.4 + drift * 0.6; setP(Se.sch, 'SEA', sx, 0.1 + Math.sin(t * 1.6) * 0.08 * (1 + storm * 2) - drift * 0.55, sz);
    Se.sch.rotation.y = -0.15; Se.sch.rotation.z = Math.sin(t * 1.3) * 0.04 * (1 + storm * 3) + drift * 0.38; Se.sch.rotation.x = drift * 0.12;
    Se.sch.userData.masts.forEach((m, i) => { const f = inB(t, 'law5') ? sm(3.0 + i * 0.15, 4.0 + i * 0.15, r5) : t >= end('law5') ? 1 : 0; m.rotation.z = f * (i % 2 ? 0.5 : -0.4); Se.sch.userData.sails[i].rotation.z = m.rotation.z; Se.sch.userData.sails[i].visible = f < 0.6; });
    Se.lh.userData.beam.material.opacity = 0.5 + 0.5 * Math.abs(Math.sin(t * 1.6));
    const sv = inB(t, 'law5') ? sm(4.2, 4.8, r5) : t >= end('law5') ? 1 : 0; Se.surv.forEach((c, i) => { c.visible = sv > 0.02; c.scale.setScalar(0.55 * Math.max(0.01, sv)); setP(c, 'SEA', -3.3 + i * 0.6, 0.72, -2.7); rest(c); if (inB(t, 'law6')) c.userData.arms.R.rotation.set(0, 0, 2.4 + Math.sin(t * 6 + i) * 0.3); });
    if (pl === 'sea') { const fl = inB(t, 'law5') && ((r5 > 1.1 && r5 < 1.25) || (r5 > 3.2 && r5 < 3.32)) ? 1.6 : 0; s.hemi.intensity = 0.78 + fl; s.sun.intensity = 0.5 + fl * 0.5; } }
  /* ----- CIN ----- */
  { const Cn = s.cin; Cn.cn.userData.bulbs.forEach((b, i) => { b.material.color.set(((i + Math.floor(t * 4)) % 2) ? '#ffe08a' : '#7a6a3a'); });
    Cn.queue.forEach((q, i) => { const u = ((t * 0.18 + i / 6) % 1); setP(q, 'CIN', U.lerp(-4.5, 0, Math.min(1, u * 1.4)), 0, U.lerp(3.4, 0.4, sm(0.55, 1, u))); q.rotation.y = u < 0.7 ? 1.4 : 3.1; walk(q, t + i, 1); q.visible = u < 0.95; }); }
  /* ----- TOW ----- */
  { const Tw = s.tow, r1 = rel(t, 'tow1'), f13 = Tw.floors[12].userData;
    const swap = t >= at('tow1') + 1.6; setFace(f13.lp, swap ? f13.t12a : f13.t13); const pop = inB(t, 'tow1') ? 1 + 0.4 * Math.sin(Math.PI * sm(1.6, 2.1, r1)) : 1; f13.lp.scale.setScalar(pop);
    const ck = inB(t, 'tow1') ? U.easeIO(sm(2.4, 4.6, r1)) : t >= end('tow1') ? 1 : 0, y0 = 11 * 0.92, y1 = 13 * 0.92;
    setP(Tw.car, 'TOW', 2.2, U.lerp(y0, y1, ck) + 0.41, 0.85); setP(Tw.rider, 'TOW', 2.2, U.lerp(y0, y1, ck) + 0.02, 0.85); Tw.rider.rotation.y = 0;
    setFace(Tw.tlift, inB(t, 'tow1') ? (r1 > 4.6 ? s.tex.lift['14'] : r1 > 2.2 ? s.tex.lift['12'] : s.tex.lift.idle) : inB(t, 'tow2') ? s.tex.lift['12A'] : s.tex.lift.idle);
    const r3 = rel(t, 'tow3'); Tw.crowd.forEach((c, i) => { rest(c); c.rotation.y = Math.sin(i * 1.7) * 0.4; const wor = inB(t, 'tow3') && i % 4 === 1 && r3 > 1.2; if (wor) { c.userData.arms.L.rotation.set(-1.6, 0, 0.9); c.userData.arms.R.rotation.set(-1.6, 0, -0.9); c.position.x += Math.sin(t * 30) * 0.004; } });
    if (inB(t, 'tow3') && r3 > 2.0) BUB.push({ o: Tw.crowd[7], dy: 2.0, txt: 'วันนี้อยู่บ้านดีกว่า', c: '#fff' }); }
  /* ----- ROAD ----- */
  { const R = s.road, r2 = rel(t, 'road2');
    R.cars.forEach((c, i) => { const dir = i % 2 ? -1 : 1, x = ((t * 5 * dir + i * 7.3) % 40 + 40) % 40 - 20; setP(c, 'ROAD', x, 0.05, i % 2 ? 1.3 : 2.7); c.rotation.y = dir > 0 ? 0 : Math.PI; });
    const ka = inB(t, 'road2') ? U.easeBack(sm(0.5, 1.4, r2)) : t >= end('road2') ? 1 : 0, kb = inB(t, 'road2') ? U.easeBack(sm(1.8, 2.7, r2)) : t >= end('road2') ? 1 : 0, Hh = 3.0;
    R.barA.scale.y = Math.max(0.01, ka * Hh); R.barB.scale.y = Math.max(0.01, kb * Hh * 7500 / 7800); R.barA.visible = ka > 0.01; R.barB.visible = kb > 0.01;
    R.bla.visible = ka > 0.5; R.blb.visible = kb > 0.5; R.bla.position.set(R.barA.position.x, Hh + 0.9, -2.2); R.blb.position.set(R.barB.position.x, Hh * 7500 / 7800 + 0.9, -2.2);
    rest(R.ana); R.ana.userData.arms.R.rotation.set(-1.2, 0, 0.2); if (inB(t, 'road3')) R.ana.userData.head.rotation.x = Math.sin(t * 6) * 0.15; }
  /* ----- OFF ----- */
  { const O = s.off, r1 = rel(t, 'cof1'), sp = inB(t, 'cof1') ? U.easeIO(sm(1.2, 1.6, r1)) : t >= end('cof1') ? 1 : 0;
    setP(O.mug, 'OFF', 0.5 + sp * 0.25, 1.05 - sp * 0.0, -1.0); O.mug.rotation.z = -sp * 1.45;
    const pk = inB(t, 'cof1') ? sm(1.5, 2.6, r1) : t >= end('cof1') ? 1 : 0; O.puddle.visible = pk > 0.01; O.puddle.scale.setScalar(Math.max(0.01, pk)); setP(O.puddle, 'OFF', 0.9, 1.06, -0.95);
    const ow = O.ow; lapHands(ow); if (t >= at('cof1') + 1.4 && t < end('cof3')) { ow.userData.arms.L.rotation.set(0, 0, -2.5); ow.userData.arms.R.rotation.set(0, 0, 2.5); ow.userData.head.rotation.x = -0.2; }
    if (inB(t, 'cof1') && r1 > 1.8) BUB.push({ o: ow, dy: 2.0, txt: 'ซวยจริง! ศุกร์ 13', c: '#ffb3b3' }); }
  /* ----- THA ----- */
  { const Th = s.tha, r3 = rel(t, 'thai3'), r1 = rel(t, 'thai1');
    const sg = inB(t, 'thai1') ? U.easeBack(sm(0.8, 1.4, r1)) : t >= end('thai1') ? 1 : 0; Th.sign.scale.setScalar(Math.max(0.01, sg)); Th.sign.visible = sg > 0.01;
    Th.fam.forEach((f, i) => { rest(f); f.rotation.y = -0.3; const joy = inB(t, 'thai3') && r3 > 0.8; if (joy) { f.position.y = Math.abs(Math.sin(t * 6 + i)) * (i === 2 ? 0.3 : 0.12); f.userData.arms.L.rotation.set(0, 0, -2.3); f.userData.arms.R.rotation.set(0, 0, 2.3); } else f.position.y = 0; });
    Th.spark.forEach((q, i) => { const u = inB(t, 'thai3') ? ((r3 * 0.35 + i / 16) % 1) : 0; q.visible = inB(t, 'thai3') && r3 > 0.6; setP(q, 'THA', 4.3 + Math.sin(i * 2.3) * 1.8, 0.4 + u * 3.6, 1.2 + Math.cos(i * 1.7) * 0.8); q.material.opacity = Math.sin(u * Math.PI) * 0.9; }); }
  /* ----- MAP ----- */
  { const Mp = s.map, mon = pl === 'map';
    const hl = (name) => { const c = []; if (between(t, 'ros1', 'ros1') && name === 'France') c.push(P.gold); if (inB(t, 'law3') && HL.route.has(name)) c.push(P.teal);
      if (t >= at('w1') && t < end('w4')) { if (HL.tue.has(name)) c.push(P.coral); if (t >= at('w3') && name === 'Italy') c.push(P.violet); if (t >= at('w4') && name === 'Thailand') c.push(P.gold); } return c[c.length - 1]; };
    if (mon) for (const nm in Mp.reg.meshes) { const m = Mp.reg.meshes[nm], c = hl(nm); if (c) m.material.color.set(c); else m.material.color.copy(m.userData.base); m.scale.z = c ? 0.5 : 0.12; }
    const pin = (k, on, t0) => { const p = Mp.pins[k], kk = on ? U.easeBack(sm(t0, t0 + 0.4, t)) : 0; p.visible = kk > 0.01; p.scale.setScalar(Math.max(0.01, kk)); };
    pin('paris', inB(t, 'ros1'), at('ros1', 1.4)); pin('phil', inB(t, 'law3'), at('law3', 0.3)); pin('scilly', inB(t, 'law3'), at('law3', 3.8));
    pin('mexico', inB(t, 'w1'), at('w1', 0.5)); pin('madrid', inB(t, 'w1'), at('w1', 2.9)); pin('athens', inB(t, 'w1'), at('w1', 3.4)); pin('rome', inB(t, 'w3'), at('w3', 0.4)); pin('bkk', inB(t, 'w4'), at('w4', 1.6));
    const rk = inB(t, 'law3') ? U.clamp((rel(t, 'law3') - 0.4) / 3.6) : 0; Mp.rl.visible = false; Mp.dots.forEach((d, i) => { d.visible = inB(t, 'law3') && i / 60 <= rk; });
    Mp.mship.visible = inB(t, 'law3'); const ip = Math.min(59, Math.floor(rk * 60)), fk = rk * 60 - ip, a = Mp.rpts[ip], b = Mp.rpts[ip + 1]; Mp.mship.position.set(U.lerp(a.x, b.x, fk), 0.3, U.lerp(a.z, b.z, fk)); Mp.mship.rotation.y = Math.atan2(-(b.z - a.z), b.x - a.x); }

  /* camera + bubble projection */
  VE.camAt(CAM, t, camera, 0.12); camera.updateMatrixWorld(true);
  const v = s.anchorV;
  for (const b of BUB) { b.o.updateMatrixWorld(true); b.o.getWorldPosition(v); v.y += (b.dy || 2) * (b.o.scale.y || 1); v.x += (b.dx || 0); v.project(camera); b.x = (v.x + 1) / 2 * W; b.y = (1 - v.y) / 2 * H; }
}
