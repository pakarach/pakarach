/* Part B: models (low-poly chibi people, props, buildings) */
const M = (c, x) => FK.mat(T, c, x);
const mk = (geo, c, x) => new T.Mesh(geo, M(c, x));
const basic = (c, x) => new T.MeshBasicMaterial(Object.assign({ color: c }, x || {}));
const SKIN = '#e9b893', PALE = '#d9dde8', CAPE = '#1c1726', BLOODC = '#c8283c';

function chibi(o) {
  o = o || {}; const g = new T.Group(), skin = o.skin || SKIN, body = o.body || '#5a6fa8';
  const ex = o.ghost ? { transparent: true, opacity: 0.55, emissive: new T.Color(o.ghost), emissiveIntensity: 0.5 } : {};
  const bodyM = mk(new T.CylinderGeometry(0.32, o.dress ? 0.72 : 0.5, 1.1, 10), body, ex); bodyM.position.y = 0.55; g.add(bodyM);
  if (o.belt) { const b = mk(new T.CylinderGeometry(0.43, 0.45, 0.1, 10), o.belt, ex); b.position.y = 0.55; g.add(b); }
  if (o.shirt) { const s = mk(new T.BoxGeometry(0.22, 0.5, 0.06), o.shirt, ex); s.position.set(0, 0.82, 0.33); s.rotation.x = -0.17; g.add(s); }
  const head = new T.Group(); head.position.y = 1.42; g.add(head);
  const skull = mk(new T.SphereGeometry(0.4, 14, 10), skin, ex); head.add(skull);
  const hc = o.hair || '#3a2a20';
  if (!o.bald && o.hairStyle !== 'none') {
    const cap = mk(new T.SphereGeometry(0.43, 14, 8, 0, 6.283, 0, o.hairStyle === 'long' ? 1.6 : 1.1), hc, ex); cap.position.set(0, 0.03, -0.06); cap.rotation.x = -0.3; head.add(cap);
    if (o.hairStyle === 'bun') { const b = mk(new T.SphereGeometry(0.17, 8, 6), hc, ex); b.position.set(0, 0.32, -0.32); head.add(b); }
    if (o.hairStyle === 'curly') for (let i = 0; i < 7; i++) { const c = mk(new T.SphereGeometry(0.13, 6, 5), hc, ex); const a = -1.4 + i * 0.47; c.position.set(Math.sin(a) * 0.4, 0.22 + Math.cos(a) * 0.12, -0.05 + Math.cos(a) * 0.12); head.add(c); }
    if (o.hairStyle === 'slick') { const p = mk(new T.ConeGeometry(0.09, 0.22, 4), hc, ex); p.rotation.x = Math.PI; p.position.set(0, 0.3, 0.33); head.add(p); }
    if (o.hairStyle === 'long') { const b = mk(new T.BoxGeometry(0.7, 0.62, 0.2), hc, ex); b.position.set(0, -0.22, -0.28); head.add(b); }
  }
  if (o.wig) for (const s of [-1, 1]) for (const k of [0, 1]) { const r = mk(new T.CylinderGeometry(0.09, 0.09, 0.22, 8), '#f2f0ea'); r.rotation.z = Math.PI / 2; r.position.set(s * 0.42, 0.05 - k * 0.17, -0.05); head.add(r); }
  if (o.hat === 'tricorn') { const br = mk(new T.CylinderGeometry(0.5, 0.5, 0.06, 3), o.hatC || '#1e1e2a'); br.position.y = 0.36; br.rotation.y = Math.PI; head.add(br); const cr = mk(new T.CylinderGeometry(0.3, 0.34, 0.24, 10), o.hatC || '#1e1e2a'); cr.position.y = 0.48; head.add(cr); }
  if (o.hat === 'top') { const br = mk(new T.CylinderGeometry(0.48, 0.48, 0.05, 14), o.hatC || '#1e1e2a'); br.position.y = 0.36; head.add(br); const cr = mk(new T.CylinderGeometry(0.3, 0.3, 0.55, 14), o.hatC || '#1e1e2a'); cr.position.y = 0.64; head.add(cr); }
  if (o.hat === 'shako') { const cr = mk(new T.CylinderGeometry(0.3, 0.36, 0.42, 10), o.hatC || '#3a3f6a', ex); cr.position.y = 0.5; head.add(cr); const pl = mk(new T.SphereGeometry(0.08, 6, 5), '#c0303a', ex); pl.position.set(0, 0.76, 0.1); head.add(pl); }
  if (o.hat === 'cap') { const cr = mk(new T.SphereGeometry(0.44, 12, 6, 0, 6.283, 0, 1.2), o.hatC || '#6a4a30'); cr.position.y = 0.06; head.add(cr); }
  if (o.hat === 'scarf') { const cr = mk(new T.SphereGeometry(0.46, 12, 8, 0, 6.283, 0, 1.5), o.hatC || '#a04a3a'); cr.position.set(0, 0.02, -0.04); cr.rotation.x = -0.25; head.add(cr); }
  if (o.beard) { const b = mk(new T.SphereGeometry(0.3, 10, 8, 0, 6.283, 1.6, 1.4), o.beard); b.position.set(0, 0.0, 0.08); head.add(b); }
  if (o.ears) for (const s of [-1, 1]) { const e = mk(new T.ConeGeometry(0.08, 0.38, 4), skin, ex); e.position.set(s * 0.42, 0.12, -0.02); e.rotation.z = -s * 1.0; head.add(e); }
  const eyeM = o.eyeGlow ? basic(o.eyeGlow) : basic('#1a1420'); const eyes = [];
  for (const s of [-1, 1]) {
    const e = new T.Mesh(o.closed ? new T.BoxGeometry(0.13, 0.03, 0.02) : new T.SphereGeometry(o.eyeGlow ? 0.065 : 0.055, 8, 6), eyeM);
    e.position.set(s * 0.14, 0.03, 0.385); head.add(e); eyes.push(e);
    if (o.brow) { const b = new T.Mesh(new T.BoxGeometry(0.14, 0.03, 0.02), basic(o.brow)); b.position.set(s * 0.14, 0.15, 0.38); b.rotation.z = s * 0.35; head.add(b); }
  }
  if (o.cheek) for (const s of [-1, 1]) { const c = new T.Mesh(new T.CircleGeometry(0.07, 10), basic(o.cheek, { transparent: true, opacity: 0.7 })); c.position.set(s * 0.22, -0.08, 0.37); c.rotation.y = s * 0.5; head.add(c); }
  const mouth = new T.Mesh(new T.BoxGeometry(o.smile ? 0.14 : 0.1, 0.022, 0.02), basic('#7a3a3a')); mouth.position.set(0, -0.14, 0.39); head.add(mouth);
  if (o.fangs) for (const s of [-1, 1]) { const f = new T.Mesh(new T.ConeGeometry(0.022, 0.07, 4), basic('#ffffff')); f.rotation.x = Math.PI; f.position.set(s * 0.04, -0.17, 0.39); head.add(f); }
  let blood = null; if (o.bloodMouth) { blood = new T.Mesh(new T.CircleGeometry(0.07, 8), basic(BLOODC)); blood.position.set(0.02, -0.2, 0.388); blood.scale.y = 0.6; head.add(blood); }
  if (o.glasses) for (const s of [-1, 1]) { const r = new T.Mesh(new T.TorusGeometry(0.08, 0.015, 5, 14), basic('#2a2a2a')); r.position.set(s * 0.14, 0.03, 0.39); head.add(r); }
  const arms = {};
  for (const s of [-1, 1]) {
    const p = new T.Group(); p.position.set(s * 0.34, 1.0, 0);
    const a = mk(new T.CylinderGeometry(0.085, 0.085, 0.55, 6), o.sleeve || body, ex); a.position.y = -0.27;
    const h = mk(new T.SphereGeometry(0.1, 8, 6), skin, ex); h.position.y = -0.58; p.add(a, h); p.userData.hand = h;
    g.add(p); arms[s < 0 ? 'L' : 'R'] = p;
  }
  let cape = null;
  if (o.cape) {
    cape = new T.Group(); const sh = mk(new T.CylinderGeometry(0.42, 0.8, 1.15, 12, 1, true, Math.PI * 0.35, Math.PI * 1.3), o.cape, { side: T.DoubleSide }); sh.position.y = 0.6; sh.rotation.y = Math.PI; cape.add(sh);
    const col = mk(new T.CylinderGeometry(0.5, 0.36, 0.42, 12, 1, true, Math.PI * 0.2, Math.PI * 1.6), o.capeIn || '#b01c34', { side: T.DoubleSide }); col.position.y = 1.18; col.rotation.y = Math.PI; cape.add(col);
    g.add(cape);
  }
  const lay = new T.Group(); /* lying pose helper: rotate the whole figure */
  g.userData = { head, body: bodyM, arms, eyes, mouth, cape, blood, skull, baseY: 0 };
  rest(g); g.scale.setScalar(o.s || 1); void lay; return g;
}
function rest(ch) { const a = ch.userData.arms; a.L.rotation.set(0, 0, -0.14); a.R.rotation.set(0, 0, 0.14); ch.userData.head.rotation.set(0, 0, 0); ch.userData.body.position.y = 0.55; }
function walk(ch, t, amp) { amp = amp == null ? 1 : amp; const a = ch.userData.arms, s = Math.sin(t * 9) * 0.5 * amp; a.L.rotation.set(s, 0, -0.14); a.R.rotation.set(-s, 0, 0.14); ch.userData.body.position.y = 0.55 + Math.abs(Math.sin(t * 9)) * 0.05 * amp; }
function face(ch, dx, dz) { ch.rotation.y = Math.atan2(dx, dz); }
function armUp(ch, side, k, x) { const a = ch.userData.arms[side]; a.rotation.set(x || 0, 0, (side === 'R' ? 1 : -1) * (0.14 + 2.3 * k)); }
function armFwd(ch, side, k) { const a = ch.userData.arms[side]; a.rotation.set(-1.4 * k, 0, side === 'R' ? 0.14 : -0.14); }

/* props */
function softSprite(c, a, add) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const x = cv.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  return new T.Sprite(new T.SpriteMaterial({ map: new T.CanvasTexture(cv), transparent: true, depthWrite: false, opacity: a == null ? 1 : a, blending: add === false ? T.NormalBlending : T.AdditiveBlending }));
}
function label(txt, o) { const sp = FK.label(T, txt, o); sp.material.fog = false; return sp; }
/* flat canvas card: lines = [[text, px, color, weight], ...] */
function card(lines, w, h, o) {
  o = o || {}; const cv = document.createElement('canvas'), R = 256; cv.width = Math.round(R * w); cv.height = Math.round(R * h); const x = cv.getContext('2d');
  x.fillStyle = o.bg || '#efe6cf'; x.fillRect(0, 0, cv.width, cv.height);
  if (o.border) { x.strokeStyle = o.border; x.lineWidth = 10; x.strokeRect(12, 12, cv.width - 24, cv.height - 24); }
  let y = o.top || cv.height * 0.2;
  for (const l of lines) { x.font = (l[3] || 800) + ' ' + l[1] + 'px Kanit,serif'; x.fillStyle = l[2] || '#2a2018'; x.textAlign = 'center'; x.textBaseline = 'middle'; if (l[0] === '—') { x.fillStyle = 'rgba(40,30,20,.35)'; for (let k = 0; k < 4; k++) x.fillRect(cv.width * 0.12, y + k * 26, cv.width * 0.76, 10); y += 110; continue; } x.fillText(l[0], cv.width / 2, y); y += l[1] * 1.25; }
  const tex = new T.CanvasTexture(cv); const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ map: tex, side: T.DoubleSide, transparent: !!o.transparent }));
  m.material.fog = false; return m;
}
function coffin(c) {
  const g = new T.Group(), col = c || '#5a3a24';
  const shape = new T.Shape([[-0.5, 0], [-0.62, 1.4], [-0.38, 2.0], [0.38, 2.0], [0.62, 1.4], [0.5, 0]].map((p) => new T.Vector2(p[0], p[1])));
  const box = mk(new T.ExtrudeGeometry(shape, { depth: 0.55, bevelEnabled: false }), col); box.rotation.x = -Math.PI / 2; box.position.set(0, 0, 0); g.add(box);
  const inner = mk(new T.ExtrudeGeometry(new T.Shape([[-0.42, 0.08], [-0.53, 1.38], [-0.33, 1.92], [0.33, 1.92], [0.53, 1.38], [0.42, 0.08]].map((p) => new T.Vector2(p[0], p[1]))), { depth: 0.1, bevelEnabled: false }), '#2a1a12'); inner.rotation.x = -Math.PI / 2; inner.position.y = 0.47; g.add(inner);
  const lidP = new T.Group(); lidP.position.set(0.55, 0.56, 0); g.add(lidP);
  const lid = mk(new T.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: false }), '#6a4630'); lid.rotation.x = -Math.PI / 2; lid.position.x = -0.55; lidP.add(lid);
  const cross = mk(new T.BoxGeometry(0.08, 0.02, 0.7), '#c9a46a'); cross.position.set(0, 0.09, -1.2); lid.add(cross); cross.rotation.x = Math.PI / 2;
  g.userData.lid = lidP; return g; /* body length along -z from 0 to -2 */
}
function stake() { const g = new T.Group(); const s = mk(new T.CylinderGeometry(0.07, 0.01, 1.3, 6), '#9a6a3a'); s.position.y = 0.65; g.add(s); const h = mk(new T.CylinderGeometry(0.11, 0.11, 0.12, 8), '#7a5030'); h.position.y = 1.32; g.add(h); return g; }
function fire(s) { const g = new T.Group(); const f = new T.Mesh(new T.ConeGeometry(0.35, 0.9, 6), basic('#ffb347')); f.position.y = 0.45; const f2 = new T.Mesh(new T.ConeGeometry(0.2, 0.6, 6), basic('#fff0a0')); f2.position.y = 0.35; g.add(f, f2); for (let i = 0; i < 4; i++) { const l = mk(new T.CylinderGeometry(0.06, 0.06, 0.9, 5), '#5a3a1e'); l.rotation.z = Math.PI / 2; l.rotation.y = i * 0.8; l.position.y = 0.06; g.add(l); } const gl = softSprite('rgba(255,170,80,1)', 0.7); gl.scale.set(2.6, 2.6, 1); gl.position.y = 0.6; g.add(gl); g.userData.f = f; g.userData.f2 = f2; g.scale.setScalar(s || 1); return g; }
function tree(s, c) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.1, 0.14, 0.9, 5), '#5a3e2a'); tr.position.y = 0.45; g.add(tr); const f = mk(new T.IcosahedronGeometry(0.75, 0), c || '#2f5a46'); f.position.y = 1.35; f.scale.y = 1.15; g.add(f); g.scale.setScalar(s || 1); return g; }
function pine(s, c) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.08, 0.1, 0.5, 5), '#4a3426'); tr.position.y = 0.25; g.add(tr); for (let i = 0; i < 3; i++) { const cn = mk(new T.ConeGeometry(0.75 - i * 0.18, 0.8, 7), c || '#2e5446'); cn.position.y = 0.7 + i * 0.45; g.add(cn); } g.scale.setScalar(s || 1); return g; }
function deadTree(s) { const g = new T.Group(); const tr = mk(new T.CylinderGeometry(0.08, 0.16, 2.2, 5), '#3a2c2a'); tr.position.y = 1.1; g.add(tr); for (const [y, r, l] of [[1.5, 0.8, 0.9], [1.9, -0.9, 0.7], [1.1, -0.6, 0.6]]) { const b = mk(new T.CylinderGeometry(0.03, 0.06, l, 4), '#3a2c2a'); b.position.set(Math.sin(r) * l * 0.4, y + 0.2, 0); b.rotation.z = -r; g.add(b); } g.scale.setScalar(s || 1); return g; }
function hut(w, d, h, wall, roof) {
  const g = new T.Group(); const walls = mk(new T.BoxGeometry(w, h, d), wall || '#b89a74'); walls.position.y = h / 2; g.add(walls);
  const r = mk(new T.ConeGeometry(Math.max(w, d) * 0.82, h * 0.9, 4), roof || '#6a4a34'); r.rotation.y = Math.PI / 4; r.position.y = h + h * 0.44; r.scale.z = d / w; g.add(r);
  const dr = mk(new T.BoxGeometry(0.5, 0.9, 0.06), '#4a3020'); dr.position.set(0, 0.45, d / 2 + 0.03); g.add(dr);
  const win = new T.Mesh(new T.PlaneGeometry(0.4, 0.36), basic('#ffd27a')); win.position.set(w * 0.3, h * 0.62, d / 2 + 0.04); g.add(win); g.userData.win = win; return g;
}
function grave(c, kind) {
  const g = new T.Group(); const mound = mk(new T.SphereGeometry(0.6, 8, 5, 0, 6.283, 0, Math.PI / 2), '#4a3a2c'); mound.scale.set(0.8, 0.35, 1.5); mound.position.z = 0.7; g.add(mound);
  if (kind === 'stone') { const s = mk(new T.BoxGeometry(0.62, 0.8, 0.14), c || '#9a9aa6'); s.position.y = 0.4; g.add(s); const tp = mk(new T.CylinderGeometry(0.31, 0.31, 0.14, 12, 1, false, 0, Math.PI), c || '#9a9aa6'); tp.rotation.set(Math.PI / 2, Math.PI / 2, 0); tp.position.y = 0.8; g.add(tp); }
  else { const v = mk(new T.BoxGeometry(0.1, 0.9, 0.1), c || '#6a5040'); v.position.y = 0.45; const h = mk(new T.BoxGeometry(0.5, 0.1, 0.1), c || '#6a5040'); h.position.y = 0.66; g.add(v, h); }
  return g;
}
function castle() {
  const g = new T.Group(), st = '#4a4a62', st2 = '#3a3a52', rf = '#2a2440';
  const hill = mk(new T.ConeGeometry(7, 3.6, 9), '#2c3448'); hill.position.y = 1.8; hill.scale.z = 0.7; g.add(hill);
  const keep = mk(new T.BoxGeometry(3.2, 3.6, 2.4), st); keep.position.y = 5.2; g.add(keep);
  const kr = mk(new T.ConeGeometry(2.4, 1.8, 4), rf); kr.rotation.y = Math.PI / 4; kr.position.y = 7.9; kr.scale.z = 0.75; g.add(kr);
  for (const [x, z, h, r] of [[-2.2, 0.2, 5.4, 0.7], [2.2, 0.2, 4.6, 0.62], [-0.6, -1.4, 6.2, 0.5]]) {
    const tw = mk(new T.CylinderGeometry(r, r * 1.08, h, 8), st2); tw.position.set(x, 3.4 + h / 2 - 0.2, z); g.add(tw);
    const cn = mk(new T.ConeGeometry(r * 1.35, r * 2.4, 8), rf); cn.position.set(x, 3.4 + h - 0.2 + r * 1.2, z); g.add(cn);
  }
  const wins = []; for (const [x, y] of [[-0.7, 5.6], [0.7, 5.6], [0, 4.4], [-2.2, 6.6], [2.2, 6.0]]) { const w = new T.Mesh(new T.PlaneGeometry(0.34, 0.5), basic('#ffcf6a')); w.position.set(x, y, x === -2.2 || x === 2.2 ? 0.92 : 1.22); g.add(w); wins.push(w); }
  g.userData.wins = wins; return g;
}
function bat(s, c) {
  const g = new T.Group(); const b = mk(new T.SphereGeometry(0.16, 8, 6), c || '#2a2230'); b.scale.y = 1.2; g.add(b);
  const hd = mk(new T.SphereGeometry(0.11, 8, 6), c || '#2a2230'); hd.position.y = 0.2; g.add(hd);
  for (const sd of [-1, 1]) { const e = mk(new T.ConeGeometry(0.04, 0.12, 4), c || '#2a2230'); e.position.set(sd * 0.06, 0.32, 0); g.add(e); const ey = new T.Mesh(new T.SphereGeometry(0.025, 6, 4), basic('#ffd25a')); ey.position.set(sd * 0.045, 0.22, 0.09); g.add(ey); }
  const wings = [];
  for (const sd of [-1, 1]) { const p = new T.Group(); p.position.set(sd * 0.12, 0.05, 0); const shp = new T.Shape([[0, 0.12], [0.55, 0.22], [0.5, -0.05], [0.36, 0.02], [0.24, -0.12], [0.1, -0.02]].map((q) => new T.Vector2(q[0] * sd, q[1]))); const w = mk(new T.ShapeGeometry(shp), c || '#3a2c40', { side: T.DoubleSide }); p.add(w); g.add(p); wings.push(p); }
  g.userData.wings = wings; g.scale.setScalar(s || 1); return g;
}
function flap(b, t, sp) { const a = Math.sin(t * (sp || 18)) * 0.9; b.userData.wings[0].rotation.y = a; b.userData.wings[1].rotation.y = -a; }
function moon(r) { const g = new T.Group(); const m = new T.Mesh(new T.SphereGeometry(r || 2, 20, 14), basic('#fff3c4')); g.add(m); const gl = softSprite('rgba(255,240,190,1)', 0.5); gl.scale.set((r || 2) * 5, (r || 2) * 5, 1); g.add(gl); m.material.fog = false; gl.material.fog = false; return g; }
function slab(w, d, top, soil) {
  const g = new T.Group(); const t = mk(new T.BoxGeometry(w, 0.5, d), top || '#3e5a48'); t.position.y = -0.25; g.add(t);
  const s = mk(new T.CylinderGeometry(Math.max(w, d) * 0.62, Math.max(w, d) * 0.3, 3.2, 8), soil || '#4a3a30'); s.scale.set(w / Math.max(w, d), 1, d / Math.max(w, d)); s.rotation.y = Math.PI / 8; s.position.y = -2.1; g.add(s);
  g.userData.top = t; return g;
}
function book(title, col, w) { const g = new T.Group(); w = w || 1; const b = mk(new T.BoxGeometry(w, 0.2, w * 1.35), col || '#7a2030'); g.add(b); const c = card([[title, 70, '#ffe7a0', 800]], w * 0.9, w * 1.2, { bg: col || '#7a2030', top: 150 }); c.rotation.x = -Math.PI / 2; c.position.y = 0.11; g.add(c); return g; }
function candle() { const g = new T.Group(); const c = mk(new T.CylinderGeometry(0.06, 0.06, 0.35, 8), '#f4ecd8'); c.position.y = 0.17; g.add(c); const f = softSprite('rgba(255,200,110,1)', 1); f.scale.set(0.3, 0.45, 1); f.position.y = 0.45; g.add(f); const gl = softSprite('rgba(255,180,90,1)', 0.35); gl.scale.set(3, 3, 1); gl.position.y = 0.45; g.add(gl); g.userData.f = f; return g; }
function garlic() { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.2, 10, 8), '#f3eee2'); b.scale.y = 0.85; g.add(b); const tp = mk(new T.ConeGeometry(0.07, 0.2, 6), '#e7dfc8'); tp.position.y = 0.22; g.add(tp); for (let i = 0; i < 5; i++) { const l = mk(new T.BoxGeometry(0.02, 0.3, 0.02), '#d8cfb6'); l.position.set(Math.cos(i) * 0.12, 0.08, Math.sin(i) * 0.12); g.add(l); } return g; }
function bloodBag() { const g = new T.Group(); const b = mk(new T.BoxGeometry(0.5, 0.7, 0.12), '#d0283c', { transparent: true, opacity: 0.92, emissive: new T.Color('#5a0a14'), emissiveIntensity: 0.3 }); b.position.y = 0.35; g.add(b); const lab = new T.Mesh(new T.PlaneGeometry(0.34, 0.22), basic('#ffffff')); lab.position.set(0, 0.35, 0.065); g.add(lab); const tb = mk(new T.CylinderGeometry(0.02, 0.02, 0.3, 5), '#e8e8f0'); tb.position.y = 0.85; g.add(tb); return g; }
function drop(c) { const g = new T.Group(); const s = new T.Mesh(new T.SphereGeometry(0.12, 10, 8), basic(c || BLOODC)); const cn = new T.Mesh(new T.ConeGeometry(0.105, 0.2, 10), basic(c || BLOODC)); cn.position.y = 0.13; g.add(s, cn); return g; }
