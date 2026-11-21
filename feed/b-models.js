/* Part B: models (chibi people, room, phone, animals, chain, lab, heaven) — base helpers copied from mog/ */
const M = (c, x) => FK.mat(T, c, x);
const mk = (geo, c, x) => new T.Mesh(geo, M(c, x));
const basic = (c, x) => new T.MeshBasicMaterial(Object.assign({ color: c }, x || {}));
const ROBE = '#e8892a', ROBE2 = '#c76a1a', SKIN = '#e2ae86', PHUM = '#5b6bd6';
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

/* ---------- new models for this clip ---------- */
function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); draw(g, w, h); const tx = new T.CanvasTexture(c); tx.userData = { c, g }; return tx; }
const CARDC = [['#ff7a8a', '#ffb36b'], ['#6b8bff', '#7fe0ff'], ['#8f7bff', '#ff8fd0'], ['#2ee6c5', '#9fe870'], ['#ffc94a', '#ff8a5a'], ['#5a6b9a', '#9aa8c8']];
function drawCard(g, x, y, w, h, i, mode) {
  i = ((Math.floor(i) % CARDC.length) + CARDC.length) % CARDC.length; const c = CARDC[i]; g.save(); rr2(g, x, y, w, h, w * 0.08); g.clip();
  const gr = g.createLinearGradient(x, y, x, y + h); gr.addColorStop(0, mode === 'flop' ? '#55596a' : c[0]); gr.addColorStop(1, mode === 'flop' ? '#3a3d4a' : c[1]); g.fillStyle = gr; g.fillRect(x, y, w, h);
  const cx = x + w / 2, cy = y + h * 0.42, r = w * 0.22; g.fillStyle = 'rgba(255,255,255,.85)';
  const k = i % 4; g.beginPath();
  if (k === 0) g.arc(cx, cy, r, 0, 6.283); else if (k === 1) { g.moveTo(cx - r, cy + r); g.lineTo(cx, cy - r); g.lineTo(cx + r, cy + r); } else if (k === 2) g.rect(cx - r, cy - r, r * 2, r * 2); else { for (let j = 0; j < 10; j++) { const a = j * Math.PI / 5 - Math.PI / 2, rr = j % 2 ? r * 0.45 : r; g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } }
  g.fill(); g.fillStyle = 'rgba(255,255,255,.55)'; g.fillRect(x + w * 0.12, y + h * 0.74, w * 0.6, h * 0.035); g.fillRect(x + w * 0.12, y + h * 0.81, w * 0.4, h * 0.035);
  g.fillStyle = '#ff5d73'; g.beginPath(); const hx = x + w * 0.86, hy = y + h * 0.6, hs = w * 0.05; g.arc(hx - hs * 0.5, hy, hs * 0.55, 0, 6.283); g.arc(hx + hs * 0.5, hy, hs * 0.55, 0, 6.283); g.fill(); g.beginPath(); g.moveTo(hx - hs, hy + hs * 0.1); g.lineTo(hx + hs, hy + hs * 0.1); g.lineTo(hx, hy + hs * 1.2); g.fill();
  if (mode === 'hit') { g.strokeStyle = '#ffc94a'; g.lineWidth = w * 0.06; rr2(g, x, y, w, h, w * 0.08); g.stroke(); }
  g.restore();
}
function rr2(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
const CARD_TEX = CARDC.map((_, i) => canvasTex(128, 224, (g, w, h) => drawCard(g, 0, 0, w, h, i)));
const CARD_HIT = canvasTex(128, 224, (g, w, h) => drawCard(g, 0, 0, w, h, 4, 'hit'));
const CARD_FLOP = canvasTex(128, 224, (g, w, h) => drawCard(g, 0, 0, w, h, 5, 'flop'));
function card(i, s) { const m = new T.Mesh(new T.PlaneGeometry(0.64 * (s || 1), 1.12 * (s || 1)), new T.MeshBasicMaterial({ map: CARD_TEX[i % CARD_TEX.length], side: T.DoubleSide, transparent: true })); return m; }

function phone(s, tex) {
  const g = new T.Group(); const body = mk(new T.BoxGeometry(0.62, 1.2, 0.07), '#20243a', { metalness: 0.3 }); g.add(body);
  const scr = new T.Mesh(new T.PlaneGeometry(0.54, 1.08), new T.MeshBasicMaterial({ map: tex || CARD_TEX[1] })); scr.position.z = 0.04; g.add(scr);
  g.userData.scr = scr; g.scale.setScalar(s || 1); return g;
}
function glow(c, sz, a) { const sp = softSprite(c, a); sp.scale.setScalar(sz); return sp; }

/* animals — all face +z, feet on y = 0 */
function legs(g, col, pts, h, r) { const L = []; for (const q of pts) { const p = new T.Group(); p.position.set(q[0], h, q[1]); const l = mk(new T.CylinderGeometry(r, r * 0.9, h, 5), col); l.position.y = -h / 2; p.add(l); g.add(p); L.push(p); } g.userData.legs = L; }
function quad(o) {
  const g = new T.Group(), c = o.c, len = o.len || 1, hh = o.h || 0.42, lh = o.lh || 0.38;
  const body = mk(new T.BoxGeometry(o.w || 0.46, hh, len), c); body.position.y = lh + hh / 2; g.add(body);
  const head = new T.Group(); head.position.set(0, lh + hh * 0.9, len / 2 + 0.12); g.add(head);
  head.add(mk(new T.BoxGeometry(0.42, 0.38, 0.4), c));
  const sn = mk(new T.BoxGeometry(0.24, 0.2, o.snout || 0.28), o.c2 || c); sn.position.set(0, -0.06, 0.3); head.add(sn);
  const nose = mk(new T.BoxGeometry(0.1, 0.08, 0.05), '#1a1420'); nose.position.set(0, 0.0, 0.3 + (o.snout || 0.28) / 2); head.add(nose);
  for (const s of [-1, 1]) {
    const e = new T.Mesh(new T.SphereGeometry(0.045, 6, 5), basic('#1a1420')); e.position.set(s * 0.12, 0.07, 0.2); head.add(e);
    const ear = o.pointy ? mk(new T.ConeGeometry(0.09, 0.26, 4), c) : mk(new T.BoxGeometry(0.1, 0.22, 0.06), o.c2 || c);
    ear.position.set(s * 0.15, o.pointy ? 0.3 : 0.12, -0.05); if (!o.pointy) ear.rotation.z = s * 0.4; head.add(ear);
  }
  const tail = new T.Group(); tail.position.set(0, lh + hh * 0.8, -len / 2); g.add(tail);
  const tl = mk(o.bushy ? new T.ConeGeometry(0.13, 0.6, 6) : new T.CylinderGeometry(0.04, 0.05, 0.5, 5), o.c2 || c); tl.rotation.x = -2.2; tl.position.set(0, 0.12, -0.2); tail.add(tl);
  legs(g, c, [[-0.15, len / 2 - 0.12], [0.15, len / 2 - 0.12], [-0.15, -len / 2 + 0.12], [0.15, -len / 2 + 0.12]], lh, 0.06);
  g.userData.head = head; g.userData.tail = tail; g.userData.body = body; g.scale.setScalar(o.s || 1); return g;
}
function croc() {
  const g = new T.Group(), c = '#4f8a3e';
  const body = mk(new T.BoxGeometry(0.62, 0.3, 1.5), c); body.position.y = 0.3; g.add(body);
  const head = new T.Group(); head.position.set(0, 0.3, 0.75); g.add(head);
  const jaw = mk(new T.BoxGeometry(0.42, 0.16, 0.8), '#5f9a4a'); jaw.position.z = 0.4; head.add(jaw);
  const top = mk(new T.BoxGeometry(0.44, 0.14, 0.8), c); top.position.set(0, 0.14, 0.4); head.add(top); g.userData.jaw = top;
  for (const s of [-1, 1]) { const e = mk(new T.SphereGeometry(0.07, 6, 5), '#e8e070'); e.position.set(s * 0.14, 0.27, 0.12); head.add(e); }
  const tail = mk(new T.ConeGeometry(0.28, 1.4, 4), c); tail.rotation.x = -Math.PI / 2; tail.position.set(0, 0.26, -1.4); g.add(tail); g.userData.tail = tail;
  for (let i = 0; i < 5; i++) { const r = mk(new T.ConeGeometry(0.06, 0.14, 4), '#3a6a2e'); r.position.set(0, 0.5, -0.6 + i * 0.3); g.add(r); }
  legs(g, c, [[-0.36, 0.5], [0.36, 0.5], [-0.36, -0.5], [0.36, -0.5]], 0.18, 0.07);
  g.userData.head = head; return g;
}
function snake() {
  const g = new T.Group(), segs = []; for (let i = 0; i < 9; i++) { const r = 0.16 - i * 0.012; const sp = mk(new T.SphereGeometry(r, 8, 6), i % 2 ? '#3f9a5a' : '#5ab86a'); sp.position.set(0, r, -i * 0.24); g.add(sp); segs.push(sp); }
  const head = mk(new T.SphereGeometry(0.2, 8, 6), '#4fae60'); head.scale.set(1, 0.7, 1.3); head.position.set(0, 0.18, 0.22); g.add(head);
  for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.04, 6, 5), basic('#1a1420')); e.position.set(s * 0.1, 0.28, 0.34); g.add(e); }
  const tg = new T.Mesh(new T.BoxGeometry(0.03, 0.01, 0.2), basic('#ff3a5a')); tg.position.set(0, 0.15, 0.5); g.add(tg);
  g.userData.segs = segs; g.userData.tongue = tg; return g;
}
function bird() {
  const g = new T.Group(); const body = mk(new T.SphereGeometry(0.32, 10, 8), '#f4f4f0'); body.scale.set(0.9, 0.85, 1.35); body.position.y = 0.95; g.add(body);
  const neck = mk(new T.CylinderGeometry(0.06, 0.08, 0.6, 6), '#f4f4f0'); neck.position.set(0, 1.3, 0.3); neck.rotation.x = 0.4; g.add(neck);
  const head = mk(new T.SphereGeometry(0.13, 8, 6), '#f4f4f0'); head.position.set(0, 1.58, 0.44); g.add(head);
  const beak = mk(new T.ConeGeometry(0.04, 0.34, 5), '#f0c040'); beak.rotation.x = Math.PI / 2; beak.position.set(0, 1.56, 0.68); g.add(beak);
  for (const s of [-1, 1]) { const e = new T.Mesh(new T.SphereGeometry(0.03, 6, 5), basic('#1a1420')); e.position.set(s * 0.09, 1.62, 0.5); g.add(e); }
  const wings = []; for (const s of [-1, 1]) { const p = new T.Group(); p.position.set(s * 0.22, 1.05, 0); const w = mk(new T.BoxGeometry(0.7, 0.05, 0.55), '#e6e6e0'); w.position.x = s * 0.35; p.add(w); g.add(p); wings.push(p); }
  legs(g, '#d0a040', [[-0.1, 0], [0.1, 0]], 0.62, 0.025);
  g.userData.wings = wings; return g;
}
function monkey(s) {
  const m = chibi({ robe: '#8a5a3a', skin: '#e2b48a', sleeve: '#8a5a3a', s: s || 0.7 });
  const u = m.userData; const fc = mk(new T.SphereGeometry(0.3, 10, 8), '#e9c39a'); fc.scale.set(1, 0.85, 0.5); fc.position.set(0, -0.05, 0.22); u.head.add(fc);
  const furH = mk(new T.SphereGeometry(0.42, 12, 8, 0, 6.283, 0, 1.3), '#8a5a3a'); furH.position.y = 0.04; furH.rotation.x = -0.5; u.head.add(furH);
  for (const sx of [-1, 1]) { const e = mk(new T.SphereGeometry(0.13, 8, 6), '#c48a5a'); e.scale.z = 0.4; e.position.set(sx * 0.42, 0.05, 0); u.head.add(e); }
  u.eyes.forEach((e) => { e.position.z = 0.4; });
  const tail = new T.Mesh(new T.TorusGeometry(0.35, 0.05, 6, 12, 4.2), M('#7a4a2a')); tail.position.set(0, 0.6, -0.5); tail.rotation.y = Math.PI / 2; m.add(tail); u.tail = tail;
  return m;
}
function rat() {
  const g = new T.Group(); const body = mk(new T.SphereGeometry(0.42, 10, 8), '#b8b8c4'); body.scale.set(0.85, 0.7, 1.25); body.position.y = 0.32; g.add(body);
  const head = new T.Group(); head.position.set(0, 0.42, 0.48); g.add(head);
  const hd = mk(new T.ConeGeometry(0.24, 0.5, 8), '#c4c4d0'); hd.rotation.x = Math.PI / 2; hd.position.z = 0.16; head.add(hd);
  const nose = mk(new T.SphereGeometry(0.05, 6, 5), '#ff8fa8'); nose.position.z = 0.42; head.add(nose);
  for (const s of [-1, 1]) { const ear = mk(new T.CylinderGeometry(0.13, 0.13, 0.03, 10), '#ffb3c4'); ear.rotation.x = Math.PI / 2; ear.position.set(s * 0.17, 0.2, -0.02); head.add(ear);
    const e = new T.Mesh(new T.SphereGeometry(0.04, 6, 5), basic('#1a1420')); e.position.set(s * 0.1, 0.1, 0.12); head.add(e); }
  const tg = mk(new T.BoxGeometry(0.08, 0.03, 0.16), '#ff5d83'); tg.position.set(0, -0.08, 0.42); tg.visible = false; head.add(tg);
  const tail = new T.Mesh(new T.TorusGeometry(0.4, 0.025, 5, 14, 3.2), M('#e0a8b8')); tail.position.set(0, 0.15, -0.75); tail.rotation.set(Math.PI / 2, 0, 0); g.add(tail);
  legs(g, '#ffb3c4', [[-0.18, 0.25], [0.18, 0.25], [-0.18, -0.25], [0.18, -0.25]], 0.12, 0.04);
  g.userData.head = head; g.userData.tongue = tg; return g;
}
function brain() {
  const g = new T.Group(); const mat = M('#ff9fb8', { emissive: new T.Color('#5a2030'), emissiveIntensity: 0.25 });
  for (const s of [-1, 1]) { const h = new T.Mesh(new T.IcosahedronGeometry(1.4, 1), mat); h.scale.set(0.8, 0.85, 1.25); h.position.x = s * 0.62; g.add(h);
    for (let i = 0; i < 5; i++) { const fold = new T.Mesh(new T.TorusGeometry(0.75, 0.06, 5, 16, 2.4), M('#e8829e')); fold.position.set(s * 0.7, 0.2 + Math.sin(i) * 0.3, -1.1 + i * 0.55); fold.rotation.set(0, Math.PI / 2, 0.6); g.add(fold); } }
  const stem = mk(new T.CylinderGeometry(0.3, 0.2, 1.1, 8), '#f08aa8'); stem.position.set(0, -1.2, -0.4); g.add(stem);
  return g;
}
function eyeIcon() { const g = new T.Group(); const w = mk(new T.SphereGeometry(0.55, 14, 10), '#ffffff'); w.scale.set(1.3, 0.75, 0.6); g.add(w); const ir = new T.Mesh(new T.CircleGeometry(0.28, 20), basic('#3a6ad0')); ir.position.z = 0.34; g.add(ir); const pu = new T.Mesh(new T.CircleGeometry(0.14, 16), basic('#0a0a14')); pu.position.z = 0.35; g.add(pu); return g; }
const SMILE = canvasTex(256, 256, (g) => { g.fillStyle = '#ffd34a'; g.beginPath(); g.arc(128, 128, 120, 0, 6.283); g.fill(); g.fillStyle = '#3a2a10'; g.beginPath(); g.arc(88, 100, 16, 0, 6.283); g.arc(168, 100, 16, 0, 6.283); g.fill(); g.lineWidth = 16; g.strokeStyle = '#3a2a10'; g.lineCap = 'round'; g.beginPath(); g.arc(128, 130, 60, 0.25, Math.PI - 0.25); g.stroke(); });
function smileIcon() { const m = new T.Mesh(new T.CircleGeometry(0.6, 28), new T.MeshBasicMaterial({ map: SMILE, transparent: true, side: T.DoubleSide })); return m; }
function handIcon(c) { const g = new T.Group(); const palm = mk(new T.BoxGeometry(0.6, 0.62, 0.18), c || '#f2c49a'); g.add(palm); for (let i = 0; i < 4; i++) { const f = mk(new T.BoxGeometry(0.12, 0.42, 0.14), c || '#f2c49a'); f.position.set(-0.22 + i * 0.147, 0.5, 0); f.rotation.x = -0.25; g.add(f); } const th = mk(new T.BoxGeometry(0.13, 0.36, 0.14), c || '#f2c49a'); th.position.set(-0.4, 0.05, 0.05); th.rotation.z = 0.8; g.add(th); return g; }
function lockIcon() { const g = new T.Group(); const b = mk(new T.BoxGeometry(0.8, 0.66, 0.3), P.gold, { metalness: 0.4, emissive: new T.Color('#6a4a00'), emissiveIntensity: 0.3 }); g.add(b); const sh = mk(new T.TorusGeometry(0.26, 0.07, 6, 14, Math.PI), '#c8c8d8', { metalness: 0.5 }); sh.position.y = 0.33; g.add(sh); const kh = mk(new T.CylinderGeometry(0.07, 0.07, 0.05, 8), '#3a2a10'); kh.rotation.x = Math.PI / 2; kh.position.z = 0.16; g.add(kh); return g; }
function link(c) { const m = mk(new T.TorusGeometry(1.0, 0.26, 8, 24), c, { metalness: 0.35, roughness: 0.45, emissive: new T.Color(c), emissiveIntensity: 0.12 }); m.scale.set(1, 0.62, 1); return m; }
function throne(c) { const g = new T.Group(); const gm = { metalness: 0.45, roughness: 0.5, emissive: new T.Color('#5a3a00'), emissiveIntensity: 0.35 }; const seat = mk(new T.BoxGeometry(1.3, 0.5, 1.0), c || P.gold, gm); seat.position.y = 0.45; g.add(seat); const back = mk(new T.BoxGeometry(1.3, 1.6, 0.22), c || P.gold, gm); back.position.set(0, 1.2, -0.45); g.add(back); const top = mk(new T.ConeGeometry(0.35, 0.6, 4), c || P.gold, gm); top.position.set(0, 2.25, -0.45); g.add(top); const cush = mk(new T.BoxGeometry(1.1, 0.12, 0.85), '#d0405a'); cush.position.y = 0.76; g.add(cush); return g; }
function post() { const g = new T.Group(); const p = mk(new T.CylinderGeometry(0.32, 0.38, 4.4, 8), '#8a5a32'); p.position.y = 2.2; g.add(p); for (const y of [1.0, 3.6]) { const r = mk(new T.TorusGeometry(0.38, 0.06, 6, 16), '#d8c08a'); r.rotation.x = Math.PI / 2; r.position.y = y; g.add(r); } const cap = mk(new T.ConeGeometry(0.42, 0.4, 8), '#7a4a28'); cap.position.y = 4.6; g.add(cap); return g; }
function hourglass() { const g = new T.Group(); const gm = { metalness: 0.4, emissive: new T.Color('#5a3a00'), emissiveIntensity: 0.3 }; for (const y of [0, 2.6]) { const pl = mk(new T.CylinderGeometry(0.9, 0.9, 0.18, 12), P.gold, gm); pl.position.y = y; g.add(pl); } for (let i = 0; i < 3; i++) { const a = i * 2.094; const r = mk(new T.CylinderGeometry(0.05, 0.05, 2.6, 5), P.gold, gm); r.position.set(Math.cos(a) * 0.8, 1.3, Math.sin(a) * 0.8); g.add(r); } const glass = new T.MeshStandardMaterial({ color: '#cfe8ff', transparent: true, opacity: 0.35, roughness: 0.1 }); const top = new T.Mesh(new T.ConeGeometry(0.62, 1.15, 14, 1, true), glass); top.rotation.x = Math.PI; top.position.y = 1.9; const bot = new T.Mesh(new T.ConeGeometry(0.62, 1.15, 14, 1, true), glass); bot.position.y = 0.7; g.add(top, bot);
  const sTop = mk(new T.ConeGeometry(0.5, 0.9, 12), '#f0c870'); sTop.rotation.x = Math.PI; sTop.position.y = 2.0; const sBot = mk(new T.ConeGeometry(0.5, 0.9, 12), '#f0c870'); sBot.position.y = 0.55; const str = mk(new T.CylinderGeometry(0.03, 0.03, 1.1, 5), '#f0c870'); str.position.y = 1.3; g.add(sTop, sBot, str); g.userData = { sTop, sBot }; return g; }
function anthill() { const m = mk(new T.ConeGeometry(0.9, 1.3, 7), '#a8703a'); m.position.y = 0.65; const g = new T.Group(); g.add(m); const h = mk(new T.CylinderGeometry(0.12, 0.12, 0.05, 8), '#3a2210'); h.position.set(0.15, 0.75, 0.38); h.rotation.x = 1.1; g.add(h); return g; }
function pond() { const m = new T.Mesh(new T.CylinderGeometry(1.8, 1.8, 0.06, 20), new T.MeshStandardMaterial({ color: '#3a8ad0', roughness: 0.2, emissive: new T.Color('#103050'), emissiveIntensity: 0.3 })); m.position.y = 0.03; return m; }
function grave() { const g = new T.Group(); for (const q of [[-0.6, 0, 0.9], [0.5, -0.3, 0.7], [0.1, 0.6, 0.6]]) { const st = mk(new T.BoxGeometry(0.5, q[2], 0.18), '#9a9aa8'); st.position.set(q[0], q[2] / 2, q[1]); g.add(st); } const tr = mk(new T.CylinderGeometry(0.06, 0.1, 1.8, 5), '#5a4a3a'); tr.position.set(1.0, 0.9, -0.6); g.add(tr); for (const s of [-1, 1]) { const br = mk(new T.CylinderGeometry(0.03, 0.05, 0.8, 4), '#5a4a3a'); br.position.set(1.0 + s * 0.25, 1.6, -0.6); br.rotation.z = -s * 0.8; g.add(br); } return g; }
function coin() { const m = mk(new T.CylinderGeometry(0.16, 0.16, 0.04, 10), P.gold, { metalness: 0.5, emissive: new T.Color('#6a4a00'), emissiveIntensity: 0.4 }); m.rotation.x = Math.PI / 2; return m; }
