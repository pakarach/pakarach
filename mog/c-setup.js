/* Part C: stations + setup */
const ST = {
  TEMPLE: [-500, 0, 0], MAPC: [-1000, 0, 0], VIL: [0, 0, 0], FEST: [30, 0, 0], SAN: [60, 0, 0], ROAD: [90, 0, 0], VEL: [120, 0, 0],
  HUT: [150, 0, 0], MIG: [180, 0, 0], SKY: [180, 30, -4], PRETA: [205, 0, 0], JEAL: [235, 0, 0], CAVE: [265, 0, 0], PAST: [2000, 0, 0],
};
const MP = FK.project(97, 24, 0.33);
const mapXZ = (lon, lat) => { const q = MP(lon, lat); return [ST.MAPC[0] + q[0], -q[1]]; };
const PL = { raj: [85.42, 25.03], san: [77.74, 23.48], lon: [61, 43.5], bkk: [100.49, 13.75], cm: [98.98, 18.79], ubon: [104.86, 15.24], krabi: [98.91, 8.09], xian: [108.9, 34.3], kyoto: [135.77, 35.01] };
let S = null;

function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }

function setupScene(scene) {
  const s = { anchors: {}, proj: {} };
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  const warm = new T.PointLight('#ffb070', 0.9, 30); warm.position.set(ST.TEMPLE[0], 6, 4); scene.add(warm);
  scene.fog = new T.Fog('#3a5a8a', 38, 110); s.fog = scene.fog;

  /* ---------- ground world ---------- */
  const ground = mk(new T.BoxGeometry(330, 0.4, 110), '#4f7a52'); ground.position.set(130, -0.2, -30); scene.add(ground);
  const stx = [0, 30, 60, 90, 120, 150, 180, 205, 235, 265];
  let rs = 7; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 150; i++) {
    const x = -15 + rnd() * 300, z = -70 + rnd() * 74; if (stx.some((c) => Math.abs(c - x) < 8) && z > -14) continue;
    const tr = tree(0.8 + rnd() * 0.9, ['#3f8f5a', '#4f9a4a', '#2f7f5a'][i % 3]); tr.position.set(x, 0, z); scene.add(tr);
  }
  const hills = [[-10, -55, 14], [40, -60, 18], [100, -62, 16], [160, -58, 20], [230, -60, 18], [280, -50, 14]];
  for (const h of hills) { const m = mk(new T.ConeGeometry(h[2], h[2] * 0.7, 7), '#5a7f5e'); m.position.set(h[0], h[2] * 0.35 - 0.2, h[1]); scene.add(m); }

  /* ---------- temple (present day) ---------- */
  const TP = new T.Group(); place(TP, 'TEMPLE'); scene.add(TP);
  const floor = mk(new T.BoxGeometry(18, 0.3, 12), '#7a2418'); floor.position.set(0, -0.15, -1); TP.add(floor);
  const wall = mk(new T.BoxGeometry(18, 12, 0.4), '#4a140e'); wall.position.set(0, 6, -5.6); TP.add(wall);
  for (const y of [2.2, 9.5]) { const tr = mk(new T.BoxGeometry(18, 0.18, 0.1), P.gold, GOLDM); tr.position.set(0, y, -5.35); TP.add(tr); }
  for (const x of [-7.5, 7.5]) { const pl = mk(new T.CylinderGeometry(0.45, 0.45, 12, 8), '#9a2a1a'); pl.position.set(x, 6, -3.5); TP.add(pl); const cap = mk(new T.BoxGeometry(1.2, 0.6, 1.2), P.gold, GOLDM); cap.position.set(x, 11.3, -3.5); TP.add(cap); }
  const glow = softSprite('rgba(255,200,90,1)', 0.55); glow.scale.set(9, 9, 1); glow.position.set(0, 4.6, -4.6); TP.add(glow);
  const ped1 = mk(new T.CylinderGeometry(2.0, 2.2, 0.8, 12), P.gold, GOLDM); ped1.position.set(0, 0.4, -3); TP.add(ped1);
  const ped2 = mk(new T.CylinderGeometry(1.7, 1.5, 0.5, 12), '#e9a0b0', { emissive: new T.Color('#5a2030'), emissiveIntensity: 0.3 }); ped2.position.set(0, 1.05, -3); TP.add(ped2);
  const bud = buddha(2.3); bud.position.set(0, 1.25, -3); TP.add(bud);
  s.temple = { g: TP, statues: [] };
  for (const sx of [-1, 1]) {
    const pd = mk(new T.CylinderGeometry(0.95, 1.05, 0.4, 10), P.gold, GOLDM); pd.position.set(sx * 2.9, 0.2, -0.6); TP.add(pd);
    const d = chibi({ robe: '#d79a3a', skin: '#e6bb62', gold: true, sash: '#c0802a', statue: true, closed: true }); setSit(d, true); anjali(d); d.scale.setScalar(1.3); d.position.set(sx * 2.9, 0.4, -0.6); d.rotation.y = -sx * 0.32; TP.add(d); s.temple.statues.push(d);
  }
  const mring = new T.Mesh(new T.RingGeometry(1.25, 1.45, 36), basic(P.gold, { transparent: true, opacity: 0.9, side: T.DoubleSide })); mring.rotation.x = -Math.PI / 2; mring.position.set(2.9, 0.45, -0.6); TP.add(mring); s.temple.ring = mring;
  const mglow = softSprite('rgba(170,150,255,1)', 0.7); mglow.scale.set(4.2, 4.2, 1); mglow.position.set(2.9, 2.2, -1.0); TP.add(mglow); s.temple.mglow = mglow;
  for (let i = 0; i < 6; i++) { const x = -3.2 + i * 1.28; if (Math.abs(x) < 0.3) continue; const c = mk(new T.CylinderGeometry(0.07, 0.07, 0.6, 6), '#fff6e0'); c.position.set(x, 0.3, 2.0); TP.add(c); const f = softSprite('rgba(255,190,90,1)', 0.9); f.scale.set(0.4, 0.6, 1); f.position.set(x, 0.72, 2.0); TP.add(f); }
  s.temple.labS = label('พระสารีบุตร', { w: 3.2, px: 80, color: P.teal }); s.temple.labS.position.set(-2.9, 3.5, -0.4); TP.add(s.temple.labS);

  /* ---------- map (India -> Thailand -> East Asia) ---------- */
  const MG = new T.Group(); scene.add(MG);
  const sea = mk(new T.BoxGeometry(70, 0.2, 50), '#14214a'); sea.position.set(ST.MAPC[0] + 4, -0.15, -3); MG.add(sea);
  const NAMES = ['India', 'Nepal', 'Bangladesh', 'Bhutan', 'Pakistan', 'Afghanistan', 'Sri Lanka', 'China', 'Myanmar', 'Thailand', 'Laos', 'Cambodia', 'Vietnam', 'Malaysia', 'Mongolia', 'North Korea', 'South Korea', 'Japan', 'Taiwan', 'Indonesia', 'Philippines'];
  const COL = { India: '#35609c', Thailand: P.coral, China: '#4f5aa0', Japan: '#4f5aa0', 'North Korea': '#4f5aa0', 'South Korea': '#4f5aa0' };
  const reg = FK.regions(T, DATA.world.features.filter((f) => NAMES.includes(f.properties.name)), { project: MP, idOf: (f) => f.properties.name, color: (id) => COL[id] || P.land });
  for (const id in reg.meshes) reg.meshes[id].scale.z = id === 'India' || id === 'Thailand' ? 0.35 : 0.22;
  reg.group.position.x = ST.MAPC[0]; MG.add(reg.group); s.reg = reg;
  s.map = { g: MG, pins: {}, labs: {} };
  const pin = (k, c, txt) => {
    const [x, z] = mapXZ(PL[k][0], PL[k][1]); const g = new T.Group(); g.position.set(x, 0.36, z);
    const cone = mk(new T.ConeGeometry(0.12, 0.45, 8), c); cone.rotation.x = Math.PI; cone.position.y = 0.25; const hd = mk(new T.SphereGeometry(0.15, 10, 8), c, { emissive: new T.Color(c), emissiveIntensity: 0.4 }); hd.position.y = 0.55; g.add(cone, hd);
    MG.add(g); s.map.pins[k] = g; if (txt) { const lb = label(txt, { w: 1.5, px: 78 }); lb.position.set(x, 1.05, z); MG.add(lb); s.map.labs[k] = lb; } return g;
  };
  pin('raj', P.gold, 'ราชคฤห์'); pin('san', P.gold, 'สาญจี'); pin('bkk', P.gold, 'สนามหลวง'); pin('cm', P.teal, 'เชียงใหม่'); pin('ubon', P.teal, 'อุบลฯ'); pin('krabi', P.teal, 'กระบี่');
  { const [x, z] = mapXZ(PL.lon[0], PL.lon[1]); const lb = label('→ ลอนดอน', { w: 2.2, px: 80, color: P.teal }); lb.position.set(x, 1.0, z); MG.add(lb); s.map.labs.lon = lb; }
  for (const k of ['xian', 'kyoto']) { const [x, z] = mapXZ(PL[k][0], PL[k][1]); const lb = label(k === 'xian' ? 'จีน' : 'ญี่ปุ่น', { w: 2.0, px: 84, color: P.coral }); lb.position.set(x, 1.2, z); MG.add(lb); s.map.labs[k] = lb; }
  { const [x, z] = mapXZ(PL.san[0], PL.san[1]); const sp = stupa(0.42); sp.position.set(x + 0.55, 0.36, z + 0.2); MG.add(sp); s.map.stupa = sp;
    s.map.caskets = [];
    for (const k of [0, 1]) { const c = mk(new T.CylinderGeometry(0.14, 0.16, 0.22, 12), k ? '#d8d0c0' : '#c8bfae', { emissive: new T.Color('#806020'), emissiveIntensity: 0.25 }); c.position.set(x + 0.55 + (k ? 0.32 : -0.32), 0.9, z + 0.25); MG.add(c); s.map.caskets.push(c); }
    s.map.casketLab = [label('สารีปุตตสะ', { w: 1.1, px: 70, color: P.teal }), label('มหาโมคคัลลานสะ', { w: 1.3, px: 70, color: P.gold })];
    s.map.casketLab.forEach((lb) => MG.add(lb)); }
  const arc = (a, b, h, c) => {
    const [x0, z0] = mapXZ(a[0], a[1]), [x1, z1] = mapXZ(b[0], b[1]); const pts = [];
    for (let i = 0; i <= 60; i++) { const u = i / 60; pts.push(new T.Vector3(U.lerp(x0, x1, u), 0.5 + Math.sin(u * Math.PI) * h, U.lerp(z0, z1, u))); }
    const geo = new T.BufferGeometry().setFromPoints(pts); const ln = new T.Line(geo, new T.LineBasicMaterial({ color: c, transparent: true, depthTest: false })); ln.renderOrder = 5; geo.setDrawRange(0, 0); MG.add(ln); ln.userData.pts = pts; return ln;
  };
  s.map.arcs = { toLon: arc(PL.san, PL.lon, 3, P.teal), back: arc(PL.lon, PL.san, 2.2, P.gold), toTh: arc(PL.san, PL.bkk, 3.5, P.gold), cm: arc(PL.bkk, PL.cm, 1, P.teal), ub: arc(PL.cm, PL.ubon, 1, P.teal), kr: arc(PL.ubon, PL.krabi, 1.2, P.teal) };
  s.map.mover = orb('rgba(255,210,120,1)'); s.map.mover.scale.setScalar(0.8); MG.add(s.map.mover);
  { const [x, z] = mapXZ(PL.bkk[0], PL.bkk[1]); const n = 900, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { const r = Math.sqrt(rnd()) * 0.5, a = rnd() * 6.283; p[i * 3] = x + Math.cos(a) * r; p[i * 3 + 1] = 0.42 + rnd() * 0.05; p[i * 3 + 2] = z + Math.sin(a) * r * 0.8; }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); g.setDrawRange(0, 0);
    s.map.crowd = new T.Points(g, new T.PointsMaterial({ color: '#fff3c0', size: 0.07 })); MG.add(s.map.crowd); }
  s.map.lanterns = [];
  for (let i = 0; i < 26; i++) { const k = i % 2 ? PL.kyoto : PL.xian; const [x, z] = mapXZ(k[0] + (rnd() - 0.5) * 9, k[1] + (rnd() - 0.5) * 6); const l = new T.Mesh(new T.BoxGeometry(0.2, 0.26, 0.2), basic('#ffb04a')); const gl = softSprite('rgba(255,170,70,1)', 0.8); gl.scale.setScalar(0.8); l.add(gl); l.position.set(x, 0.5, z); l.userData.ph = rnd(); MG.add(l); s.map.lanterns.push(l); }

  /* ---------- village (childhood) ---------- */
  for (const q of [[-3.4, -2.6], [3.4, -3.2], [0.2, -5.2]]) { const h = hut(2.4, 2, 1.6); place(h, 'VIL', q[0], 0, q[1]); scene.add(h); }
  for (const q of [[-5.5, 0.5], [5.6, 0], [2, -7]]) { const tr = tree(1.2); place(tr, 'VIL', q[0], 0, q[1]); scene.add(tr); }
  s.kid = { k: chibi({ robe: MOG, hair: '#2a2228', ring: MOG, s: 0.72 }), u: chibi({ robe: SAR, hair: '#2a2228', ring: SAR, s: 0.72 }) };
  scene.add(s.kid.k, s.kid.u);

  /* ---------- festival hill ---------- */
  const mound = mk(new T.CylinderGeometry(5.5, 6.5, 1, 14), '#5f8f5a'); place(mound, 'FEST', 0, 0.5, -0.5); scene.add(mound);
  const stage = mk(new T.BoxGeometry(3.6, 0.35, 2), '#b8452f'); place(stage, 'FEST', 0, 1.17, -2.6); scene.add(stage);
  for (const x of [-2.2, 2.2]) { const pole = mk(new T.CylinderGeometry(0.05, 0.05, 2.6, 5), '#7a5236'); place(pole, 'FEST', x, 2.3, -2.6); scene.add(pole); const fl = mk(new T.ConeGeometry(0.3, 0.7, 3), x < 0 ? P.gold : P.coral); fl.rotation.z = -Math.PI / 2; place(fl, 'FEST', x + 0.32, 3.3, -2.6); scene.add(fl); }
  s.fest = { dancers: [], crowd: [] };
  for (let i = 0; i < 3; i++) { const d = chibi({ robe: [P.coral, P.gold, '#ff8fb0'][i], hair: '#2a2228', bun: true, s: 0.75 }); place(d, 'FEST', -1.1 + i * 1.1, 1.35, -2.6); scene.add(d); s.fest.dancers.push(d); }
  for (let i = 0; i < 9; i++) { const c = chibi({ robe: ['#7fb3d5', '#e6b85c', '#c97b9a', '#8fcf8f'][i % 4], hair: '#2a2228', s: 0.62 }); const a = -2.4 + i * 0.6; place(c, 'FEST', Math.sin(a) * 3.6, 1.0, -1.0 + Math.cos(a) * 1.4 + (i % 2) * 0.5); c.rotation.y = Math.PI + (Math.sin(a) * -0.3); scene.add(c); s.fest.crowd.push(c); }
  s.fest.k = chibi({ robe: MOG, hair: '#2a2228', ring: MOG, s: 0.92 }); s.fest.u = chibi({ robe: SAR, hair: '#2a2228', ring: SAR, s: 0.92 }); scene.add(s.fest.k, s.fest.u);
  s.fest.motes = [];
  for (let i = 0; i < 12; i++) { const m = softSprite('rgba(220,220,255,1)', 0.8); m.scale.setScalar(0.7); scene.add(m); s.fest.motes.push(m); }

  /* ---------- Sanjaya's hermitage ---------- */
  for (const q of [[-3.2, -2.4], [3.0, -2.8]]) { const h = hut(2, 1.8, 1.3, '#b99a6a', '#8f7a3a'); place(h, 'SAN', q[0], 0, q[1]); scene.add(h); }
  s.san = { students: [] };
  s.san.t = chibi({ robe: '#e9e4d6', skin: '#d9a87c', hair: '#9a9a9a', bun: true, beard: '#e0e0e0', s: 1.1 }); setSit(s.san.t, true); place(s.san.t, 'SAN', 0, 0, -1.6); scene.add(s.san.t);
  for (let i = 0; i < 6; i++) { const c = chibi({ robe: '#ece6d6', skin: '#e2b48a', hair: '#2a2228', bun: true, s: 0.8 }); setSit(c, true); const a = -1.0 + i * 0.4; place(c, 'SAN', Math.sin(a) * 3.2, 0, -1.6 + Math.cos(a) * 2.6); face(c, -Math.sin(a), -Math.cos(a)); scene.add(c); s.san.students.push(c); }
  s.san.k = chibi({ robe: '#ece6d6', hair: '#2a2228', bun: true, ring: MOG }); s.san.u = chibi({ robe: '#ece6d6', hair: '#2a2228', bun: true, ring: SAR }); scene.add(s.san.k, s.san.u);
  s.san.spark = softSprite('rgba(255,220,120,1)', 1); s.san.spark.scale.setScalar(1.6); scene.add(s.san.spark);

  /* ---------- road (Assaji) ---------- */
  const road = mk(new T.BoxGeometry(22, 0.06, 1.8), '#b89a6a'); place(road, 'ROAD', 2, 0.03, 0.6); scene.add(road);
  for (const q of [[-6, -2.5], [-1, -3], [5, -2.8], [8.5, 2.6]]) { const tr = tree(1.3); place(tr, 'ROAD', q[0], 0, q[1]); scene.add(tr); }
  s.road = { a: chibi({ robe: ROBE, sash: ROBE2 }), u: chibi({ robe: '#ece6d6', hair: '#2a2228', bun: true, ring: SAR }), k: chibi({ robe: '#ece6d6', hair: '#2a2228', bun: true, ring: MOG }) };
  const bowl = mk(new T.SphereGeometry(0.22, 10, 6, 0, 6.283, Math.PI / 2, Math.PI / 2), '#2a2228'); bowl.position.set(0, 0.62, 0.42); s.road.a.add(bowl);
  anjali(s.road.a, 0.7); scene.add(s.road.a, s.road.u, s.road.k);
  s.road.labA = label('พระอัสสชิ', { w: 2.4, px: 80, color: P.gold }); scene.add(s.road.labA);
  s.road.rays = softSprite('rgba(255,230,150,1)', 0.9); s.road.rays.scale.setScalar(3); scene.add(s.road.rays);

  /* ---------- Veluvana (Buddha) ---------- */
  for (let i = 0; i < 9; i++) { const b = bamboo(); const a = -1.3 + i * 0.33; place(b, 'VEL', Math.sin(a) * 6.5, 0, -3.5 + Math.cos(a) * -1.5); scene.add(b); }
  const slab = mk(new T.BoxGeometry(3, 0.45, 2.2), '#9a9488'); place(slab, 'VEL', 0, 0.22, -1.6); scene.add(slab);
  s.vel = { b: buddha(1.35) }; place(s.vel.b, 'VEL', 0, 0.45, -1.6); scene.add(s.vel.b);
  s.vel.k = chibi({ robe: ROBE, sash: ROBE2, ring: MOG }); s.vel.u = chibi({ robe: ROBE, sash: ROBE2, ring: SAR });
  s.vel.kl = chibi({ robe: '#ece6d6', hair: '#2a2228', bun: true, ring: MOG }); s.vel.ul = chibi({ robe: '#ece6d6', hair: '#2a2228', bun: true, ring: SAR });
  for (const c of [s.vel.k, s.vel.u, s.vel.kl, s.vel.ul]) { setSit(c, true); anjali(c); scene.add(c); }
  place(s.vel.k, 'VEL', 1.2, 0, 1.0); place(s.vel.kl, 'VEL', 1.2, 0, 1.0); place(s.vel.u, 'VEL', -1.2, 0, 1.0); place(s.vel.ul, 'VEL', -1.2, 0, 1.0);
  { const n = 70, bodyG = new T.CylinderGeometry(0.2, 0.32, 0.55, 8), headG = new T.SphereGeometry(0.19, 8, 6);
    const ib = new T.InstancedMesh(bodyG, M('#ffffff'), n), ih = new T.InstancedMesh(headG, M(SKIN), n), m4 = new T.Matrix4(), col = new T.Color('#ece6d6');
    for (let i = 0; i < n; i++) { const sd = i % 2 ? 1 : -1, j = Math.floor(i / 2), row = j % 5, c = Math.floor(j / 5); const x = ST.VEL[0] + sd * (2.9 + c * 0.62 + (row % 2) * 0.2), z = -1.4 + row * 0.85 + c * 0.12;
      m4.makeTranslation(x, 0.28, z); ib.setMatrixAt(i, m4); ib.setColorAt(i, col); m4.makeTranslation(x, 0.72, z); ih.setMatrixAt(i, m4); ih.setColorAt(i, new T.Color(SKIN)); }
    scene.add(ib, ih); s.vel.crowd = ib; s.vel.crowdH = ih; }
  s.vel.mats = [];
  for (const sx of [-1, 1]) { const m = new T.Mesh(new T.BoxGeometry(1.3, 0.12, 1.3), basic(sx > 0 ? MOG : SAR, { transparent: true, opacity: 0.8 })); place(m, 'VEL', sx * 1.2, 0.06, 1.0); m.visible = false; scene.add(m); s.vel.mats.push(m); const gl = softSprite(sx > 0 ? 'rgba(170,150,255,1)' : 'rgba(80,240,210,1)', 0.7); gl.scale.setScalar(2.2); place(gl, 'VEL', sx * 1.2, 0.9, 1.0); scene.add(gl); m.userData.gl = gl; }
  s.vel.badge = label('เอตทัคคะ', { w: 3, px: 86, color: P.gold }); scene.add(s.vel.badge);
  s.vel.mog = chibi({ robe: ROBE, sash: ROBE2, ring: MOG, glow: '#8f7bff' }); scene.add(s.vel.mog);

  /* ---------- forest hut (sleepiness) ---------- */
  const fh = hut(2.6, 2.2, 1.6, '#a98a5a', '#6f5a2a'); place(fh, 'HUT', -0.6, 0, -2.8); scene.add(fh);
  for (const q of [[-4.5, -1], [4.8, -2], [-3, -5], [3, -5.5]]) { const tr = tree(1.4, '#2f6f4a'); place(tr, 'HUT', q[0], 0, q[1]); scene.add(tr); }
  const mat0 = mk(new T.BoxGeometry(1.5, 0.05, 1.5), '#c9b27a'); place(mat0, 'HUT', 0, 0.03, 0.9); scene.add(mat0);
  s.hut = { m: chibi({ robe: ROBE, sash: ROBE2, ring: MOG }) }; scene.add(s.hut.m);
  s.hut.pot = mk(new T.SphereGeometry(0.42, 10, 8), '#a8582e'); place(s.hut.pot, 'HUT', 2.2, 0.38, 0.6); scene.add(s.hut.pot);
  s.hut.b = chibi({ robe: '#f0b648', skin: '#f5cf6a', gold: true, halo: true, sash: '#e0a030', closed: true, statue: true, s: 1.15 }); scene.add(s.hut.b);
  s.hut.light = softSprite('rgba(255,240,190,1)', 0.9); s.hut.light.scale.setScalar(5); scene.add(s.hut.light);
  s.hut.stars = (() => { const n = 260, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { p[i * 3] = ST.HUT[0] + (rnd() - 0.5) * 70; p[i * 3 + 1] = 6 + rnd() * 30; p[i * 3 + 2] = -25 - rnd() * 20; } const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); const pt = new T.Points(g, new T.PointsMaterial({ color: '#fff', size: 0.25, transparent: true, opacity: 0, fog: false })); scene.add(pt); return pt; })();
  s.hut.desk = new T.Group(); { const top = mk(new T.BoxGeometry(1.4, 0.08, 0.8), '#d9d4c8'); top.position.y = 0.8; const lg = mk(new T.BoxGeometry(0.08, 0.8, 0.7), '#9a9a9a'); lg.position.set(-0.6, 0.4, 0); const lg2 = lg.clone(); lg2.position.x = 0.6; const lap = mk(new T.BoxGeometry(0.6, 0.38, 0.04), '#3a3f55'); lap.position.set(0, 1.03, -0.15); s.hut.desk.add(top, lg, lg2, lap); }
  place(s.hut.desk, 'HUT', 3.4, 0, 0.5); scene.add(s.hut.desk);
  s.hut.w = chibi({ robe: '#f2f2f2', hair: '#2a2228', sleeve: '#f2f2f2' }); { const tie = mk(new T.BoxGeometry(0.1, 0.5, 0.04), P.coral); tie.position.set(0, 0.85, 0.42); tie.rotation.x = -0.25; s.hut.w.add(tie); }
  place(s.hut.w, 'HUT', 3.4, 0, 1.25); scene.add(s.hut.w);

  /* ---------- heaven (Tavatimsa) ---------- */
  for (const q of [[0, -1.9, 0, 2.6], [-4, -1.9, 1, 2.2], [4, -1.9, 1.2, 2.3], [8, -1.9, -1, 2.4], [-8, -2, -2, 2.2], [1, -2.1, 3, 2]]) { const c = cloud(q[3]); place(c, 'SKY', q[0], q[1], q[2]); scene.add(c); }
  s.sky = { pal: palace() }; place(s.sky.pal, 'SKY', -0.5, -0.2, -2.6); scene.add(s.sky.pal);
  s.sky.sakka = chibi({ robe: '#ffffff', skin: '#bcd0f0', crown: true, eyeGlow: '#7ff0ff', sleeve: '#bcd0f0' }); place(s.sky.sakka, 'SKY', -2.4, 0.2, 1.2); scene.add(s.sky.sakka);
  s.sky.ap = [0, 1].map((i) => { const a = chibi({ robe: i ? '#ffd0e6' : '#d0f0ff', skin: '#bcd0f0', bun: true, hair: '#3a3060', eyeGlow: '#7ff0ff', s: 0.8 }); place(a, 'SKY', -3.6 + i * 2.2, 0.2, 2.2); scene.add(a); return a; });
  s.sky.m = chibi({ robe: ROBE, sash: ROBE2, ring: MOG, glow: '#8f7bff' }); scene.add(s.sky.m);
  s.sky.vim = palace('#ffe7b0'); s.sky.vim.scale.setScalar(0.55); place(s.sky.vim, 'SKY', 9, -0.6, -2.2); scene.add(s.sky.vim);
  s.sky.deva = chibi({ robe: '#fff3c4', skin: '#bcd0f0', crown: true, eyeGlow: '#7ff0ff', s: 0.9 }); place(s.sky.deva, 'SKY', 8.4, 0.0, 0.6); scene.add(s.sky.deva);
  s.ripple = new T.Mesh(new T.RingGeometry(0.8, 1.0, 40), basic('#c9b8ff', { transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false })); s.ripple.rotation.x = -Math.PI / 2; scene.add(s.ripple);

  /* ---------- Migaramata mansion ---------- */
  s.mig = { h: mansion(), monks: [] }; place(s.mig.h, 'MIG', -0.6, 0, -1.8); scene.add(s.mig.h);
  for (let i = 0; i < 3; i++) { const c = chibi({ robe: ROBE, sash: ROBE2, s: 0.85 }); place(c, 'MIG', -2.2 + i * 1.3, 0, 0.6); scene.add(c); s.mig.monks.push(c); }
  s.mig.m = chibi({ robe: ROBE, sash: ROBE2, ring: MOG, glow: '#8f7bff' }); place(s.mig.m, 'MIG', 3.0, 0, 1.4); face(s.mig.m, -1, -0.3); scene.add(s.mig.m);

  /* ---------- preta realm ---------- */
  const pd = mk(new T.CylinderGeometry(5.5, 6, 0.3, 14), '#2b2a3a'); place(pd, 'PRETA', 0, 0.15, -0.5); scene.add(pd);
  s.pre = { mist: [] };
  for (let i = 0; i < 8; i++) { const m = softSprite('rgba(120,130,170,1)', 0.35); m.scale.setScalar(3.5); place(m, 'PRETA', -4 + i * 1.2, 0.8 + (i % 3) * 0.4, -2 + (i % 2)); scene.add(m); s.pre.mist.push(m); }
  s.pre.p = chibi({ robe: '#55566a', skin: '#8090a8', thin: true, eyeGlow: '#9fe8ff', s: 1.2 }); place(s.pre.p, 'PRETA', -1.4, 0.3, 0); face(s.pre.p, 1, 0.5); scene.add(s.pre.p);
  s.pre.m = chibi({ robe: ROBE, sash: ROBE2, ring: MOG, glow: '#8f7bff' }); place(s.pre.m, 'PRETA', 1.5, 0.3, 0.6); face(s.pre.m, -1, 0.3); scene.add(s.pre.m);

  /* ---------- jealous ascetics ---------- */
  s.jeal = { f: fire(), a: [] }; place(s.jeal.f, 'JEAL', 0, 0, 0); scene.add(s.jeal.f);
  for (let i = 0; i < 3; i++) { const c = chibi({ robe: '#8c8a9a', skin: '#d39a72', hair: '#3a3030', bun: true, beard: '#5a5050' }); setSit(c, true); const a = -0.9 + i * 0.9; place(c, 'JEAL', Math.sin(a) * 1.9, 0, -Math.cos(a) * 1.4); face(c, -Math.sin(a), Math.cos(a)); scene.add(c); s.jeal.a.push(c); }
  s.jeal.thief = chibi({ robe: '#3b3340', hair: '#1a1418', band: '#c23b3b' }); scene.add(s.jeal.thief);
  s.jeal.bag = mk(new T.SphereGeometry(0.22, 8, 6), P.gold, GOLDM); scene.add(s.jeal.bag);

  /* ---------- Kalasila cave ---------- */
  const rock = mk(new T.DodecahedronGeometry(4.2, 0), '#6a6578'); rock.scale.set(1.7, 1.05, 1.1); place(rock, 'CAVE', 0, 1.6, -5.2); scene.add(rock);
  const mouth = new T.Mesh(new T.CircleGeometry(1.2, 14), basic('#14101c')); place(mouth, 'CAVE', -3.4, 1.4, -1.1); mouth.rotation.y = 0.3; scene.add(mouth);
  s.cave = { k: new T.Group() }; place(s.cave.k, 'CAVE', 0, 0, -0.8); scene.add(s.cave.k);
  { const K = s.cave.k, wc = '#b0946a'; const back = mk(new T.BoxGeometry(2.8, 1.7, 0.12), wc); back.position.set(0, 0.85, -1.1); const l = mk(new T.BoxGeometry(0.12, 1.7, 2.2), wc); l.position.set(-1.4, 0.85, 0); const r = l.clone(); r.position.x = 1.4; K.add(back, l, r);
    const flo = mk(new T.BoxGeometry(2.8, 0.1, 2.2), '#8a7450'); flo.position.y = 0.05; K.add(flo);
    const roof = mk(new T.ConeGeometry(2.3, 1.3, 4), '#6f5a2a'); roof.rotation.y = Math.PI / 4; roof.position.y = 2.35; roof.scale.z = 0.85; K.add(roof); s.cave.roof = roof;
    const door = mk(new T.BoxGeometry(0.06, 1.0, 0.6), '#5a3a22'); door.position.set(1.47, 0.55, 0.2); K.add(door);
    const kh = new T.Mesh(new T.SphereGeometry(0.06, 8, 6), basic(P.gold)); kh.position.set(1.52, 0.6, 0.38); K.add(kh); s.cave.kh = kh; }
  s.cave.m = chibi({ robe: ROBE, sash: ROBE2, ring: MOG }); setSit(s.cave.m, true); lapHands(s.cave.m); place(s.cave.m, 'CAVE', 0, 0.1, -0.9); scene.add(s.cave.m);
  s.cave.thieves = [];
  for (let i = 0; i < 4; i++) { const c = chibi({ robe: '#3b3340', hair: '#1a1418', band: '#c23b3b' }); const club = mk(new T.CylinderGeometry(0.07, 0.11, 0.8, 6), '#6a4a2a'); club.position.y = -0.95; c.userData.arms.R.add(club); scene.add(c); s.cave.thieves.push(c); }
  s.cave.orb = orb(); scene.add(s.cave.orb);
  { const n = 360, p = new Float32Array(n * 3), seed = new Float32Array(n * 3); for (let i = 0; i < n; i++) { seed[i * 3] = (rnd() - 0.5) * 2.2; seed[i * 3 + 1] = rnd(); seed[i * 3 + 2] = (rnd() - 0.5) * 1.6; }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); s.cave.grains = new T.Points(g, new T.PointsMaterial({ color: '#ffe7a8', size: 0.07 })); s.cave.grains.userData.seed = seed; scene.add(s.cave.grains); }
  s.cave.dust = [0, 1, 2, 3].map(() => { const d = softSprite('rgba(200,190,170,1)', 0.7); d.material.blending = T.NormalBlending; scene.add(d); return d; });
  s.cave.pillar = new T.Mesh(new T.CylinderGeometry(0.7, 1.1, 30, 16, 1, true), basic('#e8dcff', { transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false, blending: T.AdditiveBlending })); place(s.cave.pillar, 'CAVE', 0, 15, -0.9); scene.add(s.cave.pillar);
  s.cave.motes = [];
  for (let i = 0; i < 14; i++) { const m = softSprite('rgba(200,180,255,1)', 0.9); m.scale.setScalar(0.5); scene.add(m); s.cave.motes.push(m); }

  /* ---------- past life (sepia) ---------- */
  const pg = mk(new T.CylinderGeometry(11, 11.5, 0.4, 20), '#7a6a4a'); place(pg, 'PAST', 2, -0.2, -1); scene.add(pg);
  const path = mk(new T.BoxGeometry(12, 0.05, 1.6), '#a08a5e'); place(path, 'PAST', 2.5, 0.03, 1.1); scene.add(path);
  const ph = hut(2.6, 2.2, 1.6, '#b09a70', '#7a6030'); place(ph, 'PAST', -3.5, 0, -2.2); scene.add(ph);
  for (const q of [[-6.5, -0.5], [3.5, -2.5], [5.5, -1.8], [7.6, -0.4], [8.6, 1.4], [1.4, -3.4], [8.2, -2.8]]) { const tr = tree(1.5, '#6f7a4a'); place(tr, 'PAST', q[0], 0, q[1]); scene.add(tr); }
  s.past = {
    son: chibi({ robe: '#d8cdb5', hair: '#2a2228', ring: MOG }), wife: chibi({ robe: '#b5536e', hair: '#2a2228', bun: true }),
    dad: chibi({ robe: '#9a8f7a', hair: '#e8e8e8', beard: '#e8e8e8', closed: true }), mom: chibi({ robe: '#a08a7a', hair: '#e8e8e8', bun: true, closed: true }), cart: cart(),
  };
  for (const k of ['son', 'wife', 'dad', 'mom', 'cart']) scene.add(s.past[k]);
  for (const k of ['dad', 'mom']) { const st = mk(new T.CylinderGeometry(0.04, 0.04, 1.2, 5), '#7a5236'); st.position.y = -0.6; s.past[k].userData.arms.R.add(st); }
  s.past.bowl = mk(new T.SphereGeometry(0.18, 8, 6, 0, 6.283, Math.PI / 2, Math.PI / 2), '#8a5a32'); s.past.son.userData.arms.R.userData.hand.add(s.past.bowl); s.past.bowl.position.y = 0.05;
  s.past.junk = [];
  for (let i = 0; i < 7; i++) { const j = mk(new T.BoxGeometry(0.16, 0.08, 0.12), '#5a4a30'); place(j, 'PAST', -2.6 + (i % 4) * 0.5, 0.05, 0.6 + Math.floor(i / 4) * 0.5); j.rotation.y = i; scene.add(j); s.past.junk.push(j); }
  s.past.motes = [];
  for (let i = 0; i < 12; i++) { const m = softSprite('rgba(255,230,180,1)', 0.9); m.scale.setScalar(0.45); scene.add(m); s.past.motes.push(m); }

  s.anchorV = new T.Vector3();
  return s;
}
