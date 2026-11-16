/* Part C EP2: stations + setup */
const ST = { AYO: [3100, 0, 0], SID: [4000, 0, 0], MIT: [4100, 0, 0], COURT: [4200, 0, 0], ROAD: [4300, 0, 0] };
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
const RAV = '#7a5a8a', RAMA_SKIN = '#5a7fd0';
function ravana(s) { const c = chibi({ robe: '#8a2a2a', sash: P.gold, skin: RAV, crown: true, eyeGlow: YAK_EYE, fangs: true, sleeve: RAV, s: s || 1 }); xHeads(c, 'in', RAV, YAK_EYE); xArms(c, 18, RAV, null, 0.9); return c; }
function rama(s) { return chibi({ robe: '#ffcf4a', sash: P.coral, skin: RAMA_SKIN, crown: true, sleeve: RAMA_SKIN, s: s || 1 }); }
function laksh(s) { return chibi({ robe: '#c0304a', sash: P.gold, skin: '#e8c090', crown: true, sleeve: '#e8c090', s: s || 1 }); }
function rishi(s) { return chibi({ robe: '#e8892a', skin: SKIN, hair: '#f4f4f4', bun: true, beard: '#f4f4f4', s: s || 1 }); }
function rak(skin, robe, s) { return chibi({ robe, skin, eyeGlow: YAK_EYE, fangs: true, sleeve: skin, hair: '#1a1420', s: s || 1 }); }
function parashu() { const g = new T.Group(); const h = mk(new T.CylinderGeometry(0.04, 0.04, 1.5, 6), '#6a4a2a'); h.position.y = 0.75; const bl = new T.Mesh(new T.CylinderGeometry(0.36, 0.36, 0.06, 14, 1, false, 0, Math.PI), M('#d8e0ec', { metalness: 0.6, emissive: new T.Color('#5a6a8a'), emissiveIntensity: 0.3 })); bl.rotation.x = Math.PI / 2; bl.rotation.z = Math.PI / 2; bl.position.set(0.02, 1.32, 0); g.add(h, bl); return g; }
function parashurama(s) { const c = chibi({ robe: '#c0502a', sash: '#6a3a1a', skin: '#c88a5a', hair: '#3a2a1a', bun: true, beard: '#3a2a1a', sleeve: '#c88a5a', s: s || 1.35 }); const ax = parashu(); ax.position.set(0, -0.6, 0.05); ax.rotation.z = 0.2; c.userData.arms.R.add(ax); c.userData.axe = ax; return c; }
function baby() { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.28, 12, 8), '#fff6e8'); b.scale.set(1, 0.8, 1.3); const h = mk(new T.SphereGeometry(0.16, 10, 8), SKIN); h.position.set(0, 0.12, 0.3); g.add(b, h); return g; }
function bow(r) { const g = new T.Group(); const m = M('#8a5a2a', { emissive: new T.Color('#ffb347'), emissiveIntensity: 0.35 }); const half = (sgn) => { const a = new T.Mesh(new T.TorusGeometry(r, 0.08, 6, 24, Math.PI / 2), m); a.rotation.z = sgn > 0 ? 0 : Math.PI / 2; const h = new T.Group(); h.add(a); return h; }; const L1 = half(1), R1 = half(-1); g.add(L1, R1); const grip = mk(new T.CylinderGeometry(0.11, 0.11, 0.35, 8), P.gold, GOLDM); grip.position.y = r; g.add(grip);
  const sg = new T.BufferGeometry().setFromPoints([new T.Vector3(r, 0, 0), new T.Vector3(0, 0, 0), new T.Vector3(-r, 0, 0)]); const str = new T.Line(sg, new T.LineBasicMaterial({ color: '#fff6dc' })); g.add(str); g.userData = { L: L1, R: R1, str, grip, r }; return g; }

function setupScene(scene) {
  const s = {};
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#a9b4ff', 40, 120); s.fog = scene.fog;
  s.sparks = [];
  for (let i = 0; i < 14; i++) { const m = softSprite('rgba(255,230,160,1)', 0.9); m.scale.setScalar(0.45); m.visible = false; scene.add(m); s.sparks.push(m); }

  /* ---------- Ayodhya ---------- */
  const ag = mk(new T.CylinderGeometry(10, 10.5, 0.4, 20), '#c9a77a'); place(ag, 'AYO', 0, -0.2, -1);
  { const pa = palace('#f6ead2'); pa.scale.setScalar(1.3); place(pa, 'AYO', 0, 0, -7.5); scene.add(pa); const alt = mk(new T.BoxGeometry(1.8, 0.5, 1.8), '#b8452f'); place(alt, 'AYO', 0, 0.25, 0); scene.add(alt); }
  s.ay = { f: fire(), king: chibi({ robe: '#c0304a', sash: P.gold, skin: SKIN, crown: true, beard: '#f4f4f4', s: 1.1 }), pr: [], glow: softSprite('rgba(255,200,120,1)', 0.7),
    being: chibi({ robe: '#d0302a', sash: P.gold, skin: '#e8704a', hair: '#ffb347', s: 1.35 }), pot: new T.Group(),
    q: [chibi({ robe: '#f4e8c8', sash: P.gold, skin: SKIN, crown: true, hair: '#2a2228', s: 1.0 }), chibi({ robe: '#3f9a6a', sash: P.gold, skin: SKIN, crown: true, hair: '#2a2228', s: 1.0 }), chibi({ robe: '#7a3a8a', sash: P.gold, skin: SKIN, crown: true, hair: '#2a2228', s: 1.0 })],
    babies: [baby(), baby(), baby(), baby()], vis: rishi(1.05), ram: rama(0.85), lak: laksh(0.8), orbs: [orb('rgba(255,120,140,1)'), orb('rgba(255,120,140,1)')] };
  { const mane = mk(new T.SphereGeometry(0.55, 12, 8), '#ffb347'); mane.scale.set(1.15, 1.05, 0.7); mane.position.set(0, 0.05, -0.18); s.ay.being.userData.head.add(mane); }
  { const p = mk(new T.SphereGeometry(0.32, 12, 8), P.gold, GOLDM); p.scale.y = 0.8; const lid = mk(new T.CylinderGeometry(0.22, 0.26, 0.08, 12), '#e8eef4'); lid.position.y = 0.26; s.ay.pot.add(p, lid); }
  s.ay.babies[0].userData.face = s.ay.babies[0].children[1]; s.ay.babies[0].children[1].material = M(RAMA_SKIN);
  place(s.ay.f, 'AYO', 0, 0.5, 0); s.ay.f.scale.setScalar(1.3); s.ay.glow.scale.setScalar(5); place(s.ay.glow, 'AYO', 0, 1.4, 0);
  for (let i = 0; i < 2; i++) { const p = chibi({ robe: '#f4f0e0', skin: SKIN, hair: '#2a2228', bun: true, s: 0.9 }); setSit(p, true); anjali(p); place(p, 'AYO', i ? 1.7 : -1.7, 0, -1.9); face(p, i ? -1.7 : 1.7, 1.9); scene.add(p); s.ay.pr.push(p); }
  scene.add(s.ay.f, s.ay.king, s.ay.glow, s.ay.being, s.ay.pot, s.ay.vis, s.ay.ram, s.ay.lak, ...s.ay.q, ...s.ay.babies, ...s.ay.orbs);

  /* ---------- Siddhashrama: night forest ritual + sea ---------- */
  const sg = mk(new T.CylinderGeometry(9, 9.5, 0.4, 20), '#3f5a32'); place(sg, 'SID', 0, -0.2, -1);
  const seaS = mk(new T.BoxGeometry(80, 0.2, 60), '#1a3a6a'); place(seaS, 'SID', 30, -0.5, -20); scene.add(seaS);
  for (const q of [[-6, -4], [6, -3.5], [-4, -7], [4.5, -7.5], [7.5, 0.5], [-7.6, 0], [-2, -8]]) { const tr = tree(1.6, '#2f5a3a'); place(tr, 'SID', q[0], 0, q[1]); scene.add(tr); }
  s.sd = { f: fire(), vis: rishi(1.0), r2: [rishi(0.9), rishi(0.9)], ram: rama(1.0), lak: laksh(0.95), mar: rak('#6a4a7a', '#3a2a4a', 1.2), sub: rak('#5a6a4a', '#3a3a2a', 1.15), arrow: beam('#bfefff'), splash: softSprite('rgba(180,220,255,1)', 0.9) };
  place(s.sd.f, 'SID', 0, 0, -1.2); s.sd.f.scale.setScalar(1.3); s.sd.splash.scale.setScalar(4);
  scene.add(s.sd.f, s.sd.vis, ...s.sd.r2, s.sd.ram, s.sd.lak, s.sd.mar, s.sd.sub, s.sd.arrow, s.sd.splash);
  s.sd.fglow = softSprite('rgba(255,180,90,1)', 0.6); s.sd.fglow.scale.setScalar(5); place(s.sd.fglow, 'SID', 0, 1.2, -1.2); scene.add(s.sd.fglow);

  /* ---------- Mithila field ---------- */
  const mg = mk(new T.BoxGeometry(24, 0.4, 18), '#8a6a3a'); place(mg, 'MIT', 0, -0.2, -2); scene.add(mg);
  for (let i = 0; i < 9; i++) { const f = mk(new T.BoxGeometry(18, 0.12, 0.35), '#6a4a24'); place(f, 'MIT', -1, 0.02, -7 + i * 1.3); scene.add(f); }
  const river = mk(new T.BoxGeometry(5, 0.1, 24), '#3a7ab8'); place(river, 'MIT', 10.5, 0.02, -2); scene.add(river);
  for (const q of [[-9, -9], [-6, -10], [4, -10], [8, -9.5]]) { const tr = tree(1.5, '#3f7a3a'); place(tr, 'MIT', q[0], 0, q[1]); scene.add(tr); }
  s.mt = { jan: chibi({ robe: '#3a6ab0', sash: P.gold, skin: SKIN, crown: true, beard: '#f4f4f4', s: 1.1 }), plough: new T.Group(), ox: [], glow: softSprite('rgba(255,235,170,1)', 0.8), baby: baby(), urn: new T.Group() };
  { const beam1 = mk(new T.BoxGeometry(0.12, 0.12, 2.6), '#6a4a2a'); beam1.position.set(0, 0.6, 1.3); const blade = mk(new T.ConeGeometry(0.18, 0.6, 4), '#9aa0a8'); blade.rotation.x = Math.PI / 2; blade.position.set(0, 0.25, -0.1); const hdl = mk(new T.BoxGeometry(0.08, 0.9, 0.08), '#6a4a2a'); hdl.position.set(0, 0.6, -0.2); hdl.rotation.x = -0.5; s.mt.plough.add(beam1, blade, hdl); }
  for (let i = 0; i < 2; i++) { const o = new T.Group(); const b = mk(new T.BoxGeometry(0.7, 0.7, 1.4), '#f0ece0'); b.position.y = 0.75; const h = mk(new T.BoxGeometry(0.45, 0.45, 0.5), '#f0ece0'); h.position.set(0, 0.95, 0.85); for (const sx of [-0.25, 0.25]) for (const sz of [-0.5, 0.5]) { const l = mk(new T.BoxGeometry(0.15, 0.45, 0.15), '#d8d0c0'); l.position.set(sx, 0.22, sz); o.add(l); } const hn = mk(new T.ConeGeometry(0.06, 0.3, 4), '#c9b98a'); hn.position.set(0.15, 1.25, 0.85); const hn2 = hn.clone(); hn2.position.x = -0.15; o.add(b, h, hn, hn2); scene.add(o); s.mt.ox.push(o); }
  { const u = mk(new T.CylinderGeometry(0.35, 0.28, 0.6, 12), P.gold, GOLDM); u.position.y = 0.3; const lid = mk(new T.ConeGeometry(0.36, 0.35, 12), P.gold, GOLDM); lid.position.y = 0.75; s.mt.urn.add(u, lid); }
  s.mt.glow.scale.setScalar(3.5); scene.add(s.mt.jan, s.mt.plough, s.mt.glow, s.mt.baby, s.mt.urn);

  /* ---------- Janaka's court ---------- */
  const cf = mk(new T.BoxGeometry(22, 0.4, 18), '#d8c8a0'); place(cf, 'COURT', 0, -0.2, -2); scene.add(cf);
  const carpet = mk(new T.BoxGeometry(3.2, 0.05, 14), '#a02a2a'); place(carpet, 'COURT', 0, 0.03, -1); scene.add(carpet);
  const wall = mk(new T.BoxGeometry(22, 8, 0.6), '#efe2c4'); place(wall, 'COURT', 0, 4, -9.5); scene.add(wall);
  for (let i = 0; i < 6; i++) for (const sx of [-1, 1]) { const p = mk(new T.CylinderGeometry(0.28, 0.32, 6.5, 10), '#fff2d6'); place(p, 'COURT', sx * 5.6, 3.25, -8 + i * 2.6); scene.add(p); const cap = mk(new T.BoxGeometry(0.8, 0.3, 0.8), P.gold, GOLDM); place(cap, 'COURT', sx * 5.6, 6.6, -8 + i * 2.6); scene.add(cap); }
  { const th = throne(); place(th, 'COURT', 0, 0, -8.2); scene.add(th); }
  s.ct = { jan: chibi({ robe: '#3a6ab0', sash: P.gold, skin: SKIN, crown: true, beard: '#f4f4f4', s: 1.15 }), sita: chibi({ robe: '#ff7fae', sash: P.gold, skin: '#f0c8a0', crown: true, hair: '#2a2228', s: 0.95 }), vis: rishi(1.0), ram: rama(1.05), lak: laksh(1.0),
    kings: [0, 1, 2].map((i) => chibi({ robe: ['#2a6a8a', '#8a6a2a', '#5a3a8a'][i], sash: P.gold, skin: SKIN, crown: true, beard: i === 1 ? '#3a2a20' : null, s: 1.0 })),
    crowd: [], cart: new T.Group(), bow: bow(1.6), pull: [], ropes: [], petals: [], garl: [] };
  setSit(s.ct.jan, true); place(s.ct.jan, 'COURT', 0, 0.7, -8.0); face(s.ct.jan, 0, 1);
  { const C = s.ct.cart; const plat = mk(new T.BoxGeometry(2.4, 0.3, 4.2), '#6a4a2a'); plat.position.y = 0.75; const chest = mk(new T.BoxGeometry(2.0, 0.7, 3.8), '#5a5f6e', { metalness: 0.5 }); chest.position.y = 1.25; C.add(plat, chest); C.userData.chest = chest;
    for (let i = 0; i < 4; i++) for (const sx of [-1.25, 1.25]) { const w = mk(new T.CylinderGeometry(0.42, 0.42, 0.18, 14), '#3a2a1a'); w.rotation.z = Math.PI / 2; w.position.set(sx, 0.42, -1.5 + i * 1.0); C.add(w); }
    const lidG = new T.Group(); const lid = mk(new T.BoxGeometry(2.0, 0.12, 3.8), '#4a4f5e', { metalness: 0.5 }); lid.position.set(0, 0, 1.9); lidG.add(lid); lidG.position.set(0, 1.62, -1.9); C.add(lidG); C.userData.lid = lidG; }
  scene.add(s.ct.cart, s.ct.bow);
  for (let i = 0; i < 24; i++) { const p = chibi({ robe: ['#7fb3d5', '#e6b85c', '#c97b9a', '#8fcf8f'][i % 4], skin: SKIN, hair: '#2a2228', s: 0.62 }); scene.add(p); s.ct.pull.push(p); }
  for (let i = 0; i < 2; i++) { const geo = new T.BufferGeometry().setFromPoints([new T.Vector3(), new T.Vector3()]); const ln = new T.Line(geo, new T.LineBasicMaterial({ color: '#c9a06a' })); scene.add(ln); s.ct.ropes.push(ln); }
  for (let i = 0; i < 10; i++) { const p = chibi({ robe: ['#f4f4f4', '#e6b85c', '#7fb3d5', '#c97b9a', '#8fcf8f'][i % 5], skin: SKIN, hair: '#2a2228', s: 0.8 }); scene.add(p); s.ct.crowd.push(p); }
  for (let i = 0; i < 26; i++) { const p = mk(new T.SphereGeometry(0.07, 6, 4), i % 2 ? '#ffb0d0' : '#fff0a0'); p.scale.y = 0.4; scene.add(p); s.ct.petals.push(p); }
  for (let i = 0; i < 2; i++) { const g = new T.Mesh(new T.TorusGeometry(0.42, 0.07, 6, 16), M(i ? '#ff8fb0' : '#ffd36a')); g.rotation.x = Math.PI / 2; scene.add(g); s.ct.garl.push(g); }
  scene.add(s.ct.jan, s.ct.sita, s.ct.vis, s.ct.ram, s.ct.lak, ...s.ct.kings);
  s.flash = softSprite('rgba(255,250,220,1)', 1); s.flash.scale.setScalar(6); scene.add(s.flash);

  s.ct.das = chibi({ robe: '#c0304a', sash: P.gold, skin: SKIN, crown: true, beard: '#f4f4f4', s: 1.1 }); scene.add(s.ct.das);

  /* ---------- road home: Parashurama ---------- */
  { const road = mk(new T.BoxGeometry(3.4, 0.06, 60), '#b89a6a'); place(road, 'ROAD', 0, 0.02, -10); scene.add(road);
    for (const q of [[-6, -3], [-7.5, 2], [-5.5, -10], [6, -11], [9, -7], [-9, 6]]) { const tr = tree(1.5, '#3f5a3a'); place(tr, 'ROAD', q[0], 0, q[1]); scene.add(tr); }
    s.rd = { das: chibi({ robe: '#c0304a', sash: P.gold, skin: SKIN, crown: true, beard: '#f4f4f4', s: 1.1 }), ram: rama(1.0), lak: laksh(0.95), par: parashurama(1.45), vbow: bow(1.3), glow: softSprite('rgba(120,170,255,1)', 0.8), bolt: beam('#cfe0ff') };
    s.rd.vbow.traverse((m) => { if (m.isMesh) m.material = M('#3a6ad0', { emissive: new T.Color('#4a8aff'), emissiveIntensity: 0.55 }); });
    s.rd.glow.scale.setScalar(4);
    s.rd.car = new T.Group(); { const b = mk(new T.BoxGeometry(1.8, 0.8, 1.4), '#c99a3a'); b.position.y = 0.9; const roof = mk(new T.ConeGeometry(1.2, 1.0, 4), P.gold, GOLDM); roof.rotation.y = Math.PI / 4; roof.position.y = 1.85; s.rd.car.add(b, roof); for (const sx of [-1, 1]) { const w = mk(new T.CylinderGeometry(0.5, 0.5, 0.12, 14), '#5a3a1a'); w.rotation.z = Math.PI / 2; w.position.set(sx * 0.98, 0.5, 0); s.rd.car.add(w); } }
    place(s.rd.car, 'ROAD', -2.6, 0, -2.5); s.rd.car.rotation.y = 0.3;
    for (const k in s.rd) scene.add(s.rd[k]); }

  /* ---------- atmosphere + terrain ---------- */
  atmoSetup(scene, s);
  scene.add(terrain('AYO', '#c9a77a', '#8a6a42', { hill: 3.5, seed: 8 }), ranges('AYO', [[36, '#8a5a3a', 5, 9, 12, 2.6], [48, '#6a3a2a', 9, 15, 9, 2.8]], { seed: 9 }));
  scene.add(terrain('SID', '#3f5a32', '#24361e', { hill: 5, seed: 12, seaX: 10 }), ranges('SID', [[34, '#1e2a3a', 7, 12, 11, 2.4]], { seed: 13 }));
  scene.add(terrain('MIT', '#8a7a4a', '#5a7a3a', { hill: 3, seed: 14, flat: 13 }), ranges('MIT', [[40, '#6a8ab0', 8, 14, 10, 2.6]], { seed: 15, snow: true }));
  scene.add(terrain('ROAD', '#9a8a5a', '#4a4a3a', { hill: 6, seed: 16 }), ranges('ROAD', [[34, '#3a3450', 8, 14, 11, 2.6], [48, '#2a2440', 13, 20, 8, 2.8]], { seed: 17 }));

  s.anchorV = new T.Vector3(); s.tmpA = new T.Vector3(); s.tmpB = new T.Vector3();
  return s;
}
