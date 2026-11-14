/* Part B: models (chibi gods/yaksha, multi-arm/head, props) — chibi base from mog/ */
const ROBE = '#e8892a', ROBE2 = '#c76a1a', SKIN = '#e2ae86';
const M = (c, x) => FK.mat(T, c, x);
const mk = (geo, c, x) => new T.Mesh(geo, M(c, x));
const basic = (c, x) => new T.MeshBasicMaterial(Object.assign({ color: c }, x || {}));
const GOLDM = { metalness: 0.45, roughness: 0.6, emissive: new T.Color('#5a3a00'), emissiveIntensity: 0.35 };
function chibi(o) {
  o = o || {}; const g = new T.Group(), skin = o.skin || SKIN, robe = o.robe || ROBE;
  const ex = o.gold ? GOLDM : o.glow ? { emissive: new T.Color(o.glow), emissiveIntensity: 0.3 } : {};
  const body = mk(new T.CylinderGeometry(o.thin ? 0.26 : 0.36, o.thin ? 0.4 : 0.62, 1.1, 10), robe, ex); body.position.y = 0.55; g.add(body);
  let sash = null;
  if (o.sash) { sash = mk(new T.BoxGeometry(0.2, 1.05, 0.07), o.sash, ex); sash.position.set(0.06, 0.62, 0.42); sash.rotation.set(-0.3, 0, 0.5); g.add(sash); }
  const head = new T.Group(); head.position.y = 1.42; g.add(head);
  head.add(mk(new T.SphereGeometry(0.4, 14, 10), skin, ex));
  let hairM = null; if (o.hair) { const h = mk(new T.SphereGeometry(0.43, 14, 8, 0, 6.283, 0, 1.05), o.hair); h.position.set(0, 0.02, -0.06); h.rotation.x = -0.35; head.add(h); hairM = h; }
  if (o.bun) { const b = mk(new T.SphereGeometry(0.17, 8, 6), o.hair || '#2a2228'); b.position.set(0, 0.45, -0.1); head.add(b); }
  if (o.ushnisha) { const u = mk(new T.SphereGeometry(0.17, 8, 6), o.hair || '#3a2a10', ex); u.position.set(0, 0.42, -0.02); head.add(u); }
  if (o.crown) { const gm = { emissive: new T.Color('#b07800'), emissiveIntensity: 0.5, metalness: 0.3 }; const band = mk(new T.CylinderGeometry(0.41, 0.43, 0.14, 12), P.gold, gm); band.position.y = 0.26; head.add(band); for (let k = 0; k < 4; k++) { const c = mk(new T.CylinderGeometry(0.05 + (3 - k) * 0.065, 0.1 + (3 - k) * 0.075, 0.2, 10), P.gold, gm); c.position.y = 0.4 + k * 0.19; head.add(c); } const tip = mk(new T.ConeGeometry(0.06, 0.4, 6), P.gold, gm); tip.position.y = 1.32; head.add(tip); }
  if (o.fangs) for (const s of [-1, 1]) { const f = mk(new T.ConeGeometry(0.035, 0.12, 4), '#ffffff'); f.rotation.x = Math.PI; f.position.set(s * 0.07, -0.19, 0.37); head.add(f); }
  if (o.beard) { const b = mk(new T.ConeGeometry(0.2, 0.5, 6), o.beard); b.rotation.x = Math.PI; b.position.set(0, -0.4, 0.24); head.add(b); }
  if (o.band) { const b = mk(new T.TorusGeometry(0.42, 0.06, 6, 16), o.band); b.rotation.x = Math.PI / 2; b.position.y = 0.14; head.add(b); }
  const eyeM = o.eyeGlow ? basic(o.eyeGlow) : basic('#1a1420'); const eyes = [];
  for (const s of [-1, 1]) {
    const e = new T.Mesh(o.closed ? new T.BoxGeometry(0.13, 0.03, 0.02) : new T.SphereGeometry(o.eyeGlow ? 0.07 : 0.055, 8, 6), eyeM);
    e.position.set(s * 0.14, 0.03, 0.385); head.add(e); eyes.push(e);
  }
  if (!o.statue && !o.closed) { const mo = new T.Mesh(new T.BoxGeometry(0.1, 0.022, 0.02), basic('#7a3a3a')); mo.position.set(0, -0.14, 0.39); head.add(mo); }
  const arms = {};
  for (const s of [-1, 1]) {
    const p = new T.Group(); p.position.set(s * (o.thin ? 0.28 : 0.36), 1.0, 0);
    const a = mk(new T.CylinderGeometry(0.085, 0.085, 0.55, 6), o.sleeve || robe, ex); a.position.y = -0.27;
    const h = mk(new T.SphereGeometry(0.1, 8, 6), skin, ex); h.position.y = -0.58; p.add(a, h); p.userData.hand = h;
    g.add(p); arms[s < 0 ? 'L' : 'R'] = p;
  }
  const lap = mk(new T.CylinderGeometry(0.72, 0.78, 0.28, 12), robe, ex); lap.position.y = 0.14; lap.visible = false; g.add(lap);
  let halo = null;
  if (o.halo) { halo = new T.Mesh(new T.TorusGeometry(0.62, 0.05, 6, 28), basic('#ffe08a', { transparent: true, opacity: 0.9 })); halo.position.set(0, 1.45, -0.3); g.add(halo); }
  let ring = null;
  if (o.ring) { ring = new T.Mesh(new T.RingGeometry(0.75, 0.92, 28), basic(o.ring, { transparent: true, opacity: 0.85, side: T.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.03; g.add(ring); }
  g.userData = { head, body, sash, arms, lap, eyes, halo, ring, hairM, sit: false };
  rest(g); g.scale.setScalar(o.s || 1); return g;
}
function rest(ch) { const a = ch.userData.arms; a.L.rotation.set(0, 0, -0.14); a.R.rotation.set(0, 0, 0.14); ch.userData.head.rotation.set(0, 0, 0); }
function setSit(ch, on) {
  const u = ch.userData; if (u.sit === on) return; u.sit = on; u.lap.visible = on;
  u.body.scale.y = on ? 0.62 : 1; u.body.position.y = on ? 0.62 : 0.55; u.head.position.y = on ? 1.32 : 1.42;
  u.arms.L.position.y = u.arms.R.position.y = on ? 0.92 : 1.0;
  if (u.sash) { u.sash.scale.y = on ? 0.66 : 1; u.sash.position.y = on ? 0.66 : 0.62; }
}
function anjali(ch, k) { k = k == null ? 1 : k; const a = ch.userData.arms; a.L.rotation.set(-1.15 * k, 0, -0.14 + 0.72 * k); a.R.rotation.set(-1.15 * k, 0, 0.14 - 0.72 * k); }
function lapHands(ch) { const a = ch.userData.arms; a.L.rotation.set(-0.75, 0, 0.5); a.R.rotation.set(-0.75, 0, -0.5); }
function walk(ch, t, amp) { amp = amp == null ? 1 : amp; const a = ch.userData.arms, s = Math.sin(t * 9) * 0.5 * amp; a.L.rotation.set(s, 0, -0.14); a.R.rotation.set(-s, 0, 0.14); ch.userData.body.position.y = 0.55 + Math.abs(Math.sin(t * 9)) * 0.05 * amp; }
function face(ch, dx, dz) { ch.rotation.y = Math.atan2(dx, dz); }
function tree(s, c) {
  const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.1, 0.14, 0.9, 5), '#7a5236'); tr.position.y = 0.45; g.add(tr);
  const f = mk(new T.IcosahedronGeometry(0.75, 0), c || '#3f8f5a'); f.position.y = 1.35; f.scale.y = 1.1; g.add(f); g.scale.setScalar(s || 1); return g;
}
function palace(col, o) {
  o = o || {}; const g = new T.Group(), gold = { emissive: new T.Color('#6a4a00'), emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.4 };
  const base = mk(new T.BoxGeometry(5, 0.5, 4), '#f3efe6'); base.position.y = 0.25; g.add(base);
  for (let i = 0; i < 6; i++) { const p = mk(new T.CylinderGeometry(0.12, 0.12, 1.8, 6), '#fff6dc'); p.position.set(-2 + (i % 3) * 2, 1.4, i < 3 ? 1.6 : -1.6); g.add(p); }
  const hall = mk(new T.BoxGeometry(3.4, 1.8, 2.6), col || '#fbe9c2'); hall.position.y = 1.4; g.add(hall);
  let y = 2.3; for (let k = 0; k < 3; k++) { const r = mk(new T.ConeGeometry(2.9 - k * 0.75, 0.9, 4), P.gold, gold); r.rotation.y = Math.PI / 4; r.position.y = y + 0.45; r.scale.z = 0.8; g.add(r); y += 0.6; }
  const sp = mk(new T.ConeGeometry(0.18, 1.6, 6), P.gold, gold); sp.position.y = y + 0.9; g.add(sp);
  return g;
}
function cloud(s) { const g = new T.Group(); const m = M('#f4f6ff', { emissive: new T.Color('#9fb2ff'), emissiveIntensity: 0.25 }); [[0, 0, 0, 1.3], [1.3, -0.2, 0.2, 1], [-1.3, -0.25, 0.1, 1], [0.5, 0.4, -0.3, 0.9], [-0.6, 0.3, -0.4, 0.8]].forEach((q) => { const sp = new T.Mesh(new T.IcosahedronGeometry(q[3], 1), m); sp.position.set(q[0], q[1], q[2]); sp.scale.y = 0.6; g.add(sp); }); g.scale.setScalar(s || 1); return g; }
function fire() { const g = new T.Group(); const f = new T.Mesh(new T.ConeGeometry(0.35, 0.9, 6), basic('#ffb347')); f.position.y = 0.45; const f2 = new T.Mesh(new T.ConeGeometry(0.2, 0.6, 6), basic('#fff0a0')); f2.position.y = 0.35; g.add(f, f2); for (let i = 0; i < 4; i++) { const l = mk(new T.CylinderGeometry(0.06, 0.06, 0.9, 5), '#5a3a1e'); l.rotation.z = Math.PI / 2; l.rotation.y = i * 0.8; l.position.y = 0.06; g.add(l); } g.userData.f = f; return g; }
function softSprite(c, a) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const x = cv.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthWrite: false, opacity: a == null ? 1 : a, blending: T.AdditiveBlending }));
}
function orb(c) { const g = new T.Group(); const core = new T.Mesh(new T.SphereGeometry(0.16, 10, 8), basic('#ffffff')); const gl = softSprite(c || 'rgba(190,170,255,1)'); gl.scale.setScalar(1.6); g.add(core, gl); return g; }
function label(txt, o) { const sp = FK.label(T, txt, o); sp.material.fog = false; return sp; }

/* ---------- RAM1 extras ---------- */
const NON = '#6f97b3', YAK_EYE = '#ffe36a', DEVA = '#f3d9a6', ISU = '#f4f6ff', NARA = '#6a5fc0', TOSA = '#2f8f5a', RAMA = '#58b86a';
function crownDeva(o) { return chibi(Object.assign({ robe: '#fff3c4', skin: DEVA, crown: true, sash: P.gold, s: 0.85 }, o || {})); }
function xArms(ch, n, skin, sleeve, spread) {
  const out = []; spread = spread || 1;
  for (let i = 0; i < n; i++) {
    const s = i % 2 ? 1 : -1, k = Math.floor(i / 2), p = new T.Group(); p.position.set(s * 0.32, 1.02 - k * 0.02, -0.08 - k * 0.02);
    const a = mk(new T.CylinderGeometry(0.07, 0.07, 0.55, 6), sleeve || skin); a.position.y = -0.27; const h = mk(new T.SphereGeometry(0.085, 8, 6), skin); h.position.y = -0.58; p.add(a, h);
    p.userData.base = s * (0.55 + k * 0.32 * spread); p.userData.side = s; p.rotation.set(0, 0, p.userData.base); ch.add(p); out.push(p);
  }
  ch.userData.xarms = out; return out;
}
function xHeads(ch, mode, skin, eye) {
  const out = [], H = ch.userData.head, gm = { emissive: new T.Color('#b07800'), emissiveIntensity: 0.5 };
  const mkH = (r, x, y, z) => { const g = new T.Group(); g.add(mk(new T.SphereGeometry(r, 12, 8), skin)); for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(r * 0.16, 6, 5), basic(eye)); e.position.set(s * r * 0.36, 0.03, r * 0.94); g.add(e); } const c = mk(new T.ConeGeometry(r * 0.55, r * 1.3, 6), P.gold, gm); c.position.y = r * 1.1; g.add(c); g.position.set(x, y, z); H.add(g); out.push(g); return g; };
  if (mode === 'in') { for (let i = 1; i <= 9; i++) { const s = i % 2 ? 1 : -1, k = Math.ceil(i / 2); mkH(0.3, s * (0.55 + (k - 1) * 0.5), -0.02 - k * 0.03, -0.12 - k * 0.04); } }
  else { [[-0.5, 0.12, -0.05], [0.5, 0.12, -0.05], [-0.32, 0.18, -0.4], [0.32, 0.18, -0.4]].forEach((q) => mkH(0.24, q[0], q[1], q[2])); [[-0.36, 0.72, -0.12], [0.36, 0.72, -0.12], [-0.13, 0.78, -0.32], [0.13, 0.78, -0.32]].forEach((q) => mkH(0.19, q[0], q[1], q[2])); mkH(0.17, 0, 1.18, -0.2); }
  ch.userData.xheads = out; return out;
}
function tip(ch, c) { const sp = softSprite(c || 'rgba(160,230,255,1)', 1); sp.scale.setScalar(0.55); sp.position.y = -0.7; ch.userData.arms.R.add(sp); ch.userData.tip = sp; sp.visible = false; return sp; }
function point(ch, k) { const a = ch.userData.arms.R; a.rotation.set(-1.45 * k, 0, 0.14 * (1 - k)); }
function basin() { const g = new T.Group(); const b = mk(new T.CylinderGeometry(0.55, 0.38, 0.32, 14), P.gold, GOLDM); b.position.y = 0.16; const w = new T.Mesh(new T.CircleGeometry(0.5, 16), basic('#8fd8ff')); w.rotation.x = -Math.PI / 2; w.position.y = 0.3; g.add(b, w); return g; }
function lotus(s) { const g = new T.Group(); for (let r = 0; r < 2; r++) for (let i = 0; i < 8; i++) { const p = mk(new T.SphereGeometry(0.5, 8, 6), r ? '#ffd0e0' : '#ff9fc0'); p.scale.set(0.45, 0.25, 1); const a = i / 8 * 6.283 + r * 0.4; p.position.set(Math.sin(a) * (0.75 - r * 0.3), 0.1 + r * 0.15, Math.cos(a) * (0.75 - r * 0.3)); p.rotation.y = a; p.rotation.x = -0.5 - r * 0.3; g.add(p); } g.scale.setScalar(s || 1); return g; }
function throne() { const g = new T.Group(); const seat = mk(new T.BoxGeometry(2.4, 0.7, 1.8), P.gold, GOLDM); seat.position.y = 0.35; const back = mk(new T.BoxGeometry(2.4, 2.4, 0.3), '#e8c060', GOLDM); back.position.set(0, 1.5, -0.8); const tp = mk(new T.ConeGeometry(0.9, 1.4, 4), P.gold, GOLDM); tp.rotation.y = Math.PI / 4; tp.position.set(0, 3.3, -0.8); g.add(seat, back, tp); return g; }
function beam(c) { const m = new T.Mesh(new T.CylinderGeometry(0.035, 0.035, 1, 6), basic(c || '#bff4ff', { transparent: true, opacity: 0.9, depthWrite: false })); m.geometry.translate(0, 0.5, 0); m.geometry.rotateX(Math.PI / 2); m.visible = false; return m; }
function aimBeam(b, from, to, k) { const d = from.distanceTo(to); b.position.copy(from); b.lookAt(to); b.scale.set(1, 1, Math.max(0.001, d * k)); b.visible = k > 0.01; }
