/* Part B: models (chibi people from mog/, animals, props) */
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

/* ---------- new for ภพภูมิสัตว์ ---------- */
const BALD = { robe: ROBE, sash: ROBE2 };
function monk(s) { const m = chibi(BALD); m.scale.setScalar(s || 1); return m; }
function eyes2(head, r, x, y, z, c) { for (const sx of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(r, 6, 5), basic(c || '#14101a')); e.position.set(sx * x, y, z); head.add(e); } }
/* generic quadruped facing +z; o = {W,H,L,leg,c,c2,head,horns,antlers,ears,tail,snout,mane,patch} */
function quad(o) {
  const g = new T.Group(), c = o.c, leg = o.leg || 0.5, W = o.W || 0.6, H = o.H || 0.55, Lz = o.L || 1.2, hs = o.head || 0.42;
  const body = mk(new T.BoxGeometry(W, H, Lz), c); body.position.y = leg + H / 2; g.add(body);
  if (o.patch) { const p = mk(new T.BoxGeometry(W + 0.02, H * 0.55, Lz * 0.35), o.patch); p.position.set(0, leg + H * 0.62, -Lz * 0.12); g.add(p); }
  const head = new T.Group(); head.position.set(0, leg + H * (o.headUp || 1.0), Lz / 2 + hs * 0.35); g.add(head);
  const hm = mk(new T.BoxGeometry(hs * 0.9, hs * 0.85, hs * 1.0), o.hc || c); head.add(hm);
  if (o.snout) { const sn = mk(new T.BoxGeometry(hs * 0.62, hs * 0.5, hs * 0.5), o.snout); sn.position.set(0, -hs * 0.14, hs * 0.66); head.add(sn); }
  eyes2(head, hs * 0.08, hs * 0.3, hs * 0.14, hs * 0.5);
  if (o.horns) for (const sx of [-1, 1]) { const h = mk(new T.ConeGeometry(hs * 0.09, hs * 0.55, 5), o.horns); h.position.set(sx * hs * 0.32, hs * 0.6, -hs * 0.05); h.rotation.z = -sx * 0.5; head.add(h); }
  if (o.antlers) for (const sx of [-1, 1]) { const a = new T.Group(); a.position.set(sx * hs * 0.25, hs * 0.42, -hs * 0.1); a.rotation.z = -sx * 0.35; const st = mk(new T.CylinderGeometry(0.03, 0.04, hs * 1.1, 4), o.antlers); st.position.y = hs * 0.55; a.add(st); for (let k = 0; k < 2; k++) { const br = mk(new T.CylinderGeometry(0.025, 0.03, hs * 0.5, 4), o.antlers); br.position.set(-sx * 0.1, hs * (0.55 + k * 0.35), 0.06); br.rotation.z = sx * 0.9; a.add(br); } head.add(a); }
  if (o.ears) for (const sx of [-1, 1]) { const e = mk(new T.ConeGeometry(hs * 0.16, hs * 0.42, 4), o.ears); e.position.set(sx * hs * 0.3, hs * 0.55, -hs * 0.15); e.rotation.z = -sx * (o.earTilt || 0.25); head.add(e); }
  if (o.mane) { const m = mk(new T.BoxGeometry(0.08, H * 0.6, Lz * 0.5), o.mane); m.position.set(0, leg + H * 1.05, Lz * 0.25); g.add(m); }
  const legs = [];
  for (const q of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) { const p = new T.Group(); p.position.set(q[0] * W * 0.32, leg, q[1] * Lz * 0.36); const l = mk(new T.CylinderGeometry(0.07 * (o.legW || 1), 0.06 * (o.legW || 1), leg, 5), o.legC || c); l.position.y = -leg / 2; p.add(l); g.add(p); legs.push(p); }
  let tail = null; if (o.tail) { tail = new T.Group(); tail.position.set(0, leg + H * 0.8, -Lz / 2); const tl = mk(new T.CylinderGeometry(0.03, 0.05, o.tail, 4), o.tailC || c); tl.position.y = o.tail / 2; tail.add(tl); tail.rotation.x = o.tailUp ? -0.6 : -2.6; g.add(tail); }
  g.userData = { head, legs, tail, body }; g.scale.setScalar(o.s || 1); return g;
}
function trot(a, t, k) { k = k == null ? 1 : k; a.userData.legs.forEach((l, i) => (l.rotation.x = Math.sin(t * 8 + (i % 3 ? Math.PI : 0)) * 0.5 * k)); if (a.userData.tail) a.userData.tail.rotation.z = Math.sin(t * 6) * 0.3; }
function graze(a, t) { a.userData.head.rotation.x = 0.55 + Math.sin(t * 2) * 0.12; }
const ANI = {
  cow: () => quad({ c: '#efe8da', patch: '#3a2a22', horns: '#f6f0e0', snout: '#e8b0a8', tail: 0.6, ears: '#efe8da', earTilt: 1.2, W: 0.75, H: 0.65, L: 1.45, leg: 0.55, head: 0.5 }),
  goat: () => quad({ c: '#f2f0ea', horns: '#8a7a60', tail: 0.2, tailUp: true, ears: '#f2f0ea', earTilt: 1.1, W: 0.45, H: 0.42, L: 0.9, leg: 0.45, head: 0.36, headUp: 1.35 }),
  deer: () => quad({ c: '#b47a45', antlers: '#e8d8b8', tail: 0.18, tailUp: true, ears: '#b47a45', W: 0.42, H: 0.45, L: 1.0, leg: 0.7, head: 0.36, headUp: 1.6 }),
  horse: () => quad({ c: '#8a5a3a', mane: '#2a1a12', tail: 0.7, tailC: '#2a1a12', ears: '#8a5a3a', W: 0.55, H: 0.62, L: 1.5, leg: 0.8, head: 0.45, headUp: 1.5 }),
  pig: () => quad({ c: '#f2a8ae', snout: '#e88a92', ears: '#f2a8ae', earTilt: 0.6, tail: 0.18, tailUp: true, W: 0.62, H: 0.55, L: 1.0, leg: 0.25, head: 0.48, headUp: 0.7 }),
  dog: () => quad({ c: '#c48a50', snout: '#e8c8a0', ears: '#7a4a28', tail: 0.42, tailUp: true, W: 0.38, H: 0.38, L: 0.82, leg: 0.4, head: 0.4, headUp: 1.4 }),
  jackal: () => quad({ c: '#b8a070', snout: '#d8c8a0', ears: '#b8a070', earTilt: 0.05, tail: 0.5, W: 0.34, H: 0.34, L: 0.85, leg: 0.42, head: 0.36, headUp: 1.35 }),
  ox: () => quad({ c: '#cfc6b8', horns: '#f3efe6', snout: '#e0d6c8', tail: 0.5, ears: '#cfc6b8', earTilt: 1.2, W: 0.7, H: 0.65, L: 1.4, leg: 0.55, head: 0.5 }),
};
function chicken(c) {
  const g = new T.Group(); const b = mk(new T.SphereGeometry(0.28, 8, 6), c || '#f6f2ea'); b.scale.set(0.9, 0.85, 1.15); b.position.y = 0.42; g.add(b);
  const h = new T.Group(); h.position.set(0, 0.72, 0.2); g.add(h); h.add(mk(new T.SphereGeometry(0.15, 8, 6), c || '#f6f2ea'));
  const cm = mk(new T.BoxGeometry(0.05, 0.14, 0.2), '#e0302a'); cm.position.set(0, 0.15, 0); h.add(cm);
  const bk = mk(new T.ConeGeometry(0.05, 0.14, 4), '#f0b030'); bk.rotation.x = Math.PI / 2; bk.position.set(0, 0, 0.17); h.add(bk); eyes2(h, 0.025, 0.08, 0.04, 0.12);
  const tl = mk(new T.ConeGeometry(0.14, 0.3, 4), '#3a3a3a'); tl.rotation.x = -0.9; tl.position.set(0, 0.58, -0.28); g.add(tl);
  for (const sx of [-1, 1]) { const l = mk(new T.CylinderGeometry(0.025, 0.025, 0.2, 4), '#f0b030'); l.position.set(sx * 0.1, 0.1, 0); g.add(l); }
  g.userData = { head: h }; return g;
}
function elephant() {
  const e = quad({ c: '#8e949e', W: 1.5, H: 1.35, L: 2.4, leg: 1.1, legW: 2.6, head: 1.15, headUp: 1.0, tail: 0.7 });
  const h = e.userData.head;
  for (const sx of [-1, 1]) { const ear = mk(new T.BoxGeometry(0.08, 0.95, 0.8), '#7f858f'); ear.position.set(sx * 0.62, 0.1, -0.1); ear.rotation.y = sx * 0.5; h.add(ear); e.userData['ear' + sx] = ear;
    const tu = mk(new T.ConeGeometry(0.07, 0.75, 5), '#f6f0e0'); tu.rotation.x = 1.9; tu.position.set(sx * 0.25, -0.42, 0.75); h.add(tu); }
  const tr = []; let parent = h; for (let i = 0; i < 6; i++) { const p = new T.Group(); p.position.set(0, i === 0 ? -0.25 : -0.26, i === 0 ? 0.55 : 0); const seg = mk(new T.CylinderGeometry(0.16 - i * 0.017, 0.17 - i * 0.017, 0.28, 6), '#8e949e'); seg.position.y = -0.13; p.add(seg); parent.add(p); tr.push(p); parent = p; }
  e.userData.trunk = tr; return e;
}
function frog(s) {
  const g = new T.Group(), c = '#7fe060';
  const b = new T.Mesh(new T.SphereGeometry(0.42, 18, 12), new T.MeshStandardMaterial({ color: c, roughness: 0.5, emissive: new T.Color('#2a6a10'), emissiveIntensity: 0.35 })); b.scale.set(1, 0.62, 1.1); b.position.y = 0.26; g.add(b);
  const bl = mk(new T.SphereGeometry(0.36, 10, 6), '#d8f0b0'); bl.scale.set(0.9, 0.4, 0.9); bl.position.set(0, 0.16, 0.12); g.add(bl);
  for (const sx of [-1, 1]) { const ey = mk(new T.SphereGeometry(0.17, 8, 6), c); ey.position.set(sx * 0.22, 0.52, 0.24); g.add(ey); const wh = new T.Mesh(new T.SphereGeometry(0.11, 8, 6), basic('#ffffff')); wh.position.set(sx * 0.22, 0.56, 0.34); g.add(wh); const pu = new T.Mesh(new T.SphereGeometry(0.06, 6, 5), basic('#14101a')); pu.position.set(sx * 0.22, 0.57, 0.42); g.add(pu);
    const lg = mk(new T.SphereGeometry(0.17, 6, 5), c); lg.scale.set(0.7, 0.5, 1.4); lg.position.set(sx * 0.36, 0.1, -0.22); g.add(lg);
    const fl = mk(new T.SphereGeometry(0.09, 6, 5), c); fl.scale.set(1, 0.5, 1.4); fl.position.set(sx * 0.24, 0.06, 0.38); g.add(fl); }
  const mo = new T.Mesh(new T.BoxGeometry(0.34, 0.02, 0.02), basic('#2a4a1a')); mo.position.set(0, 0.34, 0.45); g.add(mo);
  g.scale.setScalar(s || 1); return g;
}
function turtle(s) {
  const g = new T.Group(); const sh = mk(new T.SphereGeometry(0.75, 9, 6, 0, 6.283, 0, Math.PI / 2), '#6a8a4a'); sh.scale.y = 0.6; sh.position.y = 0.15; g.add(sh);
  const rim = mk(new T.CylinderGeometry(0.78, 0.78, 0.12, 9), '#4f6a38'); rim.position.y = 0.15; g.add(rim);
  const hd = new T.Group(); hd.position.set(0, 0.2, 0.85); g.add(hd); hd.add(mk(new T.SphereGeometry(0.22, 8, 6), '#9ab070'));
  for (const sx of [-1, 1]) { const ey = new T.Mesh(new T.BoxGeometry(0.09, 0.02, 0.02), basic('#1a2a10')); ey.position.set(sx * 0.1, 0.06, 0.19); hd.add(ey); }
  const fl = []; for (const q of [[-1, 1], [1, 1], [-1, -1], [1, -1]]) { const f = mk(new T.BoxGeometry(0.5, 0.06, 0.22), '#9ab070'); f.position.set(q[0] * 0.7, 0.12, q[1] * 0.42); g.add(f); fl.push(f); }
  g.userData = { head: hd, fl }; g.scale.setScalar(s || 1); return g;
}
function fish(s, c) {
  const g = new T.Group(); const b = mk(new T.SphereGeometry(0.4, 8, 6), c || '#f0a040'); b.scale.set(0.5, 0.75, 1.2); g.add(b);
  const tf = mk(new T.ConeGeometry(0.3, 0.42, 3), c || '#f0a040'); tf.rotation.x = -Math.PI / 2; tf.position.z = -0.6; tf.scale.x = 0.25; g.add(tf); g.userData.tail = tf;
  const df = mk(new T.ConeGeometry(0.16, 0.3, 3), c || '#f0a040'); df.position.set(0, 0.3, -0.05); df.scale.x = 0.2; g.add(df);
  eyes2(g, 0.045, 0.16, 0.08, 0.32); g.scale.setScalar(s || 1); return g;
}
function croc() {
  const g = new T.Group(), c = '#4f7040'; const b = mk(new T.BoxGeometry(0.7, 0.32, 2.2), c); b.position.y = 0.2; g.add(b);
  const sn = mk(new T.BoxGeometry(0.42, 0.22, 0.9), c); sn.position.set(0, 0.2, 1.5); g.add(sn); const tl = mk(new T.ConeGeometry(0.3, 1.6, 4), c); tl.rotation.x = -Math.PI / 2; tl.position.set(0, 0.2, -1.9); g.add(tl);
  for (let i = 0; i < 5; i++) { const sc = mk(new T.ConeGeometry(0.07, 0.14, 4), '#3a5530'); sc.position.set(0, 0.42, -0.8 + i * 0.4); g.add(sc); }
  eyes2(g, 0.05, 0.14, 0.42, 1.15); return g;
}
function worm(n, c) { const g = new T.Group(); g.userData.seg = []; for (let i = 0; i < (n || 7); i++) { const s = mk(new T.SphereGeometry(0.08, 6, 5), c || '#d88a8a'); g.add(s); g.userData.seg.push(s); } return g; }
function wiggle(w, t, ph) { w.userData.seg.forEach((s, i) => s.position.set(i * 0.11, 0.07 + Math.max(0, Math.sin(t * 5 + ph - i * 0.7)) * 0.08, Math.sin(t * 3 + ph - i * 0.5) * 0.06)); }
function moth(c) { const g = new T.Group(); const b = mk(new T.CylinderGeometry(0.03, 0.03, 0.22, 4), '#3a2a20'); b.rotation.x = Math.PI / 2; g.add(b); const ws = []; for (const sx of [-1, 1]) { const w = new T.Mesh(new T.CircleGeometry(0.16, 3), M(c || '#d8c8a0', { side: T.DoubleSide })); w.position.x = sx * 0.12; w.rotation.x = -Math.PI / 2; g.add(w); ws.push(w); } g.userData.w = ws; return g; }
function nagaModel(n, r0, c, c2) {
  const g = new T.Group(), segs = [];
  for (let i = 0; i < n; i++) { const k = 1 - i / n; const s = mk(new T.SphereGeometry(r0 * (0.35 + 0.65 * k), 8, 6), i % 2 ? c : c2 || c, { emissive: new T.Color(c), emissiveIntensity: 0.12 }); g.add(s); segs.push(s); }
  const hd = new T.Group(); g.add(hd);
  const hm = mk(new T.BoxGeometry(r0 * 1.5, r0 * 1.0, r0 * 2.0), c); hd.add(hm);
  const jaw = mk(new T.BoxGeometry(r0 * 1.2, r0 * 0.35, r0 * 1.4), c2 || c); jaw.position.set(0, -r0 * 0.55, r0 * 0.3); hd.add(jaw);
  for (let k = 0; k < 3; k++) { const cr = mk(new T.ConeGeometry(r0 * 0.28, r0 * 1.4, 4), P.gold, { emissive: new T.Color('#a07000'), emissiveIntensity: 0.4 }); cr.position.set((k - 1) * r0 * 0.5, r0 * 0.9, -r0 * 0.3 - Math.abs(k - 1) * r0 * 0.2); cr.rotation.x = -0.35; hd.add(cr); }
  for (const sx of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(r0 * 0.16, 6, 5), basic('#ffe46a')); e.position.set(sx * r0 * 0.5, r0 * 0.25, r0 * 0.95); hd.add(e); }
  g.userData = { segs, hd, r0 }; return g;
}
/* place naga along path fn(u in 0..1) -> [x,y,z] (local) */
function setNaga(ng, fn) {
  const sg = ng.userData.segs, n = sg.length; let p0 = null;
  for (let i = 0; i < n; i++) { const p = fn(i / (n - 1)); sg[i].position.set(p[0], p[1], p[2]); }
  const a = fn(0), b = fn(0.02); ng.userData.hd.position.set(a[0], a[1] + ng.userData.r0 * 0.25, a[2]);
  ng.userData.hd.rotation.y = Math.atan2(a[0] - b[0], a[2] - b[2]); ng.userData.hd.rotation.x = -Math.atan2(a[1] - b[1], Math.hypot(a[0] - b[0], a[2] - b[2])) * 0.6; void p0;
}
function garuda() {
  const g = new T.Group(), red = '#d8463a', gold = P.gold, gm = { emissive: new T.Color('#7a4a00'), emissiveIntensity: 0.3 };
  const body = mk(new T.CylinderGeometry(0.45, 0.65, 1.7, 8), red); body.rotation.x = Math.PI / 2; body.position.y = 0; g.add(body);
  const chest = mk(new T.SphereGeometry(0.55, 8, 6), gold, gm); chest.position.set(0, 0.05, 0.6); g.add(chest);
  const hd = new T.Group(); hd.position.set(0, 0.45, 1.15); g.add(hd); hd.add(mk(new T.SphereGeometry(0.38, 8, 6), red));
  const bk = mk(new T.ConeGeometry(0.16, 0.6, 5), '#f0c040', gm); bk.rotation.x = 1.9; bk.position.set(0, -0.08, 0.42); hd.add(bk);
  for (const sx of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.07, 6, 5), basic('#fff6a0')); e.position.set(sx * 0.17, 0.1, 0.3); hd.add(e); }
  const crest = mk(new T.ConeGeometry(0.12, 0.6, 4), gold, gm); crest.position.set(0, 0.42, -0.1); crest.rotation.x = -0.5; hd.add(crest);
  const wings = [];
  for (const sx of [-1, 1]) { const p = new T.Group(); p.position.set(sx * 0.4, 0.2, 0.1); g.add(p); for (let k = 0; k < 3; k++) { const f = mk(new T.BoxGeometry(1.5, 0.07, 0.55 - k * 0.1), k % 2 ? gold : red, k % 2 ? gm : {}); f.position.set(sx * (0.75 + k * 0.55), 0, -k * 0.18); p.add(f); } wings.push(p); }
  const tail = mk(new T.ConeGeometry(0.5, 1.2, 4), gold, gm); tail.rotation.x = -Math.PI / 2; tail.scale.y = 1; tail.scale.x = 1.4; tail.position.set(0, 0, -1.3); g.add(tail);
  const claws = new T.Group(); claws.position.set(0, -0.5, 0.2); g.add(claws); for (const sx of [-1, 1]) { const c = mk(new T.CylinderGeometry(0.06, 0.06, 0.5, 4), '#f0c040'); c.position.set(sx * 0.25, -0.2, 0); claws.add(c); }
  g.userData = { wings, hd, claws }; return g;
}
function flap(gd, t, sp) { gd.userData.wings.forEach((w, i) => (w.rotation.z = (i ? -1 : 1) * Math.sin(t * (sp || 6)) * 0.55)); }
function yoke() {
  const g = new T.Group(), c = '#8a5a32';
  const beam = mk(new T.BoxGeometry(3.4, 0.26, 0.42), c); g.add(beam);
  const ring = mk(new T.TorusGeometry(0.42, 0.13, 6, 14), '#6a4224'); ring.rotation.x = Math.PI / 2; g.add(ring);
  const hole = new T.Mesh(new T.CircleGeometry(0.34, 14), basic('#0a1a30')); hole.rotation.x = -Math.PI / 2; hole.position.y = 0.06; g.add(hole);
  for (const x of [-1.4, 1.4]) { const pg = mk(new T.CylinderGeometry(0.05, 0.05, 0.6, 5), '#6a4224'); pg.position.set(x, -0.2, 0); g.add(pg); }
  return g;
}
function pit(r, wall, fill, o) {
  o = o || {}; const g = new T.Group();
  const rim = mk(new T.CylinderGeometry(r + 0.5, r + 0.7, 0.5, 14, 1, true), wall); rim.position.y = 0.0; rim.material.side = T.DoubleSide; g.add(rim);
  const top = mk(new T.RingGeometry(r, r + 0.55, 18), wall); top.rotation.x = -Math.PI / 2; top.position.y = 0.25; top.material.side = T.DoubleSide; g.add(top);
  const fm = mk(new T.CircleGeometry(r, 18), fill, o.emi ? { emissive: new T.Color(o.emi), emissiveIntensity: 0.9 } : {}); fm.rotation.x = -Math.PI / 2; fm.position.y = 0.05; g.add(fm);
  return g;
}
function finger() {
  const g = new T.Group(), skin = '#e8b890';
  const f = mk(new T.CylinderGeometry(0.75, 0.82, 4.2, 10), skin); f.rotation.z = Math.PI / 2; f.position.x = -2.1; g.add(f);
  const tip = mk(new T.SphereGeometry(0.75, 10, 8), skin); g.add(tip);
  const nail = mk(new T.BoxGeometry(1.1, 0.12, 1.05), '#f6d6d0', { roughness: 0.3 }); nail.position.set(-0.3, 0.74, 0); nail.rotation.z = 0.08; g.add(nail);
  const dust = new T.Group(); dust.position.set(0.05, 0.86, 0); g.add(dust);
  for (let i = 0; i < 7; i++) { const d = mk(new T.IcosahedronGeometry(0.07 + (i % 3) * 0.02, 0), '#b89a6a'); d.position.set(Math.cos(i * 2.3) * 0.12, (i % 2) * 0.04, Math.sin(i * 2.3) * 0.12); dust.add(d); }
  g.userData.dust = dust; return g;
}
function bigTree(s, c) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.28, 0.4, 2.4, 6), '#6a4630'); tr.position.y = 1.2; g.add(tr); [[0, 3.1, 0, 1.9], [1.2, 2.7, 0.3, 1.3], [-1.2, 2.8, -0.2, 1.4], [0.3, 2.6, 1.1, 1.2], [-0.4, 2.7, -1.1, 1.2]].forEach((q) => { const f = mk(new T.IcosahedronGeometry(q[3], 0), c || '#2f8a52'); f.position.set(q[0], q[1], q[2]); g.add(f); }); g.scale.setScalar(s || 1); return g; }
function thinTree(s) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.1, 0.18, 2.6, 5), '#5a4a3a'); tr.position.y = 1.3; tr.rotation.z = 0.12; g.add(tr); for (let i = 0; i < 4; i++) { const br = mk(new T.CylinderGeometry(0.04, 0.06, 1.1, 4), '#5a4a3a'); br.position.set(Math.cos(i * 1.7) * 0.4, 2.2 + i * 0.18, Math.sin(i * 1.7) * 0.4); br.rotation.set(Math.sin(i) * 0.8, 0, Math.cos(i * 1.7) * 0.9); g.add(br); const lf = mk(new T.IcosahedronGeometry(0.22, 0), '#8a9a5a'); lf.position.set(Math.cos(i * 1.7) * 0.75, 2.6 + i * 0.2, Math.sin(i * 1.7) * 0.75); g.add(lf); } g.scale.setScalar(s || 1); return g; }
function rock(s, c) { const r = mk(new T.DodecahedronGeometry(s || 0.5, 0), c || '#7a6a5a'); r.scale.y = 0.6; return r; }
function seniyaModel() { const s = chibi({ robe: '#d9a27a', skin: '#d9a27a', hair: '#3a2a20', bun: true, beard: '#4a3a2a', thin: true }); const lc = mk(new T.CylinderGeometry(0.42, 0.44, 0.22, 10), '#8a6a4a'); lc.position.y = 0.32; s.add(lc);
  const sh = new T.Group(); sh.position.set(0, 0.15, -0.1); for (const sx of [-1, 1]) { const l = mk(new T.CylinderGeometry(0.09, 0.08, 0.62, 6), '#d9a27a'); l.position.set(sx * 0.17, -0.31, 0); sh.add(l); } sh.rotation.x = -(Math.PI - 1.0) + Math.PI; s.add(sh); sh.visible = false; s.userData.shins = sh; return s; }
function punnaModel() { const p = chibi({ robe: '#e8e0cc', hair: '#3a2a20', bun: true, beard: '#4a3a2a', thin: true }); for (const sx of [-1, 1]) { const h = mk(new T.ConeGeometry(0.06, 0.32, 5), '#f3efe6'); h.position.set(sx * 0.22, 0.42, 0); h.rotation.z = -sx * 0.6; p.userData.head.add(h); } return p; }
function cowherd() { const c = chibi({ robe: '#5a7aa8', hair: '#2a2228', s: 0.95 }); const hat = mk(new T.ConeGeometry(0.62, 0.32, 10), '#d8b878'); hat.position.y = 0.42; c.userData.head.add(hat); const st = mk(new T.CylinderGeometry(0.04, 0.04, 1.7, 5), '#7a5236'); st.position.set(0, -0.6, 0); c.userData.arms.R.add(st); c.userData.staff = st; return c; }
function deva(accent) { const d = chibi({ robe: '#fff3d0', skin: '#f2c89a', crown: true, sash: accent || '#5fd16a', glow: '#ffd27a' }); const gl = softSprite('rgba(255,220,120,1)', 0.7); gl.scale.setScalar(3.2); gl.position.y = 1.2; d.add(gl); d.userData.glow = gl; return d; }
function crawlPose(ch, t, k) { ch.rotation.order = 'YXZ'; const u = ch.userData; if (u.shins) { u.shins.visible = k > 0.5; u.shins.rotation.x = Math.PI / 2 - 1.0; } ch.rotation.x = 1.0 * k; u.arms.L.rotation.set(-1.0 * k + Math.sin(t * 6) * 0.3 * k, 0, -0.14); u.arms.R.rotation.set(-1.0 * k - Math.sin(t * 6) * 0.3 * k, 0, 0.14); u.head.rotation.x = -0.9 * k; }
