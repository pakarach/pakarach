/* Part C: stations + setup */
const ST = {
  START: [0, 0, 0], ARAKA: [40, 0, -3], SIM: [70, 0, -2.5], S7: [122, 0, 0], BUD: [145, 0, -3], COUNT: [158, 0, -3],
  THAI: [185, 0, 0], CAUSE: [235, 0, -2], END: [270, 0, 0], SEA: [1000, 0, 0], OCEAN: [1100, 0, 0],
};
const SIMX = (k) => ST.SIM[0] + (k - 1) * 8.5;   // simile k = 1..6 pedestals
const THX0 = ST.THAI[0] - 14, THX1 = ST.THAI[0] + 16; // life road: birth -> 78 years
const thx = (age) => THX0 + (THX1 - THX0) * age / 78;
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }

function setupScene(scene) {
  const s = { anchors: {} };
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#6f9fd0', 30, 95); s.fog = scene.fog;
  let rs = 11; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647); s.rnd = rnd;

  /* ---------- ground + life road ---------- */
  const ground = mk(new T.BoxGeometry(400, 0.4, 120), '#5f8a52'); ground.position.set(150, -0.2, -40); scene.add(ground);
  const road = mk(new T.BoxGeometry(400, 0.06, 2.4), '#b89a6a'); road.position.set(150, 0.03, 0.4); scene.add(road);
  const avoid = [ST.ARAKA[0], ST.BUD[0], ST.COUNT[0], ST.CAUSE[0], ST.END[0]];
  for (let i = 0; i < 230; i++) {
    const x = -30 + rnd() * 360, z = -75 + rnd() * 66; if (z > -16 && avoid.some((c) => Math.abs(c - x) < 13)) continue; if (z > -16 && x > ST.SIM[0] - 6 && x < ST.SIM[0] + 50) continue;
    const tr = tree(0.8 + rnd() * 1.0, ['#3f8f5a', '#4f9a4a', '#2f7f5a'][i % 3]); tr.position.set(x, 0, z); scene.add(tr);
  }
  for (let i = 0; i < 40; i++) { const x = -30 + rnd() * 360, z = 9 + rnd() * 10; const tr = tree(0.7 + rnd() * 0.5, '#4f9a4a'); tr.position.set(x, 0, z); scene.add(tr); }
  const hills = [[-10, -60, 16], [50, -66, 20], [110, -62, 18], [170, -64, 22], [230, -60, 18], [290, -62, 20]];
  for (const h of hills) { const m = mk(new T.ConeGeometry(h[2], h[2] * 0.7, 7), '#5a7f5e'); m.position.set(h[0], h[2] * 0.35 - 0.2, h[1]); scene.add(m); }

  /* ---------- the cow + herder (one pair, re-placed per beat) ---------- */
  s.cow = cow(1); scene.add(s.cow);
  s.herder = chibi({ robe: '#6b5a4a', skin: '#c99a72', hair: '#2a2228', band: '#8a3a2a' }); scene.add(s.herder);
  { const geo = new T.BufferGeometry().setFromPoints([new T.Vector3(), new T.Vector3()]); s.rope = new T.Line(geo, new T.LineBasicMaterial({ color: '#d9b77a' })); scene.add(s.rope); }
  s.gate = new T.Group(); { const pm = '#3a2a22'; for (const z of [-1.6, 1.6]) { const p = mk(new T.BoxGeometry(0.5, 5, 0.5), pm); p.position.set(0, 2.5, z); s.gate.add(p); } const top = mk(new T.BoxGeometry(0.7, 0.5, 4.4), pm); top.position.y = 5.1; s.gate.add(top); const post = mk(new T.CylinderGeometry(0.22, 0.26, 3.2, 6), '#2a1e18'); post.position.set(2.5, 1.6, 1.8); s.gate.add(post); }
  scene.add(s.gate);
  s.dust = []; for (let i = 0; i < 6; i++) { const d = softSprite('rgba(220,200,160,1)', 0.5); d.material.blending = T.NormalBlending; scene.add(d); s.dust.push(d); }
  s.steps = []; for (let i = 0; i < 26; i++) { const f = new T.Mesh(new T.CircleGeometry(0.13, 8), basic('#7a5a3a', { transparent: true })); f.rotation.x = -Math.PI / 2; scene.add(f); s.steps.push(f); }

  /* ---------- Araka's hermitage (long ago) ---------- */
  for (const q of [[-5.5, -2.5], [5.2, -3.0]]) { const h = hut(2.4, 2, 1.5, '#b99a6a', '#8f7a3a'); place(h, 'ARAKA', q[0], 0, q[1]); scene.add(h); }
  for (const q of [[-8, 0.5], [8.5, 0], [0, -6]]) { const tr = tree(1.6, '#3f8f5a'); place(tr, 'ARAKA', q[0], 0, q[1]); scene.add(tr); }
  const rock = mk(new T.DodecahedronGeometry(0.9, 0), '#8a8478'); rock.scale.set(1.3, 0.55, 1); place(rock, 'ARAKA', 0, 0.3, -1.4); scene.add(rock);
  s.ar = { t: chibi({ robe: '#f1ece0', skin: '#d9a87c', hair: '#5a5a5a', bun: true, beard: '#e8e8e8', s: 1.15 }), st: [] };
  setSit(s.ar.t, true); place(s.ar.t, 'ARAKA', 0, 0.55, -1.4); scene.add(s.ar.t);
  for (let i = 0; i < 8; i++) { const c = chibi({ robe: '#ece6d6', skin: ['#e2b48a', '#d39a72', '#c98f66'][i % 3], hair: '#2a2228', bun: true, s: 0.78 }); setSit(c, true); const a = -1.15 + i * (2.3 / 7); place(c, 'ARAKA', Math.sin(a) * 3.6, 0, -1.4 + Math.cos(a) * 3.0); face(c, -Math.sin(a), -Math.cos(a)); scene.add(c); s.ar.st.push(c); }
  s.ar.snow = []; for (let i = 0; i < 14; i++) { const f = softSprite('rgba(210,235,255,1)', 0.9); f.scale.setScalar(0.25); scene.add(f); s.ar.snow.push(f); }
  s.ar.heat = softSprite('rgba(255,150,60,1)', 0.6); s.ar.heat.scale.setScalar(2.2); scene.add(s.ar.heat);
  s.ar.cup = mk(new T.CylinderGeometry(0.09, 0.07, 0.18, 8), '#a8582e'); scene.add(s.ar.cup);

  /* ---------- simile garden: 6 pedestals ---------- */
  s.sim = {};
  for (let k = 1; k <= 6; k++) { const p = pedestal(2.4); p.position.set(SIMX(k), 0, ST.SIM[2]); scene.add(p); const n = label(String(k), { w: 0.9, px: 90, color: P.gold }); n.position.set(SIMX(k) - 2.0, 1.2, ST.SIM[2] + 1.9); scene.add(n); }
  const top = (k, o, x, y, z) => { o.position.set(SIMX(k) + (x || 0), 0.5 + (y || 0), ST.SIM[2] + (z || 0)); scene.add(o); return o; };
  /* 1 dewdrop */
  { const g = grass(15, 2.2); g.scale.setScalar(1.3); top(1, g, 0, 0, 0);
    const tip = new T.Mesh(new T.ConeGeometry(0.07, 3.4, 4), M('#7fc25a')); tip.rotation.z = -0.15; top(1, tip, 0.15, 1.7, 0.4);
    const drop = new T.Mesh(new T.SphereGeometry(0.3, 16, 12), M('#bfe8ff', { transparent: true, opacity: 0.8, roughness: 0.05, metalness: 0.2, emissive: new T.Color('#3a7aaa'), emissiveIntensity: 0.4 }));
    top(1, drop, 0.42, 3.55, 0.4); const sn = sun(); top(1, sn, -1.2, 0, -2.2);
    s.sim.dew = { drop, sun: sn }; }
  /* 2 bubbles in rain */
  { top(2, water(2.1), 0, 0, 0); const bubs = []; for (let i = 0; i < 9; i++) { const b = new T.Mesh(new T.SphereGeometry(0.28, 12, 8, 0, 6.283, 0, Math.PI / 2), M('#e8f6ff', { transparent: true, opacity: 0.55, roughness: 0.05, emissive: new T.Color('#4a8acc'), emissiveIntensity: 0.3 })); top(2, b, Math.cos(i * 2.4) * (0.4 + (i % 3) * 0.45), 0.12, Math.sin(i * 2.4) * (0.4 + (i % 3) * 0.4)); b.userData.ph = i * 0.37; bubs.push(b); }
    const rain = []; for (let i = 0; i < 24; i++) { const r = new T.Mesh(new T.BoxGeometry(0.03, 0.5, 0.03), basic('#cfe6ff', { transparent: true, opacity: 0.7 })); top(2, r, (rnd() - 0.5) * 3.6, 3, (rnd() - 0.5) * 3); r.userData.ph = rnd(); rain.push(r); }
    const cl = cloud(1.1); top(2, cl, 0, 5.2, -0.5); s.sim.bub = { bubs, rain }; }
  /* 3 stick line on water */
  { top(3, water(2.1, '#3a78b8'), 0, 0, 0); const stick = mk(new T.CylinderGeometry(0.05, 0.05, 2.4, 5), '#7a5236'); top(3, stick, 0, 1.0, 0); stick.rotation.z = 0.5;
    const trail = []; for (let i = 0; i < 16; i++) { const tr = new T.Mesh(new T.BoxGeometry(0.24, 0.02, 0.06), basic('#e8f6ff', { transparent: true })); top(3, tr, -1.6 + i * 0.21, 0.14, 0); trail.push(tr); }
    s.sim.stick = { stick, trail }; }
  /* 4 river from the mountain */
  { const mt = mountain(1.05); top(4, mt, -0.4, 0, -1.2); const pts = []; for (let i = 0; i <= 12; i++) { const u = i / 12; pts.push([U.lerp(-0.2, 1.6, u) + Math.sin(u * 7) * 0.25, U.lerp(2.3, 0.08, Math.pow(u, 0.7)), U.lerp(-0.4, 1.6, u)]); }
    for (let i = 0; i < 12; i++) { const a = pts[i], b = pts[i + 1]; const len = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]); const seg = new T.Mesh(new T.BoxGeometry(0.42, 0.06, len + 0.05), M('#4a90d0', { emissive: new T.Color('#1a4a8a'), emissiveIntensity: 0.4 })); top(4, seg, (a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2); seg.lookAt(SIMX(4) + b[0], 0.5 + b[1], ST.SIM[2] + b[2]); }
    const fl = []; for (let i = 0; i < 14; i++) { const f = new T.Mesh(new T.BoxGeometry(0.1, 0.03, 0.22), basic('#ffffff')); scene.add(f); f.userData.ph = i / 14; fl.push(f); }
    s.sim.riv = { pts, fl }; }
  /* 5 strong man + droplet */
  { const man = chibi({ robe: '#c97a4a', skin: '#c98f66', hair: '#2a2228', s: 1.25 }); top(5, man, -0.3, 0, -0.2); face(man, 1, 0.4);
    const drop = new T.Mesh(new T.SphereGeometry(0.1, 10, 8), M('#e8f4ff', { transparent: true, opacity: 0.9, roughness: 0.05 })); scene.add(drop); s.sim.spit = { man, drop }; }
  /* 6 hot iron pan */
  { const g = new T.Group(); const stand = mk(new T.CylinderGeometry(0.9, 1.1, 0.7, 8), '#5a4a42'); stand.position.y = 0.35; g.add(stand);
    const fireG = fire(); fireG.position.y = 0.45; fireG.scale.setScalar(1.2); g.add(fireG);
    const pan = mk(new T.CylinderGeometry(1.45, 1.1, 0.3, 18), '#2c2a30', { metalness: 0.6, roughness: 0.4, emissive: new T.Color('#c03a10'), emissiveIntensity: 0.55 }); pan.position.y = 1.15; g.add(pan);
    top(6, g, 0, 0, 0); const meat = mk(new T.BoxGeometry(0.55, 0.1, 0.4), '#d8646a'); scene.add(meat);
    const steam = []; for (let i = 0; i < 6; i++) { const st = softSprite('rgba(240,240,240,1)', 0.6); st.material.blending = T.NormalBlending; scene.add(st); steam.push(st); }
    s.sim.pan = { meat, steam, fire: fireG }; }

  /* ---------- Buddha (telling the story) + monks ---------- */
  const bt = tree(2.4, '#2f7f4a'); place(bt, 'BUD', 0, 0, -3.2); scene.add(bt);
  const slab = mk(new T.BoxGeometry(2.6, 0.45, 2.0), '#9a9488'); place(slab, 'BUD', 0, 0.22, -1.6); scene.add(slab);
  s.bud = { b: buddha(1.35), monks: [] }; place(s.bud.b, 'BUD', 0, 0.45, -1.6); scene.add(s.bud.b); s.bud.b.userData.halo.visible = false;
  { const hg = softSprite('rgba(255,215,120,1)', 0.75); hg.scale.setScalar(3.4); place(hg, 'BUD', 0, 2.5, -2.1); scene.add(hg); }
  for (let i = 0; i < 6; i++) { const c = chibi({ robe: ROBE, sash: ROBE2, s: 0.8 }); setSit(c, true); anjali(c); const a = -1.0 + i * 0.4; place(c, 'BUD', Math.sin(a) * 3.4, 0, -1.6 + Math.cos(a) * 2.8); face(c, -Math.sin(a), -Math.cos(a)); scene.add(c); s.bud.monks.push(c); }

  /* ---------- count station: seasons, months/nights wall, meals carpet ---------- */
  s.cnt = { bars: [] };
  [['#8fc8ff', 'หนาว'], ['#ffb05a', 'ร้อน'], ['#4fd0c0', 'ฝน']].forEach((q, i) => { const b = FK.bar(T, 1.1, 1.1, q[0]); place(b, 'COUNT', -2.4 + i * 2.4, 0, 0); scene.add(b); const lb = label(q[1], { w: 2.6, px: 90, color: q[0] }); scene.add(lb); b.userData.lb = lb; b.userData.x = i; s.cnt.bars.push(b); });
  { const n = 1200, ge = new T.BoxGeometry(0.16, 0.16, 0.05), im = new T.InstancedMesh(ge, M('#ffffff', { emissive: new T.Color('#334'), emissiveIntensity: 0.2 }), n), m4 = new T.Matrix4(), cols = ['#8fc8ff', '#ffb05a', '#4fd0c0'];
    for (let i = 0; i < n; i++) { const cx = i % 40, cy = Math.floor(i / 40); m4.makeTranslation(ST.COUNT[0] - 4 + cx * 0.2, 0.5 + cy * 0.2, ST.COUNT[2] - 2.2); im.setMatrixAt(i, m4); im.setColorAt(i, new T.Color(cols[Math.floor(cx / 13.34)])); }
    im.count = 0; scene.add(im); s.cnt.wall = im; }
  { const n = 72000, p = new Float32Array(n * 3), c = new Float32Array(n * 3), base = new T.Color('#ffe7a8'), dark = new T.Color('#4a4a5a');
    const skip = new Uint8Array(n); for (let i = 0; i < n; i++) skip[i] = rnd() < 0.16 ? 1 : 0;
    for (let i = 0; i < n; i++) { const gx = i % 360, gz = Math.floor(i / 360); p[i * 3] = ST.COUNT[0] - 7.2 + gx * 0.04; p[i * 3 + 1] = 0.05; p[i * 3 + 2] = ST.COUNT[2] + 3.4 - gz * 0.035; c[i * 3] = base.r; c[i * 3 + 1] = base.g; c[i * 3 + 2] = base.b; }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); g.setAttribute('color', new T.BufferAttribute(c, 3)); g.setDrawRange(0, 0);
    s.cnt.meals = new T.Points(g, new T.PointsMaterial({ size: 0.075, vertexColors: true })); s.cnt.meals.userData = { skip, base, dark, darkOn: false }; scene.add(s.cnt.meals); }
  s.cnt.bowls = []; for (let i = 0; i < 5; i++) { const b = bowl(['#c97a3a', '#e8e0d0', '#7fb3d5', '#c97a3a', '#e8e0d0'][i]); scene.add(b); s.cnt.bowls.push(b); }
  s.cnt.baby = chibi({ robe: '#ffd0e0', skin: '#f0c8a8', s: 0.5 }); scene.add(s.cnt.baby);
  s.cnt.mom = chibi({ robe: '#c97b9a', hair: '#2a2228', bun: true, s: 0.85 }); setSit(s.cnt.mom, true); scene.add(s.cnt.mom);

  /* ---------- Thai life road: posts every 10 years ---------- */
  s.th = { posts: [] };
  for (let a = 0; a <= 78; a += a === 70 ? 8 : 10) { const x = thx(a); const p = mk(new T.BoxGeometry(0.18, 1.3, 0.18), a === 78 ? '#3a2a22' : '#e8dcc0'); p.position.set(x, 0.65, -1.3); scene.add(p); const lb = label(a === 0 ? 'เกิด' : String(a), { w: 1.2, px: 90, color: a === 78 ? P.coral : '#fff' }); lb.position.set(x, 1.85, -1.3); scene.add(lb); s.th.posts.push(lb); }
  s.th.you = new T.Group(); { const ring = new T.Mesh(new T.RingGeometry(0.9, 1.1, 30), basic(P.gold, { transparent: true, opacity: 0.9, side: T.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.y = 0.08; s.th.you.add(ring); const lb = label('คุณอยู่ตรงนี้', { w: 2.6, px: 86, color: P.gold }); lb.position.y = 3.6; s.th.you.add(lb); s.th.you.userData.lb = lb; }
  s.th.you.position.set(thx(30), 0, 0.4); scene.add(s.th.you);
  s.th.ticks = []; { const n = 156; for (let i = 0; i < n; i++) { const tk = new T.Mesh(new T.BoxGeometry(0.03, 0.02, 0.7), basic('#8a6a40')); tk.position.set(THX0 + (THX1 - THX0) * i / (n - 1), 0.07, 0.4); scene.add(tk); s.th.ticks.push(tk); } }

  /* ---------- cause: verse tablet + dominoes ---------- */
  const tab = mk(new T.BoxGeometry(3.6, 2.4, 0.4), '#8a8478'); place(tab, 'CAUSE', -10, 1.6, -1.2); scene.add(tab);
  const tbase = mk(new T.BoxGeometry(4.2, 0.4, 0.9), '#6f6a60'); place(tbase, 'CAUSE', -10, 0.2, -1.2); scene.add(tbase);
  s.cz = { verse: label('เย ธมฺมา เหตุปฺปภวา', { w: 3.2, px: 80, color: P.gold }), dom: [] };
  place(s.cz.verse, 'CAUSE', -10, 1.9, -0.95); scene.add(s.cz.verse);
  s.cz.glow = softSprite('rgba(255,220,130,1)', 0.6); s.cz.glow.scale.setScalar(5); place(s.cz.glow, 'CAUSE', -10, 1.8, -1.4); scene.add(s.cz.glow);
  const DN = [['ไม่รู้', P.violet], ['อยาก', P.coral], ['ยึด', '#ff9a5a'], ['ภพ', P.teal], ['เกิด', P.gold], ['แก่ เจ็บ ตาย', '#8a8aa0']];
  DN.forEach((d, i) => { const dm = domino(d[0], d[1]); place(dm, 'CAUSE', -4.5 + i * 1.9, 0, 0); dm.rotation.order = 'YXZ'; scene.add(dm); s.cz.dom.push(dm); });
  s.cz.cradle = new T.Group(); { const c = mk(new T.SphereGeometry(0.55, 12, 8, 0, 6.283, Math.PI / 2, Math.PI / 2), '#c9a06a'); c.scale.set(1.3, 0.7, 0.9); c.position.y = 0.45; s.cz.cradle.add(c); const bb = chibi({ robe: '#ffd0e0', skin: '#f0c8a8', s: 0.38, closed: true }); bb.position.y = 0.3; s.cz.cradle.add(bb); }
  scene.add(s.cz.cradle);
  s.cz.hand = new T.Group(); { const arm = mk(new T.CylinderGeometry(0.16, 0.16, 3, 8), '#e2ae86'); arm.position.y = 1.5; const h = mk(new T.SphereGeometry(0.3, 10, 8), '#e2ae86'); s.cz.hand.add(arm, h); } scene.add(s.cz.hand);

  /* ---------- sea: water globe + ocean close-up ---------- */
  s.sea = { globe: new T.Group() }; place(s.sea.globe, 'SEA', 0, 6, 0); scene.add(s.sea.globe);
  s.sea.ball = new T.Mesh(new T.IcosahedronGeometry(5, 3), M('#2f6fc0', { roughness: 0.75, metalness: 0.0, emissive: new T.Color('#0a2a6a'), emissiveIntensity: 0.35 })); s.sea.globe.add(s.sea.ball);
  s.sea.gy = yoke(); s.sea.gy.scale.setScalar(0.32); scene.add(s.sea.gy);
  s.sea.gt = turtle(); s.sea.gt.scale.setScalar(0.32); scene.add(s.sea.gt);
  s.sea.ring = new T.Mesh(new T.RingGeometry(0.55, 0.7, 28), basic(P.gold, { transparent: true, opacity: 0.9, side: T.DoubleSide, depthWrite: false })); scene.add(s.sea.ring);
  s.sea.ringT = new T.Mesh(new T.RingGeometry(0.55, 0.7, 28), basic(P.teal, { transparent: true, opacity: 0.9, side: T.DoubleSide, depthWrite: false })); scene.add(s.sea.ringT);
  s.sea.arrows = []; for (let i = 0; i < 4; i++) { const a = new T.Group(); const sh = mk(new T.CylinderGeometry(0.12, 0.12, 2.4, 6), '#e8f6ff'); sh.rotation.z = Math.PI / 2; const hd = mk(new T.ConeGeometry(0.32, 0.7, 6), '#e8f6ff'); hd.rotation.z = -Math.PI / 2; hd.position.x = 1.5; a.add(sh, hd); scene.add(a); s.sea.arrows.push(a); }
  s.sea.windLab = ['ลมตะวันออก', 'ลมเหนือ'].map((tx) => { const lb = label(tx, { w: 2.4, px: 80, color: '#e8f6ff' }); scene.add(lb); return lb; });
  s.sea.stars = (() => { const n = 300, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { p[i * 3] = ST.SEA[0] + (rnd() - 0.5) * 80; p[i * 3 + 1] = (rnd() - 0.3) * 50; p[i * 3 + 2] = -20 - rnd() * 20; } const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); const pt = new T.Points(g, new T.PointsMaterial({ color: '#fff', size: 0.18, fog: false })); scene.add(pt); return pt; })();
  const ocean = new T.Mesh(new T.PlaneGeometry(140, 90, 40, 26), M('#2a64b0', { roughness: 0.35, metalness: 0.1, emissive: new T.Color('#0a2a5a'), emissiveIntensity: 0.3 })); ocean.rotation.x = -Math.PI / 2; place(ocean, 'OCEAN', 0, 0, -20); scene.add(ocean); s.sea.ocean = ocean;
  s.sea.oy = yoke(); scene.add(s.sea.oy);
  s.sea.ot = turtle(); scene.add(s.sea.ot);
  s.sea.splash = new T.Mesh(new T.RingGeometry(0.6, 0.8, 28), basic('#e8f6ff', { transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false })); s.sea.splash.rotation.x = -Math.PI / 2; scene.add(s.sea.splash);

  /* ---------- end road: give, do no harm, train the mind ---------- */
  s.end = { me: chibi({ robe: P.teal, hair: '#2a2228', ring: P.teal }) }; scene.add(s.end.me);
  s.end.old = chibi({ robe: '#9a8f7a', hair: '#e8e8e8', beard: '#e8e8e8', s: 0.95 }); setSit(s.end.old, true); place(s.end.old, 'END', -9.2, 0, -1.6); face(s.end.old, 0.3, 1); scene.add(s.end.old);
  s.end.gift = bowl('#e8e0d0'); scene.add(s.end.gift);
  s.end.ants = []; for (let i = 0; i < 12; i++) { const a = mk(new T.SphereGeometry(0.07, 6, 4), '#1a1418'); a.scale.set(1.5, 0.8, 1); scene.add(a); s.end.ants.push(a); }
  const mt = tree(2.0, '#2f7f4a'); place(mt, 'END', 9, 0, -3.3); scene.add(mt);
  s.end.medi = chibi({ robe: P.teal, hair: '#2a2228', ring: P.teal, closed: true }); setSit(s.end.medi, true); lapHands(s.end.medi); place(s.end.medi, 'END', 9, 0, -0.6); scene.add(s.end.medi);
  s.end.calm = softSprite('rgba(120,240,220,1)', 0.6); s.end.calm.scale.setScalar(3.2); place(s.end.calm, 'END', 9, 1.2, -0.6); scene.add(s.end.calm);
  s.end.lights = []; for (let i = 0; i < 3; i++) { const o = orb(['rgba(255,210,120,1)', 'rgba(80,240,210,1)', 'rgba(190,170,255,1)'][i]); place(o, 'END', -9 + i * 9, 3.2, -1.2); scene.add(o); s.end.lights.push(o); }
  s.end.sunrise = sun(); s.end.sunrise.scale.setScalar(3); scene.add(s.end.sunrise);

  s.anchorV = new T.Vector3();
  return s;
}
