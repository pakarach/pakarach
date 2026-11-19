/* Part C: one small town (home, cafe, office, bar, temple) + setup */
const ST = { HOME: [-8, 0, 0], CAFE: [8, 0, 0], OFFICE: [-8, 0, -26], BAR: [8, 0, -26], TEMPLE: [0, 0, -54], TOWN: [0, 0, -24], STREET: [0, 0, -13] };
let S = null;
function place(o, st, x, y, z) { o.position.set(ST[st][0] + (x || 0), ST[st][1] + (y || 0), ST[st][2] + (z || 0)); return o; }
let rs = 11; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);

function room(st, floorC, wallC, o) {
  o = o || {}; const g = new T.Group(); place(g, st);
  const fl = box(11, 0.16, 9, floorC); fl.position.y = 0.08; g.add(fl);
  if (o.back !== false) { const w = box(11, 3.2, 0.25, wallC); w.position.set(0, 1.7, -4.4); g.add(w); }
  if (o.left) { const w = box(0.25, 3.2, 9, wallC); w.position.set(-5.4, 1.7, 0); g.add(w); }
  if (o.right) { const w = box(0.25, 3.2, 9, wallC); w.position.set(5.4, 1.7, 0); g.add(w); }
  return g;
}

function setupScene(scene) {
  const s = {};
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#9fc0e8', 45, 140); s.fog = scene.fog;

  /* ---------- ground, streets, filler ---------- */
  const ground = box(110, 0.4, 140, '#4f7a52'); ground.position.set(0, -0.2, -30); scene.add(ground);
  const road = (x, z, w, d) => { const r = box(w, 0.06, d, '#6b6f7a'); r.position.set(x, 0.03, z); scene.add(r); const ln = box(w > d ? w : 0.12, 0.07, w > d ? 0.12 : d, '#e9e4d0'); ln.position.set(x, 0.04, z); scene.add(ln); return r; };
  road(0, -22, 3.6, 76); road(0, -13, 40, 3.2); road(0, -39, 40, 3.2); road(0, 7.5, 40, 3.2);
  s.lamps = [];
  for (const z of [4, -8, -18, -32]) for (const x of [-2.4, 2.4]) { const l = streetLamp(); l.position.set(x, 0, z); scene.add(l); s.lamps.push(l); }
  s.houses = [];
  const HC = ['#e9dcc0', '#d9c3a0', '#c9d9e9', '#e9c9c0', '#d0e0c8', '#f0e2b6'];
  for (const q of [[-21, 3], [-21, -8], [-21, -22], [-21, -33], [21, 4], [21, -9], [21, -21], [21, -34], [-15, 14], [-5, 14], [7, 14], [17, 14], [-14, -62], [14, -62]]) {
    const h = shophouse(HC[s.houses.length % 6], 2.2 + (s.houses.length % 3) * 1.1); h.position.set(q[0], 0, q[1]); h.rotation.y = q[0] < -18 ? Math.PI / 2 : q[0] > 18 ? -Math.PI / 2 : q[1] > 10 ? Math.PI : 0; scene.add(h); s.houses.push(h);
  }
  for (let i = 0; i < 70; i++) { const x = -45 + rnd() * 90, z = -85 + rnd() * 110; if (Math.abs(x) < 25 && z > -60 && z < 18) continue; const tr = tree(0.9 + rnd() * 0.8, ['#3f8f5a', '#4f9a4a', '#2f7f5a'][i % 3]); tr.position.set(x, 0, z); scene.add(tr); }
  for (const q of [[-15, 9.5], [15, -15], [-15, -15], [15, 9.5], [-26, -50], [26, -50]]) { const tr = tree(1.1); tr.position.set(q[0], 0, q[1]); scene.add(tr); }
  /* stars */
  { const n = 300, p = new Float32Array(n * 3); for (let i = 0; i < n; i++) { p[i * 3] = (rnd() - 0.5) * 200; p[i * 3 + 1] = 25 + rnd() * 60; p[i * 3 + 2] = -110 - rnd() * 40; }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); s.stars = new T.Points(g, new T.PointsMaterial({ color: '#fff', size: 0.6, transparent: true, opacity: 0, fog: false })); scene.add(s.stars); }

  /* ---------- the hero: ต้น ---------- */
  s.ton = chibi({ robe: TON, hair: '#2a2228', sleeve: TON, ring: TON }); scene.add(s.ton);
  s.tonPhone = phoneMesh(); s.tonPhone.position.set(0, -0.62, 0.08); s.ton.userData.arms.R.add(s.tonPhone); s.tonPhone.visible = false;
  s.tonPen = pen(); s.tonPen.position.set(0, -0.62, 0.05); s.ton.userData.arms.R.add(s.tonPen); s.tonPen.visible = false;
  s.tonGlass = glass('#ffa53a', 0.32); s.tonGlass.position.set(0, -0.72, 0.1); s.ton.userData.arms.R.add(s.tonGlass); s.tonGlass.visible = false;
  s.tonGlow = softSprite('rgba(46,230,197,1)', 0); s.tonGlow.scale.setScalar(3.2); scene.add(s.tonGlow);

  /* ---------- temple (yesterday) ---------- */
  const tg = new T.Group(); place(tg, 'TEMPLE'); scene.add(tg);
  const yard = box(26, 0.12, 20, '#b9ad96'); yard.position.set(0, 0.06, 2); tg.add(yard);
  const sl = sala(); tg.add(sl);
  { const ub = box(6, 4.2, 4, '#f3efe6'); ub.position.set(0, 2.1, -9); tg.add(ub); const ur = mk(new T.ConeGeometry(5, 2.6, 4), '#b8452f'); ur.rotation.y = Math.PI / 4; ur.scale.z = 0.7; ur.position.set(0, 5.5, -9); tg.add(ur);
    const ch = mk(new T.ConeGeometry(0.15, 1.4, 5), P.gold, GOLDM); ch.position.set(0, 7.3, -9); tg.add(ch);
    for (const x of [-9, 9]) { const ce = new T.Group(); const b1 = mk(new T.CylinderGeometry(1.3, 1.5, 0.8, 10), '#f3efe6'); b1.position.y = 0.4; const b2 = mk(new T.SphereGeometry(1.1, 12, 8), '#f3efe6'); b2.position.y = 1.5; b2.scale.y = 0.9; const sp = mk(new T.ConeGeometry(0.5, 3, 10), '#f3efe6'); sp.position.y = 3.6; const tip = mk(new T.ConeGeometry(0.14, 0.9, 8), P.gold, GOLDM); tip.position.y = 5.4; ce.add(b1, b2, sp, tip); ce.position.set(x, 0, -6.5); tg.add(ce); } }
  s.temple = { g: tg };
  s.monk = chibi({ robe: ROBE, sash: ROBE2 }); setSit(s.monk, true); place(s.monk, 'TEMPLE', 0, 1.0, -2.0); scene.add(s.monk);
  s.fan = new T.Group(); { const f = mk(new T.CircleGeometry(0.42, 16, 0, Math.PI), '#f3e2b0'); f.rotation.z = -Math.PI / 2; const h = mk(new T.CylinderGeometry(0.03, 0.03, 0.8, 5), '#7a5236'); h.position.y = -0.35; s.fan.add(f, h); } s.fan.position.set(0, -0.7, 0.15); s.monk.userData.arms.R.add(s.fan);
  s.lay = [];
  const LC = ['#ffffff', '#f3efe6', '#ffffff', '#f3efe6', '#ffffff'];
  for (let i = 0; i < 5; i++) { const c = chibi({ robe: LC[i], sleeve: LC[i], hair: i % 2 ? '#e8e8e8' : '#2a2228', bun: i === 1 || i === 3, s: 0.92 }); setSit(c, true); scene.add(c); s.lay.push(c); }
  s.givers = [];
  for (let i = 0; i < 4; i++) { const c = chibi({ robe: ['#e6b85c', '#c97b9a', '#7fb3d5', '#8fcf8f'][i], hair: '#2a2228', bun: i % 2 === 1, s: 0.9 }); const gb = giftBox(['#ff8fb0', '#8fd0ff', '#ffd27a', '#b9f0a0'][i]); gb.position.set(0, -0.75, 0.32); gb.scale.setScalar(0.9); c.userData.arms.R.add(gb); c.userData.gift = gb; scene.add(c); s.givers.push(c); }
  s.giftPile = new T.Group(); for (let i = 0; i < 7; i++) { const gb = giftBox(['#ff8fb0', '#8fd0ff', '#ffd27a', '#b9f0a0'][i % 4]); gb.position.set(-1 + (i % 4) * 0.55, Math.floor(i / 4) * 0.42 + 0.5, 0); gb.rotation.y = i; s.giftPile.add(gb); }
  { const tb = box(3, 0.5, 1.2, '#c9a77a'); tb.position.set(0, 0.25, 0); s.giftPile.add(tb); } place(s.giftPile, 'TEMPLE', -5.4, 0, 4.4); scene.add(s.giftPile);
  s.steps = []; const SH = [[0.6, '5', 'ชาวบ้าน', P.teal], [1.2, '8', 'วันพระ', P.teal], [1.9, '10', 'สามเณร', ROBE], [2.6, '227', 'พระภิกษุ', P.gold]];
  SH.forEach((q, i) => { const b = stepBlock(q[0], i === 3 ? '#e9c46a' : i === 2 ? '#e8a05a' : '#7fd8c4'); place(b, 'TEMPLE', 6.2 + i * 1.55, 0, 3.4); scene.add(b);
    const lb = label(q[1], { w: 1.6, px: 120, color: q[3] }); scene.add(lb); const lb2 = label(q[2], { w: 2.0, px: 70 }); scene.add(lb2); s.steps.push({ b, lb, lb2, h: q[0], i }); });

  /* ---------- home (bedroom) ---------- */
  room('HOME', '#c9a27a', '#e9dcc0', { left: true });
  s.bed = bed(); place(s.bed, 'HOME', -2.6, 0.16, -2.2); scene.add(s.bed);
  { const ns = box(0.8, 0.7, 0.7, '#8a5a3c'); place(ns, 'HOME', -0.8, 0.5, -3.6); scene.add(ns);
    s.clock = new T.Group(); const cb = box(0.5, 0.4, 0.2, P.coral); cb.position.y = 0.2; const face0 = mk(new T.CircleGeometry(0.15, 16), '#fff'); face0.position.set(0, 0.2, 0.11); s.clock.add(cb, face0); place(s.clock, 'HOME', -0.8, 0.85, -3.6); scene.add(s.clock); }
  s.candle = candle(); place(s.candle, 'HOME', 0.3, 0.16, -3.6); s.candle.scale.setScalar(1.1); scene.add(s.candle);
  { const fr = box(2.4, 1.6, 0.3, '#f3efe6'); place(fr, 'HOME', 2.2, 1.9, -4.32); scene.add(fr); s.winPane = mk(new T.BoxGeometry(2.1, 1.3, 0.32), '#7fb6e8', { emissive: new T.Color('#3a6aa8'), emissiveIntensity: 0.4 }); place(s.winPane, 'HOME', 2.2, 1.9, -4.3); scene.add(s.winPane);
    const mull = box(0.08, 1.4, 0.36, '#f3efe6'); place(mull, 'HOME', 2.2, 1.9, -4.3); scene.add(mull); }
  { const rug = box(3, 0.04, 2, '#8fb0d9'); place(rug, 'HOME', 2.2, 0.17, 0.6); scene.add(rug); const pl = mk(new T.CylinderGeometry(0.3, 0.25, 0.5, 8), '#a8582e'); place(pl, 'HOME', 4.4, 0.4, -3.6); scene.add(pl); const pf = mk(new T.IcosahedronGeometry(0.55, 0), '#4f9a4a'); place(pf, 'HOME', 4.4, 1.05, -3.6); scene.add(pf); }
  s.mos = mosquito(); scene.add(s.mos);
  s.ants = []; for (let i = 0; i < 9; i++) { const a = ant(); scene.add(a); s.ants.push(a); }

  /* ---------- office ---------- */
  room('OFFICE', '#b9c2cc', '#dfe6ee', { right: true });
  { const gl = mk(new T.BoxGeometry(10, 1.6, 0.1), '#9fd0ff', { transparent: true, opacity: 0.35, emissive: new T.Color('#5a8ad8'), emissiveIntensity: 0.3 }); place(gl, 'OFFICE', 0, 2.1, -4.25); scene.add(gl); }
  s.desks = [];
  for (const x of [-3.4, 0, 3.4]) { const d = desk({ mx: 0.5 }); place(d, 'OFFICE', x, 0.16, -0.6); scene.add(d); const c = chair(); place(c, 'OFFICE', x, 0.16, -1.45); scene.add(c); s.desks.push(d); }
  s.cup = mk(new T.CylinderGeometry(0.13, 0.11, 0.26, 10), '#3a3f55'); place(s.cup, 'OFFICE', -0.45, 1.1, -0.45); scene.add(s.cup);
  s.cupPens = []; for (let i = 0; i < 3; i++) { const p0 = pen(i === 0 ? null : ['#5b7fd6', '#e05a5a'][i - 1]); place(p0, 'OFFICE', -0.45 + (i - 1) * 0.05, 1.3, -0.45 + (i - 1) * 0.03); p0.rotation.z = (i - 1) * 0.18; scene.add(p0); s.cupPens.push(p0); }
  s.cab = new T.Group(); { const c = box(1.6, 2.2, 0.8, '#c9cfd8'); c.position.y = 1.1; s.cab.add(c); for (let i = 0; i < 3; i++) { const sh = box(1.5, 0.05, 0.05, '#8a8f99'); sh.position.set(0, 0.6 + i * 0.6, 0.41); s.cab.add(sh); const bx = box(0.4, 0.3, 0.3, ['#ffd27a', '#8fd0ff', '#ff8fb0'][i]); bx.position.set(-0.35 + i * 0.35, 0.8 + i * 0.6, 0.2); s.cab.add(bx); } } place(s.cab, 'OFFICE', -4.4, 0.16, -3.6); scene.add(s.cab);
  s.wallet = wallet(); s.wallet.scale.setScalar(0.6); place(s.wallet, 'OFFICE', -0.1, 0.96, -0.3); scene.add(s.wallet);
  s.coins = []; for (let i = 0; i < 8; i++) { const c = coin(); scene.add(c); s.coins.push(c); }
  s.cow = [chibi({ robe: '#f2f2f2', sleeve: '#f2f2f2', hair: '#2a2228', bun: true }), chibi({ robe: '#ffd27a', sleeve: '#ffd27a', hair: '#3a2a20' })];
  s.cow.forEach((c) => scene.add(c));
  s.boss = chibi({ robe: '#f2f2f2', sleeve: '#f2f2f2', hair: '#bdbdbd' }); { const tie = box(0.12, 0.5, 0.04, '#1b2a55'); tie.position.set(0, 0.85, 0.43); tie.rotation.x = -0.25; s.boss.add(tie); } scene.add(s.boss);
  s.bossDesk = desk({ mx: -0.5 }); place(s.bossDesk, 'OFFICE', 3.4, 0.16, -2.9); const bc = chair('#1b2a55'); place(bc, 'OFFICE', 3.4, 0.16, -3.75); scene.add(bc); scene.add(s.bossDesk);
  s.news = new T.Group(); { const c = mk(new T.BoxGeometry(1.4, 0.9, 0.05), '#ffffff'); s.news.add(c); const tx = canvasTex(256, 160, (x, w, h) => { x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.fillStyle = '#e03a4a'; x.fillRect(0, 0, w, 48); x.fillStyle = '#fff'; x.font = '800 34px Kanit,sans-serif'; x.textAlign = 'center'; x.fillText('ข่าวด่วน!!', w / 2, 36); x.fillStyle = '#9aa'; for (let i = 0; i < 4; i++) x.fillRect(24, 70 + i * 20, w - 48 - (i % 2) * 60, 10); });
    const f = new T.Mesh(new T.PlaneGeometry(1.36, 0.86), new T.MeshBasicMaterial({ map: tx })); f.position.z = 0.03; s.news.add(f); } scene.add(s.news);

  /* ---------- cafe ---------- */
  room('CAFE', '#d9b98a', '#f0e2c8', { back: false });
  { const aw = new T.Group(); for (let i = 0; i < 6; i++) { const st = box(1.8, 0.08, 1.6, i % 2 ? '#ffffff' : P.coral); st.position.set(-4.5 + i * 1.8, 2.9, -3.4); st.rotation.x = 0.35; aw.add(st); } place(aw, 'CAFE'); scene.add(aw);
    const back = box(11, 2.6, 0.25, '#b8452f'); place(back, 'CAFE', 0, 1.4, -4.4); scene.add(back); const ctr = box(4, 1, 0.8, '#8a5a3c'); place(ctr, 'CAFE', -3, 0.66, -3.4); scene.add(ctr); }
  s.ctable = table(0.85); place(s.ctable, 'CAFE', 0, 0.16, -0.4); scene.add(s.ctable);
  { const pl = mk(new T.CylinderGeometry(0.3, 0.22, 0.06, 12), '#ffffff'); place(pl, 'CAFE', -0.2, 1.0, -0.6); scene.add(pl); const fd = mk(new T.SphereGeometry(0.2, 8, 6), '#e8a040'); fd.scale.y = 0.5; place(fd, 'CAFE', -0.2, 1.06, -0.6); scene.add(fd); }
  for (const q of [[-3.6, 1.6], [3.6, 1.8]]) { const tb = table(0.6); place(tb, 'CAFE', q[0], 0.16, q[1]); scene.add(tb); }
  s.cust = [chibi({ robe: '#c97b9a', hair: '#2a2228', bun: true, s: 0.9 }), chibi({ robe: '#7fb3d5', hair: '#2a2228', s: 0.9 })];
  s.cust.forEach((c, i) => { setSit(c, true); place(c, 'CAFE', i ? 3.6 : -3.6, 0.2, i ? 1.0 : 0.8); scene.add(c); });
  s.friend = chibi({ robe: '#e6b85c', sleeve: '#e6b85c', hair: '#2a2228' }); s.gf = chibi({ robe: P.violet, sleeve: P.violet, hair: '#3a2030', bun: true });
  s.gfPhone = phoneMesh(); s.gfPhone.position.set(0, -0.62, 0.08); s.gf.userData.arms.R.add(s.gfPhone); scene.add(s.friend, s.gf);

  /* ---------- bar street ---------- */
  room('BAR', '#7a6a5a', '#4a3a3a', { back: true });
  { const sign = new T.Mesh(new T.PlaneGeometry(2.6, 0.68), new T.MeshBasicMaterial({ map: canvasTex(512, 134, (x, w, h) => { x.fillStyle = '#2a1a2a'; x.fillRect(0, 0, w, h); x.fillStyle = '#ffd27a'; x.font = '800 86px Kanit,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ร้านอร่อยดี', w / 2, h / 2 + 4); }) })); place(sign, 'BAR', 3.4, 2.5, -4.2); scene.add(sign); s.barSign = sign;
    for (const x of [-5, 5]) { const p = mk(new T.CylinderGeometry(0.06, 0.06, 3.2, 6), '#3a3a3a'); place(p, 'BAR', x, 1.7, 2.6); scene.add(p); } }
  s.bulbs = []; for (let i = 0; i < 14; i++) { const u = i / 13, x = -5 + u * 10, y = 3.1 - Math.sin(u * Math.PI) * 0.6; const b = new T.Mesh(new T.SphereGeometry(0.09, 6, 4), basic('#ffd27a')); place(b, 'BAR', x, y, 2.6); const gl = softSprite('rgba(255,200,100,1)', 0.7); gl.scale.setScalar(0.9); b.add(gl); scene.add(b); s.bulbs.push(b); }
  s.btable = table(0.9, '#5a4a3a'); place(s.btable, 'BAR', -1.2, 0.16, -0.6); scene.add(s.btable);
  s.glasses = []; for (let i = 0; i < 3; i++) { const g0 = glass('#f2b233', 0.34); place(g0, 'BAR', -1.6 + i * 0.4, 1.0, -0.5 - (i % 2) * 0.2); scene.add(g0); s.glasses.push(g0); }
  s.bf = [chibi({ robe: '#d9534f', sleeve: '#d9534f', hair: '#2a2228' }), chibi({ robe: '#5b7fd6', sleeve: '#5b7fd6', hair: '#3a2a20' })];
  s.bf.forEach((c) => { const g0 = glass('#f2b233', 0.32); g0.position.set(0, -0.72, 0.1); c.userData.arms.R.add(g0); scene.add(c); });
  s.dom = []; for (let i = 0; i < 5; i++) { const d = domino(5 - i); place(d, 'BAR', 1.0 + i * 0.9, 0.16, 1.4); scene.add(d); s.dom.push(d); }
  s.car = car('#d9534f'); place(s.car, 'BAR', 1.8, 0, 6.2); scene.add(s.car);

  /* ---------- payoff: beings + rings ---------- */
  { const n = 520, p = new Float32Array(n * 3), col = new Float32Array(n * 3), d = new Float32Array(n);
    for (let i = 0; i < n; i++) { const x = (rnd() - 0.5) * 56, z = -66 + rnd() * 84; p[i * 3] = x; p[i * 3 + 1] = 0.5 + rnd() * 0.6; p[i * 3 + 2] = z; d[i] = Math.hypot(x - ST.STREET[0], z - ST.STREET[2]); }
    const g = new T.BufferGeometry(); g.setAttribute('position', new T.BufferAttribute(p, 3)); g.setAttribute('color', new T.BufferAttribute(col, 3));
    s.beings = new T.Points(g, new T.PointsMaterial({ size: 1.1, vertexColors: true, transparent: true, depthWrite: false, blending: T.AdditiveBlending, map: canvasTex(64, 64, (x) => { const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64); }) }));
    s.beings.userData.d = d; s.beings.visible = false; scene.add(s.beings); }
  s.rings = []; for (let i = 0; i < 5; i++) { const r = ringMesh(i % 2 ? P.gold : P.teal); r.visible = false; scene.add(r); s.rings.push(r); }
  s.giftGlows = []; for (let i = 0; i < 6; i++) { const g0 = softSprite(i % 2 ? 'rgba(255,201,74,1)' : 'rgba(46,230,197,1)', 0); g0.scale.setScalar(5); scene.add(g0); s.giftGlows.push(g0); }
  s.pLabels = ['ยุงที่รอด', 'คู่ที่ไม่แตก', 'ของที่ไม่หาย', 'ความจริง', 'คนบนถนน'].map((x) => { const lb = label(x, { w: 9, px: 84, color: '#fff' }); lb.visible = false; scene.add(lb); return lb; });

  s.anchorV = new T.Vector3();
  return s;
}
