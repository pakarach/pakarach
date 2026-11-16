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

/* ---- วัง 3 ฤดู extras ---- */
const PRINCE = '#f4ecd8', PR_SASH = P.gold, GOLDE = { emissive: new T.Color('#6a4a00'), emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.45 };
function prince(s) { return chibi({ robe: PRINCE, sash: PR_SASH, crown: true, hair: '#2a2228', ring: P.gold, s: s || 1 }); }
function king(s) { return chibi({ robe: '#c94a4a', sash: P.gold, crown: true, hair: '#d8d8d8', beard: '#e8e8e8', s: s || 1.1 }); }
function lady(c, s) { return chibi({ robe: c || '#ff8fb0', hair: '#2a2228', bun: true, s: s || 0.85 }); }
/* tiered palace: same hall + same spire height, only the number of tiers differs */
function tierPalace(n, wall, accent) {
  const g = new T.Group();
  const base = mk(new T.BoxGeometry(6, 0.6, 5), '#efe8d8'); base.position.y = 0.3; g.add(base);
  const steps = mk(new T.BoxGeometry(2, 0.3, 1.2), '#e6dcc4'); steps.position.set(0, 0.15, 2.9); g.add(steps);
  for (let i = 0; i < 8; i++) { const p = mk(new T.CylinderGeometry(0.13, 0.13, 2.0, 6), '#fff6dc'); p.position.set(-2.4 + (i % 4) * 1.6, 1.6, i < 4 ? 2.0 : -2.0); g.add(p); }
  const hall = mk(new T.BoxGeometry(4.2, 2.0, 3.4), wall); hall.position.y = 1.6; g.add(hall);
  const door = mk(new T.BoxGeometry(0.9, 1.3, 0.08), '#7a3a1e'); door.position.set(0, 1.25, 1.72); g.add(door);
  for (const x of [-1.4, 1.4]) { const w = mk(new T.BoxGeometry(0.6, 0.7, 0.08), accent); w.position.set(x, 1.7, 1.72); g.add(w); }
  const H = 4.4, h = H / n; let y = 2.6;
  for (let k = 0; k < n; k++) {
    const r0 = 3.4 * (1 - k / (n + 1.2)); const roof = mk(new T.ConeGeometry(r0, h * 1.25, 4), k % 2 ? accent : P.gold, k % 2 ? {} : GOLDE);
    roof.rotation.y = Math.PI / 4; roof.scale.z = 0.82; roof.position.y = y + h * 0.62; g.add(roof); y += h;
  }
  const sp = mk(new T.ConeGeometry(0.16, 1.4, 6), P.gold, GOLDE); sp.position.y = y + 0.9; g.add(sp);
  g.userData = { top: y + 1.6, hall }; return g;
}
function horse(c) {
  const g = new T.Group(), m = c || '#f2efe8';
  const body = mk(new T.BoxGeometry(1.5, 0.6, 0.55), m); body.position.y = 1.05; g.add(body);
  const neck = mk(new T.BoxGeometry(0.35, 0.8, 0.32), m); neck.position.set(0.75, 1.45, 0); neck.rotation.z = -0.5; g.add(neck);
  const head = mk(new T.BoxGeometry(0.6, 0.3, 0.3), m); head.position.set(1.12, 1.78, 0); head.rotation.z = -0.3; g.add(head);
  const mane = mk(new T.BoxGeometry(0.12, 0.7, 0.12), '#c9c2b4'); mane.position.set(0.62, 1.6, 0); mane.rotation.z = -0.5; g.add(mane);
  const legs = [];
  for (const q of [[0.55, 0.2], [0.55, -0.2], [-0.55, 0.2], [-0.55, -0.2]]) { const p = new T.Group(); p.position.set(q[0], 0.8, q[1]); const l = mk(new T.CylinderGeometry(0.08, 0.07, 0.8, 5), m); l.position.y = -0.4; p.add(l); g.add(p); legs.push(p); }
  const tail = mk(new T.ConeGeometry(0.12, 0.7, 5), '#c9c2b4'); tail.position.set(-0.85, 0.95, 0); tail.rotation.z = -2.4; g.add(tail);
  const saddle = mk(new T.BoxGeometry(0.6, 0.12, 0.6), P.coral); saddle.position.set(0.05, 1.4, 0); g.add(saddle);
  g.userData = { legs }; return g;
}
function gallop(h, t, amp) { h.userData.legs.forEach((l, i) => { l.rotation.z = Math.sin(t * 12 + (i % 2 ? 0 : Math.PI) + (i > 1 ? 0.6 : 0)) * 0.6 * amp; }); }
function chariot() {
  const g = new T.Group(); const bed = mk(new T.BoxGeometry(1.6, 0.25, 1.2), '#c9a24a', GOLDE); bed.position.y = 0.8; g.add(bed);
  const rail = mk(new T.BoxGeometry(0.1, 0.6, 1.2), '#c9a24a', GOLDE); rail.position.set(0.75, 1.2, 0); g.add(rail);
  for (const z of [-0.68, 0.68]) { const w = mk(new T.CylinderGeometry(0.55, 0.55, 0.1, 12), '#7a4a22'); w.rotation.x = Math.PI / 2; w.position.set(0, 0.55, z); g.add(w); }
  const um = mk(new T.ConeGeometry(0.9, 0.35, 10), '#ffffff'); um.position.set(-0.2, 2.75, 0); const pole = mk(new T.CylinderGeometry(0.03, 0.03, 1.9, 5), '#d8d0c0'); pole.position.set(-0.2, 1.8, 0); g.add(um, pole);
  const hr = horse(); hr.position.x = 2.2; hr.scale.setScalar(0.85); g.add(hr); g.userData.horse = hr; return g;
}
function parasol(s) { const g = new T.Group(); const pole = mk(new T.CylinderGeometry(0.03, 0.03, 2.4, 5), '#d8d0c0'); pole.position.y = 1.2; const top = mk(new T.ConeGeometry(0.95, 0.35, 12), '#ffffff'); top.position.y = 2.45; const t2 = mk(new T.ConeGeometry(0.7, 0.3, 12), '#ffffff'); t2.position.y = 2.75; g.add(pole, top, t2); g.scale.setScalar(s || 1); return g; }
function jar(lotus) { const g = new T.Group(); const j = mk(new T.SphereGeometry(0.45, 10, 8), '#a8582e'); j.scale.y = 1.1; j.position.y = 0.48; g.add(j); const w = new T.Mesh(new T.CircleGeometry(0.32, 12), basic('#5fb6e8')); w.rotation.x = -Math.PI / 2; w.position.y = 0.92; g.add(w);
  if (lotus) { const fl = mk(new T.ConeGeometry(0.16, 0.24, 6), lotus, { emissive: new T.Color(lotus), emissiveIntensity: 0.25 }); fl.position.y = 1.08; g.add(fl); const lf = mk(new T.CylinderGeometry(0.22, 0.22, 0.02, 10), '#3f8f5a'); lf.position.set(0.12, 0.94, 0.08); g.add(lf); } return g; }
function lotusPond(col, r) { const g = new T.Group(); const rim = mk(new T.CylinderGeometry(r, r + 0.15, 0.25, 18), '#d8ccb0'); rim.position.y = 0.12; g.add(rim); const w = new T.Mesh(new T.CircleGeometry(r - 0.12, 20), basic('#4aa3d8')); w.rotation.x = -Math.PI / 2; w.position.y = 0.26; g.add(w);
  for (let i = 0; i < 7; i++) { const a = i * 2.4, rr2 = (r - 0.5) * Math.sqrt((i + 1) / 7); const lf = mk(new T.CylinderGeometry(0.28, 0.28, 0.03, 10), '#3f8f5a'); lf.position.set(Math.cos(a) * rr2, 0.28, Math.sin(a) * rr2); g.add(lf); if (i % 2 === 0) { const fl = mk(new T.ConeGeometry(0.18, 0.3, 6), col, { emissive: new T.Color(col), emissiveIntensity: 0.3 }); fl.position.set(lf.position.x, 0.42, lf.position.z); g.add(fl); } }
  return g; }
function bowlOf(food) { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.42, 12, 8, 0, 6.283, Math.PI / 2, Math.PI / 2), '#b07a4a'); b.position.y = 0.42; g.add(b);
  if (food === 'poor') { const r = mk(new T.SphereGeometry(0.36, 10, 6, 0, 6.283, 0, 1.0), '#9a9480'); r.position.y = 0.36; g.add(r); const c2 = mk(new T.SphereGeometry(0.3, 10, 6, 0, 6.283, Math.PI / 2, Math.PI / 2), '#8a7a50'); c2.position.set(0.85, 0.3, 0); c2.rotation.x = Math.PI; g.add(c2); }
  else { const r = mk(new T.SphereGeometry(0.38, 10, 6, 0, 6.283, 0, 1.1), '#fbf8ee'); r.position.y = 0.36; g.add(r); const meat = mk(new T.DodecahedronGeometry(0.2, 0), '#a8532e'); meat.position.set(0.1, 0.62, 0.05); g.add(meat); const m2 = meat.clone(); m2.position.set(-0.15, 0.6, -0.08); g.add(m2); const wh = mk(new T.ConeGeometry(0.06, 0.5, 5), '#e8c46a'); wh.position.set(0.85, 0.25, 0); g.add(wh); const wh2 = wh.clone(); wh2.position.x = 0.95; g.add(wh2); }
  return g; }
function cvTex(w, h, draw) { const cv = document.createElement('canvas'); cv.width = w; cv.height = h; draw(cv.getContext('2d'), w, h); const tx = new T.CanvasTexture(cv); return tx; }
function flamesTex() { return cvTex(512, 256, (g, w, h) => { g.fillStyle = '#5a1e14'; g.fillRect(0, 0, w, h); g.strokeStyle = P.gold; g.lineWidth = 8; g.strokeRect(6, 6, w - 12, h - 12);
  for (let i = 0; i < 7; i++) { const x = 40 + i * 72, hh = 120 + (i % 3) * 30; for (const [c, k] of [['#ff7a2a', 1], ['#ffc94a', 0.65], ['#fff3b0', 0.32]]) { g.fillStyle = c; g.beginPath(); g.moveTo(x - 28 * k, h - 24); g.quadraticCurveTo(x - 30 * k, h - 24 - hh * k * 0.6, x, h - 24 - hh * k); g.quadraticCurveTo(x + 30 * k, h - 24 - hh * k * 0.6, x + 28 * k, h - 24); g.fill(); } } }); }
function pondTex() { return cvTex(512, 256, (g, w, h) => { g.fillStyle = '#2a6f9a'; g.fillRect(0, 0, w, h); g.strokeStyle = P.gold; g.lineWidth = 8; g.strokeRect(6, 6, w - 12, h - 12);
  for (let i = 0; i < 6; i++) { g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 4; g.beginPath(); g.arc(256, 300, 60 + i * 40, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
  for (let i = 0; i < 6; i++) { const x = 50 + i * 82, y = 150 + (i % 2) * 40; g.fillStyle = '#3f8f5a'; g.beginPath(); g.ellipse(x, y + 20, 38, 14, 0, 0, 6.283); g.fill(); g.fillStyle = ['#ff8fb0', '#ffffff', '#7fa8ff'][i % 3]; g.beginPath(); g.moveTo(x - 20, y + 10); g.lineTo(x, y - 34); g.lineTo(x + 20, y + 10); g.fill(); } }); }
function netTex() { return cvTex(128, 128, (g, w, h) => { g.clearRect(0, 0, w, h); g.strokeStyle = '#ffd56a'; g.lineWidth = 5; for (let i = 0; i <= 8; i++) { g.beginPath(); g.moveTo(i * 16, 0); g.lineTo(i * 16, h); g.stroke(); g.beginPath(); g.moveTo(0, i * 16); g.lineTo(w, i * 16); g.stroke(); } }); }
/* cutaway room: floor + back wall + left wall + ceiling slab at height h; window opening on the right side drawn as a frame */
function room(w, d, h, wallC, floorC) {
  const g = new T.Group();
  const fl = mk(new T.BoxGeometry(w, 0.3, d), floorC || '#c99a62'); fl.position.y = -0.15; g.add(fl);
  const back = mk(new T.BoxGeometry(w, h, 0.3), wallC); back.position.set(0, h / 2, -d / 2); g.add(back);
  const left = mk(new T.BoxGeometry(0.3, h, d), wallC); left.position.set(-w / 2, h / 2, 0); g.add(left);
  const ceil = mk(new T.BoxGeometry(w, 0.3, d), '#8a5a32'); ceil.position.set(0, h + 0.15, 0); g.add(ceil);
  const rug = mk(new T.BoxGeometry(w * 0.6, 0.04, d * 0.5), '#b8452f'); rug.position.set(0, 0.02, 0.3); g.add(rug);
  g.userData = { back, left, ceil }; return g;
}
function shutterWin(w, h, mat) { /* right-wall window: frame + two leaves that swing (k 0 = closed, 1 = open) */
  const g = new T.Group(); const fr = mk(new T.BoxGeometry(0.15, h + 0.3, w + 0.3), '#6a3a1e'); g.add(fr);
  const sky = new T.Mesh(new T.PlaneGeometry(w, h), basic('#8fc8ff')); sky.rotation.y = -Math.PI / 2; sky.position.x = 0.09; g.add(sky); g.userData.sky = sky;
  const leaves = []; for (const s of [-1, 1]) { const pv = new T.Group(); pv.position.set(-0.05, 0, s * w / 2); const lf = new T.Mesh(new T.BoxGeometry(0.08, h, w / 2), mat || M('#8a5a32')); lf.position.z = -s * w / 4; pv.add(lf); g.add(pv); pv.userData.s = s; leaves.push(pv); }
  g.userData.leaves = leaves; g.userData.set = (k) => leaves.forEach((pv) => { pv.rotation.y = pv.userData.s * k * 1.35; }); return g;
}
let RS = 11; const R01 = () => ((RS = (RS * 16807) % 2147483647) / 2147483647);
function rainLines(n, w, h, d, c) { const p = new Float32Array(n * 6), seed = new Float32Array(n * 3); for (let i = 0; i < n; i++) { seed[i * 3] = (R01() - 0.5) * w; seed[i * 3 + 1] = R01(); seed[i * 3 + 2] = (R01() - 0.5) * d; }
  const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); const ln = new T.LineSegments(g, new T.LineBasicMaterial({ color: c || '#cfe6ff', transparent: true, opacity: 0.8 })); ln.userData = { seed, h, n }; return ln; }
function rainAt(ln, t, speed, len) { const u = ln.userData, pos = ln.geometry.attributes.position; for (let i = 0; i < u.n; i++) { const y = u.h * (1 - ((u.seed[i * 3 + 1] + t * speed / u.h) % 1)); pos.setXYZ(i * 2, u.seed[i * 3], y, u.seed[i * 3 + 2]); pos.setXYZ(i * 2 + 1, u.seed[i * 3], y - (len || 0.35), u.seed[i * 3 + 2]); } pos.needsUpdate = true; }
