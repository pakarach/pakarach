/* Part B: models (low-poly chibi people, Isan village props) — chibi base from vamp/, robe/sit/halo from sil/ */
const M = (c, x) => FK.mat(T, c, x);
const mk = (geo, c, x) => new T.Mesh(geo, M(c, x));
const basic = (c, x) => new T.MeshBasicMaterial(Object.assign({ color: c }, x || {}));
const SKIN = '#e2ae86', ROBE = '#e8892a', ROBE2 = '#c76a1a', WHITE = '#f2efe6';
const GOLDM = { metalness: 0.45, roughness: 0.6, emissive: new T.Color('#5a3a00'), emissiveIntensity: 0.35 };

function chibi(o) {
  o = o || {}; const g = new T.Group(), skin = o.skin || SKIN, body = o.body || '#5a6fa8';
  const ex = o.gold ? GOLDM : o.ghost ? { transparent: true, opacity: 0.6, emissive: new T.Color(o.ghost), emissiveIntensity: 0.5 } : o.glow ? { emissive: new T.Color(o.glow), emissiveIntensity: 0.3 } : {};
  const bodyM = mk(new T.CylinderGeometry(o.thin ? 0.26 : 0.32, o.dress || o.robe ? 0.66 : 0.5, 1.1, 10), body, ex); bodyM.position.y = 0.55; g.add(bodyM);
  let sash = null; if (o.sash) { sash = mk(new T.BoxGeometry(0.2, 1.05, 0.07), o.sash, ex); sash.position.set(0.06, 0.62, 0.42); sash.rotation.set(-0.3, 0, 0.5); g.add(sash); }
  if (o.belt) { const b = mk(new T.CylinderGeometry(0.43, 0.45, 0.1, 10), o.belt, ex); b.position.y = 0.55; g.add(b); }
  if (o.shirt) { const s = mk(new T.BoxGeometry(0.22, 0.5, 0.06), o.shirt, ex); s.position.set(0, 0.82, 0.33); s.rotation.x = -0.17; g.add(s); }
  const head = new T.Group(); head.position.y = 1.42; g.add(head);
  const skull = mk(new T.SphereGeometry(0.4, 14, 10), skin, ex); head.add(skull);
  const hc = o.hair || '#2a2228';
  if (!o.bald) {
    const cap = mk(new T.SphereGeometry(0.43, 14, 8, 0, 6.283, 0, o.hairStyle === 'long' ? 1.6 : 1.1), hc, ex); cap.position.set(0, 0.03, -0.06); cap.rotation.x = -0.3; head.add(cap);
    if (o.hairStyle === 'bun') { const b = mk(new T.SphereGeometry(0.17, 8, 6), hc, ex); b.position.set(0, 0.32, -0.32); head.add(b); }
    if (o.hairStyle === 'long') { const b = mk(new T.BoxGeometry(0.7, 0.62, 0.2), hc, ex); b.position.set(0, -0.22, -0.28); head.add(b); }
  }
  if (o.hat === 'cap') { const cr = mk(new T.SphereGeometry(0.44, 12, 6, 0, 6.283, 0, 1.2), o.hatC || '#6a4a30'); cr.position.y = 0.06; head.add(cr); const br = mk(new T.BoxGeometry(0.5, 0.05, 0.3), o.hatC || '#6a4a30'); br.position.set(0, 0.2, 0.42); head.add(br); }
  if (o.hat === 'band') { const b = mk(new T.TorusGeometry(0.42, 0.06, 6, 16), o.hatC || '#c0202c'); b.rotation.x = Math.PI / 2; b.position.y = 0.14; head.add(b); }
  if (o.hat === 'pakoma') { const b = mk(new T.TorusGeometry(0.4, 0.07, 6, 16), o.hatC || '#3a7a9a'); b.rotation.x = Math.PI / 2 - 0.15; b.position.y = 0.2; head.add(b); }
  const eyeM = o.eyeGlow ? basic(o.eyeGlow) : basic('#1a1420'); const eyes = [];
  for (const s of [-1, 1]) {
    const e = new T.Mesh(o.closed ? new T.BoxGeometry(0.13, 0.03, 0.02) : new T.SphereGeometry(o.eyeGlow ? 0.065 : 0.055, 8, 6), eyeM);
    e.position.set(s * 0.14, 0.03, 0.385); head.add(e); eyes.push(e);
    if (o.brow) { const b = new T.Mesh(new T.BoxGeometry(0.14, 0.03, 0.02), basic(o.brow)); b.position.set(s * 0.14, 0.15, 0.38); b.rotation.z = s * (o.sad ? -0.3 : 0.35); head.add(b); }
  }
  if (o.cheek) for (const s of [-1, 1]) { const c = new T.Mesh(new T.CircleGeometry(0.07, 10), basic(o.cheek, { transparent: true, opacity: 0.7 })); c.position.set(s * 0.22, -0.08, 0.37); c.rotation.y = s * 0.5; head.add(c); }
  let mouth = null; if (!o.statue) { mouth = new T.Mesh(new T.BoxGeometry(o.smile ? 0.14 : 0.1, 0.022, 0.02), basic('#7a3a3a')); mouth.position.set(0, -0.14, 0.39); head.add(mouth); }
  if (o.glasses) for (const s of [-1, 1]) { const r = new T.Mesh(new T.TorusGeometry(0.08, 0.015, 5, 14), basic('#2a2a2a')); r.position.set(s * 0.14, 0.03, 0.39); head.add(r); }
  const arms = {};
  for (const s of [-1, 1]) {
    const p = new T.Group(); p.position.set(s * (o.thin ? 0.28 : 0.34), 1.0, 0);
    const a = mk(new T.CylinderGeometry(0.085, 0.085, 0.55, 6), o.sleeve || body, ex); a.position.y = -0.27;
    const h = mk(new T.SphereGeometry(0.1, 8, 6), skin, ex); h.position.y = -0.58; p.add(a, h); p.userData.hand = h;
    g.add(p); arms[s < 0 ? 'L' : 'R'] = p;
  }
  const lap = mk(new T.CylinderGeometry(0.72, 0.78, 0.28, 12), body, ex); lap.position.y = 0.14; lap.visible = false; g.add(lap);
  let halo = null; if (o.halo) { halo = new T.Mesh(new T.TorusGeometry(0.62, 0.05, 6, 28), basic('#ffe08a', { transparent: true, opacity: 0.9 })); halo.position.set(0, 1.45, -0.3); g.add(halo); }
  g.userData = { head, body: bodyM, sash, arms, lap, eyes, mouth, halo, sit: false };
  rest(g); g.scale.setScalar(o.s || 1); return g;
}
function rest(ch) { const a = ch.userData.arms; a.L.rotation.set(0, 0, -0.14); a.R.rotation.set(0, 0, 0.14); ch.userData.head.rotation.set(0, 0, 0); ch.userData.body.position.y = ch.userData.sit ? 0.62 : 0.55; }
function setSit(ch, on) {
  const u = ch.userData; if (u.sit === on) return; u.sit = on; u.lap.visible = on;
  u.body.scale.y = on ? 0.62 : 1; u.body.position.y = on ? 0.62 : 0.55; u.head.position.y = on ? 1.32 : 1.42;
  u.arms.L.position.y = u.arms.R.position.y = on ? 0.92 : 1.0;
  if (u.sash) { u.sash.scale.y = on ? 0.66 : 1; u.sash.position.y = on ? 0.66 : 0.62; }
}
function walk(ch, t, amp) { amp = amp == null ? 1 : amp; const a = ch.userData.arms, s = Math.sin(t * 9) * 0.5 * amp; a.L.rotation.set(s, 0, -0.14); a.R.rotation.set(-s, 0, 0.14); ch.userData.body.position.y = 0.55 + Math.abs(Math.sin(t * 9)) * 0.05 * amp; }
function face(ch, dx, dz) { ch.rotation.y = Math.atan2(dx, dz); }
function armUp(ch, side, k, x) { const a = ch.userData.arms[side]; a.rotation.set(x || 0, 0, (side === 'R' ? 1 : -1) * (0.14 + 2.3 * k)); }
function armFwd(ch, side, k) { const a = ch.userData.arms[side]; a.rotation.set(-1.4 * k, 0, side === 'R' ? 0.14 : -0.14); }
function hold(ch) { const a = ch.userData.arms; a.L.rotation.set(-1.1, 0, -0.55); a.R.rotation.set(-1.1, 0, 0.55); } /* cradle something in front */
function anjali(ch, k) { k = k == null ? 1 : k; const a = ch.userData.arms; a.L.rotation.set(-1.15 * k, 0, -0.14 + 0.72 * k); a.R.rotation.set(-1.15 * k, 0, 0.14 - 0.72 * k); }
function lapHands(ch) { const a = ch.userData.arms; a.L.rotation.set(-0.75, 0, 0.5); a.R.rotation.set(-0.75, 0, -0.5); }
const monk = (o) => chibi(Object.assign({ body: ROBE, sleeve: ROBE, sash: ROBE2, bald: true, robe: true, skin: '#d9a47a' }, o || {}));

/* generic props */
function softSprite(c, a, add) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const x = cv.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthWrite: false, opacity: a == null ? 1 : a, blending: add === false ? T.NormalBlending : T.AdditiveBlending }));
}
function label(txt, o) { const sp = FK.label(T, txt, o); sp.material.fog = false; return sp; }
function card(lines, w, h, o) {
  o = o || {}; const cv = document.createElement('canvas'), R = 256; cv.width = Math.round(R * w); cv.height = Math.round(R * h); const x = cv.getContext('2d');
  x.fillStyle = o.bg || '#efe6cf'; x.fillRect(0, 0, cv.width, cv.height);
  if (o.border) { x.strokeStyle = o.border; x.lineWidth = 10; x.strokeRect(12, 12, cv.width - 24, cv.height - 24); }
  let y = o.top || cv.height * 0.2;
  for (const l of lines) { x.font = (l[3] || 800) + ' ' + l[1] + 'px Kanit,serif'; x.fillStyle = l[2] || '#2a2018'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(l[0], cv.width / 2, y); y += l[1] * 1.25; }
  const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: new T.CanvasTexture(cv), side: T.DoubleSide, transparent: !!o.transparent }));
  m.material.fog = false; return m;
}
function moon(r) { const g = new T.Group(); const m = new T.Mesh(new T.SphereGeometry(r || 2, 20, 14), basic('#fff3c4')); g.add(m); const gl = softSprite('rgba(255,240,190,1)', 0.5); gl.scale.set((r || 2) * 5, (r || 2) * 5, 1); g.add(gl); m.material.fog = false; gl.material.fog = false; return g; }
function tree(s, c) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.1, 0.14, 0.9, 5), '#5a3e2a'); tr.position.y = 0.45; g.add(tr); const f = mk(new T.IcosahedronGeometry(0.75, 0), c || '#2f5a46'); f.position.y = 1.35; f.scale.y = 1.15; g.add(f); g.scale.setScalar(s || 1); return g; }
function palm(s) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.1, 0.14, 4.2, 6), '#5a4634'); tr.position.y = 2.1; g.add(tr); for (let i = 0; i < 7; i++) { const l = mk(new T.ConeGeometry(0.5, 1.4, 4), '#2e5a3e'); l.position.set(Math.cos(i * 0.9) * 0.55, 4.3, Math.sin(i * 0.9) * 0.55); l.rotation.set(Math.sin(i * 0.9) * 1.2, 0, -Math.cos(i * 0.9) * 1.2); g.add(l); } g.scale.setScalar(s || 1); return g; }
function bush(c, s) { const g = new T.Group(); for (let i = 0; i < 3; i++) { const b = mk(new T.IcosahedronGeometry(0.28, 0), c || '#3f8a4a'); b.position.set((i - 1) * 0.25, 0.22 + (i % 2) * 0.08, (i % 2) * 0.12); g.add(b); } g.scale.setScalar(s || 1); return g; }
function fire(s) { const g = new T.Group(); const f = new T.Mesh(new T.ConeGeometry(0.35, 0.9, 6), basic('#ffb347')); f.position.y = 0.45; const f2 = new T.Mesh(new T.ConeGeometry(0.2, 0.6, 6), basic('#fff0a0')); f2.position.y = 0.35; g.add(f, f2); const gl = softSprite('rgba(255,170,80,1)', 0.7); gl.scale.set(2.6, 2.6, 1); gl.position.y = 0.6; g.add(gl); g.userData.f = f; g.scale.setScalar(s || 1); return g; }

/* Isan stilt house (เรือนใต้ถุนสูง): floor at y=h0, front faces +z, stairs on the right */
function isanHouse(o) {
  o = o || {}; const g = new T.Group(), w = o.w || 4, d = o.d || 3, h0 = 1.6, h = 1.8, wall = o.wall || '#a07a52', roof = o.roof || '#5a3a2a';
  for (const [x, z] of [[-w / 2 + 0.2, -d / 2 + 0.2], [w / 2 - 0.2, -d / 2 + 0.2], [-w / 2 + 0.2, d / 2 - 0.2], [w / 2 - 0.2, d / 2 - 0.2], [0, -d / 2 + 0.2], [0, d / 2 - 0.2]]) { const p = mk(new T.CylinderGeometry(0.1, 0.12, h0, 6), '#6a4a30'); p.position.set(x, h0 / 2, z); g.add(p); }
  const fl = mk(new T.BoxGeometry(w + 0.6, 0.14, d + 1.6), '#7a5a3a'); fl.position.set(0, h0, 0.6); g.add(fl);
  const walls = mk(new T.BoxGeometry(w, h, d), wall); walls.position.y = h0 + h / 2; g.add(walls);
  const shape = new T.Shape([[-w / 2 - 0.5, 0], [w / 2 + 0.5, 0], [0, 1.7]].map((p) => new T.Vector2(p[0], p[1])));
  const rf = mk(new T.ExtrudeGeometry(shape, { depth: d + 0.9, bevelEnabled: false }), roof); rf.position.set(0, h0 + h, -d / 2 - 0.45); g.add(rf);
  const door = new T.Group(); door.position.set(-0.45, h0 + 0.07, d / 2 + 0.01); g.add(door);
  const dm = mk(new T.BoxGeometry(0.9, 1.3, 0.06), '#4a2e1c'); dm.position.set(0.45, 0.65, 0); door.add(dm);
  const win = new T.Mesh(new T.PlaneGeometry(0.7, 0.55), basic('#ffd27a')); win.position.set(w * 0.28, h0 + 1.1, d / 2 + 0.02); g.add(win);
  const st = new T.Group(); st.position.set(w / 2 + 0.05, 0, d / 2 + 1.25); g.add(st);
  for (let i = 0; i < 6; i++) { const s = mk(new T.BoxGeometry(0.8, 0.07, 0.28), '#7a5a3a'); s.position.set(0.45, 0.25 + i * 0.27, 1.5 - i * 0.27); st.add(s); }
  for (const x of [0.05, 0.85]) { const r = mk(new T.BoxGeometry(0.06, 0.06, 2.0), '#6a4a30'); r.position.set(x, 1.0, 0.8); r.rotation.x = 0.78; st.add(r); }
  const line = mk(new T.CylinderGeometry(0.015, 0.015, w + 1.2, 4), '#cfc6b0'); line.rotation.z = Math.PI / 2; line.position.set(0, h0 - 0.25, d / 2 + 1.3); g.add(line);
  g.userData = { door, win, h0, d, w, frontZ: d / 2 + 1.4, line }; return g;
}
function sala() { const g = new T.Group(); const fl = mk(new T.BoxGeometry(6, 0.4, 4), '#9a7a5a'); fl.position.y = 0.2; g.add(fl); for (const [x, z] of [[-2.7, -1.7], [2.7, -1.7], [-2.7, 1.7], [2.7, 1.7]]) { const p = mk(new T.CylinderGeometry(0.12, 0.12, 2.6, 6), '#6a4a30'); p.position.set(x, 1.5, z); g.add(p); } const rf = mk(new T.ConeGeometry(4.6, 1.6, 4), '#7a3a2a'); rf.rotation.y = Math.PI / 4; rf.scale.z = 0.7; rf.position.y = 3.6; g.add(rf); return g; }
function redShirt(sc) {
  const sh = new T.Shape([[-0.5, 0.6], [-0.18, 0.66], [0, 0.56], [0.18, 0.66], [0.5, 0.6], [0.72, 0.3], [0.5, 0.18], [0.4, 0.3], [0.4, -0.6], [-0.4, -0.6], [-0.4, 0.3], [-0.5, 0.18], [-0.72, 0.3]].map((p) => new T.Vector2(p[0], p[1])));
  const m = mk(new T.ShapeGeometry(sh), '#d42a36', { side: T.DoubleSide, emissive: new T.Color('#5a0a10'), emissiveIntensity: 0.4 }); const g = new T.Group(); m.position.y = -0.62; g.add(m); g.scale.setScalar(sc || 1); return g;
}
function dog(c) { const g = new T.Group(), col = c || '#1c1a22'; const b = mk(new T.BoxGeometry(0.42, 0.34, 0.75), col); b.position.y = 0.45; g.add(b); const hd = mk(new T.BoxGeometry(0.36, 0.34, 0.36), col); hd.position.set(0, 0.72, 0.46); g.add(hd); const sn = mk(new T.BoxGeometry(0.18, 0.14, 0.2), col); sn.position.set(0, 0.64, 0.7); g.add(sn); for (const s of [-1, 1]) { const e = mk(new T.ConeGeometry(0.07, 0.18, 4), col); e.position.set(s * 0.12, 0.95, 0.42); g.add(e); const ey = new T.Mesh(new T.SphereGeometry(0.035, 6, 4), basic('#ffd25a')); ey.position.set(s * 0.09, 0.78, 0.64); g.add(ey); } for (const [x, z] of [[-0.14, -0.26], [0.14, -0.26], [-0.14, 0.26], [0.14, 0.26]]) { const l = mk(new T.BoxGeometry(0.1, 0.32, 0.1), col); l.position.set(x, 0.16, z); g.add(l); } const tl = mk(new T.BoxGeometry(0.07, 0.07, 0.35), col); tl.position.set(0, 0.62, -0.5); tl.rotation.x = 0.6; g.add(tl); g.userData.tail = tl; return g; }
function cat(c) { const g = new T.Group(), col = c || '#1c1a22'; const b = mk(new T.SphereGeometry(0.26, 10, 8), col); b.scale.set(1, 0.85, 1.3); b.position.y = 0.3; g.add(b); const hd = mk(new T.SphereGeometry(0.2, 10, 8), col); hd.position.set(0, 0.55, 0.28); g.add(hd); for (const s of [-1, 1]) { const e = mk(new T.ConeGeometry(0.07, 0.15, 4), col); e.position.set(s * 0.11, 0.74, 0.26); g.add(e); const ey = new T.Mesh(new T.SphereGeometry(0.035, 6, 4), basic('#ffd25a')); ey.position.set(s * 0.08, 0.58, 0.46); g.add(ey); } const tl = mk(new T.CylinderGeometry(0.035, 0.03, 0.55, 5), col); tl.position.set(0, 0.5, -0.38); tl.rotation.x = -0.5; g.add(tl); g.userData.tail = tl; return g; }
function buffalo() { const g = new T.Group(), col = '#3a3a44'; const b = mk(new T.BoxGeometry(1.0, 0.8, 1.8), col); b.position.y = 0.95; g.add(b); const hd = mk(new T.BoxGeometry(0.6, 0.55, 0.6), col); hd.position.set(0, 1.05, 1.1); g.add(hd); for (const s of [-1, 1]) { const h = mk(new T.TorusGeometry(0.3, 0.05, 5, 10, Math.PI * 0.8), '#d8d0c0'); h.position.set(s * 0.32, 1.38, 1.05); h.rotation.set(0, Math.PI / 2, s > 0 ? 0.3 : Math.PI - 0.3); g.add(h); } for (const [x, z] of [[-0.35, -0.6], [0.35, -0.6], [-0.35, 0.6], [0.35, 0.6]]) { const l = mk(new T.BoxGeometry(0.2, 0.6, 0.2), col); l.position.set(x, 0.3, z); g.add(l); } return g; }
function cow() { const g = new T.Group(); const cb = mk(new T.BoxGeometry(1.0, 0.75, 1.7), '#c8a878'); cb.position.y = 0.95; g.add(cb); const hd = mk(new T.BoxGeometry(0.5, 0.5, 0.55), '#c8a878'); hd.position.set(0, 1.15, 1.05); g.add(hd); for (const [x, z] of [[-0.35, -0.55], [0.35, -0.55], [-0.35, 0.55], [0.35, 0.55]]) { const l = mk(new T.BoxGeometry(0.18, 0.6, 0.18), '#b8986a'); l.position.set(x, 0.3, z); g.add(l); } return g; }
function phone() { const g = new T.Group(); const b = mk(new T.BoxGeometry(2.0, 3.8, 0.2), '#20232e', { metalness: 0.4, roughness: 0.4 }); g.add(b); const sc = new T.Mesh(new T.PlaneGeometry(1.8, 3.4), basic('#e8eef4')); sc.position.z = 0.11; g.add(sc); const hd = new T.Mesh(new T.PlaneGeometry(1.8, 0.45), basic('#06c755')); hd.position.set(0, 1.47, 0.115); g.add(hd); return g; }
function chatBubble(txt, col, w) { return card([[txt, 46, col === '#06c755' ? '#0f1630' : '#1a1f3a', 700]], w || 1.5, 0.42, { bg: col || '#ffffff', top: 56 }); }
function bed(c) { const g = new T.Group(); const f = mk(new T.BoxGeometry(1.7, 0.5, 3.0), '#7a5a3a'); f.position.y = 0.25; g.add(f); const m = mk(new T.BoxGeometry(1.6, 0.25, 2.9), c || '#dfe6f0'); m.position.y = 0.62; g.add(m); const p = mk(new T.BoxGeometry(1.0, 0.2, 0.5), '#ffffff'); p.position.set(0, 0.84, -1.1); g.add(p); return g; }
function heartModel() { const g = new T.Group(), c = '#d8344a', ex = { emissive: new T.Color('#5a0a14'), emissiveIntensity: 0.5 }; for (const s of [-1, 1]) { const b = mk(new T.SphereGeometry(0.62, 16, 12), c, ex); b.position.set(s * 0.45, 0.35, 0); g.add(b); } const cn = mk(new T.ConeGeometry(0.98, 1.4, 16), c, ex); cn.rotation.z = Math.PI; cn.position.y = -0.55; g.add(cn); const ao = mk(new T.CylinderGeometry(0.18, 0.2, 0.7, 8), '#c02a3c', ex); ao.position.set(0.2, 1.0, -0.1); g.add(ao); return g; }
function monitor(w, h) {
  const g = new T.Group(); const box = mk(new T.BoxGeometry(w + 0.3, h + 0.3, 0.3), '#3a4250'); g.add(box);
  const scr = new T.Mesh(new T.PlaneGeometry(w, h), basic('#06141a')); scr.position.z = 0.16; g.add(scr);
  const n = 160, pos = new Float32Array(n * 3); const geo = new T.BufferGeometry(); geo.setAttribute('position', new T.BufferAttribute(pos, 3));
  const ln = new T.Line(geo, new T.LineBasicMaterial({ color: '#4dff9a' })); ln.position.z = 0.18; g.add(ln);
  g.userData = { ln, n, w, h }; return g;
}
/* ECG trace: k=0 normal sinus, k=1 Brugada-ish (coved ST), vf=1 fibrillation (wavy) */
function ecg(mon, t, k, vf) {
  const u = mon.userData, a = u.ln.geometry.attributes.position;
  for (let i = 0; i < u.n; i++) {
    const x = -u.w / 2 + u.w * i / (u.n - 1), ph0 = ((i / u.n) * 3 + t * 1.2) % 1; let y = 0;
    if (ph0 > 0.30 && ph0 < 0.33) y = 0.12; else if (ph0 > 0.38 && ph0 < 0.40) y = -0.1; else if (ph0 > 0.40 && ph0 < 0.43) y = 0.85; else if (ph0 > 0.43 && ph0 < 0.46) y = -0.25;
    else if (ph0 > 0.46 && ph0 < 0.62) y = k * 0.55 * Math.sin((ph0 - 0.46) / 0.16 * Math.PI) * (1 - (ph0 - 0.46) / 0.2) + (1 - k) * 0.18 * Math.sin((ph0 - 0.5) / 0.12 * Math.PI) * (ph0 > 0.5 ? 1 : 0);
    const v = Math.sin(i * 0.45 + t * 9) * 0.35 + Math.sin(i * 0.21 - t * 5) * 0.25;
    a.setXYZ(i, x, U.lerp(y, v, vf || 0) * u.h * 0.35, 0);
  }
  a.needsUpdate = true;
}
function bunk() { const g = new T.Group(); for (const y of [0.5, 1.9]) { const f = mk(new T.BoxGeometry(1.4, 0.15, 2.6), '#6a7a8a'); f.position.y = y; g.add(f); const m = mk(new T.BoxGeometry(1.3, 0.15, 2.5), '#c8ccd8'); m.position.y = y + 0.15; g.add(m); } for (const [x, z] of [[-0.65, -1.25], [0.65, -1.25], [-0.65, 1.25], [0.65, 1.25]]) { const p = mk(new T.BoxGeometry(0.08, 2.5, 0.08), '#5a6a7a'); p.position.set(x, 1.25, z); g.add(p); } return g; }
function sleeper(o) { const c = chibi(Object.assign({ closed: true, s: 0.8 }, o)); c.rotation.order = 'YXZ'; c.rotation.x = -Math.PI / 2; return c; }
function bodhi(s) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.35, 0.6, 3.4, 7), '#6a4a34'); tr.position.y = 1.7; g.add(tr); for (let i = 0; i < 7; i++) { const f = mk(new T.IcosahedronGeometry(1.6 + (i % 3) * 0.3, 0), i % 2 ? '#3f7a4a' : '#4a8a52'); const a = i * 0.9; f.position.set(Math.cos(a) * 1.8, 4.2 + (i % 3) * 0.6, Math.sin(a) * 1.4 - 0.6); g.add(f); } g.scale.setScalar(s || 1); return g; }
function waterPot() { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.22, 10, 8), P.gold, GOLDM); b.scale.y = 0.8; g.add(b); const n = mk(new T.CylinderGeometry(0.06, 0.1, 0.25, 8), P.gold, GOLDM); n.position.set(0.18, 0.12, 0); n.rotation.z = -1.0; g.add(n); return g; }
