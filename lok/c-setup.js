/* Part C: stations + setup */
const ST = { WHEEL: [0, 0, 0], SAV: [60, 0, 0], KUS: [120, 0, 0], SKY: [180, 0, 0], RAJ: [240, 0, 0], JET: [300, 0, 0] };
let S = null;
let rs = 11; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647);
const P3 = (st, x, y, z) => [ST[st][0] + x, ST[st][1] + y, ST[st][2] + z];
const setP = (o, st, x, y, z) => o.position.set(x, y, z); /* station-local (groups sit at ST) */
function station(scene, key) { const g = new T.Group(); g.position.set(ST[key][0], ST[key][1], ST[key][2]); scene.add(g); return g; }
function ground(g, r, c) { const m = mk(new T.CylinderGeometry(r, r * 1.02, 0.4, 28), c || '#4f7a52'); m.position.y = -0.2; g.add(m); return m; }
function scatterTrees(g, n, r0, r1, zmax, cols) { for (let i = 0; i < n; i++) { const a = rnd() * Math.PI * 2, r = r0 + rnd() * (r1 - r0); const x = Math.cos(a) * r, z = Math.sin(a) * r; if (z > zmax) continue; const tr = tree(0.8 + rnd() * 0.8, (cols || ['#3f8f5a', '#4f9a4a', '#2f7f5a'])[i % 3]); tr.position.set(x, 0, z); g.add(tr); } }
function person(o) { const c = chibi(o); return c; }
function monk() { return chibi({ robe: ROBE, sash: ROBE2 }); }
const VIS_O = { robe: '#ff8fa3', hair: '#2a2228', bun: true, band: P.gold, sash: P.gold };
const KING_O = { robe: '#d8a020', crown: true, sash: P.coral, hair: '#2a2228' };
const SAK_O = { crown: true, robe: '#e8f6ff', hair: '#2a2228', bun: false };
const SUP_O = { robe: '#8a7a5a', skin: '#c49a76', thin: true, hair: '#4a3a2a', sleeve: '#6a5a40' };

function setupScene(scene) {
  const s = {};
  FK.lights(T, scene); s.hemi = scene.children.find((o) => o.isHemisphereLight); s.sun = scene.children.find((o) => o.isDirectionalLight);
  scene.fog = new T.Fog('#3a2f5a', 40, 120); s.fog = scene.fog;
  s.st = {};

  /* ---------- WHEEL plaza ---------- */
  { const g = station(scene, 'WHEEL'); s.st.WHEEL = g; const W = {};
    ground(g, 40, '#2c3a5e'); const plaza = mk(new T.CylinderGeometry(13, 13, 0.1, 40), '#4a3f72'); plaza.position.y = 0.02; g.add(plaza);
    const fw = ferris(4.6, 8); fw.position.set(0, 0, -2); g.add(fw); W.fw = fw;
    const riders = {};
    const mkR = (key, o) => { const c = chibi(o); c.scale.setScalar(0.56); const car = fw.userData.cars[WHO[key][2]]; c.position.set(0, -1.8, 0); car.car.add(c); car.cup.material = M(WHO[key][1], { side: T.DoubleSide }); riders[key] = c; return c; };
    mkR('vis', VIS_O); mkR('king', KING_O); mkR('sak', Object.assign({ skin: '#f2d2ae', sash: P.gold, glow: '#fff1c8' }, SAK_O)); mkR('sup', SUP_O);
    const you = mkR('you', { robe: '#6a5ad8', hair: '#1a1a2a' }); { const ph = mk(new T.BoxGeometry(0.16, 0.26, 0.04), '#1a1f3a'); ph.position.y = -0.62; you.userData.arms.R.add(ph); you.userData.arms.R.rotation.set(-1.1, 0, 0.3); }
    [3, 5, 7].forEach((ci, i) => { const c = chibi({ robe: ['#4fb3a0', '#e0904a', '#5a8ad8'][i], hair: '#2a2228' }); c.scale.setScalar(0.5); c.position.set(0, -1.8, 0); fw.userData.cars[ci].car.add(c); });
    W.riders = riders;
    const LOKN = ['ได้ลาภ', 'เสื่อมลาภ', 'ได้ยศ', 'เสื่อมยศ', 'สรรเสริญ', 'นินทา', 'สุข', 'ทุกข์'];
    W.lokLabs = fw.userData.cars.map((c, i) => { const lb = label(LOKN[i], { w: 2.5, px: 90, color: i % 2 ? '#c9b8ff' : P.gold }); lb.position.set(0, -0.15, 0.9); c.car.add(lb); return lb; });
    for (let i = 0; i < 10; i++) { const a = -0.3 - (i / 9) * (Math.PI - 0.6), r = 11.5; const x = Math.cos(a) * r, z = Math.sin(a) * r * 0.6 - 2; const post = mk(new T.CylinderGeometry(0.07, 0.07, 3, 5), '#2a2d50'); post.position.set(x, 1.5, z); g.add(post); const gl = softSprite('rgba(255,210,140,1)', 0.8); gl.scale.setScalar(1.4); gl.position.set(x, 3.1, z); g.add(gl); }
    for (const q of [[-8.5, 1.5, '#ff5d73'], [8.5, 1.0, '#2ee6c5'], [-7, -7, '#ffc94a'], [7.5, -7.5, '#8f7bff']]) { const tent = mk(new T.ConeGeometry(1.4, 1.8, 6), q[2]); tent.position.set(q[0], 1.6, q[1]); g.add(tent); const bx = mk(new T.CylinderGeometry(1.25, 1.25, 1.0, 6), '#f3efe6'); bx.position.set(q[0], 0.5, q[1]); g.add(bx); }
    scatterTrees(g, 40, 15, 34, 4, ['#2f6f5a', '#3a7a5e', '#2a5f50']);
    const mys = softSprite('rgba(255,225,150,1)', 0); mys.scale.setScalar(3.2); mys.position.set(0, 1.1, 3.6); g.add(mys); W.mys = mys;
    const bud = budStand(1.15); bud.position.set(0, 0.05, 3.4); g.add(bud); W.bud = bud;
    const bring = new T.Mesh(new T.RingGeometry(1.0, 1.25, 36), basic(P.gold, { transparent: true, opacity: 0.85, side: T.DoubleSide })); bring.rotation.x = -Math.PI / 2; bring.position.set(0, 0.1, 3.4); g.add(bring); W.bring = bring;
    s.W = W; }

  /* ---------- SAV: Visakha's house + the Buddha under a tree ---------- */
  { const g = station(scene, 'SAV'); s.st.SAV = g; const V = {};
    ground(g, 30, '#5a8a52'); const yard = mk(new T.BoxGeometry(9, 0.08, 6), '#d9c7a0'); yard.position.set(-1, 0.04, -0.5); g.add(yard);
    const mh = mansion(); mh.position.set(-2.2, 0, -5); g.add(mh);
    scatterTrees(g, 30, 11, 26, 2);
    const bt = tree(1.8, '#3f8f5a'); bt.position.set(7.2, 0, -2.6); g.add(bt);
    const seat = mk(new T.CylinderGeometry(0.9, 1.0, 0.3, 10), '#c9b79a'); seat.position.set(7.2, 0.15, -1.4); g.add(seat);
    V.bud = buddha(1.2); V.bud.position.set(7.2, 0.3, -1.4); g.add(V.bud);
    V.vis = chibi(VIS_O); g.add(V.vis);
    V.gd = chibi({ robe: '#ffd36a', hair: '#2a2228', bun: true }); V.gd.scale.setScalar(0.58); g.add(V.gd);
    V.fam = [chibi({ robe: '#5aa0d8', hair: '#2a2228' }), chibi({ robe: '#7ac08a', hair: '#2a2228', bun: true }), chibi({ robe: '#e0a04a', hair: '#2a2228' })];
    V.fam[1].scale.setScalar(0.6); V.fam[2].scale.setScalar(0.55); V.fam.forEach((f) => g.add(f));
    V.orb = orb('rgba(255,220,150,1)'); g.add(V.orb);
    V.drops = []; for (let i = 0; i < 8; i++) { const d = drop(); g.add(d); V.drops.push(d); }
    V.hearts = []; for (let i = 0; i < 14; i++) { const h = softSprite(i % 2 ? 'rgba(255,140,180,1)' : 'rgba(200,170,255,1)', 0.9); h.scale.setScalar(0.55); g.add(h); V.hearts.push(h); }
    s.V = V; }

  /* ---------- KUS: Kusavati → Kusinara ---------- */
  { const g = station(scene, 'KUS'); s.st.KUS = g; const K = {};
    K.gnd = ground(g, 34, '#6a8a56');
    const big = palace('#fbe9c2'); big.scale.setScalar(0.95); big.position.set(0, 0, -6); g.add(big); K.big = big;
    K.halo = softSprite('rgba(255,215,120,1)', 0); K.halo.scale.setScalar(9); K.halo.position.set(0, 2.6, -5.8); g.add(K.halo);
    const pos = []; for (let row = 0; row < 4; row++) for (let i = -6; i <= 6; i++) { const x = i * 2.3 + (row % 2) * 1.15, z = -8.5 - row * 2.6 + Math.abs(i) * 0.5; if (Math.abs(x) < 3.2 && row < 2) continue; pos.push([x, z]); }
    for (let i = 0; i < 6; i++) { pos.push([-9.5 - (i % 3) * 2.2, -3 - Math.floor(i / 3) * 2.4]); pos.push([9.5 + (i % 3) * 2.2, -3 - Math.floor(i / 3) * 2.4]); }
    K.pal = pos.map((q, i) => { const p = new T.Group(); const b = mk(new T.BoxGeometry(1.3, 0.9, 1.1), '#fbefd2'); b.position.y = 0.45; const r = mk(new T.ConeGeometry(1.05, 0.9, 4), P.gold, GOLDM); r.rotation.y = Math.PI / 4; r.position.y = 1.35; p.add(b, r); p.position.set(q[0], 0, q[1]); g.add(p); p.userData = { b, r, k: i / pos.length }; return p; });
    const thr = mk(new T.BoxGeometry(1.6, 0.5, 1.2), P.gold, GOLDM); thr.position.set(0, 0.25, 0.2); g.add(thr); K.thr = thr;
    const back = mk(new T.BoxGeometry(1.6, 1.5, 0.2), '#c0302a'); back.position.set(0, 1.0, -0.4); g.add(back); K.back = back;
    K.king = chibi(KING_O); g.add(K.king);
    K.queen = chibi({ robe: '#ff8fa3', hair: '#2a2228', bun: true, band: P.gold }); g.add(K.queen);
    K.tears = []; for (let i = 0; i < 6; i++) { const d = drop('#bfe6ff'); g.add(d); K.tears.push(d); }
    K.ele = [elephant(0.9), elephant(0.8)]; K.ele[0].position.set(-5.2, 0, 0.6); K.ele[1].position.set(-6.4, 0, -2.0); K.ele.forEach((e) => { e.rotation.y = -0.4; g.add(e); });
    K.hor = [horse(), horse('#c9a27a')]; K.hor[0].position.set(4.8, 0, 0.8); K.hor[1].position.set(6.0, 0, -1.2); K.hor.forEach((h) => { h.rotation.y = Math.PI + 0.4; g.add(h); });
    K.crowd = []; for (let i = 0; i < 7; i++) { const c = chibi({ robe: ['#5aa0d8', '#7ac08a', '#e0a04a', '#d86a8a'][i % 4], hair: '#2a2228', bun: i % 2 === 1 }); c.scale.setScalar(0.7); c.position.set(-3 + i, 0, 3.4 + (i % 2) * 0.5); c.rotation.y = Math.PI; g.add(c); K.crowd.push(c); }
    K.homes = []; for (let i = 0; i < 3; i++) { const h = new T.Group(); const b = mk(new T.BoxGeometry(1.4, 1.1, 1.2), ['#e6e1d6', '#d6dde6', '#e6dccf'][i]); b.position.y = 0.55; const r = mk(new T.BoxGeometry(1.6, 0.14, 1.4), '#5a6070'); r.position.y = 1.17; h.add(b, r); const w = new T.Mesh(new T.PlaneGeometry(0.45, 0.4), basic(i === 1 ? '#ffe08a' : '#3a4060')); w.position.set(0, 0.6, 0.61); h.add(w); h.position.set(-3.2 + i * 3.2, 0, 3.0); g.add(h); K.homes.push(h); }
    K.jungle = []; for (let i = 0; i < 36; i++) { const tr = tree(0.9 + rnd() * 0.9, ['#2f7f4a', '#3f8f5a', '#4f9a4a'][i % 3]); const a = rnd() * Math.PI * 2, r = 4 + rnd() * 12; tr.position.set(Math.cos(a) * r, 0, -2 - Math.abs(Math.sin(a)) * r * 0.9); tr.userData.k = rnd(); g.add(tr); K.jungle.push(tr); }
    K.huts = [[-3.4, -0.5], [3.6, -1.0], [-5.5, 2.2], [5.4, 2.0]].map((q) => { const h = hut(1.6, 1.4, 1.0, '#b99a70', '#8a6a3a'); h.position.set(q[0], 0, q[1]); g.add(h); return h; });
    K.sal = [-2.5, 2.5].map((x) => { const t2 = tree(1.7, '#4f9a4a'); t2.position.set(x, 0, -2.8); const fl = []; for (let i = 0; i < 8; i++) { const f = new T.Mesh(new T.SphereGeometry(0.1, 6, 5), basic('#fff8e8')); f.position.set(Math.cos(i) * 0.9, 2.4 + Math.sin(i * 3) * 0.4, Math.sin(i) * 0.9); t2.add(f); fl.push(f); } g.add(t2); return t2; });
    K.lie = budLie(1); K.lie.position.set(0, 0, 0.2); g.add(K.lie);
    K.monks = [[-2.3, 1.4, 0.7], [2.3, 1.4, -0.7], [-3.0, -0.4, 1.2]].map((q) => { const m = monk(); setSit(m, true); anjali(m); m.position.set(q[0], 0, q[1]); m.rotation.y = q[2] + Math.PI; g.add(m); return m; });
    K.ghost = chibi(Object.assign({}, KING_O, { gold: true })); K.ghost.traverse((o) => { if (o.material) { o.material = o.material.clone(); o.material.transparent = true; o.material.opacity = 0.8; o.material.depthWrite = false; } }); K.ghost.scale.setScalar(1.15); g.add(K.ghost);
    s.K = K; }

  /* ---------- SKY: Tavatimsa + simbali forest ---------- */
  { const g = station(scene, 'SKY'); s.st.SKY = g; const Sk = {};
    for (let i = 0; i < 22; i++) { const c = cloud(0.9 + rnd() * 0.9); const a = Math.PI * (0.55 + rnd() * 0.9), r = 13 + rnd() * 5; c.position.set(-3 + Math.cos(a) * r, -1.0 + rnd() * 0.4, -3 + Math.sin(a) * r * 0.8); g.add(c); }
    for (let i = 0; i < 8; i++) { const c = cloud(1.4 + rnd()); c.position.set(-6 + i * 3.4, -2.2, -16 - rnd() * 4); g.add(c); }
    const floor = mk(new T.CylinderGeometry(12, 12, 0.3, 30), '#e8ecff', { emissive: new T.Color('#8fa0ff'), emissiveIntensity: 0.25 }); floor.position.set(-3, -0.15, -3); g.add(floor);
    const pal = palace('#fff6e0'); pal.scale.setScalar(1.1); pal.position.set(-3, 0, -9); g.add(pal);
    const fg = mk(new T.BoxGeometry(18, 0.4, 14), '#3f7a4a'); fg.position.set(17, -0.2, -1); g.add(fg);
    Sk.trees = [[14, -2], [16.5, 0.5], [18.5, -3], [20, 0], [15.5, -5]].map((q) => { const n = nestTree(1); n.position.set(q[0], 0, q[1]); g.add(n); return n; });
    Sk.sak = chibi(Object.assign({ skin: '#f2d2ae', sash: P.gold, glow: '#fff1c8' }, SAK_O)); g.add(Sk.sak);
    Sk.devas = []; for (let i = 0; i < 4; i++) { const d = deva({ robe: ['#fff6e0', '#e8fff6', '#f6eaff', '#fff0e8'][i] }); d.scale.setScalar(0.85); g.add(d); Sk.devas.push(d); }
    Sk.asuras = []; for (let i = 0; i < 6; i++) { const a = asura(); a.scale.setScalar(0.95); g.add(a); Sk.asuras.push(a); }
    Sk.car = chariot(); g.add(Sk.car);
    Sk.mat = chibi({ robe: '#7ab0ff', hair: '#2a2228', band: P.gold }); Sk.mat.scale.setScalar(0.8); Sk.car.add(Sk.mat); Sk.mat.position.set(0.3, 0.85, 0.3);
    Sk.seat = mk(new T.BoxGeometry(1.5, 0.55, 1.2), P.gold, GOLDM); Sk.seat.position.set(-3, 0.27, -4.6); g.add(Sk.seat);
    Sk.seatBack = mk(new T.BoxGeometry(1.5, 1.4, 0.2), '#ff8fb0'); Sk.seatBack.position.set(-3, 0.95, -5.25); g.add(Sk.seatBack);
    Sk.dv = deva({ robe: '#fff6e0' }); g.add(Sk.dv); Sk.gar = garland(); Sk.dv.userData.head.add(Sk.gar); Sk.gar.position.set(0, -0.42, 0.05);
    Sk.dvRobe = Sk.dv.userData.body.material; Sk.dvSkin = Sk.dv.userData.head.children[0].material;
    Sk.sweat = []; for (let i = 0; i < 6; i++) { const d = drop('#bfe6ff'); g.add(d); Sk.sweat.push(d); }
    Sk.glow = softSprite('rgba(255,240,190,1)', 0.6); Sk.glow.scale.setScalar(3.4); g.add(Sk.glow);
    s.Sk = Sk; }

  /* ---------- RAJ: Bamboo grove sermon, Suppabuddha ---------- */
  { const g = station(scene, 'RAJ'); s.st.RAJ = g; const R = {};
    ground(g, 34, '#5f8a4e'); const path = mk(new T.BoxGeometry(22, 0.06, 1.6), '#c9b48a'); path.position.set(8, 0.03, 5.2); g.add(path);
    for (let i = 0; i < 9; i++) { const b = bamboo(); b.position.set(-9 + i * 2.2, 0, -7 - (i % 2) * 1.4); g.add(b); }
    scatterTrees(g, 26, 13, 30, 0);
    const bt = tree(1.9, '#3f8f5a'); bt.position.set(0, 0, -3.4); g.add(bt);
    const seat = mk(new T.CylinderGeometry(0.95, 1.05, 0.35, 10), '#c9b79a'); seat.position.set(0, 0.17, -2.2); g.add(seat);
    R.bud = buddha(1.25); R.bud.position.set(0, 0.35, -2.2); g.add(R.bud);
    R.crowd = []; for (let i = 0; i < 11; i++) { const row = i < 6 ? 0 : 1, k = row ? i - 6 : i, n = row ? 5 : 6; const a = Math.PI * (0.18 + 0.64 * (k / (n - 1))), r = 2.4 + row * 1.2; const c = chibi({ robe: ['#5aa0d8', '#7ac08a', '#e0a04a', '#d86a8a', '#9a7ad8'][i % 5], hair: '#2a2228', bun: i % 3 === 1 }); c.scale.setScalar(0.78); setSit(c, true); anjali(c); c.position.set(Math.cos(a) * r, 0, -2.2 + Math.sin(a) * r); face(c, -Math.cos(a), -Math.sin(a)); g.add(c); R.crowd.push(c); }
    R.sup = chibi(SUP_O); g.add(R.sup);
    R.bowl = mk(new T.CylinderGeometry(0.2, 0.14, 0.14, 8), '#6a4a2a'); g.add(R.bowl);
    R.patch = []; for (let i = 0; i < 3; i++) { const p = mk(new T.BoxGeometry(0.16, 0.16, 0.02), '#5a4a30'); R.sup.userData.body.add(p); p.position.set(-0.2 + i * 0.2, -0.1 + (i % 2) * 0.25, 0.5); R.patch.push(p); }
    R.ring = new T.Mesh(new T.RingGeometry(0.8, 1.0, 32), basic(P.gold, { transparent: true, opacity: 0, side: T.DoubleSide })); R.ring.rotation.x = -Math.PI / 2; g.add(R.ring);
    R.glow = softSprite('rgba(255,225,150,1)', 0); R.glow.scale.setScalar(3.4); g.add(R.glow);
    R.cow = cow(1); R.calf = cow(0.55, '#d9c9b0'); g.add(R.cow, R.calf);
    R.orb = orb('rgba(255,225,150,1)'); g.add(R.orb);
    s.R = R; }

  /* ---------- JET: Jetavana + hill ---------- */
  { const g = station(scene, 'JET'); s.st.JET = g; const J = {};
    ground(g, 34, '#5a8a52'); scatterTrees(g, 26, 13, 30, 0);
    const kuti = hut(2.8, 2.2, 1.8, '#d9c7a0', '#a8743a'); kuti.position.set(0, 0, -4.6); g.add(kuti);
    const seat = mk(new T.CylinderGeometry(0.95, 1.05, 0.35, 10), '#c9b79a'); seat.position.set(0, 0.17, -2.2); g.add(seat);
    J.bud = buddha(1.25); J.bud.position.set(0, 0.35, -2.2); g.add(J.bud);
    J.monks = [[-2.2, -0.6], [-1.3, 0.6], [1.3, 0.6], [2.2, -0.6]].map((q) => { const m = monk(); setSit(m, true); anjali(m); m.position.set(q[0], 0, q[1]); face(m, -q[0] * 0.5, -1); g.add(m); return m; });
    J.town = []; for (let i = 0; i < 7; i++) { const c = chibi({ robe: ['#5aa0d8', '#7ac08a', '#e0a04a', '#d86a8a', '#9a7ad8'][i % 5], hair: '#2a2228', bun: i % 2 === 1 }); c.scale.setScalar(0.85); g.add(c); J.town.push(c); }
    const hill = mk(new T.ConeGeometry(6, 7.0, 9), '#7a8a5e'); hill.position.set(-15, 3.3, -14); g.add(hill); J.hill = hill;
    J.rock = mk(new T.IcosahedronGeometry(0.9, 0), '#8a7f72'); g.add(J.rock);
    J.bits = []; for (let i = 0; i < 7; i++) { const b = mk(new T.IcosahedronGeometry(0.18 + (i % 3) * 0.06, 0), '#9a8f82'); g.add(b); J.bits.push(b); }
    J.stand = budStand(1.15); g.add(J.stand);
    J.spark = softSprite('rgba(255,160,120,1)', 0); J.spark.scale.setScalar(0.9); g.add(J.spark);
    J.lie = budLie(1); J.lie.position.set(0, 0, -1.6); g.add(J.lie);
    J.devas = []; for (const q of [[-2.4, -1.0], [2.4, -1.0], [-1.6, -3.4]]) { const d = deva({ robe: '#fff6e0' }); d.scale.setScalar(0.7); d.position.set(q[0], 0, q[1]); face(d, -q[0], -1.6 - q[1]); anjali(d); g.add(d); J.devas.push(d); }
    s.J = J; }

  s.anchorV = new T.Vector3();
  return s;
}
