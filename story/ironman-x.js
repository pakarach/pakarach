/* Iron Man (2008) recap: extra props + set presets, loaded after k-cast.js.
   No suit, mask, chest light or villain-suit design anywhere: people are plain chibis, the armour stays under a tarp, flight and fights are light streaks. */
const at3 = (m, x, y, z) => { m.position.set(x, y, z); return m; };
const glowM = (c, k) => M(c, { emissive: new T.Color(c), emissiveIntensity: k == null ? 0.9 : k });
const wheel = (r, w) => { const m = mk(new T.CylinderGeometry(r, r, w, 12), '#1e1e24'); m.rotation.z = Math.PI / 2; return m; };
CF.tony = (s) => chibi({ robe: '#2c3756', sash: '#b8c2d6', skin: '#e8b890', hair: '#2a1e18', sleeve: '#2c3756', s });
CF.tonyC = (s) => chibi({ robe: '#77705f', skin: '#d8a880', hair: '#2a1e18', sleeve: '#d8a880', s }); // captive: dirty tank top
CF.yinsen = (s) => chibi({ robe: '#8a6f4e', skin: '#c89070', hair: '#5f5a55', beard: '#6a6560', sleeve: '#8a6f4e', s });
CF.boss = (s) => chibi({ robe: '#2a2a2e', sash: '#7a1a1a', skin: '#c89070', hair: '#141414', beard: '#141414', band: '#7a1a1a', s });
CF.gun = (s, c) => chibi({ robe: c || '#3a3a34', skin: '#b88060', hair: '#141414', band: '#5a4a3a', s });
CF.rhodey = (s) => chibi({ robe: '#4f5b3c', sash: '#c8b070', skin: '#7a5238', hair: '#1a1410', band: '#3e4930', sleeve: '#4f5b3c', s });
CF.pepper = (s) => chibi({ robe: '#ece4d2', sash: '#3a4a6a', skin: '#f0c8a0', hair: '#c07a44', bun: true, s });
CF.obad = (s) => chibi({ robe: '#4c5262', sash: '#9aa0ae', skin: '#e0b090', hair: '#d6d6d6', sleeve: '#4c5262', s: s || 1.18 });
CF.rep = (s, c) => chibi({ robe: c || '#3d3a44', skin: ['#e8b890', '#c89070', '#f0c8a0'][(c || 'a').length % 3], hair: '#2a2228', s: s || 0.85 });
CF.vil = (s, c) => chibi({ robe: c || '#9a7a5a', skin: '#c89070', hair: '#1a1420', bun: true, s: s || 0.85 });
CF.soldier = (s) => chibi({ robe: '#5a6440', skin: '#d8a880', hair: '#2a2228', band: '#4a5236', s });
CF.truck = (s, col) => { const g = new T.Group(), c = col || '#5a6440';
  g.add(at3(mk(new T.BoxGeometry(1.5, 0.8, 2.8), c), 0, 0.78, -0.2), at3(mk(new T.BoxGeometry(1.45, 0.72, 1.0), c), 0, 1.5, 0.7), at3(mk(new T.BoxGeometry(1.3, 0.36, 0.05), '#22303c'), 0, 1.6, 1.21));
  for (const sx of [-0.78, 0.78]) for (const sz of [-1.1, 0.9]) g.add(at3(wheel(0.38, 0.28), sx, 0.38, sz));
  for (const sx of [-0.5, 0.5]) g.add(at3(new T.Mesh(new T.SphereGeometry(0.1, 8, 6), basic('#fff2c0')), sx, 0.95, 1.22));
  g.scale.setScalar(s || 1); return g; };
CF.missile = (s) => { const g = new T.Group(); const b = mk(new T.CylinderGeometry(0.24, 0.24, 1.7, 12), '#a2a9b3'); b.rotation.z = Math.PI / 2; b.position.y = 0.26; g.add(b);
  const n = mk(new T.ConeGeometry(0.24, 0.55, 12), '#d0d4da'); n.rotation.z = -Math.PI / 2; n.position.set(1.12, 0.26, 0); g.add(n);
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2, f = mk(new T.BoxGeometry(0.34, 0.03, 0.26), '#6a7078'); f.position.set(-0.75, 0.26 + Math.sin(a) * 0.26, Math.cos(a) * 0.26); f.rotation.x = a; g.add(f); }
  const st = mk(new T.BoxGeometry(0.9, 0.2, 0.02), '#f2f2f2'); st.position.set(0.05, 0.3, 0.245); g.add(st);
  const lb = label('สตาร์ก', { px: 120, color: '#ffd94a', w: 1.3 }); lb.position.set(0.05, 0.95, 0.3); g.add(lb); g.userData.lb = lb;
  g.scale.setScalar(s || 1); return g; };
CF.crates = (s) => { const g = new T.Group(); for (const [x, y, z] of [[0, 0.35, 0], [0.75, 0.35, 0.05], [0.38, 1.05, 0], [-0.75, 0.35, 0.1]]) { g.add(at3(mk(new T.BoxGeometry(0.7, 0.7, 0.7), '#4a5232'), x, y, z)); g.add(at3(mk(new T.BoxGeometry(0.4, 0.14, 0.02), '#d8d0a0'), x, y + 0.05, z + 0.36)); } g.scale.setScalar(s || 1); return g; };
CF.tarp = (s, c) => { const g = new T.Group(); const pts = [[0.95, 0], [0.78, 0.6], [0.6, 1.25], [0.34, 1.8], [0.001, 1.95]].map((q) => new T.Vector2(q[0], q[1])); const m = mk(new T.LatheGeometry(pts, 9), c || '#7a7060', { flatShading: true }); g.add(m);
  for (let i = 0; i < 5; i++) { const r = mk(new T.BoxGeometry(0.06, 0.7, 0.4), '#5a5448'); const a = i * 1.26; r.position.set(Math.sin(a) * 0.72, 0.45, Math.cos(a) * 0.72); r.rotation.y = a; g.add(r); }
  g.scale.setScalar(s || 1); return g; };
CF.bench = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(2.4, 0.12, 0.9), c || '#5a4636'), 0, 0.9, 0)); for (const x of [-1.05, 1.05]) g.add(at3(mk(new T.BoxGeometry(0.12, 0.85, 0.8), '#3a2c22'), x, 0.43, 0));
  for (const [x, w] of [[-0.6, 0.3], [0.1, 0.5], [0.7, 0.24]]) g.add(at3(mk(new T.BoxGeometry(w, 0.1, 0.22), '#8a9098'), x, 1.01, 0.05)); g.scale.setScalar(s || 1); return g; };
CF.cot = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.0, 0.18, 2.2), '#6a6250'), 0, 0.35, 0)); for (const x of [-0.42, 0.42]) for (const z of [-0.95, 0.95]) g.add(at3(mk(new T.BoxGeometry(0.08, 0.3, 0.08), '#3a3430'), x, 0.15, z)); g.scale.setScalar(s || 1); return g; };
CF.battery = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.6, 0.42, 0.36), '#1e2228'), 0, 0.21, 0)); for (const x of [-0.16, 0.16]) g.add(at3(mk(new T.CylinderGeometry(0.05, 0.05, 0.1, 8), x < 0 ? '#c03030' : '#303030'), x, 0.47, 0)); g.scale.setScalar(s || 1); return g; };
CF.case = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.7, 1.0, 0.7), '#2a3038'), 0, 0.5, 0)); const gl = new T.Mesh(new T.BoxGeometry(0.56, 0.56, 0.56), new T.MeshStandardMaterial({ color: '#cfe8ff', transparent: true, opacity: 0.25, roughness: 0.1 })); gl.position.y = 1.3; g.add(gl);
  const o = orb('rgba(140,220,255,1)'); o.position.y = 1.28; o.scale.setScalar(0.7); g.add(o); g.userData.orb = o; g.add(at3(mk(new T.BoxGeometry(0.4, 0.06, 0.02), P.gold, GOLDM), 0, 1.06, 0.29)); g.scale.setScalar(s || 1); return g; };
CF.podium = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.95, 1.05, 0.6), '#2e3a5a'), 0, 0.52, 0)); g.add(at3(mk(new T.BoxGeometry(0.5, 0.3, 0.02), '#cfd6e6'), 0, 0.7, 0.31)); const mic = mk(new T.CylinderGeometry(0.015, 0.015, 0.45, 6), '#111'); mic.position.set(0.12, 1.25, 0.1); mic.rotation.x = 0.4; g.add(mic); g.scale.setScalar(s || 1); return g; };
CF.paper = (s) => { const m = mk(new T.BoxGeometry(0.28, 0.02, 0.36), '#f4f0e6'); m.scale.setScalar(s || 1); return m; };
CF.burger = (s) => { const g = new T.Group(); g.add(at3(mk(new T.SphereGeometry(0.13, 10, 6, 0, 6.3, 0, 1.6), '#d8963c'), 0, 0.02, 0), at3(mk(new T.CylinderGeometry(0.14, 0.14, 0.05, 10), '#5a3216'), 0, 0, 0), at3(mk(new T.CylinderGeometry(0.13, 0.12, 0.05, 10), '#d8963c'), 0, -0.05, 0)); g.scale.setScalar(s || 1); return g; };
CF.car = (s, c) => { const g = new T.Group(), col = c || '#9a2a2a'; g.add(at3(mk(new T.BoxGeometry(1.5, 0.45, 3.0), col), 0, 0.45, 0), at3(mk(new T.BoxGeometry(1.25, 0.38, 1.3), '#1e2430'), 0, 0.86, -0.15)); for (const sx of [-0.76, 0.76]) for (const sz of [-0.95, 0.95]) g.add(at3(wheel(0.28, 0.2), sx, 0.28, sz)); g.scale.setScalar(s || 1); return g; };
CF.arm = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.3, 0.36, 0.3, 10), '#3a4250'), 0, 0.15, 0)); const a1 = new T.Group(); a1.position.y = 0.3; g.add(a1); a1.add(at3(mk(new T.BoxGeometry(0.16, 1.2, 0.16), '#d0d4dc'), 0, 0.6, 0));
  const a2 = new T.Group(); a2.position.y = 1.2; a1.add(a2); a2.add(at3(mk(new T.BoxGeometry(0.13, 0.9, 0.13), '#d0d4dc'), 0, 0.45, 0)); a2.add(at3(new T.Mesh(new T.SphereGeometry(0.08, 8, 6), basic('#7fd0ff')), 0, 0.95, 0)); g.userData.a1 = a1; g.userData.a2 = a2; g.scale.setScalar(s || 1); return g; };
CF.screens = (s, c) => { const g = new T.Group(); for (const [x, y, w] of [[-1.3, 1.9, 1.1], [0, 2.1, 1.4], [1.35, 1.85, 1.0]]) g.add(at3(new T.Mesh(new T.PlaneGeometry(w, 0.75), basic(c || '#4ab8ff', { transparent: true, opacity: 0.55, side: T.DoubleSide })), x, y, 0)); g.scale.setScalar(s || 1); return g; };
CF.monitor = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.1, 0.7, 0.06), '#15181e'), 0, 0.45, 0)); const sc = new T.Mesh(new T.PlaneGeometry(1.0, 0.6), basic('#6fc8ff')); sc.position.set(0, 0.45, 0.035); g.add(sc); g.add(at3(mk(new T.BoxGeometry(0.06, 0.2, 0.06), '#15181e'), 0, 0.05, 0)); g.userData.sc = sc; g.scale.setScalar(s || 1); return g; };
CF.desk = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(2.2, 0.1, 1.0), '#3a3f4a'), 0, 0.85, 0)); for (const x of [-1.0, 1.0]) g.add(at3(mk(new T.BoxGeometry(0.1, 0.8, 0.9), '#262a32'), x, 0.42, 0)); g.scale.setScalar(s || 1); return g; };
CF.jet = (s) => { const g = new T.Group(), c = '#8a929e'; const b = mk(new T.CylinderGeometry(0.22, 0.3, 3.0, 8), c); b.rotation.x = Math.PI / 2; g.add(b); const n = mk(new T.ConeGeometry(0.22, 0.9, 8), c); n.rotation.x = Math.PI / 2; n.position.z = 1.95; g.add(n);
  const w = mk(new T.BoxGeometry(2.8, 0.05, 1.0), '#7a828e'); w.position.z = -0.2; g.add(w); const tw = mk(new T.BoxGeometry(1.1, 0.05, 0.5), '#7a828e'); tw.position.z = -1.3; g.add(tw); const f = mk(new T.BoxGeometry(0.05, 0.6, 0.5), '#7a828e'); f.position.set(0, 0.3, -1.3); g.add(f);
  g.add(at3(mk(new T.SphereGeometry(0.16, 8, 6), '#1e2a3a'), 0, 0.18, 0.9)); const ex = softSprite('rgba(255,170,90,1)', 0.9); ex.scale.setScalar(0.9); ex.position.z = -1.65; g.add(ex); g.scale.setScalar(s || 1); return g; };
CF.heli = (s) => { const g = new T.Group(), c = '#4f5b3c'; const b = mk(new T.SphereGeometry(0.7, 10, 8), c); b.scale.set(1, 0.8, 1.5); g.add(b); const tl = mk(new T.CylinderGeometry(0.08, 0.16, 1.9, 6), c); tl.rotation.x = Math.PI / 2; tl.position.set(0, 0.15, -1.7); g.add(tl);
  const r = new T.Group(); r.position.y = 0.72; r.add(mk(new T.BoxGeometry(4.2, 0.03, 0.18), '#22262a'), mk(new T.BoxGeometry(0.18, 0.03, 4.2), '#22262a')); g.add(r); g.userData.rotor = r; g.add(at3(mk(new T.SphereGeometry(0.3, 8, 6), '#1e2a3a'), 0, 0.1, 0.75));
  const bm = beam('#fff6d0'); bm.scale.set(14, 7, 1); g.userData.beam = bm; g.scale.setScalar(s || 1); return g; };
CF.house = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(2.2, 1.7, 1.8), c || '#a88a62'), 0, 0.85, 0), at3(mk(new T.BoxGeometry(2.4, 0.14, 2.0), '#8a6e4c'), 0, 1.76, 0), at3(mk(new T.BoxGeometry(0.5, 0.9, 0.04), '#3a2a1c'), -0.5, 0.45, 0.91));
  g.add(at3(new T.Mesh(new T.PlaneGeometry(0.42, 0.36), basic('#ffc070')), 0.5, 1.05, 0.915)); g.scale.setScalar(s || 1); return g; };
CF.reactor = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(1.6, 1.7, 3.6, 18), '#2a303a'), 0, 1.8, 0)); const rings = []; for (const y of [0.9, 1.9, 2.9]) { const r = new T.Mesh(new T.CylinderGeometry(1.66, 1.66, 0.14, 18, 1, true), basic('#8fe0ff', { side: T.DoubleSide })); r.position.y = y; g.add(r); rings.push(r); }
  const top = softSprite('rgba(150,225,255,1)', 0.8); top.scale.setScalar(3.4); top.position.y = 3.8; g.add(top); g.userData.rings = rings; g.userData.top = top; g.scale.setScalar(s || 1); return g; };
CF.console = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.2, 0.9, 0.6), '#2a3038'), 0, 0.45, 0)); for (let i = 0; i < 4; i++) g.add(at3(new T.Mesh(new T.BoxGeometry(0.16, 0.06, 0.16), basic(i === 2 ? '#ff4a4a' : '#7fe0ff')), -0.42 + i * 0.28, 0.93, 0)); g.scale.setScalar(s || 1); return g; };
CF.device = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.16, 0.24, 0.06), '#1e1e24'), 0, 0, 0)); const gl = softSprite('rgba(200,120,255,1)', 0.9); gl.scale.setScalar(0.6); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.boom = (s, c) => { const g = new T.Group(); const a = softSprite(c || 'rgba(255,140,50,1)', 0.95); a.scale.setScalar(3.2); const b = softSprite('rgba(255,240,200,1)', 1); b.scale.setScalar(1.6); const d = softSprite('rgba(255,80,30,1)', 0.6); d.scale.setScalar(4.6); g.add(d, a, b); g.scale.setScalar(s || 1); return g; };
CF.puff = (s) => { const g = new T.Group(); for (let i = 0; i < 5; i++) { const p = softSprite('rgba(120,110,100,1)', 0.55); p.scale.setScalar(1.4 + i * 0.3); p.position.set(Math.sin(i * 2.4) * 0.6, 0.5 + i * 0.35, Math.cos(i * 2.4) * 0.4); g.add(p); } g.scale.setScalar(s || 1); return g; };
CF.flash = (s) => { const g = softSprite('rgba(255,255,255,1)', 1); g.scale.setScalar(s || 0.8); return g; };
/* streak: a glowing comet; fly(o, path, u) places it and its trail along path(u) (world points) */
CF.streak = (s, c) => { const g = new T.Group(), col = c || 'rgba(170,220,255,1)'; const a = softSprite(col, 0.95); a.scale.setScalar(1.8); const b = softSprite('rgba(255,255,255,1)', 1); b.scale.setScalar(0.75); g.add(a, b); const tr = [];
  for (let i = 0; i < 7; i++) { const q = softSprite(col, 0.55 - i * 0.07); q.scale.setScalar(1.3 - i * 0.12); g.add(q); tr.push(q); } g.userData.trail = tr; g.scale.setScalar(s || 1); return g; };
function fly(o, path, u, step) { const p = path(u); o.position.copy(p); const k = o.scale.x || 1; o.userData.trail.forEach((q, i) => { const v = path(u - (i + 1) * (step || 0.012)); q.position.set((v.x - p.x) / k, (v.y - p.y) / k, (v.z - p.z) / k); }); }

/* set presets */
const decor = (st, list) => list.map(([o, x, y, z, ry]) => { place(o, st, x, y || 0, z); if (ry) o.rotation.y = ry; return o; });
Object.assign(ENVB, {
  desert(st, o) { const out = [terrain(st, '#d9b276', '#a8773e', { hill: 4.5, seed: o.seed || 11, flat: 12 }), ranges(st, [[36, '#b88a52', 5, 10, 12, 2.6], [48, '#9a6a44', 8, 14, 9, 2.8]], { seed: (o.seed || 11) + 1 })];
    for (let i = 0; i < 8; i++) out.push(...decor(st, [[CF.stone(0.6 + (i % 3) * 0.3), -8 + i * 2.3, 0, -3 - (i % 2) * 3]])); return out; },
  room(st, o) { const out = []; const fl = mk(new T.BoxGeometry(16, 0.2, 13), o.floor || '#2a3348'); place(fl, st, 0, -0.1, -1); out.push(fl); const wall = mk(new T.BoxGeometry(16, 7, 0.4), o.wall || '#1e2a48'); place(wall, st, 0, 3.4, -6.5); out.push(wall);
    for (const sx of [-1, 1]) { const sw = mk(new T.BoxGeometry(0.4, 7, 12), o.side || o.wall || '#1e2a48'); place(sw, st, sx * 8, 3.4, -1); out.push(sw); }
    if (o.banner) { const b = new T.Mesh(new T.PlaneGeometry(6, 1.6), basic(o.banner)); place(b, st, 0, 3.6, -6.28); out.push(b); }
    if (o.lamps) for (const x of o.lamps) { const lp = softSprite(o.lampC || 'rgba(255,230,190,1)', 0.7); lp.scale.setScalar(2.4); place(lp, st, x, 5.6, -5); out.push(lp); }
    if (o.city) { for (let i = 0; i < 18; i++) { const h = 1.2 + ((i * 37) % 7) * 0.5; const b = new T.Mesh(new T.PlaneGeometry(0.7, h), basic(['#ffb060', '#6fb7ff', '#ffe0a8'][i % 3], { transparent: true, opacity: 0.35 })); place(b, st, -7 + i * 0.82, 1.4 + h / 2, -6.25); out.push(b); } }
    if (o.rocks) { let rs = 13; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647); for (let i = 0; i < 22; i++) { const r = mk(new T.DodecahedronGeometry(0.8 + rnd() * 0.9, 0), i % 2 ? '#4a3c32' : '#3e322a', { flatShading: true }); const side = i % 3; place(r, st, side === 0 ? -7.4 + rnd() : side === 1 ? 7.4 - rnd() : -7 + rnd() * 14, side === 2 ? 5.5 + rnd() * 1.5 : 0.5 + rnd() * 5, side === 2 ? -6.1 : -6 + rnd() * 9); out.push(r); } }
    return out; },
  village(st, o) { const out = [terrain(st, '#c9a26a', '#8a6a42', { hill: 4, seed: 33, flat: 12 }), ranges(st, [[36, '#7a5a4a', 6, 12, 12, 2.6]], { seed: 34 })];
    out.push(...decor(st, [[CF.house(1, '#a88a62'), -3.6, 0, -3.2, 0.1], [CF.house(1.1, '#b0926a'), 0.2, 0, -4.2], [CF.house(0.95, '#9a7c58'), 3.9, 0, -3.0, -0.15], [CF.house(0.9, '#a08060'), -6.5, 0, -1.2, 0.5]])); return out; },
  roof(st, o) { const out = []; const fl = mk(new T.BoxGeometry(18, 0.4, 13), '#262a32'); place(fl, st, 0, -0.2, -1); out.push(fl);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { const sk = new T.Mesh(new T.BoxGeometry(1.7, 0.06, 1.2), basic('#8fdcff', { transparent: true, opacity: 0.6 })); place(sk, st, -5.2 + i * 1.9, 0.03, 1.6 + j * 1.4); out.push(sk); }
    let rs = 21; const rnd = () => ((rs = (rs * 16807) % 2147483647) / 2147483647); for (let i = 0; i < 40; i++) { const b = softSprite(['rgba(255,190,110,1)', 'rgba(120,180,255,1)', 'rgba(255,230,170,1)'][i % 3], 0.35 + rnd() * 0.3); b.scale.setScalar(0.6 + rnd() * 1.2); place(b, st, -30 + rnd() * 60, -3 + rnd() * 4, -18 - rnd() * 20); out.push(b); }
    return out; },
});
VE.registerSfx('puff', (tt) => { VE.audio.noise(tt, 0.7, { f: 500, vol: 0.06 }); VE.audio.tone(tt, 120, 0.6, { type: 'sine', f2: 60, vol: 0.05, rel: 0.5 }); });
VE.registerSfx('zip', (tt) => VE.audio.noise(tt, 0.45, { type: 'bandpass', f: 500, f2: 2400, q: 0.8, vol: 0.05 }));
