/* Part C: stations + setup */
const ST = {
  TEMPLE: [-500, 0, 0], MAPC: [-1000, 0, 0], KAP: [0, 0, 0], BIRTH: [40, 0, 0], WIN: [80, 0, 0], SUM: [120, 0, 0], RAIN: [160, 0, 0],
  HOUSE: [200, 0, 0], COURT: [240, 0, 0], ROAD: [280, 0, 0], GATE: [320, 0, 0], HALL: [360, 0, 0], PLEA: [400, 0, 0],
};
const MP = FK.project(90, 22, 0.42);
const mapXZ = (lon, lat) => { const q = MP(lon, lat); return [ST.MAPC[0] + q[0], -q[1]]; };
const PL = { kap: [83.05, 27.57], bkk: [100.5, 13.75], kos: [81.0, 26.2], mag: [85.8, 24.8] };
const PAL = { W: [-4.7, -2.4], S: [0, -7.2], R: [4.7, -2.4] }; /* palace [x,z] at KAP */
let S = null;

function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
function pts(n, col, size, op) { const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(new Float32Array(n * 3), 3)); return new T.Points(g, new T.PointsMaterial({ color: col, size, transparent: true, opacity: op == null ? 0.9 : op, depthWrite: false })); }

function setupScene(scene) {
  const s = { anchors: {} };
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#3a5a8a', 40, 120); s.fog = scene.fog;
  let rs = 5; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);

  /* ---------- ground world ---------- */
  const ground = mk(new T.BoxGeometry(400, 0.4, 120), '#4f7a52'); ground.position.set(160, -0.2, -30); scene.add(ground);
  const stx = [0, 40, 80, 120, 160, 200, 240, 280, 320, 360, 400];
  for (let i = 0; i < 190; i++) {
    const x = -25 + rnd() * 450, z = -75 + rnd() * 78; if (stx.some((c) => Math.abs(c - x) < (c === 0 ? 17 : 10)) && z > -16) continue;
    const tr = tree(0.8 + rnd() * 0.9, ['#3f8f5a', '#4f9a4a', '#2f7f5a'][i % 3]); tr.position.set(x, 0, z); scene.add(tr);
  }
  for (const h of [[-20, -62, 16], [30, -66, 20], [100, -64, 18], [170, -60, 20], [250, -64, 18], [320, -58, 16]]) { const m = mk(new T.ConeGeometry(h[2], h[2] * 0.7, 7), '#5a7f5e'); m.position.set(h[0], h[2] * 0.35 - 0.2, h[1]); scene.add(m); }

  /* ---------- Kapilavastu palace park ---------- */
  const K = { pal: {}, ponds: [] }; s.kap = K;
  const lawn = mk(new T.BoxGeometry(34, 0.2, 22), '#5f9a5c'); place(lawn, 'KAP', 0, 0.02, -1); scene.add(lawn);
  const path = mk(new T.BoxGeometry(30, 0.06, 2.2), '#e2d2a8'); place(path, 'KAP', 0, 0.14, 2.2); scene.add(path);
  const wall = mk(new T.BoxGeometry(36, 2.2, 0.6), '#d8c49a'); place(wall, 'KAP', 0, 1.1, -11.5); scene.add(wall);
  for (let i = 0; i < 10; i++) { const c = mk(new T.BoxGeometry(0.7, 0.5, 0.7), '#c9b080'); place(c, 'KAP', -16 + i * 3.55, 2.4, -11.5); scene.add(c); }
  const defs = { W: [9, '#e4ecff', '#6f8fd8'], S: [5, '#fff1d0', '#ff9a4a'], R: [7, '#d8f0e6', '#2ea88a'] };
  for (const k in defs) { const p = tierPalace(defs[k][0], defs[k][1], defs[k][2]); p.scale.setScalar(0.85); place(p, 'KAP', PAL[k][0], 0, PAL[k][1]); scene.add(p); K.pal[k] = p; }
  [['#7fa8ff', -5.2, 4.2], ['#ff7aa0', 0, 0.6], ['#ffffff', 5.2, 4.2]].forEach((q) => { const pd = lotusPond(q[0], 1.8); place(pd, 'KAP', q[1], 0, q[2]); scene.add(pd); K.ponds.push(pd); });
  for (const q of [[-15, -6], [15, -6], [-13.5, 5], [13.5, 5], [-4.6, -8], [4.6, -8]]) { const tr = tree(1.4, '#3f8f5a'); place(tr, 'KAP', q[0], 0, q[1]); scene.add(tr); }
  K.labs = { W: label('ยอด 9 ชั้น', { w: 4.6, px: 86, color: '#bcd4ff' }), S: label('ยอด 5 ชั้น', { w: 4.6, px: 86, color: '#ffc58a' }), R: label('ยอด 7 ชั้น', { w: 4.6, px: 86, color: P.teal }) };
  K.names = { W: label('หนาว', { w: 2.4, px: 90, color: '#bcd4ff' }), S: label('ร้อน', { w: 2.4, px: 90, color: '#ffc58a' }), R: label('ฝน', { w: 2.4, px: 90, color: P.teal }) };
  K.nums = { W: label('1 หนาว', { w: 4.2, px: 96, color: '#bcd4ff' }), S: label('2 ร้อน', { w: 4.2, px: 96, color: '#ffc58a' }), R: label('3 ฝน', { w: 4.2, px: 96, color: P.teal }) };
  K.life = { W: label('ยังหนุ่มสาว', { w: 4.0, px: 86, color: '#fff' }), S: label('ยังแข็งแรง', { w: 4.0, px: 86, color: '#fff' }), R: label('ยังมีเวลา', { w: 4.0, px: 86, color: '#fff' }) };
  for (const grp of [K.labs, K.names, K.nums, K.life]) for (const k in grp) { place(grp[k], 'KAP', PAL[k][0], k === 'S' ? 9.4 : 8.6, PAL[k][1] + 1.2); scene.add(grp[k]); }
  /* weather: snow (W), sun (S), rain (R) */
  K.snow = pts(260, '#ffffff', 0.18); scene.add(K.snow); K.snowSeed = []; for (let i = 0; i < 260; i++) K.snowSeed.push([(rnd() - 0.5) * 6, rnd(), (rnd() - 0.5) * 5]);
  K.sunS = softSprite('rgba(255,210,110,1)', 0.95); K.sunS.scale.setScalar(5); place(K.sunS, 'KAP', 3.4, 8.8, -10); scene.add(K.sunS);
  K.sunCore = new T.Mesh(new T.SphereGeometry(0.8, 14, 10), basic('#fff0b0')); place(K.sunCore, 'KAP', 3.4, 8.8, -10); scene.add(K.sunCore);
  K.rain = rainLines(140, 5.5, 8.6, 4.4, '#cfe6ff'); place(K.rain, 'KAP', PAL.R[0], 0, PAL.R[1]); scene.add(K.rain);
  K.cloud = cloud(1.3); place(K.cloud, 'KAP', PAL.R[0], 9.0, PAL.R[1] - 0.6); scene.add(K.cloud);
  K.cloudW = cloud(1.1); place(K.cloudW, 'KAP', PAL.W[0], 9.2, PAL.W[1] - 0.8); scene.add(K.cloudW);
  /* people at the park */
  K.prince = prince(1.0); scene.add(K.prince);
  K.bearer = chibi({ robe: '#d8d0c0', hair: '#2a2228', s: 0.9 }); scene.add(K.bearer); K.para = parasol(1.0); scene.add(K.para);
  K.workers = [];
  for (let i = 0; i < 6; i++) { const w = chibi({ robe: ['#c9a27a', '#a8b8c8', '#d8b878'][i % 3], hair: '#2a2228', band: '#e8e0d0', s: 0.75 }); scene.add(w); K.workers.push(w); }
  K.dome = new T.Mesh(new T.SphereGeometry(10.5, 32, 16, 0, 6.283, 0, Math.PI / 2), basic('#bfe8ff', { transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false })); place(K.dome, 'KAP', 0, 0, -3.6); K.dome.scale.y = 1.0; scene.add(K.dome);
  K.ghosts = []; /* old, sick, dead visions */
  { const gm = { transparent: true, opacity: 0.55 };
    const old = chibi({ robe: '#9aa0b8', hair: '#e8e8e8', beard: '#e8e8e8', s: 1.0 }); const cane = mk(new T.CylinderGeometry(0.04, 0.04, 1.2, 5), '#7a5236'); cane.position.y = -0.6; old.userData.arms.R.add(cane); old.userData.body.rotation.x = 0.35;
    const sick = chibi({ robe: '#8a9a9a', skin: '#c8c0a0', hair: '#2a2228', closed: true, s: 1.0 });
    const dead = new T.Group(); { const bier = mk(new T.BoxGeometry(2.0, 0.2, 0.8), '#7a5a3a'); bier.position.y = 0.5; const cl = mk(new T.BoxGeometry(1.8, 0.45, 0.6), '#f0f0f0'); cl.position.y = 0.85; dead.add(bier, cl); for (const x of [-0.8, 0.8]) for (const z of [-0.3, 0.3]) { const l = mk(new T.CylinderGeometry(0.05, 0.05, 0.5, 5), '#5a3a22'); l.position.set(x, 0.25, z); dead.add(l); } }
    for (const o of [old, sick, dead]) { o.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); Object.assign(m.material, gm); } }); scene.add(o); K.ghosts.push(o); } }
  K.ghostLabs = [label('แก่', { w: 2.6, px: 90, color: '#dfe6ff' }), label('เจ็บ', { w: 2.6, px: 90, color: '#dfe6ff' }), label('ตาย', { w: 2.6, px: 90, color: '#dfe6ff' })]; K.ghostLabs.forEach((l) => scene.add(l));
  K.badges = [label('เมาวัย', { w: 3.2, px: 84, color: P.gold }), label('เมาว่าไม่มีโรค', { w: 3.2, px: 84, color: P.gold }), label('เมาชีวิต', { w: 3.2, px: 84, color: P.gold })]; K.badges.forEach((l) => scene.add(l));
  K.shards = pts(180, P.gold, 0.16); scene.add(K.shards); K.shardSeed = []; for (let i = 0; i < 180; i++) K.shardSeed.push([rnd() - 0.5, rnd(), rnd() - 0.5, i % 3]);
  K.modern = chibi({ robe: '#f2f2f2', hair: '#2a2228', sleeve: '#f2f2f2', s: 1.1 }); { const tie = mk(new T.BoxGeometry(0.1, 0.5, 0.04), P.coral); tie.position.set(0, 0.85, 0.42); tie.rotation.x = -0.25; K.modern.add(tie); } scene.add(K.modern);
  K.stars = (() => { const n = 300, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { p[i * 3] = (rnd() - 0.5) * 120; p[i * 3 + 1] = 10 + rnd() * 40; p[i * 3 + 2] = -30 - rnd() * 25; } const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); const pt = new T.Points(g, new T.PointsMaterial({ color: '#fff', size: 0.3, transparent: true, opacity: 0, fog: false })); scene.add(pt); return pt; })();
  K.moon = new T.Mesh(new T.SphereGeometry(1.2, 16, 12), basic('#fff6d8', { fog: false })); scene.add(K.moon); K.moonG = softSprite('rgba(255,240,200,1)', 0.6); K.moonG.scale.setScalar(6); scene.add(K.moonG);

  /* ---------- map ---------- */
  const MG = new T.Group(); scene.add(MG);
  const sea = mk(new T.BoxGeometry(70, 0.2, 50), '#14214a'); sea.position.set(ST.MAPC[0], -0.15, 0); MG.add(sea);
  const NAMES = ['India', 'Nepal', 'Bangladesh', 'Bhutan', 'Pakistan', 'Afghanistan', 'Sri Lanka', 'China', 'Myanmar', 'Thailand', 'Laos', 'Cambodia', 'Vietnam', 'Malaysia'];
  const COL = { India: '#35609c', Nepal: '#5a7ad0', Thailand: P.land };
  const reg = FK.regions(T, DATA.world.features.filter((f) => NAMES.includes(f.properties.name)), { project: MP, idOf: (f) => f.properties.name, color: (id) => COL[id] || P.land });
  for (const id in reg.meshes) reg.meshes[id].scale.z = id === 'India' || id === 'Nepal' || id === 'Thailand' ? 0.35 : 0.22;
  reg.group.position.x = ST.MAPC[0]; MG.add(reg.group); s.reg = reg;
  s.map = { g: MG };
  { const [x, z] = mapXZ(PL.kap[0], PL.kap[1]); const g = new T.Group(); g.position.set(x, 0.4, z); const cone = mk(new T.ConeGeometry(0.16, 0.6, 8), P.gold); cone.rotation.x = Math.PI; cone.position.y = 0.32; const hd = mk(new T.SphereGeometry(0.2, 10, 8), P.gold, { emissive: new T.Color(P.gold), emissiveIntensity: 0.5 }); hd.position.y = 0.72; g.add(cone, hd); MG.add(g); s.map.pin = g;
    const lb = label('กบิลพัสดุ์', { w: 2.4, px: 84, color: P.gold }); lb.position.set(x, 1.45, z); MG.add(lb); s.map.lab = lb;
    const mini = new T.Group(); for (const k of [-1, 0, 1]) { const p = tierPalace([9, 5, 7][k + 1], '#fff1d0', ['#6f8fd8', '#ff9a4a', '#2ea88a'][k + 1]); p.scale.setScalar(0.09); p.position.set(x + k * 0.62, 0.4, z + 0.55); mini.add(p); } MG.add(mini); s.map.mini = mini; }
  { const [x, z] = mapXZ(PL.bkk[0], PL.bkk[1]); const lb = label('ไทย', { w: 1.6, px: 90, color: P.coral }); lb.position.set(x - 1.2, 1.2, z - 2.6); MG.add(lb); s.map.th = lb;
    const ln = label('เนปาล', { w: 1.8, px: 80, color: '#cfe0ff' }); const [nx, nz] = mapXZ(84.0, 28.6); ln.position.set(nx, 1.2, nz - 0.4); MG.add(ln); s.map.np = ln;
    const li = label('อินเดีย', { w: 2.0, px: 80, color: '#cfe0ff' }); const [ix, iz] = mapXZ(79, 22); li.position.set(ix, 1.2, iz); MG.add(li); s.map.ind = li; }

  /* mahajanapada discs (approximate) */
  s.map.discs = {};
  for (const [k, c, r, txt] of [['kos', '#ff9a6a', 0.75, 'โกศล'], ['mag', '#c88aff', 0.7, 'มคธ'], ['kap', P.gold, 0.16, 'ศากยะ']]) {
    const [x, z] = mapXZ(PL[k][0], PL[k][1]); const d = new T.Mesh(new T.CircleGeometry(1, 40), basic(c, { transparent: true, opacity: 0.55, depthWrite: false })); d.rotation.x = -Math.PI / 2; d.position.set(x, 0.42, z); d.scale.setScalar(r); d.renderOrder = 3; MG.add(d);
    const ring = new T.Mesh(new T.RingGeometry(0.96, 1.0, 48), basic(c, { transparent: true, opacity: 0.95, depthWrite: false, side: T.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.set(x, 0.43, z); ring.scale.setScalar(r); ring.renderOrder = 4; MG.add(ring);
    const lb = label(txt, { w: k === 'kap' ? 1.5 : 2.0, px: 90, color: c }); lb.position.set(x, k === 'kap' ? 0.95 : 1.1, z + (k === 'kap' ? -0.35 : 0)); MG.add(lb);
    s.map.discs[k] = { d, ring, lb, r }; }
  { const lb = label('ขอบเขตโดยประมาณ', { w: 2.2, px: 60, color: '#cfd8ff' }); const [x, z] = mapXZ(84.0, 23.6); lb.position.set(x, 0.9, z); MG.add(lb); s.map.approx = lb; }

  /* ---------- assembly hall (santhagara) ---------- */
  const Hl = { nobles: [], monks: [], tickets: [] }; s.hall = Hl;
  const hp = mk(new T.BoxGeometry(14, 0.5, 11), '#d8c49a'); place(hp, 'HALL', 0, 0.25, -0.5); scene.add(hp);
  for (let i = 0; i < 7; i++) { const x = -6 + i * 2; const pl = mk(new T.CylinderGeometry(0.22, 0.22, 4.2, 8), '#a8582e'); place(pl, 'HALL', x, 2.6, -5.2); scene.add(pl); }
  for (const x of [-6.4, 6.4]) for (const z of [-3, -1]) { const pl = mk(new T.CylinderGeometry(0.22, 0.22, 4.2, 8), '#a8582e'); place(pl, 'HALL', x, 2.6, z); scene.add(pl); }
  { const beam = mk(new T.BoxGeometry(13.4, 0.5, 0.5), '#8a4a2a'); place(beam, 'HALL', 0, 4.9, -5.2); scene.add(beam); const bw = mk(new T.BoxGeometry(14, 4.2, 0.3), '#e8d8b8'); place(bw, 'HALL', 0, 2.6, -5.5); scene.add(bw); }
  
  const dais = mk(new T.BoxGeometry(2.4, 0.4, 1.6), P.gold, GOLDE); place(dais, 'HALL', 0, 0.7, -3.6); scene.add(dais);
  Hl.leader = king(1.05); setSit(Hl.leader, true); place(Hl.leader, 'HALL', 0, 0.9, -3.6); scene.add(Hl.leader);
  const seatPos = []; for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) seatPos.push([sx * (2.4 + (i % 2) * 1.3), -2.2 + i * 1.15]);
  Hl.seats = seatPos;
  seatPos.forEach((q, i) => { const n = chibi({ robe: ['#c94a4a', '#4a7ac9', '#c9a24a', '#4aa38a', '#9a5ac9'][i % 5], sash: '#f4ecd8', hair: '#2a2228', band: P.gold, s: 0.85 }); setSit(n, true); place(n, 'HALL', q[0], 0.5, q[1]); face(n, -q[0], -0.2); scene.add(n); Hl.nobles.push(n);
    const m = chibi({ robe: ROBE, sash: ROBE2, s: 0.85 }); setSit(m, true); anjali(m, 0.8); place(m, 'HALL', q[0], 0.5, q[1]); face(m, -q[0], -0.2); scene.add(m); Hl.monks.push(m); });
  Hl.elder = chibi({ robe: ROBE, sash: ROBE2, s: 1.0 }); setSit(Hl.elder, true); place(Hl.elder, 'HALL', 0, 0.9, -3.6); scene.add(Hl.elder);
  Hl.cand = chibi({ robe: '#ffffff', sash: '#e8e8e8', s: 0.9 }); setSit(Hl.cand, true); anjali(Hl.cand); place(Hl.cand, 'HALL', 0, 0.5, -0.4); Hl.cand.rotation.y = Math.PI; scene.add(Hl.cand);
  Hl.bowl = mk(new T.SphereGeometry(0.42, 12, 8, 0, 6.283, Math.PI / 2, Math.PI / 2), '#3a2a20'); Hl.bowl.rotation.x = Math.PI; place(Hl.bowl, 'HALL', 0, 0.92, 0.6); scene.add(Hl.bowl);
  for (let i = 0; i < 10; i++) { const tk = mk(new T.BoxGeometry(0.06, 0.45, 0.06), i < 7 ? P.teal : P.coral, { emissive: new T.Color(i < 7 ? P.teal : P.coral), emissiveIntensity: 0.4 }); scene.add(tk); Hl.tickets.push(tk); }
  Hl.vidu = chibi({ robe: '#2a3a7a', sash: P.coral, crown: true, hair: '#2a2228', s: 1.0 }); scene.add(Hl.vidu);
  Hl.maid = lady('#b8a888', 0.85); scene.add(Hl.maid); Hl.bucket = mk(new T.CylinderGeometry(0.25, 0.2, 0.4, 10), '#9a6a3a'); scene.add(Hl.bucket);
  Hl.milk = new T.Mesh(new T.CircleGeometry(0.22, 12), basic('#ffffff')); Hl.milk.rotation.x = -Math.PI / 2; scene.add(Hl.milk);
  Hl.drum = mk(new T.CylinderGeometry(0.45, 0.45, 0.6, 12), '#c94a4a'); Hl.drum.rotation.z = Math.PI / 2; place(Hl.drum, 'HALL', 5.2, 0.9, 3.2); scene.add(Hl.drum);

  /* ---------- army + ruins at KAP ---------- */
  K.army = [];
  for (let i = 0; i < 14; i++) { const c = chibi({ robe: '#8a2a2a', sash: '#3a3a3a', hair: '#1a1418', s: 0.8 }); const helm = mk(new T.ConeGeometry(0.42, 0.45, 8), '#8a8a9a'); helm.position.y = 0.42; c.userData.head.add(helm); const sp = mk(new T.CylinderGeometry(0.03, 0.03, 2.0, 5), '#6a4a2a'); sp.position.y = 0.2; c.userData.arms.R.add(sp); const tip = mk(new T.ConeGeometry(0.07, 0.25, 5), '#c8c8d0'); tip.position.y = 1.3; c.userData.arms.R.add(tip); tip.position.y = 1.25; scene.add(c); K.army.push(c); }
  K.vh = horse('#3a3a40'); scene.add(K.vh); K.vk = chibi({ robe: '#2a3a7a', sash: P.coral, crown: true, hair: '#2a2228', s: 0.85 }); scene.add(K.vk);
  K.dust = [0, 1, 2, 3, 4, 5].map(() => { const d = softSprite('rgba(200,180,150,1)', 0.7); d.material.blending = T.NormalBlending; scene.add(d); return d; });
  K.ruins = new T.Group(); scene.add(K.ruins);
  for (const k of ['W', 'S', 'R']) { const [px, pz] = PAL[k]; const W0 = 5.1, D0 = 4.25;
    for (const q of [[0, -D0 / 2, W0, 0.3], [0, D0 / 2, W0, 0.3], [-W0 / 2, 0, 0.3, D0], [W0 / 2, 0, 0.3, D0], [0, 0, 0.3, D0 * 0.6]]) { const b = mk(new T.BoxGeometry(q[2], 0.45 + rnd() * 0.3, q[3]), '#a8583a'); b.position.set(ST.KAP[0] + px + q[0], 0.25, pz + q[1]); K.ruins.add(b); }
    for (let i = 0; i < 6; i++) { const br = mk(new T.BoxGeometry(0.4, 0.15, 0.2), '#b8683a'); br.position.set(ST.KAP[0] + px + (rnd() - 0.5) * 6, 0.1, pz + 2.6 + rnd() * 1.4); br.rotation.y = rnd() * 3; K.ruins.add(br); } }

  /* ---------- pleasure hall (p1-p3, t5b) ---------- */
  const Pl = { dancers: [], mus: [] }; s.plea = Pl;
  const pfl = mk(new T.BoxGeometry(14, 0.4, 10), '#c9a24a', GOLDE); place(pfl, 'PLEA', 0, 0.2, -0.5); scene.add(pfl);
  const pcarpet = mk(new T.BoxGeometry(8, 0.05, 6), '#a8323a'); place(pcarpet, 'PLEA', 0, 0.42, 0.4); scene.add(pcarpet);
  const pback = mk(new T.BoxGeometry(14, 5, 0.4), '#7a2a3a'); place(pback, 'PLEA', 0, 2.9, -5.4); scene.add(pback);
  for (let i = 0; i < 6; i++) { const pl = mk(new T.CylinderGeometry(0.25, 0.25, 5, 8), P.gold, GOLDE); place(pl, 'PLEA', -6 + i * 2.4, 2.9, -5.0); scene.add(pl); }
  const throne = mk(new T.BoxGeometry(3.2, 0.7, 1.8), P.gold, GOLDE); place(throne, 'PLEA', 0, 0.75, -3.4); scene.add(throne);
  const thb = mk(new T.BoxGeometry(3.2, 1.8, 0.3), '#b8452f'); place(thb, 'PLEA', 0, 1.9, -4.3); scene.add(thb);
  Pl.p = prince(1.0); setSit(Pl.p, true); lapHands(Pl.p); place(Pl.p, 'PLEA', -0.6, 1.1, -3.4); scene.add(Pl.p);
  Pl.yaso = lady('#ffd0e0', 0.95); setSit(Pl.yaso, true); { const tiara = mk(new T.ConeGeometry(0.2, 0.35, 6), P.gold, GOLDE); tiara.position.y = 0.55; Pl.yaso.userData.head.add(tiara); } place(Pl.yaso, 'PLEA', 0.7, 1.1, -3.4); scene.add(Pl.yaso);
  Pl.lamps = []; for (const x of [-5.5, 5.5]) for (const z of [-2.5, 2.5]) { const st = mk(new T.CylinderGeometry(0.08, 0.12, 1.4, 6), P.gold, GOLDE); place(st, 'PLEA', x, 1.1, z); scene.add(st); const fl = softSprite('rgba(255,190,90,1)', 0.9); fl.scale.set(0.7, 1.0, 1); place(fl, 'PLEA', x, 2.0, z); scene.add(fl); Pl.lamps.push(fl); }
  const dcol = ['#ff8fb0', '#ffd56a', '#c8a8ff', '#8fd8c0', '#ff9a6a', '#9fc0ff'];
  for (let i = 0; i < 16; i++) { const d = lady(dcol[i % 6], 0.8); const row = Math.floor(i / 4), col = i % 4; d.userData.home = [-3.0 + col * 2.0 + (row % 2) * 0.5, -1.4 + row * 1.25]; d.userData.extra = i >= 8; scene.add(d); Pl.dancers.push(d); }
  Pl.zz = [];
  Pl.king = king(1.0); scene.add(Pl.king);
  Pl.smoke = [0, 1, 2].map(() => { const sp = softSprite('rgba(230,230,240,1)', 0.4); sp.material.blending = T.NormalBlending; scene.add(sp); return sp; });

  /* ---------- golden cage (q1, q4) ---------- */
  K.cage = new T.Group(); { const n = 14, R = 1.3, H = 3.0; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; const b = mk(new T.CylinderGeometry(0.04, 0.04, H, 5), P.gold, GOLDE); b.position.set(Math.cos(a) * R, H / 2, Math.sin(a) * R); b.userData.a = a; K.cage.add(b); }
    const top = mk(new T.SphereGeometry(R, 16, 8, 0, 6.283, 0, Math.PI / 2), P.gold, Object.assign({ wireframe: true }, GOLDE)); top.position.y = H; K.cage.add(top); const ring = mk(new T.TorusGeometry(R, 0.06, 6, 24), P.gold, GOLDE); ring.rotation.x = Math.PI / 2; ring.position.y = 0.05; K.cage.add(ring); const hook = mk(new T.TorusGeometry(0.25, 0.05, 6, 12), P.gold, GOLDE); hook.position.y = H + R + 0.2; K.cage.add(hook); }
  scene.add(K.cage);

  /* ---------- birth courtyard ---------- */
  const B0 = {}; s.birth = B0;
  const court = mk(new T.BoxGeometry(14, 0.3, 10), '#e8dcc0'); place(court, 'BIRTH', 0, 0.15, -1); scene.add(court);
  const pav = palace('#fbe9c2'); pav.scale.setScalar(1.15); place(pav, 'BIRTH', 0, 0.2, -5.2); scene.add(pav);
  B0.king = king(1.1); place(B0.king, 'BIRTH', -1.6, 0.3, 0.6); scene.add(B0.king);
  B0.sage = chibi({ robe: '#e9e4d6', skin: '#d9a87c', hair: '#c8c8c8', bun: true, beard: '#e8e8e8', s: 1.05 }); place(B0.sage, 'BIRTH', 1.7, 0.3, 0.6); scene.add(B0.sage);
  B0.cradle = new T.Group(); { const c = mk(new T.BoxGeometry(1.1, 0.4, 0.7), P.gold, GOLDE); c.position.y = 0.6; const legs = mk(new T.BoxGeometry(0.9, 0.4, 0.5), '#9a6a3a'); legs.position.y = 0.2; const blank = mk(new T.BoxGeometry(0.8, 0.12, 0.5), '#ffffff'); blank.position.y = 0.84; const bh = mk(new T.SphereGeometry(0.2, 10, 8), SKIN); bh.position.set(0.32, 0.92, 0); B0.cradle.add(c, legs, blank, bh); }
  place(B0.cradle, 'BIRTH', 0, 0.3, 1.0); scene.add(B0.cradle);
  B0.crownI = mk(new T.ConeGeometry(0.42, 0.9, 6), P.gold, GOLDE); scene.add(B0.crownI);
  B0.bowlI = mk(new T.SphereGeometry(0.42, 12, 8, 0, 6.283, Math.PI / 2, Math.PI / 2), '#3a2a20'); scene.add(B0.bowlI);
  B0.labA = label('จักรพรรดิ', { w: 2.8, px: 84, color: P.gold }); B0.labB = label('ออกบวช', { w: 2.4, px: 84, color: P.coral }); scene.add(B0.labA, B0.labB);
  B0.gate = new T.Group(); { const l = mk(new T.BoxGeometry(16, 2.4, 0.5), '#cdb88a'); l.position.set(0, 1.2, 0); B0.gate.add(l); for (let i = 0; i < 8; i++) { const c = mk(new T.BoxGeometry(0.7, 0.5, 0.6), '#bfa878'); c.position.set(-7 + i * 2, 2.6, 0); B0.gate.add(c); } }
  place(B0.gate, 'BIRTH', 0, 0, -2.6); scene.add(B0.gate);

  /* ---------- winter room (low ceiling) ---------- */
  const Wr = { }; s.win = Wr;
  const wr = room(9, 6, 3.2, '#e8d8c0', '#b58a5a'); place(wr, 'WIN', 0, 0, 0); scene.add(wr); Wr.room = wr;
  const fp = new T.Mesh(new T.PlaneGeometry(3.6, 1.8), new T.MeshBasicMaterial({ map: flamesTex() })); place(fp, 'WIN', -2.0, 1.75, -2.82); scene.add(fp); Wr.paint = fp;
  const fp2 = new T.Mesh(new T.PlaneGeometry(2.6, 1.3), new T.MeshBasicMaterial({ map: flamesTex() })); fp2.rotation.y = Math.PI / 2; place(fp2, 'WIN', -4.32, 1.75, -0.6); scene.add(fp2);
  Wr.glow = softSprite('rgba(255,140,60,1)', 0.5); Wr.glow.scale.set(5, 3, 1); place(Wr.glow, 'WIN', -2.0, 1.75, -2.6); scene.add(Wr.glow);
  Wr.win = shutterWin(1.6, 1.3, M('#8a5a32')); Wr.win.rotation.y = Math.PI / 2; place(Wr.win, 'WIN', 2.4, 1.8, -2.78); scene.add(Wr.win);
  Wr.sunW = softSprite('rgba(255,220,120,1)', 0.95); Wr.sunW.scale.setScalar(1.0); scene.add(Wr.sunW);
  for (const z of [-2.2, -0.6, 1.0]) { const cu = mk(new T.BoxGeometry(0.15, 2.9, 1.0), '#a8323a'); place(cu, 'WIN', -4.05, 1.5, z); scene.add(cu); const fold = mk(new T.BoxGeometry(0.2, 2.9, 0.12), '#c8484f'); place(fold, 'WIN', -3.98, 1.5, z + 0.3); scene.add(fold); }
  const cush = mk(new T.BoxGeometry(2.0, 0.3, 1.5), '#7a3a8a'); place(cush, 'WIN', 0.6, 0.15, -0.3); scene.add(cush);
  Wr.p = prince(1.0); setSit(Wr.p, true); lapHands(Wr.p); place(Wr.p, 'WIN', 0.6, 0.3, -0.4); scene.add(Wr.p);
  Wr.blank = mk(new T.BoxGeometry(1.7, 0.35, 1.3), '#e9d4b0'); place(Wr.blank, 'WIN', 0.6, 0.52, -0.25); scene.add(Wr.blank);
  Wr.table = mk(new T.BoxGeometry(1.2, 0.4, 0.8), '#7a4a22'); place(Wr.table, 'WIN', 2.4, 0.2, 0.9); scene.add(Wr.table);
  Wr.bowl = bowlOf('rich'); Wr.bowl.scale.setScalar(0.7); place(Wr.bowl, 'WIN', 2.2, 0.4, 0.9); scene.add(Wr.bowl);
  Wr.chili = []; for (let i = 0; i < 3; i++) { const c = mk(new T.ConeGeometry(0.06, 0.35, 5), '#e0302a'); c.rotation.z = Math.PI / 2 + i * 0.3; place(c, 'WIN', 2.75, 0.47, 0.75 + i * 0.12); scene.add(c); Wr.chili.push(c); }
  Wr.steam = [0, 1, 2, 3].map(() => { const sp = softSprite('rgba(255,255,255,1)', 0.5); sp.material.blending = T.NormalBlending; scene.add(sp); return sp; });
  Wr.warm = pts(120, '#ffb070', 0.13, 0.85); scene.add(Wr.warm); Wr.warmSeed = []; for (let i = 0; i < 120; i++) Wr.warmSeed.push([(rnd() - 0.5) * 8, rnd(), (rnd() - 0.5) * 5]);
  Wr.cold = pts(90, '#bfe0ff', 0.14, 0.9); scene.add(Wr.cold); Wr.coldSeed = []; for (let i = 0; i < 90; i++) Wr.coldSeed.push([rnd(), (rnd() - 0.5) * 1.2, (rnd() - 0.5) * 1.4]);

  /* ---------- summer room (tall, airy) ---------- */
  const Sm = {}; s.sum = Sm;
  const sr = room(10, 6, 6.0, '#fff4dc', '#e6d6b4'); place(sr, 'SUM', 0, 0, 0); scene.add(sr); Sm.room = sr;
  sr.userData.ceil.material = M(P.gold, GOLDE);
  for (const x of [-2.6, 2.6]) { const sky = new T.Mesh(new T.PlaneGeometry(2.6, 3.2), basic('#9fd4ff')); place(sky, 'SUM', x, 3.0, -2.83); scene.add(sky); const net = new T.Mesh(new T.PlaneGeometry(2.6, 3.2), new T.MeshBasicMaterial({ map: (() => { const tx = netTex(); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(3, 4); return tx; })(), transparent: true })); place(net, 'SUM', x, 3.0, -2.81); scene.add(net); const fr = mk(new T.BoxGeometry(2.9, 3.5, 0.1), '#8a5a32'); place(fr, 'SUM', x, 3.0, -2.86); scene.add(fr); }
  Sm.win = shutterWin(1.6, 2.0, M('#8a5a32')); Sm.win.rotation.y = Math.PI / 2; place(Sm.win, 'SUM', 0, 3.4, -2.78); scene.add(Sm.win);
  const lotusC = ['#ff8fb0', '#ffffff', '#7fa8ff', '#ff6a6a', '#ffd56a'];
  Sm.jars = []; for (let i = 0; i < 5; i++) { const j = jar(lotusC[i]); place(j, 'SUM', -4 + i * 2, 0, -2.0); scene.add(j); Sm.jars.push(j); }
  const basin = mk(new T.CylinderGeometry(1.1, 1.2, 0.4, 16), '#e8e0d0'); place(basin, 'SUM', -2.2, 0.2, 1.0); scene.add(basin);
  const bw = new T.Mesh(new T.CircleGeometry(0.95, 16), basic('#6fc6f0')); bw.rotation.x = -Math.PI / 2; place(bw, 'SUM', -2.2, 0.42, 1.0); scene.add(bw);
  Sm.spray = pts(80, '#d8f2ff', 0.1); scene.add(Sm.spray);
  const bed = mk(new T.BoxGeometry(2.4, 0.5, 1.6), '#f4f4f4'); place(bed, 'SUM', 1.8, 0.25, 0.2); scene.add(bed);
  Sm.p = chibi({ robe: '#7fa8ff', sash: P.gold, crown: true, hair: '#2a2228', ring: P.gold }); setSit(Sm.p, true); lapHands(Sm.p); place(Sm.p, 'SUM', 1.8, 0.5, 0.2); scene.add(Sm.p);
  Sm.bells = []; for (let i = 0; i < 5; i++) { const b = new T.Group(); const str = mk(new T.CylinderGeometry(0.015, 0.015, 0.7, 4), '#d8c080'); str.position.y = -0.35; const bl = mk(new T.ConeGeometry(0.16, 0.3, 8), P.gold, GOLDE); bl.position.y = -0.8; b.add(str, bl); place(b, 'SUM', -4 + i * 2, 5.85, 1.6); scene.add(b); Sm.bells.push(b); }
  Sm.holes = new T.Mesh(new T.PlaneGeometry(9.4, 5.4), new T.MeshBasicMaterial({ map: cvTex(256, 160, (g, w, h) => { g.clearRect(0, 0, w, h); g.fillStyle = 'rgba(20,20,40,.9)'; for (let y = 8; y < h; y += 14) for (let x = 8 + (y / 14 % 2) * 7; x < w; x += 14) { g.beginPath(); g.arc(x, y, 2.6, 0, 6.283); g.fill(); } }), transparent: true, side: T.DoubleSide }));
  Sm.holes.rotation.x = Math.PI / 2; place(Sm.holes, 'SUM', 0, 5.84, 0); scene.add(Sm.holes);
  Sm.rain = rainLines(220, 9, 5.8, 5, '#bfe6ff'); place(Sm.rain, 'SUM', 0, 0, 0); scene.add(Sm.rain);
  /* roof loft above the ceiling: water tank + pump worker + stretched hide */
  const loft = mk(new T.BoxGeometry(10, 0.3, 6), '#9a6a3a'); place(loft, 'SUM', 0, 6.45, 0); scene.add(loft);
  Sm.tank = mk(new T.CylinderGeometry(0.9, 0.9, 1.2, 14), '#5a8ab8'); place(Sm.tank, 'SUM', -3.2, 7.2, -1.2); scene.add(Sm.tank);
  Sm.pipe = mk(new T.CylinderGeometry(0.1, 0.1, 7.2, 6), '#b8b0a0'); place(Sm.pipe, 'SUM', -5.3, 3.5, -1.2); scene.add(Sm.pipe);
  Sm.pumper = chibi({ robe: '#c9a27a', hair: '#2a2228', band: '#e8e0d0', s: 0.85 }); place(Sm.pumper, 'SUM', -5.9, 0, -1.2); scene.add(Sm.pumper);
  Sm.wheel = mk(new T.TorusGeometry(0.7, 0.08, 6, 14), '#7a4a22'); place(Sm.wheel, 'SUM', -5.9, 1.4, -0.4); scene.add(Sm.wheel);
  Sm.hide = new T.Group(); { const fr = mk(new T.BoxGeometry(2.2, 0.5, 1.6), '#6a4a2a'); fr.position.y = 0.25; const hd = mk(new T.BoxGeometry(2.0, 0.06, 1.4), '#c9a070'); hd.position.y = 0.52; Sm.hide.add(fr, hd); Sm.hideTop = hd; }
  place(Sm.hide, 'SUM', 2.6, 6.6, -0.6); scene.add(Sm.hide);
  Sm.dropper = chibi({ robe: '#a8b8c8', hair: '#2a2228', band: '#e8e0d0', s: 0.85 }); place(Sm.dropper, 'SUM', 4.4, 6.6, -0.6); scene.add(Sm.dropper);
  Sm.pebbles = []; for (let i = 0; i < 6; i++) { const pb = mk(new T.DodecahedronGeometry(0.12, 0), '#9a9488'); scene.add(pb); Sm.pebbles.push(pb); }
  Sm.boom = new T.Mesh(new T.RingGeometry(0.6, 0.75, 32), basic('#fff3c0', { transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false })); Sm.boom.rotation.x = -Math.PI / 2; place(Sm.boom, 'SUM', 2.6, 7.2, -0.6); scene.add(Sm.boom);
  Sm.wind = pts(120, '#e8fbff', 0.12, 0.8); scene.add(Sm.wind); Sm.windSeed = []; for (let i = 0; i < 120; i++) Sm.windSeed.push([rnd(), (rnd() - 0.5) * 2.6, (rnd() - 0.5) * 2.8]);
  Sm.heat = pts(80, '#ff8a4a', 0.15, 0.85); scene.add(Sm.heat);

  /* ---------- rainy-season room ---------- */
  const Rr = {}; s.rain = Rr;
  const rr0 = room(9.5, 6, 4.4, '#e6efe6', '#b89a6a'); place(rr0, 'RAIN', 0, 0, 0); scene.add(rr0);
  const pf = new T.Mesh(new T.PlaneGeometry(2.6, 1.4), new T.MeshBasicMaterial({ map: flamesTex() })); place(pf, 'RAIN', -3.0, 2.5, -2.83); scene.add(pf);
  const pp = new T.Mesh(new T.PlaneGeometry(2.6, 1.4), new T.MeshBasicMaterial({ map: pondTex() })); place(pp, 'RAIN', 3.0, 2.5, -2.83); scene.add(pp);
  Rr.paint = [pf, pp];
  Rr.win = shutterWin(1.5, 1.5, M('#8a5a32')); Rr.win.rotation.y = Math.PI / 2; place(Rr.win, 'RAIN', 0, 2.5, -2.78); scene.add(Rr.win);
  { const nm = new T.MeshBasicMaterial({ map: (() => { const tx = netTex(); tx.wrapS = tx.wrapT = T.RepeatWrapping; tx.repeat.set(2, 3); return tx; })(), transparent: true, color: '#ffffff' }); const lf = Rr.win.userData.leaves[1].children[0]; lf.material = nm; }
  Rr.win.userData.sky.material.color.set('#7a8aa0');
  Rr.out = rainLines(150, 3.2, 5, 5, '#cfe6ff'); place(Rr.out, 'RAIN', 6.4, 0, 0.2); scene.add(Rr.out);
  const outFloor = mk(new T.BoxGeometry(3.4, 0.1, 6), '#5f8f6a'); place(outFloor, 'RAIN', 6.5, 0.05, 0); scene.add(outFloor);
  const mat = mk(new T.BoxGeometry(2.0, 0.25, 1.5), '#2ea88a'); place(mat, 'RAIN', 0, 0.12, -0.6); scene.add(mat);
  Rr.p = prince(1.0); setSit(Rr.p, true); lapHands(Rr.p); place(Rr.p, 'RAIN', 0, 0.25, -0.7); scene.add(Rr.p);
  Rr.mus = [];
  const inst = (k) => { const g = new T.Group(); if (k === 0) { const h = mk(new T.TorusGeometry(0.35, 0.05, 6, 12, Math.PI), '#9a6a3a'); h.rotation.z = Math.PI / 2; g.add(h); } else if (k === 1) { const d = mk(new T.CylinderGeometry(0.28, 0.28, 0.4, 12), '#c94a4a'); g.add(d); } else if (k === 2) { const f = mk(new T.CylinderGeometry(0.04, 0.04, 0.8, 6), '#d8c080'); f.rotation.z = Math.PI / 2; g.add(f); } else { const c = mk(new T.BoxGeometry(0.8, 0.12, 0.3), '#7a4a22'); g.add(c); } return g; };
  [[-2.6, 0.6], [-1.3, 1.6], [1.3, 1.6], [2.6, 0.6]].forEach((q, i) => { const l = lady(['#ff8fb0', '#ffd56a', '#c8a8ff', '#8fd8c0'][i], 0.85); setSit(l, true); place(l, 'RAIN', q[0], 0, q[1]); face(l, -q[0], -q[1] - 0.7); scene.add(l); const it = inst(i); it.position.set(0, 0.75, 0.5); l.add(it); l.userData.inst = it; Rr.mus.push(l); });
  Rr.notes = [0, 1, 2, 3, 4, 5].map((i) => { const n = label(i % 2 ? '♪' : '♫', { w: 0.7, px: 110, color: ['#ffd56a', '#ff8fb0', '#bfe8ff'][i % 3] }); scene.add(n); return n; });
  Rr.cool = pts(70, '#bfe0ff', 0.13); Rr.warm = pts(70, '#ffb070', 0.13); scene.add(Rr.cool, Rr.warm);

  /* ---------- modern house ---------- */
  const Hm = {}; s.house = Hm;
  const hr = room(9, 6, 3.6, '#f2ece2', '#c8b090'); place(hr, 'HOUSE', 0, 0, 0); scene.add(hr);
  Hm.win = shutterWin(2.0, 1.5, M('#5a6a80')); Hm.win.rotation.y = Math.PI / 2; place(Hm.win, 'HOUSE', 0.6, 2.0, -2.78); scene.add(Hm.win);
  Hm.sunW = softSprite('rgba(255,210,110,1)', 0.95); scene.add(Hm.sunW);
  Hm.person = chibi({ robe: '#f2f2f2', hair: '#2a2228', sleeve: '#f2f2f2', s: 1.0 }); place(Hm.person, 'HOUSE', -1.4, 0, 0.6); scene.add(Hm.person);
  Hm.sofa = mk(new T.BoxGeometry(2.4, 0.6, 1.0), '#4f6aa8'); place(Hm.sofa, 'HOUSE', -2.6, 0.3, -1.6); scene.add(Hm.sofa);
  Hm.jar = jar('#ff8fb0'); place(Hm.jar, 'HOUSE', 2.8, 0, -1.9); scene.add(Hm.jar);
  Hm.plant = tree(0.9, '#3f9f5a'); place(Hm.plant, 'HOUSE', -0.9, 0, -2.0); scene.add(Hm.plant);
  Hm.heat = pts(140, '#ff7a3a', 0.16, 0.9); Hm.cool = pts(110, '#9fe0ff', 0.15, 0.9); scene.add(Hm.heat, Hm.cool); Hm.seed = []; for (let i = 0; i < 140; i++) Hm.seed.push([rnd(), (rnd() - 0.5) * 7, rnd() * 3, (rnd() - 0.5) * 4]);
  Hm.thermo = label('', { w: 1, px: 10 }); Hm.thermo.visible = false;

  /* ---------- servants' kitchen court ---------- */
  const Cc = {}; s.court = Cc;
  const cf = mk(new T.BoxGeometry(14, 0.25, 8), '#d8c8a8'); place(cf, 'COURT', 0, 0.12, -0.5); scene.add(cf);
  const div = mk(new T.BoxGeometry(0.3, 1.2, 6), '#b8a888'); place(div, 'COURT', 0, 0.6, -0.8); scene.add(div);
  Cc.tables = [];
  for (const sx of [-1, 1]) { const tb = mk(new T.BoxGeometry(4.2, 0.6, 1.6), sx < 0 ? '#8a7a6a' : '#b8862a'); place(tb, 'COURT', sx * 3.4, 0.55, 0.6); scene.add(tb); Cc.tables.push(tb); }
  Cc.poor = []; Cc.rich = [];
  for (let i = 0; i < 3; i++) { const b = bowlOf('poor'); b.scale.setScalar(0.85); place(b, 'COURT', -4.9 + i * 1.4, 0.85, 0.6); scene.add(b); Cc.poor.push(b); const r = bowlOf('rich'); r.scale.setScalar(0.85); place(r, 'COURT', 1.9 + i * 1.4, 0.85, 0.6); scene.add(r); Cc.rich.push(r); }
  Cc.sv = [];
  for (let i = 0; i < 6; i++) { const sx = i < 3 ? -1 : 1; const c = chibi({ robe: sx < 0 ? '#8c8a7a' : '#d8b878', hair: '#2a2228', band: '#e8e0d0', s: 0.85 }); place(c, 'COURT', sx * 3.4 + ((i % 3) - 1) * 1.4, 0.25, -0.7); c.rotation.y = 0; scene.add(c); Cc.sv.push(c); }
  Cc.labL = label('บ้านอื่น', { w: 2.8, px: 90, color: '#d0d0d0' }); place(Cc.labL, 'COURT', -3.4, 2.5, -0.9); scene.add(Cc.labL);
  Cc.labR = label('ในวัง', { w: 2.4, px: 90, color: P.gold }); place(Cc.labR, 'COURT', 3.4, 2.5, -0.9); scene.add(Cc.labR);

  /* ---------- road of the four sights ---------- */
  const Rd = {}; s.road = Rd;
  const road = mk(new T.BoxGeometry(30, 0.06, 2.2), '#c8aa78'); place(road, 'ROAD', 0, 0.03, 0.8); scene.add(road);
  for (const q of [[-11, -2.5], [-6, -3], [0, -3.2], [6, -2.8], [11, -2.6]]) { const tr = tree(1.3); place(tr, 'ROAD', q[0], 0, q[1]); scene.add(tr); }
  Rd.ch = chariot(); scene.add(Rd.ch); Rd.p = prince(0.9); scene.add(Rd.p);
  Rd.sights = [];
  { const old = chibi({ robe: '#9a8f7a', hair: '#e8e8e8', beard: '#e8e8e8' }); const cane = mk(new T.CylinderGeometry(0.04, 0.04, 1.2, 5), '#7a5236'); cane.position.y = -0.6; old.userData.arms.R.add(cane); old.userData.body.rotation.x = 0.3; old.userData.head.position.z = 0.25;
    const sick = new T.Group(); { const mt = mk(new T.BoxGeometry(1.8, 0.1, 0.9), '#a89a7a'); mt.position.y = 0.05; const man = chibi({ robe: '#8a9a9a', skin: '#c8c0a0', hair: '#2a2228', closed: true }); man.rotation.z = Math.PI / 2; man.position.set(0.8, 0.35, 0); sick.add(mt, man); }
    const dead = new T.Group(); { const bier = mk(new T.BoxGeometry(2.0, 0.2, 0.8), '#7a5a3a'); bier.position.y = 0.7; const cl = mk(new T.BoxGeometry(1.8, 0.4, 0.6), '#f4f4f4'); cl.position.y = 0.98; dead.add(bier, cl); for (const x of [-1.25, 1.25]) for (const z of [-0.3, 0.3]) { const c = chibi({ robe: '#e8e8e8', hair: '#2a2228', s: 0.7 }); c.position.set(x, 0, z); c.userData.arms.L.rotation.z = -2.6; c.userData.arms.R.rotation.z = 2.6; dead.add(c); } }
    const monk = chibi({ robe: ROBE, sash: ROBE2 }); anjali(monk, 0.7);
    [old, sick, dead, monk].forEach((o, i) => { place(o, 'ROAD', -6 + i * 5, 0, 2.9); scene.add(o); Rd.sights.push(o); }); face(old, 0, -1); face(monk, 0, -1); }
  Rd.labs = ['คนแก่', 'คนเจ็บ', 'คนตาย', 'นักบวช'].map((x, i) => { const l = label(x, { w: 2.3, px: 86, color: i === 3 ? P.gold : '#ffffff' }); place(l, 'ROAD', -6 + i * 5, 2.9, 2.9); scene.add(l); return l; });

  /* ---------- city gate at night ---------- */
  const Gt = {}; s.gate = Gt;
  const gw = new T.Group(); { const l = mk(new T.BoxGeometry(8, 4.4, 1.2), '#8a7a5a'); l.position.set(-5.6, 2.2, 0); const r = l.clone(); r.position.x = 5.6; const top = mk(new T.BoxGeometry(19, 1.4, 1.4), '#7a6a4a'); top.position.y = 4.9; gw.add(l, r, top); for (let i = 0; i < 9; i++) { const c = mk(new T.BoxGeometry(0.8, 0.6, 1.2), '#7a6a4a'); c.position.set(-8.5 + i * 2.1, 5.9, 0); gw.add(c); } }
  place(gw, 'GATE', 0, 0, -2); scene.add(gw);
  const gp = mk(new T.BoxGeometry(4, 0.05, 14), '#a89070'); place(gp, 'GATE', 0, 0.03, 1); scene.add(gp);
  Gt.h = horse('#f4f2ec'); scene.add(Gt.h); Gt.p = prince(0.85); scene.add(Gt.p);
  Gt.channa = chibi({ robe: '#d8d0c0', hair: '#2a2228', band: '#c9a24a', s: 0.9 }); scene.add(Gt.channa);
  /* ---------- gate by day (q3): going forth before weeping parents ---------- */
  Gt.monk = chibi({ robe: ROBE, sash: ROBE2, s: 0.95 }); scene.add(Gt.monk);
  Gt.dad = king(1.05); scene.add(Gt.dad); Gt.mom = lady('#e8c0d8', 0.95); scene.add(Gt.mom);
  Gt.tears = [0, 1, 2, 3, 4, 5].map(() => { const d = new T.Mesh(new T.SphereGeometry(0.06, 6, 5), basic('#8fd0ff')); scene.add(d); return d; });


  /* ---------- temple (Emerald Buddha, present day) ---------- */
  const TP = new T.Group(); place(TP, 'TEMPLE'); scene.add(TP);
  const floor = mk(new T.BoxGeometry(18, 0.3, 12), '#7a2418'); floor.position.set(0, -0.15, -1); TP.add(floor);
  const wallT = mk(new T.BoxGeometry(18, 13, 0.4), '#4a140e'); wallT.position.set(0, 6.5, -5.6); TP.add(wallT);
  for (const y of [2.2, 10.5]) { const tr = mk(new T.BoxGeometry(18, 0.18, 0.1), P.gold, GOLDM); tr.position.set(0, y, -5.35); TP.add(tr); }
  for (const x of [-7.5, 7.5]) { const pl = mk(new T.CylinderGeometry(0.45, 0.45, 13, 8), '#9a2a1a'); pl.position.set(x, 6.5, -3.5); TP.add(pl); }
  const glowT = softSprite('rgba(255,200,90,1)', 0.55); glowT.scale.set(10, 10, 1); glowT.position.set(0, 6.0, -4.6); TP.add(glowT);
  let y = 0; [[3.2, 1.0], [2.6, 1.0], [2.1, 1.0], [1.7, 1.0]].forEach((q) => { const tier = mk(new T.CylinderGeometry(q[0] * 0.8, q[0], q[1], 8), P.gold, GOLDM); tier.position.set(0, y + q[1] / 2, -3); TP.add(tier); y += q[1]; });
  const eb = chibi({ robe: '#2fae6a', skin: '#3fbf7a', closed: true, statue: true, glow: '#1a6a3a' }); setSit(eb, true); lapHands(eb); eb.scale.setScalar(1.7); eb.position.set(0, y, -3); TP.add(eb);
  const cloak = new T.Mesh(new T.CylinderGeometry(0.66, 0.96, 0.95, 12, 1, true, -0.9, 4.9), M(P.gold, Object.assign({ side: T.DoubleSide }, GOLDM))); cloak.position.set(0, y + 0.95 * 1.7 * 0.62, -3); cloak.scale.setScalar(1.7); TP.add(cloak);
  const ebHalo = new T.Mesh(new T.TorusGeometry(1.0, 0.07, 6, 30), basic('#ffe08a', { transparent: true, opacity: 0.85 })); ebHalo.position.set(0, y + 2.45, -3.5); TP.add(ebHalo);
  s.temple = { g: TP, eb, cloak, halo: ebHalo, sparks: [] };
  for (let i = 0; i < 10; i++) { const sp = softSprite('rgba(255,230,140,1)', 0.9); sp.scale.setScalar(0.6); TP.add(sp); s.temple.sparks.push(sp); }
  s.temple.lab = label('ภาพจำลอง', { w: 2.2, px: 60, color: '#ffffff' }); s.temple.lab.position.set(3.4, 1.0, -1.6); TP.add(s.temple.lab);
  for (let i = 0; i < 6; i++) { const x = -3.2 + i * 1.28; if (Math.abs(x) < 0.3) continue; const c = mk(new T.CylinderGeometry(0.07, 0.07, 0.6, 6), '#fff6e0'); c.position.set(x, 0.3, 2.0); TP.add(c); const f = softSprite('rgba(255,190,90,1)', 0.9); f.scale.set(0.4, 0.6, 1); f.position.set(x, 0.72, 2.0); TP.add(f); }

  s.anchorV = new T.Vector3();
  return s;
}
