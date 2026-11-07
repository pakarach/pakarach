/* Part B: models (low-poly chibi people, buildings, props) */
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

function buddha(s) { const b = chibi({ robe: '#f0b648', skin: '#f5cf6a', gold: true, halo: true, sash: '#e0a030', statue: true, closed: true }); setSit(b, true); lapHands(b); b.scale.setScalar(s || 1.35); return b; }

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
function bamboo() {
  const g = new T.Group();
  for (let i = 0; i < 6; i++) { const h = 3 + (i % 3) * 0.8, c = mk(new T.CylinderGeometry(0.06, 0.07, h, 5), '#6fae4a'); c.position.set(Math.cos(i * 2.1) * 0.35, h / 2, Math.sin(i * 2.1) * 0.35); c.rotation.z = (i % 2 ? 1 : -1) * 0.08; g.add(c); const lf = mk(new T.ConeGeometry(0.35, 0.9, 5), '#4f9a3c'); lf.position.set(c.position.x, h, c.position.z); g.add(lf); }
  return g;
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
function stupa(s) {
  const g = new T.Group(); const base = mk(new T.CylinderGeometry(1.7, 1.8, 0.5, 16), '#c9b79a'); base.position.y = 0.25; g.add(base);
  const dome = mk(new T.SphereGeometry(1.45, 16, 10, 0, 6.283, 0, Math.PI / 2), '#d8c8a8'); dome.position.y = 0.5; g.add(dome);
  const hm = mk(new T.BoxGeometry(0.5, 0.35, 0.5), '#b9a888'); hm.position.y = 2.1; g.add(hm);
  const pole = mk(new T.CylinderGeometry(0.04, 0.04, 0.7, 5), '#8a7a60'); pole.position.y = 2.55; g.add(pole);
  const ch = mk(new T.CylinderGeometry(0.4, 0.4, 0.06, 10), '#b9a888'); ch.position.y = 2.75; g.add(ch);
  g.userData.dome = dome; g.scale.setScalar(s || 1); return g;
}
function mansion() {
  const g = new T.Group(); const c1 = '#e9dcc0', c2 = '#c98a4a';
  const f1 = mk(new T.BoxGeometry(4.6, 1.5, 3), c1); f1.position.y = 0.75; g.add(f1);
  const r1 = mk(new T.BoxGeometry(5.2, 0.18, 3.6), c2); r1.position.y = 1.6; g.add(r1);
  const f2 = mk(new T.BoxGeometry(3.6, 1.3, 2.4), c1); f2.position.y = 2.35; g.add(f2);
  const r2 = mk(new T.ConeGeometry(3.2, 1.2, 4), c2); r2.rotation.y = Math.PI / 4; r2.scale.z = 0.7; r2.position.y = 3.6; g.add(r2);
  for (let i = 0; i < 4; i++) { const w = mk(new T.BoxGeometry(0.5, 0.6, 0.05), '#5a3a22'); w.position.set(-1.5 + i, 0.8, 1.53); g.add(w); }
  for (let i = 0; i < 3; i++) { const w = mk(new T.BoxGeometry(0.45, 0.5, 0.05), '#5a3a22'); w.position.set(-1 + i, 2.4, 1.23); g.add(w); }
  return g;
}
function cart() {
  const g = new T.Group(); const bed = mk(new T.BoxGeometry(1.8, 0.25, 1.1), '#8a5a32'); bed.position.y = 0.75; g.add(bed);
  for (const z of [-0.62, 0.62]) { const w = mk(new T.CylinderGeometry(0.5, 0.5, 0.1, 10), '#5a3a1e'); w.rotation.x = Math.PI / 2; w.position.set(0, 0.5, z); g.add(w); }
  const shaft = mk(new T.BoxGeometry(1.6, 0.08, 0.08), '#5a3a1e'); shaft.position.set(1.6, 0.7, 0); g.add(shaft);
  const ox = new T.Group(); const ob = mk(new T.BoxGeometry(1.2, 0.7, 0.6), '#cfc6b8'); ob.position.y = 0.75; ox.add(ob);
  const oh = mk(new T.BoxGeometry(0.4, 0.4, 0.4), '#cfc6b8'); oh.position.set(0.75, 0.95, 0); ox.add(oh);
  for (const z of [-0.18, 0.18]) { const hn = mk(new T.ConeGeometry(0.05, 0.3, 4), '#f3efe6'); hn.position.set(0.8, 1.25, z); ox.add(hn); }
  for (const q of [[-0.4, -0.2], [-0.4, 0.2], [0.4, -0.2], [0.4, 0.2]]) { const l = mk(new T.CylinderGeometry(0.07, 0.07, 0.45, 5), '#bfb5a6'); l.position.set(q[0], 0.22, q[1]); ox.add(l); }
  ox.position.x = 2.6; g.add(ox); g.userData.ox = ox; return g;
}
function fire() { const g = new T.Group(); const f = new T.Mesh(new T.ConeGeometry(0.35, 0.9, 6), basic('#ffb347')); f.position.y = 0.45; const f2 = new T.Mesh(new T.ConeGeometry(0.2, 0.6, 6), basic('#fff0a0')); f2.position.y = 0.35; g.add(f, f2); for (let i = 0; i < 4; i++) { const l = mk(new T.CylinderGeometry(0.06, 0.06, 0.9, 5), '#5a3a1e'); l.rotation.z = Math.PI / 2; l.rotation.y = i * 0.8; l.position.y = 0.06; g.add(l); } g.userData.f = f; return g; }
function softSprite(c, a) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const x = cv.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthWrite: false, opacity: a == null ? 1 : a, blending: T.AdditiveBlending }));
}
function orb(c) { const g = new T.Group(); const core = new T.Mesh(new T.SphereGeometry(0.16, 10, 8), basic('#ffffff')); const gl = softSprite(c || 'rgba(190,170,255,1)'); gl.scale.setScalar(1.6); g.add(core, gl); return g; }
function label(txt, o) { const sp = FK.label(T, txt, o); sp.material.fog = false; return sp; }
