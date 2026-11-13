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

/* ---------- ศุกร์ 13 models ---------- */
function ctex(w, h, fn) { const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d'); fn(x, w, h); const t = new T.CanvasTexture(c); t.anisotropy = 4; t.userData = { c, x }; return t; }
const KF = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function plane(w, h, tex, o) { const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial(Object.assign({ map: tex, transparent: true, side: T.DoubleSide }, o || {}))); return m; }
function calTex(top, num, dow, col) {
  return ctex(512, 600, (x, w, h) => {
    x.fillStyle = '#fbf7ee'; x.fillRect(0, 0, w, h); x.fillStyle = col || P.coral; x.fillRect(0, 0, w, 150);
    for (let i = 0; i < 6; i++) { x.fillStyle = '#3a3f55'; x.beginPath(); x.arc(70 + i * 75, 30, 14, 0, 6.283); x.fill(); }
    x.fillStyle = '#fff'; x.font = KF(800, 70); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(top, w / 2, 98);
    x.fillStyle = '#1a1f3a'; x.font = KF(800, num.length > 2 ? 200 : 300); x.fillText(num, w / 2, 340);
    x.fillStyle = col || P.coral; x.font = KF(800, 80); x.fillText(dow, w / 2, 525);
  });
}
function calPad(s) {
  const g = new T.Group(); const base = mk(new T.BoxGeometry(2.3, 2.7, 0.35), '#3a3f55'); base.position.y = 1.35; g.add(base);
  const face = plane(2.1, 2.46, null, { transparent: false }); face.position.set(0, 1.33, 0.18); g.add(face);
  const flap = plane(2.1, 2.46, null, { transparent: true }); flap.geometry.translate(0, -1.23, 0); flap.position.set(0, 2.56, 0.19); g.add(flap);
  const legs = mk(new T.BoxGeometry(0.2, 1.4, 0.2), '#3a3f55'); legs.position.set(0, 0.6, -0.5); legs.rotation.x = -0.35; g.add(legs);
  g.userData = { face, flap }; g.scale.setScalar(s || 1); return g;
}
function catM() {
  const g = new T.Group(), c = '#1c1d26', ex = { roughness: 0.5 };
  const body = mk(new T.SphereGeometry(0.45, 10, 8), c, ex); body.scale.set(1.25, 0.85, 0.8); body.position.y = 0.42; g.add(body);
  const head = new T.Group(); head.position.set(0.55, 0.85, 0); g.add(head);
  head.add(mk(new T.SphereGeometry(0.3, 10, 8), c, ex));
  for (const z of [-0.15, 0.15]) { const e = mk(new T.ConeGeometry(0.1, 0.22, 4), c, ex); e.position.set(0, 0.3, z); head.add(e);
    const ey = new T.Mesh(new T.SphereGeometry(0.055, 8, 6), basic('#ffd84a')); ey.position.set(0.25, 0.05, z * 0.8); head.add(ey); }
  const tail = new T.Group(); tail.position.set(-0.55, 0.45, 0); g.add(tail);
  for (let i = 0; i < 5; i++) { const s = mk(new T.CylinderGeometry(0.06, 0.07, 0.22, 5), c); s.position.set(-0.05 * i, 0.18 * i, 0); s.rotation.z = 0.25 * i; tail.add(s); }
  for (const q of [[0.3, 0.2], [0.3, -0.2], [-0.3, 0.2], [-0.3, -0.2]]) { const l = mk(new T.CylinderGeometry(0.07, 0.07, 0.3, 5), c); l.position.set(q[0], 0.12, q[1]); g.add(l); }
  g.userData = { head, tail }; return g;
}
function liftTex(lit) {
  return ctex(256, 640, (x, w, h) => {
    x.fillStyle = '#c9ced8'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a92a6'; x.lineWidth = 8; x.strokeRect(4, 4, w - 8, h - 8);
    const L = ['15', '14', '12A', '12', '11', '10'];
    L.forEach((s, i) => { const y = 70 + i * 100, on = s === lit; x.fillStyle = on ? '#ffc94a' : '#eef1f6'; x.beginPath(); x.arc(w / 2, y, 40, 0, 6.283); x.fill(); x.strokeStyle = on ? '#b07800' : '#7a8296'; x.lineWidth = 5; x.stroke();
      x.fillStyle = s === '12A' ? '#d0304a' : '#1a1f3a'; x.font = KF(800, s.length > 2 ? 30 : 38); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, w / 2, y + 2); });
  });
}
function block(txt, col, s) {
  const g = new T.Group(); s = s || 1; const b = mk(new T.BoxGeometry(s, s, s), col); b.position.y = s / 2; g.add(b);
  const tx = ctex(256, 256, (x, w, h) => { x.fillStyle = '#fff'; x.font = KF(800, txt.length > 2 ? 90 : 140); x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 14; x.strokeStyle = 'rgba(10,12,30,.6)'; x.strokeText(txt, 128, 136); x.fillText(txt, 128, 136); });
  const f = plane(s * 0.92, s * 0.92, tx); f.position.set(0, s / 2, s / 2 + 0.01); g.add(f); g.userData.box = b; return g;
}
function clockM() {
  const g = new T.Group();
  const tx = ctex(512, 512, (x, w, h) => { x.fillStyle = '#fbf7ee'; x.beginPath(); x.arc(256, 256, 250, 0, 6.283); x.fill(); x.fillStyle = '#1a1f3a'; x.font = KF(800, 58); x.textAlign = 'center'; x.textBaseline = 'middle';
    for (let i = 1; i <= 12; i++) { const a = i * Math.PI / 6; x.fillText(i, 256 + Math.sin(a) * 195, 256 - Math.cos(a) * 195); } });
  const rim = mk(new T.CylinderGeometry(2.3, 2.3, 0.4, 32), P.gold, GOLDM); rim.rotation.x = Math.PI / 2; g.add(rim);
  const face = new T.Mesh(new T.CircleGeometry(2.15, 40), new T.MeshBasicMaterial({ map: tx })); face.position.z = 0.21; g.add(face);
  const hh = mk(new T.BoxGeometry(0.14, 1.1, 0.05), '#1a1f3a'); hh.geometry.translate(0, 0.5, 0); hh.position.z = 0.26; g.add(hh);
  const mh = mk(new T.BoxGeometry(0.09, 1.65, 0.05), P.coral); mh.geometry.translate(0, 0.75, 0); mh.position.z = 0.29; g.add(mh);
  g.userData = { hh, mh }; return g;
}
function table(len, col) {
  const g = new T.Group(); const top = mk(new T.BoxGeometry(len, 0.14, 1.5), col || '#8a5a32'); top.position.y = 0.95; g.add(top);
  for (const x of [-len / 2 + 0.3, len / 2 - 0.3]) for (const z of [-0.55, 0.55]) { const l = mk(new T.BoxGeometry(0.14, 0.9, 0.14), '#5a3a1e'); l.position.set(x, 0.45, z); g.add(l); }
  const cloth = mk(new T.BoxGeometry(len + 0.1, 0.03, 1.2), '#f3efe6'); cloth.position.y = 1.03; g.add(cloth); return g;
}
function cup(c) { const m = mk(new T.CylinderGeometry(0.1, 0.08, 0.22, 8), c || P.gold, GOLDM); m.position.y = 0.11; return m; }
function gable(w, d, h, col) { const sh = new T.Shape([new T.Vector2(-w / 2, 0), new T.Vector2(w / 2, 0), new T.Vector2(0, h)]); const g = new T.ExtrudeGeometry(sh, { depth: d, bevelEnabled: false }); g.translate(0, 0, -d / 2); return mk(g, col); }
function chapel() {
  const g = new T.Group(); const w = mk(new T.BoxGeometry(3, 2.4, 4.4), '#efe6d2'); w.position.y = 1.2; g.add(w);
  const r = gable(3.4, 4.6, 1.6, '#7a4a3a'); r.position.y = 2.4; g.add(r);
  const tw = mk(new T.BoxGeometry(1.1, 4.4, 1.1), '#efe6d2'); tw.position.set(0, 2.2, 2.3); g.add(tw);
  const sp = mk(new T.ConeGeometry(0.85, 1.6, 4), '#7a4a3a'); sp.rotation.y = Math.PI / 4; sp.position.set(0, 5.2, 2.3); g.add(sp);
  const cv = mk(new T.BoxGeometry(0.12, 0.9, 0.12), P.gold, GOLDM); cv.position.set(0, 6.35, 2.3); g.add(cv); const ch = mk(new T.BoxGeometry(0.5, 0.12, 0.12), P.gold, GOLDM); ch.position.set(0, 6.5, 2.3); g.add(ch);
  const dr = mk(new T.BoxGeometry(0.7, 1.2, 0.06), '#5a3a22'); dr.position.set(0, 0.6, 2.87); g.add(dr);
  const win = new T.Mesh(new T.CircleGeometry(0.28, 12), basic('#ffd27a')); win.position.set(0, 3.2, 2.86); g.add(win);
  return g;
}
function sailShip(nm, len, o) {
  o = o || {}; const g = new T.Group(); const hull = mk(new T.BoxGeometry(len, 0.9, 1.6), o.hull || '#2a2f44'); hull.position.y = 0.45; g.add(hull);
  const bow = mk(new T.ConeGeometry(0.8, 1.4, 4), o.hull || '#2a2f44'); bow.rotation.z = -Math.PI / 2; bow.rotation.x = Math.PI / 4; bow.scale.set(1, 1, 0.56); bow.position.set(len / 2 + 0.6, 0.48, 0); g.add(bow);
  const deck = mk(new T.BoxGeometry(len, 0.08, 1.4), '#b98a5a'); deck.position.y = 0.93; g.add(deck);
  const stripe = mk(new T.BoxGeometry(len + 0.02, 0.12, 1.62), o.stripe || '#e8e2d0'); stripe.position.y = 0.7; g.add(stripe);
  const sails = [], masts = [];
  for (let i = 0; i < nm; i++) {
    const x = -len / 2 + 0.6 + i * (len - 1.2) / Math.max(1, nm - 1), mh = o.mh || 4.2;
    const m = mk(new T.CylinderGeometry(0.06, 0.08, mh, 5), '#6a4a2a'); m.position.set(x, 0.9 + mh / 2, 0); g.add(m); masts.push(m);
    const sg = new T.Shape([new T.Vector2(0, 0), new T.Vector2(-(o.sw || 1.3), 0), new T.Vector2(-(o.sw || 1.3) * 0.9, mh * 0.78), new T.Vector2(0, mh * 0.9)]);
    const s = new T.Mesh(new T.ShapeGeometry(sg), new T.MeshStandardMaterial({ color: '#f4f0e4', side: T.DoubleSide, flatShading: true })); s.position.set(x - 0.05, 1.2, 0); g.add(s); sails.push(s);
  }
  g.userData = { sails, masts, hull }; return g;
}
function crenWall(len, h, col) {
  const g = new T.Group(); const w = mk(new T.BoxGeometry(len, h, 1), col || '#a9a395'); w.position.y = h / 2; g.add(w);
  for (let x = -len / 2 + 0.3; x < len / 2; x += 0.8) { const c = mk(new T.BoxGeometry(0.45, 0.45, 1), col || '#a9a395'); c.position.set(x, h + 0.22, 0); g.add(c); }
  return g;
}
function towerC(r, h, col) { const g = new T.Group(); const c = mk(new T.CylinderGeometry(r, r * 1.08, h, 8), col || '#9a9486'); c.position.y = h / 2; g.add(c); const cone = mk(new T.ConeGeometry(r * 1.25, r * 1.6, 8), '#4a5a8a'); cone.position.y = h + r * 0.8; g.add(cone); return g; }
function crossTex(col) { return ctex(128, 128, (x) => { x.fillStyle = col; x.fillRect(52, 14, 24, 100); x.fillRect(22, 44, 84, 24); }); }
function knight(robe, crossCol) {
  const k = chibi({ robe: robe || '#f2f0ea', hair: '#9aa3b5', sleeve: '#9aa3b5' }); const t = crossTex(crossCol || '#c8102e');
  const p = plane(0.5, 0.5, t); p.position.set(0, 0.62, 0.47); p.rotation.x = -0.2; k.add(p); return k;
}
function parisHouse(w, floors, col) {
  const g = new T.Group(); const h = floors * 1.1; const b = mk(new T.BoxGeometry(w, h, 2.2), col || '#e9dcc4'); b.position.y = h / 2; g.add(b);
  const roof = mk(new T.CylinderGeometry(w * 0.52, w * 0.72, 1.2, 4), '#5b6787'); roof.rotation.y = Math.PI / 4; roof.scale.z = 2.2 / w; roof.position.y = h + 0.6; g.add(roof);
  for (let f = 0; f < floors; f++) for (let i = 0; i < Math.floor(w / 0.9); i++) { const wi = mk(new T.BoxGeometry(0.4, 0.62, 0.05), f === 0 ? '#5a3a22' : '#3d4a6a'); wi.position.set(-w / 2 + 0.55 + i * 0.9, 0.55 + f * 1.1, 1.12); g.add(wi);
    if (f > 0) { const bal = mk(new T.BoxGeometry(0.55, 0.06, 0.25), '#2a2f44'); bal.position.set(wi.position.x, 0.22 + f * 1.1, 1.22); g.add(bal); } }
  return g;
}
function piano() {
  const g = new T.Group(), c = '#15161e', ex = { roughness: 0.3, metalness: 0.2 };
  const sh = new T.Shape(); sh.moveTo(0, 0); sh.lineTo(1.6, 0); sh.lineTo(1.6, 0.4); sh.bezierCurveTo(1.0, 0.6, 0.9, 1.6, 0.25, 1.9); sh.lineTo(0, 1.9); sh.lineTo(0, 0);
  const geo = new T.ExtrudeGeometry(sh, { depth: 0.4, bevelEnabled: false }); geo.rotateX(-Math.PI / 2); const body = mk(geo, c, ex); body.position.set(-0.8, 0.75, 0.95); g.add(body);
  const lid = mk(new T.ShapeGeometry(sh), c, ex); lid.rotation.x = -Math.PI / 2; lid.rotation.order = 'YXZ'; lid.position.set(-0.8, 1.16, 0.95); lid.rotation.z = 0; g.add(lid);
  const keys = mk(new T.BoxGeometry(1.5, 0.06, 0.3), '#f6f3ea'); keys.position.set(0, 0.95, 1.08); g.add(keys);
  for (const q of [[-0.6, 0.85], [0.6, 0.85], [-0.4, -0.7]]) { const l = mk(new T.CylinderGeometry(0.06, 0.06, 0.75, 6), c); l.position.set(q[0], 0.37, q[1]); g.add(l); }
  return g;
}
function bookM(title, sub, col) {
  const g = new T.Group(); const b = mk(new T.BoxGeometry(1.5, 2.0, 0.3), col || '#7a1f2a'); b.position.y = 1.0; g.add(b);
  const tx = ctex(300, 400, (x, w, h) => { x.fillStyle = col || '#7a1f2a'; x.fillRect(0, 0, w, h); x.strokeStyle = '#ffc94a'; x.lineWidth = 8; x.strokeRect(16, 16, w - 32, h - 32);
    x.fillStyle = '#ffe9a8'; x.textAlign = 'center'; x.textBaseline = 'middle'; const lines = title.split('|'); x.font = KF(800, 50); lines.forEach((s, i) => x.fillText(s, w / 2, 130 + i * 62)); if (sub) { x.font = KF(600, 26); x.fillText(sub, w / 2, 345); } });
  const f = plane(1.44, 1.94, tx, { transparent: false }); f.position.set(0, 1.0, 0.16); g.add(f); return g;
}
function exchange() {
  const g = new T.Group(); const st = mk(new T.BoxGeometry(7, 0.5, 3.2), '#e2dccb'); st.position.y = 0.25; g.add(st);
  for (let i = 0; i < 6; i++) { const c = mk(new T.CylinderGeometry(0.22, 0.25, 3.6, 10), '#f3efe2'); c.position.set(-2.75 + i * 1.1, 2.3, 1.1); g.add(c); }
  const back = mk(new T.BoxGeometry(6.6, 3.6, 1.4), '#d8d1bd'); back.position.set(0, 2.3, -0.2); g.add(back);
  const ent = mk(new T.BoxGeometry(7.2, 0.5, 3.0), '#e2dccb'); ent.position.set(0, 4.35, 0.1); g.add(ent);
  const ped = gable(7.2, 2.8, 1.3, '#efe9d8'); ped.position.set(0, 4.6, 0.1); g.add(ped); return g;
}
function rockM(s, c) { const m = mk(new T.DodecahedronGeometry(s, 0), c || '#4a4f5e'); m.scale.y = 0.6; return m; }
function lighthouse() { const g = new T.Group(); const t = mk(new T.CylinderGeometry(0.45, 0.7, 5, 10), '#e8e2d0'); t.position.y = 2.5; g.add(t); for (const y of [1.2, 3.2]) { const b = mk(new T.CylinderGeometry(0.62 - y * 0.04, 0.64 - y * 0.04, 0.5, 10), P.coral); b.position.y = y; g.add(b); }
  const lamp = new T.Mesh(new T.CylinderGeometry(0.4, 0.4, 0.6, 10), basic('#fff2b0')); lamp.position.y = 5.3; g.add(lamp); const cap = mk(new T.ConeGeometry(0.55, 0.6, 10), '#2a2f44'); cap.position.y = 5.9; g.add(cap);
  const beam = softSprite('rgba(255,240,170,1)', 0.8); beam.scale.set(3, 3, 1); beam.position.y = 5.3; g.add(beam); g.userData.beam = beam; return g; }
function carM(col) { const g = new T.Group(); const b = mk(new T.BoxGeometry(1.4, 0.45, 0.75), col); b.position.y = 0.38; g.add(b); const c = mk(new T.BoxGeometry(0.8, 0.38, 0.68), '#cfe3ff'); c.position.set(-0.1, 0.78, 0); g.add(c);
  for (const x of [-0.45, 0.45]) for (const z of [-0.38, 0.38]) { const w = mk(new T.CylinderGeometry(0.17, 0.17, 0.12, 10), '#1a1a22'); w.rotation.x = Math.PI / 2; w.position.set(x, 0.17, z); g.add(w); } return g; }
function deskM() { const g = new T.Group(); const top = mk(new T.BoxGeometry(2.4, 0.1, 1.2), '#c9a27a'); top.position.y = 1.0; g.add(top);
  for (const x of [-1.1, 1.1]) { const l = mk(new T.BoxGeometry(0.1, 1.0, 1.1), '#9a7a5a'); l.position.set(x, 0.5, 0); g.add(l); }
  const mon = mk(new T.BoxGeometry(1.0, 0.65, 0.06), '#22263a'); mon.position.set(-0.5, 1.5, -0.35); g.add(mon); const scr = new T.Mesh(new T.PlaneGeometry(0.9, 0.55), basic('#7fd8ff')); scr.position.set(-0.5, 1.5, -0.31); g.add(scr);
  const st = mk(new T.BoxGeometry(0.1, 0.35, 0.1), '#22263a'); st.position.set(-0.5, 1.15, -0.35); g.add(st); return g; }
function mugM() { const g = new T.Group(); const m = mk(new T.CylinderGeometry(0.16, 0.14, 0.34, 10), '#ffffff'); m.position.y = 0.17; g.add(m); const cf = new T.Mesh(new T.CircleGeometry(0.14, 10), basic('#6a3c1e')); cf.rotation.x = -Math.PI / 2; cf.position.y = 0.33; g.add(cf);
  const h = mk(new T.TorusGeometry(0.09, 0.03, 5, 10), '#ffffff'); h.position.set(0.18, 0.18, 0); g.add(h); return g; }
function meru() {
  const g = new T.Group(), W2 = '#f4f1ea', gold = { emissive: new T.Color('#6a4a00'), emissiveIntensity: 0.35, metalness: 0.4, roughness: 0.4 };
  const b1 = mk(new T.BoxGeometry(5, 0.6, 5), '#e6e0d2'); b1.position.y = 0.3; g.add(b1); const b2 = mk(new T.BoxGeometry(3.6, 2.2, 3.6), W2); b2.position.y = 1.7; g.add(b2);
  for (const s of [-1, 1]) for (const z of [-1, 1]) { const p = mk(new T.CylinderGeometry(0.16, 0.16, 2.2, 6), '#fffaf0'); p.position.set(s * 1.95, 1.7, z * 1.95); g.add(p); }
  let y = 2.8; for (let k = 0; k < 4; k++) { const r = mk(new T.ConeGeometry(2.8 - k * 0.55, 0.8, 4), k % 2 ? P.gold : '#c0392b', k % 2 ? gold : {}); r.rotation.y = Math.PI / 4; r.position.y = y + 0.4; g.add(r); y += 0.55; }
  const pr = mk(new T.ConeGeometry(0.55, 3.2, 8), P.gold, gold); pr.position.y = y + 1.5; g.add(pr);
  const ch = mk(new T.CylinderGeometry(0.28, 0.32, 4.8, 8), '#d8d2c4'); ch.position.set(0, 2.4, -2.9); g.add(ch);
  const dr = mk(new T.BoxGeometry(1.0, 1.4, 0.06), '#7a4a2a'); dr.position.set(0, 1.3, 1.82); g.add(dr); return g;
}
function signBoard(lines, w, h, bg, fg) {
  const g = new T.Group(); const tx = ctex(512, Math.round(512 * h / w), (x, W, H) => { x.fillStyle = bg || '#fbf7ee'; x.fillRect(0, 0, W, H); x.strokeStyle = '#7a4a2a'; x.lineWidth = 14; x.strokeRect(7, 7, W - 14, H - 14);
    x.fillStyle = fg || '#7a1f2a'; x.textAlign = 'center'; x.textBaseline = 'middle'; lines.forEach((l, i) => { x.font = KF(800, l[1]); x.fillText(l[0], W / 2, H * (i + 1) / (lines.length + 1)); }); });
  const p = plane(w, h, tx, { transparent: false }); p.position.y = 1.2 + h / 2; g.add(p);
  for (const s of [-1, 1]) { const l = mk(new T.BoxGeometry(0.1, 1.3, 0.1), '#7a4a2a'); l.position.set(s * w * 0.4, 0.65, -0.03); g.add(l); } return g;
}
function cinema() {
  const g = new T.Group(); const b = mk(new T.BoxGeometry(6, 4.4, 3), '#3d2a4f'); b.position.y = 2.2; g.add(b);
  const tx = ctex(768, 200, (x, w, h) => { x.fillStyle = '#fff6d8'; x.fillRect(0, 0, w, h); x.fillStyle = '#b0102a'; x.font = KF(800, 74); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('FRIDAY THE 13TH', w / 2, 82); x.fillStyle = '#1a1f3a'; x.font = KF(700, 40); x.fillText('NOW SHOWING · 1980', w / 2, 158); });
  const mq = plane(5.2, 1.36, tx, { transparent: false }); mq.position.set(0, 3.0, 1.62); g.add(mq);
  const bulbs = []; for (let i = 0; i < 14; i++) { const bl = new T.Mesh(new T.SphereGeometry(0.08, 6, 4), basic('#ffe08a')); bl.position.set(-2.6 + i * 0.4, 3.8, 1.64); g.add(bl); bulbs.push(bl); const bl2 = bl.clone(); bl2.material = basic('#ffe08a'); bl2.position.y = 2.2; g.add(bl2); bulbs.push(bl2); }
  const dr = mk(new T.BoxGeometry(1.6, 1.6, 0.06), '#1a1222'); dr.position.set(0, 0.8, 1.52); g.add(dr); g.userData.bulbs = bulbs; return g;
}
function slabTex(txt, red) { return ctex(256, 96, (x, w, h) => { x.fillStyle = red ? '#ff5d73' : '#ffffff'; x.font = KF(800, 70); x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, w / 2, h / 2 + 4); }); }
