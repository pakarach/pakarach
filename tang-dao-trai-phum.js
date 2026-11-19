(function () {
/* ===== RuNgee: มนุษย์ต่างดาวตามคติพุทธ — part 1: helpers + models ===== */
const T = THREE, U = VE.u, P = FK.pal;
const GOLD = P.gold, TEAL = P.teal, CORAL = P.coral, VIO = P.violet, WHITE = '#ffffff';
const clamp = U.clamp, lerp = U.lerp, eIO = U.easeIO, eOut = U.easeOut, eBack = U.easeBack;
const seg = (t, a, b) => clamp((t - a) / (b - a));
const fr = (x) => x - Math.floor(x);
const hash = (i) => fr(Math.sin(i * 12.9898 + 78.233) * 43758.5453);
const PI = Math.PI, TAU = Math.PI * 2;

const M = (c, o) => new T.MeshStandardMaterial(Object.assign({ color: c, flatShading: true, roughness: 0.72, metalness: 0.05 }, o || {}));
const EM = (c, i, o) => new T.MeshStandardMaterial(Object.assign({ color: c, emissive: c, emissiveIntensity: i == null ? 0.8 : i, flatShading: true, roughness: 0.45, metalness: 0.2 }, o || {}));
const BM = (c, o) => new T.MeshBasicMaterial(Object.assign({ color: c }, o || {}));
function mesh(geo, mat, x, y, z) { const m = new T.Mesh(geo, mat); m.position.set(x || 0, y || 0, z || 0); m.castShadow = true; m.receiveShadow = true; return m; }
function grp(...kids) { const g = new T.Group(); kids.forEach((k) => g.add(k)); return g; }

/* radial glow texture (cached per colour) */
const _gt = {};
function glowTex(col) {
  if (_gt[col]) return _gt[col];
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  const gr = x.createRadialGradient(64, 64, 0, 64, 64, 64); const cc = new T.Color(col);
  const rgb = Math.round(cc.r * 255) + ',' + Math.round(cc.g * 255) + ',' + Math.round(cc.b * 255);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.18, 'rgba(' + rgb + ',0.9)'); gr.addColorStop(0.5, 'rgba(' + rgb + ',0.28)'); gr.addColorStop(1, 'rgba(' + rgb + ',0)');
  x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
  return (_gt[col] = new T.CanvasTexture(c));
}
function glow(col, size, op) {
  const s = new T.Sprite(new T.SpriteMaterial({ map: glowTex(col), transparent: true, opacity: op == null ? 1 : op, depthWrite: false, blending: T.AdditiveBlending, fog: false }));
  s.scale.set(size, size, 1); return s;
}
/* star texture */
let _star = null;
function starTex() {
  if (_star) return _star;
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  x.translate(64, 64); x.fillStyle = GOLD; x.strokeStyle = 'rgba(10,12,30,.9)'; x.lineWidth = 8; x.beginPath();
  for (let i = 0; i < 10; i++) { const r = i % 2 ? 22 : 54, a = -PI / 2 + i * PI / 5; x.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  x.closePath(); x.stroke(); x.fill();
  return (_star = new T.CanvasTexture(c));
}
function starSprite(size) { const s = new T.Sprite(new T.SpriteMaterial({ map: starTex(), transparent: true, depthTest: false, fog: false })); s.scale.set(size, size, 1); s.renderOrder = 12; return s; }
function label(txt, w, col, px) { const s = FK.label(T, txt, { w: w || 3, color: col || '#fff', px: px || 92 }); s.material.fog = false; return s; }
function setOp(o, a) { o.visible = a > 0.01; o.traverse((k) => { if (k.material) { k.material.transparent = true; k.material.opacity = a * (k.userData.op0 == null ? 1 : k.userData.op0); } }); }
function markOp(o) { o.traverse((k) => { if (k.material) k.userData.op0 = k.material.opacity; }); }

/* ---------- people ---------- */
const SKINS = ['#f2c9a2', '#e2ad7f', '#c98f63', '#ffdcbc', '#d9a074'];
function makeHead(kind, sk, o) {
  o = o || {}; const g = new T.Group(), skin = M(sk), dark = M('#1d1b2c'), hairM = M(o.hair || '#2b2236');
  let fz = 0.155, ey = 0.02, my = -0.08, ex = 0.06;
  if (kind === 'round') { g.add(mesh(new T.SphereGeometry(0.2, 12, 9), skin)); fz = 0.185; ex = 0.07; ey = 0.03; g.add(mesh(new T.SphereGeometry(0.205, 12, 6, 0, TAU, 0, 1.1), hairM)); }
  else if (kind === 'square') { g.add(mesh(new T.BoxGeometry(0.36, 0.36, 0.3), skin)); fz = 0.152; ex = 0.08; ey = 0.04; g.add(mesh(new T.BoxGeometry(0.38, 0.09, 0.32), hairM, 0, 0.17, 0)); }
  else if (kind === 'half') {
    const hg = new T.CylinderGeometry(0.22, 0.22, 0.3, 16, 1, false, -PI / 2, PI); hg.rotateX(PI / 2); hg.translate(0, 0.08, 0);
    g.add(mesh(hg, skin)); const lid = new T.PlaneGeometry(0.44, 0.3); lid.rotateX(-PI / 2); g.add(mesh(lid, skin, 0, 0.081, 0));
    g.add(mesh(new T.BoxGeometry(0.46, 0.06, 0.32), hairM, 0, 0.11, 0));
    fz = 0.152; ex = 0.075; ey = 0.0; my = -0.06;
  } else { const h = mesh(new T.SphereGeometry(0.17, 12, 9), skin); h.scale.set(1, 1.18, 1); g.add(h); g.add(mesh(new T.SphereGeometry(0.18, 12, 6, 0, TAU, 0, 1.15), hairM, 0, 0.03, -0.01)); fz = 0.16; }
  const eg = new T.SphereGeometry(0.026, 6, 5);
  g.add(mesh(eg, dark, -ex, ey, fz), mesh(eg, dark, ex, ey, fz));
  g.add(mesh(new T.BoxGeometry(0.07, 0.016, 0.01), M('#a2463e'), 0, my, fz + 0.002));
  if (o.crown) { const c = mesh(new T.CylinderGeometry(0.1, 0.16, 0.16, 6), EM(GOLD, 0.35), 0, 0.27, 0); g.add(c); g.add(mesh(new T.ConeGeometry(0.07, 0.22, 6), EM(GOLD, 0.35), 0, 0.44, 0)); }
  return g;
}
function person(o) {
  o = o || {}; const g = new T.Group(), sk = o.skin || SKINS[0];
  const shirt = M(o.shirt || TEAL), skin = M(sk), pants = M(o.pants || '#2a2f4a');
  const legG = new T.CylinderGeometry(0.07, 0.06, 0.42, 6); legG.translate(0, -0.21, 0);
  const lL = mesh(legG, pants, -0.09, 0.42, 0), lR = mesh(legG, pants, 0.09, 0.42, 0);
  const body = mesh(new T.CylinderGeometry(0.16, 0.22, 0.48, 8), shirt, 0, 0.66, 0);
  const armG = new T.CylinderGeometry(0.05, 0.045, 0.38, 6); armG.translate(0, -0.19, 0);
  const aL = new T.Group(), aR = new T.Group(); aL.position.set(-0.22, 0.86, 0); aR.position.set(0.22, 0.86, 0);
  aL.add(mesh(armG, shirt)); aR.add(mesh(armG, shirt));
  const handG = new T.SphereGeometry(0.055, 6, 5); const hL = mesh(handG, skin, 0, -0.4, 0), hR = mesh(handG, skin, 0, -0.4, 0); aL.add(hL); aR.add(hR);
  const head = makeHead(o.head || 'oval', sk, o); head.position.y = 1.1; if (o.headScale) head.scale.setScalar(o.headScale);
  g.add(lL, lR, body, aL, aR, head);
  if (o.robe) { lL.visible = lR.visible = false; g.add(mesh(new T.ConeGeometry(0.3, 0.75, 8), shirt, 0, 0.38, 0)); }
  if (o.sash) g.add(mesh(new T.BoxGeometry(0.06, 0.5, 0.36), M(o.sash), 0.05, 0.7, 0));
  g.userData = { aL, aR, lL, lR, head, body, hL, hR };
  return g;
}
function walkPose(p, ph, amp) { const u = p.userData, s = Math.sin(ph) * (amp == null ? 0.6 : amp); u.lL.rotation.x = s; u.lR.rotation.x = -s; u.aL.rotation.x = -s * 0.8; u.aR.rotation.x = s * 0.8; }

/* seated monk (orange robe) */
function monk(sk) {
  const g = new T.Group(), robe = M('#e8832a'), skin = M(sk || SKINS[1]);
  g.add(mesh(new T.CylinderGeometry(0.22, 0.42, 0.4, 8), robe, 0, 0.2, 0));
  g.add(mesh(new T.CylinderGeometry(0.15, 0.22, 0.36, 8), robe, 0, 0.55, 0));
  g.add(mesh(new T.SphereGeometry(0.15, 10, 8), skin, 0, 0.86, 0));
  return g;
}

/* ---------- animals ---------- */
function elephant(o) {
  o = o || {}; const g = new T.Group(), c = M(o.color || '#f3efe6'), pink = M(o.pink || '#e9b8ad'), ivory = M('#fffaf0');
  const body = mesh(new T.SphereGeometry(0.62, 10, 8), c, 0, 1.05, 0); body.scale.set(1.35, 0.95, 0.92); g.add(body);
  const head = new T.Group(); head.position.set(0.85, 1.3, 0); g.add(head);
  head.add(mesh(new T.SphereGeometry(0.4, 10, 8), c));
  const earG = new T.CylinderGeometry(0.34, 0.34, 0.04, 9); earG.rotateX(PI / 2);
  const e1 = mesh(earG, pink, -0.12, 0.02, 0.36), e2 = mesh(earG, pink, -0.12, 0.02, -0.36); e1.rotation.y = 0.5; e2.rotation.y = -0.5; head.add(e1, e2);
  const tr = new T.Group(); tr.position.set(0.32, -0.12, 0); head.add(tr);
  let parent = tr; for (let i = 0; i < 4; i++) { const sgm = new T.Group(); sgm.position.set(i ? 0 : 0, i ? -0.2 : 0, 0); const cg = new T.CylinderGeometry(0.1 - i * 0.017, 0.11 - i * 0.017, 0.22, 6); cg.translate(0, -0.11, 0); sgm.add(mesh(cg, c)); sgm.rotation.z = 0.18; parent.add(sgm); parent = sgm; }
  const tg = new T.ConeGeometry(0.045, 0.42, 6); tg.rotateZ(-PI / 2 - 0.5);
  head.add(mesh(tg, ivory, 0.3, -0.24, 0.16), mesh(tg, ivory, 0.3, -0.24, -0.16));
  head.add(mesh(new T.SphereGeometry(0.04, 5, 4), M('#1d1b2c'), 0.3, 0.08, 0.26), mesh(new T.SphereGeometry(0.04, 5, 4), M('#1d1b2c'), 0.3, 0.08, -0.26));
  const legG = new T.CylinderGeometry(0.15, 0.14, 0.72, 7); legG.translate(0, -0.36, 0); const legs = [];
  [[0.5, 0.3], [0.5, -0.3], [-0.5, 0.3], [-0.5, -0.3]].forEach(([x, z]) => { const l = mesh(legG, c, x, 0.78, z); g.add(l); legs.push(l); l.add(mesh(new T.CylinderGeometry(0.16, 0.16, 0.06, 7), pink, 0, -0.7, 0)); });
  g.add(mesh(new T.CylinderGeometry(0.02, 0.03, 0.5, 4), c, -0.85, 0.95, 0));
  if (o.cloth) { const cl = mesh(new T.BoxGeometry(0.9, 0.06, 1.25), M(o.cloth), 0, 1.62, 0); g.add(cl); g.add(mesh(new T.BoxGeometry(0.92, 0.5, 0.04), M(o.cloth), 0, 1.38, 0.63), mesh(new T.BoxGeometry(0.92, 0.5, 0.04), M(o.cloth), 0, 1.38, -0.63)); }
  g.userData = { legs, trunk: tr, head };
  return g;
}
function horse(o) {
  o = o || {}; const g = new T.Group(), w = M(o.color || '#f6f4ef'), bk = M(o.head || '#15151c');
  const body = mesh(new T.SphereGeometry(0.42, 10, 7), w, 0, 1.0, 0); body.scale.set(1.5, 0.8, 0.72); g.add(body);
  const neck = mesh(new T.CylinderGeometry(0.13, 0.2, 0.62, 7), w, 0.62, 1.32, 0); neck.rotation.z = -0.62; g.add(neck);
  const head = mesh(new T.BoxGeometry(0.5, 0.2, 0.2), bk, 0.92, 1.55, 0); head.rotation.z = -0.5; g.add(head);
  g.add(mesh(new T.ConeGeometry(0.05, 0.14, 4), bk, 0.84, 1.75, 0.06), mesh(new T.ConeGeometry(0.05, 0.14, 4), bk, 0.84, 1.75, -0.06));
  const mane = mesh(new T.BoxGeometry(0.5, 0.12, 0.06), bk, 0.55, 1.48, 0); mane.rotation.z = -0.62; g.add(mane);
  const legG = new T.CylinderGeometry(0.06, 0.05, 0.7, 6); legG.translate(0, -0.35, 0); const legs = [];
  [[0.42, 0.16], [0.42, -0.16], [-0.42, 0.16], [-0.42, -0.16]].forEach(([x, z]) => { const l = mesh(legG, w, x, 0.78, z); g.add(l); legs.push(l); });
  const tail = mesh(new T.ConeGeometry(0.08, 0.6, 5), bk, -0.72, 0.85, 0); tail.rotation.z = -0.5; g.add(tail);
  g.userData = { legs };
  return g;
}
function bird(o) {
  o = o || {}; const g = new T.Group(), c = M(o.color || '#6b4a2f'), lt = M(o.light || '#efe3c8');
  const b = mesh(new T.SphereGeometry(0.45, 9, 7), c); b.scale.set(0.75, 0.65, 1.6); g.add(b);
  g.add(mesh(new T.SphereGeometry(0.3, 9, 7), lt, 0, 0.2, 0.75));
  const bk = mesh(new T.ConeGeometry(0.09, 0.32, 5), M('#f2b632'), 0, 0.16, 1.12); bk.rotation.x = PI / 2 + 0.35; g.add(bk);
  g.add(mesh(new T.SphereGeometry(0.035, 5, 4), M('#111'), 0.12, 0.28, 0.98), mesh(new T.SphereGeometry(0.035, 5, 4), M('#111'), -0.12, 0.28, 0.98));
  const wg = new T.BoxGeometry(2.2, 0.06, 0.85); wg.translate(1.1, 0, 0);
  const wL = new T.Group(), wR = new T.Group(); wL.position.set(0.25, 0.12, 0.1); wR.position.set(-0.25, 0.12, 0.1);
  const m1 = mesh(wg, c); wL.add(m1); const m2 = mesh(wg, c); m2.rotation.y = PI; wR.add(m2);
  [0.6, 1.2, 1.8].forEach((x) => { wL.add(mesh(new T.BoxGeometry(0.4, 0.07, 0.3), lt, x, 0, -0.45)); const f = mesh(new T.BoxGeometry(0.4, 0.07, 0.3), lt, -x, 0, -0.45); wR.add(f); });
  g.add(wL, wR);
  const tail = mesh(new T.BoxGeometry(0.7, 0.05, 0.6), c, 0, 0, -0.95); g.add(tail);
  g.userData = { wL, wR };
  return g;
}

/* ---------- the wheel treasure (จักรแก้ว) ---------- */
function chakra(r) {
  const g = new T.Group(), gm = EM(GOLD, 0.9);
  g.add(mesh(new T.TorusGeometry(r, r * 0.07, 6, 56), gm));
  g.add(mesh(new T.TorusGeometry(r * 0.84, r * 0.025, 4, 56), gm));
  g.add(mesh(new T.TorusGeometry(r * 0.22, r * 0.05, 5, 24), gm));
  const hub = mesh(new T.SphereGeometry(r * 0.15, 10, 8), EM('#7fd8ff', 0.9)); g.add(hub);
  const pts = []; for (let i = 0; i < 1000; i++) { const a = (i / 1000) * TAU; pts.push(Math.cos(a) * r * 0.2, Math.sin(a) * r * 0.2, 0, Math.cos(a) * r * 0.97, Math.sin(a) * r * 0.97, 0); }
  const lg = new T.BufferGeometry(); lg.setAttribute('position', new T.Float32BufferAttribute(pts, 3));
  const spokes = new T.LineSegments(lg, new T.LineBasicMaterial({ color: '#ffe08a', transparent: true, opacity: 0.55, blending: T.AdditiveBlending, depthWrite: false }));
  g.add(spokes);
  for (let i = 0; i < 12; i++) { const s = mesh(new T.BoxGeometry(r * 0.76, r * 0.03, r * 0.03), gm); const a = (i / 12) * TAU; s.position.set(Math.cos(a) * r * 0.59, Math.sin(a) * r * 0.59, 0); s.rotation.z = a; g.add(s); }
  const gems = ['#ff5d73', '#2ee6c5', '#8f7bff', '#7fd8ff', '#ffffff', '#5dff8f', '#ff9d3a'];
  for (let i = 0; i < 28; i++) { const a = (i / 28) * TAU; g.add(mesh(new T.OctahedronGeometry(r * 0.06, 0), EM(gems[i % 7], 0.8), Math.cos(a) * r, Math.sin(a) * r, r * 0.05)); }
  const gl = glow('#ffd36b', r * 4.2, 0.85); g.add(gl);
  g.userData = { glow: gl, spokes };
  return g;
}

/* ---------- one world-system (จักรวาล) ---------- */
function shapeMesh(shape, depth, col, y) {
  const geo = new T.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 18 }); geo.rotateX(-PI / 2);
  const m = mesh(geo, M(col)); m.position.y = y || 0; return m;
}
function cosmos(o) {
  o = o || {}; const g = new T.Group(), R = 6;
  const sea = mesh(new T.CylinderGeometry(R, R, 0.4, 64), M('#1f4aa8', { roughness: 0.4 }), 0, -0.2, 0); g.add(sea);
  const surf = new T.RingGeometry(0.05, R - 0.04, 48, 8); surf.rotateX(-PI / 2);
  const sm = mesh(surf, M('#2f66d6', { roughness: 0.3, metalness: 0.15 }), 0, 0.01, 0); g.add(sm);
  const wall = mesh(new T.CylinderGeometry(R + 0.12, R + 0.12, o.wallH || 1.0, 64, 1, true), M('#6b7799', { side: T.DoubleSide }), 0, (o.wallH || 1) / 2 - 0.4 - (o.wallDrop || 0), 0); g.add(wall);
  for (let i = 0; i < 40; i++) { const a = (i / 40) * TAU, h = 0.35 + hash(i) * 0.3; g.add(mesh(new T.ConeGeometry(0.32, h, 4), M('#7d89ab'), Math.cos(a) * (R + 0.1), (o.wallH || 1) - 0.4 - (o.wallDrop || 0) + h / 2 - 0.05, Math.sin(a) * (R + 0.1))); }
  for (let k = 0; k < 7; k++) { const tor = new T.TorusGeometry(1.25 + k * 0.15, 0.05, 4, 40); tor.rotateX(PI / 2); g.add(mesh(tor, M(k % 2 ? '#c9a54a' : '#e7c76a'), 0, 0.06, 0)); }
  const mg = new T.BoxGeometry(1.4, 5, 1.4, 1, 1, 1); const pa = mg.attributes.position;
  for (let i = 0; i < pa.count; i++) if (pa.getY(i) > 0) { pa.setX(i, pa.getX(i) * 0.55); pa.setZ(i, pa.getZ(i) * 0.55); }
  mg.computeVertexNormals();
  const meru = new T.Mesh(mg, [M('#dfe4ee'), M('#9fe3ff'), M(GOLD), M('#3a3f55'), M('#3a7bff'), M('#ffc94a')]); meru.position.y = 2.5; meru.castShadow = true; g.add(meru);
  const pal = new T.Group(); pal.position.y = 5;
  pal.add(mesh(new T.BoxGeometry(0.8, 0.12, 0.8), EM(GOLD, 0.3)), mesh(new T.BoxGeometry(0.55, 0.22, 0.55), M('#fff3d6'), 0, 0.17, 0), mesh(new T.ConeGeometry(0.42, 0.3, 4), EM(CORAL, 0.25), 0, 0.42, 0), mesh(new T.ConeGeometry(0.08, 0.5, 6), EM(GOLD, 0.6), 0, 0.8, 0));
  g.add(pal);
  const C = {};
  const s1 = new T.Shape([new T.Vector2(-1.35, -2.55), new T.Vector2(1.35, -2.55), new T.Vector2(0.45, -4.95), new T.Vector2(-0.45, -4.95)]);
  C.S = shapeMesh(s1, 0.28, '#3fae6a');
  const s2 = new T.Shape([new T.Vector2(-1.1, 2.6), new T.Vector2(1.1, 2.6), new T.Vector2(1.1, 4.8), new T.Vector2(-1.1, 4.8)]);
  C.N = shapeMesh(s2, 0.28, '#cdbb52');
  const s3 = new T.Shape(); s3.absarc(3.75, 0, 1.15, 0, TAU, false); C.E = shapeMesh(s3, 0.28, '#d6dceb');
  const s4 = new T.Shape(); s4.absarc(-3.35, 0, 1.25, PI / 2, PI * 1.5, false); s4.lineTo(-3.35, 1.25); C.W = shapeMesh(s4, 0.28, '#8fd6ff');
  for (const k in C) g.add(C[k]);
  for (let i = 0; i < 12; i++) { const a = (i / 12) * TAU; g.add(mesh(new T.ConeGeometry(0.16, 0.5, 4), EM(GOLD, 0.2), Math.cos(a) * 1.45, 0.4, -3.7 + Math.sin(a) * 1.45)); }
  const isl = [[0, 3.7, 1.7], [3.75, 0, 1.6], [-3.6, 0, 1.6], [0, -3.75, 1.9]];
  let n = 0; for (const [cx, cz, rr] of isl) for (let i = 0; i < 6; i++) { const a = hash(++n) * TAU; g.add(mesh(new T.ConeGeometry(0.12, 0.22, 5), M('#5bbf7a'), cx + Math.cos(a) * rr, 0.08, -cz + Math.sin(a) * rr * 0.6)); }
  for (let i = 0; i < 9; i++) { const x = (hash(i + 40) - 0.5) * 1.2, z = 3.0 + hash(i + 60) * 1.1; if (i % 2) g.add(mesh(new T.BoxGeometry(0.16, 0.14, 0.16), M('#f3e3c0'), x, 0.35, z)); else { const tr = FK.tree(T, '#2fbf71'); tr.scale.setScalar(0.35); tr.position.set(x, 0.28, z); g.add(tr); } }
  const sun = grp(mesh(new T.SphereGeometry(0.34, 12, 9), EM('#ffcf4a', 1.2)), glow('#ffb63a', 2.6, 0.9));
  const moon = grp(mesh(new T.SphereGeometry(0.28, 12, 9), EM('#e9f1ff', 0.9)), glow('#cfe0ff', 1.9, 0.7));
  g.add(sun, moon);
  g.userData = { surf: sm, C, sun, moon, meru, pal };
  return g;
}
function animSea(m, t, amp) {
  const pa = m.geometry.attributes.position; if (!m.userData.y0) m.userData.y0 = Float32Array.from({ length: pa.count }, (_, i) => pa.getY(i));
  for (let i = 0; i < pa.count; i++) { const x = pa.getX(i), z = pa.getZ(i); pa.setY(i, m.userData.y0[i] + amp * (Math.sin(x * 1.3 + t * 1.6) + Math.cos(z * 1.1 - t * 1.3)) * 0.5); }
  pa.needsUpdate = true; m.geometry.computeVertexNormals();
}

/* ---------- v3 sci-fi pieces: floating worlds, space sky, rocket, fresnel glow ---------- */
const WCOL = { S: '#3fae6a', N: '#cdbb52', E: '#d6dceb', W: '#8fd6ff' }, WGL = { S: '#5dffa0', N: '#ffd36b', E: '#e6ecff', W: '#8fd6ff' };
function worldShape(kind, s) {
  s = s || 1; const sh = new T.Shape();
  if (kind === 'S') { sh.moveTo(-1.35 * s, 1.2 * s); sh.lineTo(1.35 * s, 1.2 * s); sh.lineTo(0.45 * s, -1.2 * s); sh.lineTo(-0.45 * s, -1.2 * s); sh.closePath(); }
  else if (kind === 'N') { sh.moveTo(-1.1 * s, -1.1 * s); sh.lineTo(1.1 * s, -1.1 * s); sh.lineTo(1.1 * s, 1.1 * s); sh.lineTo(-1.1 * s, 1.1 * s); sh.closePath(); }
  else if (kind === 'E') sh.absarc(0, 0, 1.15 * s, 0, TAU, false);
  else { sh.absarc(0.3 * s, 0, 1.25 * s, PI / 2, PI * 1.5, false); sh.lineTo(0.3 * s, 1.25 * s); }
  return sh;
}
function makeWorld(kind, o) {
  o = o || {}; const g = new T.Group(), under = new T.Group(); g.add(under);
  const top = shapeMesh(worldShape(kind), 0.3, WCOL[kind]); g.add(top);
  const rk = ['#8a7a6a', '#6a5c50', '#4e443c'];
  [0.88, 0.64, 0.36].forEach((sc, i) => under.add(shapeMesh(worldShape(kind, sc), 0.44, rk[i], -0.44 * (i + 1))));
  const dec = new T.Group(); dec.position.y = 0.3; g.add(dec);
  const tree = (x, z, s, c) => { const tr = FK.tree(T, c || '#2fbf71'); tr.scale.setScalar(s || 0.32); tr.position.set(x, 0, z); dec.add(tr); };
  const box = (x, z, c) => dec.add(mesh(new T.BoxGeometry(0.16, 0.14, 0.16), M(c || '#f3e3c0'), x, 0.07, z));
  if (kind === 'S') { [[-0.6, 0.6], [0.55, 0.7], [0, -0.3], [-0.2, -0.8], [0.75, 0.2]].forEach(([x, z]) => tree(x, z)); [[-0.2, 0.3], [0.3, -0.1], [-0.75, 0.15]].forEach(([x, z]) => box(x, z)); }
  if (kind === 'E') { for (let i = 0; i < 7; i++) { const a = (i / 7) * TAU; box(Math.cos(a) * 0.72, Math.sin(a) * 0.72, '#eef2fb'); } tree(0, 0, 0.38, '#3fbf6a'); tree(0.32, -0.3, 0.28, '#3fbf6a'); }
  if (kind === 'W') { [[-0.5, -0.4], [-0.4, 0.5], [-0.85, 0.05]].forEach(([x, z]) => dec.add(mesh(new T.SphereGeometry(0.14, 8, 5, 0, TAU, 0, PI / 2), M('#bfe8ff', { metalness: 0.3 }), x, 0, z))); [[-0.2, -0.95], [-0.2, 0.95], [-1.0, -0.6], [-1.0, 0.6]].forEach(([x, z]) => { const c = mesh(new T.OctahedronGeometry(0.12, 0), EM('#bfefff', 0.4), x, 0.12, z); c.scale.y = 1.7; dec.add(c); }); tree(0.0, 0.1, 0.3, '#3aa36a'); }
  if (kind === 'N') { const pts = []; for (let i = 0; i < 5; i++) pts.push([-0.9 + i * 0.45, -0.92]); for (let i = 0; i < 3; i++) pts.push([-0.92, -0.45 + i * 0.5], [0.92, -0.45 + i * 0.5]); pts.forEach(([x, z], i) => dec.add(mesh(new T.ConeGeometry(0.17, 0.3 + hash(i) * 0.2, 5), EM(GOLD, 0.25, { metalness: 0.4 }), x, 0.17, z))); tree(-0.2, 0.2, 0.32); tree(0.3, 0.5, 0.3); tree(0.25, -0.2, 0.36, '#4fd081'); }
  const atm = glow(WGL[kind], o.gs || 5.0, 0.26); atm.position.y = 0.1; g.add(atm);
  g.userData = { under, top, atm, dec, kind };
  return g;
}
function spaceSky(g, list, o) {
  o = o || {}; const n = o.n == null ? 900 : o.n, R = o.R || 220, p = [];
  for (let i = 0; i < n; i++) { const u = hash(i * 3 + 7) * 2 - 1, a = hash(i * 5 + 11) * TAU, r = Math.sqrt(1 - u * u); p.push(r * Math.cos(a) * R, u * R, r * Math.sin(a) * R); }
  let stars = null;
  if (n) { const sg = new T.BufferGeometry(); sg.setAttribute('position', new T.Float32BufferAttribute(p, 3)); stars = new T.Points(sg, new T.PointsMaterial({ color: '#e6eeff', size: o.size || 2.4, sizeAttenuation: false, transparent: true, opacity: 0.9, depthWrite: false, fog: false })); g.add(stars); }
  const worlds = (list || []).map(([k, x, y, z, s, ry]) => { const w = makePlanet(k, 1.3); w.scale.setScalar(s); w.position.set(x, y, z); w.rotation.y = ry || 0; w.traverse((c) => { c.castShadow = false; c.receiveShadow = false; }); g.add(w); return w; });
  (o.neb || []).forEach(([x, y, z, s, c, op]) => { const nb = glow(c, s, op); nb.position.set(x, y, z); g.add(nb); });
  return { stars, worlds };
}
function fresnelMat(col, op, pw, side) {
  return new T.ShaderMaterial({
    uniforms: { c: { value: new T.Color(col) }, o: { value: op }, p: { value: pw || 2.4 } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }',
    fragmentShader: 'uniform vec3 c; uniform float o; uniform float p; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), p); gl_FragColor = vec4(c, f * o); }',
    transparent: true, depthWrite: false, blending: T.AdditiveBlending, side: side == null ? T.DoubleSide : side,
  });
}
function rocket() {
  const g = new T.Group();
  const body = mesh(new T.CylinderGeometry(0.12, 0.14, 0.6, 10), M('#f4f6fb')); body.rotation.z = -PI / 2; g.add(body);
  const nose = mesh(new T.ConeGeometry(0.12, 0.28, 10), EM(CORAL, 0.3)); nose.rotation.z = -PI / 2; nose.position.x = 0.44; g.add(nose);
  for (let i = 0; i < 3; i++) { const a = (i / 3) * TAU, f = mesh(new T.BoxGeometry(0.18, 0.16, 0.02), EM(CORAL, 0.2)); f.position.set(-0.24, Math.cos(a) * 0.16, Math.sin(a) * 0.16); f.rotation.x = a; g.add(f); }
  g.add(mesh(new T.SphereGeometry(0.05, 8, 6), EM('#7fd8ff', 0.8), 0.1, 0, 0.12));
  const fl = glow('#ffb63a', 0.8, 0.9); fl.position.x = -0.45; g.add(fl);
  g.userData = { fl }; return g;
}
function lowPlanet(R, det, cols, seed) {
  const geo = new T.IcosahedronGeometry(R, det).toNonIndexed(), pa = geo.attributes.position, n = pa.count, col = new Float32Array(n * 3), c = new T.Color(), f = 6 / R;
  for (let i = 0; i < n; i += 3) {
    const cx = (pa.getX(i) + pa.getX(i + 1) + pa.getX(i + 2)) / 3, cy = (pa.getY(i) + pa.getY(i + 1) + pa.getY(i + 2)) / 3, cz = (pa.getZ(i) + pa.getZ(i + 1) + pa.getZ(i + 2)) / 3;
    const v = Math.sin(cx * f * 3.1 + seed) * Math.cos(cz * f * 2.7) + Math.sin(cy * f * 2.1 + cx * f * 1.3) * 0.8 + (hash(i * 0.37 + seed) - 0.5) * 0.45;
    c.set(v > 0.45 ? cols[0] : v > -0.05 ? cols[1] : v > -0.55 ? cols[2] : cols[3]);
    for (let k = 0; k < 3; k++) col.set([c.r, c.g, c.b], (i + k) * 3);
  }
  geo.setAttribute('color', new T.BufferAttribute(col, 3));
  const m = new T.Mesh(geo, new T.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.85 })); return m;
}

function lowCap(R, th, sw, sh, cols, seed) {
  const geo = new T.SphereGeometry(R, sw, sh, 0, TAU, 0, th).toNonIndexed(), pa = geo.attributes.position, n = pa.count, col = new Float32Array(n * 3), c = new T.Color();
  for (let i = 0; i < n; i += 3) {
    const cx = (pa.getX(i) + pa.getX(i + 1) + pa.getX(i + 2)) / 3, cz = (pa.getZ(i) + pa.getZ(i + 1) + pa.getZ(i + 2)) / 3;
    const v = Math.sin(cx * 0.019 + seed) * Math.cos(cz * 0.016) + Math.sin(cx * 0.009 + cz * 0.012 + seed * 2) * 0.8 + (hash(i * 0.37 + seed) - 0.5) * 0.5;
    c.set(v > 0.5 ? cols[0] : v > 0.0 ? cols[1] : v > -0.6 ? cols[2] : cols[3]);
    for (let k = 0; k < 3; k++) col.set([c.r, c.g, c.b], (i + k) * 3);
  }
  geo.setAttribute('color', new T.BufferAttribute(col, 3));
  return new T.Mesh(geo, new T.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.85 }));
}

const PCOL = { S: ['#5fbf6a', '#3f9a55', '#2f66d6', '#1f4aa8'], E: ['#ffffff', '#e3e8f5', '#c2cbe0', '#9aa6c4'], W: ['#d8f6ff', '#8fd6ff', '#4fa8e0', '#2f6ab8'], N: ['#ffe08a', '#e8c14a', '#7fbf5a', '#c99a2a'] };
function makePlanet(kind, R, o) {
  R = R || 1.3; o = o || {}; const g = new T.Group();
  const body = lowPlanet(R, o.det || 4, PCOL[kind], { S: 1.3, E: 2.1, W: 3.7, N: 5.2 }[kind]); body.castShadow = !o.big; body.receiveShadow = true; g.add(body);
  if (kind === 'W' && !o.big) { const sh = mesh(new T.SphereGeometry(R * 1.02, 24, 16, 0, PI), BM('#0a1030', { transparent: true, opacity: 0.68, depthWrite: false })); sh.castShadow = false; sh.rotation.y = PI / 2; g.add(sh); }
  let ring = null;
  if (kind === 'N' && !o.big) { ring = new T.Group(); const tor = mesh(new T.TorusGeometry(R * 1.6, R * 0.045, 4, 72), EM(GOLD, 0.45, { metalness: 0.5 })); tor.rotation.x = PI / 2; ring.add(tor); for (let i = 0; i < 30; i++) { const a = (i / 30) * TAU; ring.add(mesh(new T.ConeGeometry(R * 0.07, R * (0.16 + hash(i) * 0.12), 5), EM(GOLD, 0.35, { metalness: 0.4 }), Math.cos(a) * R * 1.6, R * 0.08, Math.sin(a) * R * 1.6)); } ring.rotation.x = 0.32; ring.rotation.z = 0.12; g.add(ring); }
  const atm = new T.Mesh(new T.SphereGeometry(R * (o.big ? 1.05 : 1.09), o.big ? 96 : 32, o.big ? 48 : 20), fresnelMat(WGL[kind], o.big ? 0.8 : 0.95, o.big ? 3 : 2.2, o.big ? T.BackSide : T.FrontSide)); g.add(atm);
  let gl = null; if (!o.big) { gl = glow(WGL[kind], R * 4, 0.22); g.add(gl); }
  g.userData = { body, atm, gl, R, ring }; return g;
}
/* ===== part 2: scene builders ===== */
const GRID = { NX: 25, NZ: 40, SP: 14 };
GRID.X1 = GRID.NX * GRID.SP; GRID.Z1 = GRID.NZ * GRID.SP; GRID.X2 = GRID.X1 + 10; GRID.Z2 = GRID.Z1 + 10;
GRID.X3 = GRID.NX * GRID.X2 + 300; GRID.Z3 = GRID.NZ * GRID.Z2 + 300;

function tileTex(kind) {
  const c = document.createElement('canvas'); c.width = 250; c.height = 400; const x = c.getContext('2d');
  x.fillStyle = 'rgba(0,0,0,0)'; x.fillRect(0, 0, 250, 400);
  for (let i = 0; i < 25; i++) for (let j = 0; j < 40; j++) {
    const cx = i * 10 + 5, cy = j * 10 + 5;
    if (kind === 1) { const g = x.createRadialGradient(cx, cy, 0, cx, cy, 4.6); g.addColorStop(0, 'rgba(210,240,255,1)'); g.addColorStop(0.55, 'rgba(70,170,255,.9)'); g.addColorStop(1, 'rgba(40,90,220,0)'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 4.6, 0, TAU); x.fill(); }
    else { x.fillStyle = 'rgba(80,190,255,.55)'; x.fillRect(i * 10 + 1, j * 10 + 1, 8, 8); x.fillStyle = 'rgba(220,245,255,.9)'; x.fillRect(i * 10 + 3, j * 10 + 3, 2, 2); x.fillRect(i * 10 + 6, j * 10 + 5, 2, 2); }
  }
  const t = new T.CanvasTexture(c); t.anisotropy = 4; return t;
}
function instGrid(geo, mat, N, place) {
  const im = new T.InstancedMesh(geo, mat, N), m4 = new T.Matrix4(); let k = 0;
  place((x, y, z, s) => { m4.makeScale(s || 1, s || 1, s || 1); m4.setPosition(x, y, z); im.setMatrixAt(k++, m4); });
  im.instanceMatrix.needsUpdate = true; return im;
}
function buildSpace() {
  const g = new T.Group(), { NX, NZ, SP, X1, Z1, X2, Z2, X3, Z3 } = GRID, cx = 12, cz = 20, N = NX * NZ - 1;
  const hero = cosmos(); g.add(hero);
  const _hu = hero.userData, _keep = [_hu.meru, _hu.pal, _hu.sun, _hu.moon, ...Object.values(_hu.C)], diskParts = hero.children.filter((c) => !_keep.includes(c)); diskParts.forEach(markOp);
  const field = new T.Group(); g.add(field);
  const cells = (f) => { for (let i = 0; i < NX; i++) for (let j = 0; j < NZ; j++) if (!(i === cx && j === cz)) f(i - cx, j - cz); };
  const gS = new T.CylinderGeometry(6, 6, 0.4, 20); gS.translate(0, -0.2, 0);
  const gW = new T.CylinderGeometry(6.1, 6.1, 1, 20, 1, true); gW.translate(0, 0.1, 0);
  const gM = new T.ConeGeometry(0.75, 4.6, 4); gM.translate(0, 2.3, 0);
  const gL = new T.TorusGeometry(3.7, 0.75, 3, 10); gL.rotateX(PI / 2); gL.scale(1, 0.25, 1);
  const mk = (geo, mat) => instGrid(geo, mat, N, (put) => cells((i, j) => put(i * SP, 0, j * SP)));
  const inst = [mk(gS, EM('#2f66d6', 0.45)), mk(gW, M('#8a96b8', { side: T.DoubleSide })), mk(gM, EM(GOLD, 0.5)), mk(gL, M('#46b874'))];
  inst.forEach((m) => field.add(m));
  const pl1 = new T.PlaneGeometry(X1, Z1); pl1.rotateX(-PI / 2);
  const m2 = BM('#ffffff', { map: tileTex(1), transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false });
  const L2 = instGrid(pl1, m2, N, (put) => cells((i, j) => put(i * X2, 0, j * Z2))); field.add(L2);
  const pl2 = new T.PlaneGeometry(NX * X2, NZ * Z2); pl2.rotateX(-PI / 2);
  const m3 = BM('#ffffff', { map: tileTex(2), transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false });
  const L3 = instGrid(pl2, m3, N, (put) => cells((i, j) => put(i * X3, 0, j * Z3))); field.add(L3);
  const sp = []; for (let i = 0; i < 1800; i++) { const u = hash(i * 3 + 1) * 2 - 1, a = hash(i * 7 + 2) * TAU, r = Math.sqrt(1 - u * u); sp.push(r * Math.cos(a), Math.abs(u) * 0.9 + 0.1, r * Math.sin(a)); }
  const sg = new T.BufferGeometry(); sg.setAttribute('position', new T.Float32BufferAttribute(sp, 3));
  const stars = new T.Points(sg, new T.PointsMaterial({ color: '#cfe0ff', size: 2.2, sizeAttenuation: false, transparent: true, opacity: 0.8, depthWrite: false })); g.add(stars);
  const wheel = chakra(4); g.add(wheel);
  const pins = {}; for (const [k, x, z, c] of [['S', 0, 3.9, TEAL], ['N', 0, -3.7, '#fff'], ['E', 3.75, 0, '#fff'], ['W', -3.6, 0, '#fff']]) {
    const p = grp(mesh(new T.ConeGeometry(0.22, 0.6, 8), EM(c, 0.7)), glow(c, 1.4, 0.8)); p.children[0].rotation.x = PI; p.position.set(x, 1.3, z); const nm = { S: 'ชมพูทวีป (เรา)', N: 'เหนือ', E: 'ตะวันออก', W: 'ตะวันตก' }[k]; const lb = label(nm, k === 'S' ? 1.9 : 1.7, k === 'S' ? TEAL : '#ffffff', 96); lb.position.y = 0.72; p.add(lb); hero.add(p); pins[k] = p;
  }
  const stars3 = [0, 1, 2].map(() => { const s = starSprite(1.0); hero.add(s); return s; });
  const beam = mesh(new T.CylinderGeometry(0.65, 1.15, 9, 16, 1, true), BM('#ffe7a0', { transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide }), 0, 4.5, 3.8); beam.castShadow = false; hero.add(beam);
  const ele = elephant({ cloth: CORAL }); ele.scale.setScalar(0.85); hero.add(ele);
  const hor = horse(); hor.scale.setScalar(1.0); hero.add(hor);
  const rider1 = person({ shirt: GOLD, crown: true, head: 'oval' }); rider1.scale.setScalar(0.62); rider1.position.set(0, 1.62, 0); rider1.rotation.y = PI / 2; ele.add(rider1);
  const fwheel = chakra(0.7); hero.add(fwheel);
  const fking = person({ shirt: GOLD, crown: true }); fking.scale.setScalar(0.5); hero.add(fking);
  const boat = grp(mesh(new T.BoxGeometry(0.36, 0.08, 0.14), M('#8a5a36')), mesh(new T.PlaneGeometry(0.16, 0.22), M('#fffaf0', { side: T.DoubleSide }), 0, 0.15, 0)); boat.scale.setScalar(2.4); hero.add(boat);
  const mig = []; for (let i = 0; i < 9; i++) { const c = ['#e6ecff', '#8fd6ff', '#ffd36b'][i % 3], pp = person({ head: ['round', 'half', 'square'][i % 3], shirt: [CORAL, '#5b8cff', '#2fbf71', '#b58aff'][i % 4], skin: SKINS[i % 5] }); pp.scale.setScalar(0.42); const d = grp(glow(c, 1.0, 0.7), pp); d.children[0].position.y = 0.3; d.userData.p = pp; hero.add(d); mig.push(d); }
  const migL = [['วิเทหะ', 1.75, 1.1, 3.3, '#e6ecff'], ['อปรันตะ', -1.85, 1.1, 3.3, '#8fd6ff'], ['กุรุ', 0, 1.9, 4.5, GOLD]].map(([tx, x, y, z, c]) => { const l = label(tx, 1.7, c, 96); l.position.set(x, y, z); hero.add(l); return l; });
  const worlds = {}; ['S', 'E', 'W', 'N'].forEach((q) => { const w = makeWorld(q); w.visible = false; hero.add(w); worlds[q] = w; });
  const planets = {}; ['S', 'E', 'W', 'N'].forEach((q) => { const pl = makePlanet(q, 1.3); pl.visible = false; hero.add(pl); planets[q] = pl; });
  const orbit = mesh(new T.TorusGeometry(5.0, 0.03, 4, 140), BM('#9fc0ff', { transparent: true, opacity: 0, depthWrite: false })); orbit.rotation.x = PI / 2; orbit.position.y = 0.9; orbit.castShadow = false; hero.add(orbit);
  const core = glow('#ffd36b', 9, 0); core.position.y = 2.6; hero.add(core);
  const rk = rocket(); rk.scale.setScalar(1.7); rk.visible = false; hero.add(rk);
  return { g, hero, field, inst, L2, L3, stars, wheel, pins, stars3, beam, ele, hor, fwheel, fking, boat, mig, migL, diskParts, worlds, planets, orbit, core, rk };
}

function buildFaces() {
  const g = new T.Group();
  g.add(mesh(new T.BoxGeometry(9, 0.5, 7.5), M('#33416d'), 0, -0.25, 0));
  g.add(mesh(new T.BoxGeometry(8.6, 0.9, 3.2), M('#3d4d80'), 0, 0.45, -1.6));
  const defs = [
    ['E', 'round', -1.75, 0.9, -1.6, '#d6dceb', 'ตะวันออก · 100 ปี'],
    ['W', 'half', 1.75, 0.9, -1.6, '#8fd6ff', 'ตะวันตก · 400 ปี'],
    ['N', 'square', -1.75, 0, 1.6, '#e8cf5a', 'เหนือ · 1,000 ปี'],
    ['S', 'oval', 1.75, 0, 1.6, '#3fae6a', 'ใต้ (เรา) · ไม่แน่นอน'],
  ];
  const F = {};
  defs.forEach(([k, kind, x, y, z, col, txt], i) => {
    const holder = new T.Group(); holder.position.set(x, y, z); g.add(holder);
    holder.add(mesh(new T.CylinderGeometry(0.95, 1.05, 0.22, 10), M('#4b5c96'), 0, 0.11, 0));
    const p = person({ head: kind, shirt: col, skin: SKINS[i % 5], headScale: 1.7, hair: i === 2 ? '#3a2b1c' : '#2b2236' }); p.scale.setScalar(1.75); p.position.y = 0.22; holder.add(p);
    const gl = glow(col, 3.8, 0); gl.position.set(0, 2.2, -0.4); holder.add(gl);
    const lb = label(txt, 2.6, k === 'N' ? GOLD : '#fff', k === 'S' ? 68 : 84); lb.position.set(0, y > 0 ? 3.55 : 0.5, y > 0 ? 0 : 1.0); holder.add(lb); lb.visible = false;
    F[k] = { holder, p, gl, lb };
  });
  spaceSky(g, [], { n: 600, R: 200 });
  return { g, F };
}

function treeHouse(col) {
  const g = new T.Group();
  g.add(mesh(new T.CylinderGeometry(0.28, 0.4, 1.4, 7), M('#7a5236'), 0, 0.7, 0));
  const c = mesh(new T.IcosahedronGeometry(1.1, 0), M(col || '#36c26f'), 0, 2.0, 0); c.scale.set(1, 0.85, 1); g.add(c);
  g.add(mesh(new T.BoxGeometry(0.34, 0.55, 0.06), M('#4a2f1e'), 0, 0.42, 0.36));
  g.add(mesh(new T.BoxGeometry(0.26, 0.22, 0.06), EM('#ffe08a', 0.6), 0.45, 1.95, 0.85), mesh(new T.BoxGeometry(0.26, 0.22, 0.06), EM('#ffe08a', 0.6), -0.4, 2.1, 0.85));
  return g;
}
function buildUtk() {
  const g = new T.Group();
  g.add(mesh(new T.BoxGeometry(18, 0.6, 15), M('#5fbf6e'), 0, -0.3, -1.5));
  g.add(mesh(new T.BoxGeometry(18, 4.6, 15.2), M('#7a5a3a'), 0, -2.9, -1.5));
  g.add(mesh(new T.BoxGeometry(18, 4.4, 3), M('#7a5a3a'), 0, -2.9, 7.5));
  g.add(mesh(new T.BoxGeometry(18, 0.06, 1.0), M('#e2d2a6'), 0, 0.03, 1.8));
  g.add(mesh(new T.BoxGeometry(18, 0.08, 1.6), M('#f0dca0'), 0, 0.03, 5.2));
  const riv = new T.PlaneGeometry(18, 3, 30, 5); riv.rotateX(-PI / 2);
  const river = mesh(riv, M('#3ea3e8', { roughness: 0.25, metalness: 0.2, transparent: true, opacity: 0.88 }), 0, -0.05, 7.5); river.receiveShadow = true; river.castShadow = false; g.add(river);
  for (let i = 0; i < 26; i++) {
    const side = i % 3, f = hash(i + 5);
    const x = side === 0 ? -8.6 + f * 17.2 : side === 1 ? -8.7 : 8.7, z = side === 0 ? -8.7 : -8.5 + f * 13;
    const h = 1.2 + hash(i + 9) * 1.4; g.add(mesh(new T.ConeGeometry(0.9 + hash(i) * 0.4, h, 5), EM(GOLD, 0.18, { metalness: 0.45 }), x, h / 2, z));
  }
  const fcol = ['#ff7aa8', '#ffd84a', '#ffffff', '#b58aff', '#ff9a4a'];
  for (let i = 0; i < 70; i++) { const x = -8 + hash(i * 3) * 16, z = -8 + hash(i * 5 + 1) * 9.4; if (Math.abs(z - 1.8) < 0.7) continue; g.add(mesh(new T.SphereGeometry(0.07, 5, 4), M(fcol[i % 5]), x, 0.07, z)); }
  [[-7.3, -2.6], [7.2, -6.7], [7.3, -3.4], [0.4, -7.4], [-3.9, -7.2]].forEach(([x, z], i) => { const th = treeHouse(i % 2 ? '#2fbf71' : '#4fd081'); th.position.set(x, 0, z); g.add(th); });
  /* A rice field */
  const rice = new T.Group(); rice.position.set(-5, 0, -2); g.add(rice);
  rice.add(mesh(new T.BoxGeometry(4.2, 0.08, 3.0), M('#8a6a3c'), 0, 0.04, 0));
  const stalks = [], heads = [];
  for (let i = 0; i < 9; i++) for (let j = 0; j < 6; j++) {
    const s = mesh(new T.ConeGeometry(0.09, 0.9, 4), M('#7ccf4a'), -1.8 + i * 0.45, 0.45, -1.15 + j * 0.46); s.castShadow = false; rice.add(s); stalks.push(s);
    const hd = mesh(new T.SphereGeometry(0.08, 5, 4), M('#fff7dc'), s.position.x, 0.95, s.position.z); hd.scale.set(0.7, 1.4, 0.7); rice.add(hd); heads.push(hd);
  }
  /* B self-lighting stone stove */
  const stove = new T.Group(); stove.position.set(-1.5, 0, -3.5); g.add(stove);
  for (let i = 0; i < 3; i++) { const a = (i / 3) * TAU + 0.3; stove.add(mesh(new T.DodecahedronGeometry(0.22, 0), M('#9aa0b4'), Math.cos(a) * 0.32, 0.18, Math.sin(a) * 0.32)); }
  const pot = mesh(new T.CylinderGeometry(0.42, 0.32, 0.45, 10), EM(GOLD, 0.25, { metalness: 0.5 }), 0, 0.6, 0); stove.add(pot);
  stove.add(mesh(new T.CylinderGeometry(0.44, 0.44, 0.06, 10), EM(GOLD, 0.3, { metalness: 0.5 }), 0, 0.84, 0));
  const flames = []; for (let i = 0; i < 5; i++) { const fl = mesh(new T.ConeGeometry(0.1, 0.38, 5), EM(i % 2 ? '#ffb02e' : '#ff6a2a', 1.4), Math.cos(i * 1.3) * 0.12, 0.25, Math.sin(i * 1.3) * 0.12); fl.castShadow = false; stove.add(fl); flames.push(fl); }
  const fglow = glow('#ff8a2a', 1.6, 0); fglow.position.y = 0.35; stove.add(fglow);
  const steam = []; for (let i = 0; i < 4; i++) { const s = glow('#ffffff', 0.5, 0); stove.add(s); steam.push(s); }
  const cook = person({ head: 'square', shirt: '#ff8fb1', skin: SKINS[3] }); cook.position.set(0.95, 0, 0.2); cook.rotation.y = -1.6; stove.add(cook);
  /* C wish-granting tree */
  const kt = new T.Group(); kt.position.set(2.5, 0, -5); g.add(kt);
  kt.add(mesh(new T.CylinderGeometry(0.35, 0.55, 3.4, 8), M('#7a5236'), 0, 1.7, 0));
  [[0, 4.2, 0, 1.6], [1.1, 3.6, 0.3, 1.1], [-1.1, 3.7, 0.2, 1.15], [0.4, 4.9, -0.4, 1.05], [-0.6, 4.6, 0.6, 1.0], [0.2, 3.5, 1.0, 1.0]].forEach(([x, y, z, r]) => kt.add(mesh(new T.IcosahedronGeometry(r, 0), M('#2fbf71'), x, y, z)));
  const goods = [], gcol = [CORAL, VIO, TEAL, '#ffffff', '#ff9a4a'];
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * TAU, r = 1.35 + (i % 2) * 0.3, y = 3.1 + (i % 3) * 0.35; let it;
    if (i % 3 === 0) { it = mesh(new T.PlaneGeometry(0.34, 0.5), M(gcol[i % 5], { side: T.DoubleSide })); }
    else if (i % 3 === 1) { it = mesh(new T.TorusGeometry(0.14, 0.035, 5, 12), EM(GOLD, 0.6, { metalness: 0.6 })); }
    else { it = mesh(new T.SphereGeometry(0.14, 7, 5), M('#ff7a3a')); }
    it.position.set(Math.cos(a) * r, y, Math.sin(a) * r + 0.3); kt.add(it); goods.push(it);
  }
  const sparkle = []; for (let i = 0; i < 8; i++) { const s = glow('#fff2b0', 0.5, 0.0); kt.add(s); sparkle.push(s); }
  const getters = [person({ head: 'square', shirt: VIO, skin: SKINS[0] }), person({ head: 'square', shirt: '#ff9a4a', skin: SKINS[2], hair: '#5a3a24' })];
  getters[0].position.set(-0.9, 0, 1.6); getters[1].position.set(0.9, 0, 1.7); getters.forEach((p) => kt.add(p));
  const falling = [mesh(new T.PlaneGeometry(0.4, 0.55), M(CORAL, { side: T.DoubleSide })), mesh(new T.TorusGeometry(0.16, 0.04, 5, 12), EM(GOLD, 0.6))];
  falling.forEach((f) => kt.add(f));
  /* D dancers */
  const dance = new T.Group(); dance.position.set(5, 0, -0.6); g.add(dance);
  const dancers = []; for (let i = 0; i < 5; i++) { const p = person({ head: 'square', shirt: [CORAL, TEAL, VIO, GOLD, '#ff9a4a'][i], skin: SKINS[i % 5], hair: i % 2 ? '#2b2236' : '#5a3a24' }); dance.add(p); dancers.push(p); }
  const drum = mesh(new T.CylinderGeometry(0.28, 0.24, 0.42, 10), M('#c0392b'), 0, 0.21, 0); dance.add(drum);
  const notes = []; for (let i = 0; i < 4; i++) { const n = label('♪', 0.9, i % 2 ? GOLD : '#fff', 120); dance.add(n); notes.push(n); }
  /* E swimmers + clothes on the beach */
  const swim = new T.Group(); swim.position.set(2.5, 0, 0); g.add(swim);
  const swimmers = []; for (let i = 0; i < 3; i++) { const p = person({ head: 'square', shirt: [TEAL, CORAL, '#ffffff'][i], skin: SKINS[(i + 1) % 5] }); p.position.set(-1.6 + i * 1.5, -0.8, 7.3 + (i % 2) * 0.6); swim.add(p); swimmers.push(p); }
  const piles = [];
  [[-1.2, CORAL], [0.0, VIO], [1.2, GOLD]].forEach(([x, c], i) => { const pl = grp(mesh(new T.BoxGeometry(0.5, 0.12, 0.4), M(c), 0, 0.06, 0), mesh(new T.BoxGeometry(0.42, 0.1, 0.34), M('#ffffff'), 0, 0.17, 0)); pl.position.set(x, 0.06, 5.0); swim.add(pl); piles.push(pl); });
  const beachP = person({ head: 'square', shirt: '#ffffff', skin: SKINS[2] }); beachP.position.set(-0.5, 0.06, 5.6); swim.add(beachP);
  const shirtHeld = mesh(new T.PlaneGeometry(0.42, 0.5), M(GOLD, { side: T.DoubleSide })); swim.add(shirtHeld);
  /* F baby by the road */
  const bb = new T.Group(); bb.position.set(-3, 0, 2.85); g.add(bb);
  bb.add(mesh(new T.CylinderGeometry(0.75, 0.75, 0.05, 12), M('#9be08a'), 0, 0.03, 0));
  const bod = mesh(new T.CylinderGeometry(0.14, 0.15, 0.48, 8), M('#fffaf0'), 0.05, 0.16, 0); bod.rotation.z = PI / 2; bb.add(bod);
  const bh = mesh(new T.BoxGeometry(0.22, 0.2, 0.2), M(SKINS[3]), -0.27, 0.18, 0); bb.add(bh);
  bb.add(mesh(new T.SphereGeometry(0.02, 5, 4), M('#1d1b2c'), -0.33, 0.25, 0.1));
  const kneel = person({ head: 'square', shirt: TEAL, skin: SKINS[1], hair: '#5a3a24' }); kneel.position.set(-0.9, -0.32, 0.15); kneel.rotation.y = PI / 2; bb.add(kneel);
  kneel.userData.lL.rotation.x = -1.4; kneel.userData.lR.rotation.x = -1.4;
  const drops = []; for (let i = 0; i < 4; i++) { const d = mesh(new T.SphereGeometry(0.035, 6, 5), BM('#ffffff')); bb.add(d); drops.push(d); }
  const heart = label('♥', 0.7, CORAL, 120); bb.add(heart);
  /* G the burial bird */
  const bier = new T.Group(); bier.position.set(-6.4, 0, -5.6); g.add(bier);
  bier.add(mesh(new T.BoxGeometry(1.5, 0.3, 0.8), M('#e8d6b0'), 0, 0.15, 0));
  for (let i = 0; i < 12; i++) bier.add(mesh(new T.SphereGeometry(0.07, 5, 4), M(fcol[i % 5]), -0.7 + hash(i + 90) * 1.4, 0.32, -0.35 + hash(i + 70) * 0.7));
  const shroud = grp(mesh(new T.CylinderGeometry(0.16, 0.18, 1.0, 8), M('#fffaf0'), 0, 0, 0)); shroud.children[0].rotation.z = PI / 2; shroud.position.set(0, 0.45, 0); bier.add(shroud);
  const bigBird = bird({ color: '#5a3e2a' }); bigBird.scale.setScalar(1.1); g.add(bigBird);
  const mourners = [person({ head: 'square', shirt: '#ffffff', skin: SKINS[0] }), person({ head: 'square', shirt: '#fff3c0', skin: SKINS[4] })];
  mourners[0].position.set(-5.2, 0, -4.4); mourners[1].position.set(-7.4, 0, -4.3); mourners.forEach((p) => { p.rotation.y = PI * 0.85; g.add(p); });
  const flyover = new T.Group(); g.add(flyover);
  const fw = chakra(1.1); fw.position.set(2.4, 1.3, 0); flyover.add(fw);
  const fe = person({ shirt: GOLD, crown: true, sash: CORAL }); fe.scale.setScalar(1.2); fe.rotation.y = PI / 2; flyover.add(fe);
  [[-1.4, 0.8], [-1.4, -0.8], [-2.8, 0]].forEach(([x, z], i) => { const p = person({ shirt: i % 2 ? '#2e86de' : '#c0392b', skin: SKINS[i] }); p.position.set(x, 0, z); p.rotation.y = PI / 2; flyover.add(p); });
  const bigN = makePlanet('N', 26, { det: 16, big: true }); bigN.position.set(0, -26.45, -0.5); g.add(bigN);
  spaceSky(g, [['S', -30, 20, -70, 7, 0.3], ['E', 34, 26, -85, 6, 0], ['W', -6, 40, -110, 6, 0]], { n: 1100, R: 260, neb: [[-70, 40, -160, 130, '#5a3aa0', 0.2]] });
  return { g, flyover, fw, river, stalks, heads, flames, fglow, steam, pot, cook, kt, goods, sparkle, getters, falling, dance, dancers, notes, swimmers, piles, beachP, shirtHeld, kneel, drops, heart, bier, shroud, bigBird };
}

function buildNight() {
  const g = new T.Group();
  const sea = new T.PlaneGeometry(110, 70, 44, 28); sea.rotateX(-PI / 2); sea.translate(0, 0, -25);
  const seaM = mesh(sea, M('#163a7c', { roughness: 0.3, metalness: 0.3 })); seaM.castShadow = false; g.add(seaM);
  g.add(mesh(new T.BoxGeometry(60, 1.2, 12), M('#1f3a2e'), 0, -0.3, 15));
  g.add(mesh(new T.BoxGeometry(60, 0.3, 2), M('#c9b98a'), 0, 0.05, 9.3));
  const town = new T.Group(); town.position.set(-6.5, 0.3, 13); g.add(town);
  town.add(mesh(new T.BoxGeometry(3, 1.2, 2), M('#e9dcc0'), 0, 0.6, 0), mesh(new T.ConeGeometry(2.0, 1.2, 4), EM(CORAL, 0.15), 0, 1.8, 0), mesh(new T.ConeGeometry(1.4, 1.0, 4), EM(GOLD, 0.2), 0, 2.7, 0), mesh(new T.ConeGeometry(0.15, 1.4, 6), EM(GOLD, 0.6), 0, 3.7, 0));
  for (let i = 0; i < 6; i++) { const h = mesh(new T.BoxGeometry(0.9, 0.7, 0.9), M('#d8c8a6'), 3 + i * 1.6, 0.35, (i % 2) * 1.2); town.add(h); town.add(mesh(new T.BoxGeometry(0.2, 0.2, 0.05), EM('#ffcf6a', 1.0), 3 + i * 1.6, 0.4, (i % 2) * 1.2 + 0.46)); }
  const watchers = []; for (let i = 0; i < 6; i++) { const p = person({ shirt: ['#3d4d80', '#6a3d6e', '#2e6b5c'][i % 3], skin: SKINS[i % 5] }); p.position.set(-2.5 + i * 1.2 + (i > 2 ? 1.5 : 0), 0.3, 10.2 + (i % 2) * 0.8); p.rotation.y = PI; g.add(p); watchers.push(p); }
  const moon = grp(mesh(new T.SphereGeometry(3, 18, 14), EM('#eef3ff', 1.0)), glow('#cfe0ff', 20, 0.75)); moon.position.set(-14, 17, -60); g.add(moon);
  const refl = mesh(new T.PlaneGeometry(3.5, 40), BM('#cfe0ff', { transparent: true, opacity: 0.18, blending: T.AdditiveBlending, depthWrite: false })); refl.rotation.x = -PI / 2; refl.position.set(-12, 0.2, -38); refl.castShadow = false; g.add(refl);
  const sp = []; for (let i = 0; i < 500; i++) { const a = hash(i + 3) * PI - PI, e = 0.08 + hash(i + 11) * 1.1; sp.push(Math.cos(a) * 150, Math.sin(e) * 120, Math.sin(a) * 150 - 40); }
  const sg = new T.BufferGeometry(); sg.setAttribute('position', new T.Float32BufferAttribute(sp, 3));
  g.add(new T.Points(sg, new T.PointsMaterial({ color: '#ffffff', size: 2, sizeAttenuation: false, transparent: true, opacity: 0.85 })));
  const wheel = chakra(3); g.add(wheel);
  const bubble = glow('#ffe7a0', 6, 0); g.add(bubble);
  const king = person({ shirt: GOLD, crown: true, sash: CORAL }); king.scale.setScalar(1.3); king.position.set(-6.5, 0.3, 10.9); king.rotation.y = PI; g.add(king);
  const kglow = glow('#ffd36b', 3, 0); kglow.position.set(-6.5, 1.4, 10.9); g.add(kglow);
  [-8.2, -4.8].forEach((x) => { const p = person({ shirt: '#c0392b', skin: SKINS[2] }); p.position.set(x, 0.3, 11.3); p.rotation.y = PI; p.userData.aR.add(mesh(new T.CylinderGeometry(0.02, 0.02, 1.4, 4), M('#d9d2c0'), 0, -0.1, 0.1)); g.add(p); });
  const nsky = spaceSky(g, [['E', -17, 30, -80, 3.0, 0.3], ['W', 19, 36, -92, 3.0, -0.4], ['N', 2, 46, -112, 3.2, 0.2]], { n: 0 }); 
  const tbeam = mesh(new T.CylinderGeometry(0.3, 1.35, 3.3, 24, 1, true), BM('#ffe7a0', { transparent: true, opacity: 0, blending: T.AdditiveBlending, depthWrite: false, side: T.DoubleSide }), -6.5, 1.95, 11.35); tbeam.castShadow = false; g.add(tbeam);
  return { g, seaM, moon, wheel, watchers, bubble, king, kglow, tbeam, nsky };
}

function buildFly() {
  const g = new T.Group(), land = new T.Group(); g.add(land);
  land.add(mesh(new T.BoxGeometry(160, 0.5, 34), M('#4aa35c'), 0, -0.25, -4));
  const pc = ['#6fc25a', '#d9c25a', '#3f8f4a', '#9ad06a', '#c9a24a'];
  for (let i = 0; i < 46; i++) { const p = mesh(new T.BoxGeometry(3 + hash(i) * 4, 0.06, 2 + hash(i + 3) * 3), M(pc[i % 5]), -78 + i * 3.5, 0.03, -12 + hash(i + 8) * 18); p.castShadow = false; land.add(p); }
  const tg = new T.ConeGeometry(0.55, 1.6, 6); tg.translate(0, 1.2, 0); const trk = new T.CylinderGeometry(0.1, 0.13, 0.5, 5); trk.translate(0, 0.25, 0);
  const tp = []; for (let i = 0; i < 150; i++) tp.push([-78 + hash(i * 2) * 156, -20 + hash(i * 3 + 1) * 24]);
  land.add(instGrid(tg, M('#2f9a55'), tp.length, (put) => tp.forEach(([x, z]) => put(x, 0, z))));
  land.add(instGrid(trk, M('#7a5236'), tp.length, (put) => tp.forEach(([x, z]) => put(x, 0, z))));
  for (let i = 0; i < 24; i++) { const x = -76 + i * 6.6, z = -16 + hash(i + 33) * 20; land.add(mesh(new T.BoxGeometry(0.9, 0.7, 0.9), M('#f0e2c4'), x, 0.35, z), mesh(new T.ConeGeometry(0.75, 0.6, 4), EM(CORAL, 0.1), x, 1.0, z)); }
  const riv = mesh(new T.BoxGeometry(160, 0.05, 2.4), M('#3ea3e8', { roughness: 0.3 }), 0, 0.05, -14); riv.castShadow = false; land.add(riv);
  const pro = new T.Group(); pro.position.y = 4.2; g.add(pro);
  const wheel = chakra(1.4); wheel.position.set(5.6, 1.4, 0); wheel.rotation.y = 0.5; pro.add(wheel);
  const king = person({ shirt: GOLD, crown: true, sash: CORAL }); king.scale.setScalar(1.3); king.position.set(2.6, 0, 0); king.rotation.y = PI / 2; pro.add(king);
  const umb = grp(mesh(new T.CylinderGeometry(0.03, 0.03, 1.5, 5), M('#e8e0c8'), 0, 0.75, 0), mesh(new T.ConeGeometry(0.8, 0.35, 10), M('#fffaf0'), 0, 1.55, 0), mesh(new T.CylinderGeometry(0.8, 0.8, 0.12, 10, 1, true), EM(GOLD, 0.3, { side: T.DoubleSide }), 0, 1.36, 0));
  umb.position.set(2.1, 0.9, 0.5); pro.add(umb);
  const army = [];
  const cols = ['#c0392b', '#2e86de', '#c0392b'];
  for (let r = 0; r < 4; r++) for (let l = 0; l < 3; l++) {
    const x = 0.9 - r * 1.7, z = -1.7 + l * 1.7;
    if (r === 2 && l === 1) continue;
    const p = person({ shirt: cols[l], skin: SKINS[(r + l) % 5] }); p.position.set(x, 0, z); p.rotation.y = PI / 2; pro.add(p);
    p.userData.aR.add(mesh(new T.CylinderGeometry(0.02, 0.02, 1.4, 4), M('#d9d2c0'), 0, -0.1, 0.1));
    army.push(p);
  }
  const ele = elephant({ color: '#a9a3a0', pink: '#c98f86', cloth: CORAL }); ele.scale.setScalar(0.9); ele.position.set(-2.5, -0.3, 0); pro.add(ele);
  const lying = person({ shirt: VIO, skin: SKINS[3] }); lying.rotation.set(0, PI / 2, PI / 2); lying.rotation.order = 'YXZ'; lying.position.set(-5.2, 0.3, 1.6); pro.add(lying);
  const sitter = person({ shirt: TEAL, skin: SKINS[1] }); sitter.position.set(-5.0, -0.3, -1.4); sitter.rotation.y = PI / 2; sitter.userData.lL.rotation.x = -PI / 2; sitter.userData.lR.rotation.x = -PI / 2; pro.add(sitter);
  const mat = mesh(new T.BoxGeometry(0.9, 0.05, 0.8), M(CORAL), -5.0, -0.36, -1.4); pro.add(mat);
  const wEle = elephant({ cloth: GOLD }); wEle.scale.setScalar(0.85); wEle.position.set(-0.4, 0.2, -3.6); pro.add(wEle);
  const wHor = horse(); wHor.scale.setScalar(0.95); wHor.position.set(2.2, 0.2, -3.4); pro.add(wHor);
  land.visible = false;
  const planet = lowCap(1500, 0.34, 240, 48, ['#6fc25a', '#3f9a55', '#2f66d6', '#1f4aa8'], 1.3); planet.position.set(0, -1540, -20); planet.castShadow = false; planet.receiveShadow = false; g.add(planet);
  const patm = new T.Mesh(new T.SphereGeometry(1512, 160, 80), fresnelMat('#7fc8ff', 0.9, 3, T.BackSide)); patm.position.copy(planet.position); g.add(patm);
  const clouds = []; for (let i = 0; i < 16; i++) { const cm = M('#ffffff', { roughness: 1 }), c = grp(mesh(new T.IcosahedronGeometry(1.2, 0), cm), mesh(new T.IcosahedronGeometry(0.9, 0), cm, 1.1, -0.2, 0.2), mesh(new T.IcosahedronGeometry(0.8, 0), cm, -1.0, -0.25, -0.1)); c.scale.set(5.5, 2.2, 3.8); c.userData.x0 = -90 + i * 11.3; c.position.set(c.userData.x0, -22 + hash(i) * 10, -50 + hash(i + 5) * 46); c.traverse((k) => { k.castShadow = false; }); g.add(c); clouds.push(c); }
  spaceSky(g, [['E', 34, 46, -110, 7, 0], ['N', -44, 60, -130, 7, 0]], { n: 1000, R: 260 });
  const shield = new T.Mesh(new T.SphereGeometry(1, 40, 24), fresnelMat('#9fe0ff', 0.85, 2.2)); shield.scale.set(7.6, 3.3, 3.4); shield.position.set(0.6, 5.3, -1.0); g.add(shield);
  return { g, land, pro, wheel, king, army, ele, lying, sitter, wEle, wHor, planet, clouds, shield };
}

function buildSea() {
  const g = new T.Group();
  const brM = M('#2a2f7a', { emissive: '#5a5ad0', emissiveIntensity: 0.7, transparent: true, opacity: 0.85 }), br = mesh(new T.BoxGeometry(4.8, 0.1, 50), brM, 0, -1.05, -18); br.castShadow = false; g.add(br); const pth = mesh(new T.BoxGeometry(2.0, 0.02, 50), BM('#ffe7a0', { transparent: true, opacity: 0.55, blending: T.AdditiveBlending, depthWrite: false }), 0, -0.98, -18); pth.castShadow = false; g.add(pth); [-2.4, 2.4].forEach((x) => { const rl = mesh(new T.BoxGeometry(0.08, 0.08, 50), BM('#9fe0ff'), x, -0.98, -18); rl.castShadow = false; g.add(rl); });
  const wm = new T.MeshStandardMaterial({ color: '#0b0d2e', emissive: '#1a1460', emissiveIntensity: 0.6, transparent: false, opacity: 1, roughness: 0.2, metalness: 0.1, flatShading: true });
  const wl = new T.Mesh(new T.BoxGeometry(14, 32, 50, 4, 6, 10), wm), wr = new T.Mesh(new T.BoxGeometry(14, 32, 50, 4, 6, 10), wm); wl.position.set(-7, -5, -18); wr.position.set(7, -5, -18); g.add(wl, wr);
  const topM = M('#1a1850', { roughness: 0.25 }), tl = mesh(new T.PlaneGeometry(40, 50), topM), tr = mesh(new T.PlaneGeometry(40, 50), topM);
  [tl, tr].forEach((m) => { m.rotation.x = -PI / 2; m.position.y = 6.8; m.castShadow = false; m.visible = false; g.add(m); });
  const gc = ['#ff5d73', '#2ee6c5', '#8f7bff', '#7fd8ff', '#ffffff', '#5dff8f', '#ffc94a'], gems = [];
  for (let i = 0; i < 70; i++) { const gm = mesh(new T.OctahedronGeometry(0.16 + hash(i) * 0.1, 0), EM(gc[i % 7], 0.9), -3.4 + hash(i * 3) * 6.8, -0.6 + hash(i * 7 + 1) * 2.8, 4 - hash(i * 5 + 2) * 42); gm.castShadow = false; g.add(gm); gems.push(gm); }
  const wheel = chakra(1.3); g.add(wheel);
  const walkers = []; for (let i = 0; i < 8; i++) { const p = person({ shirt: i % 3 ? '#c0392b' : '#2e86de', skin: SKINS[i % 5] }); p.position.set(-1.8 + (i % 4) * 1.2, -1.0, 2 + Math.floor(i / 4) * 1.8); p.rotation.y = PI; g.add(p); walkers.push(p); }
  const king = person({ shirt: GOLD, crown: true, sash: CORAL }); king.scale.setScalar(1.25); king.position.set(0, -1.0, 0); king.rotation.y = PI; g.add(king);
  const bub = []; for (let i = 0; i < 20; i++) { const b = glow('#bfe8ff', 0.35, 0.5); g.add(b); bub.push(b); }
  [[wl, 7.03], [wr, -7.03]].forEach(([w, x], j) => { const pp = []; for (let i = 0; i < 1300; i++) pp.push(x, -15 + hash(i * 7 + j) * 30, -25 + hash(i * 11 + 3 + j) * 50); const pg = new T.BufferGeometry(); pg.setAttribute('position', new T.Float32BufferAttribute(pp, 3)); w.add(new T.Points(pg, new T.PointsMaterial({ color: '#ffffff', size: 2.6, sizeAttenuation: false, transparent: true, opacity: 0.95, depthWrite: false }))); for (let i = 0; i < 12; i++) { const nb = glow(['#b58aff', '#5ab0ff', '#ff7ad0', '#5dffc8'][i % 4], 5 + hash(i + j) * 5, 0.4); nb.position.set(x * 1.002, -8 + hash(i * 3 + j) * 18, -23 + i * 4.2); w.add(nb); } });
  [[wl, 7.03], [wr, -7.03]].forEach(([w, x], j) => {
    { const e = mesh(new T.BoxGeometry(0.14, 32, 0.14), BM('#cfeeff'), x * 0.998, 0, 25); e.castShadow = false; w.add(e); }
    for (let i = 0; i < 14; i++) { const e2 = glow('#9fe0ff', 2.6, 0.55); e2.position.set(x, -14 + i * 2.2, 25); w.add(e2); }
    const pp = []; for (let i = 0; i < 700; i++) pp.push(-7 + hash(i * 13 + j) * 14, -15 + hash(i * 17 + 5 + j) * 30, 25.03); const pg = new T.BufferGeometry(); pg.setAttribute('position', new T.Float32BufferAttribute(pp, 3)); w.add(new T.Points(pg, new T.PointsMaterial({ color: '#ffffff', size: 2.4, sizeAttenuation: false })));
  });
  spaceSky(g, [['E', 0, 16, -82, 6.0, 0]], { n: 800, R: 240 });
  return { g, wl, wr, tl, tr, gems, wheel, walkers, king, bub };
}

function buildCourt() {
  const g = new T.Group();
  g.add(mesh(new T.CylinderGeometry(6.5, 6.9, 0.5, 12), M('#d9cfb4'), 0, -0.25, 0));
  g.add(mesh(new T.BoxGeometry(9, 2.6, 2.4), M('#f3e6c8'), 0, 1.3, -5));
  [-3.8, -2.2, 2.2, 3.8].forEach((x) => g.add(mesh(new T.CylinderGeometry(0.16, 0.18, 2.6, 8), M(CORAL), x, 1.3, -3.7)));
  g.add(mesh(new T.ConeGeometry(6.2, 1.6, 4), EM(CORAL, 0.15), 0, 3.4, -5), mesh(new T.ConeGeometry(4.3, 1.3, 4), EM(GOLD, 0.2), 0, 4.6, -5), mesh(new T.ConeGeometry(0.25, 2.2, 6), EM(GOLD, 0.6), 0, 6.0, -5));
  g.children.slice(-3).forEach((m) => { m.rotation.y = PI / 4; m.scale.z = 0.45; });
  g.add(mesh(new T.BoxGeometry(2.4, 0.5, 1.6), M('#c9a55a'), 0, 0.25, -2.4));
  const emp = person({ shirt: GOLD, crown: true, sash: CORAL }); emp.scale.setScalar(1.35); emp.position.set(0, 0.5, -2.4); g.add(emp);
  const wheel = chakra(0.9); wheel.position.set(0, 3.9, -2.4); g.add(wheel);
  const kings = [];
  [-2.4, -0.8, 0.8, 2.4].forEach((x, i) => {
    const outer = new T.Group(); outer.position.set(x, 0, 1.2 + (i % 2) * 0.4); outer.rotation.y = PI + (x * -0.08); g.add(outer);
    const piv = new T.Group(); outer.add(piv);
    const p = person({ head: 'round', shirt: ['#6a3d9a', '#2e6b9a', '#9a3d6a', '#3d8a6a'][i], crown: true, skin: SKINS[(i + 2) % 5] }); piv.add(p);
    const gift = grp(mesh(new T.BoxGeometry(0.42, 0.3, 0.32), EM(GOLD, 0.3, { metalness: 0.5 })), mesh(new T.OctahedronGeometry(0.1, 0), EM(TEAL, 0.9), 0, 0.24, 0)); gift.position.set(0, 0.15, 0.7); outer.add(gift);
    kings.push(piv);
  });
  const sila = label('ศีล 5', 1.9, GOLD, 100); sila.position.set(1.8, 3.2, -1.6); g.add(sila);
  const crowd = []; for (let i = 0; i < 8; i++) { const p = person({ shirt: ['#c0392b', '#2e86de'][i % 2], skin: SKINS[i % 5] }); p.position.set((i < 4 ? -4.8 : 4.8) + (i % 2) * 0.6 * (i < 4 ? 1 : -1), 0, -1 + (i % 4) * 0.9); p.rotation.y = i < 4 ? 0.9 : -0.9; g.add(p); crowd.push(p); }
  return { g, emp, wheel, kings, sila };
}

function buildEast() {
  const C = buildCourt(), g = C.g;
  g.add(mesh(new T.CylinderGeometry(11.2, 10.4, 4.4, 40), M('#e9edf6'), 0, -2.45, 0));
  g.add(mesh(new T.CylinderGeometry(10.7, 10.7, 0.3, 40), M('#7cc46a'), 0, -0.2, 0));
  const oc = new T.PlaneGeometry(140, 140, 40, 40); oc.rotateX(-PI / 2); const ocean = mesh(oc, M('#2f66d6', { roughness: 0.35, metalness: 0.2 }), 0, -0.7, 0); ocean.castShadow = false; g.add(ocean);
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * TAU, r = 8.8, x = Math.cos(a) * r, z = Math.sin(a) * r; if (z > 2.5 && Math.abs(x) < 4.5) continue;
    const h = grp(mesh(new T.BoxGeometry(1.2, 0.85, 1.2), M('#f4ecda'), 0, 0.42, 0), mesh(new T.ConeGeometry(1.0, 0.75, 4), M('#c9d2e6', { metalness: 0.5, roughness: 0.3 }), 0, 1.2, 0), mesh(new T.BoxGeometry(0.3, 0.45, 0.05), M('#5a3a24'), 0, 0.23, 0.61));
    h.children[1].rotation.y = PI / 4; h.position.set(x, 0, z); h.rotation.y = Math.atan2(-x, -z); g.add(h);
  }
  for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU + 0.2, tr = FK.tree(T, '#3fbf6a'); tr.scale.setScalar(1.4); tr.position.set(Math.cos(a) * 10.0, 0, Math.sin(a) * 10.0); g.add(tr); }
  const town = []; for (let i = 0; i < 10; i++) { const p = person({ head: 'round', shirt: ['#e6ecff', '#8f7bff', '#ff9a4a', '#2ee6c5', '#ff7aa8'][i % 5], skin: SKINS[i % 5], hair: i % 2 ? '#2b2236' : '#6a4a2a' }); g.add(p); town.push(p); }
  const chat = [person({ head: 'round', shirt: '#e6ecff', skin: SKINS[3], headScale: 1.25 }), person({ head: 'round', shirt: '#ff7aa8', skin: SKINS[1], headScale: 1.25, hair: '#6a4a2a' })];
  chat[0].position.set(4.4, 0, 7.4); chat[1].position.set(5.5, 0, 7.0); chat[0].rotation.y = 0.35; chat[1].rotation.y = -0.45; chat.forEach((p) => g.add(p));
  ocean.visible = false;
  const bigE = makePlanet('E', 26, { det: 16, big: true }); bigE.position.y = -26.45; g.add(bigE);
  const esky = spaceSky(g, [['S', -26, 14, -60, 7, 0.4], ['W', 34, 20, -75, 6, -0.3], ['N', 6, 34, -95, 6, 0]], { n: 1100, R: 260, neb: [[-60, 30, -150, 120, '#5a3aa0', 0.22], [70, -30, -120, 110, '#2a5aa0', 0.2]] });
  return Object.assign(C, { ocean, town, chat, esky });
}
function buildWest() {
  const g = new T.Group();
  const sh = new T.Shape(); sh.absarc(0, 0, 11.5, 0, PI, false); sh.lineTo(11.5, 0);
  const land = shapeMesh(sh, 4.0, '#e3f6ff'); land.position.set(0, -4.05, 4.5); g.add(land);
  const sh2 = new T.Shape(); sh2.absarc(0, 0, 11.0, 0, PI, false); sh2.lineTo(11.0, 0);
  const grass = shapeMesh(sh2, 0.3, '#78c98e'); grass.position.set(0, -0.3, 4.3); g.add(grass);
  const oc = new T.PlaneGeometry(140, 140, 40, 40); oc.rotateX(-PI / 2); const ocean = mesh(oc, M('#2f66d6', { roughness: 0.35, metalness: 0.2 }), 0, -0.75, 0); ocean.castShadow = false; g.add(ocean);
  for (let i = 0; i < 16; i++) { const a = 0.15 + (i / 15) * (PI - 0.3), r = 10.6; const c = mesh(new T.OctahedronGeometry(0.45 + hash(i) * 0.4, 0), EM('#bfefff', 0.35, { metalness: 0.4 }), Math.cos(a) * r, 0.3, 4.3 - Math.sin(a) * r); c.scale.y = 1.6; g.add(c); }
  const riv = mesh(new T.BoxGeometry(1.5, 0.05, 15), M('#4fb3f0', { roughness: 0.25 }), -1.2, -0.03, -1.6); riv.rotation.y = 0.25; riv.castShadow = false; g.add(riv);
  const dome = (r, x, z, c) => grp(mesh(new T.CylinderGeometry(r, r, r * 0.9, 12), M('#f2f6ff'), 0, r * 0.45, 0), mesh(new T.SphereGeometry(r * 1.02, 12, 7, 0, TAU, 0, PI / 2), M(c || '#8fd6ff', { metalness: 0.3, roughness: 0.3 }), 0, r * 0.9, 0), mesh(new T.BoxGeometry(r * 0.4, r * 0.55, 0.05), M('#3a4a6a'), 0, r * 0.28, r * 1.0));
  [[-4.8, -3.4], [-5.9, -1.4], [-3.8, -5.3], [-6.0, -4.3], [-3.3, -2.0], [3.5, -4.4], [4.9, -2.5], [3.9, -5.9], [5.8, -4.5], [2.8, -2.4]].forEach(([x, z], i) => { const d = dome(0.6 + hash(i) * 0.25, x, z, i % 3 ? '#8fd6ff' : '#b58aff'); d.position.set(x, 0, z); g.add(d); });
  const pal = dome(1.4, 0, -5, '#7fd8ff'); pal.position.set(0.9, 0, -5.4); g.add(pal);
  for (let i = 0; i < 9; i++) { const tr = FK.tree(T, '#3aa36a'); tr.scale.setScalar(1.3); tr.position.set(-8 + hash(i + 3) * 16, 0, -6.5 + hash(i + 7) * 7); if (Math.abs(tr.position.x + 1.2) < 1.6) tr.position.x += 3; if (Math.hypot(tr.position.x, tr.position.z - 4.5) < 10.3) g.add(tr); }
  const folk = []; for (let i = 0; i < 9; i++) { const p = person({ head: 'half', shirt: ['#8fd6ff', '#b58aff', '#ffffff', '#2ee6c5', '#ffc94a'][i % 5], skin: SKINS[(i + 2) % 5] }); g.add(p); folk.push(p); }
  const chat = [person({ head: 'half', shirt: '#8fd6ff', skin: SKINS[0], headScale: 1.3 }), person({ head: 'half', shirt: '#ffc94a', skin: SKINS[2], headScale: 1.3, hair: '#6a4a2a' })];
  chat[0].position.set(-4.3, 0, 2.2); chat[1].position.set(-3.2, 0, 2.6); chat[0].rotation.y = 0.5; chat[1].rotation.y = -0.2; chat.forEach((p) => g.add(p));
  const fisher = person({ head: 'half', shirt: '#ff9a4a', skin: SKINS[4] }); fisher.position.set(-2.4, -0.25, 1.2); fisher.rotation.y = -1.2; fisher.userData.lL.rotation.x = fisher.userData.lR.rotation.x = -PI / 2; g.add(fisher);
  const rod = mesh(new T.CylinderGeometry(0.015, 0.02, 2.2, 4), M('#6b4a32'), 0, -0.2, 0.9); rod.rotation.x = 1.1; fisher.userData.aR.add(rod);
  const arr = new T.Group(); g.add(arr);
  const aw = chakra(1.1); aw.position.set(0, 2.3, 0); arr.add(aw);
  const ae = person({ shirt: GOLD, crown: true, sash: CORAL }); ae.scale.setScalar(1.25); arr.add(ae);
  ocean.visible = false;
  const bigW = makePlanet('W', 26, { det: 16, big: true }); bigW.position.set(0, -26.45, -1.0); g.add(bigW);
  const wsky = spaceSky(g, [['S', 30, 12, -60, 7, -0.4], ['E', -36, 22, -80, 6, 0.3], ['N', -4, 36, -100, 6, 0]], { n: 1100, R: 260, neb: [[60, 30, -150, 120, '#3a6aa0', 0.22], [-70, -30, -120, 110, '#6a3aa0', 0.2]] });
  return { g, ocean, folk, chat, fisher, arr, aw, ae, wsky };
}
function buildForest() {
  const g = new T.Group();
  g.add(mesh(new T.CylinderGeometry(8, 7.6, 0.5, 14), M('#4c8f52'), 0, -0.25, 0));
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * TAU, r = 6.6 + hash(i) * 0.8, x = Math.cos(a) * r, z = Math.sin(a) * r; if (z > 4.5 && Math.abs(x) < 4) continue;
    g.add(mesh(new T.CylinderGeometry(0.22, 0.32, 4.8, 6), M('#6b4a32'), x, 2.4, z));
    g.add(mesh(new T.IcosahedronGeometry(1.4, 0), M('#2e8a4e'), x, 5.2, z), mesh(new T.IcosahedronGeometry(1.0, 0), M('#3aa35c'), x + 0.6, 4.6, z + 0.3));
  }
  g.add(mesh(new T.CylinderGeometry(0.9, 1.0, 0.35, 10), M('#bfb49a'), 0, 0.17, -2.8));
  const aura = glow('#ffd36b', 3.4, 0.9); aura.position.set(0, 1.3, -2.8); g.add(aura);
  const monks = [];
  for (let row = 0; row < 3; row++) for (let k = 0; k < 7 + row * 2; k++) {
    const n = 7 + row * 2, a = -PI * 0.38 + (k / (n - 1)) * PI * 0.76, r = 2.0 + row * 0.9;
    const m = monk(SKINS[(k + row) % 5]); m.position.set(Math.sin(a) * r, 0, -2.8 + Math.cos(a) * r); m.rotation.y = Math.atan2(-Math.sin(a), -Math.cos(a)); g.add(m); monks.push(m);
  }
  const lights = [], lc = ['#ffd36b', '#ff7aa8', '#7fd8ff', '#b58aff', '#5dff8f', '#ffffff', '#ff9a4a', '#2ee6c5', '#ffe08a', '#a0b8ff'];
  for (let i = 0; i < 40; i++) { const s = glow(lc[i % 10], 1.1, 0.95); g.add(s); lights.push(s); }
  return { g, aura, lights };
}

function batThing() {
  const g = new T.Group(), skin = M('#3a3348', { roughness: 0.9 }), memb = M('#6a5a8e', { side: T.DoubleSide, transparent: true, opacity: 0.9 }), claw = M('#efe6d2');
  const body = mesh(new T.SphereGeometry(0.5, 9, 7), skin, 0, -1.45, 0); body.scale.set(0.75, 1.4, 0.65); g.add(body);
  const head = new T.Group(); head.position.set(0, -0.55, 0.08); g.add(head);
  head.add(mesh(new T.SphereGeometry(0.3, 9, 7), skin));
  head.add(mesh(new T.ConeGeometry(0.09, 0.28, 4), skin, -0.17, 0.3, 0), mesh(new T.ConeGeometry(0.09, 0.28, 4), skin, 0.17, 0.3, 0));
  const eyes = [mesh(new T.SphereGeometry(0.065, 6, 5), EM('#ffd84a', 1.6), -0.11, 0.03, 0.26), mesh(new T.SphereGeometry(0.065, 6, 5), EM('#ffd84a', 1.6), 0.11, 0.03, 0.26)]; eyes.forEach((e) => head.add(e));
  [-1, 1].forEach((sd) => {
    const arm = mesh(new T.CylinderGeometry(0.05, 0.075, 1.1, 5), skin, sd * 0.6, -0.3, 0); arm.rotation.z = -sd * 0.59; g.add(arm);
    for (let k = 0; k < 3; k++) { const cl = mesh(new T.ConeGeometry(0.05, 0.32, 4), claw, sd * (0.82 + k * 0.1), 0.16, -0.12); cl.rotation.x = 2.5; g.add(cl); }
    const sh = new T.Shape([new T.Vector2(sd * 0.3, -0.75), new T.Vector2(sd * 0.9, 0.15), new T.Vector2(sd * 1.35, -1.25), new T.Vector2(sd * 1.0, -1.15), new T.Vector2(sd * 0.95, -1.9), new T.Vector2(sd * 0.4, -2.05)]);
    const w = mesh(new T.ShapeGeometry(sh), memb, 0, 0, -0.05); g.add(w);
  });
  g.userData = { head, eyes };
  return g;
}
function buildGap() {
  const g = new T.Group(), sep = 14.4, r0 = sep / Math.sqrt(3), discs = [], centers = [];
  [90, 210, 330].forEach((deg) => { const a = deg * PI / 180; const c = new T.Vector3(Math.cos(a) * r0, 0, -Math.sin(a) * r0); centers.push(c); const d = cosmos({ wallH: 5, wallDrop: 4 }); d.position.copy(c); d.userData.sun.position.set(3, 2.4, 2.2); d.userData.moon.position.set(-3, 2.2, -2.2); g.add(d); discs.push(d); });
  const bats = [];
  centers.forEach((c, k) => [-0.2, 0.2].forEach((da, j) => {
    const dir = new T.Vector3(-c.x, 0, -c.z).normalize(), a = Math.atan2(dir.x, dir.z) + da, dd = new T.Vector3(Math.sin(a), 0, Math.cos(a));
    const b = batThing(); b.scale.setScalar(1.1); b.position.copy(c).addScaledVector(dd, 6.5); b.position.y = 0.55; b.rotation.y = a; b.userData.p0 = b.position.clone(); g.add(b); bats.push(b);
  }));
  const mist = []; for (let i = 0; i < 10; i++) { const m = glow('#3a2a5a', 4 + hash(i) * 3, 0.35); m.material.blending = T.NormalBlending; m.position.set((hash(i + 3) - 0.5) * 4, -3 - hash(i + 5) * 3, (hash(i + 8) - 0.5) * 4); g.add(m); mist.push(m); }
  const pl = new T.PointLight('#9a7ae0', 1.6, 18, 2); pl.position.set(0, -0.8, 0); g.add(pl);
  const flash = glow('#fff1c0', 2, 0); flash.position.set(0, 4, 0); g.add(flash);
  const marks = []; [0, 2, 4].forEach((k) => { const m = label('!', 0.9, GOLD, 150); m.position.copy(bats[k].position); m.position.y = 1.6; g.add(m); marks.push(m); });
  const sg = new T.PlaneGeometry(60, 60, 30, 30); sg.rotateX(-PI / 2); const sea = mesh(sg, M('#1f5a6a', { emissive: '#1a6a7a', emissiveIntensity: 0.55, roughness: 0.2, metalness: 0.3 }), 0, -6.4, 0); sea.castShadow = false; g.add(sea);
  for (let i = 0; i < 16; i++) { const a = hash(i + 21) * TAU, r = 1 + hash(i + 31) * 6; const ic = mesh(new T.OctahedronGeometry(0.3 + hash(i) * 0.4, 0), EM('#cfefff', 0.35), Math.cos(a) * r, -6.3, Math.sin(a) * r); ic.scale.y = 0.45; ic.castShadow = false; g.add(ic); }
  const cold = []; for (let i = 0; i < 8; i++) { const c = glow('#9fe8ff', 3 + hash(i) * 2, 0.25); c.position.set((hash(i + 41) - 0.5) * 8, -5.6, -2 + (hash(i + 51) - 0.5) * 6); g.add(c); cold.push(c); }
  const sp0 = bats[1].userData.p0, steam = []; for (let i = 0; i < 10; i++) { const st = glow(i % 2 ? '#bff6ff' : '#9dffcf', 1.2, 0); st.position.set(sp0.x + (hash(i + 61) - 0.5) * 1.2, -6.2, sp0.z + (hash(i + 71) - 0.5) * 1.2); g.add(st); steam.push(st); }
  const ring = mesh(new T.RingGeometry(0.2, 0.5, 24), BM('#cfffff', { transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false }), sp0.x, -6.3, sp0.z); ring.rotation.x = -PI / 2; ring.castShadow = false; g.add(ring);
  const hellLab = label('โลกันตนรก', 4.6, '#ff9a9a', 116); hellLab.position.set(0, 3.4, 0); hellLab.visible = false; g.add(hellLab);
  const red = glow('#ff3a3a', 12, 0); red.material.blending = T.AdditiveBlending; red.position.set(0, -2.5, -1.5); g.add(red);
  return { g, discs, bats, mist, flash, marks, sea, cold, steam, ring, hellLab, red };
}

function buildStreet() {
  const g = new T.Group();
  g.add(mesh(new T.BoxGeometry(46, 0.4, 26), M('#8a8f9a'), 0, -0.2, -2));
  const road = mesh(new T.BoxGeometry(46, 0.05, 6), M('#3a3d48'), 0, 0.02, 3.2); g.add(road);
  for (let i = 0; i < 16; i++) g.add(mesh(new T.BoxGeometry(1.3, 0.02, 0.16), BM('#f4f1e8'), -21 + i * 2.8, 0.06, 3.2));
  g.add(mesh(new T.BoxGeometry(46, 0.16, 3.6), M('#cfc8ba'), 0, 0.08, -1.2));
  const pal = ['#f2d7a6', '#a8d8c8', '#f4b6a8', '#c9c2f0', '#f6e3a0', '#b8d4f0'];
  for (let i = 0; i < 11; i++) {
    const x = -20 + i * 4, h = 4.4 + hash(i + 2) * 1.8, hs = grp(mesh(new T.BoxGeometry(3.9, h, 3.2), M(pal[i % 6]), 0, h / 2, 0));
    hs.add(mesh(new T.BoxGeometry(3.6, 1.5, 0.08), M('#3a4a6a', { roughness: 0.3, metalness: 0.3 }), 0, 0.9, 1.62));
    hs.add(mesh(new T.BoxGeometry(4.0, 0.12, 0.9), M(['#e74c3c', '#2e86de', '#27ae60'][i % 3]), 0, 1.9, 1.9));
    for (let w = 0; w < 2; w++) hs.add(mesh(new T.BoxGeometry(0.8, 0.8, 0.06), M('#bfe3ff', { roughness: 0.2 }), -0.9 + w * 1.8, 3.1, 1.62));
    hs.position.set(x, 0, -4.8); g.add(hs);
  }
  for (let i = 0; i < 6; i++) { const tr = FK.tree(T, '#2fbf71'); tr.scale.setScalar(2.2); tr.position.set(-18 + i * 7.3, 0.15, 0.3); g.add(tr); }
  const crowd = []; for (let i = 0; i < 16; i++) { const p = person({ shirt: ['#e74c3c', '#2e86de', '#27ae60', '#f39c12', '#8e44ad', '#ecf0f1'][i % 6], skin: SKINS[i % 5], pants: i % 2 ? '#2a2f4a' : '#3d5a80' }); p.userData.x0 = -22 + hash(i * 3) * 44; p.userData.dir = i % 2 ? 1 : -1; p.userData.z = -0.3 - (i % 3) * 0.9; p.scale.setScalar(1.25); g.add(p); crowd.push(p); }
  const aliens = [['round', '#ffffff', -1.6], ['half', '#8fd6ff', 0.0], ['square', '#ffc94a', 1.6]].map(([hd, sh, x], i) => {
    const p = person({ head: hd, shirt: sh, skin: SKINS[(i + 1) % 5], headScale: 1.15 }); p.scale.setScalar(1.3); p.userData.tx = x; g.add(p);
    const ring = glow(GOLD, 2.6, 0); ring.position.set(x, 0.2, -1.0); g.add(ring);
    const q = label('?', 1.5, GOLD, 130); q.position.set(x, 2.6, -1.0); q.visible = false; g.add(q);
    p.userData.ring = ring; p.userData.q = q; return p;
  });
  return { g, crowd, aliens };
}
/* ===== part 2b: per-scene animation (deterministic in t) — v2 story ===== */
const _v = new T.Vector3();
const CONT = { E: [3.75, 0], W: [-3.35, 0], N: [0, -3.7], S: [0, 3.7] };
const WANG = { S: PI / 2, E: 0, N: -PI / 2, W: PI }, WDISK = { S: [0, 3.75], E: [3.75, 0], N: [0, -3.7], W: [-3.65, 0] }, WR = 5.0;
function worldMode(b, tl) { const k = b.k; if (k === 'sci') return eIO(seg(tl, 0.5, 3.2)); if (k === 'cover' || k === 'four' || k === 'noway' || k === 'mig' || k === 'mig2' || k === 'win') return 1; if (k === 'rise') return 1 - eIO(seg(tl, 0.1, 1.8)); return 0; }
function planetMode(b, tl) { const k = b.k; if (k === 'sci') return eIO(seg(tl, 2.2, 3.3)); if (k === 'cover' || k === 'four' || k === 'noway' || k === 'mig' || k === 'mig2' || k === 'win') return 1; if (k === 'rise') return 1 - eIO(seg(tl, 0, 0.8)); return 0; }
function worldAt(q, t, m, out) { const a = WANG[q] + 0.16 * Math.sin(t * 0.22), d = WDISK[q]; return (out || new T.Vector3()).set(lerp(d[0], Math.cos(a) * WR, m), m * (0.95 + Math.sin(t * 0.9 + a * 2) * 0.12), lerp(d[1], Math.sin(a) * WR, m)); }
function walkRing(p, t, cx, cz, r, sp, ph) { const a = ph + t * sp; p.position.set(cx + Math.cos(a) * r, 0, cz + Math.sin(a) * r); p.rotation.y = Math.atan2(-Math.sin(a) * Math.sign(sp), Math.cos(a) * Math.sign(sp)); walkPose(p, t * 6 + ph, 0.5); }
const ANIM = {
  space(t, b, tl, s) {
    const h = s.hero.userData, k = b.k, m = worldMode(b, tl), pm = planetMode(b, tl);
    animSea(h.surf, t, 0.035);
    const a = t * 0.5; h.sun.position.set(Math.cos(a) * 4.6, 2.4, Math.sin(a) * 4.6); h.moon.position.set(Math.cos(a + PI) * 4.6, 2.2, Math.sin(a + PI) * 4.6); h.sun.visible = h.moon.visible = m < 0.3;
    s.field.visible = !!b.field;
    let o2 = 0, o3 = 0;
    if (k === 'k2') o2 = seg(tl, 0, 1.2); if (k === 'k3') { o2 = 1; o3 = seg(tl, 0, 1.4); } if (k === 'e0' || k === 'sum' || k === 'ask') o2 = 1;
    s.L2.material.opacity = o2 * 0.95; s.L2.visible = o2 > 0; s.L3.material.opacity = o3; s.L3.visible = o3 > 0;
    s.wheel.visible = k === 'hook' || k === 'cover';
    /* scripture disk <-> sci-fi floating worlds */
    s.diskParts.forEach((pt) => { pt.visible = m < 0.99; pt.traverse((c) => { if (c.material && !c.isSprite) { c.material.transparent = m > 0.001 || c.userData.op0 < 1; c.material.opacity = (1 - m) * (c.userData.op0 == null ? 1 : c.userData.op0); } else if (c.isSprite) c.material.opacity = (1 - m) * (c.userData.op0 == null ? 1 : c.userData.op0); }); });
    const P = {};
    ['S', 'E', 'W', 'N'].forEach((q, i) => {
      const w = s.worlds[q], pl = s.planets[q]; P[q] = worldAt(q, t, m, w.position); w.visible = m > 0.001 && pm < 0.999; h.C[q].visible = m <= 0.001;
      w.scale.setScalar(lerp(1, 1.25, m) * Math.max(0.001, 1 - pm));
      pl.visible = pm > 0.001; pl.position.set(P[q].x, P[q].y + 0.3, P[q].z); pl.scale.setScalar(Math.max(0.001, pm * (1 + 0.18 * Math.sin(pm * PI)))); pl.userData.body.rotation.y = t * 0.3 + i; if (pl.userData.gl) pl.userData.gl.material.opacity = 0.22 + 0.7 * Math.sin(pm * PI); if (pl.userData.ring) pl.userData.ring.rotation.y = t * 0.2;
      P[q].top = P[q].y + lerp(0.38, 1.6, pm); w.rotation.y = m * 0.1 * Math.sin(t * 0.5 + i); w.userData.under.scale.set(1, Math.max(0.001, m), 1); w.userData.atm.material.opacity = 0.26 * m;
    });
    s.orbit.visible = m > 0.01; s.orbit.material.opacity = 0.32 * m; s.core.visible = m > 0.01; s.core.material.opacity = 0.7 * m * (0.85 + 0.15 * Math.sin(t * 2));
    const pinT = { S: 0.5, E: 1.0, W: 1.3, N: 1.6 };
    ['S', 'N', 'E', 'W'].forEach((q, i) => {
      const p = s.pins[q]; let a2 = 0;
      if (k === 'one') a2 = eBack(seg(tl, pinT[q], pinT[q] + 0.4)); else if (k === 'sci') a2 = 1; else if (k === 'four') a2 = q === 'S' ? 1 : 1 - seg(tl, 2.4, 2.8); else if (k === 'noway') a2 = q === 'S' ? 1 - seg(tl, 0, 0.5) : 0;
      p.visible = a2 > 0.01; p.scale.setScalar(Math.max(0.001, a2) * (q === 'S' ? 1.5 : 1) * lerp(1, 1.2, m)); p.position.set(P[q].x, P[q].top + 1.05 + Math.sin(t * 3 + i) * 0.12, P[q].z);
    });
    s.boat.visible = false;
    const rk = s.rk; rk.visible = k === 'noway';
    if (rk.visible) {
      const out = eIO(seg(tl, 0.5, 2.0)), back = eIO(seg(tl, 2.5, 3.7)), p = 0.55 * out * (1 - back), A = P.S, B = P.E, turn = seg(tl, 2.0, 2.5), shake = turn > 0 && turn < 1 ? Math.sin(t * 40) * 0.06 : 0;
      rk.position.set(lerp(A.x, B.x, p), lerp(A.top, B.top, p) + 0.5 + Math.sin((p / 0.55) * PI) * 1.0 + shake, lerp(A.z, B.z, p));
      rk.rotation.set(0, Math.atan2(-(B.z - A.z), B.x - A.x) + PI * eIO(turn), 0.25 * (1 - 2 * turn));
      rk.userData.fl.material.opacity = 0.6 + 0.3 * Math.sin(t * 30); rk.userData.fl.scale.setScalar(0.8 + 0.2 * Math.sin(t * 25));
    }
    s.stars3.forEach((st, i) => { const a3 = k === 'win' ? eBack(seg(tl, 1.4 + i * 0.5, 1.8 + i * 0.5)) : 0; st.visible = a3 > 0.01; st.scale.setScalar(1.1 * Math.max(0.001, a3)); st.position.set(P.S.x - 0.95 + i * 0.95, P.S.top + 1.7 + Math.sin(t * 3 + i) * 0.08, P.S.z - 0.2); });
    const hl = (k === 'win' || k === 'mig2' || k === 'four') ? 0.25 + 0.15 * Math.sin(t * 4) : 0;
    const jm = h.C.S.material; jm.emissive.set('#3fae6a'); jm.emissiveIntensity = hl; const wm = s.planets.S.userData.body.material; wm.emissive.set('#3fae6a'); wm.emissiveIntensity = hl * 0.8;
    s.beam.visible = false; s.ele.visible = s.hor.visible = false;
    const mg = k === 'mig' || k === 'mig2', mt = k === 'mig' ? tl : k === 'mig2' ? tl + BEATS.find((x) => x.k === 'mig').d : 0;
    s.mig.forEach((d, i) => {
      const q = ['E', 'W', 'N'][i % 3], F = P[q], Tt = P.S, row = Math.floor(i / 3), st = 0.9 + row * 0.4 + (i % 3) * 0.15, p = eIO(seg(mt, st, st + 2.2)), sp = 0.42 * (row - 1);
      d.visible = mg && mt > st;
      const bump = q === 'N' ? (row === 1 ? 2.6 : row === 0 ? -2.6 : 3.2) * Math.sin(p * PI) : 0;
      d.position.set(lerp(F.x, Tt.x + sp, p) + bump, lerp(F.top, Tt.top - 0.08 * Math.abs(row - 1), p) + Math.sin(p * PI) * 1.9, lerp(F.z, Tt.z - 0.35 + (i % 3) * 0.3, p));
      d.children[0].material.opacity = 0.7 * (1 - 0.7 * seg(mt, st + 2.2, st + 2.8)); walkPose(d.userData.p, t * 6 + i, p < 1 ? 0.5 : 0.15);
    });
    const LO = [[1.85, 0.0, -0.45], [-1.95, 0.0, -0.45], [0, 1.0, 0.75]];
    s.migL.forEach((l, i) => { const a4 = k === 'mig2' ? eBack(seg(tl, 0.5 + i * 0.35, 0.9 + i * 0.35)) : 0; l.visible = a4 > 0.01; l.scale.set(1.7 * a4, 1.7 * a4 * 0.3125, 1); l.position.set(P.S.x + LO[i][0], P.S.top + LO[i][1], P.S.z + LO[i][2]); });
    const lead = k === 'mig' || k === 'mig2' || k === 'win';
    if (lead) { const p = k === 'mig' ? eIO(seg(tl, 0.2, 2.4)) : 1, N = P.N, S2 = P.S; s.fking.position.set(lerp(N.x, S2.x, p) + 3.0 * Math.sin(p * PI), lerp(N.top, S2.top, p) + Math.sin(p * PI) * 1.8, lerp(N.z, S2.z - 0.15, p)); s.fking.scale.setScalar(0.5); s.fwheel.position.set(s.fking.position.x, s.fking.position.y + 1.2, s.fking.position.z); s.fwheel.scale.setScalar(0.75); s.fwheel.rotation.z = -t * 3; walkPose(s.fking, t * 3, p < 1 ? 0.3 : 0); }
    const rs = k === 'rise'; s.fwheel.visible = s.fking.visible = rs || lead;
    if (rs) { const p = eIO(seg(tl, 0.2, 3.6)), y = lerp(P.S.top, 8.5, p), z = lerp(P.S.z - 0.15, 0.8, p); s.fking.position.set(0, y, z); s.fking.scale.setScalar(lerp(0.5, 0.9, p)); s.fwheel.position.set(0, y + lerp(1.2, 2.1, p), z); s.fwheel.scale.setScalar(lerp(0.75, 1.4, p)); s.fwheel.rotation.z = -t * 3; walkPose(s.fking, t * 3, 0.2); }
  },
  street(t, b, tl, s) {
    s.crowd.forEach((p) => { const u = p.userData; let x = u.x0 + u.dir * t * 1.2; x = ((x + 23) % 46 + 46) % 46 - 23; p.position.set(x, 0.16, u.z); p.rotation.y = u.dir > 0 ? PI / 2 : -PI / 2; walkPose(p, t * 6 + u.x0, 0.5); });
    s.aliens.forEach((p, i) => {
      const u = p.userData, w = eIO(seg(tl, 0, 2.2)), turn = eIO(seg(tl, 2.2, 2.7)), pop = eBack(seg(tl, 2.5 + i * 0.25, 2.9 + i * 0.25));
      p.position.set(u.tx - 3.2 * (1 - w), 0.16, -1.0); p.rotation.y = lerp(PI / 2, 0, turn); walkPose(p, t * 6 + i, w < 1 ? 0.5 : 0);
      u.aR.rotation.z = turn > 0.5 ? 0.9 + Math.sin(t * 8 + i) * 0.5 : 0; u.aR.rotation.x = turn > 0.5 ? -2.4 : u.aR.rotation.x;
      u.ring.material.opacity = 0.6 * pop; u.q.visible = pop > 0.01; u.q.scale.set(1.5 * pop, 1.5 * pop * 0.3125, 1); u.q.position.y = 2.6 + Math.sin(t * 4 + i) * 0.08;
    });
  },
  faces(t, b, tl, s) {
    ['E', 'W', 'N', 'S'].forEach((q, i) => {
      const F = s.F[q], pop = eBack(seg(tl, 0.3 + i * 0.35, 0.7 + i * 0.35));
      F.p.scale.setScalar(1.75 * Math.max(0.001, pop)); F.p.visible = pop > 0.01;
      F.gl.material.opacity = 0.35 * pop;
      F.lb.visible = tl > 0.9 + i * 0.35;
      const u = F.p.userData; u.aR.rotation.z = 0.5 + Math.sin(t * 6 + i) * 0.4; u.aL.rotation.z = -0.08;
      F.p.position.y = 0.22 + Math.abs(Math.sin(t * 4 + i)) * 0.05; u.head.rotation.y = Math.sin(t * 1.2 + i) * 0.15;
    });
  },
  utk(t, b, tl, s) {
    animSea(s.river, t, 0.05);
    const fo = b.k === 'u0'; s.flyover.visible = fo;
    if (fo) { const p = seg(tl, 0, b.d); s.flyover.position.set(lerp(-13, 13, p), 8.2 + Math.sin(t * 1.5) * 0.2, lerp(-4.5, -2.5, p)); s.fw.rotation.z = -t * 3; s.flyover.children.forEach((c, i) => { if (c.userData.lL) walkPose(c, t * 3 + i, 0.25); }); }
    const r0 = T0.u1 + 0.2;
    s.stalks.forEach((st, i) => { const g2 = 0.06 + 0.94 * eOut(seg(t, r0 + (i % 9) * 0.08, r0 + 1.6 + (i % 9) * 0.08)); st.scale.y = g2; st.position.y = 0.45 * g2; st.rotation.z = Math.sin(t * 1.5 + i) * 0.06; const hd = s.heads[i]; hd.visible = g2 > 0.85; hd.position.y = 0.9 * g2 + 0.05; });
    const f0 = T0.u2 + 0.6, f1 = T0.u2 + 2.6, on = seg(t, f0, f0 + 0.35) * (1 - seg(t, f1, f1 + 0.3));
    s.flames.forEach((fl, i) => { const v = on * (0.8 + 0.3 * Math.sin(t * 14 + i * 2)); fl.scale.set(1, Math.max(0.01, v), 1); fl.visible = v > 0.02; fl.position.y = 0.12 + 0.19 * v; });
    s.fglow.material.opacity = on * 0.9;
    s.steam.forEach((st, i) => { const sp = (t * 0.6 + i * 0.25) % 1, a = seg(t, f0 + 1.0, f0 + 1.4) * (1 - seg(t, T0.u2 + 3.6, T0.u2 + 4.0)); st.position.set(Math.sin(i * 2 + t) * 0.15, 0.95 + sp * 1.0, 0); st.material.opacity = a * (1 - sp) * 0.7; });
    s.goods.forEach((gd, i) => { gd.rotation.y = t * 0.8 + i; });
    s.sparkle.forEach((sp, i) => { sp.position.set(Math.cos(i * 0.8) * 1.6, 3.2 + (i % 4) * 0.5, Math.sin(i * 0.8) * 1.6 + 0.3); sp.material.opacity = 0.5 + 0.5 * Math.sin(t * 5 + i * 1.7); });
    const fa = T0.u3 + 0.5;
    s.falling.forEach((f, i) => { const p = eIO(seg(t, fa + i * 0.3, fa + 1.6 + i * 0.3)); f.position.set(lerp(i ? 0.7 : -0.7, i ? 0.9 : -0.9, p), lerp(3.3, 1.2, p), lerp(0.6, 1.75, p)); f.rotation.y = t * 2; f.visible = t > fa - 0.2; });
    s.getters.forEach((g2, i) => { const u = g2.userData, r = eIO(seg(t, fa - 0.4, fa + 0.4)); u.aR.rotation.x = -2.4 * r; u.aL.rotation.x = -2.4 * r; g2.rotation.y = i ? -0.3 : 0.3; });
    s.dancers.forEach((p, i) => { const a = (i / 5) * TAU + t * 0.8; p.position.set(Math.cos(a) * 1.25, Math.abs(Math.sin(t * 5 + i)) * 0.15, Math.sin(a) * 1.25); p.rotation.y = PI / 2 - a; walkPose(p, t * 5 + i, 0.3); const u = p.userData; u.aL.rotation.z = -1.6 - Math.sin(t * 5 + i) * 0.7; u.aR.rotation.z = 1.6 + Math.sin(t * 5 + i) * 0.7; });
    s.notes.forEach((n, i) => { const sp = (t * 0.5 + i * 0.25) % 1; n.position.set(Math.sin(i * 1.7) * 0.6, 1.4 + sp * 1.6, Math.cos(i * 1.7) * 0.6); n.material.opacity = Math.sin(sp * PI); });
    s.swimmers.forEach((p, i) => { p.position.y = -0.82 + Math.sin(t * 2 + i) * 0.07; const u = p.userData; u.aL.rotation.x = Math.sin(t * 3 + i) * 2.2; u.aR.rotation.x = -Math.sin(t * 3 + i) * 2.2; });
    const pk = T0.u5 + 0.5, bp = s.beachP, bu = bp.userData, r1 = eIO(seg(t, pk, pk + 0.7)), r2 = eIO(seg(t, pk + 0.9, pk + 1.5));
    bp.rotation.y = lerp(0, 0.9, r1) - 0.9 * r2; bu.aR.rotation.x = -1.2 * r1 * (1 - r2) - 2.5 * r2; bu.aL.rotation.x = -2.5 * r2;
    const r3 = eIO(seg(t, pk + 0.5, pk + 1.3)); s.shirtHeld.position.set(lerp(1.2, -0.45, r3), lerp(0.32, 1.45, r3), lerp(5.0, 5.85, r3)); s.shirtHeld.rotation.set(-PI / 2 * (1 - r3), 0, 0);
    const worn = t > pk + 2.1; s.shirtHeld.visible = !worn; bu.body.material.color.set(worn ? GOLD : '#ffffff');
    const k6 = s.kneel.userData; k6.aR.rotation.x = -1.35; k6.aL.rotation.x = -0.3;
    s.drops.forEach((d, i) => { const sp = (t * 0.9 + i * 0.25) % 1; d.position.set(-0.42 + sp * 0.1, 0.42 - sp * 0.2, 0.12); d.visible = t > T0.u6 + 0.6; });
    const hb = eBack(seg(t, T0.u6 + 1.8, T0.u6 + 2.3)); s.heart.visible = hb > 0.01; s.heart.scale.set(0.8 * hb, 0.8 * hb * 0.3125, 1); s.heart.position.set(-0.3, 0.95 + Math.sin(t * 3) * 0.05, 0.1);
    const b0 = T0.u7, bb = s.bigBird; bb.visible = t >= b0 - 0.1 && t < b0 + 3.75;
    const P0 = new T.Vector3(-11, 7, -10), P1 = new T.Vector3(-6.4, 1.8, -5.6), P2 = new T.Vector3(-2.5, 8.5, -11.5);
    const pIn = eOut(seg(t, b0, b0 + 1.3)), pUp = eIO(seg(t, b0 + 1.6, b0 + 3.6)), early = t < b0 + 1.6;
    const pos = early ? P0.clone().lerp(P1, pIn) : P1.clone().lerp(P2, pUp); bb.position.copy(pos);
    const dir = early ? P1.clone().sub(P0) : P2.clone().sub(P1); bb.rotation.set(early ? 0.25 : -0.35, Math.atan2(dir.x, dir.z), 0);
    const fl2 = Math.sin(t * 9) * 0.7; bb.userData.wL.rotation.z = fl2; bb.userData.wR.rotation.z = -fl2;
    if (!early) s.shroud.position.set(pos.x - s.bier.position.x, pos.y - 0.85, pos.z - s.bier.position.z); else s.shroud.position.set(0, 0.45, 0);
  },
  night(t, b, tl, s) {
    animSea(s.seaM, t, 0.16);
    const w = s.wheel; w.rotation.z = -t * 1.5;
    if (b.k === 'w0') { const p = eIO(seg(tl, 0.5, 3.2)); w.position.set(13, lerp(-4, 15, p), -58); w.rotation.y = 0; w.scale.setScalar(1); w.userData.glow.material.opacity = 0.6 + 0.3 * p; s.bubble.position.set(13, 0.5, -58); s.bubble.material.opacity = seg(tl, 0.3, 0.9) * (1 - seg(tl, 1.6, 2.6)) * 0.9; s.bubble.scale.setScalar(9); }
    else if (b.k === 'w1') { const p = eIO(seg(tl, 0, 2.2)); w.position.set(lerp(13, 2.4, p), lerp(15, 6.6, p), lerp(-58, -4, p)); w.rotation.y = lerp(0, -0.25, p); s.bubble.material.opacity = 0; w.userData.glow.material.opacity = 0.85; w.scale.setScalar(1); }
    else { const p = eIO(seg(tl, 0, 2.4)); w.position.set(lerp(2.4, -6.5, p), lerp(6.6, 3.6, p) + Math.sin(t * 2) * 0.1, lerp(-4, 11.6, p)); w.rotation.y = lerp(-0.25, 0.4, p); w.scale.setScalar(lerp(1, 0.3, p)); s.bubble.material.opacity = 0; }
    const ar = b.k === 'arrive' ? eIO(seg(tl, 1.8, 2.6)) : 0, ku = s.king.userData; ku.aR.rotation.x = -2.4 * ar; ku.aL.rotation.x = -2.4 * ar; ku.head.rotation.x = -0.3;
    s.kglow.material.opacity = b.k === 'arrive' ? seg(tl, 2.0, 2.8) * (0.7 + 0.2 * Math.sin(t * 5)) : 0;
    s.tbeam.material.opacity = b.k === 'arrive' ? seg(tl, 1.6, 2.3) * (0.32 + 0.1 * Math.sin(t * 9)) : 0; s.tbeam.visible = s.tbeam.material.opacity > 0.005; s.nsky.worlds.forEach((w, i) => { w.rotation.y = t * 0.05 + i; });
    s.watchers.forEach((p, i) => { const u = p.userData, r = b.k === 'w0' ? eIO(seg(tl, 2.2 + i * 0.12, 2.8 + i * 0.12)) : 1; u.aR.rotation.x = i % 2 ? -2.3 * r : 0; u.head.rotation.x = -0.35 * r; });
  },
  fly(t, b, tl, s) {
    s.land.position.x = 30 - tl * 7; s.planet.rotation.z = tl * 0.007; s.clouds.forEach((c, i) => { let x = c.userData.x0 - t * 16; x = ((x + 90) % 180 + 180) % 180 - 90; c.position.x = x; }); s.shield.material.uniforms.o.value = 0.75 + 0.15 * Math.sin(t * 3);
    s.pro.position.y = 4.2 + Math.sin(t * 1.3) * 0.18;
    s.wheel.rotation.z = -t * 3;
    s.army.forEach((p, i) => { p.position.y = Math.sin(t * 2 + i) * 0.08; walkPose(p, t * 3 + i, 0.35); });
    s.king.position.y = Math.sin(t * 1.8) * 0.06; walkPose(s.king, t * 2.4, 0.25);
    s.ele.userData.legs.forEach((l, i) => (l.rotation.z = Math.sin(t * 3 + i * PI * 0.5) * 0.3));
    [s.wEle, s.wHor].forEach((m, j) => { m.position.y = 0.2 + Math.sin(t * 2.2 + j) * 0.2; m.userData.legs.forEach((l, i) => (l.rotation.z = Math.sin(t * 8 + i * PI * 0.5) * 0.45)); });
    s.lying.position.y = 0.3 + Math.sin(t * 1.7) * 0.06;
  },
  sea(t, b, tl, s) {
    const op = eIO(seg(tl, 0.1, 1.5)), inner = lerp(0, 3.6, op);
    s.wl.position.x = -(inner + 7); s.wr.position.x = inner + 7; s.tl.position.x = -(inner + 34); s.tr.position.x = inner + 34;
    s.gems.forEach((g2, i) => { g2.scale.setScalar(0.8 + 0.4 * Math.sin(t * 6 + i)); g2.rotation.y = t * 2 + i; g2.visible = op > 0.3; });
    s.wheel.position.set(0, 2.4 + Math.sin(t * 2) * 0.2, lerp(1, -24, eIO(seg(tl, 0.3, 4.2)))); s.wheel.rotation.z = -t * 3;
    const wz = lerp(2, -10, seg(tl, 0.6, 4.2));
    s.king.position.z = wz - 1.8; walkPose(s.king, t * 5, 0.4);
    s.walkers.forEach((p, i) => { p.position.z = wz + Math.floor(i / 4) * 1.8; walkPose(p, t * 5 + i, 0.5); p.rotation.x = i === 2 ? 0.6 * Math.max(0, Math.sin(t * 2.2)) : 0; });
    s.bub.forEach((bu, i) => { const side = i % 2 ? 1 : -1, sp = (t * 0.25 + hash(i)) % 1; bu.position.set(side * (inner + 0.6 + hash(i + 4) * 1.5), -1 + sp * 7.5, 2 - hash(i + 9) * 30); bu.material.opacity = 0.5 * Math.sin(sp * PI) * op; });
  },
  east(t, b, tl, s) {
    animSea(s.ocean, t, 0.12);
    const land = eIO(seg(t, T0.eA + 0.3, T0.eA + 2.8));
    s.emp.position.y = lerp(7.5, 0.5, land); s.wheel.position.y = s.emp.position.y + 3.4 + Math.sin(t * 2) * 0.12; s.wheel.rotation.z = -t * 2;
    s.town.forEach((p, i) => walkRing(p, t, 0, 0, 7.4 + (i % 2) * 0.5, i % 2 ? 0.12 : -0.1, i * 0.63));
    s.chat.forEach((p, i) => { const u = p.userData; u.aR.rotation.z = b.k === 'eB' ? 0.6 + Math.sin(t * 5 + i * 2) * 0.5 : 0.1; u.head.rotation.y = Math.sin(t * 1.5 + i) * 0.2; });
    const bt = t - T0.eC; s.kings.forEach((pv, i) => { pv.rotation.x = 0.55 * eIO(seg(bt, 0.4 + i * 0.18, 1.2 + i * 0.18)); });
    const u = s.emp.userData, r = eIO(seg(bt, 1.4, 2.0)); u.aR.rotation.z = 1.4 * r; u.aR.rotation.x = -0.4 * r;
    const sb = eBack(seg(bt, 1.8, 2.3)); s.sila.visible = sb > 0.01; s.sila.scale.set(1.9 * sb, 1.9 * sb * 0.3125, 1); s.sila.position.y = 3.2 + Math.sin(t * 2) * 0.05;
  },
  west(t, b, tl, s) {
    animSea(s.ocean, t, 0.12);
    const ap = eIO(seg(t, T0.wA + 0.2, T0.wA + 3.0)); s.arr.position.set(lerp(10, -1.5, ap), lerp(9, 4.6, ap) + Math.sin(t * 1.6) * 0.15, lerp(-2, -1.0, ap)); s.ae.rotation.y = PI / 2 + 0.6 * ap; s.aw.rotation.z = -t * 2.5; walkPose(s.ae, t * 2.5, 0.2);
    s.folk.forEach((p, i) => { if (i < 6) walkRing(p, t, i < 3 ? -4.4 : 4.0, -3.4, 1.6 + (i % 3) * 0.5, i % 2 ? 0.25 : -0.22, i * 1.7); else { p.position.set(-5.5 + (i - 6) * 5.0, 0, -0.4); p.rotation.y = 0.4; } });
    const bow = eIO(seg(t, T0.wB + 2.3, T0.wB + 3.0));
    s.chat.forEach((p, i) => { const u = p.userData; u.head.rotation.x = -0.3 * (1 - bow); u.aR.rotation.x = -2.2 * eIO(seg(t, T0.wB + 0.6 + i * 0.3, T0.wB + 1.1 + i * 0.3)) * (1 - bow); });
    s.fisher.userData.aR.rotation.x = -0.9 + Math.sin(t * 1.3) * 0.08;
  },
  forest(t, b, tl, s) {
    s.aura.material.opacity = 0.7 + 0.25 * Math.sin(t * 3); s.aura.scale.setScalar(3.4 + 0.3 * Math.sin(t * 2));
    s.lights.forEach((lt, i) => {
      const d0 = 0.2 + (i % 10) * 0.14 + Math.floor(i / 10) * 0.05, p = eOut(seg(tl, d0, d0 + 2.4));
      const a = i * 2.399 + (1 - p) * 3.0 + t * 0.15, rT = 3.0 + (i % 4) * 0.7, yT = 2.4 + (i % 5) * 0.65, r = lerp(rT + 3, rT, p), y = lerp(26, yT, p) + Math.sin(t * 2 + i) * 0.15 * p;
      lt.position.set(Math.cos(a) * r, y, -1.2 + Math.sin(a) * r * 0.8); lt.material.opacity = 0.95 * seg(tl, d0, d0 + 0.3); lt.scale.setScalar(1.0 + 0.25 * Math.sin(t * 5 + i));
    });
  },
  gap(t, b, tl, s, S) {
    const fOn = b.k === 'g2' ? seg(tl, 0.5, 0.9) * (1 - 0.75 * seg(tl, 2.4, 4.2)) : 0;
    S.hemi.intensity = 0.42 + 0.5 * fOn; S.hemi.color.set(fOn > 0.05 ? '#fff1c8' : '#7a6ab8'); S.sun.intensity = 0.3 + 0.6 * fOn;
    s.flash.material.opacity = fOn * (1 - 0.8 * seg(tl, 0.9, 1.5)); s.flash.scale.setScalar(4 + 16 * seg(tl, 0.5, 1.0));
    s.bats.forEach((bt, i) => { bt.rotation.z = Math.sin(t * 0.9 + i) * 0.06; const u = bt.userData, lk = b.k === 'g2' ? eIO(seg(tl, 0.9 + i * 0.05, 1.5 + i * 0.05)) : 0; u.head.rotation.y = (i % 2 ? 0.9 : -0.9) * lk; u.head.rotation.x = -0.15 * lk; u.eyes.forEach((e) => e.scale.setScalar(1 + 0.6 * lk)); });
    s.mist.forEach((m) => (m.material.opacity = 0.35 * (1 - fOn * 0.8)));
    const k = b.k, hell = ['gHunger', 'gFall', 'gSin'].includes(k);
    animSea(s.sea, t, 0.12); const sv = k === 'gFall' ? 1 : 0; s.sea.material.emissiveIntensity = 0.12 + 0.5 * sv; s.sea.material.color.set(sv ? '#1f5a6a' : '#0c2228'); s.cold.forEach((c, i) => { c.position.y = -5.6 + Math.sin(t * 0.8 + i) * 0.3; c.material.opacity = 0.06 + 0.22 * sv; });
    const hl = k === 'g0' ? eBack(seg(tl, 1.4, 1.9)) : k === 'gWhy' ? 1 - seg(tl, 3.4, 3.9) : 0; s.hellLab.visible = hl > 0.01; s.hellLab.scale.set(4.6 * hl, 4.6 * hl * 0.3125, 1);
    s.red.material.opacity = hell ? 0.22 + 0.06 * Math.sin(t * 3) : 0;
    s.bats.forEach((bt, i) => { bt.userData.eyes.forEach((e) => { e.material.color.set(hell ? '#ff4a3a' : '#ffd84a'); e.material.emissive.set(hell ? '#ff2a1a' : '#ffd84a'); }); });
    const [b0, b1] = s.bats, p0 = b0.userData.p0, p1 = b1.userData.p0;
    let reach = k === 'gHunger' ? eIO(seg(tl, 0.6, 1.6)) : k === 'gFall' ? 1 - seg(tl, 0.5, 0.8) : 0;
    const jit = k === 'gHunger' && tl > 1.6 ? Math.sin(t * 22) * 0.05 : 0;
    b0.position.set(p0.x + 0.45 * reach + jit, p0.y, p0.z); b0.rotation.z = -0.35 * reach + b0.rotation.z * 0.3;
    b1.position.copy(p1); b1.position.x -= 0.45 * reach - jit; b1.rotation.z = 0.35 * reach + b1.rotation.z * 0.3; b1.scale.setScalar(1.1); b1.visible = true;
    b0.userData.head.rotation.y = 0.8 * reach; b1.userData.head.rotation.y = -0.8 * reach;
    s.steam.forEach((st) => (st.material.opacity = 0)); s.ring.material.opacity = 0;
    if (k === 'gFall') {
      const f = seg(tl, 0.6, 1.5), d = seg(tl, 1.5, 2.7), back = eBack(seg(tl, 3.7, 4.2));
      if (tl < 3.7) { b1.position.set(p1.x, lerp(p1.y, -6.0, f * f), p1.z); b1.rotation.z = f * 2.6; b1.rotation.x = f * 0.8; b1.scale.set(1.1 * (1 - 0.5 * d), 1.1 * (1 - d), 1.1 * (1 - 0.5 * d)); b1.position.y -= d * 0.8; b1.visible = d < 0.98; }
      else { b1.position.copy(p1); b1.rotation.set(0, b1.rotation.y, 0); b1.scale.setScalar(1.1 * Math.max(0.001, back)); }
      s.ring.material.opacity = 0.8 * (1 - seg(tl, 1.5, 2.3)) * (tl > 1.5 ? 1 : 0); s.ring.scale.setScalar(1 + 6 * seg(tl, 1.5, 2.3));
      s.steam.forEach((st, i) => { const q = seg(tl, 1.5 + i * 0.06, 2.9 + i * 0.06); st.material.opacity = 0.8 * Math.sin(q * PI); st.position.y = -6.2 + q * 2.6; st.scale.setScalar(1.6 + q * 2.4); });
    }
    s.marks.forEach((m, i) => { const a = b.k === 'g2' ? eBack(seg(tl, 1.2 + i * 0.2, 1.6 + i * 0.2)) : 0; m.visible = a > 0.01; m.scale.set(0.9 * a, 0.9 * a * 0.3125, 1); m.position.y = 1.8 + Math.sin(t * 4 + i) * 0.05; });
  },
};
function postCam(t, b, tl, S, camera) {
  if (b.sc === 'space' && b.k === 'cover') {
    camera.updateMatrixWorld(true); const w = S.sc.space.wheel;
    _v.set(3.2, -4.6 + Math.sin(tl * 2) * 0.15, -19).applyMatrix4(camera.matrixWorld); w.position.copy(_v);
    w.scale.setScalar(0.42); w.quaternion.copy(camera.quaternion); w.rotateY(0.5); w.rotateX(-0.2); w.rotateZ(-t * 3);
  }
  if (b.sc === 'space' && b.k === 'hook') {
    camera.updateMatrixWorld(true); const w = S.sc.space.wheel, p = eIO(seg(tl, 0.2, 4.2));
    _v.set(lerp(-16, 13, p), lerp(4, -2, p) + Math.sin(tl * 2) * 0.8, -42).applyMatrix4(camera.matrixWorld); w.position.copy(_v);
    w.scale.setScalar(1); w.quaternion.copy(camera.quaternion); w.rotateY(0.45); w.rotateX(-0.25); w.rotateZ(-t * 4);
  }
}
/* ===== part 3: timeline, camera, animation, audio ===== */
const L = (sz, txt, col, w) => [sz, [txt, col || WHITE, w || 800]];
const nf = (v) => Math.round(v).toLocaleString('en-US');
const C2 = (p, l, f) => ({ p, l, f: f || 40 });
const logLerp = (a, b, k) => Math.exp(lerp(Math.log(a), Math.log(b), k));
const fieldCam = (d0, d1, tilt, tilt0) => (tl, b) => { const k = eIO(clamp(tl / b.d)), d = logLerp(d0, d1, k), a = lerp(tilt0 || tilt || 52, tilt || 52, k) * PI / 180, sw = 0.12 * Math.sin(tl * 0.25); return { p: [Math.sin(sw) * d * Math.cos(a), d * Math.sin(a), Math.cos(sw) * d * Math.cos(a)], l: [0, d * 0.02, 0], f: 40, near: Math.max(0.1, d * 0.004), far: d * 8 }; };
const counter = (from, to, t0, dur) => (t) => nf(logLerp(from, to, eOut(clamp((t - t0) / dur))));

const BEATS = [
  { k: 'cover', d: 2.0, sc: 'space', y: 430, instant: 1, cap: [L(112, 'คัมภีร์พุทธ มีทั้ง'), L(140, 'มนุษย์ต่างดาว', GOLD), L(130, 'และยานบิน!', TEAL)], c: [C2([8.5, 10.5, 25], [0, 4.6, 0]), C2([8.0, 10.2, 24], [0, 4.6, 0])] },
  { k: 'hook', d: 4.6, sc: 'space', field: 1, iris: 1, cap: [L(64, 'ต่างดาวพวกนี้ อยู่ที่ไหน?'), L(60, 'แล้วใครขับยาน ไปหาเขาได้?', GOLD)],
    cf: (tl, b) => { const k = eIO(clamp(tl / b.d)); return { p: [lerp(70, 26, k), lerp(64, 50, k), lerp(150, 118, k)], l: [lerp(10, 0, k), 0, lerp(-20, -6, k)], f: 40, near: 0.5, far: 3000 }; } },
  { k: 'one', d: 4.6, sc: 'space', iris: 1, tag: 'tri', cap: [L(60, 'โลกเราเป็นแค่ 1 ใน 4 ทวีป'), L(54, 'รอบเขาพระสุเมรุ ใจกลางจักรวาล', GOLD, 600)], c: [C2([0, 16, 28], [0, 2.4, 0]), C2([5, 14, 25.5], [0, 2.4, 0])] },
  { k: 'sci', d: 4.6, sc: 'space', foot: 'ในคัมภีร์คือทวีปกลางมหาสมุทร · ภาพนี้คือการตีความ', cap: [L(58, 'ถ้าตีความแบบยุคอวกาศ…'), L(56, 'ก็เหมือน 4 โลก ลอยรอบแกนกลาง', GOLD)], c: [C2([4, 14, 30], [0, 1.8, 0]), C2([11, 12.5, 33.5], [0, 1.4, 0])] },
  { k: 'four', d: 4.2, sc: 'space', tag: 'tri', cap: [L(60, 'เราอยู่ทวีปใต้ "ชมพูทวีป"'), L(54, 'อีก 3 ทวีป อยู่ไกลสุดขอบมหาสมุทร', TEAL, 600)], c: [C2([0, 7.6, 21], [0, 1.8, 2.4])] },
  { k: 'noway', d: 4.0, sc: 'space', cap: [L(60, 'แล้วจะข้ามไปหาเขาได้ไง?'), L(56, 'คัมภีร์เล่าว่า มีคนเดียวที่ทำได้…', GOLD)], c: [C2([6.4, 5.4, 14.8], [2.4, 1.7, 2.2], 44), C2([5.6, 4.9, 13.8], [2.6, 1.7, 2.0], 44)] },
  { k: 'w0', d: 4.4, sc: 'night', tag: 'trp', cap: [L(58, 'คืนเพ็ญหนึ่ง ในชมพูทวีป…'), L(62, 'พระจันทร์ขึ้นมา 2 ดวง?!', GOLD)], c: [C2([0, 2.6, 21], [0, 9.5, -30], 46), C2([1, 3.0, 19], [2, 10, -30], 46)] },
  { k: 'w1', d: 4.2, sc: 'night', tag: 'tri', cap: [L(62, 'ที่แท้คือ "จักรแก้ว"', GOLD), L(56, 'วงล้อทิพย์ ซี่ล้อ 1,000 ซี่')], c: [C2([0.6, 5.6, 12.5], [2.2, 8.6, -4], 44)] },
  { k: 'arrive', d: 4.4, sc: 'night', tag: 'tri', cap: [L(58, 'จักรบินมาหา พระราชาผู้ทรงธรรม'), L(56, 'ท่านจึงได้เป็น "พระเจ้าจักรพรรดิ"', GOLD)], cf: (tl, b) => { const p = eIO(seg(tl, 0, 2.4)), wp = [lerp(2.4, -6.5, p), lerp(6.6, 3.6, p), lerp(-4, 11.6, p)], kl = [-6.4, 2.9, 10.8], m = eIO(seg(tl, 1.4, 3.0)), k = eIO(clamp(tl / b.d)), P0 = [1.0, 4.6, 19.0], P1 = [-2.0, 3.0, 1.8]; return { p: P0.map((v, i) => lerp(v, P1[i], k)), l: wp.map((v, i) => lerp(v, kl[i], m)), f: 44, near: 0.1, far: 700 }; } },
  { k: 'w2', d: 4.6, sc: 'fly', tag: 'trp', cap: [L(64, 'ออกเดินทาง!', GOLD), L(56, 'กองทัพลอยขึ้นฟ้า ตามจักรไป'), L(46, 'จะยืน นั่ง หรือนอนไปก็ได้!', TEAL, 600)], c: [C2([14, 7.5, 12], [1.5, 4.2, 0], 42), C2([10.5, 6.8, 14.5], [0.4, 4.4, 0], 42)] },
  { k: 'w4', d: 4.2, sc: 'sea', tag: 'trp', cap: [L(58, 'ถึงมหาสมุทร… แหวกออกเป็นทาง!'), L(52, 'กว้าง 1 โยชน์ เดินเก็บเพชรพลอยได้', TEAL, 600)], c: [C2([0, 5.4, 14], [0, 1.4, -10], 46), C2([0, 4.4, 9], [0, 1.1, -12], 46)] },
  { k: 'eA', d: 4.4, sc: 'east', tag: 'trp', cap: [L(60, 'ทวีปตะวันออก "ปุพพวิเทหะ"', '#e6ecff'), L(54, 'ทวีปรูปกลม เหมือนพระจันทร์เต็มดวง', GOLD, 600)], c: [C2([0, 44, 92], [0, -9, 0]), C2([3, 17, 21], [0, 2.0, -0.8])] },
  { k: 'eB', d: 3.8, sc: 'east', tag: 'trp', cap: [L(58, 'คนที่นี่หน้ากลม อายุ 100 ปี'), L(54, 'มีเมือง มีกษัตริย์ เหมือนบ้านเรา', TEAL, 600)], c: [C2([5.0, 2.3, 12.8], [4.95, 1.4, 7.1], 44)] },
  { k: 'eC', d: 4.4, sc: 'east', tag: 'tri', cap: [L(58, 'กษัตริย์ทุกองค์ มาก้มกราบเอง'), L(54, 'พระองค์สั่งแค่ "ให้รักษาศีล 5"', GOLD)], c: [C2([5.8, 4.3, 11.0], [0.2, 3.3, -1.1])] },
  { k: 'wA', d: 4.4, sc: 'west', tag: 'trp', cap: [L(60, 'ทวีปตะวันตก "อมรโคยาน"', '#8fd6ff'), L(54, 'ทวีปรูปครึ่งวงเดือน', GOLD, 600)], c: [C2([0, 44, 90], [0, -9, -1]), C2([-3, 16.5, 19], [-0.5, 1.5, -2])] },
  { k: 'wB', d: 4.0, sc: 'west', tag: 'trp', cap: [L(58, 'คนหน้าครึ่งวงเดือน อายุ 400 ปี'), L(54, 'มีแม่น้ำ มีเมืองใหญ่เมืองน้อย', TEAL, 600)], c: [C2([-3.2, 2.4, 8.2], [-3.6, 1.4, 2.4], 44)] },
  { k: 'u0', d: 3.8, sc: 'utk', tag: 'trp', cap: [L(60, 'ทวีปเหนือ "อุตตรกุรุ"', GOLD), L(54, 'ทวีปสี่เหลี่ยม มีภูเขาทองล้อมรอบ', WHITE, 600)], c: [C2([0, 44, 92], [0, -9, -1.5], 40), C2([2, 14.5, 21.5], [0, 1.6, -0.8], 40)] },
  { k: 'uF', d: 3.6, sc: 'utk', tag: 'trp', cap: [L(58, 'คนหน้าเหลี่ยม อายุ 1,000 ปี'), L(54, 'หนุ่มสาวตลอดชีวิต ไม่เจ็บไม่ป่วย', TEAL, 600)], c: [C2([5.0, 2.8, 5.0], [5.0, 1.2, -0.6])] },
  { k: 'u1', d: 3.4, sc: 'utk', tag: 'tri', cap: [L(58, 'ไม่ต้องทำนา ข้าวขึ้นเอง'), L(54, 'ไม่มีแกลบ ไม่มีรำ หอมทุกเม็ด', GOLD, 600)], c: [C2([-5, 4.4, 5.6], [-5, 1.2, -2])] },
  { k: 'u2', d: 3.4, sc: 'utk', tag: 'trp', cap: [L(62, 'หุงข้าวบนหินวิเศษ'), L(56, 'ไฟลุกเอง สุกแล้วดับเอง!', CORAL)], c: [C2([-1.0, 3.2, 1.6], [-1.4, 1.0, -3.5])] },
  { k: 'u3', d: 3.6, sc: 'utk', tag: 'trp', cap: [L(60, 'ต้นกัลปพฤกษ์ สูง 100 โยชน์'), L(54, 'อยากได้เสื้อผ้า ของกิน หยิบเลย', GOLD, 600)], c: [C2([2.6, 4.6, 6.6], [2.5, 3.4, -4.6], 44)] },
  { k: 'u5', d: 3.4, sc: 'utk', tag: 'tri', cap: [L(62, 'ไม่มีใครหวงของ'), L(54, 'ขึ้นจากน้ำ หยิบเสื้อใครใส่ก็ได้!', TEAL, 600)], c: [C2([2.0, 3.6, 12.8], [2.2, 0.8, 5.8])] },
  { k: 'u6', d: 3.6, sc: 'utk', tag: 'trp', cap: [L(60, 'เด็กเกิดใหม่ วางไว้ข้างทาง'), L(54, 'ใครผ่านมาป้อนนิ้ว มีนมไหลออก!', CORAL, 600)], c: [C2([-2.9, 2.9, 8.0], [-3.4, 0.7, 2.8])] },
  { k: 'u7', d: 3.4, sc: 'utk', tag: 'trp', cap: [L(60, 'ตายแล้ว ไม่มีใครร้องไห้'), L(56, 'นกใหญ่บินมาคาบร่างไป', GOLD)], c: [C2([-4.2, 3.4, 1.6], [-6, 2.2, -5.6]), C2([-3.6, 4.4, 2.6], [-5, 4.6, -7], 44)] },
  { k: 'recap', d: 4.6, sc: 'faces', tag: 'trp', cap: [L(60, 'สรุป! คน 4 ทวีป'), L(58, 'หน้าตาไม่เหมือนกันเลย', CORAL)], c: [C2([0, 6.4, 19.8], [0, 2.7, 0]), C2([0, 6.2, 19.0], [0, 2.65, 0])] },
  { k: 'mig', d: 4.6, sc: 'space', tag: 'att', cap: [L(56, 'ตำนานยังเล่าว่า ตอนเดินทางกลับ'), L(54, 'คน 3 ทวีปตามมาด้วย… แล้วกลับไม่ได้!', GOLD, 600)], c: [C2([10, 15, 26], [0, 1.6, 0.5]), C2([8, 12.5, 24], [0, 1.6, 1.2])] },
  { k: 'mig2', d: 4.6, sc: 'space', tag: 'att', foot: 'อรรถกถามหานิทานสูตร: แคว้นกุรุ · วิเทหะ · อปรันตะ', cap: [L(58, 'เลยตั้งรกรากในชมพูทวีป'), L(56, '"ต่างดาว" กลายเป็นเพื่อนบ้านเรา!', TEAL)], c: [C2([0, 7.5, 17.5], [0, 2.2, 4.2])] },
  { k: 'neigh', d: 4.8, sc: 'street', cap: [L(58, 'คนที่เดินสวนกับคุณ…'), L(54, 'อาจเป็นลูกหลาน "ต่างดาว" ก็ได้!', GOLD, 600)], c: [C2([0.5, 2.8, 15], [0, 1.4, -1.2], 42), C2([0, 2.5, 13.2], [0, 1.45, -1.2], 42)] },
  { k: 'win', d: 4.6, sc: 'space', tag: 'tri', cap: [L(54, 'แล้วทำไมพระพุทธเจ้า เกิดแค่ทวีปเรา?'), L(52, 'คนชมพูทวีป: กล้า · มีสติ · ปฏิบัติธรรมได้', GOLD, 600)], c: [C2([0, 8.5, 19], [0, 2.0, 3.4])] },
  { k: 'rise', d: 4.2, sc: 'space', field: 1, tag: 'trp', cap: [L(56, 'ทั้งหมดนี้ = แค่ 1 จักรวาล'), L(58, 'ถ้าลอยออกไปอีก จะเจออะไร?', GOLD)], c: [C2([0, 10, 18], [0, 2.4, 2.4]), C2([0, 22, 12], [0, 0.5, 0])] },
  { k: 'k1', d: 4.2, sc: 'space', field: 1, tag: 'tri', cf: fieldCam(25, 1050, 55, 61), cap: [L(108, null, WHITE), L(54, 'จักรวาลแบบเรา = "โลกธาตุเล็ก"', TEAL, 600)] },
  { k: 'k2', d: 3.8, sc: 'space', field: 2, tag: 'tri', cf: fieldCam(1050, 30000, 55), cap: [L(44, '× 1,000 อีกที', WHITE, 600), L(108, null, WHITE), L(54, '= "โลกธาตุกลาง"', TEAL, 600)] },
  { k: 'k3', d: 4.8, sc: 'space', field: 3, tag: 'tri', cf: fieldCam(30000, 820000, 55), foot: 'จูฬนีสูตร · อังคุตตรนิกาย ติกนิบาต', cap: [L(44, '× 1,000 อีกครั้ง', WHITE, 600), L(108, null, GOLD), L(62, '1,000 ล้านจักรวาล!', GOLD)] },
  { k: 'g0', d: 4.4, sc: 'gap', tag: 'trp', cap: [L(58, 'ระหว่าง 3 จักรวาล มีช่องมืด'), L(56, 'คือนรกขุมพิเศษ ชื่อ…', VIO)], c: [C2([0, 42, 30], [0, -1, 0]), C2([0, 30, 20], [0, -1, 0])] },
  { k: 'gWhy', d: 4.2, sc: 'gap', tag: 'trp', cap: [L(60, 'ทำไมมืดสนิท?'), L(54, 'อยู่นอกกำแพงจักรวาล แสงอาทิตย์ส่องไม่ถึง', VIO, 600)], c: [C2([7, 24, 15], [0, -1, 0])] },
  { k: 'g1', d: 4.2, sc: 'gap', tag: 'trp', cap: [L(58, 'สัตว์นรก ตัวสูง 6,000 วา'), L(54, 'เล็บยาวเหมือนค้างคาว ห้อยเกาะกำแพง', VIO, 600)], c: [C2([0, 1.8, 4.6], [0, -0.9, -2.4], 46)] },
  { k: 'gHunger', d: 4.2, sc: 'gap', tag: 'trp', cap: [L(58, 'หิวจัด คลำหาอาหารในความมืด'), L(54, 'จับโดนกัน นึกว่าอาหาร แย่งกันกิน!', CORAL, 600)], c: [C2([0.9, 1.0, 3.4], [0, -0.5, -1.9], 46)] },
  { k: 'gFall', d: 4.6, sc: 'gap', tag: 'trp', cap: [L(56, 'พลัดตกลงทะเลน้ำกรด เย็นเฉียบ'), L(54, 'ร่างเปื่อยแหลก… แล้วเกิดใหม่ วนซ้ำ!', '#9fe8ff', 600)], cf: (tl) => { const A = [[-0.6, 0.2, 2.6], [1.1, -2.6, -1.9]], B = [[-0.6, -1.8, 2.2], [1.2, -5.0, -1.9]], C = [[-0.4, 0.8, 3.2], [1.1, -0.4, -1.9]], k1 = eIO(clamp(tl / 2.6)), k2 = eIO(clamp((tl - 2.9) / 1.5)), mix = (i) => [0, 1, 2].map((j) => lerp(lerp(A[i][j], B[i][j], k1), C[i][j], k2)); return { p: mix(0), l: mix(1), f: 52, near: 0.1, far: 700 }; } },
  { k: 'gSin', d: 4.4, sc: 'gap', tag: 'trp', foot: 'ตามไตรภูมิพระร่วง · รายละเอียดต่างกันตามตำรา', cap: [L(58, 'ใครทำร้ายพ่อแม่ หรือผู้ทรงศีล'), L(54, 'ตายไปเกิดที่นี่ ทนทุกข์นานแสนนาน', CORAL, 600)], c: [C2([-0.4, 0.8, 3.2], [1.1, -0.4, -1.9], 52), C2([0, 2.4, 9.4], [0, -1.0, -2], 46)] },
  { k: 'g2', d: 4.8, sc: 'gap', tag: 'tri', cap: [L(56, 'วันพระโพธิสัตว์ประสูติ แสงสว่างวาบ!'), L(60, '"อ้าว… มีคนอื่นอยู่ด้วย!"', GOLD)], c: [C2([0, 2.8, 5.6], [0, -0.5, -2.0], 46)] },
  { k: 'v0', d: 4.6, sc: 'forest', tag: 'tri', cap: [L(58, 'และเคยมี "แขกต่างโลก" มาเยือน'), L(52, 'เทวดาจาก 10 โลกธาตุ มาประชุมที่โลกเรา', GOLD, 600)], c: [C2([0, 6.8, 15.5], [0, 3.6, -1.5]), C2([0, 5.2, 12], [0, 3.2, -1.5])] },
  { k: 'e0', d: 4.2, sc: 'space', field: 2, tag: 'tri', cap: [L(60, 'แต่พระพุทธเจ้าเตือนไว้'), L(56, 'เรื่องโลก คิดมากไป อาจเป็นบ้าได้', CORAL)],
    cf: (tl, b) => { const a = 0.4 + tl * 0.05, d = 2600; return { p: [Math.sin(a) * d * 0.6, d * 0.8, Math.cos(a) * d * 0.6], l: [0, 0, 0], f: 40, near: 2, far: 40000 }; } },
  { k: 'sum', d: 9.0, sc: 'space', field: 2, cap: [],
    cf: (tl, b) => { const a = 0.61 + tl * 0.03, d = 2600; return { p: [Math.sin(a) * d * 0.6, d * 0.8, Math.cos(a) * d * 0.6], l: [0, 0, 0], f: 40, near: 2, far: 40000 }; } },
  { k: 'ask', d: 4.8, sc: 'space', field: 2, cap: [L(62, 'ถ้าไปได้ อยากไปทวีปไหน?'), L(56, 'ออก · ตก · เหนือ? บอกในคอมเมนต์!', TEAL)], foot: 'ภาพจำลองตามคติความเชื่อ · ไม่ใช่ข้อมูลดาราศาสตร์',
    cf: (tl, b) => { const a = 0.88 + tl * 0.05, d = lerp(2600, 2300, tl / b.d); return { p: [Math.sin(a) * d * 0.6, d * 0.8, Math.cos(a) * d * 0.6], l: [0, 0, 0], f: 40, near: 2, far: 40000 }; } },
];
const ENDLEN = 1.6;
const BB = FK.beats(BEATS.map((b) => [b.k, b.d]).concat([['end', ENDLEN]]), window.DATA && DATA.vo);
const T0 = {}; BEATS.forEach((b, i) => { b.i = i; b.t0 = BB.at(b.k); b.d = BB.dur(b.k); b.t1 = BB.end(b.k); T0[b.k] = b.t0; });
const DUR = BB.DUR;
BEATS.find((b) => b.k === 'k1').cap[0][1][0] = counter(1, 1000, T0.k1 + 0.3, 2.2);
BEATS.find((b) => b.k === 'k2').cap[1][1][0] = counter(1000, 1e6, T0.k2 + 0.2, 2.4);
BEATS.find((b) => b.k === 'k3').cap[1][1][0] = counter(1e6, 1e9, T0.k3 + 0.2, 2.6);
const beatAt = (t) => { for (let i = BEATS.length - 1; i >= 0; i--) if (t >= BEATS[i].t0) return BEATS[i]; return BEATS[0]; };
const ORIG = { space: [0, 0, 0], faces: [1000, 0, 0], utk: [2000, 0, 0], night: [3000, 0, 0], fly: [4000, 0, 0], sea: [5000, 0, 0], east: [6000, 0, 0], forest: [7000, 0, 0], gap: [8000, 0, 0], west: [9000, 0, 0], street: [10000, 0, 0] };
const LIGHT = {
  space: { h: 0.95, hs: '#bfd4ff', hg: '#1b2a55', s: 1.0, sc: '#ffffff', bg: ['#060a1c', '#13204a'] },
  faces: { h: 0.9, hs: '#d6e2ff', hg: '#1b2a55', s: 1.0, sc: '#fff6e8', bg: ['#070b22', '#1e2a5e'], sh: 1 },
  utk: { h: 0.8, hs: '#e6f4ff', hg: '#4f9a5c', s: 1.05, sc: '#fff1d6', bg: ['#050a20', '#203070'], sh: 1 },
  night: { h: 0.4, hs: '#7f9fe8', hg: '#0b1020', s: 0.55, sc: '#c4d4ff', bg: ['#02040b', '#0d1a3a'] },
  fly: { h: 0.8, hs: '#dfe8ff', hg: '#2b3f7a', s: 1.0, sc: '#ffe2bd', bg: ['#02040f', '#1d3a8a'], sh: 1 },
  sea: { h: 0.75, hs: '#c8d4ff', hg: '#1a1f4a', s: 0.95, sc: '#fff0d6', bg: ['#03051a', '#1e1858'], sh: 1 },
  east: { h: 0.85, hs: '#e6f2ff', hg: '#6a6a7a', s: 1.05, sc: '#fff3d6', bg: ['#040818', '#1a2460'], sh: 1 },
  west: { h: 0.85, hs: '#e8f4ff', hg: '#4f8a6a', s: 1.05, sc: '#fff0e0', bg: ['#040818', '#182a62'], sh: 1 },
  street: { h: 0.85, hs: '#e6f2ff', hg: '#6a6a5a', s: 1.05, sc: '#fff3d6', bg: ['#5a9ae6', '#d4ecff'], sh: 1 },
  forest: { h: 0.65, hs: '#ffe6c0', hg: '#1b2a55', s: 0.75, sc: '#ffd9a0', bg: ['#16234d', '#3d5a8c'], sh: 1 },
  gap: { h: 0.42, hs: '#7a6ab8', hg: '#000000', s: 0.3, sc: '#9a8ac0', bg: ['#000000', '#07060f'] },
};

function camFor(t, camera) {
  const b = beatAt(t), tl = Math.min(t - b.t0, b.d), o = ORIG[b.sc];
  let K;
  if (b.cf) K = b.cf(tl, b);
  else {
    let a, z, k;
    if (b.c.length === 2) { a = b.c[0]; z = b.c[1]; k = eIO(clamp(tl / b.d)); }
    else {
      z = b.c[0]; const pv = BEATS[b.i - 1];
      if (pv && pv.sc === b.sc && !pv.cf) { a = pv.c[pv.c.length - 1]; k = eIO(clamp(tl / Math.min(1.5, b.d * 0.45))); }
      else { a = { p: z.p.map((v, i) => z.l[i] + (v - z.l[i]) * 1.08), l: z.l, f: z.f }; k = eIO(clamp(tl / b.d)); }
    }
    K = { p: a.p.map((v, i) => lerp(v, z.p[i], k)), l: a.l.map((v, i) => lerp(v, z.l[i], k)), f: lerp(a.f, z.f, k), near: 0.1, far: 700 };
  }
  camera.position.set(K.p[0] + o[0], K.p[1] + o[1], K.p[2] + o[2]); camera.lookAt(K.l[0] + o[0], K.l[1] + o[1], K.l[2] + o[2]);
  if (camera.fov !== K.f || camera.near !== K.near || camera.far !== K.far) { camera.fov = K.f; camera.near = K.near; camera.far = K.far; camera.updateProjectionMatrix(); }
  return K;
}

/* ---------- audio: soft set only (docs/sound.md) ---------- */
FK.softSfx();
const AUD = [];
const A = (t, n, o) => AUD.push([+t.toFixed(3), n, o]);
const WIPE = ['w2', 'w4', 'eA', 'wA', 'u0'].map((k) => T0[k]);
A(T0.hook - 0.2, 'glide', { dur: 0.8 }); A(T0.hook + 2.4, 'glide');
BEATS.forEach((b, i) => { const pv = BEATS[i - 1]; if (pv && i > 1 && (pv.sc !== b.sc || b.iris) && !WIPE.includes(b.t0)) A(b.t0 - 0.22, 'glide'); });
WIPE.forEach((w) => { A(w - 0.4, 'glide', { dur: 0.8 }); A(w + 0.05, 'shimmer'); });
['S', 'E', 'W', 'N'].forEach((q, i) => A(T0.one + [0.5, 1.0, 1.3, 1.6][i], 'pop'));
A(T0.sci + 0.6, 'soft'); A(T0.sci + 2.3, 'chime'); A(T0.sci + 2.5, 'shimmer'); A(T0.four + 2.4, 'pop'); A(T0.noway + 0.5, 'glide', { dur: 1.2 }); A(T0.noway + 2.1, 'tok'); A(T0.noway + 2.6, 'glide');
['k1', 'k2', 'k3'].forEach((k) => { A(T0[k] + 0.05, 'glide', { dur: 0.9 }); for (let i = 0; i < 8; i++) A(T0[k] + 0.35 + i * 0.27, 'tok'); });
A(T0.k3 + 2.6, 'chime'); A(T0.k3 + 2.65, 'shimmer');
A(T0.w0 + 3.0, 'bell');
A(T0.w1 + 0.1, 'glide', { dur: 1.2 }); A(T0.w1 + 1.6, 'shimmer');
A(T0.arrive + 0.2, 'glide', { dur: 1.4 }); A(T0.arrive + 1.7, 'shimmer'); A(T0.arrive + 2.0, 'bell'); A(T0.arrive + 2.3, 'chime');
for (let i = 0; i < 4; i++) A(T0.w2 + 0.6 + i * 1.0, 'tok');
A(T0.w4 + 0.2, 'water', { dur: 2.4 }); A(T0.w4 + 2.0, 'chime');
A(T0.eA + 2.8, 'soft'); A(T0.eB + 0.3, 'pop'); A(T0.eC + 0.6, 'pop'); A(T0.eC + 1.8, 'bell');
A(T0.wA + 2.8, 'soft'); A(T0.wB + 0.4, 'splash'); A(T0.wB + 2.4, 'bell');
A(T0.uF + 0.3, 'pop'); A(T0.uF + 1.8, 'pop'); A(T0.u1 + 0.4, 'chime');
A(T0.u2 + 0.6, 'soft'); A(T0.u2 + 2.7, 'pop'); A(T0.u3 + 0.6, 'chime'); A(T0.u3 + 2.2, 'pop'); A(T0.u3 + 2.4, 'pop');
A(T0.u5 + 0.2, 'splash'); A(T0.u5 + 1.4, 'pop'); A(T0.u6 + 1.2, 'chime'); A(T0.u6 + 2.0, 'pop');
A(T0.u7 + 0.2, 'glide'); A(T0.u7 + 2.6, 'glide');
[0, 1, 2, 3].forEach((i) => A(T0.recap + 0.3 + i * 0.35, 'pop'));
A(T0.mig + 2.8, 'chime'); [0, 1, 2].forEach((i) => A(T0.mig2 + 0.5 + i * 0.35, 'pop')); A(T0.mig2 + 1.6, 'shimmer');
[0, 1, 2].forEach((i) => A(T0.neigh + 2.5 + i * 0.25, 'pop')); [1.4, 1.9, 2.4].forEach((d) => A(T0.win + d, 'bell')); A(T0.win + 2.6, 'shimmer');
A(T0.rise + 0.4, 'glide', { dur: 2.4 });
A(T0.g0 + 1.4, 'bell'); A(T0.gHunger + 2.2, 'soft'); A(T0.gFall + 0.6, 'glide', { dur: 0.9 }); A(T0.gFall + 1.5, 'splash'); A(T0.gFall + 1.7, 'water', { dur: 1.2 }); A(T0.gFall + 3.7, 'pop'); A(T0.gSin + 0.4, 'bell');
A(T0.g2 + 0.55, 'chime'); A(T0.g2 + 0.6, 'shimmer'); [1.2, 1.4, 1.6].forEach((d) => A(T0.g2 + d, 'pop'));
A(T0.v0 + 0.5, 'shimmer'); A(T0.v0 + 1.6, 'chime');
A(T0.e0 + 0.3, 'bell'); for (let i = 0; i < 5; i++) A(T0.sum + 0.5 + i * 0.7, 'tok'); A(T0.ask + 0.3, 'pop');
AUD.sort((a, b) => a[0] - b[0]);

const TRANS = [];
BEATS.forEach((b, i) => { const pv = BEATS[i - 1]; if (pv && (pv.sc !== b.sc || b.iris) && !WIPE.includes(b.t0)) TRANS.push({ t: b.t0 - 0.22, dur: 0.44, type: 'iris' }); });
TRANS.push({ t: T0.g2 + 0.5, dur: 0.7, type: 'flash' }, { t: T0.k3 + 2.55, dur: 0.4, type: 'flash' });

/* ---------- golden-wheel wipe + route mini-map (2D overlay) ---------- */
function drawWipe(g, t) {
  for (const w of WIPE) {
    const p = (t - (w - 0.42)) / 0.84; if (p < 0 || p > 1) continue;
    const x = lerp(-760, 1840, eIO(p)), y = 980, R = 700, a = 1 - Math.abs(p * 2 - 1);
    g.save(); g.fillStyle = 'rgba(255,214,120,' + (0.85 * Math.pow(a, 1.5)) + ')'; g.fillRect(0, 0, 1080, 1920);
    g.translate(x, y); g.rotate(-p * 7);
    const gl = g.createRadialGradient(0, 0, R * 0.2, 0, 0, R * 1.35); gl.addColorStop(0, 'rgba(255,240,190,.95)'); gl.addColorStop(0.6, 'rgba(255,200,90,.55)'); gl.addColorStop(1, 'rgba(255,190,80,0)');
    g.fillStyle = gl; g.beginPath(); g.arc(0, 0, R * 1.35, 0, TAU); g.fill();
    g.strokeStyle = '#ffd36b'; g.lineWidth = 46; g.beginPath(); g.arc(0, 0, R, 0, TAU); g.stroke();
    g.strokeStyle = '#fff1c0'; g.lineWidth = 10; g.beginPath(); g.arc(0, 0, R * 0.84, 0, TAU); g.stroke();
    g.strokeStyle = 'rgba(255,225,140,.55)'; g.lineWidth = 2; g.beginPath(); for (let i = 0; i < 180; i++) { const a2 = (i / 180) * TAU; g.moveTo(Math.cos(a2) * R * 0.2, Math.sin(a2) * R * 0.2); g.lineTo(Math.cos(a2) * R * 0.97, Math.sin(a2) * R * 0.97); } g.stroke();
    g.strokeStyle = '#ffc94a'; g.lineWidth = 14; g.beginPath(); for (let i = 0; i < 12; i++) { const a2 = (i / 12) * TAU; g.moveTo(Math.cos(a2) * R * 0.2, Math.sin(a2) * R * 0.2); g.lineTo(Math.cos(a2) * R * 0.97, Math.sin(a2) * R * 0.97); } g.stroke();
    g.fillStyle = '#7fd8ff'; g.beginPath(); g.arc(0, 0, R * 0.15, 0, TAU); g.fill(); g.strokeStyle = '#ffd36b'; g.lineWidth = 16; g.stroke();
    const gc = ['#ff5d73', '#2ee6c5', '#8f7bff', '#7fd8ff', '#ffffff', '#5dff8f', '#ff9d3a'];
    for (let i = 0; i < 28; i++) { const a2 = (i / 28) * TAU; g.fillStyle = gc[i % 7]; g.beginPath(); g.arc(Math.cos(a2) * R, Math.sin(a2) * R, 13, 0, TAU); g.fill(); }
    g.restore();
  }
}
const ROUTE = { S: PI / 2, E: 0, W: PI, N: PI * 1.5 };
const PLACE = { S: 'ชมพูทวีป (บ้านเรา)', E: 'ปุพพวิเทหะ (ตะวันออก)', W: 'อมรโคยาน (ตะวันตก)', N: 'อุตตรกุรุ (เหนือ)' };
function routeAt(t) {
  const legs = [[T0.w4 + 0.3, T0.w4 + 3.9, 'S', 'E'], [T0.wA - 0.35, T0.wA + 1.6, 'E', 'W'], [T0.u0 - 0.35, T0.u0 + 1.6, 'W', 'N']];
  let ang = ROUTE.S, at = 'S', moving = false;
  for (const [a, b, f, to] of legs) { if (t >= b) { ang = ROUTE[to]; at = to; } else if (t > a) { ang = lerp(ROUTE[f], ROUTE[to], eIO((t - a) / (b - a))); at = null; moving = true; break; } else break; }
  return { ang, at, moving };
}
function drawMiniMap(g, t) {
  const t0 = T0.w2 - 0.2, t1 = T0.recap - 0.25; if (t < t0 || t > t1) return;
  const al = clamp((t - t0) / 0.4) * clamp((t1 - t) / 0.3), cx = 150, cy = 1378, R = 96, r = { ang: 0 }; const rt = routeAt(t);
  g.save(); g.globalAlpha = al;
  g.fillStyle = 'rgba(10,16,40,.72)'; g.beginPath(); g.roundRect ? g.roundRect(34, 1262, 232, 270, 26) : g.rect(34, 1262, 232, 270); g.fill();
  g.fillStyle = '#070b24'; g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.fill(); g.strokeStyle = 'rgba(200,215,255,.7)'; g.lineWidth = 3; g.stroke();
  g.fillStyle = 'rgba(255,255,255,.7)'; for (let i = 0; i < 18; i++) { const a2 = hash(i + 3) * TAU, r2 = R * (0.15 + 0.8 * hash(i + 9)); g.fillRect(cx + Math.cos(a2) * r2, cy + Math.sin(a2) * r2, 2, 2); }
  g.strokeStyle = 'rgba(160,190,255,.45)'; g.lineWidth = 2; g.setLineDash([5, 6]); g.beginPath(); g.arc(cx, cy, R * 0.6, 0, TAU); g.stroke(); g.setLineDash([]);
  const cg = g.createRadialGradient(cx, cy, 0, cx, cy, 20); cg.addColorStop(0, 'rgba(255,230,150,1)'); cg.addColorStop(1, 'rgba(255,200,80,0)'); g.fillStyle = cg; g.beginPath(); g.arc(cx, cy, 20, 0, TAU); g.fill();
  const d = R * 0.6, hi = (q) => (rt.at === q ? GOLD : 'rgba(255,255,255,.85)');
  g.fillStyle = hi('S'); g.beginPath(); g.moveTo(cx - 22, cy + d - 18); g.lineTo(cx + 22, cy + d - 18); g.lineTo(cx + 8, cy + d + 20); g.lineTo(cx - 8, cy + d + 20); g.closePath(); g.fill();
  g.fillStyle = hi('E'); g.beginPath(); g.arc(cx + d, cy, 17, 0, TAU); g.fill();
  g.fillStyle = hi('W'); g.beginPath(); g.arc(cx - d + 6, cy, 19, PI / 2, PI * 1.5); g.closePath(); g.fill();
  g.fillStyle = hi('N'); g.fillRect(cx - 17, cy - d - 17, 34, 34);
  const wx = cx + Math.cos(rt.ang) * d, wy = cy + Math.sin(rt.ang) * d, pulse = 1 + 0.15 * Math.sin(t * 8);
  const gg = g.createRadialGradient(wx, wy, 0, wx, wy, 28 * pulse); gg.addColorStop(0, 'rgba(255,240,180,1)'); gg.addColorStop(0.4, 'rgba(255,200,80,.8)'); gg.addColorStop(1, 'rgba(255,200,80,0)');
  g.fillStyle = gg; g.beginPath(); g.arc(wx, wy, 28 * pulse, 0, TAU); g.fill();
  g.font = '600 24px Kanit,sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = '#fff';
  g.fillText(rt.moving ? 'กำลังเดินทาง…' : PLACE[rt.at], 150, 1505);
  g.restore();
}
/* ---------- HUD: chapter strip, source tag, recap card ---------- */
const F = (w, px) => w + ' ' + px + 'px Kanit,sans-serif';
function rr(g, x, y, w, h, r) { g.beginPath(); g.roundRect ? g.roundRect(x, y, w, h, r) : g.rect(x, y, w, h); }
function txt(g, s2, x, y, px, col, w, al) { g.font = F(w || 800, px); g.textAlign = al || 'center'; g.textBaseline = 'middle'; g.lineJoin = 'round'; g.lineWidth = px * 0.14; g.strokeStyle = 'rgba(10,12,30,.85)'; g.strokeText(s2, x, y); g.fillStyle = col; g.fillText(s2, x, y); }
const CHAP = [['จักรวาล', 'one', 'noway'], ['จักรแก้ว', 'w0', 'arrive'], ['ตะลุยทวีป', 'w2', 'recap'], ['อพยพ', 'mig', 'win'], ['นอกจักรวาล', 'rise', 'k3'], ['นรกมืด', 'g0', 'g2']];
function chapter(g, t) {
  const n = CHAP.length, w = 150, gap = 10, x0 = 540 - (n * w + (n - 1) * gap) / 2, y = 238;
  let cur = -1; CHAP.forEach((c, i) => { if (t >= T0[c[1]]) cur = i; });
  CHAP.forEach((c, i) => {
    const x = x0 + i * (w + gap); g.save(); g.globalAlpha = 0.95; g.fillStyle = i < cur ? 'rgba(46,230,197,.35)' : i === cur ? TEAL : 'rgba(255,255,255,.14)'; rr(g, x, y, w, 40, 20); g.fill();
    const e = BEATS.find((b) => b.k === c[2]); if (i === cur) { const k = clamp((t - T0[c[1]]) / (e.t1 - T0[c[1]])); g.fillStyle = 'rgba(15,22,48,.25)'; rr(g, x + w * k, y, w * (1 - k), 40, 20); g.fill(); }
    g.font = F(600, 24); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillStyle = i === cur ? '#0f1630' : '#fff'; g.fillText(c[0], x + w / 2, y + 21); g.restore();
  });
}
const TAGS = { tri: ['พระไตรปิฎก', TEAL, ''], trp: ['ไตรภูมิพระร่วง', VIO, ''], att: ['อรรถกถา', VIO, 'คัมภีร์อธิบายรุ่นหลัง'], sci: ['ภาพแนวไซไฟ', '#5a6aa8', ''] };
function tagPill(g, b, t) {
  const sci = t >= T0.sci && t < T0.k1, k = b.tag || (sci ? 'sci' : null); if (!k) return;
  const d = TAGS[k], big = k === 'att', sub = d[2] || (sci && k !== 'sci' ? 'ภาพแนวไซไฟ' : ''), px = big ? 44 : 32;
  g.save(); g.font = F(800, px); const w1 = g.measureText(d[0]).width; g.font = F(400, 24); const w2 = sub ? g.measureText(sub).width + 18 : 0;
  const pv = BEATS[b.i - 1], same = pv && (pv.tag || (pv.t0 >= T0.sci && pv.t0 < T0.k1 ? 'sci' : null)) === k;
  const w = w1 + w2 + 56, h = big ? 74 : 56, x = 540 - w / 2, y = 298, a = (same ? 1 : clamp((t - b.t0) / 0.25)) * clamp((b.t1 - t) / 0.2 + (BEATS[b.i + 1] && BEATS[b.i + 1].tag === b.tag ? 1 : 0));
  g.globalAlpha = a; g.fillStyle = d[1]; rr(g, x, y, w, h, h / 2); g.fill(); g.fillStyle = k === 'tri' ? '#0f1630' : '#fff'; g.textBaseline = 'middle'; g.textAlign = 'left'; g.font = F(800, px); g.fillText(d[0], x + 28, y + h / 2 + 2);
  if (sub) { g.font = F(400, 24); g.fillText(sub, x + 28 + w1 + 18, y + h / 2 + 3); } g.restore();
}
function panel(g, x, y, w, h, a) { g.save(); g.globalAlpha = a; g.fillStyle = 'rgba(15,22,48,.9)'; rr(g, x, y, w, h, 36); g.fill(); g.strokeStyle = 'rgba(255,255,255,.18)'; g.lineWidth = 3; g.stroke(); g.restore(); }
function recapCard(g, t) {
  const b = BEATS.find((x) => x.k === 'sum'), r = t - b.t0, a = clamp(r / 0.3) * clamp((b.d - r) / 0.3); if (a <= 0) return;
  g.save(); g.globalAlpha = a; panel(g, 60, 280, 960, 1180, 1);
  txt(g, 'สรุป', 540, 370, 56, '#fff', 800); txt(g, 'ต่างดาวในคัมภีร์', 540, 450, 76, GOLD, 800);
  const rows = [['จักรวาลเรามี 4 ทวีป รอบเขาพระสุเมรุ', TEAL], ['จักรแก้ว = ยานบินของพระเจ้าจักรพรรดิ', TEAL], ['ออก 100 ปี · ตก 400 ปี · เหนือ 1,000 ปี', VIO], ['คน 3 ทวีปตามมา อยู่ชมพูทวีป (อรรถกถา)', VIO], ['1,000 ล้านจักรวาล + โลกันตนรกในช่องมืด', VIO]];
  rows.forEach(([s2, c], i) => { const k = clamp((r - 0.5 - i * 0.7) / 0.3); if (k <= 0) return; const y = 580 + i * 150; g.save(); g.globalAlpha = a * k;
    g.fillStyle = 'rgba(255,255,255,.07)'; rr(g, 100, y - 58, 880, 116, 26); g.fill(); g.fillStyle = c; g.beginPath(); g.arc(170, y, 38, 0, 6.283); g.fill();
    g.fillStyle = '#0f1630'; g.font = F(800, 40); g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(i + 1, 170, y + 2); txt(g, s2, 232, y, 38, '#fff', 600, 'left'); g.restore(); });
  g.globalAlpha = a * 0.85; g.font = F(400, 24); g.fillStyle = '#fff'; g.textAlign = 'center';
  g.fillText('ที่มา: พระไตรปิฎก (จูฬนีสูตร · อัจฉริยสูตร · มหาสุทัสสนสูตร · มหาสมยสูตร)', 540, 1360);
  g.fillText('ไตรภูมิพระร่วง · อรรถกถามหานิทานสูตร · ภาพจำลองตามคติความเชื่อ', 540, 1398);
  g.restore();
}
const CAPY = 560;
const caps = BEATS.filter((b) => b.cap && b.cap.length).map((b) => b.instant ? { t0: 0, t1: b.t1, y: b.y, instant: true, lines: b.cap } : { t0: b.t0 + 0.12, t1: b.t1 - 0.04, y: b.y || CAPY, lines: b.cap, foot: b.foot });
VE.run({
  DUR, coverAt0: true, file: 'rungee-tang-dao-trai-phum', title: 'มนุษย์ต่างดาวตามคติพุทธ',
  brand: { name: 'RuNgee รู้งี้', series: 'พุทธวิธี', color: TEAL, icon: 'globe', bg: ['#0f1630', '#1b2a55'], endLine: 'รู้งี้... ติดตามไว้', motif: { notes: ['G4', 'D5', 'G5'], gap: 0.08, timbre: 'synth' } },
  setup({ scene, renderer }) {
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap;
    const hemi = new T.HemisphereLight('#bfd4ff', '#1b2a55', 0.9); scene.add(hemi);
    const sun = new T.DirectionalLight('#ffffff', 1.0); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -0.0006;
    const sc = sun.shadow.camera; sc.left = -16; sc.right = 16; sc.top = 16; sc.bottom = -16; sc.near = 1; sc.far = 80; scene.add(sun, sun.target);
    const S = { hemi, sun, sc: { space: buildSpace(), faces: buildFaces(), utk: buildUtk(), night: buildNight(), fly: buildFly(), sea: buildSea(), east: buildEast(), west: buildWest(), street: buildStreet(), forest: buildForest(), gap: buildGap() } };
    for (const k in S.sc) { S.sc[k].g.position.set(...ORIG[k]); scene.add(S.sc[k].g); }
    return S;
  },
  update(t, S, { camera }) {
    const b = beatAt(t), tl = t - b.t0, sc = b.sc;
    for (const k in S.sc) S.sc[k].g.visible = k === sc;
    const Lp = LIGHT[sc];
    S.hemi.color.set(Lp.hs); S.hemi.groundColor.set(Lp.hg); S.hemi.intensity = Lp.h; S.sun.color.set(Lp.sc); S.sun.intensity = Lp.s; S.sun.castShadow = !!Lp.sh;
    ANIM[sc](t, b, tl, S.sc[sc], S);
    const K = camFor(t, camera); postCam(t, b, tl, S, camera);
    const o = ORIG[sc], tgt = new T.Vector3(K.l[0] + o[0], Math.max(0, K.l[1] * 0.4) + o[1], K.l[2] + o[2]);
    S.sun.target.position.copy(tgt); S.sun.position.copy(tgt).add(new T.Vector3(9, 18, 12));
    if (sc === 'space') { const st = S.sc.space.stars; st.visible = !!b.field || worldMode(b, t - b.t0) > 0; st.position.copy(camera.position); st.scale.setScalar(camera.far * 0.5); }
  },
  bgAt: (t) => { const b = beatAt(t); if (b.sc === 'gap' && b.k === 'g2') { const f = clamp((t - b.t0 - 0.5) / 0.4) * (1 - clamp((t - b.t0 - 2.6) / 1.6) * 0.7); return [lerpCol('#000000', '#3a3060', f), lerpCol('#07060f', '#6a5aa0', f)]; } return LIGHT[b.sc].bg; },
  hud(g, t) {
    drawMiniMap(g, t); drawWipe(g, t);
    const b = beatAt(t);
    if (t > T0.hook && t < DUR - ENDLEN && b.k !== 'sum') { const sg = g.createLinearGradient(0, 210, 0, 900); sg.addColorStop(0, 'rgba(6,10,28,0.55)'); sg.addColorStop(0.6, 'rgba(6,10,28,0.32)'); sg.addColorStop(1, 'rgba(6,10,28,0)'); g.fillStyle = sg; g.fillRect(0, 210, 1080, 690); }
    if (t >= T0.one && t < BEATS.find((x) => x.k === 'g2').t1) chapter(g, t);
    if (t < b.t1 && b.k !== 'cover') tagPill(g, b, t);
    if (b.k === 'sum') recapCard(g, t);
  },
  caps, trans: TRANS, audio: AUD,
  bed: [FK.chillBed({ DUR, calm: (t) => (t >= T0.w0 && t < T0.w1) || (t >= T0.g0 && t < T0.g2), vol: window.DATA && DATA.vo ? 0.6 : 1, voice: FK.voice(window.DATA && DATA.vo, BB) })],
});
function lerpCol(a, b, k) { return '#' + new T.Color(a).lerp(new T.Color(b), k).getHexString(); }
})();
