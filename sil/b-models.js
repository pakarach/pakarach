/* Part B: models (low-poly chibi people, props) — base copied from mog/b-models.js */
const M = (c, x) => FK.mat(T, c, x);
const mk = (geo, c, x) => new T.Mesh(geo, M(c, x));
const basic = (c, x) => new T.MeshBasicMaterial(Object.assign({ color: c }, x || {}));
const ROBE = '#e8892a', ROBE2 = '#c76a1a', SKIN = '#e2ae86', MOG = P.violet, SAR = P.teal;
const GOLDM = { metalness: 0.45, roughness: 0.6, emissive: new T.Color('#5a3a00'), emissiveIntensity: 0.35 };

function chibi(o) {
  o = o || {}; const g = new T.Group(), skin = o.skin || SKIN, robe = o.robe || ROBE;
  const ex = o.gold ? GOLDM : o.glow ? { emissive: new T.Color(o.glow), emissiveIntensity: 0.3 } : {};
  const body = mk(new T.CylinderGeometry(o.thin ? 0.26 : 0.36, o.thin ? 0.4 : 0.62, 1.1, 10), robe, ex); body.position.y = 0.55; g.add(body);
  let sash = null;
  if (o.sash) { sash = mk(new T.BoxGeometry(0.2, 1.05, 0.07), o.sash, ex); sash.position.set(0.06, 0.62, 0.42); sash.rotation.set(-0.3, 0, 0.5); g.add(sash); }
  const head = new T.Group(); head.position.y = 1.42; g.add(head);
  head.add(mk(new T.SphereGeometry(0.4, 14, 10), skin, ex));
  if (o.hair) { const h = mk(new T.SphereGeometry(0.43, 14, 8, 0, 6.283, 0, 1.05), o.hair); h.position.set(0, 0.02, -0.06); h.rotation.x = -0.35; head.add(h); }
  if (o.bun) { const b = mk(new T.SphereGeometry(0.17, 8, 6), o.hair || '#2a2228'); b.position.set(0, 0.45, -0.1); head.add(b); }
  if (o.ushnisha) { const u = mk(new T.SphereGeometry(0.17, 8, 6), o.hair || '#3a2a10', ex); u.position.set(0, 0.42, -0.02); head.add(u); }
  if (o.crown) { const c = mk(new T.ConeGeometry(0.24, 0.55, 6), P.gold, { emissive: new T.Color('#b07800'), emissiveIntensity: 0.5 }); c.position.y = 0.55; head.add(c); }
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
  g.userData = { head, body, sash, arms, lap, eyes, halo, ring, sit: false };
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

function hut(w, d, h, wall, roof, o) {
  o = o || {}; const g = new T.Group();
  const walls = mk(new T.BoxGeometry(w, h, d), wall || '#c9a77a'); walls.position.y = h / 2; g.add(walls);
  const r = mk(new T.ConeGeometry(Math.max(w, d) * 0.82, h * 0.85, 4), roof || '#b8873a'); r.rotation.y = Math.PI / 4; r.position.y = h + h * 0.42; r.scale.z = d / w; g.add(r);
  if (o.door !== false) { const dr = mk(new T.BoxGeometry(0.55, 0.95, 0.06), '#5a3a22'); dr.position.set(0, 0.48, d / 2 + 0.03); g.add(dr); g.userData.door = dr; }
  g.userData.walls = walls; g.userData.roof = r; return g;
}
function tree(s, c) {
  const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.1, 0.14, 0.9, 5), '#7a5236'); tr.position.y = 0.45; g.add(tr);
  const f = mk(new T.IcosahedronGeometry(0.75, 0), c || '#3f8f5a'); f.position.y = 1.35; f.scale.y = 1.1; g.add(f); g.scale.setScalar(s || 1); return g;
}
function softSprite(c, a) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const x = cv.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthWrite: false, opacity: a == null ? 1 : a, blending: T.AdditiveBlending }));
}
function orb(c) { const g = new T.Group(); const core = new T.Mesh(new T.SphereGeometry(0.16, 10, 8), basic('#ffffff')); const gl = softSprite(c || 'rgba(190,170,255,1)'); gl.scale.setScalar(1.6); g.add(core, gl); return g; }
function label(txt, o) { const sp = FK.label(T, txt, o); sp.material.fog = false; return sp; }

/* ---- new props for ศีล 5 ---- */
const TON = P.teal;
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const tx = new T.CanvasTexture(c); return tx; }
function box(w, h, d, c, x) { return mk(new T.BoxGeometry(w, h, d), c, x); }
function bed() {
  const g = new T.Group(); const fr = box(2.2, 0.45, 3.0, '#8a5a3c'); fr.position.y = 0.22; const mat = box(2.0, 0.25, 2.8, '#f3efe6'); mat.position.y = 0.55;
  const pil = box(1.2, 0.2, 0.6, '#ffffff'); pil.position.set(0, 0.75, -1.05); const bl = box(2.05, 0.18, 1.8, '#5b7fd6'); bl.position.set(0, 0.72, 0.45);
  const hb = box(2.2, 1.1, 0.15, '#7a4a2c'); hb.position.set(0, 0.75, -1.5); g.add(fr, mat, pil, bl, hb); g.userData.blanket = bl; return g;
}
function desk(o) {
  o = o || {}; const g = new T.Group(); const top = box(1.8, 0.1, 0.9, '#e9e1d2'); top.position.y = 0.8; g.add(top);
  for (const x of [-0.8, 0.8]) { const lg = box(0.08, 0.8, 0.8, '#8a8a8a'); lg.position.set(x, 0.4, 0); g.add(lg); }
  if (o.mon !== false) { const scr = mk(new T.BoxGeometry(0.8, 0.5, 0.05), '#24304f', { emissive: new T.Color('#3a6aa8'), emissiveIntensity: 0.6 }); scr.position.set(o.mx || 0, 1.18, 0.1); const st = box(0.08, 0.22, 0.08, '#555'); st.position.set(o.mx || 0, 0.92, 0.1); g.add(scr, st); g.userData.scr = scr; }
  return g;
}
function chair(c) { const g = new T.Group(); const s = box(0.6, 0.1, 0.6, c || '#3a3f55'); s.position.y = 0.48; const b = box(0.6, 0.6, 0.08, c || '#3a3f55'); b.position.set(0, 0.8, -0.28); const l = box(0.08, 0.45, 0.08, '#555'); l.position.y = 0.22; g.add(s, b, l); return g; }
function table(r, c) { const g = new T.Group(); const top = mk(new T.CylinderGeometry(r || 0.8, r || 0.8, 0.08, 14), c || '#f2e6cf'); top.position.y = 0.78; const lg = mk(new T.CylinderGeometry(0.07, 0.12, 0.78, 6), '#6a6a6a'); lg.position.y = 0.39; g.add(top, lg); return g; }
function glass(c, h) { const g = new T.Group(); const gl = mk(new T.CylinderGeometry(0.1, 0.085, h || 0.3, 10), c || '#f2b233', { transparent: true, opacity: 0.85, emissive: new T.Color(c || '#f2b233'), emissiveIntensity: 0.25 }); gl.position.y = (h || 0.3) / 2; g.add(gl); return g; }
function mosquito() {
  const g = new T.Group(); const b = mk(new T.CylinderGeometry(0.035, 0.05, 0.3, 6), '#2a2a32'); b.rotation.z = Math.PI / 2; g.add(b);
  const h = mk(new T.SphereGeometry(0.06, 8, 6), '#2a2a32'); h.position.x = 0.18; g.add(h);
  const nose = mk(new T.CylinderGeometry(0.008, 0.008, 0.16, 4), '#2a2a32'); nose.rotation.z = Math.PI / 2; nose.position.x = 0.3; g.add(nose);
  const wm = basic('#cfe6ff', { transparent: true, opacity: 0.6, side: T.DoubleSide }); const wings = [];
  for (const s of [-1, 1]) { const w = new T.Mesh(new T.PlaneGeometry(0.22, 0.1), wm); w.position.set(0, 0.05, s * 0.09); w.rotation.x = Math.PI / 2; g.add(w); wings.push(w); }
  for (let i = 0; i < 3; i++) for (const s of [-1, 1]) { const l = mk(new T.CylinderGeometry(0.006, 0.006, 0.22, 3), '#2a2a32'); l.position.set(-0.05 + i * 0.06, -0.08, s * 0.05); l.rotation.x = s * 0.6; g.add(l); }
  g.userData.wings = wings; g.scale.setScalar(1.6); return g;
}
function ant() { const g = new T.Group(); for (let i = 0; i < 3; i++) { const s = mk(new T.SphereGeometry(i === 1 ? 0.035 : 0.045, 6, 4), '#1a1418'); s.position.x = (i - 1) * 0.08; g.add(s); } return g; }
function candle() {
  const g = new T.Group(); const wax = mk(new T.CylinderGeometry(0.12, 0.12, 1, 10), '#fff3dc'); wax.position.y = 0.5; g.add(wax);
  const fl = softSprite('rgba(255,190,90,1)', 1); fl.scale.set(0.35, 0.5, 1); g.add(fl); const core = new T.Mesh(new T.ConeGeometry(0.05, 0.16, 6), basic('#fff0a0')); g.add(core);
  const plate = mk(new T.CylinderGeometry(0.22, 0.22, 0.04, 10), '#c9b27a'); plate.position.y = 0.02; g.add(plate);
  g.userData = { wax, fl, core, set(h) { wax.scale.y = Math.max(0.02, h); wax.position.y = 0.5 * h; fl.position.y = h + 0.2; core.position.y = h + 0.08; } }; g.userData.set(1); return g;
}
function coin() { const c = mk(new T.CylinderGeometry(0.16, 0.16, 0.04, 12), P.gold, GOLDM); c.rotation.x = Math.PI / 2; return c; }
function wallet() { const g = new T.Group(); const w = box(0.7, 0.45, 0.12, '#6a4028'); w.position.y = 0.23; const f = box(0.72, 0.2, 0.13, '#5a3420'); f.position.set(0, 0.38, 0.005); g.add(w, f); return g; }
function phoneMesh() { const p = mk(new T.BoxGeometry(0.22, 0.4, 0.03), '#1a1f3a', { emissive: new T.Color('#5a8ad8'), emissiveIntensity: 0.6 }); return p; }
function pen(c) { const p = mk(new T.CylinderGeometry(0.025, 0.025, 0.36, 6), c || P.gold, c ? {} : GOLDM); return p; }
function sala() {
  const g = new T.Group(); const base = box(9, 0.5, 7, '#d9cdb5'); base.position.y = 0.25; g.add(base);
  for (const x of [-4, 4]) for (const z of [-3, 3]) { const p = mk(new T.CylinderGeometry(0.16, 0.16, 3.2, 8), '#f3efe6'); p.position.set(x, 2.1, z); g.add(p); }
  const ro = { emissive: new T.Color('#5a1e10'), emissiveIntensity: 0.2 };
  const r1 = mk(new T.ConeGeometry(6.8, 1.8, 4), '#b8452f', ro); r1.rotation.y = Math.PI / 4; r1.scale.z = 0.78; r1.position.y = 4.55; g.add(r1);
  const r2 = mk(new T.ConeGeometry(4.6, 1.5, 4), '#c9543a', ro); r2.rotation.y = Math.PI / 4; r2.scale.z = 0.78; r2.position.y = 5.5; g.add(r2);
  for (const s of [-1, 1]) { const ch = mk(new T.ConeGeometry(0.12, 0.9, 5), P.gold, GOLDM); ch.position.set(s * 3.1, 6.1, 0); ch.rotation.z = -s * 0.5; g.add(ch); }
  const dais = box(2.2, 0.5, 1.6, '#c9a77a'); dais.position.set(0, 0.75, -2.0); g.add(dais);
  return g;
}
function stepBlock(h, c) { const m = box(1.5, 1, 1.5, c); m.geometry.translate(0, 0.5, 0); m.userData.h = h; return m; }
function domino(n) {
  const tx = canvasTex(128, 256, (x, w, h) => { x.fillStyle = '#f7f3ea'; x.fillRect(0, 0, w, h); x.fillStyle = n === 5 ? '#ff5d73' : '#1b2a55'; x.font = '800 150px Kanit,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), w / 2, h / 2 + 8); });
  const mats = [M('#e8e2d4'), M('#e8e2d4'), M('#e8e2d4'), M('#e8e2d4'), new T.MeshStandardMaterial({ map: tx, roughness: 0.7 }), M('#e8e2d4')];
  const geo = new T.BoxGeometry(0.75, 1.5, 0.22); geo.translate(0, 0.75, 0); const m = new T.Mesh(geo, mats); return m;
}
function shophouse(c, h) {
  const g = new T.Group(); h = h || 3; const b = box(3, h, 2.6, c || '#e9dcc0'); b.position.y = h / 2; g.add(b);
  const wm = new T.MeshStandardMaterial({ color: '#2a3550', emissive: new T.Color('#ffcf7a'), emissiveIntensity: 0, flatShading: true });
  const wins = [];
  for (let fy = 0; fy < Math.floor(h / 1.1); fy++) for (const x of [-0.8, 0.8]) { const w = new T.Mesh(new T.BoxGeometry(0.6, 0.55, 0.05), wm); w.position.set(x, 0.75 + fy * 1.05, 1.31); g.add(w); wins.push(w); }
  const roof = box(3.2, 0.18, 2.8, '#8a5a3c'); roof.position.y = h + 0.09; g.add(roof); g.userData.winMat = wm; return g;
}
function streetLamp() { const g = new T.Group(); const p = mk(new T.CylinderGeometry(0.05, 0.06, 2.6, 6), '#5a5f70'); p.position.y = 1.3; const hd = new T.Mesh(new T.SphereGeometry(0.16, 8, 6), basic('#fff2c0')); hd.position.y = 2.65; const gl = softSprite('rgba(255,220,140,1)', 0.0); gl.scale.setScalar(2.2); gl.position.y = 2.65; g.add(p, hd, gl); g.userData.gl = gl; return g; }
function car(c) { const g = new T.Group(); const b = box(1.8, 0.45, 0.9, c || '#d9534f'); b.position.y = 0.42; const cab = box(1.0, 0.4, 0.82, '#bfd6ef'); cab.position.set(-0.1, 0.84, 0); g.add(b, cab); for (const x of [-0.6, 0.6]) for (const z of [-0.46, 0.46]) { const w = mk(new T.CylinderGeometry(0.18, 0.18, 0.12, 10), '#222'); w.rotation.x = Math.PI / 2; w.position.set(x, 0.2, z); g.add(w); } const hl = softSprite('rgba(255,240,190,1)', 0); hl.scale.setScalar(1.2); hl.position.set(0.95, 0.45, 0); g.add(hl); g.userData.hl = hl; return g; }
function giftBox(c) { const g = new T.Group(); const b = box(0.5, 0.4, 0.5, c); b.position.y = 0.2; const rb = box(0.52, 0.42, 0.1, P.gold); rb.position.y = 0.2; const rb2 = box(0.1, 0.42, 0.52, P.gold); rb2.position.y = 0.2; g.add(b, rb, rb2); return g; }
function ringMesh(c) { const m = new T.Mesh(new T.RingGeometry(0.92, 1, 64), basic(c, { transparent: true, opacity: 0.8, side: T.DoubleSide, depthWrite: false, blending: T.AdditiveBlending })); m.rotation.x = -Math.PI / 2; m.renderOrder = 4; return m; }
