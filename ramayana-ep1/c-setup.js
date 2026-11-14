/* Part C v2: stations + setup */
const ST = {
  MAPC: [-1000, 0, 0], KAIL: [0, 0, 0], TOP: [0, 11, -16], HEAV: [40, 0, 0], LANKA: [500, 0, 0],
  PEN: [2000, 0, 0], HERM: [2100, 0, 0], ELL: [3000, 0, 0], AYO: [3100, 0, 0],
};
const MP = FK.project(93, 14, 0.36);
const mapXZ = (lon, lat) => { const q = MP(lon, lat); return [ST.MAPC[0] + q[0], -q[1]]; };
const PL = { ind: [79, 22], mm: [96, 21], th: [101, 15.2], la: [102.6, 19.5], kh: [104.9, 12.6], id: [110.4, -7.6] };
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
const RAV = '#7a5a8a';
function ravana(s) { const c = chibi({ robe: '#8a2a2a', sash: P.gold, skin: RAV, crown: true, eyeGlow: YAK_EYE, fangs: true, sleeve: RAV, s: s || 1 }); xHeads(c, 'in', RAV, YAK_EYE); xArms(c, 18, RAV, null, 0.9);
  const sw = new T.Group(); const bl = mk(new T.BoxGeometry(0.07, 0.95, 0.02), '#e8f4ff', { emissive: new T.Color('#9fd8ff'), emissiveIntensity: 0.6 }); bl.position.y = -1.05; const hd = mk(new T.BoxGeometry(0.24, 0.05, 0.06), P.gold, GOLDM); hd.position.y = -0.58; sw.add(bl, hd); sw.visible = false; c.userData.arms.R.add(sw); c.userData.sword = sw; return c; }
function kumbha(s) { const c = chibi({ robe: '#6a4a2a', sash: P.gold, skin: '#5f7a5a', eyeGlow: YAK_EYE, fangs: true, sleeve: '#5f7a5a', crown: true, s: s || 1.45 }); const belly = mk(new T.SphereGeometry(0.42, 12, 8), '#5f7a5a'); belly.position.set(0, 0.62, 0.18); c.add(belly); return c; }
function pushpaka() {
  const g = new T.Group(); const base = mk(new T.CylinderGeometry(1.6, 1.1, 0.5, 8), P.gold, GOLDM); g.add(base);
  const pal = palace('#ffe7b0'); pal.scale.setScalar(0.32); pal.position.y = 0.25; g.add(pal);
  for (let i = 0; i < 3; i++) { const c = cloud(0.7); c.position.set(-1.1 + i * 1.1, -0.45, 0); g.add(c); }
  const gl = softSprite('rgba(255,230,150,1)', 0.5); gl.scale.setScalar(5); gl.position.y = 0.6; g.add(gl); return g;
}
function stone(o) { o.traverse((m) => { if (m.isMesh) m.material = M('#9a8a78', { flatShading: true }); }); return o; }

function setupScene(scene) {
  const s = {};
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#a9b4ff', 40, 120); s.fog = scene.fog;
  let rs = 11; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);

  /* ---------- heaven: cloud floor + Kailash (shakeable group) ---------- */
  const floor = mk(new T.BoxGeometry(160, 0.4, 120), '#8f9fdc', { emissive: new T.Color('#3f4f9a'), emissiveIntensity: 0.15 }); floor.position.set(20, -0.2, -30); scene.add(floor);
  for (let i = 0; i < 40; i++) { const c = cloud(1 + rnd() * 1.6); c.position.set(-50 + rnd() * 140, -0.4 + rnd() * 0.4, -70 + rnd() * 80); if (Math.abs(c.position.x) < 9 && c.position.z > -20) continue; if (Math.abs(c.position.x - 40) < 9 && c.position.z > -8) continue; scene.add(c); }
  const KG = new T.Group(); scene.add(KG); s.KG = KG;
  const MS = '#c9d2ee', ms = { emissive: new T.Color('#5060a0'), emissiveIntensity: 0.15 };
  const peak = mk(new T.ConeGeometry(12, 27, 7), MS, ms); peak.position.set(0, 13.3, -25); KG.add(peak);
  for (const q of [[-11, -22, 7, 14], [11, -23, 7, 15], [-19, -30, 8, 18], [19, -31, 8, 17]]) { const m = mk(new T.ConeGeometry(q[2], q[3], 6), '#cfd8f0', ms); m.position.set(q[0], q[3] / 2 - 0.2, q[1]); KG.add(m); }
  const N = 22, stepM = M('#dfe6f7', ms), railM = M(P.gold, GOLDM);
  for (let i = 0; i < N; i++) { const y = (i + 1) * 0.5, z = -1.4 - i * 0.62; const st = new T.Mesh(new T.BoxGeometry(2.6, y, 0.64), stepM); st.position.set(0, y / 2, z); KG.add(st); for (const sx of [-1.4, 1.4]) { const r = new T.Mesh(new T.BoxGeometry(0.16, y + 0.4, 0.64), railM); r.position.set(sx, (y + 0.4) / 2, z); KG.add(r); } }
  const top = mk(new T.BoxGeometry(8, 0.6, 6), '#b9c3e6', ms); top.position.set(0, 10.7, -17.4); KG.add(top);
  const th = throne(); th.position.set(0, 11, -19.2); KG.add(th);
  s.shiva = chibi({ robe: '#e0a85a', sash: '#6a4a2a', skin: '#8fb0e0', hair: '#4a3020', bun: true, sleeve: '#8fb0e0', s: 1.5 }); setSit(s.shiva, true); s.shiva.position.set(-0.7, 11.7, -19.0); KG.add(s.shiva);
  { const e3 = new T.Mesh(new T.SphereGeometry(0.06, 8, 6), basic('#ff6a6a')); e3.position.set(0, 0.17, 0.39); s.shiva.userData.head.add(e3); const moon = new T.Mesh(new T.TorusGeometry(0.12, 0.03, 6, 12, Math.PI), basic('#ffffff')); moon.position.set(0.18, 0.5, 0.1); s.shiva.userData.head.add(moon); }
  s.parv = chibi({ robe: '#3f9a6a', sash: P.gold, skin: '#f0c8a0', crown: true, hair: '#2a2228', s: 1.3 }); setSit(s.parv, true); s.parv.position.set(0.9, 11.6, -18.8); KG.add(s.parv);
  s.kglow = softSprite('rgba(255,250,220,1)', 0.5); s.kglow.scale.set(7, 7, 1); s.kglow.position.set(0, 13.6, -19.6); KG.add(s.kglow);
  s.kring = new T.Mesh(new T.RingGeometry(0.8, 1.0, 36), basic('#bff4ff', { transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false })); s.kring.rotation.x = -Math.PI / 2; scene.add(s.kring);
  s.notes = [];
  for (let i = 0; i < 8; i++) { const n = label(i % 2 ? '♪' : '♫', { w: 0.8, px: 110, color: P.gold }); n.visible = false; scene.add(n); s.notes.push(n); }

  /* heaven panic */
  s.devas = [0, 1, 2, 3, 4].map((i) => { const d = crownDeva({ robe: ['#fff3c4', '#d8f0ff', '#ffe0ec', '#e6ffd8', '#fff3c4'][i] }); scene.add(d); return d; });
  s.rav = ravana(1.15); scene.add(s.rav);
  s.push = pushpaka(); scene.add(s.push);
  s.vish = vishnu(1.5); scene.add(s.vish); s.vglow = softSprite('rgba(170,210,255,1)', 0.6); s.vglow.scale.setScalar(7); scene.add(s.vglow);
  s.man = chibi({ robe: '#f2f2f2', hair: '#2a2228', s: 0.5 }); scene.add(s.man);
  s.vorb = orb('rgba(160,210,255,1)'); scene.add(s.vorb);

  /* ---------- map ---------- */
  const MG = new T.Group(); scene.add(MG);
  const sea = mk(new T.BoxGeometry(70, 0.2, 54), '#14214a'); sea.position.set(ST.MAPC[0] + 2, -0.15, 0); MG.add(sea);
  const NAMES = ['India', 'Nepal', 'Bangladesh', 'Bhutan', 'Pakistan', 'Sri Lanka', 'China', 'Myanmar', 'Thailand', 'Laos', 'Cambodia', 'Vietnam', 'Malaysia', 'Indonesia', 'Philippines'];
  const reg = FK.regions(T, DATA.world.features.filter((f) => NAMES.includes(f.properties.name)), { project: MP, idOf: (f) => f.properties.name, color: (id) => (id === 'India' ? '#35609c' : id === 'Thailand' ? P.coral : P.land) });
  for (const id in reg.meshes) reg.meshes[id].scale.z = id === 'India' || id === 'Thailand' ? 0.35 : 0.2;
  reg.group.position.x = ST.MAPC[0]; MG.add(reg.group); s.reg = reg;
  s.map = { g: MG, labs: {} };
  const mlab = (k, txt, c, dy) => { const [x, z] = mapXZ(PL[k][0], PL[k][1]); const lb = label(txt, { w: 3.2, px: 84, color: c }); lb.position.set(x, dy || 1.4, z); MG.add(lb); s.map.labs[k] = lb; };
  mlab('ind', 'ต้นฉบับ', '#fff'); mlab('th', 'แต่งใหม่', P.coral);
  const arc = (a, b, h, c) => { const [x0, z0] = mapXZ(a[0], a[1]), [x1, z1] = mapXZ(b[0], b[1]); const pts = []; for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push(new T.Vector3(U.lerp(x0, x1, u), 0.5 + Math.sin(u * Math.PI) * h, U.lerp(z0, z1, u))); } const geo = new T.BufferGeometry().setFromPoints(pts); const ln = new T.Line(geo, new T.LineBasicMaterial({ color: c, transparent: true, depthTest: false })); ln.renderOrder = 5; geo.setDrawRange(0, 0); MG.add(ln); ln.userData.pts = pts; return ln; };
  s.map.arcs = ['mm', 'th', 'la', 'kh', 'id'].map((k) => arc(PL.ind, PL[k], k === 'th' ? 3.4 : 2.4, k === 'th' ? P.gold : P.teal));
  s.map.dot = orb('rgba(255,220,120,1)'); MG.add(s.map.dot);
  s.map.book = new T.Group(); { const b = mk(new T.BoxGeometry(1.4, 0.3, 1.0), '#b8452f'); const pg = mk(new T.BoxGeometry(1.3, 0.26, 0.9), '#fff3d6'); pg.position.y = 0.04; s.map.book.add(b, pg); const [x, z] = mapXZ(PL.ind[0], PL.ind[1]); s.map.book.position.set(x, 0.6, z); MG.add(s.map.book); }

  /* ---------- Lanka ---------- */
  const seaL = mk(new T.BoxGeometry(90, 0.2, 70), '#1e3a78'); place(seaL, 'LANKA', 0, -0.4, -10); scene.add(seaL);
  const isl = mk(new T.CylinderGeometry(9, 11, 1.4, 16), '#4f7a52'); place(isl, 'LANKA', 0, 0, -3); scene.add(isl);
  s.lk = { pal: palace('#ffe7b0') }; s.lk.pal.scale.setScalar(1.25); place(s.lk.pal, 'LANKA', 0, 0.7, -7); scene.add(s.lk.pal);
  for (const q of [[-6, -3], [6, -4], [-5, 2], [5.5, 1.5]]) { const tr = tree(1.3, '#2f7f5a'); place(tr, 'LANKA', q[0], 0.7, q[1]); scene.add(tr); }
  s.lk.th = throne(); s.lk.th.scale.setScalar(0.9); place(s.lk.th, 'LANKA', 0, 0.7, -2.6); scene.add(s.lk.th);
  s.lk.army = [];
  for (let i = 0; i < 6; i++) { const r = chibi({ robe: '#5a2a3a', skin: ['#6a7a5a', '#7a5a6a', '#5a6a8a'][i % 3], eyeGlow: YAK_EYE, fangs: true, s: 0.8 }); scene.add(r); s.lk.army.push(r); }

  /* ---------- penance forest ---------- */
  const ig = mk(new T.CylinderGeometry(10, 10.5, 0.4, 20), '#7a5a32'); place(ig, 'PEN', 0, -0.2, -1); scene.add(ig);
  for (const q of [[-6, -4], [6, -3.5], [-4, -7], [4.5, -7.5], [7.5, 0.5], [-7.6, 0]]) { const tr = tree(1.6, '#4f7a3a'); place(tr, 'PEN', q[0], 0, q[1]); scene.add(tr); }
  s.pen = { f: fire(), brahma: chibi({ robe: '#ff9a4a', sash: P.gold, skin: '#e8b04a', crown: true, beard: '#ffffff', sleeve: '#e8b04a', s: 1.25 }), lotus: lotus(0.75), kum: kumbha(1.35), vib: chibi({ robe: '#f4f4f4', sash: P.gold, skin: '#7a8ab8', crown: true, eyeGlow: '#bfefff', sleeve: '#7a8ab8', s: 1.0 }) };
  place(s.pen.f, 'PEN', 0, 0, 1.1); s.pen.f.scale.setScalar(1.5);
  xHeads(s.pen.brahma, 'in', '#e8b04a', '#3a2a10'); s.pen.brahma.userData.xheads.forEach((h, i) => { h.visible = i < 3; if (i < 2) h.position.set((i ? 1 : -1) * 0.42, 0.02, -0.18); h.scale.setScalar(1.25); });
  { const back = s.pen.brahma.userData.xheads[2]; back.position.set(0, 0.06, -0.42); back.scale.setScalar(1.3); }
  setSit(s.pen.brahma, true); s.pen.brahma.add(s.pen.lotus); s.pen.lotus.position.y = -0.05;
  scene.add(s.pen.f, s.pen.brahma, s.pen.kum, s.pen.vib);
  s.pen.glow = softSprite('rgba(255,220,140,1)', 0.8); s.pen.glow.scale.setScalar(6); scene.add(s.pen.glow);
  s.pen.flare = softSprite('rgba(255,170,80,1)', 1); s.pen.flare.scale.setScalar(3); scene.add(s.pen.flare);
  s.sparks = [];
  for (let i = 0; i < 12; i++) { const m = softSprite('rgba(255,210,140,1)', 0.9); m.scale.setScalar(0.4); m.visible = false; scene.add(m); s.sparks.push(m); }

  /* ---------- hermitage (family) ---------- */
  const hg = mk(new T.CylinderGeometry(10, 10.5, 0.4, 20), '#6f8f4a'); place(hg, 'HERM', 0, -0.2, -1); scene.add(hg);
  { const hut = mk(new T.BoxGeometry(3, 2, 2.4), '#c9a06a'); place(hut, 'HERM', -0.4, 1, -4.4); scene.add(hut); const rf = mk(new T.ConeGeometry(2.6, 1.6, 4), '#8a6a3a'); rf.rotation.y = Math.PI / 4; place(rf, 'HERM', -0.4, 2.8, -4.4); scene.add(rf); }
  for (const q of [[-6, -4], [6, -3.5], [-5, -7], [5, -7.5], [7.5, 0.5]]) { const tr = tree(1.5, '#3f7a3a'); place(tr, 'HERM', q[0], 0, q[1]); scene.add(tr); }
  s.h = {
    vis: chibi({ robe: '#f4f0e0', skin: SKIN, hair: '#f4f4f4', bun: true, beard: '#f4f4f4', s: 1.15 }),
    kub: chibi({ robe: '#ffcf4a', sash: P.coral, skin: '#e8c080', crown: true, s: 1.15 }),
    kai: chibi({ robe: '#6a3a7a', sash: P.gold, skin: '#9a7aa8', hair: '#1a1420', bun: true, eyeGlow: YAK_EYE, s: 1.0 }),
    kid: ravana(0.62), kum: kumbha(0.8), vib: chibi({ robe: '#f4f4f4', skin: '#7a8ab8', eyeGlow: '#bfefff', hair: '#1a1420', s: 0.6 }), sur: chibi({ robe: '#c0304a', skin: '#9a6a9a', hair: '#1a1420', bun: true, eyeGlow: YAK_EYE, s: 0.58 }),
    push: pushpaka(), aura: softSprite('rgba(255,215,100,1)', 0.6),
  };
  { const belly = mk(new T.SphereGeometry(0.42, 12, 8), '#ffcf4a'); belly.position.set(0, 0.6, 0.2); s.h.kub.add(belly); }
  s.h.aura.scale.setScalar(4.5); for (const k in s.h) scene.add(s.h[k]);
  place(s.h.vis, 'HERM', 0, 0, -1.8); place(s.h.kub, 'HERM', -2.3, 0, -0.8); place(s.h.kai, 'HERM', 2.2, 0, -0.9); place(s.h.push, 'HERM', -4.2, 3.4, -4.5); s.h.push.scale.setScalar(0.85);
  place(s.h.kid, 'HERM', 1.2, 0, 0.9); place(s.h.kum, 'HERM', 2.5, 0, 1.0); place(s.h.vib, 'HERM', 3.5, 0, 0.7); place(s.h.sur, 'HERM', 4.3, 0, 0.4); place(s.h.aura, 'HERM', -2.3, 1.3, -1.2);
  [s.h.vis, s.h.kub, s.h.kai, s.h.kid, s.h.kum, s.h.vib, s.h.sur].forEach((c) => face(c, 0, 1));

  /* ---------- Ellora relief ---------- */
  const town = mk(new T.BoxGeometry(200, 0.4, 60), '#6a5a48'); town.position.set(ST.ELL[0] + 60, -0.2, -10); scene.add(town);
  { const E = new T.Group(); place(E, 'ELL', 0, 0, -4); scene.add(E);
    const cliff = mk(new T.BoxGeometry(16, 10, 3), '#8a7a66', { flatShading: true }); cliff.position.set(0, 5, -1.2); E.add(cliff);
    const niche = mk(new T.BoxGeometry(8.4, 7.4, 0.6), '#6a5a48'); niche.position.set(0, 4.6, 0.1); E.add(niche);
    const mt = stone(mk(new T.ConeGeometry(3.4, 3.6, 7), '#9a8a78')); mt.position.set(0, 5.6, 0.7); mt.scale.z = 0.35; E.add(mt);
    const rv = stone(ravana(1.25)); rv.position.set(0, 1.1, 0.8); rv.userData.xarms.forEach((a) => (a.rotation.z = a.userData.side * 2.4)); rv.userData.arms.L.rotation.set(0, 0, -2.7); rv.userData.arms.R.rotation.set(0, 0, 2.7); E.add(rv);
    const sv = stone(chibi({ hair: '#000', bun: true, s: 0.9 })); setSit(sv, true); sv.position.set(-0.6, 6.3, 0.8); E.add(sv); const pv = stone(chibi({ hair: '#000', bun: true, s: 0.8 })); setSit(pv, true); pv.position.set(0.6, 6.2, 0.8); E.add(pv);
    s.ell = { vis: [0, 1].map(() => { const p = chibi({ robe: '#7fb3d5', hair: '#2a2228', s: 0.75 }); scene.add(p); return p; }) }; }

  /* ---------- Ayodhya fire ritual ---------- */
  const ag = mk(new T.CylinderGeometry(10, 10.5, 0.4, 20), '#c9a77a'); place(ag, 'AYO', 0, -0.2, -1); scene.add(ag);
  { const pa = palace('#f6ead2'); pa.scale.setScalar(1.3); place(pa, 'AYO', 0, 0, -7.5); scene.add(pa);
    const alt = mk(new T.BoxGeometry(1.8, 0.5, 1.8), '#b8452f'); place(alt, 'AYO', 0, 0.25, 0); scene.add(alt); }
  s.ay = { f: fire(), king: chibi({ robe: '#c0304a', sash: P.gold, skin: SKIN, crown: true, beard: '#f4f4f4', s: 1.1 }), pr: [], orb: orb('rgba(140,200,255,1)'), glow: softSprite('rgba(255,200,120,1)', 0.7) };
  place(s.ay.f, 'AYO', 0, 0.5, 0); s.ay.f.scale.setScalar(1.4); s.ay.glow.scale.setScalar(5); place(s.ay.glow, 'AYO', 0, 1.4, 0);
  setSit(s.ay.king, true); anjali(s.ay.king); place(s.ay.king, 'AYO', 0, 0, -2.0); face(s.ay.king, 0, 1);
  for (let i = 0; i < 3; i++) { const p = chibi({ robe: '#f4f0e0', skin: SKIN, hair: '#2a2228', bun: true, s: 0.9 }); setSit(p, true); anjali(p); const a = [-1.0, 1.0, -0.5][i] * 1.4; place(p, 'AYO', [-2.1, 2.1, -1.9][i], 0, [-0.6, -0.6, 1.5][i]); face(p, -[-2.1, 2.1, -1.9][i], -[-0.6, -0.6, 1.5][i]); scene.add(p); s.ay.pr.push(p); }
  scene.add(s.ay.f, s.ay.king, s.ay.orb, s.ay.glow);

  s.anchorV = new T.Vector3(); s.tmpA = new T.Vector3(); s.tmpB = new T.Vector3();
  return s;
}
function vishnu(s) { const c = chibi({ robe: '#ffcf4a', sash: P.coral, skin: '#4a6fc0', crown: true, sleeve: '#4a6fc0', s: s || 1 }); const xa = xArms(c, 2, '#4a6fc0', null, 1.6); const disc = new T.Mesh(new T.TorusGeometry(0.2, 0.05, 6, 16), basic(P.gold)); disc.position.y = -0.62; xa[1].add(disc); const conch = mk(new T.ConeGeometry(0.09, 0.26, 6), '#ffffff'); conch.position.y = -0.62; xa[0].add(conch); return c; }
