/* k-vinyl.js — movie-recap add-on for the story kit (รู้งี้สรุปหนัง), loaded after k-cast.js and before the film's -x.js cast file.
   vin(): kit-clay vinyl chibi adapted to the story kit (arms L/R, hands, face expressions via actor field ex).
   Generic props (vehicles, rooms, explosions, streaks, flyer) + set presets desert/room/village/roof + soft SFX puff/zip. Build with --kit fact,clay. */
/* vinyl cast (kit-clay CK.chibi) adapted to the story kit: arms L/R + hands, dummy body/lap, face expressions via a.ex */
const vin = (o) => { const c = CK.chibi(T, o), u = c.userData; u.vinyl = true; const L = u['arm-1'], R = u.arm1; L.userData.hand = u['hand-1']; R.userData.hand = u.hand1; u.arms = { L, R }; u.eyes = []; u.body = new T.Object3D(); u.lap = new T.Object3D(); return c; };
const AD = 1.25; // adult build (CK adult proportions start at scale 1.2)
const at3 = (m, x, y, z) => { m.position.set(x, y, z); return m; };
const glowM = (c, k) => M(c, { emissive: new T.Color(c), emissiveIntensity: k == null ? 0.9 : k });
const wheel = (r, w) => { const m = mk(new T.CylinderGeometry(r, r, w, 12), '#1e1e24'); m.rotation.z = Math.PI / 2; return m; };
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
/* flyer: a cast member (CF name) flying arms-forward with a light trail; no thrusters, no armour */
CF.flyer = (s, who) => { const g = new T.Group(), b = CF[who || 'hero'](1); b.rotation.x = Math.PI / 2; b.position.z = -0.95; const a = b.userData.arms; a.L.rotation.set(-Math.PI * 0.94, 0, -0.18); a.R.rotation.set(-Math.PI * 0.94, 0, 0.18); g.add(b);
  const tr = []; for (let i = 0; i < 8; i++) { const q = softSprite('rgba(170,220,255,1)', 0.5 - i * 0.05); q.scale.setScalar(0.9 - i * 0.07); g.add(q); tr.push(q); } g.userData.trail = tr; g.userData.flyer = true; g.scale.setScalar(s || 1); return g; };
function fly(o, path, u, step) { const p = path(u); o.position.copy(p); if (o.userData.flyer) { const n = path(u + 0.03); if (n.distanceToSquared(p) > 1e-6) o.lookAt(n); else o.rotation.set(0, 0, 0); }
  o.updateMatrixWorld(true); o.userData.trail.forEach((q, i) => { const v = path(u - (i + 1) * (step || 0.012)); if (o.userData.flyer) v.add(new T.Vector3().subVectors(p, path(u + 0.03)).setLength(0.9)); q.position.copy(o.worldToLocal(v)); }); }

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

/* ---- added for Forrest Gump (Nov 2026): everyday props + presets, reusable ---- */
const srnd = (seed) => { let rs = seed || 7; return () => ((rs = (rs * 16807) % 2147483647) / 2147483647); };
CF.busstop = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.05, 0.05, 2.6, 8), '#8a9098'), 0, 1.3, 0)); g.add(at3(mk(new T.BoxGeometry(0.72, 0.5, 0.06), '#2a6ab0'), 0, 2.45, 0));
  const lb = label('BUS', { px: 110, color: '#ffffff', w: 0.6 }); lb.position.set(0, 2.45, 0.06); g.add(lb); g.scale.setScalar(s || 1); return g; };
CF.pbench = (s, c) => { const g = new T.Group(), w = c || '#7a5a3a'; g.add(at3(mk(new T.BoxGeometry(3.6, 0.1, 0.7), w), 0, 0.5, 0), at3(mk(new T.BoxGeometry(3.6, 0.45, 0.08), w), 0, 0.95, -0.33));
  for (const x of [-1.65, 1.65]) g.add(at3(mk(new T.BoxGeometry(0.1, 0.5, 0.6), '#2a2a2e'), x, 0.25, 0)); g.scale.setScalar(s || 1); return g; };
CF.bike = (s, c) => { const g = new T.Group(), fc = c || '#d04a3a'; for (const z of [-0.5, 0.5]) { const w = mk(new T.TorusGeometry(0.3, 0.05, 6, 18), '#1e1e24'); w.rotation.y = Math.PI / 2; w.position.set(0, 0.33, z); g.add(w); }
  g.add(at3(mk(new T.BoxGeometry(0.07, 0.07, 1.0), fc), 0, 0.58, 0), at3(mk(new T.BoxGeometry(0.07, 0.42, 0.07), fc), 0, 0.42, -0.1), at3(mk(new T.BoxGeometry(0.22, 0.06, 0.3), '#1e1e24'), 0, 0.66, -0.15), at3(mk(new T.BoxGeometry(0.6, 0.05, 0.05), '#c0c4cc'), 0, 0.86, 0.45), at3(mk(new T.BoxGeometry(0.06, 0.32, 0.06), fc), 0, 0.7, 0.45));
  g.scale.setScalar(s || 1); return g; };
CF.sbus = (s, c) => { const g = new T.Group(), y = c || '#f2b81e'; g.add(at3(mk(new T.BoxGeometry(1.7, 1.5, 4.6), y), 0, 1.05, -0.3), at3(mk(new T.BoxGeometry(1.6, 0.75, 1.0), y), 0, 0.68, 2.45), at3(mk(new T.BoxGeometry(1.72, 0.1, 4.62), '#1e1e24'), 0, 0.72, -0.3));
  for (const sx of [-0.86, 0.86]) for (let i = 0; i < 5; i++) { const w = new T.Mesh(new T.PlaneGeometry(0.62, 0.48), basic('#2a3a4a')); w.position.set(sx * 1.003, 1.42, -2.2 + i * 0.85); w.rotation.y = sx > 0 ? Math.PI / 2 : -Math.PI / 2; g.add(w); }
  const ws = new T.Mesh(new T.PlaneGeometry(1.5, 0.6), basic('#2a3a4a')); ws.position.set(0, 1.42, 1.96); g.add(ws);
  for (const sx of [-0.8, 0.8]) for (const sz of [-1.8, 1.9]) g.add(at3(wheel(0.36, 0.26), sx, 0.36, sz)); for (const sx of [-0.5, 0.5]) g.add(at3(new T.Mesh(new T.SphereGeometry(0.1, 8, 6), basic('#fff2c0')), sx, 0.8, 2.96));
  g.scale.setScalar(s || 1); return g; };
CF.goal = (s) => { const g = new T.Group(), c = '#f2d24a'; g.add(at3(mk(new T.CylinderGeometry(0.08, 0.08, 1.6, 8), c), 0, 0.8, 0)); const cb = mk(new T.CylinderGeometry(0.07, 0.07, 2.6, 8), c); cb.rotation.z = Math.PI / 2; cb.position.y = 1.6; g.add(cb);
  for (const x of [-1.3, 1.3]) g.add(at3(mk(new T.CylinderGeometry(0.06, 0.06, 2.6, 8), c), x, 2.9, 0)); g.scale.setScalar(s || 1); return g; };
CF.rain = (s) => { const g = new T.Group(), m = basic('#d8e8ff', { transparent: true, opacity: 0.5 }), rnd = srnd(5); for (let i = 0; i < 180; i++) { const d = new T.Mesh(new T.BoxGeometry(0.025, 0.55, 0.025), m); d.position.set((rnd() - 0.5) * 18, rnd() * 9, (rnd() - 0.5) * 12 - 1); g.add(d); } g.userData.rain = true; g.scale.setScalar(s || 1); return g; };
const rainTick = (o, t) => { if (!o) return; o.children.forEach((d, i) => { d.position.y = 9 - ((t * 13 + i * 3.1) % 9); }); };
CF.pingpong = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.5, 0.06, 2.7), '#2a6a4a'), 0, 0.76, 0)); const ln = new T.Mesh(new T.PlaneGeometry(0.03, 2.7), basic('#ffffff')); ln.rotation.x = -Math.PI / 2; ln.position.y = 0.795; g.add(ln);
  g.add(at3(mk(new T.BoxGeometry(1.62, 0.16, 0.02), '#f4f4f4'), 0, 0.87, 0)); for (const x of [-0.65, 0.65]) for (const z of [-1.2, 1.2]) g.add(at3(mk(new T.BoxGeometry(0.06, 0.74, 0.06), '#2a2a2e'), x, 0.37, z)); g.scale.setScalar(s || 1); return g; };
CF.ball = (s, c) => { const m = new T.Mesh(new T.SphereGeometry(0.07, 10, 8), basic(c || '#ffffff')); m.scale.setScalar(s || 1); return m; };
CF.paddle = (s) => { const g = new T.Group(), h = mk(new T.CylinderGeometry(0.17, 0.17, 0.03, 16), '#c0302a'); h.rotation.x = Math.PI / 2; h.position.y = 0.2; g.add(h, at3(mk(new T.BoxGeometry(0.05, 0.18, 0.03), '#8a5a3a'), 0, 0.02, 0)); g.scale.setScalar(s || 1); return g; };
CF.sboat = (s, c) => { const g = new T.Group(), hc = c || '#f2f0ea'; g.add(at3(mk(new T.BoxGeometry(1.8, 0.8, 4.2), hc), 0, 0.4, 0), at3(mk(new T.BoxGeometry(1.84, 0.14, 4.24), '#2a6ab0'), 0, 0.65, 0), at3(mk(new T.BoxGeometry(1.2, 0.9, 1.0), '#f8f6f0'), 0, 1.25, 1.55), at3(mk(new T.BoxGeometry(1.0, 0.3, 0.05), '#2a3a4a'), 0, 1.45, 2.06));
  const bw = mk(new T.CylinderGeometry(0.02, 0.92, 1.0, 4), hc); bw.rotation.x = Math.PI / 2; bw.rotation.y = Math.PI / 4; bw.scale.set(1, 1, 0.42); bw.position.set(0, 0.4, 2.6); g.add(bw);
  g.add(at3(mk(new T.CylinderGeometry(0.06, 0.06, 3, 8), '#6a6a70'), 0, 2.2, 0.75)); const nets = [];
  for (const sx of [-1, 1]) { const b = mk(new T.CylinderGeometry(0.04, 0.04, 2.6, 6), '#6a6a70'); b.position.set(sx * 1.1, 2.3, 0.75); b.rotation.z = sx * -0.95; g.add(b); const n = mk(new T.SphereGeometry(0.3, 10, 8), '#c8cfb4', { flatShading: true }); n.scale.set(1, 1.4, 1); n.position.set(sx * 2.05, 2.15, 0.75); g.add(n); nets.push(n); }
  g.userData.nets = nets; g.scale.setScalar(s || 1); return g; };
CF.wchair = (s) => { const g = new T.Group(); for (const sx of [-0.48, 0.48]) { const w = mk(new T.TorusGeometry(0.42, 0.05, 6, 20), '#2a2a2e'); w.rotation.y = Math.PI / 2; w.position.set(sx, 0.45, -0.05); g.add(w); }
  g.add(at3(mk(new T.BoxGeometry(0.85, 0.08, 0.7), '#3a3a40'), 0, 0.55, 0), at3(mk(new T.BoxGeometry(0.85, 0.75, 0.08), '#3a3a40'), 0, 0.95, -0.36)); const bl = mk(new T.BoxGeometry(0.95, 0.3, 0.75), '#8a3a3a'); bl.position.set(0, 0.68, 0.22); g.add(bl); g.userData.blanket = bl; g.scale.setScalar(s || 1); return g; };
CF.choc = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.52, 0.08, 0.38), '#f2e6c8'), 0, 0.04, 0)); for (let i = 0; i < 6; i++) g.add(at3(mk(new T.SphereGeometry(0.06, 8, 6), '#5a3220'), -0.16 + (i % 3) * 0.16, 0.1, -0.08 + Math.floor(i / 3) * 0.16)); g.scale.setScalar(s || 1); return g; };
CF.medal = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.12, 0.22, 0.02), '#2a5ab0'), 0, 0.15, 0)); const d = mk(new T.CylinderGeometry(0.11, 0.11, 0.03, 14), P.gold, GOLDM); d.rotation.x = Math.PI / 2; g.add(d); const gl = softSprite('rgba(255,220,120,1)', 0.6); gl.scale.setScalar(0.55); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.shrimp = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.42, 0.34, 0.26, 14), '#a8814e'), 0, 0.13, 0)); const rnd = srnd(31); for (let i = 0; i < 9; i++) { const sh = new T.Group(); const b1 = mk(new T.SphereGeometry(0.08, 8, 6), '#ff8a5a'); b1.scale.set(1.6, 0.8, 0.8); const b2 = mk(new T.SphereGeometry(0.06, 8, 6), '#ff9a6a'); b2.position.set(0.12, -0.04, 0); sh.add(b1, b2); sh.position.set((rnd() - 0.5) * 0.55, 0.3 + rnd() * 0.12, (rnd() - 0.5) * 0.5); sh.rotation.y = rnd() * 6.3; g.add(sh); } g.scale.setScalar(s || 1); return g; };
CF.trash = (s) => { const g = new T.Group(); [['#6a7a8a', 0], ['#8a6a4a', 1], ['#5a8a5a', 2], ['#9a9aa0', 3]].forEach(([c, i]) => g.add(at3(mk(new T.BoxGeometry(0.2 + i * 0.04, 0.12, 0.16), c), (i - 1.5) * 0.22, 0.06 + (i % 2) * 0.08, (i % 2) * 0.1))); const tire = mk(new T.TorusGeometry(0.16, 0.06, 6, 12), '#1e1e24'); tire.rotation.x = Math.PI / 2; tire.position.set(0.1, 0.2, -0.1); g.add(tire); g.scale.setScalar(s || 1); return g; };
CF.cake = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.4, 0.4, 0.3, 16), '#f8f2ea'), 0, 0.15, 0), at3(mk(new T.CylinderGeometry(0.28, 0.28, 0.24, 16), '#f8f2ea'), 0, 0.42, 0)); for (let i = 0; i < 8; i++) g.add(at3(new T.Mesh(new T.SphereGeometry(0.04, 6, 4), basic('#ff9ab8')), Math.sin(i * 0.785) * 0.38, 0.3, Math.cos(i * 0.785) * 0.38)); g.scale.setScalar(s || 1); return g; };
CF.arch = (s) => { const g = new T.Group(), c = '#f6f2ea'; for (const x of [-1.2, 1.2]) g.add(at3(mk(new T.CylinderGeometry(0.06, 0.06, 2.4, 8), c), x, 1.2, 0)); const a = mk(new T.TorusGeometry(1.2, 0.07, 6, 20, Math.PI), c); a.position.y = 2.4; g.add(a);
  for (let i = 0; i < 10; i++) { const f = new T.Mesh(new T.SphereGeometry(0.11, 6, 4), basic(['#ffffff', '#ffb0c8', '#ffe08a'][i % 3])); const k = i / 9 * Math.PI; f.position.set(Math.cos(k) * 1.2, 2.4 + Math.sin(k) * 1.2, 0.05); g.add(f); } g.scale.setScalar(s || 1); return g; };
CF.mailbox = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.08, 1.0, 0.08), '#5a4a3a'), 0, 0.5, 0)); const b = mk(new T.CylinderGeometry(0.18, 0.18, 0.5, 12, 1, false, 0, Math.PI), '#4a6aa0'); b.rotation.z = Math.PI / 2; b.rotation.y = Math.PI / 2; b.position.set(0, 1.0, 0); g.add(b, at3(mk(new T.BoxGeometry(0.36, 0.06, 0.5), '#4a6aa0'), 0, 1.0, 0), at3(mk(new T.BoxGeometry(0.03, 0.2, 0.08), '#d04a3a'), 0.19, 1.15, 0.1)); g.scale.setScalar(s || 1); return g; };
/* leg braces for a figure (kid build): silver side bars + rings; c.userData.braces; burst pieces CF.bits + burstTick */
const braces = (c) => { const g = new T.Group(), m = '#e6eaf2'; for (const s of [-1, 1]) { g.add(at3(mk(new T.BoxGeometry(0.05, 0.5, 0.05), m), s * 0.37, 0.22, 0.05)); g.add(at3(mk(new T.BoxGeometry(0.05, 0.42, 0.05), m), s * 0.06, 0.18, 0.17));
  for (const y of [0.06, 0.24]) { const r = mk(new T.TorusGeometry(0.17, 0.03, 6, 14), m); r.rotation.x = Math.PI / 2; r.position.set(s * 0.19, y, 0.05); g.add(r); } } c.add(g); c.userData.braces = g; return c; };
CF.bits = (s) => { const g = new T.Group(), rnd = srnd(19); for (let i = 0; i < 14; i++) { const b = mk(new T.BoxGeometry(0.05, 0.22 + rnd() * 0.15, 0.05), '#e6eaf2'); b.userData.v = [(rnd() - 0.5) * 3.2, 1.6 + rnd() * 2.2, (rnd() - 0.2) * 2.4, rnd() * 9]; g.add(b); } g.scale.setScalar(s || 1); return g; };
const burstTick = (o, u) => { const k = Math.max(0, u); o.children.forEach((b) => { const v = b.userData.v; b.position.set(v[0] * k, Math.max(0.03, 0.3 + v[1] * k - 4.9 * k * k), v[2] * k); b.rotation.set(v[3] * k, v[3] * k * 0.7, 0); }); };
Object.assign(ENVB, {
  town(st, o) { const out = [terrain(st, o.g1 || '#7aa84e', o.g2 || '#4f7a3a', { hill: 4, seed: o.seed || 81, flat: 14 }), ranges(st, [[38, '#5a8a6a', 5, 10, 12, 2.6]], { seed: (o.seed || 81) + 1 })];
    if (o.road !== false) { const rd = mk(new T.BoxGeometry(70, 0.06, 2.6), '#6a6a70'); place(rd, st, 0, 0.03, o.road != null ? o.road : 2.6); out.push(rd); }
    if (o.house !== false) { const hx = o.hx != null ? o.hx : -2.6; out.push(...decor(st, [[CF.house(1.7, '#f2eee4'), hx, 0, -5.2], [CF.house(1.0, '#c8b49a'), hx + 9, 0, -6.2, -0.2], [CF.house(0.9, '#b8c8d8'), hx - 8, 0, -6.0, 0.3]])); }
    const rnd = srnd(o.seed || 83); for (let i = 0; i < (o.trees || 10); i++) { const x = -14 + i * 3.1 + rnd(), z = -3 - rnd() * 6; if (Math.abs(x - (o.hx != null ? o.hx : -2.6)) < 2.6) continue; const tr = tree(1.2 + rnd() * 0.8, ['#4f8f5a', '#3f7a4a', '#5f9a52'][i % 3]); place(tr, st, x, 0, z); out.push(tr); }
    return out; },
  stadium(st, o) { const out = []; const fl = mk(new T.BoxGeometry(44, 0.2, 30), '#4f9a4a'); place(fl, st, 0, -0.1, -4); out.push(fl);
    for (let i = -5; i <= 5; i++) { const ln = new T.Mesh(new T.PlaneGeometry(0.14, 22), basic('#f4f4f0')); ln.rotation.x = -Math.PI / 2; place(ln, st, i * 3.6, 0.02, -2); out.push(ln); }
    for (let r = 0; r < 4; r++) { const b = mk(new T.BoxGeometry(46, 0.8, 1.6), '#6a7080'); place(b, st, 0, 0.4 + r * 0.8, -14 - r * 1.6); out.push(b);
      for (let i = 0; i < 30; i++) { const p = new T.Mesh(new T.SphereGeometry(0.3, 8, 6), basic(['#e05a4a', '#f2c24a', '#4a8ad0', '#f4f4f4', '#8a5ab0'][(i * 7 + r * 3) % 5])); place(p, st, -21 + i * 1.45 + (r % 2) * 0.7, 1.15 + r * 0.8, -13.7 - r * 1.6); out.push(p); } }
    for (const x of [-19, 19]) { const gp = CF.goal(1.3); place(gp, st, x, 0, -2); gp.rotation.y = Math.PI / 2; out.push(gp); } return out; },
  highway(st, o) { const out = [terrain(st, o.g1 || '#c8a46a', o.g2 || '#9a7a4a', { hill: 4, seed: o.seed || 95, flat: 14 }), ranges(st, [[34, o.r1 || '#b07a52', 6, 12, 12, 2.6], [48, o.r2 || '#8a5a44', 10, 16, 9, 2.8]], { seed: (o.seed || 95) + 1 })];
    const rd = mk(new T.BoxGeometry(90, 0.06, 3.2), '#4a4a52'); place(rd, st, 0, 0.03, 0); out.push(rd); for (let i = 0; i < 24; i++) { const d = new T.Mesh(new T.PlaneGeometry(1.4, 0.14), basic('#f2d24a')); d.rotation.x = -Math.PI / 2; place(d, st, -44 + i * 4, 0.07, 0); out.push(d); }
    if (o.trees) { const rnd = srnd(97); for (let i = 0; i < o.trees; i++) { const tr = tree(1.1 + rnd(), '#4f7a42'); place(tr, st, -20 + i * 4 + rnd() * 2, 0, -4 - rnd() * 5); out.push(tr); } } return out; },
});
CF.wave = (s, c) => { const g = new T.Group(); const w = mk(new T.CylinderGeometry(3, 3, 30, 28, 1, false, 0, Math.PI), c || '#2a6aa8', { emissive: new T.Color('#123a6a'), emissiveIntensity: 0.3 }); w.rotation.z = Math.PI / 2; w.rotation.x = -Math.PI / 2; g.add(w);
  for (let i = 0; i < 26; i++) { const f = softSprite('rgba(240,250,255,1)', 0.8); f.scale.setScalar(1.6 + (i % 3) * 0.5); f.position.set(-14 + i * 1.12, 3.0, Math.sin(i * 1.7) * 0.4); g.add(f); } g.scale.setScalar(s || 1); return g; };

/* ---- added for Interstellar (Nov 2026): farm, space and sci-fi props + presets, reusable. Generic shapes only (no film ship/robot designs). ---- */
const glass = (c, op) => new T.MeshStandardMaterial({ color: c || '#dff2ff', transparent: true, opacity: op == null ? 0.2 : op, roughness: 0.05, metalness: 0.1, depthWrite: false });
/* bubble helmet for a vinyl figure (generic astronaut): c.userData.helm */
const helm = (c) => { const h = new T.Group(); const b = new T.Mesh(new T.SphereGeometry(0.98, 28, 20), glass('#dff2ff', 0.16)); b.position.y = 0.02; h.add(b); const ring = mk(new T.TorusGeometry(0.62, 0.08, 8, 24), '#d8dce4'); ring.rotation.x = Math.PI / 2; ring.position.y = -0.72; h.add(ring);
  c.userData.head.add(h); c.userData.helm = h; return c; };
CF.corn = (s, n, rows) => { const g = new T.Group(), rnd = srnd(41), stM = M('#6a9a3a', { flatShading: true }), lfM = M('#88b84a', { flatShading: true }), cbM = M('#f2c84a');
  for (let r = 0; r < (rows || 4); r++) for (let i = 0; i < (n || 14); i++) { const h = 1.5 + rnd() * 0.5, x = -((n || 14) - 1) * 0.35 + i * 0.7 + (rnd() - 0.5) * 0.2, z = -r * 0.8;
    const st = new T.Mesh(new T.CylinderGeometry(0.035, 0.05, h, 5), stM); st.position.set(x, h / 2, z); g.add(st);
    for (const sd of [-1, 1]) { const lf = new T.Mesh(new T.BoxGeometry(0.5, 0.03, 0.1), lfM); lf.position.set(x + sd * 0.2, h * (0.45 + rnd() * 0.3), z); lf.rotation.z = sd * 0.5; g.add(lf); }
    if (i % 2 === 0) { const cb = new T.Mesh(new T.CylinderGeometry(0.06, 0.05, 0.28, 6), cbM); cb.position.set(x + 0.08, h * 0.6, z + 0.04); cb.rotation.z = -0.3; g.add(cb); } }
  g.scale.setScalar(s || 1); return g; };
CF.drone = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.5, 0.18, 1.1), '#c8ccd4'), 0, 0, 0), at3(mk(new T.BoxGeometry(5.2, 0.05, 0.6), '#3a4a6a'), 0, 0.08, 0), at3(mk(new T.BoxGeometry(1.2, 0.04, 0.3), '#c8ccd4'), 0, 0.05, -0.75));
  for (let i = 0; i < 6; i++) g.add(at3(new T.Mesh(new T.BoxGeometry(0.7, 0.012, 0.5), basic('#4a6aa8')), -2.1 + i * 0.84, 0.115, 0)); const l = softSprite('rgba(255,90,90,1)', 0.9); l.scale.setScalar(0.4); l.position.set(0, -0.12, 0.5); g.add(l); g.userData.blink = l; g.scale.setScalar(s || 1); return g; };
/* bookshelf with loose books (userData.books) that can drop */
CF.shelf = (s, c) => { const g = new T.Group(), w = c || '#8a6040'; g.add(at3(mk(new T.BoxGeometry(2.2, 3.2, 0.1), '#6a4630'), 0, 1.6, -0.25)); for (const x of [-1.1, 1.1]) g.add(at3(mk(new T.BoxGeometry(0.1, 3.2, 0.6), w), x, 1.6, 0));
  for (const y of [0.05, 1.0, 1.95, 2.9]) g.add(at3(mk(new T.BoxGeometry(2.2, 0.08, 0.6), w), 0, y, 0)); const books = [], rnd = srnd(53), cols = ['#c04a3a', '#3a6ab0', '#e0b030', '#4a8a5a', '#8a5ab0', '#e07a4a'];
  for (const y of [0.09, 1.04, 1.99]) for (let i = 0; i < 9; i++) { const h = 0.5 + rnd() * 0.3, b = mk(new T.BoxGeometry(0.17, h, 0.42), cols[(i + Math.round(y)) % 6]); b.position.set(-0.85 + i * 0.21, y + h / 2, 0.02); g.add(b); books.push(b); b.userData.p0 = b.position.clone(); }
  g.userData.books = books; g.scale.setScalar(s || 1); return g; };
/* drop book i of a shelf at time r (r0 start): slides out and falls to the floor in front */
const dropBook = (sh, i, r, r0) => { const b = sh.userData.books[i], k = U.clamp((r - r0) / 0.55); b.position.copy(b.userData.p0); if (k <= 0) { b.rotation.set(0, 0, 0); return; } b.position.z += 0.25 + k * 0.9; b.position.y = Math.max(0.12, b.userData.p0.y - 4.9 * k * k * 0.9); b.rotation.set(k * 1.5, 0, k * 0.4); };
/* dust stripes on a floor (userData.lines), revealed with dustTick(o, k) */
CF.dust = (s) => { const g = new T.Group(), m = basic('#c8a070', { transparent: true, opacity: 0.85 }); const lines = []; for (let i = 0; i < 11; i++) { const w = i % 3 === 1 ? 0.12 : 0.28; const b = new T.Mesh(new T.BoxGeometry(w, 0.02, 3.0), m); b.position.set(-2 + i * 0.4, 0.02, 0); g.add(b); lines.push(b); } g.userData.lines = lines; g.scale.setScalar(s || 1); return g; };
const dustTick = (o, k) => o.userData.lines.forEach((l, i) => { const q = U.clamp(k * 11 - i); l.scale.set(1, 1, Math.max(0.001, q)); l.visible = q > 0.01; });
CF.watch = (s) => { const g = new T.Group(); const c = mk(new T.CylinderGeometry(0.5, 0.5, 0.12, 28), P.gold, GOLDM); c.rotation.x = Math.PI / 2; g.add(c); const f = new T.Mesh(new T.CircleGeometry(0.43, 28), basic('#fbf6ea')); f.position.z = 0.065; g.add(f);
  for (let i = 0; i < 12; i++) { const tk = new T.Mesh(new T.BoxGeometry(0.03, 0.08, 0.01), basic('#3a3030')); const a = i / 12 * Math.PI * 2; tk.position.set(Math.sin(a) * 0.36, Math.cos(a) * 0.36, 0.07); tk.rotation.z = -a; g.add(tk); }
  const hand = new T.Group(); hand.position.z = 0.075; const hm = new T.Mesh(new T.BoxGeometry(0.025, 0.36, 0.01), basic('#c03030')); hm.position.y = 0.16; hand.add(hm); g.add(hand); g.userData.hand = hand;
  for (const y of [0.75, -0.75]) g.add(at3(mk(new T.BoxGeometry(0.34, 0.6, 0.06), '#5a3a2a'), 0, y, -0.02)); g.scale.setScalar(s || 1); return g; };
CF.board = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(4.2, 2.4, 0.08), '#2a3a34'), 0, 2.3, 0), at3(mk(new T.BoxGeometry(4.4, 0.1, 0.2), '#7a5a3a'), 0, 1.08, 0.05)); const rnd = srnd(61), m = basic('#e8ece4');
  for (let i = 0; i < 22; i++) { const b = new T.Mesh(new T.BoxGeometry(0.25 + rnd() * 0.7, 0.04, 0.01), m); b.position.set(-1.7 + rnd() * 3.2, 1.4 + rnd() * 1.8, 0.05); b.rotation.z = (rnd() - 0.5) * 0.3; g.add(b); } g.scale.setScalar(s || 1); return g; };
/* paper fold: two halves, right half hinged at x=0 (userData.hinge: rotation.z 0 → ~π folds it over), dots A/B, pencil (userData.pencil) */
CF.fold = (s) => { const g = new T.Group(), pm = M('#f6f2e6', { side: T.DoubleSide }); g.add(at3(new T.Mesh(new T.BoxGeometry(1.4, 0.03, 1.2), pm), -0.7, 0, 0)); const h = new T.Group(); g.add(h); h.add(at3(new T.Mesh(new T.BoxGeometry(1.4, 0.03, 1.2), pm), 0.7, 0, 0));
  const dA = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.04, 14), basic('#e04a3a')); dA.position.set(-1.1, 0.02, 0); g.add(dA); const dB = new T.Mesh(new T.CylinderGeometry(0.1, 0.1, 0.04, 14), basic('#3a7ae0')); dB.position.set(1.1, 0.02, 0); h.add(dB);
  const p = new T.Group(); p.add(at3(mk(new T.CylinderGeometry(0.05, 0.05, 1.4, 8), '#f2c24a'), 0, 0, 0)); const tip = mk(new T.ConeGeometry(0.05, 0.16, 8), '#3a3030'); tip.rotation.x = Math.PI; tip.position.y = -0.78; p.add(tip); p.position.set(-1.1, 1.6, 0); g.add(p);
  g.userData.hinge = h; g.userData.pencil = p; g.scale.setScalar(s || 1); return g; };
CF.rocket = (s, c) => { const g = new T.Group(), w = c || '#f2f2f0'; g.add(at3(mk(new T.CylinderGeometry(0.55, 0.6, 6.0, 18), w), 0, 3.4, 0)); const n = mk(new T.ConeGeometry(0.55, 1.5, 18), w); n.position.y = 7.15; g.add(n);
  g.add(at3(mk(new T.CylinderGeometry(0.57, 0.57, 0.25, 18), '#2a2e38'), 0, 5.6, 0), at3(mk(new T.CylinderGeometry(0.57, 0.57, 0.18, 18), '#c04a3a'), 0, 1.6, 0));
  for (const sx of [-1, 1]) { g.add(at3(mk(new T.CylinderGeometry(0.28, 0.3, 3.6, 12), '#e6e6e2'), sx * 0.85, 2.0, 0)); const bn = mk(new T.ConeGeometry(0.28, 0.6, 12), '#e6e6e2'); bn.position.set(sx * 0.85, 4.1, 0); g.add(bn); }
  for (let i = 0; i < 4; i++) { const f = mk(new T.BoxGeometry(0.05, 0.9, 0.7), '#5a6070'); const a = i * Math.PI / 2 + Math.PI / 4; f.position.set(Math.sin(a) * 0.62, 0.75, Math.cos(a) * 0.62); f.rotation.y = a; g.add(f); }
  const fl = new T.Group(); const f1 = softSprite('rgba(255,170,70,1)', 1); f1.scale.set(2.2, 3.6, 1); f1.position.y = -1.2; const f2 = softSprite('rgba(255,250,220,1)', 1); f2.scale.set(1.0, 1.8, 1); f2.position.y = -0.5; fl.add(f1, f2); fl.position.y = 0.2; g.add(fl); g.userData.flame = fl;
  g.scale.setScalar(s || 1); return g; };
/* generic capsule spaceship (long body, side modules, solar panels, engine glow); NOT a ring ship */
CF.ship = (s) => { const g = new T.Group(), w = '#eceae4'; const b = mk(new T.CylinderGeometry(0.5, 0.5, 4.4, 16), w); b.rotation.z = Math.PI / 2; g.add(b); const nose = mk(new T.SphereGeometry(0.5, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), w); nose.rotation.z = -Math.PI / 2; nose.position.x = 2.2; g.add(nose);
  g.add(at3(new T.Mesh(new T.BoxGeometry(0.3, 0.22, 0.02), basic('#2a3a5a')), 2.35, 0.18, 0.47)); for (const x of [-1.2, 0.2]) g.add(at3(mk(new T.BoxGeometry(0.9, 0.7, 1.3), '#c8ccd4'), x, 0, 0));
  for (const sz of [-1, 1]) { const pnl = mk(new T.BoxGeometry(1.2, 0.04, 2.2), '#2a4a8a'); pnl.position.set(-0.4, 0, sz * 1.9); g.add(pnl); for (let i = 0; i < 3; i++) g.add(at3(new T.Mesh(new T.BoxGeometry(1.1, 0.045, 0.02), basic('#8ab0e0')), -0.4, 0, sz * (1.1 + i * 0.6))); g.add(at3(mk(new T.BoxGeometry(0.1, 0.1, 0.8), '#8a8e96'), -0.4, 0, sz * 0.75)); }
  const en = mk(new T.CylinderGeometry(0.42, 0.55, 0.5, 14), '#6a6e78'); en.rotation.z = Math.PI / 2; en.position.x = -2.45; g.add(en); const gl = softSprite('rgba(140,200,255,1)', 0.95); gl.scale.setScalar(1.4); gl.position.x = -2.9; g.add(gl); g.userData.glow = gl;
  g.scale.setScalar(s || 1); return g; };
/* small lander / shuttle (wedge body), nose +x */
CF.lander = (s, c) => { const g = new T.Group(), w = c || '#e6e4dc'; const b = mk(new T.BoxGeometry(2.0, 0.55, 1.1), w); g.add(b); const n = mk(new T.CylinderGeometry(0.02, 0.62, 0.9, 4), w); n.rotation.z = -Math.PI / 2; n.rotation.x = Math.PI / 4; n.scale.set(1, 1, 0.75); n.position.x = 1.42; g.add(n);
  g.add(at3(new T.Mesh(new T.BoxGeometry(0.5, 0.2, 0.9), basic('#22303c')), 0.95, 0.22, 0)); for (const sz of [-1, 1]) { const wg = mk(new T.BoxGeometry(1.0, 0.06, 0.7), '#b8bcc4'); wg.position.set(-0.4, -0.1, sz * 0.85); g.add(wg); }
  g.add(at3(mk(new T.BoxGeometry(0.2, 0.5, 0.8), '#8a8e96'), -1.05, 0, 0)); const gl = softSprite('rgba(140,200,255,1)', 0.9); gl.scale.setScalar(1.0); gl.position.x = -1.4; g.add(gl); g.userData.glow = gl; g.scale.setScalar(s || 1); return g; };
CF.wormhole = (s) => { const g = new T.Group(); const a = softSprite('rgba(150,180,255,1)', 0.9); a.scale.setScalar(5.2); const sp = new T.Mesh(new T.SphereGeometry(1.4, 32, 24), new T.MeshStandardMaterial({ color: '#9ab8ff', emissive: new T.Color('#3a4a9a'), emissiveIntensity: 0.6, transparent: true, opacity: 0.55, roughness: 0.05, metalness: 0.6 }));
  const c = softSprite('rgba(255,255,255,1)', 0.8); c.scale.setScalar(1.6); g.add(a, sp, c); const rnd = srnd(71); for (let i = 0; i < 14; i++) { const st = softSprite('rgba(255,240,220,1)', 0.9); st.scale.setScalar(0.18); st.position.set((rnd() - 0.5) * 1.8, (rnd() - 0.5) * 1.8, 1.1); g.add(st); }
  g.userData.sp = sp; g.scale.setScalar(s || 1); return g; };
/* black hole: black sphere + flat glowing disk (no lensed arc) */
CF.bhole = (s) => { const g = new T.Group(); const gl = softSprite('rgba(255,180,90,1)', 0.7); gl.scale.setScalar(9); g.add(gl); g.add(new T.Mesh(new T.SphereGeometry(1.3, 32, 24), basic('#000000')));
  const d1 = new T.Mesh(new T.RingGeometry(1.6, 3.0, 48), basic('#ffd27a', { side: T.DoubleSide, transparent: true, opacity: 0.95 })); const d2 = new T.Mesh(new T.RingGeometry(3.0, 4.4, 48), basic('#ff8a3a', { side: T.DoubleSide, transparent: true, opacity: 0.6 }));
  const disk = new T.Group(); disk.add(d1, d2); disk.rotation.x = -Math.PI / 2 + 0.22; g.add(disk); g.userData.disk = disk; g.scale.setScalar(s || 1); return g; };
CF.planet = (s, c, ring) => { const g = new T.Group(); g.add(mk(new T.IcosahedronGeometry(1, 2), c || '#c8a46a', { flatShading: true })); if (ring) { const r = new T.Mesh(new T.RingGeometry(1.4, 2.2, 40), basic(ring, { side: T.DoubleSide, transparent: true, opacity: 0.75 })); r.rotation.x = -Math.PI / 2 + 0.35; g.add(r); } g.scale.setScalar(s || 1); return g; };
/* talking helper robot shown only as a glowing orb (no robot body design) */
CF.bot = (s) => { const g = orb('rgba(110,200,255,1)'); const ring = new T.Mesh(new T.TorusGeometry(0.3, 0.025, 6, 24), basic('#bfe8ff')); g.add(ring); g.userData.ring = ring; g.scale.setScalar(s || 1); return g; };
CF.cryo = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(1.2, 0.5, 2.6), '#b8c0cc'), 0, 0.25, 0)); const lid = new T.Group(); lid.position.set(-0.6, 0.5, 0); const gm = new T.Mesh(new T.CylinderGeometry(0.6, 0.6, 2.5, 16, 1, true, 0, Math.PI), glass('#cfeaff', 0.35)); gm.rotation.x = Math.PI / 2; gm.rotation.y = Math.PI / 2; gm.position.x = 0.6; lid.add(gm); g.add(lid);
  const fog = softSprite('rgba(220,240,255,1)', 0.6); fog.scale.set(2.2, 1.0, 1); fog.position.y = 0.8; g.add(fog); g.userData.lid = lid; g.userData.fog = fog; g.scale.setScalar(s || 1); return g; };
CF.tent = (s, c) => { const g = new T.Group(); const t = mk(new T.ConeGeometry(1.3, 1.6, 4), c || '#e07a3a', { flatShading: true }); t.position.y = 0.8; t.rotation.y = Math.PI / 4; g.add(t); g.add(at3(new T.Mesh(new T.PlaneGeometry(0.5, 0.7), basic('#3a2a20')), 0, 0.36, 0.66)); g.scale.setScalar(s || 1); return g; };
CF.wreck = (s) => { const g = new T.Group(), rnd = srnd(77); for (let i = 0; i < 7; i++) { const b = mk(new T.BoxGeometry(0.3 + rnd() * 0.9, 0.15 + rnd() * 0.4, 0.3 + rnd() * 0.8), ['#c8ccd4', '#8a8e96', '#6a6e78'][i % 3], { flatShading: true }); b.position.set((rnd() - 0.5) * 2.4, 0.1, (rnd() - 0.5) * 1.6); b.rotation.set(rnd(), rnd() * 3, rnd() * 0.5); g.add(b); }
  const bc = softSprite('rgba(255,90,90,1)', 0.9); bc.scale.setScalar(0.6); bc.position.set(0.3, 0.6, 0.2); g.add(bc); g.userData.beacon = bc; g.scale.setScalar(s || 1); return g; };
const bigWave = (o, k, x0, x1) => { o.scale.set(1, Math.max(0.05, k), 1); }; // grow a CF.wave in height
Object.assign(ENVB, {
  farm(st, o) { const out = [terrain(st, o.g1 || '#c8a86a', o.g2 || '#9a7a4a', { hill: 3, seed: o.seed || 101, flat: 16 }), ranges(st, [[40, '#a8885a', 3, 7, 12, 2.6]], { seed: 102 })];
    if (o.house !== false) out.push(...decor(st, [[CF.house(1.8, '#e8e0d0'), o.hx != null ? o.hx : -4.2, 0, -6.4]]));
    for (const [x, z, n, rows] of (o.corn || [[6.5, -3.4, 12, 5], [-12, -3.6, 8, 4], [0, -10.5, 30, 3]])) out.push(...decor(st, [[CF.corn(1, n, rows), x, 0, z]])); return out; },
  ocean(st, o) { const out = []; const fl = mk(new T.PlaneGeometry(120, 120), o.sand || '#8a7a5a'); fl.rotation.x = -Math.PI / 2; place(fl, st, 0, -0.12, -20); out.push(fl);
    const wt = new T.Mesh(new T.PlaneGeometry(120, 120), new T.MeshLambertMaterial({ color: o.water || '#2a6a9a', transparent: true, opacity: 0.75 })); wt.rotation.x = -Math.PI / 2; place(wt, st, 0, 0.06, -20); out.push(wt); return out; },
  ice(st, o) { const out = [terrain(st, '#dce6f0', '#a8bcd4', { hill: 6, seed: o.seed || 111, flat: 11 }), ranges(st, [[34, '#d8e4f0', 6, 12, 12, 2.6], [46, '#b0c4dc', 10, 18, 9, 2.8]], { seed: 112, snow: true })];
    const rnd = srnd(113); for (let i = 0; i < 7; i++) { const sl = mk(new T.BoxGeometry(5 + rnd() * 6, 0.5, 3 + rnd() * 3), '#f4f8fc', { flatShading: true }); place(sl, st, -20 + i * 7, 9 + rnd() * 4, -16 - rnd() * 10); sl.rotation.set(rnd() * 0.2, rnd(), 0); out.push(sl); }
    for (let i = 0; i < 6; i++) { const r = mk(new T.DodecahedronGeometry(0.6 + rnd() * 0.8, 0), '#cfe0f0', { flatShading: true }); place(r, st, -7 + i * 2.8, 0.2, -3 - rnd() * 3); out.push(r); } return out; },
  space(st, o) { const out = [], rnd = srnd(o.seed || 121); for (let i = 0; i < 70; i++) { const p = softSprite(['rgba(255,255,255,1)', 'rgba(190,210,255,1)', 'rgba(255,230,200,1)'][i % 3], 0.5 + rnd() * 0.5); p.scale.setScalar(0.15 + rnd() * 0.35); place(p, st, (rnd() - 0.5) * 70, -12 + rnd() * 40, -12 - rnd() * 30); out.push(p); }
    for (let i = 0; i < 3; i++) { const n = softSprite(['rgba(120,90,200,1)', 'rgba(70,120,200,1)', 'rgba(200,90,140,1)'][i], 0.25); n.scale.setScalar(26); place(n, st, -18 + i * 18, 6 + i * 3, -38); out.push(n); } return out; },
  tess(st, o) { const out = [], gm = basic('#ffcf86', { transparent: true, opacity: 0.55 }), gm2 = basic('#9ab8ff', { transparent: true, opacity: 0.35 });
    for (let i = -4; i <= 4; i++) for (let j = 0; j < 5; j++) { const b = new T.Mesh(new T.BoxGeometry(0.06, 0.06, 40), j % 2 ? gm2 : gm); place(b, st, i * 2.2, j * 2.0, -12); out.push(b); }
    for (let k = 0; k < 8; k++) for (let j = 0; j < 5; j++) { const b = new T.Mesh(new T.BoxGeometry(22, 0.05, 0.05), gm); place(b, st, 0, j * 2.0, -2 - k * 3.2); out.push(b); }
    for (let k = 0; k < 8; k++) for (let i = -4; i <= 4; i += 2) { const b = new T.Mesh(new T.BoxGeometry(0.05, 10, 0.05), gm2); place(b, st, i * 2.2, 4, -2 - k * 3.2); out.push(b); }
    for (let k = 1; k < 5; k++) for (const x of [-6.6, 6.6]) { const sh = CF.shelf(0.9); place(sh, st, x, 0, -2 - k * 4); sh.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2; out.push(sh); } return out; },
  /* inside a cylinder space station: ground curving up overhead */
  station(st, o) { const out = [terrain(st, '#7aa84e', '#5a8a3e', { hill: 0.6, seed: 131, flat: 30 })]; const cyl = new T.Mesh(new T.CylinderGeometry(42, 42, 160, 48, 1, true), new T.MeshLambertMaterial({ color: '#6a9a5a', side: T.BackSide }));
    cyl.rotation.z = Math.PI / 2; place(cyl, st, 0, 41.6, -10); out.push(cyl); const rnd = srnd(133);
    for (let i = 0; i < 26; i++) { const a = -0.55 + rnd() * 1.1 + (i % 2 ? Math.PI : 0) * 0, ang = 0.7 + rnd() * 1.9, h = CF.house(1.6 + rnd(), ['#e8e0d0', '#c8b49a', '#b8c8d8', '#d8a890'][i % 4]); const R = 41.4;
      h.position.set(ST[st][0] - 30 + i * 2.4, ST[st][1] + 41.6 - Math.cos(ang) * R, ST[st][2] - 10 - Math.sin(ang) * R); h.rotation.x = ang; out.push(h); }
    out.push(...decor(st, [[CF.house(1.6, '#e8e0d0'), -6, 0, -6], [CF.house(1.4, '#c8b49a'), 5.5, 0, -7]])); for (let i = 0; i < 6; i++) { const tr = tree(1.2 + rnd() * 0.6, '#4f8f5a'); place(tr, st, -9 + i * 3.6, 0, -9 - rnd() * 3); out.push(tr); } return out; },
});
/* big plain floor under a room set so a far camera never sees past the room's front edge */
ENVB.floor = (st, o) => { const f = mk(new T.PlaneGeometry(o.w || 80, o.d || 80), o.c || '#3a3e48'); f.rotation.x = -Math.PI / 2; place(f, st, 0, -0.04, 0); return [f]; };
/* calmer wave: smaller, fainter foam (CF.wave foam blobs blow out when the wave is near the camera) */
CF.wave2 = (s, c) => { const g = CF.wave(s, c); g.children.slice(1).forEach((f) => { f.scale.multiplyScalar(0.4); if (f.material) f.material.opacity = 0.55; }); return g; };
/* standing wall of water (a "mountain" that turns out to be a wave): userData.setH(h) sets its height */
CF.wavewall = (s, c) => { const g = new T.Group(); const geo = new T.BoxGeometry(70, 1, 3); geo.translate(0, 0.5, 0); const body = mk(geo, c || '#2a78b4', { emissive: new T.Color('#0e3a66'), emissiveIntensity: 0.25 }); g.add(body);
  const crest = new T.Group(); const lip = mk(new T.CylinderGeometry(1.6, 1.6, 70, 16, 1, false, 0, Math.PI), c || '#3a8ac8'); lip.rotation.z = Math.PI / 2; crest.add(lip);
  const foam = mk(new T.BoxGeometry(70, 0.35, 1.2), '#eef6ff'); foam.position.set(0, 1.5, 0.6); crest.add(foam); g.add(crest);
  g.userData.setH = (h) => { body.scale.y = Math.max(0.01, h); crest.position.y = h - 0.2; }; g.userData.setH(4); g.scale.setScalar(s || 1); return g; };
/* ---- added for John Wick 1-4 (Nov 2026): animals, action props, street/stairs/dock presets + room extras, reusable ---- */
/* dog: o = { c body, w chest/muzzle, e ears, saddle (back patch), m muzzle, prick (pointed ears), collar, vest } ; userData.legs (walk), tail (wag) */
CF.dog = (s, o) => { o = o || {}; const g = new T.Group(), c = o.c || '#c8894a', w = o.w || '#f4efe6', e = o.e || '#7a4a2a';
  const body = mk(new T.SphereGeometry(0.42, 14, 10), c); body.scale.set(0.8, 0.72, 1.3); body.position.y = 0.62; g.add(body);
  if (o.saddle) { const sd = mk(new T.SphereGeometry(0.43, 14, 10, 0, 6.3, 0, 1.15), o.saddle); sd.scale.set(0.82, 0.74, 1.12); sd.position.set(0, 0.64, -0.06); g.add(sd); }
  if (o.vest) { const v = mk(new T.CylinderGeometry(0.36, 0.36, 0.5, 12, 1, true, 0, Math.PI * 1.2), o.vest); v.rotation.x = Math.PI / 2; v.rotation.y = Math.PI; v.rotation.z = -Math.PI * 0.6 + Math.PI; v.position.set(0, 0.66, 0); v.scale.set(1, 1, 1); g.add(v); }
  const ch = mk(new T.SphereGeometry(0.28, 10, 8), w); ch.scale.set(0.9, 1, 0.8); ch.position.set(0, 0.56, 0.34); g.add(ch);
  const hg = new T.Group(); hg.position.set(0, 1.0, 0.52); g.add(hg);
  hg.add(mk(new T.SphereGeometry(0.34, 14, 10), c)); const mz = mk(new T.SphereGeometry(0.18, 10, 8), o.m || w); mz.scale.set(1, 0.8, 1.15); mz.position.set(0, -0.09, 0.27); hg.add(mz);
  hg.add(at3(mk(new T.SphereGeometry(0.065, 8, 6), '#1e1a1a'), 0, -0.03, 0.47));
  for (const sx of [-1, 1]) { const ey = mk(new T.SphereGeometry(0.06, 8, 6), '#1a1414'); ey.position.set(sx * 0.13, 0.08, 0.28); hg.add(ey); hg.add(at3(new T.Mesh(new T.SphereGeometry(0.02, 6, 4), basic('#ffffff')), sx * 0.13 + 0.02, 0.11, 0.335));
    if (o.prick) { const ea = mk(new T.ConeGeometry(0.11, 0.28, 6), e); ea.position.set(sx * 0.19, 0.33, -0.02); ea.rotation.z = -sx * 0.25; hg.add(ea); }
    else { const ea = mk(new T.SphereGeometry(0.15, 10, 8), e); ea.scale.set(0.45, 1.25, 0.9); ea.position.set(sx * 0.31, -0.05, -0.02); ea.rotation.z = sx * 0.25; hg.add(ea); } }
  if (o.collar) { const cl = mk(new T.TorusGeometry(0.22, 0.04, 6, 16), o.collar); cl.rotation.x = Math.PI / 2 - 0.5; cl.position.set(0, 0.8, 0.42); g.add(cl); }
  const legs = []; for (const sx of [-0.19, 0.19]) for (const sz of [-0.3, 0.3]) { const lg = new T.Group(); lg.position.set(sx, 0.48, sz); const m = mk(new T.CylinderGeometry(0.075, 0.07, 0.48, 8), c); m.position.y = -0.24; lg.add(m); lg.add(at3(mk(new T.SphereGeometry(0.085, 8, 6), w), 0, -0.47, 0.02)); g.add(lg); legs.push(lg); }
  const tl = new T.Group(); tl.position.set(0, 0.78, -0.5); const tm = mk(new T.CylinderGeometry(0.035, 0.06, 0.42, 6), c); tm.position.set(0, 0.17, -0.08); tm.rotation.x = -0.45; tl.add(tm); g.add(tl);
  g.userData.legs = legs; g.userData.tail = tl; g.userData.dogHead = hg; g.scale.setScalar(s || 1); return g; };
/* horse: saddle top at y ~1.75 (scale 1); rider: on ['horse','x',0,dy,0] */
CF.horse = (s, c, mane) => { const g = new T.Group(), col = c || '#7a4a2a', mn = mane || '#2a1a12';
  const b = mk(new T.SphereGeometry(0.6, 14, 10), col); b.scale.set(0.8, 0.75, 1.55); b.position.y = 1.35; g.add(b);
  const nk = mk(new T.CylinderGeometry(0.22, 0.32, 0.9, 10), col); nk.position.set(0, 1.85, 0.75); nk.rotation.x = 0.6; g.add(nk);
  const hd = mk(new T.BoxGeometry(0.32, 0.34, 0.7), col); hd.position.set(0, 2.2, 1.12); hd.rotation.x = 0.35; g.add(hd);
  for (const sx of [-1, 1]) { g.add(at3(mk(new T.SphereGeometry(0.05, 6, 4), '#141010'), sx * 0.17, 2.3, 1.18)); const ea = mk(new T.ConeGeometry(0.06, 0.2, 5), col); ea.position.set(sx * 0.1, 2.45, 0.86); g.add(ea); }
  const mm = mk(new T.BoxGeometry(0.08, 0.3, 0.95), mn); mm.position.set(0, 2.0, 0.65); mm.rotation.x = 0.6; g.add(mm);
  g.add(at3(mk(new T.BoxGeometry(0.62, 0.12, 0.7), '#5a2a1a'), 0, 1.8, -0.05));
  const legs = []; for (const sx of [-0.25, 0.25]) for (const sz of [-0.6, 0.6]) { const lg = new T.Group(); lg.position.set(sx, 1.1, sz); const m = mk(new T.CylinderGeometry(0.09, 0.08, 1.05, 8), col); m.position.y = -0.52; lg.add(m); lg.add(at3(mk(new T.CylinderGeometry(0.1, 0.11, 0.12, 8), '#2a1e18'), 0, -1.04, 0)); g.add(lg); legs.push(lg); }
  const tl = new T.Group(); tl.position.set(0, 1.55, -0.9); const tm = mk(new T.CylinderGeometry(0.05, 0.12, 0.8, 6), mn); tm.position.set(0, -0.3, -0.12); tm.rotation.x = 0.35; tl.add(tm); g.add(tl);
  g.userData.legs = legs; g.userData.tail = tl; g.scale.setScalar(s || 1); return g; };
CF.pistol = (s) => { const g = new T.Group(), c = '#1c1d22'; g.add(at3(mk(new T.BoxGeometry(0.07, 0.09, 0.34), c), 0, 0.03, 0.14), at3(mk(new T.BoxGeometry(0.07, 0.18, 0.09), c), 0, -0.06, -0.01)); g.scale.setScalar(s || 1); return g; };
CF.rifle = (s) => { const g = new T.Group(), c = '#1c1d22'; g.add(at3(mk(new T.BoxGeometry(0.08, 0.1, 1.0), c), 0, 0.03, 0.35), at3(mk(new T.BoxGeometry(0.08, 0.16, 0.3), '#4a3a2a'), 0, -0.02, -0.25), at3(mk(new T.CylinderGeometry(0.05, 0.05, 0.3, 8), c), 0, 0.12, 0.3)); g.scale.setScalar(s || 1); return g; };
CF.knife = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.03, 0.06, 0.32), '#dfe6ee', { metalness: 0.5, roughness: 0.3 }), 0, 0, 0.2), at3(mk(new T.BoxGeometry(0.05, 0.08, 0.14), '#2a2220'), 0, 0, -0.02)); g.scale.setScalar(s || 1); return g; };
CF.cane = (s, c) => { const g = new T.Group(), col = c || '#3a2a1e'; g.add(at3(mk(new T.CylinderGeometry(0.035, 0.035, 1.0, 8), col), 0, -0.45, 0)); const k = mk(new T.SphereGeometry(0.07, 8, 6), c === '#f4f4f0' ? '#c0c4cc' : P.gold, GOLDM); g.add(k); g.scale.setScalar(s || 1); return g; };
CF.coin = (s) => { const g = new T.Group(); const d = mk(new T.CylinderGeometry(0.16, 0.16, 0.035, 18), P.gold, GOLDM); d.rotation.x = Math.PI / 2; g.add(d); const gl = softSprite('rgba(255,215,120,1)', 0.7); gl.scale.setScalar(0.8); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.frame = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.5, 0.62, 0.05), '#c8a060'), 0, 0.31, 0)); g.add(at3(new T.Mesh(new T.PlaneGeometry(0.38, 0.5), basic('#f6d8dc')), 0, 0.31, 0.03)); const h = label('♥', { px: 120, color: '#e05a6a', w: 0.3 }); h.position.set(0, 0.32, 0.05); g.add(h); g.scale.setScalar(s || 1); return g; };
CF.gift = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.9, 0.7, 0.9), '#f4f0ea'), 0, 0.35, 0)); for (const r of [0, 1]) { const rb = mk(new T.BoxGeometry(r ? 0.94 : 0.14, 0.72, r ? 0.14 : 0.94), '#d04a5a'); rb.position.y = 0.35; g.add(rb); }
  const lid = new T.Group(); lid.position.set(0, 0.72, -0.45); lid.add(at3(mk(new T.BoxGeometry(0.98, 0.12, 0.98), '#f4f0ea'), 0, 0.05, 0.45), at3(mk(new T.TorusGeometry(0.14, 0.04, 6, 12), '#d04a5a'), 0, 0.17, 0.45)); g.add(lid); g.userData.lid = lid; g.scale.setScalar(s || 1); return g; };
CF.pump = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.9, 1.9, 0.6), '#d04a3a'), 0, 0.95, 0), at3(new T.Mesh(new T.PlaneGeometry(0.6, 0.36), basic('#bfe8ff')), 0, 1.5, 0.31), at3(mk(new T.BoxGeometry(0.16, 0.5, 0.16), '#2a2a2e'), 0.52, 0.9, 0.1));
  const roof = mk(new T.BoxGeometry(5.5, 0.25, 3), '#f2f2f0'); roof.position.set(0, 3.6, 0); g.add(roof); for (const x of [-2.4, 2.4]) g.add(at3(mk(new T.BoxGeometry(0.2, 3.5, 0.2), '#d8d8dc'), x, 1.75, 0)); g.scale.setScalar(s || 1); return g; };
CF.cash = (s) => { const g = new T.Group(), rnd = srnd(7); for (let i = 0; i < 16; i++) { const b = mk(new T.BoxGeometry(0.5, 0.18, 0.26), i % 3 ? '#6aa860' : '#5a9a50'); b.position.set((i % 4 - 1.5) * 0.52, 0.09 + Math.floor(i / 8) * 0.19 + (i % 2) * 0.01, (Math.floor(i / 4) % 2 - 0.5) * 0.3); b.rotation.y = (rnd() - 0.5) * 0.3; g.add(b); } g.scale.setScalar(s || 1); return g; };
CF.lamp = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.06, 0.08, 3.4, 8), '#2a2e36'), 0, 1.7, 0), at3(mk(new T.BoxGeometry(0.3, 0.16, 0.3), '#2a2e36'), 0, 3.45, 0)); const gl = softSprite(c || 'rgba(255,214,150,1)', 0.85); gl.scale.setScalar(1.6); gl.position.y = 3.3; g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.moto = (s, c) => { const g = new T.Group(), col = c || '#c03a3a'; for (const z of [-0.6, 0.6]) { const w = mk(new T.TorusGeometry(0.32, 0.09, 6, 16), '#1e1e24'); w.rotation.y = Math.PI / 2; w.position.set(0, 0.36, z); g.add(w); }
  g.add(at3(mk(new T.BoxGeometry(0.34, 0.32, 1.0), col), 0, 0.62, 0), at3(mk(new T.BoxGeometry(0.28, 0.12, 0.5), '#1e1e24'), 0, 0.82, -0.2), at3(mk(new T.BoxGeometry(0.7, 0.05, 0.05), '#c0c4cc'), 0, 1.0, 0.5), at3(mk(new T.BoxGeometry(0.06, 0.4, 0.06), '#c0c4cc'), 0, 0.8, 0.55));
  g.add(at3(new T.Mesh(new T.SphereGeometry(0.08, 8, 6), basic('#fff2c0')), 0, 0.8, 0.72)); g.scale.setScalar(s || 1); return g; };
CF.train = (s) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(9, 2.4, 2.2), '#a8b0ba', { metalness: 0.4, roughness: 0.4 }), 0, 1.5, 0)); const wl = new T.Mesh(new T.PlaneGeometry(8.4, 0.7), basic('#ffe8a8')); wl.position.set(0, 1.9, 1.11); g.add(wl);
  for (let i = 0; i < 6; i++) g.add(at3(mk(new T.BoxGeometry(0.06, 2.0, 0.02), '#6a727c'), -3.6 + i * 1.45, 1.4, 1.12)); g.add(at3(mk(new T.BoxGeometry(9, 0.12, 2.24), '#d04a3a'), 0, 0.9, 0)); g.scale.setScalar(s || 1); return g; };
CF.book = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(0.42, 0.56, 0.12), c || '#8a2a2a'), 0, 0, 0), at3(mk(new T.BoxGeometry(0.38, 0.52, 0.13), '#f4ecd8'), 0.03, 0, 0)); g.scale.setScalar(s || 1); return g; };
CF.grave = (s, txt) => { const g = new T.Group(); const st = mk(new T.BoxGeometry(1.1, 1.2, 0.26), '#9aa0a8'); st.position.y = 0.6; g.add(st); const tp = mk(new T.CylinderGeometry(0.55, 0.55, 0.26, 18), '#9aa0a8'); tp.rotation.x = Math.PI / 2; tp.position.y = 1.2; g.add(tp);
  if (txt) { const lb = label(txt, { px: 80, color: '#2a2e36', w: 0.9 }); lb.position.set(0, 0.95, 0.15); g.add(lb); } g.add(at3(mk(new T.BoxGeometry(1.5, 0.12, 0.6), '#7a8088'), 0, 0.06, 0.1)); g.scale.setScalar(s || 1); return g; };
CF.tracer = (s, c) => beam(c || '#ffe9a0');
CF.bird = (s, c) => { const g = new T.Group(), col = c || '#8a8f9a'; const b = mk(new T.SphereGeometry(0.16, 10, 8), col); b.scale.set(0.8, 0.8, 1.2); b.position.y = 0.2; g.add(b); g.add(at3(mk(new T.SphereGeometry(0.1, 8, 6), '#6a7080'), 0, 0.36, 0.14), at3(mk(new T.ConeGeometry(0.03, 0.08, 5), '#e0a040'), 0, 0.35, 0.26));
  const wg = []; for (const sx of [-1, 1]) { const w = mk(new T.BoxGeometry(0.22, 0.03, 0.18), '#7a808a'); w.position.set(sx * 0.15, 0.24, 0); g.add(w); wg.push(w); } g.userData.wings = wg; g.scale.setScalar(s || 1); return g; };
CF.lantern = (s, c) => { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.3, 12, 8), c || '#d03a2a', { emissive: new T.Color(c || '#d03a2a'), emissiveIntensity: 0.5 }); b.scale.set(1, 1.3, 1); g.add(b); const gl = softSprite('rgba(255,140,90,1)', 0.6); gl.scale.setScalar(1.4); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.table = (s, c) => { const g = new T.Group(), col = c || '#6a4a32'; g.add(at3(mk(new T.BoxGeometry(1.6, 0.1, 0.9), col), 0, 0.82, 0)); for (const x of [-0.7, 0.7]) for (const z of [-0.35, 0.35]) g.add(at3(mk(new T.BoxGeometry(0.08, 0.8, 0.08), '#3a2a1e'), x, 0.4, z)); g.scale.setScalar(s || 1); return g; };
CF.sofa = (s, c) => { const g = new T.Group(), col = c || '#5a6a8a'; g.add(at3(mk(new T.BoxGeometry(3.2, 0.5, 0.9), col), 0, 0.25, 0), at3(mk(new T.BoxGeometry(3.2, 0.8, 0.3), col), 0, 0.75, -0.42)); for (const x of [-1.5, 1.5]) g.add(at3(mk(new T.BoxGeometry(0.3, 0.75, 0.9), col), x, 0.38, 0)); g.scale.setScalar(s || 1); return g; };
CF.counter = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(3.4, 1.0, 0.8), c || '#3a2a22'), 0, 0.5, 0), at3(mk(new T.BoxGeometry(3.5, 0.08, 0.9), P.gold, GOLDM), 0, 1.03, 0)); g.scale.setScalar(s || 1); return g; };
CF.hammer = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.035, 0.035, 1.1, 8), '#8a6a42'), 0, 0.1, 0), at3(mk(new T.BoxGeometry(0.2, 0.2, 0.4), '#4a4e56'), 0, 0.66, 0)); g.scale.setScalar(s || 1); return g; };
CF.bat = (s) => { const m = mk(new T.CylinderGeometry(0.06, 0.03, 0.9, 8), '#b08a5a'); m.geometry.translate(0, 0.35, 0); m.scale.setScalar(s || 1); return m; };
CF.launcher = (s) => { const g = new T.Group(); const t = mk(new T.CylinderGeometry(0.1, 0.1, 0.9, 10), '#3a3e36'); t.rotation.x = Math.PI / 2; t.position.z = 0.25; g.add(t, at3(mk(new T.BoxGeometry(0.08, 0.2, 0.1), '#2a2a2a'), 0, -0.12, 0)); g.scale.setScalar(s || 1); return g; };
CF.tentD = (s, c) => { const g = new T.Group(); const t = mk(new T.ConeGeometry(4.2, 3.6, 6, 1, true), c || '#e8dcc0', { side: T.DoubleSide, flatShading: true }); t.position.y = 1.8; g.add(t); g.add(at3(mk(new T.CylinderGeometry(4.6, 4.6, 0.06, 6), '#a0603a'), 0, 0.03, 0)); g.scale.setScalar(s || 1); return g; };
CF.hotel = (s, txt) => { const g = new T.Group(); g.add(at3(mk(new T.BoxGeometry(8, 9, 3), '#4a3a32'), 0, 4.5, 0)); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) g.add(at3(new T.Mesh(new T.PlaneGeometry(1.1, 1.2), basic(j % 3 ? '#ffd890' : '#5a4a3a')), -2.8 + i * 1.85, 3 + j * 1.8, 1.51));
  g.add(at3(mk(new T.BoxGeometry(2.2, 2.4, 0.2), '#2a1e18'), 0, 1.2, 1.5)); if (txt) { const lb = label(txt, { px: 110, color: '#ffd890', w: 3.2 }); lb.position.set(0, 2.7, 1.7); g.add(lb); } g.scale.setScalar(s || 1); return g; };
CF.cage = (s) => { const g = new T.Group(); const m = '#c0c6ce'; for (let i = 0; i < 6; i++) g.add(at3(mk(new T.BoxGeometry(0.04, 0.9, 0.04), m), -0.5 + i * 0.2, 0.45, 0.4)); g.add(at3(mk(new T.BoxGeometry(1.1, 0.06, 0.9), m), 0, 0.92, 0), at3(mk(new T.BoxGeometry(1.1, 0.06, 0.9), '#8a9098'), 0, 0.03, 0)); g.scale.setScalar(s || 1); return g; };
/* room extras: o.windows (night city windows), o.glass (stained windows), o.shelves (book walls), o.lanterns */
{ const room0 = ENVB.room; ENVB.room = (st, o) => { const out = room0(st, o);
  if (o.windows) for (const x of [-4, 4]) { const w = new T.Mesh(new T.PlaneGeometry(2.4, 2.6), basic('#1e2e52')); place(w, st, x, 3.2, -6.28); out.push(w); for (let i = 0; i < 6; i++) { const l = new T.Mesh(new T.PlaneGeometry(0.18, 0.24), basic(i % 2 ? '#ffd890' : '#8fc0ff')); place(l, st, x - 0.9 + i * 0.36, 2.3 + (i * 37 % 5) * 0.3, -6.26); out.push(l); } }
  if (o.glass) for (const [x, c] of [[-4.5, '#c04a6a'], [0, '#4a7ac0'], [4.5, '#d0a040']]) { const w = new T.Mesh(new T.PlaneGeometry(1.6, 3.4), basic(c, { transparent: true, opacity: 0.85 })); place(w, st, x, 3.6, -6.28); out.push(w); const gl = softSprite(c === '#4a7ac0' ? 'rgba(120,170,255,1)' : 'rgba(255,170,120,1)', 0.35); gl.scale.setScalar(3); place(gl, st, x, 3.6, -6.0); out.push(gl); }
  if (o.shelves) { const rnd = srnd(23); for (const x of [-5.4, -1.8, 1.8, 5.4]) { const sh = mk(new T.BoxGeometry(3.2, 5.4, 0.6), '#4a3220'); place(sh, st, x, 2.7, -6.0); out.push(sh); for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { const bk = mk(new T.BoxGeometry(0.28, 0.9 + rnd() * 0.2, 0.3), ['#8a2a2a', '#2a4a7a', '#4a6a3a', '#a07a2a', '#5a3a6a'][(i + r) % 5]); place(bk, st, x - 1.25 + i * 0.31, 0.8 + r * 1.3, -5.62); out.push(bk); } } }
  if (o.lanterns) for (let i = 0; i < 7; i++) { const ln = CF.lantern(1.1); place(ln, st, -6 + i * 2, 4.6 + (i % 2) * 0.4, -5.2); out.push(ln); }
  return out; }; }
/* window texture for street facades */
const facadeTex = (base, seed) => { const c = document.createElement('canvas'); c.width = 128; c.height = 256; const g = c.getContext('2d'), rnd = srnd(seed || 3); g.fillStyle = base; g.fillRect(0, 0, 128, 256);
  for (let y = 12; y < 250; y += 28) for (let x = 10; x < 120; x += 24) { g.fillStyle = rnd() < 0.55 ? ['#ffd890', '#ffe8b8', '#9fd0ff'][Math.floor(rnd() * 3)] : 'rgba(0,0,0,.35)'; g.fillRect(x, y, 14, 16); } const t = new T.CanvasTexture(c); return t; };
Object.assign(ENVB, {
  street(st, o) { const out = [], rnd = srnd(o.seed || 41); const fl = mk(new T.BoxGeometry(90, 0.2, 34), o.ground || '#3a3d46'); place(fl, st, 0, -0.1, -2); out.push(fl);
    const sw = mk(new T.BoxGeometry(90, 0.26, 3.4), o.walk || '#5a5d66'); place(sw, st, 0, 0, -5.6); out.push(sw);
    for (let i = 0; i < 22; i++) { const d = new T.Mesh(new T.PlaneGeometry(1.6, 0.14), basic('#e8e0b0')); d.rotation.x = -Math.PI / 2; place(d, st, -42 + i * 4, 0.02, 1.4); out.push(d); }
    if (o.bridge) { for (const x of [-16, 16]) { const tw = mk(new T.BoxGeometry(1.6, 26, 1.6), '#6a7480'); place(tw, st, x, 13, -6); out.push(tw); }
      for (let i = 0; i < 16; i++) { const k = i / 15, x = -16 + k * 32, h = 4 + 20 * Math.pow(2 * k - 1, 2); const cb = mk(new T.CylinderGeometry(0.04, 0.04, h, 5), '#8a96a4'); place(cb, st, x, h / 2, -6); out.push(cb); }
      const rl = mk(new T.BoxGeometry(90, 0.9, 0.2), '#6a7480'); place(rl, st, 0, 0.45, -4.2); out.push(rl); const wt = mk(new T.BoxGeometry(260, 0.2, 200), '#1a2a4a', { emissive: new T.Color('#0a1a3a'), emissiveIntensity: 0.3 }); place(wt, st, 0, -6, -110); out.push(wt);
      for (let i = 0; i < 40; i++) { const b = softSprite(['rgba(255,190,110,1)', 'rgba(120,180,255,1)'][i % 2], 0.4); b.scale.setScalar(0.5 + rnd()); place(b, st, -40 + rnd() * 80, -2 + rnd() * 4, -40 - rnd() * 30); out.push(b); } }
    else { const cols = o.bcol || ['#3a3a48', '#45404a', '#363e4a', '#4a4238']; for (let i = 0; i < 14; i++) { const w = 3.4 + rnd() * 1.6, h = 7 + rnd() * 10, x = -31 + i * 4.8, z = -10 - rnd() * 2; const c = cols[i % cols.length];
        const b = mk(new T.BoxGeometry(w, h, 3), c); place(b, st, x, h / 2, z); out.push(b); const f = new T.Mesh(new T.PlaneGeometry(w * 0.9, h * 0.9), basic('#ffffff', { map: facadeTex(c, i + 3) })); place(f, st, x, h / 2, z + 1.52); out.push(f); }
      for (let x = -12; x <= 12; x += 8) { const lp = CF.lamp(1); place(lp, st, x, 0, -4.4); out.push(lp); } }
    if (o.arch) { const c = '#e6dcc4', a = new T.Group(); for (const x of [-2.6, 2.6]) a.add(at3(mk(new T.BoxGeometry(2.2, 7, 2.4), c), x, 3.5, 0)); a.add(at3(mk(new T.BoxGeometry(7.4, 2.6, 2.4), c), 0, 8.2, 0), at3(mk(new T.BoxGeometry(7.8, 0.4, 2.6), '#d4c8ae'), 0, 9.6, 0)); place(a, st, 0, 0, -18); out.push(a); }
    return out; },
  /* long stone stairs up a hill toward a white domed church (stairY(z) gives the step height at z); o.plaza = the top square in front of the church */
  stairs(st, o) { const out = [], S = stairCfg(), N = S.n; const base = mk(new T.BoxGeometry(80, 0.2, 80), '#4f6a3e'); place(base, st, 0, -0.1, -20); out.push(base);
    const dome = (zz, yy) => { const g = new T.Group(), c = '#f2eee6'; g.add(at3(mk(new T.BoxGeometry(12, 6, 7), c), 0, 3, 0), at3(mk(new T.CylinderGeometry(2.6, 2.6, 2.4, 16), c), 0, 7.2, 0), at3(mk(new T.SphereGeometry(2.6, 18, 12, 0, 6.3, 0, 1.6), c), 0, 8.4, 0), at3(mk(new T.CylinderGeometry(0.3, 0.3, 1.4, 8), c), 0, 11.4, 0));
      for (const x of [-4.6, 4.6]) g.add(at3(mk(new T.CylinderGeometry(1.1, 1.1, 1.6, 12), c), x, 6.8, 0.6), at3(mk(new T.SphereGeometry(1.1, 12, 8, 0, 6.3, 0, 1.6), c), x, 7.6, 0.6)); g.add(at3(mk(new T.BoxGeometry(2.4, 3.4, 0.2), '#7a6a5a'), 0, 1.7, 3.55)); place(g, st, 0, yy, zz); return g; };
    if (o.plaza) { const fl = mk(new T.BoxGeometry(30, 0.3, 20), '#d8d0bf'); place(fl, st, 0, -0.15, -3); out.push(fl); out.push(dome(-12, 0)); for (const x of [-9, 9]) { const tr = tree(1.6, '#4f7a42'); place(tr, st, x, 0, -6); out.push(tr); }
      const sun = softSprite('rgba(255,190,120,1)', 0.9); sun.scale.setScalar(16); place(sun, st, 14, 2, -40); out.push(sun); return out; }
    for (let i = 0; i < N; i++) { const h = (i + 1) * S.rise; const b = mk(new T.BoxGeometry(S.w, h, S.run), i % 2 ? '#cfc6b4' : '#c4bba8'); place(b, st, 0, h / 2, S.z0 - i * S.run - S.run / 2); out.push(b);
      if (i % 4 === 0) for (const sx of [-1, 1]) { const g = mk(new T.BoxGeometry(6, h, S.run * 4), '#5a7a44'); place(g, st, sx * (S.w / 2 + 3.2), h / 2, S.z0 - i * S.run - S.run * 2); out.push(g); } }
    for (const sx of [-1, 1]) { const L = N * S.run, H = N * S.rise, len = Math.hypot(L, H); const rl = mk(new T.CylinderGeometry(0.05, 0.05, len, 6), '#2a2e36'); rl.rotation.x = Math.PI / 2 - Math.atan2(H, L); place(rl, st, sx * (S.w / 2 - 0.2), H / 2 + 1.0, S.z0 - L / 2); out.push(rl);
      for (let i = 2; i < N; i += 9) { const lp = CF.lamp(0.9); place(lp, st, sx * (S.w / 2 + 0.3), (i + 1) * S.rise, S.z0 - i * S.run - S.run / 2); out.push(lp); } }
    const rnd = srnd(61); for (let i = 0; i < 14; i++) { const z = S.z0 - rnd() * N * S.run, x = (i % 2 ? 1 : -1) * (S.w / 2 + 2 + rnd() * 3); const tr = tree(1.2 + rnd() * 0.6, ['#3f7a4a', '#4f8a52'][i % 2]); place(tr, st, x, stairY(z), z); out.push(tr); }
    out.push(dome(S.z0 - N * S.run - 8, N * S.rise)); const top = mk(new T.BoxGeometry(20, 0.3, 14), '#d8d0bf'); place(top, st, 0, N * S.rise - 0.1, S.z0 - N * S.run - 6); out.push(top); return out; },
  dock(st, o) { const out = []; const sea = mk(new T.BoxGeometry(240, 0.4, 200), '#1a2e4a', { emissive: new T.Color('#0a1a32'), emissiveIntensity: 0.3 }); place(sea, st, 0, -1.2, -60); out.push(sea);
    const dk = mk(new T.BoxGeometry(40, 0.5, 16), '#5a4a3a'); place(dk, st, 0, -0.25, -1); out.push(dk); for (let i = 0; i < 20; i++) { const ln = mk(new T.BoxGeometry(0.06, 0.02, 16), '#3a2e24'); place(ln, st, -19 + i * 2, 0.01, -1); out.push(ln); }
    const cols = ['#b04a3a', '#3a6a9a', '#d0a040', '#4a7a5a']; for (let i = 0; i < 8; i++) { const c = mk(new T.BoxGeometry(5.6, 2.4, 2.4), cols[i % 4]); place(c, st, -16 + (i % 4) * 6.4 + (i > 3 ? 3 : 0), 1.2 + (i > 3 ? 2.4 : 0), -7.5 - (i % 2) * 0.4); out.push(c); }
    for (const x of [-10, 10]) { const lp = CF.lamp(1.1, 'rgba(255,200,130,1)'); place(lp, st, x, 0, -4.6); out.push(lp); } return out; },
});
/* stairs config as hoisted functions so episode data can call stairY() while it is being defined */
function stairCfg() { return { z0: 2, run: 0.62, rise: 0.34, n: 48, w: 6 }; }
function stairY(z) { const S = stairCfg(); return z > S.z0 ? 0 : Math.min(S.n, Math.floor((S.z0 - z) / S.run) + 1) * S.rise; }

/* ---- added for The Matrix 1-4 (Nov 2026): sim-world grid, pods, sci-fi war props + presets, reusable. Generic shapes only: no film code-rain, ship, machine, logo or costume designs. ---- */
const gridLines = (w, d, step, col, op) => { const g = new T.Group(), m = basic(col, { transparent: true, opacity: op == null ? 0.6 : op, depthWrite: false });
  for (let x = -w / 2; x <= w / 2 + 1e-6; x += step) g.add(at3(new T.Mesh(new T.BoxGeometry(0.04, 0.01, d), m), x, 0, 0));
  for (let z = -d / 2; z <= d / 2 + 1e-6; z += step) g.add(at3(new T.Mesh(new T.BoxGeometry(w, 0.01, 0.04), m), 0, 0, z)); return g; };
/* pill: c body colour, glow rgba */
CF.pill = (s, c, gc) => { const g = new T.Group(), col = c || '#e0303a', o = { emissive: new T.Color(col), emissiveIntensity: 0.35 }; const b = mk(new T.CylinderGeometry(0.09, 0.09, 0.16, 12), col, o); b.rotation.z = Math.PI / 2; g.add(b);
  for (const x of [-0.08, 0.08]) g.add(at3(mk(new T.SphereGeometry(0.09, 12, 8), col, o), x, 0, 0)); const gl = softSprite(gc || 'rgba(255,90,90,1)', 0.55); gl.scale.setScalar(0.8); g.add(gl); g.scale.setScalar(s || 1); return g; };
/* upright glass pod (stand a figure at the same spot); userData.glow */
CF.pod = (s, c) => { const g = new T.Group(); const sh = new T.Mesh(new T.CylinderGeometry(0.95, 0.95, 2.7, 20, 1, true), glass(c || '#ffb89a', 0.22)); sh.position.y = 1.55; g.add(sh);
  for (const y of [0.15, 2.95]) g.add(at3(mk(new T.CylinderGeometry(1.02, 1.02, 0.3, 20), '#3a2e34'), 0, y, 0)); const gl = softSprite('rgba(255,150,120,1)', 0.35); gl.scale.setScalar(3.2); gl.position.set(0, 1.4, -0.5); g.add(gl); g.userData.glow = gl;
  for (let i = 0; i < 5; i++) g.add(at3(mk(new T.CylinderGeometry(0.05, 0.05, 2.6, 6), '#2a2226'), -0.6 + i * 0.3, 4.4, -0.3)); g.scale.setScalar(s || 1); return g; };
/* tall tower of glowing pods (power-plant fields) */
CF.podTower = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.7, 0.9, 17, 10), '#2a2430'), 0, 8.5, 0)); const ms = ['#a8483e', '#b8644a', '#8a3a36'].map((c) => basic(c, { transparent: true, opacity: 0.8 }));
  for (let r = 0; r < 9; r++) for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + r * 0.5; const p = new T.Mesh(new T.SphereGeometry(0.42, 10, 8), ms[(r + i) % 3]); p.scale.set(1, 1.4, 1); p.position.set(Math.sin(a) * 1.05, 1 + r * 1.75, Math.cos(a) * 1.05); g.add(p); }
  g.scale.setScalar(s || 1); return g; };
/* phone booth; userData.glow (opacity 0..1 when the line opens) */
CF.booth = (s, c) => { const g = new T.Group(), col = c || '#3a5a8a'; for (const x of [-0.55, 0.55]) for (const z of [-0.55, 0.55]) g.add(at3(mk(new T.BoxGeometry(0.1, 2.6, 0.1), col), x, 1.3, z));
  g.add(at3(mk(new T.BoxGeometry(1.25, 0.25, 1.25), col), 0, 2.72, 0), at3(new T.Mesh(new T.BoxGeometry(1.1, 2.4, 1.1), glass('#cfe8ff', 0.16)), 0, 1.3, 0), at3(mk(new T.BoxGeometry(0.32, 0.46, 0.12), '#1e1e24'), 0, 1.55, -0.46));
  const gl = softSprite('rgba(140,235,255,1)', 0.9); gl.scale.setScalar(3.2); gl.position.y = 1.4; gl.material.opacity = 0; g.add(gl); g.userData.glow = gl; g.scale.setScalar(s || 1); return g; };
/* slow bullet with a ripple ring */
CF.bullet = (s) => { const g = new T.Group(); const b = mk(new T.SphereGeometry(0.07, 10, 8), P.gold, GOLDM); b.scale.set(1, 1, 2.4); g.add(b);
  const rg = new T.Mesh(new T.TorusGeometry(0.16, 0.012, 6, 20), basic('#ffffff', { transparent: true, opacity: 0.45 })); rg.position.z = -0.2; g.add(rg); const gl = softSprite('rgba(255,230,160,1)', 0.5); gl.scale.setScalar(0.45); g.add(gl); g.scale.setScalar(s || 1); return g; };
/* spoon; userData.bend (rotation.x bends the top half) */
CF.spoon = (s) => { const g = new T.Group(), o = { metalness: 0.6, roughness: 0.3 }, m = '#dfe4ec'; g.add(at3(mk(new T.BoxGeometry(0.05, 0.36, 0.02), m, o), 0, 0.18, 0)); const up = new T.Group(); up.position.y = 0.36;
  up.add(at3(mk(new T.BoxGeometry(0.05, 0.18, 0.02), m, o), 0, 0.09, 0)); const bw = mk(new T.SphereGeometry(0.09, 10, 8), m, o); bw.scale.set(1, 1.4, 0.35); bw.position.y = 0.28; up.add(bw); g.add(up); g.userData.bend = up; g.scale.setScalar(s || 1); return g; };
CF.key = (s) => { const g = new T.Group(), o = GOLDM; const r = mk(new T.TorusGeometry(0.12, 0.035, 6, 16), P.gold, o); r.position.y = 0.3; g.add(r, at3(mk(new T.BoxGeometry(0.04, 0.4, 0.03), P.gold, o), 0, 0, 0), at3(mk(new T.BoxGeometry(0.12, 0.04, 0.03), P.gold, o), 0.06, -0.14, 0), at3(mk(new T.BoxGeometry(0.09, 0.04, 0.03), P.gold, o), 0.05, -0.05, 0));
  const gl = softSprite('rgba(255,220,130,1)', 0.6); gl.scale.setScalar(0.7); g.add(gl); g.scale.setScalar(s || 1); return g; };
CF.keyring = (s) => { const g = new T.Group(); const r = mk(new T.TorusGeometry(0.18, 0.02, 6, 18), '#c0c4cc'); g.add(r); for (let i = 0; i < 6; i++) { const k = CF.key(0.55); k.position.set(Math.sin(i) * 0.12, -0.22 - (i % 2) * 0.05, 0.02 * i); k.rotation.z = -0.5 + i * 0.2; g.add(k); } g.scale.setScalar(s || 1); return g; };
/* door: c leaf colour, gc light colour; userData.leaf (rotation.y -1.6 = open), userData.glow (opacity) */
CF.door = (s, c, gc) => { const g = new T.Group(), f = '#e8e8ec'; g.add(at3(mk(new T.BoxGeometry(0.15, 2.5, 0.2), f), -0.65, 1.25, 0), at3(mk(new T.BoxGeometry(0.15, 2.5, 0.2), f), 0.65, 1.25, 0), at3(mk(new T.BoxGeometry(1.45, 0.15, 0.2), f), 0, 2.55, 0));
  g.add(at3(new T.Mesh(new T.PlaneGeometry(1.15, 2.4), basic(gc || '#fff4d0')), 0, 1.22, -0.05)); const h = new T.Group(); h.position.set(-0.58, 0, 0.02);
  h.add(at3(mk(new T.BoxGeometry(1.15, 2.4, 0.08), c || '#7a6a5a'), 0.575, 1.22, 0), at3(mk(new T.SphereGeometry(0.06, 8, 6), P.gold, GOLDM), 1.0, 1.2, 0.08)); g.add(h); g.userData.leaf = h;
  const gl = softSprite('rgba(255,245,210,1)', 0.9); gl.scale.setScalar(3.6); gl.position.set(0, 1.3, 0.3); gl.material.opacity = 0; g.add(gl); g.userData.glow = gl; g.scale.setScalar(s || 1); return g; };
const openDoor = (d, k) => { d.userData.leaf.rotation.y = -1.7 * k; d.userData.glow.material.opacity = 0.8 * k; };
/* defence turret (generic): userData.head (yaw), userData.fl (muzzle flash sprite) */
CF.turret = (s, c) => { const g = new T.Group(), col = c || '#6a6458'; g.add(at3(mk(new T.CylinderGeometry(0.9, 1.1, 0.8, 12), '#4a4640'), 0, 0.4, 0)); const h = new T.Group(); h.position.y = 1.2; g.add(h);
  h.add(at3(mk(new T.BoxGeometry(1.3, 0.8, 1.2), col), 0, 0, 0), at3(mk(new T.BoxGeometry(0.5, 0.5, 0.1), '#2a3a4a'), 0, 0.1, 0.62)); for (const x of [-0.35, 0.35]) { const b = mk(new T.CylinderGeometry(0.09, 0.09, 1.6, 8), '#2a2a2e'); b.rotation.x = Math.PI / 2; b.position.set(x, 0.05, 1.2); h.add(b); }
  const fl = softSprite('rgba(255,210,120,1)', 1); fl.scale.setScalar(1.4); fl.position.set(0, 0.05, 2.1); fl.visible = false; h.add(fl); g.userData.head = h; g.userData.fl = fl; g.scale.setScalar(s || 1); return g; };
/* giant digging machine (generic cone bit + drum): userData.bit spins on y; nose points down (-y) */
CF.drill = (s) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(2.2, 2.2, 3.4, 16), '#4a4448'), 0, 2.6, 0)); for (const y of [1.4, 3.8]) g.add(at3(mk(new T.CylinderGeometry(2.35, 2.35, 0.3, 16), '#7a2a2a'), 0, y, 0));
  const bit = new T.Group(); const c = mk(new T.ConeGeometry(2.0, 3.2, 12), '#8a8a90', { flatShading: true, metalness: 0.4, roughness: 0.5 }); c.rotation.x = Math.PI; c.position.y = -0.6; bit.add(c);
  for (let i = 0; i < 6; i++) { const t = mk(new T.BoxGeometry(0.2, 2.2, 0.35), '#c0c4cc'); const a = i * Math.PI / 3; t.position.set(Math.sin(a) * 1.0, -0.4, Math.cos(a) * 1.0); t.rotation.set(0.5 * Math.cos(a), a, -0.5 * Math.sin(a)); bit.add(t); }
  for (let i = 0; i < 4; i++) { const l = softSprite('rgba(255,70,50,1)', 0.9); l.scale.setScalar(0.7); const a = i * Math.PI / 2; l.position.set(Math.sin(a) * 2.25, 3.0, Math.cos(a) * 2.25); g.add(l); }
  g.add(bit); g.userData.bit = bit; g.scale.setScalar(s || 1); return g; };
/* machine leader shown as a swirling cloud of lights (no face or body design); userData.tick(t) */
CF.mind = (s) => { const g = new T.Group(), rnd = srnd(91), parts = []; const core = softSprite('rgba(255,150,70,1)', 0.75); core.scale.setScalar(4.4); g.add(core);
  for (let i = 0; i < 80; i++) { const p = softSprite(['rgba(255,190,90,1)', 'rgba(255,110,60,1)', 'rgba(255,235,170,1)'][i % 3], 0.75); p.scale.setScalar(0.45 + rnd() * 0.7); p.userData.v = [rnd() * 6.283, Math.acos(2 * rnd() - 1), 1.6 + rnd() * 0.7]; parts.push(p); g.add(p); }
  g.userData.tick = (t) => parts.forEach((p, i) => { const v = p.userData.v, th = v[0] + t * 0.45 * (i % 2 ? 1 : -1); p.position.set(Math.sin(v[1]) * Math.cos(th) * v[2], Math.cos(v[1]) * v[2] * 1.25, Math.sin(v[1]) * Math.sin(th) * v[2]); });
  g.userData.tick(0); g.scale.setScalar(s || 1); return g; };
/* dark spire with glowing window rings */
CF.spire = (s, h) => { const g = new T.Group(), H = h || 14; g.add(at3(mk(new T.CylinderGeometry(0.4, 1.6, H, 8), '#1e1a20', { flatShading: true }), 0, H / 2, 0)); const m = basic('#ff8a3a');
  for (let i = 1; i < 7; i++) { const r = new T.Mesh(new T.CylinderGeometry(1.6 - i * H / 7 * 1.2 / H + 0.03, 1.6 - i * H / 7 * 1.2 / H + 0.03, 0.12, 8, 1, true), m); r.position.y = i * H / 7; g.add(r); }
  const tp = softSprite('rgba(255,120,60,1)', 0.8); tp.scale.setScalar(2.2); tp.position.y = H + 0.4; g.add(tp); g.scale.setScalar(s || 1); return g; };
/* wall of glowing screens; userData.panels */
CF.tvwall = (s, cols, rows, c) => { const g = new T.Group(), n = cols || 9, m = rows || 5, panels = [];
  for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { const p = new T.Mesh(new T.PlaneGeometry(0.95, 0.66), basic(c || '#dfeeff', { transparent: true, opacity: 0.9 })); p.position.set((i - (n - 1) / 2) * 1.05, 0.5 + j * 0.76, 0); g.add(p); panels.push(p);
    const fig = new T.Mesh(new T.CircleGeometry(0.11, 10), basic('#5a7a9a')); fig.position.set(p.position.x, p.position.y + 0.08, 0.01); g.add(fig); const bd = new T.Mesh(new T.PlaneGeometry(0.2, 0.2), basic('#5a7a9a')); bd.position.set(p.position.x, p.position.y - 0.14, 0.01); g.add(bd); }
  g.userData.panels = panels; g.scale.setScalar(s || 1); return g; };
CF.rabbit = (s, c) => { const g = new T.Group(), w = c || '#fbfaf6'; const b = mk(new T.SphereGeometry(0.3, 14, 10), w); b.scale.set(1, 1.1, 0.95); b.position.y = 0.3; g.add(b); const h = mk(new T.SphereGeometry(0.24, 14, 10), w); h.position.y = 0.72; g.add(h);
  for (const sx of [-1, 1]) { const e = mk(new T.SphereGeometry(0.07, 8, 6), w); e.scale.set(1, 3.2, 0.7); e.position.set(sx * 0.1, 1.05, 0); e.rotation.z = -sx * 0.15; g.add(e); g.add(at3(mk(new T.SphereGeometry(0.035, 6, 4), '#1e1a1a'), sx * 0.09, 0.76, 0.21)); }
  g.add(at3(mk(new T.SphereGeometry(0.035, 6, 4), '#ff9ab0'), 0, 0.7, 0.24), at3(mk(new T.SphereGeometry(0.09, 8, 6), w), 0, 0.2, -0.3)); g.scale.setScalar(s || 1); return g; };
CF.cup = (s, c) => { const g = new T.Group(); g.add(at3(mk(new T.CylinderGeometry(0.11, 0.09, 0.22, 12), c || '#f4f0ea'), 0, 0.11, 0)); const h = mk(new T.TorusGeometry(0.06, 0.018, 6, 10), c || '#f4f0ea'); h.position.set(0.13, 0.12, 0); g.add(h);
  g.add(at3(mk(new T.CylinderGeometry(0.1, 0.1, 0.01, 12), '#5a3420'), 0, 0.215, 0)); g.scale.setScalar(s || 1); return g; };
CF.cloud = (s, c) => { const g = new T.Group(), rnd = srnd(141), m = M(c || '#c4cede', { flatShading: true }); for (let i = 0; i < 9; i++) { const b = new T.Mesh(new T.IcosahedronGeometry(1, 1), m); b.scale.setScalar(1.2 + rnd() * 1.4); b.position.set(-5 + i * 1.25 + rnd(), rnd() * 0.6, (rnd() - 0.5) * 2); g.add(b); } g.scale.setScalar(s || 1); return g; };
CF.pillar = (s, c) => { const g = new T.Group(), col = c || '#d8d0c0'; g.add(at3(mk(new T.CylinderGeometry(0.5, 0.5, 5.6, 14), col), 0, 2.8, 0), at3(mk(new T.BoxGeometry(1.3, 0.3, 1.3), col), 0, 0.15, 0), at3(mk(new T.BoxGeometry(1.3, 0.3, 1.3), col), 0, 5.6, 0)); g.scale.setScalar(s || 1); return g; };
/* flying chips (like CF.bits) in any colour; animate with burstTick */
CF.chips = (s, c) => { const g = new T.Group(), rnd = srnd(23); for (let i = 0; i < 16; i++) { const b = mk(new T.BoxGeometry(0.16 + rnd() * 0.2, 0.12 + rnd() * 0.15, 0.14), c || '#d8d0c0', { flatShading: true }); b.userData.v = [(rnd() - 0.5) * 4.2, 1.8 + rnd() * 2.4, (rnd() - 0.2) * 2.8, rnd() * 9]; g.add(b); } g.scale.setScalar(s || 1); return g; };
/* "seeing the code": a teal wire grid laid over floor and walls + scattered glyph tiles (not falling rain) */
CF.codegrid = (s, c) => { const g = new T.Group(), col = c || '#5ff0e0'; const fl = gridLines(16, 13, 0.8, col, 0.55); g.add(fl); const bw = gridLines(16, 7, 0.8, col, 0.45); bw.rotation.x = Math.PI / 2; bw.position.set(0, 3.5, -6.3); g.add(bw);
  for (const sx of [-1, 1]) { const sw = gridLines(13, 7, 0.8, col, 0.4); sw.rotation.set(Math.PI / 2, 0, Math.PI / 2); sw.position.set(sx * 7.8, 3.5, 0); g.add(sw); }
  const rnd = srnd(57), tm = basic(col, { transparent: true, opacity: 0.6 }); for (let i = 0; i < 46; i++) { const q = new T.Mesh(new T.PlaneGeometry(0.22, 0.3), tm); q.position.set(-7 + rnd() * 14, 0.6 + rnd() * 6, -6.2); g.add(q); } g.scale.setScalar(s || 1); return g; };
/* energy ring (push wave / EMP): grow with scale, fade with material opacity via ringTick */
CF.ringw = (s, c) => { const m = new T.Mesh(new T.TorusGeometry(1, 0.08, 8, 40), basic(c || '#bff4ff', { transparent: true, opacity: 0.85, depthWrite: false })); m.scale.setScalar(s || 1); return m; };
const ringTick = (o, k, s0, s1) => { o.visible = k > 0 && k < 1; o.scale.setScalar(U.lerp(s0, s1, k)); o.material.opacity = 0.85 * (1 - k); };
Object.assign(ENVB, {
  /* simulated world: dark floor with a teal grid, floating cubes; o.white = the white loading void */
  cyber(st, o) { const out = [], wht = !!o.white; const fl = mk(new T.BoxGeometry(60, 0.2, 50), wht ? '#eef2f6' : '#0e1426'); place(fl, st, 0, -0.1, -8); out.push(fl);
    const gl = gridLines(60, 50, 1.2, wht ? '#b8c4d0' : '#3fd8d0', wht ? 0.5 : 0.45); place(gl, st, 0, 0.01, -8); out.push(gl);
    if (o.dojo) { const mat = mk(new T.BoxGeometry(10, 0.1, 8), '#b88a5a'); place(mat, st, 0, 0.05, -0.5); out.push(mat); for (const x of [-5.6, 5.6]) for (const z of [-4.6, 3.6]) { const p = mk(new T.BoxGeometry(0.3, 4, 0.3), '#5a3a2a'); place(p, st, x, 2, z); out.push(p); } }
    const rnd = srnd(o.seed || 151), cm = basic(wht ? '#c8d4e0' : '#3fd8d0', { transparent: true, opacity: wht ? 0.35 : 0.22 }); for (let i = 0; i < 26; i++) { const c = new T.Mesh(new T.BoxGeometry(1, 1, 1), cm); c.scale.setScalar(0.5 + rnd() * 1.6); place(c, st, -24 + rnd() * 48, 1 + rnd() * 9, -14 - rnd() * 18); c.rotation.set(rnd(), rnd(), 0); out.push(c); }
    return out; },
  podfield(st, o) { const out = []; const fl = mk(new T.BoxGeometry(120, 0.2, 90), '#141018'); place(fl, st, 0, -0.1, -20); out.push(fl); const rnd = srnd(161);
    for (let r = 0; r < 4; r++) for (let i = 0; i < 7; i++) { const tw = CF.podTower(0.9 + rnd() * 0.3); place(tw, st, -24 + i * 8 + (r % 2) * 4, -2 - rnd() * 3, -9 - r * 9); out.push(tw); }
    for (let i = 0; i < 6; i++) { const h = softSprite('rgba(255,90,70,1)', 0.1); h.scale.setScalar(6 + rnd() * 5); place(h, st, -30 + rnd() * 60, 6 + rnd() * 8, -26 - rnd() * 16); out.push(h); } return out; },
  /* machine city: dark ground, spires, orange glows */
  mcity(st, o) { const out = [terrain(st, '#2a2226', '#1a1418', { hill: 3, seed: 171, flat: 14 }), ranges(st, [[38, '#241c22', 8, 16, 12, 2.6]], { seed: 172 })]; const rnd = srnd(173);
    for (let i = 0; i < 16; i++) { const sp = CF.spire(0.8 + rnd() * 0.9, 10 + rnd() * 10); place(sp, st, -30 + i * 4 + rnd() * 2, 0, -12 - rnd() * 22); out.push(sp); }
    for (let i = 0; i < 18; i++) { const h = softSprite('rgba(255,120,50,1)', 0.25); h.scale.setScalar(6 + rnd() * 8); place(h, st, -30 + rnd() * 60, 2 + rnd() * 10, -18 - rnd() * 20); out.push(h); } return out; },
  /* above the clouds: cloud floor + sun */
  clouds(st, o) { const out = [], rnd = srnd(181); for (let i = 0; i < 16; i++) { const c = CF.cloud(1.4 + rnd()); place(c, st, -36 + (i % 8) * 10 + rnd() * 3, -4 - rnd() * 2, -6 - Math.floor(i / 8) * 14 - rnd() * 4); out.push(c); }
    const sun = softSprite('rgba(255,220,160,1)', 0.95); sun.scale.setScalar(14); place(sun, st, 10, 9, -50); out.push(sun); return out; },
});
/* building block with a lit-window facade (top at y=0 by default: o.y); for rooftop gaps */
CF.bldg = (s, w, h, d, c) => { const g = new T.Group(), W = w || 8, Hh = h || 24, D = d || 10, col = c || '#3a3e4a'; const b = mk(new T.BoxGeometry(W, Hh, D), col); b.position.y = -Hh / 2; g.add(b);
  const f = new T.Mesh(new T.PlaneGeometry(W * 0.92, Hh * 0.96), basic('#ffffff', { map: facadeTex(col, 9) })); f.position.set(0, -Hh / 2, D / 2 + 0.02); g.add(f); g.add(at3(mk(new T.BoxGeometry(W, 0.5, D), '#262a32'), 0, 0.2, 0)); g.scale.setScalar(s || 1); return g; };
